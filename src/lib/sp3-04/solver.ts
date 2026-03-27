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
  return quest.hintLatex?.[0] ?? "";
}

export function solveSP304(quest: SP304Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];
  const givenLatex = buildGivenLatex(quest) || quest.targetLatex;
  const substitutionLatex = buildSubstitutionLatex(quest);

  steps.push(makeStep(1, t("common.feedback_reasons.identify_given_values"), givenLatex));
  steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), quest.expressionLatex));
  if (substitutionLatex) {
    steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), substitutionLatex));
  }
  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
