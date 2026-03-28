import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { SB202SolverQuest } from "./solver";
import { solveSB202 } from "./solver";

export function createSB202FeedbackProvider(t: Translator) {
  return (quest: SB202SolverQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSB202(quest, t);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
