"use client";

import { useState, useMemo } from "react";

interface CoordinateCanvas2DProps {
  stage: "DISTANCE" | "MIDPOINT" | "SLOPE";
  point1?: [number, number];
  point2?: [number, number];
  translations?: {
    distance_formula: string;
    midpoint_formula: string;
    slope_formula: string;
    line_eq: string;
    hide_formula: string;
    show_formula: string;
  };
}

export default function CoordinateCanvas2D({
  stage = "DISTANCE",
  point1 = [0, 0],
  point2 = [3, 4],
  translations,
}: CoordinateCanvas2DProps) {
  const [showFormula, setShowFormula] = useState(true);

  const t = translations || {
    distance_formula: "Distance Formula",
    midpoint_formula: "Midpoint Formula",
    slope_formula: "Slope Formula",
    line_eq: "Line Equation: ",
    hide_formula: "Hide Formula",
    show_formula: "Show Formula"
  };

  const width = 800;
  const height = 600;

  // --- DYNAMIC SCALING ENGINE ---
  // Ensure ALL points and labels fit within the 800x600 canvas with generous padding
  const [x1, y1] = point1;
  const [x2, y2] = point2;

  const { gridSize, originX, originY } = useMemo(() => {
    const maxAbsX = Math.max(Math.abs(x1), Math.abs(x2));
    const maxAbsY = Math.max(Math.abs(y1), Math.abs(y2));

    // Fit range: at least 10 units, or largest coordinate + 3 (for label padding)
    const rangeX = Math.max(10, maxAbsX + 3);
    const rangeY = Math.max(8, maxAbsY + 3);

    const scaleX = (width / 2) / rangeX;
    const scaleY = (height / 2) / rangeY;

    // Use the smaller scale to guarantee both axes fit, cap at 40 for aesthetics
    const size = Math.min(scaleX, scaleY, 40);

    return {
      gridSize: size,
      originX: width / 2,
      originY: height / 2
    };
  }, [x1, y1, x2, y2]);

  const toSVG = (x: number, y: number): [number, number] => {
    return [originX + x * gridSize, originY - y * gridSize];
  };

  const [svgX1, svgY1] = toSVG(x1, y1);
  const [svgX2, svgY2] = toSVG(x2, y2);

  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const [svgMidX, svgMidY] = toSVG(midX, midY);
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;

  // --- SMART EXTERIOR POSITIONING 3.0 ---

  // Point Label: Intelligently pick a quadrant that is NOT occupied by the line segment
  const getSmartLabelPos = (x: number, y: number, otherX: number, otherY: number) => {
    // Direction from this point to the other point
    const dx = otherX - x;
    const dy = otherY - y;

    // We want to push the label in the OPPOSITE direction of the line segment
    // But also stay within our current half-plane to be near the point
    let pushX = dx > 0 ? -1.2 : 1.2;
    let pushY = dy > 0 ? -1.0 : 1.0;

    // Special handling for axes to prevent clipping or crossing
    if (Math.abs(x) < 0.1) pushX = dx > 0 ? -1.5 : 1.5;
    if (Math.abs(y) < 0.1) pushY = dy > 0 ? -1.2 : 1.2;

    const [sx, sy] = toSVG(x + pushX, y + pushY);
    return { x: sx, y: sy, anchor: pushX > 0 ? 'start' : 'end' };
  };

  const getAuxLabelPos = (type: 'dx' | 'dy') => {
    if (type === 'dx') {
      const mx = (x1 + x2) / 2;
      const mathY = y1 + (y2 >= y1 ? -1.2 : 1.2);
      const [sx, sy] = toSVG(mx, mathY);
      return { x: sx, y: sy, anchor: 'middle' };
    } else {
      const my = (y1 + y2) / 2;
      const mathX = x2 + (x2 >= x1 ? 1.2 : -1.2);
      const [sx, sy] = toSVG(mathX, my);
      return { x: sx, y: sy, anchor: mathX >= x2 ? 'start' : 'end' };
    }
  };

  const getHypotenusePos = () => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const pushX = x2 > x1 ? -1.8 : 1.8;
    const pushY = y2 > y1 ? 1.8 : -1.8;
    const [sx, sy] = toSVG(mx + pushX, my + pushY);
    return { x: sx, y: sy, anchor: pushX > 0 ? 'start' : 'end' };
  };

  return (
    <div className="relative w-full aspect-[4/3] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <defs>
          <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <rect width={width} height={height} fill="url(#gridGrad)" />

        {/* 动态网格线 */}
        <g opacity="0.05">
          {Array.from({ length: 41 }).map((_, i) => {
            const val = i - 20;
            const [sx, sy] = toSVG(val, val);
            return (
              <g key={i}>
                <line x1={sx} y1="0" x2={sx} y2={height} stroke="#00e5ff" strokeWidth="0.5" />
                <line x1="0" y1={sy} x2={width} y2={sy} stroke="#00e5ff" strokeWidth="0.5" />
              </g>
            );
          })}
        </g>

        {/* 强化坐标轴 */}
        <g filter="url(#glow)">
          <line x1="0" y1={originY} x2={width} y2={originY} stroke="#00e5ff" strokeWidth="3" opacity="0.6" />
          <line x1={originX} y1="0" x2={originX} y2={height} stroke="#00e5ff" strokeWidth="3" opacity="0.6" />
        </g>

        {/* 动态刻度 */}
        <g opacity="0.3">
          {Array.from({ length: 25 }).map((_, i) => {
            const val = i - 12;
            if (val === 0) return null;
            const [sx, sy] = toSVG(val, 0);
            const [sx2, sy2] = toSVG(0, val);
            // 只有在视图内的才显示
            if (sx < 0 || sx > width || sy2 < 0 || sy2 > height) return null;
            return (
              <g key={i} fill="#00e5ff" fontSize="10" fontStyle="italic">
                <line x1={sx} y1={originY - 4} x2={sx} y2={originY + 4} stroke="#00e5ff" />
                <text x={sx} y={originY + 18} textAnchor="middle">{val}</text>
                <line x1={originX - 4} y1={sy2} x2={originX + 4} y2={sy2} stroke="#00e5ff" />
                <text x={originX - 10} y={sy2 + 4} textAnchor="end">{val}</text>
              </g>
            );
          })}
        </g>

        {stage === "DISTANCE" && (
          <g>
            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY1} stroke="#ffd166" strokeWidth="1.5" strokeDasharray="6,4" />
            <line x1={svgX2} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#ffd166" strokeWidth="1.5" strokeDasharray="6,4" />
            <rect x={svgX2 > svgX1 ? svgX2 - 12 : svgX2} y={y1 < y2 ? svgY1 - 12 : svgY1} width="12" height="12" fill="none" stroke="#ffd166" opacity="0.4" />

            {(() => {
              const pos = getAuxLabelPos('dx');
              return <text x={pos.x} y={pos.y} fill="#ffd166" fontSize="13" fontWeight="900" textAnchor="middle">Δx = {Math.abs(deltaX)}</text>;
            })()}

            {(() => {
              const pos = getAuxLabelPos('dy');
              return <text x={pos.x} y={pos.y} fill="#ffd166" fontSize="13" fontWeight="900" textAnchor={pos.anchor as any}>Δy = {Math.abs(deltaY)}</text>;
            })()}

            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#39ff14" strokeWidth="4" filter="url(#glow)" strokeLinecap="round" />

            {(() => {
              const pos = getHypotenusePos();
              return <text x={pos.x} y={pos.y} fill="#39ff14" fontSize="22" fontWeight="900" filter="url(#glow)" textAnchor={pos.anchor as any}>d = ?</text>;
            })()}
          </g>
        )}

        {stage === "MIDPOINT" && (
          <g>
            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#a855f7" strokeWidth="3" opacity="0.6" />
            <circle cx={svgMidX} cy={svgMidY} r="8" fill="#ff2d7d" filter="url(#glow)" />
            {(() => {
              const pos = getSmartLabelPos(midX, midY, x2, y2);
              return <text x={pos.x} y={pos.y} fill="#ff2d7d" fontSize="17" fontWeight="900" filter="url(#glow)" textAnchor={pos.anchor as any}>M(x, y)</text>;
            })()}
          </g>
        )}

        {/* 关键点 - 采用同向推离避让，确保不压线且在视野内 */}
        <g>
          <circle cx={svgX1} cy={svgY1} r="7" fill="#39ff14" filter="url(#glow)" />
          {(() => {
            const pos = getSmartLabelPos(x1, y1, x2, y2);
            return <text x={pos.x} y={pos.y} fill="#39ff14" fontSize="15" fontWeight="900" textAnchor={pos.anchor as any} filter="url(#glow)">A({x1}, {y1})</text>;
          })()}

          <circle cx={svgX2} cy={svgY2} r="7" fill="#a855f7" filter="url(#glow)" />
          {(() => {
            const pos = getSmartLabelPos(x2, y2, x1, y1);
            return <text x={pos.x} y={pos.y} fill="#a855f7" fontSize="15" fontWeight="900" textAnchor={pos.anchor as any} filter="url(#glow)">B({x2}, {y2})</text>;
          })()}
        </g>
      </svg>

      {showFormula && (
        <div className="absolute top-4 left-4 bg-black/80 border border-white/10 rounded-lg p-5 backdrop-blur-md max-w-[240px] shadow-xl">
          <div className="text-[10px] text-cyan-400 font-black uppercase mb-3 tracking-widest opacity-70">Analysis Terminal</div>
          {stage === "DISTANCE" && <div className="text-white/90 font-mono text-sm leading-relaxed italic">Find distance <span className="text-green-400">d</span> using:<br />d = √[Δx² + Δy²]</div>}
          {stage === "MIDPOINT" && <div className="text-white/90 font-mono text-sm leading-relaxed italic">Find mid <span className="text-pink-400">M</span>:<br />M = (Σx/2, Σy/2)</div>}
          {stage === "SLOPE" && <div className="text-white/90 font-mono text-sm leading-relaxed italic">Find slope <span className="text-cyan-400">m</span>:<br />m = Δy / Δx</div>}
        </div>
      )}

      <button onClick={() => setShowFormula(!showFormula)} className="absolute top-4 right-4 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all text-[10px] uppercase font-bold">
        {showFormula ? "Hide Info" : "Show Logic"}
      </button>

      <div className="absolute bottom-6 left-6 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
        Vector Chamber // SM2.07 // Dynamic Rescale
      </div>
    </div>
  );
}
