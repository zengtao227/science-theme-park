/**
 * SC2.07 Enthalpy & Energetics - Utility Functions Tests
 * 
 * Tests for core calculation functions
 */

import {
  calculateEnthalpyChange,
  classifyReaction,
  calculateBondEnergyDeltaH,
  calculateFormationDeltaH,
  calculateHeat,
  calculateDeltaHPerMole,
  calculateTotalHeat,
  reverseEquation,
  multiplyEquation,
  calculatePathwayDeltaH,
  validateHessPathway,
  verifyAnswer,
} from '../lib/sc2-07-utils';

describe('SC2.07 Utility Functions', () => {
  describe('calculateEnthalpyChange', () => {
    it('should calculate ΔH = H(products) - H(reactants)', () => {
      expect(calculateEnthalpyChange(0, -286)).toBe(-286);
      expect(calculateEnthalpyChange(-100, -50)).toBe(50);
    });
  });

  describe('classifyReaction', () => {
    it('should classify negative ΔH as exothermic', () => {
      expect(classifyReaction(-100)).toBe('exothermic');
      expect(classifyReaction(-1)).toBe('exothermic');
    });

    it('should classify positive ΔH as endothermic', () => {
      expect(classifyReaction(100)).toBe('endothermic');
      expect(classifyReaction(1)).toBe('endothermic');
    });
  });

  describe('calculateBondEnergyDeltaH', () => {
    it('should calculate ΔH from bond energies', () => {
      const bondsBroken = [{ type: 'H-H', count: 2, energy: 436 }];
      const bondsFormed = [{ type: 'O-H', count: 4, energy: 464 }];
      const deltaH = calculateBondEnergyDeltaH(bondsBroken, bondsFormed);
      expect(deltaH).toBe(872 - 1856); // -984
    });
  });

  describe('calculateHeat', () => {
    it('should calculate q = mcΔT', () => {
      expect(calculateHeat(100, 4.18, 5)).toBe(2090);
      expect(calculateHeat(50, 4.18, -5)).toBe(-1045);
    });
  });

  describe('calculateDeltaHPerMole', () => {
    it('should calculate ΔH per mole', () => {
      expect(calculateDeltaHPerMole(2090, 0.1)).toBeCloseTo(20.9, 1);
    });
  });

  describe('calculateTotalHeat', () => {
    it('should include calorimeter heat capacity', () => {
      const total = calculateTotalHeat(100, 4.18, 5, 50);
      expect(total).toBe(2090 + 250); // 2340
    });
  });

  describe('reverseEquation', () => {
    it('should negate ΔH when reversing', () => {
      const eq = {
        id: 'eq1',
        equation: 'A → B',
        equationLatex: 'A \\rightarrow B',
        deltaH: -100,
        reversed: false,
        multiplier: 1,
      };
      const reversed = reverseEquation(eq);
      expect(reversed.deltaH).toBe(100);
      expect(reversed.reversed).toBe(true);
    });
  });

  describe('multiplyEquation', () => {
    it('should multiply ΔH by coefficient', () => {
      const eq = {
        id: 'eq1',
        equation: 'A → B',
        equationLatex: 'A \\rightarrow B',
        deltaH: -100,
        reversed: false,
        multiplier: 1,
      };
      const multiplied = multiplyEquation(eq, 2);
      expect(multiplied.deltaH).toBe(-200);
      expect(multiplied.multiplier).toBe(2);
    });
  });

  describe('calculatePathwayDeltaH', () => {
    it('should sum ΔH values', () => {
      const equations = [
        {
          id: 'eq1',
          equation: 'A → B',
          equationLatex: 'A \\rightarrow B',
          deltaH: -100,
          reversed: false,
          multiplier: 1,
        },
        {
          id: 'eq2',
          equation: 'B → C',
          equationLatex: 'B \\rightarrow C',
          deltaH: -50,
          reversed: false,
          multiplier: 1,
        },
      ];
      expect(calculatePathwayDeltaH(equations)).toBe(-150);
    });
  });

  describe('verifyAnswer', () => {
    it('should accept answers within ±1 kJ tolerance', () => {
      expect(verifyAnswer(100, 100)).toBe(true);
      expect(verifyAnswer(100, 101)).toBe(true);
      expect(verifyAnswer(100, 99)).toBe(true);
      expect(verifyAnswer(100, 102)).toBe(false);
      expect(verifyAnswer(100, 98)).toBe(false);
    });
  });
});
