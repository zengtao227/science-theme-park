"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ThalesTowerCanvas from "@/components/chamber/sm1-02/ThalesTowerCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "MEASURE";
type ThalesQuest = Quest & { stage: Stage };

export default function S102Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const locale = translations[currentLanguage as keyof typeof translations] as typeof translations.EN;
  const t = locale.s1_02 || translations.EN.s1_02;
  const [sunAngle, setSunAngle] = useState(35);
  const [towerShadow, setTowerShadow] = useState(18);

  const poleHeight = 2;
  const poleShadow = useMemo(() => {
    const rad = (sunAngle * Math.PI) / 180;
    return poleHeight / Math.tan(rad);
  }, [sunAngle]);
  const towerHeight = useMemo(() => poleHeight * (towerShadow / poleShadow), [poleHeight, poleShadow, towerShadow]);

  const buildPool = useCallback((difficulty: Difficulty, stage: Stage): ThalesQuest[] => {
    const height = Number(towerHeight.toFixed(2));
    return [
      {
        id: "T1",
        difficulty,
        stage,
        promptLatex: t.stages.measure_prompt_latex,
        expressionLatex: `\\text{h=${poleHeight.toFixed(1)}\\,m,\\; l=${poleShadow.toFixed(2)}\\,m,\\; L=${towerShadow.toFixed(1)}\\,m}`,
        targetLatex: "H",
        slots: [
          {
            id: "H",
            labelLatex: "H",
            placeholder: t.labels.height_placeholder,
            expected: height,
            unit: "m",
          },
        ],
        correctLatex: `H=${height}\\,\\text{m}`,
      },
    ];
  }, [poleHeight, poleShadow, t.labels.height_placeholder, t.stages.measure_prompt_latex, towerHeight, towerShadow]);

  const {
    stage,
    inputs,
    setInputs,
    lastCheck,
    verify,
    next,
    handleStageChange,
    difficulty,
    handleDifficultyChange,
  } = useQuestManager<ThalesQuest, Stage>({
    buildPool,
    initialStage: "MEASURE",
    tolerance: 0.2,
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("s1-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const handleNext = () => {
    const nextAngle = 25 + Math.round(Math.random() * 30);
    const nextShadow = 12 + Math.round(Math.random() * 12);
    setSunAngle(nextAngle);
    setTowerShadow(nextShadow);
    next();
  };

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="S1.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[{ id: "MEASURE", label: t.stages.measure }]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={handleNext}
      checkStatus={lastCheck}
      footerLeft={t.footer_left}
      translations={{
        back: t.back,
        check: t.check,
        next: t.next,
        correct: t.correct,
        incorrect: t.incorrect,
        ready: t.ready,
        monitor_title: t.monitor_title,
        difficulty: {
          basic: t.difficulty.basic,
          core: t.difficulty.core,
          advanced: t.difficulty.advanced,
          elite: t.difficulty.elite,
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <ThalesTowerCanvas sunAngle={sunAngle} poleHeight={poleHeight} towerShadow={towerShadow} />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t.target_title}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t.labels.readings}
            </div>
            <div className="text-white font-black text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t.labels.pole_height}</span>
                <span>{poleHeight.toFixed(1)} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t.labels.pole_shadow}</span>
                <span>{poleShadow.toFixed(2)} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t.labels.tower_shadow}</span>
                <span>{towerShadow.toFixed(1)} m</span>
              </div>
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
          <p className="text-base text-white/70 font-mono">{t.mission.description}</p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t.objective_title}
          </h3>
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={t.stages.measure_prompt_latex} />
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t.labels.sun_angle}
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="20"
                max="60"
                step="1"
                value={sunAngle}
                onChange={(e) => setSunAngle(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-xl font-black text-white min-w-[70px]">
                {sunAngle.toFixed(0)}°
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t.labels.tower_shadow}
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="10"
                max="30"
                step="1"
                value={towerShadow}
                onChange={(e) => setTowerShadow(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-xl font-black text-white min-w-[70px]">
                {towerShadow.toFixed(0)} m
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t.labels.solve_height}
            </div>
            <input
              value={inputs.H ?? ""}
              onChange={(e) => setInputs((prev) => ({ ...prev, H: e.target.value }))}
              className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-2xl text-white"
              placeholder={t.labels.height_placeholder}
            />
          </div>
          <div className="text-center pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/40 font-mono italic">
              {t.labels.hint_ratio}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
