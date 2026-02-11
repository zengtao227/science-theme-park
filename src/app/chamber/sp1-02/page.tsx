"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";

import { useAppStore } from "@/lib/store";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import P102LawsCanvas from "@/components/chamber/sp1-02/LawsCanvas";

type P102T = {
  title: string;
  back: string;
  check: string;
  next: string;
  correct: string;
  incorrect: string;
  objective_title: string;
  target_title: string;
  difficulty: { basic: string; core: string; advanced: string; elite: string };
  stages: {
    friction: string;
    acceleration: string;
    collision: string;
  };
  friction: {
    prompt: string;
    hint: string;
  };
  acceleration: {
    prompt: string;
    hint: string;
  };
  collision: {
    prompt: string;
    hint: string;
  };
};

type Stage = "FRICTION" | "ACCELERATION" | "COLLISION";

interface P102Quest extends Quest {
  stage: Stage;
  scenario: "friction" | "acceleration" | "collision";
  mass: number;
  friction: number;
  forceX: number;
  initialVelocity: number;
  gravity: number;
}

function buildStagePool(t: P102T, difficulty: Difficulty, stage: Stage): P102Quest[] {
  // FRICTION Stage - Calculate friction coefficient
  if (stage === "FRICTION") {
    const quests: P102Quest[] = [];
    const masses = difficulty === "BASIC" ? [2, 3, 4] : difficulty === "CORE" ? [3, 4, 5, 6] : [5, 6, 7, 8, 10];
    const frictions = difficulty === "BASIC" ? [0.2, 0.3, 0.4] : difficulty === "CORE" ? [0.25, 0.35, 0.45] : [0.3, 0.4, 0.5, 0.6];

    for (const mass of masses) {
      for (const mu of frictions) {
        const normalForce = mass * 10; // g ≈ 10 m/s²
        const frictionForce = mu * normalForce;

        quests.push({
          id: `FRICTION|${difficulty}|${mass}|${mu}`,
          difficulty,
          stage,
          scenario: "friction",
          mass,
          friction: mu,
          forceX: 0,
          initialVelocity: 0,
          gravity: 1,
          promptLatex: `${t.friction.prompt}\\\\m=${mass}\\text{ kg},\\; \\mu=${mu}`,
          expressionLatex: `F_f=\\mu \\cdot N=\\mu \\cdot mg`,
          targetLatex: `F_f`,
          correctLatex: `F_f=${frictionForce.toFixed(1)}\\text{ N}`,
          slots: [
            { id: "N", labelLatex: "N=mg", placeholder: "N", expected: normalForce },
            { id: "Ff", labelLatex: "F_f=\\mu N", placeholder: "Ff", expected: frictionForce },
          ],
        });
      }
    }
    return quests;
  }

  // ACCELERATION Stage - Calculate required force
  if (stage === "ACCELERATION") {
    const quests: P102Quest[] = [];
    const masses = difficulty === "BASIC" ? [2, 3, 4, 5] : difficulty === "CORE" ? [4, 5, 6, 8] : [6, 8, 10, 12];
    const accelerations = difficulty === "BASIC" ? [2, 3, 4] : difficulty === "CORE" ? [3, 4, 5, 6] : [5, 6, 8, 10];

    for (const mass of masses) {
      for (const acc of accelerations) {
        const force = mass * acc;
        const forceX = force / 1000; // Convert to simulation units

        quests.push({
          id: `ACCEL|${difficulty}|${mass}|${acc}`,
          difficulty,
          stage,
          scenario: "acceleration",
          mass,
          friction: 0.1,
          forceX,
          initialVelocity: 0,
          gravity: 1,
          promptLatex: `${t.acceleration.prompt}\\\\m=${mass}\\text{ kg},\\; a=${acc}\\text{ m/s}^2`,
          expressionLatex: `F=ma`,
          targetLatex: `F`,
          correctLatex: `F=${force}\\text{ N}`,
          slots: [
            { id: "F", labelLatex: "F=ma", placeholder: "F", expected: force },
          ],
        });
      }
    }
    return quests;
  }

  // COLLISION Stage - Predict stopping distance
  if (stage === "COLLISION") {
    const quests: P102Quest[] = [];
    const masses = difficulty === "BASIC" ? [2, 3] : difficulty === "CORE" ? [3, 4, 5] : [5, 6, 8];
    const velocities = difficulty === "BASIC" ? [5, 6] : difficulty === "CORE" ? [6, 8, 10] : [10, 12, 15];

    for (const mass of masses) {
      for (const v of velocities) {
        const mu = 0.3;
        const g = 10;
        const distance = (v * v) / (2 * mu * g); // v² = 2μgd
        // Convert velocity to simulation units (pixels per frame)
        const simVelocity = v * 2; // Scale factor for visual effect

        quests.push({
          id: `COLLISION|${difficulty}|${mass}|${v}`,
          difficulty,
          stage,
          scenario: "collision",
          mass,
          friction: mu,
          forceX: 0, // No continuous force, only initial velocity
          initialVelocity: simVelocity,
          gravity: 1,
          promptLatex: `${t.collision.prompt}\\\\m=${mass}\\text{ kg},\\; v_0=${v}\\text{ m/s},\\; \\mu=${mu}`,
          expressionLatex: `v^2=2\\mu gd`,
          targetLatex: `d`,
          correctLatex: `d=${distance.toFixed(1)}\\text{ m}`,
          slots: [
            { id: "d", labelLatex: "d=\\frac{v^2}{2\\mu g}", placeholder: "d", expected: parseFloat(distance.toFixed(1)) },
          ],
        });
      }
    }
    return quests;
  }

  return [];
}

export default function P102Page() {
  const { completeStage } = useAppStore();

  // Temporary translations until i18n is updated
  const t: P102T = {
    title: "SP1.02 // NEWTON'S LAWS",
    back: "Back",
    check: "Verify",
    next: "Next",
    correct: "Correct",
    incorrect: "Incorrect",
    objective_title: "Objective",
    target_title: "Target",
    difficulty: {
      basic: "Basic",
      core: "Core",
      advanced: "Advanced",
      elite: "Elite",
    },
    stages: {
      friction: "Friction",
      acceleration: "F = ma",
      collision: "Collision",
    },
    friction: {
      prompt: "Calculate friction force",
      hint: "F_f = μN, where N = mg",
    },
    acceleration: {
      prompt: "Calculate required force",
      hint: "F = ma",
    },
    collision: {
      prompt: "Predict stopping distance",
      hint: "Use energy conservation: v² = 2μgd",
    },
  };

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
  } = useQuestManager<P102Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "FRICTION",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sp1-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  if (!currentQuest) return null;

  const stages = [
    { id: "FRICTION", label: t.stages.friction },
    { id: "ACCELERATION", label: t.stages.acceleration },
    { id: "COLLISION", label: t.stages.collision },
  ];

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="SP1.02"
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
        back: t.back,
        check: t.check,
        next: t.next,
        correct: t.correct,
        incorrect: t.incorrect,
        difficulty: t.difficulty,
      }}
      monitorContent={
        <div className="space-y-4">
          <P102LawsCanvas
            scenario={currentQuest.scenario}
            mass={currentQuest.mass}
            friction={currentQuest.friction}
            forceX={currentQuest.forceX}
            initialVelocity={currentQuest.initialVelocity}
            gravity={currentQuest.gravity}
          />
          <div className="text-white text-xs font-mono text-center space-y-1">
            <div>Mass: {currentQuest.mass} kg</div>
            <div>Friction: μ = {currentQuest.friction}</div>
            {currentQuest.forceX > 0 && <div>Applied Force: {(currentQuest.forceX * 1000).toFixed(1)} N</div>}
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t.objective_title}
          </h3>
          <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic">
            <InlineMath math={currentQuest.promptLatex} />
          </p>
        </div>

        <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/60 rounded-2xl text-center relative max-w-5xl mx-auto shadow-2xl overflow-hidden">
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
          <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">
            {t.target_title}
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
                className="w-full bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/70 font-black text-2xl text-white"
                placeholder={slot.placeholder}
                inputMode="decimal"
              />
            </div>
          ))}

          <div className="mt-6 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
            <div className="text-[9px] uppercase tracking-[0.3em] text-white/90 font-black mb-2">Hint</div>
            <div className="text-sm text-white/60 font-mono">
              <InlineMath math={currentQuest.expressionLatex} />
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
