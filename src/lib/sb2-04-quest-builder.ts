/**
 * SB2.04 Human Physiology Module - Quest Pool Builder
 * 
 * Generates quest pools based on difficulty and stage selection
 */

import { Difficulty } from "@/hooks/useQuestManager";
import { Stage, SB204Quest } from "./sb2-04-types";
import {
  digestiveBasicQuests,
  digestiveCoreQuests,
  digestiveAdvancedQuests,
  digestiveEliteQuests,
  respiratoryBasicQuests,
  respiratoryCoreQuests,
  respiratoryAdvancedQuests,
  respiratoryEliteQuests,
  circulatoryBasicQuests,
  circulatoryCoreQuests,
  circulatoryAdvancedQuests,
  circulatoryEliteQuests,
  excretoryBasicQuests,
  excretoryCoreQuests,
  excretoryAdvancedQuests,
  excretoryEliteQuests,
} from "./sb2-04-quest-data";

type Translator = (path: string, params?: Record<string, string | number>) => string;

function translateText(t: Translator | undefined, path: string, fallback: string): string {
  if (!t) return fallback;
  const translated = t(path);
  return translated !== path ? translated : fallback;
}

function normalizeValueKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function translateQuestValue(t: Translator | undefined, value?: string): string | undefined {
  if (!value) return value;
  const key = normalizeValueKey(value);
  const paths = [
    `sb2_04.answers.${key}`,
    `sb2_04.organs.${key}`,
    `sb2_04.functions.${key}`,
    `sb2_04.labels.${key}`,
    `sb2_04.expressions.${key}`,
  ];

  for (const path of paths) {
    const translated = translateText(t, path, value);
    if (translated !== value) return translated;
  }
  return value;
}

/**
 * Builds a quest pool for a specific difficulty and stage
 * 
 * @param t - Translation function (not used in quest data, but kept for consistency)
 * @param difficulty - Quest difficulty level
 * @param stage - Body system stage
 * @returns Array of quests for the specified difficulty and stage
 */
export function buildStagePool(
  t: Translator | undefined,
  difficulty: Difficulty,
  stage: Stage
): SB204Quest[] {
  let quests: SB204Quest[] = [];

  // Select quests based on stage
  switch (stage) {
    case "DIGESTIVE_SYSTEM":
      switch (difficulty) {
        case "BASIC":
          quests = [...digestiveBasicQuests];
          break;
        case "CORE":
          quests = [...digestiveCoreQuests];
          break;
        case "ADVANCED":
          quests = [...digestiveAdvancedQuests];
          break;
        case "ELITE":
          quests = [...digestiveEliteQuests];
          break;
      }
      break;

    case "RESPIRATORY_SYSTEM":
      switch (difficulty) {
        case "BASIC":
          quests = [...respiratoryBasicQuests];
          break;
        case "CORE":
          quests = [...respiratoryCoreQuests];
          break;
        case "ADVANCED":
          quests = [...respiratoryAdvancedQuests];
          break;
        case "ELITE":
          quests = [...respiratoryEliteQuests];
          break;
      }
      break;

    case "CIRCULATORY_SYSTEM":
      switch (difficulty) {
        case "BASIC":
          quests = [...circulatoryBasicQuests];
          break;
        case "CORE":
          quests = [...circulatoryCoreQuests];
          break;
        case "ADVANCED":
          quests = [...circulatoryAdvancedQuests];
          break;
        case "ELITE":
          quests = [...circulatoryEliteQuests];
          break;
      }
      break;

    case "EXCRETORY_SYSTEM":
      switch (difficulty) {
        case "BASIC":
          quests = [...excretoryBasicQuests];
          break;
        case "CORE":
          quests = [...excretoryCoreQuests];
          break;
        case "ADVANCED":
          quests = [...excretoryAdvancedQuests];
          break;
        case "ELITE":
          quests = [...excretoryEliteQuests];
          break;
      }
      break;
  }

  const answerLabel = translateText(t, "sb2_04.labels.answer", "Answer");

  return quests.map((quest) => {
    const localizedAnswer = translateQuestValue(t, quest.correctAnswer) ?? quest.correctAnswer;
    const localizedOptions = quest.options?.map((option) => translateQuestValue(t, option) ?? option);

    return {
      ...quest,
      promptLatex: translateText(t, quest.promptLatex, quest.promptLatex),
      correctAnswer: localizedAnswer.toLowerCase(),
      correctLatex: localizedAnswer.toLowerCase(),
      options: localizedOptions,
      slots: quest.slots.map((slot) => ({
        ...slot,
        labelLatex: `\\text{${answerLabel}}`,
        placeholder: localizedAnswer.toLowerCase(),
        expected: localizedAnswer.toLowerCase(),
      })),
    };
  });
}
