"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import VectorVisualization from "@/components/chamber/gm2-01/VectorVisualization";

type Stage = "NAVIGATION" | "DOT" | "MISSION";

interface G201Quest extends Quest {
  stage: Stage;
  pointA?: [number, number, number];
  pointB?: [number, number, number];
  vectorV?: [number, number, number];
  vectorW?: [number, number, number];
  showDotProduct?: boolean;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

// NAVIGATION stage: Calculate vector from points and magnitude
const navigationDataBasic = [
  { id: "N_B1", A: [0, 0, 0] as [number, number, number], B: [3, 0, 0] as [number, number, number] },
  { id: "N_B2", A: [0, 0, 0] as [number, number, number], B: [0, 4, 0] as [number, number, number] },
  { id: "N_B3", A: [0, 0, 0] as [number, number, number], B: [0, 0, 5] as [number, number, number] },
  { id: "N_B4", A: [1, 1, 1] as [number, number, number], B: [4, 1, 1] as [number, number, number] },
];

const navigationDataCore = [
  { id: "N_C1", A: [0, 0, 0] as [number, number, number], B: [3, 4, 0] as [number, number, number] },
  { id: "N_C2", A: [1, 2, 0] as [number, number, number], B: [4, 6, 0] as [number, number, number] },
  { id: "N_C3", A: [0, 0, 0] as [number, number, number], B: [2, 2, 2] as [number, number, number] },
  { id: "N_C4", A: [1, 1, 1] as [number, number, number], B: [3, 4, 1] as [number, number, number] },
  { id: "N_C5", A: [2, 1, 0] as [number, number, number], B: [5, 5, 0] as [number, number, number] },
];

const navigationDataAdvanced = [
  { id: "N_A1", A: [1, 2, 3] as [number, number, number], B: [4, 6, 7] as [number, number, number] },
  { id: "N_A2", A: [0, 0, 0] as [number, number, number], B: [3, 4, 5] as [number, number, number] },
  { id: "N_A3", A: [2, 1, 3] as [number, number, number], B: [5, 5, 6] as [number, number, number] },
  { id: "N_A4", A: [1, 1, 2] as [number, number, number], B: [4, 5, 6] as [number, number, number] },
  { id: "N_A5", A: [0, 2, 1] as [number, number, number], B: [3, 6, 5] as [number, number, number] },
];

const navigationDataElite = [
  { id: "N_E1", A: [1.5, 2.5, 3.5] as [number, number, number], B: [4.5, 6.5, 7.5] as [number, number, number] },
  { id: "N_E2", A: [0.5, 1.5, 2.5] as [number, number, number], B: [3.5, 5.5, 7.5] as [number, number, number] },
  { id: "N_E3", A: [2.2, 1.8, 3.1] as [number, number, number], B: [5.7, 5.3, 6.9] as [number, number, number] },
  { id: "N_E4", A: [1.3, 2.7, 1.9] as [number, number, number], B: [4.8, 6.2, 5.4] as [number, number, number] },
  { id: "N_E5", A: [0.8, 1.2, 2.4] as [number, number, number], B: [3.3, 4.7, 6.1] as [number, number, number] },
  // Cross-disciplinary physics integration: Force vector decomposition
  { id: "N_E6", A: [12.5, 8.3, 15.7] as [number, number, number], B: [45.8, 32.6, 48.9] as [number, number, number] }, // Rhine bridge cable tension force
  { id: "N_E7", A: [5.2, 18.4, 3.6] as [number, number, number], B: [28.7, 52.9, 15.3] as [number, number, number] }, // Basel tram acceleration force
];

// DOT stage: Calculate dot product between two vectors
const dotDataBasic = [
  { id: "D_B1", v: [3, 0, 0] as [number, number, number], w: [2, 0, 0] as [number, number, number] },
  { id: "D_B2", v: [0, 4, 0] as [number, number, number], w: [0, 3, 0] as [number, number, number] },
  { id: "D_B3", v: [2, 0, 0] as [number, number, number], w: [0, 3, 0] as [number, number, number] },
  { id: "D_B4", v: [1, 1, 0] as [number, number, number], w: [1, 1, 0] as [number, number, number] },
];

const dotDataCore = [
  { id: "D_C1", v: [3, 4, 0] as [number, number, number], w: [2, 1, 0] as [number, number, number] },
  { id: "D_C2", v: [2, 3, 0] as [number, number, number], w: [1, 2, 0] as [number, number, number] },
  { id: "D_C3", v: [1, 2, 2] as [number, number, number], w: [2, 1, 1] as [number, number, number] },
  { id: "D_C4", v: [3, 2, 1] as [number, number, number], w: [1, 3, 2] as [number, number, number] },
  { id: "D_C5", v: [2, 2, 0] as [number, number, number], w: [3, 1, 0] as [number, number, number] },
];

const dotDataAdvanced = [
  { id: "D_A1", v: [3, 4, 5] as [number, number, number], w: [2, 1, 3] as [number, number, number] },
  { id: "D_A2", v: [2, 3, 4] as [number, number, number], w: [1, 2, 2] as [number, number, number] },
  { id: "D_A3", v: [4, 3, 2] as [number, number, number], w: [1, 2, 3] as [number, number, number] },
  { id: "D_A4", v: [3, 2, 5] as [number, number, number], w: [2, 3, 1] as [number, number, number] },
  { id: "D_A5", v: [5, 1, 3] as [number, number, number], w: [1, 4, 2] as [number, number, number] },
];

const dotDataElite = [
  { id: "D_E1", v: [3.5, 4.2, 5.1] as [number, number, number], w: [2.3, 1.8, 3.6] as [number, number, number] },
  { id: "D_E2", v: [2.7, 3.9, 4.5] as [number, number, number], w: [1.5, 2.2, 2.8] as [number, number, number] },
  { id: "D_E3", v: [4.1, 3.3, 2.7] as [number, number, number], w: [1.9, 2.5, 3.4] as [number, number, number] },
  { id: "D_E4", v: [3.8, 2.6, 5.2] as [number, number, number], w: [2.1, 3.7, 1.4] as [number, number, number] },
  { id: "D_E5", v: [5.3, 1.7, 3.9] as [number, number, number], w: [1.2, 4.6, 2.3] as [number, number, number] },
  // Cross-disciplinary physics integration: Work = Force · Displacement
  { id: "D_E6", v: [125.3, 87.6, 156.8] as [number, number, number], w: [45.7, 32.4, 68.9] as [number, number, number] }, // Roche Tower elevator work calculation
  { id: "D_E7", v: [78.4, 112.5, 43.2] as [number, number, number], w: [34.6, 52.8, 28.7] as [number, number, number] }, // Basel Port cargo crane work
];

// MISSION stage: Combined operations
const missionDataBasic = [
  { id: "M_B1", A: [0, 0, 0] as [number, number, number], B: [3, 0, 0] as [number, number, number], s: [1, 0, 0] as [number, number, number] },
  { id: "M_B2", A: [0, 0, 0] as [number, number, number], B: [0, 4, 0] as [number, number, number], s: [0, 1, 0] as [number, number, number] },
  { id: "M_B3", A: [1, 1, 0] as [number, number, number], B: [4, 1, 0] as [number, number, number], s: [1, 0, 0] as [number, number, number] },
  { id: "M_B4", A: [0, 0, 0] as [number, number, number], B: [2, 2, 0] as [number, number, number], s: [1, 1, 0] as [number, number, number] },
];

const missionDataCore = [
  { id: "M_C1", A: [0, 0, 0] as [number, number, number], B: [3, 4, 0] as [number, number, number], s: [1, 1, 0] as [number, number, number] },
  { id: "M_C2", A: [1, 2, 0] as [number, number, number], B: [4, 6, 0] as [number, number, number], s: [2, 1, 0] as [number, number, number] },
  { id: "M_C3", A: [0, 0, 0] as [number, number, number], B: [2, 2, 2] as [number, number, number], s: [1, 1, 1] as [number, number, number] },
  { id: "M_C4", A: [1, 1, 1] as [number, number, number], B: [3, 4, 1] as [number, number, number], s: [1, 2, 0] as [number, number, number] },
  { id: "M_C5", A: [2, 1, 0] as [number, number, number], B: [5, 5, 0] as [number, number, number], s: [1, 1, 0] as [number, number, number] },
];

const missionDataAdvanced = [
  { id: "M_A1", A: [1, 2, 3] as [number, number, number], B: [4, 6, 7] as [number, number, number], s: [1, 2, 1] as [number, number, number] },
  { id: "M_A2", A: [0, 0, 0] as [number, number, number], B: [3, 4, 5] as [number, number, number], s: [2, 1, 2] as [number, number, number] },
  { id: "M_A3", A: [2, 1, 3] as [number, number, number], B: [5, 5, 6] as [number, number, number], s: [1, 1, 1] as [number, number, number] },
  { id: "M_A4", A: [1, 1, 2] as [number, number, number], B: [4, 5, 6] as [number, number, number], s: [2, 2, 1] as [number, number, number] },
  { id: "M_A5", A: [0, 2, 1] as [number, number, number], B: [3, 6, 5] as [number, number, number], s: [1, 2, 2] as [number, number, number] },
];

const missionDataElite = [
  { id: "M_E1", A: [1.5, 2.5, 3.5] as [number, number, number], B: [4.5, 6.5, 7.5] as [number, number, number], s: [1.2, 2.3, 1.5] as [number, number, number] },
  { id: "M_E2", A: [0.5, 1.5, 2.5] as [number, number, number], B: [3.5, 5.5, 7.5] as [number, number, number], s: [2.1, 1.8, 2.4] as [number, number, number] },
  { id: "M_E3", A: [2.2, 1.8, 3.1] as [number, number, number], B: [5.7, 5.3, 6.9] as [number, number, number], s: [1.5, 1.7, 1.9] as [number, number, number] },
  { id: "M_E4", A: [1.3, 2.7, 1.9] as [number, number, number], B: [4.8, 6.2, 5.4] as [number, number, number], s: [2.2, 1.9, 1.3] as [number, number, number] },
  { id: "M_E5", A: [0.8, 1.2, 2.4] as [number, number, number], B: [3.3, 4.7, 6.1] as [number, number, number], s: [1.8, 2.5, 2.1] as [number, number, number] },
  // Cross-disciplinary physics integration: University Hospital drone delivery with wind force
  { id: "M_E6", A: [8.7, 15.3, 42.5] as [number, number, number], B: [56.4, 73.8, 125.7] as [number, number, number], s: [12.6, 18.9, 25.3] as [number, number, number] },
];

function buildStagePool(gm2_01_t: any, difficulty: Difficulty, stage: Stage): G201Quest[] {
  if (stage === "NAVIGATION") {
    let dataSet;
    switch (difficulty) {
      case "BASIC": dataSet = navigationDataBasic; break;
      case "CORE": dataSet = navigationDataCore; break;
      case "ADVANCED": dataSet = navigationDataAdvanced; break;
      case "ELITE": dataSet = navigationDataElite; break;
      default: dataSet = navigationDataBasic;
    }
    
    return dataSet.map((item) => {
      const v = [item.B[0] - item.A[0], item.B[1] - item.A[1], item.B[2] - item.A[2]];
      const magnitude = round2(Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2));
      
      return {
        id: item.id,
        difficulty,
        stage,
        pointA: item.A,
        pointB: item.B,
        promptLatex: gm2_01_t.stages.navigation_prompt_latex,
        expressionLatex: `A(${item.A.join(',')})\\;\\text{to}\\;B(${item.B.join(',')})`,
        targetLatex: "\\vec v,\\;|\\vec v|",
        slots: [
          { id: "vx", labelLatex: "v_x", placeholder: "x", expected: round2(v[0]) },
          { id: "vy", labelLatex: "v_y", placeholder: "y", expected: round2(v[1]) },
          { id: "vz", labelLatex: "v_z", placeholder: "z", expected: round2(v[2]) },
          { id: "magnitude", labelLatex: "|\\vec v|", placeholder: "magnitude", expected: magnitude },
        ],
        correctLatex: `\\vec v=(${round2(v[0])},${round2(v[1])},${round2(v[2])}),\\;|\\vec v|=${magnitude}`,
      };
    });
  }

  if (stage === "DOT") {
    let dataSet;
    switch (difficulty) {
      case "BASIC": dataSet = dotDataBasic; break;
      case "CORE": dataSet = dotDataCore; break;
      case "ADVANCED": dataSet = dotDataAdvanced; break;
      case "ELITE": dataSet = dotDataElite; break;
      default: dataSet = dotDataBasic;
    }
    
    return dataSet.map((item) => {
      const dotProduct = round2(item.v[0] * item.w[0] + item.v[1] * item.w[1] + item.v[2] * item.w[2]);
      
      return {
        id: item.id,
        difficulty,
        stage,
        vectorV: item.v,
        vectorW: item.w,
        showDotProduct: true,
        promptLatex: gm2_01_t.stages.dot_prompt_latex,
        expressionLatex: `\\vec v=(${item.v.join(',')}),\\;\\vec w=(${item.w.join(',')})`,
        targetLatex: "\\vec v\\cdot\\vec w",
        slots: [
          { id: "dot", labelLatex: "\\vec v\\cdot\\vec w", placeholder: "dot product", expected: dotProduct },
        ],
        correctLatex: `\\vec v\\cdot\\vec w=${dotProduct}`,
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
  
  return dataSet.map((item) => {
    const v = [item.B[0] - item.A[0], item.B[1] - item.A[1], item.B[2] - item.A[2]];
    const magnitude = round2(Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2));
    const dotProduct = round2(v[0] * item.s[0] + v[1] * item.s[1] + v[2] * item.s[2]);
    
    return {
      id: item.id,
      difficulty,
      stage,
      pointA: item.A,
      pointB: item.B,
      vectorW: item.s,
      showDotProduct: true,
      promptLatex: gm2_01_t.stages.mission_prompt_latex,
      expressionLatex: `A(${item.A.join(',')})\\;\\text{to}\\;B(${item.B.join(',')}),\\;\\vec s=(${item.s.join(',')})`,
      targetLatex: "\\vec v,\\;\\vec v\\cdot\\vec s,\\;|\\vec v|",
      slots: [
        { id: "vx", labelLatex: "v_x", placeholder: "x", expected: round2(v[0]) },
        { id: "vy", labelLatex: "v_y", placeholder: "y", expected: round2(v[1]) },
        { id: "vz", labelLatex: "v_z", placeholder: "z", expected: round2(v[2]) },
        { id: "dot", labelLatex: "\\vec v\\cdot\\vec s", placeholder: "dot", expected: dotProduct },
        { id: "magnitude", labelLatex: "|\\vec v|", placeholder: "magnitude", expected: magnitude },
      ],
      correctLatex: `\\vec v=(${round2(v[0])},${round2(v[1])},${round2(v[2])}),\\;\\vec v\\cdot\\vec s=${dotProduct},\\;|\\vec v|=${magnitude}`,
    };
  });
}

export default function G201Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();
  
  const gm2_01_t = {
    title: t("gm2_01.title"),
    back: t("gm2_01.back"),
    check: t("gm2_01.check"),
    next: t("gm2_01.next"),
    correct: t("gm2_01.correct"),
    incorrect: t("gm2_01.incorrect"),
    ready: t("gm2_01.ready"),
    monitor_title: t("gm2_01.monitor_title"),
    footer_left: t("gm2_01.footer_left"),
    objective_title: t("gm2_01.objective_title"),
    target_title: t("gm2_01.target_title"),
    stages: {
      navigation: t("gm2_01.stages.navigation"),
      dot: t("gm2_01.stages.dot"),
      mission: t("gm2_01.stages.mission"),
      navigation_prompt_latex: t("gm2_01.stages.navigation_prompt_latex"),
      dot_prompt_latex: t("gm2_01.stages.dot_prompt_latex"),
      mission_prompt_latex: t("gm2_01.stages.mission_prompt_latex"),
    },
    difficulty: {
      basic: t("gm2_01.difficulty.basic"),
      core: t("gm2_01.difficulty.core"),
      advanced: t("gm2_01.difficulty.advanced"),
      elite: t("gm2_01.difficulty.elite"),
    },
    labels: {
      input: t("gm2_01.labels.input"),
    },
    mission: {
      title: t("gm2_01.mission.title"),
      description: t("gm2_01.mission.description"),
    },
    scenarios: {
      navigation: t("gm2_01.scenarios.navigation"),
      dot: t("gm2_01.scenarios.dot"),
      mission: t("gm2_01.scenarios.mission"),
    },
    input_tip_2dp: t("gm2_01.input_tip_2dp"),
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
    adaptiveRecommendation,
  } = useQuestManager<G201Quest, Stage>({
    moduleCode: "gm2-01",
    buildPool: (d, s) => buildStagePool(gm2_01_t, d, s),
    initialStage: "NAVIGATION",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gm2-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      title={gm2_01_t.title}
      moduleCode="GM2.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "NAVIGATION", label: gm2_01_t.stages.navigation },
        { id: "DOT", label: gm2_01_t.stages.dot },
        { id: "MISSION", label: gm2_01_t.stages.mission },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={gm2_01_t.footer_left}
      translations={{
        back: gm2_01_t.back,
        check: gm2_01_t.check,
        next: gm2_01_t.next,
        correct: gm2_01_t.correct,
        incorrect: gm2_01_t.incorrect,
        ready: gm2_01_t.ready,
        monitor_title: gm2_01_t.monitor_title,
        difficulty: {
          basic: gm2_01_t.difficulty.basic,
          core: gm2_01_t.difficulty.core,
          advanced: gm2_01_t.difficulty.advanced,
          elite: gm2_01_t.difficulty.elite,
        },
      }}
      monitorContent={
        <VectorVisualization
          pointA={currentQuest?.pointA}
          pointB={currentQuest?.pointB}
          vectorV={currentQuest?.vectorV}
          vectorW={currentQuest?.vectorW}
          showDotProduct={currentQuest?.showDotProduct}
          translations={{
            title: gm2_01_t.monitor_title,
            pointA: "Point A",
            pointB: "Point B",
            vectorV: "Vector v",
            vectorW: stage === "MISSION" ? "Vector s" : "Vector w",
          }}
        />
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{gm2_01_t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono">{gm2_01_t.mission.description}</p>
        </div>
        
        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6 max-w-4xl mx-auto">
          <div className="text-sm text-green-400/90 leading-relaxed whitespace-pre-line">
            {stage === "NAVIGATION" && gm2_01_t.scenarios.navigation}
            {stage === "DOT" && gm2_01_t.scenarios.dot}
            {stage === "MISSION" && gm2_01_t.scenarios.mission}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{gm2_01_t.objective_title}</h3>
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-2 gap-4">
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
            {gm2_01_t.input_tip_2dp}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
