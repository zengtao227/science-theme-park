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
    const metals = [{ name: "Copper", z: 2, M: 63.5 }, { name: "Silver", z: 1, M: 107.9 }, { name: "Zinc", z: 2, M: 65.4 }];

    for (let i = 0; i < 60; i++) {
        const metal = metals[i % metals.length];
        const I = 1 + Math.random() * 2;
        const time = 600 + Math.floor(Math.random() * 3000);
        const m = (I * time * metal.M) / (metal.z * F);
        const expected = parseFloat(m.toFixed(3));

        quests.push({
            id: `P-${difficulty.charAt(0)}-${i + 1}`,
            difficulty, stage: "PRINCIPLES",
            metal: metal.name, current: parseFloat(I.toFixed(2)), time,
            solution: `${metal.name}SO4`,
            promptLatex: `I=${I.toFixed(2)}A, t=${time}s, M=${metal.M}, z=${metal.z}`,
            expressionLatex: "m = (I \\cdot t \\cdot M) / (z \\cdot F)",
            targetLatex: "m (g)",
            slots: [{ id: "mass", labelLatex: "m", placeholder: "0.000", expected }],
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
            promptLatex: "Electrolysis for Copper Plating",
            expressionLatex: "Cathode or Anode?",
            targetLatex: "1:Anode, 2:Cathode",
            slots: [{ id: "ans", labelLatex: "Pos", placeholder: "1 or 2", expected: 2 }],
            correctLatex: "Cathode",
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
            metal: "Iron", current: 0, time: 0,
            solution: "Seawater",
            promptLatex: "Sacrificial protection for Iron",
            expressionLatex: "Select: 1:Mg, 2:Au",
            targetLatex: "Ans",
            slots: [{ id: "ans", labelLatex: "Choice", placeholder: "1 or 2", expected: 1 }],
            correctLatex: "Magnesium",
        });
    }
    return quests;
}
