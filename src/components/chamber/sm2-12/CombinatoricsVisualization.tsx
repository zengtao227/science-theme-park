"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface CombinatoricsVisualizationProps {
  quest: any;
  inputs: Record<string, string>;
  checkStatus: { ok: boolean; correct: string } | null;
}

export default function CombinatoricsVisualization({
  quest,
  inputs,
  checkStatus,
}: CombinatoricsVisualizationProps) {
  const visualData = useMemo(() => {
    if (!quest) return null;

    const stage = quest.stage;
    const expr = quest.expressionLatex || "";
    
    // Parse n and r from expression
    const nMatch = expr.match(/[PC]\((\d+),\s*(\d+)\)/) || expr.match(/n\s*=\s*(\d+)/);
    const rMatch = expr.match(/r\s*=\s*(\d+)/);
    
    const n = nMatch ? parseInt(nMatch[1]) : 5;
    const r = rMatch ? parseInt(rMatch[1]) : (nMatch && nMatch[2] ? parseInt(nMatch[2]) : 2);

    return { stage, n, r };
  }, [quest]);

  const renderVisualization = () => {
    if (!visualData) return null;

    const { stage, n, r } = visualData;
    const displayN = Math.min(n, 8); // Limit display for large numbers
    const displayR = Math.min(r, displayN);

    if (stage === "PERMUTATIONS") {
      return (
        <div className="space-y-6">
          <div className="text-center text-sm text-cyan-300">
            Arrange {displayR} items from {displayN} (order matters)
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {Array.from({ length: displayN }, (_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
                  i < displayR
                    ? "bg-green-500 text-white border-2 border-green-300"
                    : "bg-gray-700 text-gray-400 border-2 border-gray-600"
                }`}
              >
                {i + 1}
              </motion.div>
            ))}
          </div>
          <div className="text-center text-xs text-white/60">
            Selected: {displayR} / {displayN}
          </div>
        </div>
      );
    }

    if (stage === "COMBINATIONS") {
      return (
        <div className="space-y-6">
          <div className="text-center text-sm text-purple-300">
            Choose {displayR} items from {displayN} (order doesn't matter)
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {Array.from({ length: displayN }, (_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  i < displayR
                    ? "bg-purple-500 text-white border-2 border-purple-300"
                    : "bg-gray-700 text-gray-400 border-2 border-gray-600"
                }`}
              >
                {String.fromCharCode(65 + i)}
              </motion.div>
            ))}
          </div>
          <div className="text-center text-xs text-white/60">
            Selected: {displayR} / {displayN}
          </div>
        </div>
      );
    }

    // PROBABILITY
    return (
      <div className="space-y-6">
        <div className="text-center text-sm text-amber-300">
          Probability with {displayN} total outcomes
        </div>
        <div className="relative w-full h-32">
          <svg width="100%" height="100%" viewBox="0 0 400 120">
            {/* Probability bar */}
            <rect x="50" y="40" width="300" height="40" fill="#1a1a1a" stroke="#444" strokeWidth="2" rx="4" />
            
            {/* Filled portion */}
            <motion.rect
              x="50"
              y="40"
              width={Math.min((displayR / displayN) * 300, 300)}
              height="40"
              fill="#fbbf24"
              initial={{ width: 0 }}
              animate={{ width: Math.min((displayR / displayN) * 300, 300) }}
              transition={{ duration: 1, ease: "easeOut" }}
              rx="4"
            />
            
            {/* Labels */}
            <text x="50" y="30" fill="#fbbf24" fontSize="12" fontFamily="monospace">0</text>
            <text x="340" y="30" fill="#fbbf24" fontSize="12" fontFamily="monospace">1.0</text>
            <text x="200" y="105" fill="#fbbf24" fontSize="14" fontFamily="monospace" textAnchor="middle">
              P = {(displayR / displayN).toFixed(3)}
            </text>
          </svg>
        </div>
        <div className="text-center text-xs text-white/60">
          Favorable: {displayR} / Total: {displayN}
        </div>
      </div>
    );
  };

  if (!quest || !visualData) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
        No data
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 p-6">
      <div className="flex-1 flex items-center justify-center">
        {renderVisualization()}
      </div>

      {/* Status */}
      <div className="text-xs text-white/60 font-mono text-center">
        {checkStatus ? (
          checkStatus.ok ? (
            <span className="text-green-400">✓ CALCULATION VERIFIED</span>
          ) : (
            <span className="text-pink-400">✗ CHECK FORMULA</span>
          )
        ) : (
          "CALCULATE RESULT"
        )}
      </div>
    </div>
  );
}
