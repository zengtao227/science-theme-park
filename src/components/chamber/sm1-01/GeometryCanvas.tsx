"use client";

import { useEffect, useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export interface GeometryMeta {
    type: 'rectangle' | 'triangle' | 'trapezoid' | 'circle' | 'cube' | 'prism' | 'cylinder';
    params: Record<string, number>;
}

export function calculateArea(geometry: GeometryMeta): number {
    const { type, params } = geometry;
    switch (type) {
        case 'rectangle': return params.a * params.b;
        case 'triangle': return 0.5 * params.b * params.h;
        case 'trapezoid': return 0.5 * (params.a + params.b) * params.h;
        case 'circle': return Math.PI * params.r * params.r;
        case 'cube': return params.a ** 3;
        case 'prism': return params.a * params.b * params.c;
        case 'cylinder': return Math.PI * params.r * params.r * params.h;
        default: return 0;
    }
}

interface GeometryCanvasProps {
    geometry?: GeometryMeta;
    userAnswer?: number;
    isVolumeMode?: boolean;
    translations?: {
        area: string;
        volume: string;
        pending: string;
        verified: string;
        error: string;
        length: string;
        width: string;
        height: string;
        base: string;
        radius: string;
        side: string;
    };
}

export default function S101_GeometryCanvas({
    geometry,
    userAnswer,
    isVolumeMode = false,
    translations = {
        area: "Area",
        volume: "Volume",
        pending: "Pending",
        verified: "Verified",
        error: "Error",
        length: "a",
        width: "b",
        height: "h",
        base: "b",
        radius: "r",
        side: "a"
    }
}: GeometryCanvasProps) {
    const [animatedArea, setAnimatedArea] = useState(0);

    useEffect(() => {
        if (!geometry) return;
        const targetArea = calculateArea(geometry);
        const duration = 1000;
        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4); // Quartic ease out
            setAnimatedArea(targetArea * eased);
            if (progress < 1) requestAnimationFrame(animate);
        };
        animate();
    }, [geometry]);

    if (!geometry) return null;

    const { type, params } = geometry;

    // Dynamic scaling logic to ensure shapes fit in the 400x300 viewBox
    // We want the largest dimension to be roughly 180-200px on the canvas
    const maxBound = type === 'rectangle' ? Math.max(params.a, params.b) :
        type === 'triangle' ? Math.max(params.b, params.h) :
            type === 'trapezoid' ? Math.max(params.a, params.b, params.h) :
                type === 'circle' ? params.r * 2 :
                    type === 'cube' ? params.a * 1.5 : // Adjust for perspective offset
                        type === 'prism' ? Math.max(params.a, params.b, params.c) :
                            type === 'cylinder' ? Math.max(params.r * 2, params.h) : 10;

    const scale = 180 / Math.max(maxBound, 1);
    const centerX = 200;
    const centerY = 150;

    const isCorrect = userAnswer !== undefined && Math.abs(userAnswer - calculateArea(geometry)) < 0.1;

    // Theme Colors
    const neonCyan = "#00e5ff";


    const neonGreen = "#39ff14";
    const neonRed = "#ff3131";

    const mainColor = userAnswer === undefined ? neonCyan : (isCorrect ? neonGreen : neonRed);

    return (
        <div className="relative w-full aspect-square bg-[#050505] rounded-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center p-4 sm:p-8">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

            <svg viewBox="0 0 400 300" className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(0,229,255,0.15)]">
                <defs>
                    <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <linearGradient id="shapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={mainColor} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={mainColor} stopOpacity="0.05" />
                    </linearGradient>
                </defs>

                {/* Grid Lines (Faint) */}
                <g stroke="white" strokeWidth="0.5" strokeOpacity="0.05">
                    {Array.from({ length: 11 }).map((_, i) => (
                        <g key={i}>
                            <line x1={i * 40} y1="0" x2={i * 40} y2="300" />
                            <line x1="0" y1={i * 30} x2="400" y2={i * 30} />
                        </g>
                    ))}
                </g>

                {/* Dynamic Content */}
                <g filter="url(#neonBlur)">
                    {type === 'rectangle' && (
                        <g transform={`translate(${centerX - (params.a * scale) / 2}, ${centerY - (params.b * scale) / 2})`}>
                            <rect width={params.a * scale} height={params.b * scale} fill="url(#shapeGrad)" stroke={mainColor} strokeWidth="2.5" rx="2" />
                            <foreignObject x={0} y={-30} width={params.a * scale} height={20}>
                                <div className="flex justify-center items-center h-full text-[10px] text-white/70 font-mono">
                                    <InlineMath math={`${translations.length}=${params.a}`} />
                                </div>
                            </foreignObject>
                            <foreignObject x={params.a * scale + 5} y={0} width={60} height={params.b * scale}>
                                <div className="flex justify-start items-center h-full text-[10px] text-white/70 font-mono">
                                    <InlineMath math={`${translations.width}=${params.b}`} />
                                </div>
                            </foreignObject>
                        </g>
                    )}

                    {type === 'triangle' && (
                        <g transform={`translate(${centerX}, ${centerY})`}>
                            <polygon
                                points={`${-(params.b * scale) / 2},${(params.h * scale) / 2} ${(params.b * scale) / 2},${(params.h * scale) / 2} 0,${-(params.h * scale) / 2}`}
                                fill="url(#shapeGrad)" stroke={mainColor} strokeWidth="2.5"
                            />
                            <foreignObject x={-(params.b * scale) / 2} y={(params.h * scale) / 2 + 5} width={params.b * scale} height={20}>
                                <div className="flex justify-center items-center h-full text-[10px] text-white/70 font-mono">
                                    <InlineMath math={`${translations.base}=${params.b}`} />
                                </div>
                            </foreignObject>
                            <foreignObject x={-(params.b * scale) / 2 - 65} y={-(params.h * scale) / 2} width={60} height={params.h * scale}>
                                <div className="flex justify-end items-center h-full text-[10px] text-white/70 font-mono">
                                    <InlineMath math={`${translations.height}=${params.h}`} />
                                </div>
                            </foreignObject>
                        </g>
                    )}

                    {type === 'trapezoid' && (
                        <g transform={`translate(${centerX}, ${centerY})`}>
                            <polygon
                                points={`${-(params.b * scale) / 2},${(params.h * scale) / 2} ${(params.b * scale) / 2},${(params.h * scale) / 2} ${(params.a * scale) / 2},${-(params.h * scale) / 2} ${-(params.a * scale) / 2},${-(params.h * scale) / 2}`}
                                fill="url(#shapeGrad)" stroke={mainColor} strokeWidth="2.5"
                            />
                            <foreignObject x={-(params.a * scale) / 2} y={-(params.h * scale) / 2 - 25} width={params.a * scale} height={20}>
                                <div className="flex justify-center items-center h-full text-[10px] text-white/70 font-mono">
                                    <InlineMath math={`${translations.side}=${params.a}`} />
                                </div>
                            </foreignObject>
                            <foreignObject x={-(params.b * scale) / 2} y={(params.h * scale) / 2 + 5} width={params.b * scale} height={20}>
                                <div className="flex justify-center items-center h-full text-[10px] text-white/70 font-mono">
                                    <InlineMath math={`${translations.base}=${params.b}`} />
                                </div>
                            </foreignObject>
                            {/* Height indicator line */}
                            <line
                                x1={-(params.a * scale) / 2} y1={-(params.h * scale) / 2}
                                x2={-(params.a * scale) / 2} y2={(params.h * scale) / 2}
                                stroke="white" strokeWidth="1" strokeDasharray="4 2" opacity="0.4"
                            />
                            <foreignObject x={-(params.a * scale) / 2 - 65} y={-(params.h * scale) / 2} width={60} height={params.h * scale}>
                                <div className="flex justify-end items-center h-full text-[10px] text-white/70 font-mono">
                                    <InlineMath math={`${translations.height}=${params.h}`} />
                                </div>
                            </foreignObject>
                        </g>
                    )}

                    {type === 'circle' && (
                        <g transform={`translate(${centerX}, ${centerY})`}>
                            <circle r={params.r * scale} fill="url(#shapeGrad)" stroke={mainColor} strokeWidth="2.5" />
                            <line x1="0" y1="0" x2={params.r * scale} y2="0" stroke="white" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.4" />
                            <circle r="2" fill="white" />
                            <foreignObject x={0} y={-25} width={params.r * scale} height={20}>
                                <div className="flex justify-center items-center h-full text-[10px] text-white/70 font-mono">
                                    <InlineMath math={`${translations.radius}=${params.r}`} />
                                </div>
                            </foreignObject>
                        </g>
                    )}

                    {type === 'cube' && (
                        <g transform={`translate(${centerX - (params.a * scale) / 1.5}, ${centerY - (params.a * scale) / 1.5})`}>
                            <path d={`M 0,0 L ${params.a * scale},0 L ${params.a * scale},${params.a * scale} L 0,${params.a * scale} Z`} fill="url(#shapeGrad)" stroke={mainColor} strokeWidth="2.5" />
                            <path d={`M 0,0 L 25,-25 L ${params.a * scale + 25},-25 L ${params.a * scale},0`} fill="rgba(255,255,255,0.05)" stroke={mainColor} strokeWidth="1" opacity="0.5" />
                            <path d={`M ${params.a * scale},0 L ${params.a * scale + 25},-25 L ${params.a * scale + 25},${params.a * scale - 25} L ${params.a * scale},${params.a * scale}`} fill="rgba(255,255,255,0.05)" stroke={mainColor} strokeWidth="1" opacity="0.5" />
                            <foreignObject x={0} y={params.a * scale + 5} width={params.a * scale} height={20}>
                                <div className="flex justify-center items-center h-full text-[10px] text-white/70 font-mono">
                                    <InlineMath math={`${translations.side}=${params.a}`} />
                                </div>
                            </foreignObject>
                        </g>
                    )}

                    {type === 'cylinder' && (
                        <g transform={`translate(${centerX}, ${centerY})`}>
                            <ellipse cy={-(params.h * scale) / 2} rx={params.r * scale} ry={params.r * scale * 0.3} fill="none" stroke={mainColor} strokeWidth="2" opacity="0.6" />
                            <rect x={-params.r * scale} y={-(params.h * scale) / 2} width={params.r * scale * 2} height={params.h * scale} fill="url(#shapeGrad)" stroke={mainColor} strokeWidth="2.5" strokeOpacity="0.2" />
                            <line x1={-params.r * scale} y1={-(params.h * scale) / 2} x2={-params.r * scale} y2={(params.h * scale) / 2} stroke={mainColor} strokeWidth="2.5" />
                            <line x1={params.r * scale} y1={-(params.h * scale) / 2} x2={params.r * scale} y2={(params.h * scale) / 2} stroke={mainColor} strokeWidth="2.5" />
                            <ellipse cy={(params.h * scale) / 2} rx={params.r * scale} ry={params.r * scale * 0.3} fill="url(#shapeGrad)" stroke={mainColor} strokeWidth="2.5" />
                            <foreignObject x={params.r * scale + 10} y={-(params.h * scale) / 2} width={80} height={params.h * scale}>
                                <div className="flex flex-col justify-center items-start h-full text-[10px] text-white/70 font-mono">
                                    <InlineMath math={`${translations.radius}=${params.r}`} />
                                    <InlineMath math={`${translations.height}=${params.h}`} />
                                </div>
                            </foreignObject>
                        </g>
                    )}
                </g>

                {/* Value Display Overlay */}
                <g transform="translate(10, 20)">
                    <rect width="90" height="30" rx="4" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.1)" />
                    <text x="8" y="18" fill="white" fontSize="9" className="font-mono uppercase tracking-widest opacity-40">{isVolumeMode ? translations.volume : translations.area}</text>
                    <text x="85" y="19" textAnchor="end" fill={mainColor} fontSize="12" className="font-black italic">{animatedArea.toFixed(1)}</text>
                </g>
            </svg>

            <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${userAnswer === undefined ? 'bg-white/60' : (isCorrect ? 'bg-neon-green animate-pulse shadow-[0_0_8px_#39ff14]' : 'bg-neon-red shadow-[0_0_8px_#ff3131]')}`} />
                <span className="text-[7px] font-mono text-white/70 uppercase tracking-[0.2em]">{userAnswer === undefined ? translations.pending : (isCorrect ? translations.verified : translations.error)}</span>
            </div>

        </div>
    );
}
