"use client";

import { useEffect, useCallback, useMemo } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import PhysiologyVisualization from "@/components/chamber/sb2-04/PhysiologyVisualization";
import { Difficulty, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";
import { Stage, SB204Quest } from "@/lib/sb2-04-types";
import { buildStagePool } from "@/lib/sb2-04-quest-builder";

export default function SB204Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();

  const buildPool = useCallback(
    (d: Difficulty, s: Stage) => buildStagePool(t, d, s),
    [t]
  );

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
    getHint,
  } = useQuestManager<SB204Quest, Stage>({
    buildPool,
    initialStage: "DIGESTIVE_SYSTEM",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sb2-04", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const stagesProps = useMemo(
    () => [
      { id: "DIGESTIVE_SYSTEM" as Stage, label: t("sb2_04.stages.digestive_system") },
      { id: "RESPIRATORY_SYSTEM" as Stage, label: t("sb2_04.stages.respiratory_system") },
      { id: "CIRCULATORY_SYSTEM" as Stage, label: t("sb2_04.stages.circulatory_system") },
      { id: "EXCRETORY_SYSTEM" as Stage, label: t("sb2_04.stages.excretory_system") },
    ],
    [t]
  );

  const hint = getHint();

  return (
    <ChamberLayout
      moduleCode="SB2.04"
      title={t("sb2_04.title")}
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stagesProps}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t("sb2_04.footer_left")}
      translations={{
        back: t("sb2_04.back"),
        check: t("sb2_04.check"),
        next: t("sb2_04.next"),
        correct: t("sb2_04.correct"),
        incorrect: t("sb2_04.incorrect"),
        ready: t("sb2_04.ready"),
        monitor_title: t("sb2_04.monitor_title"),
        difficulty: {
          basic: t("sb2_04.difficulty.basic"),
          core: t("sb2_04.difficulty.core"),
          advanced: t("sb2_04.difficulty.advanced"),
          elite: t("sb2_04.difficulty.elite"),
        },
      }}
      monitorContent={
        currentQuest && (
          <PhysiologyVisualization
            quest={currentQuest}
            stage={stage}
            translations={{
              digestive_system: t("sb2_04.stages.digestive_system"),
              respiratory_system: t("sb2_04.stages.respiratory_system"),
              circulatory_system: t("sb2_04.stages.circulatory_system"),
              excretory_system: t("sb2_04.stages.excretory_system"),
              mouth: t("sb2_04.labels.mouth"),
              esophagus: t("sb2_04.labels.esophagus"),
              stomach: t("sb2_04.labels.stomach"),
              liver: t("sb2_04.labels.liver"),
              pancreas: t("sb2_04.labels.pancreas"),
              intestines: t("sb2_04.labels.intestines"),
              nose: t("sb2_04.labels.nose"),
              trachea: t("sb2_04.labels.trachea"),
              lungs: t("sb2_04.labels.lungs"),
              diaphragm: t("sb2_04.labels.diaphragm"),
              heart: t("sb2_04.labels.heart"),
              arteries: t("sb2_04.labels.arteries"),
              veins: t("sb2_04.labels.veins"),
              capillaries: t("sb2_04.labels.capillaries"),
              kidneys: t("sb2_04.labels.kidneys"),
              ureters: t("sb2_04.labels.ureters"),
              bladder: t("sb2_04.labels.bladder"),
              urethra: t("sb2_04.labels.urethra"),
            }}
          />
        )
      }
    >

      <div className="space-y-10 max-w-4xl mx-auto w-full">
        {/* Scenario Description */}
        <div className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
          <h3 className="text-[10px] text-neon-green uppercase tracking-[0.5em] font-black italic mb-4">
            {t("sb2_04.objective_title")}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed font-medium">
            {t(`sb2_04.scenarios.${stage.toLowerCase()}` as any)}
          </p>
        </div>

        {currentQuest && (
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <h3 className="text-[10px] text-neon-green uppercase tracking-[0.5em] font-black italic">
                {t("sb2_04.labels.analysis")}
              </h3>
              <div className="text-2xl text-white font-bold leading-tight max-w-2xl mx-auto">
                {t(currentQuest.promptLatex as any)}
              </div>
            </div>

            {currentQuest.options && currentQuest.options.length > 0 ? (
              // Multiple choice display
              <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
                <div className="space-y-6">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-neon-green font-black flex items-center gap-2">
                    <span className="w-8 h-px bg-neon-green/30" />
                    {t("sb2_04.labels.input_terminal")}
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {currentQuest.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => setInputs({ answer: option.toLowerCase() })}
                        className={`w-full p-6 text-left rounded-2xl border-2 transition-all ${
                          inputs.answer === option.toLowerCase()
                            ? "bg-neon-green/20 border-neon-green text-white"
                            : "bg-white/5 border-white/10 text-white/70 hover:border-white/30"
                        }`}
                      >
                        <div className="text-lg font-bold">{option}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {lastCheck && (
                    <motion.div
                      key={lastCheck.ok ? "correct" : "incorrect"}
                      initial={{ opacity: 0, scale: 0.98, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -10 }}
                      className={`mt-8 p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${
                        lastCheck.ok
                          ? "bg-green-500/10 border-green-500/30 text-green-400"
                          : "bg-red-500/10 border-red-500/30 text-red-400"
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 ${
                            lastCheck.ok
                              ? "border-green-500/50 bg-green-500/20"
                              : "border-red-500/50 bg-red-500/20"
                          }`}
                        >
                          {lastCheck.ok ? "✓" : "✗"}
                        </div>
                        <div>
                          <div className="font-black text-lg tracking-widest uppercase italic">
                            {lastCheck.ok ? t("sb2_04.results.valid") : t("sb2_04.results.invalid")}
                          </div>
                          <div className="text-sm font-medium opacity-70">
                            {lastCheck.ok
                              ? t("sb2_04.results.valid_desc")
                              : t("sb2_04.results.invalid_desc")}
                          </div>
                        </div>
                      </div>

                      {lastCheck.ok && (
                        <button
                          onClick={next}
                          className="w-full md:w-auto px-10 py-4 bg-white text-black text-xs font-black tracking-[0.3em] uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
                        >
                          {t("sb2_04.results.next")}
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Text input display
              <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-neon-green/50 group-hover:h-0 transition-all duration-700" />
                <div className="space-y-8">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-neon-green font-black flex items-center gap-2">
                    <span className="w-8 h-px bg-neon-green/30" />
                    {t("sb2_04.labels.input_terminal")}
                  </div>

                  <div className="grid grid-cols-1 gap-8 justify-items-center">
                    {currentQuest.slots.map((slot) => (
                      <div key={slot.id} className="w-full max-w-md space-y-3">
                        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                          <InlineMath>{slot.labelLatex}</InlineMath>
                          <span className="text-neon-green/30 font-mono">
                            SYS_REG_0x{slot.id.toUpperCase()}
                          </span>
                        </div>
                        <div className="relative group">
                          <input
                            className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-green/50 p-6 text-center outline-none transition-all font-mono text-2xl text-white rounded-2xl shadow-inner"
                            placeholder={slot.placeholder}
                            value={inputs[slot.id] || ""}
                            onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") verify();
                            }}
                          />
                          <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-green/0 group-focus-within:bg-neon-green/20 transition-all blur-sm" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {lastCheck && (
                      <motion.div
                        key={lastCheck.ok ? "correct" : "incorrect"}
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: -10 }}
                        className={`p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${
                          lastCheck.ok
                            ? "bg-green-500/10 border-green-500/30 text-green-400"
                            : "bg-red-500/10 border-red-500/30 text-red-400"
                        }`}
                      >
                        <div className="flex items-center gap-5">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 ${
                              lastCheck.ok
                                ? "border-green-500/50 bg-green-500/20"
                                : "border-red-500/50 bg-red-500/20"
                            }`}
                          >
                            {lastCheck.ok ? "✓" : "✗"}
                          </div>
                          <div>
                            <div className="font-black text-lg tracking-widest uppercase italic">
                              {lastCheck.ok
                                ? t("sb2_04.results.valid")
                                : t("sb2_04.results.invalid")}
                            </div>
                            <div className="text-sm font-medium opacity-70">
                              {lastCheck.ok
                                ? t("sb2_04.results.valid_desc")
                                : t("sb2_04.results.invalid_desc")}
                            </div>
                          </div>
                        </div>

                        {!lastCheck.ok && hint && (
                          <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                              {t("sb2_04.labels.hint")}:
                            </span>
                            <div className="text-white font-bold">
                              <InlineMath>{hint}</InlineMath>
                            </div>
                          </div>
                        )}

                        {lastCheck.ok && (
                          <button
                            onClick={next}
                            className="w-full md:w-auto px-10 py-4 bg-white text-black text-xs font-black tracking-[0.3em] uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
                          >
                            {t("sb2_04.results.next")}
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ChamberLayout>
  );
}
