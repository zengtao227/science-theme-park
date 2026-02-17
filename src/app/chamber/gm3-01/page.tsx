"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ProbabilityVisualization from "@/components/chamber/gm3-01/ProbabilityVisualization";

type Stage = "BASIC_PROB" | "BINOMIAL" | "CONDITIONAL" | "MISSION";

interface G301Quest extends Quest {
  stage: Stage;
  favorable?: number;
  total?: number;
  n?: number;
  k?: number;
  p?: number;
  eventA?: number;
  eventB?: number;
  eventAB?: number;
  problemText?: string;
}

const round4 = (v: number) => Math.round(v * 10000) / 10000;

// Binomial coefficient
const binomial = (n: number, k: number): number => {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result = result * (n - i + 1) / i;
  }
  return result;
};

// BASIC_PROB: Progressive conceptual difficulty
// BASIC: Direct sample space (6-10 items, directly visible)
const basicProbDataBasic = [
  { id: "BP_B1", favorable: 1, total: 6, context: "single_die_one" },
  { id: "BP_B2", favorable: 3, total: 6, context: "single_die_odd" },
  { id: "BP_B3", favorable: 1, total: 2, context: "coin_heads" },
  { id: "BP_B4", favorable: 2, total: 8, context: "spinner_8_sections" },
];

// CORE: Understanding combinations and "equally likely" (need to count combinations)
const basicProbDataCore = [
  { id: "BP_C1", favorable: 6, total: 36, context: "two_dice_sum_7" },
  { id: "BP_C2", favorable: 3, total: 36, context: "two_dice_sum_10" },
  { id: "BP_C3", favorable: 11, total: 36, context: "two_dice_sum_gt_7" },
  { id: "BP_C4", favorable: 13, total: 52, context: "deck_one_suit" },
  { id: "BP_C5", favorable: 16, total: 52, context: "deck_honors" },
];

// ADVANCED: Conditional probability (implicit) - sample space changes with condition
const basicProbDataAdvanced = [
  { id: "BP_A1", favorable: 2, total: 3, context: "die_even_given_gt3" },
  { id: "BP_A2", favorable: 2, total: 6, context: "die_multiple_of_3" },
  { id: "BP_A3", favorable: 3, total: 13, context: "card_face_given_spade" },
  { id: "BP_A4", favorable: 12, total: 40, context: "card_not_face_not_ace" },
  { id: "BP_A5", favorable: 4, total: 12, context: "card_king_given_face" },
];

// ELITE: Compound events - need to decompose into multiple events
const basicProbDataElite = [
  { id: "BP_E1", favorable: 11, total: 36, context: "at_least_one_six_two_dice" },
  { id: "BP_E2", favorable: 30, total: 36, context: "sum_not_2_or_12" },
  { id: "BP_E3", favorable: 26, total: 36, context: "at_least_one_even" },
  { id: "BP_E4", favorable: 16, total: 52, context: "card_ace_or_king" },
  { id: "BP_E5", favorable: 32, total: 52, context: "card_red_or_face" },
];

// BINOMIAL: Progressive conceptual difficulty
// BASIC: Understanding basic binomial concept (small n, p=0.5)
const binomialDataBasic = [
  { id: "BIN_B1", n: 3, k: 2, p: 0.5, context: "coin_3_2" },
  { id: "BIN_B2", n: 4, k: 2, p: 0.5, context: "coin_4_2" },
  { id: "BIN_B3", n: 3, k: 3, p: 0.5, context: "coin_3_all" },
  { id: "BIN_B4", n: 4, k: 0, p: 0.5, context: "coin_4_none" },
];

// CORE: Understanding binomial coefficient C(n,k) meaning
const binomialDataCore = [
  { id: "BIN_C1", n: 5, k: 3, p: 0.5, context: "lottery_5_3" },
  { id: "BIN_C2", n: 6, k: 3, p: 0.5, context: "lottery_6_3" },
  { id: "BIN_C3", n: 5, k: 2, p: 0.5, context: "lottery_5_2" },
  { id: "BIN_C4", n: 6, k: 4, p: 0.5, context: "lottery_6_4" },
  { id: "BIN_C5", n: 7, k: 3, p: 0.5, context: "lottery_7_3" },
];

// ADVANCED: Asymmetric probability (p ≠ 0.5) and understanding skewed distribution
const binomialDataAdvanced = [
  { id: "BIN_A1", n: 5, k: 3, p: 0.6, context: "lottery_5_3_biased" },
  { id: "BIN_A2", n: 6, k: 2, p: 0.3, context: "lottery_6_2_low" },
  { id: "BIN_A3", n: 8, k: 6, p: 0.7, context: "lottery_8_6_high" },
  { id: "BIN_A4", n: 7, k: 4, p: 0.6, context: "lottery_7_4_biased" },
  { id: "BIN_A5", n: 10, k: 7, p: 0.65, context: "lottery_10_7_biased" },
];

// ELITE: Cumulative probability and inverse problems
const binomialDataElite = [
  { id: "BIN_E1", n: 5, k: 3, p: 0.6, context: "at_least_3_of_5", cumulative: true },
  { id: "BIN_E2", n: 6, k: 4, p: 0.5, context: "at_most_4_of_6", cumulative: true },
  { id: "BIN_E3", n: 8, k: 5, p: 0.6, context: "more_than_half", cumulative: true },
  { id: "BIN_E4", n: 10, k: 7, p: 0.7, context: "at_least_7_of_10", cumulative: true },
  { id: "BIN_E5", n: 12, k: 8, p: 0.6, context: "at_least_8_of_12", cumulative: true },
];

// CONDITIONAL: Progressive conceptual difficulty
// BASIC: Understanding P(A|B) = P(A∩B) / P(B) formula
const conditionalDataBasic = [
  { id: "COND_B1", eventA: 0.5, eventB: 0.6, eventAB: 0.3, context: "insurance_basic_1" },
  { id: "COND_B2", eventA: 0.4, eventB: 0.5, eventAB: 0.2, context: "insurance_basic_2" },
  { id: "COND_B3", eventA: 0.6, eventB: 0.8, eventAB: 0.5, context: "insurance_basic_3" },
  { id: "COND_B4", eventA: 0.3, eventB: 0.6, eventAB: 0.2, context: "insurance_basic_4" },
];

// CORE: Extracting condition from problem description
const conditionalDataCore = [
  { id: "COND_C1", eventA: 0.25, eventB: 0.5, eventAB: 0.25, context: "card_heart_given_red" },
  { id: "COND_C2", eventA: 0.33, eventB: 0.5, eventAB: 0.17, context: "die_six_given_even" },
  { id: "COND_C3", eventA: 0.23, eventB: 0.5, eventAB: 0.08, context: "card_face_given_red" },
  { id: "COND_C4", eventA: 0.17, eventB: 0.67, eventAB: 0.17, context: "die_one_given_odd" },
  { id: "COND_C5", eventA: 0.31, eventB: 0.62, eventAB: 0.23, context: "card_spade_given_black" },
];

// ADVANCED: Bayesian thinking - P(A|B) vs P(B|A)
const conditionalDataAdvanced = [
  { id: "COND_A1", eventA: 0.01, eventB: 0.05, eventAB: 0.009, context: "disease_test_positive" },
  { id: "COND_A2", eventA: 0.02, eventB: 0.08, eventAB: 0.016, context: "disease_test_positive_2" },
  { id: "COND_A3", eventA: 0.15, eventB: 0.3, eventAB: 0.12, context: "quality_defect_given_batch" },
  { id: "COND_A4", eventA: 0.05, eventB: 0.2, eventAB: 0.04, context: "fraud_given_alert" },
  { id: "COND_A5", eventA: 0.1, eventB: 0.25, eventAB: 0.08, context: "accident_given_weather" },
];

// ELITE: Multiple conditions and independence testing
const conditionalDataElite = [
  { id: "COND_E1", eventA: 0.4, eventB: 0.5, eventAB: 0.2, context: "independence_test_1" },
  { id: "COND_E2", eventA: 0.3, eventB: 0.6, eventAB: 0.18, context: "independence_test_2" },
  { id: "COND_E3", eventA: 0.25, eventB: 0.4, eventAB: 0.15, context: "multiple_condition_1" },
  { id: "COND_E4", eventA: 0.35, eventB: 0.7, eventAB: 0.245, context: "independence_test_3" },
  { id: "COND_E5", eventA: 0.2, eventB: 0.5, eventAB: 0.12, context: "multiple_condition_2" },
];

// MISSION: Mixed problems
const missionDataBasic = [
  { id: "MISS_B1", favorable: 1, total: 6, type: "basic", context: "mission_basic_1" },
  { id: "MISS_B2", n: 3, k: 2, p: 0.5, type: "binomial", context: "mission_basic_2" },
  { id: "MISS_B3", eventA: 0.5, eventB: 0.6, eventAB: 0.3, type: "conditional", context: "mission_basic_3" },
  { id: "MISS_B4", favorable: 2, total: 6, type: "basic", context: "mission_basic_4" },
];

const missionDataCore = [
  { id: "MISS_C1", favorable: 13, total: 52, type: "basic", context: "mission_core_1" },
  { id: "MISS_C2", n: 6, k: 4, p: 0.5, type: "binomial", context: "mission_core_2" },
  { id: "MISS_C3", eventA: 0.45, eventB: 0.55, eventAB: 0.25, type: "conditional", context: "mission_core_3" },
  { id: "MISS_C4", favorable: 26, total: 52, type: "basic", context: "mission_core_4" },
  { id: "MISS_C5", n: 5, k: 3, p: 0.6, type: "binomial", context: "mission_core_5" },
];

const missionDataAdvanced = [
  { id: "MISS_A1", favorable: 85, total: 100, type: "basic", context: "mission_adv_1" },
  { id: "MISS_A2", n: 10, k: 6, p: 0.5, type: "binomial", context: "mission_adv_2" },
  { id: "MISS_A3", eventA: 0.37, eventB: 0.63, eventAB: 0.21, type: "conditional", context: "mission_adv_3" },
  { id: "MISS_A4", favorable: 92, total: 120, type: "basic", context: "mission_adv_4" },
  { id: "MISS_A5", n: 8, k: 5, p: 0.6, type: "binomial", context: "mission_adv_5" },
];

const missionDataElite = [
  { id: "MISS_E1", favorable: 427, total: 500, type: "basic", context: "mission_elite_1" },
  { id: "MISS_E2", n: 15, k: 9, p: 0.55, type: "binomial", context: "mission_elite_2" },
  { id: "MISS_E3", eventA: 0.365, eventB: 0.625, eventAB: 0.215, type: "conditional", context: "mission_elite_3" },
  { id: "MISS_E4", favorable: 683, total: 800, type: "basic", context: "mission_elite_4" },
  { id: "MISS_E5", n: 18, k: 11, p: 0.6, type: "binomial", context: "mission_elite_5" },
];

function buildStagePool(gm3_01_t: any, difficulty: Difficulty, stage: Stage): G301Quest[] {
  if (stage === "BASIC_PROB") {
    let dataSet;
    switch (difficulty) {
      case "BASIC": dataSet = basicProbDataBasic; break;
      case "CORE": dataSet = basicProbDataCore; break;
      case "ADVANCED": dataSet = basicProbDataAdvanced; break;
      case "ELITE": dataSet = basicProbDataElite; break;
      default: dataSet = basicProbDataBasic;
    }
    
    return dataSet.map((item) => {
      const probability = round4(item.favorable / item.total);
      const problemText = gm3_01_t.problems?.[item.context] || `${item.favorable} favorable out of ${item.total} total`;
      
      return {
        id: item.id,
        difficulty,
        stage,
        favorable: item.favorable,
        total: item.total,
        problemText,
        promptLatex: gm3_01_t.stages.basic_prob_prompt_latex,
        expressionLatex: `\\text{Given: }${item.favorable}\\text{ favorable, }${item.total}\\text{ total}`,
        targetLatex: "P(E)",
        slots: [
          { id: "probability", labelLatex: "P(E)", placeholder: "0.0000", expected: probability },
        ],
        correctLatex: `P(E)=${probability}`,
      };
    });
  }

  if (stage === "BINOMIAL") {
    let dataSet;
    switch (difficulty) {
      case "BASIC": dataSet = binomialDataBasic; break;
      case "CORE": dataSet = binomialDataCore; break;
      case "ADVANCED": dataSet = binomialDataAdvanced; break;
      case "ELITE": dataSet = binomialDataElite; break;
      default: dataSet = binomialDataBasic;
    }
    
    return dataSet.map((item) => {
      const prob = round4(binomial(item.n, item.k) * Math.pow(item.p, item.k) * Math.pow(1 - item.p, item.n - item.k));
      const problemText = gm3_01_t.problems?.[item.context] || `n=${item.n} trials, k=${item.k} successes, p=${item.p}`;
      
      return {
        id: item.id,
        difficulty,
        stage,
        n: item.n,
        k: item.k,
        p: item.p,
        problemText,
        promptLatex: gm3_01_t.stages.binomial_prompt_latex,
        expressionLatex: `\\text{Given: }n=${item.n},\\;k=${item.k},\\;p=${item.p}`,
        targetLatex: "P(X=k)",
        slots: [
          { id: "probability", labelLatex: "P(X=k)", placeholder: "0.0000", expected: prob },
        ],
        correctLatex: `P(X=${item.k})=${prob}`,
      };
    });
  }

  if (stage === "CONDITIONAL") {
    let dataSet;
    switch (difficulty) {
      case "BASIC": dataSet = conditionalDataBasic; break;
      case "CORE": dataSet = conditionalDataCore; break;
      case "ADVANCED": dataSet = conditionalDataAdvanced; break;
      case "ELITE": dataSet = conditionalDataElite; break;
      default: dataSet = conditionalDataBasic;
    }
    
    return dataSet.map((item) => {
      const condProb = round4(item.eventAB / item.eventB);
      const problemText = gm3_01_t.problems?.[item.context] || `P(A)=${item.eventA}, P(B)=${item.eventB}, P(A∩B)=${item.eventAB}`;
      
      return {
        id: item.id,
        difficulty,
        stage,
        eventA: item.eventA,
        eventB: item.eventB,
        eventAB: item.eventAB,
        problemText,
        promptLatex: gm3_01_t.stages.conditional_prompt_latex,
        expressionLatex: `\\text{Given: }P(A)=${item.eventA},\\;P(B)=${item.eventB},\\;P(A\\cap B)=${item.eventAB}`,
        targetLatex: "P(A|B)",
        slots: [
          { id: "probability", labelLatex: "P(A|B)", placeholder: "0.0000", expected: condProb },
        ],
        correctLatex: `P(A|B)=${condProb}`,
      };
    });
  }

  // MISSION stage
  let dataSet: any[];
  switch (difficulty) {
    case "BASIC": dataSet = missionDataBasic; break;
    case "CORE": dataSet = missionDataCore; break;
    case "ADVANCED": dataSet = missionDataAdvanced; break;
    case "ELITE": dataSet = missionDataElite; break;
    default: dataSet = missionDataBasic;
  }
  
  return dataSet.map((item: any) => {
    let prob = 0;
    let expressionLatex = "";
    let problemText = "";
    
    if (item.type === "binomial") {
      prob = round4(binomial(item.n, item.k) * Math.pow(item.p, item.k) * Math.pow(1 - item.p, item.n - item.k));
      expressionLatex = `\\text{Given: }n=${item.n},\\;k=${item.k},\\;p=${item.p}`;
      problemText = gm3_01_t.problems?.[item.context] || `n=${item.n}, k=${item.k}, p=${item.p}`;
    } else if (item.type === "basic") {
      prob = round4(item.favorable / item.total);
      expressionLatex = `\\text{Given: }${item.favorable}\\text{ favorable, }${item.total}\\text{ total}`;
      problemText = gm3_01_t.problems?.[item.context] || `${item.favorable} favorable out of ${item.total}`;
    } else if (item.type === "conditional") {
      prob = round4(item.eventAB / item.eventB);
      expressionLatex = `\\text{Given: }P(A)=${item.eventA},\\;P(B)=${item.eventB},\\;P(A\\cap B)=${item.eventAB}`;
      problemText = gm3_01_t.problems?.[item.context] || `P(A)=${item.eventA}, P(B)=${item.eventB}, P(A∩B)=${item.eventAB}`;
    }
    
    return {
      id: item.id,
      difficulty,
      stage,
      favorable: item.favorable,
      total: item.total,
      n: item.n,
      k: item.k,
      p: item.p,
      eventA: item.eventA,
      eventB: item.eventB,
      eventAB: item.eventAB,
      problemText,
      promptLatex: gm3_01_t.stages.mission_prompt_latex,
      expressionLatex,
      targetLatex: "P",
      slots: [
        { id: "probability", labelLatex: "P", placeholder: "0.0000", expected: prob },
      ],
      correctLatex: `P=${prob}`,
    };
  });
}

export default function G301Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();
  
  const gm3_01_t = {
    title: t("gm3_01.title"),
    back: t("gm3_01.back"),
    check: t("gm3_01.check"),
    next: t("gm3_01.next"),
    correct: t("gm3_01.correct"),
    incorrect: t("gm3_01.incorrect"),
    ready: t("gm3_01.ready"),
    monitor_title: t("gm3_01.monitor_title"),
    footer_left: t("gm3_01.footer_left"),
    objective_title: t("gm3_01.objective_title"),
    target_title: t("gm3_01.target_title"),
    stages: {
      basic_prob: t("gm3_01.stages.basic_prob"),
      binomial: t("gm3_01.stages.binomial"),
      conditional: t("gm3_01.stages.conditional"),
      mission: t("gm3_01.stages.mission"),
      basic_prob_prompt_latex: t("gm3_01.stages.basic_prob_prompt_latex"),
      binomial_prompt_latex: t("gm3_01.stages.binomial_prompt_latex"),
      conditional_prompt_latex: t("gm3_01.stages.conditional_prompt_latex"),
      mission_prompt_latex: t("gm3_01.stages.mission_prompt_latex"),
    },
    difficulty: {
      basic: t("gm3_01.difficulty.basic"),
      core: t("gm3_01.difficulty.core"),
      advanced: t("gm3_01.difficulty.advanced"),
      elite: t("gm3_01.difficulty.elite"),
    },
    labels: {
      input: t("gm3_01.labels.input"),
      hints: t("gm3_01.labels.hints"),
    },
    mission: {
      title: t("gm3_01.mission.title"),
      description: t("gm3_01.mission.description"),
    },
    scenarios: {
      basic_prob: t("gm3_01.scenarios.basic_prob"),
      binomial: t("gm3_01.scenarios.binomial"),
      conditional: t("gm3_01.scenarios.conditional"),
      mission: t("gm3_01.scenarios.mission"),
    },
    problems: t("gm3_01.problems"),
    input_tip_4dp: t("gm3_01.input_tip_4dp"),
  };

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
  } = useQuestManager<G301Quest, Stage>({
    buildPool: (d, s) => buildStagePool(gm3_01_t, d, s),
    initialStage: "BASIC_PROB",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gm3-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={gm3_01_t.title}
      moduleCode="GM3.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "BASIC_PROB", label: gm3_01_t.stages.basic_prob },
        { id: "BINOMIAL", label: gm3_01_t.stages.binomial },
        { id: "CONDITIONAL", label: gm3_01_t.stages.conditional },
        { id: "MISSION", label: gm3_01_t.stages.mission },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={gm3_01_t.footer_left}
      translations={{
        back: gm3_01_t.back,
        check: gm3_01_t.check,
        next: gm3_01_t.next,
        correct: gm3_01_t.correct,
        incorrect: gm3_01_t.incorrect,
        ready: gm3_01_t.ready,
        monitor_title: gm3_01_t.monitor_title,
        difficulty: {
          basic: gm3_01_t.difficulty.basic,
          core: gm3_01_t.difficulty.core,
          advanced: gm3_01_t.difficulty.advanced,
          elite: gm3_01_t.difficulty.elite,
        },
      }}
      monitorContent={
        <ProbabilityVisualization
          stage={stage}
          favorable={currentQuest?.favorable}
          total={currentQuest?.total}
          n={currentQuest?.n}
          k={currentQuest?.k}
          p={currentQuest?.p}
          eventA={currentQuest?.eventA}
          eventB={currentQuest?.eventB}
          eventAB={currentQuest?.eventAB}
          translations={{
            title: gm3_01_t.monitor_title,
          }}
        />
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{gm3_01_t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono">{gm3_01_t.mission.description}</p>
        </div>
        
        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6 max-w-4xl mx-auto">
          <div className="text-sm text-green-400/90 leading-relaxed whitespace-pre-line">
            {stage === "BASIC_PROB" && gm3_01_t.scenarios.basic_prob}
            {stage === "BINOMIAL" && gm3_01_t.scenarios.binomial}
            {stage === "CONDITIONAL" && gm3_01_t.scenarios.conditional}
            {stage === "MISSION" && gm3_01_t.scenarios.mission}
          </div>
        </div>

        {/* Problem Text */}
        {currentQuest?.problemText && (
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-6 max-w-4xl mx-auto">
            <div className="text-[10px] text-cyan-400/60 uppercase tracking-wider mb-3">PROBLEM</div>
            <div className="text-base text-cyan-300 leading-relaxed whitespace-pre-line">
              {currentQuest.problemText}
            </div>
          </div>
        )}

        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{gm3_01_t.objective_title}</h3>
          <p className="text-2xl text-white font-black italic mb-4">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </p>
          <p className="text-lg text-white/70 font-mono">
            <InlineMath math={currentQuest?.expressionLatex || ""} />
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                  <InlineMath math={slot.labelLatex} />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                    className="flex-1 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                    placeholder={slot.placeholder}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-white/90 font-mono italic text-center">
            {gm3_01_t.input_tip_4dp}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
