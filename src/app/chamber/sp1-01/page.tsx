"use client";

import { useState, useCallback, useMemo } from "react";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { ForceVectorDiagram } from "@/components/chamber/sp1-01/ForceVectorDiagram";
import PhysicsPlayground3D from "@/components/chamber/sp1-01/PhysicsPlayground3D";
import { buildSP101Pool } from "@/lib/sp1-01-adapter";
import { Difficulty } from "@/hooks/useQuestManager";
import { Stage } from "@/lib/sp1-01/domain/types";
import { AnimatePresence, motion } from "framer-motion";
import { InlineMath } from "react-katex";

export default function SP101_ForcesBasics() {
  const { t } = useLanguage();

  const stages = useMemo(() => [
    { id: "FORCE_CONCEPTS" as Stage, label: t("sp1_01.stages.concepts") || "Concepts" },
    { id: "FORCE_COMPOSITION" as Stage, label: t("sp1_01.stages.composition") || "Composition" },
    { id: "FORCE_EQUILIBRIUM" as Stage, label: t("sp1_01.stages.equilibrium") || "Equilibrium" }
  ], [t]);

  const buildPool = useCallback((d: Difficulty, s: Stage) => buildSP101Pool(d as any, s, t), [t]);

  const {
    difficulty,
    stage,
    inputs,
    lastCheck,
    currentQuest,
    progress,
    canPrevious,
    canNext,
    successRate,
    currentStageStats,
    getHint,
    getCurrentErrorCount,
    setInputs,
    verify,
    next,
    previous,
    handleDifficultyChange,
    handleStageChange,
    adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<any, Stage>({
    moduleCode: "sp1-01",
    buildPool,
    initialStage: "FORCE_CONCEPTS" as Stage,
  });

  const hint = getHint();
  const errorCount = getCurrentErrorCount();

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("sp1_01.title") || "Forces Basics"}
      moduleCode="SP1.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={handleStageChange as (s: string) => void}
      onVerify={verify}
      onNext={canNext ? next : undefined}
      checkStatus={lastCheck}
      translations={{
        back: t("sp1_01.back"),
        difficulty: {
          basic: t("sp1_01.difficulty.basic"),
          core: t("sp1_01.difficulty.core"),
          advanced: t("sp1_01.difficulty.advanced"),
          elite: t("sp1_01.difficulty.elite")
        },
        check: t("sp1_01.check"),
        next: t("sp1_01.next"),
        correct: t("sp1_01.correct"),
        incorrect: t("sp1_01.incorrect"),
        ready: "FORCE_SYSTEM_OK",
        monitor_title: "VECTOR_SCAN_V1"
      }}
      monitorContent={
        <div className="flex flex-col items-center justify-center h-full w-full">
          {currentQuest?.visualization === 'force_vector' && (
            <PhysicsPlayground3D
              forces={currentQuest?.forces || [{
                magnitude: currentQuest?.validation?.correctAnswer?.value || 100,
                angle: 45,
                label: "F"
              }]}
            />
          )}
          {!currentQuest?.visualization && (
            <div className="text-white/20 font-black italic text-4xl">STATIC_SCAN</div>
          )}
        </div>
      }
    >
      <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto pb-12">
        {/* Basel Context Section */}
        {currentQuest?.scenarioTitle && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6"
          >
            <h3 className="text-amber-400 font-black text-[10px] uppercase tracking-[0.3em] mb-3">
              {currentQuest?.scenarioTitle}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed italic">
              {currentQuest?.scenarioDesc}
            </p>
          </motion.div>
        )}

        {/* Progress & Navigation Bar */}
        <div className="flex flex-col gap-2 bg-white/[0.02] border border-white/10 rounded-2xl p-5 shadow-inner">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-white/30 tracking-[0.2em] uppercase mb-1">
                  {t("sp1_01.labels.progress") || "Progress"}
                </span>
                <span className="text-xs font-black text-cyan-400 tracking-wider">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="flex flex-col border-l border-white/10 pl-6">
                <span className="text-[8px] font-black text-white/30 tracking-[0.2em] uppercase mb-1">
                  {t("common.mastery") || "Success Rate"}
                </span>
                <span className={`text-xs font-black tracking-wider ${successRate > 0.8 ? 'text-green-400' : successRate > 0.5 ? 'text-amber-400' : 'text-white/60'}`}>
                  {Math.round(successRate * 100)}%
                </span>
              </div>
              <div className="flex flex-col border-l border-white/10 pl-6">
                <span className="text-[8px] font-black text-white/30 tracking-[0.2em] uppercase mb-1">
                  {t("common.attempts") || "Attempts"}
                </span>
                <span className="text-xs font-black text-white/60 tracking-wider">
                  {currentStageStats.attempts}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={previous}
                disabled={!canPrevious}
                className={`px-4 py-2 border border-white/10 text-[10px] uppercase font-black tracking-widest transition-all rounded-lg ${canPrevious ? 'hover:bg-white/10 hover:border-white/30 text-white' : 'opacity-20 cursor-not-allowed text-white/30'}`}
              >
                {t("sp1_01.labels.previous") || "Prev"}
              </button>
              <button
                onClick={next}
                disabled={!canNext}
                className={`px-4 py-2 border border-white/10 text-[10px] uppercase font-black tracking-widest transition-all rounded-lg ${canNext ? 'hover:bg-white/10 hover:border-white/30 text-white' : 'opacity-20 cursor-not-allowed text-white/30'}`}
              >
                {t("sp1_01.labels.skip") || "Skip"}
              </button>
            </div>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-3">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Quest Content Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuest?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 space-y-8 relative overflow-hidden"
          >
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl -mr-16 -mt-16 rounded-full" />

            <div className="space-y-4 relative">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-black text-white/40 tracking-[0.2em] uppercase">
                    ID: {currentQuest?.id}
                  </span>
                  {errorCount > 0 && (
                    <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-[9px] font-black text-red-400 tracking-[0.2em] uppercase animate-pulse">
                      X {errorCount} {t("common.failed_attempts") || "Attempts"}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-black text-cyan-400/50 tracking-[0.3em] uppercase">{currentQuest?.type}</span>
              </div>
              <div className="text-xl text-white font-medium leading-relaxed">
                <InlineMath math={currentQuest?.promptLatex || ""} />
              </div>
            </div>

            {/* Hint Box (if errorCount > 0) */}
            <AnimatePresence>
              {hint && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4 flex gap-4 items-start"
                >
                  <div className="mt-0.5 text-cyan-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-cyan-400/60 uppercase tracking-widest">System Hint</span>
                    <div className="text-cyan-300 text-sm italic">
                      <InlineMath math={hint} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Slots / Options */}
            <div className="space-y-4 relative">
              {currentQuest?.type === 'MULTIPLE_CHOICE' ? (
                <div className="grid grid-cols-1 gap-3">
                  {currentQuest?.options?.map((opt: any) => (
                    <button
                      key={opt.id}
                      onClick={() => setInputs({ answer: opt.text })}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 group ${inputs.answer === opt.text
                        ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
                        }`}
                    >
                      <div className={`w-2 h-2 rounded-full transition-all ${inputs.answer === opt.text ? "bg-black scale-125" : "bg-white/20 group-hover:bg-white/40"}`} />
                      <span className="text-sm font-medium">{opt.text}</span>
                    </button>
                  ))}
                </div>
              ) : (
                currentQuest?.slots?.map((slot: any) => (
                  <div key={slot.id} className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-white/40 tracking-[0.2em] uppercase ml-1">
                      <InlineMath math={slot.labelLatex} />
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        value={inputs[slot.id] || ""}
                        onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                        placeholder={slot.placeholder}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] transition-all group-hover:border-white/30"
                      />
                      {slot.unit && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 text-[10px] font-black tracking-widest uppercase">
                          {slot.unit}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Feedback Area */}
            {lastCheck && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className={`p-5 rounded-xl border-l-4 ${lastCheck.ok
                  ? "bg-green-500/5 border-green-500/50 text-green-400"
                  : "bg-red-500/5 border-red-500/50 text-red-400"
                  }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${lastCheck.ok ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-60">
                    {lastCheck.ok ? "Verification Success" : "Analysis Error"}
                  </span>
                </div>
                <p className="text-sm font-medium leading-relaxed pl-4">
                  <InlineMath math={lastCheck.ok ? currentQuest?.feedback?.correct : currentQuest?.feedback?.incorrect} />
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </ChamberLayout>
  );
}

