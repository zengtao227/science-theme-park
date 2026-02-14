"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface MeiosisStageProps {
    stage: 1 | 2; // Meiosis I or II
}

export const MeiosisStage: React.FC<MeiosisStageProps> = ({ stage }) => {
    const [phase, setPhase] = useState<"prophase" | "metaphase" | "anaphase" | "telophase">("prophase");

    const phases = ["prophase", "metaphase", "anaphase", "telophase"];
    const handleNextPhase = () => {
        const currentIndex = phases.indexOf(phase);
        const nextIndex = (currentIndex + 1) % phases.length;
        setPhase(phases[nextIndex] as any);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-black/60 relative">
            <h2 className="text-neon-pink text-2xl font-mono mb-8 uppercase tracking-[0.2em]">
                Meiosis {stage === 1 ? 'I' : 'II'}: {phase}
            </h2>

            {/* Cell Visualization Container */}
            <div className="relative w-[400px] h-[400px] border-4 border-neon-pink/30 rounded-full flex items-center justify-center overflow-hidden">
                {/* Nuclear Envelope Logic */}
                {phase === "prophase" && (
                    <div className="absolute w-[200px] h-[200px] border-2 border-dashed border-white/40 rounded-full animate-pulse opacity-50" />
                )}

                {/* Homologous Pairs (Meiosis I) or Sister Chromatids (Meiosis II) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Placeholder for complex chromosome pairing logic */}
                    <motion.div
                        className="w-10 h-24 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full blur-[2px] opacity-80"
                        animate={{
                            rotate: phase === "metaphase" ? 90 : 0,
                            x: phase === "anaphase" ? (stage === 1 ? -100 : -60) : 0,
                            scale: phase === "telophase" ? 0.8 : 1
                        }}
                    />
                    <motion.div
                        className="w-10 h-24 bg-gradient-to-b from-pink-500 to-red-500 rounded-full blur-[2px] opacity-80 ml-4"
                        animate={{
                            rotate: phase === "metaphase" ? 90 : 0,
                            x: phase === "anaphase" ? (stage === 1 ? 100 : 60) : 0,
                            scale: phase === "telophase" ? 0.8 : 1
                        }}
                    />
                </div>
            </div>

            <button
                onClick={handleNextPhase}
                className="mt-8 px-6 py-2 border border-neon-pink text-neon-pink font-mono uppercase hover:bg-neon-pink hover:text-black transition-colors"
            >
                Next Phase
            </button>
        </div>
    );
};
