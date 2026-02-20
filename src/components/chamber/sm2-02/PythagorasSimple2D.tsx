"use client";

import { useState } from "react";
import { clsx } from "clsx";

interface PythagorasSimple2DProps {
  a: number;
  b: number;
  c: number;
  highlightRightAngle?: boolean;
}

export default function PythagorasSimple2D({ a, b, c, highlightRightAngle }: PythagorasSimple2DProps) {
  const [showProof, setShowProof] = useState(false);

  // Geometric math
  // Triangle Vertices: V1(0,b), V2(0,0), V3(a,0)
  // We'll calculate the squares attached to each side
  const v1 = { x: 0, y: 0 }; // Right angle vertex
  const v2 = { x: 0, y: b }; // Top vertex
  const v3 = { x: a, y: 0 }; // Right vertex

  // Square A (on side b, the vertical leg)
  // Points: (0,0), (0,b), (-b,b), (-b,0)
  const squareB = [
    { x: 0, y: 0 },
    { x: 0, y: b },
    { x: -b, y: b },
    { x: -b, y: 0 }
  ];

  // Square B (on side a, the horizontal leg)
  // Points: (0,0), (a,0), (a,-a), (0,-a)
  const squareA = [
    { x: 0, y: 0 },
    { x: a, y: 0 },
    { x: a, y: -a },
    { x: 0, y: -a }
  ];

  // Square C (on hypotenuse c)
  // Vector from V2 to V3 is (a, -b).
  // Perpendicular outward vector is (b, a).
  // Points: V2(0,b), V3(a,0), V3+N(a+b, a), V2+N(b, b+a)
  const squareC = [
    { x: 0, y: b },
    { x: a, y: 0 },
    { x: a + b, y: a },
    { x: b, y: b + a }
  ];

  // Calculate Bounding Box to auto-scale viewBox
  const allPoints = [...squareA, ...squareB, ...squareC, v1, v2, v3];
  const minX = Math.min(...allPoints.map(p => p.x)) - 1;
  const minY = Math.min(...allPoints.map(p => p.y)) - 1;
  const maxX = Math.max(...allPoints.map(p => p.x)) + 1;
  const maxY = Math.max(...allPoints.map(p => p.y)) + 1;

  const width = maxX - minX;
  const height = maxY - minY;

  // Padding
  const pad = Math.max(width, height) * 0.1;
  const viewBox = `${minX - pad} ${minY - pad} ${width + 2 * pad} ${height + 2 * pad}`;

  const formatPoints = (points: { x: number; y: number }[]) =>
    points.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <div className="relative w-full aspect-square bg-[#020208] rounded-xl border border-white/10 overflow-hidden flex flex-col">
      <div className="flex-1 w-full relative">
        <svg viewBox={viewBox} className="w-full h-full transform scale-y-[-1]">
          <defs>
            <pattern id="grid" width="1" height="1" patternUnits="userSpaceOnUse">
              <rect width="1" height="1" fill="none" stroke="white" strokeWidth="0.05" opacity="0.2" />
            </pattern>
          </defs>

          {/* Grid Background */}
          <rect x={minX - pad} y={minY - pad} width={width + 2 * pad} height={height + 2 * pad} fill="url(#grid)" opacity="0.1" />

          {/* Leg Square A */}
          <polygon
            points={formatPoints(squareA)}
            fill="#ff4444" fillOpacity="0.2"
            stroke="#ff4444" strokeWidth="0.1"
          />

          {/* Leg Square B */}
          <polygon
            points={formatPoints(squareB)}
            fill="#4488ff" fillOpacity="0.2"
            stroke="#4488ff" strokeWidth="0.1"
          />

          {/* Hypotenuse Square C */}
          <polygon
            points={formatPoints(squareC)}
            fill="#39ff14" fillOpacity="0.2"
            stroke="#39ff14" strokeWidth="0.1"
          />

          {/* Main Triangle */}
          <polygon
            points={`${v1.x},${v1.y} ${v2.x},${v2.y} ${v3.x},${v3.y}`}
            fill="#00ffff" fillOpacity="0.1"
            stroke="#00ffff" strokeWidth="0.15"
          />

          {/* Labels - Using un-transformed coordinates by adding another group or calculating */}
          <g transform="scale(1, -1)">
            <text x={a / 2} y={1.5} textAnchor="middle" fontSize="0.8" fill="#ff4444" fontWeight="bold">a</text>
            <text x={-1.5} y={-b / 2} textAnchor="middle" fontSize="0.8" fill="#4488ff" fontWeight="bold" transform={`rotate(-90, -1.5, ${-b / 2})`}>b</text>
            <text
              x={a / 2 + 1} y={-b / 2 - 1}
              textAnchor="middle" fontSize="0.8" fill="#39ff14" fontWeight="bold"
              transform={`rotate(${-Math.atan2(b, a) * 180 / Math.PI}, ${a / 2}, ${-b / 2})`}
            >c</text>
          </g>
        </svg>

        {/* CSS-based Labels to avoid SVG text inversion */}
        <div className="absolute inset-0 pointer-events-none">
          {/* We would typically use a separate overlay or un-flipped SVG text here */}
        </div>
      </div>

      {/* Stats / Controls Overlay */}
      <div className="p-4 bg-black/60 backdrop-blur-md border-t border-white/10 grid grid-cols-3 gap-4 font-mono text-center">
        <div className="text-red-400">
          <div className="text-[10px] opacity-50 uppercase">Side a</div>
          <div className="text-xl font-bold">{a}</div>
          <div className="text-xs">a^2 = {a * a}</div>
        </div>
        <div className="text-blue-400">
          <div className="text-[10px] opacity-50 uppercase">Side b</div>
          <div className="text-xl font-bold">{b}</div>
          <div className="text-xs">b^2 = {b * b}</div>
        </div>
        <div className="text-neon-green">
          <div className="text-[10px] opacity-50 uppercase">Hypotenuse c</div>
          <div className="text-xl font-bold">{c.toFixed(2)}</div>
          <div className="text-xs">c^2 ≈ {(c * c).toFixed(0)}</div>
        </div>
      </div>

      <div className="absolute top-4 left-4 bg-black/80 px-3 py-1.5 rounded-full border border-white/10 text-[10px] text-white/60 font-mono flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        {a}^2 + {b}^2 = {(a * a + b * b)}
      </div>
    </div>
  );
}
