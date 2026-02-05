"use client";

import { clsx } from "clsx";

type StatItem = {
  id: string;
  label: string;
  value: string;
  tone?: "cyan" | "green" | "purple" | "amber";
};

type StatsMatrixProps = {
  title: string;
  items: StatItem[];
};

const toneStyles = {
  cyan: "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/5",
  green: "text-neon-green border-neon-green/30 bg-neon-green/5",
  purple: "text-neon-purple border-neon-purple/30 bg-neon-purple/5",
  amber: "text-neon-amber border-neon-amber/30 bg-neon-amber/5",
};

export default function StatsMatrix({ title, items }: StatsMatrixProps) {
  return (
    <div className="border border-white/10 rounded-2xl bg-black/60 backdrop-blur-xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.35)]">
      <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{title}</div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={clsx(
              "rounded-xl border px-4 py-4 flex items-center justify-between",
              item.tone ? toneStyles[item.tone] : "border-white/10 text-white/70 bg-white/[0.02]"
            )}
          >
            <div className="text-[9px] uppercase tracking-[0.3em] font-black">{item.label}</div>
            <div className="text-xl font-black">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
