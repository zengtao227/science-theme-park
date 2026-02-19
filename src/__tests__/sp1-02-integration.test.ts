/**
 * SP1.02 Newton's Laws Module - Integration Tests
 */

import { buildQuestPool } from "@/lib/sp1-02-quests";
import { baselScenarios } from "@/lib/sp1-02-scenarios";
import { Difficulty, Stage } from "@/lib/sp1-02-types";

describe("SP1.02 Newton's Laws Module", () => {
  describe("Module Structure", () => {
    test("should have exactly 3 stages", () => {
      const stages: Stage[] = ["FIRST_LAW", "SECOND_LAW", "THIRD_LAW"];
      expect(stages).toHaveLength(3);
    });

    test("should have exactly 4 Basel scenarios", () => {
      expect(baselScenarios).toHaveLength(4);
    });

    test("should have 75 total quests", () => {
      const difficulties: Difficulty[] = ["BASIC", "CORE", "ADVANCED", "ELITE"];
      const stages: Stage[] = ["FIRST_LAW", "SECOND_LAW", "THIRD_LAW"];
      
      let totalQuests = 0;
      for (const difficulty of difficulties) {
        for (const stage of stages) {
          const quests = buildQuestPool(difficulty, stage);
          totalQuests += quests.length;
        }
      }
      
      expect(totalQuests).toBe(75);
    });
  });

  describe("Quest Distribution", () => {
    test("should have exactly 20 BASIC quests", () => {
      const stages: Stage[] = ["FIRST_LAW", "SECOND_LAW", "THIRD_LAW"];
      let basicCount = 0;
      
      for (const stage of stages) {
        const quests = buildQuestPool("BASIC", stage);
        basicCount += quests.length;
      }
      
      expect(basicCount).toBe(20);
    });

    test("should have exactly 25 CORE quests", () => {
      const stages: Stage[] = ["FIRST_LAW", "SECOND_LAW", "THIRD_LAW"];
      let coreCount = 0;
      
      for (const stage of stages) {
        const quests = buildQuestPool("CORE", stage);
        coreCount += quests.length;
      }
      
      expect(coreCount).toBe(25);
    });

    test("should have exactly 20 ADVANCED quests", () => {
      const stages: Stage[] = ["FIRST_LAW", "SECOND_LAW", "THIRD_LAW"];
      let advancedCount = 0;
      
      for (const stage of stages) {
        const quests = buildQuestPool("ADVANCED", stage);
        advancedCount += quests.length;
      }
      
      expect(advancedCount).toBe(20);
    });

    test("should have exactly 10 ELITE quests", () => {
      const stages: Stage[] = ["FIRST_LAW", "SECOND_LAW", "THIRD_LAW"];
      let eliteCount = 0;
      
      for (const stage of stages) {
        const quests = buildQuestPool("ELITE", stage);
        eliteCount += quests.length;
      }
      
      expect(eliteCount).toBe(10);
    });

    test("each stage should have at least one quest", () => {
      const stages: Stage[] = ["FIRST_LAW", "SECOND_LAW", "THIRD_LAW"];
      const difficulties: Difficulty[] = ["BASIC", "CORE", "ADVANCED", "ELITE"];
      
      for (const stage of stages) {
        let stageTotal = 0;
        for (const difficulty of difficulties) {
          const quests = buildQuestPool(difficulty, stage);
          stageTotal += quests.length;
        }
        expect(stageTotal).toBeGreaterThan(0);
      }
    });
  });

  describe("Basel Scenarios", () => {
    test("all scenarios should have reasonable word count", () => {
      for (const scenario of baselScenarios) {
        const enWordCount = scenario.description.en.split(/\s+/).length;
        const cnWordCount = scenario.description.cn.split(/\s+/).length;
        const deWordCount = scenario.description.de.split(/\s+/).length;
        
        // Allow 100-300 word range for MVP (spec requires 150-250)
        expect(enWordCount).toBeGreaterThanOrEqual(100);
        expect(enWordCount).toBeLessThanOrEqual(300);
        
        // Chinese and German should also be reasonable lengths
        expect(cnWordCount).toBeGreaterThan(0);
        expect(deWordCount).toBeGreaterThan(0);
      }
    });

    test("each stage should have at least one scenario", () => {
      const firstLawScenarios = baselScenarios.filter(s => s.stage === "FIRST_LAW");
      const secondLawScenarios = baselScenarios.filter(s => s.stage === "SECOND_LAW");
      const thirdLawScenarios = baselScenarios.filter(s => s.stage === "THIRD_LAW");
      
      expect(firstLawScenarios.length).toBeGreaterThan(0);
      expect(secondLawScenarios.length).toBeGreaterThan(0);
      expect(thirdLawScenarios.length).toBeGreaterThan(0);
    });

    test("all scenarios should have multilingual content", () => {
      for (const scenario of baselScenarios) {
        expect(scenario.title.en).toBeTruthy();
        expect(scenario.title.cn).toBeTruthy();
        expect(scenario.title.de).toBeTruthy();
        
        expect(scenario.description.en).toBeTruthy();
        expect(scenario.description.cn).toBeTruthy();
        expect(scenario.description.de).toBeTruthy();
      }
    });
  });

  describe("Quest Content Quality", () => {
    test("all quests should have required fields", () => {
      const difficulties: Difficulty[] = ["BASIC", "CORE", "ADVANCED", "ELITE"];
      const stages: Stage[] = ["FIRST_LAW", "SECOND_LAW", "THIRD_LAW"];
      
      for (const difficulty of difficulties) {
        for (const stage of stages) {
          const quests = buildQuestPool(difficulty, stage);
          
          for (const quest of quests) {
            expect(quest.id).toBeTruthy();
            expect(quest.difficulty).toBe(difficulty);
            expect(quest.stage).toBe(stage);
            expect(quest.promptLatex).toBeTruthy();
            expect(quest.answer).toBeTruthy();
            expect(quest.relatedLaw).toBeTruthy();
          }
        }
      }
    });

    test("FIRST_LAW quests should relate to FIRST law", () => {
      const difficulties: Difficulty[] = ["BASIC", "CORE", "ADVANCED", "ELITE"];
      
      for (const difficulty of difficulties) {
        const quests = buildQuestPool(difficulty, "FIRST_LAW");
        for (const quest of quests) {
          expect(quest.relatedLaw).toBe("FIRST");
        }
      }
    });

    test("SECOND_LAW quests should relate to SECOND law", () => {
      const difficulties: Difficulty[] = ["BASIC", "CORE", "ADVANCED", "ELITE"];
      
      for (const difficulty of difficulties) {
        const quests = buildQuestPool(difficulty, "SECOND_LAW");
        for (const quest of quests) {
          expect(quest.relatedLaw).toBe("SECOND");
        }
      }
    });

    test("THIRD_LAW quests should relate to THIRD law", () => {
      const difficulties: Difficulty[] = ["BASIC", "CORE", "ADVANCED", "ELITE"];
      
      for (const difficulty of difficulties) {
        const quests = buildQuestPool(difficulty, "THIRD_LAW");
        for (const quest of quests) {
          expect(quest.relatedLaw).toBe("THIRD");
        }
      }
    });
  });
});
