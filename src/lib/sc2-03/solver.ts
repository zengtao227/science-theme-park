import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SC203Quest } from "./quests";

function getRuleLatex(stage: SC203Quest["stage"]) {
  switch (stage) {
    case "boyle":
      return "P_1V_1 = P_2V_2";
    case "charles":
      return "\\frac{V_1}{T_1} = \\frac{V_2}{T_2}";
    case "combined":
      return "\\frac{P_1V_1}{T_1} = \\frac{P_2V_2}{T_2}";
    case "elite":
      return "PV = nRT";
    default:
      return null;
  }
}

export function solveSC203(quest: SC203Quest, t: Translator) {
  const ruleLatex = getRuleLatex(quest.stage);
  if (!ruleLatex) {
    return { steps: [], fullSolutionLatex: null };
  }

  const targetLatex = quest.slots[0]?.labelLatex || quest.targetLatex;
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${t("chemistry.sc2_03.solver.rearrange_isolate")}} ${targetLatex}`),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];

  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
