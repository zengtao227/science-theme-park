// Script to check missing translations
const fs = require('fs');
const path = require('path');

// Read page.tsx to extract all required translation keys
const pagePath = 'src/app/page.tsx';
const pageContent = fs.readFileSync(pagePath, 'utf8');

// Extract all t.home.xxx_title and t.home.xxx_subtitle patterns
const titlePattern = /t\.home\.(\w+_title)/g;
const subtitlePattern = /t\.home\.(\w+_subtitle)/g;

const titles = new Set();
const subtitles = new Set();

let match;
while ((match = titlePattern.exec(pageContent)) !== null) {
  titles.add(match[1]);
}

while ((match = subtitlePattern.exec(pageContent)) !== null) {
  subtitles.add(match[1]);
}

console.log('Required translation keys from page.tsx:');
console.log('\nTitles:', Array.from(titles).sort());
console.log('\nSubtitles:', Array.from(subtitles).sort());

// Check each language file
const languages = ['de', 'en', 'cn'];
const results = {};

languages.forEach(lang => {
  const commonPath = `src/lib/i18n/${lang}/common.ts`;
  const content = fs.readFileSync(commonPath, 'utf8');
  
  results[lang] = {
    missing_titles: [],
    missing_subtitles: []
  };
  
  titles.forEach(key => {
    if (!content.includes(key + ':')) {
      results[lang].missing_titles.push(key);
    }
  });
  
  subtitles.forEach(key => {
    if (!content.includes(key + ':')) {
      results[lang].missing_subtitles.push(key);
    }
  });
});

console.log('\n\n=== MISSING TRANSLATIONS ===\n');
languages.forEach(lang => {
  console.log(`\n${lang.toUpperCase()}:`);
  if (results[lang].missing_titles.length > 0) {
    console.log('  Missing titles:', results[lang].missing_titles);
  }
  if (results[lang].missing_subtitles.length > 0) {
    console.log('  Missing subtitles:', results[lang].missing_subtitles);
  }
  if (results[lang].missing_titles.length === 0 && results[lang].missing_subtitles.length === 0) {
    console.log('  ✓ All translations present');
  }
});
