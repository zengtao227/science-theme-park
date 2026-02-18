"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface InductionVisualizationProps {
    quest: any;
    stage: string;
    translations: {
        faradays_law: string;
        lenzs_law: string;
        generators: string;
    };
}

export default function InductionVisualization({
    quest,
    stage,
    translations
}: InductionVisualizationProps) {
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        setAnimationKey(prev => prev + 1);
    }, [quest]);

    const renderFaradaysLaw = () => {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-6">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                    Faraday's Law: ε = -N(ΔΦ/Δt)
                </div>
                
                <div className="relative w-64 h-64">
                    {/* Coil */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-48 border-4 border-yellow-500 rounded-full" />
                    
                    {/* Moving magnet */}
                    <motion.div
                        key={animationKey}
                        className="absolute left-1/2 -translate-x-1/2 w-16 h-24 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex flex-col items-center justify-center text-white font-bold"
                        animate={{
                            y: [0, 100, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <div>N</div>
                        <div className="text-xs">↓</div>
                        <div>S</div>
                    </motion.div>
                    
                    {/* Induced current indicator */}
                    <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-cyan-400 text-sm"
                        animate={{
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                        }}
                    >
                        Induced EMF
                    </motion.div>
                </div>
            </div>
        );
    };

    const renderLenzsLaw = () => {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-6">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                    Lenz's Law: Induced effects oppose change
                </div>
                
                <div className="relative w-64 h-64 bg-black/30 rounded-lg border border-white/10 p-4">
                    {/* Coil with current */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-4 border-yellow-500 rounded-full" />
                    
                    {/* Magnetic field lines */}
                    {Array.from({ length: 8 }).map((_, i) => {
                        const angle = (i * 45) * Math.PI / 180;
                        return (
                            <motion.div
                                key={i}
                                className="absolute top-1/2 left-1/2 w-1 h-16 bg-gradient-to-t from-blue-400 to-transparent origin-bottom"
                                style={{
                                    transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                                }}
                                animate={{
                                    opacity: [0.3, 0.8, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                }}
                            />
                        );
                    })}
                    
                    {/* Opposition indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-red-400 text-xs">
                        ← Opposes Change
                    </div>
                </div>
            </div>
        );
    };

    const renderGenerators = () => {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-6">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                    Generator: Rotating Coil in Magnetic Field
                </div>
                
                <div className="relative w-64 h-64">
                    {/* Magnetic field (N and S poles) */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500/20 flex items-center justify-center text-red-400 font-bold">
                        N
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                        S
                    </div>
                    
                    {/* Rotating coil */}
                    <motion.div
                        key={animationKey}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-32 border-4 border-yellow-500"
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                    
                    {/* Output waveform indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/50 rounded">
                        <svg className="w-full h-full">
                            <motion.path
                                d="M 0 24 Q 32 0, 64 24 T 128 24 T 192 24 T 256 24"
                                fill="none"
                                stroke="cyan"
                                strokeWidth="2"
                                animate={{
                                    d: [
                                        "M 0 24 Q 32 0, 64 24 T 128 24 T 192 24 T 256 24",
                                        "M 0 24 Q 32 48, 64 24 T 128 24 T 192 24 T 256 24",
                                    ],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                        </svg>
                    </div>
                </div>
                
                <div className="text-white/60 text-sm">
                    AC Output
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-full bg-black/20 rounded-lg">
            {stage === "FARADAYS_LAW" && renderFaradaysLaw()}
            {stage === "LENZS_LAW" && renderLenzsLaw()}
            {stage === "GENERATORS" && renderGenerators()}
        </div>
    );
}
