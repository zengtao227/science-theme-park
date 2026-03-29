import { Difficulty } from "@/hooks/useQuestManager";

export type Stage = "PRINCIPLES" | "PLATING" | "CORROSION";

export interface GC102Quest {
    id: string;
    difficulty: Difficulty;
    stage: Stage;
    metal: string;
    current: number;
    time: number;
    solution: string;
    promptLatex: string;
    expressionLatex: string;
    targetLatex: string;
    slots: Array<{
        id: string;
        labelLatex: string;
        placeholder: string;
        expected: string | number;
    }>;
    correctLatex: string;
}

export function generatePrinciplesQuests(t: any, difficulty: Difficulty): GC102Quest[] {
    const quests: GC102Quest[] = [];
    const F = 96485;
    const metals = [
        { nameKey: "gc1_02.metals.copper", z: 2, M: 63.5 },
        { nameKey: "gc1_02.metals.silver", z: 1, M: 107.9 },
        { nameKey: "gc1_02.metals.zinc", z: 2, M: 65.4 },
    ];

    for (let i = 0; i < 60; i++) {
        const metal = metals[i % metals.length];
        const metalName = t(metal.nameKey);
        const I = 1 + Math.random() * 2;
        const time = 600 + Math.floor(Math.random() * 3000);
        const m = (I * time * metal.M) / (metal.z * F);
        const expected = parseFloat(m.toFixed(3));

        quests.push({
            id: `P-${difficulty.charAt(0)}-${i + 1}`,
            difficulty, stage: "PRINCIPLES",
            metal: metalName, current: parseFloat(I.toFixed(2)), time,
            solution: `${metalName}SO4`,
            promptLatex: t("gc1_02.prompts.calc_mass", {
                metal: metalName,
                current: I.toFixed(2),
                time
            }),
            expressionLatex: "m = (I \\cdot t \\cdot M) / (z \\cdot F)",
            targetLatex: "m (g)",
            slots: [{ id: "mass", labelLatex: "m", placeholder: t("gc1_02.placeholders.decimal_mass"), expected }],
            correctLatex: `${expected}g`,
        });
    }
    return quests;
}

export function generatePlatingQuests(t: any, difficulty: Difficulty): GC102Quest[] {
    const quests: GC102Quest[] = [];
    for (let i = 0; i < 60; i++) {
        quests.push({
            id: `L-${difficulty.charAt(0)}-${i + 1}`,
            difficulty, stage: "PLATING",
            metal: "Cu", current: 1.5, time: 500,
            solution: "CuSO4",
            promptLatex: t("gc1_02.prompts.plating_setup"),
            expressionLatex: t("gc1_02.labels.plating_choice"),
            targetLatex: t("gc1_02.labels.plating_target"),
            slots: [{ id: "ans", labelLatex: t("gc1_02.labels.position"), placeholder: t("gc1_02.placeholders.one_or_two"), expected: 2 }],
            correctLatex: t("gc1_02.answers.cathode"),
        });
    }
    return quests;
}

export function generateCorrosionQuests(t: any, difficulty: Difficulty): GC102Quest[] {
    const quests: GC102Quest[] = [];
    for (let i = 0; i < 60; i++) {
        quests.push({
            id: `C-${difficulty.charAt(0)}-${i + 1}`,
            difficulty, stage: "CORROSION",
            metal: t("gc1_02.metals.iron"), current: 0, time: 0,
            solution: t("gc1_02.metals.seawater"),
            promptLatex: t("gc1_02.prompts.corrosion_protection", { metal: t("gc1_02.metals.iron") }),
            expressionLatex: t("gc1_02.labels.corrosion_choice"),
            targetLatex: t("gc1_02.labels.answer_short"),
            slots: [{ id: "ans", labelLatex: t("gc1_02.labels.choice"), placeholder: t("gc1_02.placeholders.one_or_two"), expected: 1 }],
            correctLatex: t("gc1_02.answers.magnesium"),
        });
    }
    return quests;
}
