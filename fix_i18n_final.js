const fs = require('fs');

const labUI_CN = {
    mystery_lab: "神秘实验室",
    select_tool: "选择工具",
    lab_notes: "实验记录",
    no_tests: "暂无测试记录...",
    tests_count: "次测试",
    protocol: "侦探协议:",
    instruction: "先选择工具，再点击粉末进行测试。根据反应现象判断哪一个是小苏打、食盐或淀粉！",
    tools: { water: "水", vinegar: "醋", fire: "火", iodine: "碘液" },
    substances: {
        soda: "小苏打 (NaHCO₃)", salt: "食盐 (NaCl)", starch: "淀粉 (C₆H₁₀O₅)ₙ",
        powder_a: "粉末 A", powder_b: "粉末 B", powder_c: "粉末 C"
    },
    results: {
        soda_water: "微溶于水", soda_vinegar: "产生大量气泡 (CO₂)!", soda_fire: "无明显变化", soda_iodine: "无颜色变化",
        salt_water: "完全溶解", salt_vinegar: "溶解，无气泡", salt_fire: "高温下熔化", salt_iodine: "无颜色变化",
        starch_water: "形成浑浊混合物", starch_vinegar: "无反应", starch_fire: "燃烧/碳化", starch_iodine: "变成蓝黑色！",
        no_reaction: "无反应"
    }
};

const labUI_EN = {
    mystery_lab: "Mystery Lab",
    select_tool: "Select Tool",
    lab_notes: "Lab Notes",
    no_tests: "No tests performed yet...",
    tests_count: "tests",
    protocol: "Detective Protocol:",
    instruction: "Select a tool, then click on a powder to test. Use the reactions to identify which is Baking Soda, Salt, or Starch!",
    tools: { water: "Water", vinegar: "Vinegar", fire: "Fire", iodine: "Iodine" },
    substances: {
        soda: "Baking Soda (NaHCO₃)", salt: "Salt (NaCl)", starch: "Starch (C₆H₁₀O₅)ₙ",
        powder_a: "Powder A", powder_b: "Powder B", powder_c: "Powder C"
    },
    results: {
        soda_water: "Dissolves slightly", soda_vinegar: "Fizzes! CO₂ bubbles, soda_fire: "No visible change", soda_iodine: "No color change",
        salt_water: "Dissolves completely", salt_vinegar: "Dissolves, no fizz", salt_fire: "Melts at high temp", salt_iodine: "No color change",
        starch_water: "Forms cloudy mixture", starch_vinegar: "No reaction", starch_fire: "Burns/chars", starch_iodine: "Turns BLUE-BLACK!",
        no_reaction: "No reaction"
    }
};

const labUI_DE = {
    mystery_lab: "Geheimlabor",
    select_tool: "Werkzeug wählen",
    lab_notes: "Labornotizen",
    no_tests: "Noch keine Tests durchgeführt...",
    tests_count: "Tests",
    protocol: "Detektiv-Protokoll:",
    instruction: "Wählen Sie ein Werkzeug und klicken Sie auf ein Pulver zum Testen. Identifizieren Sie Backpulver, Salz und Stärke!",
    tools: { water: "Wasser", vinegar: "Essig", fire: "Feuer", iodine: "Jod" },
    substances: {
        soda: "Natron (NaHCO₃)", salt: "Salz (NaCl)", starch: "Stärke (C₆H₁₀O₅)ₙ",
        powder_a: "Pulver A", powder_b: "Pulver B", powder_c: "Pulver C"
    },
    results: {
        soda_water: "Löst sich leicht", soda_vinegar: "Sprudelt! CO₂-Blasen, soda_fire: "Keine Veränderung", soda_iodine: "Keine Farbänderung",
        salt_water: "Löst sich vollständig auf", salt_vinegar: "Löst sich auf, kein Sprudeln", salt_fire: "Schmilzt", salt_iodine: "Keine Farbänderung",
        starch_water: "Bildet trübe Mischung", starch_vinegar: "Keine Reaktion", starch_fire: "Verbrennt", starch_iodine: "Wird BLAU-SCHWARZ!",
        no_reaction: "Keine Reaktion"
    }
};

function fixFile(path, lang) {
    let content = fs.readFileSync(path, 'utf8');
    
    // 1. Remove lab_ui from gc3_01
    const gc3BlockMatch = content.match(/gc3_01: \{([\s\S]*?)\n    \}/);
    if (gc3BlockMatch) {
        let gc3Block = gc3BlockMatch[0];
        gc3Block = gc3Block.replace(/lab_ui: \{[\s\S]*?\n        \},/, "");
        content = content.replace(gc3BlockMatch[0], gc3Block);
    }
    
    // 2. Add lab_ui to sc1_01 if not there
    const sc1BlockMatch = content.match(/sc1_01: \{([\s\S]*?)\n    \}/);
    if (sc1BlockMatch) {
        let sc1Block = sc1BlockMatch[0];
        if (!sc1Block.includes("lab_ui:")) {
            const labUI = lang === 'CN' ? labUI_CN : (lang === 'DE' ? labUI_DE : labUI_EN);
            const labUIStr = `\n        lab_ui: ${JSON.stringify(labUI, null, 12)},`;
            sc1Block = sc1Block.replace(/labels: \{/, labUIStr + "\n        labels: {");
            content = content.replace(sc1BlockMatch[0], sc1Block);
        }
    }
    
    fs.writeFileSync(path, content);
}

fixFile('./src/lib/i18n/cn/chemistry.ts', 'CN');
fixFile('./src/lib/i18n/en/chemistry.ts', 'EN');
fixFile('./src/lib/i18n/de/chemistry.ts', 'DE');
console.log("Fixed!");
