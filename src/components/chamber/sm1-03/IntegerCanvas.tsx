"use client";

import { useMemo } from "react";

interface IntegerCanvasProps {
  stage: string;
  quest: any;
  language: "EN" | "CN" | "DE";
}

export default function IntegerCanvas({ stage, quest, language }: IntegerCanvasProps) {
  const canvasSize = 400;

  const renderNumberLine = () => {
    const value = quest?.value ?? 0;
    const min = -10;
    const max = 10;
    const range = max - min;

    // Convert value to canvas position
    const valueToX = (v: number) => {
      return ((v - min) / range) * (canvasSize - 80) + 40;
    };

    return (
      <svg width={canvasSize} height={200} className="mx-auto bg-black/50 rounded-xl border border-white/10">
        {/* Number line */}
        <line x1="40" y1="100" x2={canvasSize - 40} y2="100" stroke="#ffffff" strokeWidth="2" />

        {/* Tick marks and labels */}
        {Array.from({ length: 21 }, (_, i) => {
          const v = min + i;
          const x = valueToX(v);
          const isZero = v === 0;
          const isFive = v % 5 === 0;

          return (
            <g key={i}>
              <line
                x1={x}
                y1={isZero ? 85 : isFive ? 90 : 95}
                x2={x}
                y2={isZero ? 115 : isFive ? 110 : 105}
                stroke={isZero ? "#00e5ff" : "#ffffff"}
                strokeWidth={isZero ? 3 : 1}
              />
              {isFive && (
                <text
                  x={x}
                  y="130"
                  textAnchor="middle"
                  fill={isZero ? "#00e5ff" : "#ffffff"}
                  fontSize="12"
                  fontWeight={isZero ? "bold" : "normal"}
                >
                  {v}
                </text>
              )}
            </g>
          );
        })}

        {/* Current value marker */}
        {value >= min && value <= max && (
          <g>
            <circle
              cx={valueToX(value)}
              cy="100"
              r="8"
              fill="#ff2d7d"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <text
              x={valueToX(value)}
              y="70"
              textAnchor="middle"
              fill="#ff2d7d"
              fontSize="16"
              fontWeight="bold"
            >
              {value}
            </text>
          </g>
        )}
      </svg>
    );
  };

  const renderThermometer = () => {
    const value = quest?.value ?? 0;
    const min = -10;
    const max = 10;
    const range = max - min;

    // Convert value to canvas position (inverted for thermometer)
    const valueToY = (v: number) => {
      return 180 - ((v - min) / range) * 140;
    };

    const mercuryHeight = 180 - valueToY(value);
    const mercuryColor = value < 0 ? "#00e5ff" : "#ff2d7d";

    return (
      <svg width={canvasSize} height={250} className="mx-auto bg-black/50 rounded-xl border border-white/10">
        {/* Thermometer tube */}
        <rect x="180" y="40" width="40" height="140" fill="#ffffff" fillOpacity="0.1" stroke="#ffffff" strokeWidth="2" rx="20" />

        {/* Bulb */}
        <circle cx="200" cy="190" r="25" fill="#ffffff" fillOpacity="0.1" stroke="#ffffff" strokeWidth="2" />

        {/* Mercury/Water */}
        <rect
          x="185"
          y={valueToY(value)}
          width="30"
          height={mercuryHeight}
          fill={mercuryColor}
          fillOpacity="0.6"
          rx="15"
        />
        <circle cx="200" cy="190" r="20" fill={mercuryColor} fillOpacity="0.6" />

        {/* Scale marks */}
        {Array.from({ length: 11 }, (_, i) => {
          const v = max - i * 2;
          const y = valueToY(v);
          const isFive = v % 5 === 0;

          return (
            <g key={i}>
              <line x1="220" y1={y} x2={isFive ? "235" : "228"} y2={y} stroke="#ffffff" strokeWidth="1" />
              {isFive && (
                <text x="245" y={y + 5} fill="#ffffff" fontSize="12">
                  {v}°C
                </text>
              )}
            </g>
          );
        })}

        {/* Current value label */}
        <text x="200" y="230" textAnchor="middle" fill={mercuryColor} fontSize="18" fontWeight="bold">
          {value}°C
        </text>
      </svg>
    );
  };

  const renderCoordinateGrid = () => {
    const x = quest?.x ?? 0;
    const y = quest?.y ?? 0;
    const gridSize = 10;
    const scale = (canvasSize - 80) / (2 * gridSize);

    // Convert coordinates to canvas position
    const toCanvas = (cx: number, cy: number) => ({
      x: canvasSize / 2 + cx * scale,
      y: canvasSize / 2 - cy * scale,
    });

    return (
      <svg width={canvasSize} height={canvasSize} className="mx-auto bg-black/50 rounded-xl border border-white/10">
        {/* Grid lines */}
        {Array.from({ length: 2 * gridSize + 1 }, (_, i) => {
          const v = i - gridSize;
          const pos = toCanvas(v, 0).x;
          const posY = toCanvas(0, v).y;

          return (
            <g key={i}>
              <line x1={pos} y1="20" x2={pos} y2={canvasSize - 20} stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" />
              <line x1="20" y1={posY} x2={canvasSize - 20} y2={posY} stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" />
            </g>
          );
        })}

        {/* Axes */}
        <line x1="20" y1={canvasSize / 2} x2={canvasSize - 20} y2={canvasSize / 2} stroke="#00e5ff" strokeWidth="2" />
        <line x1={canvasSize / 2} y1="20" x2={canvasSize / 2} y2={canvasSize - 20} stroke="#00e5ff" strokeWidth="2" />

        {/* Axis labels */}
        {Array.from({ length: 2 * gridSize + 1 }, (_, i) => {
          const v = i - gridSize;
          if (v === 0 || v % 2 !== 0) return null;

          const pos = toCanvas(v, 0);
          const posY = toCanvas(0, v);

          return (
            <g key={i}>
              <text x={pos.x} y={canvasSize / 2 + 20} textAnchor="middle" fill="#00e5ff" fontSize="10">
                {v}
              </text>
              <text x={canvasSize / 2 - 20} y={posY.y + 4} textAnchor="end" fill="#00e5ff" fontSize="10">
                {v}
              </text>
            </g>
          );
        })}

        {/* Point */}
        {x >= -gridSize && x <= gridSize && y >= -gridSize && y <= gridSize && (
          <g>
            <circle
              cx={toCanvas(x, y).x}
              cy={toCanvas(x, y).y}
              r="6"
              fill="#ff2d7d"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <text
              x={toCanvas(x, y).x + 15}
              y={toCanvas(x, y).y - 10}
              fill="#ff2d7d"
              fontSize="14"
              fontWeight="bold"
            >
              ({x}, {y})
            </text>
          </g>
        )}

        {/* Quadrant labels */}
        <text x={canvasSize * 0.75} y={canvasSize * 0.25} fill="#ffffff" fontSize="12" opacity="0.3">Q1</text>
        <text x={canvasSize * 0.25} y={canvasSize * 0.25} fill="#ffffff" fontSize="12" opacity="0.3">Q2</text>
        <text x={canvasSize * 0.25} y={canvasSize * 0.75} fill="#ffffff" fontSize="12" opacity="0.3">Q3</text>
        <text x={canvasSize * 0.75} y={canvasSize * 0.75} fill="#ffffff" fontSize="12" opacity="0.3">Q4</text>
      </svg>
    );
  };

  const visualization = useMemo(() => {
    const value = quest?.value ?? 0;
    const min = -10;
    const max = 10;
    const range = max - min;

    const valueToX = (v: number) => {
      return ((v - min) / range) * (canvasSize - 80) + 40;
    };

    if (stage === "NUMBER_LINE" || stage === "RATIONALS") {
      if (quest?.context?.toLowerCase().includes("temperature")) {
        const vToY = (v: number) => 180 - ((v - min) / range) * 140;
        const mercuryColor = value < 0 ? "#00e5ff" : "#ff2d7d";

        return (
          <svg width={canvasSize} height={250} className="mx-auto bg-black/50 rounded-xl border border-white/10">
            <rect x="180" y="40" width="40" height="140" fill="#ffffff" fillOpacity="0.1" stroke="#ffffff" strokeWidth="2" rx="20" />
            <circle cx="200" cy="190" r="25" fill="#ffffff" fillOpacity="0.1" stroke="#ffffff" strokeWidth="2" />
            <rect x="185" y={vToY(value)} width="30" height={180 - vToY(value)} fill={mercuryColor} fillOpacity="0.6" rx="15" />
            <circle cx="200" cy="190" r="20" fill={mercuryColor} fillOpacity="0.6" />
            {Array.from({ length: 11 }, (_, i) => {
              const v = max - i * 2;
              const y = vToY(v);
              const isFive = v % 5 === 0;
              return (
                <g key={i}>
                  <line x1="220" y1={y} x2={isFive ? "235" : "228"} y2={y} stroke="#ffffff" strokeWidth="1" />
                  {isFive && <text x="245" y={y + 5} fill="#ffffff" fontSize="12">{v}°C</text>}
                </g>
              );
            })}
            <text x="200" y="230" textAnchor="middle" fill={mercuryColor} fontSize="18" fontWeight="bold">{value}°C</text>
          </svg>
        );
      }

      return (
        <svg width={canvasSize} height={200} className="mx-auto bg-black/50 rounded-xl border border-white/10">
          <line x1="40" y1="100" x2={canvasSize - 40} y2="100" stroke="#ffffff" strokeWidth="2" />
          {Array.from({ length: 21 }, (_, i) => {
            const v = min + i;
            const x = valueToX(v);
            const isZero = v === 0;
            const isFive = v % 5 === 0;
            return (
              <g key={i}>
                <line x1={x} y1={isZero ? 85 : isFive ? 90 : 95} x2={x} y2={isZero ? 115 : isFive ? 110 : 105} stroke={isZero ? "#00e5ff" : "#ffffff"} strokeWidth={isZero ? 3 : 1} />
                {isFive && <text x={x} y="130" textAnchor="middle" fill={isZero ? "#00e5ff" : "#ffffff"} fontSize="12" fontWeight={isZero ? "bold" : "normal"}>{v}</text>}
              </g>
            );
          })}
          {value >= min && value <= max && (
            <g>
              <circle cx={valueToX(value)} cy="100" r="8" fill="#ff2d7d" stroke="#ffffff" strokeWidth="2" />
              <text x={valueToX(value)} y="70" textAnchor="middle" fill="#ff2d7d" fontSize="16" fontWeight="bold">{value}</text>
            </g>
          )}
        </svg>
      );
    } else if (stage === "QUADRANTS") {
      const x = quest?.x ?? 0;
      const y = quest?.y ?? 0;
      const gridSize = 10;
      const scale = (canvasSize - 80) / (2 * gridSize);
      const toCanvas = (cx: number, cy: number) => ({
        x: canvasSize / 2 + cx * scale,
        y: canvasSize / 2 - cy * scale,
      });

      return (
        <svg width={canvasSize} height={canvasSize} className="mx-auto bg-black/50 rounded-xl border border-white/10">
          {Array.from({ length: 2 * gridSize + 1 }, (_, i) => {
            const v = i - gridSize;
            const posX = toCanvas(v, 0).x;
            const posY = toCanvas(0, v).y;
            return (
              <g key={i}>
                <line x1={posX} y1="20" x2={posX} y2={canvasSize - 20} stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" />
                <line x1="20" y1={posY} x2={canvasSize - 20} y2={posY} stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" />
              </g>
            );
          })}
          <line x1="20" y1={canvasSize / 2} x2={canvasSize - 20} y2={canvasSize / 2} stroke="#00e5ff" strokeWidth="2" />
          <line x1={canvasSize / 2} y1="20" x2={canvasSize / 2} y2={canvasSize - 20} stroke="#00e5ff" strokeWidth="2" />
          {Array.from({ length: 2 * gridSize + 1 }, (_, i) => {
            const v = i - gridSize;
            if (v === 0 || v % 2 !== 0) return null;
            const pos = toCanvas(v, 0);
            const posY = toCanvas(0, v);
            return (
              <g key={i}>
                <text x={pos.x} y={canvasSize / 2 + 20} textAnchor="middle" fill="#00e5ff" fontSize="10">{v}</text>
                <text x={canvasSize / 2 - 20} y={posY.y + 4} textAnchor="end" fill="#00e5ff" fontSize="10">{v}</text>
              </g>
            );
          })}
          {x >= -gridSize && x <= gridSize && y >= -gridSize && y <= gridSize && (
            <g>
              <circle cx={toCanvas(x, y).x} cy={toCanvas(x, y).y} r="6" fill="#ff2d7d" stroke="#ffffff" strokeWidth="2" />
              <text x={toCanvas(x, y).x + 15} y={toCanvas(x, y).y - 10} fill="#ff2d7d" fontSize="14" fontWeight="bold">({x}, {y})</text>
            </g>
          )}
        </svg>
      );
    }
    return null;
  }, [stage, quest, canvasSize]);

  return (
    <div className="space-y-4">
      {visualization}
      <div className="text-center text-xs text-white/50 uppercase tracking-wider">
        {stage === "NUMBER_LINE" && "INTEGER NUMBER LINE"}
        {stage === "RATIONALS" && "RATIONAL NUMBER LINE"}
        {stage === "QUADRANTS" && "COORDINATE PLANE"}
      </div>
    </div>
  );
}
