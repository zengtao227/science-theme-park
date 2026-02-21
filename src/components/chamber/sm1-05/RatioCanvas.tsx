"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

export type RatioMode = "RECIPES" | "PERCENT" | "MIXTURES";

interface RatioCanvasProps {
    mode: RatioMode;
    quest?: any;
    language: "EN" | "CN" | "DE";
    translations: any;
}

export default function RatioCanvas({ mode, quest, language, translations }: RatioCanvasProps) {
    const t = translations;
    // Use quest data or fallback to defaults
    const data = quest?.visualData || {};

    // --- RENDERERS ---

    const renderRecipes = () => {
        const ingredient = data.ingredient || "flour"; // flour, eggs, milk, sugar
        const baseAmount = data.baseAmount || 2;
        const targetAmount = data.targetAmount || 4;
        const multiplier = targetAmount / baseAmount;

        // Determine color/icon based on ingredient
        let color = "#fbbf24"; // default amber
        let label = "Item";

        if (ingredient === "flour" || ingredient === "sugar") { color = "#f5f5f5"; label = ingredient === "flour" ? t.labels.flour : t.labels.sugar; }
        else if (ingredient === "eggs") { color = "#fbbf24"; label = t.labels.eggs; }
        else if (ingredient === "milk") { color = "#bfdbfe"; label = t.labels.milk; }
        else if (ingredient === "cocoa") { color = "#78350f"; label = t.labels.cocoa; }

        return (
            <div className="flex flex-col items-center justify-center h-full gap-8">
                {/* Original Batch */}
                <div className="flex flex-col items-center gap-2 p-4 border border-white/20 rounded-xl bg-white/5">
                    <div className="text-xs uppercase tracking-widest text-white/50">{t.labels.base_batch}</div>
                    <div className="flex gap-2 flex-wrap justify-center max-w-[200px]">
                        {Array.from({ length: Math.min(baseAmount, 20) }).map((_, i) => (
                            <motion.div
                                key={`base-${i}`}
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}
                                className="w-8 h-8 rounded-full shadow-lg"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                    <div className="text-xl font-bold text-white">{baseAmount} {label}</div>
                </div>

                <div className="text-2xl text-neon-cyan font-black">× {multiplier}</div>

                {/* Target Batch (Visualized as empty slots if strictly asking for result, or filled if showing relationship) */}
                {/* For this canvas specific behavior: Show target batch as filled to visualize the concept */}
                <div className="flex flex-col items-center gap-2 p-4 border-2 border-neon-cyan/50 rounded-xl bg-neon-cyan/5">
                    <div className="text-xs uppercase tracking-widest text-neon-cyan/80">{t.labels.target_batch}</div>
                    <div className="flex gap-2 flex-wrap justify-center max-w-[200px]">
                        {Array.from({ length: Math.min(targetAmount, 50) }).map((_, i) => (
                            <motion.div
                                key={`target-${i}`}
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.05 }}
                                className="w-8 h-8 rounded-full shadow-lg border-2 border-white/20"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                    <div className="text-xl font-bold text-neon-cyan">{targetAmount} {label}</div>
                </div>
            </div>
        );
    };

    const renderPercent = () => {
        const total = 100;
        const current = data.percentage || 50;
        const label = data.label || "Battery";

        return (
            <div className="flex flex-col items-center justify-center h-full gap-6 max-w-lg w-full">
                {/* Progress Bar Container */}
                <div className="relative w-full h-16 bg-gray-800 rounded-full overflow-hidden border-4 border-gray-600 shadow-inner">
                    <motion.div
                        className="h-full bg-gradient-to-r from-neon-green to-emerald-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${current}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                    />
                    {/* Grid lines for 10% */}
                    <div className="absolute inset-0 flex justify-between px-2 pointer-events-none">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="w-0.5 h-full bg-black/20" />
                        ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <span className="font-mono font-bold text-white drop-shadow-md text-xl">{current}%</span>
                    </div>
                </div>

                {/* Unit Bar Comparison (Whole vs Part) */}
                <div className="relative w-full h-8 mt-4">
                    <div className="w-full h-2 bg-gray-700 rounded-full absolute top-1/2 -translate-y-1/2"></div>

                    <div className="absolute top-0 left-0 text-xs text-gray-400">0</div>
                    <div className="absolute top-0 right-0 text-xs text-gray-400">{data.totalValue || 100}</div>

                    {/* Moving Marker */}
                    <motion.div
                        className="absolute w-4 h-4 bg-white rounded-full top-1/2 -mt-2 shadow-[0_0_10px_white] cursor-pointer z-10"
                        initial={{ left: 0 }}
                        animate={{ left: `${current}%` }}
                    />
                    <motion.div
                        className="absolute -bottom-6 transform -translate-x-1/2 text-neon-green font-bold text-lg"
                        initial={{ left: 0 }}
                        animate={{ left: `${current}%` }}
                    >
                        {data.partValue || (data.totalValue ? (data.totalValue * current / 100) : current)}
                    </motion.div>
                </div>

                <div className="text-white/50 text-sm tracking-widest mt-4 uppercase">{label} {t.labels.capacity}</div>
            </div>
        );
    };

    const renderMixtures = () => {
        // Two liquid columns mixing into one
        const solute = data.solute || 20; // e.g. Syrup (ml)
        const solvent = data.solvent || 80; // e.g. Water (ml)
        const total = solute + solvent;
        const soluteColor = data.soluteColor || "#dc2626"; // red
        const solventColor = data.solventColor || "#3b82f6"; // blue

        const solutePercent = (solute / total) * 100;

        return (
            <div className="flex items-end justify-center h-full gap-8 pb-8">
                {/* Solute Beaker */}
                <div className="flex flex-col items-center gap-2">
                    <div className="relative w-16 h-32 border-b-4 border-x-4 border-white/30 rounded-b-xl bg-white/5 overflow-hidden flex items-end">
                        <motion.div
                            initial={{ height: 0 }} animate={{ height: `${(solute / total) * 100}%` }} // Scale visually relative to max
                            className="w-full opacity-80"
                            style={{ backgroundColor: soluteColor }}
                        />
                    </div>
                    <span className="text-xs text-white/60 mb-1">{t.labels.solute}</span>
                    <span className="font-mono text-xl text-white font-bold">{solute}ml</span>
                </div>

                <div className="text-3xl text-white/30 font-thin mb-12">+</div>

                {/* Solvent Beaker */}
                <div className="flex flex-col items-center gap-2">
                    <div className="relative w-16 h-32 border-b-4 border-x-4 border-white/30 rounded-b-xl bg-white/5 overflow-hidden flex items-end">
                        <motion.div
                            initial={{ height: 0 }} animate={{ height: `${(solvent / total) * 100}%` }}
                            className="w-full opacity-80"
                            style={{ backgroundColor: solventColor }}
                        />
                    </div>
                    <span className="text-xs text-white/60 mb-1">{t.labels.solvent}</span>
                    <span className="font-mono text-xl text-white font-bold">{solvent}ml</span>
                </div>

                <div className="text-3xl text-white/30 font-thin mb-12">=</div>

                {/* Result Flask */}
                <div className="flex flex-col items-center gap-2">
                    {/* Conical Flask Shape approx */}
                    <div className="relative w-24 h-40 flex items-end justify-center">
                        {/* Neck */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-16 border-x-2 border-white/30 bg-white/5 z-10"></div>
                        {/* Body */}
                        <div className="absolute bottom-0 w-full h-24 border-b-4 border-x-4 border-white/30 rounded-b-full bg-white/5 overflow-hidden">
                            {/* Mixed Liquid */}
                            <motion.div
                                className="absolute bottom-0 w-full opacity-90 transition-colors duration-1000"
                                initial={{ backgroundColor: solventColor, height: 0 }}
                                animate={{
                                    backgroundColor: `color-mix(in srgb, ${soluteColor} ${solutePercent}%, ${solventColor})`,
                                    height: "75%" // Fill level
                                }}
                            />
                            {/* Bubbles effect */}
                            <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent_70%)]" />
                        </div>
                    </div>
                    <span className="text-xs text-neon-green mb-1">{t.labels.concentration}</span>
                    <span className="font-mono text-xl text-neon-green font-bold">
                        {data.hideResult ? "?" : `${solutePercent.toFixed(1)}%`}
                    </span>
                </div>
            </div>
        );
    };

    if (mode === "RECIPES") return <div className="w-full h-[400px] flex items-center justify-center p-8">{renderRecipes()}</div>;
    if (mode === "PERCENT") return <div className="w-full h-[400px] flex items-center justify-center p-8">{renderPercent()}</div>;
    if (mode === "MIXTURES") return <div className="w-full h-[400px] flex items-center justify-center p-8">{renderMixtures()}</div>;

    return null;
}
