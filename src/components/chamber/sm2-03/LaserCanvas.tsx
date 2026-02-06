"use client";

import { useEffect, useRef, useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface LaserCanvasProps {
  level: number;
  slope: number;
  intercept: number;
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
  slope,
  intercept,
  targetX,
  targetY,
  onHit,
  onLineChange,
  labels,
}: LaserCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevHitRef = useRef(false);
  const [hitVisible, setHitVisible] = useState(false);
  const dragRef = useRef<{ active: boolean; mode: "intercept" | "slope" | null }>({
    active: false,
    mode: null,
  });
  const slopeRef = useRef(slope);
  const interceptRef = useRef(intercept);

  const gridSize = 20; // Grid spacing
  const originX = 50; // Canvas origin X
  const originY = 350; // Canvas origin Y (inverted Y axis)
  const maxX = 10;
  const maxY = 10;

  // Convert grid coordinates to canvas coordinates
  const toCanvas = (x: number, y: number) => ({
    cx: originX + x * gridSize,
    cy: originY - y * gridSize,
  });

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

  useEffect(() => {
    slopeRef.current = slope;
    interceptRef.current = intercept;
  }, [slope, intercept]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!dragRef.current.active || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const scaleY = canvasRef.current.height / rect.height;
      const cy = (event.clientY - rect.top) * scaleY;
      const y = (originY - cy) / gridSize;
      if (dragRef.current.mode === "intercept") {
        const nextIntercept = clamp(y, 0, maxY);
        onLineChange?.(slopeRef.current, nextIntercept);
      }
      if (dragRef.current.mode === "slope") {
        const controlX = 5;
        const nextSlope = clamp((y - interceptRef.current) / controlX, -3, 3);
        onLineChange?.(nextSlope, interceptRef.current);
      }
    };
    const handleMouseUp = () => {
      dragRef.current.active = false;
      dragRef.current.mode = null;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onLineChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const render = () => {
      const time = performance.now() / 1000;
      const baseTarget = {
        x: targetX ?? (level === 1 ? 8 : level === 2 ? 6 : 9),
        y: targetY ?? (level === 1 ? 6 : level === 2 ? 8 : 5),
      };
      const targetPos = level === 2
        ? {
          x: clamp(baseTarget.x + Math.sin(time * 0.8) * 1.2, 1, maxX - 1),
          y: clamp(baseTarget.y + Math.cos(time * 0.6) * 1.2, 1, maxY - 1),
        }
        : baseTarget;
      const calculateLaserPath = () => {
        const path: { x: number; y: number }[] = [];
        const startIntercept = interceptRef.current;
        const laserStart = { x: 0, y: startIntercept };
        if (startIntercept < 0 || startIntercept > maxY) return path;
        path.push(laserStart);
        let currentX = 0;
        let currentY = startIntercept;
        let currentSlope = slopeRef.current;
        let reflections = 0;
        const maxReflections = level >= 3 ? 2 : 1;
        while (reflections <= maxReflections && currentX < maxX) {
          const nextX = maxX;
          const nextY = currentY + currentSlope * (nextX - currentX);
          if (nextY > maxY) {
            const intersectX = currentX + (maxY - currentY) / currentSlope;
            if (intersectX <= maxX) {
              path.push({ x: intersectX, y: maxY });
              currentX = intersectX;
              currentY = maxY;
              currentSlope = -currentSlope;
              reflections += 1;
              continue;
            }
          }
          if (nextY < 0) {
            const intersectX = currentX + (0 - currentY) / currentSlope;
            if (intersectX <= maxX) {
              path.push({ x: intersectX, y: 0 });
              currentX = intersectX;
              currentY = 0;
              currentSlope = -currentSlope;
              reflections += 1;
              continue;
            }
          }
          path.push({ x: nextX, y: nextY });
          break;
        }
        return path;
      };
      const checkHit = (path: { x: number; y: number }[]) => {
        const hitThreshold = 0.5;
        for (const point of path) {
          const dist = Math.sqrt(
            Math.pow(point.x - targetPos.x, 2) + Math.pow(point.y - targetPos.y, 2)
          );
          if (dist < hitThreshold) {
            return true;
          }
        }
        return false;
      };
      const laserPath = calculateLaserPath();
      const isHit = checkHit(laserPath);
      if (isHit !== prevHitRef.current) {
        if (isHit) onHit?.();
        setHitVisible(isHit);
        prevHitRef.current = isHit;
      }
      ctx.fillStyle = "#000005";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = palette.grid;
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= maxX; i++) {
        const { cx } = toCanvas(i, 0);
        ctx.beginPath();
        ctx.moveTo(cx, toCanvas(0, 0).cy);
        ctx.lineTo(cx, toCanvas(0, maxY).cy);
        ctx.stroke();
      }
      for (let i = 0; i <= maxY; i++) {
        const { cy } = toCanvas(0, i);
        ctx.beginPath();
        ctx.moveTo(toCanvas(0, 0).cx, cy);
        ctx.lineTo(toCanvas(maxX, 0).cx, cy);
        ctx.stroke();
      }
      ctx.strokeStyle = palette.white;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(originX, toCanvas(0, 0).cy);
      ctx.lineTo(originX, toCanvas(0, maxY).cy);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(toCanvas(0, 0).cx, originY);
      ctx.lineTo(toCanvas(maxX, 0).cx, originY);
      ctx.stroke();
      ctx.fillStyle = palette.white;
      ctx.font = "10px monospace";
      ctx.fillText("x", toCanvas(maxX, 0).cx + 10, originY + 5);
      ctx.fillText("y", originX - 15, toCanvas(0, maxY).cy - 5);
      ctx.strokeStyle = palette.cyan;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(toCanvas(0, maxY).cx, toCanvas(0, maxY).cy);
      ctx.lineTo(toCanvas(maxX, maxY).cx, toCanvas(maxX, maxY).cy);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(toCanvas(maxX, 0).cx, toCanvas(maxX, 0).cy);
      ctx.lineTo(toCanvas(maxX, maxY).cx, toCanvas(maxX, maxY).cy);
      ctx.stroke();
      ctx.setLineDash([]);
      if (laserPath.length > 1) {
        ctx.strokeStyle = isHit ? palette.green : palette.pink;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = isHit ? palette.green : palette.pink;
        ctx.beginPath();
        const start = toCanvas(laserPath[0].x, laserPath[0].y);
        ctx.moveTo(start.cx, start.cy);
        for (let i = 1; i < laserPath.length; i++) {
          const point = toCanvas(laserPath[i].x, laserPath[i].y);
          ctx.lineTo(point.cx, point.cy);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
        for (let i = 1; i < laserPath.length - 1; i++) {
          const point = toCanvas(laserPath[i].x, laserPath[i].y);
          ctx.fillStyle = palette.amber;
          ctx.beginPath();
          ctx.arc(point.cx, point.cy, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      const source = toCanvas(0, interceptRef.current);
      ctx.fillStyle = palette.cyan;
      ctx.shadowBlur = 15;
      ctx.shadowColor = palette.cyan;
      ctx.beginPath();
      ctx.arc(source.cx, source.cy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      const controlX = 5;
      const slopeHandle = toCanvas(controlX, slopeRef.current * controlX + interceptRef.current);
      ctx.fillStyle = palette.white;
      ctx.beginPath();
      ctx.arc(slopeHandle.cx, slopeHandle.cy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = palette.white;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(slopeHandle.cx, slopeHandle.cy, 9, 0, Math.PI * 2);
      ctx.stroke();
      const interceptHandle = toCanvas(0, interceptRef.current);
      ctx.fillStyle = palette.white;
      ctx.beginPath();
      ctx.arc(interceptHandle.cx, interceptHandle.cy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = palette.white;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(interceptHandle.cx, interceptHandle.cy, 9, 0, Math.PI * 2);
      ctx.stroke();
      const target = toCanvas(targetPos.x, targetPos.y);
      ctx.fillStyle = isHit ? palette.green : palette.amber;
      ctx.shadowBlur = 15;
      ctx.shadowColor = isHit ? palette.green : palette.amber;
      ctx.beginPath();
      ctx.arc(target.cx, target.cy, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = isHit ? palette.green : palette.amber;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(target.cx, target.cy, 15, 0, Math.PI * 2);
      ctx.stroke();
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [level, onHit, targetX, targetY]);

  return (
    <div className="relative w-full h-[800px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="w-full h-full"
        onMouseDown={(event) => {
          if (!canvasRef.current) return;
          const rect = canvasRef.current.getBoundingClientRect();
          const scaleX = canvasRef.current.width / rect.width;
          const scaleY = canvasRef.current.height / rect.height;
          const cx = (event.clientX - rect.left) * scaleX;
          const cy = (event.clientY - rect.top) * scaleY;
          const interceptHandle = toCanvas(0, interceptRef.current);
          const controlX = 5;
          const slopeHandle = toCanvas(controlX, slopeRef.current * controlX + interceptRef.current);
          const distIntercept = Math.hypot(cx - interceptHandle.cx, cy - interceptHandle.cy);
          const distSlope = Math.hypot(cx - slopeHandle.cx, cy - slopeHandle.cy);
          if (distIntercept < 12) {
            dragRef.current.active = true;
            dragRef.current.mode = "intercept";
          } else if (distSlope < 12) {
            dragRef.current.active = true;
            dragRef.current.mode = "slope";
          }
        }}
      />
      
      {/* Info panel */}
      <div className="absolute top-4 left-4 bg-black/70 border border-cyan-400/30 rounded-lg px-4 py-3 space-y-2">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider">
          {labels?.current_function || "Current Function"}
        </div>
        <div className="text-[11px] font-mono text-white">
          <InlineMath math={`y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`} />
        </div>
        <div className="text-[9px] text-white/40 mt-1">
          {labels?.reflections || "Reflections"}: {level >= 3 ? 2 : 1}
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
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 text-right">
        {labels?.chamber || "CHAMBER"} {"//"} S2.03<br />
        {labels?.laser_sim || "LASER_SIM"}: ACTIVE<br />
        {labels?.level || "LEVEL"}: {level}
      </div>
    </div>
  );
}
