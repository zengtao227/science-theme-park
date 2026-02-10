"use client";

import { useEffect, useMemo, useState } from "react";
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
  targetX?: number;
  targetY?: number;
}

function buildStagePool(t: S203T, difficulty: Difficulty, stage: Stage): S203Quest[] {
  if (stage === "LEVEL1") {
    const prompt = t?.prompts?.level1 || "\\text{Hit the target with one reflection}";
    return [
      {
        id: "L1", difficulty, stage,
        promptLatex: prompt,
        expressionLatex: "\\text{ Distance: 8km, Budget: 6 CHF}",
        targetLatex: "m,\\; c",
        targetX: 8,
        targetY: 6,
        slots: [
          { id: "m", labelLatex: "m", placeholder: "slope", expected: 0.75 },
          { id: "c", labelLatex: "c", placeholder: "intercept", expected: 0 }
        ],
        correctLatex: "y=0.75x",
      },
      {
        id: "L2", difficulty, stage,
        promptLatex: prompt,
        expressionLatex: "\\text{ Distance: 7km, Budget: 4 CHF}",
        targetLatex: "m,\\; c",
        targetX: 7,
        targetY: 4,
        slots: [
          { id: "m", labelLatex: "m", placeholder: "slope", expected: 0.57 },
          { id: "c", labelLatex: "c", placeholder: "intercept", expected: 0 }
        ],
        correctLatex: "y=0.57x",
      },
    ];
  }

  if (stage === "LEVEL2") {
    const prompt = t?.prompts?.level2 || "\\text{Predict and hit the moving target}";
    return [
      {
        id: "L1", difficulty, stage,
        promptLatex: prompt,
        expressionLatex: "\\text{ Distance: 6km, Fare limit: 8 CHF}",
        targetLatex: "m,\\; c",
        targetX: 6,
        targetY: 8,
        slots: [
          { id: "m", labelLatex: "m", placeholder: "slope", expected: 1.33 },
          { id: "c", labelLatex: "c", placeholder: "intercept", expected: 0 }
        ],
        correctLatex: "y=1.33x",
      },
    ];
  }

  const prompt = t?.prompts?.level3 || "\\text{Hit the target with two reflections}";
  return [
    {
      id: "L1", difficulty, stage: "LEVEL3",
      promptLatex: prompt,
      expressionLatex: "\\text{ Route: 9km, Competing fare: 5 CHF}",
      targetLatex: "m,\\; c",
      targetX: 9,
      targetY: 5,
      slots: [
        { id: "m", labelLatex: "m", placeholder: "slope", expected: 2.0 },
        { id: "c", labelLatex: "c", placeholder: "intercept", expected: 1 }
      ],
      correctLatex: "y=2x+1",
    },
  ];
}

export default function S203Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const locale = translations[currentLanguage] as typeof translations.EN;
  const t = locale.sm2_03 || translations.EN.sm2_03;

  const [hits, setHits] = useState(0);

  const {
    difficulty, stage, inputs, lastCheck, currentQuest,
    setInputs, verify, next, handleDifficultyChange, handleStageChange,
  } = useQuestManager<S203Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
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
            slope={slope}
            intercept={intercept}
            targetX={targetX}
            targetY={targetY}
            onLineChange={(nextSlope: number, nextIntercept: number) => {
              setInputs((v) => ({
                ...v,
                m: Number.isFinite(nextSlope) ? nextSlope.toFixed(2) : v.m,
                c: Number.isFinite(nextIntercept) ? nextIntercept.toFixed(2) : v.c,
              }));
            }}
            onHit={() => setHits(h => h + 1)}
            labels={{
              current_function: t?.ui?.current_function || "Current Function",
              reflections: t?.ui?.reflections || "Reflections",
              target_position: t?.ui?.target_position || "Target Position",
              hit_badge: t?.ui?.hit_badge || "TARGET HIT",
              chamber: t?.ui?.chamber || "CHAMBER",
              laser_sim: t?.ui?.laser_sim || "LASER_SIM",
              level: t?.ui?.level || "LEVEL"
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
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t?.mission?.title || "MISSION"}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t?.mission?.description || "Navigate laser beams through reflections to hit targets. Master linear functions and reflection laws."}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t?.objective_title || "ACTIVE MISSION OBJECTIVE"}
          </h3>
          <div className="space-y-4">
            <p className="text-3xl text-white font-black italic whitespace-normal break-words">
              <InlineMath math={currentQuest?.promptLatex || "\\text{Hit the target}"} />
            </p>
            {currentQuest?.expressionLatex && (
              <p className="text-xl text-neon-cyan font-mono whitespace-normal break-words">
                {/* Render expression as text if it's a text wrapper, else math */}
                {currentQuest.expressionLatex.startsWith("\\text{")
                  ? currentQuest.expressionLatex.slice(6, -1)
                  : <InlineMath math={currentQuest.expressionLatex} />}
              </p>
            )}
          </div>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                {t?.labels?.slope || "Slope (m)"}
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={-3}
                  max={3}
                  step={0.01}
                  value={slope}
                  onChange={(e) => setInputs((v) => ({ ...v, m: e.target.value }))}
                  className="flex-1"
                />
                <input
                  type="number"
                  step="0.01"
                  value={inputs.m ?? ""}
                  onChange={(e) => setInputs((v) => ({ ...v, m: e.target.value }))}
                  className="w-24 bg-black border-2 border-white/20 p-2 text-center outline-none focus:border-white text-white font-black text-sm"
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                {t?.labels?.intercept || "Intercept (c)"}
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={-2}
                  max={10}
                  step={0.01}
                  value={intercept}
                  onChange={(e) => setInputs((v) => ({ ...v, c: e.target.value }))}
                  className="flex-1"
                />
                <input
                  type="number"
                  step="0.01"
                  value={inputs.c ?? ""}
                  onChange={(e) => setInputs((v) => ({ ...v, c: e.target.value }))}
                  className="w-24 bg-black border-2 border-white/20 p-2 text-center outline-none focus:border-white text-white font-black text-sm"
                />
              </div>
            </div>
          </div>
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
