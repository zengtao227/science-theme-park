#!/usr/bin/env node
/**
 * LaTeX Anti-Pattern Auto-Fixer v2
 * Fixes common LaTeX rendering issues across all chamber modules.
 * Usage: node scripts/fix-latex-v2.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('path');

const PROJECT = path.join(__dirname, '..');
const CHAMBER = path.join(PROJECT, 'src/app/chamber');
const LIB = path.join(PROJECT, 'src/lib');
const COMPONENTS = path.join(PROJECT, 'src/components/chamber');

let totalFixes = 0;

function getFiles(dirs, pattern) {
    const files = [];
    for (const dir of dirs) {
        if (!fs.existsSync(dir)) continue;
        const entries = fs.readdirSync(dir);
        for (const entry of entries) {
            const full = path.join(dir, entry);
            if (fs.statSync(full).isDirectory()) {
                const target = path.join(full, pattern);
                if (fs.existsSync(target)) files.push(target);
            }
        }
    }
    return files;
}

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const original = content;
    let fixes = 0;
    const mod = path.basename(path.dirname(filePath));
    const issues = [];

    // --- Fix 1: bare ^2 -> ^{2} ---
    // Match ^2 NOT followed by } or another digit, and NOT on Math. lines
    const fix1 = (str) => {
        return str.replace(/\^2(?=[^}0-9{]|$)/g, (match, offset, full) => {
            // Skip if this line contains Math. or ** (runtime JS)
            const lineStart = full.lastIndexOf('\n', offset) + 1;
            const lineEnd = full.indexOf('\n', offset);
            const line = full.substring(lineStart, lineEnd === -1 ? full.length : lineEnd);
            if (line.includes('Math.') || line.includes('**') || line.includes('// ')) return match;
            // Skip if inside a comment
            if (line.trim().startsWith('//') || line.trim().startsWith('*')) return match;
            return '^{2}';
        });
    };

    const before1 = content;
    content = fix1(content);
    const count1 = (before1.match(/\^2(?=[^}0-9{]|$)/g) || []).length - (content.match(/\^2(?=[^}0-9{]|$)/g) || []).length;
    if (count1 > 0) { fixes += count1; issues.push(`^2->{2}: ${count1}`); }

    // --- Fix 2: bare ^3 -> ^{3} ---
    const fix2 = (str) => {
        return str.replace(/\^3(?=[^}0-9{]|$)/g, (match, offset, full) => {
            const lineStart = full.lastIndexOf('\n', offset) + 1;
            const lineEnd = full.indexOf('\n', offset);
            const line = full.substring(lineStart, lineEnd === -1 ? full.length : lineEnd);
            if (line.includes('Math.') || line.includes('**') || line.includes('// ')) return match;
            if (line.trim().startsWith('//') || line.trim().startsWith('*')) return match;
            return '^{3}';
        });
    };

    const before2 = content;
    content = fix2(content);
    const count2 = (before2.match(/\^3(?=[^}0-9{]|$)/g) || []).length - (content.match(/\^3(?=[^}0-9{]|$)/g) || []).length;
    if (count2 > 0) { fixes += count2; issues.push(`^3->{3}: ${count2}`); }

    // --- Fix 3: unit: "\\text{...}" -> unit: "\\\\text{...}" ---
    // Match unit fields where \text has only 1 backslash (in source: \\text but we need \\\\text)
    // In the source file, \\text{m} means the string contains \text{m} (1 backslash)
    // We need \\\\text{m} which means the string contains \\text{m} (2 backslashes)
    const before3 = content;
    content = content.replace(/unit:\s*"\\text\{/g, 'unit: "\\\\text{');
    const count3Lines = (before3.match(/unit:\s*"\\text\{/g) || []).length;
    if (count3Lines > 0) { fixes += count3Lines; issues.push(`unit \\text fix: ${count3Lines}`); }

    // --- Fix 4: bare "sqrt(X)" -> "\\sqrt{X}" in non-Math contexts ---
    const before4 = content;
    content = content.replace(/(?<!Math\.)(?<!\\\\)sqrt\(([^)]+)\)/g, (match, inner, offset) => {
        const lineStart = content.lastIndexOf('\n', offset) + 1;
        const lineEnd = content.indexOf('\n', offset);
        const line = content.substring(lineStart, lineEnd === -1 ? content.length : lineEnd);
        if (line.includes('Math.sqrt')) return match;
        return `\\\\sqrt{${inner}}`;
    });
    const count4 = (before4.match(/(?<!Math\.)(?<!\\\\)sqrt\(/g) || []).length - (content.match(/(?<!Math\.)(?<!\\\\)sqrt\(/g) || []).length;
    if (count4 > 0) { fixes += count4; issues.push(`sqrt fix: ${count4}`); }

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`  ✅ ${mod}: ${issues.join(', ')}`);
        totalFixes += fixes;
    }

    return fixes;
}

console.log('================================================================');
console.log('  Science Theme Park — LaTeX Auto-Fixer v2');
console.log('  ' + new Date().toISOString());
console.log('================================================================\n');

// Process chamber page files
console.log('### Chamber Pages:');
const pageFiles = getFiles([CHAMBER], 'page.tsx');
for (const f of pageFiles) fixFile(f);

// Process lib quest files
console.log('\n### Library Quest Files:');
const libFiles = getFiles([LIB], 'quests.ts');
for (const f of libFiles) fixFile(f);

// Process component files with math
console.log('\n### Component Files:');
const componentDirs = fs.existsSync(COMPONENTS) ? fs.readdirSync(COMPONENTS) : [];
for (const dir of componentDirs) {
    const full = path.join(COMPONENTS, dir);
    if (!fs.statSync(full).isDirectory()) continue;
    const files = fs.readdirSync(full).filter(f => f.endsWith('.tsx'));
    for (const file of files) {
        fixFile(path.join(full, file));
    }
}

console.log('\n================================================================');
console.log(`  Total fixes applied: ${totalFixes}`);
console.log('================================================================');
