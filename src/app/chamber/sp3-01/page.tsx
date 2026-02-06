"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";

import { useAppStore } from "@/lib/store";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import P301OpticsCanvas from "@/components/chamber/sp3-01/OpticsCanvas";

type Stage = "REFLECTION" | "REFRACTION" | "LENSES";

interface P301Quest extends Quest {
  stage: Stage;
  scenario: "reflection" | "refraction" | "lens";
  angle: number;
  n1?: number;
  n2?: number;
  focalLength?: number;
  targetAngle: number;
}

function buildStagePool(difficulty: Difficulty, stage: Stage): P301Quest[] {
  const quests: P301Quest[] = [];

  // Stage 1: REFLECTION - Law of Reflection
  if (stage === "REFLECTION") {
    const angles = difficulty === "BASIC"
      ? [30, 45, 60]
      : difficulty === "CORE"
        ? [20, 30, 40, 50, 60]
        : difficulty === "ADVANCED"
          ? [15, 25, 35, 45, 55, 65, 75]
          : [10, 20, 30, 40, 50, 60, 70, 80];

    for (const angle of angles) {
      const reflectedAngle = angle; // Law of Reflection: θᵢ = θᵣ

      quests.push({
        id: `REFLECTION|${difficulty}|${angle}`,
        difficulty,
        stage,
        scenario: "reflection",
        angle,
        targetAngle: reflectedAngle,
        promptLatex: `\\text{Law of Reflection}\\\\\\theta_i=${angle}^\\circ`,
        expressionLatex: `\\theta_i=\\theta_r`,
        targetLatex: `\\theta_r`,
        correctLatex: `\\theta_r=${reflectedAngle}^\\circ`,
        slots: [
          { id: "theta_r", labelLatex: "\\theta_r", placeholder: "θᵣ (degrees)", expected: reflectedAngle },
        ],
      });
    }
    return quests;
  }

  // Stage 2: REFRACTION - Snell's Law
  if (stage === "REFRACTION") {
    const materials = [
      { name: "Air→Water", n1: 1.00, n2: 1.33 },
      { name: "Air→Glass", n1: 1.00, n2: 1.50 },
      { name: "Water→Glass", n1: 1.33, n2: 1.50 },
      { name: "Air→Diamond", n1: 1.00, n2: 2.42 },
    ];

    const angles = difficulty === "BASIC"
      ? [30, 45, 60]
      : difficulty === "CORE"
        ? [20, 30, 40, 50, 60]
        : difficulty === "ADVANCED"
          ? [15, 25, 35, 45, 55, 65]
          : [10, 20, 30, 40, 50, 60, 70];

    const materialSet = difficulty === "BASIC"
      ? materials.slice(0, 2)
      : difficulty === "CORE"
        ? materials.slice(0, 3)
        : materials;

    for (const mat of materialSet) {
      for (const theta1 of angles) {
        const theta1Rad = (theta1 * Math.PI) / 180;
        const sinTheta2 = (mat.n1 * Math.sin(theta1Rad)) / mat.n2;

        // Skip if total internal reflection would occur
        if (sinTheta2 > 1) continue;

        const theta2 = Math.asin(sinTheta2) * (180 / Math.PI);

        quests.push({
          id: `REFRACTION|${difficulty}|${mat.name}|${theta1}`,
          difficulty,
          stage,
          scenario: "refraction",
          angle: theta1,
          n1: mat.n1,
          n2: mat.n2,
          targetAngle: theta2,
          promptLatex: `\\text{Snell's Law: }${mat.name}\\\\n_1=${mat.n1},\\; n_2=${mat.n2},\\; \\theta_1=${theta1}^\\circ`,
          expressionLatex: `n_1\\sin\\theta_1=n_2\\sin\\theta_2`,
          targetLatex: `\\theta_2`,
          correctLatex: `\\theta_2=${theta2.toFixed(1)}^\\circ`,
          slots: [
            { id: "theta_2", labelLatex: "\\theta_2", placeholder: "θ₂ (degrees)", expected: parseFloat(theta2.toFixed(1)) },
          ],
        });
      }
    }
    return quests;
  }

  // Stage 3: LENSES - Focal Length and Image Formation
  if (stage === "LENSES") {
    const focalLengths = difficulty === "BASIC"
      ? [50, 75, 100]
      : difficulty === "CORE"
        ? [50, 75, 100, 125]
        : difficulty === "ADVANCED"
          ? [40, 60, 80, 100, 120]
          : [30, 50, 70, 90, 110, 130];

    const objectDistances = difficulty === "BASIC"
      ? [150, 200]
      : difficulty === "CORE"
        ? [150, 200, 250]
        : [120, 160, 200, 240];

    for (const f of focalLengths) {
      for (const u of objectDistances) {
        // Lens equation: 1/f = 1/u + 1/v
        const v = (f * u) / (u - f);

        // Skip if image is virtual or too far
        if (v < 0 || v > 500) continue;

        const magnification = -v / u;

        quests.push({
          id: `LENS|${difficulty}|${f}|${u}`,
          difficulty,
          stage,
          scenario: "lens",
          angle: 0,
          focalLength: f,
          targetAngle: v,
          promptLatex: `\\text{Converging Lens}\\\\f=${f}\\text{px},\\; u=${u}\\text{px}`,
          expressionLatex: `\\frac{1}{f}=\\frac{1}{u}+\\frac{1}{v}`,
          targetLatex: `v`,
          correctLatex: `v=${v.toFixed(1)}\\text{px}`,
          slots: [
            { id: "v", labelLatex: "v\\text{ (image distance)}", placeholder: "v (px)", expected: parseFloat(v.toFixed(1)) },
            { id: "m", labelLatex: "m\\text{ (magnification)}", placeholder: "m", expected: parseFloat(magnification.toFixed(2)) },
          ],
        });
      }
    }
    return quests;
  }

  return [];
}

export default function P301Page() {
  const { completeStage } = useAppStore();

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
  } = useQuestManager<P301Quest, Stage>({
    buildPool: (d, s) => buildStagePool(d, s),
    initialStage: "REFLECTION",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("p3-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  if (!currentQuest) return null;

  const stages = [
    { id: "REFLECTION", label: "Reflection" },
    { id: "REFRACTION", label: "Refraction" },
    { id: "LENSES", label: "Lenses" },
  ];

  return (
    <ChamberLayout
      title="P3.01 // GEOMETRICAL OPTICS"
      moduleCode="P3.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      checkStatus={lastCheck}
      onVerify={verify}
      onNext={next}
      successRate={successRate}
      translations={{
        back: "Back",
        check: "Verify",
        next: "Next",
        correct: "Correct",
        incorrect: "Incorrect",
        difficulty: {
          basic: "Basic",
          core: "Core",
          advanced: "Advanced",
          elite: "Elite",
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <P301OpticsCanvas
            scenario={currentQuest.scenario}
            angle={currentQuest.angle}
            n1={currentQuest.n1}
            n2={currentQuest.n2}
            focalLength={currentQuest.focalLength}
            showAnswer={lastCheck?.ok === true}
            targetAngle={currentQuest.targetAngle}
          />
          <div className="text-white/50 text-xs font-mono text-center space-y-1">
            {currentQuest.scenario === "reflection" && (
              <div>Incident Angle: {currentQuest.angle}°</div>
            )}
            {currentQuest.scenario === "refraction" && (
              <>
                <div>n₁ = {currentQuest.n1?.toFixed(2)} → n₂ = {currentQuest.n2?.toFixed(2)}</div>
                <div>Incident Angle: {currentQuest.angle}°</div>
              </>
            )}
            {currentQuest.scenario === "lens" && (
              <div>Focal Length: {currentQuest.focalLength}px</div>
            )}
            {lastCheck?.ok && <div className="text-neon-green">✓ Light Path Correct!</div>}
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            Objective
          </h3>
          <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic">
            <InlineMath math={currentQuest.promptLatex} />
          </p>
        </div>

        <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/20 rounded-2xl text-center relative max-w-5xl mx-auto shadow-2xl overflow-hidden">
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
          <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">
            Target
          </span>
          <div className="font-black italic tracking-tighter text-white block py-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] text-[clamp(1.6rem,4.8vw,4.5rem)] leading-[0.95]">
            <InlineMath math={currentQuest.targetLatex} />
          </div>
        </div>

        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          {currentQuest.slots.map((slot) => (
            <div key={slot.id} className="space-y-3">
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
                <InlineMath math={slot.labelLatex} />
              </div>
              <input
                value={inputs[slot.id] || ""}
                onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-2xl text-white"
                placeholder={slot.placeholder}
                inputMode="decimal"
              />
            </div>
          ))}

          <div className="mt-6 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
            <div className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-black mb-2">Formula</div>
            <div className="text-sm text-white/60 font-mono">
              <InlineMath math={currentQuest.expressionLatex} />
            </div>
          </div>

          {currentQuest.scenario === "refraction" && (
            <div className="p-4 bg-neon-cyan/5 border border-neon-cyan/20 rounded-xl">
              <div className="text-[9px] uppercase tracking-[0.3em] text-neon-cyan/60 font-black mb-2">Hint</div>
              <div className="text-xs text-neon-cyan/80 font-mono">
                Light bends toward the normal when entering a denser medium (n₂ &gt; n₁)
              </div>
            </div>
          )}
        </div>
      </div>
    </ChamberLayout>
  );
}
