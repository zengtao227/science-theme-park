"use client";

import { useState, useEffect } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import C101LabCanvas, { Substance, Tool } from "@/components/chamber/sc1-01/LabCanvas";

type Stage = "IDENTIFY" | "PROPERTIES" | "REACTIONS";
// type Substance = "soda" | "salt" | "starch"; // Removed locally defined type

interface C101Quest extends Quest {
  stage: Stage;
  substances: Substance[];
  correctIdentifications: Record<string, Substance>; // "A" -> "soda"
}

function buildStagePool(difficulty: Difficulty, stage: Stage, t: (key: string) => string): C101Quest[] {
  const quests: C101Quest[] = [];

  // Stage 1: IDENTIFY - Identify the three powders (5 questions per difficulty)
  if (stage === "IDENTIFY") {
    const arrangements = [
      { A: "soda", B: "salt", C: "starch" },
      { A: "salt", B: "starch", C: "soda" },
      { A: "starch", B: "soda", C: "salt" },
      { A: "soda", B: "starch", C: "salt" },
      { A: "salt", B: "soda", C: "starch" },
      { A: "starch", B: "salt", C: "soda" },
      { A: "soda", B: "salt", C: "starch" }, // Repeat with different context
      { A: "salt", B: "starch", C: "soda" },
      { A: "starch", B: "soda", C: "salt" },
      { A: "soda", B: "starch", C: "salt" },
      { A: "salt", B: "soda", C: "starch" },
      { A: "starch", B: "salt", C: "soda" },
      { A: "soda", B: "salt", C: "starch" },
      { A: "salt", B: "starch", C: "soda" },
      { A: "starch", B: "soda", C: "salt" },
      { A: "soda", B: "starch", C: "salt" },
      { A: "salt", B: "soda", C: "starch" },
      { A: "starch", B: "salt", C: "soda" },
      { A: "soda", B: "salt", C: "starch" },
      { A: "salt", B: "starch", C: "soda" },
    ];

    let selectedArrangements: typeof arrangements = [];
    
    switch (difficulty) {
      case "BASIC":
        // Simple identification with clear hints
        selectedArrangements = arrangements.slice(0, 5);
        break;
      case "CORE":
        // More variety in arrangements
        selectedArrangements = arrangements.slice(5, 10);
        break;
      case "ADVANCED":
        // Complex arrangements
        selectedArrangements = arrangements.slice(10, 15);
        break;
      case "ELITE":
        // Most challenging arrangements
        selectedArrangements = arrangements.slice(15, 20);
        break;
    }

    for (let i = 0; i < selectedArrangements.length; i++) {
      const arrangement = selectedArrangements[i];

      quests.push({
        id: `IDENTIFY_${difficulty}_${i}`,
        difficulty,
        stage,
        substances: ["soda", "salt", "starch"],
        correctIdentifications: arrangement as Record<string, Substance>,
        promptLatex: t('sc1_01.prompts.identify_powders'),
        expressionLatex: `\\\\text{Use: Water, Vinegar, Fire, Iodine}`,
        targetLatex: `\\\\text{A, B, C}`,
        correctLatex: `\\\\text{A=${arrangement.A}, B=${arrangement.B}, C=${arrangement.C}}`,
        slots: [
          { id: "A", labelLatex: "\\\\text{Powder A is}", placeholder: "soda/salt/starch", expected: 0 },
          { id: "B", labelLatex: "\\\\text{Powder B is}", placeholder: "soda/salt/starch", expected: 0 },
          { id: "C", labelLatex: "\\\\text{Powder C is}", placeholder: "soda/salt/starch", expected: 0 },
        ],
      });
    }
    return quests;
  }

  // Stage 2: PROPERTIES - Identify based on specific property (5 questions per difficulty)
  if (stage === "PROPERTIES") {
    const allProperties = [
      // BASIC - Direct observations
      { question: "Which powder fizzes with vinegar?", answer: "soda", difficulty: "BASIC" },
      { question: "Which powder turns blue-black with iodine?", answer: "starch", difficulty: "BASIC" },
      { question: "Which powder dissolves completely in water?", answer: "salt", difficulty: "BASIC" },
      { question: "Which powder is white and crystalline?", answer: "salt", difficulty: "BASIC" },
      { question: "Which powder produces bubbles with acid?", answer: "soda", difficulty: "BASIC" },
      
      // CORE - Requires understanding
      { question: "Which powder produces CO₂ gas?", answer: "soda", difficulty: "CORE" },
      { question: "Which powder forms a colloidal suspension?", answer: "starch", difficulty: "CORE" },
      { question: "Which powder has the highest solubility?", answer: "salt", difficulty: "CORE" },
      { question: "Which powder reacts with acetic acid?", answer: "soda", difficulty: "CORE" },
      { question: "Which powder is a polysaccharide?", answer: "starch", difficulty: "CORE" },
      
      // ADVANCED - Chemical understanding
      { question: "Which powder is sodium bicarbonate?", answer: "soda", difficulty: "ADVANCED" },
      { question: "Which powder is sodium chloride?", answer: "salt", difficulty: "ADVANCED" },
      { question: "Which powder is a carbohydrate polymer?", answer: "starch", difficulty: "ADVANCED" },
      { question: "Which powder releases carbonic acid?", answer: "soda", difficulty: "ADVANCED" },
      { question: "Which powder forms an ionic solution?", answer: "salt", difficulty: "ADVANCED" },
      
      // ELITE - Deep chemical knowledge
      { question: "Which powder has formula NaHCO₃?", answer: "soda", difficulty: "ELITE" },
      { question: "Which powder has formula NaCl?", answer: "salt", difficulty: "ELITE" },
      { question: "Which powder has formula (C₆H₁₀O₅)ₙ?", answer: "starch", difficulty: "ELITE" },
      { question: "Which powder undergoes acid-base neutralization?", answer: "soda", difficulty: "ELITE" },
      { question: "Which powder forms a triiodide complex?", answer: "starch", difficulty: "ELITE" },
    ];

    const filteredProperties = allProperties.filter(p => p.difficulty === difficulty);

    for (let i = 0; i < filteredProperties.length; i++) {
      const prop = filteredProperties[i];

      quests.push({
        id: `PROPERTIES_${difficulty}_${i}`,
        difficulty,
        stage,
        substances: ["soda", "salt", "starch"],
        correctIdentifications: {},
        promptLatex: `\\\\text{${prop.question}}`,
        expressionLatex: `\\\\text{Test and observe}`,
        targetLatex: `\\\\text{Answer}`,
        correctLatex: `\\\\text{${prop.answer}}`,
        slots: [
          { id: "answer", labelLatex: "\\\\text{Answer}", placeholder: "soda/salt/starch", expected: 0 },
        ],
      });
    }
    return quests;
  }

  // Stage 3: REACTIONS - Chemical equations (5 questions per difficulty)
  if (stage === "REACTIONS") {
    const allReactions = [
      // BASIC - Simple observations
      {
        question: "Baking soda + Vinegar reaction",
        equation: "NaHCO_3 + CH_3COOH \\rightarrow CO_2 + H_2O + CH_3COONa",
        product: "CO₂",
        difficulty: "BASIC"
      },
      {
        question: "Starch + Iodine test",
        equation: "\\text{Starch} + I_2 \\rightarrow \\text{Blue-black complex}",
        product: "Blue-black",
        difficulty: "BASIC"
      },
      {
        question: "Salt dissolving in water",
        equation: "NaCl \\rightarrow Na^+ + Cl^-",
        product: "Ions",
        difficulty: "BASIC"
      },
      {
        question: "Baking soda heating",
        equation: "2NaHCO_3 \\rightarrow Na_2CO_3 + H_2O + CO_2",
        product: "CO₂",
        difficulty: "BASIC"
      },
      {
        question: "Starch hydrolysis",
        equation: "\\text{Starch} + H_2O \\rightarrow \\text{Glucose}",
        product: "Glucose",
        difficulty: "BASIC"
      },
      
      // CORE - Understanding reactions
      {
        question: "Complete neutralization of baking soda",
        equation: "NaHCO_3 + HCl \\rightarrow NaCl + H_2O + CO_2",
        product: "NaCl",
        difficulty: "CORE"
      },
      {
        question: "Starch-iodine complex formation",
        equation: "\\text{Starch} + I_3^- \\rightarrow \\text{Starch-I}_3^- \\text{ complex}",
        product: "Complex",
        difficulty: "CORE"
      },
      {
        question: "Salt crystallization",
        equation: "Na^+ + Cl^- \\rightarrow NaCl_{(s)}",
        product: "Crystal",
        difficulty: "CORE"
      },
      {
        question: "Baking soda decomposition temperature",
        equation: "NaHCO_3 \\xrightarrow{\\Delta} Na_2CO_3 + H_2O + CO_2",
        product: "Na₂CO₃",
        difficulty: "CORE"
      },
      {
        question: "Starch enzymatic breakdown",
        equation: "\\text{Starch} \\xrightarrow{\\text{amylase}} \\text{Maltose}",
        product: "Maltose",
        difficulty: "CORE"
      },
      
      // ADVANCED - Complex reactions
      {
        question: "Baking soda with strong acid",
        equation: "NaHCO_3 + H_2SO_4 \\rightarrow Na_2SO_4 + H_2O + CO_2",
        product: "Na₂SO₄",
        difficulty: "ADVANCED"
      },
      {
        question: "Starch complete hydrolysis",
        equation: "(C_6H_{10}O_5)_n + nH_2O \\rightarrow nC_6H_{12}O_6",
        product: "C₆H₁₂O₆",
        difficulty: "ADVANCED"
      },
      {
        question: "Salt electrolysis",
        equation: "2NaCl + 2H_2O \\rightarrow 2NaOH + H_2 + Cl_2",
        product: "Cl₂",
        difficulty: "ADVANCED"
      },
      {
        question: "Baking soda buffer system",
        equation: "HCO_3^- + H^+ \\rightleftharpoons H_2CO_3 \\rightleftharpoons H_2O + CO_2",
        product: "Buffer",
        difficulty: "ADVANCED"
      },
      {
        question: "Starch gelatinization",
        equation: "\\text{Starch}_{(s)} + \\text{Heat} + H_2O \\rightarrow \\text{Starch gel}",
        product: "Gel",
        difficulty: "ADVANCED"
      },
      
      // ELITE - Advanced chemistry
      {
        question: "Baking soda in blood pH regulation",
        equation: "HCO_3^- + H^+ \\rightleftharpoons H_2CO_3 \\rightleftharpoons CO_2 + H_2O",
        product: "CO₂",
        difficulty: "ELITE"
      },
      {
        question: "Starch-iodine complex structure",
        equation: "\\text{Amylose helix} + I_3^- \\rightarrow \\text{Inclusion complex}",
        product: "Inclusion",
        difficulty: "ELITE"
      },
      {
        question: "Salt in Solvay process",
        equation: "NaCl + NH_3 + CO_2 + H_2O \\rightarrow NaHCO_3 + NH_4Cl",
        product: "NaHCO₃",
        difficulty: "ELITE"
      },
      {
        question: "Baking soda thermal decomposition kinetics",
        equation: "2NaHCO_3 \\xrightarrow{k} Na_2CO_3 + H_2O + CO_2",
        product: "Na₂CO₃",
        difficulty: "ELITE"
      },
      {
        question: "Starch retrogradation",
        equation: "\\text{Amylose}_{(aq)} \\rightarrow \\text{Amylose}_{(crystalline)}",
        product: "Crystal",
        difficulty: "ELITE"
      },
    ];

    const filteredReactions = allReactions.filter(r => r.difficulty === difficulty);

    for (let i = 0; i < filteredReactions.length; i++) {
      const rxn = filteredReactions[i];

      quests.push({
        id: `REACTIONS_${difficulty}_${i}`,
        difficulty,
        stage,
        substances: ["soda", "salt", "starch"],
        correctIdentifications: {},
        promptLatex: `\\\\text{${rxn.question}}`,
        expressionLatex: rxn.equation,
        targetLatex: `\\\\text{Product}`,
        correctLatex: `\\\\text{${rxn.product}}`,
        slots: [
          { id: "product", labelLatex: "\\\\text{Main product}", placeholder: "Product", expected: 0 },
        ],
      });
    }
    return quests;
  }

  return [];
}

export default function C101Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();
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
    buildPool: (d, s) => buildStagePool(d, s, t),
    initialStage: "IDENTIFY",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sc1-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  if (!currentQuest) return null;

  const stages = [
    { id: "IDENTIFY", label: t("sc1_01.stages.identify") },
    { id: "PROPERTIES", label: t("sc1_01.stages.properties") },
    { id: "REACTIONS", label: t("sc1_01.stages.reactions") },
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
      title={t("sc1_01.title")}
      moduleCode="SC1.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      checkStatus={lastCheck}
      onVerify={verify}
      onNext={handleNextQuest}
      translations={{
        back: t("sc1_01.back"),
        check: t("sc1_01.check"),
        next: t("sc1_01.next"),
        correct: t("sc1_01.correct"),
        incorrect: t("sc1_01.incorrect"),
        difficulty: {
          basic: t("sc1_01.difficulty.basic"),
          core: t("sc1_01.difficulty.core"),
          advanced: t("sc1_01.difficulty.advanced"),
          elite: t("sc1_01.difficulty.elite"),
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
            {t("sc1_01.objective_title")}
          </h3>
          <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic">
            <InlineMath math={currentQuest.promptLatex} />
          </p>
        </div>

        <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/60 rounded-2xl text-center relative max-w-5xl mx-auto shadow-2xl overflow-hidden">
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
          <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">
            {t("sc1_01.target_title")}
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
                className="w-full bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/70 font-black text-2xl text-white"
                placeholder={slot.placeholder}
              />
            </div>
          ))}

          <div className="mt-6 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
            <div className="text-[9px] uppercase tracking-[0.3em] text-white/90 font-black mb-2">{t("sc1_01.labels.method")}</div>
            <div className="text-sm text-white/60 font-mono">
              <InlineMath math={currentQuest.expressionLatex} />
            </div>
          </div>

          <div className="p-4 bg-neon-cyan/5 border border-neon-cyan/20 rounded-xl">
            <div className="text-[9px] uppercase tracking-[0.3em] text-neon-cyan/60 font-black mb-2">{t("sc1_01.labels.hint")}</div>
            <div className="text-xs text-neon-cyan/80 font-mono space-y-1">
              <div>• {t("sc1_01.hints.soda")}</div>
              <div>• {t("sc1_01.hints.starch")}</div>
              <div>• {t("sc1_01.hints.salt")}</div>
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
