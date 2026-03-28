import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { SP101AdaptedQuest } from "./types";

type Translator = (key: string, params?: Record<string, string | number>) => string;

function makeStep(
  stepNumber: number,
  justification: string,
  expressionLatex: string,
  emphasis?: PlatformSolutionStep["emphasis"]
): PlatformSolutionStep {
  return { stepNumber, justification, expressionLatex, emphasis };
}

function escapeLatexText(text: string) {
  return text
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([{}%$&#_^])/g, "\\$1")
    .replace(/~/g, "\\textasciitilde{}");
}

function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps
    .map((step) => `\\text{${escapeLatexText(step.justification)}} \\implies ${step.expressionLatex}`)
    .join(" \\\\ ");
}

function finalStep(stepNumber: number, t: Translator, quest: SP101AdaptedQuest) {
  return makeStep(stepNumber, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key");
}

function identifyReason(quest: SP101AdaptedQuest, t: Translator) {
  if (quest.stage === "FORCE_CONCEPTS") {
    return quest.type === "MULTIPLE_CHOICE"
      ? t("sp1_01.reasons.identify_force_concept")
      : t("sp1_01.reasons.identify_force_quantity");
  }
  if (quest.stage === "FORCE_COMPOSITION") {
    return t("sp1_01.reasons.resolve_or_combine_forces");
  }
  return t("sp1_01.reasons.apply_equilibrium_condition");
}

function workingExpression(quest: SP101AdaptedQuest) {
  if (quest.stage === "FORCE_CONCEPTS") {
    return quest.expressionLatex;
  }
  if (quest.stage === "FORCE_COMPOSITION") {
    return "\\sum F_x,\\; \\sum F_y \\Rightarrow F_R=\\sqrt{(\\sum F_x)^2+(\\sum F_y)^2}";
  }
  return "\\sum \\vec{F}=0 \\Rightarrow \\vec{F}_{\\text{unknown}}=-\\vec{F}_{\\text{resultant}}";
}

function reasoningStep(quest: SP101AdaptedQuest, t: Translator) {
  if (quest.stage === "FORCE_CONCEPTS") {
    return makeStep(2, t("sp1_01.reasons.match_force_definition_or_unit"), quest.targetLatex || quest.expressionLatex);
  }
  if (quest.stage === "FORCE_COMPOSITION") {
    return makeStep(2, t("sp1_01.reasons.compute_resultant_from_components"), workingExpression(quest));
  }
  return makeStep(2, t("sp1_01.reasons.balance_resultant_with_equilibrant"), workingExpression(quest));
}

export function solveSP101(
  quest: SP101AdaptedQuest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const steps: PlatformSolutionStep[] = [
    makeStep(1, identifyReason(quest, t), quest.expressionLatex || quest.targetLatex),
    reasoningStep(quest, t),
    finalStep(3, t, quest),
  ];

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
