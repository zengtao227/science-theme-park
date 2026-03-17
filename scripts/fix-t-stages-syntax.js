#!/usr/bin/env node

const fs = require('fs');

const filePath = 'src/app/chamber/sm2-07/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace t.stages.xxx with t("sm2_07.stages.xxx")
content = content.replace(/t\.stages\.distance_prompt_latex/g, 't("sm2_07.stages.distance_prompt_latex")');
content = content.replace(/t\.stages\.midpoint_prompt_latex/g, 't("sm2_07.stages.midpoint_prompt_latex")');
content = content.replace(/t\.stages\.slope_prompt_latex/g, 't("sm2_07.stages.slope_prompt_latex")');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✓ Fixed sm2-07/page.tsx');
