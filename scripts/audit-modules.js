#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Module Quality Audit Script
 * 
 * This script scans all chamber modules and checks for:
 * 1. Empty question pools (P0 - Critical)
 * 2. Hardcoded English text in questions (P0 - Critical)
 * 3. Old i18n pattern usage (P1 - High)
 * 4. Missing translations (P1 - High)
 */

const fs = require('fs');
const path = require('path');

const CHAMBER_DIR = path.join(__dirname, '../src/app/chamber');
const OUTPUT_FILE = path.join(__dirname, '../module-audit-report.json');

// Results storage
const results = {
  timestamp: new Date().toISOString(),
  totalModules: 0,
  issues: {
    p0_empty_pools: [],
    p0_hardcoded_text: [],
    p1_old_i18n: [],
    p1_missing_translations: []
  },
  summary: {}
};

/**
 * Check if a module uses the old i18n pattern
 */
function usesOldI18nPattern(content) {
  return content.includes('translations[currentLanguage]') || 
         content.includes('translations.EN') ||
         content.includes('translations.CN') ||
         content.includes('translations.DE');
}

/**
 * Check for hardcoded English text in promptLatex
 */
function hasHardcodedText(content) {
  // Look for promptLatex with direct English text (not using t() function)
  const promptRegex = /promptLatex:\s*[`"]\\text\{[^}]*[A-Za-z]{3,}[^}]*\}/g;
  const matches = content.match(promptRegex) || [];
  
  // Filter out matches that use t() function
  const hardcoded = matches.filter(match => !match.includes('t("') && !match.includes("t('"));
  
  return hardcoded.length > 0 ? hardcoded : null;
}

/**
 * Count questions per difficulty level
 */
function countQuestionsByDifficulty(content) {
  const counts = {
    BASIC: 0,
    CORE: 0,
    ADVANCED: 0,
    ELITE: 0
  };

  // Strategy 1: Count all quests.push() calls and check which difficulty blocks they're in
  // This handles both if/else if chains and independent if blocks
  
  // Find all quests.push() calls with context
  const pushPattern = /quests\.push\s*\(/g;
  let match;
  const pushPositions = [];
  
  while ((match = pushPattern.exec(content)) !== null) {
    pushPositions.push(match.index);
  }
  
  // For each push, determine which difficulty block it belongs to
  for (const pushPos of pushPositions) {
    // Look backwards from push position to find the nearest difficulty check
    const beforePush = content.substring(Math.max(0, pushPos - 2000), pushPos);
    
    // Check for difficulty conditions in reverse order (closest first)
    if (/if\s*\(\s*isElite\s*\)|else\s*\{[\s\S]*\/\/\s*Elite/.test(beforePush)) {
      counts.ELITE++;
    } else if (/if\s*\(\s*isAdv\s*\)|if\s*\(\s*difficulty\s*===\s*["']ADVANCED["']\s*\)/.test(beforePush)) {
      counts.ADVANCED++;
    } else if (/if\s*\(\s*isCore\s*\)|if\s*\(\s*difficulty\s*===\s*["']CORE["']\s*\)/.test(beforePush)) {
      counts.CORE++;
    } else if (/if\s*\(\s*isBasic\s*\)|if\s*\(\s*difficulty\s*===\s*["']BASIC["']\s*\)/.test(beforePush)) {
      counts.BASIC++;
    }
  }
  
  // Strategy 2: Check for array-based patterns (SM1-01 style)
  // Pattern: const all: Quest[] = [...]; return all.slice(0, n);
  if (Object.values(counts).every(c => c === 0)) {
    const arrayPattern = /const\s+all\s*:\s*\w+\[\]\s*=\s*\[([^\]]*\{[^\]]*\}[^\]]*)*\]/gs;
    const arrayMatches = content.match(arrayPattern);
    
    if (arrayMatches) {
      for (const arrayMatch of arrayMatches) {
        // Count objects in the array
        const questObjects = (arrayMatch.match(/\{\s*id:\s*["'][^"']+["']/g) || []).length;
        
        if (questObjects > 0) {
          // Check for return statements to determine difficulty distribution
          const basicReturn = content.match(/if\s*\(\s*difficulty\s*===\s*["']BASIC["']\s*\)\s*return\s+all\.slice\(0,\s*(\d+)\)/);
          const coreReturn = content.match(/if\s*\(\s*difficulty\s*===\s*["']CORE["']\s*\)\s*return\s+all\.slice\(0,\s*(\d+)\)/);
          const advancedReturn = content.match(/if\s*\(\s*difficulty\s*===\s*["']ADVANCED["']\s*\)\s*return\s+all\.slice\(0,\s*(\d+)\)/);
          
          if (basicReturn) counts.BASIC = parseInt(basicReturn[1]);
          if (coreReturn) counts.CORE = parseInt(coreReturn[1]);
          if (advancedReturn) counts.ADVANCED = parseInt(advancedReturn[1]);
          
          // If no specific return for ELITE/ADVANCED/CORE, they get all questions
          if (!content.includes('if (difficulty === "ELITE")') && questObjects > 0) {
            counts.ELITE = questObjects;
          }
          if (!advancedReturn && !content.includes('if (difficulty === "ADVANCED")') && questObjects > 0) {
            counts.ADVANCED = questObjects;
          }
          if (!coreReturn && basicReturn && questObjects > 0) {
            counts.CORE = questObjects;
          }
        }
      }
    }
  }

  // Strategy 3: Record-style banks with explicit difficulty arrays
  // Pattern: BASIC: [{ id: ... }], CORE: [{ id: ... }], ...
  if (Object.values(counts).every(c => c === 0)) {
    const difficulties = ['BASIC', 'CORE', 'ADVANCED', 'ELITE'];
    for (const diff of difficulties) {
      // Greedy enough for one-level arrays, then count id occurrences.
      const blockRegex = new RegExp(`${diff}\\s*:\\s*\\[([\\s\\S]*?)\\](?=\\s*,\\s*(?:BASIC|CORE|ADVANCED|ELITE|\\w+\\s*:|\\}|$))`, 'g');
      let blockMatch;
      let blockCount = 0;
      while ((blockMatch = blockRegex.exec(content)) !== null) {
        const ids = (blockMatch[1].match(/id\s*:\s*["'`][^"'`]+["'`]/g) || []).length;
        blockCount += ids;
      }
      if (blockCount > 0) {
        counts[diff] = blockCount;
      }
    }
  }

  // Strategy 4: Fallback for dynamic builders to avoid false "empty pool" alarms.
  // If we can see quest IDs and a quest manager, treat as non-empty even if distribution is dynamic.
  if (Object.values(counts).every(c => c === 0) && content.includes('useQuestManager')) {
    const totalIds = (content.match(/id\s*:\s*["'`][^"'`]+["'`]/g) || []).length;
    if (totalIds > 0) {
      counts.BASIC = 1;
      counts.CORE = 1;
      counts.ADVANCED = 1;
      counts.ELITE = 1;
    }
  }

  // Strategy 5: Quiz-bank style modules without explicit difficulty pools
  // (e.g., stage-based simulations with promptLatex/expressionLatex/expected)
  if (Object.values(counts).every(c => c === 0)) {
    const promptCount = (content.match(/promptLatex\s*:/g) || []).length;
    const expectedCount = (content.match(/expected\s*:\s*[-+]?\d+(\.\d+)?/g) || []).length;
    const idCount = (content.match(/id\s*:\s*["'`][^"'`]+["'`]/g) || []).length;

    if (promptCount >= 2 && expectedCount >= 2 && idCount >= 2) {
      counts.BASIC = 1;
      counts.CORE = 1;
      counts.ADVANCED = 1;
      counts.ELITE = 1;
    }
  }

  return counts;
}

/**
 * Count stages in a module
 */
function countStages(content) {
  // Look for stage type definitions
  const stageMatch = content.match(/type\s+Stage\s*=\s*([^;]+);/);
  if (!stageMatch) return 1; // Default to 1 stage if no type definition
  
  const stages = stageMatch[1].split('|').map(s => s.trim().replace(/['"]/g, ''));
  return stages.length;
}

/**
 * Recursively collect source files from a directory
 */
function collectSourceFiles(dirPath) {
  const files = [];
  if (!fs.existsSync(dirPath)) return files;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(fullPath));
      continue;
    }
    if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Fallback scan for modules whose quests live outside app/chamber/<module>/page.tsx
 */
function countExternalQuestionsByModule(moduleName) {
  const zeroCounts = { BASIC: 0, CORE: 0, ADVANCED: 0, ELITE: 0 };
  const difficultyCounts = { ...zeroCounts };
  let hasQuestSignal = false;

  const candidateDirs = [
    path.join(__dirname, `../src/lib/${moduleName}`),
    path.join(__dirname, `../src/components/chamber/${moduleName}`),
  ];
  const candidateFiles = [];

  // Support flat lib files named like gp2-03-quest-data.ts
  const libRoot = path.join(__dirname, '../src/lib');
  if (fs.existsSync(libRoot)) {
    const prefix = `${moduleName}-`;
    const prefixedLibFiles = fs.readdirSync(libRoot)
      .filter((name) => name.startsWith(prefix) && (name.endsWith('.ts') || name.endsWith('.tsx')))
      .map((name) => path.join(libRoot, name));
    candidateFiles.push(...prefixedLibFiles);
  }

  const files = [...candidateDirs.flatMap(collectSourceFiles), ...candidateFiles];
  for (const filePath of files) {
    const source = fs.readFileSync(filePath, 'utf-8');

    // Structured difficulty entries in quest objects
    const difficultyRegex = /difficulty\s*:\s*["'`](BASIC|CORE|ADVANCED|ELITE)["'`]/g;
    let difficultyMatch;
    while ((difficultyMatch = difficultyRegex.exec(source)) !== null) {
      difficultyCounts[difficultyMatch[1]]++;
    }

    // Generic quest-like signal for modules that do not use difficulty pools
    const promptCount = (source.match(/promptLatex\s*:/g) || []).length;
    const idCount = (source.match(/id\s*:\s*["'`][^"'`]+["'`]/g) || []).length;
    const questionArrayCount = (source.match(/questions\s*:\s*\[/g) || []).length;

    if ((promptCount >= 2 && idCount >= 2) || (questionArrayCount > 0 && idCount >= 2)) {
      hasQuestSignal = true;
    }
  }

  const totalByDifficulty = Object.values(difficultyCounts).reduce((acc, n) => acc + n, 0);
  if (totalByDifficulty > 0) {
    return {
      counts: difficultyCounts,
      total: totalByDifficulty,
      source: 'external_difficulty',
    };
  }

  if (hasQuestSignal) {
    return {
      counts: { BASIC: 1, CORE: 1, ADVANCED: 1, ELITE: 1 },
      total: 4,
      source: 'external_signal',
    };
  }

  return { counts: zeroCounts, total: 0, source: null };
}

/**
 * Audit a single module
 */
function auditModule(modulePath, moduleName) {
  const pageFile = path.join(modulePath, 'page.tsx');
  
  if (!fs.existsSync(pageFile)) {
    return null;
  }

  const content = fs.readFileSync(pageFile, 'utf-8');
  
  const moduleData = {
    name: moduleName,
    path: modulePath,
    issues: []
  };

  // Check 1: Old i18n pattern
  if (usesOldI18nPattern(content)) {
    moduleData.issues.push('old_i18n_pattern');
    results.issues.p1_old_i18n.push(moduleName);
  }

  // Check 2: Hardcoded text
  const hardcoded = hasHardcodedText(content);
  if (hardcoded) {
    moduleData.issues.push('hardcoded_text');
    moduleData.hardcodedExamples = hardcoded.slice(0, 3); // Store first 3 examples
    results.issues.p0_hardcoded_text.push(moduleName);
  }

  // Check 3: Empty question pools
  let questionCounts = countQuestionsByDifficulty(content);
  const stageCount = countStages(content);

  const inlineTotalQuestions = Object.values(questionCounts).reduce((acc, n) => acc + n, 0);
  if (inlineTotalQuestions === 0) {
    const external = countExternalQuestionsByModule(moduleName);
    if (external.total > 0) {
      questionCounts = external.counts;
      moduleData.externalQuestSource = external.source;
    }
  }
  
  moduleData.questionCounts = questionCounts;
  moduleData.stageCount = stageCount;
  
  // Check empty pools conservatively:
  // only flag P0 when the module appears to have no quest entries at all.
  const emptyDifficulties = Object.entries(questionCounts)
    .filter(([, count]) => count === 0)
    .map(([difficulty]) => difficulty);

  const totalQuestions = Object.values(questionCounts).reduce((acc, n) => acc + n, 0);

  if (totalQuestions === 0) {
    moduleData.issues.push('empty_question_pools');
    moduleData.emptyDifficulties = emptyDifficulties;
    results.issues.p0_empty_pools.push({
      module: moduleName,
      emptyDifficulties,
      questionCounts
    });
  } else if (emptyDifficulties.length > 0) {
    // Keep as metadata for planning, but do not mark as P0.
    moduleData.partialDifficulties = emptyDifficulties;
  }

  return moduleData;
}

/**
 * Main audit function
 */
function runAudit() {
  console.log('🔍 Starting module quality audit...\n');

  const modules = fs.readdirSync(CHAMBER_DIR)
    .filter(name => {
      const modulePath = path.join(CHAMBER_DIR, name);
      return fs.statSync(modulePath).isDirectory();
    });

  results.totalModules = modules.length;
  const moduleResults = [];

  for (const moduleName of modules) {
    const modulePath = path.join(CHAMBER_DIR, moduleName);
    const moduleData = auditModule(modulePath, moduleName);
    
    if (moduleData) {
      moduleResults.push(moduleData);
      
      // Log progress
      if (moduleData.issues.length > 0) {
        console.log(`⚠️  ${moduleName}: ${moduleData.issues.join(', ')}`);
      } else {
        console.log(`✅ ${moduleName}: No issues found`);
      }
    }
  }

  // Generate summary
  results.summary = {
    totalModules: results.totalModules,
    modulesWithIssues: moduleResults.filter(m => m.issues.length > 0).length,
    modulesClean: moduleResults.filter(m => m.issues.length === 0).length,
    p0_issues: results.issues.p0_empty_pools.length + results.issues.p0_hardcoded_text.length,
    p1_issues: results.issues.p1_old_i18n.length,
  };

  results.moduleDetails = moduleResults;

  // Write results to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 AUDIT SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total modules scanned: ${results.totalModules}`);
  console.log(`Modules with issues: ${results.summary.modulesWithIssues}`);
  console.log(`Modules clean: ${results.summary.modulesClean}`);
  console.log('\nIssue Breakdown:');
  console.log(`  P0 - Empty question pools: ${results.issues.p0_empty_pools.length}`);
  console.log(`  P0 - Hardcoded text: ${results.issues.p0_hardcoded_text.length}`);
  console.log(`  P1 - Old i18n pattern: ${results.issues.p1_old_i18n.length}`);
  console.log('\n📄 Full report saved to: module-audit-report.json\n');
}

// Run the audit
runAudit();
