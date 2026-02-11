"use client";

import React from 'react';

interface BinomialSquare2DProps {
    a: number;
    b: number;
    hideRoots?: boolean;
}

export default function BinomialSquare2D({ a, b, hideRoots = false }: BinomialSquare2DProps) {
    const total = a + b;
    const padding = 40;
    const viewSize = 400;
    const squareSize = viewSize - 2 * padding;

    // Scale factor to fit the square in the 320x320 area
    const k = squareSize / total;

    const aw = a * k;
    const bw = b * k;

    return (
        <div className="w-full aspect-square relative bg-[#020208] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col items-center justify-center p-4">
            <svg
                viewBox={`0 0 ${viewSize} ${viewSize}`}
                className="w-full h-full max-w-[500px]"
            >
                {/* Main Container Square */}
                <rect
                    x={padding} y={padding}
                    width={squareSize} height={squareSize}
                    fill="none" stroke="white" strokeWidth="2" strokeDasharray="4 4"
                    opacity="0.3"
                />

                {/* a² - Top Left */}
                <g transform={`translate(${padding}, ${padding})`}>
                    <rect
                        width={aw} height={aw}
                        fill="#ff3131" fillOpacity="0.2"
                        stroke="#ff3131" strokeWidth="2"
                    />
                    <text
                        x={aw / 2} y={aw / 2}
                        fill="white" fontSize="16" fontWeight="900"
                        textAnchor="middle" dominantBaseline="middle"
                    >a²</text>
                    <text x={aw / 2} y={aw / 2 + 20} fill="#ff3131" fontSize="10" textAnchor="middle">{a * a}</text>
                </g>

                {/* ab - Top Right */}
                <g transform={`translate(${padding + aw}, ${padding})`}>
                    <rect
                        width={bw} height={aw}
                        fill="#ffaa00" fillOpacity="0.2"
                        stroke="#ffaa00" strokeWidth="2"
                    />
                    <text
                        x={bw / 2} y={aw / 2}
                        fill="white" fontSize="16" fontWeight="900"
                        textAnchor="middle" dominantBaseline="middle"
                    >ab</text>
                    <text x={bw / 2} y={aw / 2 + 20} fill="#ffaa00" fontSize="10" textAnchor="middle">{a * b}</text>
                </g>

                {/* ab - Bottom Left */}
                <g transform={`translate(${padding}, ${padding + aw})`}>
                    <rect
                        width={aw} height={bw}
                        fill="#ffaa00" fillOpacity="0.2"
                        stroke="#ffaa00" strokeWidth="2"
                    />
                    <text
                        x={aw / 2} y={bw / 2}
                        fill="white" fontSize="16" fontWeight="900"
                        textAnchor="middle" dominantBaseline="middle"
                    >ab</text>
                    <text x={aw / 2} y={bw / 2 + 20} fill="#ffaa00" fontSize="10" textAnchor="middle">{a * b}</text>
                </g>

                {/* b² - Bottom Right */}
                <g transform={`translate(${padding + aw}, ${padding + aw})`}>
                    <rect
                        width={bw} height={bw}
                        fill="#39ff14" fillOpacity="0.2"
                        stroke="#39ff14" strokeWidth="2"
                    />
                    <text
                        x={bw / 2} y={bw / 2}
                        fill="white" fontSize="16" fontWeight="900"
                        textAnchor="middle" dominantBaseline="middle"
                    >b²</text>
                    <text x={bw / 2} y={bw / 2 + 20} fill="#39ff14" fontSize="10" textAnchor="middle">{b * b}</text>
                </g>

                {/* External Labels */}
                <text x={padding + aw / 2} y={padding - 10} fill="white/60" fontSize="12" textAnchor="middle">{hideRoots ? "a" : a}</text>
                <text x={padding + aw + bw / 2} y={padding - 10} fill="white/60" fontSize="12" textAnchor="middle">{hideRoots ? "b" : b}</text>
                <text x={padding - 15} y={padding + aw / 2} fill="white/60" fontSize="12" textAnchor="middle" transform={`rotate(-90, ${padding - 15}, ${padding + aw / 2})`}>{hideRoots ? "a" : a}</text>
                <text x={padding - 15} y={padding + aw + bw / 2} fill="white/60" fontSize="12" textAnchor="middle" transform={`rotate(-90, ${padding - 15}, ${padding + aw + bw / 2})`}>{hideRoots ? "b" : b}</text>
            </svg>

            {/* Legend Overlay */}
            <div className="absolute top-4 left-4 bg-black/60 p-3 rounded-lg border border-white/10 backdrop-blur-md">
                <div className="text-neon-cyan font-black text-xs mb-2">(a+b)² = a² + 2ab + b²</div>
                <div className="flex items-center gap-4 text-[10px] font-mono">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-[#ff3131]" />
                        <span className="text-white/60">a²={a * a}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-[#ffaa00]" />
                        <span className="text-white/60">2ab={2 * a * b}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-[#39ff14]" />
                        <span className="text-white/60">b²={b * b}</span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/60 text-right uppercase">
                2D Geometry Proof<br />
                S2.01 Binomial factory<br />
                Node: Zurich
            </div>
        </div>
    );
}
