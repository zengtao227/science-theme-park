"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useCallback } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import CoordinateCanvas2D from "@/components/chamber/sm2-07/CoordinateCanvas2D";

type Stage = "DISTANCE" | "MIDPOINT" | "SLOPE";

interface S207Quest extends Quest {
  stage: Stage;
  point1: [number, number];
  point2: [number, number];
  promptKey?: string;   // For dynamic localization
  promptParams?: any;   // For dynamic localization
}

const round2 = (v: number) => Math.round(v * 100) / 100;

// Helper: Get Localized Prompt (Now used exclusively in the render phase for dynamic questions)
const getLocalizedPrompt = (t: any, key: string, params: any = {}) => {
  const prompt = t(`sm2_07.dynamic_prompts.${key.toLowerCase()}`, params);
  return `\\\\text{${prompt}}`;
};

function buildStagePool(t: any, difficulty: Difficulty, stage: Stage): S207Quest[] {
  // --- DISTANCE STAGE ---
  if (stage === "DISTANCE") {
    if (difficulty === "ELITE") {
      return [
        {
          id: "D-E1", difficulty, stage, point1: [0, 0], point2: [3, 4],
          promptKey: 'DIST_REV_Y', promptParams: { d: 5 },
          promptLatex: "",
          expressionLatex: "A(0,0), B(3,y)",
          targetLatex: "y",
          slots: [{ id: "y", labelLatex: "y", placeholder: "?", expected: 4 }],
          correctLatex: "y=4"
        },
        {
          id: "D-E2", difficulty, stage, point1: [1, 1], point2: [4, 5],
          promptKey: 'DIST_REV_X', promptParams: { d: 5 },
          promptLatex: "",
          expressionLatex: "A(1,1), B(x,5)",
          targetLatex: "x",
          slots: [{ id: "x", labelLatex: "x", placeholder: "?", expected: 4 }],
          correctLatex: "x=4"
        },
        {
          id: "D-E3", difficulty, stage, point1: [0, 0], point2: [5, 12],
          promptKey: 'DIST_REV_Y', promptParams: { d: 13 },
          promptLatex: "",
          expressionLatex: "A(0,0), B(5,y)",
          targetLatex: "y",
          slots: [{ id: "y", labelLatex: "y", placeholder: "?", expected: 12 }],
          correctLatex: "y=12"
        },
        {
          id: "D-E4", difficulty, stage, point1: [2, 1], point2: [10, 7],
          promptKey: 'DIST_REV_X', promptParams: { d: 10 },
          promptLatex: "",
          expressionLatex: "A(2,1), B(x,7)",
          targetLatex: "x",
          slots: [{ id: "x", labelLatex: "x", placeholder: "?", expected: 10 }],
          correctLatex: "x=10"
        },
        {
          id: "D-E5", difficulty, stage, point1: [-1, -1], point2: [2, 3],
          promptKey: 'DIST_REV_Y', promptParams: { d: 5 },
          promptLatex: "",
          expressionLatex: "A(-1,-1), B(2,y)",
          targetLatex: "y",
          slots: [{ id: "y", labelLatex: "y", placeholder: "?", expected: 3 }],
          correctLatex: "y=3"
        }
      ];
    }

    let pool: { id: string, point1: [number, number], point2: [number, number] }[] = [];
    if (difficulty === "BASIC") {
      pool = [
        { id: "D1", point1: [0, 0], point2: [3, 4] },
        { id: "D2", point1: [1, 1], point2: [4, 5] },
        { id: "D3", point1: [2, 0], point2: [8, 8] },
        { id: "D4", point1: [5, 5], point2: [5, 10] },
        { id: "D5", point1: [0, 0], point2: [6, 8] }
      ];
    } else if (difficulty === "CORE") {
      pool = [
        { id: "D-C1", point1: [-1, -1], point2: [2, 3] },
        { id: "D-C2", point1: [-2, 5], point2: [4, -3] },
        { id: "D-C3", point1: [0, -5], point2: [-7, 0] },
        { id: "D-C4", point1: [-3, -4], point2: [3, 4] },
        { id: "D-C5", point1: [-4, 2], point2: [2, -6] }
      ];
    } else {
      pool = [
        { id: "D-A1", point1: [-5, -5], point2: [7, 0] },
        { id: "D-A2", point1: [6, 8], point2: [2, -4] },
        { id: "D-A3", point1: [-6, 2], point2: [5, 8] },
        { id: "D-A4", point1: [-7, -7], point2: [-2, 5] },
        { id: "D-A5", point1: [-8, -3], point2: [4, 6] }
      ];
    }

    return pool.map((item) => {
      const [x1, y1] = item.point1;
      const [x2, y2] = item.point2;
      const distance = round2(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));

      return {
        id: item.id,
        difficulty,
        stage,
        point1: item.point1,
        point2: item.point2,
        promptLatex: `\\\\text{${t.stages.distance_prompt_latex}}`,
        expressionLatex: `A(${x1}, ${y1}), \\\\; B(${x2}, ${y2})`,
        targetLatex: `d`,
        slots: [{ id: "d", labelLatex: "d", placeholder: "distance", expected: distance }],
        correctLatex: `d=${distance}`,
      };
    });
  }

  // --- MIDPOINT STAGE ---
  if (stage === "MIDPOINT") {
    if (difficulty === "ADVANCED" || difficulty === "ELITE") {
      const reversePool = [
        { id: "M-R1", A: [2, 2], M: [5, 5], B: [8, 8] },
        { id: "M-R2", A: [0, 0], M: [-3, 4], B: [-6, 8] },
        { id: "M-R3", A: [-2, -1], M: [1, 2], B: [4, 5] },
        { id: "M-R4", A: [4, -2], M: [2, 1], B: [0, 4] },
        { id: "M-R5", A: [3, 7], M: [1, 3], B: [-1, -1] }
      ];

      return reversePool.map(item => ({
        id: item.id,
        difficulty,
        stage,
        point1: item.A as [number, number],
        point2: item.B as [number, number],
        promptKey: 'MID_REV',
        promptLatex: "",
        expressionLatex: `A(${item.A[0]},${item.A[1]}),\\; M(${item.M[0]},${item.M[1]})`,
        targetLatex: "B(x,y)",
        slots: [
          { id: "bx", labelLatex: "x_B", placeholder: "x", expected: item.B[0] },
          { id: "by", labelLatex: "y_B", placeholder: "y", expected: item.B[1] }
        ],
        correctLatex: `B(${item.B[0]},${item.B[1]})`
      }));
    }

    let pool: { id: string, point1: [number, number], point2: [number, number] }[] = [];
    if (difficulty === "BASIC") {
      pool = [
        { id: "M-B1", point1: [2, 2], point2: [6, 6] },
        { id: "M-B2", point1: [0, 0], point2: [4, 8] },
        { id: "M-B3", point1: [1, 3], point2: [5, 1] },
        { id: "M-B4", point1: [8, 2], point2: [2, 8] },
        { id: "M-B5", point1: [4, 4], point2: [10, 10] }
      ];
    } else {
      pool = [
        { id: "M-C1", point1: [-2, -4], point2: [2, 4] },
        { id: "M-C2", point1: [-5, 2], point2: [1, -6] },
        { id: "M-C3", point1: [-7, -7], point2: [-2, -2] },
        { id: "M-C4", point1: [3, -5], point2: [-3, 5] },
        { id: "M-C5", point1: [-6, 3], point2: [4, -7] }
      ];
    }

    return pool.map((item) => {
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
        promptLatex: `\\\\text{${t.stages.midpoint_prompt_latex}}`,
        expressionLatex: `A(${x1}, ${y1}), \\\\; B(${x2}, ${y2})`,
        targetLatex: `M(x, y)`,
        slots: [
          { id: "mx", labelLatex: "x", placeholder: "x", expected: mx },
          { id: "my", labelLatex: "y", placeholder: "y", expected: my },
        ],
        correctLatex: `M(${mx},${my})`,
      };
    });
  }

  // --- SLOPE STAGE ---
  if (stage === "SLOPE") {
    if (difficulty === "ELITE") {
      return [
        {
          id: "S-E1", difficulty, stage, point1: [0, 0], point2: [2, 4],
          promptKey: 'COLLINEAR', promptParams: { target: 'y' },
          promptLatex: "",
          expressionLatex: "A(0,0), B(1,2), C(2,y)",
          targetLatex: "y",
          slots: [{ id: "y", labelLatex: "y", placeholder: "?", expected: 4 }],
          correctLatex: "y=4"
        },
        {
          id: "S-E2", difficulty, stage, point1: [1, 3], point2: [5, 11],
          promptKey: 'COLLINEAR', promptParams: { target: 'x' },
          promptLatex: "",
          expressionLatex: "A(1,3), B(3,7), C(x,11)",
          targetLatex: "x",
          slots: [{ id: "x", labelLatex: "x", placeholder: "?", expected: 5 }],
          correctLatex: "x=5"
        },
        {
          id: "S-E3", difficulty, stage, point1: [2, 1], point2: [6, 9],
          promptKey: 'COLLINEAR', promptParams: { target: 'y' },
          promptLatex: "",
          expressionLatex: "A(2,1), B(4,5), C(6,y)",
          targetLatex: "y",
          slots: [{ id: "y", labelLatex: "y", placeholder: "?", expected: 9 }],
          correctLatex: "y=9"
        },
        {
          id: "S-E4", difficulty, stage, point1: [-1, -2], point2: [3, 6],
          promptKey: 'COLLINEAR', promptParams: { target: 'x' },
          promptLatex: "",
          expressionLatex: "A(-1,-2), B(1,2), C(x,6)",
          targetLatex: "x",
          slots: [{ id: "x", labelLatex: "x", placeholder: "?", expected: 3 }],
          correctLatex: "x=3"
        },
        {
          id: "S-E5", difficulty, stage, point1: [0, 3], point2: [4, 7],
          promptKey: 'COLLINEAR', promptParams: { target: 'y' },
          promptLatex: "",
          expressionLatex: "A(0,3), B(2,5), C(4,y)",
          targetLatex: "y",
          slots: [{ id: "y", labelLatex: "y", placeholder: "?", expected: 7 }],
          correctLatex: "y=7"
        }
      ];
    }

    let pool: { id: string, point1: [number, number], point2: [number, number] }[] = [];
    if (difficulty === "BASIC") {
      pool = [
        { id: "S-B1", point1: [1, 1], point2: [2, 2] },
        { id: "S-B2", point1: [1, 1], point2: [2, 3] },
        { id: "S-B3", point1: [0, 0], point2: [3, 1] },
        { id: "S-B4", point1: [2, 5], point2: [4, 5] },
        { id: "S-B5", point1: [0, 2], point2: [4, 6] }
      ];
    } else if (difficulty === "CORE") {
      pool = [
        { id: "S-C1", point1: [-1, 1], point2: [1, -1] },
        { id: "S-C2", point1: [-2, -2], point2: [2, 4] },
        { id: "S-C3", point1: [-5, 5], point2: [5, -5] },
        { id: "S-C4", point1: [2, -3], point2: [-2, 3] },
        { id: "S-C5", point1: [-3, 4], point2: [3, -2] }
      ];
    } else {
      pool = [
        { id: "S-A1", point1: [-7, -4], point2: [5, 8] },
        { id: "S-A2", point1: [-4, 2], point2: [2, -3] },
        { id: "S-A3", point1: [-6, -3], point2: [4, 7] },
        { id: "S-A4", point1: [3, -7], point2: [-3, 5] },
        { id: "S-A5", point1: [-8, 6], point2: [4, -6] }
      ];
    }

    return pool.map((item) => {
      const [x1, y1] = item.point1;
      const [x2, y2] = item.point2;
      const slope = round2((y2 - y1) / (x2 - x1));

      return {
        id: item.id,
        difficulty,
        stage,
        point1: item.point1,
        point2: item.point2,
        promptLatex: `\\\\text{${t.stages.slope_prompt_latex}}`,
        expressionLatex: `A(${x1}, ${y1}), \\\\; B(${x2}, ${y2})`,
        targetLatex: `m`,
        slots: [{ id: "m", labelLatex: "m", placeholder: "slope", expected: slope }],
        correctLatex: `m=${slope}`,
      };
    });
  }

  return [];
}

export default function S207Page() {
  const { completeStage } = useAppStore();
  const { t, currentLanguage } = useLanguage();

  const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(t("sm2_07"), d, s), [t]);

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
    adaptiveRecommendation,
    aiFeedback,
    isRequestingAi,
    requestAiFeedback
  } = useQuestManager<S207Quest, Stage>({
    moduleCode: "sm2-07",
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
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("sm2_07.title")}
      moduleCode="SM2.07"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "DISTANCE", label: t("sm2_07.stages.distance") },
        { id: "MIDPOINT", label: t("sm2_07.stages.midpoint") },
        { id: "SLOPE", label: t("sm2_07.stages.slope") },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      successRate={successRate}
      checkStatus={lastCheck}
      footerLeft={t("sm2_07.footer_left")}
      monitorContent={
        <div className="space-y-4">
          <CoordinateCanvas2D
            stage={stage}
            point1={currentQuest?.point1 || [2, 3]}
            point2={currentQuest?.point2 || [6, 7]}
            translations={t("sm2_07.canvas_translations")}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t("sm2_07.target_title")}</div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">{t("sm2_07.labels.hints")}</div>
            <div className="text-white font-black text-lg">
              <InlineMath math={t(`sm2_07.formulas.${stage.toLowerCase()}`)} />
            </div>
            <div className="text-white/70 text-sm font-mono">
              <InlineMath math={currentQuest?.expressionLatex || ""} />
            </div>
          </div>
        </div>
      }
      translations={{
        back: t("sm2_07.back"),
        check: t("sm2_07.check"),
        next: t("sm2_07.next"),
        correct: t("sm2_07.correct"),
        incorrect: t("sm2_07.incorrect"),
        ready: t("sm2_07.ready"),
        monitor_title: t("sm2_07.monitor_title"),
        difficulty: t("sm2_07.difficulty")
      }}
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{t("sm2_07.mission.title")}</h3>
          <p className="text-base text-white/70 font-mono">{t("sm2_07.mission.description")}</p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t("sm2_07.objective_title")}</h3>
          <p className="text-3xl text-white font-black italic whitespace-normal break-words">
            {(() => {
              // DYNAMIC LOCALIZATION LOGIC
              let latex = currentQuest?.promptLatex || "";

              // If this is a new question type with a promptKey, get the localized version NOW
              if (currentQuest?.promptKey) {
                latex = getLocalizedPrompt(t, currentQuest.promptKey, currentQuest.promptParams);
              }

              if (latex.startsWith("\\\\text{") && latex.endsWith("}")) {
                const clean = latex.replace(/^\\\\text\{/, "").replace(/\}$/, "");
                return <span className="font-sans font-black not-italic whitespace-pre-wrap">{clean.replace(/\\\\n/g, "\n")}</span>;
              }
              if (!latex.includes("\\\\") && !latex.includes("$")) {
                return <span className="font-sans font-black not-italic whitespace-pre-wrap">{latex}</span>;
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
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-white/90 font-mono italic text-center">
            {t("sm2_07.input_tip_2dp")}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
