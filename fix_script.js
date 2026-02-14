const fs = require('fs');

const filePath = 'src/lib/i18n.ts';
const fileContent = fs.readFileSync(filePath, 'utf8');

// 1. Extract translations object to parse EN & DE
const startIndex = fileContent.indexOf('export const translations: Record<string, any> = {');
if (startIndex === -1) {
    console.error("Start not found");
    process.exit(1);
}
const braceStart = fileContent.indexOf('{', startIndex);
let balance = 0, endIndex = -1;
for (let i = braceStart; i < fileContent.length; i++) {
    if (fileContent[i] === '{') balance++;
    else if (fileContent[i] === '}') {
        balance--;
        if (balance === 0) { endIndex = i; break; }
    }
}
if (endIndex === -1) {
    console.error("End brace not found");
    process.exit(1);
}

const objSource = fileContent.substring(braceStart, endIndex + 1);
let translations;
try {
    translations = eval('(' + objSource + ')');
} catch (e) {
    console.error("Eval failed:", e);
    process.exit(1);
}

const EN = translations.EN;
const DE = translations.DE;

// 2. Logic to build corrected DE
function findKey(obj, targetKey) {
    if (obj[targetKey] !== undefined) return obj[targetKey];
    for (const k in obj) {
        if (typeof obj[k] === 'object' && obj[k] !== null) {
            const res = findKey(obj[k], targetKey);
            if (res !== undefined) return res;
        }
    }
    return undefined;
}

function traverse(enNode, deScope, path = []) {
    const result = {};
    for (const key in enNode) {
        let deVal = (deScope && deScope[key] !== undefined) ? deScope[key] : undefined;
        // Global search fallback for root keys
        if (deVal === undefined && path.length === 0) {
            deVal = findKey(DE, key);
        }

        if (typeof enNode[key] === 'object' && enNode[key] !== null) {
            result[key] = traverse(enNode[key], deVal, [...path, key]);
        } else {
            // Fallback to EN if missing in DE
            result[key] = deVal !== undefined ? deVal : enNode[key];
        }
    }
    return result;
}

const newDE = traverse(EN, DE);

// 3. Formatter
function formatValue(val, indentLevel) {
    if (typeof val === 'string') {
        const escaped = val.replace(/"/g, '\\"').replace(/\n/g, '\\n');
        return `"${escaped}"`;
    } else if (typeof val === 'object' && val !== null) {
        const indent = ' '.repeat(indentLevel);
        const subIndent = ' '.repeat(indentLevel + 4);
        const keys = Object.keys(val);
        if (keys.length === 0) return '{}';
        let lines = keys.map(k => {
            const keyStr = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(k) ? k : `"${k}"`;
            return `${subIndent}${keyStr}: ${formatValue(val[k], indentLevel + 4)}`;
        });
        return `{\n${lines.join(',\n')}\n${indent}}`;
    }
    return String(val);
}

const newDEString = `    DE: ${formatValue(newDE, 4)}`;

// 4. Find valid DE range to replace
const deMatch = fileContent.match(/(\s+)DE:\s*\{/);
if (!deMatch) {
    console.error("DE block text not found");
    process.exit(1);
}

const deStartIdx = deMatch.index;
// Find closing brace of DE block
const deBraceStart = fileContent.indexOf('{', deStartIdx); // the brace after DE:
balance = 0;
let deEndIdx = -1;
for (let i = deBraceStart; i < fileContent.length; i++) {
    if (fileContent[i] === '{') balance++;
    else if (fileContent[i] === '}') {
        balance--;
        if (balance === 0) { deEndIdx = i; break; }
    }
}

if (deEndIdx === -1) {
    console.error("DE block end not found");
    process.exit(1);
}

// 5. Replace and Write
// Note: we use substring(0, deStartIdx) which ends right before the indentation spaces of DE line
// But we want to preserve the surrounding structure.
// The newDEString starts with "    DE: ".
// If original was "    DE: {", we replace starting from deStartIdx (which includes spaces)
// Because deMatch[0] matches "    DE: {".
// Wait, deStartIdx is index of match start (start of spaces).
// So fileContent.substring(0, deStartIdx) preserves up to previous line end.
// Then we append newDEString (which has 4 spaces + DE: ...).
// Then append fileContent.substring(deEndIdx + 1).
const newContent = fileContent.substring(0, deStartIdx) +
    '\n' + newDEString +
    fileContent.substring(deEndIdx + 1);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log("Fixed DE section and updated file.");
