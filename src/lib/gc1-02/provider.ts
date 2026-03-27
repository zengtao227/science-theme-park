import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { GC102Quest } from "./quests";
import { solveGC102 } from "./solver";

export function createGC102FeedbackProvider(t: Translator) {
  return (quest: GC102Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGC102(quest, t);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
