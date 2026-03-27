import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { SP306Quest } from "./types";

function describeScenario(quest: SP306Quest) {
  return [quest.stage, quest.soundType].filter(Boolean).join(" \\to ");
}

export function solveSP306(quest: SP306Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), describeScenario(quest)),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), quest.expressionLatex),
  ];

  if (quest.hintLatex?.[0]) {
    steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), quest.hintLatex[0]));
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
