"use client";

import { useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export type CanvasQuest = {
  id: string;
  expressionLatex: string;
  stage: string;
  a?: number;
  b?: number;
  c?: number;
  vizMode?: "AREA" | "PARABOLA";
  hintLatex?: string[];
  correctLatex?: string;
}
type QuadraticCanvasCopy = {
  roots: string;
  vertex: string;
  hint_step_label: string;
  hint_panels: Record<string, { title: string; items: string[] }>;
};

// ---------------------------------------------------------------
// PURE 2D SVG PARABOLA — Only shown for EQUATIONS stage.
// ---------------------------------------------------------------
function ParabolaSVG({ a, b, c }: { a: number; b: number; c: number }) {
  const W = 400;
  const H = 300;
  const ox = W / 2;
  const oy = H / 2 + 40;

  const vx = -b / (2 * a);
  const vy = a * vx * vx + b * vx + c;
  const disc = b * b - 4 * a * c;
  const roots: number[] = [];
  if (disc >= 0) {
    const r1 = (-b - Math.sqrt(disc)) / (2 * a);
    const r2 = (-b + Math.sqrt(disc)) / (2 * a);
    roots.push(r1);
    if (Math.abs(r1 - r2) > 0.01) roots.push(r2);
  }

  const allXs = [vx, ...roots, 0];
  const maxAbsX = Math.max(...allXs.map(Math.abs), 3) + 2;
  const maxAbsY = Math.max(Math.abs(vy), Math.abs(c), 3) + 2;
  const scaleX = (W / 2 - 30) / maxAbsX;
  const scaleY = (H / 2 - 30) / maxAbsY;
  const scale = Math.min(scaleX, scaleY, 25);

  const toSvg = useCallback((x: number, y: number): [number, number] => [ox + x * scale, oy - y * scale], [ox, oy, scale]);
  const pickTickStep = useCallback((unitsPerLabel: number) => {
    const bases = [1, 2, 5];
    let factor = 1;
    while (factor < 1000) {
      for (const base of bases) {
        const candidate = base * factor;
        if (candidate >= unitsPerLabel) return candidate;
      }
      factor *= 10;
    }
    return 1;
  }, []);
  const xTickStep = pickTickStep(28 / scale);
  const yTickStep = pickTickStep(24 / scale);

  const path = useMemo(() => {
    const pts: string[] = [];
    for (let px = -maxAbsX - 1; px <= maxAbsX + 1; px += 0.1) {
      const py = a * px * px + b * px + c;
      const [sx, sy] = toSvg(px, py);
      if (sy > -50 && sy < H + 50) {
        pts.push(`${pts.length === 0 ? 'M' : 'L'}${sx.toFixed(1)},${sy.toFixed(1)}`);
      }
    }
    return pts.join(' ');
  }, [a, b, c, maxAbsX, toSvg]);

  const [svx, svy] = toSvg(vx, vy);
  const closeRoots = roots.length === 2 && Math.abs(roots[0] - roots[1]) * scale < 56;
  const vertexNearRoots = roots.some((r) => Math.abs(toSvg(r, 0)[0] - svx) < 52 && Math.abs(toSvg(r, 0)[1] - svy) < 34);
  const vertexDx = vertexNearRoots ? -68 : 10;
  const vertexAnchor = vertexNearRoots ? "end" : "start";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-lg" style={{ background: '#080812' }}>
      <defs>
        <filter id="svgGlow"><feGaussianBlur stdDeviation="2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {/* Grid */}
      {Array.from({ length: Math.ceil(maxAbsX) * 2 + 1 }).map((_, i) => { const val = i - Math.ceil(maxAbsX); const [sx] = toSvg(val, 0); return <line key={`gv-${i}`} x1={sx} y1={0} x2={sx} y2={H} stroke="#ffffff" strokeWidth="0.3" opacity="0.06" />; })}
      {Array.from({ length: Math.ceil(maxAbsY) * 2 + 1 }).map((_, i) => { const val = i - Math.ceil(maxAbsY); const [, sy] = toSvg(0, val); return <line key={`gh-${i}`} x1={0} y1={sy} x2={W} y2={sy} stroke="#ffffff" strokeWidth="0.3" opacity="0.06" />; })}
      {/* Axes */}
      <line x1={0} y1={oy} x2={W} y2={oy} stroke="#00e5ff" strokeWidth="1.5" opacity="0.3" />
      <line x1={ox} y1={0} x2={ox} y2={H} stroke="#00e5ff" strokeWidth="1.5" opacity="0.3" />
      <text x={W - 15} y={oy - 8} fill="#00e5ff" fontSize="11" opacity="0.5" fontWeight="bold">x</text>
      <text x={ox + 8} y={15} fill="#00e5ff" fontSize="11" opacity="0.5" fontWeight="bold">y</text>
      {/* Tick numbers */}
      {Array.from({ length: Math.ceil(maxAbsX) * 2 + 1 }).map((_, i) => {
        const val = i - Math.ceil(maxAbsX);
        if (val === 0 || Math.abs(val % xTickStep) > 1e-9) return null;
        const [sx] = toSvg(val, 0);
        if (sx < 10 || sx > W - 10) return null;
        return (
          <g key={`tx-${i}`}>
            <line x1={sx} y1={oy - 3} x2={sx} y2={oy + 3} stroke="#00e5ff" strokeWidth="1" opacity="0.3" />
            <text x={sx} y={oy + 14} fill="#00e5ff" fontSize="8" textAnchor="middle" opacity="0.3">{val}</text>
          </g>
        );
      })}
      {Array.from({ length: Math.ceil(maxAbsY) * 2 + 1 }).map((_, i) => {
        const val = i - Math.ceil(maxAbsY);
        if (val === 0 || Math.abs(val % yTickStep) > 1e-9) return null;
        const [, sy] = toSvg(0, val);
        if (sy < 10 || sy > H - 10) return null;
        return (
          <g key={`ty-${i}`}>
            <line x1={ox - 3} y1={sy} x2={ox + 3} y2={sy} stroke="#00e5ff" strokeWidth="1" opacity="0.3" />
            <text x={ox - 10} y={sy + 3} fill="#00e5ff" fontSize="8" textAnchor="end" opacity="0.3">{val}</text>
          </g>
        );
      })}
      {/* Parabola */}
      <path d={path} fill="none" stroke="#00ffff" strokeWidth="2.5" filter="url(#svgGlow)" opacity="0.9" />
      {/* Vertex */}
      <circle cx={svx} cy={svy} r="5" fill="#ff00ff" filter="url(#svgGlow)" />
      <text x={svx + vertexDx} y={svy - 8} fill="#ff00ff" fontSize="11" fontWeight="bold" textAnchor={vertexAnchor}>V({vx.toFixed(1)}, {vy.toFixed(1)})</text>
      {/* Roots */}
      {roots.map((r, i) => {
        const [rx, ry] = toSvg(r, 0);
        const labelY = closeRoots ? (i === 0 ? ry - 12 : ry + 24) : ry + 18;
        return (
          <g key={i}>
            <circle cx={rx} cy={ry} r="5" fill="#39ff14" filter="url(#svgGlow)" />
            <text x={rx} y={labelY} fill="#39ff14" fontSize="11" fontWeight="bold" textAnchor="middle">x={r.toFixed(1)}</text>
          </g>
        );
      })}
      {disc < 0 && (
        <foreignObject x={W / 2 - 50} y={10} width="100" height="40">
          <div className="flex justify-center"><InlineMath math="\\Delta < 0" /></div>
        </foreignObject>
      )}
      <foreignObject x={0} y={H - 40} width={W} height={40}>
        <div className="flex justify-center text-white/70 text-sm">
          <InlineMath math={`y = ${a === 1 ? '' : a === -1 ? '-' : a}x^{2} ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}`} />
        </div>
      </foreignObject>
    </svg>
  );
}

// ---------------------------------------------------------------
// HINT PANEL — Localized
// ---------------------------------------------------------------
function HintPanel({ stage, hints, copy }: { stage: string; hints?: string[]; copy: QuadraticCanvasCopy }) {
  const data = copy.hint_panels[stage] || copy.hint_panels.TERMS;

  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="text-[9px] uppercase tracking-[0.4em] font-black text-cyan-400/80">{data.title}</div>
      </div>
      <div className="p-4 space-y-3">
        {data.items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-cyan-400/40 text-xs mt-0.5">▸</span>
            <span className="text-white/80 text-sm">
              <InlineMath math={item} />
            </span>
          </div>
        ))}
      </div>
      {hints && hints.length > 0 && (
        <div className="border-t border-white/5 p-4 space-y-2">
          <div className="text-[8px] uppercase tracking-[0.3em] font-black text-yellow-400/70 mb-2">{copy.hint_step_label}</div>
          {hints.map((h, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-yellow-400/50 text-[10px] font-black mt-1">{i + 1}.</span>
              <span className="text-white/70 text-sm">
                <InlineMath math={h} />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------
// MAIN EXPORT
// ---------------------------------------------------------------
export default function S301QuadraticCanvas({
  quest,
  loadingText = "",
  copy,
}: {
  quest: CanvasQuest;
  loadingText?: string;
  copy: QuadraticCanvasCopy;
}) {
  if (!quest) {
    return (
      <div className="w-full rounded-xl border border-white/10 bg-white/[0.02] p-8 flex items-center justify-center">
        <span className="text-white/40 font-mono text-sm">{loadingText}</span>
      </div>
    );
  }

  const showParabola = quest.stage === "EQUATIONS" && quest.a != null && quest.a !== 0;

  return (
    <div className="space-y-4">
      {showParabola && (
        <div className="w-full rounded-xl border border-white/10 overflow-hidden shadow-lg">
          <ParabolaSVG a={quest.a!} b={quest.b ?? 0} c={quest.c ?? 0} />
          <div className="px-3 py-2 bg-black/50 flex items-center justify-between">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#39ff14]" /><span className="text-[8px] font-mono text-white/40 uppercase tracking-wider">{copy.roots}</span></div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#ff00ff]" /><span className="text-[8px] font-mono text-white/40 uppercase tracking-wider">{copy.vertex}</span></div>
          </div>
        </div>
      )}
      <HintPanel stage={quest.stage} hints={quest.hintLatex} copy={copy} />
    </div>
  );
}
