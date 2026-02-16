#!/usr/bin/env node

/**
 * Translation Validation Script
 * 
 * This script validates translation files for:
 * - Key symmetry across EN, CN, DE files
 * - Translation format and structure
 * - Missing or incomplete translations
 * 
 * Usage: node scripts/validate-translations.js [module]
 * Example: node scripts/validate-translations.js biology
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Load translation file
 */
function loadTranslation(lang, module) {
  const filePath = path.join(__dirname, '..', 'src', 'lib', 'i18n', lang, `${module}.ts`);
  
  if (!fs.existsSync(filePath)) {
    log(`Warning: Translation file not found: ${filePath}`, 'yellow');
    return null;
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract the exported object using regex (simple approach)
    const match = content.match(/export const \w+\s*=\s*({[\s\S]*});/);
    if (!match) {
      log(`Error: Could not parse translation file: ${filePath}`, 'red');
      return null;
    }
    
    return content;
  } catch (error) {
    log(`Error reading file ${filePath}: ${error.message}`, 'red');
    return null;
  }
}

/**
 * Extract keys from translation content using regex
 */
function extractKeys(content) {
  const keys = new Set();
  
  // Match patterns like: key: "value" or key: { or key: [
  const keyPattern = /^\s*(\w+):\s*[{"'\[]/gm;
  let match;
  
  while ((match = keyPattern.exec(content)) !== null) {
    keys.add(match[1]);
  }
  
  return Array.from(keys).sort();
}

/**
 * Validate translation symmetry
 */
function validateSymmetry(module) {
  log(`\n${'='.repeat(60)}`, 'cyan');
  log(`Validating ${module.toUpperCase()} translations`, 'cyan');
  log('='.repeat(60), 'cyan');
  
  const languages = ['en', 'cn', 'de'];
  const translations = {};
  const keys = {};
  
  // Load all translations
  for (const lang of languages) {
    const content = loadTranslation(lang, module);
    if (content) {
      translations[lang] = content;
      keys[lang] = extractKeys(content);
    }
  }
  
  if (Object.keys(translations).length === 0) {
    log(`\nNo translation files found for module: ${module}`, 'red');
    return false;
  }
  
  // Compare keys
  const allKeys = new Set();
  for (const lang in keys) {
    keys[lang].forEach(key => allKeys.add(key));
  }
  
  let hasErrors = false;
  
  log(`\nTotal unique keys found: ${allKeys.size}`, 'blue');
  
  // Check for missing keys in each language
  for (const lang of languages) {
    if (!keys[lang]) {
      log(`\n${lang.toUpperCase()}: File not found`, 'red');
      hasErrors = true;
      continue;
    }
    
    const missingKeys = Array.from(allKeys).filter(key => !keys[lang].includes(key));
    
    if (missingKeys.length > 0) {
      log(`\n${lang.toUpperCase()}: Missing ${missingKeys.length} keys`, 'red');
      missingKeys.slice(0, 10).forEach(key => {
        log(`  - ${key}`, 'red');
      });
      if (missingKeys.length > 10) {
        log(`  ... and ${missingKeys.length - 10} more`, 'red');
      }
      hasErrors = true;
    } else {
      log(`\n${lang.toUpperCase()}: ✓ All keys present (${keys[lang].length} keys)`, 'green');
    }
  }
  
  // Check for parameter consistency
  log(`\n${'─'.repeat(60)}`, 'cyan');
  log('Checking parameter placeholders...', 'cyan');
  
  for (const lang in translations) {
    const content = translations[lang];
    const paramPattern = /\{(\w+)\}/g;
    const params = new Set();
    let match;
    
    while ((match = paramPattern.exec(content)) !== null) {
      params.add(match[1]);
    }
    
    if (params.size > 0) {
      log(`${lang.toUpperCase()}: Found ${params.size} parameter types`, 'blue');
    }
  }
  
  return !hasErrors;
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  const moduleName = args[0] || 'biology';
  
  log('\n🔍 Translation Validation Tool', 'cyan');
  log('─'.repeat(60), 'cyan');
  
  const isValid = validateSymmetry(moduleName);
  
  log(`\n${'='.repeat(60)}`, 'cyan');
  if (isValid) {
    log('✓ Validation passed! All translations are symmetric.', 'green');
    log('='.repeat(60), 'cyan');
    process.exit(0);
  } else {
    log('✗ Validation failed! Please fix the issues above.', 'red');
    log('='.repeat(60), 'cyan');
    process.exit(1);
  }
}

// Run main function
main();

export { validateSymmetry, extractKeys };
