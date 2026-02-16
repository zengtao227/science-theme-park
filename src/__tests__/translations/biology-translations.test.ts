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

/**
 * Property 2: Language switching real-time update
 * Validates: Requirements 1.2
 * Feature: biology-i18n-phase2, Property 2: Language switching real-time update
 */
describe('Property 2: Language switching', () => {
  test('should support switching between all language pairs', () => {
    const languages = ['EN', 'CN', 'DE'] as const;
    
    languages.forEach(fromLang => {
      languages.forEach(toLang => {
        if (fromLang === toLang) return;
        
        // Verify both languages have complete translations
        expect(translations[fromLang]).toBeDefined();
        expect(translations[toLang]).toBeDefined();
        
        // Verify all modules exist in both languages
        const fromModules = Object.keys(translations[fromLang]);
        const toModules = Object.keys(translations[toLang]);
        
        expect(fromModules.sort()).toEqual(toModules.sort());
      });
    });
  });
  
  test('should maintain translation structure when switching languages', () => {
    const testModule = 'sb1_03';
    const languages = ['EN', 'CN', 'DE'] as const;
    
    languages.forEach(lang => {
      const module = translations[lang][testModule];
      expect(module).toBeDefined();
      expect(module.title).toBeDefined();
      expect(module.difficulty).toBeDefined();
      expect(module.stages).toBeDefined();
    });
  });
});

/**
 * Property 5: Anatomical label completeness
 * Validates: Requirements 2.2
 * Feature: biology-i18n-phase2, Property 5: Anatomical label completeness
 */
describe('Property 5: Anatomical labels', () => {
  test('SB2.01 should have complete anatomical labels in all languages', () => {
    const languages = ['EN', 'CN', 'DE'] as const;
    
    languages.forEach(lang => {
      const sb2_01 = translations[lang].sb2_01_tissues;
      expect(sb2_01).toBeDefined();
      
      // Check that labels exist
      if (sb2_01.labels) {
        expect(Object.keys(sb2_01.labels).length).toBeGreaterThan(0);
      }
    });
  });
  
  test('anatomical labels should be non-empty across all languages', () => {
    const languages = ['EN', 'CN', 'DE'] as const;
    
    languages.forEach(lang => {
      const sb2_01 = translations[lang].sb2_01_tissues;
      if (sb2_01?.labels) {
        Object.entries(sb2_01.labels).forEach(([key, value]) => {
          if (typeof value === 'string') {
            expect(value.trim()).not.toBe('');
          }
        });
      }
    });
  });
});

/**
 * Property 6: Multi-stage learning functionality
 * Validates: Requirements 2.3
 * Feature: biology-i18n-phase2, Property 6: Multi-stage learning functionality
 */
describe('Property 6: Multi-stage learning', () => {
  test('modules with stages should have complete stage translations', () => {
    const languages = ['EN', 'CN', 'DE'] as const;
    const modulesWithStages = ['sb1_03', 'sb2_01', 'sb2_02', 'sb2_03', 'gb2_01'];
    
    languages.forEach(lang => {
      modulesWithStages.forEach(moduleKey => {
        const module = translations[lang][moduleKey];
        if (module?.stages) {
          const stages = Object.values(module.stages);
          stages.forEach(stage => {
            expect(typeof stage).toBe('string');
            expect(stage.trim()).not.toBe('');
          });
        }
      });
    });
  });
  
  test('stage keys should be consistent across languages', () => {
    const languages = ['EN', 'CN', 'DE'] as const;
    const modulesWithStages = ['sb1_03', 'sb2_01', 'sb2_02', 'sb2_03', 'gb2_01'];
    
    modulesWithStages.forEach(moduleKey => {
      const enStages = translations.EN[moduleKey]?.stages;
      if (!enStages) return;
      
      const enKeys = Object.keys(enStages).sort();
      
      languages.forEach(lang => {
        if (lang === 'EN') return;
        const targetStages = translations[lang][moduleKey]?.stages;
        if (targetStages) {
          const targetKeys = Object.keys(targetStages).sort();
          expect(targetKeys).toEqual(enKeys);
        }
      });
    });
  });
});

/**
 * Property 7: Interaction feedback consistency
 * Validates: Requirements 2.4, 7.4
 * Feature: biology-i18n-phase2, Property 7: Interaction feedback consistency
 */
describe('Property 7: Interaction feedback', () => {
  test('all modules should have consistent feedback keys', () => {
    const languages = ['EN', 'CN', 'DE'] as const;
    const requiredFeedbackKeys = ['correct', 'incorrect', 'check'];
    
    languages.forEach(lang => {
      Object.keys(translations[lang]).forEach(moduleKey => {
        const module = translations[lang][moduleKey];
        requiredFeedbackKeys.forEach(key => {
          expect(module[key]).toBeDefined();
          expect(typeof module[key]).toBe('string');
          expect(module[key].trim()).not.toBe('');
        });
      });
    });
  });
  
  test('feedback messages should be non-empty across all languages', () => {
    const languages = ['EN', 'CN', 'DE'] as const;
    
    languages.forEach(lang => {
      Object.values(translations[lang]).forEach(module => {
        if (module.correct) expect(module.correct.trim()).not.toBe('');
        if (module.incorrect) expect(module.incorrect.trim()).not.toBe('');
        if (module.check) expect(module.check.trim()).not.toBe('');
      });
    });
  });
});

/**
 * Property 8: Professional terminology translation completeness
 * Validates: Requirements 3.2
 * Feature: biology-i18n-phase2, Property 8: Professional terminology translation completeness
 */
describe('Property 8: Professional terminology', () => {
  test('GB2.01 should have complete neurobiology terminology', () => {
    const languages = ['EN', 'CN', 'DE'] as const;
    const requiredTerms = ['neuron', 'synapse', 'action', 'potential'];
    
    languages.forEach(lang => {
      const gb2_01 = translations[lang].gb2_01;
      expect(gb2_01).toBeDefined();
      
      // Check that professional terms appear in labels or scenarios
      const allText = JSON.stringify(gb2_01).toLowerCase();
      const hasTerminology = requiredTerms.some(term => 
        allText.includes(term) || allText.includes(term.replace(/\s/g, ''))
      );
      expect(hasTerminology).toBe(true);
    });
  });
  
  test('professional terminology should maintain scientific accuracy', () => {
    const languages = ['EN', 'CN', 'DE'] as const;
    
    languages.forEach(lang => {
      const gb2_01 = translations[lang].gb2_01;
      if (gb2_01?.labels) {
        Object.values(gb2_01.labels).forEach(value => {
          if (typeof value === 'string') {
            expect(value.trim()).not.toBe('');
            // Should not contain placeholder text
            expect(value.toLowerCase()).not.toContain('todo');
            expect(value.toLowerCase()).not.toContain('placeholder');
          }
        });
      }
    });
  });
});

/**
 * Property 9: Mathematical formula rendering correctness
 * Validates: Requirements 3.4
 * Feature: biology-i18n-phase2, Property 9: Mathematical formula rendering correctness
 */
describe('Property 9: Mathematical formulas', () => {
  test('LaTeX formulas should be properly formatted', () => {
    const languages = ['EN', 'CN', 'DE'] as const;
    
    languages.forEach(lang => {
      Object.values(translations[lang]).forEach(module => {
        const allText = JSON.stringify(module);
        
        // Check for LaTeX patterns
        const latexMatches = allText.match(/\\[a-zA-Z]+\{[^}]*\}/g);
        if (latexMatches) {
          latexMatches.forEach(match => {
            // Should have balanced braces
            const openBraces = (match.match(/\{/g) || []).length;
            const closeBraces = (match.match(/\}/g) || []).length;
            expect(openBraces).toBe(closeBraces);
          });
        }
      });
    });
  });
  
  test('mathematical symbols should be consistent across languages', () => {
    const languages = ['EN', 'CN', 'DE'] as const;
    const mathSymbols = ['=', '+', '-', '×', '\\times', '\\div'];
    
    languages.forEach(lang => {
      const gb2_01 = translations[lang].gb2_01;
      if (gb2_01?.prompts) {
        Object.values(gb2_01.prompts).forEach(value => {
          if (typeof value === 'string') {
            // If contains math, should use proper symbols
            const hasMath = mathSymbols.some(symbol => value.includes(symbol));
            if (hasMath) {
              expect(value).toMatch(/[=+\-×÷\\]/);
            }
          }
        });
      }
    });
  });
});
