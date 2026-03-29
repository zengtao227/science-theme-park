import type { FeedbackContent } from "@/hooks/useQuestManager";
import {
  buildFullSolution,
  makeStep,
  type Translator,
} from "@/lib/feedback/solverSupport";
import type { SP104Quest } from "./quests";

function buildTargetExpression(quest: SP104Quest) {
  const slot = quest.slots[0];
  if (!slot) return quest.targetLatex || quest.correctLatex;
  return `${slot.labelLatex} = ${quest.targetLatex || quest.correctLatex}`;
}

function buildReferenceExpression(quest: SP104Quest) {
  if (quest.stage === "SEASONS") {
    return `\\theta_{\\oplus} = ${quest.correctLatex}^{\\circ}`;
  }

  const slot = quest.slots[0];
  if (!slot) return quest.correctLatex;
  return `${slot.labelLatex} = ${quest.correctLatex}`;
}

export function solveSP104(quest: SP104Quest, t: Translator): Omit<FeedbackContent, "hint"> {
  const steps = [
    makeStep(1, t(`sp1_04.reasons.${quest.stage.toLowerCase()}_focus`), quest.expressionLatex),
    makeStep(2, t("common.feedback_reasons.identify_given_values"), buildTargetExpression(quest)),
    makeStep(3, t("sp1_04.reasons.identify_expected_astronomy_term"), buildReferenceExpression(quest)),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];

  const fullSolutionLatex = buildFullSolution(steps);
  return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
}
