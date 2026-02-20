import { Difficulty } from "@/hooks/useQuestManager";

export type Stage = "BASICS" | "OPERATIONS" | "POLAR";

export interface G401Quest {
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
        expected: number;
        unit?: string;
    }>;
    correctLatex: string;
    z1?: { re: number; im: number };
    z2?: { re: number; im: number };
    operation?: "add" | "multiply" | "power" | "polar";
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

export function generateBasicsQuests(t: any, difficulty: Difficulty): G401Quest[] {
    const quests: G401Quest[] = [];
    const stage = "BASICS";

    for (let i = 0; i < 60; i++) {
        const id = `B-${difficulty.charAt(0)}-${i + 1}`;
        let re = 3, im = 4;

        if (difficulty === "BASIC") {
            re = randomInt(1, 5); im = randomInt(1, 5);
        } else if (difficulty === "CORE") {
            const pair = pick([[5, 12], [8, 15], [7, 24], [9, 12]]);
            re = pair[0] * (Math.random() > 0.5 ? 1 : -1);
            im = pair[1] * (Math.random() > 0.5 ? 1 : -1);
        } else if (difficulty === "ADVANCED") {
            re = round2(Math.random() * 8 - 4);
            im = round2(Math.random() * 8 - 4);
        } else { // ELITE
            const angle = Math.random() * Math.PI * 2;
            re = round2(Math.cos(angle));
            im = round2(Math.sin(angle));
        }

        const r = Math.sqrt(re * re + im * im);

        quests.push({
            id,
            difficulty,
            stage,
            z1: { re, im },
            operation: "polar",
            promptLatex: t?.stages?.basics_prompt || "Calculate magnitude",
            expressionLatex: `z = ${re} + ${im}i`,
            targetLatex: t?.stages?.basics_target || "Find |z|",
            slots: [{ id: "magnitude", labelLatex: "|z|", placeholder: "val", expected: round2(r) }],
            correctLatex: `|z| = ${round2(r)}`,
        });
    }
    return quests;
}

export function generateOperationsQuests(t: any, difficulty: Difficulty): G401Quest[] {
    const quests: G401Quest[] = [];
    const stage = "OPERATIONS";

    for (let i = 0; i < 60; i++) {
        const id = `O-${difficulty.charAt(0)}-${i + 1}`;
        let z1 = { re: 2, im: 3 }, z2 = { re: 1, im: 4 };
        let op: "add" | "multiply" = "add";

        if (difficulty === "BASIC") {
            z1 = { re: randomInt(1, 4), im: randomInt(1, 4) };
            z2 = { re: randomInt(1, 4), im: randomInt(1, 4) };
            op = "add";
        } else if (difficulty === "CORE") {
            z1 = { re: randomInt(1, 4), im: randomInt(1, 4) };
            z2 = { re: randomInt(1, 4), im: randomInt(1, 4) };
            op = Math.random() > 0.5 ? "add" : "multiply";
        } else if (difficulty === "ADVANCED") {
            z1 = { re: round2(Math.random() * 5 - 2.5), im: round2(Math.random() * 5 - 2.5) };
            z2 = { re: round2(Math.random() * 5 - 2.5), im: round2(Math.random() * 5 - 2.5) };
            op = "multiply";
        } else { // ELITE
            z1 = { re: round2(Math.random() * 2 - 1), im: round2(Math.random() * 2 - 1) };
            z2 = { re: round2(Math.random() * 2 - 1), im: round2(Math.random() * 2 - 1) };
            op = "multiply";
        }

        let resultRe, resultIm;
        if (op === "add") {
            resultRe = z1.re + z2.re; resultIm = z1.im + z2.im;
        } else {
            resultRe = z1.re * z2.re - z1.im * z2.im;
            resultIm = z1.re * z2.im + z1.im * z2.re;
        }

        const opSymbol = op === "add" ? "+" : "\\times";

        quests.push({
            id,
            difficulty,
            stage,
            z1, z2,
            operation: op,
            promptLatex: op === "add" ? (t?.stages?.operations_add || "Add") : (t?.stages?.operations_multiply || "Multiply"),
            expressionLatex: `z_1 = ${z1.re} + ${z1.im}i,\\; z_2 = ${z2.re} + ${z2.im}i`,
            targetLatex: `z_1 ${opSymbol} z_2`,
            slots: [
                { id: "re", labelLatex: "\\text{Re}", placeholder: "real", expected: round2(resultRe) },
                { id: "im", labelLatex: "\\text{Im}", placeholder: "imag", expected: round2(resultIm) },
            ],
            correctLatex: `z = ${round2(resultRe)} + ${round2(resultIm)}i`,
        });
    }
    return quests;
}

export function generatePolarQuests(t: any, difficulty: Difficulty): G401Quest[] {
    const quests: G401Quest[] = [];
    const stage = "POLAR";

    for (let i = 0; i < 60; i++) {
        const id = `P-${difficulty.charAt(0)}-${i + 1}`;
        let re = 1, im = 1, n = 2;

        if (difficulty === "BASIC") {
            re = pick([1, 0, -1]); im = pick([1, 0, -1]);
            if (re === 0 && im === 0) re = 1;
            n = 2;
        } else if (difficulty === "CORE") {
            re = pick([1, -1]); im = pick([1, -1]);
            n = 3;
        } else if (difficulty === "ADVANCED") {
            re = round2(Math.random() * 2);
            im = round2(Math.random() * 2);
            n = randomInt(2, 4);
        } else { // ELITE
            const angle = (Math.PI / randomInt(2, 6));
            re = round2(Math.cos(angle));
            im = round2(Math.sin(angle));
            n = randomInt(4, 6);
        }

        // Complex power (r*e^it)^n = r^n * e^(i*n*t)
        const r = Math.sqrt(re * re + im * im);
        const theta = Math.atan2(im, re);
        const resultR = Math.pow(r, n);
        const resultTheta = theta * n;
        const resultRe = resultR * Math.cos(resultTheta);
        const resultIm = resultR * Math.sin(resultTheta);

        quests.push({
            id,
            difficulty,
            stage,
            z1: { re, im },
            power: n,
            operation: "power",
            promptLatex: t?.stages?.polar_prompt || "Calculate power",
            expressionLatex: `z = (${re} + ${im}i), \\text{ find } z^{${n}}`,
            targetLatex: `z^{${n}}`,
            slots: [
                { id: "re", labelLatex: "\\text{Re}", placeholder: "real", expected: round2(resultRe) },
                { id: "im", labelLatex: "\\text{Im}", placeholder: "imag", expected: round2(resultIm) },
            ],
            correctLatex: `z^{${n}} = ${round2(resultRe)} + ${round2(resultIm)}i`,
        });
    }
    return quests;
}
