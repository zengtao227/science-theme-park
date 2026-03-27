import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { TitrationQuest } from "./types";
import { solveSC202 } from "./solver";

export function createSC202FeedbackProvider(t: Translator) {
  return (quest: TitrationQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSC202(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
