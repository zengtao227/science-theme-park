import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { GM103Quest } from "./gm1-03-types";
import { solveGM103 } from "./gm1-03-solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createGM103FeedbackProvider(t: Translator) {
  return (quest: GM103Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGM103(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
