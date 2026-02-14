"use client";

import { useMemo } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface Point {
  x: number;
  y: number;
}

interface MatrixVisualization2DProps {
  matrix: number[][];
  stage: string;
  language: "EN" | "CN" | "DE";
}

export default function MatrixVisualization2D({ matrix, stage, language }: MatrixVisualization2DProps) {
  const scale = 60; // pixels per unit
  const origin = { x: 200, y: 200 };
  
  // Transform point by matrix
  const transform = (p: Point): Point => {
    return {
      x: matrix[0][0] * p.x + matrix[0][1] * p.y,
      y: matrix[1][0] * p.x + matrix[1][1] * p.y,
    };
  };
  
  // Convert math coords to canvas coords
  const toCanvas = (p: Point): Point => ({
    x: origin.x + p.x * scale,
    y: origin.y - p.y * scale, // flip Y
  });
  
  // Unit square vertices
  const unitSquare: Point[] = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
  ];
  
  // Transformed square
  const transformedSquare = useMemo(() => 
    unitSquare.map(transform),
    [matrix]
  );
  
  // Calculate determinant
  const det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  
  // Basis vectors
  const iHat = transform({ x: 1, y: 0 });
  const jHat = transform({ x: 0, y: 1 });
  
  const translations = {
    EN: {
      unitSquare: "Unit Square",
      transformed: "Transformed",
      determinant: "Determinant",
      area: "Area",
      basisVectors: "Basis Vectors",
    },
    CN: {
      unitSquare: "单位正方形",
      transformed: "变换后",
      determinant: "行列式",
      area: "面积",
      basisVectors: "基向量",
    },
    DE: {
      unitSquare: "Einheitsquadrat",
      transformed: "Transformiert",
      determinant: "Determinante",
      area: "Fläche",
      basisVectors: "Basisvektoren",
    },
  };
  
  const t = translations[language];
  
  // Draw arrow
  const Arrow = ({ from, to, color, label }: { from: Point; to: Point; color: string; label: string }) => {
    const canvasFrom = toCanvas(from);
    const canvasTo = toCanvas(to);
    const dx = canvasTo.x - canvasFrom.x;
    const dy = canvasTo.y - canvasFrom.y;
    const angle = Math.atan2(dy, dx);
    const length = Math.sqrt(dx * dx + dy * dy);
    
    // Arrowhead
    const headLength = 12;
    const headAngle = Math.PI / 6;
    const head1 = {
      x: canvasTo.x - headLength * Math.cos(angle - headAngle),
      y: canvasTo.y - headLength * Math.sin(angle - headAngle),
    };
    const head2 = {
      x: canvasTo.x - headLength * Math.cos(angle + headAngle),
      y: canvasTo.y - headLength * Math.sin(angle + headAngle),
    };
    
    // Label position (perpendicular offset)
    const perpAngle = angle + Math.PI / 2;
    const labelOffset = 20;
    const labelPos = {
      x: (canvasFrom.x + canvasTo.x) / 2 + Math.cos(perpAngle) * labelOffset,
      y: (canvasFrom.y + canvasTo.y) / 2 + Math.sin(perpAngle) * labelOffset,
    };
    
    return (
      <g>
        <line
          x1={canvasFrom.x}
          y1={canvasFrom.y}
          x2={canvasTo.x}
          y2={canvasTo.y}
          stroke={color}
          strokeWidth="3"
          markerEnd="url(#arrowhead)"
        />
        <polygon
          points={`${canvasTo.x},${canvasTo.y} ${head1.x},${head1.y} ${head2.x},${head2.y}`}
          fill={color}
        />
        <text
          x={labelPos.x}
          y={labelPos.y}
          fill={color}
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {label}
        </text>
      </g>
    );
  };
  
  return (
    <div className="w-full h-full bg-black/90 p-4 space-y-4">
      {/* Matrix display */}
      <div className="text-center">
        <div className="text-sm text-cyan-400 mb-2">TRANSFORMATION MATRIX</div>
        <div className="inline-block bg-black/50 border border-cyan-500 p-3">
          <BlockMath math={`A = \\begin{bmatrix} ${matrix[0][0]} & ${matrix[0][1]} \\\\ ${matrix[1][0]} & ${matrix[1][1]} \\end{bmatrix}`} />
        </div>
      </div>
      
      {/* SVG Canvas */}
      <svg width="400" height="400" className="mx-auto border border-white/20">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            orient="auto"
          >
            <polygon points="0 0, 10 5, 0 10" fill="white" />
          </marker>
        </defs>
        
        {/* Grid */}
        {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
          <g key={`grid-${i}`}>
            <line
              x1={toCanvas({ x: i, y: -3 }).x}
              y1={toCanvas({ x: i, y: -3 }).y}
              x2={toCanvas({ x: i, y: 3 }).x}
              y2={toCanvas({ x: i, y: 3 }).y}
              stroke={i === 0 ? "#ff2d7d" : "#00e5ff"}
              strokeWidth={i === 0 ? "2" : "0.5"}
              opacity={i === 0 ? "0.8" : "0.2"}
            />
            <line
              x1={toCanvas({ x: -3, y: i }).x}
              y1={toCanvas({ x: -3, y: i }).y}
              x2={toCanvas({ x: 3, y: i }).x}
              y2={toCanvas({ x: 3, y: i }).y}
              stroke={i === 0 ? "#39ff14" : "#00e5ff"}
              strokeWidth={i === 0 ? "2" : "0.5"}
              opacity={i === 0 ? "0.8" : "0.2"}
            />
          </g>
        ))}
        
        {/* Unit square (dashed) */}
        <polygon
          points={unitSquare.map(p => {
            const c = toCanvas(p);
            return `${c.x},${c.y}`;
          }).join(" ")}
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeDasharray="5,5"
          opacity="0.5"
        />
        
        {/* Transformed square */}
        <polygon
          points={transformedSquare.map(p => {
            const c = toCanvas(p);
            return `${c.x},${c.y}`;
          }).join(" ")}
          fill="#00e5ff"
          fillOpacity="0.2"
          stroke="#00e5ff"
          strokeWidth="3"
        />
        
        {/* Basis vectors */}
        <Arrow
          from={{ x: 0, y: 0 }}
          to={iHat}
          color="#ff2d7d"
          label="î"
        />
        <Arrow
          from={{ x: 0, y: 0 }}
          to={jHat}
          color="#39ff14"
          label="ĵ"
        />
        
        {/* Origin */}
        <circle
          cx={origin.x}
          cy={origin.y}
          r="4"
          fill="#ffffff"
        />
      </svg>
      
      {/* Info panel */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="border border-purple-500 p-3 bg-black/50">
          <div className="text-purple-400 mb-1">{t.determinant}</div>
          <div className="text-2xl font-bold text-purple-300">
            det(A) = {det.toFixed(2)}
          </div>
          <div className="text-xs text-purple-300/60 mt-1">
            {t.area}: {Math.abs(det).toFixed(2)}
          </div>
        </div>
        
        <div className="border border-cyan-500 p-3 bg-black/50">
          <div className="text-cyan-400 mb-1">{t.basisVectors}</div>
          <div className="text-sm space-y-1">
            <div className="text-red-400">
              î → ({iHat.x.toFixed(2)}, {iHat.y.toFixed(2)})
            </div>
            <div className="text-green-400">
              ĵ → ({jHat.x.toFixed(2)}, {jHat.y.toFixed(2)})
            </div>
          </div>
        </div>
      </div>
      
      {/* Stage-specific info */}
      {stage === "DETERMINANT" && (
        <div className="border border-yellow-500 p-3 bg-black/50 text-center">
          <div className="text-yellow-400 text-sm">
            {det > 1 && "Area EXPANDED"}
            {det > 0 && det < 1 && "Area COMPRESSED"}
            {det < 0 && "ORIENTATION REVERSED"}
            {Math.abs(det) < 0.01 && "COLLAPSED TO LINE"}
          </div>
        </div>
      )}
    </div>
  );
}
