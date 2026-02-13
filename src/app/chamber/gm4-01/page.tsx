"use client";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { useQuestManager, Difficulty } from "@/hooks/useQuestManager";
import ComplexVisualization from "@/components/chamber/gm4-01/ComplexVisualization";

type Stage = "BASICS" | "OPERATIONS" | "POLAR";

interface ComplexQuest {
  id: string;
  difficulty: Difficulty;
  stage: Stage;
  promptLatex: string;
  expressionLatex: string;
  targetLatex: string;
  slots: Array<{
    id: string;
    labelLatex: string;
    placeholder: string;
    expected: number;
    unit?: string;
  }>;
  correctLatex: string;
  // Data for visualization
  z1?: { re: number; im: number };
  z2?: { re: number; im: number };
  operation?: "add" | "multiply" | "power" | "polar";
  power?: number;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

// BASICS Stage: Understanding complex numbers as 2D points
const basicsDataBasic = [
  { id: "BB1", re: 3, im: 4 },
  { id: "BB2", re: -2, im: 5 },
  { id: "BB3", re: 1, im: -3 },
  { id: "BB4", re: -4, im: -2 },
];

const basicsDataCore = [
  { id: "BC1", re: 5, im: 12 },
  { id: "BC2", re: -8, im: 6 },
  { id: "BC3", re: 3, im: -4 },
  { id: "BC4", re: -7, im: -24 },
];

const basicsDataAdvanced = [
  { id: "BA1", re: 2.5, im: 3.5 },
  { id: "BA2", re: -1.5, im: 4.5 },
  { id: "BA3", re: 3.2, im: -2.4 },
  { id: "BA4", re: -5.5, im: -1.5 },
];

const basicsDataElite = [
  { id: "BE1", re: 0.6, im: 0.8 },
  { id: "BE2", re: -0.8, im: 0.6 },
  { id: "BE3", re: 0.707, im: -0.707 },
  { id: "BE4", re: -0.6, im: -0.8 },
];

// OPERATIONS Stage: Addition and multiplication
const operationsDataBasic = [
  { id: "OB1", z1: { re: 2, im: 3 }, z2: { re: 1, im: 4 }, op: "add" as const },
  { id: "OB2", z1: { re: 5, im: 2 }, z2: { re: -3, im: 1 }, op: "add" as const },
  { id: "OB3", z1: { re: -1, im: 4 }, z2: { re: 2, im: -2 }, op: "add" as const },
  { id: "OB4", z1: { re: 3, im: -1 }, z2: { re: -2, im: 3 }, op: "add" as const },
];

const operationsDataCore = [
  { id: "OC1", z1: { re: 2, im: 1 }, z2: { re: 3, im: 2 }, op: "multiply" as const },
  { id: "OC2", z1: { re: 1, im: 2 }, z2: { re: 2, im: -1 }, op: "multiply" as const },
  { id: "OC3", z1: { re: -1, im: 1 }, z2: { re: 1, im: 1 }, op: "multiply" as const },
  { id: "OC4", z1: { re: 2, im: -1 }, z2: { re: 1, im: 2 }, op: "multiply" as const },
];

const operationsDataAdvanced = [
  { id: "OA1", z1: { re: 1.5, im: 2.5 }, z2: { re: 2.5, im: 1.5 }, op: "multiply" as const },
  { id: "OA2", z1: { re: -2.5, im: 1.5 }, z2: { re: 1.5, im: -2.5 }, op: "multiply" as const },
  { id: "OA3", z1: { re: 3.5, im: -1.5 }, z2: { re: 1.5, im: 2.5 }, op: "multiply" as const },
  { id: "OA4", z1: { re: -1.5, im: -2.5 }, z2: { re: 2.5, im: 1.5 }, op: "multiply" as const },
];

const operationsDataElite = [
  { id: "OE1", z1: { re: 0.8, im: 0.6 }, z2: { re: 0.6, im: 0.8 }, op: "multiply" as const },
  { id: "OE2", z1: { re: -0.6, im: 0.8 }, z2: { re: 0.8, im: -0.6 }, op: "multiply" as const },
  { id: "OE3", z1: { re: 0.707, im: 0.707 }, z2: { re: 0.707, im: -0.707 }, op: "multiply" as const },
  { id: "OE4", z1: { re: -0.8, im: -0.6 }, z2: { re: 0.6, im: 0.8 }, op: "multiply" as const },
];

// POLAR Stage: Powers using polar form
const polarDataBasic = [
  { id: "PB1", re: 1, im: 1, power: 2 },
  { id: "PB2", re: 2, im: 0, power: 3 },
  { id: "PB3", re: 0, im: 2, power: 2 },
  { id: "PB4", re: -1, im: 1, power: 2 },
];

const polarDataCore = [
  { id: "PC1", re: 1, im: 1, power: 3 },
  { id: "PC2", re: 2, im: 2, power: 2 },
  { id: "PC3", re: -1, im: 1, power: 3 },
  { id: "PC4", re: 1, im: -1, power: 4 },
];

const polarDataAdvanced = [
  { id: "PA1", re: 1.5, im: 1.5, power: 3 },
  { id: "PA2", re: 2.5, im: 1.5, power: 2 },
  { id: "PA3", re: -1.5, im: 2.5, power: 2 },
  { id: "PA4", re: 1.5, im: -2.5, power: 3 },
];

const polarDataElite = [
  { id: "PE1", re: 0.707, im: 0.707, power: 4 },
  { id: "PE2", re: 0.866, im: 0.5, power: 3 },
  { id: "PE3", re: -0.5, im: 0.866, power: 4 },
  { id: "PE4", re: 0.6, im: -0.8, power: 5 },
];

function buildStagePool(
  t: typeof translations.EN.gm4_01,
  difficulty: Difficulty,
  stage: Stage
): ComplexQuest[] {
  if (stage === "BASICS") {
    let dataSet;
    switch (difficulty) {
      case "BASIC": dataSet = basicsDataBasic; break;
      case "CORE": dataSet = basicsDataCore; break;
      case "ADVANCED": dataSet = basicsDataAdvanced; break;
      case "ELITE": dataSet = basicsDataElite; break;
      default: dataSet = basicsDataBasic;
    }

    return dataSet.map((item) => {
      const r = Math.sqrt(item.re * item.re + item.im * item.im);
      return {
        id: item.id,
        difficulty,
        stage,
        promptLatex: t?.stages?.basics_prompt || "Calculate magnitude",
        expressionLatex: `z = ${item.re} + ${item.im}i`,
        targetLatex: t?.stages?.basics_target || "Find |z|",
        slots: [
          {
            id: "magnitude",
            labelLatex: "|z|",
            placeholder: "magnitude",
            expected: round2(r),
          },
        ],
        correctLatex: `|z| = ${round2(r)}`,
        z1: { re: item.re, im: item.im },
        operation: "polar",
      };
    });
  }

  if (stage === "OPERATIONS") {
    let dataSet;
    switch (difficulty) {
      case "BASIC": dataSet = operationsDataBasic; break;
      case "CORE": dataSet = operationsDataCore; break;
      case "ADVANCED": dataSet = operationsDataAdvanced; break;
      case "ELITE": dataSet = operationsDataElite; break;
      default: dataSet = operationsDataBasic;
    }

    return dataSet.map((item) => {
      let resultRe, resultIm;
      if (item.op === "add") {
        resultRe = item.z1.re + item.z2.re;
        resultIm = item.z1.im + item.z2.im;
      } else {
        // multiply: (a+bi)(c+di) = (ac-bd) + (ad+bc)i
        resultRe = item.z1.re * item.z2.re - item.z1.im * item.z2.im;
        resultIm = item.z1.re * item.z2.im + item.z1.im * item.z2.re;
      }

      const opSymbol = item.op === "add" ? "+" : "\\times";
      const opLabel = item.op === "add" ? (t?.stages?.operations_add || "Add") : (t?.stages?.operations_multiply || "Multiply");

      return {
        id: item.id,
        difficulty,
        stage,
        promptLatex: opLabel,
        expressionLatex: `z_1 ${opSymbol} z_2`,
        targetLatex: t?.stages?.operations_target || "Find result",
        slots: [
          {
            id: "real",
            labelLatex: "\\text{Re}",
            placeholder: "real",
            expected: round2(resultRe),
          },
          {
            id: "imaginary",
            labelLatex: "\\text{Im}",
            placeholder: "imaginary",
            expected: round2(resultIm),
          },
        ],
        correctLatex: `${round2(resultRe)} + ${round2(resultIm)}i`,
        z1: item.z1,
        z2: item.z2,
        operation: item.op,
      };
    });
  }

  // POLAR stage
  let dataSet;
  switch (difficulty) {
    case "BASIC": dataSet = polarDataBasic; break;
    case "CORE": dataSet = polarDataCore; break;
    case "ADVANCED": dataSet = polarDataAdvanced; break;
    case "ELITE": dataSet = polarDataElite; break;
    default: dataSet = polarDataBasic;
  }

  return dataSet.map((item) => {
    const r = Math.sqrt(item.re * item.re + item.im * item.im);
    const theta = Math.atan2(item.im, item.re);
    const newR = Math.pow(r, item.power);
    const newTheta = theta * item.power;
    const resultRe = newR * Math.cos(newTheta);
    const resultIm = newR * Math.sin(newTheta);

    return {
      id: item.id,
      difficulty,
      stage,
      promptLatex: t?.stages?.polar_prompt || "Calculate power",
      expressionLatex: `z^{${item.power}}`,
      targetLatex: t?.stages?.polar_target || "Find z^n",
      slots: [
        {
          id: "real",
          labelLatex: "\\text{Re}",
          placeholder: "real",
          expected: round2(resultRe),
        },
        {
          id: "imaginary",
          labelLatex: "\\text{Im}",
          placeholder: "imaginary",
          expected: round2(resultIm),
        },
      ],
      correctLatex: `${round2(resultRe)} + ${round2(resultIm)}i`,
      z1: { re: item.re, im: item.im },
      operation: "power",
      power: item.power,
    };
  });
}

export default function GM401Page() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage]?.gm4_01 || translations.EN.gm4_01;

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
  } = useQuestManager<ComplexQuest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "BASICS",
  });

  return (
    <ChamberLayout
      title={t?.title || "GM4.01 // COMPLEX HORIZON"}
      moduleCode="GM4.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "BASICS", label: t?.stages?.basics || "BASICS" },
        { id: "OPERATIONS", label: t?.stages?.operations || "OPERATIONS" },
        { id: "POLAR", label: t?.stages?.polar || "POLAR" },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t?.footer_left || "GM4.01_COMPLEX_HORIZON // NODE: BASEL"}
      translations={{
        back: t?.back || "Back to Nexus",
        check: t?.check || "Verify",
        next: t?.next || "Next",
        correct: t?.correct || "Verified",
        incorrect: t?.incorrect || "Mismatch",
        ready: t?.ready || "Ready",
        monitor_title: t?.monitor_title || "GM4.01_COMPLEX_MONITOR",
        difficulty: {
          basic: t?.difficulty?.basic || "BASIC",
          core: t?.difficulty?.core || "CORE",
          advanced: t?.difficulty?.advanced || "ADVANCED",
          elite: t?.difficulty?.elite || "ELITE",
        },
      }}
      monitorContent={
        <ComplexVisualization
          quest={currentQuest}
          checkStatus={lastCheck?.ok ? "correct" : lastCheck ? "incorrect" : null}
        />
      }
    >
      {currentQuest && (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
              {t?.scenario_title || "MISSION"}
            </div>
            <p className="text-sm text-white/80 font-mono max-w-2xl mx-auto leading-relaxed">
              {stage === "BASICS" && (t?.scenarios?.basics || "Calculate complex number magnitudes")}
              {stage === "OPERATIONS" && (t?.scenarios?.operations || "Perform complex number operations")}
              {stage === "POLAR" && (t?.scenarios?.polar || "Calculate powers using polar form")}
            </p>
          </div>

          <div className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/60 font-black">
                {currentQuest.promptLatex}
              </div>
              <div className="text-3xl text-white font-black">
                {currentQuest.expressionLatex}
              </div>
              <div className="text-sm text-white/60 font-mono">
                {currentQuest.targetLatex}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-4">
              {currentQuest.slots.map((slot) => (
                <div key={slot.id} className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                    {slot.labelLatex}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) =>
                      setInputs({ ...inputs, [slot.id]: e.target.value })
                    }
                    placeholder={slot.placeholder}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white font-mono text-lg focus:outline-none focus:border-neon-cyan transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </ChamberLayout>
  );
}
