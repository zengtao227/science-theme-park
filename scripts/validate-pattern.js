#!/usr/bin/env node

/**
 * Module Pattern Validation Tool
 * 
 * This script validates that a module follows the standard forEach + structured data pattern
 * and has the correct number of questions (60 total: 3 stages × 4 difficulties × 5 questions).
 * 
 * Usage:
 *   node scripts/validate-pattern.js <module-name>
 *   Example: node scripts/validate-pattern.js sm2-03
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateModule(modulePath, moduleName) {
  log('\n=== Module Pattern Validation ===', 'bright');
  log(`Module: ${moduleName}`, 'cyan');
  
  const content = fs.readFileSync(modulePath, 'utf-8');
  const lines = content.split('\n');
  
  log(`Lines: ${lines.length}`, 'cyan');
  
  const results = {
    hasForEach: false,
    hasStructuredData: false,
    hasTypeDefinition: false,
    dataOutsideFunction: false,
    usesUseCallback: false,
    questCount: 0,
    stageCount: 0,
    difficultyCount: 0,
    errors: [],
    warnings: [],
  };
  
  // Check for forEach pattern
  if (content.includes('.forEach(')) {
    results.hasForEach = true;
    log('✅ Uses forEach pattern', 'green');
  } else {
    results.errors.push('Missing forEach pattern');
    log('❌ Missing forEach pattern', 'red');
  }
  
  // Check for structured data (Record type or const data object)
  if (content.match(/Record<.*Stage.*Record<.*Difficulty/)) {
    results.hasStructuredData = true;
    log('✅ Has structured data (Record<Stage, Record<Difficulty>>)', 'green');
  } else if (content.match(/const\s+\w+Data\s*[:=]/)) {
    results.hasStructuredData = true;
    log('✅ Has structured data (const data object)', 'green');
  } else {
    results.errors.push('Missing structured data definition');
    log('❌ Missing structured data definition', 'red');
  }
  
  // Check for type definition
  if (content.match(/type\s+\w+Data\s*=/)) {
    results.hasTypeDefinition = true;
    log('✅ Has type definition', 'green');
  } else {
    results.warnings.push('Missing type definition (recommended)');
    log('⚠️  Missing type definition (recommended)', 'yellow');
  }
  
  // Check if data is defined outside buildStagePool
  const buildStagePoolMatch = content.match(/const buildStagePool[\s\S]*?useCallback\(([\s\S]*?)\},\s*\[/);
  if (buildStagePoolMatch) {
    const functionBody = buildStagePoolMatch[1];
    const dataDefInFunction = functionBody.match(/const\s+\w+Data\s*[:=]/);
    
    if (!dataDefInFunction) {
      results.dataOutsideFunction = true;
      log('✅ Data defined outside function (good for performance)', 'green');
    } else {
      results.warnings.push('Data defined inside function (consider moving outside)');
      log('⚠️  Data defined inside function (consider moving outside)', 'yellow');
    }
  }
  
  // Check for useCallback
  if (content.includes('useCallback')) {
    results.usesUseCallback = true;
    log('✅ Uses useCallback', 'green');
  } else {
    results.errors.push('Missing useCallback wrapper');
    log('❌ Missing useCallback wrapper', 'red');
  }
  
  // Count stages
  const stageMatches = content.match(/case\s+"[A-Z_]+"\s*:/g) || 
                       content.match(/[A-Z_]+:\s*\{/g) ||
                       [];
  results.stageCount = Math.min(stageMatches.length, 3); // Cap at 3
  
  if (results.stageCount === 3) {
    log(`✅ Has 3 stages`, 'green');
  } else {
    results.warnings.push(`Expected 3 stages, found ${results.stageCount}`);
    log(`⚠️  Expected 3 stages, found ${results.stageCount}`, 'yellow');
  }
  
  // Count difficulties
  const difficultyMatches = content.match(/(BASIC|CORE|ADVANCED|ELITE):\s*\[/g) || [];
  results.difficultyCount = difficultyMatches.length;
  
  if (results.difficultyCount >= 4) {
    log(`✅ Has 4 difficulties`, 'green');
  } else {
    results.errors.push(`Expected 4 difficulties, found ${results.difficultyCount}`);
    log(`❌ Expected 4 difficulties, found ${results.difficultyCount}`, 'red');
  }
  
  // Estimate quest count (this is approximate)
  const questPushes = content.match(/quests\.push\(/g) || [];
  const arrayItems = content.match(/\{\s*id:\s*["']/g) || [];
  results.questCount = Math.max(questPushes.length, arrayItems.length);
  
  const expectedQuests = results.stageCount * 4 * 5; // stages × difficulties × 5
  if (results.questCount >= expectedQuests * 0.9) { // Allow 10% margin
    log(`✅ Quest count: ~${results.questCount} (expected: ${expectedQuests})`, 'green');
  } else {
    results.warnings.push(`Quest count may be low: ~${results.questCount} (expected: ${expectedQuests})`);
    log(`⚠️  Quest count may be low: ~${results.questCount} (expected: ${expectedQuests})`, 'yellow');
  }
  
  // Check for old i18n pattern
  if (content.includes('translations[currentLanguage]')) {
    results.warnings.push('Still using old i18n pattern (translations[currentLanguage])');
    log('⚠️  Still using old i18n pattern', 'yellow');
  } else if (content.includes('useLanguage()')) {
    log('✅ Uses new i18n pattern (useLanguage)', 'green');
  }
  
  // Summary
  log('\n=== Validation Summary ===', 'bright');
  
  if (results.errors.length === 0) {
    log('✅ PASSED - Module follows the standard pattern', 'green');
  } else {
    log('❌ FAILED - Module has errors', 'red');
    log('\nErrors:', 'red');
    results.errors.forEach(err => log(`  - ${err}`, 'red'));
  }
  
  if (results.warnings.length > 0) {
    log('\nWarnings:', 'yellow');
    results.warnings.forEach(warn => log(`  - ${warn}`, 'yellow'));
  }
  
  return results;
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    log('Usage: node scripts/validate-pattern.js <module-name>', 'red');
    log('Example: node scripts/validate-pattern.js sm2-03', 'cyan');
    process.exit(1);
  }
  
  const moduleName = args[0];
  const modulePath = path.join(process.cwd(), 'src', 'app', 'chamber', moduleName, 'page.tsx');
  
  if (!fs.existsSync(modulePath)) {
    log(`\n❌ Module not found: ${modulePath}`, 'red');
    process.exit(1);
  }
  
  const results = validateModule(modulePath, moduleName);
  
  log('');
  
  // Exit with error code if validation failed
  if (results.errors.length > 0) {
    process.exit(1);
  }
}

main();
