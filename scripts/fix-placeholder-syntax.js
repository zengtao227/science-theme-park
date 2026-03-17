#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all page.tsx files in chamber modules
const files = glob.sync('src/app/chamber/*/page.tsx');

let totalReplacements = 0;
const affectedFiles = [];

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Pattern: placeholder: module_t.placeholders.key
  // Replace with: placeholder: t("module.placeholders.key")
  const regex = /placeholder:\s*([a-z_0-9]+)_t\.placeholders\.([a-z_]+)/g;
  
  content = content.replace(regex, (match, moduleName, key) => {
    totalReplacements++;
    return `placeholder: t("${moduleName}.placeholders.${key}")`;
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    affectedFiles.push(filePath);
    console.log(`✓ Fixed ${filePath}`);
  }
});

console.log(`\n✓ Total replacements: ${totalReplacements}`);
console.log(`✓ Affected files: ${affectedFiles.length}`);
affectedFiles.forEach(f => console.log(`  - ${f}`));
