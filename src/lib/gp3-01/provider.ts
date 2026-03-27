import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { GP301Quest } from "./types";
import { solveGP301 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createGP301FeedbackProvider(t: Translator) {
  return (quest: GP301Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGP301(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
