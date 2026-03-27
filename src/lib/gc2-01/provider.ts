import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import { solveGC201 } from "./solver";

type OrganicQuest = {
  stage: "ALKANES" | "AROMATICS" | "BIOMOLECULES";
  promptLatex: string;
  correctLatex: string;
  simConfig: { molecule: string };
};

export function createGC201FeedbackProvider(t: Translator) {
  return (quest: OrganicQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGC201(quest, t);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
