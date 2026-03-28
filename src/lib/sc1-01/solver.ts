import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";
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
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("chemistry.sc1_01.solver.rule_identify"))}}`),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), identificationLatex(quest)),
    );
  } else if (quest.stage === "PROPERTIES") {
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("chemistry.sc1_01.solver.rule_properties"))}}`),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${escapeLatexText(t("chemistry.sc1_01.solver.answer_label"))}} = \\text{${escapeLatexText(String(quest.slots[0]?.expected ?? ""))}}`),
    );
  } else if (quest.stage === "REACTIONS") {
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("chemistry.sc1_01.solver.rule_reactions"))}}`),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${escapeLatexText(t("chemistry.sc1_01.solver.product_label"))}} = \\text{${escapeLatexText(String(quest.slots[0]?.expected ?? ""))}}`),
    );
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
