"use client";

import { useState, useEffect } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import C101LabCanvas, { Substance, Tool } from "@/components/chamber/sc1-01/LabCanvas";
import ExperimentDesignCard from "@/components/chamber/shared/ExperimentDesignCard";

type Stage = "IDENTIFY" | "PROPERTIES" | "REACTIONS" | "EXPERIMENT";

interface C101Quest extends Quest {
  stage: Stage;
  substances: Substance[];
  correctIdentifications: Record<string, Substance>;
  experimentKey?: string;
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
        promptLatex: `\\\\text{${t('sc1_01.prompts.identify_powders')}}`,
        expressionLatex: `\\\\text{${t('sc1_01.prompts.use_tools')}}`,
        targetLatex: `\\\\text{A, B, C}`,
        correctLatex: `\\\\text{A=${arrangement.A}, B=${arrangement.B}, C=${arrangement.C}}`,
        slots: [
          { id: "A", labelLatex: `\\\\text{${t('sc1_01.prompts.powder_a')}}`, placeholder: "soda/salt/starch", expected: 0 },
          { id: "B", labelLatex: `\\\\text{${t('sc1_01.prompts.powder_b')}}`, placeholder: "soda/salt/starch", expected: 0 },
          { id: "C", labelLatex: `\\\\text{${t('sc1_01.prompts.powder_c')}}`, placeholder: "soda/salt/starch", expected: 0 },
        ],
      });
    }
    return quests;
  }

  // Stage 2: PROPERTIES - Identify based on specific property (5 questions per difficulty)
  if (stage === "PROPERTIES") {
    const allProperties = [
      { key: "basic_0", answer: "soda", difficulty: "BASIC" },
      { key: "basic_1", answer: "starch", difficulty: "BASIC" },
      { key: "basic_2", answer: "salt", difficulty: "BASIC" },
      { key: "basic_3", answer: "salt", difficulty: "BASIC" },
      { key: "basic_4", answer: "soda", difficulty: "BASIC" },
      { key: "core_0", answer: "soda", difficulty: "CORE" },
      { key: "core_1", answer: "starch", difficulty: "CORE" },
      { key: "core_2", answer: "salt", difficulty: "CORE" },
      { key: "core_3", answer: "soda", difficulty: "CORE" },
      { key: "core_4", answer: "starch", difficulty: "CORE" },
      { key: "advanced_0", answer: "soda", difficulty: "ADVANCED" },
      { key: "advanced_1", answer: "salt", difficulty: "ADVANCED" },
      { key: "advanced_2", answer: "starch", difficulty: "ADVANCED" },
      { key: "advanced_3", answer: "soda", difficulty: "ADVANCED" },
      { key: "advanced_4", answer: "salt", difficulty: "ADVANCED" },
      { key: "elite_0", answer: "soda", difficulty: "ELITE" },
      { key: "elite_1", answer: "salt", difficulty: "ELITE" },
      { key: "elite_2", answer: "starch", difficulty: "ELITE" },
      { key: "elite_3", answer: "soda", difficulty: "ELITE" },
      { key: "elite_4", answer: "starch", difficulty: "ELITE" },
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
        promptLatex: `\\\\text{${t(`sc1_01.properties_q.${prop.key}`)}}`,
        expressionLatex: `\\\\text{${t('sc1_01.prompts.test_observe')}}`,
        targetLatex: `\\\\text{${t('sc1_01.prompts.answer')}}`,
        correctLatex: `\\\\text{${prop.answer}}`,
        slots: [
          { id: "answer", labelLatex: `\\\\text{${t('sc1_01.prompts.answer')}}`, placeholder: t('sc1_01.prompts.answer'), expected: 0 },
        ],
      });
    }
    return quests;
  }

  // Stage 3: REACTIONS - Chemical equations (5 questions per difficulty)
  if (stage === "REACTIONS") {
    const allReactions = [
      { key: "basic_0", equation: "NaHCO_3 + CH_3COOH \\rightarrow CO_2 + H_2O + CH_3COONa", product: "CO_2", difficulty: "BASIC" },
      { key: "basic_1", equation: "\\text{Starch} + I_2 \\rightarrow \\text{Blue-black complex}", product: "Blue-black", difficulty: "BASIC" },
      { key: "basic_2", equation: "NaCl \\rightarrow Na^+ + Cl^-", product: "Ions", difficulty: "BASIC" },
      { key: "basic_3", equation: "2NaHCO_3 \\rightarrow Na_2CO_3 + H_2O + CO_2", product: "CO_2", difficulty: "BASIC" },
      { key: "basic_4", equation: "\\text{Starch} + H_2O \\rightarrow \\text{Glucose}", product: "Glucose", difficulty: "BASIC" },
      { key: "core_0", equation: "NaHCO_3 + HCl \\rightarrow NaCl + H_2O + CO_2", product: "NaCl", difficulty: "CORE" },
      { key: "core_1", equation: "\\text{Starch} + I_3^- \\rightarrow \\text{Starch-I}_3^- \\text{ complex}", product: "Complex", difficulty: "CORE" },
      { key: "core_2", equation: "Na^+ + Cl^- \\rightarrow NaCl_{(s)}", product: "Crystal", difficulty: "CORE" },
      { key: "core_3", equation: "NaHCO_3 \\xrightarrow{\\Delta} Na_2CO_3 + H_2O + CO_2", product: "Na_2CO_3", difficulty: "CORE" },
      { key: "core_4", equation: "\\text{Starch} \\xrightarrow{\\text{amylase}} \\text{Maltose}", product: "Maltose", difficulty: "CORE" },
      { key: "advanced_0", equation: "NaHCO_3 + H_2SO_4 \\rightarrow Na_2SO_4 + H_2O + CO_2", product: "Na_2SO_4", difficulty: "ADVANCED" },
      { key: "advanced_1", equation: "(C_6H_{10}O_5)_n + nH_2O \\rightarrow nC_6H_{12}O_6", product: "C_6H_1_2O_6", difficulty: "ADVANCED" },
      { key: "advanced_2", equation: "2NaCl + 2H_2O \\rightarrow 2NaOH + H_2 + Cl_2", product: "Cl_2", difficulty: "ADVANCED" },
      { key: "advanced_3", equation: "HCO_3^- + H^+ \\rightleftharpoons H_2CO_3 \\rightleftharpoons H_2O + CO_2", product: "Buffer", difficulty: "ADVANCED" },
      { key: "advanced_4", equation: "\\text{Starch}_{(s)} + \\text{Heat} + H_2O \\rightarrow \\text{Starch gel}", product: "Gel", difficulty: "ADVANCED" },
      { key: "elite_0", equation: "HCO_3^- + H^+ \\rightleftharpoons H_2CO_3 \\rightleftharpoons CO_2 + H_2O", product: "CO_2", difficulty: "ELITE" },
      { key: "elite_1", equation: "\\text{Amylose helix} + I_3^- \\rightarrow \\text{Inclusion complex}", product: "Inclusion", difficulty: "ELITE" },
      { key: "elite_2", equation: "NaCl + NH_3 + CO_2 + H_2O \\rightarrow NaHCO_3 + NH_4Cl", product: "NaHCO_3", difficulty: "ELITE" },
      { key: "elite_3", equation: "2NaHCO_3 \\xrightarrow{k} Na_2CO_3 + H_2O + CO_2", product: "Na_2CO_3", difficulty: "ELITE" },
      { key: "elite_4", equation: "\\text{Amylose}_{(aq)} \\rightarrow \\text{Amylose}_{(crystalline)}", product: "Crystal", difficulty: "ELITE" },
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
        promptLatex: `\\\\text{${t(`sc1_01.reactions_q.${rxn.key}`)}}`,
        expressionLatex: rxn.equation,
        targetLatex: `\\\\text{${t('sc1_01.prompts.product')}}`,
        correctLatex: `\\\\text{${rxn.product}}`,
        slots: [
          { id: "product", labelLatex: `\\\\text{${t('sc1_01.prompts.product')}}`, placeholder: t('sc1_01.prompts.product'), expected: 0 },
        ],
      });
    }
    return quests;
  }

  if (stage === "EXPERIMENT") {
    const experimentQuests: C101Quest[] = [];
    experimentQuests.push({
      id: "EXP_1",
      difficulty,
      stage,
      substances: [],
      correctIdentifications: {},
      experimentKey: "ph_analysis",
      promptLatex: `\\\\text{${t('sc1_01.prompts.review_design')}}`,
      expressionLatex: `\\\\text{${t('sc1_01.experiments.ph_analysis.action')}}`,
      targetLatex: `\\\\text{${t('sc1_01.experiments.ph_analysis.target')}}`,
      correctLatex: "\\text{1}",
      slots: [{ id: "acknowledge", labelLatex: `\\\\text{${t('sc1_01.prompts.understood')}}`, placeholder: t('sc1_01.prompts.confirm_1'), expected: 1 }]
    });

    experimentQuests.push({
      id: "EXP_2",
      difficulty,
      stage,
      substances: [],
      correctIdentifications: {},
      experimentKey: "salt_purification",
      promptLatex: `\\\\text{${t('sc1_01.prompts.review_design')}}`,
      expressionLatex: `\\\\text{${t('sc1_01.experiments.salt_purification.action')}}`,
      targetLatex: `\\\\text{${t('sc1_01.experiments.salt_purification.target')}}`,
      correctLatex: "\\text{1}",
      slots: [{ id: "acknowledge", labelLatex: `\\\\text{${t('sc1_01.prompts.understood')}}`, placeholder: t('sc1_01.prompts.confirm_1'), expected: 1 }]
    });

    return experimentQuests;
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
    adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<C101Quest, Stage>({
    moduleCode: "sc1-01",
    buildPool: (d, s) => buildStagePool(d, s, t),
    initialStage: "IDENTIFY",
  });

  const handleNextQuest = () => {
    setTestedReactions([]);
    next();
  };

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
    { id: "EXPERIMENT", label: t("sc1_01.stages.experiment") || "EXPERIMENT" },
  ];

  const handleTest = (substance: Substance, tool: Tool) => {
    setTestedReactions(prev => [...prev, { substance, tool }]);
  };



  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("sc1_01.title")}
      moduleCode="SC1.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => {
        handleStageChange(s as Stage);
        setTestedReactions([]);
      }}
      checkStatus={lastCheck}
      onVerify={verify}
      onNext={handleNextQuest}
      translations={{
        back: t("sc1_01.back"),
        check: t("sc1_01.check"),
        next: t("sc1_01.next"),
        correct: t("sc1_01.correct"),
        incorrect: t("sc1_01.incorrect"),
        ready: t("sc1_01.ready"),
        monitor_title: t("sc1_01.monitor_title"),
        difficulty: {
          basic: t("sc1_01.difficulty.basic"),
          core: t("sc1_01.difficulty.core"),
          advanced: t("sc1_01.difficulty.advanced"),
          elite: t("sc1_01.difficulty.elite"),
        },
      }}
      footerLeft={t("sc1_01.footer_left")}
      monitorContent={
        stage === "EXPERIMENT" ? (
          <ExperimentDesignCard
            scenarioTitle={t(`sc1_01.experiments.${currentQuest?.experimentKey}.title`)}
            scenarioContext={t(`sc1_01.experiments.${currentQuest?.experimentKey}.context`)}
            purpose={t(`sc1_01.experiments.${currentQuest?.experimentKey}.purpose`)}
            materials={(t(`sc1_01.experiments.${currentQuest?.experimentKey}.materials`) as unknown as string[]) || []}
            procedure={(t(`sc1_01.experiments.${currentQuest?.experimentKey}.procedure`) as unknown as string[]) || []}
            expectedResults={t(`sc1_01.experiments.${currentQuest?.experimentKey}.expectedResults`)}
            safetyWarning={t(`sc1_01.experiments.${currentQuest?.experimentKey}.safetyWarning`)}
          />
        ) : (
          <C101LabCanvas
            onTest={handleTest}
            testedReactions={testedReactions}
            showAnswer={lastCheck?.ok === true}
          />
        )
      }
    >
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t("sc1_01.objective_title")}
          </h3>
          <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </p>
        </div>

        <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/60 rounded-2xl text-center relative max-w-5xl mx-auto shadow-2xl overflow-hidden">
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
          <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">
            {t("sc1_01.target_title")}
          </span>
          <div className="font-black italic tracking-tighter text-white block py-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] text-[clamp(1.6rem,4.8vw,4.5rem)] leading-[0.95]">
            <InlineMath math={currentQuest?.targetLatex || ""} />
          </div>
        </div>

        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          {currentQuest?.slots.map((slot) => (
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
              <InlineMath math={currentQuest?.expressionLatex || ""} />
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
