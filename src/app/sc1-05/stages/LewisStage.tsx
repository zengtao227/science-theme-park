"use client";

import React, { useState } from 'react';

export const LewisStage: React.FC = () => {
    // Basic placeholder for Lewis Structures stage
    // For now, a static interactive demo for CO2
    const [bonds, setBonds] = useState<number>(0);

    return (
        <div className="flex flex-col items-center justify-center w-full h-[600px] gap-8 relative z-10">
            <h2 className="text-cyan-400 font-mono text-xl tracking-wider mb-4">Lewis Structure: CO2</h2>

            <div className="flex items-center gap-12">
                {/* Oxygen Left */}
                <div className="relative w-24 h-24 rounded-full border-2 border-red-500 bg-red-900/20 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">O</span>
                    {/* Lone pairs */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    </div>
                </div>

                {/* Bonds Area Left */}
                <div className="w-20 h-10 border-b-2 border-t-2 border-white/20 relative flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors"
                    onClick={() => setBonds(prev => (prev + 1) % 3)}>
                    {bonds >= 1 && <div className="w-full h-1 bg-green-400 my-0.5 shadow-[0_0_5px_#4ade80]" />}
                    {bonds >= 2 && <div className="w-full h-1 bg-green-400 my-0.5 shadow-[0_0_5px_#4ade80]" />}
                    <div className="absolute -bottom-6 text-xs text-gray-500">Click to add bond</div>
                </div>

                {/* Carbon Center */}
                <div className="relative w-24 h-24 rounded-full border-2 border-gray-500 bg-gray-900/20 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">C</span>
                </div>

                {/* Bonds Area Right */}
                <div className="w-20 h-10 border-b-2 border-t-2 border-white/20 relative flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors">
                    <div className="w-full h-1 bg-green-400 my-0.5 shadow-[0_0_5px_#4ade80]" />
                    <div className="w-full h-1 bg-green-400 my-0.5 shadow-[0_0_5px_#4ade80]" />
                </div>

                {/* Oxygen Right */}
                <div className="relative w-24 h-24 rounded-full border-2 border-red-500 bg-red-900/20 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">O</span>
                    {/* Lone pairs */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    </div>
                </div>
            </div>

            <div className="mt-8 p-4 border border-cyan-500/30 rounded bg-black/50 text-cyan-300 font-mono text-sm max-w-md text-center">
                Mission: Satisfy the Octet Rule for Carbon (C) by forming double bonds with both Oxygen (O) atoms.
            </div>
        </div>
    );
};
