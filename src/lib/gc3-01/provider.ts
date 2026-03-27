import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { GC301Quest } from "./quests";
import { solveGC301 } from "./solver";

export function createGC301FeedbackProvider(t: Translator) {
  return (quest: GC301Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGC301(quest, t);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
