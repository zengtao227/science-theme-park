import type { FeedbackContent, PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { SP103Quest } from "./quests";

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

export function createSP103FeedbackProvider(t: Translator) {
  return (quest: SP103Quest): Omit<FeedbackContent, "hint"> => {
    const steps: PlatformSolutionStep[] = [
      makeStep(1, t(`sp1_03.reasons.${quest.stage.toLowerCase()}_focus`), quest.expressionLatex),
      makeStep(2, t("sp1_03.reasons.match_expected_term"), quest.targetLatex),
      makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
    ];
    const fullSolutionLatex = buildFullSolution(steps);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
