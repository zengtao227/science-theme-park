"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface OhmsLawVisualizationProps {
    quest: any;
    stage: string;
    voltage: number;
    current: number;
    translations: {
        ohms_law: string;
        series_circuits: string;
        parallel_circuits: string;
    };
}

export default function OhmsLawVisualization({
    quest,
    stage,
    voltage,
    current,
    translations
}: OhmsLawVisualizationProps) {
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        setAnimationKey(prev => prev + 1);
    }, [quest]);

    const renderOhmsLaw = () => {
        const resistance = quest.resistance || (voltage / (current || 1));
        
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-6">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                    Ohm's Law: U = I × R
                </div>
                
                <div className="grid grid-cols-3 gap-8 w-full max-w-md">
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-cyan-400 text-xs uppercase">Voltage</div>
                        <div className="text-white text-3xl font-bold">{voltage || "?"}</div>
                        <div className="text-white/40 text-xs">V</div>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-yellow-400 text-xs uppercase">Current</div>
                        <div className="text-white text-3xl font-bold">{current || "?"}</div>
                        <div className="text-white/40 text-xs">A</div>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-red-400 text-xs uppercase">Resistance</div>
                        <div className="text-white text-3xl font-bold">{resistance.toFixed(1)}</div>
                        <div className="text-white/40 text-xs">Ω</div>
                    </div>
                </div>

                {/* Visual representation */}
                <div className="relative w-full max-w-md h-32 bg-black/30 rounded-lg border border-white/10 overflow-hidden">
                    <motion.div
                        key={animationKey}
                        className="absolute top-1/2 left-0 w-4 h-4 bg-cyan-400 rounded-full -translate-y-1/2"
                        animate={{
                            x: ["0%", "100%"],
                        }}
                        transition={{
                            duration: 2 / (current || 1),
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/30 text-xs">
                        Current Flow →
                    </div>
                </div>
            </div>
        );
    };

    const renderSeriesCircuit = () => {
        const components = quest.components || [10, 20];
        const totalR = components.reduce((sum: number, r: number) => sum + r, 0);
        
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-6">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                    Series Circuit: R_total = R_1 + R_2 + ...
                </div>
                
                <div className="flex items-center gap-4">
                    {components.map((r: number, idx: number) => (
                        <div key={idx} className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 bg-red-500/20 border-2 border-red-500 rounded flex items-center justify-center">
                                <span className="text-white font-bold">{r}Ω</span>
                            </div>
                            {idx < components.length - 1 && (
                                <div className="text-white/40 text-2xl">+</div>
                            )}
                        </div>
                    ))}
                </div>
                
                <div className="text-white text-xl">
                    Total: <span className="text-red-400 font-bold">{totalR}Ω</span>
                </div>
                
                <div className="text-white/60 text-sm">
                    Voltage: {voltage}V → Current: {(voltage / totalR).toFixed(2)}A
                </div>
            </div>
        );
    };

    const renderParallelCircuit = () => {
        const components = quest.components || [10, 20];
        const totalR = 1 / components.reduce((sum: number, r: number) => sum + (1 / r), 0);
        
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-6">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                    Parallel Circuit: 1/R_total = 1/R_1 + 1/R_2 + ...
                </div>
                
                <div className="flex flex-col gap-4">
                    {components.map((r: number, idx: number) => (
                        <div key={idx} className="flex items-center gap-4">
                            <div className="w-16 h-12 bg-blue-500/20 border-2 border-blue-500 rounded flex items-center justify-center">
                                <span className="text-white font-bold">{r}Ω</span>
                            </div>
                            <div className="text-white/60 text-sm">
                                I₍{idx + 1}₎ = {(voltage / r).toFixed(2)}A
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="text-white text-xl">
                    Total R: <span className="text-blue-400 font-bold">{totalR.toFixed(2)}Ω</span>
                </div>
                
                <div className="text-white/60 text-sm">
                    Total Current: {(voltage / totalR).toFixed(2)}A
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-full bg-black/20 rounded-lg">
            {stage === "OHMS_LAW" && renderOhmsLaw()}
            {stage === "SERIES_CIRCUITS" && renderSeriesCircuit()}
            {stage === "PARALLEL_CIRCUITS" && renderParallelCircuit()}
        </div>
    );
}
