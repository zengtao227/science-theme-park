const fs = require('fs');

const filePath = 'src/app/chamber/sm2-10/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// AGENTS.md Rule 2: expressionLatex/targetLatex/correctLatex must NOT use \text{${t(...)}}
// These fields are rendered via <InlineMath math={...} /> and should use double backslashes

// Strategy: Replace \text{${t("...")}} with direct t("...") calls
// The LaTeX rendering will be handled by InlineMath component

// Pattern 1: expressionLatex: `\text{${t("key")}}`
// Replace with: expressionLatex: t("key")

// Pattern 2: targetLatex: `\text{${t("key")}}`
// Replace with: targetLatex: t("key")

// Pattern 3: correctLatex: `\text{${t("key")}}`
// Replace with: correctLatex: t("key")

// Pattern 4: labelLatex: `\text{${t("key")}}`
// Replace with: labelLatex: t("key")

// Pattern 5: hintLatex: [`\text{${t("key")}}`]
// Replace with: hintLatex: [t("key")]

// More complex patterns with mixed LaTeX and t() calls need manual review
// For now, let's fix the simple cases

let fixCount = 0;

// Fix simple expressionLatex cases
content = content.replace(
    /expressionLatex:\s*`\\text\{\$\{t\("([^"]+)"\)\}\}`/g,
    (match, key) => {
        fixCount++;
        return `expressionLatex: t("${key}")`;
    }
);

// Fix simple targetLatex cases
content = content.replace(
    /targetLatex:\s*`\\text\{\$\{t\("([^"]+)"\)\}\}`/g,
    (match, key) => {
        fixCount++;
        return `targetLatex: t("${key}")`;
    }
);

// Fix simple correctLatex cases
content = content.replace(
    /correctLatex:\s*`\\text\{\$\{t\("([^"]+)"\)\}\}`/g,
    (match, key) => {
        fixCount++;
        return `correctLatex: t("${key}")`;
    }
);

// Fix simple labelLatex cases
content = content.replace(
    /labelLatex:\s*`\\text\{\$\{t\("([^"]+)"\)\}\}`/g,
    (match, key) => {
        fixCount++;
        return `labelLatex: t("${key}")`;
    }
);

// Fix simple hintLatex cases
content = content.replace(
    /hintLatex:\s*\[`\\text\{\$\{t\("([^"]+)"\)\}\}`\]/g,
    (match, key) => {
        fixCount++;
        return `hintLatex: [t("${key}")]`;
    }
);

console.log(`⚠️  Fixed ${fixCount} simple LaTeX violations in sm2-10`);
console.log('⚠️  Complex mixed LaTeX patterns (e.g., formulas with embedded t() calls) require manual review');
console.log('⚠️  Check the file for patterns like: `\\text{...} = \\text{${t(...)}}`');

fs.writeFileSync(filePath, content, 'utf8');
