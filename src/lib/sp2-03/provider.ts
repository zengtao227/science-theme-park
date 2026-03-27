import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { SP203Quest } from "./types";
import { solveSP203 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSP203FeedbackProvider(t: Translator) {
  return (quest: SP203Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSP203(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
