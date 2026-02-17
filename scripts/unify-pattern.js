#!/usr/bin/env node

/**
 * Module Pattern Unification Tool
 * 
 * This script helps convert modules to the standard forEach + structured data pattern.
 * It provides analysis and semi-automated conversion assistance.
 * 
 * Usage:
 *   node scripts/unify-pattern.js <module-name>
 *   Example: node scripts/unify-pattern.js sm2-03
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
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

function analyzeModule(modulePath) {
  log('\n=== Module Pattern Analysis ===', 'bright');
  
  const content = fs.readFileSync(modulePath, 'utf-8');
  
  // Detect current pattern
  const patterns = {
    SWITCH: /switch\s*\(\s*difficulty\s*\)/g,
    RECORD: /Record<.*Difficulty.*Quest\[\]>/g,
    ELSE_IF: /else\s+if\s*\(\s*difficulty\s*===/g,
    PUSH_FEW: /quests\.push\(/g,
    SLICE: /\.slice\(/g,
    DYNAMIC: /forEach.*quests\.push/gs,
  };
  
  const detectedPatterns = [];
  for (const [name, regex] of Object.entries(patterns)) {
    const matches = content.match(regex);
    if (matches && matches.length > 0) {
      detectedPatterns.push({ name, count: matches.length });
    }
  }
  
  log(`\nFile: ${modulePath}`, 'cyan');
  log(`Lines: ${content.split('\n').length}`, 'cyan');
  
  if (detectedPatterns.length === 0) {
    log('\n⚠️  No recognized pattern detected', 'yellow');
    return null;
  }
  
  log('\nDetected Patterns:', 'green');
  detectedPatterns.forEach(p => {
    log(`  - ${p.name}: ${p.count} occurrences`, 'blue');
  });
  
  // Count stages and difficulties
  const stageMatches = content.match(/case\s+"[A-Z_]+"\s*:/g) || [];
  const difficultyMatches = content.match(/(BASIC|CORE|ADVANCED|ELITE)/g) || [];
  const questPushes = content.match(/quests\.push\(/g) || [];
  
  log('\nStructure Analysis:', 'green');
  log(`  - Stage cases: ${stageMatches.length}`, 'blue');
  log(`  - Difficulty mentions: ${difficultyMatches.length}`, 'blue');
  log(`  - Quest pushes: ${questPushes.length}`, 'blue');
  
  // Determine primary pattern
  const primaryPattern = detectedPatterns.reduce((max, p) => 
    p.count > max.count ? p : max
  );
  
  log(`\nPrimary Pattern: ${primaryPattern.name}`, 'bright');
  
  return {
    patterns: detectedPatterns,
    primary: primaryPattern.name,
    stages: stageMatches.length,
    difficulties: difficultyMatches.length,
    pushes: questPushes.length,
  };
}

function suggestConversion(analysis) {
  log('\n=== Conversion Suggestions ===', 'bright');
  
  const { primary } = analysis;
  
  switch (primary) {
    case 'SWITCH':
      log('\nCurrent: SWITCH(difficulty) pattern', 'yellow');
      log('Target: forEach + structured data', 'green');
      log('\nSteps:', 'cyan');
      log('1. Extract all quest data from switch cases into a data structure');
      log('2. Create Record<Stage, Record<Difficulty, DataType[]>> structure');
      log('3. Replace switch with forEach loop over data array');
      log('4. Ensure each difficulty has exactly 5 items');
      break;
      
    case 'ELSE_IF':
      log('\nCurrent: ELSE-IF-CHAIN pattern', 'yellow');
      log('Target: forEach + structured data', 'green');
      log('\nSteps:', 'cyan');
      log('1. Extract quest generation logic from each if/else-if branch');
      log('2. Create Record<Difficulty, DataType[]> structure');
      log('3. Replace if-else chain with forEach loop');
      log('4. Ensure each difficulty has exactly 5 items');
      break;
      
    case 'SLICE':
      log('\nCurrent: SLICE pattern', 'yellow');
      log('Target: forEach + structured data', 'green');
      log('\nSteps:', 'cyan');
      log('1. Identify the "all" array and how it\'s sliced');
      log('2. Split the array into 4 difficulty groups');
      log('3. Create Record<Difficulty, DataType[]> structure');
      log('4. Replace slice logic with forEach loop');
      break;
      
    case 'PUSH_FEW':
      log('\nCurrent: PUSH(few) pattern', 'yellow');
      log('Target: forEach + structured data', 'green');
      log('\nSteps:', 'cyan');
      log('1. Expand the scenarios array to have 5 items per difficulty');
      log('2. Create Record<Difficulty, ScenarioType[]> structure');
      log('3. Ensure forEach loop uses the difficulty-specific array');
      break;
      
    case 'RECORD':
      log('\nCurrent: RECORD<D,Q[]> pattern', 'green');
      log('Status: Already using a good pattern!', 'green');
      log('\nOptional improvements:', 'cyan');
      log('1. Ensure consistent formatting');
      log('2. Add type definitions if missing');
      log('3. Verify each difficulty has exactly 5 items');
      break;
      
    default:
      log('\nPattern not recognized for automated conversion', 'yellow');
      log('Manual conversion required', 'red');
  }
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    log('Usage: node scripts/unify-pattern.js <module-name>', 'red');
    log('Example: node scripts/unify-pattern.js sm2-03', 'cyan');
    process.exit(1);
  }
  
  const moduleName = args[0];
  const modulePath = path.join(process.cwd(), 'src', 'app', 'chamber', moduleName, 'page.tsx');
  
  if (!fs.existsSync(modulePath)) {
    log(`\n❌ Module not found: ${modulePath}`, 'red');
    process.exit(1);
  }
  
  const analysis = analyzeModule(modulePath);
  
  if (analysis) {
    suggestConversion(analysis);
    
    log('\n=== Next Steps ===', 'bright');
    log('1. Review the suggestions above', 'cyan');
    log('2. Manually convert the module following the steps', 'cyan');
    log('3. Run validation: node scripts/validate-pattern.js ' + moduleName, 'cyan');
    log('4. Test in browser to ensure functionality is preserved', 'cyan');
  }
  
  log('');
}

main();
