"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface CalculusVisualizationProps {
  quest: any;
  inputs: Record<string, string>;
  checkStatus: { ok: boolean; correct: string } | null;
}

export default function CalculusVisualization({
  quest,
  inputs,
  checkStatus,
}: CalculusVisualizationProps) {
  // Parse function from LaTeX
  const functionData = useMemo(() => {
    if (!quest?.functionLatex) return null;
    
    // Extract coefficients and function type
    const latex = quest.functionLatex;
    return {
      latex,
      type: latex.includes("\\sin") ? "trig" : latex.includes("\\cos") ? "trig" : "polynomial"
    };
  }, [quest]);

  // Generate curve points
  const curvePoints = useMemo(() => {
    if (!functionData) return "";
    
    const points: string[] = [];
    const xMin = -2;
    const xMax = 4;
    const step = 0.05;
    
    for (let x = xMin; x <= xMax; x += step) {
      // Simple evaluation for visualization
      let y = 0;
      if (functionData.type === "trig") {
        y = (x * x + x) * Math.sin(x);
      } else {
        y = x * x - 2 * x + 1;
      }
      
      const sx = 50 + ((x - xMin) / (xMax - xMin)) * 500;
      const sy = 300 - y * 30;
      points.push(`${sx},${sy}`);
    }
    
    return points.join(" ");
  }, [functionData]);

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
          {Array.from({ length: 11 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={50 + i * 50}
              y1={50}
              x2={50 + i * 50}
              y2={350}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <line
              key={`h${i}`}
              x1={50}
              y1={50 + i * 50}
              x2={550}
              y2={50 + i * 50}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}
          
          {/* Axes */}
          <line x1={50} y1={200} x2={550} y2={200} stroke="#00e5ff" strokeWidth="2" />
          <line x1={300} y1={50} x2={300} y2={350} stroke="#00e5ff" strokeWidth="2" />
          
          {/* Function curve */}
          <motion.polyline
            points={curvePoints}
            fill="none"
            stroke="#39ff14"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Derivative indicator */}
          {checkStatus?.ok && (
            <motion.circle
              cx={350}
              cy={150}
              r="8"
              fill="#ff2d7d"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            />
          )}
          
          {/* Labels */}
          <text x={540} y={205} fill="#00e5ff" fontSize="14" fontFamily="monospace">x</text>
          <text x={305} y={60} fill="#00e5ff" fontSize="14" fontFamily="monospace">y</text>
        </svg>
      </div>
      
      <div className="text-xs text-white/60 font-mono text-center">
        {checkStatus ? (
          checkStatus.ok ? (
            <span className="text-green-400">✓ DERIVATIVE VERIFIED</span>
          ) : (
            <span className="text-pink-400">✗ CHECK CALCULATION</span>
          )
        ) : (
          "READY TO ANALYZE"
        )}
      </div>
    </div>
  );
}
