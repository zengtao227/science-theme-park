import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, formatNumber, makeStep, round2, type Translator } from "@/lib/feedback/solverSupport";
import type { SC102Quest } from "./quests";

const ATOMIC_MASSES: Record<string, number> = {
  H: 1.008,
  C: 12.01,
  O: 16,
  Na: 23,
  Cl: 35.45,
  Ca: 40.08,
  S: 32.06,
};

function parseFormula(formula: string) {
  return [...formula.matchAll(/([A-Z][a-z]*)(\d*)/g)].map(([, symbol, count]) => ({
    symbol,
    count: count ? Number(count) : 1,
  }));
}

function computeMolarMass(formula: string) {
  return round2(parseFormula(formula).reduce((sum, part) => sum + (ATOMIC_MASSES[part.symbol] ?? 0) * part.count, 0));
}

function parseLeadingNumber(value: string) {
  const match = value.match(/([0-9]+(?:\.[0-9]+)?)/);
  return match ? Number(match[1]) : null;
}

export function solveSC102(quest: SC102Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];

  if (quest.stage === "MOLAR_MASS" && quest.reactionLatex) {
    const formula = quest.reactionLatex.replace(/_/g, "");
    const parts = parseFormula(formula);
    const massLatex = parts
      .map((part) => `${part.count}\\cdot ${formatNumber(ATOMIC_MASSES[part.symbol] ?? 0)}`)
      .join(" + ");
    const molarMass = computeMolarMass(formula);
    steps.push(
      makeStep(1, t("common.feedback_reasons.identify_given_values"), `\\text{Formula} = ${quest.reactionLatex}`),
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "M = \\sum n_i M_i"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `M = ${massLatex} = ${formatNumber(molarMass)}`),
    );
  } else if (quest.stage === "STOICHIOMETRY") {
    const givenMoles = parseLeadingNumber(quest.reagents[0]?.value ?? "") ?? 0;
    const productMoles = round2(givenMoles * (2 / 2));
    steps.push(
      makeStep(1, t("common.feedback_reasons.identify_given_values"), `${quest.expressionLatex},\\; n(H_2) = ${formatNumber(givenMoles)}`),
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\frac{n(H_2O)}{2} = \\frac{n(H_2)}{2}"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `n(H_2O) = ${formatNumber(givenMoles)} \\cdot \\frac{2}{2} = ${formatNumber(productMoles)}`),
    );
  } else if (quest.stage === "YIELD") {
    const givenMass = parseLeadingNumber(quest.reagents[0]?.value ?? "") ?? 0;
    const nN2 = givenMass / 28.02;
    const theoreticalYield = round2(nN2 * 2 * 17.03);
    steps.push(
      makeStep(1, t("common.feedback_reasons.identify_given_values"), `${quest.expressionLatex},\\; m(N_2) = ${formatNumber(givenMass)}`),
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "m(NH_3) = \\frac{m(N_2)}{M(N_2)} \\cdot 2 \\cdot M(NH_3)"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `m(NH_3) = \\frac{${formatNumber(givenMass)}}{28.02} \\cdot 2 \\cdot 17.03 = ${formatNumber(theoreticalYield)}`),
    );
  } else {
    return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
