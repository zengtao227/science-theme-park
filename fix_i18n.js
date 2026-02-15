const fs = require('fs');

const content = fs.readFileSync('src/lib/i18n.ts', 'utf8');
const lines = content.split('\n');

let currentLang = null;
let result = [];
let changed = false;

// We'll track which language block we are in
// EN: lines after "EN: {" until "CN: {"
// CN: lines after "CN: {" until "DE: {"
// DE: lines after "DE: {" until the closing of translations

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim() === 'EN: {') {
        currentLang = 'EN';
        result.push(line);
        continue;
    } else if (line.trim() === 'CN: {') {
        currentLang = 'CN';
        result.push(line);
        continue;
    } else if (line.trim() === 'DE: {') {
        currentLang = 'DE';
        result.push(line);
        continue;
    }

    // If we are inside a language block
    if (currentLang) {
        // Check if this is a premature closure at 4 spaces
        // But we must NOT remove the one that actually should close the language block.
        // The one that closes the language block is followed by the next language or the end of the export.

        const isFourSpaceClosure = line === '    },';
        const isFourSpaceModule = /^    [a-zA-Z0-9_]+: \{/.test(line);

        if (isFourSpaceClosure) {
            // Peek ahead to see if the next non-empty line is "CN: {", "DE: {" or "};"
            let nextLine = '';
            for (let j = i + 1; j < lines.length; j++) {
                if (lines[j].trim() !== '') {
                    nextLine = lines[j].trim();
                    break;
                }
            }

            if (nextLine !== 'CN: {' && nextLine !== 'DE: {' && nextLine !== '};' && nextLine !== '}' && nextLine !== '},') {
                // This is a premature closure!
                console.log(`Removing premature closure at line ${i + 1}`);
                changed = true;
                continue; // Skip this line
            }
        }

        if (isFourSpaceModule) {
            // This is a leaked module! Increase its indentation to 8 spaces.
            console.log(`Fixing leaked module indentation at line ${i + 1}: ${line.trim()}`);
            result.push('    ' + line);
            changed = true;
            continue;
        }

        // If it's a line inside a leaked module, it might also need indentation.
        // But wait, if I remove the premature closure, the module is now logically inside.
        // However, the module and its content might still have only 4/8 spaces instead of 8/12.

        // Let's check the current line's indentation. 
        // If it's 4 spaces and it's NOT a module start (handled above) 
        // and NOT a closure (handled above), it might be a property.
        if (line.startsWith('    ') && !line.startsWith('        ') && line.trim() !== '' && !line.trim().startsWith('}')) {
            // This looks like a property at 4 spaces which should be at 8.
            // But wait, some lines might be just text.
            // Usually, properties look like `key: value` or `key: {`.
            if (/^[a-zA-Z0-9_]+:/.test(line.trim())) {
                console.log(`Fixing property indentation at line ${i + 1}: ${line.trim()}`);
                result.push('    ' + line);
                changed = true;
                continue;
            }
        }
    }

    result.push(line);
}

if (changed) {
    fs.writeFileSync('src/lib/i18n.ts', result.join('\n'));
    console.log('Successfully fixed i18n.ts structure.');
} else {
    console.log('No issues found in i18n.ts.');
}
