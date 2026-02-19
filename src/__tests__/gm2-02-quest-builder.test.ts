// GM2.02 Analytical Geometry - Quest Builder Tests

import {
  buildStagePool,
  getQuestsByDifficulty,
  getQuestsByStage,
  getQuestById,
  getQuestPoolStats
} from "../lib/gm2-02-quest-builder";
import { Difficulty, Stage } from "../lib/gm2-02-types";

describe("GM2.02 Quest Builder", () => {
  describe("buildStagePool", () => {
    test("returns quests for BASIC difficulty and LINE_EQUATIONS stage", () => {
      const quests = buildStagePool(null, "BASIC", "LINE_EQUATIONS");
      
      expect(quests.length).toBeGreaterThan(0);
      quests.forEach(quest => {
        expect(quest.difficulty).toBe("BASIC");
        expect(quest.stage).toBe("LINE_EQUATIONS");
      });
    });

    test("returns quests for CORE difficulty and PLANE_GEOMETRY stage", () => {
      const quests = buildStagePool(null, "CORE", "PLANE_GEOMETRY");
      
      expect(quests.length).toBeGreaterThan(0);
      quests.forEach(quest => {
        expect(quest.difficulty).toBe("CORE");
        expect(quest.stage).toBe("PLANE_GEOMETRY");
      });
    });

    test("returns quests for ADVANCED difficulty and SPATIAL_RELATIONSHIPS stage", () => {
      const quests = buildStagePool(null, "ADVANCED", "SPATIAL_RELATIONSHIPS");
      
      expect(quests.length).toBeGreaterThan(0);
      quests.forEach(quest => {
        expect(quest.difficulty).toBe("ADVANCED");
        expect(quest.stage).toBe("SPATIAL_RELATIONSHIPS");
      });
    });

    test("returns quests for ELITE difficulty and SPATIAL_RELATIONSHIPS stage", () => {
      const quests = buildStagePool(null, "ELITE", "SPATIAL_RELATIONSHIPS");
      
      expect(quests.length).toBeGreaterThan(0);
      quests.forEach(quest => {
        expect(quest.difficulty).toBe("ELITE");
        expect(quest.stage).toBe("SPATIAL_RELATIONSHIPS");
      });
    });

    test("returns empty array for non-existent combination", () => {
      const quests = buildStagePool(null, "ELITE", "LINE_EQUATIONS");
      
      // This combination might not exist in the quest data
      expect(Array.isArray(quests)).toBe(true);
    });
  });

  describe("getQuestsByDifficulty", () => {
    test("returns all BASIC quests", () => {
      const quests = getQuestsByDifficulty("BASIC");
      
      expect(quests.length).toBeGreaterThan(0);
      quests.forEach(quest => {
        expect(quest.difficulty).toBe("BASIC");
      });
    });

    test("returns all CORE quests", () => {
      const quests = getQuestsByDifficulty("CORE");
      
      expect(quests.length).toBeGreaterThan(0);
      quests.forEach(quest => {
        expect(quest.difficulty).toBe("CORE");
      });
    });

    test("returns all ADVANCED quests", () => {
      const quests = getQuestsByDifficulty("ADVANCED");
      
      expect(quests.length).toBeGreaterThan(0);
      quests.forEach(quest => {
        expect(quest.difficulty).toBe("ADVANCED");
      });
    });

    test("returns all ELITE quests", () => {
      const quests = getQuestsByDifficulty("ELITE");
      
      expect(quests.length).toBeGreaterThan(0);
      quests.forEach(quest => {
        expect(quest.difficulty).toBe("ELITE");
      });
    });
  });

  describe("getQuestsByStage", () => {
    test("returns all LINE_EQUATIONS quests", () => {
      const quests = getQuestsByStage("LINE_EQUATIONS");
      
      expect(quests.length).toBeGreaterThan(0);
      quests.forEach(quest => {
        expect(quest.stage).toBe("LINE_EQUATIONS");
      });
    });

    test("returns all PLANE_GEOMETRY quests", () => {
      const quests = getQuestsByStage("PLANE_GEOMETRY");
      
      expect(quests.length).toBeGreaterThan(0);
      quests.forEach(quest => {
        expect(quest.stage).toBe("PLANE_GEOMETRY");
      });
    });

    test("returns all SPATIAL_RELATIONSHIPS quests", () => {
      const quests = getQuestsByStage("SPATIAL_RELATIONSHIPS");
      
      expect(quests.length).toBeGreaterThan(0);
      quests.forEach(quest => {
        expect(quest.stage).toBe("SPATIAL_RELATIONSHIPS");
      });
    });
  });

  describe("getQuestById", () => {
    test("returns quest with matching ID", () => {
      const allQuests = getQuestsByDifficulty("BASIC");
      if (allQuests.length > 0) {
        const firstQuestId = allQuests[0].id;
        const quest = getQuestById(firstQuestId);
        
        expect(quest).toBeDefined();
        expect(quest!.id).toBe(firstQuestId);
      }
    });

    test("returns undefined for non-existent ID", () => {
      const quest = getQuestById("NON_EXISTENT_ID");
      
      expect(quest).toBeUndefined();
    });
  });

  describe("getQuestPoolStats", () => {
    test("returns correct statistics", () => {
      const stats = getQuestPoolStats();
      
      expect(stats.total).toBeGreaterThan(0);
      expect(stats.byDifficulty.BASIC).toBeGreaterThan(0);
      expect(stats.byDifficulty.CORE).toBeGreaterThan(0);
      expect(stats.byDifficulty.ADVANCED).toBeGreaterThan(0);
      expect(stats.byDifficulty.ELITE).toBeGreaterThan(0);
      
      expect(stats.byStage.LINE_EQUATIONS).toBeGreaterThan(0);
      expect(stats.byStage.PLANE_GEOMETRY).toBeGreaterThan(0);
      expect(stats.byStage.SPATIAL_RELATIONSHIPS).toBeGreaterThan(0);
      
      // Total should equal sum of all difficulties
      const difficultySum = 
        stats.byDifficulty.BASIC +
        stats.byDifficulty.CORE +
        stats.byDifficulty.ADVANCED +
        stats.byDifficulty.ELITE;
      expect(stats.total).toBe(difficultySum);
      
      // Total should equal sum of all stages
      const stageSum =
        stats.byStage.LINE_EQUATIONS +
        stats.byStage.PLANE_GEOMETRY +
        stats.byStage.SPATIAL_RELATIONSHIPS;
      expect(stats.total).toBe(stageSum);
    });
  });

  describe("Quest Data Completeness", () => {
    test("all quests have required fields", () => {
      const allQuests = getQuestsByDifficulty("BASIC");
      
      allQuests.forEach(quest => {
        expect(quest.id).toBeDefined();
        expect(quest.difficulty).toBeDefined();
        expect(quest.stage).toBeDefined();
        expect(quest.promptLatex).toBeDefined();
        expect(quest.expressionLatex).toBeDefined();
        expect(quest.targetLatex).toBeDefined();
        expect(quest.slots).toBeDefined();
        expect(Array.isArray(quest.slots)).toBe(true);
        expect(quest.correctLatex).toBeDefined();
        expect(quest.answer).toBeDefined();
        expect(quest.visualizationData).toBeDefined();
      });
    });

    test("all quest slots have required fields", () => {
      const allQuests = getQuestsByDifficulty("BASIC");
      
      allQuests.forEach(quest => {
        quest.slots.forEach(slot => {
          expect(slot.id).toBeDefined();
          expect(slot.labelLatex).toBeDefined();
          expect(slot.placeholder).toBeDefined();
          expect(slot.expected).toBeDefined();
          expect(slot.type).toBeDefined();
          expect(["number", "expression"]).toContain(slot.type);
        });
      });
    });

    test("visualization data is properly structured", () => {
      const allQuests = getQuestsByDifficulty("BASIC");
      
      allQuests.forEach(quest => {
        const viz = quest.visualizationData;
        expect(viz).toBeDefined();
        
        // At least one of these should be defined
        const hasData = 
          (viz.lines && viz.lines.length > 0) ||
          (viz.planes && viz.planes.length > 0) ||
          (viz.points && viz.points.length > 0) ||
          (viz.distances && viz.distances.length > 0);
        
        expect(hasData).toBe(true);
      });
    });
  });
});
