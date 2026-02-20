"use client";

import { useMemo } from "react";

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

// ---------------------------------------------------------------
// Localized text for the Hint Panel
// ---------------------------------------------------------------
const hintPanelI18n: Record<string, Record<string, { title: string; items: string[] }>> = {
  EN: {
    TERMS: { title: "Combining Like Terms", items: ["ax + bx = (a+b)x", "Group same variables", "Watch signs: -(a-b) = -a+b", "Distribute: c(x+y) = cx + cy"] },
    FACTORIZE: { title: "Factorization Identities", items: ["(x+A)(x+B) = x^2 + (A+B)x + AB", "u^2 − v^2 = (u−v)(u+v)", "(a+b)^2 = a^2 + 2ab + b^2", "Always check: GCF first"] },
    FRACTIONS: { title: "Simplifying Fractions", items: ["Factor numerator & denominator", "Cancel common factors", "a^2−b^2 = (a−b)(a+b)", "Check domain restrictions"] },
    EQUATIONS: { title: "Solving Equations", items: ["Zero Product: if pq=0, then p=0 or q=0", "Quadratic formula: x = (−b ± √Δ) / 2a", "Δ = b^2 − 4ac", "Complete the square for vertex form"] },
  },
  CN: {
    TERMS: { title: "合并同类项", items: ["ax + bx = (a+b)x", "同类项：变量和次数相同的项", "注意符号：-(a-b) = -a+b", "分配律：c(x+y) = cx + cy"] },
    FACTORIZE: { title: "因式分解恒等式", items: ["(x+A)(x+B) = x^2 + (A+B)x + AB", "u^2 − v^2 = (u−v)(u+v)  平方差公式", "(a+b)^2 = a^2 + 2ab + b^2  完全平方", "先提取公因式"] },
    FRACTIONS: { title: "分式化简", items: ["分别对分子、分母进行因式分解", "约去公因式", "a^2−b^2 = (a−b)(a+b)", "注意定义域限制"] },
    EQUATIONS: { title: "解方程", items: ["零因式定理：若 pq=0，则 p=0 或 q=0", "求根公式：x = (−b ± √Δ) / 2a", "判别式 Δ = b^2 − 4ac", "配方法可求顶点式"] },
  },
  DE: {
    TERMS: { title: "Gleichartige Terme", items: ["ax + bx = (a+b)x", "Gleiche Variablen zusammenfassen", "Vorzeichen: -(a-b) = -a+b", "Ausmultiplizieren: c(x+y) = cx + cy"] },
    FACTORIZE: { title: "Faktorisierungs-Identitäten", items: ["(x+A)(x+B) = x^2 + (A+B)x + AB", "u^2 − v^2 = (u−v)(u+v)", "(a+b)^2 = a^2 + 2ab + b^2", "Immer zuerst: Gemeinsamer Faktor"] },
    FRACTIONS: { title: "Brüche Vereinfachen", items: ["Zähler & Nenner faktorisieren", "Gemeinsame Faktoren kürzen", "a^2−b^2 = (a−b)(a+b)", "Definitionsmenge beachten"] },
    EQUATIONS: { title: "Gleichungen Lösen", items: ["Nullproduktsatz: wenn pq=0, dann p=0 oder q=0", "Mitternachtsformel: x = (−b ± √Δ) / 2a", "Δ = b^2 − 4ac", "Quadratische Ergänzung für Scheitelpunktform"] },
  },
};

const hintStepLabel: Record<string, string> = { EN: "Step-by-Step Hints", CN: "逐步提示", DE: "Schritt-für-Schritt" };

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

  const toSvg = (x: number, y: number): [number, number] => [ox + x * scale, oy - y * scale];

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
  }, [a, b, c, maxAbsX, scale]);

  const [svx, svy] = toSvg(vx, vy);

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
      {Array.from({ length: Math.ceil(maxAbsX) * 2 + 1 }).map((_, i) => { const val = i - Math.ceil(maxAbsX); if (val === 0) return null; const [sx] = toSvg(val, 0); if (sx < 10 || sx > W - 10) return null; return (<g key={`tx-${i}`}><line x1={sx} y1={oy - 3} x2={sx} y2={oy + 3} stroke="#00e5ff" strokeWidth="1" opacity="0.3" /><text x={sx} y={oy + 14} fill="#00e5ff" fontSize="8" textAnchor="middle" opacity="0.3">{val}</text></g>); })}
      {Array.from({ length: Math.ceil(maxAbsY) * 2 + 1 }).map((_, i) => { const val = i - Math.ceil(maxAbsY); if (val === 0) return null; const [, sy] = toSvg(0, val); if (sy < 10 || sy > H - 10) return null; return (<g key={`ty-${i}`}><line x1={ox - 3} y1={sy} x2={ox + 3} y2={sy} stroke="#00e5ff" strokeWidth="1" opacity="0.3" /><text x={ox - 10} y={sy + 3} fill="#00e5ff" fontSize="8" textAnchor="end" opacity="0.3">{val}</text></g>); })}
      {/* Parabola */}
      <path d={path} fill="none" stroke="#00ffff" strokeWidth="2.5" filter="url(#svgGlow)" opacity="0.9" />
      {/* Vertex */}
      <circle cx={svx} cy={svy} r="5" fill="#ff00ff" filter="url(#svgGlow)" />
      <text x={svx + 10} y={svy - 8} fill="#ff00ff" fontSize="11" fontWeight="bold">V({vx.toFixed(1)}, {vy.toFixed(1)})</text>
      {/* Roots */}
      {roots.map((r, i) => { const [rx, ry] = toSvg(r, 0); return (<g key={i}><circle cx={rx} cy={ry} r="5" fill="#39ff14" filter="url(#svgGlow)" /><text x={rx} y={ry + 18} fill="#39ff14" fontSize="11" fontWeight="bold" textAnchor="middle">x={r.toFixed(1)}</text></g>); })}
      {disc < 0 && <text x={W / 2} y={30} fill="#ff4444" fontSize="12" textAnchor="middle" fontWeight="bold">Δ &lt; 0</text>}
      <text x={W / 2} y={H - 10} fill="white" fontSize="12" textAnchor="middle" fontWeight="bold" opacity="0.7">
        y = {a === 1 ? '' : a === -1 ? '-' : a}x^2 {b >= 0 ? '+' : ''}{b}x {c >= 0 ? '+' : ''}{c}
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------
// HINT PANEL — Localized
// ---------------------------------------------------------------
function HintPanel({ stage, hints, lang }: { stage: string; hints?: string[]; lang: string }) {
  const data = (hintPanelI18n[lang] || hintPanelI18n.EN)[stage] || hintPanelI18n.EN.TERMS;

  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="text-[9px] uppercase tracking-[0.4em] font-black text-cyan-400/80">{data.title}</div>
      </div>
      <div className="p-4 space-y-2">
        {data.items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-cyan-400/40 text-xs mt-0.5">▸</span>
            <span className="text-white/70 font-mono text-xs leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
      {hints && hints.length > 0 && (
        <div className="border-t border-white/5 p-4 space-y-2">
          <div className="text-[8px] uppercase tracking-[0.3em] font-black text-yellow-400/70 mb-2">{hintStepLabel[lang] || hintStepLabel.EN}</div>
          {hints.map((h, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-yellow-400/50 text-[10px] font-black mt-0.5">{i + 1}.</span>
              <span className="text-white/60 font-mono text-[11px] leading-relaxed">{h}</span>
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
export default function S301QuadraticCanvas({ quest, lang = "EN" }: { quest: CanvasQuest; lang?: string }) {
  if (!quest) {
    return (
      <div className="w-full rounded-xl border border-white/10 bg-white/[0.02] p-8 flex items-center justify-center">
        <span className="text-white/40 font-mono text-sm">Loading...</span>
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
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#39ff14]" /><span className="text-[8px] font-mono text-white/40 uppercase tracking-wider">{lang === "CN" ? "根" : lang === "DE" ? "Nullstellen" : "Roots"}</span></div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#ff00ff]" /><span className="text-[8px] font-mono text-white/40 uppercase tracking-wider">{lang === "CN" ? "顶点" : lang === "DE" ? "Scheitel" : "Vertex"}</span></div>
          </div>
        </div>
      )}
      <HintPanel stage={quest.stage} hints={quest.hintLatex} lang={lang} />
    </div>
  );
}
