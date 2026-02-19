const fs = require('fs');

const extraLabels = {
    CN: { input_answer: "输入答案", placeholder: "输入 1 或 2" },
    EN: { input_answer: "Input Answer", placeholder: "Type 1 or 2" },
    DE: { input_answer: "Antwort eingeben", placeholder: "Tippen Sie 1 oder 2" }
};

function updateFile(path, lang) {
    let content = fs.readFileSync(path, 'utf8');
    const regex = /gc3_01: \{[\s\S]*?labels: \{([\s\S]*?)\n        \}/;
    const match = content.match(regex);
    if (match) {
        let labelsPart = match[1];
        if (!labelsPart.includes("input_answer")) {
            const newItem = `\n            input_answer: "${extraLabels[lang].input_answer}",\n            placeholder: "${extraLabels[lang].placeholder}",`;
            content = content.replace(labelsPart, labelsPart + newItem);
            fs.writeFileSync(path, content);
        }
    }
}

updateFile('./src/lib/i18n/cn/chemistry.ts', 'CN');
updateFile('./src/lib/i18n/en/chemistry.ts', 'EN');
updateFile('./src/lib/i18n/de/chemistry.ts', 'DE');
console.log("Updated gc3_01 labels!");
