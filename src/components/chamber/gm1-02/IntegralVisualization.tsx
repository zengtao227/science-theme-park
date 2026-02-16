"use client";

import { useMemo } from "react";

interface IntegralQuest {
  id: string;
  stage: "ANTIDERIVATIVE" | "DEFINITE_INTEGRAL" | "APPLICATION";
  functionCoeffs: number[];
  lowerBound?: number;
  upperBound?: number;
  expressionLatex?: string;
}

interface IntegralVisualizationProps {
  quest: IntegralQuest | null;
  inputs: Record<string, string>;
  checkStatus: { ok: boolean; correct: string } | null;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

export default function IntegralVisualization({
  quest,
  inputs,
  checkStatus,
}: IntegralVisualizationProps) {
  // Calculate bounds with 50% padding
  const bounds = useMemo(() => {
    if (!quest) return { xMin: -5, xMax: 5, yMin: -3, yMax: 5 };

    const xMin = quest.lowerBound !== undefined ? quest.lowerBound : -3;
    const xMax = quest.upperBound !== undefined ? quest.upperBound : 3;

    // Calculate y values for the function
    const evaluateFunction = (x: number) => {
      let sum = 0;
      for (let i = 0; i < quest.functionCoeffs.length; i++) {
        sum += quest.functionCoeffs[i] * Math.pow(x, i);
      }
      return sum;
    };

    // Sample points to find y range
    const yValues: number[] = [];
    for (let x = xMin; x <= xMax; x += 0.1) {
      yValues.push(evaluateFunction(x));
    }

    const yMin = Math.min(...yValues, 0);
    const yMax = Math.max(...yValues, 0);

    // Add 50% padding
    const xRange = xMax - xMin;
    const yRange = Math.max(yMax - yMin, 1);

    return {
      xMin: xMin - xRange * 0.5,
      xMax: xMax + xRange * 0.5,
      yMin: yMin - yRange * 0.5,
      yMax: yMax + yRange * 0.5,
    };
  }, [quest]);

  // SVG dimensions
  const width = 600;
  const height = 400;
  const padding = 40;

  // Scale functions
  const scaleX = (x: number) => {
    return padding + ((x - bounds.xMin) / (bounds.xMax - bounds.xMin)) * (width - 2 * padding);
  };

  const scaleY = (y: number) => {
    return height - padding - ((y - bounds.yMin) / (bounds.yMax - bounds.yMin)) * (height - 2 * padding);
  };

  // Generate function curve points
  const curvePoints = useMemo(() => {
    if (!quest) return "";

    const evaluateFunction = (x: number) => {
      let sum = 0;
      for (let i = 0; i < quest.functionCoeffs.length; i++) {
        sum += quest.functionCoeffs[i] * Math.pow(x, i);
      }
      return sum;
    };

    const points: string[] = [];
    const step = (bounds.xMax - bounds.xMin) / 200;

    for (let x = bounds.xMin; x <= bounds.xMax; x += step) {
      const y = evaluateFunction(x);
      points.push(`${scaleX(x)},${scaleY(y)}`);
    }

    return points.join(" ");
  }, [quest, bounds]);

  // Generate shaded area for definite integrals
  const shadedAreaPath = useMemo(() => {
    if (!quest || quest.stage === "ANTIDERIVATIVE") return "";
    if (quest.lowerBound === undefined || quest.upperBound === undefined) return "";

    const evaluateFunction = (x: number) => {
      let sum = 0;
      for (let i = 0; i < quest.functionCoeffs.length; i++) {
        sum += quest.functionCoeffs[i] * Math.pow(x, i);
      }
      return sum;
    };

    const points: string[] = [];
    const step = (quest.upperBound - quest.lowerBound) / 100;

    // Start from x-axis at lower bound
    points.push(`${scaleX(quest.lowerBound)},${scaleY(0)}`);

    // Trace the function curve
    for (let x = quest.lowerBound; x <= quest.upperBound; x += step) {
      const y = evaluateFunction(x);
      points.push(`${scaleX(x)},${scaleY(y)}`);
    }

    // Close the path back to x-axis
    points.push(`${scaleX(quest.upperBound)},${scaleY(0)}`);

    return points.join(" ");
  }, [quest, bounds]);

  if (!quest) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
        No question data available
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* Visualization canvas */}
      <div className="flex-1 relative">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          className="bg-black/20 rounded-lg border border-white/10"
        >
          {/* Grid lines */}
          {Array.from({ length: 11 }, (_, i) => {
            const x = padding + (i * (width - 2 * padding)) / 10;
            return (
              <line
                key={`vgrid-${i}`}
                x1={x}
                y1={padding}
                x2={x}
                y2={height - padding}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            );
          })}
          {Array.from({ length: 11 }, (_, i) => {
            const y = padding + (i * (height - 2 * padding)) / 10;
            return (
              <line
                key={`hgrid-${i}`}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            );
          })}

          {/* X-axis */}
          <line
            x1={padding}
            y1={scaleY(0)}
            x2={width - padding}
            y2={scaleY(0)}
            stroke="#00e5ff"
            strokeWidth="2"
          />

          {/* Y-axis */}
          <line
            x1={scaleX(0)}
            y1={padding}
            x2={scaleX(0)}
            y2={height - padding}
            stroke="#00e5ff"
            strokeWidth="2"
          />

          {/* Shaded area for definite integrals */}
          {shadedAreaPath && (
            <polygon
              points={shadedAreaPath}
              fill="#39ff14"
              fillOpacity="0.2"
              stroke="#39ff14"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
          )}

          {/* Vertical bounds lines for definite integrals */}
          {quest.lowerBound !== undefined && quest.upperBound !== undefined && (
            <>
              <line
                x1={scaleX(quest.lowerBound)}
                y1={padding}
                x2={scaleX(quest.lowerBound)}
                y2={height - padding}
                stroke="#ff2d7d"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <line
                x1={scaleX(quest.upperBound)}
                y1={padding}
                x2={scaleX(quest.upperBound)}
                y2={height - padding}
                stroke="#ff2d7d"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              {/* Bound labels */}
              <text
                x={scaleX(quest.lowerBound)}
                y={height - padding + 20}
                fill="#ff2d7d"
                fontSize="12"
                textAnchor="middle"
                fontFamily="monospace"
              >
                a={quest.lowerBound}
              </text>
              <text
                x={scaleX(quest.upperBound)}
                y={height - padding + 20}
                fill="#ff2d7d"
                fontSize="12"
                textAnchor="middle"
                fontFamily="monospace"
              >
                b={quest.upperBound}
              </text>
            </>
          )}

          {/* Function curve */}
          <polyline
            points={curvePoints}
            fill="none"
            stroke="#00e5ff"
            strokeWidth="3"
          />

          {/* Axis labels */}
          <text
            x={width - padding + 15}
            y={scaleY(0) + 5}
            fill="#00e5ff"
            fontSize="14"
            fontFamily="monospace"
          >
            x
          </text>
          <text
            x={scaleX(0) + 5}
            y={padding - 10}
            fill="#00e5ff"
            fontSize="14"
            fontFamily="monospace"
          >
            y
          </text>
        </svg>
      </div>

      {/* Status indicator */}
      <div className="text-xs text-white/60 font-mono text-center">
        {checkStatus ? (
          checkStatus.ok ? (
            <span className="text-green-400">✓ VERIFIED</span>
          ) : (
            <span className="text-pink-400">✗ MISMATCH</span>
          )
        ) : (
          "READY"
        )}
      </div>
    </div>
  );
}
