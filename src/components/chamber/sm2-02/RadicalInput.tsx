"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export interface Radical {
  k: number;
  m: number;
}

interface RadicalSlotInputProps {
  value: Radical;
  onChange: (v: Radical) => void;
  labelK: string;
  labelM: string;
}

export default function RadicalSlotInput({ value, onChange, labelK, labelM }: RadicalSlotInputProps) {
  const safeK = Number.isFinite(value.k) && value.k !== 0 ? value.k : 1;
  const safeM = Number.isFinite(value.m) && value.m > 0 ? value.m : 1;

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <div className="flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-white/5 px-3 py-2 shadow-[0_0_18px_rgba(34,211,238,0.2)]">
        <div className="text-[10px] font-black tracking-[0.4em] text-cyan-400">{labelK}</div>
        <input
          value={safeK === 0 ? "" : String(safeK)}
          onChange={(e) => {
            const kk = Number(e.target.value.trim());
            onChange({ k: Number.isFinite(kk) ? kk : 1, m: safeM });
          }}
          className="w-20 bg-black border-2 border-cyan-400/40 p-3 text-center outline-none focus:border-cyan-400 placeholder:text-white/70 font-black text-2xl text-white rounded-lg"
          inputMode="numeric"
          placeholder="?"
        />
      </div>

      <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
        <div className="text-white/90 text-4xl leading-none font-black">√</div>
        <div className="border-t-2 border-white/60 pt-2">
          <input
            value={safeM === 0 ? "" : String(safeM)}
            onChange={(e) => {
              const mm = Number(e.target.value.trim());
              onChange({ k: safeK, m: Number.isFinite(mm) ? mm : 1 });
            }}
            className="w-20 bg-black border-2 border-neon-green/40 p-3 text-center outline-none focus:border-neon-green placeholder:text-white/70 font-black text-2xl text-white rounded-lg"
            inputMode="numeric"
            placeholder="?"
          />
        </div>
      </div>

      <div className="text-[11px] text-white/70 font-mono">
        <InlineMath math={`${safeK}\\sqrt{${safeM}}`} />
      </div>

      <div className="text-[10px] text-white/60 font-black tracking-[0.2em] uppercase">
        {labelM}
      </div>
    </div>
  );
}
