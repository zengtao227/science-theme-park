import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { GM102Quest } from "./quests";
import { solveGM102 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createGM102FeedbackProvider(t: Translator) {
  return (quest: GM102Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGM102(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
