import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, formatNumber, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SP304Quest } from "./types";

function buildGivenLatex(quest: SP304Quest) {
  const entries: string[] = [];
  if (quest.depth != null) entries.push(`h=${formatNumber(quest.depth)}`);
  if (quest.area != null) entries.push(`A=${formatNumber(quest.area)}`);
  if (quest.force != null) entries.push(`F=${formatNumber(quest.force)}`);
  if (quest.volume != null) entries.push(`V=${formatNumber(quest.volume)}`);
  return entries.join(",\\; ");
}

function buildSubstitutionLatex(quest: SP304Quest) {
  if (quest.stage === "PRESSURE" && quest.area != null && quest.force != null && quest.targetLatex === "P") {
    return `P = \\frac{F}{A} = \\frac{${formatNumber(quest.force)}}{${formatNumber(quest.area)}} = ${formatNumber(quest.force / quest.area)}`;
  }
  if (quest.stage === "HYDRAULICS" && quest.area != null && quest.force != null && quest.targetLatex === "P") {
    return `P = \\frac{F}{A} = \\frac{${formatNumber(quest.force)}}{${formatNumber(quest.area)}} = ${formatNumber(quest.force / quest.area)}`;
  }
  if (quest.stage === "BUOYANCY" && quest.volume != null) {
    if (quest.targetLatex.includes("F_b")) {
      return quest.expressionLatex;
    }
    if (quest.targetLatex.includes("W_{app}")) {
      return quest.expressionLatex;
    }
    if (quest.targetLatex.includes("m")) {
      return quest.expressionLatex;
    }
    if (quest.targetLatex.includes("\\rho")) {
      return quest.expressionLatex;
    }
  }
  if (quest.stage === "HYDRAULICS") {
    return quest.expressionLatex;
  }
  if (quest.stage === "PRESSURE") {
    return quest.expressionLatex;
  }
  return quest.expressionLatex;
}

function buildRuleLatex(quest: SP304Quest) {
  if (quest.stage === "PRESSURE") {
    if (quest.area != null && quest.force != null) return `P = \\frac{F}{A}`;
    if (quest.id.startsWith("P-C1") || quest.id.startsWith("P-A5") || quest.id.startsWith("P-E1") || quest.id.startsWith("P-E5")) {
      return `P_{total} = P_{atm} + \\rho gh`;
    }
    return `P = \\rho gh`;
  }

  if (quest.stage === "BUOYANCY") {
    if (quest.targetLatex.includes("W_{app}")) return `W_{app} = W - F_b`;
    if (quest.targetLatex.includes("m")) return `m = \\frac{F_b}{g}`;
    if (quest.targetLatex.includes("\\rho")) return `\\rho = \\frac{m}{V}`;
    return `F_b = \\rho V g`;
  }

  if (quest.stage === "HYDRAULICS") {
    if (quest.targetLatex === "P") return `P = \\frac{F}{A}`;
    if (quest.targetLatex.includes("F_2") || quest.targetLatex.includes("F_3")) return `\\frac{F_1}{A_1} = \\frac{F_2}{A_2}`;
    if (quest.targetLatex.includes("A_2")) return `A_2 = A_1 \\cdot \\frac{F_2}{F_1}`;
    if (quest.targetLatex.includes("d_2")) return `A_1 d_1 = A_2 d_2`;
    if (quest.targetLatex.includes("MA")) return `MA = \\frac{A_{out}}{A_{in}}`;
    if (quest.targetLatex === "W") return `W = Fd`;
  }

  return quest.expressionLatex;
}

export function solveSP304(quest: SP304Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];
  const givenLatex = buildGivenLatex(quest) || quest.targetLatex;
  const substitutionLatex = buildSubstitutionLatex(quest);

  steps.push(makeStep(1, t("common.feedback_reasons.identify_given_values"), givenLatex));
  steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), buildRuleLatex(quest)));
  if (substitutionLatex) {
    steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), substitutionLatex));
  }
  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
