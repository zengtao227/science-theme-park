import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { GP202Quest } from "./types";
import { solveGP202 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createGP202FeedbackProvider(t: Translator) {
  return (quest: GP202Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGP202(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
