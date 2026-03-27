"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import FlowMonitor from "@/components/shared/FlowMonitor";
import { Difficulty, useQuestManager } from "@/hooks/useQuestManager";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";
import { createSP303FeedbackProvider } from "@/lib/sp3-03/provider";
import { renderMixedText, KatexTextWrap } from "@/lib/latex-utils";
import {
  Stage,
  SP303Quest,
  generatePotentialQuests,
  generateKineticQuests,
  generatePowerQuests,
} from "@/lib/sp3-03/quests";




export default function SP303Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();
  const feedbackContentProvider = useMemo(() => createSP303FeedbackProvider(t), [t]);

  const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SP303Quest[] => {
    if (stage === "POTENTIAL") return generatePotentialQuests(t, difficulty);
    if (stage === "KINETIC") return generateKineticQuests(t, difficulty);
    if (stage === "POWER") return generatePowerQuests(t, difficulty);
    return [];
  }, [t]);

  const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(d, s), [buildStagePool]);

  const {
    currentQuest,
    difficulty,
    stage,
    lastCheck,
    inputs,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
    adaptiveRecommendation,
    aiFeedback,
    isRequestingAi,
    requestAiFeedback,
  feedbackLevel,
  feedbackContent,
  feedbackAvailability,
  showHintLevel,
  showStepsLevel,
  showFullSolution,
  policy,
  } = useQuestManager<SP303Quest, Stage>({
    moduleCode: "sp3-03",
    buildPool,
    initialStage: "POTENTIAL",
    feedbackContentProvider,
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sp3-03", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const stagesProps = useMemo(() => [
    { id: "POTENTIAL" as Stage, label: t("sp3_03.stages.potential") },
    { id: "KINETIC" as Stage, label: t("sp3_03.stages.kinetic") },
    { id: "POWER" as Stage, label: t("sp3_03.stages.work") },
  ], [t]);

  const printSections = useMemo(() => buildQuestPrintSections<SP303Quest, Stage>({
    moduleTitle: t("sp3_03.title"),
    stages: stagesProps,
    difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
    difficultyLabels: {
      BASIC: t("sp3_03.difficulty.basic"),
      CORE: t("sp3_03.difficulty.core"),
      ADVANCED: t("sp3_03.difficulty.advanced"),
      ELITE: t("sp3_03.difficulty.elite"),
    },
    buildPool,
  }), [buildPool, stagesProps, t]);

  if (!currentQuest) return <div className="p-20 text-white">Loading...</div>;

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      feedbackContent={feedbackContent}
      feedbackLevel={feedbackLevel}
      feedbackAvailability={feedbackAvailability}
      feedbackPolicy={policy}
      onShowHint={showHintLevel}
      onShowSteps={showStepsLevel}
      onShowFull={showFullSolution}
      title={t("sp3_03.title")}
      moduleCode="SP3.03"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stagesProps}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      printSections={printSections}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      translations={{
        back: t("sp3_03.back"),
        check: t("sp3_03.check"),
        next: t("sp3_03.next"),
        correct: t("sp3_03.correct"),
        incorrect: t("sp3_03.incorrect"),
        difficulty: t("sp3_03.difficulty"),
      }}
      monitorContent={
        <FlowMonitor
          title={t("sp3_03.monitor.title")}
          hubLabel={t("sp3_03.monitor.hub_label")}
          sources={[
            { label: t("sp3_03.monitor.sources.solar"), value: 45, color: "bg-yellow-400" },
            { label: t("sp3_03.monitor.sources.hydro"), value: 30, color: "bg-blue-400" },
            { label: t("sp3_03.monitor.sources.grid"), value: 25, color: "bg-purple-400" }
          ]}
          meta={[
            { label: t("sp3_03.monitor.meta.efficiency"), value: "92.4%", color: "text-green-400" },
            { label: t("sp3_03.monitor.meta.grid_load"), value: "1.2 GW", color: "text-cyan-400" }
          ]}
        />
      }
    >
      <div className="space-y-6">
        <div className="bg-gray-800/50 p-6 rounded-lg space-y-4">
          <div className="text-2xl text-white font-black leading-tight max-w-2xl mx-auto drop-shadow-sm flex justify-center">
            {renderMixedText(currentQuest?.promptLatex || "")}
          </div>
          <div className="text-cyan-300">
            <KatexTextWrap math={currentQuest?.expressionLatex || ""} />
          </div>
          <div className="space-y-3">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="flex items-center gap-3">
                <InlineMath math={slot.labelLatex} />
                <input
                  type="text"
                  value={inputs[slot.id] || ""}
                  onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
