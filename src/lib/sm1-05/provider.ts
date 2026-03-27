import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { S105Quest } from "@/lib/sm1-05/types";
import { solveSM105 } from "@/lib/sm1-05/solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSM105FeedbackProvider(t: Translator) {
  return (quest: S105Quest): Omit<FeedbackContent, "hint"> => {
    const solved = solveSM105(quest, t);
    return {
      steps: solved.steps,
      fullSolutionLatex: solved.fullSolutionLatex,
      hasFullSolution: !!solved.fullSolutionLatex,
    };
  };
}
