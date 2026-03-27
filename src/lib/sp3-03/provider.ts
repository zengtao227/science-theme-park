import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { SP303Quest } from "./quests";
import { solveSP303 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSP303FeedbackProvider(t: Translator) {
  return (quest: SP303Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSP303(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
