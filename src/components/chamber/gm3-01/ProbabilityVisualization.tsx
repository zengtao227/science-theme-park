"use client";

import { useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";

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
function BasicProbabilityViz({ favorable = 1, total = 6, lang }: { favorable: number; total: number; lang: string }) {
  const t = translations[lang as keyof typeof translations].gm3_01.viz || {
    sampleSpace: lang === 'CN' ? '样本空间' : lang === 'DE' ? 'Stichprobenraum' : 'Sample Space',
    outcomes: lang === 'CN' ? '个结果' : lang === 'DE' ? 'Ergebnisse' : 'outcomes',
    favorable: lang === 'CN' ? '有利' : lang === 'DE' ? 'Günstig' : 'Favorable',
    unfavorable: lang === 'CN' ? '不利' : lang === 'DE' ? 'Ungünstig' : 'Unfavorable',
  };
  
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
  
  // Calculate grid dimensions - adjust for better display
  const cols = Math.ceil(Math.sqrt(total));
  const rows = Math.ceil(total / cols);
  const itemSize = Math.min(60, 500 / Math.max(cols, rows));
  
  // Calculate font size based on item size and number length
  const getFontSize = (num: number, size: number) => {
    const numStr = num.toString();
    const numLength = numStr.length;
    
    if (numLength === 1) {
      // Single digit: use larger font
      return Math.min(size * 0.5, 18);
    } else if (numLength === 2) {
      // Two digits: use medium font
      return Math.min(size * 0.4, 14);
    } else {
      // Three or more digits: use smaller font
      return Math.min(size * 0.3, 11);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-start h-full p-4 overflow-y-auto">
      <div className="text-white text-base mb-4 font-mono">
        {t.sampleSpace}: {total} {t.outcomes}
      </div>
      
      <div 
        className="grid gap-2 mb-4"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${itemSize}px)`,
        }}
      >
        {items.map((item) => {
          const fontSize = getFontSize(item.id + 1, itemSize);
          
          return (
            <div
              key={item.id}
              className="flex items-center justify-center rounded-lg border-2 transition-all overflow-hidden"
              style={{
                width: `${itemSize}px`,
                height: `${itemSize}px`,
                backgroundColor: item.isFavorable ? palette.green + '40' : palette.white + '10',
                borderColor: item.isFavorable ? palette.green : palette.white + '40',
              }}
            >
              <span 
                className="font-bold leading-none"
                style={{ 
                  color: item.isFavorable ? palette.green : palette.white + '60',
                  fontSize: `${fontSize}px`,
                }}
              >
                {item.id + 1}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border-2" style={{ backgroundColor: palette.green + '40', borderColor: palette.green }} />
            <span className="text-sm" style={{ color: palette.green }}>{t.favorable}: {favorable}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border-2" style={{ backgroundColor: palette.white + '10', borderColor: palette.white + '40' }} />
            <span className="text-sm text-white/60">{t.unfavorable}: {total - favorable}</span>
          </div>
        </div>
        
        <div className="text-lg font-mono" style={{ color: palette.cyan }}>
          P(E) = {favorable} / {total} = {(favorable / total).toFixed(4)}
        </div>
      </div>
    </div>
  );
}

// Binomial Distribution: Show distribution bars
function BinomialViz({ n = 5, k = 3, p = 0.5, lang }: { n: number; k: number; p: number; lang: string }) {
  const t = {
    binomialDist: lang === 'CN' ? '二项分布' : lang === 'DE' ? 'Binomialverteilung' : 'Binomial Distribution',
    formula: lang === 'CN' ? '公式' : lang === 'DE' ? 'Formel' : 'Formula',
  };
  
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
    <div className="flex flex-col items-center justify-start h-full p-4 overflow-y-auto">
      <div className="text-white text-base mb-3 font-mono">
        {t.binomialDist}: n={n}, p={p}
      </div>
      
      <div className="flex items-end justify-center gap-1 mb-4 overflow-x-auto" style={{ height: '280px', maxWidth: '100%' }}>
        {distribution.map((d) => {
          const height = (d.prob / maxProb) * 230;
          const isTarget = d.k === k;
          
          return (
            <div key={d.k} className="flex flex-col items-center gap-1">
              <div className="text-xs font-mono" style={{ color: isTarget ? palette.yellow : palette.cyan }}>
                {d.prob.toFixed(3)}
              </div>
              <div
                className="rounded-t transition-all"
                style={{
                  width: '35px',
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
        <div className="text-xs text-white/70">
          {t.formula}: P(X=k) = C(n,k) × p^k × (1-p)^(n-k)
        </div>
        <div className="text-lg font-mono" style={{ color: palette.yellow }}>
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
function ConditionalViz({ eventA = 0.5, eventB = 0.6, eventAB = 0.3, lang }: { eventA: number; eventB: number; eventAB: number; lang: string }) {
  const t = {
    conditionalProb: lang === 'CN' ? '条件概率' : lang === 'DE' ? 'Bedingte Wahrscheinlichkeit' : 'Conditional Probability',
    sampleSpace: lang === 'CN' ? '样本空间' : lang === 'DE' ? 'Stichprobenraum' : 'Sample Space',
    formula: lang === 'CN' ? '公式' : lang === 'DE' ? 'Formel' : 'Formula',
    probGivenB: lang === 'CN' ? '"在B发生的条件下A的概率"' : lang === 'DE' ? '"Wahrscheinlichkeit von A gegeben B"' : '"Probability of A given that B has occurred"',
  };
  
  const condProb = eventAB / eventB;
  
  // Calculate positions for Venn diagram
  const scale = 180;
  const radiusA = Math.sqrt(eventA) * scale;
  const radiusB = Math.sqrt(eventB) * scale;
  
  return (
    <div className="flex flex-col items-center justify-start h-full p-4 overflow-y-auto">
      <div className="text-white text-base mb-4 font-mono">
        {t.conditionalProb}: P(A|B)
      </div>
      
      <svg width="480" height="320" className="mb-4">
        {/* Rectangle for sample space */}
        <rect x="40" y="40" width="400" height="240" fill="none" stroke={palette.white} strokeWidth="2" opacity="0.3" />
        <text x="50" y="32" fill={palette.white} fontSize="13" opacity="0.6">{t.sampleSpace} (Ω)</text>
        
        {/* Circle B */}
        <circle
          cx="270"
          cy="160"
          r={radiusB}
          fill={palette.cyan}
          opacity="0.2"
          stroke={palette.cyan}
          strokeWidth="2"
        />
        <text x="310" y="110" fill={palette.cyan} fontSize="15" fontWeight="bold">B</text>
        <text x="310" y="128" fill={palette.cyan} fontSize="13">P(B)={eventB}</text>
        
        {/* Circle A */}
        <circle
          cx="210"
          cy="160"
          r={radiusA}
          fill={palette.pink}
          opacity="0.2"
          stroke={palette.pink}
          strokeWidth="2"
        />
        <text x="150" y="110" fill={palette.pink} fontSize="15" fontWeight="bold">A</text>
        <text x="150" y="128" fill={palette.pink} fontSize="13">P(A)={eventA}</text>
        
        {/* Intersection A∩B */}
        <text x="225" y="165" fill={palette.yellow} fontSize="15" fontWeight="bold">A∩B</text>
        <text x="210" y="183" fill={palette.yellow} fontSize="13">P(A∩B)={eventAB}</text>
      </svg>
      
      <div className="space-y-2 text-center">
        <div className="text-xs text-white/70">
          {t.formula}: P(A|B) = P(A∩B) / P(B)
        </div>
        <div className="text-lg font-mono" style={{ color: palette.green }}>
          P(A|B) = {eventAB} / {eventB} = {condProb.toFixed(4)}
        </div>
        <div className="text-xs text-white/60">
          {t.probGivenB}
        </div>
      </div>
    </div>
  );
}

export default function ProbabilityVisualization(props: ProbabilityVisualizationProps) {
  const { stage, favorable, total, n, k, p, eventA, eventB, eventAB } = props;
  const { currentLanguage } = useAppStore();
  const lang = currentLanguage;
  
  const stageLabels = {
    EN: { BASIC_PROB: "BASIC PROBABILITY", BINOMIAL: "BINOMIAL DISTRIBUTION", CONDITIONAL: "CONDITIONAL PROBABILITY", MISSION: "MISSION MODE" },
    CN: { BASIC_PROB: "基础概率", BINOMIAL: "二项分布", CONDITIONAL: "条件概率", MISSION: "任务模式" },
    DE: { BASIC_PROB: "GRUNDWAHRSCHEINLICHKEIT", BINOMIAL: "BINOMIALVERTEILUNG", CONDITIONAL: "BEDINGTE WAHRSCHEINLICHKEIT", MISSION: "MISSIONSMODUS" }
  };
  
  const dataLabels = {
    EN: { favorable: "Favorable", total: "Total", trials: "trials", successes: "successes", probability: "probability" },
    CN: { favorable: "有利", total: "总数", trials: "次试验", successes: "次成功", probability: "概率" },
    DE: { favorable: "Günstig", total: "Gesamt", trials: "Versuche", successes: "Erfolge", probability: "Wahrscheinlichkeit" }
  };
  
  const currentStageLabel = stageLabels[lang as keyof typeof stageLabels]?.[stage as keyof typeof stageLabels.EN] || stage;
  const labels = dataLabels[lang as keyof typeof dataLabels] || dataLabels.EN;
  
  return (
    <div className="relative w-full h-[600px] bg-[#020208] rounded-xl border border-white/10 overflow-auto shadow-2xl">
      {stage === "BASIC_PROB" && favorable !== undefined && total !== undefined && (
        <BasicProbabilityViz favorable={favorable} total={total} lang={lang} />
      )}
      
      {stage === "BINOMIAL" && n !== undefined && k !== undefined && p !== undefined && (
        <BinomialViz n={n} k={k} p={p} lang={lang} />
      )}
      
      {stage === "CONDITIONAL" && eventA !== undefined && eventB !== undefined && eventAB !== undefined && (
        <ConditionalViz eventA={eventA} eventB={eventB} eventAB={eventAB} lang={lang} />
      )}
      
      {stage === "MISSION" && (
        <>
          {favorable !== undefined && total !== undefined && (
            <BasicProbabilityViz favorable={favorable} total={total} lang={lang} />
          )}
          {n !== undefined && k !== undefined && p !== undefined && (
            <BinomialViz n={n} k={k} p={p} lang={lang} />
          )}
          {eventA !== undefined && eventB !== undefined && eventAB !== undefined && (
            <ConditionalViz eventA={eventA} eventB={eventB} eventAB={eventAB} lang={lang} />
          )}
        </>
      )}
      
      {/* Info overlay */}
      <div className="absolute top-4 left-4 bg-black/80 border border-cyan-400/30 rounded-lg px-4 py-3">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider mb-2">
          {currentStageLabel}
        </div>
        <div className="text-white font-mono text-sm space-y-1">
          {favorable !== undefined && total !== undefined && (
            <div>{labels.favorable}: {favorable} / {labels.total}: {total}</div>
          )}
          {n !== undefined && k !== undefined && p !== undefined && (
            <>
              <div>n = {n} ({labels.trials})</div>
              <div>k = {k} ({labels.successes})</div>
              <div>p = {p} ({labels.probability})</div>
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
