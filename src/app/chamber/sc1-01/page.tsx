"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { renderMixedText } from "@/lib/latex-utils";

import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { Difficulty, useQuestManager } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import C101LabCanvas, { Substance, Tool } from "@/components/chamber/sc1-01/LabCanvas";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";
import {
  Stage,
  SC101Quest as SC101QuestType,
  generateIdentifyQuests,
  generatePropertiesQuests,
  generateReactionsQuests,
} from "@/lib/sc1-01/quests";

export default function SC101Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();
  const [testedReactions, setTestedReactions] = useState<Array<{ substance: Substance; tool: Tool }>>([]);

  const buildPool = useCallback((d: Difficulty, s: Stage) => {
    if (s === "IDENTIFY") return generateIdentifyQuests(t, d);
    if (s === "PROPERTIES") return generatePropertiesQuests(t, d);
    if (s === "REACTIONS") return generateReactionsQuests(t, d);
    return [];
  }, [t]);

  const stages = useMemo(() => [
    { id: "IDENTIFY" as Stage, label: t("sc1_01.stages.identify") },
    { id: "PROPERTIES" as Stage, label: t("sc1_01.stages.properties") },
    { id: "REACTIONS" as Stage, label: t("sc1_01.stages.reactions") },
  ], [t]);

  const printSections = useMemo(() => buildQuestPrintSections<SC101QuestType, Stage>({
    moduleTitle: t("sc1_01.title"),
    stages,
    difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
    difficultyLabels: {
      BASIC: t("sc1_01.difficulty.basic"),
      CORE: t("sc1_01.difficulty.core"),
      ADVANCED: t("sc1_01.difficulty.advanced"),
      ELITE: t("sc1_01.difficulty.elite"),
    },
    buildPool,
  }), [buildPool, stages, t]);

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
    adaptiveRecommendation,
    aiFeedback,
    isRequestingAi,
    requestAiFeedback,
  } = useQuestManager<SC101QuestType, Stage>({
    moduleCode: "sc1-01",
    buildPool,
    initialStage: "IDENTIFY",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sc1-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const handleTest = (substance: Substance, tool: Tool) => {
    setTestedReactions((prev) => [...prev, { substance, tool }]);
  };

  const getObservation = (substance: Substance, tool: Tool) => {
    return t(`sc1_01.lab_ui.results.${substance}_${tool}`);
  };

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("sc1_01.title")}
      moduleCode="SC1.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      printSections={printSections}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      translations={{
        back: t("sc1_01.back"),
        check: t("sc1_01.check"),
        next: t("sc1_01.next"),
        correct: t("sc1_01.correct"),
        incorrect: t("sc1_01.incorrect"),
        difficulty: {
          BASIC: t("sc1_01.difficulty.basic"),
          CORE: t("sc1_01.difficulty.core"),
          ADVANCED: t("sc1_01.difficulty.advanced"),
          ELITE: t("sc1_01.difficulty.elite"),
        },
      }}
      monitorContent={
        <div className="flex flex-col h-full gap-4">
          <div className="flex-1 bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
            <C101LabCanvas
              onTest={handleTest}
              testedReactions={testedReactions}
              showAnswer={lastCheck?.ok ?? false}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3 max-h-[200px] overflow-y-auto font-mono text-[10px]">
            <div className="text-white/40 uppercase tracking-widest mb-1">{t("sc1_01.lab_ui.lab_notes")}</div>
            {testedReactions.length === 0 ? (
              <div className="text-white/20 italic">{t("sc1_01.lab_ui.no_tests")}</div>
            ) : (
              testedReactions.map((r, i) => (
                <div key={i} className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-white/60">{r.substance} + {r.tool}:</span>
                  <span className="text-neon-cyan">{getObservation(r.substance, r.tool)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t("sc1_01.mission.title")}
          </h3>
          <div className="text-2xl text-white font-black max-w-3xl mx-auto leading-tight italic">
            {renderMixedText(currentQuest?.promptLatex || "")}
          </div>
        </div>

        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                  <InlineMath math={slot.labelLatex} />
                </div>
                <input
                  value={inputs[slot.id] || ""}
                  onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                  className="w-full bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white text-white font-black text-xl"
                  placeholder={slot.placeholder}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
