import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { SC301Quest } from "./types";
import { solveSC301 } from "./solver";

export function createSC301FeedbackProvider(t: Translator) {
  return (quest: SC301Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSC301(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
