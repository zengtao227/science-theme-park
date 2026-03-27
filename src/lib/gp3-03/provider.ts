import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { GP303Quest } from "./types";
import { solveGP303 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createGP303FeedbackProvider(t: Translator) {
  return (quest: GP303Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGP303(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
