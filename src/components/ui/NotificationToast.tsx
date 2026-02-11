"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Medal } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { translations as i18n } from "@/lib/i18n";

export default function NotificationToast() {
  const { lastAchievement, clearLastAchievement, currentLanguage } = useAppStore();
  const common = i18n[currentLanguage].common;
  const activeAchievement = lastAchievement ?? null;

  useEffect(() => {
    if (!lastAchievement) return;
    try {
      const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = 880;
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.4);
        oscillator.onended = () => ctx.close();
      }
    } catch {
      return;
    }

    const handle = window.setTimeout(() => {
      clearLastAchievement();
    }, 5000);

    return () => window.clearTimeout(handle);
  }, [clearLastAchievement, lastAchievement]);

  return (
    <AnimatePresence>
      {activeAchievement && (
        <motion.div
          initial={{ x: 48, opacity: 0, scale: 0.98 }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
            boxShadow: [
              "0 0 12px var(--color-neon-cyan)",
              "0 0 22px var(--color-neon-cyan)",
              "0 0 12px var(--color-neon-cyan)",
            ],
          }}
          exit={{ x: 48, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35, ease: "easeOut", boxShadow: { duration: 2.4, repeat: Infinity } }}
          className="fixed top-6 right-6 z-[80] bg-black/80 border border-neon-cyan/50 backdrop-blur-xl rounded-2xl px-5 py-4 min-w-[260px]"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl border border-neon-cyan/40 bg-neon-cyan/10 flex items-center justify-center shadow-[0_0_16px_var(--color-neon-cyan)]">
              <Medal className="w-5 h-5 text-neon-cyan" />
            </div>
            <div className="space-y-1">
              <div className="text-[9px] uppercase tracking-[0.4em] font-black text-neon-cyan">{common.achievement_unlocked}</div>
              <div className="text-sm font-black text-white">{common.achievements[activeAchievement].title}</div>
              <div className="text-xs text-white/60 font-mono">{common.achievements[activeAchievement].description}</div>
              <div className="text-[9px] uppercase tracking-[0.35em] text-white/90 font-black">
                {currentLanguage === "CN" ? "系统提示" : currentLanguage === "DE" ? "System-Hinweis" : "System Alert"}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
