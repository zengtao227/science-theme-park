"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface SequenceVisualizationProps {
  quest: any;
  inputs: Record<string, string>;
  checkStatus: { ok: boolean; correct: string } | null;
}

export default function SequenceVisualization({
  quest,
  inputs,
  checkStatus,
}: SequenceVisualizationProps) {
  const sequenceData = useMemo(() => {
    if (!quest) return null;

    const stage = quest.stage;
    const expr = quest.expressionLatex || "";
    
    // Parse values from expression
    const a1Match = expr.match(/a_1\s*=\s*(-?\d+)/);
    const dMatch = expr.match(/d\s*=\s*(-?\d+)/);
    const rMatch = expr.match(/r\s*=\s*(-?\d+)/);
    const nMatch = expr.match(/n\s*=\s*(-?\d+)/);

    const a1 = a1Match ? parseInt(a1Match[1]) : 1;
    const d = dMatch ? parseInt(dMatch[1]) : 1;
    const r = rMatch ? parseInt(rMatch[1]) : 2;
    const n = nMatch ? parseInt(nMatch[1]) : 5;

    // Generate sequence terms
    const terms: number[] = [];
    for (let i = 0; i < Math.min(n, 10); i++) {
      if (stage === "ARITHMETIC") {
        terms.push(a1 + i * d);
      } else if (stage === "GEOMETRIC") {
        terms.push(a1 * Math.pow(r, i));
      } else {
        terms.push(a1 + i * d);
      }
    }

    return { stage, terms, a1, d, r, n };
  }, [quest]);

  if (!quest || !sequenceData) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
        No data
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 p-6">
      {/* Sequence visualization */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex gap-3 flex-wrap justify-center max-w-full">
          {sequenceData.terms.map((term, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 200 }}
              className={`relative ${
                idx === sequenceData.n - 1
                  ? "border-4 border-green-400 bg-green-900/30"
                  : "border-2 border-cyan-400/50 bg-cyan-900/20"
              } rounded-lg p-4 min-w-[80px]`}
            >
              <div className="text-xs text-white/60 text-center mb-1">a_{idx + 1}</div>
              <div className="text-2xl font-bold text-white text-center">{term}</div>
              {idx === sequenceData.n - 1 && (
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-black text-xs font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          ))}
          
          {sequenceData.terms.length < sequenceData.n && (
            <div className="flex items-center justify-center px-4">
              <div className="text-white/40 text-2xl">...</div>
            </div>
          )}
        </div>
      </div>

      {/* Pattern indicator */}
      <div className="border-t border-white/10 pt-4">
        <div className="text-center space-y-2">
          <div className="text-xs text-white/40 uppercase tracking-widest">Pattern</div>
          <div className="text-sm text-cyan-300 font-mono">
            {sequenceData.stage === "ARITHMETIC" && `d = ${sequenceData.d} (add ${sequenceData.d})`}
            {sequenceData.stage === "GEOMETRIC" && `r = ${sequenceData.r} (multiply by ${sequenceData.r})`}
            {sequenceData.stage === "SERIES" && `Sum of ${sequenceData.n} terms`}
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="text-xs text-white/60 font-mono text-center">
        {checkStatus ? (
          checkStatus.ok ? (
            <span className="text-green-400">✓ SEQUENCE VERIFIED</span>
          ) : (
            <span className="text-pink-400">✗ CHECK CALCULATION</span>
          )
        ) : (
          "ANALYZE SEQUENCE"
        )}
      </div>
    </div>
  );
}
