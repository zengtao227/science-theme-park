"use client";

import { useEffect, useState, useRef } from "react";

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
}

export default function S101_GeometryCanvas({
    geometry,
    userAnswer,
    isVolumeMode = false
}: GeometryCanvasProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [animatedArea, setAnimatedArea] = useState(0);

    useEffect(() => {
        if (!geometry) return;
        const targetArea = calculateArea(geometry);
        const duration = 800;
        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setAnimatedArea(targetArea * eased);
            if (progress < 1) requestAnimationFrame(animate);
        };
        animate();
    }, [geometry]);

    if (!geometry) {
        return (
            <div className="w-full aspect-square bg-[#0a0a0a] rounded-lg border border-white/10 flex items-center justify-center">
                <div className="text-white/30 text-xs uppercase tracking-wider">No Geometry Data</div>
            </div>
        );
    }

    const { type, params } = geometry;
    const scale = 30;
    const centerX = 250;
    const centerY = 250;

    const isCorrect = userAnswer !== undefined && Math.abs(userAnswer - calculateArea(geometry)) < 0.1;
    const fillColor = userAnswer === undefined
        ? 'rgba(255, 255, 255, 0.1)'
        : isCorrect ? 'rgba(57, 255, 20, 0.2)' : 'rgba(255, 100, 100, 0.2)';
    const strokeColor = userAnswer === undefined
        ? 'rgba(255, 255, 255, 0.5)'
        : isCorrect ? 'rgba(57, 255, 20, 1)' : 'rgba(255, 100, 100, 1)';

    return (
        <svg ref={svgRef} viewBox="0 0 500 500" className="w-full aspect-square bg-[#0a0a0a] rounded-lg border border-white/10">
            <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                </pattern>
            </defs>
            <rect width="500" height="500" fill="url(#grid)" />
            <line x1="0" y1={centerY} x2="500" y2={centerY} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <line x1={centerX} y1="0" x2={centerX} y2="500" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

            {type === 'rectangle' && (
                <>
                    <rect x={centerX - (params.a * scale) / 2} y={centerY - (params.b * scale) / 2} width={params.a * scale} height={params.b * scale} fill={fillColor} stroke={strokeColor} strokeWidth="3" />
                    <text x={centerX} y={centerY - (params.b * scale) / 2 - 10} fill="white" fontSize="12" textAnchor="middle">a = {params.a}</text>
                    <text x={centerX + (params.a * scale) / 2 + 20} y={centerY} fill="white" fontSize="12" textAnchor="start">b = {params.b}</text>
                </>
            )}

            {/* Simplified Triangle, Trapezoid, etc. (Truncated for brevity, full logic restored below) */}
            {type === 'triangle' && (
                <>
                    <polygon points={`${centerX - (params.b * scale) / 2},${centerY + (params.h * scale) / 2} ${centerX + (params.b * scale) / 2},${centerY + (params.h * scale) / 2} ${centerX},${centerY - (params.h * scale) / 2}`} fill={fillColor} stroke={strokeColor} strokeWidth="3" />
                    <text x={centerX} y={centerY + (params.h * scale) / 2 + 20} fill="white" fontSize="12" textAnchor="middle">b = {params.b}</text>
                    <text x={centerX - (params.b * scale) / 2 - 30} y={centerY} fill="white" fontSize="12" textAnchor="end">h = {params.h}</text>
                </>
            )}

            {type === 'trapezoid' && (
                <>
                    <polygon points={`${centerX - (params.b * scale) / 2},${centerY + (params.h * scale) / 2} ${centerX + (params.b * scale) / 2},${centerY + (params.h * scale) / 2} ${centerX + (params.a * scale) / 2},${centerY - (params.h * scale) / 2} ${centerX - (params.a * scale) / 2},${centerY - (params.h * scale) / 2}`} fill={fillColor} stroke={strokeColor} strokeWidth="3" />
                    <text x={centerX} y={centerY - (params.h * scale) / 2 - 10} fill="white" fontSize="12" textAnchor="middle">a = {params.a}</text>
                    <text x={centerX} y={centerY + (params.h * scale) / 2 + 20} fill="white" fontSize="12" textAnchor="middle">b = {params.b}</text>
                    <text x={centerX - (params.b * scale) / 2 - 30} y={centerY} fill="white" fontSize="12" textAnchor="end">h = {params.h}</text>
                </>
            )}

            {type === 'circle' && (
                <>
                    <circle cx={centerX} cy={centerY} r={params.r * scale} fill={fillColor} stroke={strokeColor} strokeWidth="3" />
                    <line x1={centerX} y1={centerY} x2={centerX + params.r * scale} y2={centerY} stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="5,5" />
                    <text x={centerX + (params.r * scale) / 2} y={centerY - 10} fill="white" fontSize="12" textAnchor="middle">r = {params.r}</text>
                </>
            )}

            {type === 'cube' && (
                <>
                    <rect x={centerX - (params.a * scale) / 2} y={centerY - (params.a * scale) / 2} width={params.a * scale} height={params.a * scale} fill={fillColor} stroke={strokeColor} strokeWidth="3" />
                    <rect x={centerX - (params.a * scale) / 2 + 30} y={centerY - (params.a * scale) / 2 - 30} width={params.a * scale} height={params.a * scale} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <line x1={centerX - (params.a * scale) / 2} y1={centerY - (params.a * scale) / 2} x2={centerX - (params.a * scale) / 2 + 30} y2={centerY - (params.a * scale) / 2 - 30} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <line x1={centerX + (params.a * scale) / 2} y1={centerY - (params.a * scale) / 2} x2={centerX + (params.a * scale) / 2 + 30} y2={centerY - (params.a * scale) / 2 - 30} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <line x1={centerX + (params.a * scale) / 2} y1={centerY + (params.a * scale) / 2} x2={centerX + (params.a * scale) / 2 + 30} y2={centerY + (params.a * scale) / 2 - 30} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <text x={centerX} y={centerY + (params.a * scale) / 2 + 20} fill="white" fontSize="12" textAnchor="middle">a = {params.a}</text>
                </>
            )}

            {type === 'prism' && (
                <>
                    <rect x={centerX - (params.a * scale) / 2} y={centerY - (params.b * scale) / 2} width={params.a * scale} height={params.b * scale} fill={fillColor} stroke={strokeColor} strokeWidth="3" />
                    <rect x={centerX - (params.a * scale) / 2 + params.c * 5} y={centerY - (params.b * scale) / 2 - params.c * 5} width={params.a * scale} height={params.b * scale} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <line x1={centerX - (params.a * scale) / 2} y1={centerY - (params.b * scale) / 2} x2={centerX - (params.a * scale) / 2 + params.c * 5} y2={centerY - (params.b * scale) / 2 - params.c * 5} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <line x1={centerX + (params.a * scale) / 2} y1={centerY - (params.b * scale) / 2} x2={centerX + (params.a * scale) / 2 + params.c * 5} y2={centerY - (params.b * scale) / 2 - params.c * 5} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <text x={centerX} y={centerY + (params.b * scale) / 2 + 20} fill="white" fontSize="10" textAnchor="middle">a={params.a}, b={params.b}, c={params.c}</text>
                </>
            )}

            {type === 'cylinder' && (
                <>
                    <ellipse cx={centerX} cy={centerY - (params.h * scale) / 2} rx={params.r * scale} ry={params.r * scale * 0.3} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <rect x={centerX - params.r * scale} y={centerY - (params.h * scale) / 2} width={params.r * scale * 2} height={params.h * scale} fill={fillColor} stroke={strokeColor} strokeWidth="3" />
                    <ellipse cx={centerX} cy={centerY + (params.h * scale) / 2} rx={params.r * scale} ry={params.r * scale * 0.3} fill={fillColor} stroke={strokeColor} strokeWidth="3" />
                    <text x={centerX + params.r * scale + 20} y={centerY} fill="white" fontSize="12" textAnchor="start">r={params.r}, h={params.h}</text>
                </>
            )}

            {/* Info Display */}
            <text x="20" y="30" fill="white" fontSize="14" fontWeight="bold">{isVolumeMode ? 'Volume' : 'Area'}: {animatedArea.toFixed(2)}</text>
            {userAnswer !== undefined && (
                <text x="20" y="50" fill={isCorrect ? 'rgba(57, 255, 20, 1)' : 'rgba(255, 100, 100, 1)'} fontSize="12">Your answer: {userAnswer.toFixed(2)}</text>
            )}
        </svg>
    );
}
