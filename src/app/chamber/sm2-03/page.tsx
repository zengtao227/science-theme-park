"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
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
  // Plan A (Target or Ref)
  m1: number;
  c1: number;
  // Plan B (Competitor or Variable)
  m2?: number;
  c2?: number;
  targetX?: number; // Distance
  targetY?: number; // Price
  mode: "CALCULATE" | "INTERSECT" | "OPTIMIZE";
}

function buildStagePool(t: any, difficulty: Difficulty, stage: Stage): S203Quest[] {
  const quests: S203Quest[] = [];

  if (stage === "LEVEL1") {
    // Stage 1: Basic Calculation (y = mx + c)
    // The user needs to find the total price for a given distance
    const data = [
      { m: 0.5, c: 4, x: 10, id: "L1-1" },
      { m: 1.2, c: 0, x: 5, id: "L1-2" },
      { m: 0.8, c: 10, x: 20, id: "L1-3" },
    ];
    for (const d of data) {
      quests.push({
        id: `S1|${d.id}`, difficulty, stage,
        mode: "CALCULATE",
        m1: d.m, c1: d.c, targetX: d.x, targetY: d.m * d.x + d.c,
        promptLatex: `\\text{${t.prompts.level1}}`,
        expressionLatex: `\\text{Plan: } y = ${d.m}x + ${d.c} \\\\ \\text{Distance: } x = ${d.x} \\text{ km}`,
        targetLatex: "y",
        correctLatex: `y=${d.m * d.x + d.c}`,
        slots: [{ id: "y", labelLatex: "y", placeholder: "Total Price", expected: d.m * d.x + d.c }],
      });
    }
  } else if (stage === "LEVEL2") {
    // Stage 2: Break-Even Point (m1*x + c1 = m2*x + c2)
    // The user needs to find the distance x where two plans are equal
    const data = [
      { m1: 2.0, c1: 0, m2: 0.5, c2: 15, id: "L2-1" }, // 1.5x = 15 => x = 10
      { m1: 1.5, c1: 2, m2: 0.5, c2: 8, id: "L2-2" }, // 1.0x = 6 => x = 6
      { m1: 3.0, c1: 0, m2: 1.0, c2: 10, id: "L2-3" }, // 2.0x = 10 => x = 5
    ];
    for (const d of data) {
      const x = (d.c2 - d.c1) / (d.m1 - d.m2);
      quests.push({
        id: `S2|${d.id}`, difficulty, stage,
        mode: "INTERSECT",
        m1: d.m1, c1: d.c1, m2: d.m2, c2: d.m2, // m2/c2 for drawing
        targetX: x, targetY: d.m1 * x + d.c1,
        promptLatex: `\\text{${t.prompts.level2}}`,
        expressionLatex: `\\text{Plan A: } 2.0/\\text{km} \\\\ \\text{Plan B: } 0.5/\\text{km} + 15 \\text{ flat}`, // Simplified for now, will dynamicize later
        targetLatex: "x",
        correctLatex: `x=${x}`,
        slots: [{ id: "x", labelLatex: "x", placeholder: "Distance (km)", expected: x }],
      });
    }
    // Hardcoded overrides for better clarity
    quests[0].expressionLatex = `\\text{Plan A: } y = 2.0x \\\\ \\text{Plan B: } y = 0.5x + 15`;
    quests[1].expressionLatex = `\\text{Plan A: } y = 1.5x + 2 \\\\ \\text{Plan B: } y = 0.5x + 8`;
    quests[2].expressionLatex = `\\text{Plan A: } y = 3.0x \\\\ \\text{Plan B: } y = 1.0x + 10`;
  } else {
    // Stage 3: Optimization / Inequalities
    quests.push({
      id: "L3-1", difficulty, stage: "LEVEL3",
      mode: "OPTIMIZE",
      m1: 0.2, c1: 50, m2: 1.0, c2: 5,
      targetX: 56.25, targetY: 61.25,
      promptLatex: `\\text{${t.prompts.level3}}`,
      expressionLatex: `\\text{Plan A: } y = 0.2x + 50 \\\\ \\text{Plan B: } y = 1.0x + 5`,
      targetLatex: "x > ?",
      correctLatex: "x > 56.25",
      slots: [{ id: "x", labelLatex: "x", placeholder: "Threshold", expected: 56.25 }],
    });
  }

  return quests;
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

  useEffect(() => {
    if (!inputs.m && !inputs.c) {
      setInputs({ m: "1", c: "0" });
    }
  }, [inputs, setInputs]);

  const slope = useMemo(() => {
    const m = parseFloat(inputs['m'] || '0');
    return Number.isFinite(m) ? m : 1;
  }, [inputs]);

  const intercept = useMemo(() => {
    const c = parseFloat(inputs['c'] || '0');
    return Number.isFinite(c) ? c : 2;
  }, [inputs]);

  const level = stage === "LEVEL1" ? 1 : stage === "LEVEL2" ? 2 : 3;
  const targetX = currentQuest?.targetX ?? (level === 1 ? 8 : level === 2 ? 6 : 9);
  const targetY = currentQuest?.targetY ?? (level === 1 ? 6 : level === 2 ? 8 : 5);

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
              {level === 1 && (t?.hints?.level1 || "Use one reflection to hit the target. Adjust slope and intercept.")}
              {level === 2 && (t?.hints?.level2 || "Target is moving. Predict its position and adjust your laser path.")}
              {level === 3 && (t?.hints?.level3 || "Use two reflections to reach the target. Complex trajectory required.")}
            </div>
            <div className="text-white/50 text-xs font-mono">
              {t?.hints?.drag || "Drag the control points on the line to edit slope and intercept."}
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
            <p className="text-3xl text-white font-black italic whitespace-normal break-words">
              {(() => {
                const latex = currentQuest?.promptLatex || "\\text{Hit the target}";
                if (latex.includes("\\text{")) {
                  return <span className="font-sans not-italic">{latex.replace(/\\text\{/g, "").replace(/\}/g, "").replace(/\\\\/g, "\n").replace(/\\;/g, " ").replace(/\\,/g, " ")}</span>;
                }
                return <InlineMath math={latex} />;
              })()}
            </p>
            {currentQuest?.expressionLatex && (
              <p className="text-xl text-neon-cyan font-mono whitespace-normal break-words">
                {(() => {
                  const latex = currentQuest.expressionLatex;
                  if (latex.includes("\\text{")) {
                    return <span className="whitespace-pre-wrap">{latex.replace(/\\text\{/g, "").replace(/\}/g, "").replace(/\\\\/g, "\n").replace(/\\;/g, " ").replace(/\\,/g, " ")}</span>;
                  }
                  return <InlineMath math={latex} />;
                })()}
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
              {t?.mission?.description || "Navigate laser beams through reflections to hit targets. Master linear functions and reflection laws."}
            </p>
          </div>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          {/* Conditionally show sliders if we want interactive exploration, but for now focus on calculated answers */}
          <div className="grid grid-cols-2 gap-4">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                  <InlineMath math={slot.labelLatex} />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.01"
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                    className="flex-1 bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                    placeholder={slot.placeholder}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="text-[10px] text-white/40 font-mono italic">
              {t?.ui?.hits || "Hits"}: {hits}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
