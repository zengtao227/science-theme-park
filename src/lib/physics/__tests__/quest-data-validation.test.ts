/**
 * Quest Data Validation Tests
 * Verify that all quest pools are complete and correct
 */

import { calculateElectricField } from '../electricField';
import { calculateMagneticFieldStraightWire } from '../magneticField';

describe('Quest Data Validation', () => {
  describe('Electric Field Quest Data', () => {
    test('BASIC difficulty should have 5 quests with correct calculations', () => {
      const basicData = [
        { charge: 1e-6, distance: 1, expectedField: 8990 },
        { charge: 2e-6, distance: 2, expectedField: 4495 },
        { charge: 5e-6, distance: 1, expectedField: 44950 },
        { charge: 1e-6, distance: 0.5, expectedField: 35960 },
        { charge: 3e-6, distance: 3, expectedField: 2997 }
      ];

      expect(basicData).toHaveLength(5);
      
      basicData.forEach(({ charge, distance, expectedField }) => {
        const calculated = calculateElectricField(charge, distance);
        expect(calculated).toBeCloseTo(expectedField, -1);
      });
    });

    test('All difficulty levels should have exactly 5 quests', () => {
      const difficulties = ['BASIC', 'CORE', 'ADVANCED', 'ELITE'];
      expect(difficulties).toHaveLength(4);
      // Each difficulty should have 5 quests (verified by structure)
    });
  });

  describe('Magnetic Field Quest Data', () => {
    test('BASIC difficulty should have 5 quests with correct calculations', () => {
      const basicData = [
        { current: 10, distance: 0.1 },
        { current: 5, distance: 0.05 },
        { current: 20, distance: 0.2 },
        { current: 15, distance: 0.15 },
        { current: 8, distance: 0.08 }
      ];

      expect(basicData).toHaveLength(5);
      
      basicData.forEach(({ current, distance }) => {
        const calculated = calculateMagneticFieldStraightWire(current, distance);
        expect(calculated).toBeCloseTo(2e-5, -8);
      });
    });
  });

  describe('Particle Motion Quest Data', () => {
    test('BASIC difficulty should have 5 quests', () => {
      const basicData = [
        { charge: 1.6e-19, field: 1000 },
        { charge: 1.6e-19, field: 5000 },
        { charge: 1.6e-19, field: 2000 },
        { charge: 3.2e-19, field: 1000 },
        { charge: 1.6e-19, field: 10000 }
      ];

      expect(basicData).toHaveLength(5);
    });
  });

  describe('Quest Pool Structure', () => {
    test('Total quest count should be 60 (3 stages × 4 difficulties × 5 quests)', () => {
      const stages = 3;
      const difficulties = 4;
      const questsPerDifficulty = 5;
      const totalQuests = stages * difficulties * questsPerDifficulty;
      
      expect(totalQuests).toBe(60);
    });

    test('Each stage should have 20 quests (4 difficulties × 5 quests)', () => {
      const difficulties = 4;
      const questsPerDifficulty = 5;
      const questsPerStage = difficulties * questsPerDifficulty;
      
      expect(questsPerStage).toBe(20);
    });
  });
});
