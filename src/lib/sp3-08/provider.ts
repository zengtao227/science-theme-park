import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import { solveSP308 } from "./solver";
import type { SP308Quest } from "./quests";

export function createSP308FeedbackProvider(t: Translator) {
  return (quest: SP308Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSP308(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
