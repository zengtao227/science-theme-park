"use client";

import { useEffect, useRef, useState } from "react";
import "katex/dist/katex.min.css";

interface LaserCanvasProps {
  level: number;
  mode?: "CALCULATE" | "INTERSECT" | "OPTIMIZE";
  // Plan A
  m1: number;
  c1: number;
  // Plan B (Optional)
  m2?: number;
  c2?: number;
  targetX?: number;
  targetY?: number;
  onHit?: () => void;
  onLineChange?: (slope: number, intercept: number) => void;
  labels?: {
    current_function?: string;
    reflections?: string;
    target_position?: string;
    hit_badge?: string;
    chamber?: string;
    laser_sim?: string;
    level?: string;
  };
}

const palette = {
  cyan: "#00e5ff",
  green: "#39ff14",
  pink: "#ff2d7d",
  amber: "#ffd166",
  white: "#ffffff",
  grid: "#333333",
};

export default function LaserCanvas({
  level,
  mode,
  m1,
  c1,
  m2,
  c2,
  targetX,
  targetY,
  onHit,
  onLineChange,
  labels,
}: LaserCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hitVisible, setHitVisible] = useState(false);

  const originX = 60;
  const originY = 700; // Inverted Y, origin near bottom-left
  const maxX = 30;  // 30 km — keeps targets near center
  const maxY = 30;  // 30 CHF

  // Convert grid coordinates to canvas coordinates
  const toCanvas = (x: number, y: number) => ({
    cx: originX + (x / maxX) * (canvasRef.current?.width ? canvasRef.current.width - 120 : 600),
    cy: originY - (y / maxY) * (canvasRef.current?.height ? canvasRef.current.height - 150 : 600),
  });

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const render = () => {
      const time = performance.now() / 1000;
      const targetPos = { x: targetX ?? 0, y: targetY ?? 0 };

      // DRAWING LOGIC FOR PRICING
      ctx.fillStyle = "#000005";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. GRID
      const step = maxX / 10;
      ctx.strokeStyle = palette.grid;
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= maxX; i += step) {
        const { cx } = toCanvas(i, 0);
        ctx.beginPath();
        ctx.moveTo(cx, originY);
        ctx.lineTo(cx, toCanvas(0, maxY).cy);
        ctx.stroke();
      }
      for (let i = 0; i <= maxY; i += step) {
        const { cy } = toCanvas(0, i);
        ctx.beginPath();
        ctx.moveTo(originX, cy);
        ctx.lineTo(toCanvas(maxX, 0).cx, cy);
        ctx.stroke();
      }

      // 2. AXES
      ctx.strokeStyle = palette.white;
      ctx.lineWidth = 2;
      ctx.beginPath(); // Y Axis
      ctx.moveTo(originX, originY + 20);
      ctx.lineTo(originX, toCanvas(0, maxY).cy - 20);
      ctx.stroke();
      ctx.beginPath(); // X Axis
      ctx.moveTo(originX - 20, originY);
      ctx.lineTo(toCanvas(maxX, 0).cx + 20, originY);
      ctx.stroke();

      // Tick labels
      ctx.fillStyle = "#ffffff88";
      ctx.font = "11px monospace";
      ctx.textAlign = "center";
      for (let i = step; i <= maxX; i += step) {
        const { cx } = toCanvas(i, 0);
        ctx.fillText(String(Math.round(i)), cx, originY + 18);
      }
      ctx.textAlign = "right";
      for (let i = step; i <= maxY; i += step) {
        const { cy } = toCanvas(0, i);
        ctx.fillText(String(Math.round(i)), originX - 8, cy + 4);
      }
      // Axis names
      ctx.fillStyle = palette.white;
      ctx.font = "bold 13px monospace";
      ctx.textAlign = "center";
      ctx.fillText("km", toCanvas(maxX, 0).cx + 10, originY + 36);
      ctx.textAlign = "right";
      ctx.fillText("CHF", originX - 6, toCanvas(0, maxY).cy - 12);
      ctx.textAlign = "start"; // reset

      // 3. PLAN A (Static/Target) - The Cyan Line
      const drawLine = (m: number, c: number, color: string, label: string) => {
        const p1 = toCanvas(0, c);
        const p2 = toCanvas(maxX, m * maxX + c);
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(p1.cx, p1.cy);
        ctx.lineTo(p2.cx, p2.cy);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.font = "10px font-mono";
        ctx.fillText(label, p2.cx - 60, p2.cy - 10);
      };

      drawLine(m1, c1, palette.cyan, "PLAN A");

      // 4. PLAN B (User/Competitor) - The Pink/Amber Line
      if (m2 !== undefined && c2 !== undefined) {
        drawLine(m2, c2, palette.pink, "PLAN B");
      }

      // 5. INTERSECTION POINT / TARGET
      if (mode === "INTERSECT" || mode === "OPTIMIZE") {
        const pt = toCanvas(targetPos.x, targetPos.y);
        ctx.fillStyle = palette.green;
        ctx.beginPath();
        ctx.arc(pt.cx, pt.cy, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = palette.white;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pt.cx, pt.cy, 10, 0, Math.PI * 2);
        ctx.stroke();

        // Highlight intersection distance
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = palette.green;
        ctx.beginPath();
        ctx.moveTo(pt.cx, pt.cy);
        ctx.lineTo(pt.cx, originY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillText(`Break-even: ${targetPos.x.toFixed(1)} km`, pt.cx + 15, pt.cy);
      } else if (mode === "CALCULATE") {
        const pt = toCanvas(targetX || 0, targetY || 0);
        ctx.fillStyle = palette.amber;
        ctx.beginPath();
        ctx.arc(pt.cx, pt.cy, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = palette.amber;
        ctx.beginPath();
        ctx.moveTo(pt.cx, pt.cy);
        ctx.lineTo(originX, pt.cy);
        ctx.moveTo(pt.cx, pt.cy);
        ctx.lineTo(pt.cx, originY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillText(`Target: ${(targetY ?? 0).toFixed(2)} CHF`, pt.cx + 15, pt.cy);
      }
      raf = requestAnimationFrame(render);
      return () => cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [level, mode, m1, c1, m2, c2, onHit, targetX, targetY]);

  return (
    <div className="relative w-full h-[800px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="w-full h-full"
      />

      {/* Info panel */}
      <div className="absolute top-4 left-4 bg-black/70 border border-cyan-400/30 rounded-lg px-4 py-3 space-y-2">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider">
          {labels?.current_function || "Fare Statistics"}
        </div>
        <div className="text-[11px] font-mono text-white">
          <div className="text-cyan-400">Plan A: y = {m1.toFixed(2)}x + {c1.toFixed(2)}</div>
          {m2 !== undefined && c2 !== undefined && (
            <div className="text-pink-400">Plan B: y = {m2.toFixed(2)}x + {c2.toFixed(2)}</div>
          )}
        </div>
      </div>

      {/* Target info */}
      <div className="absolute top-4 right-4 bg-black/70 border border-amber-400/30 rounded-lg px-4 py-3">
        <div className="text-[9px] text-amber-400/60 uppercase tracking-wider mb-1">
          {labels?.target_position || "Target Position"}
        </div>
        <div className="text-[11px] font-mono text-white">
          ({(targetX ?? 0).toFixed(1)}, {(targetY ?? 0).toFixed(1)})
        </div>
      </div>

      {/* Hit indicator */}
      {hitVisible && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500/20 border border-green-400 rounded-lg px-6 py-2">
          <div className="text-green-400 font-black text-sm animate-pulse">
            ✓ {labels?.hit_badge || "TARGET HIT"}
          </div>
        </div>
      )}

      {/* Status */}
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/60 text-right">
        {labels?.chamber || "CHAMBER"} {"//"} S2.03<br />
        {labels?.laser_sim || "LASER_SIM"}: ACTIVE<br />
        {labels?.level || "LEVEL"}: {level}
      </div>
    </div>
  );
}
