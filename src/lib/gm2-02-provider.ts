import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { GM202Quest } from "./gm2-02-types";
import { solveGM202 } from "./gm2-02-solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createGM202FeedbackProvider(t: Translator) {
  return (quest: GM202Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGM202(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
