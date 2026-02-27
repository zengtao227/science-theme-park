const fs = require('fs');
const file = 'src/app/chamber/sm3-04/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const importStatement = `import {
    S304Quest,
    Stage,
    generatePhQuests,
    generateDecibelQuests,
    generateRichterQuests,
} from "@/lib/sm3-04/quests";\n\n`;

content = content.replace(/type Stage = "PH" \| "DECIBEL" \| "RICHTER";\n\ninterface S304Quest extends Quest \{([\s\S]*?)\}\n\nconst round2/g, 'const round2');

content = content.replace(/import LogarithmicCanvas from "@\/components\/chamber\/sm3-04\/LogarithmicCanvas";/g, 'import LogarithmicCanvas from "@/components/chamber/sm3-04/LogarithmicCanvas";\n' + importStatement);


const builderRegex = /const round2 = \(v: number\) => Math\.round\(v \* 100\) \/ 100;([\s\S]*?)export default function S304Page\(\) \{/;

const newBuilder = `const round2 = (v: number) => Math.round(v * 100) / 100;

function buildStagePool(t: ReturnType<typeof useLanguage>["t"], difficulty: Difficulty, stage: Stage): S304Quest[] {
    if (stage === "PH") return generatePhQuests(t, difficulty);
    if (stage === "DECIBEL") return generateDecibelQuests(t, difficulty);
    if (stage === "RICHTER") return generateRichterQuests(t, difficulty);
    return [];
}

export default function S304Page() {`;

content = content.replace(builderRegex, newBuilder);

fs.writeFileSync(file, content);
