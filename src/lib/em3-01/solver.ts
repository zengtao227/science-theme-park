import type { FeedbackContent } from "@/hooks/useQuestManager";
import {
  buildFullSolution,
  makeStep,
  type Translator,
} from "@/lib/feedback/solverSupport";
import type { OlympiadQuest } from "@/lib/ext/olympiad-data";

function categoryReason(quest: OlympiadQuest, t: Translator) {
  if (quest.category === "geometry") return t("em3_01.reasons.identify_geometry_family");
  if (quest.category === "arithmetic") return t("em3_01.reasons.identify_arithmetic_family");
  if (quest.category === "combinatorics") return t("em3_01.reasons.identify_combinatorics_family");
  return t("em3_01.reasons.identify_logic_family");
}

function buildTargetExpression(quest: OlympiadQuest) {
  const slot = quest.slots[0];
  if (!slot) return quest.targetLatex || quest.correctLatex;
  return `${slot.labelLatex} = ${quest.targetLatex || quest.correctLatex}`;
}

export function solveEM301(quest: OlympiadQuest, t: Translator): Omit<FeedbackContent, "hint"> {
  const coreHint = quest.hintLatex?.[0] ?? quest.expressionLatex;
  const steps = [
    makeStep(1, categoryReason(quest, t), quest.expressionLatex),
    makeStep(2, t("common.feedback_reasons.identify_given_values"), buildTargetExpression(quest)),
    makeStep(3, t("em3_01.reasons.extract_key_relation"), coreHint),
    makeStep(4, t("em3_01.reasons.confirm_final_conclusion"), quest.correctLatex, "key"),
  ];

  const fullSolutionLatex = buildFullSolution(steps);
  return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
}
