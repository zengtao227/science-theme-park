"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface AlgebraVisualizationProps {
  quest: any;
  inputs: Record<string, string>;
  checkStatus: { ok: boolean; correct: string } | null;
}

export default function AlgebraVisualization({
  quest,
  inputs,
  checkStatus,
}: AlgebraVisualizationProps) {
  const balanceState = useMemo(() => {
    if (!quest?.equation) return { left: 0, right: 0 };
    
    // Parse simple equations for visualization
    const parts = quest.equation.split('=');
    if (parts.length !== 2) return { left: 0, right: 0 };
    
    // Simple evaluation for visualization purposes
    const leftSide = quest.leftSide || 5;
    const rightSide = quest.rightSide || 5;
    
    return { left: leftSide, right: rightSide };
  }, [quest]);

  const isBalanced = Math.abs(balanceState.left - balanceState.right) < 0.1;

  if (!quest) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
        No data
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex-1 relative bg-black/20 rounded-lg border border-white/10 overflow-hidden p-6">
        {/* Balance Scale */}
        <div className="w-full h-full flex flex-col items-center justify-center">
          {/* Fulcrum */}
          <div className="relative w-full max-w-md">
            {/* Balance Beam */}
            <motion.div
              className="w-full h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full relative"
              animate={{
                rotate: isBalanced ? 0 : (balanceState.left > balanceState.right ? -5 : 5)
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Left Pan */}
              <motion.div
                className="absolute left-0 top-4 w-24 h-24 border-4 border-cyan-400 rounded-lg bg-cyan-900/30 flex items-center justify-center"
                animate={{
                  y: isBalanced ? 0 : (balanceState.left > balanceState.right ? -10 : 10)
                }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-300">{balanceState.left}</div>
                  <div className="text-xs text-cyan-400">LEFT</div>
                </div>
              </motion.div>

              {/* Right Pan */}
              <motion.div
                className="absolute right-0 top-4 w-24 h-24 border-4 border-purple-400 rounded-lg bg-purple-900/30 flex items-center justify-center"
                animate={{
                  y: isBalanced ? 0 : (balanceState.right > balanceState.left ? -10 : 10)
                }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-300">{balanceState.right}</div>
                  <div className="text-xs text-purple-400">RIGHT</div>
                </div>
              </motion.div>

              {/* Center Pivot */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white/40" />
            </motion.div>

            {/* Operation Display */}
            {quest.operation && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 -top-12 px-4 py-2 bg-green-500/20 border border-green-400 rounded-lg"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-green-300 font-mono text-sm">{quest.operation}</div>
              </motion.div>
            )}
          </div>

          {/* Balance Status */}
          <motion.div
            className="mt-32 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {isBalanced ? (
              <div className="text-green-400 font-bold text-lg">⚖️ BALANCED</div>
            ) : (
              <div className="text-amber-400 font-bold text-lg">⚠️ UNBALANCED</div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="text-xs text-white/60 font-mono text-center">
        {checkStatus ? (
          checkStatus.ok ? (
            <span className="text-green-400">✓ EQUATION SOLVED</span>
          ) : (
            <span className="text-pink-400">✗ TRY AGAIN</span>
          )
        ) : (
          "SOLVE FOR X"
        )}
      </div>
    </div>
  );
}
