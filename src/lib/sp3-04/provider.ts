import type { FeedbackContent } from "@/hooks/useQuestManager";
import { solveSP304 } from "./solver";
import type { SP304Quest } from "./types";
import type { Translator } from "@/lib/feedback/solverSupport";

export function createSP304FeedbackProvider(t: Translator) {
  return (quest: SP304Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSP304(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
