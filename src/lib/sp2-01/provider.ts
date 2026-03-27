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
      ? `\\text{${escapeLatexText(quest.componentInfo.symbol)}}`
      : quest.targetLatex || quest.correctLatex;
  }

  if (quest.type === "BUILD") {
    return quest.circuitType === "PARALLEL"
      ? "\\text{Independent branches keep the other bulbs active.}"
      : "\\text{One closed path carries the same current through every component.}";
  }

  if (quest.type === "DRAW") {
    return "\\text{IEC symbols encode each component and the wire connections.}";
  }

  if (quest.type === "TROUBLESHOOT") {
    return `\\text{Fault: ${escapeLatexText(quest.fault ?? "unknown")}}`;
  }

  const requirementCount = quest.designRequirements?.length ?? 0;
  return `\\text{Design must satisfy ${requirementCount} explicit requirement${requirementCount === 1 ? "" : "s"}.}`;
}

function getReasoningStep(quest: SP201Quest, t: Translator) {
  if (quest.type === "IDENTIFY") {
    const expression = quest.componentInfo?.function?.en
      ? `\\text{${escapeLatexText(quest.componentInfo.function.en)}}`
      : quest.targetLatex || quest.correctLatex;
    return makeStep(2, t("sp2_01.reasons.match_component_role"), expression);
  }

  if (quest.type === "BUILD") {
    const expression = quest.circuitType === "PARALLEL"
      ? "\\text{Parallel wiring gives each lamp its own path and keeps the rest on if one fails.}"
      : "\\text{Series wiring keeps every component on one loop, so the same current flows through all parts.}";
    return makeStep(2, t("sp2_01.reasons.confirm_series_or_parallel"), expression);
  }

  if (quest.type === "DRAW") {
    return makeStep(2, t("sp2_01.reasons.read_iec_diagram"), "\\text{Battery, bulb, switch, and resistor each need the matching IEC symbol and a closed wiring path.}");
  }

  if (quest.type === "TROUBLESHOOT") {
    return makeStep(2, t("sp2_01.reasons.identify_fault_and_fix"), `\\text{Repair the ${escapeLatexText((quest.fault ?? "fault").toLowerCase())} so the circuit closes again.}`);
  }

  return makeStep(2, t("sp2_01.reasons.check_design_requirements"), `\\text{Satisfy the stated control, redundancy, and efficiency requirements before checking the final layout.}`);
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
