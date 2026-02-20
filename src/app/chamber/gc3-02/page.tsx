"use client";

import { useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useQuestManager } from "@/hooks/useQuestManager";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stage,
  GC302Quest as GC302QuestType,
  generateCrystalQuests,
} from "@/lib/gc3-02/quests";

const CrystalCanvas = dynamic(() => import("@/components/chamber/gc3-02/CrystalCanvas"), {
  ssr: false,
});

export default function GC302Page() {
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
  } = useQuestManager<GC302QuestType, Stage>({
    moduleCode: "gc3-02",
    buildPool: (d, s) => generateCrystalQuests(t, d, s),
    initialStage: "SC",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gc3-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const activeScenario = useMemo(() => {
    if (stage === "SC") return t("gc3_02.scenarios.crystallography_center");
    if (stage === "BCC") return t("gc3_02.scenarios.solid_state_research");
    return t("gc3_02.scenarios.drug_polymorphism");
  }, [stage, t]);

  const stages = [
    { id: "SC", label: t("gc3_02.stages.sc") },
    { id: "BCC", label: t("gc3_02.stages.bcc") },
    { id: "FCC", label: t("gc3_02.stages.fcc") },
  ];

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("gc3_02.title")}
      moduleCode="GC3.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t("gc3_02.footer_left")}
      translations={{
        back: t("gc3_02.back"),
        check: t("gc3_02.check"),
        next: t("gc3_02.next"),
        correct: t("gc3_02.correct"),
        incorrect: t("gc3_02.incorrect"),
        difficulty: {
          BASIC: t("gc3_02.difficulty.BASIC"),
          CORE: t("gc3_02.difficulty.CORE"),
          ADVANCED: t("gc3_02.difficulty.ADVANCED"),
          ELITE: t("gc3_02.difficulty.ELITE"),
        },
      }}
      monitorContent={
        <div className="flex flex-col h-full gap-4">
          <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
            <CrystalCanvas
              latticeType={currentQuest?.simConfig.latticeType || "SC"}
              showVoids={currentQuest?.simConfig.showVoids || false}
            />
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3 font-mono">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">LATTICE INFO</div>
            <div className="text-sm text-white/80">
              <div>TYPE: {stage}</div>
              <div>ATOMS/CELL: {stage === "SC" ? 1 : stage === "BCC" ? 2 : 4}</div>
              <div>PACKING: {stage === "SC" ? "52%" : stage === "BCC" ? "68%" : "74%"}</div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4 italic">
            {t("gc3_02.monitor_title")}
          </h3>
          <div className="text-2xl text-white font-black max-w-3xl mx-auto leading-tight italic">
            {currentQuest?.promptLatex}
          </div>
        </div>

        <div className="p-6 bg-black/40 border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6 text-center">
          <input
            value={inputs["ans"] || ""}
            onChange={(e) => setInputs({ ans: e.target.value })}
            className="w-full bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
            placeholder="..."
          />
        </div>

        {activeScenario && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${stage}-${difficulty}`}
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
