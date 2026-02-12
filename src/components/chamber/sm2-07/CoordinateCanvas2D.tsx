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
  point1 = [2, 3],
  point2 = [6, 7],
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
  const slope = (y2 - y1) / (x2 - x1);
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  const b = y1 - slope * x1;

  const lineExtendX1 = -10;
  const lineExtendY1 = slope * lineExtendX1 + b;
  const lineExtendX2 = 10;
  const lineExtendY2 = slope * lineExtendX2 + b;
  const [svgLineX1, svgLineY1] = toSVG(lineExtendX1, lineExtendY1);
  const [svgLineX2, svgLineY2] = toSVG(lineExtendX2, lineExtendY2);

  // --- REFINED LABEL POSITIONING LOGIC ---
  // A "Force Field" function to push text away from axes and their labels
  const getSafePos = (x: number, y: number, preferX: 'start' | 'end' | 'middle' = 'middle') => {
    let finalX = x;
    let finalY = y;
    let anchor = preferX;

    const xDist = x - originX;
    const yDist = y - originY;

    // Buffer zones: 45px for Y-axis (to avoid numbers), 35px for X-axis
    const hBuffer = 50;
    const vBuffer = 40;

    // Horizontally avoid Y-axis
    if (Math.abs(xDist) < hBuffer) {
      if (xDist >= 0) {
        finalX = originX + hBuffer;
        anchor = 'start';
      } else {
        finalX = originX - hBuffer;
        anchor = 'end';
      }
    }

    // Vertically avoid X-axis
    if (Math.abs(yDist) < vBuffer) {
      if (yDist >= 0) {
        finalY = originY - vBuffer; // Above axis
      } else {
        finalY = originY + vBuffer; // Below axis
      }
    }

    return { x: finalX, y: finalY, anchor };
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

        {/* 网格线 */}
        <g opacity="0.1">
          {Array.from({ length: 21 }).map((_, i) => {
            const x = i * gridSize;
            const y = i * gridSize;
            return (
              <g key={i}>
                <line x1={x} y1="0" x2={x} y2={height} stroke="#00e5ff" strokeWidth="0.5" />
                <line x1="0" y1={y} x2={width} y2={y} stroke="#00e5ff" strokeWidth="0.5" />
              </g>
            );
          })}
        </g>

        {/* 坐标轴 */}
        <g filter="url(#glow)">
          <line x1="0" y1={originY} x2={width} y2={originY} stroke="#00e5ff" strokeWidth="3" opacity="0.8" />
          <line x1={originX} y1="0" x2={originX} y2={height} stroke="#00e5ff" strokeWidth="3" opacity="0.8" />
        </g>

        {/* 刻度与数字 */}
        <g>
          {Array.from({ length: 21 }).map((_, i) => {
            const val = i - 10;
            if (val === 0) return null;
            const [svgX, svgY] = toSVG(val, 0);
            const [svgX2, svgY2] = toSVG(0, val);
            const is5 = val % 5 === 0;
            return (
              <g key={i}>
                <line x1={svgX} y1={originY - 4} x2={svgX} y2={originY + 4} stroke="#00e5ff" strokeWidth="1.5" />
                <text x={svgX} y={originY + 22} fill="#00e5ff" fontSize="10" fontWeight="bold" textAnchor="middle" opacity="0.5">{val}</text>

                <line x1={originX - 4} y1={svgY2} x2={originX + 4} y2={svgY2} stroke="#00e5ff" strokeWidth="1.5" />
                <text x={originX - 12} y={svgY2 + 4} fill="#00e5ff" fontSize="10" fontWeight="bold" textAnchor="end" opacity="0.5">{val}</text>
              </g>
            );
          })}
          <text x={width - 20} y={originY + 40} fill="#00e5ff" fontSize="14" fontWeight="900" textAnchor="end">X</text>
          <text x={originX + 20} y={25} fill="#00e5ff" fontSize="14" fontWeight="900">Y</text>
        </g>

        {stage === "DISTANCE" && (
          <g>
            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY1} stroke="#ffd166" strokeWidth="2" strokeDasharray="5,5" />
            <line x1={svgX2} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#ffd166" strokeWidth="2" strokeDasharray="5,5" />

            {/* Δx Label */}
            {(() => {
              const center = (svgX1 + svgX2) / 2;
              const offset = svgY2 < svgY1 ? 35 : -25;
              const pos = getSafePos(center, svgY1 + offset);
              return (
                <text x={pos.x} y={pos.y} fill="#ffd166" fontSize="14" fontWeight="900" textAnchor={pos.anchor as any}>Δx = {Math.abs(deltaX)}</text>
              );
            })()}

            {/* Δy Label */}
            {(() => {
              const center = (svgY1 + svgY2) / 2;
              const offset = svgX1 < svgX2 ? 25 : -25;
              const pos = getSafePos(svgX2 + offset, center, svgX1 < svgX2 ? 'start' : 'end');
              return (
                <text x={pos.x} y={pos.y} fill="#ffd166" fontSize="14" fontWeight="900" textAnchor={pos.anchor as any}>Δy = {Math.abs(deltaY)}</text>
              );
            })()}

            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#39ff14" strokeWidth="4" filter="url(#glow)" />

            {/* d = ? Label */}
            {(() => {
              const cx = (svgX1 + svgX2) / 2;
              const cy = (svgY1 + svgY2) / 2;
              // Offset away from line
              const pos = getSafePos(cx - 40, cy - 40, 'end');
              return (
                <text x={pos.x} y={pos.y} fill="#39ff14" fontSize="22" fontWeight="900" filter="url(#glow)" textAnchor={pos.anchor as any}>d = ?</text>
              );
            })()}
          </g>
        )}

        {stage === "MIDPOINT" && (
          <g>
            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#a855f7" strokeWidth="3" />
            <circle cx={svgMidX} cy={svgMidY} r="8" fill="#ff2d7d" filter="url(#glow)" />
            {(() => {
              const pos = getSafePos(svgMidX, svgMidY - 35);
              return (
                <text x={pos.x} y={pos.y} fill="#ff2d7d" fontSize="18" fontWeight="900" filter="url(#glow)" textAnchor={pos.anchor as any}>M(x, y)</text>
              );
            })()}
          </g>
        )}

        {stage === "SLOPE" && (
          <g>
            <line x1={svgLineX1} y1={svgLineY1} x2={svgLineX2} y2={svgLineY2} stroke="#00e5ff" strokeWidth="2" opacity="0.3" strokeDasharray="5,5" />
            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#00e5ff" strokeWidth="4" filter="url(#glow)" />

            {/* m = ? Label */}
            {(() => {
              const cx = (svgX1 + svgX2) / 2;
              const cy = (svgY1 + svgY2) / 2;
              const pos = getSafePos(cx, cy - 45);
              return (
                <text x={pos.x} y={pos.y} fill="#00e5ff" fontSize="24" fontWeight="900" filter="url(#glow)" textAnchor={pos.anchor as any}>m = ?</text>
              );
            })()}
            <text x="50" y="50" fill="#00e5ff" fontSize="16" fontWeight="900" filter="url(#glow)">{t.line_eq} y = mx + b</text>
          </g>
        )}

        {/* A and B Points with Collision Avoidance */}
        <g>
          {/* A */}
          <circle cx={svgX1} cy={svgY1} r="7" fill="#39ff14" filter="url(#glow)" />
          {(() => {
            const pos = getSafePos(svgX1, svgY1 - 25);
            return (
              <text x={pos.x} y={pos.y} fill="#39ff14" fontSize="16" fontWeight="900" filter="url(#glow)" textAnchor={pos.anchor as any}>A({x1}, {y1})</text>
            );
          })()}

          {/* B */}
          <circle cx={svgX2} cy={svgY2} r="7" fill="#a855f7" filter="url(#glow)" />
          {(() => {
            const pos = getSafePos(svgX2, svgY2 - 25);
            return (
              <text x={pos.x} y={pos.y} fill="#a855f7" fontSize="16" fontWeight="900" filter="url(#glow)" textAnchor={pos.anchor as any}>B({x2}, {y2})</text>
            );
          })()}
        </g>
      </svg>

      {showFormula && (
        <div className="absolute top-4 left-4 bg-black/90 border border-cyan-400/30 rounded-lg px-5 py-4 space-y-3 backdrop-blur-md max-w-xs transition-all">
          <div className="text-[10px] text-cyan-400/60 uppercase tracking-wider font-bold">
            {stage === "DISTANCE" && t.distance_formula}
            {stage === "MIDPOINT" && t.midpoint_formula}
            {stage === "SLOPE" && t.slope_formula}
          </div>
          {stage === "DISTANCE" && (
            <div className="space-y-2">
              <div className="text-white font-mono text-sm">d = √[(x₂-x₁)² + (y₂-y₁)²]</div>
              <div className="text-white/60 text-xs text-center italic mt-2">Calculate d</div>
            </div>
          )}
          {stage === "MIDPOINT" && (
            <div className="space-y-2">
              <div className="text-white font-mono text-sm">M = ((x₁+x₂)/2, (y₁+y₂)/2)</div>
              <div className="text-pink-400/60 text-xs text-center italic mt-2">Calculate M(x, y)</div>
            </div>
          )}
          {stage === "SLOPE" && (
            <div className="space-y-2">
              <div className="text-white font-mono text-sm">m = (y₂-y₁)/(x₂-x₁)</div>
              <div className="text-cyan-400/60 text-xs text-center italic mt-2">Calculate m</div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => setShowFormula(!showFormula)}
        className="absolute top-4 right-4 px-3 py-2 bg-black/80 border border-white/60 rounded text-white/80 hover:text-white transition-all text-xs font-mono shadow-lg active:scale-95"
      >
        {showFormula ? t.hide_formula : t.show_formula}
      </button>

      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/60 text-right uppercase tracking-widest leading-relaxed">
        CHAMBER // SM2.07<br />COORDINATE_GEOMETRY<br />MODE: {stage}
      </div>
    </div>
  );
}
