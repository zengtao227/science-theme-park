import type { Quest as PlatformQuest, Slot } from "@/hooks/useQuestManager";
import type { Stage, QuestType, ValidationConfig, MultiLangContent, Force } from "./domain/types";

export interface SP101AdaptedQuest extends PlatformQuest {
  stage: Stage;
  type: QuestType;
  validation: ValidationConfig;
  content: MultiLangContent;
  visualization?: string;
  slots: (Slot & { options?: string[] })[];
  options?: { id: string; text: string }[];
  scenarioTitle?: string;
  scenarioDesc?: string;
  forces?: Force[];
  feedback?: {
    correct: string;
    incorrect: string;
  };
  expressionLatex: string;
  targetLatex: string;
  correctLatex: string;
  promptLatex: string;
}
