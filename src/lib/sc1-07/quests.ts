import { Difficulty, Quest } from "@/hooks/useQuestManager";

export type Stage = "RECYCLING" | "GREEN_CHEMISTRY" | "CIRCULAR_ECONOMY";
type Translator = (path: string, params?: Record<string, string | number>) => string;

export interface SC107Quest extends Quest {
    stage: Stage;
}

export const QUEST_DATA: SC107Quest[] = [
    {
        id: "sc1_07_q1",
        stage: "RECYCLING",
        difficulty: "BASIC",
        promptLatex: "sc1_07_q1",
        expressionLatex: "Material = \\square",
        targetLatex: "PET",
        slots: [{ id: "m1", labelLatex: "Material", placeholder: "", expected: "PET" }],
        correctLatex: "PET"
    },
    {
        id: "sc1_07_q2",
        stage: "GREEN_CHEMISTRY",
        difficulty: "CORE",
        promptLatex: "sc1_07_q2",
        expressionLatex: "AE = \\square \\%",
        targetLatex: "100",
        slots: [{ id: "a1", labelLatex: "AE", placeholder: "", expected: "100" }],
        correctLatex: "100\\%"
    },
    {
        id: "sc1_07_q3",
        stage: "CIRCULAR_ECONOMY",
        difficulty: "ADVANCED",
        promptLatex: "sc1_07_q3",
        expressionLatex: "Stage = \\square",
        targetLatex: "Cradle",
        slots: [{ id: "s1", labelLatex: "Stage", placeholder: "", expected: "Cradle" }],
        correctLatex: "Cradle"
    }
];

function translateText(t: Translator | undefined, path: string, fallback: string): string {
    if (!t) return fallback;
    const translated = t(path);
    return translated !== path ? translated : fallback;
}

export const generateRecyclingQuests = (t: Translator | undefined, difficulty: Difficulty): SC107Quest[] => {
    return QUEST_DATA.filter(q => q.stage === "RECYCLING" && q.difficulty === difficulty)
        .map(q => ({
            ...q,
            promptLatex: translateText(t, `sc1_07.prompts.${q.id}`, q.promptLatex),
            targetLatex: translateText(t, "sc1_07.solver.recyclable_plastic_label", q.targetLatex),
            correctLatex: translateText(t, "sc1_07.solver.recyclable_plastic_label", q.correctLatex),
            slots: q.slots.map((slot) => ({
                ...slot,
                labelLatex: translateText(t, "sc1_07.labels.material", slot.labelLatex),
                placeholder: translateText(t, "sc1_07.placeholders.material", slot.placeholder),
                expected: translateText(t, "sc1_07.solver.recyclable_plastic_label", String(slot.expected)),
            })),
        }));
};

export const generateGreenChemistryQuests = (t: Translator | undefined, difficulty: Difficulty): SC107Quest[] => {
    return QUEST_DATA.filter(q => q.stage === "GREEN_CHEMISTRY" && q.difficulty === difficulty)
        .map(q => ({
            ...q,
            promptLatex: translateText(t, `sc1_07.prompts.${q.id}`, q.promptLatex),
            slots: q.slots.map((slot) => ({
                ...slot,
                labelLatex: translateText(t, "sc1_07.labels.atom_economy", slot.labelLatex),
                placeholder: translateText(t, "sc1_07.placeholders.percent", slot.placeholder),
            })),
        }));
};

export const generateCircularEconomyQuests = (t: Translator | undefined, difficulty: Difficulty): SC107Quest[] => {
    return QUEST_DATA.filter(q => q.stage === "CIRCULAR_ECONOMY" && q.difficulty === difficulty)
        .map(q => ({
            ...q,
            promptLatex: translateText(t, `sc1_07.prompts.${q.id}`, q.promptLatex),
            targetLatex: translateText(t, "sc1_07.solver.cradle_label", q.targetLatex),
            correctLatex: translateText(t, "sc1_07.solver.cradle_label", q.correctLatex),
            slots: q.slots.map((slot) => ({
                ...slot,
                labelLatex: translateText(t, "sc1_07.labels.lifecycle_stage", slot.labelLatex),
                placeholder: translateText(t, "sc1_07.placeholders.stage", slot.placeholder),
                expected: translateText(t, "sc1_07.solver.cradle_label", String(slot.expected)),
            })),
        }));
};
