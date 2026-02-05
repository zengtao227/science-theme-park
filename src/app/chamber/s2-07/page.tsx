"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import CoordinateCanvas from "@/components/chamber/s2-07/CoordinateCanvas";

type Stage = "DISTANCE" | "MIDPOINT" | "SLOPE";
type S207T = typeof translations.EN.s2_07;

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
  if (stage === "DISTANCE") {
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

  if (stage === "MIDPOINT") {
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

  // SLOPE
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
  const t = translations[currentLanguage].s2_07;

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
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "DISTANCE",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("s2-07", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="S2.07"
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
          <CoordinateCanvas
            stage={stage}
            point1={currentQuest?.point1 || [2, 3]}
            point2={currentQuest?.point2 || [6, 7]}
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
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                  <InlineMath math={slot.labelLatex} />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                    className="flex-1 bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
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
          <div className="text-[10px] text-white/40 font-mono italic text-center">
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
