import type { FeedbackContent } from "@/hooks/useQuestManager";
import { createGenericModuleFeedbackProvider, type GenericFeedbackQuest } from "@/lib/feedback/genericModuleProvider";
import { MODULE_STAGE_RULES } from "@/lib/feedback/moduleStageRules";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createModuleFeedbackProvider<T extends GenericFeedbackQuest>(
  t: Translator,
  moduleCode: string
) {
  const stageRules = MODULE_STAGE_RULES[moduleCode.toLowerCase()] ?? {};
  return createGenericModuleFeedbackProvider<T>(t, stageRules) as (quest: T) => Omit<FeedbackContent, "hint">;
}
