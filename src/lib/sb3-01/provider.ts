import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { SB301SolverQuest } from "./solver";
import { solveSB301 } from "./solver";

export function createSB301FeedbackProvider(t: Translator) {
  return (quest: SB301SolverQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSB301(quest, t);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
