const fs = require('fs');

const content = fs.readFileSync('src/lib/i18n.old.ts', 'utf8');
const bestContent = fs.existsSync('src/lib/i18n.best.ts') ? fs.readFileSync('src/lib/i18n.best.ts', 'utf8') : '';

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

function getObjectValue(source) {
    try {
        return eval('(' + source + ')');
    } catch (e) {
        return null;
    }
}

const enFinal = {};
const cnFinal = {};
const deFinal = {};

function processFile(fileContent) {
    // Find EN/CN/DE boundaries to help with classification
    const enIdx = fileContent.indexOf('EN: {');
    const cnIdx = fileContent.indexOf('CN: {');
    const deIdx = fileContent.indexOf('DE: {');

    // Look for any key: { pattern
    const keyRegex = /^\s+([a-zA-Z0-9_]+|"[^"]+"):/gm;
    let match;
    while ((match = keyRegex.exec(fileContent)) !== null) {
        const key = match[1].replace(/"/g, '');
        const startIdx = match.index;
        const valSource = extractObjectSource(fileContent, startIdx);
        if (!valSource) continue;
        const val = getObjectValue(valSource);
        if (!val) continue;

        if (key === 'EN') {
            Object.assign(enFinal, val);
        } else if (key === 'CN') {
            Object.assign(cnFinal, val);
        } else if (key === 'DE') {
            Object.assign(deFinal, val);
        } else {
            // Deciding language:
            // 1. If inside a language block, simple
            // 2. If at root (dangling), try to guess by content or position
            let target;
            if (startIdx > deIdx && deIdx !== -1) target = deFinal;
            else if (startIdx > cnIdx && cnIdx !== -1) target = cnFinal;
            else target = enFinal;

            // Merging: If it's an object, merge properties. If val is a string, only set if not present or better
            if (typeof target[key] === 'object' && typeof val === 'object') {
                Object.assign(target[key], val);
            } else {
                target[key] = val;
            }
        }
    }
}

console.log('Processing main reference file...');
processFile(content);
if (bestContent) {
    console.log('Processing best version for recovery...');
    processFile(bestContent);
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
