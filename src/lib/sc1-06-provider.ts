import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { SC106Quest } from "./sc1-06-types";
import { solveSC106 } from "./sc1-06-solver";

export function createSC106FeedbackProvider(t: Translator) {
  return (quest: SC106Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSC106(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
