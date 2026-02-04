"use client";

import React, { useEffect, useRef } from 'react';

interface FunctionCanvasProps {
    staticLines?: { m: number, b: number, color?: string }[];
    staticPoints?: { x: number, y: number, color?: string }[];
    userLines?: { m: number, b: number, color?: string }[];
    userPoints?: { x: number, y: number, color?: string }[];
    range?: number;
}

export default function S203_FunctionCanvas({
    staticLines = [],
    staticPoints = [],
    userLines = [],
    userPoints = [],
    range = 10
}: FunctionCanvasProps) {
    const ref = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const scale = Math.min(w, h) / (range * 2);
        const cx = w / 2;
        const cy = h / 2;

        const toPx = (x: number, y: number) => ({
            x: cx + x * scale,
            y: cy - y * scale
        });

        // Grid
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1;
        for (let i = -range; i <= range; i++) {
            const pEdgePos = toPx(i, range);
            ctx.beginPath(); ctx.moveTo(pEdgePos.x, 0); ctx.lineTo(pEdgePos.x, h); ctx.stroke();
            const pEdgeH = toPx(range, i);
            ctx.beginPath(); ctx.moveTo(0, pEdgeH.y); ctx.lineTo(w, pEdgeH.y); ctx.stroke();
        }

        // Axes
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();

        const drawLine = (m: number, b: number, color: string, width = 2) => {
            const x1 = -range;
            const y1 = m * x1 + b;
            const x2 = range;
            const y2 = m * x2 + b;
            const p1 = toPx(x1, y1);
            const p2 = toPx(x2, y2);
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
        };

        const drawPoint = (x: number, y: number, color: string, radius = 4) => {
            const p = toPx(x, y);
            ctx.fillStyle = color;
            ctx.beginPath(); ctx.arc(p.x, p.y, radius, 0, Math.PI * 2); ctx.fill();
        };

        staticLines.forEach(l => drawLine(l.m, l.b, l.color || 'rgba(255,255,255,0.2)'));
        staticPoints.forEach(p => drawPoint(p.x, p.y, p.color || 'rgba(255,255,255,0.5)'));

        userLines.forEach(l => {
            if (Number.isFinite(l.m) && Number.isFinite(l.b)) {
                drawLine(l.m, l.b, l.color || 'rgba(0, 255, 157, 1)', 3);
            }
        });

        userPoints.forEach(p => {
            if (Number.isFinite(p.x) && Number.isFinite(p.y)) {
                drawPoint(p.x, p.y, p.color || 'rgba(0, 255, 157, 1)', 6);
            }
        });

    }, [staticLines, staticPoints, userLines, userPoints, range]);

    return (
        <div className="relative group">
            <canvas ref={ref} width={500} height={500} className="w-full aspect-square bg-[#0a0a0a] rounded-lg border border-white/10 shadow-inner" />
            <div className="absolute top-2 right-2 text-[8px] font-black text-white/20 uppercase tracking-widest pointer-events-none">Function Plotter v1.2</div>
        </div>
    );
}
