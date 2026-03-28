import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SC303Quest } from "./types";

export function solveSC303(quest: SC303Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex)];

  switch (quest.stage) {
    case "COMBUSTION":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("chemistry.sc3_03.solver.combustion_forms"))}} CO_2 \\text{ ${escapeLatexText(t("chemistry.sc3_03.solver.and_water"))} } H_2O`));
      break;
    case "SUBSTITUTION":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("chemistry.sc3_03.solver.substitution_replace"))}}`));
      break;
    case "ADDITION":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("chemistry.sc3_03.solver.addition_add"))}}`));
      break;
    default:
      return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
