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

export default function S301_QuadraticCanvas({ quest, labels }: { quest: CanvasQuest; labels: CanvasLabels }) {
    if (!quest) return null;

    return (
        <div className="w-full h-full relative flex flex-col items-center justify-center p-6 z-0">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-green-500/5 blur-[100px] rounded-full" />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] border border-white/5 rounded-full animate-spin"
                    style={{ animationDuration: '40s' }}
                />
            </div>

            <div className="relative z-10 w-full max-w-sm space-y-6">
                {/* Title */}
                <div className="text-center space-y-3">
                    <div className="text-[9px] uppercase tracking-[0.4em] font-black text-white/50">
                        {labels.target}
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={quest.id}
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
                            transition={{ duration: 0.3 }}
                            className="text-3xl sm:text-4xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] py-2"
                        >
                            <InlineMath math={quest.expressionLatex} />
                        </motion.div>
                    </AnimatePresence>

                    <motion.div
                        key={`${quest.id}-prompt`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-green-400/90"
                    >
                        <InlineMath math={quest.promptLatex} />
                    </motion.div>
                </div>

                {/* Hints */}
                <AnimatePresence>
                    {quest.hintLatex && quest.hintLatex.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="bg-black/40 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md w-full"
                        >
                            <div className="px-4 py-2 bg-white/[0.02] border-b border-white/5 flex items-center gap-2">
                                <div className="w-1 h-1 bg-green-500/50 rounded-full animate-pulse" />
                                <span className="text-[8px] uppercase tracking-[0.25em] font-black text-white/40">{labels.hints}</span>
                            </div>
                            <div className="p-4 space-y-3">
                                {quest.hintLatex.slice(0, 3).map((hint, idx) => (
                                    <motion.div
                                        key={`${quest.id}-h-${idx}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.1 }}
                                        className="flex gap-3 text-xs text-white/70 items-start"
                                    >
                                        <span className="font-mono text-[9px] text-white/20 pt-1">{(idx + 1).toString().padStart(2, '0')}</span>
                                        <div className="flex-1 leading-relaxed">
                                            <InlineMath math={hint} />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
