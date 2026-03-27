import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { SC302Quest } from "./types";
import { solveSC302 } from "./solver";

export function createSC302FeedbackProvider(t: Translator) {
  return (quest: SC302Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSC302(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
