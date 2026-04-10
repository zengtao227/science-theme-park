"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useCallback, useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import VectorVisualization from "@/components/chamber/gm2-01/VectorVisualization";
import {
  Stage,
  G201Quest,
  generateNavigationQuests,
  generateDotQuests,
  generateMissionQuests,
} from "@/lib/gm2-01/quests";
import { renderMixedText } from "@/lib/latex-utils";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";
import { createGM201FeedbackProvider } from "@/lib/gm2-01/provider";





function buildStagePool(gm2_01_t: any, difficulty: Difficulty, stage: Stage): G201Quest[] {
  if (stage === "NAVIGATION") return generateNavigationQuests(gm2_01_t, difficulty);
  if (stage === "DOT") return generateDotQuests(gm2_01_t, difficulty);
  if (stage === "MISSION") return generateMissionQuests(gm2_01_t, difficulty);
  return [];
}

export default function G201Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();
  const feedbackContentProvider = useMemo(() => createGM201FeedbackProvider(t), [t]);
  
  const gm2_01_t = useMemo(() => ({
    title: t("gm2_01.title"),
    back: t("gm2_01.back"),
    check: t("gm2_01.check"),
    next: t("gm2_01.next"),
    correct: t("gm2_01.correct"),
    incorrect: t("gm2_01.incorrect"),
    monitor_title: t("gm2_01.monitor_title"),
    objective_title: t("gm2_01.objective_title"),
    target_title: t("gm2_01.target_title"),
    stages: {
      navigation: t("gm2_01.stages.navigation"),
      dot: t("gm2_01.stages.dot"),
      mission: t("gm2_01.stages.mission"),
      navigation_prompt_latex: t("gm2_01.stages.navigation_prompt_latex"),
      dot_prompt_latex: t("gm2_01.stages.dot_prompt_latex"),
      mission_prompt_latex: t("gm2_01.stages.mission_prompt_latex"),
    },
    difficulty: {
      basic: t("gm2_01.difficulty.basic"),
      core: t("gm2_01.difficulty.core"),
      advanced: t("gm2_01.difficulty.advanced"),
      elite: t("gm2_01.difficulty.elite"),
    },
    labels: {
      input: t("gm2_01.labels.input"),
    },
    visualization: {
      point_a: t("gm2_01.visualization.point_a"),
      point_b: t("gm2_01.visualization.point_b"),
      vector_v: t("gm2_01.visualization.vector_v"),
      vector_w: t("gm2_01.visualization.vector_w"),
      vector_s: t("gm2_01.visualization.vector_s"),
      coordinates: t("gm2_01.visualization.coordinates"),
      dot_product: t("gm2_01.visualization.dot_product"),
    },
    placeholders: {
      x: t("gm2_01.placeholders.x"),
      y: t("gm2_01.placeholders.y"),
      z: t("gm2_01.placeholders.z"),
      magnitude: t("gm2_01.placeholders.magnitude"),
      dot_product: t("gm2_01.placeholders.dot_product"),
      dot: t("gm2_01.placeholders.dot"),
    },
    mission: {
      title: t("gm2_01.mission.title"),
      description: t("gm2_01.mission.description"),
    },
    scenarios: {
      navigation: t("gm2_01.scenarios.navigation"),
      dot: t("gm2_01.scenarios.dot"),
      mission: t("gm2_01.scenarios.mission"),
    },
    input_tip_2dp: t("gm2_01.input_tip_2dp"),
  }), [t]);

  const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(gm2_01_t, d, s), [gm2_01_t]);

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
    feedbackLevel,
    feedbackContent,
    feedbackAvailability,
    showHintLevel,
    showStepsLevel,
    showFullSolution,
    policy,
    } = useQuestManager<G201Quest, Stage>({
    moduleCode: "gm2-01",
    buildPool,
    initialStage: "NAVIGATION",
    feedbackContentProvider,
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gm2-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const currentScenario =
    stage === "NAVIGATION" ? gm2_01_t.scenarios.navigation :
    stage === "DOT" ? gm2_01_t.scenarios.dot :
    gm2_01_t.scenarios.mission;

  const stages = useMemo(() => [
    { id: "NAVIGATION" as Stage, label: gm2_01_t.stages.navigation },
    { id: "DOT" as Stage, label: gm2_01_t.stages.dot },
    { id: "MISSION" as Stage, label: gm2_01_t.stages.mission },
  ], [gm2_01_t.stages]);

  const printSections = useMemo(() => () => buildQuestPrintSections<G201Quest, Stage>({
    moduleTitle: gm2_01_t.title,
    stages,
    difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
    difficultyLabels: {
      BASIC: gm2_01_t.difficulty.basic,
      CORE: gm2_01_t.difficulty.core,
      ADVANCED: gm2_01_t.difficulty.advanced,
      ELITE: gm2_01_t.difficulty.elite,
    },
    buildPool,
  }), [buildPool, gm2_01_t.difficulty.advanced, gm2_01_t.difficulty.basic, gm2_01_t.difficulty.core, gm2_01_t.difficulty.elite, gm2_01_t.title, stages]);

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
      title={gm2_01_t.title}
      moduleCode="GM2.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      printSectionsBuilder={printSections}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      translations={{
        back: gm2_01_t.back,
        check: gm2_01_t.check,
        next: gm2_01_t.next,
        correct: gm2_01_t.correct,
        incorrect: gm2_01_t.incorrect,
        monitor_title: gm2_01_t.monitor_title,
        difficulty: {
          basic: gm2_01_t.difficulty.basic,
          core: gm2_01_t.difficulty.core,
          advanced: gm2_01_t.difficulty.advanced,
          elite: gm2_01_t.difficulty.elite,
        },
      }}
      monitorContent={
        <VectorVisualization
          pointA={currentQuest?.pointA}
          pointB={currentQuest?.pointB}
          vectorV={currentQuest?.vectorV}
          vectorW={currentQuest?.vectorW}
          showDotProduct={currentQuest?.showDotProduct}
          translations={{
            title: gm2_01_t.monitor_title,
            pointA: gm2_01_t.visualization.point_a,
            pointB: gm2_01_t.visualization.point_b,
            vectorV: gm2_01_t.visualization.vector_v,
            vectorW: stage === "MISSION" ? gm2_01_t.visualization.vector_s : gm2_01_t.visualization.vector_w,
            coordinates: gm2_01_t.visualization.coordinates,
            dotProduct: gm2_01_t.visualization.dot_product,
          }}
        />
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{gm2_01_t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono">{gm2_01_t.mission.description}</p>
        </div>
        
        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6 max-w-4xl mx-auto">
          <div className="text-sm text-green-400/90 leading-relaxed whitespace-pre-line">
            {renderMixedText(currentScenario, "whitespace-pre-wrap")}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{gm2_01_t.objective_title}</h3>
          <p className="text-3xl text-white font-black italic">
            {renderMixedText(currentQuest?.promptLatex || "")}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-2 gap-4">
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
                    <div className="text-xl font-black text-white/80 min-w-[30px]">
                      <InlineMath math={slot.unit} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-white/90 font-mono italic text-center">
            {gm2_01_t.input_tip_2dp}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
