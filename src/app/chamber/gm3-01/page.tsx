"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ProbabilityVisualization from "@/components/chamber/gm3-01/ProbabilityVisualization";

type Stage = "BASIC_PROB" | "BINOMIAL" | "CONDITIONAL" | "MISSION";
type G301T = typeof translations.EN.gm3_01;

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

// BASIC_PROB: Simple probability P(E) = favorable / total
const basicProbDataBasic = [
  { id: "BP_B1", favorable: 1, total: 6, context: "single_die_one" },
  { id: "BP_B2", favorable: 2, total: 6, context: "single_die_even" },
  { id: "BP_B3", favorable: 3, total: 6, context: "single_die_half" },
  { id: "BP_B4", favorable: 1, total: 2, context: "coin_heads" },
];

const basicProbDataCore = [
  { id: "BP_C1", favorable: 13, total: 52, context: "deck_one_suit" },
  { id: "BP_C2", favorable: 26, total: 52, context: "deck_red_cards" },
  { id: "BP_C3", favorable: 4, total: 52, context: "deck_aces" },
  { id: "BP_C4", favorable: 12, total: 52, context: "deck_face_cards" },
  { id: "BP_C5", favorable: 6, total: 36, context: "two_dice_sum_7" },
];

const basicProbDataAdvanced = [
  { id: "BP_A1", favorable: 85, total: 100, context: "quality_control_85" },
  { id: "BP_A2", favorable: 92, total: 120, context: "quality_control_92" },
  { id: "BP_A3", favorable: 78, total: 90, context: "quality_control_78" },
  { id: "BP_A4", favorable: 156, total: 200, context: "quality_control_156" },
  { id: "BP_A5", favorable: 234, total: 300, context: "quality_control_234" },
];

const basicProbDataElite = [
  { id: "BP_E1", favorable: 427, total: 500, context: "quality_control_427" },
  { id: "BP_E2", favorable: 683, total: 800, context: "quality_control_683" },
  { id: "BP_E3", favorable: 891, total: 1000, context: "quality_control_891" },
  { id: "BP_E4", favorable: 1456, total: 1600, context: "quality_control_1456" },
  { id: "BP_E5", favorable: 1789, total: 2000, context: "quality_control_1789" },
];

// BINOMIAL: P(X=k) = C(n,k) * p^k * (1-p)^(n-k)
const binomialDataBasic = [
  { id: "BIN_B1", n: 3, k: 2, p: 0.5, context: "coin_3_2" },
  { id: "BIN_B2", n: 4, k: 3, p: 0.5, context: "coin_4_3" },
  { id: "BIN_B3", n: 5, k: 2, p: 0.5, context: "coin_5_2" },
  { id: "BIN_B4", n: 3, k: 1, p: 0.5, context: "coin_3_1" },
];

const binomialDataCore = [
  { id: "BIN_C1", n: 6, k: 4, p: 0.5, context: "lottery_6_4" },
  { id: "BIN_C2", n: 8, k: 5, p: 0.5, context: "lottery_8_5" },
  { id: "BIN_C3", n: 5, k: 3, p: 0.6, context: "lottery_5_3_biased" },
  { id: "BIN_C4", n: 7, k: 4, p: 0.5, context: "lottery_7_4" },
  { id: "BIN_C5", n: 6, k: 2, p: 0.4, context: "lottery_6_2_biased" },
];

const binomialDataAdvanced = [
  { id: "BIN_A1", n: 10, k: 6, p: 0.5, context: "lottery_10_6" },
  { id: "BIN_A2", n: 12, k: 7, p: 0.5, context: "lottery_12_7" },
  { id: "BIN_A3", n: 8, k: 5, p: 0.6, context: "lottery_8_5_biased" },
  { id: "BIN_A4", n: 9, k: 4, p: 0.4, context: "lottery_9_4_biased" },
  { id: "BIN_A5", n: 11, k: 7, p: 0.55, context: "lottery_11_7_biased" },
];

const binomialDataElite = [
  { id: "BIN_E1", n: 15, k: 9, p: 0.55, context: "lottery_15_9" },
  { id: "BIN_E2", n: 18, k: 11, p: 0.6, context: "lottery_18_11" },
  { id: "BIN_E3", n: 20, k: 12, p: 0.58, context: "lottery_20_12" },
  { id: "BIN_E4", n: 16, k: 8, p: 0.45, context: "lottery_16_8" },
  { id: "BIN_E5", n: 14, k: 9, p: 0.65, context: "lottery_14_9" },
];

// CONDITIONAL: P(A|B) = P(A∩B) / P(B)
const conditionalDataBasic = [
  { id: "COND_B1", eventA: 0.5, eventB: 0.6, eventAB: 0.3, context: "insurance_basic_1" },
  { id: "COND_B2", eventA: 0.4, eventB: 0.5, eventAB: 0.2, context: "insurance_basic_2" },
  { id: "COND_B3", eventA: 0.6, eventB: 0.7, eventAB: 0.4, context: "insurance_basic_3" },
  { id: "COND_B4", eventA: 0.3, eventB: 0.4, eventAB: 0.15, context: "insurance_basic_4" },
];

const conditionalDataCore = [
  { id: "COND_C1", eventA: 0.45, eventB: 0.55, eventAB: 0.25, context: "insurance_core_1" },
  { id: "COND_C2", eventA: 0.35, eventB: 0.65, eventAB: 0.22, context: "insurance_core_2" },
  { id: "COND_C3", eventA: 0.52, eventB: 0.48, eventAB: 0.28, context: "insurance_core_3" },
  { id: "COND_C4", eventA: 0.38, eventB: 0.62, eventAB: 0.24, context: "insurance_core_4" },
  { id: "COND_C5", eventA: 0.42, eventB: 0.58, eventAB: 0.26, context: "insurance_core_5" },
];

const conditionalDataAdvanced = [
  { id: "COND_A1", eventA: 0.37, eventB: 0.63, eventAB: 0.21, context: "insurance_adv_1" },
  { id: "COND_A2", eventA: 0.48, eventB: 0.54, eventAB: 0.29, context: "insurance_adv_2" },
  { id: "COND_A3", eventA: 0.41, eventB: 0.67, eventAB: 0.27, context: "insurance_adv_3" },
  { id: "COND_A4", eventA: 0.33, eventB: 0.59, eventAB: 0.19, context: "insurance_adv_4" },
  { id: "COND_A5", eventA: 0.46, eventB: 0.51, eventAB: 0.23, context: "insurance_adv_5" },
];

const conditionalDataElite = [
  { id: "COND_E1", eventA: 0.365, eventB: 0.625, eventAB: 0.215, context: "insurance_elite_1" },
  { id: "COND_E2", eventA: 0.475, eventB: 0.535, eventAB: 0.285, context: "insurance_elite_2" },
  { id: "COND_E3", eventA: 0.415, eventB: 0.675, eventAB: 0.265, context: "insurance_elite_3" },
  { id: "COND_E4", eventA: 0.335, eventB: 0.595, eventAB: 0.195, context: "insurance_elite_4" },
  { id: "COND_E5", eventA: 0.455, eventB: 0.515, eventAB: 0.235, context: "insurance_elite_5" },
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

function buildStagePool(t: G301T, difficulty: Difficulty, stage: Stage): G301Quest[] {
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
      const problemText = t.problems?.[item.context] || `${item.favorable} favorable out of ${item.total} total`;
      
      return {
        id: item.id,
        difficulty,
        stage,
        favorable: item.favorable,
        total: item.total,
        problemText,
        promptLatex: t.stages.basic_prob_prompt_latex,
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
      const problemText = t.problems?.[item.context] || `n=${item.n} trials, k=${item.k} successes, p=${item.p}`;
      
      return {
        id: item.id,
        difficulty,
        stage,
        n: item.n,
        k: item.k,
        p: item.p,
        problemText,
        promptLatex: t.stages.binomial_prompt_latex,
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
      const problemText = t.problems?.[item.context] || `P(A)=${item.eventA}, P(B)=${item.eventB}, P(A∩B)=${item.eventAB}`;
      
      return {
        id: item.id,
        difficulty,
        stage,
        eventA: item.eventA,
        eventB: item.eventB,
        eventAB: item.eventAB,
        problemText,
        promptLatex: t.stages.conditional_prompt_latex,
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
      problemText = t.problems?.[item.context] || `n=${item.n}, k=${item.k}, p=${item.p}`;
    } else if (item.type === "basic") {
      prob = round4(item.favorable / item.total);
      expressionLatex = `\\text{Given: }${item.favorable}\\text{ favorable, }${item.total}\\text{ total}`;
      problemText = t.problems?.[item.context] || `${item.favorable} favorable out of ${item.total}`;
    } else if (item.type === "conditional") {
      prob = round4(item.eventAB / item.eventB);
      expressionLatex = `\\text{Given: }P(A)=${item.eventA},\\;P(B)=${item.eventB},\\;P(A\\cap B)=${item.eventAB}`;
      problemText = t.problems?.[item.context] || `P(A)=${item.eventA}, P(B)=${item.eventB}, P(A∩B)=${item.eventAB}`;
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
      promptLatex: t.stages.mission_prompt_latex,
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
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].gm3_01;

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
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "BASIC_PROB",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gm3-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="GM3.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "BASIC_PROB", label: t.stages.basic_prob },
        { id: "BINOMIAL", label: t.stages.binomial },
        { id: "CONDITIONAL", label: t.stages.conditional },
        { id: "MISSION", label: t.stages.mission },
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
            title: t.monitor_title,
          }}
        />
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono">{t.mission.description}</p>
        </div>
        
        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6 max-w-4xl mx-auto">
          <div className="text-sm text-green-400/90 leading-relaxed whitespace-pre-line">
            {stage === "BASIC_PROB" && t.scenarios.basic_prob}
            {stage === "BINOMIAL" && t.scenarios.binomial}
            {stage === "CONDITIONAL" && t.scenarios.conditional}
            {stage === "MISSION" && t.scenarios.mission}
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
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.objective_title}</h3>
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
            {currentLanguage === 'DE'
              ? "Tipp: Gib das Resultat auf 4 Dezimalstellen gerundet an."
              : currentLanguage === 'CN'
                ? "提示：保留 4 位小数。"
                : "Tip: Enter result rounded to 4 decimal places."
            }
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
