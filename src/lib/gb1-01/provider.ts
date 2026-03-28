import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { GB101SolverQuest } from "./solver";
import { solveGB101 } from "./solver";

export function createGB101FeedbackProvider(t: Translator) {
  return (quest: GB101SolverQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGB101(quest, t);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
