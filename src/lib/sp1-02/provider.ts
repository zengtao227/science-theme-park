import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { SP102Quest } from "./quests";
import { solveSP102 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSP102FeedbackProvider(t: Translator) {
  return (quest: SP102Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSP102(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
