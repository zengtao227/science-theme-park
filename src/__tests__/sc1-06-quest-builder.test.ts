/**
 * SC1.06 Chemical Reactions Basics - Quest Builder Tests
 * 
 * Unit tests for buildStagePool function
 */

import { buildStagePool } from '../lib/sc1-06-quest-builder';
import { Difficulty, Stage } from '../lib/sc1-06-types';

describe('buildStagePool', () => {
  const mockT = (key: string) => key; // Mock translation function
  
  describe('Quest Pool Generation', () => {
    it('should generate exactly 5 quests for REACTION_TYPES BASIC', () => {
      const quests = buildStagePool(mockT, 'BASIC', 'REACTION_TYPES', 5);
      expect(quests).toHaveLength(5);
    });
    
    it('should generate exactly 5 quests for EQUATION_BALANCING CORE', () => {
      const quests = buildStagePool(mockT, 'CORE', 'EQUATION_BALANCING', 5);
      expect(quests).toHaveLength(5);
    });
    
    it('should generate exactly 5 quests for REACTION_SIMULATION ADVANCED', () => {
      const quests = buildStagePool(mockT, 'ADVANCED', 'REACTION_SIMULATION', 5);
      expect(quests).toHaveLength(5);
    });
    
    it('should generate exactly 5 quests for ELITE difficulty', () => {
      const quests = buildStagePool(mockT, 'ELITE', 'REACTION_TYPES', 5);
      expect(quests).toHaveLength(5);
    });
  });
  
  describe('Quest Structure', () => {
    it('should have all required fields in quest objects', () => {
      const quests = buildStagePool(mockT, 'BASIC', 'REACTION_TYPES', 5);
      const quest = quests[0];
      
      expect(quest).toHaveProperty('id');
      expect(quest).toHaveProperty('difficulty');
      expect(quest).toHaveProperty('stage');
      expect(quest).toHaveProperty('equation');
      expect(quest).toHaveProperty('reactants');
      expect(quest).toHaveProperty('products');
      expect(quest).toHaveProperty('coefficients');
      expect(quest).toHaveProperty('reactionType');
      expect(quest).toHaveProperty('promptLatex');
      expect(quest).toHaveProperty('equationLatex');
      expect(quest).toHaveProperty('baselContext');
    });
    
    it('should have valid equation structure', () => {
      const quests = buildStagePool(mockT, 'BASIC', 'REACTION_TYPES', 5);
      const quest = quests[0];
      
      expect(quest.equation).toHaveProperty('reactants');
      expect(quest.equation).toHaveProperty('products');
      expect(quest.equation).toHaveProperty('coefficients');
      expect(quest.equation).toHaveProperty('type');
      
      expect(Array.isArray(quest.equation.reactants)).toBe(true);
      expect(Array.isArray(quest.equation.products)).toBe(true);
      expect(Array.isArray(quest.equation.coefficients)).toBe(true);
    });
  });
  
  describe('LaTeX Generation', () => {
    it('should generate LaTeX strings with four backslashes', () => {
      const quests = buildStagePool(mockT, 'BASIC', 'REACTION_TYPES', 5);
      const quest = quests[0];
      
      // Check that equationLatex contains four backslashes
      expect(quest.equationLatex).toContain('\\\\');
      // Should contain \text{} for element symbols
      expect(quest.equationLatex).toMatch(/\\\\text\{[A-Z][a-z]?\}/);
      // Should contain \rightarrow for reaction arrow
      expect(quest.equationLatex).toContain('\\\\rightarrow');
    });
    
    it('should not show coefficient 1 in LaTeX', () => {
      const quests = buildStagePool(mockT, 'BASIC', 'REACTION_TYPES', 5);
      
      // Find a quest with coefficient 1
      const questWithOne = quests.find(q => q.coefficients?.includes(1));
      if (questWithOne) {
        // The LaTeX should not have "1\text{" pattern (coefficient 1 should be omitted)
        // It should just be "\text{" without the "1" prefix
        const parts = questWithOne.equationLatex.split('\\\\rightarrow');
        // Check that we don't have explicit "1\text" patterns
        expect(questWithOne.equationLatex).not.toMatch(/\s1\\\\text/);
      }
    });
    
    it('should show coefficients greater than 1 in LaTeX', () => {
      const quests = buildStagePool(mockT, 'BASIC', 'REACTION_TYPES', 5);
      
      // Find a quest with coefficient > 1
      const questWithCoeff = quests.find(q => 
        q.coefficients?.some(c => c > 1)
      );
      
      if (questWithCoeff) {
        // Should have a number followed by \text
        expect(questWithCoeff.equationLatex).toMatch(/[2-9]\\\\text/);
      }
    });
  });
  
  describe('Compound Objects', () => {
    it('should create proper Compound objects with LaTeX', () => {
      const quests = buildStagePool(mockT, 'BASIC', 'REACTION_TYPES', 5);
      const quest = quests[0];
      
      const firstReactant = quest.equation.reactants[0];
      expect(firstReactant).toHaveProperty('formula');
      expect(firstReactant).toHaveProperty('formulaLatex');
      expect(firstReactant).toHaveProperty('elements');
      
      // formulaLatex should use four backslashes
      expect(firstReactant.formulaLatex).toContain('\\\\');
    });
    
    it('should parse elements correctly', () => {
      const quests = buildStagePool(mockT, 'BASIC', 'REACTION_TYPES', 5);
      const quest = quests[0];
      
      const firstReactant = quest.equation.reactants[0];
      expect(Array.isArray(firstReactant.elements)).toBe(true);
      expect(firstReactant.elements.length).toBeGreaterThan(0);
      
      firstReactant.elements.forEach(elem => {
        expect(elem).toHaveProperty('element');
        expect(elem).toHaveProperty('count');
        expect(typeof elem.element).toBe('string');
        expect(typeof elem.count).toBe('number');
      });
    });
  });
  
  describe('Stage-Specific Slots', () => {
    it('should generate coefficient slots for EQUATION_BALANCING', () => {
      const quests = buildStagePool(mockT, 'BASIC', 'EQUATION_BALANCING', 5);
      const quest = quests[0];
      
      expect(quest.slots).toBeDefined();
      expect(Array.isArray(quest.slots)).toBe(true);
      
      // Should have slots for each reactant and product
      const expectedSlots = quest.equation.reactants.length + quest.equation.products.length;
      expect(quest.slots?.length).toBe(expectedSlots);
    });
    
    it('should generate reaction type slot for REACTION_TYPES', () => {
      const quests = buildStagePool(mockT, 'BASIC', 'REACTION_TYPES', 5);
      const quest = quests[0];
      
      expect(quest.slots).toBeDefined();
      expect(Array.isArray(quest.slots)).toBe(true);
      expect(quest.slots?.length).toBeGreaterThan(0);
      
      // Should have a reaction_type slot
      const typeSlot = quest.slots?.find(s => s.id === 'reaction_type');
      expect(typeSlot).toBeDefined();
      expect(typeSlot?.expected).toBe(quest.reactionType);
    });
  });
  
  describe('All Stages and Difficulties', () => {
    const stages: Stage[] = ['REACTION_TYPES', 'EQUATION_BALANCING', 'REACTION_SIMULATION'];
    const difficulties: Difficulty[] = ['BASIC', 'CORE', 'ADVANCED', 'ELITE'];
    
    stages.forEach(stage => {
      difficulties.forEach(difficulty => {
        it(`should generate quests for ${stage} ${difficulty}`, () => {
          const quests = buildStagePool(mockT, difficulty, stage, 5);
          expect(quests.length).toBeGreaterThan(0);
          expect(quests.length).toBeLessThanOrEqual(5);
          
          quests.forEach(quest => {
            expect(quest.difficulty).toBe(difficulty);
            expect(quest.stage).toBe(stage);
            expect(quest.equationLatex).toBeTruthy();
            expect(quest.baselContext).toBeTruthy();
          });
        });
      });
    });
  });
  
  describe('Basel Context', () => {
    it('should include Basel-specific context in all quests', () => {
      const quests = buildStagePool(mockT, 'BASIC', 'REACTION_TYPES', 5);
      
      quests.forEach(quest => {
        expect(quest.baselContext).toBeTruthy();
        expect(quest.baselContext!.length).toBeGreaterThan(100);
        
        // Should mention Basel or related locations
        const context = quest.baselContext!.toLowerCase();
        const hasBaselReference = 
          context.includes('basel') ||
          context.includes('novartis') ||
          context.includes('roche') ||
          context.includes('rhine');
        
        expect(hasBaselReference).toBe(true);
      });
    });
  });
});
