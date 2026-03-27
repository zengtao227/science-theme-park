import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { G401Quest } from "./quests";
import { solveGM401 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createGM401FeedbackProvider(t: Translator) {
  return (quest: G401Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGM401(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
