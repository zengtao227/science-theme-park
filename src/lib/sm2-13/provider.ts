import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { SM213Quest } from "@/lib/sm2-13-quest-data";
import { solveSM213 } from "@/lib/sm2-13/solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSM213FeedbackProvider(t: Translator) {
  return (quest: SM213Quest): Omit<FeedbackContent, "hint"> => {
    const solved = solveSM213(quest.feedbackData, t);
    return {
      steps: solved.steps,
      fullSolutionLatex: solved.fullSolutionLatex,
      hasFullSolution: !!solved.fullSolutionLatex,
    };
  };
}
