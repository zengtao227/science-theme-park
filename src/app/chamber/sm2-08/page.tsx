"use client";

import { useEffect, useCallback } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ProbabilityVisualizer from "@/components/chamber/sm2-08/ProbabilityVisualizer";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "BASIC_PROB" | "LOTTERY" | "COMBINED" | "DATA_STATS";
type ProbQuest = Quest & { stage: Stage; context?: string; scenario?: string };

export default function SM208Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const locale = translations[currentLanguage as keyof typeof translations] as typeof translations.EN;
  const t = locale.sm2_08 || translations.EN.sm2_08;

  const buildStagePool = useCallback((t: typeof translations.EN.sm2_08, difficulty: Difficulty, stage: Stage): ProbQuest[] => {
    const pools: Record<Stage, Record<Difficulty, ProbQuest[]>> = {
      BASIC_PROB: {
        BASIC: [
          {
            id: "B1",
            difficulty,
            stage,
            scenario: t.scenarios.bus_punctuality,
            context: t.problems.bus_ontime,
            promptLatex: "P(\\text{on time})",
            expressionLatex: "\\frac{16}{20}",
            targetLatex: "P",
            slots: [{ id: "P", labelLatex: "P", placeholder: "0.x", expected: 0.8, unit: "" }],
            correctLatex: "P = \\frac{16}{20} = 0.8 = 80\\%",
          },
          {
            id: "B2",
            difficulty,
            stage,
            scenario: t.scenarios.weather_basel,
            context: t.problems.weather_rain,
            promptLatex: "P(\\text{rain})",
            expressionLatex: "\\frac{12}{30}",
            targetLatex: "P",
            slots: [{ id: "P", labelLatex: "P", placeholder: "0.x", expected: 0.4, unit: "" }],
            correctLatex: "P = \\frac{12}{30} = 0.4 = 40\\%",
          },
        ],
        CORE: [
          {
            id: "C1",
            difficulty,
            stage,
            scenario: t.scenarios.school_cafeteria,
            context: t.problems.cafeteria_pizza,
            promptLatex: "P(\\text{pizza})",
            expressionLatex: "\\frac{3}{5}",
            targetLatex: "P",
            slots: [{ id: "P", labelLatex: "P", placeholder: "0.x", expected: 0.6, unit: "" }],
            correctLatex: "P = \\frac{3}{5} = 0.6 = 60\\%",
          },
          {
            id: "C2",
            difficulty,
            stage,
            scenario: t.scenarios.exam_results,
            context: t.problems.exam_pass,
            promptLatex: "P(\\text{pass})",
            expressionLatex: "\\frac{85}{100}",
            targetLatex: "P",
            slots: [{ id: "P", labelLatex: "P", placeholder: "0.xx", expected: 0.85, unit: "" }],
            correctLatex: "P = 0.85 = 85\\%",
          },
        ],
        ADVANCED: [
          {
            id: "A1",
            difficulty,
            stage,
            scenario: t.scenarios.dice_game,
            context: t.problems.dice_even,
            promptLatex: "P(\\text{even})",
            expressionLatex: "\\frac{3}{6}",
            targetLatex: "P",
            slots: [{ id: "P", labelLatex: "P", placeholder: "0.x", expected: 0.5, unit: "" }],
            correctLatex: "P = \\frac{3}{6} = 0.5 = 50\\%",
          },
          {
            id: "A2",
            difficulty,
            stage,
            scenario: t.scenarios.card_game,
            context: t.problems.card_heart,
            promptLatex: "P(\\text{heart})",
            expressionLatex: "\\frac{13}{52}",
            targetLatex: "P",
            slots: [{ id: "P", labelLatex: "P", placeholder: "0.xx", expected: 0.25, unit: "" }],
            correctLatex: "P = \\frac{13}{52} = 0.25 = 25\\%",
          },
        ],
        ELITE: [
          {
            id: "E1",
            difficulty,
            stage,
            scenario: t.scenarios.dice_advanced,
            context: t.problems.dice_prime,
            promptLatex: "P(\\text{prime})",
            expressionLatex: "\\frac{3}{6}",
            targetLatex: "P",
            slots: [{ id: "P", labelLatex: "P", placeholder: "0.x", expected: 0.5, unit: "" }],
            correctLatex: "P = \\frac{3}{6} = 0.5 = 50\\%",
          },
        ],
      },
      LOTTERY: {
        BASIC: [
          {
            id: "L1",
            difficulty,
            stage,
            scenario: t.scenarios.school_raffle,
            context: t.problems.school_raffle_win,
            promptLatex: "P(\\text{win})",
            expressionLatex: "\\frac{3}{100}",
            targetLatex: "P",
            slots: [{ id: "P", labelLatex: "P", placeholder: "0.xx", expected: 0.03, unit: "" }],
            correctLatex: "P = \\frac{3}{100} = 0.03 = 3\\%",
          },
        ],
        CORE: [
          {
            id: "L2",
            difficulty,
            stage,
            scenario: t.scenarios.fasnacht_game,
            context: t.problems.dice_sum_7,
            promptLatex: "P(\\text{sum}=7)",
            expressionLatex: "\\frac{6}{36}",
            targetLatex: "P",
            slots: [{ id: "P", labelLatex: "P", placeholder: "0.xxx", expected: 0.167, unit: "" }],
            correctLatex: "P = \\frac{6}{36} \\approx 0.167 = 16.7\\%",
          },
        ],
        ADVANCED: [
          {
            id: "L3",
            difficulty,
            stage,
            scenario: t.scenarios.swiss_lotto_simple,
            context: t.problems.lotto_simple,
            promptLatex: "P(\\text{win})",
            expressionLatex: "\\frac{1}{20}",
            targetLatex: "P",
            slots: [{ id: "P", labelLatex: "P", placeholder: "0.xx", expected: 0.05, unit: "" }],
            correctLatex: "P = \\frac{1}{20} = 0.05 = 5\\%",
          },
        ],
        ELITE: [
          {
            id: "L4",
            difficulty,
            stage,
            scenario: t.scenarios.dice_win_condition,
            context: t.problems.dice_sum_7_or_11,
            promptLatex: "P(\\text{win})",
            expressionLatex: "\\frac{8}{36}",
            targetLatex: "P",
            slots: [{ id: "P", labelLatex: "P", placeholder: "0.xxx", expected: 0.222, unit: "" }],
            correctLatex: "P = \\frac{8}{36} \\approx 0.222 = 22.2\\%",
          },
        ],
      },
      COMBINED: {
        BASIC: [
          {
            id: "CB1",
            difficulty,
            stage,
            scenario: t.scenarios.two_buses,
            context: t.problems.two_buses_ontime,
            promptLatex: "P(\\text{both on time})",
            expressionLatex: "0.8 \\times 0.7",
            targetLatex: "P",
            slots: [{ id: "P", labelLatex: "P", placeholder: "0.xx", expected: 0.56, unit: "" }],
            correctLatex: "P = 0.8 \\times 0.7 = 0.56 = 56\\%",
          },
        ],
        CORE: [
          {
            id: "CC1",
            difficulty,
            stage,
            scenario: t.scenarios.fc_basel,
            context: t.problems.fc_basel_wins,
            promptLatex: "P(\\text{both win})",
            expressionLatex: "0.6 \\times 0.3",
            targetLatex: "P",
            slots: [{ id: "P", labelLatex: "P", placeholder: "0.xx", expected: 0.18, unit: "" }],
            correctLatex: "P = 0.6 \\times 0.3 = 0.18 = 18\\%",
          },
        ],
        ADVANCED: [
          {
            id: "CA1",
            difficulty,
            stage,
            scenario: t.scenarios.novartis_qc,
            context: t.problems.quality_all_pass,
            promptLatex: "P(\\text{all 5 pass})",
            expressionLatex: "0.95^5",
            targetLatex: "P",
            slots: [{ id: "P", labelLatex: "P", placeholder: "0.xxx", expected: 0.774, unit: "" }],
            correctLatex: "P = 0.95^5 \\approx 0.774 = 77.4\\%",
          },
        ],
        ELITE: [
          {
            id: "CE1",
            difficulty,
            stage,
            scenario: t.scenarios.three_events,
            context: t.problems.three_coins_two_heads,
            promptLatex: "P(\\text{exactly 2 heads})",
            expressionLatex: "\\frac{3}{8}",
            targetLatex: "P",
            slots: [{ id: "P", labelLatex: "P", placeholder: "0.xxx", expected: 0.375, unit: "" }],
            correctLatex: "P = \\frac{3}{8} = 0.375 = 37.5\\%",
          },
        ],
      },
      DATA_STATS: {
        BASIC: [
          {
            id: "D1",
            difficulty,
            stage,
            scenario: t.scenarios.temperature,
            context: t.problems.avg_temperature,
            promptLatex: "\\text{Average}",
            expressionLatex: "\\frac{18+22+20+19+21+23+20}{7}",
            targetLatex: "\\bar{x}",
            slots: [{ id: "avg", labelLatex: "\\bar{x}", placeholder: "xx.x", expected: 20.4, unit: "°C" }],
            correctLatex: "\\bar{x} \\approx 20.4°C",
          },
        ],
        CORE: [
          {
            id: "D2",
            difficulty,
            stage,
            scenario: t.scenarios.test_scores,
            context: t.problems.class_average,
            promptLatex: "\\text{Class Average}",
            expressionLatex: "\\frac{\\sum scores}{n}",
            targetLatex: "\\bar{x}",
            slots: [{ id: "avg", labelLatex: "\\bar{x}", placeholder: "xx", expected: 78, unit: "" }],
            correctLatex: "\\bar{x} = 78",
          },
        ],
        ADVANCED: [
          {
            id: "D3",
            difficulty,
            stage,
            scenario: t.scenarios.pocket_money,
            context: t.problems.spending_analysis,
            promptLatex: "\\text{Food %}",
            expressionLatex: "\\frac{40}{100}",
            targetLatex: "P",
            slots: [{ id: "P", labelLatex: "\\%", placeholder: "xx", expected: 40, unit: "%" }],
            correctLatex: "40\\%",
          },
        ],
        ELITE: [
          {
            id: "D4",
            difficulty,
            stage,
            scenario: t.scenarios.data_comparison,
            context: t.problems.median_vs_mean,
            promptLatex: "\\text{Median}",
            expressionLatex: "\\text{middle value}",
            targetLatex: "M",
            slots: [{ id: "M", labelLatex: "M", placeholder: "xx", expected: 15, unit: "" }],
            correctLatex: "M = 15",
          },
        ],
      },
    };

    return pools[stage][difficulty] || [];
  }, []);

  const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => buildStagePool(t, difficulty, stage), [t, buildStagePool]);

  const {
    currentQuest: quest,
    stage,
    inputs,
    setInputs,
    lastCheck,
    verify,
    next,
    handleStageChange,
    difficulty,
    handleDifficultyChange,
  } = useQuestManager<ProbQuest, Stage>({
    buildPool,
    initialStage: "BASIC_PROB",
    tolerance: 0.01,
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sm2-08", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="SM2.08"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "BASIC_PROB", label: t.stages.basic_prob },
        { id: "LOTTERY", label: t.stages.lottery },
        { id: "COMBINED", label: t.stages.combined },
        { id: "DATA_STATS", label: t.stages.data_stats },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t.footer_left}
      translations={{
        back: t.back,
        check: t.check,
        next: t.next,
        correct: t.correct,
        incorrect: t.incorrect,
        ready: t.ready,
        monitor_title: t.monitor_title,
        difficulty: {
          basic: t.difficulty.basic,
          core: t.difficulty.core,
          advanced: t.difficulty.advanced,
          elite: t.difficulty.elite,
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <ProbabilityVisualizer stage={stage} language={currentLanguage as "EN" | "CN" | "DE"} />
          <div className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-black">
            {t.formula_title}
          </div>
          <div className="rounded-xl border border-cyan-500/30 bg-black/50 p-4">
            <BlockMath math="P(E) = \frac{\text{favorable outcomes}}{\text{total outcomes}}" />
          </div>
        </div>
      }
    >
      <div className="space-y-8">
        {quest?.scenario && (
          <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl">
            <div className="text-[10px] uppercase tracking-[0.4em] text-purple-400 font-black mb-3">
              {t.basel_scenario}
            </div>
            <p className="text-white/90 leading-relaxed font-medium">{quest.scenario}</p>
          </div>
        )}

        {quest?.context && (
          <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
            <div className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-black mb-3">
              {t.scenario_title}
            </div>
            <p className="text-white/80 leading-relaxed">{quest.context}</p>
          </div>
        )}

        <div className="text-center space-y-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t.calculate_title}
          </div>
          <div className="text-3xl text-white font-black">
            <InlineMath math={quest?.promptLatex || ""} />
          </div>
        </div>

        {quest?.expressionLatex && (
          <div className="text-center p-4 bg-white/5 border border-white/10 rounded-xl">
            <BlockMath math={quest.expressionLatex} />
          </div>
        )}

        <div className="max-w-md mx-auto space-y-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white font-black text-center">
            {t.answer_title}
          </div>
          {quest?.slots.map((slot) => (
            <div key={slot.id} className="space-y-2">
              <label className="text-sm text-white/70 font-mono">
                <InlineMath math={slot.labelLatex} />
              </label>
              <input
                value={inputs[slot.id] ?? ""}
                onChange={(e) => setInputs((prev) => ({ ...prev, [slot.id]: e.target.value }))}
                className="w-full bg-black border-2 border-cyan-500/50 p-4 text-center outline-none focus:border-cyan-400 placeholder:text-white/40 font-black text-2xl text-white rounded-lg"
                placeholder={slot.placeholder}
              />
            </div>
          ))}
        </div>

        {lastCheck?.ok && quest?.correctLatex && (
          <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
            <div className="text-green-400 font-black mb-2">{t.solution_title}</div>
            <BlockMath math={quest.correctLatex} />
          </div>
        )}
      </div>
    </ChamberLayout>
  );
}
