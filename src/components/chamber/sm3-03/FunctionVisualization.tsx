"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface FunctionVisualizationProps {
  quest: any;
  inputs: Record<string, string>;
  checkStatus: { ok: boolean; correct: string } | null;
}

export default function FunctionVisualization({
  quest,
  inputs,
  checkStatus,
}: FunctionVisualizationProps) {
  // Generate function curve
  const curveData = useMemo(() => {
    if (!quest) return { points: "", type: "exponential" };

    const stage = quest.stage || "EXPONENTIAL";
    const xMin = -3;
    const xMax = 3;
    const step = 0.1;
    const points: string[] = [];

    for (let x = xMin; x <= xMax; x += step) {
      let y = 0;
      
      if (stage === "EXPONENTIAL" || stage.includes("EXP")) {
        y = Math.pow(2, x);
      } else if (stage === "LOGARITHMIC" || stage.includes("LOG")) {
        y = x > 0 ? Math.log2(x) : 0;
      } else {
        y = Math.pow(2, x); // default
      }

      const sx = 300 + x * 80;
      const sy = 200 - y * 30;
      
      if (sy >= 0 && sy <= 400) {
        points.push(`${sx},${sy}`);
      }
    }

    return {
      points: points.join(" "),
      type: stage.includes("LOG") ? "logarithmic" : "exponential"
    };
  }, [quest]);

  if (!quest) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
        No data
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex-1 relative bg-black/20 rounded-lg border border-white/10 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 600 400" className="absolute inset-0">
          {/* Grid */}
          {Array.from({ length: 13 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={i * 50}
              y1={0}
              x2={i * 50}
              y2={400}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={i * 50}
              x2={600}
              y2={i * 50}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}

          {/* Axes */}
          <line x1={0} y1={200} x2={600} y2={200} stroke="#00e5ff" strokeWidth="2" />
          <line x1={300} y1={0} x2={300} y2={400} stroke="#00e5ff" strokeWidth="2" />

          {/* Function curve */}
          <motion.polyline
            points={curveData.points}
            fill="none"
            stroke="#39ff14"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Asymptote for logarithmic */}
          {curveData.type === "logarithmic" && (
            <line
              x1={300}
              y1={0}
              x2={300}
              y2={400}
              stroke="#ff2d7d"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.5"
            />
          )}

          {/* Point markers */}
          {checkStatus?.ok && (
            <>
              <motion.circle
                cx={380}
                cy={140}
                r="6"
                fill="#ff2d7d"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              />
              <motion.circle
                cx={380}
                cy={140}
                r="12"
                fill="none"
                stroke="#ff2d7d"
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 }}
              />
            </>
          )}

          {/* Labels */}
          <text x="580" y="195" fill="#00e5ff" fontSize="14" fontFamily="monospace">x</text>
          <text x="305" y="20" fill="#00e5ff" fontSize="14" fontFamily="monospace">y</text>
          
          {/* Function type label */}
          <text x="20" y="30" fill="#39ff14" fontSize="12" fontFamily="monospace">
            {curveData.type === "exponential" ? "y = 2^x" : "y = log₂(x)"}
          </text>
        </svg>
      </div>

      <div className="text-xs text-white/60 font-mono text-center">
        {checkStatus ? (
          checkStatus.ok ? (
            <span className="text-green-400">✓ FUNCTION VERIFIED</span>
          ) : (
            <span className="text-pink-400">✗ CHECK CALCULATION</span>
          )
        ) : (
          "ANALYZE FUNCTION"
        )}
      </div>
    </div>
  );
}
