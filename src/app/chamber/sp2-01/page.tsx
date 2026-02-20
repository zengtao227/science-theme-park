"use client";

import { useState, useCallback, useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { Difficulty, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";
import { SP201Quest, Stage } from "@/types/sp2-01-types";
import { buildStagePool } from "@/lib/sp2-01-quest-data";

export default function SP201CircuitBasics() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();

  const sp2_01_t = useMemo(() => ({
    title: t("sp2_01.title"),
    back: t("sp2_01.back"),
    difficulty: {
      basic: t("sp2_01.difficulty.basic"),
      core: t("sp2_01.difficulty.core"),
      advanced: t("sp2_01.difficulty.advanced"),
      elite: t("sp2_01.difficulty.elite")
    },
    stages: {
      components: t("sp2_01.stages.components"),
      simple_circuits: t("sp2_01.stages.simple_circuits"),
      circuit_diagrams: t("sp2_01.stages.circuit_diagrams")
    },
    scenarios: {
      components: t("sp2_01.scenarios.components"),
      simple_circuits: t("sp2_01.scenarios.simple_circuits"),
      circuit_diagrams: t("sp2_01.scenarios.circuit_diagrams")
    },
    footer_left: t("sp2_01.footer_left"),
    check: t("sp2_01.check"),
    next: t("sp2_01.next"),
    correct: t("sp2_01.correct"),
    incorrect: t("sp2_01.incorrect")
  }), [t]);

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
    } = useQuestManager<SP201Quest, Stage>({
    moduleCode: "sp2-01",
    buildPool: (d, s) => buildStagePool(d, s),
    initialStage: "COMPONENTS",
  });

  if (!currentQuest) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={sp2_01_t.title}
      moduleCode="SP2.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "COMPONENTS", label: sp2_01_t.stages.components },
        { id: "CIRCUITS", label: sp2_01_t.stages.simple_circuits },
        { id: "DIAGRAMS", label: sp2_01_t.stages.circuit_diagrams },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={sp2_01_t.footer_left}
      translations={{
        back: sp2_01_t.back,
        difficulty: sp2_01_t.difficulty,
        check: sp2_01_t.check,
        next: sp2_01_t.next,
        correct: sp2_01_t.correct,
        incorrect: sp2_01_t.incorrect,
      }}
      monitorContent={
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-cyan-400 text-2xl mb-4">⚡ CIRCUIT SIMULATOR</div>
            <div className="text-white/70">
              {stage === "COMPONENTS" && "Component Identification Mode"}
              {stage === "CIRCUITS" && "Circuit Building Mode"}
              {stage === "DIAGRAMS" && "Diagram Drawing Mode"}
            </div>
            {currentQuest?.componentInfo && (
              <div className="mt-8 p-6 bg-black/30 rounded-xl border border-cyan-400/30">
                <div className="text-6xl mb-4">{currentQuest?.componentInfo.symbol}</div>
                <div className="text-xl text-white mb-2">{currentQuest?.componentInfo.name.en}</div>
                <div className="text-sm text-white/70">{currentQuest?.componentInfo.function.en}</div>
              </div>
            )}
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Basel Scenario */}
        <div className="bg-black/30 rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-3">
            {stage === "COMPONENTS" && sp2_01_t.stages.components}
            {stage === "CIRCUITS" && sp2_01_t.stages.simple_circuits}
            {stage === "DIAGRAMS" && sp2_01_t.stages.circuit_diagrams}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed">
            {currentQuest?.baselContext}
          </p>
        </div>

        {/* Quest Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuest?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-black/30 rounded-xl p-6 border border-white/10"
          >
            <div className="mb-4">
              <div className="text-white/50 text-sm mb-2">
                Quest {currentQuest?.id} | {difficulty} | {stage}
              </div>
              <div className="text-white text-lg mb-4">{currentQuest?.promptLatex}</div>
              
              {currentQuest?.designRequirements && (
                <div className="mb-4 p-4 bg-cyan-500/10 rounded-lg border border-cyan-400/30">
                  <div className="text-cyan-400 font-bold mb-2">Design Requirements:</div>
                  <ul className="list-disc list-inside text-white/70 text-sm space-y-1">
                    {currentQuest?.designRequirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Input Slots */}
            {((currentQuest?.slots && currentQuest?.slots) || []).length > 0 && (
              <div className="space-y-3">
                {currentQuest?.slots.map((slot) => (
                  <div key={slot.id} className="flex items-center gap-4">
                    <label className="text-white/70 min-w-[150px]">{slot.labelLatex}:</label>
                    <input
                      type="text"
                      value={inputs[slot.id] || ""}
                      onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                      placeholder={slot.placeholder}
                      className="flex-1 bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Hints */}
            {currentQuest?.hints && currentQuest?.hints.length > 0 && (
              <details className="mt-4">
                <summary className="text-cyan-400 cursor-pointer hover:text-cyan-300">
                  💡 Show Hints
                </summary>
                <div className="mt-2 space-y-2">
                  {currentQuest?.hints.map((hint, idx) => (
                    <div key={idx} className="text-white/60 text-sm pl-4">
                      {idx + 1}. {hint}
                    </div>
                  ))}
                </div>
              </details>
            )}

            {/* Feedback */}
            {lastCheck && (
              <div className={`mt-4 p-3 rounded-lg ${lastCheck.ok ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                {lastCheck.ok ? sp2_01_t.correct : sp2_01_t.incorrect}
                {lastCheck.ok && currentQuest?.correctLatex && (
                  <div className="mt-2 text-sm">{currentQuest?.correctLatex}</div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </ChamberLayout>
  );
}
