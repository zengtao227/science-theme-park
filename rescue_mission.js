const fs = require('fs');

function extractObjectSource(source, startIdx) {
    let balance = 0;
    let i = startIdx;
    let inString = false;
    let stringChar = '';
    while (i < source.length && source[i] !== '{') i++;
    if (i >= source.length) return null;
    const braceStart = i;
    balance = 1;
    i++;
    while (i < source.length && balance > 0) {
        const char = source[i];
        if (char === '"' || char === "'" || char === '`') {
            if (!inString) { inString = true; stringChar = char; }
            else if (stringChar === char) inString = false;
        } else if (!inString) {
            if (char === '{') balance++;
            else if (char === '}') balance--;
        } else if (char === '\\') {
            i++;
        }
        i++;
    }
    return source.substring(braceStart, i);
}

function getObjectValue(source) {
    try {
        return eval('(' + source + ')');
    } catch (e) { return null; }
}

const data = { EN: {}, CN: {}, DE: {} };

function harvest(filePath) {
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, 'utf8');
    const enIdx = content.indexOf('EN: {');
    const cnIdx = content.indexOf('CN: {');
    const deIdx = content.indexOf('DE: {');

    // Super flexible regex for keys
    const keyRegex = /^\s*([a-zA-Z0-9_]+|"[^"]+"):[\s\n]*/gm;
    let match;
    while ((match = keyRegex.exec(content)) !== null) {
        const key = match[1].replace(/"/g, '');
        const startIdx = match.index;

        // Skip keys that are clearly too deep or part of a bigger word
        if (match[0].trim().length === 0) continue;

        let lang = 'EN';
        if (deIdx !== -1 && startIdx > deIdx) lang = 'DE';
        else if (cnIdx !== -1 && startIdx > cnIdx) lang = 'CN';

        const postKey = content.substring(startIdx + match[0].length);
        const firstChar = postKey.trim()[0];

        if (firstChar === '{') {
            const valSource = extractObjectSource(content, startIdx);
            const val = getObjectValue(valSource);
            if (val) {
                if (key === 'EN' || key === 'CN' || key === 'DE') {
                    Object.assign(data[key], val);
                } else if (!data[key]) { // Only harvest if its a root-ish key (not already in a module)
                    // Simplified: just merge everything by key
                    if (typeof data[lang][key] === 'object' && typeof val === 'object') {
                        Object.assign(data[lang][key], val);
                    } else {
                        data[lang][key] = val;
                    }
                }
            }
        } else {
            // It's a primitive
            const endOfLine = postKey.indexOf('\n');
            const valStr = postKey.substring(0, endOfLine).trim().replace(/,$/, '').replace(/;$/, '');
            try {
                const val = eval(valStr);
                if (val !== undefined) data[lang][key] = val;
            } catch (e) { }
        }
    }
}

harvest('src/lib/i18n.old.ts');
harvest('src/lib/i18n.best.ts');

console.log('Final counts - EN:', Object.keys(data.EN).length, 'CN:', Object.keys(data.CN).length, 'DE:', Object.keys(data.DE).length);

function formatValue(val, indentLevel) {
    if (typeof val === 'string') return `"${val.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
    if (typeof val !== 'object' || val === null) return String(val);
    const indent = ' '.repeat(indentLevel);
    const subIndent = ' '.repeat(indentLevel + 4);
    const keys = Object.keys(val).sort();
    if (keys.length === 0) return '{}';
    let lines = keys.map(k => `${subIndent}${k}: ${formatValue(val[k], indentLevel + 4)}`);
    return `{\n${lines.join(',\n')}\n${indent}}`;
}

fs.writeFileSync('src/lib/i18n/en.ts', `export const en = ${formatValue(data.EN, 0)};\n`);
fs.writeFileSync('src/lib/i18n/cn.ts', `export const cn = ${formatValue(data.CN, 0)};\n`);
fs.writeFileSync('src/lib/i18n/de.ts', `export const de = ${formatValue(data.DE, 0)};\n`);
