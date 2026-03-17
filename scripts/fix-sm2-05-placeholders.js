#!/usr/bin/env node

const fs = require('fs');

const filePath = 'src/app/chamber/sm2-05/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace hardcoded placeholders with translation keys
content = content.replace(/placeholder: "x"/g, 'placeholder: t("sm2_05.placeholders.x")');
content = content.replace(/placeholder: "n"/g, 'placeholder: t("sm2_05.placeholders.n")');
content = content.replace(/placeholder: "value"/g, 'placeholder: t("sm2_05.placeholders.value")');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✓ Fixed sm2-05 hardcoded placeholders');
