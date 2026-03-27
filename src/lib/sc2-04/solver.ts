import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SC204Quest } from "./quests";

function getRuleLatex(stage: SC204Quest["stage"]) {
  switch (stage) {
    case "dissolve":
    case "saturate":
    case "crystallize":
      return "\\text{Read the solubility curve at the given temperature to determine } S";
    case "elite":
      return "S = \\frac{m_{solute}}{m_{water}}";
    default:
      return null;
  }
}

export function solveSC204(quest: SC204Quest, t: Translator) {
  const ruleLatex = getRuleLatex(quest.stage);
  if (!ruleLatex) {
    return { steps: [], fullSolutionLatex: null };
  }

  const targetLatex = quest.slots[0]?.labelLatex || quest.targetLatex;
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{Use the relation above to determine } ${targetLatex}`),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];

  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
