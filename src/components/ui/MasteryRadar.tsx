"use client";

import { useMemo } from "react";
import { motion, easeOut } from "framer-motion";
import { clsx } from "clsx";

type MasteryRadarProps = {
  conceptual: number;
  speed: number;
  rigor: number;
  decay: number;
  labels: {
    title: string;
    conceptual: string;
    speed: string;
    rigor: string;
    decay: string;
  };
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export default function MasteryRadar({ conceptual, speed, rigor, decay, labels }: MasteryRadarProps) {
  const metrics = useMemo(() => ([
    { id: "conceptual", label: labels.conceptual, value: clamp(conceptual * decay), color: "neon-cyan" },
    { id: "speed", label: labels.speed, value: clamp(speed * decay), color: "neon-cyan" },
    { id: "rigor", label: labels.rigor, value: clamp(rigor * decay), color: "neon-purple" },
    { id: "decay", label: labels.decay, value: clamp(decay), color: "neon-purple" },
  ]), [conceptual, decay, labels, rigor, speed]);

  const size = 180; // Reduced from 260
  const center = size / 2;
  const radius = 65; // Reduced from 90
  const levels = [0.25, 0.5, 0.75, 1];
  const angleStep = (Math.PI * 2) / metrics.length;

  const polygon = metrics.map((metric, index) => {
    const angle = -Math.PI / 2 + index * angleStep;
    const r = radius * metric.value;
    const x = center + Math.cos(angle) * r;
    const y = center + Math.sin(angle) * r;
    return `${x},${y}`;
  }).join(" ");

  const labelPoints = metrics.map((metric, index) => {
    const angle = -Math.PI / 2 + index * angleStep;
    const r = radius + 18; // Reduced from 24
    const x = center + Math.cos(angle) * r;
    const y = center + Math.sin(angle) * r;
    return { ...metric, x, y };
  });

  const transition = { duration: 0.6, ease: easeOut };

  return (
    <div
      className="relative overflow-hidden rounded-xl p-4 backdrop-blur-lg border shadow-[0_0_20px_rgba(0,0,0,0.25)] max-w-sm"
      style={{ borderColor: "var(--color-mastery-border)", backgroundColor: "var(--color-mastery-glass)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-[9px] uppercase tracking-[0.3em] text-white/60 font-black">{labels.title}</div>
        <div className="text-[8px] uppercase tracking-[0.2em] text-white/40 font-black">
          {labels.decay}: {Math.round(decay * 100)}%
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
          {levels.map((level) => (
            <polygon
              key={level}
              points={metrics.map((_, index) => {
                const angle = -Math.PI / 2 + index * angleStep;
                const r = radius * level;
                const x = center + Math.cos(angle) * r;
                const y = center + Math.sin(angle) * r;
                return `${x},${y}`;
              }).join(" ")}
              fill="none"
              stroke="var(--color-mastery-grid)"
              strokeWidth="0.5"
            />
          ))}
          {metrics.map((_, index) => {
            const angle = -Math.PI / 2 + index * angleStep;
            const x = center + Math.cos(angle) * radius;
            const y = center + Math.sin(angle) * radius;
            return (
              <line
                key={index}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="var(--color-mastery-line)"
                strokeWidth="0.5"
              />
            );
          })}

          <motion.polygon
            points={polygon}
            fill="var(--color-mastery-cyan-20)"
            stroke="var(--color-mastery-cyan)"
            strokeWidth="1.5"
            animate={{ points: polygon }}
            transition={transition}
          />
          {metrics.map((metric, index) => {
            const angle = -Math.PI / 2 + index * angleStep;
            const r = radius * metric.value;
            const x = center + Math.cos(angle) * r;
            const y = center + Math.sin(angle) * r;
            return (
              <motion.circle
                key={metric.id}
                cx={x}
                cy={y}
                r={3}
                fill={metric.color === "neon-purple" ? "var(--color-mastery-purple)" : "var(--color-mastery-cyan)"}
                animate={{ cx: x, cy: y }}
                transition={transition}
              />
            );
          })}

          {labelPoints.map((metric) => (
            <text
              key={metric.id}
              x={metric.x}
              y={metric.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--color-mastery-label)"
              fontSize="8"
              fontWeight="700"
            >
              {metric.label}
            </text>
          ))}
        </svg>

        <div className="flex-1 space-y-2">
          {metrics.map((metric) => (
            <div key={metric.id} className="flex items-center justify-between">
              <div className={clsx("text-[8px] uppercase tracking-[0.2em] font-black", `text-${metric.color}`)}>{metric.label}</div>
              <div className="text-[9px] text-white/70 font-mono">{Math.round(metric.value * 100)}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
