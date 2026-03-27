import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { G101Quest } from "./quests";
import { solveGM101 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createGM101FeedbackProvider(t: Translator) {
  return (quest: G101Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGM101(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
