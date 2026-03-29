import { Difficulty } from "@/hooks/useQuestManager";

export type Stage = "BUILD" | "MEASURE" | "ANALYZE";

export interface GC101Quest {
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
        znConc: number;
        cuConc: number;
        temp: number;
    };
}

export function generateRedoxQuests(t: any, difficulty: Difficulty, stage: Stage): GC101Quest[] {
    const quests: GC101Quest[] = [];
    const keys = ["electron_flow", "salt_bridge", "cathode_process", "standard_v", "cell_type", "nernst_q", "temperature_effect"];

    for (let i = 0; i < 60; i++) {
        const key = keys[i % keys.length];
        let expected: string | number = "1";
        if (key === "standard_v") expected = 1.10;
        if (key === "nernst_q") expected = "2";
        if (key === "cathode_process") expected = "2";

        quests.push({
            id: `${stage.charAt(0)}-${difficulty.charAt(0)}-${i + 1}`,
            difficulty, stage,
            promptLatex: t(`gc1_01.prompts.${key}`),
            expressionLatex: "",
            targetLatex: `\\text{${t("gc1_01.labels.answer_short")}}`,
            slots: [{ id: "ans", labelLatex: t("gc1_01.labels.answer_short"), placeholder: t("gc1_01.placeholders.ellipsis"), expected: typeof expected === "string" ? t(`gc1_01.answers.${expected}`) : expected }],
            correctLatex: `${typeof expected === "string" ? t(`gc1_01.answers.${expected}`) : expected}`,
            simConfig: { znConc: 1.0, cuConc: 1.0, temp: 298 }
        });
    }
    return quests;
}
