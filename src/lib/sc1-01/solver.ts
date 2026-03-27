import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SC101Quest } from "./quests";

function identificationLatex(quest: SC101Quest) {
  return Object.entries(quest.correctIdentifications)
    .map(([slot, substance]) => `${slot} = \\text{${substance}}`)
    .join(",\\; ");
}

export function solveSC101(quest: SC101Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.targetLatex),
  ];

  if (quest.stage === "IDENTIFY") {
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\text{Match each powder to its characteristic lab response.}"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), identificationLatex(quest)),
    );
  } else if (quest.stage === "PROPERTIES") {
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\text{Use the observed property to identify the substance.}"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{Answer} = \\text{${String(quest.slots[0]?.expected ?? "")}}`),
    );
  } else if (quest.stage === "REACTIONS") {
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\text{Determine the product from the described reaction sequence.}"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{Product} = \\text{${String(quest.slots[0]?.expected ?? "")}}`),
    );
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
