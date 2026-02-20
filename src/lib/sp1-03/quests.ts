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
        promptLatex: "Identify the atmosphere layer.",
        expressionLatex: "Layer = \\square",
        targetLatex: "Troposphere",
        slots: [{ id: "l1", labelLatex: "Layer", placeholder: "Name", expected: "Troposphere" }],
        correctLatex: "Troposphere"
    },
    {
        id: "sp1_03_q2",
        stage: "WEATHER",
        difficulty: "CORE",
        promptLatex: "Standard sea level pressure.",
        expressionLatex: "P = \\square",
        targetLatex: "1013",
        slots: [{ id: "p", labelLatex: "P", placeholder: "hPa", expected: "1013" }],
        correctLatex: "1013"
    },
    {
        id: "sp1_03_q3",
        stage: "CLIMATE",
        difficulty: "ADVANCED",
        promptLatex: "Identify main greenhouse gas.",
        expressionLatex: "Gas = \\square",
        targetLatex: "CO2",
        slots: [{ id: "g", labelLatex: "Gas", placeholder: "Formula", expected: "CO2" }],
        correctLatex: "CO2"
    }
];

export const generateAtmosphereQuests = (t: any, difficulty: Difficulty): SP103Quest[] => {
    return QUEST_DATA.filter(q => q.stage === "ATMOSPHERE" && q.difficulty === difficulty);
};

export const generateWeatherQuests = (t: any, difficulty: Difficulty): SP103Quest[] => {
    return QUEST_DATA.filter(q => q.stage === "WEATHER" && q.difficulty === difficulty);
};

export const generateClimateQuests = (t: any, difficulty: Difficulty): SP103Quest[] => {
    return QUEST_DATA.filter(q => q.stage === "CLIMATE" && q.difficulty === difficulty);
};
