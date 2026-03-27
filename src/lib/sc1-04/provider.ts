import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { PeriodicQuest } from "./types";
import { solveSC104 } from "./solver";

export function createSC104FeedbackProvider(t: Translator) {
  return (quest: PeriodicQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSC104(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
