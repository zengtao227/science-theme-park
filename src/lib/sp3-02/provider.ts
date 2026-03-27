import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { SP302Quest } from "./quests";
import { solveSP302 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSP302FeedbackProvider(t: Translator) {
  return (quest: SP302Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSP302(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
