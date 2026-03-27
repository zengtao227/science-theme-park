import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { TunnelQuest } from "./types";
import { solveGP104 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createGP104FeedbackProvider(t: Translator) {
  return (quest: TunnelQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGP104(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
