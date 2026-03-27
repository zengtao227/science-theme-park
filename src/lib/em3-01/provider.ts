import type { FeedbackContent, PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { OlympiadQuest } from "@/lib/ext/olympiad-data";

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

function categoryReason(quest: OlympiadQuest, t: Translator) {
  if (quest.category === "geometry") return t("em3_01.reasons.identify_geometry_family");
  if (quest.category === "arithmetic") return t("em3_01.reasons.identify_arithmetic_family");
  if (quest.category === "combinatorics") return t("em3_01.reasons.identify_combinatorics_family");
  return t("em3_01.reasons.identify_logic_family");
}

export function createEM301FeedbackProvider(t: Translator) {
  return (quest: OlympiadQuest): Omit<FeedbackContent, "hint"> => {
    const coreHint = quest.hintLatex?.[0] ?? quest.expressionLatex;
    const steps: PlatformSolutionStep[] = [
      makeStep(1, categoryReason(quest, t), quest.expressionLatex),
      makeStep(2, t("em3_01.reasons.extract_key_relation"), coreHint),
      makeStep(3, t("em3_01.reasons.confirm_final_conclusion"), quest.correctLatex, "key"),
    ];
    const fullSolutionLatex = buildFullSolution(steps);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
