"use client";

import { useEffect, useState, useCallback } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import LaserCanvas from "@/components/chamber/sm2-03/LaserCanvas";

type Stage = "LEVEL1" | "LEVEL2" | "LEVEL3";
type S203T = typeof translations.EN.sm2_03;

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
        break;
      case "CORE":
        // One decimal in slope
        makeCalc(q, t, difficulty, stage, "C1", 1.5, 3, 8);  // y=15
        makeCalc(q, t, difficulty, stage, "C2", 0.5, 4, 12); // y=10
        makeCalc(q, t, difficulty, stage, "C3", 2.5, 2, 6);  // y=17
        break;
      case "ADVANCED":
        // Two-decimal slope, larger intercept
        makeCalc(q, t, difficulty, stage, "A1", 0.75, 5, 12);  // y=14
        makeCalc(q, t, difficulty, stage, "A2", 1.25, 3.5, 10); // y=16
        makeCalc(q, t, difficulty, stage, "A3", 0.35, 8, 20);  // y=15
        break;
      default: // ELITE
        // Hard decimals, requires careful calculation
        makeCalc(q, t, difficulty, stage, "E1", 0.85, 6.5, 14); // y=18.4
        makeCalc(q, t, difficulty, stage, "E2", 1.15, 2.75, 12); // y=16.55
        makeCalc(q, t, difficulty, stage, "E3", 0.45, 11.5, 18); // y=19.6
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
        break;
      case "CORE":
        // One decimal slope, integer answer
        makeIntersect(q, t, difficulty, stage, "C1", 2, 0, 0.5, 15);   // x=10
        makeIntersect(q, t, difficulty, stage, "C2", 2.5, 0, 1, 12);   // x=8
        makeIntersect(q, t, difficulty, stage, "C3", 3, 2, 1, 12);     // x=5
        break;
      case "ADVANCED":
        // Both plans have intercepts
        makeIntersect(q, t, difficulty, stage, "A1", 1.5, 2, 0.5, 8);   // x=6
        makeIntersect(q, t, difficulty, stage, "A2", 2.5, 1, 0.5, 9);   // x=4
        makeIntersect(q, t, difficulty, stage, "A3", 1.8, 3, 0.6, 18);  // x=12.5
        break;
      default: // ELITE
        // Non-integer answers
        makeIntersect(q, t, difficulty, stage, "E1", 2.4, 1.5, 0.9, 12);    // x=7
        makeIntersect(q, t, difficulty, stage, "E2", 3.5, 0, 1.25, 13.5);   // x=6
        makeIntersect(q, t, difficulty, stage, "E3", 1.75, 4.5, 0.5, 20);   // x=12.4
        break;
    }
  } else {
    // ── LEVEL3: Threshold (Plan A cheaper when x > ?) ──
    // Plan A has lower m (per-km) but higher c (base fare)
    switch (difficulty) {
      case "BASIC":
        makeOptimize(q, t, difficulty, stage, "B1", 1, 10, 3, 0);  // x=5
        makeOptimize(q, t, difficulty, stage, "B2", 1, 8, 3, 0);  // x=4
        break;
      case "CORE":
        makeOptimize(q, t, difficulty, stage, "C1", 0.5, 15, 2, 0);  // x=10
        makeOptimize(q, t, difficulty, stage, "C2", 1, 12, 2.5, 0);  // x=8
        break;
      case "ADVANCED":
        makeOptimize(q, t, difficulty, stage, "A1", 0.5, 12, 1.5, 2);  // x=10
        makeOptimize(q, t, difficulty, stage, "A2", 0.8, 15, 2, 3);    // x=10
        break;
      default: // ELITE
        makeOptimize(q, t, difficulty, stage, "E1", 0.2, 18, 1.4, 3);     // x=12.5
        makeOptimize(q, t, difficulty, stage, "E2", 0.35, 20, 1.6, 2.5);  // x=14
        break;
    }
  }

  return q;
}

export default function S203Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const locale = translations[currentLanguage] as typeof translations.EN;
  const t = locale.sm2_03 || translations.EN.sm2_03;

  const [hits, setHits] = useState(0);

  const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(t, d, s), [t]);

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
      title={t?.title || "S2.03 // LINE NAVIGATOR"}
      moduleCode="SM2.03"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "LEVEL1", label: t?.stages?.level1 || "LEVEL 1" },
        { id: "LEVEL2", label: t?.stages?.level2 || "LEVEL 2" },
        { id: "LEVEL3", label: t?.stages?.level3 || "LEVEL 3" },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      successRate={successRate}
      footerLeft={t?.footer_left || "S2.03_LINE_NAVIGATOR // NODE: BASEL"}
      translations={{
        back: t?.back || "Back to Nexus",
        check: t?.check || "Verify",
        next: t?.next || "Next",
        correct: t?.correct || "Verified",
        incorrect: t?.incorrect || "Mismatch",
        ready: t?.ready || "Ready",
        monitor_title: t?.monitor_title || "S2.03_LASER_MONITOR",
        difficulty: {
          basic: t?.difficulty?.basic || "BASIC",
          core: t?.difficulty?.core || "CORE",
          advanced: t?.difficulty?.advanced || "ADVANCED",
          elite: t?.difficulty?.elite || "ELITE",
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
              current_function: t?.ui?.current_function || "Fare Statistics",
              reflections: t?.ui?.reflections || "Fare Plans",
              target_position: t?.ui?.target_position || "Break-even Point",
              hit_badge: t?.ui?.hit_badge || "OPTIMIZED",
              chamber: t?.ui?.chamber || "BAHNHOF",
              laser_sim: t?.ui?.laser_sim || "FARE_SIM",
              level: t?.ui?.level || "PHASE"
            }}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t?.target_title || "TARGET"}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.hints || "HINTS"}
            </div>
            <div className="text-white/70 text-sm font-mono">
              {level === 1 && (t?.hints?.level1 || "Calculate the total price y for a given distance x. Use y = mx + c.")}
              {level === 2 && (t?.hints?.level2 || "Two plans have different m and c. Find the distance x where they cost the same: m\u2081x + c\u2081 = m\u2082x + c\u2082.")}
              {level === 3 && (t?.hints?.level3 || "Find the distance threshold where Plan A becomes cheaper than Plan B.")}
            </div>
            <div className="text-white text-xs font-mono">
              {t?.hints?.drag || "Enter your answer in the input field below."}
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
            {t?.objective_title || "ACTIVE MISSION OBJECTIVE"}
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
              {t?.mission?.title || "SBB SYSTEM LOG"}
            </h3>
            <p className="text-sm text-white/80 font-mono leading-relaxed">
              {t?.mission?.description || "Model railway ticket prices as linear functions. Slope = cost per km, intercept = base fare. Find the break-even point between fare plans!"}
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
              {t?.ui?.hits || "Hits"}: {hits}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
