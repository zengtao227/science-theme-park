import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { GC101Quest } from "./quests";
import { solveGC101 } from "./solver";

export function createGC101FeedbackProvider(t: Translator) {
  return (quest: GC101Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGC101(quest, t);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
