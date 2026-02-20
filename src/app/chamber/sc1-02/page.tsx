"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useMemo, useCallback } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import MoleCanvas from "@/components/chamber/sc1-02/MoleCanvas";
import {
  Stage,
  SC102Quest as SC102QuestType,
  generateMolarMassQuests,
  generateStoichiometryQuests,
  generateYieldQuests,
} from "@/lib/sc1-02/quests";

export default function C102Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();

  const sc1_02_t = {
    title: t("sc1_02.title"),
    back: t("sc1_02.back"),
    check: t("sc1_02.check"),
    next: t("sc1_02.next"),
    correct: t("sc1_02.correct"),
    incorrect: t("sc1_02.incorrect"),
    ready: t("sc1_02.ready"),
    monitor_title: t("sc1_02.monitor_title"),
    target_title: t("sc1_02.target_title"),
    objective_title: t("sc1_02.objective_title"),
    footer_left: t("sc1_02.footer_left"),
    input_tip_1dp: t("sc1_02.input_tip_1dp"),
    difficulty: {
      basic: t("sc1_02.difficulty.basic"),
      core: t("sc1_02.difficulty.core"),
      advanced: t("sc1_02.difficulty.advanced"),
      elite: t("sc1_02.difficulty.elite"),
    },
    stages: {
      molar_mass: t("sc1_02.stages.molar_mass"),
      stoichiometry: t("sc1_02.stages.stoichiometry"),
      yield: t("sc1_02.stages.yield"),
      molar_mass_prompt_latex: t("sc1_02.stages.molar_mass_prompt_latex"),
      stoichiometry_prompt_latex: t("sc1_02.stages.stoichiometry_prompt_latex"),
      yield_prompt_latex: t("sc1_02.stages.yield_prompt_latex"),
    },
    labels: {
      scale: t("sc1_02.labels.scale"),
      formula: t("sc1_02.labels.formula"),
      atoms: t("sc1_02.labels.atoms"),
      reaction: t("sc1_02.labels.reaction"),
      given: t("sc1_02.labels.given"),
      amount: t("sc1_02.labels.amount"),
      mass: t("sc1_02.labels.mass"),
    },
    mission: {
      title: t("sc1_02.mission.title"),
      description: t("sc1_02.mission.description"),
    },
  };

  const {
    difficulty,
    stage,
    inputs,
    lastCheck,
    currentQuest,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
    parseNumberLike,
    adaptiveRecommendation,
    aiFeedback,
    isRequestingAi,
    requestAiFeedback,
  } = useQuestManager<SC102QuestType, Stage>({
    moduleCode: "sc1-02",
    buildPool: (d, s) => {
      if (s === "MOLAR_MASS") return generateMolarMassQuests(t, d);
      if (s === "STOICHIOMETRY") return generateStoichiometryQuests(t, d);
      if (s === "YIELD") return generateYieldQuests(t, d);
      return [];
    },
    initialStage: "MOLAR_MASS",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sc1-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const activeSlot = currentQuest?.slots?.[0];
  const inputValue = useMemo(() => {
    if (!activeSlot) return null;
    return parseNumberLike(inputs[activeSlot.id] ?? "");
  }, [activeSlot, inputs, parseNumberLike]);
  const targetValue = typeof activeSlot?.expected === "number" ? activeSlot.expected : null;
  const stageLabel = useMemo(() => {
    if (stage === "MOLAR_MASS") return sc1_02_t.stages.molar_mass;
    if (stage === "STOICHIOMETRY") return sc1_02_t.stages.stoichiometry;
    return sc1_02_t.stages.yield;
  }, [stage, sc1_02_t.stages.molar_mass, sc1_02_t.stages.stoichiometry, sc1_02_t.stages.yield]);
  const status = lastCheck?.ok ? "correct" : lastCheck ? "incorrect" : "idle";

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={sc1_02_t.title}
      moduleCode="SC1.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "MOLAR_MASS", label: sc1_02_t.stages.molar_mass },
        { id: "STOICHIOMETRY", label: sc1_02_t.stages.stoichiometry },
        { id: "YIELD", label: sc1_02_t.stages.yield },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={sc1_02_t.footer_left}
      translations={{
        back: sc1_02_t.back,
        check: sc1_02_t.check,
        next: sc1_02_t.next,
        correct: sc1_02_t.correct,
        incorrect: sc1_02_t.incorrect,
        ready: sc1_02_t.ready,
        monitor_title: sc1_02_t.monitor_title,
        difficulty: {
          basic: sc1_02_t.difficulty.basic,
          core: sc1_02_t.difficulty.core,
          advanced: sc1_02_t.difficulty.advanced,
          elite: sc1_02_t.difficulty.elite,
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <MoleCanvas
            stageLabel={stageLabel}
            unit={activeSlot?.unit ?? ""}
            inputValue={typeof inputValue === "number" ? inputValue : null}
            targetValue={targetValue}
            status={status}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{sc1_02_t.target_title}</div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[11px] font-black tracking-[0.3em] text-white/60">{sc1_02_t.labels.scale}</div>
            <div className="text-white font-black text-xl">
              <InlineMath math={currentQuest?.scaleReading || ""} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {currentQuest?.reagents.map((item) => (
              <div key={item.label} className="flex items-center justify-between border border-white/10 bg-black/40 px-3 py-2 text-xs font-mono">
                <span className="text-white/60">{item.label}</span>
                <span className="text-white">
                  <InlineMath math={item.value} />
                </span>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{sc1_02_t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono">{sc1_02_t.mission.description}</p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{sc1_02_t.objective_title}</h3>
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                  <InlineMath math={slot.labelLatex} />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                    className="flex-1 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                    placeholder={slot.placeholder}
                  />
                  {slot.unit && (
                    <div className="text-xl font-black text-white/80 min-w-[60px]">
                      <InlineMath math={slot.unit} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-white/90 font-mono italic text-center">
            {sc1_02_t.input_tip_1dp}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
