"use client";

import React, { useMemo } from 'react';

interface StatisticsCanvasProps {
    data?: number[];
    type?: 'STATISTICS' | 'PROBABILITY' | 'COMBINATORICS';
    label?: string;
}

export default function S102_StatisticsCanvas({ data, type, label }: StatisticsCanvasProps) {
    const chartHeight = 200;
    const chartWidth = 400;

    const stats = useMemo(() => {
        if (!data || data.length === 0) return null;
        const sorted = [...data].sort((a, b) => a - b);
        const mean = data.reduce((a, b) => a + b, 0) / data.length;
        const median = data.length % 2 === 0
            ? (sorted[data.length / 2 - 1] + sorted[data.length / 2]) / 2
            : sorted[Math.floor(data.length / 2)];
        return { mean, median, sorted };
    }, [data]);

    if (type === 'PROBABILITY') {
        return (
            <div className="w-full aspect-video bg-[#0a0a0a] rounded-lg border border-white/10 flex flex-col items-center justify-center gap-4 p-6 overflow-hidden relative">
                <div className="absolute top-2 left-2 text-[8px] font-black text-white/20 uppercase tracking-widest">PROBABILITY ENGINE</div>
                <div className="flex gap-8">
                    <div className="w-20 h-20 rounded-full border-4 border-dashed border-white/10 flex items-center justify-center animate-spin-slow">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center">
                            <span className="text-white/40 font-black text-xl">?</span>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-[10px] text-white/50 uppercase tracking-[0.3em] font-black">{label}</div>
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="w-full aspect-video bg-[#0a0a0a] rounded-lg border border-white/10 flex items-center justify-center">
                <span className="text-white/20 text-[10px] uppercase font-black tracking-widest">Waiting for data...</span>
            </div>
        );
    }

    const maxVal = Math.max(...data, 10);
    const padding = 40;

    return (
        <div className="w-full bg-[#0a0a0a] rounded-lg border border-white/10 p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Data Distribution</span>
                <div className="flex gap-3">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-neon-purple rounded-full"></div>
                        <span className="text-[8px] text-white/40 uppercase">Mean</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                        <span className="text-[8px] text-white/40 uppercase">Median</span>
                    </div>
                </div>
            </div>

            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
                {/* X-Axis */}
                <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="white" strokeWidth="1" opacity="0.1" />

                {/* Data Points */}
                {data.map((val, idx) => {
                    const x = padding + (idx * (chartWidth - 2 * padding)) / (data.length - 1 || 1);
                    const y = chartHeight - padding - (val / maxVal) * (chartHeight - 2 * padding);
                    return (
                        <g key={idx} className="group cursor-help">
                            <circle
                                cx={x}
                                cy={y}
                                r="4"
                                fill="white"
                                className="transition-all group-hover:r-6 group-hover:fill-neon-purple"
                            />
                            <text x={x} y={y - 12} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" opacity="0.4" className="group-hover:opacity-100 transition-opacity">
                                {val}
                            </text>
                        </g>
                    );
                })}

                {/* Mean Line */}
                {stats && (
                    <line
                        x1={padding}
                        y1={chartHeight - padding - (stats.mean / maxVal) * (chartHeight - 2 * padding)}
                        x2={chartWidth - padding}
                        y2={chartHeight - padding - (stats.mean / maxVal) * (chartHeight - 2 * padding)}
                        stroke="#9d4edd"
                        strokeWidth="1"
                        strokeDasharray="4,4"
                    />
                )}
            </svg>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.03] border border-white/5 p-2 rounded">
                    <div className="text-[8px] text-white/30 uppercase tracking-widest mb-1">Mean Value</div>
                    <div className="text-sm font-black text-neon-purple">{stats?.mean.toFixed(2)}</div>
                </div>
                <div className="bg-white/[0.03] border border-white/5 p-2 rounded">
                    <div className="text-[8px] text-white/30 uppercase tracking-widest mb-1">Median Value</div>
                    <div className="text-sm font-black text-white">{stats?.median}</div>
                </div>
            </div>
        </div>
    );
}
