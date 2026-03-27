import { Difficulty } from "@/hooks/useQuestManager";

export type Stage = "POTENTIAL" | "KINETIC" | "POWER";

export interface SP303Quest {
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
    height?: number;
    velocity?: number;
    force?: number;
    distance?: number;
    time?: number;
    power?: number;

    scenarioKey?: string;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generatePotentialQuests(t: any, difficulty: Difficulty): SP303Quest[] {
    const quests: SP303Quest[] = [];
    const stage = "POTENTIAL";

    for (let i = 0; i < 60; i++) {
        const id = `EP-${difficulty.charAt(0)}-${i + 1}`;
        let m = 2, h = 10;
        let expected = 196;
        let scen = "basic_ep";

        if (difficulty === "BASIC") {
            m = randomInt(1, 10); h = randomInt(5, 15);
            expected = round2(m * 9.8 * h);
        } else if (difficulty === "CORE") {
            m = randomInt(10, 50); h = randomInt(10, 30);
            scen = "rhine_hydro";
            expected = round2(m * 9.8 * h);
        } else if (difficulty === "ADVANCED") {
            m = randomInt(50, 100); h = randomInt(30, 60);
            scen = "total_energy";
            expected = round2(m * 9.8 * h + 0.5 * m * 100); // Ep + Ek(v=10)
        } else { // ELITE
            m = randomInt(100, 1000); h = randomInt(50, 100);
            scen = "rhine_power_station";
            expected = round2(m * 9.8 * h);
        }

        quests.push({
            id,
            difficulty,
            stage,
            mass: m,
            height: h,
            velocity: scen === "total_energy" ? 10 : undefined,
            promptLatex: t(`sp3_03.prompts.${scen}`, { m, h, v: 10, g: 9.8 }),
            expressionLatex: "E_p = mgh",
            targetLatex: "E_p",
            slots: [{ id: "ans", labelLatex: "E_p \\text{ (J)}", placeholder: t("sp3_03.placeholders.joules"), expected: expected.toString() }],
            correctLatex: `E_p = ${expected} \\text{ J}`,
            scenarioKey: scen,
        });
    }
    return quests;
}

export function generateKineticQuests(t: any, difficulty: Difficulty): SP303Quest[] {
    const quests: SP303Quest[] = [];
    const stage = "KINETIC";

    for (let i = 0; i < 60; i++) {
        const id = `EK-${difficulty.charAt(0)}-${i + 1}`;
        let m = 4, v = 5, h = 0, f = 0, d = 0;
        let expected = 50;
        let scen = "basic_ek";

        if (difficulty === "BASIC") {
            m = randomInt(1, 10); v = randomInt(2, 10);
            expected = round2(0.5 * m * v * v);
        } else if (difficulty === "CORE") {
            m = randomInt(1000, 5000); v = randomInt(10, 20);
            scen = "tram_braking";
            expected = round2(0.5 * m * v * v);
        } else if (difficulty === "ADVANCED") {
            m = randomInt(5, 20); v = 0; h = randomInt(10, 30);
            scen = "velocity_at_bottom";
            expected = round2(Math.sqrt(2 * 9.8 * h));
        } else { // ELITE
            m = randomInt(50, 100); v = randomInt(20, 40);
            f = randomInt(10, 50); d = randomInt(50, 150);
            scen = "work_energy";
            expected = round2(0.5 * m * v * v + f * d);
        }

        quests.push({
            id,
            difficulty,
            stage,
            mass: m,
            velocity: v,
            height: difficulty === "ADVANCED" ? h : undefined,
            force: difficulty === "ELITE" ? f : undefined,
            distance: difficulty === "ELITE" ? d : undefined,
            promptLatex: t(`sp3_03.prompts.${scen}`, { m, v, h, f, d }),
            expressionLatex: "E_k = \\frac{1}{2}mv^{2}",
            targetLatex: expected > 50 ? (scen === "velocity_at_bottom" ? "v" : "E_k") : "E_k",
            slots: [{ id: "ans", labelLatex: "Result", placeholder: t("sp3_03.placeholders.value"), expected: expected.toString() }],
            correctLatex: `Result = ${expected}`,
            scenarioKey: scen,
        });
    }
    return quests;
}

export function generatePowerQuests(t: any, difficulty: Difficulty): SP303Quest[] {
    const quests: SP303Quest[] = [];
    const stage = "POWER";

    for (let i = 0; i < 60; i++) {
        const id = `P-${difficulty.charAt(0)}-${i + 1}`;
        let f = 100, d = 5, time = 10, m = 0, h = 0;
        let expected = 50;
        let scen = "basic_work";

        if (difficulty === "BASIC") {
            f = randomInt(10, 200); d = randomInt(2, 20);
            expected = f * d;
            scen = "basic_work";
        } else if (difficulty === "CORE") {
            f = randomInt(100, 1000); d = randomInt(10, 50); time = randomInt(5, 20);
            expected = round2((f * d) / time);
            scen = "basic_power";
        } else if (difficulty === "ADVANCED") {
            m = randomInt(5, 50); h = randomInt(5, 20); time = randomInt(5, 10);
            scen = "power_lifting";
            expected = round2((m * 9.8 * h) / time);
        } else { // ELITE
            m = randomInt(100, 500); h = randomInt(20, 50); time = randomInt(10, 30);
            scen = "rhine_power_station";
            expected = round2((m * 9.8 * h) / time);
        }

        quests.push({
            id,
            difficulty,
            stage,
            force: f,
            distance: d,
            time,
            mass: difficulty === "ADVANCED" || difficulty === "ELITE" ? m : undefined,
            height: difficulty === "ADVANCED" || difficulty === "ELITE" ? h : undefined,
            promptLatex: t(`sp3_03.prompts.${scen}`, { f, d, t: time, m, h }),
            expressionLatex: "W = Fd, P = W/t",
            targetLatex: scen === "basic_work" ? "W" : "P",
            slots: [{ id: "ans", labelLatex: "Value", placeholder: t("sp3_03.placeholders.j_or_w"), expected: expected.toString() }],
            correctLatex: `Result = ${expected}`,
            scenarioKey: scen,
        });
    }
    return quests;
}
