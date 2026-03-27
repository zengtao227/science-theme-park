import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { S101Quest } from "@/lib/sm1-01/types";
import { solveSM101 } from "@/lib/sm1-01/solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSM101FeedbackProvider(t: Translator) {
  return (quest: S101Quest): Omit<FeedbackContent, "hint"> => {
    const solved = solveSM101(quest, t);
    return {
      steps: solved.steps,
      fullSolutionLatex: solved.fullSolutionLatex,
      hasFullSolution: !!solved.fullSolutionLatex,
    };
  };
}
