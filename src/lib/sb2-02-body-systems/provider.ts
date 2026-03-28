import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { SB202BodySystemsSolverQuest } from "./solver";
import { solveSB202BodySystems } from "./solver";

export function createSB202BodySystemsFeedbackProvider(t: Translator) {
  return (quest: SB202BodySystemsSolverQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSB202BodySystems(quest, t);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
