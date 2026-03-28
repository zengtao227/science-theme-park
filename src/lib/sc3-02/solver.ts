import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SC302Quest } from "./types";

export function solveSC302(quest: SC302Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex)];

  switch (quest.stage) {
    case "HYDROCARBONS":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("chemistry.sc3_02.solver.hydrocarbon_rule", { molecule: quest.molecule ?? "" }))}}`));
      break;
    case "FUNCTIONAL_GROUPS":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("chemistry.sc3_02.solver.functional_group_rule"))}}`));
      break;
    case "ISOMERS":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("chemistry.sc3_02.solver.isomer_rule", { formula: quest.formula ?? "" }))}}`));
      break;
    default:
      return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
