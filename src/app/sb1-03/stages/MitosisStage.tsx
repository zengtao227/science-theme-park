"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export const MitosisStage = () => {
    const [phase, setPhase] = useState<"prophase" | "metaphase" | "anaphase" | "telophase">("prophase");

    const phases = ["prophase", "metaphase", "anaphase", "telophase"];
    const handleNextPhase = () => {
        const currentIndex = phases.indexOf(phase);
        const nextIndex = (currentIndex + 1) % phases.length;
        setPhase(phases[nextIndex] as any);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative p-8">
            <h2 className="text-neon-green text-2xl font-mono mb-8 uppercase tracking-[0.2em]">
                Mitosis Phase: {phase}
            </h2>

            {/* Cell Visualization (Simplified) */}
            <div className="relative w-[400px] h-[400px] border-4 border-neon-green/30 rounded-full flex items-center justify-center overflow-hidden transition-all duration-1000"
                style={{
                    borderRadius: phase === "telophase" ? "40% 40% 40% 40% / 50% 50% 50% 50%" : "50%",
                    width: phase === "telophase" ? "600px" : "400px"
                }}>

                {/* Nuclear Envelope (disappears in pro-metaphase) */}
                {phase === "prophase" && (
                    <motion.div
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 2 }}
                        className="absolute w-[200px] h-[200px] border-2 border-dashed border-white/40 rounded-full"
                    />
                )}

                {/* Spindle Fibers (appear in metaphase/anaphase) */}
                {(phase === "metaphase" || phase === "anaphase") && (
                    <div className="absolute inset-0 flex justify-between items-center opacity-30">
                        <div className="w-4 h-4 bg-yellow-400 rounded-full ml-4" /> {/* Centriole Left */}
                        <div className="w-full h-0.5 bg-green-500/50" />
                        <div className="w-4 h-4 bg-yellow-400 rounded-full mr-4" /> {/* Centriole Right */}
                    </div>
                )}

                {/* Chromosomes */}
                <div className="relative w-full h-full">
                    {/* Pair 1 */}
                    <motion.div
                        className="absolute w-8 h-20 bg-blue-500 rounded-full blur-[1px] shadow-[0_0_10px_#3b82f6]"
                        animate={
                            phase === "prophase" ? { top: "40%", left: "40%", rotate: 45 } :
                                phase === "metaphase" ? { top: "50%", left: "50%", x: "-50%", y: "-50%", rotate: 90 } :
                                    phase === "anaphase" ? { top: "50%", left: "20%", rotate: 90 } :
                                        { top: "50%", left: "20%", rotate: 90 } // Telophase
                        }
                    />
                    <motion.div
                        className="absolute w-8 h-20 bg-pink-500 rounded-full blur-[1px] shadow-[0_0_10px_#ec4899]"
                        animate={
                            phase === "prophase" ? { top: "45%", left: "45%", rotate: 45 } :
                                phase === "metaphase" ? { top: "50%", left: "50%", x: "-50%", y: "-50%", rotate: 90 } : // Overlap in metaphase visually
                                    phase === "anaphase" ? { top: "50%", left: "80%", rotate: 90 } :
                                        { top: "50%", left: "80%", rotate: 90 } // Telophase
                        }
                    />
                </div>
            </div>

            <button
                onClick={handleNextPhase}
                className="mt-8 px-6 py-2 border border-neon-green text-neon-green font-mono uppercase hover:bg-neon-green hover:text-black transition-colors"
            >
                Next Phase
            </button>
        </div>
    );
};
