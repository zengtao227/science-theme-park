import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SC107Quest } from "./quests";

export function solveSC107(quest: SC107Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex)];

  switch (quest.id) {
    case "sc1_07_q1":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\text{Common recyclable bottle plastic} = \\mathrm{PET}"));
      break;
    case "sc1_07_q2":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\text{Ideal atom economy means all atoms enter the product}"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "AE = 100\\%"));
      break;
    case "sc1_07_q3":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\text{A circular product starts at cradle design}"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "\\text{Stage} = \\text{Cradle}"));
      break;
    default:
      return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
