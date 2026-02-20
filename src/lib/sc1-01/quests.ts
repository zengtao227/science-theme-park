import { Difficulty } from "@/hooks/useQuestManager";
import { Substance } from "@/components/chamber/sc1-01/LabCanvas";

export type Stage = "IDENTIFY" | "PROPERTIES" | "REACTIONS" | "EXPERIMENT";

export interface SC101Quest {
    id: string;
    difficulty: Difficulty;
    stage: Stage;
    substances: Substance[];
    correctIdentifications: Record<string, Substance>;
    experimentKey?: string;
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

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function generateIdentifyQuests(t: any, difficulty: Difficulty): SC101Quest[] {
    const quests: SC101Quest[] = [];
    const subs: Substance[] = ["soda", "salt", "starch"];

    for (let i = 0; i < 60; i++) {
        const arrangement = shuffle(subs);
        const id = `ID-${difficulty.charAt(0)}-${i + 1}`;

        quests.push({
            id,
            difficulty,
            stage: "IDENTIFY",
            substances: subs,
            correctIdentifications: {
                A: arrangement[0],
                B: arrangement[1],
                C: arrangement[2],
            },
            promptLatex: `\\text{${t("sc1_01.prompts.identify_powders")}}`,
            expressionLatex: `\\text{${t("sc1_01.prompts.use_tools")}}`,
            targetLatex: "\\text{A, B, C}",
            slots: [
                { id: "A", labelLatex: "\\text{A}", placeholder: "...", expected: arrangement[0] },
                { id: "B", labelLatex: "\\text{B}", placeholder: "...", expected: arrangement[1] },
                { id: "C", labelLatex: "\\text{C}", placeholder: "...", expected: arrangement[2] },
            ],
            correctLatex: `\\text{A=${arrangement[0]}, B=${arrangement[1]}, C=${arrangement[2]}}`,
        });
    }
    return quests;
}

export function generatePropertiesQuests(t: any, difficulty: Difficulty): SC101Quest[] {
    const quests: SC101Quest[] = [];
    const props = [
        { key: "basic_0", answer: "soda" },
        { key: "basic_1", answer: "starch" },
        { key: "basic_2", answer: "salt" },
        { key: "core_0", answer: "soda" },
        { key: "core_1", answer: "starch" },
        { key: "core_2", answer: "salt" },
        { key: "advanced_0", answer: "soda" },
        { key: "advanced_1", answer: "salt" },
        { key: "advanced_2", answer: "starch" },
        { key: "elite_0", answer: "soda" },
        { key: "elite_1", answer: "salt" },
        { key: "elite_2", answer: "starch" },
    ];

    for (let i = 0; i < 60; i++) {
        const p = props[randomInt(0, props.length - 1)];
        const id = `PR-${difficulty.charAt(0)}-${i + 1}`;

        quests.push({
            id,
            difficulty,
            stage: "PROPERTIES",
            substances: ["soda", "salt", "starch"],
            correctIdentifications: {},
            promptLatex: `\\text{${t(`sc1_01.properties_q.${p.key}`)}}`,
            expressionLatex: `\\text{${t("sc1_01.prompts.test_observe")}}`,
            targetLatex: "\\text{Substance}",
            slots: [{ id: "answer", labelLatex: "\\text{Subst}", placeholder: "...", expected: p.answer }],
            correctLatex: `\\text{${p.answer}}`,
        });
    }
    return quests;
}

export function generateReactionsQuests(t: any, difficulty: Difficulty): SC101Quest[] {
    const quests: SC101Quest[] = [];
    const rxns = [
        { key: "basic_0", product: "CO_2" },
        { key: "basic_1", product: "Blue-black" },
        { key: "core_0", product: "NaCl" },
        { key: "advanced_0", product: "Na_2SO_4" },
        { key: "elite_0", product: "CO_2" },
    ];

    for (let i = 0; i < 60; i++) {
        const r = rxns[randomInt(0, rxns.length - 1)];
        const id = `RX-${difficulty.charAt(0)}-${i + 1}`;

        quests.push({
            id,
            difficulty,
            stage: "REACTIONS",
            substances: ["soda", "salt", "starch"],
            correctIdentifications: {},
            promptLatex: `\\text{${t(`sc1_01.reactions_q.${r.key}`)}}`,
            expressionLatex: `\\text{Reaction Sequence}`,
            targetLatex: "\\text{Product}",
            slots: [{ id: "product", labelLatex: "\\text{Prod}", placeholder: "...", expected: r.product.toLowerCase() }],
            correctLatex: `\\text{${r.product}}`,
        });
    }
    return quests;
}
