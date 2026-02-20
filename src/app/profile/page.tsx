"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ScienceRadar from "@/components/ui/ScienceRadar";
import StatsMatrix from "@/components/profile/StatsMatrix";
import AiProviderSettings from "@/components/profile/AiProviderSettings";
import { clsx } from "clsx";

export default function ProfilePage() {
  const { history } = useAppStore();
  const { t, currentLanguage } = useLanguage();

  const profile_t = {
    title: t("profile.title"),
    subtitle: t("profile.subtitle"),
    radar_title: t("profile.radar_title"),
    stats_title: t("profile.stats_title"),
    timeline_title: t("profile.timeline_title"),
    timeline_empty: t("profile.timeline_empty"),
    timeline_accuracy: t("profile.timeline_accuracy"),
    metrics: {
      logic: t("profile.metrics.logic"),
      intuition: t("profile.metrics.intuition"),
      rigor: t("profile.metrics.rigor"),
      experiment: t("profile.metrics.experiment"),
    },
    stats: {
      completed_modules: t("profile.stats.completed_modules"),
      avg_accuracy: t("profile.stats.avg_accuracy"),
      total_runs: t("profile.stats.total_runs"),
      experiment_index: t("profile.stats.experiment_index"),
    },
  };

  const stats = useMemo(() => {
    const totalRuns = history.length;
    const completedModules = new Set(history.map((entry) => entry.moduleCode)).size;
    const totalScore = history.reduce((sum, entry) => sum + entry.score, 0);
    const avgAccuracy = totalRuns ? totalScore / totalRuns : 0;
    const durations = history.map((entry) => entry.durationMs).filter((value) => Number.isFinite(value) && value > 0);
    const avgDuration = durations.length ? durations.reduce((sum, value) => sum + value, 0) / durations.length : 0;
    const speed = avgDuration ? Math.max(0, Math.min(1, 1 - avgDuration / 180000)) : 0;
    const rigorCount = history.filter((entry) => entry.rigor).length;
    const rigor = totalRuns ? rigorCount / totalRuns : 0;
    const experiment = Math.min(1, totalRuns / 40);
    return {
      totalRuns,
      completedModules,
      avgAccuracy,
      speed,
      rigor,
      experiment,
    };
  }, [history]);

  const timeline = history.slice(0, 12);

  return (
    <main className="min-h-screen bg-black text-white px-6 pb-20 pt-12 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-12">
        <Link
          href="/nexus"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-black tracking-widest text-white/60 hover:text-white transition-all group"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          {t("common.back_to_hub") || "BACK TO HUB"}
        </Link>

        <div className="border-l-2 border-neon-purple pl-6 py-3">
          <div className="text-[10px] uppercase tracking-[0.4em] text-neon-purple font-black">{profile_t.title}</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-3">{profile_t.subtitle}</h1>
        </div>

        <ScienceRadar
          logic={stats.avgAccuracy}
          intuition={stats.speed}
          rigor={stats.rigor}
          experiment={stats.experiment}
          labels={{
            title: profile_t.radar_title,
            logic: profile_t.metrics.logic,
            intuition: profile_t.metrics.intuition,
            rigor: profile_t.metrics.rigor,
            experiment: profile_t.metrics.experiment,
          }}
        />

        <StatsMatrix
          title={profile_t.stats_title}
          items={[
            {
              id: "completed",
              label: profile_t.stats.completed_modules,
              value: `${stats.completedModules}`,
              tone: "cyan",
            },
            {
              id: "accuracy",
              label: profile_t.stats.avg_accuracy,
              value: `${Math.round(stats.avgAccuracy * 100)}%`,
              tone: "green",
            },
            {
              id: "runs",
              label: profile_t.stats.total_runs,
              value: `${stats.totalRuns}`,
              tone: "purple",
            },
            {
              id: "experiment",
              label: profile_t.stats.experiment_index,
              value: `${Math.round(stats.experiment * 100)}%`,
              tone: "amber",
            },
          ]}
        />

        <AiProviderSettings />

        <div className="border border-white/10 rounded-2xl bg-black/60 backdrop-blur-xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.35)]">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{profile_t.timeline_title}</div>
          {timeline.length === 0 ? (
            <div className="mt-6 text-sm text-white/50 font-mono">{profile_t.timeline_empty}</div>
          ) : (
            <div className="mt-6 space-y-4">
              {timeline.map((entry, index) => (
                <div key={entry.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={clsx(
                      "w-3 h-3 rounded-full",
                      entry.rigor ? "bg-neon-green shadow-[0_0_12px_var(--color-neon-green)]" : "bg-neon-purple/60"
                    )} />
                    {index !== timeline.length - 1 && <div className="w-px flex-1 bg-white/10 mt-2" />}
                  </div>
                  <div className="flex-1 border border-white/10 rounded-xl px-4 py-3 bg-white/[0.02]">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
                        {entry.moduleCode} · {entry.stageLabel}
                      </div>
                      <div className="text-[10px] text-white/40 font-mono">
                        {new Date(entry.timestamp).toLocaleString(
                          currentLanguage === "CN" ? "zh-CN" : currentLanguage === "DE" ? "de-DE" : "en-US",
                          { hour12: false }
                        )}
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-white/60 font-mono">
                      {profile_t.timeline_accuracy}: {Math.round(entry.score * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
