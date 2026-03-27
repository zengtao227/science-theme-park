import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { BondQuest } from "./types";
import { solveSC105 } from "./solver";

export function createSC105FeedbackProvider(t: Translator) {
  return (quest: BondQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSC105(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
