const fs = require('fs');
const file = 'src/app/chamber/sm3-02/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const importStatement = `import {
    S302Quest,
    Stage,
    generateUnitCircleQuests,
    generateProjectionsQuests,
    generateWavesQuests,
} from "@/lib/sm3-02/quests";\n\n`;

content = content.replace(/type Stage = "UNIT_CIRCLE" \| "PROJECTIONS" \| "WAVES";\n\ninterface S302Quest extends Quest \{\n    stage: Stage;\n    angle\?: number;\n    trigFunc\?: "sin" \| "cos" \| "tan";\n\}/g, '');

content = content.replace(/\/\/ ----------------------------------------------------------------------------\n\/\/ HELPER: EXACT VALUES MAP\n\/\/ ----------------------------------------------------------------------------/g, importStatement + '&KEEP_ME');
content = content.replace('&KEEP_ME', '// ----------------------------------------------------------------------------\n// HELPER: EXACT VALUES MAP\n// ----------------------------------------------------------------------------');

const builderRegex = /\/\/ ----------------------------------------------------------------------------\n\/\/ HELPER: QUESTION BUILDER\n\/\/ ----------------------------------------------------------------------------([\s\S]*?)function buildStagePool\(t: ReturnType<typeof useLanguage>\["t"\], difficulty: Difficulty, stage: Stage\): S302Quest\[\] \{([\s\S]*?)return \[\];\n\}/;

const newBuilder = `// ----------------------------------------------------------------------------
// HELPER: QUESTION BUILDER
// ----------------------------------------------------------------------------
function buildStagePool(t: ReturnType<typeof useLanguage>["t"], difficulty: Difficulty, stage: Stage): S302Quest[] {
    if (stage === "UNIT_CIRCLE") return generateUnitCircleQuests(t, difficulty);
    if (stage === "PROJECTIONS") return generateProjectionsQuests(t, difficulty);
    if (stage === "WAVES") return generateWavesQuests(t, difficulty);
    return [];
}`;

content = content.replace(builderRegex, newBuilder);

fs.writeFileSync(file, content);
