const fs = require('fs');

const content = fs.readFileSync('src/lib/i18n.old.ts', 'utf8');

function extractObjectSource(source, startIdx) {
    let balance = 0;
    let i = startIdx;
    let inString = false;
    let stringChar = '';
    let inLineComment = false;
    let inBlockComment = false;

    while (i < source.length && source[i] !== '{') i++;
    if (i >= source.length) return null;

    const braceStart = i;
    balance = 1;
    i++;

    while (i < source.length && balance > 0) {
        const char = source[i];
        const next = source[i + 1] || '';
        if (inLineComment) {
            if (char === '\n') inLineComment = false;
        } else if (inBlockComment) {
            if (char === '*' && next === '/') {
                inBlockComment = false;
                i++;
            }
        } else if (inString) {
            if (char === '\\') i++;
            else if (char === stringChar) inString = false;
        } else {
            if (char === '"' || char === "'" || char === '`') {
                inString = true;
                stringChar = char;
            } else if (char === '/' && next === '/') {
                inLineComment = true;
                i++;
            } else if (char === '/' && next === '*') {
                inBlockComment = true;
                i++;
            } else if (char === '{') {
                balance++;
            } else if (char === '}') {
                balance--;
            }
        }
        i++;
    }
    return source.substring(braceStart, i);
}

function getObjectValue(source, key) {
    try {
        return eval('(' + source + ')');
    } catch (e) {
        return null;
    }
}

// Find ranges
const cnIdx = content.indexOf('CN: {');
const deIdx = content.indexOf('DE: {');

const enFinal = {};
const cnFinal = {};
const deFinal = {};

const keyRegex = /^    ([a-zA-Z0-9_]+|"[^"]+"):/gm;
let match;
while ((match = keyRegex.exec(content)) !== null) {
    const key = match[1].replace(/"/g, '');
    const startIdx = match.index;
    const valueSource = extractObjectSource(content, startIdx);
    const value = getObjectValue(valueSource, key);

    if (value === null) continue;

    if (key === 'EN') {
        Object.assign(enFinal, value);
    } else if (key === 'CN') {
        Object.assign(cnFinal, value);
    } else if (key === 'DE') {
        Object.assign(deFinal, value);
    } else {
        if (startIdx < cnIdx) {
            enFinal[key] = value;
        } else if (startIdx < deIdx) {
            cnFinal[key] = value;
        } else {
            deFinal[key] = value;
        }
    }
}

// ALSO: Check if some keys in EN are missing compared to best version
// Actually, let's just use the best version as a secondary source if keys are missing
const bestContent = fs.existsSync('src/lib/i18n.best.ts') ? fs.readFileSync('src/lib/i18n.best.ts', 'utf8') : '';
if (bestContent) {
    console.log("Merging missing keys from best version...");
    const bestMatch = bestContent.match(/EN: \{/);
    if (bestMatch) {
        const bestEnSource = extractObjectSource(bestContent, bestMatch.index);
        const bestEn = getObjectValue(bestEnSource, 'EN');
        if (bestEn) {
            Object.keys(bestEn).forEach(k => {
                if (!enFinal[k]) {
                    console.log(`Recovered missing EN key: ${k}`);
                    enFinal[k] = bestEn[k];
                }
            });
        }
    }
}

console.log('Final counts - EN:', Object.keys(enFinal).length, 'CN:', Object.keys(cnFinal).length, 'DE:', Object.keys(deFinal).length);

function formatValue(val, indentLevel) {
    if (typeof val === 'string') {
        const escaped = val.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
        return `"${escaped}"`;
    } else if (typeof val === 'number' || typeof val === 'boolean') {
        return String(val);
    } else if (typeof val === 'object' && val !== null) {
        const indent = ' '.repeat(indentLevel);
        const subIndent = ' '.repeat(indentLevel + 4);
        const keys = Object.keys(val).sort();
        if (keys.length === 0) return '{}';
        let lines = keys.map(k => {
            const keyStr = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(k) ? k : `"${k}"`;
            return `${subIndent}${keyStr}: ${formatValue(val[k], indentLevel + 4)}`;
        });
        return `{\n${lines.join(',\n')}\n${indent}}`;
    }
    return 'null';
}

fs.writeFileSync('src/lib/i18n/en.ts', `export const en = ${formatValue(enFinal, 0)};\n`);
fs.writeFileSync('src/lib/i18n/cn.ts', `export const cn = ${formatValue(cnFinal, 0)};\n`);
fs.writeFileSync('src/lib/i18n/de.ts', `export const de = ${formatValue(deFinal, 0)};\n`);
