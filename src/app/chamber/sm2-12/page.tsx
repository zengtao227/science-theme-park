"use client";

import { useEffect, useCallback, useMemo } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import CombinatoricsVisualization from "@/components/chamber/sm2-12/CombinatoricsVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "PERMUTATIONS" | "COMBINATIONS" | "PROBABILITY";
type ComboQuest = Quest & { stage: Stage; context?: string; scenario?: string };

interface ComboData {
  n: number;
  r: number;
  answer: number;
}

const factorial = (n: number): number => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};

const permutation = (n: number, r: number): number => {
  return factorial(n) / factorial(n - r);
};

const combination = (n: number, r: number): number => {
  return factorial(n) / (factorial(r) * factorial(n - r));
};

const QUEST_DATA: Record<Stage, Record<Difficulty, ComboData[]>> = {
  PERMUTATIONS: {
    BASIC: [
      { n: 5, r: 2, answer: permutation(5, 2) },
      { n: 4, r: 3, answer: permutation(4, 3) },
      { n: 6, r: 2, answer: permutation(6, 2) },
      { n: 5, r: 3, answer: permutation(5, 3) },
      { n: 7, r: 2, answer: permutation(7, 2) },
    ],
    CORE: [
      { n: 8, r: 3, answer: permutation(8, 3) },
      { n: 6, r: 4, answer: permutation(6, 4) },
      { n: 9, r: 2, answer: permutation(9, 2) },
      { n: 7, r: 3, answer: permutation(7, 3) },
      { n: 10, r: 2, answer: permutation(10, 2) },
    ],
    ADVANCED: [
      { n: 10, r: 4, answer: permutation(10, 4) },
      { n: 8, r: 5, answer: permutation(8, 5) },
      { n: 12, r: 3, answer: permutation(12, 3) },
      { n: 9, r: 4, answer: permutation(9, 4) },
      { n: 11, r: 3, answer: permutation(11, 3) },
    ],
    ELITE: [
      { n: 15, r: 4, answer: permutation(15, 4) },
      { n: 12, r: 5, answer: permutation(12, 5) },
      { n: 20, r: 3, answer: permutation(20, 3) },
      { n: 14, r: 4, answer: permutation(14, 4) },
      { n: 16, r: 3, answer: permutation(16, 3) },
    ],
  },
  COMBINATIONS: {
    BASIC: [
      { n: 5, r: 2, answer: combination(5, 2) },
      { n: 6, r: 3, answer: combination(6, 3) },
      { n: 4, r: 2, answer: combination(4, 2) },
      { n: 7, r: 3, answer: combination(7, 3) },
      { n: 5, r: 3, answer: combination(5, 3) },
    ],
    CORE: [
      { n: 8, r: 3, answer: combination(8, 3) },
      { n: 9, r: 4, answer: combination(9, 4) },
      { n: 10, r: 3, answer: combination(10, 3) },
      { n: 7, r: 4, answer: combination(7, 4) },
      { n: 11, r: 3, answer: combination(11, 3) },
    ],
    ADVANCED: [
      { n: 12, r: 4, answer: combination(12, 4) },
      { n: 10, r: 5, answer: combination(10, 5) },
      { n: 15, r: 3, answer: combination(15, 3) },
      { n: 13, r: 4, answer: combination(13, 4) },
      { n: 14, r: 5, answer: combination(14, 5) },
    ],
    ELITE: [
      { n: 20, r: 5, answer: combination(20, 5) },
      { n: 18, r: 6, answer: combination(18, 6) },
      { n: 25, r: 4, answer: combination(25, 4) },
      { n: 22, r: 5, answer: combination(22, 5) },
      { n: 30, r: 3, answer: combination(30, 3) },
    ],
  },
  PROBABILITY: {
    BASIC: [
      { n: 10, r: 2, answer: 0.2 },
      { n: 20, r: 5, answer: 0.25 },
      { n: 8, r: 2, answer: 0.25 },
      { n: 12, r: 3, answer: 0.25 },
      { n: 16, r: 4, answer: 0.25 },
    ],
    CORE: [
      { n: 15, r: 3, answer: 0.2 },
      { n: 24, r: 6, answer: 0.25 },
      { n: 18, r: 3, answer: 0.167 },
      { n: 21, r: 7, answer: 0.333 },
      { n: 30, r: 5, answer: 0.167 },
    ],
    ADVANCED: [
      { n: 40, r: 8, answer: 0.2 },
      { n: 36, r: 6, answer: 0.167 },
      { n: 50, r: 10, answer: 0.2 },
      { n: 45, r: 9, answer: 0.2 },
      { n: 60, r: 12, answer: 0.2 },
    ],
    ELITE: [
      { n: 100, r: 20, answer: 0.2 },
      { n: 80, r: 16, answer: 0.2 },
      { n: 120, r: 24, answer: 0.2 },
      { n: 90, r: 18, answer: 0.2 },
      { n: 150, r: 30, answer: 0.2 },
    ],
  },
};

export default function SM212Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();

  const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): ComboQuest[] => {
    const quests: ComboQuest[] = [];
    const dataList = QUEST_DATA[stage]?.[difficulty] || [];

    dataList.forEach((data, idx) => {
      if (stage === "PERMUTATIONS") {
        quests.push({
          id: `PER_${difficulty[0]}${idx + 1}`,
          difficulty,
          stage,
          scenario: t("sm2_12.scenarios.permutations"),
          promptLatex: t("sm2_12.prompts.calculate_permutation"),
          expressionLatex: `P(${data.n}, ${data.r}) = \\\\frac{${data.n}!}{(${data.n}-${data.r})!}`,
          targetLatex: `P(${data.n}, ${data.r})`,
          slots: [{ id: "ans", labelLatex: `P(${data.n}, ${data.r})`, placeholder: "...", expected: data.answer }],
          correctLatex: `P(${data.n}, ${data.r}) = ${data.answer}`,
          hintLatex: [t("sm2_12.hints.permutation_formula")],
        });
      } else if (stage === "COMBINATIONS") {
        quests.push({
          id: `COM_${difficulty[0]}${idx + 1}`,
          difficulty,
          stage,
          scenario: t("sm2_12.scenarios.combinations"),
          promptLatex: t("sm2_12.prompts.calculate_combination"),
          expressionLatex: `C(${data.n}, ${data.r}) = \\\\frac{${data.n}!}{${data.r}!(${data.n}-${data.r})!}`,
          targetLatex: `C(${data.n}, ${data.r})`,
          slots: [{ id: "ans", labelLatex: `C(${data.n}, ${data.r})`, placeholder: "...", expected: data.answer }],
          correctLatex: `C(${data.n}, ${data.r}) = ${data.answer}`,
          hintLatex: [t("sm2_12.hints.combination_formula")],
        });
      } else {
        quests.push({
          id: `PRO_${difficulty[0]}${idx + 1}`,
          difficulty,
          stage,
          scenario: t("sm2_12.scenarios.probability"),
          promptLatex: t("sm2_12.prompts.calculate_probability"),
          expressionLatex: `n = ${data.n}, \\; r = ${data.r}`,
          targetLatex: "P",
          slots: [{ id: "ans", labelLatex: "P", placeholder: "0.xxx", expected: data.answer }],
          correctLatex: `P = ${data.answer}`,
          hintLatex: [t("sm2_12.hints.probability_formula")],
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
  } = useQuestManager<ComboQuest, Stage>({
    moduleCode: "sm2-12",
    buildPool,
    initialStage: "PERMUTATIONS",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sm2-12", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const stagesProps = useMemo(() => [
    { id: "PERMUTATIONS" as Stage, label: t("sm2_12.stages.permutations") },
    { id: "COMBINATIONS" as Stage, label: t("sm2_12.stages.combinations") },
    { id: "PROBABILITY" as Stage, label: t("sm2_12.stages.probability") },
  ], [t]);

  const hint = getHint();

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      moduleCode="SM2.12"
      title={t("sm2_12.title")}
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stagesProps}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t("sm2_12.footer_left")}
      translations={{
        back: t("sm2_12.back"),
        check: t("sm2_12.check"),
        next: t("sm2_12.next"),
        correct: t("sm2_12.correct"),
        incorrect: t("sm2_12.incorrect"),
        ready: t("sm2_12.ready"),
        monitor_title: t("sm2_12.monitor_title"),
        difficulty: {
          basic: t("sm2_12.difficulty.basic"),
          core: t("sm2_12.difficulty.core"),
          advanced: t("sm2_12.difficulty.advanced"),
          elite: t("sm2_12.difficulty.elite"),
        },
      }}
      monitorContent={
        <div className="flex flex-col h-full gap-4">
          <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
            <CombinatoricsVisualization
              quest={currentQuest}
              inputs={inputs}
              checkStatus={lastCheck}
            />
          </div>
          <div className="mt-auto pt-4 border-t border-white/5">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
              <span>{t("sm2_12.labels.progress")}</span>
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
                  {t("sm2_12.labels.formula")}
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
                            {lastCheck.ok ? t("sm2_12.results.valid") : t("sm2_12.results.invalid")}
                          </div>
                          <div className="text-sm font-medium opacity-70">
                            {lastCheck.ok ? t("sm2_12.results.valid_desc") : t("sm2_12.results.invalid_desc")}
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
                          {t("sm2_12.results.next")}
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
