import type { FeedbackContent } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SM305FeedbackQuest } from "./provider";

function getSlot(quest: SM305FeedbackQuest, id?: string) {
  if (id) return quest.slots.find((slot) => slot.id === id) ?? null;
  return quest.slots[0] ?? null;
}

function solveArchitecture(quest: SM305FeedbackQuest, t: Translator) {
  const slot = getSlot(quest);
  if (!slot) return null;
  const intermediate = quest.hintLatex?.[0] ?? quest.expressionLatex;
  return [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), quest.expressionLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), intermediate),
    makeStep(4, t("common.feedback_reasons.state_final_result"), `${slot.labelLatex} = ${quest.correctLatex}`, "key"),
  ];
}

function solveCrossSections(quest: SM305FeedbackQuest, t: Translator) {
  const slot = getSlot(quest);
  if (!slot) return null;
  const intermediate = quest.hintLatex?.[0] ?? quest.expressionLatex;
  return [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\text{Identify how the cutting plane meets the solid}"),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), intermediate),
    makeStep(4, t("common.feedback_reasons.state_final_result"), `${slot.labelLatex} = ${quest.correctLatex}`, "key"),
  ];
}

function solveCurvedSolids(quest: SM305FeedbackQuest, t: Translator) {
  const slot = getSlot(quest);
  if (!slot) return null;
  const intermediate = quest.hintLatex?.[0] ?? quest.expressionLatex;
  return [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), quest.expressionLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), intermediate),
    makeStep(4, t("common.feedback_reasons.state_final_result"), `${slot.labelLatex} = ${quest.correctLatex}`, "key"),
  ];
}

export function solveSM305(quest: SM305FeedbackQuest, t: Translator): Omit<FeedbackContent, "hint"> {
  const steps =
    quest.stage === "BASEL_ARCH" ? solveArchitecture(quest, t) :
    quest.stage === "CROSS_SECTIONS" ? solveCrossSections(quest, t) :
    solveCurvedSolids(quest, t);

  if (!steps || steps.length === 0) {
    return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
    hasFullSolution: true,
  };
}
