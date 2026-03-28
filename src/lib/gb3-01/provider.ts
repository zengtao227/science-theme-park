import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { GB301SolverQuest } from "./solver";
import { solveGB301 } from "./solver";

export function createGB301FeedbackProvider(t: Translator) {
  return (quest: GB301SolverQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGB301(quest, t);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
