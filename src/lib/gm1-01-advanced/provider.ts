import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { G101AdvQuest } from "./types";
import { solveGM101Advanced } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createGM101AdvancedFeedbackProvider(t: Translator) {
  return (quest: G101AdvQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGM101Advanced(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
