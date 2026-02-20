import { Difficulty, Quest } from "@/hooks/useQuestManager";

export type Stage = "RECYCLING" | "GREEN_CHEMISTRY" | "CIRCULAR_ECONOMY";

export interface SC107Quest extends Quest {
    stage: Stage;
}

export const QUEST_DATA: SC107Quest[] = [
    {
        id: "sc1_07_q1",
        stage: "RECYCLING",
        difficulty: "BASIC",
        promptLatex: "Identify the recyclable plastic.",
        expressionLatex: "Material = \\square",
        targetLatex: "PET",
        slots: [{ id: "m1", labelLatex: "Material", placeholder: "Type", expected: "PET" }],
        correctLatex: "PET"
    },
    {
        id: "sc1_07_q2",
        stage: "GREEN_CHEMISTRY",
        difficulty: "CORE",
        promptLatex: "Calculate ideal atom economy.",
        expressionLatex: "AE = \\square \\%",
        targetLatex: "100",
        slots: [{ id: "a1", labelLatex: "AE", placeholder: "%", expected: "100" }],
        correctLatex: "100\\%"
    },
    {
        id: "sc1_07_q3",
        stage: "CIRCULAR_ECONOMY",
        difficulty: "ADVANCED",
        promptLatex: "Identify primary lifecycle start.",
        expressionLatex: "Stage = \\square",
        targetLatex: "Cradle",
        slots: [{ id: "s1", labelLatex: "Stage", placeholder: "Name", expected: "Cradle" }],
        correctLatex: "Cradle"
    }
];

export const generateRecyclingQuests = (t: any, difficulty: Difficulty): SC107Quest[] => {
    return QUEST_DATA.filter(q => q.stage === "RECYCLING" && q.difficulty === difficulty);
};

export const generateGreenChemistryQuests = (t: any, difficulty: Difficulty): SC107Quest[] => {
    return QUEST_DATA.filter(q => q.stage === "GREEN_CHEMISTRY" && q.difficulty === difficulty);
};

export const generateCircularEconomyQuests = (t: any, difficulty: Difficulty): SC107Quest[] => {
    return QUEST_DATA.filter(q => q.stage === "CIRCULAR_ECONOMY" && q.difficulty === difficulty);
};
