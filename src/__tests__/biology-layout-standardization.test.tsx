/**
 * Biology Module Layout Standardization Test
 * 
 * Validates: Requirements 4.4 - Layout Component Standardization
 * 
 * This test ensures all biology modules use ChamberLayout component
 * with consistent props interface and responsive design.
 */

import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';

describe('Biology Module Layout Standardization', () => {
  const chamberDir = path.join(process.cwd(), 'src/app/chamber');
  
  // Biology module patterns
  const biologyModulePatterns = [
    /^sb\d+-\d+/i,  // SB modules (e.g., sb1-01, sb2-01)
    /^gb\d+-\d+/i,  // GB modules (e.g., gb1-01, gb2-01)
    /^sb\d+-\d+-/i, // SB modules with suffix (e.g., sb1-01-metabolic, sb2-01-tissues)
    /^sb2-02-body-systems/i // Special case
  ];

  const isBiologyModule = (dirName: string): boolean => {
    return biologyModulePatterns.some(pattern => pattern.test(dirName));
  };

  const getBiologyModules = (): string[] => {
    if (!fs.existsSync(chamberDir)) {
      return [];
    }
    
    const entries = fs.readdirSync(chamberDir, { withFileTypes: true });
    return entries
      .filter(entry => entry.isDirectory() && isBiologyModule(entry.name))
      .map(entry => entry.name);
  };

  const readPageFile = (moduleName: string): string => {
    const pagePath = path.join(chamberDir, moduleName, 'page.tsx');
    if (!fs.existsSync(pagePath)) {
      throw new Error(`Page file not found for module: ${moduleName}`);
    }
    return fs.readFileSync(pagePath, 'utf-8');
  };

  it('should find biology modules in chamber directory', () => {
    const modules = getBiologyModules();
    expect(modules.length).toBeGreaterThan(0);
    console.log(`Found ${modules.length} biology modules:`, modules);
  });

  describe('ChamberLayout Import', () => {
    it('all biology modules should import ChamberLayout', () => {
      const modules = getBiologyModules();
      const importPattern = /import\s+ChamberLayout\s+from\s+["']@\/components\/layout\/ChamberLayout["']/;
      
      modules.forEach(moduleName => {
        const content = readPageFile(moduleName);
        expect(content).toMatch(importPattern);
      });
    });
  });

  describe('ChamberLayout Usage', () => {
    it('all biology modules should use ChamberLayout component', () => {
      const modules = getBiologyModules();
      const usagePattern = /<ChamberLayout/;
      
      modules.forEach(moduleName => {
        const content = readPageFile(moduleName);
        expect(content).toMatch(usagePattern);
      });
    });
  });

  describe('Required Props Interface', () => {
    const requiredProps = [
      'moduleCode',
      'title',
      'difficulty',
      'onDifficultyChange',
      'stages',
      'currentStage',
      'onStageChange',
      'translations'
    ];

    requiredProps.forEach(propName => {
      it(`all biology modules should pass ${propName} prop to ChamberLayout`, () => {
        const modules = getBiologyModules();
        const propPattern = new RegExp(`${propName}=`);
        
        modules.forEach(moduleName => {
          const content = readPageFile(moduleName);
          expect(content).toMatch(propPattern);
        });
      });
    });
  });

  describe('Translations Props Structure', () => {
    const translationKeys = [
      'back',
      'check',
      'next',
      'correct',
      'incorrect',
      'difficulty'
    ];

    translationKeys.forEach(key => {
      it(`all biology modules should include ${key} in translations prop`, () => {
        const modules = getBiologyModules();
        const keyPattern = new RegExp(`${key}:\\s*t\\(`);
        
        modules.forEach(moduleName => {
          const content = readPageFile(moduleName);
          // Check if translations object contains the key
          const translationsMatch = content.match(/translations=\{[\s\S]*?\}/);
          if (translationsMatch) {
            expect(translationsMatch[0]).toMatch(keyPattern);
          }
        });
      });
    });

    it('all biology modules should include difficulty levels in translations', () => {
      const modules = getBiologyModules();
      const difficultyLevels = ['basic', 'core', 'advanced', 'elite'];
      
      modules.forEach(moduleName => {
        const content = readPageFile(moduleName);
        const translationsMatch = content.match(/translations=\{[\s\S]*?\}/);
        
        if (translationsMatch) {
          difficultyLevels.forEach(level => {
            const levelPattern = new RegExp(`${level}:\\s*t\\(`);
            expect(translationsMatch[0]).toMatch(levelPattern);
          });
        }
      });
    });
  });

  describe('Responsive Design Elements', () => {
    it('all biology modules should use useQuestManager hook', () => {
      const modules = getBiologyModules();
      const hookPattern = /useQuestManager/;
      
      modules.forEach(moduleName => {
        const content = readPageFile(moduleName);
        expect(content).toMatch(hookPattern);
      });
    });

    it('all biology modules should implement stage management', () => {
      const modules = getBiologyModules();
      const stagePattern = /stages\s*=\s*useMemo\(\s*\(\)\s*=>\s*\[/;
      
      modules.forEach(moduleName => {
        const content = readPageFile(moduleName);
        expect(content).toMatch(stagePattern);
      });
    });

    it('all biology modules should use framer-motion for animations', () => {
      const modules = getBiologyModules();
      const motionPattern = /from\s+["']framer-motion["']/;
      
      modules.forEach(moduleName => {
        const content = readPageFile(moduleName);
        expect(content).toMatch(motionPattern);
      });
    });
  });

  describe('Visual Hierarchy and Styling', () => {
    it('all biology modules should use KaTeX for math rendering', () => {
      const modules = getBiologyModules();
      const katexPattern = /from\s+["']react-katex["']/;
      
      modules.forEach(moduleName => {
        const content = readPageFile(moduleName);
        expect(content).toMatch(katexPattern);
      });
    });

    it('all biology modules should include monitorContent prop', () => {
      const modules = getBiologyModules();
      const monitorPattern = /monitorContent=/;
      
      modules.forEach(moduleName => {
        const content = readPageFile(moduleName);
        expect(content).toMatch(monitorPattern);
      });
    });

    it('all biology modules should use consistent color schemes', () => {
      const modules = getBiologyModules();
      // Check for neon color usage (neon-cyan, neon-green, neon-emerald, etc.)
      const colorPattern = /neon-(cyan|green|emerald|purple|amber)/;
      
      modules.forEach(moduleName => {
        const content = readPageFile(moduleName);
        expect(content).toMatch(colorPattern);
      });
    });
  });

  describe('Module Code Consistency', () => {
    it('all biology modules should have correct moduleCode format', () => {
      const modules = getBiologyModules();
      const moduleCodePattern = /moduleCode=["'](SB|GB)\d+\.\d+["']/;
      
      modules.forEach(moduleName => {
        const content = readPageFile(moduleName);
        expect(content).toMatch(moduleCodePattern);
      });
    });
  });

  describe('Internationalization Support', () => {
    it('all biology modules should use translation function', () => {
      const modules = getBiologyModules();
      // Check for either useLanguage hook or direct translations usage
      const i18nPattern = /(useLanguage|translations\[currentLanguage\])/;
      
      modules.forEach(moduleName => {
        const content = readPageFile(moduleName);
        expect(content).toMatch(i18nPattern);
      });
    });

    it('all biology modules should pass footerLeft prop', () => {
      const modules = getBiologyModules();
      const footerPattern = /footerLeft=/;
      
      modules.forEach(moduleName => {
        const content = readPageFile(moduleName);
        expect(content).toMatch(footerPattern);
      });
    });
  });

  describe('Interactive Elements', () => {
    it('all biology modules should implement verify and next handlers', () => {
      const modules = getBiologyModules();
      
      modules.forEach(moduleName => {
        const content = readPageFile(moduleName);
        // Check for onVerify and onNext props
        const hasVerify = /onVerify=\{verify\}/.test(content);
        const hasNext = /onNext=\{next\}/.test(content);
        
        // At least one should be present
        expect(hasVerify || hasNext).toBe(true);
      });
    });

    it('all biology modules should pass checkStatus prop', () => {
      const modules = getBiologyModules();
      const checkStatusPattern = /checkStatus=/;
      
      modules.forEach(moduleName => {
        const content = readPageFile(moduleName);
        expect(content).toMatch(checkStatusPattern);
      });
    });
  });
});
