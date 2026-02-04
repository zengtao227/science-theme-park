"use client";

import { useRef, useEffect, useState } from "react";

interface P202CircuitCanvasProps {
  scenario: "series" | "parallel" | "mixed" | "simple";
  voltage: number;
  resistance: number[];
  current?: number;
  isPowered?: boolean;
  showCurrent?: boolean;
}

export default function P202CircuitCanvas({
  scenario,
  voltage,
  resistance,
  current = 0,
  isPowered = false,
  showCurrent = true,
}: P202CircuitCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationOffset, setAnimationOffset] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Grid background
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Circuit positions
    const centerX = w / 2;
    const centerY = h / 2;
    const circuitWidth = 320;
    const circuitHeight = 200;

    // Draw based on scenario
    if (scenario === "simple") {
      drawSimpleCircuit(ctx, centerX, centerY, circuitWidth, circuitHeight, voltage, resistance[0], current, isPowered, animationOffset);
    } else if (scenario === "series") {
      drawSeriesCircuit(ctx, centerX, centerY, circuitWidth, circuitHeight, voltage, resistance, current, isPowered, animationOffset);
    } else if (scenario === "parallel") {
      drawParallelCircuit(ctx, centerX, centerY, circuitWidth, circuitHeight, voltage, resistance, current, isPowered, animationOffset);
    } else if (scenario === "mixed") {
      drawMixedCircuit(ctx, centerX, centerY, circuitWidth, circuitHeight, voltage, resistance, current, isPowered, animationOffset);
    }

    // Current indicator
    if (showCurrent && current > 0) {
      ctx.fillStyle = "rgba(57, 255, 20, 0.8)";
      ctx.font = "bold 14px monospace";
      ctx.fillText(`I = ${current.toFixed(2)} A`, 20, 30);
    }

  }, [scenario, voltage, resistance, current, isPowered, animationOffset, showCurrent]);

  // Animation loop for electron flow
  useEffect(() => {
    if (!isPowered || current <= 0) return;
    
    const interval = setInterval(() => {
      setAnimationOffset(prev => (prev + 2) % 20);
    }, 50);

    return () => clearInterval(interval);
  }, [isPowered, current]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full h-auto border border-white/10 rounded-lg bg-black/50"
      />
      <div className="absolute top-2 right-2 text-[9px] font-mono text-white/30 uppercase tracking-wider">
        Circuit Simulator
      </div>
    </div>
  );
}

// Draw simple circuit (battery + resistor/LED)
function drawSimpleCircuit(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  w: number,
  h: number,
  voltage: number,
  resistance: number,
  current: number,
  powered: boolean,
  offset: number
) {
  const left = cx - w / 2;
  const right = cx + w / 2;
  const top = cy - h / 2;
  const bottom = cy + h / 2;

  // Wires
  const wireColor = powered ? "rgba(57, 255, 20, 0.6)" : "rgba(255, 255, 255, 0.3)";
  ctx.strokeStyle = wireColor;
  ctx.lineWidth = 3;

  // Top wire
  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(right, top);
  ctx.stroke();

  // Right wire
  ctx.beginPath();
  ctx.moveTo(right, top);
  ctx.lineTo(right, bottom);
  ctx.stroke();

  // Bottom wire
  ctx.beginPath();
  ctx.moveTo(right, bottom);
  ctx.lineTo(left, bottom);
  ctx.stroke();

  // Left wire
  ctx.beginPath();
  ctx.moveTo(left, bottom);
  ctx.lineTo(left, top);
  ctx.stroke();

  // Draw electron flow animation
  if (powered && current > 0) {
    drawElectronFlow(ctx, [
      { x: left, y: top },
      { x: right, y: top },
      { x: right, y: bottom },
      { x: left, y: bottom },
      { x: left, y: top },
    ], offset);
  }

  // Battery (left side)
  drawBattery(ctx, left, cy, voltage, powered);

  // LED (top center)
  drawLED(ctx, cx, top, powered);

  // Resistor (right side)
  drawResistor(ctx, right, cy, resistance, powered);
}

// Draw series circuit
function drawSeriesCircuit(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  w: number,
  h: number,
  voltage: number,
  resistances: number[],
  current: number,
  powered: boolean,
  offset: number
) {
  const left = cx - w / 2;
  const right = cx + w / 2;
  const top = cy - h / 2;
  const bottom = cy + h / 2;

  const wireColor = powered ? "rgba(57, 255, 20, 0.6)" : "rgba(255, 255, 255, 0.3)";
  ctx.strokeStyle = wireColor;
  ctx.lineWidth = 3;

  // Draw circuit loop
  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(right, top);
  ctx.lineTo(right, bottom);
  ctx.lineTo(left, bottom);
  ctx.closePath();
  ctx.stroke();

  // Electron flow
  if (powered && current > 0) {
    drawElectronFlow(ctx, [
      { x: left, y: top },
      { x: right, y: top },
      { x: right, y: bottom },
      { x: left, y: bottom },
      { x: left, y: top },
    ], offset);
  }

  // Battery
  drawBattery(ctx, left, cy, voltage, powered);

  // Resistors in series (top side)
  const spacing = w / (resistances.length + 1);
  resistances.forEach((r, i) => {
    const x = left + spacing * (i + 1);
    drawResistor(ctx, x, top, r, powered);
  });
}

// Draw parallel circuit
function drawParallelCircuit(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  w: number,
  h: number,
  voltage: number,
  resistances: number[],
  current: number,
  powered: boolean,
  offset: number
) {
  const left = cx - w / 2;
  const right = cx + w / 2;
  const mid = cx;

  const wireColor = powered ? "rgba(57, 255, 20, 0.6)" : "rgba(255, 255, 255, 0.3)";
  ctx.strokeStyle = wireColor;
  ctx.lineWidth = 3;

  // Main horizontal wires
  ctx.beginPath();
  ctx.moveTo(left, cy);
  ctx.lineTo(mid - 60, cy);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(mid + 60, cy);
  ctx.lineTo(right, cy);
  ctx.stroke();

  // Parallel branches
  const branchSpacing = 80;
  const startY = cy - (resistances.length - 1) * branchSpacing / 2;

  resistances.forEach((r, i) => {
    const y = startY + i * branchSpacing;
    
    // Branch wires
    ctx.beginPath();
    ctx.moveTo(mid - 60, cy);
    ctx.lineTo(mid - 60, y);
    ctx.lineTo(mid + 60, y);
    ctx.lineTo(mid + 60, cy);
    ctx.stroke();

    // Resistor on branch
    drawResistor(ctx, mid, y, r, powered);
  });

  // Battery
  drawBattery(ctx, left, cy, voltage, powered);
}

// Draw mixed circuit (placeholder)
function drawMixedCircuit(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  w: number,
  h: number,
  voltage: number,
  resistances: number[],
  current: number,
  powered: boolean,
  offset: number
) {
  // For now, just draw series
  drawSeriesCircuit(ctx, cx, cy, w, h, voltage, resistances, current, powered, offset);
}

// Component drawing functions
function drawBattery(ctx: CanvasRenderingContext2D, x: number, y: number, voltage: number, powered: boolean) {
  const color = powered ? "rgba(255, 0, 85, 0.9)" : "rgba(255, 255, 255, 0.5)";
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3;

  // Battery symbol
  ctx.beginPath();
  ctx.moveTo(x - 5, y - 20);
  ctx.lineTo(x - 5, y + 20);
  ctx.stroke();

  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x + 5, y - 12);
  ctx.lineTo(x + 5, y + 12);
  ctx.stroke();

  // Label
  ctx.font = "bold 12px monospace";
  ctx.fillText(`${voltage}V`, x - 25, y - 30);
}

function drawResistor(ctx: CanvasRenderingContext2D, x: number, y: number, resistance: number, powered: boolean) {
  const color = powered ? "rgba(0, 210, 255, 0.9)" : "rgba(255, 255, 255, 0.5)";
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3;

  // Zigzag resistor symbol
  const zigzagWidth = 30;
  const zigzagHeight = 15;
  ctx.beginPath();
  ctx.moveTo(x - zigzagWidth, y);
  ctx.lineTo(x - zigzagWidth * 0.6, y - zigzagHeight);
  ctx.lineTo(x - zigzagWidth * 0.2, y + zigzagHeight);
  ctx.lineTo(x + zigzagWidth * 0.2, y - zigzagHeight);
  ctx.lineTo(x + zigzagWidth * 0.6, y + zigzagHeight);
  ctx.lineTo(x + zigzagWidth, y);
  ctx.stroke();

  // Label
  ctx.font = "bold 11px monospace";
  ctx.fillText(`${resistance}Ω`, x - 15, y + 30);
}

function drawLED(ctx: CanvasRenderingContext2D, x: number, y: number, powered: boolean) {
  const color = powered ? "rgba(57, 255, 20, 1)" : "rgba(255, 255, 255, 0.3)";
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;

  // LED triangle
  ctx.beginPath();
  ctx.moveTo(x - 10, y - 10);
  ctx.lineTo(x + 10, y);
  ctx.lineTo(x - 10, y + 10);
  ctx.closePath();
  if (powered) {
    ctx.fill();
    // Glow effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = "rgba(57, 255, 20, 0.8)";
    ctx.fill();
    ctx.shadowBlur = 0;
  } else {
    ctx.stroke();
  }

  // LED line
  ctx.beginPath();
  ctx.moveTo(x + 10, y - 10);
  ctx.lineTo(x + 10, y + 10);
  ctx.stroke();

  // Label
  ctx.font = "bold 11px monospace";
  ctx.fillText("LED", x - 15, y - 20);
}

function drawElectronFlow(ctx: CanvasRenderingContext2D, path: Array<{ x: number; y: number }>, offset: number) {
  ctx.fillStyle = "rgba(255, 255, 0, 0.8)";
  
  // Calculate total path length
  let totalLength = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const dx = path[i + 1].x - path[i].x;
    const dy = path[i + 1].y - path[i].y;
    totalLength += Math.sqrt(dx * dx + dy * dy);
  }

  // Draw electrons along path
  const electronSpacing = 40;
  const numElectrons = Math.floor(totalLength / electronSpacing);

  for (let i = 0; i < numElectrons; i++) {
    const targetDist = ((i * electronSpacing + offset) % totalLength);
    let currentDist = 0;

    for (let j = 0; j < path.length - 1; j++) {
      const dx = path[j + 1].x - path[j].x;
      const dy = path[j + 1].y - path[j].y;
      const segmentLength = Math.sqrt(dx * dx + dy * dy);

      if (currentDist + segmentLength >= targetDist) {
        const t = (targetDist - currentDist) / segmentLength;
        const x = path[j].x + dx * t;
        const y = path[j].y + dy * t;

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      currentDist += segmentLength;
    }
  }
}
