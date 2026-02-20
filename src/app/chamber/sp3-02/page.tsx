"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import LawsCanvas from "@/components/chamber/sp1-02/LawsCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import {
  Stage,
  SP302Quest,
  generateNewton1Quests,
  generateNewton2Quests,
  generateFrictionQuests,
} from "@/lib/sp3-02/quests";




export default function SP302Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();

  const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SP302Quest[] => {
    if (stage === "NEWTON_1") return generateNewton1Quests(t, difficulty);
    if (stage === "NEWTON_2") return generateNewton2Quests(t, difficulty);
    if (stage === "FRICTION") return generateFrictionQuests(t, difficulty);
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
    requestAiFeedback
  } = useQuestManager<SP302Quest, Stage>({
    moduleCode: "sp3-02",
    buildPool,
    initialStage: "NEWTON_1",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sp3-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const stagesProps = useMemo(() => [
    { id: "NEWTON_1" as Stage, label: t("sp3_02.stages.newton_1") },
    { id: "NEWTON_2" as Stage, label: t("sp3_02.stages.newton_2") },
    { id: "FRICTION" as Stage, label: t("sp3_02.stages.friction") },
  ], [t]);

  if (!currentQuest) return <div className="p-20 text-white">Loading...</div>;

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("sp3_02.title")}
      moduleCode="SP3.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stagesProps}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t("sp3_02.footer_left")}
      translations={{
        back: t("sp3_02.back"),
        check: t("sp3_02.check"),
        next: t("sp3_02.next"),
        correct: t("sp3_02.correct"),
        incorrect: t("sp3_02.incorrect"),
        difficulty: {
          basic: t("sp3_02.difficulty.basic"),
          core: t("sp3_02.difficulty.core"),
          advanced: t("sp3_02.difficulty.advanced"),
          elite: t("sp3_02.difficulty.elite"),
        },
        monitor_title: t("sp3_02.monitor_title"),
      }}
      monitorContent={
        <LawsCanvas
          scenario={stage === "NEWTON_1" ? "acceleration" : (stage === "FRICTION" ? "friction" : "acceleration")}
          mass={currentQuest?.mass || 1}
          friction={currentQuest?.frictionCoeff || 0}
          forceX={currentQuest?.force || 0}
        />
      }
    >
      <div className="space-y-6">
        <div className="bg-gray-800/50 p-6 rounded-lg space-y-4">
          <div className="text-lg">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </div>
          <div className="text-cyan-300">
            <InlineMath math={currentQuest?.expressionLatex || ""} />
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
