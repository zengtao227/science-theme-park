"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import ConceptIcon from "@/components/ConceptIcon";

type ModuleCardProps = {
  code: string;
  title: string;
  desc: string;
  color: string;
  progress: { percent: number; completed: boolean };
  href: string;
  actionLabel: string;
  completedLabel: string;
};

export default function ModuleCard({ code, title, desc, color, progress, href, actionLabel, completedLabel }: ModuleCardProps) {
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setFill(progress.percent));
    return () => cancelAnimationFrame(handle);
  }, [progress.percent]);

  const colorStyles = {
    "neon-cyan": {
      text: "text-neon-cyan",
      border: "border-neon-cyan/20",
      hoverText: "group-hover:text-neon-cyan",
      hoverBorder: "group-hover:border-neon-cyan",
      hoverBg: "group-hover:bg-neon-cyan/5",
      hoverIconBg: "group-hover:bg-neon-cyan/10",
    },
    "neon-purple": {
      text: "text-neon-purple",
      border: "border-neon-purple/20",
      hoverText: "group-hover:text-neon-purple",
      hoverBorder: "group-hover:border-neon-purple",
      hoverBg: "group-hover:bg-neon-purple/5",
      hoverIconBg: "group-hover:bg-neon-purple/10",
    },
    "neon-green": {
      text: "text-neon-green",
      border: "border-neon-green/20",
      hoverText: "group-hover:text-neon-green",
      hoverBorder: "group-hover:border-neon-green",
      hoverBg: "group-hover:bg-neon-green/5",
      hoverIconBg: "group-hover:bg-neon-green/10",
    },
    "neon-amber": {
      text: "text-neon-amber",
      border: "border-neon-amber/20",
      hoverText: "group-hover:text-neon-amber",
      hoverBorder: "group-hover:border-neon-amber",
      hoverBg: "group-hover:bg-neon-amber/5",
      hoverIconBg: "group-hover:bg-neon-amber/10",
    },
  } as const;
  const palette = colorStyles[color as keyof typeof colorStyles] ?? colorStyles["neon-green"];

  return (
    <Link href={href} className="group block h-full">
      <div className={clsx(
        "hud-panel p-6 h-full transition-all duration-300 border-white/5 flex flex-col justify-between relative overflow-hidden",
        "group-hover:border-opacity-50 group-hover:-translate-y-1",
        palette.hoverBorder,
        palette.hoverBg
      )}>
        <div className="absolute top-0 left-0 h-1 bg-neon-green/50 transition-[width] duration-700 ease-out" style={{ width: `${fill}%` }} />
        {progress.completed && (
          <div className="absolute top-2 right-2 text-neon-green text-[9px] font-black tracking-widest">{completedLabel}</div>
        )}

        <div>
          <div className="flex justify-between items-center mb-6">
            <span className={clsx("text-[10px] font-mono font-black tracking-[0.2em] opacity-50", palette.text)}>{code}</span>
            <div className={clsx("w-1.5 h-1.5 rounded-full", progress.percent > 0 ? "bg-neon-green shadow-[0_0_8px_#39ff14]" : "bg-white/10")} />
          </div>

          <h3 className={clsx("text-lg font-black tracking-tight mb-3 uppercase transition-colors flex items-center gap-3", palette.hoverText)}>
            <div className={clsx("w-8 h-8 flex-shrink-0 border rounded flex items-center justify-center transition-all", palette.border, palette.text, palette.hoverIconBg)}>
              <ConceptIcon code={code} className="w-5 h-5" />
            </div>
            <span>{title}</span>
          </h3>

          <p className="text-xs text-neutral-500 font-mono leading-relaxed group-hover:text-neutral-300 transition-colors">
            {desc}
          </p>
        </div>

        <div className={clsx("mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0", `text-${color}`)}>
          <span>{actionLabel}</span>
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}
