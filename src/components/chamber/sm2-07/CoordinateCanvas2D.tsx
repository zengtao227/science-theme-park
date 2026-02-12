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

  // SVG配置
  const width = 800;
  const height = 600;
  const gridSize = 40;
  const originX = width / 2;
  const originY = height / 2;

  // 转换坐标系：数学坐标 -> SVG坐标
  const toSVG = (x: number, y: number): [number, number] => {
    return [originX + x * gridSize, originY - y * gridSize];
  };

  const [x1, y1] = point1;
  const [x2, y2] = point2;
  const [svgX1, svgY1] = toSVG(x1, y1);
  const [svgX2, svgY2] = toSVG(x2, y2);

  // 计算各种值
  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const [svgMidX, svgMidY] = toSVG(midX, midY);
  const slope = (y2 - y1) / (x2 - x1);
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;

  // 计算直线方程 y = mx + b
  const b = y1 - slope * x1;

  // 扩展直线到边界
  const lineExtendX1 = -10;
  const lineExtendY1 = slope * lineExtendX1 + b;
  const lineExtendX2 = 10;
  const lineExtendY2 = slope * lineExtendX2 + b;
  const [svgLineX1, svgLineY1] = toSVG(lineExtendX1, lineExtendY1);
  const [svgLineX2, svgLineY2] = toSVG(lineExtendX2, lineExtendY2);

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
        <g opacity="0.15">
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

        {/* 坐标轴 - 强化视觉 */}
        <g filter="url(#glow)">
          <line x1="0" y1={originY} x2={width} y2={originY} stroke="#00e5ff" strokeWidth="3" />
          <line x1={originX} y1="0" x2={originX} y2={height} stroke="#00e5ff" strokeWidth="3" />
        </g>

        {/* 轴标识 */}
        <g>
          <polygon points={`${width - 10},${originY - 5} ${width},${originY} ${width - 10},${originY + 5}`} fill="#00e5ff" />
          <polygon points={`${originX - 5},10 ${originX},0 ${originX + 5},10`} fill="#00e5ff" />
          <text x={width - 10} y={originY + 35} fill="#00e5ff" fontSize="16" fontWeight="900" textAnchor="end" letterSpacing="2">X-AXIS</text>
          <text x={originX + 20} y="25" fill="#00e5ff" fontSize="16" fontWeight="900" letterSpacing="2">Y-AXIS</text>

          {/* 全刻度显示系统 */}
          {Array.from({ length: 21 }).map((_, i) => {
            const val = i - 10;
            if (val === 0) return null;
            const [svgX, svgY] = toSVG(val, 0);
            const [svgX2, svgY2] = toSVG(0, val);
            const isMajor = val % 5 === 0;
            return (
              <g key={i}>
                <line x1={svgX} y1={originY - (isMajor ? 8 : 4)} x2={svgX} y2={originY + (isMajor ? 8 : 4)} stroke="#00e5ff" strokeWidth={isMajor ? 2 : 1} />
                <text
                  x={svgX} y={originY + 28}
                  fill={isMajor ? "#fff" : "#00e5ff"}
                  fontSize="12"
                  fontWeight="900"
                  textAnchor="middle"
                  opacity={isMajor ? 1 : 0.7}
                >
                  {val}
                </text>

                <line x1={originX - (isMajor ? 8 : 4)} y1={svgY2} x2={originX + (isMajor ? 8 : 4)} y2={svgY2} stroke="#00e5ff" strokeWidth={isMajor ? 2 : 1} />
                <text
                  x={originX - 18} y={svgY2 + 5}
                  fill={isMajor ? "#fff" : "#00e5ff"}
                  fontSize="12"
                  fontWeight="900"
                  textAnchor="end"
                  opacity={isMajor ? 1 : 0.7}
                >
                  {val}
                </text>
              </g>
            );
          })}
        </g>

        {stage === "DISTANCE" && (
          <g>
            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY1} stroke="#ffd166" strokeWidth="2" strokeDasharray="5,5" />
            <line x1={svgX2} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#ffd166" strokeWidth="2" strokeDasharray="5,5" />
            <rect x={svgX2 - 10} y={svgY2 < svgY1 ? svgY1 - 10 : svgY1} width="10" height="10" fill="none" stroke="#ffd166" strokeWidth="1.5" />

            {/* Δx 标签 - 强制放在三角形下方/外侧 */}
            <text
              x={(svgX1 + svgX2) / 2}
              y={svgY1 + (svgY2 < svgY1 ? 30 : -20)}
              fill="#ffd166" fontSize="13" fontWeight="900" textAnchor="middle"
            >Δx = {Math.abs(deltaX)}</text>

            {/* Δy 标签 - 强制放在三角形右侧/外侧 */}
            <text
              x={svgX2 + (svgX1 < svgX2 ? 20 : -20)}
              y={(svgY1 + svgY2) / 2}
              fill="#ffd166" fontSize="13" fontWeight="900"
              textAnchor={svgX1 < svgX2 ? "start" : "end"}
            >Δy = {Math.abs(deltaY)}</text>

            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#39ff14" strokeWidth="3" filter="url(#glow)" />
            <text x={(svgX1 + svgX2) / 2 - 30} y={(svgY1 + svgY2) / 2 - 30} fill="#39ff14" fontSize="20" fontWeight="900" filter="url(#glow)" textAnchor="end">d = ?</text>
          </g>
        )}

        {stage === "MIDPOINT" && (
          <g>
            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#a855f7" strokeWidth="3" />
            <line x1={svgX1} y1={svgY1} x2={svgMidX} y2={svgMidY} stroke="#ff2d7d" strokeWidth="2" strokeDasharray="8,4" />
            <line x1={svgMidX} y1={svgMidY} x2={svgX2} y2={svgY2} stroke="#ff2d7d" strokeWidth="2" strokeDasharray="8,4" />
            <circle cx={svgMidX} cy={svgMidY} r="8" fill="#ff2d7d" filter="url(#glow)" />

            <text
              x={svgMidX + (midX === 0 ? 40 : 0)}
              y={svgMidY + (midY === 0 ? 10 : (midY > 0 ? -40 : 50))}
              fill="#ff2d7d" fontSize="18" fontWeight="900"
              textAnchor={midX === 0 ? "start" : "middle"}
              filter="url(#glow)"
            >M(x, y)</text>
          </g>
        )}

        {stage === "SLOPE" && (
          <g>
            <line x1={svgLineX1} y1={svgLineY1} x2={svgLineX2} y2={svgLineY2} stroke="#00e5ff" strokeWidth="2" opacity="0.3" strokeDasharray="5,5" />
            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#00e5ff" strokeWidth="3" filter="url(#glow)" />
            <polygon points={`${svgX1},${svgY1} ${svgX2},${svgY1} ${svgX2},${svgY2}`} fill="#ffd166" opacity="0.2" stroke="#ffd166" strokeWidth="2" />

            {/* run 标签 - 外部避让 */}
            <text
              x={(svgX1 + svgX2) / 2}
              y={svgY1 + (svgY2 < svgY1 ? 30 : -20)}
              fill="#ffd166" fontSize="13" fontWeight="900" textAnchor="middle"
            >run = {deltaX}</text>

            {/* rise 标签 - 外部避让 */}
            <text
              x={svgX2 + (svgX1 < svgX2 ? 20 : -20)}
              y={(svgY1 + svgY2) / 2}
              fill="#ffd166" fontSize="13" fontWeight="900"
              textAnchor={svgX1 < svgX2 ? "start" : "end"}
            >rise = {deltaY}</text>

            <text x={(svgX1 + svgX2) / 2} y={(svgY1 + svgY2) / 2 - 40} fill="#00e5ff" fontSize="22" fontWeight="900" textAnchor="middle" filter="url(#glow)">m = ?</text>
            <text x="50" y="50" fill="#00e5ff" fontSize="16" fontWeight="900" filter="url(#glow)">{t.line_eq} y = mx + b</text>
          </g>
        )}

        {/* 关键点 - 采用强制偏离算法，绝不压线 */}
        <g>
          <circle cx={svgX1} cy={svgY1} r="6" fill="#39ff14" filter="url(#glow)" />
          <text
            x={svgX1 + (x1 === 0 ? 40 : (x1 > 0 ? 25 : -25))}
            y={svgY1 + (y1 === 0 ? 10 : (y1 > 0 ? -30 : 45))}
            fill="#39ff14" fontSize="16" fontWeight="900"
            textAnchor={x1 === 0 ? "start" : (x1 > 0 ? "start" : "end")}
            filter="url(#glow)"
          >A({x1}, {y1})</text>

          <circle cx={svgX2} cy={svgY2} r="6" fill="#a855f7" filter="url(#glow)" />
          <text
            x={svgX2 + (x2 === 0 ? 40 : (x2 > 0 ? 25 : -25))}
            y={svgY2 + (y2 === 0 ? 10 : (y2 > 0 ? -30 : 45))}
            fill="#a855f7" fontSize="16" fontWeight="900"
            textAnchor={x2 === 0 ? "start" : (x2 > 0 ? "start" : "end")}
            filter="url(#glow)"
          >B({x2}, {y2})</text>
        </g>
      </svg>

      {showFormula && (
        <div className="absolute top-4 left-4 bg-black/90 border border-cyan-400/30 rounded-lg px-5 py-4 space-y-3 backdrop-blur-md max-w-xs">
          <div className="text-[10px] text-cyan-400/60 uppercase tracking-wider font-bold">
            {stage === "DISTANCE" && t.distance_formula}
            {stage === "MIDPOINT" && t.midpoint_formula}
            {stage === "SLOPE" && t.slope_formula}
          </div>
          {stage === "DISTANCE" && (
            <div className="space-y-2">
              <div className="text-white font-mono text-sm">d = √[(x₂-x₁)² + (y₂-y₁)²]</div>
              <div className="text-white/60 text-xs">= √[({x2}-{x1})² + ({y2}-{y1})²]</div>
              <div className="text-white/60 text-xs text-center italic mt-2">Calculate d</div>
            </div>
          )}
          {stage === "MIDPOINT" && (
            <div className="space-y-2">
              <div className="text-white font-mono text-sm">M = ((x₁+x₂)/2, (y₁+y₂)/2)</div>
              <div className="text-white/60 text-xs">= (({x1}+{x2})/2, ({y1}+{y2})/2)</div>
              <div className="text-pink-400/60 text-xs text-center italic mt-2">Calculate M(x, y)</div>
            </div>
          )}
          {stage === "SLOPE" && (
            <div className="space-y-2">
              <div className="text-white font-mono text-sm">m = (y₂-y₁)/(x₂-x₁) = rise/run</div>
              <div className="text-white/60 text-xs">= ({y2}-{y1})/({x2}-{x1})</div>
              <div className="text-cyan-400/60 text-xs text-center italic mt-2">Calculate m</div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => setShowFormula(!showFormula)}
        className="absolute top-4 right-4 px-3 py-2 bg-black/80 border border-white/60 rounded text-white/80 hover:text-white transition-all text-xs font-mono"
      >
        {showFormula ? t.hide_formula : t.show_formula}
      </button>

      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/60 text-right uppercase tracking-widest leading-relaxed">
        CHAMBER // SM2.07<br />COORDINATE_GEOMETRY<br />MODE: {stage}
      </div>
    </div>
  );
}
