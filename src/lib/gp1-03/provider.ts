import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { ColliderQuest } from "./types";
import { solveGP103 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createGP103FeedbackProvider(t: Translator) {
  return (quest: ColliderQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGP103(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
