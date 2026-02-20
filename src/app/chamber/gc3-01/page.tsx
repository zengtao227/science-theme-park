"use client";

import { useMemo, useEffect } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import EquilibriumCanvas from "@/components/chamber/gc3-01/EquilibriumCanvas";
import { useQuestManager } from "@/hooks/useQuestManager";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stage,
  GC301Quest as GC301QuestType,
  generateEquilibriumQuests,
} from "@/lib/gc3-01/quests";

export default function GC301Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();

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
  } = useQuestManager<GC301QuestType, Stage>({
    moduleCode: "gc3-01",
    buildPool: (d, s) => generateEquilibriumQuests(t, d, s),
    initialStage: "CONCENTRATION",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gc3-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const activeScenario = useMemo(() => {
    if (stage === "CONCENTRATION") return t("gc3_01.scenarios.basel_synthesis");
    if (stage === "TEMPERATURE") return t("gc3_01.scenarios.catalysis_innovation");
    return t("gc3_01.scenarios.haber_process");
  }, [stage, t]);

  const stages = [
    { id: "CONCENTRATION", label: t("gc3_01.stages.concentration") },
    { id: "TEMPERATURE", label: t("gc3_01.stages.temperature") },
    { id: "PRESSURE", label: t("gc3_01.stages.pressure") },
  ];

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("gc3_01.title")}
      moduleCode="GC3.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t("gc3_01.footer_left")}
      translations={{
        back: t("gc3_01.back"),
        check: t("gc3_01.check"),
        next: t("gc3_01.next"),
        correct: t("gc3_01.correct"),
        incorrect: t("gc3_01.incorrect"),
        difficulty: {
          BASIC: t("gc3_01.difficulty.basic"),
          CORE: t("gc3_01.difficulty.core"),
          ADVANCED: t("gc3_01.difficulty.advanced"),
          ELITE: t("gc3_01.difficulty.elite"),
        },
        ready: t("gc3_01.ready"),
        monitor_title: t("gc3_01.monitor_title"),
      }}
      monitorContent={
        <div className="space-y-4">
          <EquilibriumCanvas
            temperature={currentQuest?.simConfig.temp ?? 50}
            pressure={currentQuest?.simConfig.pressure ?? 50}
            concentrationA={currentQuest?.simConfig.concA ?? 50}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t("gc3_01.target_title")}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t("gc3_01.labels.reaction")}
            </div>
            <div className="text-xl text-white font-black text-center">
              <InlineMath math="A + B \rightleftharpoons C + D" />
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t("gc3_01.mission.title")}
          </h3>
          <div className="text-2xl text-white font-black max-w-3xl mx-auto leading-tight italic text-center">
            {currentQuest?.promptLatex}
          </div>
        </div>

        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-3">
            <input
              value={inputs["ans"] || ""}
              onChange={(e) => setInputs({ ans: e.target.value })}
              className="w-full bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
              placeholder="..."
            />
          </div>
        </div>

        {activeScenario && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${stage}-${difficulty}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-neon-purple/[0.02] border border-neon-purple/10 rounded-3xl p-8 backdrop-blur-sm max-w-3xl mx-auto w-full"
            >
              <p className="text-sm text-white/50 leading-relaxed italic">
                {activeScenario}
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </ChamberLayout>
  );
}
