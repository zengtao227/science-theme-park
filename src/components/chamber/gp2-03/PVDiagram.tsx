"use client";

import { useState } from "react";
import type { ThermodynamicProcess, PVPoint, Language } from "@/lib/gp2-03-types";

interface PVDiagramProps {
  processes: ThermodynamicProcess[];
  language: Language;
  interactive?: boolean;
  onPointHover?: (point: PVPoint) => void;
}

export default function PVDiagram({
  processes,
  language,
  interactive = true,
  onPointHover,
}: PVDiagramProps) {
  const [hoveredPoint, setHoveredPoint] = useState<PVPoint | null>(null);

  const width = 400;
  const height = 300;
  const padding = 50;

  // Find min/max for scaling
  const allPoints = processes.flatMap((p) => [
    { pressure: p.startState.pressure, volume: p.startState.volume },
    { pressure: p.endState.pressure, volume: p.endState.volume },
  ]);

  const minP = Math.min(...allPoints.map((p) => p.pressure)) * 0.9;
  const maxP = Math.max(...allPoints.map((p) => p.pressure)) * 1.1;
  const minV = Math.min(...allPoints.map((p) => p.volume)) * 0.9;
  const maxV = Math.max(...allPoints.map((p) => p.volume)) * 1.1;

  // Scale functions
  const scaleX = (v: number) => padding + ((v - minV) / (maxV - minV)) * (width - 2 * padding);
  const scaleY = (p: number) => height - padding - ((p - minP) / (maxP - minP)) * (height - 2 * padding);

  // Inverse scale for mouse position
  const inverseScaleX = (x: number) => minV + ((x - padding) / (width - 2 * padding)) * (maxV - minV);
  const inverseScaleY = (y: number) => minP + ((height - padding - y) / (height - 2 * padding)) * (maxP - minP);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const volume = inverseScaleX(x);
    const pressure = inverseScaleY(y);

    if (x >= padding && x <= width - padding && y >= padding && y <= height - padding) {
      const point = { pressure, volume };
      setHoveredPoint(point);
      if (onPointHover) {
        onPointHover(point);
      }
    } else {
      setHoveredPoint(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-900/50 rounded-xl p-4">
      <h3 className="text-xl font-bold text-cyan-400 mb-4">
        {language === "en" && "PV Diagram"}
        {language === "cn" && "PV 图"}
        {language === "de" && "PV-Diagramm"}
      </h3>

      <svg
        width={width}
        height={height}
        className="bg-black/30 rounded-lg"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Grid lines */}
        <g opacity={0.2}>
          {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
            const x = padding + frac * (width - 2 * padding);
            const y = height - padding - frac * (height - 2 * padding);
            return (
              <g key={frac}>
                <line x1={x} y1={padding} x2={x} y2={height - padding} stroke="white" strokeWidth={1} />
                <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="white" strokeWidth={1} />
              </g>
            );
          })}
        </g>

        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="white" strokeWidth={2} />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="white" strokeWidth={2} />

        {/* Axis labels */}
        <text x={width / 2} y={height - 10} textAnchor="middle" fill="white" fontSize="14">
          Volume (m^3)
        </text>
        <text x={20} y={height / 2} textAnchor="middle" fill="white" fontSize="14" transform={`rotate(-90, 20, ${height / 2})`}>
          Pressure (Pa)
        </text>

        {/* Draw processes */}
        {processes.map((process, idx) => {
          const x1 = scaleX(process.startState.volume);
          const y1 = scaleY(process.startState.pressure);
          const x2 = scaleX(process.endState.volume);
          const y2 = scaleY(process.endState.pressure);

          if (process.type === "isothermal") {
            // Draw curve for isothermal process
            const points: string[] = [];
            for (let i = 0; i <= 20; i++) {
              const t = i / 20;
              const v = process.startState.volume + t * (process.endState.volume - process.startState.volume);
              const p = (process.startState.pressure * process.startState.volume) / v;
              points.push(`${scaleX(v)},${scaleY(p)}`);
            }
            return (
              <polyline
                key={idx}
                points={points.join(" ")}
                fill="none"
                stroke={process.color}
                strokeWidth={3}
              />
            );
          } else {
            // Draw straight line for other processes
            return (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={process.color}
                strokeWidth={3}
              />
            );
          }
        })}

        {/* Hovered point indicator */}
        {hoveredPoint && (
          <>
            <circle
              cx={scaleX(hoveredPoint.volume)}
              cy={scaleY(hoveredPoint.pressure)}
              r={5}
              fill="#00e5ff"
            />
            <text
              x={scaleX(hoveredPoint.volume) + 10}
              y={scaleY(hoveredPoint.pressure) - 10}
              fill="#00e5ff"
              fontSize="12"
            >
              P: {(hoveredPoint.pressure / 1000).toFixed(1)} kPa
            </text>
            <text
              x={scaleX(hoveredPoint.volume) + 10}
              y={scaleY(hoveredPoint.pressure) + 5}
              fill="#00e5ff"
              fontSize="12"
            >
              V: {(hoveredPoint.volume * 1000).toFixed(1)} L
            </text>
          </>
        )}
      </svg>

      {/* Legend */}
      {processes.length > 0 && (
        <div className="mt-4 space-y-1">
          {processes.map((process, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: process.color }} />
              <span className="text-gray-300">{process.type}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
