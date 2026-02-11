"use client";

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
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <div className="flex items-center gap-2 rounded-xl border border-neon-cyan/40 bg-white/5 px-3 py-2 shadow-[0_0_18px_rgba(0,255,200,0.2)]">
        <div className="text-[10px] font-black tracking-[0.4em] text-neon-cyan">{labelK}</div>
        <input
          value={value.k === 0 ? "" : String(value.k)}
          onChange={(e) => {
            const kk = Number(e.target.value.trim());
            onChange({ k: Number.isFinite(kk) ? kk : 0, m: value.m });
          }}
          className="w-20 bg-black border-2 border-neon-cyan/40 p-3 text-center outline-none focus:border-neon-cyan placeholder:text-white/70 font-black text-2xl text-white"
          inputMode="numeric"
          placeholder="?"
        />
      </div>
      <div className="text-4xl font-black text-white/80">√</div>
      <div className="flex items-center gap-2 rounded-xl border border-neon-green/40 bg-white/5 px-3 py-2 shadow-[0_0_18px_rgba(57,255,20,0.2)]">
        <div className="text-[10px] font-black tracking-[0.4em] text-neon-green">{labelM}</div>
        <input
          value={value.m === 0 ? "" : String(value.m)}
          onChange={(e) => {
            const mm = Number(e.target.value.trim());
            onChange({ k: value.k, m: Number.isFinite(mm) ? mm : 0 });
          }}
          className="w-20 bg-black border-2 border-neon-green/40 p-3 text-center outline-none focus:border-neon-green placeholder:text-white/70 font-black text-2xl text-white"
          inputMode="numeric"
          placeholder="?"
        />
      </div>
    </div>
  );
}
