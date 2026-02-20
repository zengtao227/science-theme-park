import { Difficulty } from "@/hooks/useQuestManager";

export type Stage = "boyle" | "charles" | "combined" | "elite";

export interface SC203Quest {
    id: string;
    difficulty: Difficulty;
    stage: Stage;
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
    hintLatex?: string[];
}

const round2 = (v: number) => Math.round(v * 100) / 100;

export function generateBoyleQuests(t: any, difficulty: Difficulty): SC203Quest[] {
    const quests: SC203Quest[] = [];
    for (let i = 0; i < 60; i++) {
        const V1 = 10, P1 = 1, V2 = 5;
        const P2 = (V1 * P1) / V2;
        quests.push({
            id: `B-${difficulty.charAt(0)}-${i + 1}`,
            difficulty, stage: "boyle",
            promptLatex: `V_1=10L, P_1=1bar, V_2=5L`,
            expressionLatex: "P_1 V_1 = P_2 V_2",
            targetLatex: "P_2",
            slots: [{ id: "ans", labelLatex: "P_2", placeholder: "bar", expected: P2 }],
            correctLatex: `P_2 = ${P2} bar`,
        });
    }
    return quests;
}

export function generateCharlesQuests(t: any, difficulty: Difficulty): SC203Quest[] {
    const quests: SC203Quest[] = [];
    for (let i = 0; i < 60; i++) {
        const V1 = 20, T1 = 300, T2 = 330;
        const V2 = (V1 * T2) / T1;
        quests.push({
            id: `C-${difficulty.charAt(0)}-${i + 1}`,
            difficulty, stage: "charles",
            promptLatex: `V_1=20L, T_1=300K, T_2=330K`,
            expressionLatex: "V_1/T_1 = V_2/T_2",
            targetLatex: "V_2",
            slots: [{ id: "ans", labelLatex: "V_2", placeholder: "L", expected: V2 }],
            correctLatex: `V_2 = ${V2} L`,
        });
    }
    return quests;
}

export function generateCombinedQuests(t: any, difficulty: Difficulty): SC203Quest[] {
    const quests: SC203Quest[] = [];
    for (let i = 0; i < 60; i++) {
        const P1 = 1, V1 = 10, T1 = 300, P2 = 2, T2 = 300;
        const V2 = (P1 * V1 * T2) / (P2 * T1);
        quests.push({
            id: `GL-${difficulty.charAt(0)}-${i + 1}`,
            difficulty, stage: "combined",
            promptLatex: `P_1=1, V_1=10, P_2=2`,
            expressionLatex: "P_1 V_1 / T_1 = P_2 V_2 / T_2",
            targetLatex: "V_2",
            slots: [{ id: "ans", labelLatex: "V_2", placeholder: "L", expected: V2 }],
            correctLatex: `V_2 = ${V2} L`,
        });
    }
    return quests;
}

export function generateEliteQuests(t: any, difficulty: Difficulty): SC203Quest[] {
    const quests: SC203Quest[] = [];
    const keys = ["bvb_brake", "euroairport", "wickelfisch", "fire_dept", "geothermal"];

    for (let i = 0; i < 60; i++) {
        const key = keys[i % keys.length];
        let expected = 5;
        if (key === "euroairport") expected = 1.8;
        if (key === "wickelfisch") expected = 19;
        if (key === "fire_dept") expected = 40;
        if (key === "geothermal") expected = 375;

        quests.push({
            id: `E-${difficulty.charAt(0)}-${i + 1}`,
            difficulty, stage: "elite",
            promptLatex: t(`sc2_03.prompts.${key}`, { V: 100, P: 1, V2: 20, t1: 300, p1: 100, t2: 270, p2: 50, v1: 20, r: 50 }),
            expressionLatex: "Ideal Gas Law Application",
            targetLatex: "Result",
            slots: [{ id: "ans", labelLatex: "Val", placeholder: "...", expected }],
            correctLatex: `${expected}`,
        });
    }
    return quests;
}
