import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { EquationQuest } from "@/lib/sm1-04/types";

type Translator = (key: string, params?: Record<string, string | number>) => string;

function makeStep(
  stepNumber: number,
  justification: string,
  expressionLatex: string,
  emphasis?: PlatformSolutionStep["emphasis"]
): PlatformSolutionStep {
  return { stepNumber, justification, expressionLatex, emphasis };
}

function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps.map((s) => `\\text{${s.justification}} \\implies ${s.expressionLatex}`).join(" \\\\ ");
}

function getEquationLatex(quest: EquationQuest) {
  return quest.equation?.trim() || quest.expressionLatex?.trim() || "";
}

export function solveSM104(
  quest: EquationQuest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const equationLatex = getEquationLatex(quest);
  const expression = quest.expressionLatex?.trim();
  const finalLatex = quest.correctLatex?.trim();

  if (!equationLatex || !expression || !finalLatex) {
    return { steps: [], fullSolutionLatex: null };
  }

  let steps: PlatformSolutionStep[];

  if (quest.stage === "BALANCE") {
    steps = [
      makeStep(1, t("sm1_04.reasons.identify_balance_equation"), equationLatex),
      makeStep(2, t("sm1_04.reasons.apply_same_operation"), expression),
      makeStep(3, t("sm1_04.reasons.state_final_solution"), finalLatex, "key"),
    ];
  } else if (quest.stage === "SOLVE") {
    steps = [
      makeStep(1, t("sm1_04.reasons.identify_target_equation"), equationLatex),
      makeStep(2, t("sm1_04.reasons.simplify_and_isolate"), expression),
      makeStep(3, t("sm1_04.reasons.state_final_solution"), finalLatex, "key"),
    ];
  } else if (quest.stage === "TRANSFORM") {
    steps = [
      makeStep(1, t("sm1_04.reasons.identify_target_equation"), equationLatex),
      makeStep(2, t("sm1_04.reasons.rearrange_equation"), expression),
      makeStep(3, t("sm1_04.reasons.state_final_solution"), finalLatex, "key"),
    ];
  } else {
    steps = [
      makeStep(1, t("sm1_04.reasons.model_word_problem"), equationLatex),
      makeStep(2, t("sm1_04.reasons.solve_model_equation"), expression),
      makeStep(3, t("sm1_04.reasons.state_final_solution"), finalLatex, "key"),
    ];
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
