import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { GP201Quest } from "./types";
import { solveGP201 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createGP201FeedbackProvider(t: Translator) {
  return (quest: GP201Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGP201(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
