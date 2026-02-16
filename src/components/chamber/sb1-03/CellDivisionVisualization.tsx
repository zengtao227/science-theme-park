"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CellDivisionVisualizationProps {
    quest: any;
    stage: "MITOSIS" | "MEIOSIS_I" | "MEIOSIS_II";
    translations: any;
}

// Chromosome component for detailed visualization
const Chromosome = ({ 
    x, 
    y, 
    paired = false, 
    color = "emerald", 
    delay = 0 
}: { 
    x: number; 
    y: number; 
    paired?: boolean; 
    color?: string; 
    delay?: number;
}) => {
    const colorClass = color === "emerald" ? "bg-neon-emerald" : "bg-emerald-400";
    const shadowClass = color === "emerald" ? "shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "shadow-[0_0_6px_rgba(52,211,153,0.4)]";
    
    return (
        <motion.div
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, x, y }}
            transition={{ duration: 0.6, delay }}
        >
            {paired ? (
                // Sister chromatids (X shape)
                <div className="relative w-4 h-4">
                    <motion.div 
                        className={`absolute w-1 h-4 ${colorClass} ${shadowClass} rounded-full`}
                        style={{ left: '25%', transform: 'rotate(15deg)' }}
                        animate={{ rotate: [15, 20, 15] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div 
                        className={`absolute w-1 h-4 ${colorClass} ${shadowClass} rounded-full`}
                        style={{ right: '25%', transform: 'rotate(-15deg)' }}
                        animate={{ rotate: [-15, -20, -15] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                    />
                    {/* Centromere */}
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-emerald-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_6px_rgba(110,231,183,0.8)]" />
                </div>
            ) : (
                // Single chromatid (I shape)
                <motion.div 
                    className={`w-1 h-4 ${colorClass} ${shadowClass} rounded-full`}
                    animate={{ scaleY: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay }}
                />
            )}
        </motion.div>
    );
};

// Render phase-specific chromosome arrangements
const renderPhaseVisualization = (phase: string, stage: string, chromosomeCount: number) => {
    const phaseLower = phase.toLowerCase();
    
    // MITOSIS phases
    if (stage === "MITOSIS") {
        if (phaseLower.includes("prophase")) {
            // Prophase: Chromosomes condense, visible as X shapes
            return (
                <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div
                        className="relative w-40 h-40 rounded-full border-2 border-neon-emerald/30 bg-emerald-500/5"
                        animate={{ borderColor: ["rgba(16,185,129,0.3)", "rgba(16,185,129,0.5)", "rgba(16,185,129,0.3)"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        {/* Nuclear envelope breaking down */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-400/40"
                            animate={{ opacity: [0.4, 0.1, 0.4], scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        {/* Condensed chromosomes scattered */}
                        {Array.from({ length: 6 }).map((_, i) => {
                            const angle = (i * 60) * Math.PI / 180;
                            const radius = 25;
                            return (
                                <Chromosome
                                    key={i}
                                    x={Math.cos(angle) * radius}
                                    y={Math.sin(angle) * radius}
                                    paired={true}
                                    delay={i * 0.1}
                                />
                            );
                        })}
                    </motion.div>
                </div>
            );
        } else if (phaseLower.includes("metaphase")) {
            // Metaphase: Chromosomes align at cell equator
            return (
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="relative w-40 h-40">
                        {/* Cell membrane */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-neon-emerald/50 bg-emerald-500/5"
                            animate={{ borderColor: ["rgba(16,185,129,0.5)", "rgba(16,185,129,0.7)", "rgba(16,185,129,0.5)"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        {/* Metaphase plate (equator line) */}
                        <motion.div
                            className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-400/40 transform -translate-y-1/2"
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        {/* Chromosomes aligned at equator */}
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Chromosome
                                key={i}
                                x={(i - 2.5) * 12}
                                y={0}
                                paired={true}
                                delay={i * 0.08}
                            />
                        ))}
                        {/* Spindle fibers */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <motion.line
                                    key={i}
                                    x1="50%"
                                    y1="10%"
                                    x2="50%"
                                    y2="50%"
                                    stroke="rgba(16,185,129,0.2)"
                                    strokeWidth="1"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                />
                            ))}
                        </svg>
                    </div>
                </div>
            );
        } else if (phaseLower.includes("anaphase")) {
            // Anaphase: Sister chromatids separate and move to poles
            return (
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="relative w-48 h-40">
                        {/* Elongating cell */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-neon-emerald/50 bg-emerald-500/5"
                            animate={{ 
                                scaleX: [1, 1.2, 1.2],
                                borderColor: ["rgba(16,185,129,0.5)", "rgba(16,185,129,0.7)", "rgba(16,185,129,0.5)"]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        {/* Chromatids moving to opposite poles */}
                        <div className="absolute inset-0 flex justify-between items-center px-4">
                            <div className="relative">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <Chromosome
                                        key={`left-${i}`}
                                        x={0}
                                        y={(i - 1) * 12}
                                        paired={false}
                                        delay={i * 0.1}
                                    />
                                ))}
                            </div>
                            <div className="relative">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <Chromosome
                                        key={`right-${i}`}
                                        x={0}
                                        y={(i - 1) * 12}
                                        paired={false}
                                        color="emerald-light"
                                        delay={i * 0.1}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (phaseLower.includes("telophase")) {
            // Telophase: Two nuclei reform, cell begins to divide
            return (
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="relative w-48 h-40 flex gap-2 items-center justify-center">
                        {/* Two forming daughter cells */}
                        {[0, 1].map((cellIdx) => (
                            <motion.div
                                key={cellIdx}
                                className="relative w-20 h-32 rounded-full border-2 border-neon-emerald/50 bg-emerald-500/5"
                                initial={{ scale: 0.8, opacity: 0.5 }}
                                animate={{ 
                                    scale: 1, 
                                    opacity: 1,
                                    borderColor: ["rgba(16,185,129,0.5)", "rgba(16,185,129,0.7)", "rgba(16,185,129,0.5)"]
                                }}
                                transition={{ duration: 2, repeat: Infinity, delay: cellIdx * 0.2 }}
                            >
                                {/* Reforming nucleus */}
                                <motion.div
                                    className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full border border-dashed border-emerald-400/40 transform -translate-x-1/2 -translate-y-1/2"
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                {/* Chromosomes decondensing */}
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <Chromosome
                                        key={i}
                                        x={(i - 1) * 8}
                                        y={(i - 1) * 8}
                                        paired={false}
                                        delay={i * 0.1 + cellIdx * 0.15}
                                    />
                                ))}
                            </motion.div>
                        ))}
                        {/* Cleavage furrow */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 w-1 h-24 bg-emerald-400/30 transform -translate-x-1/2 -translate-y-1/2"
                            animate={{ scaleY: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </div>
            );
        }
    }
    
    // MEIOSIS I phases
    if (stage === "MEIOSIS_I") {
        if (phaseLower.includes("prophase")) {
            // Prophase I: Homologous chromosomes pair up (synapsis) and crossing over occurs
            return (
                <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div
                        className="relative w-40 h-40 rounded-full border-2 border-neon-emerald/30 bg-emerald-500/5"
                        animate={{ borderColor: ["rgba(16,185,129,0.3)", "rgba(16,185,129,0.5)", "rgba(16,185,129,0.3)"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        {/* Homologous pairs (bivalents) with crossing over indicated */}
                        {Array.from({ length: 4 }).map((_, i) => {
                            const angle = (i * 90) * Math.PI / 180;
                            const radius = 30;
                            return (
                                <div key={i} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <motion.div
                                        className="relative"
                                        animate={{ 
                                            x: Math.cos(angle) * radius,
                                            y: Math.sin(angle) * radius
                                        }}
                                        transition={{ duration: 0.8, delay: i * 0.1 }}
                                    >
                                        {/* Paired homologous chromosomes */}
                                        <Chromosome x={-3} y={0} paired={true} color="emerald" delay={i * 0.1} />
                                        <Chromosome x={3} y={0} paired={true} color="emerald-light" delay={i * 0.1 + 0.05} />
                                        {/* Crossing over indicator */}
                                        <motion.div
                                            className="absolute top-1/2 left-1/2 w-3 h-0.5 bg-yellow-400/60 transform -translate-x-1/2 -translate-y-1/2"
                                            animate={{ opacity: [0.4, 0.8, 0.4], scaleX: [0.8, 1.2, 0.8] }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                        />
                                    </motion.div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            );
        } else if (phaseLower.includes("metaphase")) {
            // Metaphase I: Homologous pairs align at equator
            return (
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="relative w-40 h-40">
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-neon-emerald/50 bg-emerald-500/5"
                            animate={{ borderColor: ["rgba(16,185,129,0.5)", "rgba(16,185,129,0.7)", "rgba(16,185,129,0.5)"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        {/* Metaphase plate */}
                        <motion.div
                            className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-400/40 transform -translate-y-1/2"
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        {/* Homologous pairs at equator */}
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <Chromosome x={(i - 1.5) * 16 - 3} y={0} paired={true} delay={i * 0.08} />
                                <Chromosome x={(i - 1.5) * 16 + 3} y={0} paired={true} color="emerald-light" delay={i * 0.08 + 0.05} />
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (phaseLower.includes("anaphase")) {
            // Anaphase I: Homologous chromosomes separate (reduction division)
            return (
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="relative w-48 h-40">
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-neon-emerald/50 bg-emerald-500/5"
                            animate={{ scaleX: [1, 1.2, 1.2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        {/* Homologous chromosomes moving to opposite poles */}
                        <div className="absolute inset-0 flex justify-between items-center px-4">
                            <div className="relative">
                                {Array.from({ length: 2 }).map((_, i) => (
                                    <Chromosome
                                        key={`left-${i}`}
                                        x={0}
                                        y={(i - 0.5) * 16}
                                        paired={true}
                                        delay={i * 0.1}
                                    />
                                ))}
                            </div>
                            <div className="relative">
                                {Array.from({ length: 2 }).map((_, i) => (
                                    <Chromosome
                                        key={`right-${i}`}
                                        x={0}
                                        y={(i - 0.5) * 16}
                                        paired={true}
                                        color="emerald-light"
                                        delay={i * 0.1}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (phaseLower.includes("telophase")) {
            // Telophase I: Two haploid cells form
            return (
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="relative w-48 h-40 flex gap-2 items-center justify-center">
                        {[0, 1].map((cellIdx) => (
                            <motion.div
                                key={cellIdx}
                                className="relative w-20 h-32 rounded-full border-2 border-neon-emerald/50 bg-emerald-500/5"
                                initial={{ scale: 0.8, opacity: 0.5 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, delay: cellIdx * 0.2 }}
                            >
                                {/* Chromosomes still as sister chromatids */}
                                {Array.from({ length: 2 }).map((_, i) => (
                                    <Chromosome
                                        key={i}
                                        x={(i - 0.5) * 12}
                                        y={(i - 0.5) * 12}
                                        paired={true}
                                        color={cellIdx === 0 ? "emerald" : "emerald-light"}
                                        delay={i * 0.1 + cellIdx * 0.15}
                                    />
                                ))}
                            </motion.div>
                        ))}
                        <motion.div
                            className="absolute top-1/2 left-1/2 w-1 h-24 bg-emerald-400/30 transform -translate-x-1/2 -translate-y-1/2"
                            animate={{ scaleY: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </div>
            );
        }
    }
    
    // MEIOSIS II phases
    if (stage === "MEIOSIS_II") {
        if (phaseLower.includes("prophase")) {
            // Prophase II: Chromosomes condense again in two cells
            return (
                <div className="relative w-full h-full flex items-center justify-center gap-4">
                    {[0, 1].map((cellIdx) => (
                        <motion.div
                            key={cellIdx}
                            className="relative w-24 h-24 rounded-full border-2 border-neon-emerald/40 bg-emerald-500/5"
                            animate={{ borderColor: ["rgba(16,185,129,0.4)", "rgba(16,185,129,0.6)", "rgba(16,185,129,0.4)"] }}
                            transition={{ duration: 2, repeat: Infinity, delay: cellIdx * 0.3 }}
                        >
                            {Array.from({ length: 2 }).map((_, i) => {
                                const angle = (i * 180) * Math.PI / 180;
                                const radius = 15;
                                return (
                                    <Chromosome
                                        key={i}
                                        x={Math.cos(angle) * radius}
                                        y={Math.sin(angle) * radius}
                                        paired={true}
                                        color={cellIdx === 0 ? "emerald" : "emerald-light"}
                                        delay={i * 0.1 + cellIdx * 0.15}
                                    />
                                );
                            })}
                        </motion.div>
                    ))}
                </div>
            );
        } else if (phaseLower.includes("metaphase")) {
            // Metaphase II: Chromosomes align at equator in both cells
            return (
                <div className="relative w-full h-full flex items-center justify-center gap-4">
                    {[0, 1].map((cellIdx) => (
                        <div key={cellIdx} className="relative w-24 h-24">
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-neon-emerald/50 bg-emerald-500/5"
                                animate={{ borderColor: ["rgba(16,185,129,0.5)", "rgba(16,185,129,0.7)", "rgba(16,185,129,0.5)"] }}
                                transition={{ duration: 2, repeat: Infinity, delay: cellIdx * 0.2 }}
                            />
                            <motion.div
                                className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-400/40 transform -translate-y-1/2"
                                animate={{ opacity: [0.4, 0.8, 0.4] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: cellIdx * 0.2 }}
                            />
                            {Array.from({ length: 2 }).map((_, i) => (
                                <Chromosome
                                    key={i}
                                    x={(i - 0.5) * 12}
                                    y={0}
                                    paired={true}
                                    color={cellIdx === 0 ? "emerald" : "emerald-light"}
                                    delay={i * 0.08 + cellIdx * 0.15}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            );
        } else if (phaseLower.includes("anaphase")) {
            // Anaphase II: Sister chromatids separate in both cells
            return (
                <div className="relative w-full h-full flex items-center justify-center gap-4">
                    {[0, 1].map((cellIdx) => (
                        <div key={cellIdx} className="relative w-28 h-24">
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-neon-emerald/50 bg-emerald-500/5"
                                animate={{ scaleX: [1, 1.15, 1.15] }}
                                transition={{ duration: 2, repeat: Infinity, delay: cellIdx * 0.2 }}
                            />
                            <div className="absolute inset-0 flex justify-between items-center px-2">
                                <Chromosome x={0} y={0} paired={false} color={cellIdx === 0 ? "emerald" : "emerald-light"} delay={cellIdx * 0.1} />
                                <Chromosome x={0} y={0} paired={false} color={cellIdx === 0 ? "emerald" : "emerald-light"} delay={cellIdx * 0.1 + 0.05} />
                            </div>
                        </div>
                    ))}
                </div>
            );
        } else if (phaseLower.includes("telophase")) {
            // Telophase II: Four haploid cells form
            return (
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-2">
                        {[0, 1, 2, 3].map((cellIdx) => (
                            <motion.div
                                key={cellIdx}
                                className="relative w-16 h-16 rounded-full border-2 border-neon-emerald/50 bg-emerald-500/5"
                                initial={{ scale: 0.7, opacity: 0.4 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.6, delay: cellIdx * 0.15 }}
                            >
                                <Chromosome
                                    x={0}
                                    y={0}
                                    paired={false}
                                    color={cellIdx < 2 ? "emerald" : "emerald-light"}
                                    delay={cellIdx * 0.1}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            );
        }
    }
    
    // Default fallback visualization
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
                className="relative w-32 h-32 rounded-full border-2 border-neon-emerald/50 bg-emerald-500/5 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-neon-emerald font-black text-2xl">
                    {chromosomeCount}
                </span>
            </motion.div>
        </div>
    );
};

export default function CellDivisionVisualization({ quest, stage, translations }: CellDivisionVisualizationProps) {
    if (!quest) {
        return (
            <div className="w-full h-64 bg-black/20 rounded-xl border border-white/5 flex items-center justify-center">
                <p className="text-white/40 text-sm font-mono uppercase tracking-wider">
                    {translations?.labels?.loading || "Loading..."}
                </p>
            </div>
        );
    }

    return (
        <div className="w-full bg-black/20 rounded-xl border border-white/5 p-6 space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-neon-emerald font-black">
                    {translations?.labels?.visualization || "Cell Division Visualization"}
                </h4>
                <span className="text-[10px] text-white/40 font-mono">
                    {stage}
                </span>
            </div>

            {/* Visualization Area */}
            <div className="relative w-full h-64 bg-gradient-to-br from-emerald-950/20 to-black/40 rounded-lg border border-emerald-500/10 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${stage}-${quest.phase}`}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {renderPhaseVisualization(quest.phase, stage, quest.chromosomeCount)}
                    </motion.div>
                </AnimatePresence>

                {/* Phase Label */}
                <div className="absolute bottom-2 left-2 right-2">
                    <motion.div
                        className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg border border-emerald-500/20"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className="text-[10px] text-neon-emerald font-mono uppercase tracking-wider text-center">
                            {quest.phase}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Info Panel */}
            <div className="grid grid-cols-2 gap-2 text-[10px]">
                <motion.div
                    className="bg-white/5 rounded-lg p-2 border border-white/5"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <p className="text-white/40 uppercase tracking-wider mb-1">Stage</p>
                    <p className="text-white font-bold">{stage.replace(/_/g, ' ')}</p>
                </motion.div>
                <motion.div
                    className="bg-white/5 rounded-lg p-2 border border-white/5"
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="text-white/40 uppercase tracking-wider mb-1">Phase</p>
                    <p className="text-white font-bold">{quest.phase}</p>
                </motion.div>
            </div>
        </div>
    );
}
