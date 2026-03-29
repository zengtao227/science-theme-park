import type { FeedbackContent, PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { SP201Quest } from "@/types/sp2-01-types";

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

function toLatexText(text: string) {
  return `\\text{${escapeLatexText(text)}}`;
}

function getPrimaryReason(quest: SP201Quest, t: Translator) {
  switch (quest.type) {
    case "IDENTIFY":
      return t("sp2_01.reasons.identify_component_feature");
    case "BUILD":
      return t("sp2_01.reasons.confirm_series_or_parallel");
    case "DRAW":
      return t("sp2_01.reasons.read_iec_diagram");
    case "TROUBLESHOOT":
      return t("sp2_01.reasons.identify_fault_and_fix");
    default:
      return t("sp2_01.reasons.check_design_requirements");
  }
}

function getWorkingExpression(quest: SP201Quest) {
  if (quest.type === "IDENTIFY") {
    return quest.componentInfo?.symbol
      ? toLatexText(quest.componentInfo.symbol)
      : quest.targetLatex || quest.correctLatex;
  }
  return quest.targetLatex || quest.correctLatex;
}

function getReasoningStep(quest: SP201Quest, t: Translator) {
  if (quest.type === "IDENTIFY") {
    const expression = quest.targetLatex || quest.correctLatex;
    return makeStep(2, t("sp2_01.reasons.match_component_role"), expression);
  }

  if (quest.type === "BUILD") {
    const expression = quest.circuitType === "PARALLEL"
      ? toLatexText(t("sp2_01.feedback.parallel_reason"))
      : toLatexText(t("sp2_01.feedback.series_reason"));
    return makeStep(2, t("sp2_01.reasons.confirm_series_or_parallel"), expression);
  }

  if (quest.type === "DRAW") {
    return makeStep(
      2,
      t("sp2_01.reasons.read_iec_diagram"),
      toLatexText(t("sp2_01.feedback.draw_reason"))
    );
  }

  if (quest.type === "TROUBLESHOOT") {
    const faultLabel = quest.fault
      ? t(`sp2_01.faults.${quest.fault.toLowerCase()}`)
      : t("sp2_01.faults.unknown");
    return makeStep(
      2,
      t("sp2_01.reasons.identify_fault_and_fix"),
      toLatexText(t("sp2_01.feedback.troubleshoot_reason", { fault: faultLabel }))
    );
  }

  return makeStep(
    2,
    t("sp2_01.reasons.check_design_requirements"),
    toLatexText(t("sp2_01.feedback.design_reason", { count: quest.designRequirements?.length ?? 0 }))
  );
}

export function createSP201FeedbackProvider(t: Translator) {
  return (quest: SP201Quest): Omit<FeedbackContent, "hint"> => {
    const steps: PlatformSolutionStep[] = [
      makeStep(1, getPrimaryReason(quest, t), getWorkingExpression(quest)),
      getReasoningStep(quest, t),
      makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
    ];

    const fullSolutionLatex = buildFullSolution(steps);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
