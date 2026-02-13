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
  n?: number;  // number of trials
  k?: number;  // number of successes
  p?: number;  // probability
  eventA?: number;  // P(A)
  eventB?: number;  // P(B)
  eventAB?: number; // P(A∩B)
}

const round2 = (v: number) => Math.round(v * 100) / 100;
const round4 = (v: number) => Math.round(v * 10000) / 10000;

// Binomial coefficient C(n, k)
const binomial = (n: number, k: number): number => {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result = result * (n - i + 1) / i;
  }
  return result;
};

// BASIC_PROB stage: Simple probability calculations
const basicProbDataBasic = [
  { id: "BP_B1", favorable: 1, total: 6 },  // Single die
  { id: "BP_B2", favorable: 2, total: 6 },  // Two outcomes on die
  { id: "BP_B3", favorable: 13, total: 52 }, // One suit in deck
  { id: "BP_B4", favorable: 4, total: 52 },  // One rank in deck
];

const basicProbDataCore = [
  { id: "BP_C1", favorable: 3, total: 10 },
  { id: "BP_C2", favorable: 26, total: 52 }, // Red cards
  { id: "BP_C3", favorable: 12, total: 52 }, // Face cards
  { id: "BP_C4", favorable: 6, total: 36 },  // Sum of 7 on two dice
  { id: "BP_C5", favorable: 5, total: 20 },
];

const basicProbDataAdvanced = [
  { id: "BP_A1", favorable: 15, total: 100 },
  { id: "BP_A2", favorable: 16, total: 52 }, // Honors (A,K,Q,J)
  { id: "BP_A3", favorable: 20, total: 100 },
  { id: "BP_A4", favorable: 11, total: 36 }, // Sum > 7 on two dice
  { id: "BP_A5", favorable: 7, total: 50 },
];

const basicProbDataElite = [
  { id: "BP_E1", favorable: 18, total: 75 },
  { id: "BP_E2", favorable: 22, total: 85 },
  { id: "BP_E3", favorable: 35, total: 120 },
  { id: "BP_E4", favorable: 27, total: 90 },
  { id: "BP_E5", favorable: 42, total: 150 },
];

// BINOMIAL stage: Binomial distribution P(X=k) = C(n,k) * p^k * (1-p)^(n-k)
const binomialDataBasic = [
  { id: "BIN_B1", n: 3, k: 2, p: 0.5 },  // 3 coin flips, 2 heads
  { id: "BIN_B2", n: 4, k: 3, p: 0.5 },  // 4 coin flips, 3 heads
  { id: "BIN_B3", n: 5, k: 2, p: 0.5 },  // 5 coin flips, 2 heads
  { id: "BIN_B4", n: 3, k: 1, p: 0.5 },  // 3 coin flips, 1 head
];

const binomialDataCore = [
  { id: "BIN_C1", n: 5, k: 3, p: 0.5 },
  { id: "BIN_C2", n: 6, k: 4, p: 0.5 },
  { id: "BIN_C3", n: 4, k: 2, p: 0.6 },  // Biased coin
  { id: "BIN_C4", n: 5, k: 3, p: 0.6 },
  { id: "BIN_C5", n: 6, k: 2, p: 0.5 },
];

const binomialDataAdvanced = [
  { id: "BIN_A1", n: 8, k: 5, p: 0.5 },
  { id: "BIN_A2", n: 10, k: 6, p: 0.5 },
  { id: "BIN_A3", n: 7, k: 4, p: 0.6 },
  { id: "BIN_A4", n: 8, k: 3, p: 0.4 },
  { id: "BIN_A5", n: 6, k: 4, p: 0.7 },
];

const binomialDataElite = [
  { id: "BIN_E1", n: 12, k: 7, p: 0.55 },
  { id: "BIN_E2", n: 15, k: 9, p: 0.6 },
  { id: "BIN_E3", n: 10, k: 6, p: 0.65 },
  { id: "BIN_E4", n: 8, k: 5, p: 0.45 },
  { id: "BIN_E5", n: 9, k: 6, p: 0.7 },
];

// CONDITIONAL stage: P(A|B) = P(A∩B) / P(B)
const conditionalDataBasic = [
  { id: "COND_B1", eventA: 0.5, eventB: 0.6, eventAB: 0.3 },
  { id: "COND_B2", eventA: 0.4, eventB: 0.5, eventAB: 0.2 },
  { id: "COND_B3", eventA: 0.6, eventB: 0.7, eventAB: 0.4 },
  { id: "COND_B4", eventA: 0.3, eventB: 0.4, eventAB: 0.15 },
];

const conditionalDataCore = [
  { id: "COND_C1", eventA: 0.45, eventB: 0.55, eventAB: 0.25 },
  { id: "COND_C2", eventA: 0.35, eventB: 0.65, eventAB: 0.22 },
  { id: "COND_C3", eventA: 0.52, eventB: 0.48, eventAB: 0.28 },
  { id: "COND_C4", eventA: 0.38, eventB: 0.62, eventAB: 0.24 },
  { id: "COND_C5", eventA: 0.42, eventB: 0.58, eventAB: 0.26 },
];

const conditionalDataAdvanced = [
  { id: "COND_A1", eventA: 0.37, eventB: 0.63, eventAB: 0.21 },
  { id: "COND_A2", eventA: 0.48, eventB: 0.54, eventAB: 0.29 },
  { id: "COND_A3", eventA: 0.41, eventB: 0.67, eventAB: 0.27 },
  { id: "COND_A4", eventA: 0.33, eventB: 0.59, eventAB: 0.19 },
  { id: "COND_A5", eventA: 0.46, eventB: 0.51, eventAB: 0.23 },
];

const conditionalDataElite = [
  { id: "COND_E1", eventA: 0.365, eventB: 0.625, eventAB: 0.215 },
  { id: "COND_E2", eventA: 0.475, eventB: 0.535, eventAB: 0.285 },
  { id: "COND_E3", eventA: 0.415, eventB: 0.675, eventAB: 0.265 },
  { id: "COND_E4", eventA: 0.335, eventB: 0.595, eventAB: 0.195 },
  { id: "COND_E5", eventA: 0.455, eventB: 0.515, eventAB: 0.235 },
];

// MISSION stage: Combined probability problems
const missionDataBasic = [
  { id: "MISS_B1", n: 3, k: 2, p: 0.5, type: "binomial" },
  { id: "MISS_B2", favorable: 2, total: 6, type: "basic" },
  { id: "MISS_B3", eventA: 0.5, eventB: 0.6, eventAB: 0.3, type: "conditional" },
  { id: "MISS_B4", n: 4, k: 3, p: 0.5, type: "binomial" },
];

const missionDataCore = [
  { id: "MISS_C1", n: 5, k: 3, p: 0.6, type: "binomial" },
  { id: "MISS_C2", favorable: 26, total: 52, type: "basic" },
  { id: "MISS_C3", eventA: 0.45, eventB: 0.55, eventAB: 0.25, type: "conditional" },
  { id: "MISS_C4", n: 6, k: 4, p: 0.5, type: "binomial" },
  { id: "MISS_C5", favorable: 12, total: 52, type: "basic" },
];

const missionDataAdvanced = [
  { id: "MISS_A1", n: 8, k: 5, p: 0.6, type: "binomial" },
  { id: "MISS_A2", favorable: 16, total: 52, type: "basic" },
  { id: "MISS_A3", eventA: 0.37, eventB: 0.63, eventAB: 0.21, type: "conditional" },
  { id: "MISS_A4", n: 7, k: 4, p: 0.55, type: "binomial" },
  { id: "MISS_A5", favorable: 20, total: 100, type: "basic" },
];

const missionDataElite = [
  { id: "MISS_E1", n: 12, k: 7, p: 0.65, type: "binomial" },
  { id: "MISS_E2", favorable: 35, total: 120, type: "basic" },
  { id: "MISS_E3", eventA: 0.365, eventB: 0.625, eventAB: 0.215, type: "conditional" },
  { id: "MISS_E4", n: 10, k: 6, p: 0.7, type: "binomial" },
  { id: "MISS_E5", favorable: 42, total: 150, type: "basic" },
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
      
      return {
        id: item.id,
        difficulty,
        stage,
        promptLatex: t.stages.basic_prob_prompt_latex,
        expressionLatex: `P(E)=\\frac{${item.favorable}}{${item.total}}`,
        targetLatex: "P(E)",
        slots: [
          { id: "probability", labelLatex: "P(E)", placeholder: "probability", expected: probability },
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
      
      return {
        id: item.id,
        difficulty,
        stage,
        n: item.n,
        k: item.k,
        p: item.p,
        promptLatex: t.stages.binomial_prompt_latex,
        expressionLatex: `n=${item.n},\\;k=${item.k},\\;p=${item.p}`,
        targetLatex: "P(X=k)",
        slots: [
          { id: "probability", labelLatex: "P(X=k)", placeholder: "probability", expected: prob },
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
      
      return {
        id: item.id,
        difficulty,
        stage,
        eventA: item.eventA,
        eventB: item.eventB,
        eventAB: item.eventAB,
        promptLatex: t.stages.conditional_prompt_latex,
        expressionLatex: `P(A)=${item.eventA},\\;P(B)=${item.eventB},\\;P(A\\cap B)=${item.eventAB}`,
        targetLatex: "P(A|B)",
        slots: [
          { id: "probability", labelLatex: "P(A|B)", placeholder: "probability", expected: condProb },
        ],
        correctLatex: `P(A|B)=${condProb}`,
      };
    });
  }

  // MISSION stage
  let dataSet;
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
    
    if (item.type === "binomial") {
      prob = round4(binomial(item.n, item.k) * Math.pow(item.p, item.k) * Math.pow(1 - item.p, item.n - item.k));
      expressionLatex = `n=${item.n},\\;k=${item.k},\\;p=${item.p}`;
    } else if (item.type === "basic") {
      prob = round4(item.favorable / item.total);
      expressionLatex = `\\frac{${item.favorable}}{${item.total}}`;
    } else if (item.type === "conditional") {
      prob = round4(item.eventAB / item.eventB);
      expressionLatex = `P(A)=${item.eventA},\\;P(B)=${item.eventB},\\;P(A\\cap B)=${item.eventAB}`;
    }
    
    return {
      id: item.id,
      difficulty,
      stage,
      promptLatex: t.stages.mission_prompt_latex,
      expressionLatex,
      targetLatex: "P",
      slots: [
        { id: "probability", labelLatex: "P", placeholder: "probability", expected: prob },
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
          n={currentQuest?.n}
          k={currentQuest?.k}
          p={currentQuest?.p}
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

        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.objective_title}</h3>
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
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
                  {slot.unit && (
                    <div className="text-xl font-black text-white/80 min-w-[30px]">
                      <InlineMath math={slot.unit} />
                    </div>
                  )}
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
