"use client";

import { useState } from "react";

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
  const gridSize = 40;
  const originX = width / 2;
  const originY = height / 2;

  const toSVG = (x: number, y: number): [number, number] => {
    return [originX + x * gridSize, originY - y * gridSize];
  };

  const [x1, y1] = point1;
  const [x2, y2] = point2;
  const [svgX1, svgY1] = toSVG(x1, y1);
  const [svgX2, svgY2] = toSVG(x2, y2);

  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const [svgMidX, svgMidY] = toSVG(midX, midY);
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;

  // --- EXTERIOR POSITIONING ENGINE ---
  // Ensuring everything is OUTSIDE the triangle formed by (x1,y1)-(x2,y1)-(x2,y2)

  // 1. Point Label logic: Push away from the triangle's center
  const getPointLabelPos = (x: number, y: number, isOrigin: boolean) => {
    if (isOrigin) {
      // Hard rule for A(0,0): Always push to 3rd quadrant (bottom-left) to clear 1st quadrant clutter
      const [sx, sy] = toSVG(x - 1.2, y - 0.8);
      return { x: sx, y: sy, anchor: 'end' };
    }

    // For other points, push outwards from the center of the viewport or geometry
    const dirX = x >= 0 ? 1 : -1;
    const dirY = y >= 0 ? 1 : -1;
    const [sx, sy] = toSVG(x + dirX * 1.2, y + dirY * 0.8);
    return { x: sx, y: sy, anchor: dirX > 0 ? 'start' : 'end' };
  };

  // 2. Auxiliary Line Labels: Strict exterior rules
  const getAuxLabelPos = (type: 'dx' | 'dy') => {
    if (type === 'dx') {
      const mx = (x1 + x2) / 2;
      // If triangle is above horizontal (y2 > y1), label dx BELOW y1
      // If triangle is below horizontal (y2 < y1), label dx ABOVE y1
      const mathY = y1 + (y2 >= y1 ? -1.0 : 1.0);
      const [sx, sy] = toSVG(mx, mathY);
      return { x: sx, y: sy, anchor: 'middle' };
    } else {
      const my = (y1 + y2) / 2;
      // If triangle is to the right (x2 > x1), label dy to the RIGHT of x2
      // If triangle is to the left (x2 < x1), label dy to the LEFT of x2
      const mathX = x2 + (x2 >= x1 ? 1.0 : -1.0);
      const [sx, sy] = toSVG(mathX, my);
      return { x: sx, y: sy, anchor: mathX >= x2 ? 'start' : 'end' };
    }
  };

  // 3. Hypotenuse d=? Label: Push away from the right-angle vertex (x2, y1)
  const getHypotenusePos = () => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;

    // Normal vector from right angle (x2, y1) towards hypotenuse center
    // But simpler: just push opposite to the triangle interior
    const pushX = x2 > x1 ? -1.5 : 1.5;
    const pushY = y2 > y1 ? 1.5 : -1.5;

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
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width={width} height={height} fill="url(#gridGrad)" />

        {/* 极简网格线 */}
        <g opacity="0.05">
          {Array.from({ length: 21 }).map((_, i) => (
            <g key={i}>
              <line x1={i * gridSize} y1="0" x2={i * gridSize} y2={height} stroke="#00e5ff" strokeWidth="0.5" />
              <line x1="0" y1={i * gridSize} x2={width} y2={i * gridSize} stroke="#00e5ff" strokeWidth="0.5" />
            </g>
          ))}
        </g>

        {/* 强化坐标轴 */}
        <g filter="url(#glow)">
          <line x1="0" y1={originY} x2={width} y2={originY} stroke="#00e5ff" strokeWidth="3" opacity="0.6" />
          <line x1={originX} y1="0" x2={originX} y2={height} stroke="#00e5ff" strokeWidth="3" opacity="0.6" />
        </g>

        {/* 轴刻度 */}
        <g opacity="0.3">
          {Array.from({ length: 21 }).map((_, i) => {
            const val = i - 10;
            if (val === 0) return null;
            const [sx, sy] = toSVG(val, 0);
            const [sx2, sy2] = toSVG(0, val);
            return (
              <g key={i} fill="#00e5ff" fontSize="10">
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
            {/* 辅助三角形 - 虚线 */}
            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY1} stroke="#ffd166" strokeWidth="1.5" strokeDasharray="6,4" />
            <line x1={svgX2} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#ffd166" strokeWidth="1.5" strokeDasharray="6,4" />
            <rect x={svgX2 > svgX1 ? svgX2 - 12 : svgX2} y={y1 < y2 ? svgY1 - 12 : svgY1} width="12" height="12" fill="none" stroke="#ffd166" opacity="0.5" />

            {/* Δx 标签 - 严格三角形外部 */}
            {(() => {
              const pos = getAuxLabelPos('dx');
              return <text x={pos.x} y={pos.y} fill="#ffd166" fontSize="14" fontWeight="900" textAnchor="middle">Δx = {Math.abs(deltaX)}</text>;
            })()}

            {/* Δy 标签 - 严格三角形外部 */}
            {(() => {
              const pos = getAuxLabelPos('dy');
              return <text x={pos.x} y={pos.y} fill="#ffd166" fontSize="14" fontWeight="900" textAnchor={pos.anchor as any}>Δy = {Math.abs(deltaY)}</text>;
            })()}

            {/* 主距离线 */}
            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#39ff14" strokeWidth="4" filter="url(#glow)" strokeLinecap="round" />

            {/* d=? 标签 - 强制推向三角形相对于直角顶点的对角 */}
            {(() => {
              const pos = getHypotenusePos();
              return <text x={pos.x} y={pos.y} fill="#39ff14" fontSize="24" fontWeight="900" filter="url(#glow)" textAnchor={pos.anchor as any}>d = ?</text>;
            })()}
          </g>
        )}

        {stage === "MIDPOINT" && (
          <g>
            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#a855f7" strokeWidth="3" opacity="0.6" />
            <circle cx={svgMidX} cy={svgMidY} r="8" fill="#ff2d7d" filter="url(#glow)" />
            {(() => {
              const pos = getPointLabelPos(midX, midY, false);
              return <text x={pos.x} y={pos.y} fill="#ff2d7d" fontSize="18" fontWeight="900" filter="url(#glow)" textAnchor={pos.anchor as any}>M(x, y)</text>;
            })()}
          </g>
        )}

        {stage === "SLOPE" && (
          <g>
            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#00e5ff" strokeWidth="4" filter="url(#glow)" />
            {(() => {
              const pos = getHypotenusePos();
              return <text x={pos.x} y={pos.y} fill="#00e5ff" fontSize="24" fontWeight="900" filter="url(#glow)" textAnchor={pos.anchor as any}>m = ?</text>;
            })()}
          </g>
        )}

        {/* 关键顶点 A 和 B */}
        <g>
          <circle cx={svgX1} cy={svgY1} r="7" fill="#39ff14" filter="url(#glow)" />
          {(() => {
            const pos = getPointLabelPos(x1, y1, x1 === 0 && y1 === 0);
            return <text x={pos.x} y={pos.y} fill="#39ff14" fontSize="16" fontWeight="900" textAnchor={pos.anchor as any} filter="url(#glow)">A({x1}, {y1})</text>;
          })()}

          <circle cx={svgX2} cy={svgY2} r="7" fill="#a855f7" filter="url(#glow)" />
          {(() => {
            const pos = getPointLabelPos(x2, y2, x2 === 0 && y2 === 0);
            return <text x={pos.x} y={pos.y} fill="#a855f7" fontSize="16" fontWeight="900" textAnchor={pos.anchor as any} filter="url(#glow)">B({x2}, {y2})</text>;
          })()}
        </g>
      </svg>

      {/* 公式引导 */}
      {showFormula && (
        <div className="absolute top-4 left-4 bg-black/80 border border-white/10 rounded-lg p-5 backdrop-blur-md max-w-[240px] shadow-xl">
          <div className="text-[10px] text-cyan-400 font-black uppercase mb-3 tracking-widest opacity-70">Geometry Engine</div>
          {stage === "DISTANCE" && <div className="text-white/90 font-mono text-sm leading-relaxed">Find distance <span className="text-green-400">d</span> using:<br />d = √[Δx² + Δy²]</div>}
          {stage === "MIDPOINT" && <div className="text-white/90 font-mono text-sm leading-relaxed">Find mid <span className="text-pink-400">M</span>:<br />M = (Σx/2, Σy/2)</div>}
          {stage === "SLOPE" && <div className="text-white/90 font-mono text-sm leading-relaxed">Find slope <span className="text-cyan-400">m</span>:<br />m = Δy / Δx</div>}
        </div>
      )}

      <button onClick={() => setShowFormula(!showFormula)} className="absolute top-4 right-4 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all text-[10px] uppercase font-bold tracking-tighter">
        {showFormula ? "Minimize" : "Analysis"}
      </button>

      <div className="absolute bottom-6 left-6 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
        Chamber SM2.07 // Advanced Logic
      </div>
    </div>
  );
}
