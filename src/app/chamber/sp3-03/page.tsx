"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import FlowMonitor from "@/components/shared/FlowMonitor";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
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
    requestAiFeedback
  } = useQuestManager<SP303Quest, Stage>({
    moduleCode: "sp3-03",
    buildPool,
    initialStage: "POTENTIAL",
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

  if (!currentQuest) return <div className="p-20 text-white">Loading...</div>;

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("sp3_03.title")}
      moduleCode="SP3.03"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stagesProps}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t("sp3_03.footer_left")}
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
          title="BASEL_ENERGY_AUDIT"
          hubLabel="IWB"
          sources={[
            { label: "SOLAR", value: 45, color: "bg-yellow-400" },
            { label: "HYDRO", value: 30, color: "bg-blue-400" },
            { label: "GRID", value: 25, color: "bg-purple-400" }
          ]}
          meta={[
            { label: "Efficiency", value: "92.4%", color: "text-green-400" },
            { label: "Grid_Load", value: "1.2 GW", color: "text-cyan-400" }
          ]}
        />
      }
    >
      <div className="space-y-6">
        <div className="bg-gray-800/50 p-6 rounded-lg space-y-4">
          <div className="text-2xl text-white font-black leading-tight max-w-2xl mx-auto drop-shadow-sm flex justify-center">
            <InlineMath math={`\\text{${currentQuest?.promptLatex.replace(/%/g, '\\%').replace(/^2/g, '^2')}}`} />
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
