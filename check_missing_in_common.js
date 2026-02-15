// Check what's missing in common.ts home object
const fs = require('fs');

const commonContent = fs.readFileSync('src/lib/i18n/en/common.ts', 'utf8');
const mathContent = fs.readFileSync('src/lib/i18n/en/math.ts', 'utf8');
const chemContent = fs.readFileSync('src/lib/i18n/en/chemistry.ts', 'utf8');

// Extract keys from math.ts (lines 113-145)
const mathLines = mathContent.split('\n').slice(112, 145);
const mathKeys = mathLines.filter(l => l.includes('_title:') || l.includes('_subtitle:')).map(l => {
  const match = l.match(/(\w+):/);
  return match ? match[1] : null;
}).filter(Boolean);

// Extract keys from chemistry.ts (lines 106-156)
const chemLines = chemContent.split('\n').slice(105, 156);
const chemKeys = chemLines.filter(l => l.includes('_title:') || l.includes('_subtitle:')).map(l => {
  const match = l.match(/(\w+):/);
  return match ? match[1] : null;
}).filter(Boolean);

const allKeys = [...new Set([...mathKeys, ...chemKeys])];

console.log('Keys in math.ts and chemistry.ts:', allKeys.length);
console.log('\nChecking which are missing in common.ts home object...\n');

const missing = allKeys.filter(key => !commonContent.includes(key + ':'));

console.log('Missing keys:', missing.length);
console.log(missing);

console.log('\n\nKeys that ARE in common.ts:');
const present = allKeys.filter(key => commonContent.includes(key + ':'));
console.log(present);
