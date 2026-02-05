"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SystemsVisual {
    eq1: { a: number, b: number, c: number }; // ax + by = c
    eq2: { a: number, b: number, c: number };
    intersect?: { x: number, y: number };
}

export default function S206_SystemsCanvas({ visual }: { visual?: SystemsVisual }) {
    const ref = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // HiDPI Scaling
        const dpr = window.devicePixelRatio || 1;
        const size = 600;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.scale(dpr, dpr);

        const w = size;
        const h = size;
        ctx.clearRect(0, 0, w, h);

        const range = 10;
        const scale = (w / 2) / (range * 1.1);
        const cx = w / 2;
        const cy = h / 2;

        // Helper to convert math coords to pixels
        const toPx = (x: number, y: number) => ({
            x: cx + x * scale,
            y: cy - y * scale
        });

        // 1. Draw Grid
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.lineWidth = 1;
        for (let i = -range; i <= range; i++) {
            const p1 = toPx(i, -range);
            const p2 = toPx(i, range);
            ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
            const p3 = toPx(-range, i);
            const p4 = toPx(range, i);
            ctx.beginPath(); ctx.moveTo(p3.x, p3.y); ctx.lineTo(p4.x, p4.y); ctx.stroke();
        }

        // 2. Draw Axes
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();

        if (!visual) return;

        // 3. Draw Lines
        const drawLine = (eq: { a: number, b: number, c: number }, color: string, glow: string) => {
            ctx.save();
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.shadowColor = glow;
            ctx.shadowBlur = 15;
            ctx.beginPath();

            // Calculate two points at the boundaries of the canvas
            // ax + by = c => y = (c - ax) / b
            if (Math.abs(eq.b) > 0.0001) {
                const x1 = -range;
                const y1 = (eq.c - eq.a * x1) / eq.b;
                const x2 = range;
                const y2 = (eq.c - eq.a * x2) / eq.b;
                const p1 = toPx(x1, y1);
                const p2 = toPx(x2, y2);
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
            } else {
                // Vertical line: x = c/a
                const x = eq.c / eq.a;
                const p1 = toPx(x, -range);
                const p2 = toPx(x, range);
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
            }
            ctx.stroke();
            ctx.restore();
        };

        drawLine(visual.eq1, "#00e5ff", "rgba(0, 229, 255, 0.5)"); // Line 1: Cyan
        drawLine(visual.eq2, "#ff0080", "rgba(255, 0, 128, 0.5)"); // Line 2: Pink

        // 4. Draw Intersect Point
        if (visual.intersect) {
            const p = toPx(visual.intersect.x, visual.intersect.y);
            ctx.save();
            ctx.fillStyle = "#fff";
            ctx.shadowColor = "#fff";
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Crosshair
            ctx.strokeStyle = "rgba(255,255,255,0.5)";
            ctx.setLineDash([5, 5]);
            ctx.beginPath(); ctx.moveTo(p.x, 0); ctx.lineTo(p.x, h); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, p.y); ctx.lineTo(w, p.y); ctx.stroke();
        }

    }, [visual]);

    return (
        <div className="relative w-full aspect-square max-w-[500px] bg-[#050505] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center" />
            <canvas ref={ref} className="w-full h-full p-4" />

            <div className="absolute top-4 left-4 flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                <span className="text-[8px] font-mono text-white/40 tracking-[0.3em] uppercase">System_Scanner v1.2</span>
            </div>

            <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 text-right">
                CHAMBER // S2.06<br />
                COORD_SYNC: OK
            </div>
        </div>
    );
}
