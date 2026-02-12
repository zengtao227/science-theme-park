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
          {/* 渐变 */}
          <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
          </linearGradient>

          {/* 发光效果 */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 背景 */}
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

        {/* 坐标轴 */}
        <g>
          <line x1="0" y1={originY} x2={width} y2={originY} stroke="#00e5ff" strokeWidth="2" />
          <line x1={originX} y1="0" x2={originX} y2={height} stroke="#00e5ff" strokeWidth="2" />

          {/* 箭头 */}
          <polygon points={`${width - 10},${originY - 5} ${width},${originY} ${width - 10},${originY + 5}`} fill="#00e5ff" />
          <polygon points={`${originX - 5},10 ${originX},0 ${originX + 5},10`} fill="#00e5ff" />

          {/* 轴标签 */}
          <text x={width - 25} y={originY - 10} fill="#00e5ff" fontSize="16" fontWeight="bold">x</text>
          <text x={originX + 10} y="20" fill="#00e5ff" fontSize="16" fontWeight="bold">y</text>

          {/* 刻度 */}
          {Array.from({ length: 21 }).map((_, i) => {
            const val = i - 10;
            if (val === 0) return null;
            const [svgX, svgY] = toSVG(val, 0);
            const [svgX2, svgY2] = toSVG(0, val);
            return (
              <g key={i}>
                {/* X轴刻度 */}
                <line x1={svgX} y1={originY - 5} x2={svgX} y2={originY + 5} stroke="#00e5ff" strokeWidth="1" />
                <text x={svgX} y={originY + 20} fill="#00e5ff" fontSize="10" textAnchor="middle" opacity="0.6">{val}</text>

                {/* Y轴刻度 */}
                <line x1={originX - 5} y1={svgY2} x2={originX + 5} y2={svgY2} stroke="#00e5ff" strokeWidth="1" />
                <text x={originX - 15} y={svgY2 + 4} fill="#00e5ff" fontSize="10" textAnchor="end" opacity="0.6">{val}</text>
              </g>
            );
          })}
        </g>

        {/* 根据stage显示不同内容 */}
        {stage === "DISTANCE" && (
          <g>
            {/* 直角三角形 */}
            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY1} stroke="#ffd166" strokeWidth="2" strokeDasharray="5,5" />
            <line x1={svgX2} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#ffd166" strokeWidth="2" strokeDasharray="5,5" />

            {/* 直角标记 */}
            <rect x={svgX2 - 10} y={svgY1 - 10} width="10" height="10" fill="none" stroke="#ffd166" strokeWidth="1.5" />

            {/* Δx 和 Δy 标签 */}
            <text x={(svgX1 + svgX2) / 2} y={svgY1 + 25} fill="#ffd166" fontSize="14" fontWeight="bold" textAnchor="middle">
              Δx = {Math.abs(deltaX)}
            </text>
            <text x={svgX2 + 35} y={(svgY1 + svgY2) / 2} fill="#ffd166" fontSize="14" fontWeight="bold" textAnchor="middle">
              Δy = {Math.abs(deltaY)}
            </text>

            {/* 距离线 */}
            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#39ff14" strokeWidth="3" filter="url(#glow)" />

            {/* 距离标签 */}
            <text
              x={(svgX1 + svgX2) / 2 - 30}
              y={(svgY1 + svgY2) / 2 - 10}
              fill="#39ff14"
              fontSize="18"
              fontWeight="bold"
            >
              d = {distance.toFixed(2)}
            </text>
          </g>
        )}

        {stage === "MIDPOINT" && (
          <g>
            {/* 连线 */}
            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#a855f7" strokeWidth="3" />

            {/* 中点到两端的虚线 */}
            <line x1={svgX1} y1={svgY1} x2={svgMidX} y2={svgMidY} stroke="#ff2d7d" strokeWidth="2" strokeDasharray="8,4" />
            <line x1={svgMidX} y1={svgMidY} x2={svgX2} y2={svgY2} stroke="#ff2d7d" strokeWidth="2" strokeDasharray="8,4" />

            {/* 中点 */}
            <circle cx={svgMidX} cy={svgMidY} r="8" fill="#ff2d7d" filter="url(#glow)" />
            <circle cx={svgMidX} cy={svgMidY} r="12" fill="none" stroke="#ff2d7d" strokeWidth="2" opacity="0.5" />

            {/* 中点标签 */}
            <text x={svgMidX} y={svgMidY - 25} fill="#ff2d7d" fontSize="16" fontWeight="bold" textAnchor="middle">
              M({midX.toFixed(1)}, {midY.toFixed(1)})
            </text>

            {/* 距离标记 */}
            <text x={(svgX1 + svgMidX) / 2} y={(svgY1 + svgMidY) / 2 + 20} fill="#ff2d7d" fontSize="12" opacity="0.8" textAnchor="middle">
              d/2
            </text>
            <text x={(svgMidX + svgX2) / 2} y={(svgMidY + svgY2) / 2 + 20} fill="#ff2d7d" fontSize="12" opacity="0.8" textAnchor="middle">
              d/2
            </text>
          </g>
        )}

        {stage === "SLOPE" && (
          <g>
            {/* 扩展的直线 */}
            <line x1={svgLineX1} y1={svgLineY1} x2={svgLineX2} y2={svgLineY2} stroke="#00e5ff" strokeWidth="2" opacity="0.3" strokeDasharray="5,5" />

            {/* 两点之间的线段 */}
            <line x1={svgX1} y1={svgY1} x2={svgX2} y2={svgY2} stroke="#00e5ff" strokeWidth="3" filter="url(#glow)" />

            {/* 斜率三角形 */}
            <polygon
              points={`${svgX1},${svgY1} ${svgX2},${svgY1} ${svgX2},${svgY2}`}
              fill="#ffd166"
              opacity="0.2"
              stroke="#ffd166"
              strokeWidth="2"
            />

            {/* rise 和 run 标签 */}
            <text x={(svgX1 + svgX2) / 2} y={svgY1 + 25} fill="#ffd166" fontSize="14" fontWeight="bold" textAnchor="middle">
              run = {deltaX}
            </text>
            <text x={svgX2 + 35} y={(svgY1 + svgY2) / 2} fill="#ffd166" fontSize="14" fontWeight="bold" textAnchor="middle">
              rise = {deltaY}
            </text>

            {/* 斜率标签 */}
            <text
              x={(svgX1 + svgX2) / 2}
              y={(svgY1 + svgY2) / 2 - 30}
              fill="#00e5ff"
              fontSize="20"
              fontWeight="bold"
              textAnchor="middle"
            >
              m = {slope.toFixed(2)}
            </text>

            {/* 直线方程 */}
            <text
              x="50"
              y="50"
              fill="#00e5ff"
              fontSize="16"
              fontWeight="bold"
            >
              {t.line_eq} y = {slope.toFixed(2)}x + {b.toFixed(2)}
            </text>
          </g>
        )}

        {/* 点 A 和 B */}
        <g>
          {/* 点 A */}
          <circle cx={svgX1} cy={svgY1} r="6" fill="#39ff14" filter="url(#glow)" />
          <circle cx={svgX1} cy={svgY1} r="10" fill="none" stroke="#39ff14" strokeWidth="2" opacity="0.5" />
          <text x={svgX1} y={svgY1 - 20} fill="#39ff14" fontSize="16" fontWeight="bold" textAnchor="middle">
            A({x1}, {y1})
          </text>

          {/* 点 B */}
          <circle cx={svgX2} cy={svgY2} r="6" fill="#a855f7" filter="url(#glow)" />
          <circle cx={svgX2} cy={svgY2} r="10" fill="none" stroke="#a855f7" strokeWidth="2" opacity="0.5" />
          <text x={svgX2} y={svgY2 - 20} fill="#a855f7" fontSize="16" fontWeight="bold" textAnchor="middle">
            B({x2}, {y2})
          </text>
        </g>
      </svg>

      {/* 公式面板 */}
      {showFormula && (
        <div className="absolute top-4 left-4 bg-black/90 border border-cyan-400/30 rounded-lg px-5 py-4 space-y-3 backdrop-blur-md max-w-xs">
          <div className="text-[10px] text-cyan-400/60 uppercase tracking-wider font-bold">
            {stage === "DISTANCE" && t.distance_formula}
            {stage === "MIDPOINT" && t.midpoint_formula}
            {stage === "SLOPE" && t.slope_formula}
          </div>

          {stage === "DISTANCE" && (
            <div className="space-y-2">
              <div className="text-white font-mono text-sm">
                d = √[(x₂-x₁)² + (y₂-y₁)²]
              </div>
              <div className="text-white/60 text-xs">
                = √[({x2}-{x1})² + ({y2}-{y1})²]
              </div>
              <div className="text-white/60 text-xs">
                = √[{deltaX}² + {deltaY}²]
              </div>
              <div className="text-cyan-400 font-bold text-sm">
                = {distance.toFixed(2)}
              </div>
            </div>
          )}

          {stage === "MIDPOINT" && (
            <div className="space-y-2">
              <div className="text-white font-mono text-sm">
                M = ((x₁+x₂)/2, (y₁+y₂)/2)
              </div>
              <div className="text-white/60 text-xs">
                = (({x1}+{x2})/2, ({y1}+{y2})/2)
              </div>
              <div className="text-pink-400 font-bold text-sm">
                = ({midX.toFixed(1)}, {midY.toFixed(1)})
              </div>
            </div>
          )}

          {stage === "SLOPE" && (
            <div className="space-y-2">
              <div className="text-white font-mono text-sm">
                m = (y₂-y₁)/(x₂-x₁) = rise/run
              </div>
              <div className="text-white/60 text-xs">
                = ({y2}-{y1})/({x2}-{x1})
              </div>
              <div className="text-white/60 text-xs">
                = {deltaY}/{deltaX}
              </div>
              <div className="text-cyan-400 font-bold text-sm">
                = {slope.toFixed(2)}
              </div>
              <div className="text-white text-xs mt-3 pt-3 border-t border-white/60">
                {t.line_eq} y = {slope.toFixed(2)}x + {b.toFixed(2)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 控制按钮 */}
      <button
        onClick={() => setShowFormula(!showFormula)}
        className="absolute top-4 right-4 px-3 py-2 bg-black/80 border border-white/60 rounded text-white/80 hover:text-white hover:border-cyan-400/50 transition-all text-xs font-mono backdrop-blur-sm"
      >
        {showFormula ? t.hide_formula : t.show_formula}
      </button>

      {/* 状态指示 */}
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/60 text-right">
        CHAMBER // SM2.07<br />
        COORDINATE_GEOMETRY<br />
        MODE: {stage}
      </div>
    </div>
  );
}
