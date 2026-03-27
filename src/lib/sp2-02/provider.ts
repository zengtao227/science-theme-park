import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { SP202Quest } from "./types";
import { solveSP202 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSP202FeedbackProvider(t: Translator) {
  return (quest: SP202Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSP202(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
