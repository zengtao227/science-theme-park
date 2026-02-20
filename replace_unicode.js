const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const dirFile = path.join(dir, file);
        const dirent = fs.statSync(dirFile);
        if (dirent.isDirectory()) {
            filelist = walkSync(dirFile, filelist);
        } else {
            if (dirFile.endsWith('.ts') || dirFile.endsWith('.tsx') || dirFile.endsWith('.json')) {
                filelist.push(dirFile);
            }
        }
    }
    return filelist;
};

const map = {
    '²': '^2',
    '³': '^3',
    '⁴': '^4',
    '⁵': '^5',
    '⁶': '^6',
    '⁷': '^7',
    '⁸': '^8',
    '⁹': '^9',
    '₁': '_1',
    '₂': '_2',
    '₃': '_3',
    '₄': '_4',
    '₅': '_5',
    '₆': '_6',
    '₇': '_7',
    '₈': '_8',
    '₉': '_9',
    '⁺': '^+',
    '⁻': '^-'
};

const files = walkSync(path.join(__dirname, 'src'));
let changedFiles = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content;

    // We should be careful. Are there places where Unicode is expected?
    // Mostly we want to replace these inside LaTeX strings or just everywhere?
    // Wait! If they are just regular text like "The area is 5 m²", replacing with "5 m^2" is fine.
    // But wait! Chemical formulas like H₂O might become H_2O, which in text is weird, but in LaTeX \text{H}_2\text{O}.
    // We already replaced these in the Gas Laws data.
    // To be safe, I'd rather just replace them. "m^2" is perfectly readable text too.
    // Let's replace all occurrences.
    for (const [char, replacement] of Object.entries(map)) {
        newContent = newContent.split(char).join(replacement);
    }

    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        changedFiles++;
        console.log(`Updated: ${file}`);
    }
}

console.log(`Total files updated: ${changedFiles}`);
