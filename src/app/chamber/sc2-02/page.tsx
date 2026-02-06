"use client";

import { useEffect, useMemo, useState } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import TitrationCurve from "@/components/chamber/sc2-02/TitrationCurve";

const computePh = (acidM: number, acidMl: number, baseM: number, baseMl: number) => {
  const acidMoles = acidM * (acidMl / 1000);
  const baseMoles = baseM * (baseMl / 1000);
  const totalVolume = (acidMl + baseMl) / 1000;
  if (totalVolume <= 0) return 7;

  if (baseMoles < acidMoles) {
    const h = (acidMoles - baseMoles) / totalVolume;
    return Math.max(0, Math.min(14, -Math.log10(h)));
  }

  if (Math.abs(baseMoles - acidMoles) < 1e-9) {
    return 7;
  }

  const oh = (baseMoles - acidMoles) / totalVolume;
  const poh = -Math.log10(oh);
  return Math.max(0, Math.min(14, 14 - poh));
};

export default function SC202Page() {
  const { currentLanguage } = useAppStore();
  const locale = translations[currentLanguage] as typeof translations.EN;
  const t = locale.sc2_02 || translations.EN.sc2_02;

  const [acidMolarity, setAcidMolarity] = useState(0.1);
  const [baseMolarity, setBaseMolarity] = useState(0.1);
  const [acidVolume, setAcidVolume] = useState(25);
  const [addedVolume, setAddedVolume] = useState(0);
  const [flowRate, setFlowRate] = useState(0.5);
  const [running, setRunning] = useState(false);

  const maxVolume = 50;

  useEffect(() => {
    if (!running) return;
    const handle = window.setInterval(() => {
      setAddedVolume((prev) => {
        const next = Math.min(maxVolume, prev + flowRate * 0.1);
        if (next >= maxVolume) {
          setRunning(false);
        }
        return next;
      });
    }, 100);
    return () => window.clearInterval(handle);
  }, [flowRate, running]);

  const curveData = useMemo(() => {
    const points = [];
    for (let v = 0; v <= maxVolume; v += 1) {
      points.push({
        volume: v,
        pH: Number(computePh(acidMolarity, acidVolume, baseMolarity, v).toFixed(3)),
      });
    }
    return points;
  }, [acidMolarity, acidVolume, baseMolarity]);

  const currentPh = useMemo(
    () => computePh(acidMolarity, acidVolume, baseMolarity, addedVolume),
    [acidMolarity, acidVolume, baseMolarity, addedVolume]
  );

  const equivalenceVolume = (acidMolarity * acidVolume) / baseMolarity;

  const phenolphthalein =
    currentPh < 8.2 ? t.indicators.phenolphthalein_low : currentPh > 10 ? t.indicators.phenolphthalein_high : t.indicators.phenolphthalein_mid;
  const methylOrange =
    currentPh < 3.1 ? t.indicators.methyl_orange_low : currentPh > 4.4 ? t.indicators.methyl_orange_high : t.indicators.methyl_orange_mid;

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="SC2.02"
      difficulty="CORE"
      onDifficultyChange={() => {}}
      stages={[{ id: "TITRATION", label: t.stages.titration }]}
      currentStage="TITRATION"
      onStageChange={() => {}}
      onVerify={() => setRunning((prev) => !prev)}
      onNext={() => {
        setRunning(false);
        setAddedVolume(0);
      }}
      checkStatus={null}
      footerLeft={t.footer_left}
      translations={{
        back: t.back,
        check: running ? t.pause : t.start,
        next: t.reset,
        correct: t.correct,
        incorrect: t.incorrect,
        ready: t.ready,
        monitor_title: t.monitor_title,
        difficulty: { core: t.difficulty.core },
      }}
      monitorContent={
        <div className="space-y-5">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t.labels.current_ph}
            </div>
            <div className="text-3xl text-neon-cyan font-black">{currentPh.toFixed(2)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
              <div className="text-[9px] uppercase tracking-[0.3em] text-white/60 font-black">
                {t.labels.equivalence}
              </div>
              <div className="text-xl text-white font-black">{equivalenceVolume.toFixed(1)} mL</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
              <div className="text-[9px] uppercase tracking-[0.3em] text-white/60 font-black">
                {t.labels.flow_rate}
              </div>
              <div className="text-xl text-white font-black">{flowRate.toFixed(2)} mL/s</div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t.labels.indicators}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60 font-mono">{t.indicators.phenolphthalein}</span>
              <span className="text-neon-amber font-black">{phenolphthalein}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60 font-mono">{t.indicators.methyl_orange}</span>
              <span className="text-neon-amber font-black">{methylOrange}</span>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t.mission.title}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t.mission.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <TitrationCurve data={curveData} currentVolume={addedVolume} currentPh={currentPh} accent="#39ff14" />
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-white/60 font-mono">
                <span>{t.labels.added_volume}</span>
                <span className="text-white font-black">{addedVolume.toFixed(1)} mL</span>
              </div>
              <input
                type="range"
                min={0}
                max={maxVolume}
                step={0.1}
                value={addedVolume}
                onChange={(e) => setAddedVolume(Number(e.target.value))}
                className="w-full accent-neon-green"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-4">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
                {t.labels.solution_config}
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-white/60 font-mono">
                  <span>{t.labels.acid_molarity}</span>
                  <span className="text-white font-black">{acidMolarity.toFixed(2)} M</span>
                </div>
                <input
                  type="range"
                  min={0.05}
                  max={0.5}
                  step={0.01}
                  value={acidMolarity}
                  onChange={(e) => setAcidMolarity(Number(e.target.value))}
                  className="w-full accent-neon-cyan"
                />
                <div className="flex items-center justify-between text-xs text-white/60 font-mono">
                  <span>{t.labels.base_molarity}</span>
                  <span className="text-white font-black">{baseMolarity.toFixed(2)} M</span>
                </div>
                <input
                  type="range"
                  min={0.05}
                  max={0.5}
                  step={0.01}
                  value={baseMolarity}
                  onChange={(e) => setBaseMolarity(Number(e.target.value))}
                  className="w-full accent-neon-purple"
                />
                <div className="flex items-center justify-between text-xs text-white/60 font-mono">
                  <span>{t.labels.acid_volume}</span>
                  <span className="text-white font-black">{acidVolume.toFixed(0)} mL</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={1}
                  value={acidVolume}
                  onChange={(e) => setAcidVolume(Number(e.target.value))}
                  className="w-full accent-neon-green"
                />
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-4">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
                {t.labels.flow_control}
              </div>
              <div className="flex items-center justify-between text-xs text-white/60 font-mono">
                <span>{t.labels.flow_rate}</span>
                <span className="text-white font-black">{flowRate.toFixed(2)} mL/s</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={2}
                step={0.1}
                value={flowRate}
                onChange={(e) => setFlowRate(Number(e.target.value))}
                className="w-full accent-neon-amber"
              />
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
