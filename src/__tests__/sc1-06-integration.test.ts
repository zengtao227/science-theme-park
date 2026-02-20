/**
 * SC1.06 Chemical Reactions Basics - Integration Tests
 * 
 * Integration tests verifying the complete quest generation flow
 */

import { buildStagePool } from '../lib/sc1-06-quest-builder';
import { calculateAtomCounts, isEquationBalanced } from '../lib/sc1-06-utils';

describe('SC1.06 Integration Tests', () => {
  const mockT = (key: string) => key;
  
  describe('Complete Quest Generation Flow', () => {
    it('should generate valid quests with balanced equations', () => {
      const quests = buildStagePool(mockT, 'BASIC', 'EQUATION_BALANCING', 5);
      
      quests.forEach(quest => {
        // Verify quest structure
        expect(quest.id).toBeTruthy();
        expect(quest.equation).toBeTruthy();
        expect(quest.coefficients).toBeTruthy();
        
        // Verify equation is balanced with provided coefficients
        const atomCounts = calculateAtomCounts(quest.equation, quest.coefficients!);
        const balanced = isEquationBalanced(atomCounts);
        
        expect(balanced).toBe(true);
      });
    });
    
    it('should generate LaTeX that matches the equation structure', () => {
      const quests = buildStagePool(mockT, 'BASIC', 'REACTION_TYPES', 3);
      
      quests.forEach(quest => {
        // LaTeX should contain all reactant elements
        quest.equation.reactants.forEach(reactant => {
          reactant.elements.forEach(elem => {
            // Element symbol should appear in LaTeX
            expect(quest.equationLatex).toContain(elem.element);
          });
        });
        
        // LaTeX should contain all product elements
        quest.equation.products.forEach(product => {
          product.elements.forEach(elem => {
            // Element symbol should appear in LaTeX
            expect(quest.equationLatex).toContain(elem.element);
          });
        });
        
        // Should have reaction arrow
        expect(quest.equationLatex).toContain('\\\\rightarrow');
      });
    });
    
    it('should generate quests for all 60 combinations (3 stages × 4 difficulties × 5 quests)', () => {
      const stages = ['REACTION_TYPES', 'EQUATION_BALANCING', 'REACTION_SIMULATION'] as const;
      const difficulties = ['BASIC', 'CORE', 'ADVANCED', 'ELITE'] as const;
      
      let totalQuests = 0;
      
      stages.forEach(stage => {
        difficulties.forEach(difficulty => {
          const quests = buildStagePool(mockT, difficulty, stage, 5);
          expect(quests.length).toBe(5);
          totalQuests += quests.length;
          
          // Verify each quest has unique ID
          const ids = quests.map(q => q.id);
          const uniqueIds = new Set(ids);
          expect(uniqueIds.size).toBe(ids.length);
        });
      });
      
      // Should have 60 total quests
      expect(totalQuests).toBe(60);
    });
  });
  
  describe('LaTeX Formatting Standards', () => {
    it('should use four backslashes in all LaTeX strings', () => {
      const quests = buildStagePool(mockT, 'CORE', 'EQUATION_BALANCING', 5);
      
      quests.forEach(quest => {
        // Check equation LaTeX - should contain \\text{ pattern (four backslashes in source)
        expect(quest.equationLatex).toContain('\\\\text{');
        expect(quest.equationLatex).toContain('\\\\rightarrow');
        
        // Check compound LaTeX
        quest.equation.reactants.forEach(reactant => {
          expect(reactant.formulaLatex).toContain('\\\\text{');
        });
        
        quest.equation.products.forEach(product => {
          expect(product.formulaLatex).toContain('\\\\text{');
        });
      });
    });
    
    it('should never use Unicode characters in LaTeX', () => {
      const quests = buildStagePool(mockT, 'ADVANCED', 'REACTION_TYPES', 5);
      
      quests.forEach(quest => {
        // Check for common Unicode chemical symbols
        expect(quest.equationLatex).not.toMatch(/[₀-_9]/); // Subscript numbers
        expect(quest.equationLatex).not.toMatch(/[⁰-^9]/); // Superscript numbers
        expect(quest.equationLatex).not.toMatch(/→/); // Arrow
        expect(quest.equationLatex).not.toMatch(/[^+^-]/); // Plus/minus superscripts
      });
    });
  });
  
  describe('Basel Context Validation', () => {
    it('should include Basel-specific references in all quests', () => {
      const stages = ['REACTION_TYPES', 'EQUATION_BALANCING', 'REACTION_SIMULATION'] as const;
      const difficulties = ['BASIC', 'CORE', 'ADVANCED', 'ELITE'] as const;
      
      stages.forEach(stage => {
        difficulties.forEach(difficulty => {
          const quests = buildStagePool(mockT, difficulty, stage, 5);
          
          quests.forEach(quest => {
            expect(quest.baselContext).toBeTruthy();
            
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
    
    it('should have scenario descriptions with reasonable word count', () => {
      const quests = buildStagePool(mockT, 'ELITE', 'REACTION_TYPES', 5);
      
      quests.forEach(quest => {
        const wordCount = quest.baselContext!.split(/\s+/).length;
        // Most should be 150-250, but allow some flexibility
        expect(wordCount).toBeGreaterThanOrEqual(100);
        expect(wordCount).toBeLessThanOrEqual(300);
      });
    });
  });
  
  describe('Coefficient Handling', () => {
    it('should correctly apply coefficients in LaTeX generation', () => {
      const quests = buildStagePool(mockT, 'BASIC', 'EQUATION_BALANCING', 5);
      
      // Find quest with H2 + O2 → H2O (coefficients [2, 1, 2])
      const waterQuest = quests.find(q => 
        q.reactants.includes('H2') && 
        q.reactants.includes('O2') && 
        q.products.includes('H2O')
      );
      
      if (waterQuest) {
        // Should show "2\text{H}_2" for first reactant
        expect(waterQuest.equationLatex).toContain('2\\\\text{H}_2');
        // Should show "\text{O}_2" without coefficient (coefficient is 1)
        expect(waterQuest.equationLatex).toMatch(/[^0-9]\\\\text\{O\}_2/);
        // Should show "2\text{H}_2\text{O}" for product
        expect(waterQuest.equationLatex).toContain('2\\\\text{H}_2\\\\text{O}');
      }
    });
  });
  
  describe('Reaction Type Consistency', () => {
    it('should have consistent reaction types across quest data', () => {
      const quests = buildStagePool(mockT, 'BASIC', 'REACTION_TYPES', 5);
      
      const validTypes = ['synthesis', 'decomposition', 'single_replacement', 'double_replacement', 'combustion'];
      
      quests.forEach(quest => {
        expect(validTypes).toContain(quest.reactionType);
        expect(quest.equation.type).toBe(quest.reactionType);
      });
    });
  });
});
