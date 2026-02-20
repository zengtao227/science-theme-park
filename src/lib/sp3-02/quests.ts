import { Difficulty } from "@/hooks/useQuestManager";

export type Stage = "NEWTON_1" | "NEWTON_2" | "FRICTION";

export interface SP302Quest {
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

    mass?: number;
    force?: number;
    acceleration?: number;
    frictionCoeff?: number;
    theta?: number;
    velocity?: number;

    scenarioKey?: string;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateNewton1Quests(t: any, difficulty: Difficulty): SP302Quest[] {
    const quests: SP302Quest[] = [];
    const stage = "NEWTON_1";

    for (let i = 0; i < 60; i++) {
        const id = `N1-${difficulty.charAt(0)}-${i + 1}`;
        let m = 10, f = 0, theta = 0, mu = 0;
        let expected = 0;
        let scen = "rest";

        if (difficulty === "BASIC") {
            m = randomInt(5, 15);
            scen = "rest";
            expected = 0;
        } else if (difficulty === "CORE") {
            m = randomInt(10, 20);
            f = randomInt(20, 40);
            scen = "vector_add";
            expected = f; // Simple balance
        } else if (difficulty === "ADVANCED") {
            m = randomInt(10, 20);
            theta = 30;
            mu = 0.3;
            scen = "slope";
            // Component of weight down slope: m*g*sin(theta)
            expected = round2(m * 9.8 * Math.sin(theta * Math.PI / 180));
        } else { // ELITE
            m = round2(10 + Math.random() * 10);
            f = randomInt(50, 100);
            mu = round2(0.2 + Math.random() * 0.3);
            scen = "complex";
            expected = round2(m * 9.8 * mu); // simplified complex target
        }

        quests.push({
            id,
            difficulty,
            stage,
            mass: m,
            force: f,
            theta,
            frictionCoeff: mu,
            promptLatex: `\\text{${t(`sp3_02.prompts.${scen}`, { m, f, theta, mu })}}`,
            expressionLatex: "\\sum \\vec{F} = 0",
            targetLatex: "F_{req}",
            slots: [{ id: "ans", labelLatex: "F", placeholder: "N", expected: expected.toString() }],
            correctLatex: `F = ${expected} \\text{ N}`,
        });
    }
    return quests;
}

export function generateNewton2Quests(t: any, difficulty: Difficulty): SP302Quest[] {
    const quests: SP302Quest[] = [];
    const stage = "NEWTON_2";

    for (let i = 0; i < 60; i++) {
        const id = `N2-${difficulty.charAt(0)}-${i + 1}`;
        let m = 10, a = 2, f = 20, mu = 0;
        let scen = "find_f";

        if (difficulty === "BASIC") {
            m = randomInt(2, 10); a = randomInt(1, 5); f = m * a;
            scen = "find_f";
        } else if (difficulty === "CORE") {
            m = randomInt(10, 30); f = randomInt(50, 150);
            scen = "net_force";
            a = round2(f / m);
        } else if (difficulty === "ADVANCED") {
            m = randomInt(10, 50); mu = 0.2;
            f = randomInt(100, 200);
            scen = "friction";
            const f_net = f - (m * 9.8 * mu);
            a = round2(f_net / m);
        } else { // ELITE
            m = randomInt(50, 200);
            f = randomInt(200, 500);
            scen = "coupled";
            a = round2(f / m); // Placeholder for coupled logic
        }

        quests.push({
            id,
            difficulty,
            stage,
            mass: m,
            force: f,
            acceleration: a,
            frictionCoeff: mu,
            promptLatex: `\\text{${t(`sp3_02.prompts.${scen}`, { m, f, a, mu })}}`,
            expressionLatex: "F = ma",
            targetLatex: "a",
            slots: [{ id: "ans", labelLatex: "a", placeholder: "m/s²", expected: a.toString() }],
            correctLatex: `a = ${a} \\text{ m/s}^2`,
        });
    }
    return quests;
}

export function generateFrictionQuests(t: any, difficulty: Difficulty): SP302Quest[] {
    const quests: SP302Quest[] = [];
    const stage = "FRICTION";

    for (let i = 0; i < 60; i++) {
        const id = `FR-${difficulty.charAt(0)}-${i + 1}`;
        let m = 10, mu = 0.3, f = 0, theta = 0;
        let scen = "static";
        let expected = round2(m * 9.8 * mu);

        if (difficulty === "BASIC") {
            m = randomInt(5, 20); mu = 0.3; scen = "static";
            expected = round2(m * 9.8 * mu);
        } else if (difficulty === "CORE") {
            m = randomInt(10, 30); mu = round2(0.2 + Math.random() * 0.3);
            scen = "max_static";
            expected = round2(m * 9.8 * mu);
        } else if (difficulty === "ADVANCED") {
            m = randomInt(10, 20); mu = 0.3; theta = 30;
            scen = "slope_friction";
            expected = round2(m * 9.8 * Math.cos(theta * Math.PI / 180) * mu);
        } else { // ELITE
            m = round2(15 + Math.random() * 10); mu = round2(0.3 + Math.random() * 0.2);
            f = randomInt(50, 100);
            scen = "critical";
            expected = round2(m * 9.8 * mu);
        }

        quests.push({
            id,
            difficulty,
            stage,
            mass: m,
            frictionCoeff: mu,
            force: f,
            theta,
            promptLatex: `\\text{${t(`sp3_02.prompts.${scen}`, { m, mu, theta, f })}}`,
            expressionLatex: "f = \\mu N",
            targetLatex: "f",
            slots: [{ id: "ans", labelLatex: "f", placeholder: "N", expected: expected.toString() }],
            correctLatex: `f = ${expected} \\text{ N}`,
        });
    }
    return quests;
}
