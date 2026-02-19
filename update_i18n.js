const fs = require('fs');

const propertiesEN = {
    basic_0: "Which powder fizzes with vinegar?",
    basic_1: "Which powder turns blue-black with iodine?",
    basic_2: "Which powder dissolves completely in water?",
    basic_3: "Which powder is white and crystalline?",
    basic_4: "Which powder produces bubbles with acid?",
    core_0: "Which powder produces CO₂ gas?",
    core_1: "Which powder forms a colloidal suspension?",
    core_2: "Which powder has the highest solubility?",
    core_3: "Which powder reacts with acetic acid?",
    core_4: "Which powder is a polysaccharide?",
    advanced_0: "Which powder is sodium bicarbonate?",
    advanced_1: "Which powder is sodium chloride?",
    advanced_2: "Which powder is a carbohydrate polymer?",
    advanced_3: "Which powder releases carbonic acid?",
    advanced_4: "Which powder forms an ionic solution?",
    elite_0: "Which powder has formula NaHCO₃?",
    elite_1: "Which powder has formula NaCl?",
    elite_2: "Which powder has formula (C₆H₁₀O₅)ₙ?",
    elite_3: "Which powder undergoes acid-base neutralization?",
    elite_4: "Which powder forms a triiodide complex?",
};

const propertiesCN = {
    basic_0: "哪种粉末与醋反应产生气泡？",
    basic_1: "哪种粉末遇碘变蓝黑色？",
    basic_2: "哪种粉末在水中完全溶解？",
    basic_3: "哪种粉末是白色的结晶体？",
    basic_4: "哪种粉末遇酸会产生气泡？",
    core_0: "哪种粉末会产生二氧化碳(CO₂)气体？",
    core_1: "哪种粉末会形成胶体悬浮液？",
    core_2: "哪种粉末的溶解度最高？",
    core_3: "哪种粉末与乙酸(醋酸)反应？",
    core_4: "哪种粉末是多糖？",
    advanced_0: "哪种粉末是碳酸氢钠？",
    advanced_1: "哪种粉末是氯化钠？",
    advanced_2: "哪种粉末是碳水化合物聚合物？",
    advanced_3: "哪种粉末会释放碳酸？",
    advanced_4: "哪种粉末形成离子溶液？",
    elite_0: "哪种粉末的化学式为NaHCO₃？",
    elite_1: "哪种粉末的化学式为NaCl？",
    elite_2: "哪种粉末的化学式为(C₆H₁₀O₅)ₙ？",
    elite_3: "哪种粉末经历酸碱中和反应？",
    elite_4: "哪种粉末形成三碘络合物？",
};

const propertiesDE = {
    basic_0: "Welches Pulver sprudelt mit Essig?",
    basic_1: "Welches Pulver wird mit Jod blau-schwarz?",
    basic_2: "Welches Pulver löst sich vollständig in Wasser?",
    basic_3: "Welches Pulver ist weiß und kristallin?",
    basic_4: "Welches Pulver produziert Blasen mit Säure?",
    core_0: "Welches Pulver produziert CO₂-Gas?",
    core_1: "Welches Pulver bildet eine kolloidale Suspension?",
    core_2: "Welches Pulver hat die höchste Löslichkeit?",
    core_3: "Welches Pulver reagiert mit Essigsäure?",
    core_4: "Welches Pulver ist ein Polysaccharid?",
    advanced_0: "Welches Pulver ist Natriumbicarbonat?",
    advanced_1: "Welches Pulver ist Natriumchlorid?",
    advanced_2: "Welches Pulver ist ein Kohlenhydratpolymer?",
    advanced_3: "Welches Pulver setzt Kohlensäure frei?",
    advanced_4: "Welches Pulver bildet eine ionische Lösung?",
    elite_0: "Welches Pulver hat die Formel NaHCO₃?",
    elite_1: "Welches Pulver hat die Formel NaCl?",
    elite_2: "Welches Pulver hat die Formel (C₆H₁₀O₅)ₙ?",
    elite_3: "Welches Pulver durchläuft eine Säure-Base-Neutralisation?",
    elite_4: "Welches Pulver bildet einen Triiodid-Komplex?",
};

const reactionsEN = {
    basic_0: "Baking soda + Vinegar reaction",
    basic_1: "Starch + Iodine test",
    basic_2: "Salt dissolving in water",
    basic_3: "Baking soda heating",
    basic_4: "Starch hydrolysis",
    core_0: "Complete neutralization of baking soda",
    core_1: "Starch-iodine complex formation",
    core_2: "Salt crystallization",
    core_3: "Baking soda decomposition temperature",
    core_4: "Starch enzymatic breakdown",
    advanced_0: "Baking soda with strong acid",
    advanced_1: "Starch complete hydrolysis",
    advanced_2: "Salt electrolysis",
    advanced_3: "Baking soda buffer system",
    advanced_4: "Starch gelatinization",
    elite_0: "Baking soda in blood pH regulation",
    elite_1: "Starch-iodine complex structure",
    elite_2: "Salt in Solvay process",
    elite_3: "Baking soda thermal decomposition kinetics",
    elite_4: "Starch retrogradation",
};

const reactionsCN = {
    basic_0: "小苏打 + 醋的反应",
    basic_1: "淀粉 + 碘测试",
    basic_2: "食盐溶于水",
    basic_3: "小苏打加热",
    basic_4: "淀粉水解",
    core_0: "小苏打的完全中和",
    core_1: "淀粉-碘络合物的形成",
    core_2: "食盐结晶",
    core_3: "小苏打的分解温度",
    core_4: "淀粉的酶解过程",
    advanced_0: "小苏打与强酸反应",
    advanced_1: "淀粉的完全水解",
    advanced_2: "食盐溶液电解",
    advanced_3: "小苏打缓冲系统",
    advanced_4: "淀粉糊化",
    elite_0: "小苏打在血液pH调节中的作用",
    elite_1: "淀粉-碘络合物结构",
    elite_2: "食盐在索尔维制碱法中的应用",
    elite_3: "小苏打的热分解动力学",
    elite_4: "淀粉的老化过程",
};

const reactionsDE = {
    basic_0: "Backpulver + Essig Reaktion",
    basic_1: "Stärke + Jod-Test",
    basic_2: "Salz löst sich in Wasser",
    basic_3: "Backpulver erhitzen",
    basic_4: "Stärke-Hydrolyse",
    core_0: "Vollständige Neutralisation von Backpulver",
    core_1: "Stärke-Jod-Komplex-Bildung",
    core_2: "Salzkristallisation",
    core_3: "Zersetzungstemperatur von Backpulver",
    core_4: "Enzymatischer Abbau von Stärke",
    advanced_0: "Backpulver mit starker Säure",
    advanced_1: "Vollständige Hydrolyse von Stärke",
    advanced_2: "Salzelektrolyse",
    advanced_3: "Backpulver-Puffersystem",
    advanced_4: "Stärkeverkleisterung",
    elite_0: "Backpulver in der Blut-pH-Regulation",
    elite_1: "Stärke-Jod-Komplexstruktur",
    elite_2: "Salz im Solvay-Verfahren",
    elite_3: "Kinetik der thermischen Zersetzung von Natron",
    elite_4: "Stärke-Retrogradation",
};

const promptsEN = {
    identify_powders: "Identify the three white powders",
    use_tools: "Use: Water, Vinegar, Fire, Iodine",
    test_observe: "Test and observe",
    answer: "Answer",
    powder_a: "Powder A is",
    powder_b: "Powder B is",
    powder_c: "Powder C is",
    product: "Main product",
    review_design: "Review the experimental design.",
    understood: "Understood?",
    confirm_1: "Type 1 to confirm"
};

const promptsCN = {
    identify_powders: "鉴定三种白色粉末",
    use_tools: "使用工具：水、醋、火、碘液",
    test_observe: "测试并观察",
    answer: "答案",
    powder_a: "粉末 A 是",
    powder_b: "粉末 B 是",
    powder_c: "粉末 C 是",
    product: "主要产物",
    review_design: "查阅右侧实验设计方案。",
    understood: "明白了吗？",
    confirm_1: "输入 1 确认"
};

const promptsDE = {
    identify_powders: "Identifizieren Sie die drei weißen Pulver",
    use_tools: "Mittel: Wasser, Essig, Feuer, Jod",
    test_observe: "Testen und beobachten",
    answer: "Antwort",
    powder_a: "Pulver A ist",
    powder_b: "Pulver B ist",
    powder_c: "Pulver C ist",
    product: "Hauptprodukt",
    review_design: "Überprüfen Sie das experimentelle Design.",
    understood: "Verstanden?",
    confirm_1: "Tipper 1 zur Bestätigung"
};

const uiCN = `        properties_q: ${JSON.stringify(propertiesCN, null, 12)},
        reactions_q: ${JSON.stringify(reactionsCN, null, 12)},
        prompts: ${JSON.stringify(promptsCN, null, 12)},`;

const uiEN = `        properties_q: ${JSON.stringify(propertiesEN, null, 12)},
        reactions_q: ${JSON.stringify(reactionsEN, null, 12)},
        prompts: ${JSON.stringify(promptsEN, null, 12)},`;

const uiDE = `        properties_q: ${JSON.stringify(propertiesDE, null, 12)},
        reactions_q: ${JSON.stringify(reactionsDE, null, 12)},
        prompts: ${JSON.stringify(promptsDE, null, 12)},`;

function updateFile(file, uiStr) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/prompts: \{[\s\S]*?identify_powders.*?\}/, uiStr.trim());
    // Also inject experiment actions and targets if not present
    if (file.includes('cn/')) {
        content = content.replace('"请佩戴护目镜。强酸强碱具有腐蚀性。"', '"请佩戴护目镜。强酸强碱具有腐蚀性。",\n                action: "分析莱茵河水样。",\n                target: "缓冲能力"');
        content = content.replace('"热蒸发皿有烫伤危险，请使用实验钳操作。"', '"热蒸发皿有烫伤危险，请使用实验钳操作。",\n                action: "提纯岩盐。",\n                target: "结晶"');
    } else if (file.includes('en/')) {
        content = content.replace('"Wear safety goggles. Acids and bases are corrosive."', '"Wear safety goggles. Acids and bases are corrosive.",\n                action: "Analyze the Rhine water sample.",\n                target: "Buffer Capacity"');
        content = content.replace('"Burn hazard from hot evaporating dish."', '"Burn hazard from hot evaporating dish.",\n                action: "Purify rock salt.",\n                target: "Crystallization"');
    } else {
        content = content.replace('"Schutzbrille tragen. Säuren und Basen sind ätzend."', '"Schutzbrille tragen. Säuren und Basen sind ätzend.",\n                action: "Analysieren Sie die Rheinwasserprobe.",\n                target: "Pufferkapazität"');
        content = content.replace('"Verbrennungsgefahr durch heiße Abdampfschale."', '"Verbrennungsgefahr durch heiße Abdampfschale.",\n                action: "Steinsalz reinigen.",\n                target: "Kristallisation"');
    }
    fs.writeFileSync(file, content);
}

updateFile('./src/lib/i18n/cn/chemistry.ts', uiCN);
updateFile('./src/lib/i18n/en/chemistry.ts', uiEN);
updateFile('./src/lib/i18n/de/chemistry.ts', uiDE);
console.log("Updated translation files!");
