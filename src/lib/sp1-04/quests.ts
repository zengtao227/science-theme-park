import { Difficulty, Quest } from "@/hooks/useQuestManager";

export type Stage = "SOLAR_SYSTEM" | "MOON_PHASES" | "SEASONS";
type Translator = (path: string, params?: Record<string, string | number>) => string;

export interface SP104Quest extends Quest {
    stage: Stage;
}

export const QUEST_DATA: SP104Quest[] = [
    {
        id: "sp1_04_q1",
        stage: "SOLAR_SYSTEM",
        difficulty: "BASIC",
        promptLatex: "sp1_04_q1",
        expressionLatex: "Planet = \\square",
        targetLatex: "Jupiter",
        slots: [{ id: "p1", labelLatex: "Planet", placeholder: "", expected: "Jupiter" }],
        correctLatex: "Jupiter"
    },
    {
        id: "sp1_04_q2",
        stage: "MOON_PHASES",
        difficulty: "CORE",
        promptLatex: "sp1_04_q2",
        expressionLatex: "Phase = \\square",
        targetLatex: "Full",
        slots: [{ id: "m1", labelLatex: "Phase", placeholder: "", expected: "Full" }],
        correctLatex: "Full Moon"
    },
    {
        id: "sp1_04_q3",
        stage: "SEASONS",
        difficulty: "ADVANCED",
        promptLatex: "sp1_04_q3",
        expressionLatex: "\\theta = \\square^\\circ",
        targetLatex: "23.5",
        slots: [{ id: "t1", labelLatex: "\\theta", placeholder: "", expected: "23.5" }],
        correctLatex: "23.5"
    }
];

function translateText(t: Translator | undefined, path: string, fallback: string): string {
    if (!t) return fallback;
    const translated = t(path);
    return translated !== path ? translated : fallback;
}

export const generateSolarSystemQuests = (t: Translator | undefined, difficulty: Difficulty): SP104Quest[] => {
    return QUEST_DATA.filter(q => q.stage === "SOLAR_SYSTEM" && q.difficulty === difficulty)
        .map(q => ({
            ...q,
            promptLatex: translateText(t, `sp1_04.prompts.${q.id}`, q.promptLatex),
            targetLatex: translateText(t, "sp1_04.answers.jupiter", q.targetLatex),
            correctLatex: translateText(t, "sp1_04.answers.jupiter", q.correctLatex),
            slots: q.slots.map((slot) => ({
                ...slot,
                labelLatex: translateText(t, "sp1_04.labels.planet", slot.labelLatex),
                placeholder: translateText(t, "sp1_04.placeholders.name", slot.placeholder),
                expected: translateText(t, "sp1_04.answers.jupiter", String(slot.expected)),
            })),
        }));
};

export const generateMoonPhasesQuests = (t: Translator | undefined, difficulty: Difficulty): SP104Quest[] => {
    return QUEST_DATA.filter(q => q.stage === "MOON_PHASES" && q.difficulty === difficulty)
        .map(q => ({
            ...q,
            promptLatex: translateText(t, `sp1_04.prompts.${q.id}`, q.promptLatex),
            targetLatex: translateText(t, "sp1_04.answers.full", q.targetLatex),
            correctLatex: translateText(t, "sp1_04.answers.full_moon", q.correctLatex),
            slots: q.slots.map((slot) => ({
                ...slot,
                labelLatex: translateText(t, "sp1_04.labels.phase", slot.labelLatex),
                placeholder: translateText(t, "sp1_04.placeholders.name", slot.placeholder),
                expected: translateText(t, "sp1_04.answers.full", String(slot.expected)),
            })),
        }));
};

export const generateSeasonsQuests = (t: Translator | undefined, difficulty: Difficulty): SP104Quest[] => {
    return QUEST_DATA.filter(q => q.stage === "SEASONS" && q.difficulty === difficulty)
        .map(q => ({
            ...q,
            promptLatex: translateText(t, `sp1_04.prompts.${q.id}`, q.promptLatex),
            slots: q.slots.map((slot) => ({
                ...slot,
                placeholder: translateText(t, "sp1_04.placeholders.degrees", slot.placeholder),
            })),
        }));
};
