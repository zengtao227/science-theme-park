import type { FeedbackContent, Quest } from "@/hooks/useQuestManager";
import { solveSM303 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export type SM303FeedbackQuest = Quest & {
  stage: "EXPONENTIAL" | "LOGARITHM" | "APPLICATIONS";
  initialCount?: number;
  doublingTime?: number;
  time?: number;
  finalCount?: number;
  chartMode?: "exponential" | "logarithm" | "halflife" | "compound";
  scenarioKey?: string;
};

export function createSM303FeedbackProvider(t: Translator) {
  return (quest: SM303FeedbackQuest): Omit<FeedbackContent, "hint"> => solveSM303(quest, t);
}
