import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SC302Quest } from "./types";

export function solveSC302(quest: SC302Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex)];

  switch (quest.stage) {
    case "HYDROCARBONS":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{Name-formula mapping for } \\text{${quest.molecule ?? ""}}`));
      break;
    case "FUNCTIONAL_GROUPS":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\text{Match the compound class with its defining group}"));
      break;
    case "ISOMERS":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{Count valid constitutional isomers for } ${quest.formula ?? ""}`));
      break;
    default:
      return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
