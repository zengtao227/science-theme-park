"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";

type ModuleFilterProps = {
  label: string;
  query: string;
  placeholder: string;
  tagsLabel: string;
  tags: { id: string; label: string }[];
  selectedTags: string[];
  onQueryChange: (value: string) => void;
  onToggleTag: (tagId: string) => void;
  onClear: () => void;
  clearLabel: string;
};

export default function ModuleFilter({
  label,
  query,
  placeholder,
  tagsLabel,
  tags,
  selectedTags,
  onQueryChange,
  onToggleTag,
  onClear,
  clearLabel,
}: ModuleFilterProps) {
  const [focused, setFocused] = useState(false);
  const expanded = focused || query.length > 0;
  const showClear = query.length > 0 || selectedTags.length > 0;

  const sweepStyle = useMemo(
    () => ({
      backgroundImage: "linear-gradient(120deg, transparent, var(--color-neon-purple), transparent)",
      backgroundSize: "200% 100%",
    }),
    []
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-black">{label}</div>
        <motion.div
          className="relative flex-1 min-w-[240px]"
          animate={{ maxWidth: expanded ? 640 : 420 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="absolute inset-0 rounded-lg border border-white/10" />
          <motion.div
            className="absolute inset-0 rounded-lg opacity-70"
            style={sweepStyle}
            animate={{ backgroundPosition: expanded ? ["0% 50%", "200% 50%"] : "50% 50%" }}
            transition={{ duration: 2.6, repeat: expanded ? Infinity : 0, ease: "linear" }}
          />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="relative w-full bg-black/70 border border-neon-purple/30 rounded-lg px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-neon-purple/70"
          />
        </motion.div>
        <AnimatePresence>
          {showClear && (
            <motion.button
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              onClick={onClear}
              className="min-h-[44px] px-4 text-[9px] font-black tracking-[0.35em] uppercase border border-neon-purple/40 text-neon-purple hover:border-neon-purple transition-all"
            >
              {clearLabel}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-black">{tagsLabel}</div>
        {tags.map((tag) => {
          const active = selectedTags.includes(tag.id);
          return (
            <button
              key={tag.id}
              onClick={() => onToggleTag(tag.id)}
              className={clsx(
                "min-h-[44px] px-4 rounded-full border text-[9px] font-black tracking-[0.3em] uppercase transition-all",
                active
                  ? "border-neon-purple bg-neon-purple/15 text-neon-purple shadow-[0_0_18px_var(--color-neon-purple)]"
                  : "border-white/10 text-white/60 hover:border-neon-purple/40 hover:text-white"
              )}
            >
              {tag.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
