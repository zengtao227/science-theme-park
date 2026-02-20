"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useCallback } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import LimitsContinuityVisualization from "@/components/chamber/gm1-03/LimitsContinuityVisualization";
import { GM103Quest, Stage } from "@/lib/gm1-03-types";
import { buildStagePool } from "@/lib/gm1-03-quest-builder";

export default function GM103Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();

  // Build translations object
  const gm1_03_t = {
    title: t("gm1_03.title"),
    back: t("gm1_03.back"),
    check: t("gm1_03.check"),
    next: t("gm1_03.next"),
    correct: t("gm1_03.correct"),
    incorrect: t("gm1_03.incorrect"),
    ready: t("gm1_03.ready"),
    monitor_title: t("gm1_03.monitor_title"),
    footer_left: t("gm1_03.footer_left"),
    objective_title: t("gm1_03.objective_title"),
    target_title: t("gm1_03.target_title"),
    input_tip_2dp: t("gm1_03.input_tip_2dp"),
    stages: {
      LIMIT_BASICS: t("gm1_03.stages.LIMIT_BASICS"),
      LIMIT_OPERATIONS: t("gm1_03.stages.LIMIT_OPERATIONS"),
      CONTINUITY: t("gm1_03.stages.CONTINUITY"),
      limit_basics: t("gm1_03.stages.limit_basics"),
      limit_operations: t("gm1_03.stages.limit_operations"),
      continuity: t("gm1_03.stages.continuity"),
    },
    difficulty: {
      basic: t("gm1_03.difficulty.basic"),
      core: t("gm1_03.difficulty.core"),
      advanced: t("gm1_03.difficulty.advanced"),
      elite: t("gm1_03.difficulty.elite"),
    },
    mission: {
      title: t("gm1_03.mission.title"),
      description: t("gm1_03.mission.description"),
    },
    scenarios: {
      limit_basics: t("gm1_03.scenarios.limit_basics"),
      limit_operations: t("gm1_03.scenarios.limit_operations"),
      continuity: t("gm1_03.scenarios.continuity"),
      university_basel: t("gm1_03.scenarios.university_basel"),
    },
    labels: {
      hints: t("gm1_03.labels.hints"),
    },
    prompts: {
      hint_direct: t("gm1_03.prompts.hint_direct"),
      hint_factor: t("gm1_03.prompts.hint_factor"),
      hint_infinity: t("gm1_03.prompts.hint_infinity"),
      hint_one_sided: t("gm1_03.prompts.hint_one_sided"),
      hint_sum: t("gm1_03.prompts.hint_sum"),
      hint_product: t("gm1_03.prompts.hint_product"),
      hint_quotient: t("gm1_03.prompts.hint_quotient"),
      hint_continuity: t("gm1_03.prompts.hint_continuity"),
    },
    visualization: {
      title: t("gm1_03.visualization.title"),
      approaching: t("gm1_03.visualization.approaching"),
      limit_exists: t("gm1_03.visualization.limit_exists"),
      limit_dne: t("gm1_03.visualization.limit_dne"),
      continuous_at: t("gm1_03.visualization.continuous_at"),
      discontinuous_at: t("gm1_03.visualization.discontinuous_at"),
      removable: t("gm1_03.visualization.removable"),
      jump: t("gm1_03.visualization.jump"),
      infinite: t("gm1_03.visualization.infinite"),
    },
  };

  // Build quest pool callback
  const buildPoolCallback = useCallback(
    (d: Difficulty, s: Stage) => buildStagePool(t, d, s),
    [t]
  );

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
      requestAiFeedback
    } = useQuestManager<GM103Quest, Stage>({
    moduleCode: "gm1-03",
    buildPool: buildPoolCallback,
    initialStage: "LIMIT_BASICS",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gm1-03", stage);
    }
  }, [lastCheck, completeStage, stage]);

  // Get current scenario based on stage
  const getCurrentScenario = () => {
    switch (stage) {
      case "LIMIT_BASICS":
        return gm1_03_t.scenarios.limit_basics;
      case "LIMIT_OPERATIONS":
        return gm1_03_t.scenarios.limit_operations;
      case "CONTINUITY":
        return gm1_03_t.scenarios.continuity;
      default:
        return gm1_03_t.scenarios.limit_basics;
    }
  };

  // Get hint based on stage and difficulty
  const getHint = () => {
    if (stage === "LIMIT_BASICS") {
      if (difficulty === "BASIC") return gm1_03_t.prompts.hint_direct;
      if (difficulty === "CORE") return gm1_03_t.prompts.hint_factor;
      if (difficulty === "ADVANCED") return gm1_03_t.prompts.hint_infinity;
      return gm1_03_t.prompts.hint_one_sided;
    } else if (stage === "LIMIT_OPERATIONS") {
      if (difficulty === "BASIC") return gm1_03_t.prompts.hint_sum;
      if (difficulty === "CORE") return gm1_03_t.prompts.hint_product;
      return gm1_03_t.prompts.hint_quotient;
    } else {
      return gm1_03_t.prompts.hint_continuity;
    }
  };

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={gm1_03_t.title}
      moduleCode="GM1.03"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "LIMIT_BASICS", label: gm1_03_t.stages.limit_basics },
        { id: "LIMIT_OPERATIONS", label: gm1_03_t.stages.limit_operations },
        { id: "CONTINUITY", label: gm1_03_t.stages.continuity },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={gm1_03_t.footer_left}
      translations={{
        back: gm1_03_t.back,
        check: gm1_03_t.check,
        next: gm1_03_t.next,
        correct: gm1_03_t.correct,
        incorrect: gm1_03_t.incorrect,
        ready: gm1_03_t.ready,
        monitor_title: gm1_03_t.monitor_title,
        difficulty: {
          basic: gm1_03_t.difficulty.basic,
          core: gm1_03_t.difficulty.core,
          advanced: gm1_03_t.difficulty.advanced,
          elite: gm1_03_t.difficulty.elite,
        },
      }}
      monitorContent={
        <LimitsContinuityVisualization
          quest={currentQuest}
          stage={stage}
          translations={gm1_03_t.visualization}
        />
      }
    >
      <div className="space-y-10">
        {/* Mission Header */}
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {gm1_03_t.mission.title}
          </h3>
          <p className="text-base text-white/70 font-mono">{gm1_03_t.mission.description}</p>
        </div>

        {/* Scenario Description */}
        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6 max-w-4xl mx-auto">
          <div className="text-sm text-green-400/90 leading-relaxed whitespace-pre-line">
            {getCurrentScenario()}
          </div>
        </div>

        {/* Objective */}
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {gm1_03_t.objective_title}
          </h3>
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </p>
        </div>

        {/* Hint Box */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 max-w-3xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black mb-2">
            {gm1_03_t.labels.hints}
          </div>
          <div className="text-white/70 text-sm font-mono">
            <InlineMath math={getHint()} />
          </div>
          <div className="text-white/70 text-sm font-mono mt-2">
            <InlineMath math={currentQuest?.expressionLatex || ""} />
          </div>
        </div>

        {/* Input Section */}
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
            {gm1_03_t.input_tip_2dp}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
