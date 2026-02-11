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
};

const molarMassFormulas = ["H2O", "CO2", "NaCl", "CaCO3", "NH3", "H2SO4", "C6H12O6"];

type ReactionSide = { formula: string; coefficient: number };
type Reaction = { reactants: ReactionSide[]; products: ReactionSide[] };

const stoichiometryReactions = [
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
    reaction: { reactants: [{ formula: "CaCO3", coefficient: 1 }], products: [{ formula: "CaO", coefficient: 1 }, { formula: "CO2", coefficient: 1 }] },
    given: { formula: "CaCO3", moles: 2.5 },
    target: "CO2",
  },
  {
    id: "S5",
    reaction: { reactants: [{ formula: "Al", coefficient: 2 }, { formula: "Cl2", coefficient: 3 }], products: [{ formula: "AlCl3", coefficient: 2 }] },
    given: { formula: "Cl2", moles: 6 },
    target: "AlCl3",
  },
  {
    id: "S6",
    reaction: { reactants: [{ formula: "H2O2", coefficient: 2 }], products: [{ formula: "H2O", coefficient: 2 }, { formula: "O2", coefficient: 1 }] },
    given: { formula: "H2O2", moles: 1.2 },
    target: "O2",
  },
  {
    id: "S7",
    reaction: { reactants: [{ formula: "Fe", coefficient: 4 }, { formula: "O2", coefficient: 3 }], products: [{ formula: "Fe2O3", coefficient: 2 }] },
    given: { formula: "Fe", moles: 6 },
    target: "Fe2O3",
  },
];

const yieldReactions = [
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
    reaction: { reactants: [{ formula: "CaCO3", coefficient: 1 }], products: [{ formula: "CaO", coefficient: 1 }, { formula: "CO2", coefficient: 1 }] },
    reactants: [{ formula: "CaCO3", mass: 50 }],
    target: "CO2",
  },
  {
    id: "Y4",
    reaction: { reactants: [{ formula: "Al", coefficient: 2 }, { formula: "Cl2", coefficient: 3 }], products: [{ formula: "AlCl3", coefficient: 2 }] },
    reactants: [{ formula: "Al", mass: 5.4 }, { formula: "Cl2", mass: 21.3 }],
    target: "AlCl3",
  },
  {
    id: "Y5",
    reaction: { reactants: [{ formula: "Fe", coefficient: 4 }, { formula: "O2", coefficient: 3 }], products: [{ formula: "Fe2O3", coefficient: 2 }] },
    reactants: [{ formula: "Fe", mass: 11.2 }, { formula: "O2", mass: 9.6 }],
    target: "Fe2O3",
  },
  {
    id: "Y6",
    reaction: { reactants: [{ formula: "C3H8", coefficient: 1 }, { formula: "O2", coefficient: 5 }], products: [{ formula: "CO2", coefficient: 3 }, { formula: "H2O", coefficient: 4 }] },
    reactants: [{ formula: "C3H8", mass: 22 }, { formula: "O2", mass: 80 }],
    target: "CO2",
  },
  {
    id: "Y7",
    reaction: { reactants: [{ formula: "KClO3", coefficient: 2 }], products: [{ formula: "KCl", coefficient: 2 }, { formula: "O2", coefficient: 3 }] },
    reactants: [{ formula: "KClO3", mass: 24.5 }],
    target: "O2",
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
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
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
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
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
  if (difficulty === "BASIC") return all.slice(0, 4);
  return all;
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
            {currentLanguage === 'DE'
              ? "Tipp: Gib das Resultat als Bruch (z.B. 4/3) oder auf 1 Dezimalstelle gerundet an."
              : currentLanguage === 'CN'
                ? "提示：输入分数 (如 4/3) 或保留 1 位小数。"
                : "Tip: Enter result as a fraction (e.g. 4/3) or rounded to 1 decimal place."
            }
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
