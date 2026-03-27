import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { SC207Quest } from "./sc2-07-types";
import { solveSC207 } from "./sc2-07-solver";

export function createSC207FeedbackProvider(t: Translator) {
  return (quest: SC207Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSC207(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
