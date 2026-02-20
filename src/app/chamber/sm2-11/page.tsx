"use client";

import { useEffect, useCallback, useMemo } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import SequenceVisualization from "@/components/chamber/sm2-11/SequenceVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "ARITHMETIC" | "GEOMETRIC" | "SERIES";
type SequenceQuest = Quest & { stage: Stage; context?: string; scenario?: string };

interface SequenceData {
  a1: number;
  d?: number;
  r?: number;
  n: number;
  answer: number;
}

const QUEST_DATA: Record<Stage, Record<Difficulty, SequenceData[]>> = {
  ARITHMETIC: {
    BASIC: [
      { a1: 2, d: 3, n: 5, answer: 14 },
      { a1: 5, d: 2, n: 4, answer: 11 },
      { a1: 1, d: 4, n: 6, answer: 21 },
      { a1: 3, d: 5, n: 3, answer: 13 },
      { a1: 10, d: -2, n: 4, answer: 4 },
    ],
    CORE: [
      { a1: 7, d: 4, n: 8, answer: 35 },
      { a1: 12, d: -3, n: 5, answer: 0 },
      { a1: 5, d: 6, n: 10, answer: 59 },
      { a1: 20, d: -5, n: 6, answer: -5 },
      { a1: 3, d: 7, n: 7, answer: 45 },
    ],
    ADVANCED: [
      { a1: 15, d: 8, n: 12, answer: 103 },
      { a1: 25, d: -4, n: 9, answer: -7 },
      { a1: 8, d: 12, n: 15, answer: 176 },
      { a1: 50, d: -7, n: 11, answer: -20 },
      { a1: 4, d: 9, n: 20, answer: 175 },
    ],
    ELITE: [
      { a1: 100, d: -15, n: 18, answer: -155 },
      { a1: 7, d: 13, n: 25, answer: 319 },
      { a1: 45, d: -8, n: 22, answer: -123 },
      { a1: 3, d: 17, n: 30, answer: 496 },
      { a1: 80, d: -12, n: 16, answer: -100 },
    ],
  },
  GEOMETRIC: {
    BASIC: [
      { a1: 2, r: 3, n: 4, answer: 54 },
      { a1: 5, r: 2, n: 3, answer: 20 },
      { a1: 1, r: 4, n: 5, answer: 256 },
      { a1: 3, r: 2, n: 4, answer: 24 },
      { a1: 4, r: 3, n: 3, answer: 36 },
    ],
    CORE: [
      { a1: 6, r: 2, n: 5, answer: 96 },
      { a1: 3, r: 4, n: 4, answer: 192 },
      { a1: 8, r: 2, n: 6, answer: 256 },
      { a1: 2, r: 5, n: 4, answer: 250 },
      { a1: 10, r: 3, n: 4, answer: 270 },
    ],
    ADVANCED: [
      { a1: 5, r: 3, n: 6, answer: 1215 },
      { a1: 7, r: 2, n: 7, answer: 448 },
      { a1: 4, r: 4, n: 5, answer: 1024 },
      { a1: 12, r: 2, n: 8, answer: 1536 },
      { a1: 3, r: 5, n: 5, answer: 1875 },
    ],
    ELITE: [
      { a1: 2, r: 3, n: 10, answer: 39366 },
      { a1: 5, r: 4, n: 8, answer: 81920 },
      { a1: 8, r: 2, n: 12, answer: 16384 },
      { a1: 3, r: 6, n: 7, answer: 139968 },
      { a1: 10, r: 3, n: 9, answer: 65610 },
    ],
  },
  SERIES: {
    BASIC: [
      { a1: 1, d: 1, n: 5, answer: 15 },
      { a1: 2, d: 2, n: 4, answer: 20 },
      { a1: 3, d: 3, n: 3, answer: 18 },
      { a1: 5, d: 1, n: 6, answer: 45 },
      { a1: 10, d: 2, n: 5, answer: 70 },
    ],
    CORE: [
      { a1: 4, d: 3, n: 8, answer: 116 },
      { a1: 7, d: 5, n: 6, answer: 117 },
      { a1: 2, d: 4, n: 10, answer: 200 },
      { a1: 15, d: -2, n: 7, answer: 63 },
      { a1: 8, d: 6, n: 9, answer: 288 },
    ],
    ADVANCED: [
      { a1: 12, d: 7, n: 12, answer: 606 },
      { a1: 20, d: -3, n: 15, answer: -15 },
      { a1: 5, d: 9, n: 18, answer: 1521 },
      { a1: 25, d: -5, n: 11, answer: 0 },
      { a1: 3, d: 11, n: 20, answer: 2150 },
    ],
    ELITE: [
      { a1: 50, d: -8, n: 25, answer: -1150 },
      { a1: 7, d: 13, n: 30, answer: 6075 },
      { a1: 100, d: -15, n: 22, answer: -1430 },
      { a1: 4, d: 17, n: 35, answer: 10535 },
      { a1: 80, d: -12, n: 28, answer: -2296 },
    ],
  },
};

export default function SM211Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();

  const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SequenceQuest[] => {
    const quests: SequenceQuest[] = [];
    const dataList = QUEST_DATA[stage]?.[difficulty] || [];

    dataList.forEach((data, idx) => {
      if (stage === "ARITHMETIC") {
        quests.push({
          id: `ARI_${difficulty[0]}${idx + 1}`,
          difficulty,
          stage,
          scenario: t("sm2_11.scenarios.arithmetic"),
          promptLatex: t("sm2_11.prompts.find_nth_term"),
          expressionLatex: `a_1 = ${data.a1}, \\; d = ${data.d}, \\; n = ${data.n}`,
          targetLatex: `a_{${data.n}}`,
          slots: [{ id: "ans", labelLatex: `a_{${data.n}}`, placeholder: "...", expected: data.answer }],
          correctLatex: `a_{${data.n}} = ${data.answer}`,
          hintLatex: [t("sm2_11.hints.arithmetic_formula")],
        });
      } else if (stage === "GEOMETRIC") {
        quests.push({
          id: `GEO_${difficulty[0]}${idx + 1}`,
          difficulty,
          stage,
          scenario: t("sm2_11.scenarios.geometric"),
          promptLatex: t("sm2_11.prompts.find_nth_term"),
          expressionLatex: `a_1 = ${data.a1}, \\; r = ${data.r}, \\; n = ${data.n}`,
          targetLatex: `a_{${data.n}}`,
          slots: [{ id: "ans", labelLatex: `a_{${data.n}}`, placeholder: "...", expected: data.answer }],
          correctLatex: `a_{${data.n}} = ${data.answer}`,
          hintLatex: [t("sm2_11.hints.geometric_formula")],
        });
      } else {
        quests.push({
          id: `SER_${difficulty[0]}${idx + 1}`,
          difficulty,
          stage,
          scenario: t("sm2_11.scenarios.series"),
          promptLatex: t("sm2_11.prompts.find_sum"),
          expressionLatex: `a_1 = ${data.a1}, \\; d = ${data.d}, \\; n = ${data.n}`,
          targetLatex: `S_{${data.n}}`,
          slots: [{ id: "ans", labelLatex: `S_{${data.n}}`, placeholder: "...", expected: data.answer }],
          correctLatex: `S_{${data.n}} = ${data.answer}`,
          hintLatex: [t("sm2_11.hints.series_formula")],
        });
      }
    });

    return quests;
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
    getHint,
    currentStageStats,
    adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<SequenceQuest, Stage>({
    moduleCode: "sm2-11",
    buildPool,
    initialStage: "ARITHMETIC",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sm2-11", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const stagesProps = useMemo(() => [
    { id: "ARITHMETIC" as Stage, label: t("sm2_11.stages.arithmetic") },
    { id: "GEOMETRIC" as Stage, label: t("sm2_11.stages.geometric") },
    { id: "SERIES" as Stage, label: t("sm2_11.stages.series") },
  ], [t]);

  const hint = getHint();

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      moduleCode="SM2.11"
      title={t("sm2_11.title")}
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stagesProps}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t("sm2_11.footer_left")}
      translations={{
        back: t("sm2_11.back"),
        check: t("sm2_11.check"),
        next: t("sm2_11.next"),
        correct: t("sm2_11.correct"),
        incorrect: t("sm2_11.incorrect"),
        ready: t("sm2_11.ready"),
        monitor_title: t("sm2_11.monitor_title"),
        difficulty: {
          basic: t("sm2_11.difficulty.basic"),
          core: t("sm2_11.difficulty.core"),
          advanced: t("sm2_11.difficulty.advanced"),
          elite: t("sm2_11.difficulty.elite"),
        },
      }}
      monitorContent={
        <div className="flex flex-col h-full gap-4">
          <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
            <SequenceVisualization
              quest={currentQuest}
              inputs={inputs}
              checkStatus={lastCheck}
            />
          </div>
          <div className="mt-auto pt-4 border-t border-white/5">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
              <span>{t("sm2_11.labels.progress")}</span>
              <span>{currentStageStats?.correct || 0} PTS</span>
            </div>
            <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 transition-all duration-1000 ${
                    i < (currentStageStats ? currentStageStats.correct % 6 : 0)
                      ? "bg-neon-cyan shadow-[0_0_5px_cyan]"
                      : "bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10 max-w-4xl mx-auto w-full">
        {currentQuest && (
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <h3 className="text-[10px] text-neon-cyan uppercase tracking-[0.5em] font-black italic">
                {t("labels.mission_objective")}
              </h3>
              <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                <BlockMath>{currentQuest?.promptLatex}</BlockMath>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="p-8 bg-white/[0.03] border-2 border-neon-cyan/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,255,0.05)]">
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-cyan/40 animate-pulse" />
                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                  {t("sm2_11.labels.sequence_data")}
                </span>
                <div className="text-4xl text-white font-black">
                  <InlineMath math={currentQuest?.expressionLatex || ""} />
                </div>
              </div>
            </div>

            <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan/50 group-hover:h-0 transition-all duration-700" />
              <div className="space-y-8">
                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-cyan font-black flex items-center gap-2">
                  <span className="w-8 h-px bg-neon-cyan/30" />
                  {t("labels.terminal_input")}
                </div>

                <div className="grid grid-cols-1 gap-8 justify-items-center">
                  {currentQuest?.slots.map((slot) => (
                    <div key={slot.id} className="w-full max-w-md space-y-3">
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                        <InlineMath>{slot.labelLatex}</InlineMath>
                        <span className="text-neon-cyan/30 font-mono">NODE_0x{slot.id.toUpperCase()}</span>
                      </div>
                      <div className="relative group">
                        <input
                          className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-cyan/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner"
                          placeholder={slot.placeholder}
                          value={inputs[slot.id] || ""}
                          onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') verify();
                          }}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-cyan/0 group-focus-within:bg-neon-cyan/20 transition-all blur-sm" />
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
                          ? 'bg-green-500/10 border-green-500/30 text-green-400'
                          : 'bg-red-500/10 border-red-500/30 text-red-400'
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 ${
                          lastCheck.ok ? 'border-green-500/50 bg-green-500/20' : 'border-red-500/50 bg-red-500/20'
                        }`}>
                          {lastCheck.ok ? "✓" : "✗"}
                        </div>
                        <div>
                          <div className="font-black text-lg tracking-widest uppercase italic">
                            {lastCheck.ok ? t("sm2_11.results.valid") : t("sm2_11.results.invalid")}
                          </div>
                          <div className="text-sm font-medium opacity-70">
                            {lastCheck.ok ? t("sm2_11.results.valid_desc") : t("sm2_11.results.invalid_desc")}
                          </div>
                        </div>
                      </div>

                      {!lastCheck.ok && hint && (
                        <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t("labels.hint")}:</span>
                          <div className="text-white font-bold text-sm">
                            <InlineMath>{hint}</InlineMath>
                          </div>
                        </div>
                      )}

                      {lastCheck.ok && (
                        <button
                          onClick={next}
                          className="w-full md:w-auto px-10 py-4 bg-white text-black text-xs font-black tracking-[0.3em] uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
                        >
                          {t("sm2_11.results.next")}
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </ChamberLayout>
  );
}
