"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ElectromagnetismVisualizationProps {
    quest: any;
    stage: string;
    fieldIntensity: number;
    translations: {
        electric_field: string;
        magnetic_field: string;
        particle_motion: string;
    };
}

export default function ElectromagnetismVisualization({
    quest,
    stage,
    fieldIntensity,
    translations
}: ElectromagnetismVisualizationProps) {
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        setAnimationKey(prev => prev + 1);
    }, [quest]);

    const renderElectricField = () => {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-6">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                    Electric Field Lines
                </div>
                
                <div className="relative w-64 h-64">
                    {/* Central charge */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        +Q
                    </div>
                    
                    {/* Field lines radiating outward */}
                    {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i * 30) * Math.PI / 180;
                        return (
                            <motion.div
                                key={i}
                                className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-to-t from-cyan-400 to-transparent origin-bottom"
                                style={{
                                    transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
                                }}
                                animate={{
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                }}
                            />
                        );
                    })}
                </div>
                
                <div className="text-white/60 text-sm">
                    E = kQ/r² (Coulomb's Law)
                </div>
            </div>
        );
    };

    const renderMagneticField = () => {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-6">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                    Magnetic Field (Right-Hand Rule)
                </div>
                
                <div className="relative w-64 h-64">
                    {/* Current-carrying wire */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-full bg-yellow-500/50" />
                    
                    {/* Circular magnetic field lines */}
                    {[40, 60, 80, 100].map((radius, i) => (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-blue-400 rounded-full"
                            style={{
                                width: radius,
                                height: radius,
                            }}
                            animate={{
                                opacity: [0.3, 0.8, 0.3],
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                    
                    {/* Current direction indicator */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-yellow-400 text-xs">
                        I ↓
                    </div>
                </div>
                
                <div className="text-white/60 text-sm">
                    B = μ₀I/(2πr) (Ampère's Law)
                </div>
            </div>
        );
    };

    const renderParticleMotion = () => {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-6">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                    Charged Particle in Magnetic Field
                </div>
                
                <div className="relative w-64 h-64 bg-black/30 rounded-lg border border-white/10">
                    {/* Magnetic field (into page) */}
                    <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-2 p-4">
                        {Array.from({ length: 64 }).map((_, i) => (
                            <div key={i} className="flex items-center justify-center text-blue-400 text-xs">
                                ×
                            </div>
                        ))}
                    </div>
                    
                    {/* Circular particle path */}
                    <svg className="absolute inset-0 w-full h-full">
                        <motion.circle
                            cx="50%"
                            cy="50%"
                            r="60"
                            fill="none"
                            stroke="cyan"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            animate={{
                                strokeDashoffset: [0, -10],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    </svg>
                    
                    {/* Moving particle */}
                    <motion.div
                        key={animationKey}
                        className="absolute w-3 h-3 bg-red-500 rounded-full"
                        style={{
                            left: "50%",
                            top: "50%",
                        }}
                        animate={{
                            x: [60, 0, -60, 0, 60],
                            y: [0, 60, 0, -60, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </div>
                
                <div className="text-white/60 text-sm">
                    F = qvB (Lorentz Force)
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-full bg-black/20 rounded-lg">
            {stage === "ELECTRIC_FIELD" && renderElectricField()}
            {stage === "MAGNETIC_FIELD" && renderMagneticField()}
            {stage === "PARTICLE_MOTION" && renderParticleMotion()}
        </div>
    );
}
