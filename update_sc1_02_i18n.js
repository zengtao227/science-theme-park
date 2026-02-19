const fs = require('fs');

const extraData = {
    CN: {
        labels: { formula: "化学式", atoms: "原子量", reaction: "化学反应", given: "已知条件", amount: "物质的量", mass: "质量", molar_mass: "摩尔质量" },
        prompts: {
            molar_mass: "计算下列物质的摩尔质量：",
            stoichiometry: "根据化学方程式计算产物的物质的量：",
            yield: "根据反应物质量计算理论产量："
        }
    },
    EN: {
        labels: { formula: "Formula", atoms: "Atomic Weights", reaction: "Reaction", given: "Given", amount: "Amount (n)", mass: "Mass (m)", molar_mass: "Molar Mass (M)" },
        prompts: {
            molar_mass: "Calculate the molar mass of:",
            stoichiometry: "Calculate the amount of product based on reaction:",
            yield: "Calculate the theoretical yield from reactants:"
        }
    },
    DE: {
        labels: { formula: "Formel", atoms: "Atomgewichte", reaction: "Reaktion", given: "Gegeben", amount: "Menge (n)", mass: "Masse (m)", molar_mass: "Molare Masse (M)" },
        prompts: {
            molar_mass: "Berechnen Sie die molare Masse von:",
            stoichiometry: "Berechnen Sie die Stoffmenge des Produkts:",
            yield: "Berechnen Sie die theoretische Ausbeute:"
        }
    }
};

function updateFile(path, lang) {
    let content = fs.readFileSync(path, 'utf8');
    const data = extraData[lang];
    const sc1_02_block = content.match(/sc1_02: \{([\s\S]*?)\n    \}/);
    if (sc1_02_block) {
        let block = sc1_02_block[0];
        // Add prompts if missing
        if (!block.includes("molar_mass_prompt_latex")) {
             const promptStr = `\n        stages: {\n            molar_mass: "${data.labels.molar_mass}",\n            stoichiometry: "化学计量",\n            yield: "理论产量",\n            molar_mass_prompt_latex: "\\\\text{${data.prompts.molar_mass}}",\n            stoichiometry_prompt_latex: "\\\\text{${data.prompts.stoichiometry}}",\n            yield_prompt_latex: "\\\\text{${data.prompts.yield}}"\n        },`;
             block = block.replace(/stages: \{[\s\S]*?\n        \},/, promptStr);
        }
        // Add labels
        if (!block.includes("formula_label")) {
            const labelStr = `\n        labels: {\n            scale: "天平读数",\n            formula: "${data.labels.formula}",\n            atoms: "${data.labels.atoms}",\n            reaction: "${data.labels.reaction}",\n            given: "${data.labels.given}",\n            amount: "${data.labels.amount}",\n            mass: "${data.labels.mass}",\n            molar: "${data.labels.molar_mass}"\n        },`;
            block = block.replace(/labels: \{[\s\S]*?\n        \},/, labelStr);
        }
        content = content.replace(sc1_02_block[0], block);
        fs.writeFileSync(path, content);
    }
}

updateFile('./src/lib/i18n/cn/chemistry.ts', 'CN');
updateFile('./src/lib/i18n/en/chemistry.ts', 'EN');
updateFile('./src/lib/i18n/de/chemistry.ts', 'DE');
console.log("Updated SC1.02 i18n!");
