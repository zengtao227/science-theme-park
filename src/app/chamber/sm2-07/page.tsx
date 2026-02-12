"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useCallback } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import CoordinateCanvas2D from "@/components/chamber/sm2-07/CoordinateCanvas2D";

type Stage = "DISTANCE" | "MIDPOINT" | "SLOPE";
type S207T = typeof translations.EN.sm2_07;

interface S207Quest extends Quest {
  stage: Stage;
  point1: [number, number];
  point2: [number, number];
}

const round2 = (v: number) => Math.round(v * 100) / 100;

// Distance data
const distanceData = [
  { id: "D1", point1: [2, 3] as [number, number], point2: [6, 7] as [number, number] },
  { id: "D2", point1: [1, 2] as [number, number], point2: [4, 6] as [number, number] },
  { id: "D3", point1: [0, 0] as [number, number], point2: [3, 4] as [number, number] },
  { id: "D4", point1: [-2, 1] as [number, number], point2: [3, 5] as [number, number] },
  { id: "D5", point1: [5, 2] as [number, number], point2: [1, 5] as [number, number] },
  { id: "D6", point1: [-3, -1] as [number, number], point2: [2, 3] as [number, number] },
  { id: "D7", point1: [4, 7] as [number, number], point2: [1, 3] as [number, number] },
];

// Midpoint data
const midpointData = [
  { id: "M1", point1: [2, 4] as [number, number], point2: [6, 8] as [number, number] },
  { id: "M2", point1: [1, 3] as [number, number], point2: [5, 7] as [number, number] },
  { id: "M3", point1: [0, 0] as [number, number], point2: [4, 6] as [number, number] },
  { id: "M4", point1: [-2, 2] as [number, number], point2: [4, 6] as [number, number] },
  { id: "M5", point1: [3, 1] as [number, number], point2: [7, 9] as [number, number] },
  { id: "M6", point1: [-4, -2] as [number, number], point2: [2, 4] as [number, number] },
  { id: "M7", point1: [5, 3] as [number, number], point2: [1, 7] as [number, number] },
];

// Slope data
const slopeData = [
  { id: "S1", point1: [1, 2] as [number, number], point2: [3, 6] as [number, number] },
  { id: "S2", point1: [2, 1] as [number, number], point2: [4, 5] as [number, number] },
  { id: "S3", point1: [0, 0] as [number, number], point2: [2, 4] as [number, number] },
  { id: "S4", point1: [-1, 3] as [number, number], point2: [2, 9] as [number, number] },
  { id: "S5", point1: [3, 7] as [number, number], point2: [5, 3] as [number, number] },
  { id: "S6", point1: [-2, -1] as [number, number], point2: [1, 5] as [number, number] },
  { id: "S7", point1: [4, 2] as [number, number], point2: [6, 8] as [number, number] },
];

function buildStagePool(t: S207T, difficulty: Difficulty, stage: Stage): S207Quest[] {
  // --- DISTANCE STAGE ---
  if (stage === "DISTANCE") {
    // Elite: Find missing coordinate given distance (e.g. Find y if dist(A,B)=5)
    if (difficulty === "ELITE") {
      return [
        {
          id: "D-E1", difficulty, stage,
          point1: [0, 0], point2: [3, 4],
          promptLatex: "\\text{Distance } d=5 \\text{. Find } y \\text{ for } B(3,y) \\text{ (y>0)}.",
          expressionLatex: "A(0,0), B(3,y)",
          targetLatex: "y",
          slots: [{ id: "y", labelLatex: "y", placeholder: "?", expected: 4 }],
          correctLatex: "y=4"
        },
        {
          id: "D-E2", difficulty, stage,
          point1: [1, 1], point2: [6, 13],
          promptLatex: "\\text{Distance } d=13 \\text{. Find } x \\text{ for } B(x,13) \\text{ (x>1)}.",
          expressionLatex: "A(1,1), B(x,13)",
          targetLatex: "x",
          slots: [{ id: "x", labelLatex: "x", placeholder: "?", expected: 6 }],
          correctLatex: "x=6"
        }
      ];
    }

    // Standard Distance Calculation
    const all = distanceData.map((item) => {
      const [x1, y1] = item.point1;
      const [x2, y2] = item.point2;
      const distance = round2(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));

      return {
        id: item.id,
        difficulty,
        stage,
        point1: item.point1,
        point2: item.point2,
        promptLatex: t.stages.distance_prompt_latex,
        expressionLatex: `A(${x1},${y1}),\\; B(${x2},${y2})`,
        targetLatex: "d",
        slots: [{ id: "d", labelLatex: "d", placeholder: "distance", expected: distance }],
        correctLatex: `d=${distance}`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  // --- MIDPOINT STAGE ---
  if (stage === "MIDPOINT") {
    // Advanced & Elite: Reverse Midpoint (Find Endpoint given Midpoint)
    if (difficulty === "ADVANCED" || difficulty === "ELITE") {
      return midpointData.slice(0, 4).map(item => {
        const [x1, y1] = item.point1;
        const [x2, y2] = item.point2;
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;

        return {
          id: `M-REV-${item.id}`,
          difficulty,
          stage,
          point1: item.point1,
          point2: item.point2, // Canvas still shows B
          promptLatex: "\\text{M is midpoint. Find B(x,y).}",
          expressionLatex: `A(${x1},${y1}),\\; M(${mx},${my})`,
          targetLatex: "B(x,y)",
          slots: [
            { id: "bx", labelLatex: "x_B", placeholder: "x", expected: x2 },
            { id: "by", labelLatex: "y_B", placeholder: "y", expected: y2 }
          ],
          correctLatex: `B(${x2},${y2})`
        };
      });
    }

    // Standard Midpoint
    const all = midpointData.map((item) => {
      const [x1, y1] = item.point1;
      const [x2, y2] = item.point2;
      const mx = round2((x1 + x2) / 2);
      const my = round2((y1 + y2) / 2);

      return {
        id: item.id,
        difficulty,
        stage,
        point1: item.point1,
        point2: item.point2,
        promptLatex: t.stages.midpoint_prompt_latex,
        expressionLatex: `A(${x1},${y1}),\\; B(${x2},${y2})`,
        targetLatex: "M(x,y)",
        slots: [
          { id: "mx", labelLatex: "x", placeholder: "x", expected: mx },
          { id: "my", labelLatex: "y", placeholder: "y", expected: my },
        ],
        correctLatex: `M(${mx},${my})`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  // --- SLOPE STAGE ---
  // Elite: Collinearity (Find missing coord to match slope)
  if (difficulty === "ELITE") {
    return [
      {
        id: "S-E1", difficulty, stage,
        point1: [0, 0], point2: [2, 4],
        promptLatex: "\\text{Points A, B, C are collinear. Find y.}",
        expressionLatex: "A(0,0), B(1,2), C(2,y)",
        targetLatex: "y",
        slots: [{ id: "y", labelLatex: "y", placeholder: "?", expected: 4 }],
        correctLatex: "y=4"
      },
      {
        id: "S-E2", difficulty, stage,
        point1: [1, 3], point2: [5, 11], // m=2
        promptLatex: "\\text{Points A, B, C are collinear. Find x.}",
        expressionLatex: "A(1,3), B(3,7), C(x,11)",
        targetLatex: "x",
        slots: [{ id: "x", labelLatex: "x", placeholder: "?", expected: 5 }],
        correctLatex: "x=5"
      }
    ];
  }

  const all = slopeData.map((item) => {
    const [x1, y1] = item.point1;
    const [x2, y2] = item.point2;
    const slope = round2((y2 - y1) / (x2 - x1));

    return {
      id: item.id,
      difficulty,
      stage,
      point1: item.point1,
      point2: item.point2,
      promptLatex: t.stages.slope_prompt_latex,
      expressionLatex: `A(${x1},${y1}),\\; B(${x2},${y2})`,
      targetLatex: "m",
      slots: [{ id: "m", labelLatex: "m", placeholder: "slope", expected: slope }],
      correctLatex: `m=${slope}`,
    };
  });
  if (difficulty === "BASIC") return all.slice(0, 4);
  return all;
}

export default function S207Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].sm2_07;

  const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(t, d, s), [t]);

  const {
    difficulty,
    stage,
    inputs,
    lastCheck,
    currentQuest,
    successRate,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
  } = useQuestManager<S207Quest, Stage>({
    buildPool,
    initialStage: "DISTANCE",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sm2-07", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="SM2.07"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "DISTANCE", label: t.stages.distance },
        { id: "MIDPOINT", label: t.stages.midpoint },
        { id: "SLOPE", label: t.stages.slope },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      successRate={successRate}
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
          <CoordinateCanvas2D
            stage={stage}
            point1={currentQuest?.point1 || [2, 3]}
            point2={currentQuest?.point2 || [6, 7]}
            translations={currentLanguage === "CN" ? {
              distance_formula: "距离公式",
              midpoint_formula: "中点公式",
              slope_formula: "斜率公式",
              line_eq: "直线方程",
              hide_formula: "隐藏公式",
              show_formula: "显示公式"
            } : currentLanguage === "DE" ? {
              distance_formula: "Abstandsformel",
              midpoint_formula: "Mittelpunktsformel",
              slope_formula: "Steigungsformel",
              line_eq: "Geradengleichung",
              hide_formula: "Formel verbergen",
              show_formula: "Formel anzeigen"
            } : {
              distance_formula: "Distance Formula",
              midpoint_formula: "Midpoint Formula",
              slope_formula: "Slope Formula",
              line_eq: "Line Equation",
              hide_formula: "Hide Formula",
              show_formula: "Show Formula"
            }}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.target_title}</div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">{t.labels.hints}</div>
            <div className="text-white font-black text-lg">
              <InlineMath math={t.formulas[stage.toLowerCase() as keyof typeof t.formulas]} />
            </div>
            <div className="text-white/70 text-sm font-mono">
              <InlineMath math={currentQuest?.expressionLatex || ""} />
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono">{t.mission.description}</p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.objective_title}</h3>
          <p className="text-3xl text-white font-black italic whitespace-normal break-words">
            {(() => {
              const latex = currentQuest?.promptLatex || "";
              if (latex.includes("\\text{")) {
                return <span className="font-sans not-italic whitespace-pre-wrap">{latex.replace(/\\text\{/g, "").replace(/\}/g, "").replace(/\\\\/g, "\n").replace(/\\;/g, " ")}</span>;
              }
              return <InlineMath math={latex} />;
            })()}
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
            {currentLanguage === 'DE'
              ? "Tipp: Gib das Resultat auf 2 Dezimalstellen gerundet an."
              : currentLanguage === 'CN'
                ? "提示：保留 2 位小数。"
                : "Tip: Enter result rounded to 2 decimal places."
            }
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
