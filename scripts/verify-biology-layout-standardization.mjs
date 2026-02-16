#!/usr/bin/env node

/**
 * Biology Module Layout Standardization Verification Script
 * 
 * Validates: Requirements 4.4 - Layout Component Standardization
 * 
 * This script ensures all biology modules use ChamberLayout component
 * with consistent props interface and responsive design.
 */

import fs from 'fs';
import path from 'path';

const chamberDir = path.join(process.cwd(), 'src/app/chamber');

// Biology module patterns
const biologyModulePatterns = [
  /^sb\d+-\d+/i,  // SB modules (e.g., sb1-01, sb2-01)
  /^gb\d+-\d+/i,  // GB modules (e.g., gb1-01, gb2-01)
  /^sb\d+-\d+-/i, // SB modules with suffix (e.g., sb1-01-metabolic, sb2-01-tissues)
  /^sb2-02-body-systems/i // Special case
];

const isBiologyModule = (dirName) => {
  return biologyModulePatterns.some(pattern => pattern.test(dirName));
};

const getBiologyModules = () => {
  if (!fs.existsSync(chamberDir)) {
    return [];
  }
  
  const entries = fs.readdirSync(chamberDir, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory() && isBiologyModule(entry.name))
    .map(entry => entry.name);
};

const readPageFile = (moduleName) => {
  const pagePath = path.join(chamberDir, moduleName, 'page.tsx');
  if (!fs.existsSync(pagePath)) {
    throw new Error(`Page file not found for module: ${moduleName}`);
  }
  return fs.readFileSync(pagePath, 'utf-8');
};

// Test results
const results = {
  passed: 0,
  failed: 0,
  errors: []
};

const test = (description, fn) => {
  try {
    fn();
    results.passed++;
    console.log(`✓ ${description}`);
  } catch (error) {
    results.failed++;
    results.errors.push({ description, error: error.message });
    console.log(`✗ ${description}`);
    console.log(`  Error: ${error.message}`);
  }
};

console.log('Biology Module Layout Standardization Verification\n');
console.log('='.repeat(60));

const modules = getBiologyModules();
console.log(`\nFound ${modules.length} biology modules:`);
modules.forEach(m => console.log(`  - ${m}`));
console.log('');

// Test 1: ChamberLayout Import
test('All biology modules import ChamberLayout', () => {
  const importPattern = /import\s+ChamberLayout\s+from\s+["']@\/components\/layout\/ChamberLayout["']/;
  
  modules.forEach(moduleName => {
    const content = readPageFile(moduleName);
    if (!importPattern.test(content)) {
      throw new Error(`Module ${moduleName} does not import ChamberLayout`);
    }
  });
});

// Test 2: ChamberLayout Usage
test('All biology modules use ChamberLayout component', () => {
  const usagePattern = /<ChamberLayout/;
  
  modules.forEach(moduleName => {
    const content = readPageFile(moduleName);
    if (!usagePattern.test(content)) {
      throw new Error(`Module ${moduleName} does not use ChamberLayout`);
    }
  });
});

// Test 3: Required Props
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
  test(`All biology modules pass ${propName} prop`, () => {
    const propPattern = new RegExp(`${propName}=`);
    
    modules.forEach(moduleName => {
      const content = readPageFile(moduleName);
      if (!propPattern.test(content)) {
        throw new Error(`Module ${moduleName} missing ${propName} prop`);
      }
    });
  });
});

// Test 4: Translation Keys
const translationKeys = ['back', 'check', 'next', 'correct', 'incorrect', 'difficulty'];

translationKeys.forEach(key => {
  test(`All biology modules include ${key} in translations`, () => {
    // For 'difficulty', check for nested structure
    if (key === 'difficulty') {
      const keyPattern = new RegExp(`${key}:\\s*\\{`);
      modules.forEach(moduleName => {
        const content = readPageFile(moduleName);
        // Match translations block more flexibly - look for the opening and find content up to the closing
        const translationsStart = content.indexOf('translations={');
        if (translationsStart === -1) {
          throw new Error(`Module ${moduleName} missing translations prop`);
        }
        // Extract a reasonable chunk after translations={
        const translationsChunk = content.substring(translationsStart, translationsStart + 1000);
        if (!keyPattern.test(translationsChunk)) {
          throw new Error(`Module ${moduleName} missing ${key} in translations`);
        }
      });
    } else {
      const keyPattern = new RegExp(`${key}:\\s*(t\\(|t\\.)`);
      modules.forEach(moduleName => {
        const content = readPageFile(moduleName);
        const translationsStart = content.indexOf('translations={');
        if (translationsStart === -1) {
          throw new Error(`Module ${moduleName} missing translations prop`);
        }
        const translationsChunk = content.substring(translationsStart, translationsStart + 1000);
        if (!keyPattern.test(translationsChunk)) {
          throw new Error(`Module ${moduleName} missing ${key} in translations`);
        }
      });
    }
  });
});

// Test 5: Difficulty Levels
test('All biology modules include all difficulty levels', () => {
  const difficultyLevels = ['basic', 'core', 'advanced', 'elite'];
  
  modules.forEach(moduleName => {
    const content = readPageFile(moduleName);
    const translationsStart = content.indexOf('translations={');
    if (translationsStart === -1) {
      throw new Error(`Module ${moduleName} missing translations prop`);
    }
    const translationsChunk = content.substring(translationsStart, translationsStart + 1000);
    
    difficultyLevels.forEach(level => {
      const levelPattern = new RegExp(`${level}:\\s*(t\\(|t\\.)`);
      if (!levelPattern.test(translationsChunk)) {
        throw new Error(`Module ${moduleName} missing ${level} difficulty level`);
      }
    });
  });
});

// Test 6: useQuestManager Hook
test('All biology modules use useQuestManager hook', () => {
  const hookPattern = /useQuestManager/;
  
  modules.forEach(moduleName => {
    const content = readPageFile(moduleName);
    if (!hookPattern.test(content)) {
      throw new Error(`Module ${moduleName} does not use useQuestManager`);
    }
  });
});

// Test 7: Stage Management
test('All biology modules implement stage management', () => {
  // Accept useMemo pattern, const stagesProps, or inline stages array
  const stagePattern = /(stages\s*=\s*useMemo\(\s*\(\)\s*=>\s*\[|const\s+stagesProps\s*=\s*useMemo|stages=\{?\[)/;
  
  modules.forEach(moduleName => {
    const content = readPageFile(moduleName);
    if (!stagePattern.test(content)) {
      throw new Error(`Module ${moduleName} missing stage management`);
    }
  });
});

// Test 8: Framer Motion
test('All biology modules use framer-motion', () => {
  const motionPattern = /from\s+["']framer-motion["']/;
  
  modules.forEach(moduleName => {
    const content = readPageFile(moduleName);
    if (!motionPattern.test(content)) {
      throw new Error(`Module ${moduleName} does not import framer-motion`);
    }
  });
});

// Test 9: KaTeX
test('All biology modules use KaTeX for math rendering', () => {
  const katexPattern = /from\s+["']react-katex["']/;
  
  modules.forEach(moduleName => {
    const content = readPageFile(moduleName);
    if (!katexPattern.test(content)) {
      throw new Error(`Module ${moduleName} does not import react-katex`);
    }
  });
});

// Test 10: Monitor Content
test('All biology modules include monitorContent prop', () => {
  const monitorPattern = /monitorContent=/;
  
  modules.forEach(moduleName => {
    const content = readPageFile(moduleName);
    if (!monitorPattern.test(content)) {
      throw new Error(`Module ${moduleName} missing monitorContent prop`);
    }
  });
});

// Test 11: Color Schemes
test('All biology modules use consistent color schemes', () => {
  // Accept both neon- colors and standard Tailwind colors (purple, cyan, green, etc.)
  const colorPattern = /(neon-(cyan|green|emerald|purple|amber)|text-(purple|cyan|green|emerald|amber|pink)-\d+|bg-(purple|cyan|green|emerald|amber|pink)-\d+|border-(purple|cyan|green|emerald|amber|pink)-\d+)/;
  
  modules.forEach(moduleName => {
    const content = readPageFile(moduleName);
    if (!colorPattern.test(content)) {
      throw new Error(`Module ${moduleName} missing color scheme`);
    }
  });
});

// Test 12: Module Code Format
test('All biology modules have correct moduleCode format', () => {
  const moduleCodePattern = /moduleCode=["'](SB|GB)\d+\.\d+["']/;
  
  modules.forEach(moduleName => {
    const content = readPageFile(moduleName);
    if (!moduleCodePattern.test(content)) {
      throw new Error(`Module ${moduleName} has incorrect moduleCode format`);
    }
  });
});

// Test 13: Internationalization
test('All biology modules use translation function', () => {
  const i18nPattern = /(useLanguage|translations\[currentLanguage\])/;
  
  modules.forEach(moduleName => {
    const content = readPageFile(moduleName);
    if (!i18nPattern.test(content)) {
      throw new Error(`Module ${moduleName} missing i18n support`);
    }
  });
});

// Test 14: Footer
test('All biology modules pass footerLeft prop', () => {
  const footerPattern = /footerLeft=/;
  
  modules.forEach(moduleName => {
    const content = readPageFile(moduleName);
    if (!footerPattern.test(content)) {
      throw new Error(`Module ${moduleName} missing footerLeft prop`);
    }
  });
});

// Test 15: Interactive Elements
test('All biology modules implement verify/next handlers', () => {
  modules.forEach(moduleName => {
    const content = readPageFile(moduleName);
    const hasVerify = /onVerify=\{verify\}/.test(content);
    const hasNext = /onNext=\{next\}/.test(content);
    
    if (!hasVerify && !hasNext) {
      throw new Error(`Module ${moduleName} missing verify/next handlers`);
    }
  });
});

// Test 16: Check Status
test('All biology modules pass checkStatus prop', () => {
  const checkStatusPattern = /checkStatus=/;
  
  modules.forEach(moduleName => {
    const content = readPageFile(moduleName);
    if (!checkStatusPattern.test(content)) {
      throw new Error(`Module ${moduleName} missing checkStatus prop`);
    }
  });
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('\nTest Summary:');
console.log(`  Passed: ${results.passed}`);
console.log(`  Failed: ${results.failed}`);
console.log(`  Total:  ${results.passed + results.failed}`);

if (results.failed > 0) {
  console.log('\nFailed Tests:');
  results.errors.forEach(({ description, error }) => {
    console.log(`  - ${description}`);
    console.log(`    ${error}`);
  });
  process.exit(1);
} else {
  console.log('\n✓ All tests passed! Biology modules are properly standardized.');
  process.exit(0);
}
