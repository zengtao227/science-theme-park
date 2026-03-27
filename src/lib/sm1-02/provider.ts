import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { S102Quest } from "@/lib/sm1-02/types";
import { solveSM102 } from "@/lib/sm1-02/solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSM102FeedbackProvider(t: Translator) {
  return (quest: S102Quest): Omit<FeedbackContent, "hint"> => {
    const solved = solveSM102(quest, t);
    return {
      steps: solved.steps,
      fullSolutionLatex: solved.fullSolutionLatex,
      hasFullSolution: !!solved.fullSolutionLatex,
    };
  };
}
