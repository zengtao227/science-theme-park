import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { G201Quest } from "./quests";
import { solveGM201 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createGM201FeedbackProvider(t: Translator) {
  return (quest: G201Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGM201(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
