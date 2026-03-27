import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { BondQuest } from "./types";

export function solveSC105(quest: BondQuest, t: Translator) {
  const steps: PlatformSolutionStep[] = [makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex)];

  switch (quest.id) {
    case "I-B-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "|q_1 q_2| = |(+1)(-1)|"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "|q_1 q_2| = 1"));
      break;
    case "I-C-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{Mg}^{2+} + 2\\mathrm{Cl}^{-} \\rightarrow \\mathrm{MgCl}_2"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "x = 2"));
      break;
    case "I-A-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "Q = (+3) + 3(-1)"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "Q = 0"));
      break;
    case "I-E-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{Ca}^{2+} \\text{ needs two } \\mathrm{F}^{-}"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "n = 2"));
      break;
    case "C-B-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{H}_2 \\text{ has one shared electron pair}"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "n = 1"));
      break;
    case "C-C-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{O}_2 \\text{ forms a double bond}"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "n = 2"));
      break;
    case "C-A-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{N}_2 \\text{ forms a triple bond}"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "n = 3"));
      break;
    case "C-E-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{CO}_2 = \\mathrm{O}{=}\\mathrm{C}{=}\\mathrm{O}"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "b = 2"));
      break;
    case "M-B-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{Na} \\text{ contributes one valence electron}"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "v = 1"));
      break;
    case "M-C-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{Mg} \\text{ contributes two valence electrons}"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "v = 2"));
      break;
    case "M-A-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "N = 4 \\times 3"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "N = 12"));
      break;
    case "M-E-1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "r = \\frac{3}{1}"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "r = 3"));
      break;
    default:
      return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
