import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { ThalesQuest } from "./types";

type Translator = (key: string, params?: Record<string, string | number>) => string;

function makeStep(stepNumber: number, justification: string, expressionLatex: string, emphasis?: PlatformSolutionStep["emphasis"]): PlatformSolutionStep {
  return { stepNumber, justification, expressionLatex, emphasis };
}

function escapeLatexText(text: string) {
  return text.replace(/\\/g, "\\textbackslash{}").replace(/([{}%$&#_^])/g, "\\$1").replace(/~/g, "\\textasciitilde{}");
}

function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps.map((step) => `\\text{${escapeLatexText(step.justification)}} \\implies ${step.expressionLatex}`).join(" \\\\ ");
}

function finalStep(stepNumber: number, t: Translator, quest: ThalesQuest) {
  return makeStep(stepNumber, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key");
}

function buildTargetExpression(quest: ThalesQuest) {
  const slot = quest.slots[0];
  if (!slot) return quest.targetLatex || quest.correctLatex;
  return `${slot.labelLatex} = ${quest.targetLatex || quest.correctLatex}`;
}

function selectReason(quest: ThalesQuest, t: Translator) {
  if (quest.stage === "BASICS") {
    if (quest.concept === "area" || quest.concept === "volume" || quest.concept === "fractal") return t("em1_01.reasons.select_scale_rule");
    return t("em1_01.reasons.select_similarity_rule");
  }
  if (quest.stage === "MEASURE") {
    return quest.concept === "angle" ? t("em1_01.reasons.select_trigonometry_rule") : t("em1_01.reasons.select_shadow_rule");
  }
  if (quest.concept === "pythag" || quest.concept === "tri" || quest.concept === "area" || quest.concept === "angle") {
    return t("em1_01.reasons.select_trigonometry_rule");
  }
  return t("em1_01.reasons.select_survey_rule");
}

export function solveEM101(quest: ThalesQuest, t: Translator): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null; hasFullSolution: boolean } {
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
    makeStep(2, selectReason(quest, t), buildTargetExpression(quest)),
    makeStep(3, t("em1_01.reasons.apply_proportional_or_trig_relation"), quest.hintLatex?.[0] ?? quest.expressionLatex),
    finalStep(4, t, quest),
  ];
  const fullSolutionLatex = buildFullSolution(steps);
  return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
}
