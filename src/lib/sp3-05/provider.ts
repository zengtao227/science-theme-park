import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import { solveSP305 } from "./solver";
import type { SP305Quest } from "./types";

export function createSP305FeedbackProvider(t: Translator) {
  return (quest: SP305Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSP305(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
