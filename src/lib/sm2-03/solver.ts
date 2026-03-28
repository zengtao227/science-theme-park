import type { FeedbackContent, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, formatNumber, makeStep, type Translator } from "@/lib/feedback/solverSupport";

export interface SM203FeedbackQuest extends Quest {
  stage: "LEVEL1" | "LEVEL2" | "LEVEL3";
  m1: number;
  c1: number;
  m2?: number;
  c2?: number;
  targetX?: number;
  targetY?: number;
}

export function solveSM203(quest: SM203FeedbackQuest, t: Translator): Omit<FeedbackContent, "hint"> {
  const steps = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
  ];

  if (quest.stage === "LEVEL1") {
    if (quest.targetX === undefined || quest.targetY === undefined) {
      return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
    }

    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "y = mx + c"),
      makeStep(
        3,
        t("common.feedback_reasons.substitute_values"),
        `y = ${formatNumber(quest.m1)}\\cdot ${formatNumber(quest.targetX)} + ${formatNumber(quest.c1)} = ${formatNumber(quest.targetY)}`
      ),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `y = ${formatNumber(quest.targetY)}`, "key")
    );
  } else {
    if (quest.m2 === undefined || quest.c2 === undefined || quest.targetX === undefined) {
      return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
    }

    steps.push(
      makeStep(
        2,
        t("common.feedback_reasons.select_formula_or_rule"),
        `${formatNumber(quest.m1)}x + ${formatNumber(quest.c1)} = ${formatNumber(quest.m2)}x + ${formatNumber(quest.c2)}`
      ),
      makeStep(
        3,
        t("common.feedback_reasons.solve_step_by_step"),
        `(${formatNumber(quest.m1)}-${formatNumber(quest.m2)})x = ${formatNumber(quest.c2)}-${formatNumber(quest.c1)}`
      ),
      makeStep(
        4,
        t("common.feedback_reasons.solve_required_values"),
        `x = \\frac{${formatNumber(quest.c2 - quest.c1)}}{${formatNumber(quest.m1 - quest.m2)}} = ${formatNumber(quest.targetX)}`
      )
    );

    if (quest.targetY !== undefined) {
      steps.push(
        makeStep(
          5,
          t("common.feedback_reasons.compute_result"),
          `y = ${formatNumber(quest.m1)}\\cdot ${formatNumber(quest.targetX)} + ${formatNumber(quest.c1)} = ${formatNumber(quest.targetY)}`
        )
      );
    }

    steps.push(
      makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), `x = ${formatNumber(quest.targetX)}`, "key")
    );
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
    hasFullSolution: true,
  };
}
