import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { SC303Quest } from "./types";
import { solveSC303 } from "./solver";

export function createSC303FeedbackProvider(t: Translator) {
  return (quest: SC303Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSC303(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
