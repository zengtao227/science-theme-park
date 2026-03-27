import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { GP302Quest } from "./types";
import { solveGP302 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createGP302FeedbackProvider(t: Translator) {
  return (quest: GP302Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGP302(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
