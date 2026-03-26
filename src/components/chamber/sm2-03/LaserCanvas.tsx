"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
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
  className?: string;
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
  className,
}: LaserCanvasProps) {
  const { t } = useLanguage();
  void onLineChange;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hitVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const render = () => {
      const targetPos = { x: targetX ?? 0, y: targetY ?? 0 };
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const cssWidth = rect.width || 800;
      const cssHeight = rect.height || 800;
      const nextWidth = Math.max(1, Math.round(cssWidth * dpr));
      const nextHeight = Math.max(1, Math.round(cssHeight * dpr));
      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const lineXSeed = Math.max(8, targetPos.x || 0, 6);
      const candidateXs = [0, lineXSeed];
      const candidateYs = [c1];
      candidateYs.push(m1 * lineXSeed + c1);

      if (m2 !== undefined && c2 !== undefined) {
        candidateYs.push(c2, m2 * lineXSeed + c2);
      }
      if (targetX !== undefined) candidateXs.push(targetX);
      if (targetY !== undefined) candidateYs.push(targetY);

      const maxDataX = Math.max(...candidateXs.map((value) => Math.abs(value)));
      const maxDataY = Math.max(...candidateYs.map((value) => Math.abs(value)));
      const maxX = Math.max(10, Math.ceil(maxDataX * 1.25 + 2));
      const maxY = Math.max(10, Math.ceil(maxDataY * 1.25 + 2));

      const padding = { left: 52, right: 24, top: 24, bottom: 44 };
      const plotWidth = Math.max(1, cssWidth - padding.left - padding.right);
      const plotHeight = Math.max(1, cssHeight - padding.top - padding.bottom);
      const scale = Math.min(plotWidth / maxX, plotHeight / maxY);
      const originX = padding.left;
      const originY = cssHeight - padding.bottom;
      const topY = originY - maxY * scale;
      const rightX = originX + maxX * scale;

      const toCanvas = (x: number, y: number) => ({
        cx: originX + x * scale,
        cy: originY - y * scale,
      });

      // DRAWING LOGIC FOR PRICING
      ctx.fillStyle = "#000005";
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      // 1. GRID
      const gridDivisions = 8;
      const xStep = maxX / gridDivisions;
      const yStep = maxY / gridDivisions;
      ctx.strokeStyle = palette.grid;
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= maxX; i += xStep) {
        const { cx } = toCanvas(i, 0);
        ctx.beginPath();
        ctx.moveTo(cx, originY);
        ctx.lineTo(cx, topY);
        ctx.stroke();
      }
      for (let i = 0; i <= maxY; i += yStep) {
        const { cy } = toCanvas(0, i);
        ctx.beginPath();
        ctx.moveTo(originX, cy);
        ctx.lineTo(rightX, cy);
        ctx.stroke();
      }

      // 2. AXES
      ctx.strokeStyle = palette.white;
      ctx.lineWidth = 2;
      ctx.beginPath(); // Y Axis
      ctx.moveTo(originX, originY + 20);
      ctx.lineTo(originX, topY - 20);
      ctx.stroke();
      ctx.beginPath(); // X Axis
      ctx.moveTo(originX - 20, originY);
      ctx.lineTo(rightX + 20, originY);
      ctx.stroke();

      // Tick labels
      ctx.fillStyle = "#ffffff88";
      ctx.font = "11px monospace";
      ctx.textAlign = "center";
      for (let i = xStep; i <= maxX; i += xStep) {
        const { cx } = toCanvas(i, 0);
        ctx.fillText(String(Math.round(i)), cx, originY + 18);
      }
      ctx.textAlign = "right";
      for (let i = yStep; i <= maxY; i += yStep) {
        const { cy } = toCanvas(0, i);
        ctx.fillText(String(Math.round(i)), originX - 8, cy + 4);
      }
      // Axis names
      ctx.fillStyle = palette.white;
      ctx.font = "bold 13px monospace";
      ctx.textAlign = "center";
      ctx.fillText(t("sm2_03.laser.axis_km"), rightX + 10, originY + 36);
      ctx.textAlign = "right";
      ctx.fillText(t("sm2_03.laser.axis_chf"), originX - 6, topY - 12);
      ctx.textAlign = "start"; // reset

      // 3. PLAN A (Static/Target) - The Cyan Line
      const drawLine = (m: number, c: number, color: string, labelKey: string) => {
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
        ctx.fillText(t(labelKey), p2.cx - 60, p2.cy - 10);
      };

      drawLine(m1, c1, palette.cyan, "sm2_03.laser.plan_a");

      // 4. PLAN B (User/Competitor) - The Pink/Amber Line
      if (m2 !== undefined && c2 !== undefined) {
        drawLine(m2, c2, palette.pink, "sm2_03.laser.plan_b");
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

        ctx.fillText(t("sm2_03.laser.break_even", { distance: targetPos.x.toFixed(1) }), pt.cx + 15, pt.cy);
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

        ctx.fillText(t("sm2_03.laser.target_cost", { cost: (targetY ?? 0).toFixed(2) }), pt.cx + 15, pt.cy);
      }
      raf = requestAnimationFrame(render);
      return () => cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [level, mode, m1, c1, m2, c2, onHit, targetX, targetY]);

  return (
    <div className={`relative w-full min-h-[720px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl ${className ?? ""}`}>
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="w-full h-full"
      />

      {/* Info panel */}
      <div className="absolute top-4 left-4 bg-black/70 border border-cyan-400/30 rounded-lg px-4 py-3 space-y-2">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider">
          {labels?.current_function || t("sm2_03.laser.fare_statistics")}
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
          {labels?.target_position || t("sm2_03.laser.target_position")}
        </div>
        <div className="text-[11px] font-mono text-white">
          ({(targetX ?? 0).toFixed(1)}, {(targetY ?? 0).toFixed(1)})
        </div>
      </div>

      {/* Hit indicator */}
      {hitVisible && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500/20 border border-green-400 rounded-lg px-6 py-2">
          <div className="text-green-400 font-black text-sm animate-pulse">
            ✓ {labels?.hit_badge || t("sm2_03.laser.target_hit")}
          </div>
        </div>
      )}

      {/* Status */}
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/60 text-right">
        {labels?.chamber || t("sm2_03.laser.chamber")} {"//"} S2.03<br />
        {labels?.laser_sim || t("sm2_03.laser.laser_sim")}: ACTIVE<br />
        {labels?.level || t("sm2_03.laser.level")}: {level}
      </div>
    </div>
  );
}
