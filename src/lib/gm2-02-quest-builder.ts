// GM2.02 Analytical Geometry - Quest Pool Builder

import { GM202Quest, Difficulty, Stage } from "./gm2-02-types";
import {
  generateLineEquationsBasicQuests,
  generatePlaneGeometryCoreQuests,
  generateSpatialRelationshipsAdvancedQuests,
  generateSpatialRelationshipsEliteQuests,
  getAllQuests
} from "./gm2-02-quest-data";

/**
 * Build quest pool for a specific difficulty and stage
 * Returns array of quests matching the criteria
 */
export function buildStagePool(
  t: any, // Translation function (not used in quest generation, but kept for consistency)
  difficulty: Difficulty,
  stage: Stage
): GM202Quest[] {
  const allQuests = getAllQuests();
  
  // Filter quests by difficulty and stage
  const filteredQuests = allQuests.filter(
    quest => quest.difficulty === difficulty && quest.stage === stage
  );

  return filteredQuests;
}

/**
 * Get quests by difficulty level
 */
export function getQuestsByDifficulty(difficulty: Difficulty): GM202Quest[] {
  const allQuests = getAllQuests();
  return allQuests.filter(quest => quest.difficulty === difficulty);
}

/**
 * Get quests by stage
 */
export function getQuestsByStage(stage: Stage): GM202Quest[] {
  const allQuests = getAllQuests();
  return allQuests.filter(quest => quest.stage === stage);
}

/**
 * Get quest by ID
 */
export function getQuestById(id: string): GM202Quest | undefined {
  const allQuests = getAllQuests();
  return allQuests.find(quest => quest.id === id);
}

/**
 * Get quest pool statistics
 */
export function getQuestPoolStats() {
  const allQuests = getAllQuests();
  
  const stats = {
    total: allQuests.length,
    byDifficulty: {
      BASIC: allQuests.filter(q => q.difficulty === "BASIC").length,
      CORE: allQuests.filter(q => q.difficulty === "CORE").length,
      ADVANCED: allQuests.filter(q => q.difficulty === "ADVANCED").length,
      ELITE: allQuests.filter(q => q.difficulty === "ELITE").length
    },
    byStage: {
      LINE_EQUATIONS: allQuests.filter(q => q.stage === "LINE_EQUATIONS").length,
      PLANE_GEOMETRY: allQuests.filter(q => q.stage === "PLANE_GEOMETRY").length,
      SPATIAL_RELATIONSHIPS: allQuests.filter(q => q.stage === "SPATIAL_RELATIONSHIPS").length
    }
  };

  return stats;
}
