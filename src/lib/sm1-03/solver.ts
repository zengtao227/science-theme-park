import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { IntegerQuest } from "@/lib/sm1-03/types";

type Translator = (key: string, params?: Record<string, string | number>) => string;

function makeStep(stepNumber: number, justification: string, expressionLatex: string, emphasis?: PlatformSolutionStep["emphasis"]): PlatformSolutionStep {
  return { stepNumber, justification, expressionLatex, emphasis };
}

function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps.map((s) => `\\text{${s.justification}} \\implies ${s.expressionLatex}`).join(" \\\\ ");
}

function leftSide(expression: string) {
  return expression.split("=").shift()?.trim() ?? expression;
}

export function solveSM103(quest: IntegerQuest, t: Translator): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const expression = quest.expressionLatex ?? "";
  const target = quest.targetLatex ?? "";
  const steps: PlatformSolutionStep[] = [];

  if (quest.stage === "NUMBER_LINE") {
    if (expression.includes("|")) {
      steps.push(makeStep(1, t("sm1_03.reasons.identify_absolute_or_distance"), leftSide(expression)));
      steps.push(makeStep(2, t("sm1_03.reasons.evaluate_numeric_expression"), expression));
    } else if (/[+\-]|\\times|\\div|\(/.test(leftSide(expression)) && expression.includes("=")) {
      steps.push(makeStep(1, t("sm1_03.reasons.read_number_line_expression"), leftSide(expression)));
      steps.push(makeStep(2, t("sm1_03.reasons.evaluate_numeric_expression"), expression));
    } else if (expression.includes(",")) {
      steps.push(makeStep(1, t("sm1_03.reasons.compare_positions_on_line"), expression));
      steps.push(makeStep(2, t("sm1_03.reasons.select_requested_value"), `\\text{Read the requested value for } ${target || "x"}`));
    } else {
      steps.push(makeStep(1, t("sm1_03.reasons.read_number_line_expression"), expression));
      steps.push(makeStep(2, t("sm1_03.reasons.select_requested_value"), `\\text{Locate the requested position for } ${target || "x"}`));
    }
    steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex ?? "", "key"));
  } else if (quest.stage === "RATIONALS") {
    if (expression.includes("\\frac")) {
      steps.push(makeStep(1, t("sm1_03.reasons.convert_or_compare_rational_form"), leftSide(expression)));
    } else if (expression.includes(",")) {
      steps.push(makeStep(1, t("sm1_03.reasons.compare_positions_on_line"), expression));
    } else {
      steps.push(makeStep(1, t("sm1_03.reasons.read_number_line_expression"), leftSide(expression)));
    }
    if (expression.includes("=")) {
      steps.push(makeStep(2, t("sm1_03.reasons.evaluate_numeric_expression"), expression));
    }
    steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex ?? "", "key"));
  } else {
    if (typeof quest.x === "number" && typeof quest.y === "number") {
      steps.push(makeStep(1, t("sm1_03.reasons.read_point_coordinates"), `(${quest.x},${quest.y})`));
    }
    if (target.includes("Q")) {
      steps.push(makeStep(2, t("sm1_03.reasons.determine_quadrant"), `${quest.x},${quest.y}`));
    } else if (target.includes("'")) {
      steps.push(makeStep(2, t("sm1_03.reasons.apply_coordinate_transformation"), leftSide(expression)));
    } else if (expression.includes("=")) {
      steps.push(makeStep(2, t("sm1_03.reasons.use_coordinate_formula"), expression));
    }
    steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex ?? "", "key"));
  }

  return {
    steps,
    fullSolutionLatex: steps.length ? buildFullSolution(steps) : null,
  };
}
