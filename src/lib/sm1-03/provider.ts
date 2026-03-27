import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { IntegerQuest } from "@/lib/sm1-03/types";
import { solveSM103 } from "@/lib/sm1-03/solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSM103FeedbackProvider(t: Translator) {
  return (quest: IntegerQuest): Omit<FeedbackContent, "hint"> => {
    const solved = solveSM103(quest, t);
    return {
      steps: solved.steps,
      fullSolutionLatex: solved.fullSolutionLatex,
      hasFullSolution: !!solved.fullSolutionLatex,
    };
  };
}
