import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { PeriodicQuest } from "./types";

export function solveSC104(quest: PeriodicQuest, t: Translator) {
  const steps: PlatformSolutionStep[] = [makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex)];

  switch (quest.id) {
    case "B-B-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "A = p + n"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "A = 6 + 6 = 12"));
      break;
    case "B-C-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "q = p - e"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "q = 12 - 10 = +2"));
      break;
    case "B-A-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "e = Z"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "e = 17"));
      break;
    case "B-E-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "n = A - Z"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "n = 40 - 20 = 20"));
      break;
    case "P-B-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{Na} \\Rightarrow Z = 11"));
      break;
    case "P-C-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{Cl} \\Rightarrow P = 3"));
      break;
    case "P-A-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{O} \\Rightarrow G = 16"));
      break;
    case "P-E-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{Ar} \\Rightarrow v = 8"));
      break;
    case "G-B-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{Li} \\Rightarrow g = 1"));
      break;
    case "G-C-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{Na} \\text{ and } \\mathrm{K} \\text{ are both in Group 1}"));
      break;
    case "G-A-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\Delta Z = 18 - 10"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "\\Delta Z = 8"));
      break;
    case "G-E-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\Delta P = 4 - 2"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "\\Delta P = 2"));
      break;
    default:
      return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
