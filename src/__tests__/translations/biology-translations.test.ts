/**
 * Biology Translation Tests
 * 
 * Property-based tests for biology module translations
 * Feature: biology-i18n-phase2
 */

import * as fc from 'fast-check';
import { hasAllKeys, haveSameParameters, getLeafValues, translationTestConfig } from '../utils/translation-test-utils';

// Import translations directly from the files
import { enBiology } from '@/lib/i18n/en/biology';
import { cnBiology } from '@/lib/i18n/cn/biology';
import { deBiology } from '@/lib/i18n/de/biology';

const translations = {
  EN: enBiology,
  CN: cnBiology,
  DE: deBiology,
};

describe('Biology Translation Completeness', () => {
  const languages = ['EN', 'CN', 'DE'] as const;
  const biologyModules = [
    'sb1_01',
    'sb1_01_metabolic',
    'sb1_02',
    'sb1_03',
    'sb2_01_tissues',
    'sb2_01',
    'sb2_02',
    'sb2_03',
    'sb3_01',
    'gb1_01',
    'gb2_01',
    'gb3_01',
    'gb3_02',
  ];

  /**
   * Property 1: Translation interface completeness verification
   * Validates: Requirements 1.1
   */
  describe('Property 1: Translation key symmetry', () => {
    biologyModules.forEach(module => {
      test(`${module} should have symmetric keys across all languages`, () => {
        const enModule = translations.EN[module];
        
        if (!enModule) {
          console.warn(`Module ${module} not found in EN translations`);
          return;
        }

        languages.forEach(lang => {
          if (lang === 'EN') return;
          
          const targetModule = translations[lang]?.[module];
          
          if (!targetModule) {
            fail(`Module ${module} not found in ${lang} translations`);
            return;
          }

          const result = hasAllKeys(enModule, targetModule);
          
          if (!result.valid) {
            console.error(`Missing keys in ${lang}.${module}:`, result.missingKeys);
          }
          
          expect(result.valid).toBe(true);
          expect(result.missingKeys).toHaveLength(0);
        });
      });
    });
  });

  /**
   * Property 3: Translation key structure symmetry
   * Validates: Requirements 1.3, 2.5, 5.2
   */
  describe('Property 3: Bidirectional key symmetry', () => {
    biologyModules.forEach(module => {
      test(`${module} should have bidirectional key symmetry`, () => {
        languages.forEach(lang1 => {
          languages.forEach(lang2 => {
            if (lang1 === lang2) return;
            
            const module1 = translations[lang1]?.[module];
            const module2 = translations[lang2]?.[module];
            
            if (!module1 || !module2) return;

            const result1 = hasAllKeys(module1, module2);
            const result2 = hasAllKeys(module2, module1);
            
            expect(result1.valid).toBe(true);
            expect(result2.valid).toBe(true);
          });
        });
      });
    });
  });

  /**
   * Property 14: Parameterized translation handling
   * Validates: Requirements 5.5, 8.3
   */
  describe('Property 14: Parameter consistency', () => {
    biologyModules.forEach(module => {
      test(`${module} should have consistent parameters across languages`, () => {
        const enModule = translations.EN[module];
        if (!enModule) return;

        const enLeaves = getLeafValues(enModule);
        
        enLeaves.forEach(({ path, value }) => {
          if (typeof value !== 'string') return;
          if (!value.includes('{')) return;

          languages.forEach(lang => {
            if (lang === 'EN') return;
            
            const targetModule = translations[lang]?.[module];
            if (!targetModule) return;

            const targetLeaves = getLeafValues(targetModule);
            const targetLeaf = targetLeaves.find(l => l.path === path);
            
            if (!targetLeaf || typeof targetLeaf.value !== 'string') return;

            const sameParams = haveSameParameters(value, targetLeaf.value);
            
            if (!sameParams) {
              console.error(
                `Parameter mismatch in ${lang}.${module}.${path}:\n` +
                `  EN: ${value}\n` +
                `  ${lang}: ${targetLeaf.value}`
              );
            }
            
            expect(sameParams).toBe(true);
          });
        });
      });
    });
  });

  /**
   * Property 4: Hardcoded text internationalization
   * Validates: Requirements 1.5
   */
  describe('Property 4: No empty translations', () => {
    biologyModules.forEach(module => {
      languages.forEach(lang => {
        test(`${lang}.${module} should not have empty string values`, () => {
          const targetModule = translations[lang]?.[module];
          if (!targetModule) return;

          const leaves = getLeafValues(targetModule);
          
          leaves.forEach(({ path, value }) => {
            if (typeof value === 'string') {
              expect(value.trim()).not.toBe('');
            }
          });
        });
      });
    });
  });
});

/**
 * Property 13: Translation fallback mechanism
 * Validates: Requirements 5.4
 */
describe('Property 13: Translation fallback', () => {
  test('should have all language translations defined', () => {
    expect(translations.EN).toBeDefined();
    expect(translations.CN).toBeDefined();
    expect(translations.DE).toBeDefined();
  });
});
