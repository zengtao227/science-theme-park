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

/**
 * Builds a quest pool for a specific difficulty and stage
 * 
 * @param t - Translation function (not used in quest data, but kept for consistency)
 * @param difficulty - Quest difficulty level
 * @param stage - Body system stage
 * @returns Array of quests for the specified difficulty and stage
 */
export function buildStagePool(
  t: any,
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

  return quests;
}
