"use client";

import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useCallback, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import IntegralVisualization from "@/components/chamber/gm1-02/IntegralVisualization";
import {
  Stage,
  GM102Quest,
  generateAntiderivativeQuests,
  generateDefiniteIntegralQuests,
  generateApplicationQuests,
} from "@/lib/gm1-02/quests";





function buildStagePool(
  t: ReturnType<typeof useLanguage>["t"],
  difficulty: Difficulty,
  stage: Stage
): GM102Quest[] {
  if (stage === "ANTIDERIVATIVE") return generateAntiderivativeQuests(t, difficulty);
  if (stage === "DEFINITE_INTEGRAL") return generateDefiniteIntegralQuests(t, difficulty);
  if (stage === "APPLICATION") return generateApplicationQuests(t, difficulty);
  return [];
}

export default function GM102Page() {
  const { t } = useLanguage();
  const { completeStage } = useAppStore();

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
    } = useQuestManager<GM102Quest, Stage>({
    moduleCode: "gm1-02",
    buildPool: buildPoolCallback,
    initialStage: "ANTIDERIVATIVE",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gm1-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("gm1_02.title")}
      moduleCode="GM1.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "ANTIDERIVATIVE", label: t("gm1_02.stages.antiderivative") },
        { id: "DEFINITE_INTEGRAL", label: t("gm1_02.stages.definite_integral") },
        { id: "APPLICATION", label: t("gm1_02.stages.application") },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t("gm1_02.footer_left")}
      translations={{
        back: t("gm1_02.back"),
        check: t("gm1_02.check"),
        next: t("gm1_02.next"),
        correct: t("gm1_02.correct"),
        incorrect: t("gm1_02.incorrect"),
        ready: t("gm1_02.ready"),
        monitor_title: t("gm1_02.monitor_title"),
        difficulty: {
          basic: t("gm1_02.difficulty.basic"),
          core: t("gm1_02.difficulty.core"),
          advanced: t("gm1_02.difficulty.advanced"),
          elite: t("gm1_02.difficulty.elite"),
        },
      }}
      monitorContent={
        <div className="space-y-4 h-full flex flex-col">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t("gm1_02.monitor_title")}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t("gm1_02.target_title")}
            </div>
            <div className="text-white font-black text-lg">
              <InlineMath math={currentQuest?.expressionLatex || ""} />
            </div>
            {stage === "ANTIDERIVATIVE" && (
              <div className="text-white/70 text-sm">
                <InlineMath math={t("gm1_02.prompts.hint_power")} />
              </div>
            )}
            {stage === "DEFINITE_INTEGRAL" && (
              <div className="text-white/70 text-sm">
                <InlineMath math={t("gm1_02.prompts.hint_definite")} />
              </div>
            )}
            {stage === "APPLICATION" && (
              <div className="text-white/70 text-sm">
                <InlineMath math={t("gm1_02.prompts.hint_area")} />
              </div>
            )}
          </div>
          <div className="flex-1 min-h-0">
            <IntegralVisualization
              quest={currentQuest}
              inputs={inputs}
              checkStatus={lastCheck}
            />
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t("gm1_02.mission.title")}
          </h3>
          <p className="text-base text-white/70 font-mono">{t("gm1_02.mission.description")}</p>
        </div>

        {/* Scenario Description */}
        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6 max-w-4xl mx-auto">
          <div className="text-sm text-green-400/90 leading-relaxed whitespace-pre-line">
            {stage === "ANTIDERIVATIVE" && t("gm1_02.scenarios.antiderivative")}
            {stage === "DEFINITE_INTEGRAL" && t("gm1_02.scenarios.definite_integral")}
            {stage === "APPLICATION" && t("gm1_02.scenarios.application")}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t("gm1_02.objective_title")}
          </h3>
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
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
            {t("gm1_02.input_tip_2dp")}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
