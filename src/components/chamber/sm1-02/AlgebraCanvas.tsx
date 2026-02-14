"use client";

import React, { useMemo } from 'react';
import { InlineMath } from 'react-katex';

export type AlgebraVisualMode = 'CONTAINERS' | 'SORTING' | 'MACHINE';

export interface AlgebraVisualProps {
    mode: AlgebraVisualMode;
    data: {
        variables?: { label: string; value: number | string; color: string }[];
        expression?: string; // For display
        items?: { type: string; count: number; color: string }[]; // For sorting
        inputValue?: number; // For machine
        formula?: string; // For machine
    };
}

export default function AlgebraCanvas({ mode, data }: AlgebraVisualProps) {

    // --- RENDERERS ---

    const renderContainers = () => {
        return (
            <div className="flex flex-wrap justify-center gap-8 items-end h-64">
                {data.variables?.map((v, i) => (
                    <div key={i} className="flex flex-col items-center group">
                        {/* Value (Inside) */}
                        <div className="mb-2 text-2xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {v.value}
                        </div>
                        {/* Container (Box) */}
                        <div
                            className="w-24 h-24 border-4 rounded-xl flex items-center justify-center bg-white/5 backdrop-blur-md transition-all duration-300 group-hover:scale-110"
                            style={{ borderColor: v.color, boxShadow: `0 0 20px ${v.color}40` }}
                        >
                            <span className="text-4xl font-black text-white/50 group-hover:text-white transition-colors">?</span>
                        </div>
                        {/* Label (x) */}
                        <div className="mt-4 text-xl font-mono text-white/80 border px-3 py-1 rounded bg-black/50 border-white/20">
                            <InlineMath math={v.label} />
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderSorting = () => {
        // Simplified visual for sorting terms
        // In a real app, this would use framer-motion for drag/drop animation
        return (
            <div className="flex flex-col items-center gap-8 w-full">
                <div className="text-white/60 text-sm tracking-widest uppercase">Mixed Items (Marktplatz)</div>
                <div className="flex flex-wrap justify-center gap-4 bg-white/5 p-6 rounded-2xl w-full border border-white/10">
                    {data.items?.map((item, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center p-3 rounded-lg border border-white/10"
                            style={{ backgroundColor: `${item.color}20` }}
                        >
                            <div className="text-3xl mb-1" style={{ color: item.color }}>●</div>
                            <div className="text-xs font-mono text-white/80">
                                <InlineMath math={`${item.count}${item.type}`} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-white/40 text-xs italic">
                    Combine items of the same color/type.
                </div>
            </div>
        );
    };

    const renderMachine = () => {
        return (
            <div className="flex flex-col items-center justify-center h-full relative">
                {/* Input Funnel */}
                <div className="flex flex-col items-center mb-[-10px] z-10">
                    <div className="bg-neon-blue px-4 py-2 rounded-full text-black font-bold shadow-[0_0_15px_#00f3ff]">
                        Input: {data.inputValue}
                    </div>
                    <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-neon-blue/50"></div>
                </div>

                {/* Machine Box */}
                <div className="w-64 h-48 bg-gray-900 border-2 border-white/20 rounded-2xl flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                    <div className="text-white/50 text-[10px] uppercase tracking-[0.2em] mb-4">Processing Core</div>
                    <div className="text-3xl font-black text-neon-green">
                        <InlineMath math={data.formula || "f(x)"} />
                    </div>
                    {/* Gears decoration (css animation usually) */}
                    <div className="absolute bottom-2 right-2 flex gap-1 animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                </div>

                {/* Output Chute */}
                <div className="flex flex-col items-center mt-[-10px] z-10">
                    <div className="w-12 h-8 bg-gray-800 border-x-2 border-white/20"></div>
                    <div className="bg-neon-purple px-6 py-3 rounded-lg border border-neon-purple text-white font-bold shadow-[0_0_20px_#a855f7]">
                        Output: ?
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-black/20 rounded-3xl border border-white/5 backdrop-blur-sm min-h-[400px]">
            {mode === 'CONTAINERS' && renderContainers()}
            {mode === 'SORTING' && renderSorting()}
            {mode === 'MACHINE' && renderMachine()}
        </div>
    );
}
