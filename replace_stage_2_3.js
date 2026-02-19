const fs = require('fs');
let file = fs.readFileSync('./src/app/chamber/sc1-01/page.tsx', 'utf8');

const propertiesRegex = /const allProperties = \[\s*\/\/ BASIC[\s\S]*?\];/m;
const reactionsRegex = /const allReactions = \[\s*\/\/ BASIC[\s\S]*?\];/m;

const newProperties = `const allProperties = [
      { key: "basic_0", answer: "soda", difficulty: "BASIC" },
      { key: "basic_1", answer: "starch", difficulty: "BASIC" },
      { key: "basic_2", answer: "salt", difficulty: "BASIC" },
      { key: "basic_3", answer: "salt", difficulty: "BASIC" },
      { key: "basic_4", answer: "soda", difficulty: "BASIC" },
      { key: "core_0", answer: "soda", difficulty: "CORE" },
      { key: "core_1", answer: "starch", difficulty: "CORE" },
      { key: "core_2", answer: "salt", difficulty: "CORE" },
      { key: "core_3", answer: "soda", difficulty: "CORE" },
      { key: "core_4", answer: "starch", difficulty: "CORE" },
      { key: "advanced_0", answer: "soda", difficulty: "ADVANCED" },
      { key: "advanced_1", answer: "salt", difficulty: "ADVANCED" },
      { key: "advanced_2", answer: "starch", difficulty: "ADVANCED" },
      { key: "advanced_3", answer: "soda", difficulty: "ADVANCED" },
      { key: "advanced_4", answer: "salt", difficulty: "ADVANCED" },
      { key: "elite_0", answer: "soda", difficulty: "ELITE" },
      { key: "elite_1", answer: "salt", difficulty: "ELITE" },
      { key: "elite_2", answer: "starch", difficulty: "ELITE" },
      { key: "elite_3", answer: "soda", difficulty: "ELITE" },
      { key: "elite_4", answer: "starch", difficulty: "ELITE" },
    ];`;

const newReactions = `const allReactions = [
      { key: "basic_0", equation: "NaHCO_3 + CH_3COOH \\\\rightarrow CO_2 + H_2O + CH_3COONa", product: "CO₂", difficulty: "BASIC" },
      { key: "basic_1", equation: "\\\\text{Starch} + I_2 \\\\rightarrow \\\\text{Blue-black complex}", product: "Blue-black", difficulty: "BASIC" },
      { key: "basic_2", equation: "NaCl \\\\rightarrow Na^+ + Cl^-", product: "Ions", difficulty: "BASIC" },
      { key: "basic_3", equation: "2NaHCO_3 \\\\rightarrow Na_2CO_3 + H_2O + CO_2", product: "CO₂", difficulty: "BASIC" },
      { key: "basic_4", equation: "\\\\text{Starch} + H_2O \\\\rightarrow \\\\text{Glucose}", product: "Glucose", difficulty: "BASIC" },
      { key: "core_0", equation: "NaHCO_3 + HCl \\\\rightarrow NaCl + H_2O + CO_2", product: "NaCl", difficulty: "CORE" },
      { key: "core_1", equation: "\\\\text{Starch} + I_3^- \\\\rightarrow \\\\text{Starch-I}_3^- \\\\text{ complex}", product: "Complex", difficulty: "CORE" },
      { key: "core_2", equation: "Na^+ + Cl^- \\\\rightarrow NaCl_{(s)}", product: "Crystal", difficulty: "CORE" },
      { key: "core_3", equation: "NaHCO_3 \\\\xrightarrow{\\\\Delta} Na_2CO_3 + H_2O + CO_2", product: "Na₂CO₃", difficulty: "CORE" },
      { key: "core_4", equation: "\\\\text{Starch} \\\\xrightarrow{\\\\text{amylase}} \\\\text{Maltose}", product: "Maltose", difficulty: "CORE" },
      { key: "advanced_0", equation: "NaHCO_3 + H_2SO_4 \\\\rightarrow Na_2SO_4 + H_2O + CO_2", product: "Na₂SO₄", difficulty: "ADVANCED" },
      { key: "advanced_1", equation: "(C_6H_{10}O_5)_n + nH_2O \\\\rightarrow nC_6H_{12}O_6", product: "C₆H₁₂O₆", difficulty: "ADVANCED" },
      { key: "advanced_2", equation: "2NaCl + 2H_2O \\\\rightarrow 2NaOH + H_2 + Cl_2", product: "Cl₂", difficulty: "ADVANCED" },
      { key: "advanced_3", equation: "HCO_3^- + H^+ \\\\rightleftharpoons H_2CO_3 \\\\rightleftharpoons H_2O + CO_2", product: "Buffer", difficulty: "ADVANCED" },
      { key: "advanced_4", equation: "\\\\text{Starch}_{(s)} + \\\\text{Heat} + H_2O \\\\rightarrow \\\\text{Starch gel}", product: "Gel", difficulty: "ADVANCED" },
      { key: "elite_0", equation: "HCO_3^- + H^+ \\\\rightleftharpoons H_2CO_3 \\\\rightleftharpoons CO_2 + H_2O", product: "CO₂", difficulty: "ELITE" },
      { key: "elite_1", equation: "\\\\text{Amylose helix} + I_3^- \\\\rightarrow \\\\text{Inclusion complex}", product: "Inclusion", difficulty: "ELITE" },
      { key: "elite_2", equation: "NaCl + NH_3 + CO_2 + H_2O \\\\rightarrow NaHCO_3 + NH_4Cl", product: "NaHCO₃", difficulty: "ELITE" },
      { key: "elite_3", equation: "2NaHCO_3 \\\\xrightarrow{k} Na_2CO_3 + H_2O + CO_2", product: "Na₂CO₃", difficulty: "ELITE" },
      { key: "elite_4", equation: "\\\\text{Amylose}_{(aq)} \\\\rightarrow \\\\text{Amylose}_{(crystalline)}", product: "Crystal", difficulty: "ELITE" },
    ];`;

file = file.replace(propertiesRegex, newProperties);
file = file.replace(reactionsRegex, newReactions);

// Also replace the t() assignments
file = file.replace(/promptLatex: `\\\\\\\\text\{\\$\\{prop\.question\\}\\}`/g, "promptLatex: `\\\\\\\\text{${t(`sc1_01.properties_q.${prop.key}`)}}`");
file = file.replace(/expressionLatex: `\\\\\\\\text\{Test and observe\}`/g, "expressionLatex: `\\\\\\\\text{${t('sc1_01.prompts.test_observe')}}`");
file = file.replace(/targetLatex: `\\\\\\\\text\{Answer\}`/g, "targetLatex: `\\\\\\\\text{${t('sc1_01.prompts.answer')}}`");
file = file.replace(/id: "answer", labelLatex: "\\\\\\\\text\{Answer\}"/g, "id: \"answer\", labelLatex: `\\\\\\\\text{${t('sc1_01.prompts.answer')}}`");

file = file.replace(/promptLatex: `\\\\\\\\text\{\\$\\{rxn\.question\\}\\}`/g, "promptLatex: `\\\\\\\\text{${t(`sc1_01.reactions_q.${rxn.key}`)}}`");
file = file.replace(/targetLatex: `\\\\\\\\text\{Product\}`/g, "targetLatex: `\\\\\\\\text{${t('sc1_01.prompts.product')}}`");
file = file.replace(/id: "product", labelLatex: "\\\\\\\\text\{Main product\}"/g, "id: \"product\", labelLatex: `\\\\\\\\text{${t('sc1_01.prompts.product')}}`");

fs.writeFileSync('./src/app/chamber/sc1-01/page.tsx', file);
console.log("Replaced!");
