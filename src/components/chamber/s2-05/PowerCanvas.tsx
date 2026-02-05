"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export interface PowerVisual {
    base: number;
    exponent: number;
    mode: 'dimension' | 'growth' | 'root';
}

export default function S205_PowerCanvas({ visual }: { visual?: PowerVisual }) {
    if (!visual) return null;

    return (
        <div className="relative w-full aspect-square max-w-[500px] bg-[#050505] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center" />

            <AnimatePresence mode="wait">
                <motion.div
                    key={`${visual.base}-${visual.exponent}-${visual.mode}`}
                    className="relative flex items-center justify-center w-full h-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {visual.mode === 'dimension' && (
                        <DimensionView base={visual.base} exp={visual.exponent} />
                    )}
                    {visual.mode === 'growth' && (
                        <GrowthView base={visual.base} exp={visual.exponent} />
                    )}
                    {visual.mode === 'root' && (
                        <RootView base={visual.base} exp={visual.exponent} />
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="absolute top-4 left-4 flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-purple animate-pulse" />
                <span className="text-[8px] font-mono text-white/40 tracking-[0.3em] uppercase">Exponential_Matrix v2.0</span>
            </div>

            <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 text-right">
                CHAMBER // S2.05<br />
                SCALING: POWER_LAW
            </div>
        </div>
    );
}

function DimensionView({ base, exp }: { base: number, exp: number }) {
    // Limited to 0-3 for visual clarity
    const displayExp = Math.min(3, Math.max(0, exp));

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {displayExp === 0 && (
                <motion.div
                    className="w-4 h-4 rounded-full bg-white shadow-[0_0_20px_white]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                />
            )}

            {displayExp === 1 && (
                <motion.div
                    className="h-[2px] bg-neon-cyan shadow-[0_0_15px_#00e5ff]"
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                />
            )}

            {displayExp === 2 && (
                <motion.div
                    className="w-48 h-48 border-2 border-neon-cyan bg-neon-cyan/10 shadow-[0_0_25px_rgba(0,229,255,0.3)]"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                />
            )}

            {displayExp === 3 && (
                <div className="relative w-48 h-48 transform -rotate-12">
                    {/* Back Layer */}
                    <div className="absolute top-[-20px] left-[20px] w-full h-full border-2 border-neon-purple/50 bg-neon-purple/5" />
                    {/* Connecting Lines (Simulated) */}
                    <div className="absolute top-[-20px] left-[20px] w-full h-full border-l-2 border-t-2 border-white/20" />
                    {/* Front Layer */}
                    <div className="absolute top-0 left-0 w-full h-full border-2 border-neon-purple bg-neon-purple/20 shadow-[0_0_30px_rgba(168,85,247,0.4)]" />
                </div>
            )}
        </div>
    );
}

function GrowthView({ base, exp }: { base: number, exp: number }) {
    // Show a population or fractal growth
    const count = Math.min(64, Math.pow(base, Math.abs(exp)));

    return (
        <div className="grid grid-cols-8 gap-2 max-w-[320px]">
            {Array.from({ length: Math.ceil(count) }).map((_, i) => (
                <motion.div
                    key={i}
                    className="w-4 h-4 bg-neon-cyan rounded-sm"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.01 }}
                    style={{
                        boxShadow: "0 0 10px rgba(0,229,255,0.5)"
                    }}
                />
            ))}
        </div>
    );
}

function RootView({ base, exp }: { base: number, exp: number }) {
    // Visualizing the extraction of a core from a block
    return (
        <div className="flex flex-col items-center gap-8">
            <div className="relative">
                <div className="w-32 h-32 border-2 border-white/10 flex items-center justify-center">
                    <motion.div
                        className="w-16 h-16 bg-neon-green shadow-[0_0_30px_#39ff14]"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 90, 180, 270, 360]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                </div>
                <div className="absolute -top-4 -left-4 font-mono text-neon-green text-2xl font-black italic">
                    √
                </div>
            </div>
            <div className="text-white/40 font-mono text-[10px] tracking-widest uppercase">
                EXTRACTING_RADICAL_VAL
            </div>
        </div>
    );
}
