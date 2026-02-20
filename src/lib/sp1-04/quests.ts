import { Difficulty, Quest } from "@/hooks/useQuestManager";

export type Stage = "SOLAR_SYSTEM" | "MOON_PHASES" | "SEASONS";

export interface SP104Quest extends Quest {
    stage: Stage;
}

export const QUEST_DATA: SP104Quest[] = [
    {
        id: "sp1_04_q1",
        stage: "SOLAR_SYSTEM",
        difficulty: "BASIC",
        promptLatex: "Identify the largest planet.",
        expressionLatex: "Planet = \\square",
        targetLatex: "Jupiter",
        slots: [{ id: "p1", labelLatex: "Planet", placeholder: "Name", expected: "Jupiter" }],
        correctLatex: "Jupiter"
    },
    {
        id: "sp1_04_q2",
        stage: "MOON_PHASES",
        difficulty: "CORE",
        promptLatex: "Identify phase when fully illuminated.",
        expressionLatex: "Phase = \\square",
        targetLatex: "Full",
        slots: [{ id: "m1", labelLatex: "Phase", placeholder: "Name", expected: "Full" }],
        correctLatex: "Full Moon"
    },
    {
        id: "sp1_04_q3",
        stage: "SEASONS",
        difficulty: "ADVANCED",
        promptLatex: "Earth's axial tilt in degrees.",
        expressionLatex: "\\theta = \\square^\\circ",
        targetLatex: "23.5",
        slots: [{ id: "t1", labelLatex: "\\theta", placeholder: "Degrees", expected: "23.5" }],
        correctLatex: "23.5"
    }
];

export const generateSolarSystemQuests = (t: any, difficulty: Difficulty): SP104Quest[] => {
    return QUEST_DATA.filter(q => q.stage === "SOLAR_SYSTEM" && q.difficulty === difficulty);
};

export const generateMoonPhasesQuests = (t: any, difficulty: Difficulty): SP104Quest[] => {
    return QUEST_DATA.filter(q => q.stage === "MOON_PHASES" && q.difficulty === difficulty);
};

export const generateSeasonsQuests = (t: any, difficulty: Difficulty): SP104Quest[] => {
    return QUEST_DATA.filter(q => q.stage === "SEASONS" && q.difficulty === difficulty);
};
