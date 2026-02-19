/**
 * Unit tests for SC1.06 utility functions
 */

import { formulaToLatex, parseCompound, validateChemicalNotation, createCompound } from '../lib/sc1-06-utils';

describe('SC1.06 Utility Functions', () => {
  describe('formulaToLatex', () => {
    it('should convert simple formulas to LaTeX with four backslashes', () => {
      expect(formulaToLatex('H2O')).toBe('\\\\text{H}_2\\\\text{O}');
      expect(formulaToLatex('CO2')).toBe('\\\\text{C}\\\\text{O}_2');
      expect(formulaToLatex('NaCl')).toBe('\\\\text{Na}\\\\text{Cl}');
    });

    it('should handle formulas with parentheses', () => {
      expect(formulaToLatex('Ca(OH)2')).toBe('\\\\text{Ca}(\\\\text{O}\\\\text{H})_2');
      expect(formulaToLatex('Mg(NO3)2')).toBe('\\\\text{Mg}(\\\\text{N}\\\\text{O}_3)_2');
    });

    it('should handle charges (superscripts)', () => {
      expect(formulaToLatex('Fe3+')).toBe('\\\\text{Fe}^{3+}');
      expect(formulaToLatex('Cl-')).toBe('\\\\text{Cl}^{-}');
      expect(formulaToLatex('Ca2+')).toBe('\\\\text{Ca}^{2+}');
    });

    it('should handle empty strings', () => {
      expect(formulaToLatex('')).toBe('');
    });
  });

  describe('parseCompound', () => {
    it('should parse simple formulas', () => {
      const h2o = parseCompound('H2O');
      expect(h2o).toContainEqual({ element: 'H', count: 2 });
      expect(h2o).toContainEqual({ element: 'O', count: 1 });
      expect(h2o.length).toBe(2);
    });

    it('should parse formulas with parentheses', () => {
      const caoh2 = parseCompound('Ca(OH)2');
      expect(caoh2).toContainEqual({ element: 'Ca', count: 1 });
      expect(caoh2).toContainEqual({ element: 'O', count: 2 });
      expect(caoh2).toContainEqual({ element: 'H', count: 2 });
      expect(caoh2.length).toBe(3);
    });

    it('should parse complex formulas', () => {
      const h2so4 = parseCompound('H2SO4');
      expect(h2so4).toContainEqual({ element: 'H', count: 2 });
      expect(h2so4).toContainEqual({ element: 'S', count: 1 });
      expect(h2so4).toContainEqual({ element: 'O', count: 4 });
      expect(h2so4.length).toBe(3);
    });

    it('should handle formulas with charges', () => {
      const fe3plus = parseCompound('Fe3+');
      expect(fe3plus).toContainEqual({ element: 'Fe', count: 1 });
      expect(fe3plus.length).toBe(1);
      
      const clMinus = parseCompound('Cl-');
      expect(clMinus).toContainEqual({ element: 'Cl', count: 1 });
      expect(clMinus.length).toBe(1);
    });
  });

  describe('validateChemicalNotation', () => {
    it('should validate correct formulas', () => {
      expect(validateChemicalNotation('H2O')).toBe(true);
      expect(validateChemicalNotation('CO2')).toBe(true);
      expect(validateChemicalNotation('NaCl')).toBe(true);
      expect(validateChemicalNotation('Ca(OH)2')).toBe(true);
      expect(validateChemicalNotation('H2SO4')).toBe(true);
    });

    it('should reject lowercase element symbols', () => {
      expect(validateChemicalNotation('h2o')).toBe(false);
      expect(validateChemicalNotation('co2')).toBe(false);
    });

    it('should reject unbalanced parentheses', () => {
      expect(validateChemicalNotation('Ca(OH2')).toBe(false);
      expect(validateChemicalNotation('CaOH)2')).toBe(false);
    });

    it('should reject invalid element symbols', () => {
      expect(validateChemicalNotation('Xx2O')).toBe(false);
      expect(validateChemicalNotation('H2Zz')).toBe(false);
    });

    it('should reject empty strings', () => {
      expect(validateChemicalNotation('')).toBe(false);
    });
  });

  describe('createCompound', () => {
    it('should create a complete Compound object', () => {
      const water = createCompound('H2O', 'water');
      
      expect(water.formula).toBe('H2O');
      expect(water.name).toBe('water');
      expect(water.formulaLatex).toBe('\\\\text{H}_2\\\\text{O}');
      expect(water.elements).toContainEqual({ element: 'H', count: 2 });
      expect(water.elements).toContainEqual({ element: 'O', count: 1 });
      expect(water.elements.length).toBe(2);
    });

    it('should work without a name', () => {
      const co2 = createCompound('CO2');
      
      expect(co2.formula).toBe('CO2');
      expect(co2.name).toBe('');
      expect(co2.formulaLatex).toBe('\\\\text{C}\\\\text{O}_2');
    });
  });
});

describe('Reaction Type Classification', () => {
  const { classifyReaction, analyzeReactionPattern } = require('../lib/sc1-06-utils');
  
  describe('classifyReaction', () => {
    it('should classify synthesis reactions (A + B → AB)', () => {
      // H2 + O2 → H2O
      const equation = {
        reactants: [
          createCompound('H2', 'hydrogen'),
          createCompound('O2', 'oxygen')
        ],
        products: [
          createCompound('H2O', 'water')
        ]
      };
      
      expect(classifyReaction(equation)).toBe('synthesis');
    });
    
    it('should classify decomposition reactions (AB → A + B)', () => {
      // H2O → H2 + O2
      const equation = {
        reactants: [
          createCompound('H2O', 'water')
        ],
        products: [
          createCompound('H2', 'hydrogen'),
          createCompound('O2', 'oxygen')
        ]
      };
      
      expect(classifyReaction(equation)).toBe('decomposition');
    });
    
    it('should classify single replacement reactions (A + BC → AC + B)', () => {
      // Zn + HCl → ZnCl2 + H2
      const equation = {
        reactants: [
          createCompound('Zn', 'zinc'),
          createCompound('HCl', 'hydrochloric acid')
        ],
        products: [
          createCompound('ZnCl2', 'zinc chloride'),
          createCompound('H2', 'hydrogen')
        ]
      };
      
      expect(classifyReaction(equation)).toBe('single_replacement');
    });
    
    it('should classify double replacement reactions (AB + CD → AD + CB)', () => {
      // NaCl + AgNO3 → NaNO3 + AgCl
      const equation = {
        reactants: [
          createCompound('NaCl', 'sodium chloride'),
          createCompound('AgNO3', 'silver nitrate')
        ],
        products: [
          createCompound('NaNO3', 'sodium nitrate'),
          createCompound('AgCl', 'silver chloride')
        ]
      };
      
      expect(classifyReaction(equation)).toBe('double_replacement');
    });
    
    it('should classify combustion reactions (CxHy + O2 → CO2 + H2O)', () => {
      // CH4 + O2 → CO2 + H2O
      const equation = {
        reactants: [
          createCompound('CH4', 'methane'),
          createCompound('O2', 'oxygen')
        ],
        products: [
          createCompound('CO2', 'carbon dioxide'),
          createCompound('H2O', 'water')
        ]
      };
      
      expect(classifyReaction(equation)).toBe('combustion');
    });
    
    it('should classify propane combustion', () => {
      // C3H8 + O2 → CO2 + H2O
      const equation = {
        reactants: [
          createCompound('C3H8', 'propane'),
          createCompound('O2', 'oxygen')
        ],
        products: [
          createCompound('CO2', 'carbon dioxide'),
          createCompound('H2O', 'water')
        ]
      };
      
      expect(classifyReaction(equation)).toBe('combustion');
    });
  });
  
  describe('analyzeReactionPattern', () => {
    it('should provide detailed analysis for synthesis reactions', () => {
      const equation = {
        reactants: [
          createCompound('H2', 'hydrogen'),
          createCompound('O2', 'oxygen')
        ],
        products: [
          createCompound('H2O', 'water')
        ]
      };
      
      const analysis = analyzeReactionPattern(equation);
      
      expect(analysis.type).toBe('synthesis');
      expect(analysis.pattern).toBe('A + B → AB');
      expect(analysis.confidence).toBeGreaterThan(0.9);
      expect(analysis.description).toContain('combine');
    });
    
    it('should provide detailed analysis for combustion reactions', () => {
      const equation = {
        reactants: [
          createCompound('CH4', 'methane'),
          createCompound('O2', 'oxygen')
        ],
        products: [
          createCompound('CO2', 'carbon dioxide'),
          createCompound('H2O', 'water')
        ]
      };
      
      const analysis = analyzeReactionPattern(equation);
      
      expect(analysis.type).toBe('combustion');
      expect(analysis.pattern).toBe('CₓHᵧ + O₂ → CO₂ + H₂O');
      expect(analysis.confidence).toBeGreaterThan(0.9);
      expect(analysis.description).toContain('oxygen');
    });
    
    it('should provide confidence scores between 0 and 1', () => {
      const equation = {
        reactants: [
          createCompound('H2O', 'water')
        ],
        products: [
          createCompound('H2', 'hydrogen'),
          createCompound('O2', 'oxygen')
        ]
      };
      
      const analysis = analyzeReactionPattern(equation);
      
      expect(analysis.confidence).toBeGreaterThan(0);
      expect(analysis.confidence).toBeLessThanOrEqual(1);
    });
  });
});
