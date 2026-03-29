import type { FeedbackContent } from "@/hooks/useQuestManager";
import {
  buildFullSolution,
  makeStep,
  type Translator,
} from "@/lib/feedback/solverSupport";
import type { SP103Quest } from "./quests";

function buildTargetExpression(quest: SP103Quest) {
  const slot = quest.slots[0];
  if (!slot) return quest.targetLatex || quest.correctLatex;
  return `${slot.labelLatex} = ${quest.targetLatex || quest.correctLatex}`;
}

function buildReferenceExpression(quest: SP103Quest) {
  if (quest.stage === "WEATHER") {
    return `P_{\\mathrm{sea\\ level}} = ${quest.correctLatex}\\,\\mathrm{hPa}`;
  }

  const slot = quest.slots[0];
  if (!slot) return quest.correctLatex;
  return `${slot.labelLatex} = ${quest.correctLatex}`;
}

export function solveSP103(quest: SP103Quest, t: Translator): Omit<FeedbackContent, "hint"> {
  const steps = [
    makeStep(1, t(`sp1_03.reasons.${quest.stage.toLowerCase()}_focus`), quest.expressionLatex),
    makeStep(2, t("common.feedback_reasons.identify_given_values"), buildTargetExpression(quest)),
    makeStep(3, t("sp1_03.reasons.match_expected_term"), buildReferenceExpression(quest)),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];

  const fullSolutionLatex = buildFullSolution(steps);
  return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
}
