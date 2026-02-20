import { Difficulty } from "@/hooks/useQuestManager";

export type Stage = "dissolve" | "saturate" | "crystallize" | "elite";

export interface SC204Quest {
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
}

export function generateSolubilityQuests(t: any, difficulty: Difficulty, stage: Stage): SC204Quest[] {
    const quests: SC204Quest[] = [];

    for (let i = 0; i < 60; i++) {
        const temp = 20 + Math.floor(Math.random() * 60);
        const S = 10 + 0.5 * temp; // Pseudo-solubility
        const roundedS = Math.round(S * 10) / 10;

        quests.push({
            id: `${stage.charAt(0).toUpperCase()}-${difficulty.charAt(0)}-${i + 1}`,
            difficulty, stage,
            promptLatex: `T = ${temp}°C`,
            expressionLatex: "S = f(T)",
            targetLatex: "S",
            slots: [{ id: "ans", labelLatex: "S", placeholder: "g/100mL", expected: roundedS }],
            correctLatex: `S = ${roundedS}`,
        });
    }
    return quests;
}

export function generateEliteQuests(t: any, difficulty: Difficulty): SC204Quest[] {
    const quests: SC204Quest[] = [];
    // Use Rhine Water quality prompts
    for (let i = 0; i < 60; i++) {
        quests.push({
            id: `E-${difficulty.charAt(0)}-${i + 1}`,
            difficulty, stage: "elite",
            promptLatex: "Rhine Water Sample A: Mass before=100g, after=99.8g.",
            expressionLatex: "S = m_{solute} / m_{water}",
            targetLatex: "S",
            slots: [{ id: "ans", labelLatex: "S", placeholder: "g", expected: 0.2 }],
            correctLatex: "0.2 g/100g",
        });
    }
    return quests;
}
