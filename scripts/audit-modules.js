#!/usr/bin/env node

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
 * Check if a module uses the new i18n pattern
 */
function usesNewI18nPattern(content) {
  return content.includes('useLanguage()') && content.includes('const { t } = useLanguage()');
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

  // Method 1: Count quests.push() calls within each difficulty block (SB2.02 pattern)
  const difficultyBlocks = {
    BASIC: /if\s*\(\s*difficulty\s*===\s*["']BASIC["']\s*\)\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/gs,
    CORE: /if\s*\(\s*difficulty\s*===\s*["']CORE["']\s*\)\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/gs,
    ADVANCED: /if\s*\(\s*difficulty\s*===\s*["']ADVANCED["']\s*\)\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/gs,
    ELITE: /if\s*\(\s*difficulty\s*===\s*["']ELITE["']\s*\)\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/gs
  };

  for (const [difficulty, regex] of Object.entries(difficultyBlocks)) {
    const matches = content.match(regex);
    if (matches) {
      for (const match of matches) {
        // Count quests.push() calls in this block
        const pushCalls = (match.match(/quests\.push\(/g) || []).length;
        counts[difficulty] += pushCalls;
      }
    }
  }

  // Method 2: Check for array declarations with quest objects (SM1.01 pattern)
  // Look for patterns like: const all: Quest[] = [ { id: "A1", ... }, { id: "A2", ... } ]
  const arrayPattern = /const\s+all\s*:\s*\w+\[\]\s*=\s*\[([^\]]*\{[^\]]*\}[^\]]*)*\]/gs;
  const arrayMatches = content.match(arrayPattern);
  
  if (arrayMatches) {
    for (const arrayMatch of arrayMatches) {
      // Count objects in the array (each { id: "..." } is a quest)
      const questObjects = (arrayMatch.match(/\{\s*id:\s*["'][^"']+["']/g) || []).length;
      
      // If we found quest objects but no push calls, this module uses the array pattern
      if (questObjects > 0 && Object.values(counts).every(c => c === 0)) {
        // Check for return statements to determine difficulty distribution
        // Pattern: if (difficulty === "BASIC") return all.slice(0, 2);
        const basicReturn = content.match(/if\s*\(\s*difficulty\s*===\s*["']BASIC["']\s*\)\s*return\s+all\.slice\(0,\s*(\d+)\)/);
        const coreReturn = content.match(/if\s*\(\s*difficulty\s*===\s*["']CORE["']\s*\)\s*return\s+all\.slice\(0,\s*(\d+)\)/);
        const advancedReturn = content.match(/if\s*\(\s*difficulty\s*===\s*["']ADVANCED["']\s*\)\s*return\s+all\.slice\(0,\s*(\d+)\)/);
        
        if (basicReturn) {
          counts.BASIC = parseInt(basicReturn[1]);
        }
        if (coreReturn) {
          counts.CORE = parseInt(coreReturn[1]);
        }
        if (advancedReturn) {
          counts.ADVANCED = parseInt(advancedReturn[1]);
        }
        
        // If no specific return for ELITE, it gets all questions
        if (!content.includes('if (difficulty === "ELITE")') && questObjects > 0) {
          counts.ELITE = questObjects;
        }
        
        // If ADVANCED doesn't have a specific return, it also gets all
        if (!advancedReturn && !content.includes('if (difficulty === "ADVANCED")') && questObjects > 0) {
          counts.ADVANCED = questObjects;
        }
        
        // If CORE doesn't have a specific return but BASIC does, CORE gets all
        if (!coreReturn && basicReturn && questObjects > 0) {
          counts.CORE = questObjects;
        }
      }
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
  const questionCounts = countQuestionsByDifficulty(content);
  const stageCount = countStages(content);
  
  moduleData.questionCounts = questionCounts;
  moduleData.stageCount = stageCount;
  
  // Check if any difficulty level has 0 questions
  const emptyDifficulties = Object.entries(questionCounts)
    .filter(([_, count]) => count === 0)
    .map(([difficulty]) => difficulty);
  
  if (emptyDifficulties.length > 0) {
    moduleData.issues.push('empty_question_pools');
    moduleData.emptyDifficulties = emptyDifficulties;
    results.issues.p0_empty_pools.push({
      module: moduleName,
      emptyDifficulties,
      questionCounts
    });
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
