"use client";

import { useRef, useState, useEffect } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface LaserCanvasProps {
  level: number;
  slope: number;
  intercept: number;
  onHit?: () => void;
}

const palette = {
  cyan: "#00e5ff",
  green: "#39ff14",
  pink: "#ff2d7d",
  amber: "#ffd166",
  white: "#ffffff",
  grid: "#333333",
};

export default function LaserCanvas({ level, slope, intercept, onHit }: LaserCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [targetPos, setTargetPos] = useState({ x: 8, y: 6 });
  const [laserPath, setLaserPath] = useState<{ x: number; y: number }[]>([]);
  const [isHit, setIsHit] = useState(false);

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

  // Convert canvas coordinates to grid coordinates
  const toGrid = (cx: number, cy: number) => ({
    x: (cx - originX) / gridSize,
    y: (originY - cy) / gridSize,
  });

  // Calculate laser path with reflections
  const calculateLaserPath = () => {
    const path: { x: number; y: number }[] = [];
    const laserStart = { x: 0, y: intercept };
    
    if (intercept < 0 || intercept > maxY) return path;
    
    path.push(laserStart);
    
    let currentX = 0;
    let currentY = intercept;
    let currentSlope = slope;
    let reflections = 0;
    const maxReflections = level >= 3 ? 2 : 1;
    
    // Trace laser path
    while (reflections <= maxReflections && currentX < maxX) {
      // Calculate next intersection with boundaries
      const nextX = maxX;
      const nextY = currentY + currentSlope * (nextX - currentX);
      
      // Check top boundary (y = maxY)
      if (nextY > maxY) {
        const intersectX = currentX + (maxY - currentY) / currentSlope;
        if (intersectX <= maxX) {
          path.push({ x: intersectX, y: maxY });
          currentX = intersectX;
          currentY = maxY;
          currentSlope = -currentSlope; // Reflect
          reflections++;
          continue;
        }
      }
      
      // Check bottom boundary (y = 0)
      if (nextY < 0) {
        const intersectX = currentX + (0 - currentY) / currentSlope;
        if (intersectX <= maxX) {
          path.push({ x: intersectX, y: 0 });
          currentX = intersectX;
          currentY = 0;
          currentSlope = -currentSlope; // Reflect
          reflections++;
          continue;
        }
      }
      
      // No boundary hit, continue to edge
      path.push({ x: nextX, y: nextY });
      break;
    }
    
    return path;
  };

  // Check if laser hits target
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

  useEffect(() => {
    const path = calculateLaserPath();
    setLaserPath(path);
    const hit = checkHit(path);
    setIsHit(hit);
    if (hit && onHit) {
      onHit();
    }
  }, [slope, intercept, targetPos, level]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = "#000005";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
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
    
    // Draw axes
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
    
    // Draw axis labels
    ctx.fillStyle = palette.white;
    ctx.font = "10px monospace";
    ctx.fillText("x", toCanvas(maxX, 0).cx + 10, originY + 5);
    ctx.fillText("y", originX - 15, toCanvas(0, maxY).cy - 5);
    
    // Draw boundaries
    ctx.strokeStyle = palette.cyan;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    // Top boundary
    ctx.beginPath();
    ctx.moveTo(toCanvas(0, maxY).cx, toCanvas(0, maxY).cy);
    ctx.lineTo(toCanvas(maxX, maxY).cx, toCanvas(maxX, maxY).cy);
    ctx.stroke();
    // Right boundary
    ctx.beginPath();
    ctx.moveTo(toCanvas(maxX, 0).cx, toCanvas(maxX, 0).cy);
    ctx.lineTo(toCanvas(maxX, maxY).cx, toCanvas(maxX, maxY).cy);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw laser path
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
      
      // Draw reflection points
      for (let i = 1; i < laserPath.length - 1; i++) {
        const point = toCanvas(laserPath[i].x, laserPath[i].y);
        ctx.fillStyle = palette.amber;
        ctx.beginPath();
        ctx.arc(point.cx, point.cy, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Draw laser source
    const source = toCanvas(0, intercept);
    ctx.fillStyle = palette.cyan;
    ctx.shadowBlur = 15;
    ctx.shadowColor = palette.cyan;
    ctx.beginPath();
    ctx.arc(source.cx, source.cy, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Draw target
    const target = toCanvas(targetPos.x, targetPos.y);
    ctx.fillStyle = isHit ? palette.green : palette.amber;
    ctx.shadowBlur = 15;
    ctx.shadowColor = isHit ? palette.green : palette.amber;
    ctx.beginPath();
    ctx.arc(target.cx, target.cy, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Draw target ring
    ctx.strokeStyle = isHit ? palette.green : palette.amber;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(target.cx, target.cy, 15, 0, Math.PI * 2);
    ctx.stroke();
    
  }, [laserPath, targetPos, intercept, isHit]);

  return (
    <div className="relative w-full h-[400px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full h-full"
      />
      
      {/* Info panel */}
      <div className="absolute top-4 left-4 bg-black/70 border border-cyan-400/30 rounded-lg px-4 py-3 space-y-2">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider">
          Current Function
        </div>
        <div className="text-[11px] font-mono text-white">
          <InlineMath math={`y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`} />
        </div>
        <div className="text-[9px] text-white/40 mt-1">
          Reflections: {laserPath.length - 2 >= 0 ? laserPath.length - 2 : 0}
        </div>
      </div>
      
      {/* Target info */}
      <div className="absolute top-4 right-4 bg-black/70 border border-amber-400/30 rounded-lg px-4 py-3">
        <div className="text-[9px] text-amber-400/60 uppercase tracking-wider mb-1">
          Target Position
        </div>
        <div className="text-[11px] font-mono text-white">
          ({targetPos.x.toFixed(1)}, {targetPos.y.toFixed(1)})
        </div>
      </div>
      
      {/* Hit indicator */}
      {isHit && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500/20 border border-green-400 rounded-lg px-6 py-2">
          <div className="text-green-400 font-black text-sm animate-pulse">
            ✓ TARGET HIT
          </div>
        </div>
      )}
      
      {/* Status */}
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 text-right">
        CHAMBER // S2.03<br />
        LASER_SIM: ACTIVE<br />
        LEVEL: {level}
      </div>
    </div>
  );
}
