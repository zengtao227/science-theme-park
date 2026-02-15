const fs = require('fs');
const path = require('path');

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

const modules = fs.readdirSync('src/app/chamber').map(m => m.replace(/-/g, '_'));
console.log(`Checking ${modules.length} modules...`);

const enContent = fs.readFileSync('src/lib/i18n/en.ts', 'utf8');
const cnContent = fs.readFileSync('src/lib/i18n/cn.ts', 'utf8');
const deContent = fs.readFileSync('src/lib/i18n/de.ts', 'utf8');

const oldContent = fs.readFileSync('src/lib/i18n.old.ts', 'utf8');
const bestContent = fs.existsSync('src/lib/i18n.best.ts') ? fs.readFileSync('src/lib/i18n.best.ts', 'utf8') : '';

const missingInEn = modules.filter(m => !enContent.includes(`${m}: {`));
console.log('Missing in EN:', missingInEn);

if (missingInEn.length > 0) {
    console.log('Attempting to recover missing modules...');
    const enMatch = enContent.match(/export const en = \{/);
    let enSource = extractObjectSource(enContent, enMatch.index);
    let enData = getObjectValue(enSource);

    missingInEn.forEach(m => {
        // Try searching everywhere in old and best
        const regex = new RegExp(`^\\s+${m}:`, 'm');
        let match = oldContent.match(regex);
        let src = oldContent;
        if (!match && bestContent) {
            match = bestContent.match(regex);
            src = bestContent;
        }

        if (match) {
            console.log(`Found ${m} in reference files. Extracting...`);
            const valSource = extractObjectSource(src, match.index);
            const val = getObjectValue(valSource);
            if (val) {
                enData[m] = val;
            }
        } else {
            console.warn(`Could not find ${m} anywhere!`);
        }
    });

    // Write back
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
    fs.writeFileSync('src/lib/i18n/en.ts', `export const en = ${formatValue(enData, 0)};\n`);
    console.log('RECOVERED MISSING EN MODULES.');
}
