import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { AcidBaseQuest } from "./types";
import { solveSC205 } from "./solver";

export function createSC205FeedbackProvider(t: Translator) {
  return (quest: AcidBaseQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSC205(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
