"use client";

import { useMemo } from "react";

interface ProbabilityVisualizationProps {
  stage: string;
  favorable?: number;
  total?: number;
  n?: number;
  k?: number;
  p?: number;
  eventA?: number;
  eventB?: number;
  eventAB?: number;
  translations?: {
    title: string;
  };
}

const palette = {
  cyan: "#00e5ff",
  pink: "#ff2d7d",
  green: "#39ff14",
  yellow: "#ffd166",
  white: "#ffffff",
  purple: "#a855f7",
  red: "#ef4444",
};

// Basic Probability: Visual representation of sample space
function BasicProbabilityViz({ favorable = 1, total = 6 }: { favorable: number; total: number }) {
  const items = useMemo(() => {
    const arr = [];
    for (let i = 0; i < total; i++) {
      arr.push({
        id: i,
        isFavorable: i < favorable,
      });
    }
    return arr;
  }, [favorable, total]);
  
  // Calculate grid dimensions
  const cols = Math.ceil(Math.sqrt(total));
  const rows = Math.ceil(total / cols);
  const itemSize = Math.min(80, 600 / Math.max(cols, rows));
  
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="text-white text-lg mb-6 font-mono">
        Sample Space: {total} outcomes
      </div>
      
      <div 
        className="grid gap-2 mb-6"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${itemSize}px)`,
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-center rounded-lg border-2 transition-all"
            style={{
              width: `${itemSize}px`,
              height: `${itemSize}px`,
              backgroundColor: item.isFavorable ? palette.green + '40' : palette.white + '10',
              borderColor: item.isFavorable ? palette.green : palette.white + '40',
            }}
          >
            <span className="text-2xl font-bold" style={{ color: item.isFavorable ? palette.green : palette.white + '60' }}>
              {item.id + 1}
            </span>
          </div>
        ))}
      </div>
      
      <div className="space-y-3 text-center">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2" style={{ backgroundColor: palette.green + '40', borderColor: palette.green }} />
            <span className="text-sm" style={{ color: palette.green }}>Favorable: {favorable}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2" style={{ backgroundColor: palette.white + '10', borderColor: palette.white + '40' }} />
            <span className="text-sm text-white/60">Unfavorable: {total - favorable}</span>
          </div>
        </div>
        
        <div className="text-xl font-mono" style={{ color: palette.cyan }}>
          P(E) = {favorable} / {total} = {(favorable / total).toFixed(4)}
        </div>
      </div>
    </div>
  );
}

// Binomial Distribution: Show distribution bars
function BinomialViz({ n = 5, k = 3, p = 0.5 }: { n: number; k: number; p: number }) {
  const binomial = (n: number, k: number): number => {
    if (k > n) return 0;
    if (k === 0 || k === n) return 1;
    let result = 1;
    for (let i = 1; i <= k; i++) {
      result = result * (n - i + 1) / i;
    }
    return result;
  };
  
  const distribution = useMemo(() => {
    const dist = [];
    for (let i = 0; i <= n; i++) {
      const prob = binomial(n, i) * Math.pow(p, i) * Math.pow(1 - p, n - i);
      dist.push({ k: i, prob });
    }
    return dist;
  }, [n, p]);
  
  const maxProb = Math.max(...distribution.map(d => d.prob));
  const targetProb = distribution.find(d => d.k === k)?.prob || 0;
  
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="text-white text-lg mb-4 font-mono">
        Binomial Distribution: n={n}, p={p}
      </div>
      
      <div className="flex items-end justify-center gap-2 mb-6" style={{ height: '300px' }}>
        {distribution.map((d) => {
          const height = (d.prob / maxProb) * 250;
          const isTarget = d.k === k;
          
          return (
            <div key={d.k} className="flex flex-col items-center gap-2">
              <div className="text-xs font-mono" style={{ color: isTarget ? palette.yellow : palette.cyan }}>
                {d.prob.toFixed(3)}
              </div>
              <div
                className="rounded-t transition-all"
                style={{
                  width: '40px',
                  height: `${height}px`,
                  backgroundColor: isTarget ? palette.yellow : palette.cyan + '80',
                  border: isTarget ? `2px solid ${palette.yellow}` : 'none',
                }}
              />
              <div className="text-sm font-bold" style={{ color: isTarget ? palette.yellow : palette.white }}>
                {d.k}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="space-y-2 text-center">
        <div className="text-sm text-white/70">
          Formula: P(X=k) = C(n,k) × p^k × (1-p)^(n-k)
        </div>
        <div className="text-xl font-mono" style={{ color: palette.yellow }}>
          P(X={k}) = {targetProb.toFixed(4)}
        </div>
        <div className="text-sm" style={{ color: palette.cyan }}>
          C({n},{k}) = {binomial(n, k)}
        </div>
      </div>
    </div>
  );
}

// Conditional Probability: Venn diagram
function ConditionalViz({ eventA = 0.5, eventB = 0.6, eventAB = 0.3 }: { eventA: number; eventB: number; eventAB: number }) {
  const condProb = eventAB / eventB;
  
  // Calculate positions for Venn diagram
  const scale = 200;
  const radiusA = Math.sqrt(eventA) * scale;
  const radiusB = Math.sqrt(eventB) * scale;
  
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="text-white text-lg mb-6 font-mono">
        Conditional Probability: P(A|B)
      </div>
      
      <svg width="500" height="350" className="mb-6">
        {/* Rectangle for sample space */}
        <rect x="50" y="50" width="400" height="250" fill="none" stroke={palette.white} strokeWidth="2" opacity="0.3" />
        <text x="60" y="40" fill={palette.white} fontSize="14" opacity="0.6">Sample Space (Ω)</text>
        
        {/* Circle B */}
        <circle
          cx="280"
          cy="175"
          r={radiusB}
          fill={palette.cyan}
          opacity="0.2"
          stroke={palette.cyan}
          strokeWidth="2"
        />
        <text x="320" y="120" fill={palette.cyan} fontSize="16" fontWeight="bold">B</text>
        <text x="320" y="140" fill={palette.cyan} fontSize="14">P(B)={eventB}</text>
        
        {/* Circle A */}
        <circle
          cx="220"
          cy="175"
          r={radiusA}
          fill={palette.pink}
          opacity="0.2"
          stroke={palette.pink}
          strokeWidth="2"
        />
        <text x="160" y="120" fill={palette.pink} fontSize="16" fontWeight="bold">A</text>
        <text x="160" y="140" fill={palette.pink} fontSize="14">P(A)={eventA}</text>
        
        {/* Intersection A∩B */}
        <text x="235" y="180" fill={palette.yellow} fontSize="16" fontWeight="bold">A∩B</text>
        <text x="220" y="200" fill={palette.yellow} fontSize="14">P(A∩B)={eventAB}</text>
      </svg>
      
      <div className="space-y-3 text-center">
        <div className="text-sm text-white/70">
          Formula: P(A|B) = P(A∩B) / P(B)
        </div>
        <div className="text-xl font-mono" style={{ color: palette.green }}>
          P(A|B) = {eventAB} / {eventB} = {condProb.toFixed(4)}
        </div>
        <div className="text-sm text-white/60">
          "Probability of A given that B has occurred"
        </div>
      </div>
    </div>
  );
}

export default function ProbabilityVisualization(props: ProbabilityVisualizationProps) {
  const { stage, favorable, total, n, k, p, eventA, eventB, eventAB } = props;
  
  return (
    <div className="relative w-full h-[600px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      {stage === "BASIC_PROB" && favorable !== undefined && total !== undefined && (
        <BasicProbabilityViz favorable={favorable} total={total} />
      )}
      
      {stage === "BINOMIAL" && n !== undefined && k !== undefined && p !== undefined && (
        <BinomialViz n={n} k={k} p={p} />
      )}
      
      {stage === "CONDITIONAL" && eventA !== undefined && eventB !== undefined && eventAB !== undefined && (
        <ConditionalViz eventA={eventA} eventB={eventB} eventAB={eventAB} />
      )}
      
      {stage === "MISSION" && (
        <>
          {favorable !== undefined && total !== undefined && (
            <BasicProbabilityViz favorable={favorable} total={total} />
          )}
          {n !== undefined && k !== undefined && p !== undefined && (
            <BinomialViz n={n} k={k} p={p} />
          )}
          {eventA !== undefined && eventB !== undefined && eventAB !== undefined && (
            <ConditionalViz eventA={eventA} eventB={eventB} eventAB={eventAB} />
          )}
        </>
      )}
      
      {/* Info overlay */}
      <div className="absolute top-4 left-4 bg-black/80 border border-cyan-400/30 rounded-lg px-4 py-3">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider mb-2">
          {stage === "BASIC_PROB" && "BASIC PROBABILITY"}
          {stage === "BINOMIAL" && "BINOMIAL DISTRIBUTION"}
          {stage === "CONDITIONAL" && "CONDITIONAL PROBABILITY"}
          {stage === "MISSION" && "MISSION MODE"}
        </div>
        <div className="text-white font-mono text-sm space-y-1">
          {favorable !== undefined && total !== undefined && (
            <div>Favorable: {favorable} / Total: {total}</div>
          )}
          {n !== undefined && k !== undefined && p !== undefined && (
            <>
              <div>n = {n} (trials)</div>
              <div>k = {k} (successes)</div>
              <div>p = {p} (probability)</div>
            </>
          )}
          {eventA !== undefined && eventB !== undefined && eventAB !== undefined && (
            <>
              <div>P(A) = {eventA}</div>
              <div>P(B) = {eventB}</div>
              <div>P(A∩B) = {eventAB}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
