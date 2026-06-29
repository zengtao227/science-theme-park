"use client";

import { useMemo } from "react";
import { Award, Lock, X } from "lucide-react";
import { clsx } from "clsx";
import { useAppStore, type AchievementId } from "@/lib/store";
import { useHomeLanguage } from "@/lib/i18n/home-i18n";

type AchievementVaultProps = {
  open: boolean;
  onClose: () => void;
};

const achievementOrder: AchievementId[] = [
  "first_launch",
  "first_light",
  "mole_master",
  "molecular_architect",
  "time_traveler",
  "calculus_god",
];

export default function AchievementVault({ open, onClose }: AchievementVaultProps) {
  const achievements = useAppStore((s) => s.achievements);
  const { t, currentLanguage } = useHomeLanguage();

  const unlockedCount = useMemo(
    () => achievementOrder.filter((id) => achievements[id]?.unlocked).length,
    [achievements]
  );

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="mx-auto mt-24 w-[92%] max-w-4xl border border-neon-cyan/30 bg-black/80 rounded-2xl shadow-[0_0_35px_var(--color-neon-cyan)] animate-slide-up-scale">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-cyan font-black">
                  {t('common.achievements_title')}
                </div>
                <div className="text-sm font-black text-white/70 mt-1">
                  {unlockedCount}/{achievementOrder.length}
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/60 hover:border-white/50 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievementOrder.map((id) => {
                const record = achievements[id];
                const unlocked = record?.unlocked;
                return (
                  <div
                    key={id}
                    className={clsx(
                      "relative border rounded-xl p-4 flex items-start gap-4 transition-all",
                      unlocked
                        ? "border-neon-cyan/30 bg-neon-cyan/5 shadow-[0_0_20px_var(--color-neon-cyan)]"
                        : "border-white/10 bg-white/[0.02]"
                    )}
                  >
                    <div className={clsx(
                      "w-11 h-11 rounded-xl border flex items-center justify-center",
                      unlocked ? "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan" : "border-white/10 text-white/70"
                    )}>
                      {unlocked ? <Award className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <div className={clsx("text-sm font-black", unlocked ? "text-white" : "text-white/90")}>
                        {t(`common.achievements.${id}.title`)}
                      </div>
                      <div className={clsx("text-xs font-mono mt-1", unlocked ? "text-white/60" : "text-white/70")}>
                        {t(`common.achievements.${id}.description`)}
                      </div>
                      {record?.timestamp && (
                        <div className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black mt-3">
                          {new Date(record.timestamp).toLocaleString(
                            currentLanguage === "CN" ? "zh-CN" : currentLanguage === "DE" ? "de-DE" : "en-US",
                            { hour12: false }
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
