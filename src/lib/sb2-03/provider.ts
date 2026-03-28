import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { SB203SolverQuest } from "./solver";
import { solveSB203 } from "./solver";

export function createSB203FeedbackProvider(t: Translator) {
  return (quest: SB203SolverQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSB203(quest, t);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
