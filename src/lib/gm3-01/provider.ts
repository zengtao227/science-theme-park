import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { G301Quest } from "./quests";
import { solveGM301 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createGM301FeedbackProvider(t: Translator) {
  return (quest: G301Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGM301(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
