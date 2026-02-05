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

        // Dynamic Sizing for HiDPI
        const dpr = window.devicePixelRatio || 1;
        const size = 600;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.scale(dpr, dpr);

        const w = size;
        const h = size;
        ctx.clearRect(0, 0, w, h);

        const scale = Math.min(w, h) / (range * 2.2);
        const cx = w / 2;
        const cy = h / 2;

        const toPx = (x: number, y: number) => ({
            x: cx + x * scale,
            y: cy - y * scale
        });

        // Background Text (Euler Style)
        ctx.save();
        ctx.font = 'bold 12px monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.fillText("f(x) = ax + b", 20, 30);
        ctx.fillText("slope = \u0394y / \u0394x", 20, 50);
        ctx.fillText("lim(h\u21920) [f(x+h)-f(x)]/h", 20, 70);
        ctx.restore();

        // Grid
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1;
        for (let i = -range; i <= range; i++) {
            const pEdgePos = toPx(i, range);
            ctx.beginPath(); ctx.moveTo(pEdgePos.x, 0); ctx.lineTo(pEdgePos.x, h); ctx.stroke();
            const pEdgeH = toPx(range, i);
            ctx.beginPath(); ctx.moveTo(0, pEdgeH.y); ctx.lineTo(w, pEdgeH.y); ctx.stroke();

            // Numbers on Axes
            if (i !== 0 && i % 2 === 0) {
                ctx.font = '9px monospace';
                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                const px = toPx(i, 0);
                const py = toPx(0, i);
                ctx.fillText(i.toString(), px.x - 4, cx + 15);
                ctx.fillText(i.toString(), cy - 18, py.y + 4);
            }
        }

        // Axes with subtle glow
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255,255,255,0.1)';
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();
        ctx.restore();

        const drawLine = (m: number, b: number, color: string, width = 2, glow = false) => {
            const x1 = -range * 1.5;
            const y1 = m * x1 + b;
            const x2 = range * 1.5;
            const y2 = m * x2 + b;
            const p1 = toPx(x1, y1);
            const p2 = toPx(x2, y2);

            ctx.save();
            if (glow) {
                ctx.shadowBlur = 15;
                ctx.shadowColor = color;
            }
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
            ctx.restore();
        };

        const drawPoint = (x: number, y: number, color: string, radius = 4, glow = false) => {
            const p = toPx(x, y);
            ctx.save();
            if (glow) {
                ctx.shadowBlur = 15;
                ctx.shadowColor = color;
            }
            ctx.fillStyle = color;
            ctx.beginPath(); ctx.arc(p.x, p.y, radius, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        };

        staticLines.forEach(l => drawLine(l.m, l.b, l.color || 'rgba(255,255,255,0.2)'));
        staticPoints.forEach(p => drawPoint(p.x, p.y, p.color || 'rgba(255,255,255,0.5)'));

        userLines.forEach(l => {
            if (Number.isFinite(l.m) && Number.isFinite(l.b)) {
                drawLine(l.m, l.b, l.color || '#39ff14', 3, true);
            }
        });

        userPoints.forEach(p => {
            if (Number.isFinite(p.x) && Number.isFinite(p.y)) {
                drawPoint(p.x, p.y, p.color || '#39ff14', 6, true);
            }
        });

    }, [staticLines, staticPoints, userLines, userPoints, range]);

    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-neon-green/5 blur-2xl rounded-full opacity-20 pointer-events-none" />
            <canvas
                ref={ref}
                style={{ width: '100%', aspectRatio: '1/1' }}
                className="bg-[#050505] rounded-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            />
            <div className="absolute top-4 left-4 flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                <div className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em]">Matrix Visualizer v2.0</div>
            </div>
            <div className="absolute bottom-4 right-4 text-[7px] font-mono text-white/20 uppercase tracking-widest text-right">
                CHART_MODE: CARTESIAN<br />
                RENDER_ENGINE: 2D_NEON_CORE
            </div>
        </div>
    );
}
