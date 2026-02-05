"use client";

import { useState, useEffect } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { useAppStore } from "@/lib/store";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import C101LabCanvas, { Substance, Tool } from "@/components/chamber/c1-01/LabCanvas";

type Stage = "IDENTIFY" | "PROPERTIES" | "REACTIONS";
// type Substance = "soda" | "salt" | "starch"; // Removed locally defined type

interface C101Quest extends Quest {
  stage: Stage;
  substances: Substance[];
  correctIdentifications: Record<string, Substance>; // "A" -> "soda"
}

function buildStagePool(difficulty: Difficulty, stage: Stage): C101Quest[] {
  const quests: C101Quest[] = [];

  // Stage 1: IDENTIFY - Identify the three powders
  if (stage === "IDENTIFY") {
    const arrangements = [
      { A: "soda", B: "salt", C: "starch" },
      { A: "salt", B: "starch", C: "soda" },
      { A: "starch", B: "soda", C: "salt" },
      { A: "soda", B: "starch", C: "salt" },
      { A: "salt", B: "soda", C: "starch" },
      { A: "starch", B: "salt", C: "soda" },
    ];

    const count = difficulty === "BASIC" ? 2 : difficulty === "CORE" ? 4 : 6;

    for (let i = 0; i < count; i++) {
      const arrangement = arrangements[i];

      quests.push({
        id: `IDENTIFY|${difficulty}|${i}`,
        difficulty,
        stage,
        substances: ["soda", "salt", "starch"],
        correctIdentifications: arrangement as Record<string, Substance>,
        promptLatex: `\\text{Identify the three white powders}`,
        expressionLatex: `\\text{Use: Water, Vinegar, Fire, Iodine}`,
        targetLatex: `\\text{A, B, C}`,
        correctLatex: `\\text{A=${arrangement.A}, B=${arrangement.B}, C=${arrangement.C}}`,
        slots: [
          { id: "A", labelLatex: "\\text{Powder A is}", placeholder: "soda/salt/starch", expected: 0 },
          { id: "B", labelLatex: "\\text{Powder B is}", placeholder: "soda/salt/starch", expected: 0 },
          { id: "C", labelLatex: "\\text{Powder C is}", placeholder: "soda/salt/starch", expected: 0 },
        ],
      });
    }
    return quests;
  }

  // Stage 2: PROPERTIES - Identify based on specific property
  if (stage === "PROPERTIES") {
    const properties = [
      { question: "Which powder fizzes with vinegar?", answer: "soda" },
      { question: "Which powder turns blue-black with iodine?", answer: "starch" },
      { question: "Which powder dissolves completely in water?", answer: "salt" },
      { question: "Which powder produces CO₂ gas?", answer: "soda" },
    ];

    const count = difficulty === "BASIC" ? 2 : difficulty === "CORE" ? 3 : 4;

    for (let i = 0; i < count; i++) {
      const prop = properties[i];

      quests.push({
        id: `PROPERTIES|${difficulty}|${i}`,
        difficulty,
        stage,
        substances: ["soda", "salt", "starch"],
        correctIdentifications: {},
        promptLatex: `\\text{${prop.question}}`,
        expressionLatex: `\\text{Test and observe}`,
        targetLatex: `\\text{Answer}`,
        correctLatex: `\\text{${prop.answer}}`,
        slots: [
          { id: "answer", labelLatex: "\\text{Answer}", placeholder: "soda/salt/starch", expected: 0 },
        ],
      });
    }
    return quests;
  }

  // Stage 3: REACTIONS - Chemical equations
  if (stage === "REACTIONS") {
    const reactions = [
      {
        question: "Baking soda + Vinegar reaction",
        equation: "NaHCO_3 + CH_3COOH \\rightarrow CO_2 + H_2O + CH_3COONa",
        product: "CO₂"
      },
      {
        question: "Starch + Iodine test",
        equation: "\\text{Starch} + I_2 \\rightarrow \\text{Blue-black complex}",
        product: "Blue-black"
      },
    ];

    const count = difficulty === "BASIC" ? 1 : 2;

    for (let i = 0; i < count; i++) {
      const rxn = reactions[i];

      quests.push({
        id: `REACTIONS|${difficulty}|${i}`,
        difficulty,
        stage,
        substances: ["soda", "salt", "starch"],
        correctIdentifications: {},
        promptLatex: `\\text{${rxn.question}}`,
        expressionLatex: rxn.equation,
        targetLatex: `\\text{Product}`,
        correctLatex: `\\text{${rxn.product}}`,
        slots: [
          { id: "product", labelLatex: "\\text{Main product}", placeholder: "Product", expected: 0 },
        ],
      });
    }
    return quests;
  }

  return [];
}

export default function C101Page() {
  const { completeStage } = useAppStore();
  const [testedReactions, setTestedReactions] = useState<Array<{ substance: Substance; tool: Tool }>>([]);

  const {
    difficulty,
    stage,
    inputs,
    lastCheck,
    currentQuest,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
  } = useQuestManager<C101Quest, Stage>({
    buildPool: (d, s) => buildStagePool(d, s),
    initialStage: "IDENTIFY",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("c1-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  if (!currentQuest) return null;

  const stages = [
    { id: "IDENTIFY", label: "Identify" },
    { id: "PROPERTIES", label: "Properties" },
    { id: "REACTIONS", label: "Reactions" },
  ];

  const handleTest = (substance: Substance, tool: Tool) => {
    setTestedReactions(prev => [...prev, { substance, tool }]);
  };

  const handleNextQuest = () => {
    setTestedReactions([]);
    next();
  };

  return (
    <ChamberLayout
      title="C1.01 // MYSTERY LAB"
      moduleCode="C1.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      checkStatus={lastCheck}
      onVerify={verify}
      onNext={handleNextQuest}
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
        <C101LabCanvas
          onTest={handleTest}
          testedReactions={testedReactions}
          showAnswer={lastCheck?.ok === true}
        />
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
                onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value.toLowerCase() })}
                className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-2xl text-white"
                placeholder={slot.placeholder}
              />
            </div>
          ))}

          <div className="mt-6 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
            <div className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-black mb-2">Method</div>
            <div className="text-sm text-white/60 font-mono">
              <InlineMath math={currentQuest.expressionLatex} />
            </div>
          </div>

          <div className="p-4 bg-neon-cyan/5 border border-neon-cyan/20 rounded-xl">
            <div className="text-[9px] uppercase tracking-[0.3em] text-neon-cyan/60 font-black mb-2">Hint</div>
            <div className="text-xs text-neon-cyan/80 font-mono space-y-1">
              <div>• Baking Soda: Fizzes with vinegar (CO₂)</div>
              <div>• Starch: Turns blue-black with iodine</div>
              <div>• Salt: Dissolves completely in water</div>
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
