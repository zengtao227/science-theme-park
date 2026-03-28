import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { MetabolicSolverQuest } from "./solver";
import { solveSB101Metabolic } from "./solver";

export function createSB101MetabolicFeedbackProvider(t: Translator) {
  return (quest: MetabolicSolverQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSB101Metabolic(quest, t);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
