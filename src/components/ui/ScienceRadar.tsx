"use client";

import { useMemo } from "react";
import { motion, easeOut } from "framer-motion";
import { clsx } from "clsx";

type ScienceRadarProps = {
  logic: number;
  intuition: number;
  rigor: number;
  experiment: number;
  labels: {
    title: string;
    logic: string;
    intuition: string;
    rigor: string;
    experiment: string;
  };
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export default function ScienceRadar({ logic, intuition, rigor, experiment, labels }: ScienceRadarProps) {
  const metrics = useMemo(() => ([
    { id: "logic", label: labels.logic, value: clamp(logic), color: "neon-cyan" },
    { id: "intuition", label: labels.intuition, value: clamp(intuition), color: "neon-green" },
    { id: "rigor", label: labels.rigor, value: clamp(rigor), color: "neon-purple" },
    { id: "experiment", label: labels.experiment, value: clamp(experiment), color: "neon-amber" },
  ]), [experiment, intuition, labels, logic, rigor]);

  const size = 280;
  const center = size / 2;
  const radius = 92;
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
    const r = radius + 26;
    const x = center + Math.cos(angle) * r;
    const y = center + Math.sin(angle) * r;
    return { ...metric, x, y };
  });

  const transition = { duration: 0.6, ease: easeOut };

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-lg border shadow-[0_0_30px_rgba(0,0,0,0.35)]"
      style={{ borderColor: "var(--color-mastery-border)", backgroundColor: "var(--color-mastery-glass)" }}
    >
      <div className="scanning-line-vertical" />
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{labels.title}</div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">
          {Math.round((logic + intuition + rigor + experiment) * 25)}%
        </div>
      </div>

      <div className="mt-6 flex flex-col lg:flex-row gap-6 items-center">
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
              strokeWidth="1"
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
                strokeWidth="1"
              />
            );
          })}

          <motion.polygon
            points={polygon}
            fill="var(--color-mastery-cyan-20)"
            stroke="var(--color-mastery-cyan)"
            strokeWidth="2"
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
                r={4}
                fill={
                  metric.color === "neon-purple"
                    ? "var(--color-mastery-purple)"
                    : metric.color === "neon-green" || metric.color === "neon-amber"
                      ? "var(--color-neon-green)"
                      : "var(--color-mastery-cyan)"
                }
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
              fontSize="10"
              fontWeight="700"
            >
              {metric.label}
            </text>
          ))}
        </svg>

        <div className="flex-1 w-full space-y-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="flex items-center justify-between border border-white/10 rounded-xl px-4 py-3 bg-black/40">
              <div className={clsx("text-xs uppercase tracking-[0.3em] font-black", `text-${metric.color}`)}>{metric.label}</div>
              <div className="text-xs text-white/70 font-mono">{Math.round(metric.value * 100)}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
