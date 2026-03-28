import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { AtomQuest } from "./types";

export function solveSC103(quest: AtomQuest, t: Translator) {
  const steps: PlatformSolutionStep[] = [makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex)];

  switch (quest.id) {
    case "B-B-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "A = p + n"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "A = 8 + 8 = 16"));
      break;
    case "B-C-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "q = p - e"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "q = 11 - 10 = +1"));
      break;
    case "B-A-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "e = Z"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "e = 17"));
      break;
    case "B-E-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "n = A - Z"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "n = 56 - 26 = 30"));
      break;
    case "E-B-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{C} \\Rightarrow Z = 6"));
      break;
    case "E-C-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{Mg} \\Rightarrow Z = 12"));
      break;
    case "E-A-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "Z = 19 \\Rightarrow X = \\mathrm{K}"));
      break;
    case "E-E-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{Ar} \\Rightarrow P = 3"));
      break;
    case "I-B-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "n = A - Z"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "n = 14 - 6 = 8"));
      break;
    case "I-C-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "A = Z + n"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "A = 8 + 10 = 18"));
      break;
    case "I-A-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "n_1 = 35-17,\\; n_2 = 37-17"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "\\Delta n = 20 - 18 = 2"));
      break;
    case "I-E-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "A_{avg} = 35\\cdot0.75 + 37\\cdot0.25"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "A_{avg} = 35.5"));
      break;
    default:
      return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
