import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { GC302Quest } from "./quests";
import { solveGC302 } from "./solver";

export function createGC302FeedbackProvider(t: Translator) {
  return (quest: GC302Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGC302(quest, t);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
