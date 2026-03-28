import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { SB201TissuesSolverQuest } from "./solver";
import { solveSB201Tissues } from "./solver";

export function createSB201TissuesFeedbackProvider(t: Translator) {
  return (quest: SB201TissuesSolverQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSB201Tissues(quest, t);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
