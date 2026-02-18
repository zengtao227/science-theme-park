"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PowerVisualizationProps {
    quest: any;
    stage: string;
    power: number;
    translations: {
        power_basics: string;
        energy_consumption: string;
        efficiency: string;
    };
}

export default function PowerVisualization({
    quest,
    stage,
    power,
    translations
}: PowerVisualizationProps) {
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        setAnimationKey(prev => prev + 1);
    }, [quest]);

    const renderPowerBasics = () => {
        const voltage = quest.voltage || 220;
        const current = quest.current || (power / voltage);
        
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-6">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                    Power: P = U × I
                </div>
                
                <div className="relative w-48 h-48">
                    <motion.div
                        key={animationKey}
                        className="absolute inset-0 rounded-full border-4 border-yellow-400"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-yellow-400 text-5xl font-bold">{power}</div>
                        <div className="text-white/60 text-sm">Watts</div>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 w-full max-w-xs">
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-cyan-400 text-xs uppercase">Voltage</div>
                        <div className="text-white text-2xl font-bold">{voltage}</div>
                        <div className="text-white/40 text-xs">V</div>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-red-400 text-xs uppercase">Current</div>
                        <div className="text-white text-2xl font-bold">{current.toFixed(2)}</div>
                        <div className="text-white/40 text-xs">A</div>
                    </div>
                </div>
            </div>
        );
    };

    const renderEnergyConsumption = () => {
        const time = quest.time || 1;
        const energy = power * time;
        const cost = quest.cost || 0.25;
        const totalCost = (energy / 1000) * cost;
        
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-6">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                    Energy: E = P × t
                </div>
                
                <div className="w-full max-w-md space-y-4">
                    <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                        <div className="flex justify-between items-center">
                            <span className="text-white/60 text-sm">Power</span>
                            <span className="text-white font-bold">{power} W</span>
                        </div>
                    </div>
                    
                    <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                        <div className="flex justify-between items-center">
                            <span className="text-white/60 text-sm">Time</span>
                            <span className="text-white font-bold">{time} h</span>
                        </div>
                    </div>
                    
                    <div className="bg-green-500/20 rounded-lg p-4 border-2 border-green-500">
                        <div className="flex justify-between items-center">
                            <span className="text-green-400 text-sm font-bold">Energy</span>
                            <span className="text-green-400 font-bold text-xl">{(energy / 1000).toFixed(2)} kWh</span>
                        </div>
                    </div>
                    
                    <div className="bg-yellow-500/20 rounded-lg p-4 border-2 border-yellow-500">
                        <div className="flex justify-between items-center">
                            <span className="text-yellow-400 text-sm font-bold">Cost ({cost} CHF/kWh)</span>
                            <span className="text-yellow-400 font-bold text-xl">{totalCost.toFixed(2)} CHF</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderEfficiency = () => {
        const input = 1000;
        const output = 850;
        const efficiency = (output / input) * 100;
        const loss = input - output;
        
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-6">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                    Efficiency: η = (P_out / P_in) × 100%
                </div>
                
                <div className="relative w-full max-w-md">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 bg-blue-500/20 rounded-lg p-4 border-2 border-blue-500">
                            <div className="text-blue-400 text-xs uppercase mb-2">Input</div>
                            <div className="text-white text-2xl font-bold">{input} W</div>
                        </div>
                        
                        <div className="text-white/40 text-2xl">→</div>
                        
                        <div className="flex-1 bg-green-500/20 rounded-lg p-4 border-2 border-green-500">
                            <div className="text-green-400 text-xs uppercase mb-2">Output</div>
                            <div className="text-white text-2xl font-bold">{output} W</div>
                        </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="bg-yellow-500/20 rounded-lg p-4 border border-yellow-500">
                            <div className="text-yellow-400 text-xs uppercase mb-2">Efficiency</div>
                            <div className="text-white text-xl font-bold">{efficiency.toFixed(1)}%</div>
                        </div>
                        
                        <div className="bg-red-500/20 rounded-lg p-4 border border-red-500">
                            <div className="text-red-400 text-xs uppercase mb-2">Loss</div>
                            <div className="text-white text-xl font-bold">{loss} W</div>
                        </div>
                    </div>
                </div>
                
                {/* Efficiency bar */}
                <div className="w-full max-w-md">
                    <div className="h-8 bg-black/30 rounded-full overflow-hidden border border-white/10">
                        <motion.div
                            key={animationKey}
                            className="h-full bg-gradient-to-r from-green-500 to-yellow-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${efficiency}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-full bg-black/20 rounded-lg">
            {stage === "POWER_BASICS" && renderPowerBasics()}
            {stage === "ENERGY_CONSUMPTION" && renderEnergyConsumption()}
            {stage === "EFFICIENCY" && renderEfficiency()}
        </div>
    );
}
