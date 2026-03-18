import { Difficulty } from "@/hooks/useQuestManager";

export type Stage = "REFLECTION" | "REFRACTION" | "LENSES";

export interface SP308Quest {
    id: string;
    difficulty: Difficulty;
    stage: Stage;
    scenario: "reflection" | "refraction" | "lens";
    angle: number;
    n1?: number;
    n2?: number;
    focalLength?: number;
    targetAngle: number;

    promptLatex: string;
    expressionLatex: string;
    targetLatex: string;
    slots: Array<{
        id: string;
        labelLatex: string;
        placeholder: string;
        expected: number | string;
        unit?: string;
    }>;
    correctLatex: string;

    scenarioKey?: string;
}

const round1 = (v: number) => Math.round(v * 10) / 10;
const round2 = (v: number) => Math.round(v * 100) / 100;

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateReflectionQuests(t: any, difficulty: Difficulty): SP308Quest[] {
    const quests: SP308Quest[] = [];
    const stage = "REFLECTION";

    for (let i = 0; i < 60; i++) {
        const id = `RFL-${difficulty.charAt(0)}-${i + 1}`;
        let angle = 30;

        if (difficulty === "BASIC") angle = pick([30, 45, 60]);
        else if (difficulty === "CORE") angle = randomInt(15, 75);
        else if (difficulty === "ADVANCED") angle = randomInt(10, 80);
        else angle = round1(10 + Math.random() * 70);

        quests.push({
            id,
            difficulty,
            stage,
            scenario: "reflection",
            angle,
            targetAngle: angle,
            promptLatex: t("sp3_08.prompts.reflection_law", { angle }),
            expressionLatex: "\\theta_i = \\theta_r",
            targetLatex: "\\theta_r",
            slots: [{ id: "theta_r", labelLatex: "\\theta_r", placeholder: t("sp3_08.placeholders.deg"), expected: angle }],
            correctLatex: `\\theta_r = ${angle}^\\circ`,
        });
    }
    return quests;
}

export function generateRefractionQuests(t: any, difficulty: Difficulty): SP308Quest[] {
    const quests: SP308Quest[] = [];
    const stage = "REFRACTION";
    const materials = [
        { name: "Air→Water", n1: 1.00, n2: 1.33 },
        { name: "Air→Glass", n1: 1.00, n2: 1.50 },
        { name: "Water→Glass", n1: 1.33, n2: 1.50 },
        { name: "Air→Diamond", n1: 1.00, n2: 2.42 },
    ];

    for (let i = 0; i < 60; i++) {
        const id = `RFR-${difficulty.charAt(0)}-${i + 1}`;
        const mat = pick(materials);
        let theta1 = 30;

        if (difficulty === "BASIC") theta1 = 30;
        else if (difficulty === "CORE") theta1 = randomInt(20, 50);
        else theta1 = randomInt(10, 70);

        const theta1Rad = (theta1 * Math.PI) / 180;
        const sinTheta2 = (mat.n1 * Math.sin(theta1Rad)) / mat.n2;
        if (sinTheta2 > 1) { i--; continue; } // Total internal reflection

        const theta2 = Math.asin(sinTheta2) * (180 / Math.PI);

        quests.push({
            id,
            difficulty,
            stage,
            scenario: "refraction",
            angle: theta1,
            n1: mat.n1,
            n2: mat.n2,
            targetAngle: round1(theta2),
            promptLatex: t("sp3_08.prompts.refraction_setup", { material: mat.name, n1: mat.n1, n2: mat.n2, theta1 }),
            expressionLatex: "n_1\\sin\\theta_1 = n_2\\sin\\theta_2",
            targetLatex: "\\theta_2",
            slots: [{ id: "theta_2", labelLatex: "\\theta_2", placeholder: t("sp3_08.placeholders.deg"), expected: round1(theta2) }],
            correctLatex: `\\theta_2 = ${round1(theta2)}^\\circ`,
        });
    }
    return quests;
}

export function generateLensQuests(t: any, difficulty: Difficulty): SP308Quest[] {
    const quests: SP308Quest[] = [];
    const stage = "LENSES";

    for (let i = 0; i < 60; i++) {
        const id = `LNS-${difficulty.charAt(0)}-${i + 1}`;
        let f = 50, u = 150;

        if (difficulty === "BASIC") { f = 50; u = 150; }
        else if (difficulty === "CORE") { f = randomInt(40, 60); u = randomInt(100, 200); }
        else { f = randomInt(30, 80); u = randomInt(80, 250); }

        if (u === f) { i--; continue; }
        const v = (f * u) / (u - f);
        if (v < 0) { i--; continue; } // Virtual image, may be too complex

        quests.push({
            id,
            difficulty,
            stage,
            scenario: "lens",
            angle: 0,
            focalLength: f,
            targetAngle: round1(v),
            promptLatex: t("sp3_08.prompts.lens_setup", { f, u }),
            expressionLatex: "\\frac{1}{f} = \\frac{1}{u} + \\frac{1}{v}",
            targetLatex: "v",
            slots: [
                { id: "v", labelLatex: "v", placeholder: t("sp3_08.placeholders.mm"), expected: round1(v) },
                { id: "m", labelLatex: "m", placeholder: t("sp3_08.placeholders.mag"), expected: round2(-v / u) },
            ],
            correctLatex: `v = ${round1(v)}\\text{mm},\\; m = ${round2(-v / u)}`,
        });
    }
    return quests;
}
