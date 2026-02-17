"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import MoleCanvas from "@/components/chamber/sc1-02/MoleCanvas";

type Stage = "MOLAR_MASS" | "STOICHIOMETRY" | "YIELD";
type C102T = typeof translations.EN.sc1_02;

interface ReagentInfo {
  label: string;
  value: string;
}

interface C102Quest extends Quest {
  stage: Stage;
  reactionLatex?: string;
  reagents: ReagentInfo[];
  scaleReading: string;
}

const atomicWeights: Record<string, number> = {
  H: 1.008,
  C: 12.01,
  O: 16.0,
  Na: 22.99,
  Cl: 35.45,
  Ca: 40.08,
  N: 14.01,
  S: 32.06,
  Al: 26.98,
  Fe: 55.85,
  K: 39.1,
  Mg: 24.31,
  P: 30.97,
};

// 20 formulas for molar mass calculations (4 difficulties × 5 questions)
const molarMassFormulas = [
  // BASIC (5 questions) - Simple molecules
  "H2O", "CO2", "NaCl", "NH3", "O2",
  // CORE (5 questions) - Common compounds
  "CaCO3", "H2SO4", "NaOH", "HCl", "CH4",
  // ADVANCED (5 questions) - More complex molecules
  "C6H12O6", "Ca(OH)2", "Al2O3", "Fe2O3", "C2H5OH",
  // ELITE (5 questions) - Complex compounds
  "C12H22O11", "Ca3(PO4)2", "Al2(SO4)3", "Fe(NO3)3", "C6H5COOH",
];

type ReactionSide = { formula: string; coefficient: number };
type Reaction = { reactants: ReactionSide[]; products: ReactionSide[] };

// 20 stoichiometry reactions (4 difficulties × 5 questions)
const stoichiometryReactions = [
  // BASIC (5 questions) - Simple reactions
  {
    id: "S1",
    reaction: { reactants: [{ formula: "H2", coefficient: 2 }, { formula: "O2", coefficient: 1 }], products: [{ formula: "H2O", coefficient: 2 }] },
    given: { formula: "H2", moles: 3 },
    target: "H2O",
  },
  {
    id: "S2",
    reaction: { reactants: [{ formula: "N2", coefficient: 1 }, { formula: "H2", coefficient: 3 }], products: [{ formula: "NH3", coefficient: 2 }] },
    given: { formula: "H2", moles: 4.5 },
    target: "NH3",
  },
  {
    id: "S3",
    reaction: { reactants: [{ formula: "Na", coefficient: 2 }, { formula: "Cl2", coefficient: 1 }], products: [{ formula: "NaCl", coefficient: 2 }] },
    given: { formula: "Na", moles: 5 },
    target: "NaCl",
  },
  {
    id: "S4",
    reaction: { reactants: [{ formula: "C", coefficient: 1 }, { formula: "O2", coefficient: 1 }], products: [{ formula: "CO2", coefficient: 1 }] },
    given: { formula: "C", moles: 2 },
    target: "CO2",
  },
  {
    id: "S5",
    reaction: { reactants: [{ formula: "Mg", coefficient: 2 }, { formula: "O2", coefficient: 1 }], products: [{ formula: "MgO", coefficient: 2 }] },
    given: { formula: "Mg", moles: 4 },
    target: "MgO",
  },
  // CORE (5 questions) - Common reactions
  {
    id: "S6",
    reaction: { reactants: [{ formula: "CaCO3", coefficient: 1 }], products: [{ formula: "CaO", coefficient: 1 }, { formula: "CO2", coefficient: 1 }] },
    given: { formula: "CaCO3", moles: 2.5 },
    target: "CO2",
  },
  {
    id: "S7",
    reaction: { reactants: [{ formula: "Al", coefficient: 2 }, { formula: "Cl2", coefficient: 3 }], products: [{ formula: "AlCl3", coefficient: 2 }] },
    given: { formula: "Cl2", moles: 6 },
    target: "AlCl3",
  },
  {
    id: "S8",
    reaction: { reactants: [{ formula: "H2O2", coefficient: 2 }], products: [{ formula: "H2O", coefficient: 2 }, { formula: "O2", coefficient: 1 }] },
    given: { formula: "H2O2", moles: 1.2 },
    target: "O2",
  },
  {
    id: "S9",
    reaction: { reactants: [{ formula: "CH4", coefficient: 1 }, { formula: "O2", coefficient: 2 }], products: [{ formula: "CO2", coefficient: 1 }, { formula: "H2O", coefficient: 2 }] },
    given: { formula: "CH4", moles: 3 },
    target: "H2O",
  },
  {
    id: "S10",
    reaction: { reactants: [{ formula: "NaOH", coefficient: 1 }, { formula: "HCl", coefficient: 1 }], products: [{ formula: "NaCl", coefficient: 1 }, { formula: "H2O", coefficient: 1 }] },
    given: { formula: "NaOH", moles: 2.5 },
    target: "NaCl",
  },
  // ADVANCED (5 questions) - Complex reactions
  {
    id: "S11",
    reaction: { reactants: [{ formula: "Fe", coefficient: 4 }, { formula: "O2", coefficient: 3 }], products: [{ formula: "Fe2O3", coefficient: 2 }] },
    given: { formula: "Fe", moles: 6 },
    target: "Fe2O3",
  },
  {
    id: "S12",
    reaction: { reactants: [{ formula: "C3H8", coefficient: 1 }, { formula: "O2", coefficient: 5 }], products: [{ formula: "CO2", coefficient: 3 }, { formula: "H2O", coefficient: 4 }] },
    given: { formula: "C3H8", moles: 2 },
    target: "CO2",
  },
  {
    id: "S13",
    reaction: { reactants: [{ formula: "KClO3", coefficient: 2 }], products: [{ formula: "KCl", coefficient: 2 }, { formula: "O2", coefficient: 3 }] },
    given: { formula: "KClO3", moles: 4 },
    target: "O2",
  },
  {
    id: "S14",
    reaction: { reactants: [{ formula: "Ca(OH)2", coefficient: 1 }, { formula: "CO2", coefficient: 1 }], products: [{ formula: "CaCO3", coefficient: 1 }, { formula: "H2O", coefficient: 1 }] },
    given: { formula: "CO2", moles: 3.5 },
    target: "CaCO3",
  },
  {
    id: "S15",
    reaction: { reactants: [{ formula: "Al2O3", coefficient: 2 }, { formula: "C", coefficient: 3 }], products: [{ formula: "Al", coefficient: 4 }, { formula: "CO", coefficient: 3 }] },
    given: { formula: "Al2O3", moles: 5 },
    target: "Al",
  },
  // ELITE (5 questions) - Most complex reactions
  {
    id: "S16",
    reaction: { reactants: [{ formula: "C6H12O6", coefficient: 1 }], products: [{ formula: "C2H5OH", coefficient: 2 }, { formula: "CO2", coefficient: 2 }] },
    given: { formula: "C6H12O6", moles: 1.5 },
    target: "C2H5OH",
  },
  {
    id: "S17",
    reaction: { reactants: [{ formula: "Fe2O3", coefficient: 1 }, { formula: "CO", coefficient: 3 }], products: [{ formula: "Fe", coefficient: 2 }, { formula: "CO2", coefficient: 3 }] },
    given: { formula: "CO", moles: 9 },
    target: "Fe",
  },
  {
    id: "S18",
    reaction: { reactants: [{ formula: "NH3", coefficient: 4 }, { formula: "O2", coefficient: 5 }], products: [{ formula: "NO", coefficient: 4 }, { formula: "H2O", coefficient: 6 }] },
    given: { formula: "NH3", moles: 8 },
    target: "NO",
  },
  {
    id: "S19",
    reaction: { reactants: [{ formula: "C2H5OH", coefficient: 1 }, { formula: "O2", coefficient: 3 }], products: [{ formula: "CO2", coefficient: 2 }, { formula: "H2O", coefficient: 3 }] },
    given: { formula: "O2", moles: 12 },
    target: "CO2",
  },
  {
    id: "S20",
    reaction: { reactants: [{ formula: "Ca3(PO4)2", coefficient: 1 }, { formula: "H2SO4", coefficient: 3 }], products: [{ formula: "CaSO4", coefficient: 3 }, { formula: "H3PO4", coefficient: 2 }] },
    given: { formula: "H2SO4", moles: 6 },
    target: "H3PO4",
  },
];

// 20 yield reactions (4 difficulties × 5 questions)
const yieldReactions = [
  // BASIC (5 questions) - Simple yield calculations
  {
    id: "Y1",
    reaction: { reactants: [{ formula: "H2", coefficient: 2 }, { formula: "O2", coefficient: 1 }], products: [{ formula: "H2O", coefficient: 2 }] },
    reactants: [{ formula: "H2", mass: 8 }, { formula: "O2", mass: 32 }],
    target: "H2O",
  },
  {
    id: "Y2",
    reaction: { reactants: [{ formula: "N2", coefficient: 1 }, { formula: "H2", coefficient: 3 }], products: [{ formula: "NH3", coefficient: 2 }] },
    reactants: [{ formula: "N2", mass: 28 }, { formula: "H2", mass: 6 }],
    target: "NH3",
  },
  {
    id: "Y3",
    reaction: { reactants: [{ formula: "C", coefficient: 1 }, { formula: "O2", coefficient: 1 }], products: [{ formula: "CO2", coefficient: 1 }] },
    reactants: [{ formula: "C", mass: 12 }, { formula: "O2", mass: 32 }],
    target: "CO2",
  },
  {
    id: "Y4",
    reaction: { reactants: [{ formula: "Mg", coefficient: 2 }, { formula: "O2", coefficient: 1 }], products: [{ formula: "MgO", coefficient: 2 }] },
    reactants: [{ formula: "Mg", mass: 24 }, { formula: "O2", mass: 16 }],
    target: "MgO",
  },
  {
    id: "Y5",
    reaction: { reactants: [{ formula: "Na", coefficient: 2 }, { formula: "Cl2", coefficient: 1 }], products: [{ formula: "NaCl", coefficient: 2 }] },
    reactants: [{ formula: "Na", mass: 23 }, { formula: "Cl2", mass: 35.5 }],
    target: "NaCl",
  },
  // CORE (5 questions) - Common reactions
  {
    id: "Y6",
    reaction: { reactants: [{ formula: "CaCO3", coefficient: 1 }], products: [{ formula: "CaO", coefficient: 1 }, { formula: "CO2", coefficient: 1 }] },
    reactants: [{ formula: "CaCO3", mass: 50 }],
    target: "CO2",
  },
  {
    id: "Y7",
    reaction: { reactants: [{ formula: "Al", coefficient: 2 }, { formula: "Cl2", coefficient: 3 }], products: [{ formula: "AlCl3", coefficient: 2 }] },
    reactants: [{ formula: "Al", mass: 5.4 }, { formula: "Cl2", mass: 21.3 }],
    target: "AlCl3",
  },
  {
    id: "Y8",
    reaction: { reactants: [{ formula: "CH4", coefficient: 1 }, { formula: "O2", coefficient: 2 }], products: [{ formula: "CO2", coefficient: 1 }, { formula: "H2O", coefficient: 2 }] },
    reactants: [{ formula: "CH4", mass: 16 }, { formula: "O2", mass: 64 }],
    target: "CO2",
  },
  {
    id: "Y9",
    reaction: { reactants: [{ formula: "NaOH", coefficient: 1 }, { formula: "HCl", coefficient: 1 }], products: [{ formula: "NaCl", coefficient: 1 }, { formula: "H2O", coefficient: 1 }] },
    reactants: [{ formula: "NaOH", mass: 40 }, { formula: "HCl", mass: 36.5 }],
    target: "NaCl",
  },
  {
    id: "Y10",
    reaction: { reactants: [{ formula: "H2O2", coefficient: 2 }], products: [{ formula: "H2O", coefficient: 2 }, { formula: "O2", coefficient: 1 }] },
    reactants: [{ formula: "H2O2", mass: 34 }],
    target: "O2",
  },
  // ADVANCED (5 questions) - Complex reactions
  {
    id: "Y11",
    reaction: { reactants: [{ formula: "Fe", coefficient: 4 }, { formula: "O2", coefficient: 3 }], products: [{ formula: "Fe2O3", coefficient: 2 }] },
    reactants: [{ formula: "Fe", mass: 11.2 }, { formula: "O2", mass: 9.6 }],
    target: "Fe2O3",
  },
  {
    id: "Y12",
    reaction: { reactants: [{ formula: "C3H8", coefficient: 1 }, { formula: "O2", coefficient: 5 }], products: [{ formula: "CO2", coefficient: 3 }, { formula: "H2O", coefficient: 4 }] },
    reactants: [{ formula: "C3H8", mass: 22 }, { formula: "O2", mass: 80 }],
    target: "CO2",
  },
  {
    id: "Y13",
    reaction: { reactants: [{ formula: "KClO3", coefficient: 2 }], products: [{ formula: "KCl", coefficient: 2 }, { formula: "O2", coefficient: 3 }] },
    reactants: [{ formula: "KClO3", mass: 24.5 }],
    target: "O2",
  },
  {
    id: "Y14",
    reaction: { reactants: [{ formula: "Ca(OH)2", coefficient: 1 }, { formula: "CO2", coefficient: 1 }], products: [{ formula: "CaCO3", coefficient: 1 }, { formula: "H2O", coefficient: 1 }] },
    reactants: [{ formula: "Ca(OH)2", mass: 37 }, { formula: "CO2", mass: 44 }],
    target: "CaCO3",
  },
  {
    id: "Y15",
    reaction: { reactants: [{ formula: "Al2O3", coefficient: 2 }, { formula: "C", coefficient: 3 }], products: [{ formula: "Al", coefficient: 4 }, { formula: "CO", coefficient: 3 }] },
    reactants: [{ formula: "Al2O3", mass: 51 }, { formula: "C", mass: 18 }],
    target: "Al",
  },
  // ELITE (5 questions) - Most complex reactions
  {
    id: "Y16",
    reaction: { reactants: [{ formula: "C6H12O6", coefficient: 1 }], products: [{ formula: "C2H5OH", coefficient: 2 }, { formula: "CO2", coefficient: 2 }] },
    reactants: [{ formula: "C6H12O6", mass: 90 }],
    target: "C2H5OH",
  },
  {
    id: "Y17",
    reaction: { reactants: [{ formula: "Fe2O3", coefficient: 1 }, { formula: "CO", coefficient: 3 }], products: [{ formula: "Fe", coefficient: 2 }, { formula: "CO2", coefficient: 3 }] },
    reactants: [{ formula: "Fe2O3", mass: 80 }, { formula: "CO", mass: 42 }],
    target: "Fe",
  },
  {
    id: "Y18",
    reaction: { reactants: [{ formula: "NH3", coefficient: 4 }, { formula: "O2", coefficient: 5 }], products: [{ formula: "NO", coefficient: 4 }, { formula: "H2O", coefficient: 6 }] },
    reactants: [{ formula: "NH3", mass: 34 }, { formula: "O2", mass: 80 }],
    target: "NO",
  },
  {
    id: "Y19",
    reaction: { reactants: [{ formula: "C2H5OH", coefficient: 1 }, { formula: "O2", coefficient: 3 }], products: [{ formula: "CO2", coefficient: 2 }, { formula: "H2O", coefficient: 3 }] },
    reactants: [{ formula: "C2H5OH", mass: 23 }, { formula: "O2", mass: 48 }],
    target: "CO2",
  },
  {
    id: "Y20",
    reaction: { reactants: [{ formula: "Ca3(PO4)2", coefficient: 1 }, { formula: "H2SO4", coefficient: 3 }], products: [{ formula: "CaSO4", coefficient: 3 }, { formula: "H3PO4", coefficient: 2 }] },
    reactants: [{ formula: "Ca3(PO4)2", mass: 155 }, { formula: "H2SO4", mass: 147 }],
    target: "H3PO4",
  },
];

function normalizeFormula(formula: string) {
  return formula.replace(/[_{}]/g, "");
}

function parseFormula(formula: string) {
  const normalized = normalizeFormula(formula);
  const regex = /([A-Z][a-z]?)(\d*)/g;
  const parts: Array<{ symbol: string; count: number }> = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(normalized))) {
    const symbol = match[1];
    const count = match[2] ? parseInt(match[2], 10) : 1;
    const existing = parts.find((p) => p.symbol === symbol);
    if (existing) {
      existing.count += count;
    } else {
      parts.push({ symbol, count });
    }
  }
  return parts;
}

function toLatexFormula(formula: string) {
  return normalizeFormula(formula).replace(/(\d+)/g, "_{$1}");
}

function formatAtomicWeight(value: number) {
  const decimals = value < 10 ? 3 : 2;
  return value.toFixed(decimals);
}

function roundValue(value: number, decimals: number) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

function formatValue(value: number, decimals: number) {
  return roundValue(value, decimals).toFixed(decimals).replace(/\.?0+$/, "");
}

function computeMolarMass(formula: string) {
  return parseFormula(formula).reduce((sum, part) => {
    const weight = atomicWeights[part.symbol] ?? 0;
    return sum + weight * part.count;
  }, 0);
}

function buildMolarBreakdown(formula: string) {
  const parts = parseFormula(formula);
  const atoms = parts.map((part) => `${part.symbol}=${formatAtomicWeight(atomicWeights[part.symbol] ?? 0)}`).join(",\\; ");
  const breakdown = parts.map((part) => {
    const weight = formatAtomicWeight(atomicWeights[part.symbol] ?? 0);
    return part.count > 1 ? `${part.count}\\times ${weight}` : weight;
  }).join("+");
  return { atoms, breakdown };
}

function buildReactionLatex(reaction: Reaction) {
  const formatSide = (side: ReactionSide[]) => side.map((s) => `${s.coefficient === 1 ? "" : s.coefficient}${toLatexFormula(s.formula)}`).join("+");
  return `${formatSide(reaction.reactants)}\\rightarrow ${formatSide(reaction.products)}`;
}

function findCoefficient(reaction: Reaction, formula: string) {
  const entry = [...reaction.reactants, ...reaction.products].find((s) => s.formula === formula);
  return entry?.coefficient ?? 1;
}

function computeStoichiometryAnswer(reaction: Reaction, givenFormula: string, targetFormula: string, givenMoles: number) {
  const givenCoeff = findCoefficient(reaction, givenFormula);
  const targetCoeff = findCoefficient(reaction, targetFormula);
  return (givenMoles / givenCoeff) * targetCoeff;
}

function computeTheoreticalYield(reaction: Reaction, reactants: Array<{ formula: string; mass: number }>, targetFormula: string) {
  const targetCoeff = findCoefficient(reaction, targetFormula);
  const limitingMoles = reactants.map((r) => {
    const coeff = findCoefficient(reaction, r.formula);
    const molarMass = computeMolarMass(r.formula);
    return (r.mass / molarMass) / coeff;
  });
  const maxProductMoles = Math.min(...limitingMoles) * targetCoeff;
  return maxProductMoles * computeMolarMass(targetFormula);
}

function buildStagePool(t: C102T, difficulty: Difficulty, stage: Stage): C102Quest[] {
  if (stage === "MOLAR_MASS") {
    const all = molarMassFormulas.map((formula, index) => {
      const formulaLatex = toLatexFormula(formula);
      const { atoms, breakdown } = buildMolarBreakdown(formula);
      const molarMass = computeMolarMass(formula);
      const rounded = roundValue(molarMass, 2);
      const display = formatValue(molarMass, 2);
      return {
        id: `M${index + 1}`,
        difficulty,
        stage,
        reactionLatex: formulaLatex,
        promptLatex: t.stages.molar_mass_prompt_latex,
        expressionLatex: `${formulaLatex},\\; ${breakdown}`,
        targetLatex: "M",
        slots: [{ id: "M", labelLatex: "M", placeholder: "molar mass", expected: rounded, unit: "g/mol" }],
        correctLatex: `M=${display}\\;\\text{g/mol}`,
        reagents: [
          { label: "FORMULA", value: formulaLatex },
          { label: "ATOMS", value: atoms },
        ],
        scaleReading: `${display}\\;\\text{g/mol}`,
      };
    });
    
    // Select 5 questions based on difficulty
    const startIndex = difficulty === "BASIC" ? 0 : difficulty === "CORE" ? 5 : difficulty === "ADVANCED" ? 10 : 15;
    return all.slice(startIndex, startIndex + 5);
  }

  if (stage === "STOICHIOMETRY") {
    const all = stoichiometryReactions.map((item) => {
      const reactionLatex = buildReactionLatex(item.reaction);
      const targetLatex = `n(${toLatexFormula(item.target)})`;
      const givenLatex = `n(${toLatexFormula(item.given.formula)})=${formatValue(item.given.moles, 2)}\\;\\text{mol}`;
      const answer = computeStoichiometryAnswer(item.reaction, item.given.formula, item.target, item.given.moles);
      const rounded = roundValue(answer, 2);
      const display = formatValue(answer, 2);
      return {
        id: item.id,
        difficulty,
        stage,
        reactionLatex,
        promptLatex: t.stages.stoichiometry_prompt_latex,
        expressionLatex: `${reactionLatex},\\; ${givenLatex}`,
        targetLatex,
        slots: [{ id: "n", labelLatex: targetLatex, placeholder: "amount", expected: rounded, unit: "mol" }],
        correctLatex: `${targetLatex}=${display}\\;\\text{mol}`,
        reagents: [
          { label: "REACTION", value: reactionLatex },
          { label: "GIVEN", value: givenLatex },
        ],
        scaleReading: `${display}\\;\\text{mol}`,
      };
    });
    
    // Select 5 questions based on difficulty
    const startIndex = difficulty === "BASIC" ? 0 : difficulty === "CORE" ? 5 : difficulty === "ADVANCED" ? 10 : 15;
    return all.slice(startIndex, startIndex + 5);
  }

  const all = yieldReactions.map((item) => {
    const reactionLatex = buildReactionLatex(item.reaction);
    const givenLatex = item.reactants.map((r) => `m(${toLatexFormula(r.formula)})=${formatValue(r.mass, 2)}\\;\\text{g}`).join(",\\; ");
    const targetLatex = `m(${toLatexFormula(item.target)})`;
    const answer = computeTheoreticalYield(item.reaction, item.reactants, item.target);
    const rounded = roundValue(answer, 2);
    const display = formatValue(answer, 2);
    return {
      id: item.id,
      difficulty,
      stage,
      reactionLatex,
      promptLatex: t.stages.yield_prompt_latex,
      expressionLatex: `${reactionLatex},\\; ${givenLatex}`,
      targetLatex,
      slots: [{ id: "m", labelLatex: targetLatex, placeholder: "mass", expected: rounded, unit: "g" }],
      correctLatex: `${targetLatex}=${display}\\;\\text{g}`,
      reagents: [
        { label: "REACTION", value: reactionLatex },
        { label: "GIVEN", value: givenLatex },
      ],
      scaleReading: `${display}\\;\\text{g}`,
    };
  });
  
  // Select 5 questions based on difficulty
  const startIndex = difficulty === "BASIC" ? 0 : difficulty === "CORE" ? 5 : difficulty === "ADVANCED" ? 10 : 15;
  return all.slice(startIndex, startIndex + 5);
}

export default function C102Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].sc1_02;

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
    parseNumberLike,
  } = useQuestManager<C102Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "MOLAR_MASS",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sc1-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const activeSlot = currentQuest?.slots?.[0];
  const inputValue = useMemo(() => {
    if (!activeSlot) return null;
    return parseNumberLike(inputs[activeSlot.id] ?? "");
  }, [activeSlot, inputs, parseNumberLike]);
  const targetValue = typeof activeSlot?.expected === "number" ? activeSlot.expected : null;
  const stageLabel = useMemo(() => {
    if (stage === "MOLAR_MASS") return t.stages.molar_mass;
    if (stage === "STOICHIOMETRY") return t.stages.stoichiometry;
    return t.stages.yield;
  }, [stage, t.stages.molar_mass, t.stages.stoichiometry, t.stages.yield]);
  const status = lastCheck?.ok ? "correct" : lastCheck ? "incorrect" : "idle";

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="SC1.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "MOLAR_MASS", label: t.stages.molar_mass },
        { id: "STOICHIOMETRY", label: t.stages.stoichiometry },
        { id: "YIELD", label: t.stages.yield },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t.footer_left}
      translations={{
        back: t.back,
        check: t.check,
        next: t.next,
        correct: t.correct,
        incorrect: t.incorrect,
        ready: t.ready,
        monitor_title: t.monitor_title,
        difficulty: {
          basic: t.difficulty.basic,
          core: t.difficulty.core,
          advanced: t.difficulty.advanced,
          elite: t.difficulty.elite,
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <MoleCanvas
            stageLabel={stageLabel}
            unit={activeSlot?.unit ?? ""}
            inputValue={typeof inputValue === "number" ? inputValue : null}
            targetValue={targetValue}
            status={status}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.target_title}</div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[11px] font-black tracking-[0.3em] text-white/60">{t.labels.scale}</div>
            <div className="text-white font-black text-xl">
              <InlineMath math={currentQuest?.scaleReading || ""} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {currentQuest?.reagents.map((item) => (
              <div key={item.label} className="flex items-center justify-between border border-white/10 bg-black/40 px-3 py-2 text-xs font-mono">
                <span className="text-white/60">{item.label}</span>
                <span className="text-white">
                  <InlineMath math={item.value} />
                </span>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono">{t.mission.description}</p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.objective_title}</h3>
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                  <InlineMath math={slot.labelLatex} />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                    className="flex-1 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                    placeholder={slot.placeholder}
                  />
                  {slot.unit && (
                    <div className="text-xl font-black text-white/80 min-w-[60px]">
                      <InlineMath math={slot.unit} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-white/90 font-mono italic text-center">
            {t.input_tip_1dp}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
