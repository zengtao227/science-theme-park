import { Difficulty, Quest } from "@/hooks/useQuestManager";

export type Stage = "ATMOSPHERE" | "WEATHER" | "CLIMATE";

export interface SP103Quest extends Quest {
    stage: Stage;
}

export const QUEST_DATA: SP103Quest[] = [
    {
        id: "sp1_03_q1",
        stage: "ATMOSPHERE",
        difficulty: "BASIC",
        promptLatex: "sp1_03_q1",
        expressionLatex: "Layer = \\square",
        targetLatex: "Troposphere",
        slots: [{ id: "l1", labelLatex: "Layer", placeholder: "Name", expected: "Troposphere" }],
        correctLatex: "Troposphere"
    },
    {
        id: "sp1_03_q2",
        stage: "WEATHER",
        difficulty: "CORE",
        promptLatex: "sp1_03_q2",
        expressionLatex: "P = \\square",
        targetLatex: "1013",
        slots: [{ id: "p", labelLatex: "P", placeholder: "hPa", expected: "1013" }],
        correctLatex: "1013"
    },
    {
        id: "sp1_03_q3",
        stage: "CLIMATE",
        difficulty: "ADVANCED",
        promptLatex: "sp1_03_q3",
        expressionLatex: "Gas = \\square",
        targetLatex: "CO2",
        slots: [{ id: "g", labelLatex: "Gas", placeholder: "Formula", expected: "CO2" }],
        correctLatex: "CO2"
    }
];

export const generateAtmosphereQuests = (t: any, difficulty: Difficulty): SP103Quest[] => {
    return QUEST_DATA.filter(q => q.stage === "ATMOSPHERE" && q.difficulty === difficulty)
        .map(q => ({ ...q, promptLatex: `\\text{${t(`sp1_03.prompts.${q.id}`) || q.promptLatex}}` }));
};

export const generateWeatherQuests = (t: any, difficulty: Difficulty): SP103Quest[] => {
    return QUEST_DATA.filter(q => q.stage === "WEATHER" && q.difficulty === difficulty)
        .map(q => ({ ...q, promptLatex: `\\text{${t(`sp1_03.prompts.${q.id}`) || q.promptLatex}}` }));
};

export const generateClimateQuests = (t: any, difficulty: Difficulty): SP103Quest[] => {
    return QUEST_DATA.filter(q => q.stage === "CLIMATE" && q.difficulty === difficulty)
        .map(q => ({ ...q, promptLatex: `\\text{${t(`sp1_03.prompts.${q.id}`) || q.promptLatex}}` }));
};
