"use client";

import { useEffect, useCallback, useMemo } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import RedoxVisualization from "@/components/chamber/sc2-06/RedoxVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "OXIDATION_STATE" | "ELECTRON_TRANSFER" | "ELECTROCHEMISTRY";

interface SC206Quest extends Quest {
  stage: Stage;
  reactants: Array<{ formula: string; oxidationState: number }>;
  products: Array<{ formula: string; oxidationState: number }>;
  oxidationStates: { [key: string]: number };
  electronsTransferred: number;
  cellPotential?: number;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

export default function SC206Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();

  const buildStagePool = useCallback(
    (difficulty: Difficulty, stage: Stage): SC206Quest[] => {
      const quests: SC206Quest[] = [];

      // OXIDATION_STATE Stage
      if (stage === "OXIDATION_STATE") {
        if (difficulty === "BASIC") {
          // Simple compounds: H₂O, NaCl, Fe₂O₃, MgO, Al₂O₃
          const data = [
            { formula: "H₂O", element: "H", answer: 1, ox: { H: 1, O: -2 } as { [key: string]: number } },
            { formula: "NaCl", element: "Na", answer: 1, ox: { Na: 1, Cl: -1 } as { [key: string]: number } },
            { formula: "Fe₂O₃", element: "Fe", answer: 3, ox: { Fe: 3, O: -2 } as { [key: string]: number } },
            { formula: "MgO", element: "Mg", answer: 2, ox: { Mg: 2, O: -2 } as { [key: string]: number } },
            { formula: "Al₂O₃", element: "Al", answer: 3, ox: { Al: 3, O: -2 } as { [key: string]: number } },
          ];
          data.forEach((item, idx) => {
            quests.push({
              id: `OS-B-${idx}`,
              difficulty,
              stage,
              promptLatex: t("sc2_06.prompts.oxidation_state", { formula: item.formula, element: item.element }),
              expressionLatex: `\\\\text{${item.formula}}`,
              targetLatex: `+${item.answer}`,
              slots: [{ id: "ans", labelLatex: "\\\\text{Oxidation State}", placeholder: "±n", expected: item.answer }],
              correctLatex: `+${item.answer}`,
              reactants: [{ formula: item.formula, oxidationState: item.answer }],
              products: [],
              oxidationStates: item.ox,
              electronsTransferred: 0,
            });
          });
        } else if (difficulty === "CORE") {
          // Multi-atom compounds: KMnO₄, H₂SO₄, NH₃, HNO₃, K₂Cr₂O₇
          const data = [
            { formula: "KMnO₄", element: "Mn", answer: 7, ox: { K: 1, Mn: 7, O: -2 } as { [key: string]: number } },
            { formula: "H₂SO₄", element: "S", answer: 6, ox: { H: 1, S: 6, O: -2 } as { [key: string]: number } },
            { formula: "NH₃", element: "N", answer: -3, ox: { N: -3, H: 1 } as { [key: string]: number } },
            { formula: "HNO₃", element: "N", answer: 5, ox: { H: 1, N: 5, O: -2 } as { [key: string]: number } },
            { formula: "K₂Cr₂O₇", element: "Cr", answer: 6, ox: { K: 1, Cr: 6, O: -2 } as { [key: string]: number } },
          ];
          data.forEach((item, idx) => {
            quests.push({
              id: `OS-C-${idx}`,
              difficulty,
              stage,
              promptLatex: t("sc2_06.prompts.oxidation_state", { formula: item.formula, element: item.element }),
              expressionLatex: `\\\\text{${item.formula}}`,
              targetLatex: item.answer > 0 ? `+${item.answer}` : `${item.answer}`,
              slots: [{ id: "ans", labelLatex: "\\\\text{Oxidation State}", placeholder: "±n", expected: item.answer }],
              correctLatex: item.answer > 0 ? `+${item.answer}` : `${item.answer}`,
              reactants: [{ formula: item.formula, oxidationState: item.answer }],
              products: [],
              oxidationStates: item.ox,
              electronsTransferred: 0,
            });
          });
        } else if (difficulty === "ADVANCED") {
          // Complex transition metal compounds
          const data = [
            { formula: "[Fe(CN)₆]³⁻", element: "Fe", answer: 3, ox: { Fe: 3, C: 2, N: -3 } as { [key: string]: number } },
            { formula: "Na₂S₄O₆", element: "S", answer: 2.5, ox: { Na: 1, S: 2.5, O: -2 } as { [key: string]: number } },
            { formula: "[Co(NH₃)₆]³⁺", element: "Co", answer: 3, ox: { Co: 3, N: -3, H: 1 } as { [key: string]: number } },
            { formula: "Fe₃O₄", element: "Fe", answer: 2.67, ox: { Fe: 2.67, O: -2 } as { [key: string]: number } },
            { formula: "Cr₂O₇²⁻", element: "Cr", answer: 6, ox: { Cr: 6, O: -2 } as { [key: string]: number } },
          ];
          data.forEach((item, idx) => {
            quests.push({
              id: `OS-A-${idx}`,
              difficulty,
              stage,
              promptLatex: t("sc2_06.prompts.oxidation_state_complex", { formula: item.formula, element: item.element }),
              expressionLatex: `\\\\text{${item.formula}}`,
              targetLatex: item.answer > 0 ? `+${round2(item.answer)}` : `${round2(item.answer)}`,
              slots: [{ id: "ans", labelLatex: "\\\\text{Oxidation State}", placeholder: "±n", expected: round2(item.answer) }],
              correctLatex: item.answer > 0 ? `+${round2(item.answer)}` : `${round2(item.answer)}`,
              reactants: [{ formula: item.formula, oxidationState: item.answer }],
              products: [],
              oxidationStates: item.ox,
              electronsTransferred: 0,
            });
          });
        } else {
          // ELITE: Organic oxidation states
          const data = [
            { formula: "CH₄", element: "C", answer: -4, ox: { C: -4, H: 1 } as { [key: string]: number } },
            { formula: "CH₃OH", element: "C", answer: -2, ox: { C: -2, H: 1, O: -2 } as { [key: string]: number } },
            { formula: "HCHO", element: "C", answer: 0, ox: { C: 0, H: 1, O: -2 } as { [key: string]: number } },
            { formula: "HCOOH", element: "C", answer: 2, ox: { C: 2, H: 1, O: -2 } as { [key: string]: number } },
            { formula: "CO₂", element: "C", answer: 4, ox: { C: 4, O: -2 } as { [key: string]: number } },
          ];
          data.forEach((item, idx) => {
            quests.push({
              id: `OS-E-${idx}`,
              difficulty,
              stage,
              promptLatex: t("sc2_06.prompts.oxidation_state_organic", { formula: item.formula, element: item.element }),
              expressionLatex: `\\\\text{${item.formula}}`,
              targetLatex: item.answer > 0 ? `+${item.answer}` : `${item.answer}`,
              slots: [{ id: "ans", labelLatex: "\\\\text{Oxidation State}", placeholder: "±n", expected: item.answer }],
              correctLatex: item.answer > 0 ? `+${item.answer}` : `${item.answer}`,
              reactants: [{ formula: item.formula, oxidationState: item.answer }],
              products: [],
              oxidationStates: item.ox,
              electronsTransferred: 0,
            });
          });
        }
      }

      // ELECTRON_TRANSFER Stage
      if (stage === "ELECTRON_TRANSFER") {
        if (difficulty === "BASIC") {
          // Identify oxidizing/reducing agents
          const data = [
            { reaction: "Zn + Cu²⁺ → Zn²⁺ + Cu", question: "oxidizing_agent", answer: "Cu2+", electrons: 2 },
            { reaction: "2Na + Cl₂ → 2NaCl", question: "reducing_agent", answer: "Na", electrons: 1 },
            { reaction: "Mg + 2HCl → MgCl₂ + H₂", question: "oxidizing_agent", answer: "H+", electrons: 2 },
            { reaction: "Fe + S → FeS", question: "reducing_agent", answer: "Fe", electrons: 2 },
            { reaction: "2Al + 3Br₂ → 2AlBr₃", question: "oxidizing_agent", answer: "Br2", electrons: 3 },
          ];
          data.forEach((item, idx) => {
            quests.push({
              id: `ET-B-${idx}`,
              difficulty,
              stage,
              promptLatex: t(`sc2_06.prompts.${item.question}`, { reaction: item.reaction }),
              expressionLatex: `\\\\text{${item.reaction}}`,
              targetLatex: `\\\\text{${item.answer}}`,
              slots: [{ id: "ans", labelLatex: "\\\\text{Agent}", placeholder: "Formula", expected: item.answer }],
              correctLatex: `\\\\text{${item.answer}}`,
              reactants: [{ formula: "Reactant", oxidationState: 0 }],
              products: [{ formula: "Product", oxidationState: 0 }],
              oxidationStates: {},
              electronsTransferred: item.electrons,
            });
          });
        } else if (difficulty === "CORE") {
          // Balance simple redox equations (electrons transferred)
          const data = [
            { reaction: "Fe²⁺ → Fe³⁺", electrons: 1 },
            { reaction: "Cl₂ → 2Cl⁻", electrons: 2 },
            { reaction: "MnO₄⁻ → Mn²⁺", electrons: 5 },
            { reaction: "Cr₂O₇²⁻ → 2Cr³⁺", electrons: 6 },
            { reaction: "NO₃⁻ → NO", electrons: 3 },
          ];
          data.forEach((item, idx) => {
            quests.push({
              id: `ET-C-${idx}`,
              difficulty,
              stage,
              promptLatex: t("sc2_06.prompts.electrons_transferred", { reaction: item.reaction }),
              expressionLatex: `\\\\text{${item.reaction}}`,
              targetLatex: `${item.electrons}e^-`,
              slots: [{ id: "ans", labelLatex: "\\\\text{Electrons}", placeholder: "n", expected: item.electrons }],
              correctLatex: `${item.electrons}e^-`,
              reactants: [{ formula: "Reactant", oxidationState: 0 }],
              products: [{ formula: "Product", oxidationState: 0 }],
              oxidationStates: {},
              electronsTransferred: item.electrons,
            });
          });
        } else if (difficulty === "ADVANCED") {
          // Half-reactions in acidic/basic solutions
          const data = [
            { half: "MnO₄⁻ → Mn²⁺ (acidic)", h2o: 4, h: 8, electrons: 5 },
            { half: "Cr₂O₇²⁻ → 2Cr³⁺ (acidic)", h2o: 7, h: 14, electrons: 6 },
            { half: "NO₃⁻ → NH₄⁺ (acidic)", h2o: 3, h: 10, electrons: 8 },
            { half: "MnO₄⁻ → MnO₂ (basic)", h2o: 2, oh: 4, electrons: 3 },
            { half: "ClO⁻ → Cl⁻ (basic)", h2o: 1, oh: 2, electrons: 2 },
          ];
          data.forEach((item, idx) => {
            quests.push({
              id: `ET-A-${idx}`,
              difficulty,
              stage,
              promptLatex: t("sc2_06.prompts.half_reaction", { half: item.half }),
              expressionLatex: `\\\\text{${item.half}}`,
              targetLatex: `${item.electrons}e^-`,
              slots: [{ id: "ans", labelLatex: "\\\\text{Electrons}", placeholder: "n", expected: item.electrons }],
              correctLatex: `${item.electrons}e^-`,
              reactants: [{ formula: "Reactant", oxidationState: 0 }],
              products: [{ formula: "Product", oxidationState: 0 }],
              oxidationStates: {},
              electronsTransferred: item.electrons,
            });
          });
        } else {
          // ELITE: Disproportionation reactions
          const data = [
            { reaction: "Cl₂ → Cl⁻ + ClO⁻", electrons: 2, type: "disproportionation" },
            { reaction: "3Br₂ → 5Br⁻ + BrO₃⁻", electrons: 10, type: "disproportionation" },
            { reaction: "4P → PH₃ + 3H₂PO₂⁻", electrons: 6, type: "disproportionation" },
            { reaction: "S₂O₃²⁻ → S + SO₄²⁻", electrons: 8, type: "disproportionation" },
            { reaction: "2H₂O₂ → 2H₂O + O₂", electrons: 2, type: "disproportionation" },
          ];
          data.forEach((item, idx) => {
            quests.push({
              id: `ET-E-${idx}`,
              difficulty,
              stage,
              promptLatex: t("sc2_06.prompts.disproportionation", { reaction: item.reaction }),
              expressionLatex: `\\\\text{${item.reaction}}`,
              targetLatex: `${item.electrons}e^-`,
              slots: [{ id: "ans", labelLatex: "\\\\text{Total e⁻}", placeholder: "n", expected: item.electrons }],
              correctLatex: `${item.electrons}e^-`,
              reactants: [{ formula: "Reactant", oxidationState: 0 }],
              products: [{ formula: "Product", oxidationState: 0 }],
              oxidationStates: {},
              electronsTransferred: item.electrons,
            });
          });
        }
      }

      // ELECTROCHEMISTRY Stage
      if (stage === "ELECTROCHEMISTRY") {
        if (difficulty === "BASIC") {
          // Galvanic cell components
          const data = [
            { question: "anode_process", answer: "oxidation" },
            { question: "cathode_process", answer: "reduction" },
            { question: "electron_flow", answer: "anode" },
            { question: "salt_bridge", answer: "ions" },
            { question: "positive_electrode", answer: "cathode" },
          ];
          data.forEach((item, idx) => {
            quests.push({
              id: `EC-B-${idx}`,
              difficulty,
              stage,
              promptLatex: t(`sc2_06.prompts.${item.question}`),
              expressionLatex: "\\\\text{Galvanic Cell}",
              targetLatex: `\\\\text{${item.answer}}`,
              slots: [{ id: "ans", labelLatex: "\\\\text{Answer}", placeholder: "...", expected: item.answer }],
              correctLatex: `\\\\text{${item.answer}}`,
              reactants: [{ formula: "Zn", oxidationState: 0 }],
              products: [{ formula: "Zn²⁺", oxidationState: 2 }],
              oxidationStates: { Zn: 0, Cu: 0 },
              electronsTransferred: 2,
              cellPotential: 1.10,
            });
          });
        } else if (difficulty === "CORE") {
          // Standard electrode potentials
          const data = [
            { cell: "Zn|Zn²⁺||Cu²⁺|Cu", e0: 1.10, zn: -0.76, cu: 0.34 },
            { cell: "Mg|Mg²⁺||Ag⁺|Ag", e0: 3.17, mg: -2.37, ag: 0.80 },
            { cell: "Fe|Fe²⁺||Cu²⁺|Cu", e0: 0.78, fe: -0.44, cu: 0.34 },
            { cell: "Al|Al³⁺||Ni²⁺|Ni", e0: 1.41, al: -1.66, ni: -0.25 },
            { cell: "Pb|Pb²⁺||Ag⁺|Ag", e0: 0.93, pb: -0.13, ag: 0.80 },
          ];
          data.forEach((item, idx) => {
            quests.push({
              id: `EC-C-${idx}`,
              difficulty,
              stage,
              promptLatex: t("sc2_06.prompts.cell_potential", { cell: item.cell }),
              expressionLatex: `\\\\text{${item.cell}}`,
              targetLatex: `${round2(item.e0)}\\\\text{ V}`,
              slots: [{ id: "ans", labelLatex: "E^\\circ_{\\\\text{cell}}", placeholder: "V", expected: round2(item.e0) }],
              correctLatex: `${round2(item.e0)}\\\\text{ V}`,
              reactants: [{ formula: "Anode", oxidationState: 0 }],
              products: [{ formula: "Cathode", oxidationState: 0 }],
              oxidationStates: {},
              electronsTransferred: 2,
              cellPotential: item.e0,
            });
          });
        } else if (difficulty === "ADVANCED") {
          // Nernst equation
          const data = [
            { cell: "Zn|Zn²⁺(0.1M)||Cu²⁺(1M)|Cu", e0: 1.10, q: 0.1, n: 2, e: 1.13 },
            { cell: "Zn|Zn²⁺(1M)||Cu²⁺(0.01M)|Cu", e0: 1.10, q: 100, n: 2, e: 1.04 },
            { cell: "Mg|Mg²⁺(0.5M)||Ag⁺(2M)|Ag", e0: 3.17, q: 0.125, n: 2, e: 3.20 },
            { cell: "Fe|Fe²⁺(2M)||Cu²⁺(0.1M)|Cu", e0: 0.78, q: 20, n: 2, e: 0.74 },
            { cell: "Al|Al³⁺(0.1M)||Ni²⁺(1M)|Ni", e0: 1.41, q: 0.001, n: 6, e: 1.43 },
          ];
          data.forEach((item, idx) => {
            quests.push({
              id: `EC-A-${idx}`,
              difficulty,
              stage,
              promptLatex: t("sc2_06.prompts.nernst_equation", { cell: item.cell }),
              expressionLatex: `E = E^\\circ - \\\\frac{0.0592}{n}\\log Q`,
              targetLatex: `${round2(item.e)}\\\\text{ V}`,
              slots: [{ id: "ans", labelLatex: "E_{\\\\text{cell}}", placeholder: "V", expected: round2(item.e) }],
              correctLatex: `${round2(item.e)}\\\\text{ V}`,
              reactants: [{ formula: "Anode", oxidationState: 0 }],
              products: [{ formula: "Cathode", oxidationState: 0 }],
              oxidationStates: {},
              electronsTransferred: item.n,
              cellPotential: item.e,
            });
          });
        } else {
          // ELITE: Faraday's laws of electrolysis
          const data = [
            { substance: "Cu", current: 2, time: 3600, molar: 63.5, n: 2, mass: 2.37 },
            { substance: "Ag", current: 1, time: 7200, molar: 108, n: 1, mass: 8.05 },
            { substance: "Al", current: 5, time: 1800, molar: 27, n: 3, mass: 2.52 },
            { substance: "Zn", current: 3, time: 2400, molar: 65.4, n: 2, mass: 2.44 },
            { substance: "Ni", current: 4, time: 3000, molar: 58.7, n: 2, mass: 3.66 },
          ];
          data.forEach((item, idx) => {
            quests.push({
              id: `EC-E-${idx}`,
              difficulty,
              stage,
              promptLatex: t("sc2_06.prompts.faraday_law", { 
                substance: item.substance, 
                current: item.current, 
                time: item.time 
              }),
              expressionLatex: `m = \\\\frac{Q \\cdot M}{n \\cdot F}`,
              targetLatex: `${round2(item.mass)}\\\\text{ g}`,
              slots: [{ id: "ans", labelLatex: "\\\\text{Mass (g)}", placeholder: "g", expected: round2(item.mass) }],
              correctLatex: `${round2(item.mass)}\\\\text{ g}`,
              reactants: [{ formula: item.substance, oxidationState: 0 }],
              products: [{ formula: `${item.substance}^{${item.n}+}`, oxidationState: item.n }],
              oxidationStates: {},
              electronsTransferred: item.n,
            });
          });
        }
      }

      return quests;
    },
    [t]
  );

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
  } = useQuestManager<SC206Quest, Stage>({
    buildPool: buildStagePool,
    initialStage: "OXIDATION_STATE",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sc2-06", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const activeScenario = useMemo(() => {
    if (stage === "OXIDATION_STATE") return t("sc2_06.scenarios.oxidation_state");
    if (stage === "ELECTRON_TRANSFER") return t("sc2_06.scenarios.electron_transfer");
    return t("sc2_06.scenarios.electrochemistry");
  }, [stage, t]);

  const stagesProps = useMemo(
    () => [
      { id: "OXIDATION_STATE" as Stage, label: t("sc2_06.stages.oxidation_state") },
      { id: "ELECTRON_TRANSFER" as Stage, label: t("sc2_06.stages.electron_transfer") },
      { id: "ELECTROCHEMISTRY" as Stage, label: t("sc2_06.stages.electrochemistry") },
    ],
    [t]
  );

  return (
    <ChamberLayout
      title={t("sc2_06.title")}
      moduleCode="SC2.06"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stagesProps}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t("sc2_06.footer_left")}
      translations={{
        back: t("sc2_06.back"),
        check: t("sc2_06.check"),
        next: t("sc2_06.next"),
        correct: t("sc2_06.correct"),
        incorrect: t("sc2_06.incorrect"),
        ready: t("sc2_06.ready"),
        monitor_title: t("sc2_06.monitor_title"),
        difficulty: {
          basic: t("sc2_06.difficulty.basic"),
          core: t("sc2_06.difficulty.core"),
          advanced: t("sc2_06.difficulty.advanced"),
          elite: t("sc2_06.difficulty.elite"),
        },
      }}
      monitorContent={
        <RedoxVisualization
          quest={currentQuest}
          inputs={inputs}
          checkStatus={lastCheck}
        />
      }
    >
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-[10px] text-neon-purple uppercase tracking-[0.5em] font-black mb-4 italic">
            {t("sc2_06.mission.title")}
          </h3>
          <div className="text-2xl text-white font-black max-w-3xl mx-auto leading-tight italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </div>
        </div>

        <div className="p-6 bg-black/40 border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6 backdrop-blur-md">
          <div className="space-y-3">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
              {t("sc2_06.labels.input_answer")}
            </div>
            <input
              value={inputs["ans"] || ""}
              onChange={(e) => setInputs({ ans: e.target.value })}
              className="w-full bg-black/50 border-2 border-neon-purple p-4 text-center outline-none focus:border-white placeholder:text-white/20 font-black text-2xl text-white transition-all shadow-[0_0_30px_rgba(168,85,247,0.05)]"
              placeholder={currentQuest?.slots[0]?.placeholder || "..."}
            />
          </div>

          {currentQuest?.expressionLatex && (
            <div className="mt-6 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
              <div className="text-[9px] uppercase tracking-[0.3em] text-neon-amber font-black mb-2">
                {t("sc2_06.labels.reaction")}
              </div>
              <div className="text-sm text-white/70 italic text-center">
                <InlineMath math={currentQuest.expressionLatex} />
              </div>
            </div>
          )}
        </div>

        {activeScenario && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${stage}-${difficulty}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-neon-purple/[0.02] border border-neon-purple/10 rounded-3xl p-8 backdrop-blur-sm max-w-3xl mx-auto w-full"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-neon-purple/20 rounded-lg text-neon-purple shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] uppercase tracking-widest text-neon-purple/60 font-black">
                    {t("sc2_06.labels.regional_case")}
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed italic">
                    {activeScenario}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </ChamberLayout>
  );
}
