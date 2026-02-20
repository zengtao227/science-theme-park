import { Difficulty } from "@/hooks/useQuestManager";

export type Stage = "FIRST_LAW" | "SECOND_LAW" | "THIRD_LAW";

export interface SP102Quest {
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
        unit?: string;
    }>;
    correctLatex: string;

    // Data for visualizer
    mass?: number;
    friction?: number;
    forceX?: number;

    scenarioKey?: string;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateFirstLawQuests(t: any, difficulty: Difficulty): SP102Quest[] {
    const quests: SP102Quest[] = [];
    const stage = "FIRST_LAW";

    for (let i = 0; i < 60; i++) {
        const id = `F-${difficulty.charAt(0)}-${i + 1}`;
        let m = 5, f_applied = 0, f_friction = 0, v = 2;
        let prompt = "";
        let expected: string | number = 0;

        if (difficulty === "BASIC") {
            m = randomInt(2, 5);
            v = randomInt(2, 5);
            prompt = t("sp1_02.prompts.first_law_basic", { v });
            expected = 0;
        } else if (difficulty === "CORE") {
            m = randomInt(5, 10);
            f_friction = randomInt(5, 15);
            prompt = t("sp1_02.prompts.first_law_core", { f_friction });
            expected = f_friction;
        } else if (difficulty === "ADVANCED") {
            m = randomInt(20, 50);
            f_applied = randomInt(10, 30);
            prompt = t("sp1_02.prompts.first_law_adv", { f_applied });
            expected = f_applied;
        } else { // ELITE
            m = 1000;
            f_friction = randomInt(100, 500);
            prompt = t("sp1_02.prompts.first_law_elite", { f_friction });
            expected = f_friction;
        }

        quests.push({
            id,
            difficulty,
            stage,
            mass: m,
            forceX: f_applied,
            friction: f_friction,
            promptLatex: `\\text{${prompt}}`,
            expressionLatex: "\\vec{F}_{net} = 0 \\Rightarrow \\vec{v} = \\text{const}",
            targetLatex: "F_{net}",
            slots: [{ id: "answer", labelLatex: "F", placeholder: "val", expected }],
            correctLatex: `F = ${expected}`,
        });
    }
    return quests;
}

export function generateSecondLawQuests(t: any, difficulty: Difficulty): SP102Quest[] {
    const quests: SP102Quest[] = [];
    const stage = "SECOND_LAW";

    for (let i = 0; i < 60; i++) {
        const id = `S-${difficulty.charAt(0)}-${i + 1}`;
        let m = 10, a = 2, f = 20;
        let friction = 0;

        if (difficulty === "BASIC") {
            m = randomInt(2, 5); a = randomInt(2, 5); f = m * a;
        } else if (difficulty === "CORE") {
            m = randomInt(5, 15); a = randomInt(1, 4);
            friction = randomInt(1, 5);
            f = m * a + friction;
        } else if (difficulty === "ADVANCED") {
            m = randomInt(20, 100); a = round2(0.5 + Math.random() * 2);
            friction = randomInt(10, 30);
            f = round2(m * a + friction);
        } else { // ELITE
            m = randomInt(100, 1000); a = round2(0.1 + Math.random() * 0.5);
            friction = round2(m * 0.1); // 10% weight friction
            f = round2(m * a + friction);
        }

        quests.push({
            id,
            difficulty,
            stage,
            mass: m,
            forceX: f,
            friction,
            promptLatex: t("sp1_02.prompts.second_law", { m, f, friction }),
            expressionLatex: "F_{net} = ma \\Rightarrow (F_{applied} - F_{friction}) = ma",
            targetLatex: "a",
            slots: [{ id: "answer", labelLatex: "a", placeholder: "m/s²", expected: round2(a) }],
            correctLatex: `a = ${round2(a)} \\text{ m/s}^2`,
        });
    }
    return quests;
}

export function generateThirdLawQuests(t: any, difficulty: Difficulty): SP102Quest[] {
    const quests: SP102Quest[] = [];
    const stage = "THIRD_LAW";

    for (let i = 0; i < 60; i++) {
        const id = `T-${difficulty.charAt(0)}-${i + 1}`;
        let f1 = 50;

        if (difficulty === "BASIC") {
            f1 = randomInt(10, 50);
        } else if (difficulty === "CORE") {
            f1 = randomInt(100, 500);
        } else if (difficulty === "ADVANCED") {
            f1 = randomInt(1000, 5000);
        } else { // ELITE
            f1 = round2(10000 + Math.random() * 50000);
        }

        quests.push({
            id,
            difficulty,
            stage,
            promptLatex: t("sp1_02.prompts.third_law", { f1 }),
            expressionLatex: "\\vec{F}_{AB} = -\\vec{F}_{BA}",
            targetLatex: "F_{reaction}",
            slots: [{ id: "answer", labelLatex: "F_{reac}", placeholder: "N", expected: f1 }],
            correctLatex: `F_{reac} = ${f1} \\text{ N}`,
        });
    }
    return quests;
}
