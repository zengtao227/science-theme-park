import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SC204Quest } from "./quests";

function getRuleLatex(stage: SC204Quest["stage"], t: Translator) {
  switch (stage) {
    case "dissolve":
    case "saturate":
    case "crystallize":
      return `\\text{${t("chemistry.sc2_04.solver.read_curve_rule")}}`;
    case "elite":
      return "S = \\frac{m_{solute}}{m_{water}}";
    default:
      return null;
  }
}

export function solveSC204(quest: SC204Quest, t: Translator) {
  const ruleLatex = getRuleLatex(quest.stage, t);
  if (!ruleLatex) {
    return { steps: [], fullSolutionLatex: null };
  }

  const targetLatex = quest.slots[0]?.labelLatex || quest.targetLatex;
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${t("chemistry.sc2_04.solver.use_relation_to_determine")}} ${targetLatex}`),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];

  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
