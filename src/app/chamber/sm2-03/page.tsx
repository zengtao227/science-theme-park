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
 *  Quest factory helpers
 * ──────────────────────────────────────────────── */

function r2(n: number) { return Math.round(n * 100) / 100; }

function makeCalc(
  quests: S203Quest[], t: any, difficulty: Difficulty, stage: Stage,
  id: string, m: number, c: number, x: number,
) {
  const y = r2(m * x + c);
  quests.push({
    id: `S1|${id}`, difficulty, stage, mode: "CALCULATE",
    m1: m, c1: c, targetX: x, targetY: y,
    promptLatex: t.prompts.level1 || "Calculate the ticket price for the given destination",
    expressionLatex: `Plan: y = ${m}x + ${c}    |    x = ${x} km`,
    targetLatex: "y", correctLatex: `y=${y}`,
    slots: [{ id: "y", labelLatex: "y", placeholder: "Total Price (CHF)", expected: y }],
  });
}

function makeIntersect(
  quests: S203Quest[], t: any, difficulty: Difficulty, stage: Stage,
  id: string, m1: number, c1: number, m2: number, c2: number,
) {
  const x = r2((c2 - c1) / (m1 - m2));
  const y = r2(m1 * x + c1);
  quests.push({
    id: `S2|${id}`, difficulty, stage, mode: "INTERSECT",
    m1, c1, m2, c2, targetX: x, targetY: y,
    promptLatex: t.prompts.level2 || "Find the distance where two fare plans cost the same",
    expressionLatex: `Plan A: y = ${m1}x + ${c1}    |    Plan B: y = ${m2}x + ${c2}`,
    targetLatex: "x", correctLatex: `x=${x}`,
    slots: [{ id: "x", labelLatex: "x", placeholder: "Distance (km)", expected: x }],
  });
}

function makeOptimize(
  quests: S203Quest[], t: any, difficulty: Difficulty, stage: Stage,
  id: string, m1: number, c1: number, m2: number, c2: number,
) {
  // Plan A: low slope, high base  |  Plan B: high slope, low base
  // Plan A cheaper when x > threshold
  const x = r2((c1 - c2) / (m2 - m1));
  const y = r2(m1 * x + c1);
  quests.push({
    id: `S3|${id}`, difficulty, stage: "LEVEL3", mode: "OPTIMIZE",
    m1, c1, m2, c2, targetX: x, targetY: y,
    promptLatex: t.prompts.level3 || "Find the threshold distance where Plan A becomes cheaper",
    expressionLatex: `Plan A: y = ${m1}x + ${c1}    |    Plan B: y = ${m2}x + ${c2}`,
    targetLatex: "x",
    correctLatex: `x=${x}`,
    slots: [{ id: "x", labelLatex: "x", placeholder: "Threshold (km)", expected: x }],
  });
}

/* ────────────────────────────────────────────────
 *  Build quest pool — 4 difficulty tiers per level
 * ──────────────────────────────────────────────── */

function buildStagePool(t: any, difficulty: Difficulty, stage: Stage): S203Quest[] {
  const q: S203Quest[] = [];

  if (stage === "LEVEL1") {
    // ── Calculate y = m·x + c ──
    switch (difficulty) {
      case "BASIC":
        // Whole numbers, simple mental math
        makeCalc(q, t, difficulty, stage, "B1", 2, 0, 5);    // y=10
        makeCalc(q, t, difficulty, stage, "B2", 3, 0, 4);    // y=12
        makeCalc(q, t, difficulty, stage, "B3", 1, 5, 10);   // y=15
        makeCalc(q, t, difficulty, stage, "B4", 4, 0, 3);    // y=12
        makeCalc(q, t, difficulty, stage, "B5", 2, 3, 6);    // y=15
        break;
      case "CORE":
        // One decimal in slope
        makeCalc(q, t, difficulty, stage, "C1", 1.5, 3, 8);  // y=15
        makeCalc(q, t, difficulty, stage, "C2", 0.5, 4, 12); // y=10
        makeCalc(q, t, difficulty, stage, "C3", 2.5, 2, 6);  // y=17
        makeCalc(q, t, difficulty, stage, "C4", 1.2, 5, 10); // y=17
        makeCalc(q, t, difficulty, stage, "C5", 0.8, 6, 15); // y=18
        break;
      case "ADVANCED":
        // Two-decimal slope, larger intercept
        makeCalc(q, t, difficulty, stage, "A1", 0.75, 5, 12);  // y=14
        makeCalc(q, t, difficulty, stage, "A2", 1.25, 3.5, 10); // y=16
        makeCalc(q, t, difficulty, stage, "A3", 0.35, 8, 20);  // y=15
        makeCalc(q, t, difficulty, stage, "A4", 0.65, 7, 18);  // y=18.7
        makeCalc(q, t, difficulty, stage, "A5", 1.35, 4.5, 14); // y=23.4
        break;
      default: // ELITE
        // Hard decimals, requires careful calculation
        makeCalc(q, t, difficulty, stage, "E1", 0.85, 6.5, 14); // y=18.4
        makeCalc(q, t, difficulty, stage, "E2", 1.15, 2.75, 12); // y=16.55
        makeCalc(q, t, difficulty, stage, "E3", 0.45, 11.5, 18); // y=19.6
        makeCalc(q, t, difficulty, stage, "E4", 0.95, 8.25, 16); // y=23.45
        makeCalc(q, t, difficulty, stage, "E5", 1.25, 5.5, 15); // y=24.25
        break;
    }
  } else if (stage === "LEVEL2") {
    // ── Break-even: m1·x + c1 = m2·x + c2 ──
    switch (difficulty) {
      case "BASIC":
        // Integer answers, one plan has c=0
        makeIntersect(q, t, difficulty, stage, "B1", 3, 0, 1, 10);  // x=5
        makeIntersect(q, t, difficulty, stage, "B2", 4, 0, 1, 12);  // x=4
        makeIntersect(q, t, difficulty, stage, "B3", 2, 0, 1, 8);   // x=8
        makeIntersect(q, t, difficulty, stage, "B4", 5, 0, 2, 12);  // x=4
        makeIntersect(q, t, difficulty, stage, "B5", 3, 0, 2, 6);   // x=6
        break;
      case "CORE":
        // One decimal slope, integer answer
        makeIntersect(q, t, difficulty, stage, "C1", 2, 0, 0.5, 15);   // x=10
        makeIntersect(q, t, difficulty, stage, "C2", 2.5, 0, 1, 12);   // x=8
        makeIntersect(q, t, difficulty, stage, "C3", 3, 2, 1, 12);     // x=5
        makeIntersect(q, t, difficulty, stage, "C4", 1.5, 0, 0.5, 10);  // x=10
        makeIntersect(q, t, difficulty, stage, "C5", 2.8, 1, 1.2, 11);  // x=6.25
        break;
      case "ADVANCED":
        // Both plans have intercepts
        makeIntersect(q, t, difficulty, stage, "A1", 1.5, 2, 0.5, 8);   // x=6
        makeIntersect(q, t, difficulty, stage, "A2", 2.5, 1, 0.5, 9);   // x=4
        makeIntersect(q, t, difficulty, stage, "A3", 1.8, 3, 0.6, 18);  // x=12.5
        makeIntersect(q, t, difficulty, stage, "A4", 2.2, 2.5, 0.8, 12); // x=6.79
        makeIntersect(q, t, difficulty, stage, "A5", 1.6, 4, 0.4, 16);  // x=10
        break;
      default: // ELITE
        // Non-integer answers
        makeIntersect(q, t, difficulty, stage, "E1", 2.4, 1.5, 0.9, 12);    // x=7
        makeIntersect(q, t, difficulty, stage, "E2", 3.5, 0, 1.25, 13.5);   // x=6
        makeIntersect(q, t, difficulty, stage, "E3", 1.75, 4.5, 0.5, 20);   // x=12.4
        makeIntersect(q, t, difficulty, stage, "E4", 2.8, 2.25, 1.1, 15);   // x=7.5
        makeIntersect(q, t, difficulty, stage, "E5", 3.2, 1.8, 1.5, 18.5);  // x=9.82
        break;
    }
  } else {
    // ── LEVEL3: Threshold (Plan A cheaper when x > ?) ──
    // Plan A has lower m (per-km) but higher c (base fare)
    switch (difficulty) {
      case "BASIC":
        makeOptimize(q, t, difficulty, stage, "B1", 1, 10, 3, 0);  // x=5
        makeOptimize(q, t, difficulty, stage, "B2", 1, 8, 3, 0);  // x=4
        makeOptimize(q, t, difficulty, stage, "B3", 1, 12, 4, 0);  // x=4
        makeOptimize(q, t, difficulty, stage, "B4", 2, 10, 4, 0);  // x=5
        makeOptimize(q, t, difficulty, stage, "B5", 1, 15, 4, 0);  // x=5
        break;
      case "CORE":
        makeOptimize(q, t, difficulty, stage, "C1", 0.5, 15, 2, 0);  // x=10
        makeOptimize(q, t, difficulty, stage, "C2", 1, 12, 2.5, 0);  // x=8
        makeOptimize(q, t, difficulty, stage, "C3", 0.8, 14, 2.2, 0);  // x=10
        makeOptimize(q, t, difficulty, stage, "C4", 1.2, 16, 3, 0);  // x=8.89
        makeOptimize(q, t, difficulty, stage, "C5", 0.6, 18, 2.4, 0);  // x=10
        break;
      case "ADVANCED":
        makeOptimize(q, t, difficulty, stage, "A1", 0.5, 12, 1.5, 2);  // x=10
        makeOptimize(q, t, difficulty, stage, "A2", 0.8, 15, 2, 3);    // x=10
        makeOptimize(q, t, difficulty, stage, "A3", 0.6, 16, 1.8, 4);  // x=10
        makeOptimize(q, t, difficulty, stage, "A4", 0.7, 18, 2.1, 5);  // x=9.29
        makeOptimize(q, t, difficulty, stage, "A5", 0.4, 20, 1.6, 6);  // x=11.67
        break;
      default: // ELITE
        makeOptimize(q, t, difficulty, stage, "E1", 0.2, 18, 1.4, 3);     // x=12.5
        makeOptimize(q, t, difficulty, stage, "E2", 0.35, 20, 1.6, 2.5);  // x=14
        makeOptimize(q, t, difficulty, stage, "E3", 0.25, 22, 1.5, 4);    // x=14.4
        makeOptimize(q, t, difficulty, stage, "E4", 0.3, 24, 1.7, 5);     // x=13.57
        makeOptimize(q, t, difficulty, stage, "E5", 0.15, 25, 1.35, 3.5); // x=17.92
        break;
    }
  }

  return q;
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
  } = useQuestManager<S203Quest, Stage>({
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
                {currentQuest.expressionLatex}
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
