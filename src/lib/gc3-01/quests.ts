import { Difficulty } from "@/hooks/useQuestManager";

export type Stage = "CONCENTRATION" | "TEMPERATURE" | "PRESSURE";

export interface GC301Quest {
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
    simConfig: {
        temp: number;
        pressure: number;
        concA: number;
    };
}

export function generateEquilibriumQuests(t: any, difficulty: Difficulty, stage: Stage): GC301Quest[] {
    const quests: GC301Quest[] = [];
    const keys = ["shift_right", "shift_left", "temp_effect", "pressure_effect", "catalyst_effect", "kc_value", "temp_exothermic"];

    for (let i = 0; i < 60; i++) {
        const key = keys[i % keys.length];
        let expected: string | number = "right";
        if (key === "temp_effect") expected = "increase";
        if (key === "kc_value") expected = "2.5";

        quests.push({
            id: `${stage.charAt(0)}-${difficulty.charAt(0)}-${i + 1}`,
            difficulty, stage,
            promptLatex: `\\text{${t(`gc3_01.prompts.${key}`)}}`,
            expressionLatex: "",
            targetLatex: "\\text{Effect}",
            slots: [{ id: "ans", labelLatex: "Result", placeholder: "...", expected }],
            correctLatex: `${expected}`,
            simConfig: { temp: 50, pressure: 50, concA: 50 }
        });
    }
    return quests;
}
