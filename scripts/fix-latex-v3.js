#!/usr/bin/env node
// Fix remaining ^2/^3/^4 -> ^{2}/^{3}/^{4} in LaTeX strings
// Skips lines with Math., **, or comments

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dirs = [
    path.join(root, 'src/app/chamber'),
    path.join(root, 'src/lib'),
    path.join(root, 'src/components/chamber'),
];

function findFiles(dir, ext) {
    const results = [];
    if (!fs.existsSync(dir)) return results;
    for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) results.push(...findFiles(full, ext));
        else if (full.endsWith(ext)) results.push(full);
    }
    return results;
}

let totalFixed = 0;

for (const dir of dirs) {
    const files = [...findFiles(dir, '.tsx'), ...findFiles(dir, '.ts')];
    for (const fp of files) {
        let content = fs.readFileSync(fp, 'utf-8');
        const orig = content;

        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            // Skip runtime JS lines
            if (line.includes('Math.') || line.includes(' ** ') ||
                line.trim().startsWith('//') || line.trim().startsWith('*') ||
                line.includes('RegExp') || line.includes('new Date') ||
                line.includes('.replace(/')) continue;

            // Fix ^2 not followed by } or digit
            lines[i] = line
                .replace(/\^2(?=[^}0-9{])/g, '^{2}')
                .replace(/\^2$/g, '^{2}')
                .replace(/\^2"/g, '^{2}"')
                .replace(/\^2'/g, "^{2}'")
                .replace(/\^2`/g, '^{2}`')
                .replace(/\^2\)/g, '^{2})')
                .replace(/\^2\]/g, '^{2}]')
                .replace(/\^2,/g, '^{2},')
                .replace(/\^2\\/g, '^{2}\\')
                .replace(/\^3(?=[^}0-9{])/g, '^{3}')
                .replace(/\^3$/g, '^{3}')
                .replace(/\^3"/g, '^{3}"')
                .replace(/\^3'/g, "^{3}'")
                .replace(/\^3`/g, '^{3}`')
                .replace(/\^3\)/g, '^{3})')
                .replace(/\^3,/g, '^{3},')
                .replace(/\^3\\/g, '^{3}\\')
                .replace(/\^4(?=[^}0-9{])/g, '^{4}')
                .replace(/\^4$/g, '^{4}')
                .replace(/\^4"/g, '^{4}"')
                .replace(/\^4`/g, '^{4}`');
        }

        content = lines.join('\n');
        if (content !== orig) {
            fs.writeFileSync(fp, content);
            const rel = path.relative(root, fp);
            console.log('Fixed: ' + rel);
            totalFixed++;
        }
    }
}

console.log('\nTotal files fixed: ' + totalFixed);
