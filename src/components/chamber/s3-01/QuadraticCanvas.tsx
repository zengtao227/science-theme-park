"use client";

import React from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { motion, AnimatePresence } from "framer-motion";

export type CanvasQuest = {
    id: string;
    expressionLatex: string;
    promptLatex: string;
    hintLatex?: string[];
}

export type CanvasLabels = {
    target: string;
    hints: string;
}

function NeonParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-neon-cyan/40 rounded-full"
                    initial={{
                        x: Math.random() * 300 - 150,
                        y: Math.random() * 300 - 150,
                        opacity: 0
                    }}
                    animate={{
                        y: [null, Math.random() * -100],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 2
                    }}
                    style={{
                        left: '50%',
                        top: '50%'
                    }}
                />
            ))}
        </div>
    );
}

function SolverStep({ math, index }: { math: string, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="group flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/5"
        >
            <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[9px] font-mono text-white/30 group-hover:text-neon-cyan group-hover:border-neon-cyan/50 transition-colors">
                {index + 1}
            </div>
            <div className="text-sm text-white/80 font-medium group-hover:text-white transition-colors">
                <InlineMath math={math} />
            </div>
        </motion.div>
    );
}

export default function S301_QuadraticCanvas({ quest, labels }: { quest: CanvasQuest; labels: CanvasLabels }) {
    if (!quest) return null;

    return (
        <div className="w-full h-full relative flex flex-col items-center justify-center p-6 overflow-hidden bg-[#050505] rounded-xl border border-white/10 shadow-inner">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-neon-purple/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center" />
                <NeonParticles />
            </div>

            {/* Central HUD */}
            <div className="relative z-10 w-full max-w-md space-y-8">
                {/* Main Equation Display */}
                <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-neon-purple/0 via-neon-purple/10 to-neon-purple/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-center space-y-2 relative">
                        <div className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 group-hover:text-neon-cyan/80 transition-colors">
                            {labels.target}
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={quest.id}
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="text-4xl sm:text-5xl font-black text-white py-4"
                            >
                                <InlineMath math={quest.expressionLatex} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Solving Steps / Hints Panel */}
                <AnimatePresence>
                    {quest.hintLatex && quest.hintLatex.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="bg-black/40 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md relative"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-neon-purple to-transparent opacity-50" />

                            <div className="px-5 py-3 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-neon-purple rounded-full animate-pulse" />
                                    <span className="text-[9px] uppercase tracking-[0.25em] font-black text-white/50">{labels.hints}</span>
                                </div>
                                <div className="text-[9px] font-mono text-white/20">AI_SOLVER_MODULE</div>
                            </div>

                            <div className="p-4 space-y-1">
                                {quest.hintLatex.map((hint, idx) => (
                                    <SolverStep key={`${quest.id}-step-${idx}`} math={hint} index={idx} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Decorative Overlay */}
            <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 text-right pointer-events-none">
                SYS.QUAD_SOLVER // v3.1<br />
                READY
            </div>
        </div>
    );
}
