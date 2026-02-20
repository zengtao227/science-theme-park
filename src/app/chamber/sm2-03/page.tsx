"use client";

import { useEffect, useState, useCallback } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import LaserCanvas from "@/components/chamber/sm2-03/LaserCanvas";

type Stage = "LEVEL1" | "LEVEL2" | "LEVEL3";

interface S203Quest extends Quest {
  stage: Stage;
  m1: number;
  c1: number;
  m2?: number;
  c2?: number;
  targetX?: number;
  targetY?: number;
  mode: "CALCULATE" | "INTERSECT" | "OPTIMIZE";
}

/* ────────────────────────────────────────────────
 *  Helper functions
 * ──────────────────────────────────────────────── */

function r2(n: number) { return Math.round(n * 100) / 100; }

/* ────────────────────────────────────────────────
 *  Structured Data - forEach + Structured Data Pattern
 *  Standard naming: QUESTION_DATA with Record<Stage, Record<Difficulty, DataType[]>>
 * ──────────────────────────────────────────────── */

// Type for question data
type QuestionData = 
  | { id: string; m: number; c: number; x: number; type: "CALCULATE" }
  | { id: string; m1: number; c1: number; m2: number; c2: number; type: "INTERSECT" }
  | { id: string; m1: number; c1: number; m2: number; c2: number; type: "OPTIMIZE" };

// All question data organized by Stage and Difficulty
const QUESTION_DATA: Record<Stage, Record<Difficulty, QuestionData[]>> = {
  LEVEL1: {
    BASIC: [
      { id: "B1", m: 2, c: 0, x: 5, type: "CALCULATE" },    // y=10
      { id: "B2", m: 3, c: 0, x: 4, type: "CALCULATE" },    // y=12
      { id: "B3", m: 1, c: 5, x: 10, type: "CALCULATE" },   // y=15
      { id: "B4", m: 4, c: 0, x: 3, type: "CALCULATE" },    // y=12
      { id: "B5", m: 2, c: 3, x: 6, type: "CALCULATE" },    // y=15
    ],
    CORE: [
      { id: "C1", m: 1.5, c: 3, x: 8, type: "CALCULATE" },  // y=15
      { id: "C2", m: 0.5, c: 4, x: 12, type: "CALCULATE" }, // y=10
      { id: "C3", m: 2.5, c: 2, x: 6, type: "CALCULATE" },  // y=17
      { id: "C4", m: 1.2, c: 5, x: 10, type: "CALCULATE" }, // y=17
      { id: "C5", m: 0.8, c: 6, x: 15, type: "CALCULATE" }, // y=18
    ],
    ADVANCED: [
      { id: "A1", m: 0.75, c: 5, x: 12, type: "CALCULATE" },   // y=14
      { id: "A2", m: 1.25, c: 3.5, x: 10, type: "CALCULATE" }, // y=16
      { id: "A3", m: 0.35, c: 8, x: 20, type: "CALCULATE" },   // y=15
      { id: "A4", m: 0.65, c: 7, x: 18, type: "CALCULATE" },   // y=18.7
      { id: "A5", m: 1.35, c: 4.5, x: 14, type: "CALCULATE" }, // y=23.4
    ],
    ELITE: [
      { id: "E1", m: 0.85, c: 6.5, x: 14, type: "CALCULATE" },  // y=18.4
      { id: "E2", m: 1.15, c: 2.75, x: 12, type: "CALCULATE" }, // y=16.55
      { id: "E3", m: 0.45, c: 11.5, x: 18, type: "CALCULATE" }, // y=19.6
      { id: "E4", m: 0.95, c: 8.25, x: 16, type: "CALCULATE" }, // y=23.45
      { id: "E5", m: 1.25, c: 5.5, x: 15, type: "CALCULATE" },  // y=24.25
    ],
  },
  LEVEL2: {
    BASIC: [
      { id: "B1", m1: 3, c1: 0, m2: 1, c2: 10, type: "INTERSECT" },  // x=5
      { id: "B2", m1: 4, c1: 0, m2: 1, c2: 12, type: "INTERSECT" },  // x=4
      { id: "B3", m1: 2, c1: 0, m2: 1, c2: 8, type: "INTERSECT" },   // x=8
      { id: "B4", m1: 5, c1: 0, m2: 2, c2: 12, type: "INTERSECT" },  // x=4
      { id: "B5", m1: 3, c1: 0, m2: 2, c2: 6, type: "INTERSECT" },   // x=6
    ],
    CORE: [
      { id: "C1", m1: 2, c1: 0, m2: 0.5, c2: 15, type: "INTERSECT" },   // x=10
      { id: "C2", m1: 2.5, c1: 0, m2: 1, c2: 12, type: "INTERSECT" },   // x=8
      { id: "C3", m1: 3, c1: 2, m2: 1, c2: 12, type: "INTERSECT" },     // x=5
      { id: "C4", m1: 1.5, c1: 0, m2: 0.5, c2: 10, type: "INTERSECT" }, // x=10
      { id: "C5", m1: 2.8, c1: 1, m2: 1.2, c2: 11, type: "INTERSECT" }, // x=6.25
    ],
    ADVANCED: [
      { id: "A1", m1: 1.5, c1: 2, m2: 0.5, c2: 8, type: "INTERSECT" },   // x=6
      { id: "A2", m1: 2.5, c1: 1, m2: 0.5, c2: 9, type: "INTERSECT" },   // x=4
      { id: "A3", m1: 1.8, c1: 3, m2: 0.6, c2: 18, type: "INTERSECT" },  // x=12.5
      { id: "A4", m1: 2.2, c1: 2.5, m2: 0.8, c2: 12, type: "INTERSECT" }, // x=6.79
      { id: "A5", m1: 1.6, c1: 4, m2: 0.4, c2: 16, type: "INTERSECT" },  // x=10
    ],
    ELITE: [
      { id: "E1", m1: 2.4, c1: 1.5, m2: 0.9, c2: 12, type: "INTERSECT" },    // x=7
      { id: "E2", m1: 3.5, c1: 0, m2: 1.25, c2: 13.5, type: "INTERSECT" },   // x=6
      { id: "E3", m1: 1.75, c1: 4.5, m2: 0.5, c2: 20, type: "INTERSECT" },   // x=12.4
      { id: "E4", m1: 2.8, c1: 2.25, m2: 1.1, c2: 15, type: "INTERSECT" },   // x=7.5
      { id: "E5", m1: 3.2, c1: 1.8, m2: 1.5, c2: 18.5, type: "INTERSECT" },  // x=9.82
    ],
  },
  LEVEL3: {
    BASIC: [
      { id: "B1", m1: 1, c1: 10, m2: 3, c2: 0, type: "OPTIMIZE" },  // x=5
      { id: "B2", m1: 1, c1: 8, m2: 3, c2: 0, type: "OPTIMIZE" },   // x=4
      { id: "B3", m1: 1, c1: 12, m2: 4, c2: 0, type: "OPTIMIZE" },  // x=4
      { id: "B4", m1: 2, c1: 10, m2: 4, c2: 0, type: "OPTIMIZE" },  // x=5
      { id: "B5", m1: 1, c1: 15, m2: 4, c2: 0, type: "OPTIMIZE" },  // x=5
    ],
    CORE: [
      { id: "C1", m1: 0.5, c1: 15, m2: 2, c2: 0, type: "OPTIMIZE" },   // x=10
      { id: "C2", m1: 1, c1: 12, m2: 2.5, c2: 0, type: "OPTIMIZE" },   // x=8
      { id: "C3", m1: 0.8, c1: 14, m2: 2.2, c2: 0, type: "OPTIMIZE" }, // x=10
      { id: "C4", m1: 1.2, c1: 16, m2: 3, c2: 0, type: "OPTIMIZE" },   // x=8.89
      { id: "C5", m1: 0.6, c1: 18, m2: 2.4, c2: 0, type: "OPTIMIZE" }, // x=10
    ],
    ADVANCED: [
      { id: "A1", m1: 0.5, c1: 12, m2: 1.5, c2: 2, type: "OPTIMIZE" },  // x=10
      { id: "A2", m1: 0.8, c1: 15, m2: 2, c2: 3, type: "OPTIMIZE" },    // x=10
      { id: "A3", m1: 0.6, c1: 16, m2: 1.8, c2: 4, type: "OPTIMIZE" },  // x=10
      { id: "A4", m1: 0.7, c1: 18, m2: 2.1, c2: 5, type: "OPTIMIZE" },  // x=9.29
      { id: "A5", m1: 0.4, c1: 20, m2: 1.6, c2: 6, type: "OPTIMIZE" },  // x=11.67
    ],
    ELITE: [
      { id: "E1", m1: 0.2, c1: 18, m2: 1.4, c2: 3, type: "OPTIMIZE" },     // x=12.5
      { id: "E2", m1: 0.35, c1: 20, m2: 1.6, c2: 2.5, type: "OPTIMIZE" },  // x=14
      { id: "E3", m1: 0.25, c1: 22, m2: 1.5, c2: 4, type: "OPTIMIZE" },    // x=14.4
      { id: "E4", m1: 0.3, c1: 24, m2: 1.7, c2: 5, type: "OPTIMIZE" },     // x=13.57
      { id: "E5", m1: 0.15, c1: 25, m2: 1.35, c2: 3.5, type: "OPTIMIZE" }, // x=17.92
    ],
  },
};

/* ────────────────────────────────────────────────
 *  Build quest pool — forEach + Structured Data
 * ──────────────────────────────────────────────── */

function buildStagePool(t: any, difficulty: Difficulty, stage: Stage): S203Quest[] {
  const quests: S203Quest[] = [];

  // Get data for the current stage and difficulty
  const dataList = QUESTION_DATA[stage]?.[difficulty] || [];

  if (stage === "LEVEL1") {
    // ── Calculate y = m·x + c ──
    dataList.forEach((data) => {
      if (data.type !== "CALCULATE") return;
      const y = r2(data.m * data.x + data.c);
      quests.push({
        id: `S1|${data.id}`,
        difficulty,
        stage,
        mode: "CALCULATE",
        m1: data.m,
        c1: data.c,
        targetX: data.x,
        targetY: y,
        promptLatex: t.prompts.level1 || "Calculate the ticket price for the given destination",
        expressionLatex: `Plan: y = ${data.m}x + ${data.c}    |    x = ${data.x} km`,
        targetLatex: "y",
        correctLatex: `y=${y}`,
        slots: [{ id: "y", labelLatex: "y", placeholder: "Total Price (CHF)", expected: y }],
      });
    });
  } else if (stage === "LEVEL2") {
    // ── Break-even: m1·x + c1 = m2·x + c2 ──
    dataList.forEach((data) => {
      if (data.type !== "INTERSECT") return;
      const x = r2((data.c2 - data.c1) / (data.m1 - data.m2));
      const y = r2(data.m1 * x + data.c1);
      quests.push({
        id: `S2|${data.id}`,
        difficulty,
        stage,
        mode: "INTERSECT",
        m1: data.m1,
        c1: data.c1,
        m2: data.m2,
        c2: data.c2,
        targetX: x,
        targetY: y,
        promptLatex: t.prompts.level2 || "Find the distance where two fare plans cost the same",
        expressionLatex: `Plan A: y = ${data.m1}x + ${data.c1}    |    Plan B: y = ${data.m2}x + ${data.c2}`,
        targetLatex: "x",
        correctLatex: `x=${x}`,
        slots: [{ id: "x", labelLatex: "x", placeholder: "Distance (km)", expected: x }],
      });
    });
  } else {
    // ── LEVEL3: Threshold (Plan A cheaper when x > ?) ──
    dataList.forEach((data) => {
      if (data.type !== "OPTIMIZE") return;
      const x = r2((data.c1 - data.c2) / (data.m2 - data.m1));
      const y = r2(data.m1 * x + data.c1);
      quests.push({
        id: `S3|${data.id}`,
        difficulty,
        stage: "LEVEL3",
        mode: "OPTIMIZE",
        m1: data.m1,
        c1: data.c1,
        m2: data.m2,
        c2: data.c2,
        targetX: x,
        targetY: y,
        promptLatex: t.prompts.level3 || "Find the threshold distance where Plan A becomes cheaper",
        expressionLatex: `Plan A: y = ${data.m1}x + ${data.c1}    |    Plan B: y = ${data.m2}x + ${data.c2}`,
        targetLatex: "x",
        correctLatex: `x=${x}`,
        slots: [{ id: "x", labelLatex: "x", placeholder: "Threshold (km)", expected: x }],
      });
    });
  }

  return quests;
}

export default function S203Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();
  
  const sm2_03_t = {
    title: t("sm2_03.title"),
    back: t("sm2_03.back"),
    check: t("sm2_03.check"),
    next: t("sm2_03.next"),
    correct: t("sm2_03.correct"),
    incorrect: t("sm2_03.incorrect"),
    ready: t("sm2_03.ready"),
    monitor_title: t("sm2_03.monitor_title"),
    target_title: t("sm2_03.target_title"),
    objective_title: t("sm2_03.objective_title"),
    footer_left: t("sm2_03.footer_left"),
    difficulty: {
      basic: t("sm2_03.difficulty.basic"),
      core: t("sm2_03.difficulty.core"),
      advanced: t("sm2_03.difficulty.advanced"),
      elite: t("sm2_03.difficulty.elite"),
    },
    stages: {
      level1: t("sm2_03.stages.level1"),
      level2: t("sm2_03.stages.level2"),
      level3: t("sm2_03.stages.level3"),
    },
    prompts: {
      level1: t("sm2_03.prompts.level1"),
      level2: t("sm2_03.prompts.level2"),
      level3: t("sm2_03.prompts.level3"),
    },
    labels: {
      hints: t("sm2_03.labels.hints"),
    },
    hints: {
      level1: t("sm2_03.hints.level1"),
      level2: t("sm2_03.hints.level2"),
      level3: t("sm2_03.hints.level3"),
      drag: t("sm2_03.hints.drag"),
    },
    mission: {
      title: t("sm2_03.mission.title"),
      description: t("sm2_03.mission.description"),
    },
    ui: {
      current_function: t("sm2_03.ui.current_function"),
      reflections: t("sm2_03.ui.reflections"),
      target_position: t("sm2_03.ui.target_position"),
      hit_badge: t("sm2_03.ui.hit_badge"),
      chamber: t("sm2_03.ui.chamber"),
      laser_sim: t("sm2_03.ui.laser_sim"),
      level: t("sm2_03.ui.level"),
      hits: t("sm2_03.ui.hits"),
    },
  };

  const [hits, setHits] = useState(0);

  const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(sm2_03_t, d, s), [sm2_03_t]);

  const {
    difficulty, stage, inputs, lastCheck, currentQuest,
    setInputs, verify, next, handleDifficultyChange, handleStageChange,
    successRate,
    adaptiveRecommendation,
  } = useQuestManager<S203Quest, Stage>({
    moduleCode: "sm2-03",
    buildPool,
    initialStage: "LEVEL1",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sm2-03", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const level = stage === "LEVEL1" ? 1 : stage === "LEVEL2" ? 2 : 3;

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      title={sm2_03_t.title}
      moduleCode="SM2.03"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "LEVEL1", label: sm2_03_t.stages.level1 },
        { id: "LEVEL2", label: sm2_03_t.stages.level2 },
        { id: "LEVEL3", label: sm2_03_t.stages.level3 },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      successRate={successRate}
      footerLeft={sm2_03_t.footer_left}
      translations={{
        back: sm2_03_t.back,
        check: sm2_03_t.check,
        next: sm2_03_t.next,
        correct: sm2_03_t.correct,
        incorrect: sm2_03_t.incorrect,
        ready: sm2_03_t.ready,
        monitor_title: sm2_03_t.monitor_title,
        difficulty: {
          basic: sm2_03_t.difficulty.basic,
          core: sm2_03_t.difficulty.core,
          advanced: sm2_03_t.difficulty.advanced,
          elite: sm2_03_t.difficulty.elite,
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <LaserCanvas
            level={level}
            mode={currentQuest?.mode}
            m1={currentQuest?.m1 || 0}
            c1={currentQuest?.c1 || 0}
            m2={currentQuest?.m2}
            c2={currentQuest?.c2}
            targetX={currentQuest?.targetX}
            targetY={currentQuest?.targetY}
            onHit={() => setHits(h => h + 1)}
            labels={{
              current_function: sm2_03_t.ui.current_function,
              reflections: sm2_03_t.ui.reflections,
              target_position: sm2_03_t.ui.target_position,
              hit_badge: sm2_03_t.ui.hit_badge,
              chamber: sm2_03_t.ui.chamber,
              laser_sim: sm2_03_t.ui.laser_sim,
              level: sm2_03_t.ui.level
            }}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {sm2_03_t.target_title}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {sm2_03_t.labels.hints}
            </div>
            <div className="text-white/70 text-sm font-mono">
              {level === 1 && sm2_03_t.hints.level1}
              {level === 2 && sm2_03_t.hints.level2}
              {level === 3 && sm2_03_t.hints.level3}
            </div>
            <div className="text-white text-xs font-mono">
              {sm2_03_t.hints.drag}
            </div>
            <div className="text-white font-black text-lg">
              <InlineMath math="y = mx + c" />
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {sm2_03_t.objective_title}
          </h3>
          <div className="space-y-4">
            <p className="text-3xl text-white font-black whitespace-normal break-words">
              {currentQuest?.promptLatex || "Calculate the fare"}
            </p>
            {currentQuest?.expressionLatex && (
              <p className="text-xl text-neon-cyan font-mono whitespace-normal break-words">
                {currentQuest?.expressionLatex}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white/[0.04] border-l-4 border-neon-blue/50 rounded-r-xl p-6 max-w-3xl mx-auto backdrop-blur-sm">
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
              {sm2_03_t.mission.title}
            </h3>
            <p className="text-sm text-white/80 font-mono leading-relaxed">
              {sm2_03_t.mission.description}
            </p>
          </div>
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
                    type="number"
                    step="0.01"
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                    className="flex-1 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                    placeholder={slot.placeholder}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="text-[10px] text-white/90 font-mono italic">
              {sm2_03_t.ui.hits}: {hits}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
