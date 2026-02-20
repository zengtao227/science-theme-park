import { Difficulty } from "@/hooks/useQuestManager";

export type Stage = "ANTIDERIVATIVE" | "DEFINITE_INTEGRAL" | "APPLICATION";

export interface GM102Quest {
    id: string;
    difficulty: Difficulty;
    stage: Stage;
    functionCoeffs: number[];
    lowerBound?: number;
    upperBound?: number;
    integrationConstant?: number;
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

    // Needed for visualization
    context?: "line" | "parabola" | "between" | "volume" | "work";
    upperCoeffs?: number[];

    // Needed by the useQuestManager wrapper
    scenarioKey?: string;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

const buildExpr = (coeffs: number[]) => {
    const terms: string[] = [];
    for (let i = coeffs.length - 1; i >= 0; i--) {
        const coeff = coeffs[i];
        if (coeff === 0) continue;

        let term = "";
        if (i === 0) {
            term = `${coeff}`;
        } else if (i === 1) {
            term = coeff === 1 ? "x" : coeff === -1 ? "-x" : `${coeff}x`;
        } else {
            term = coeff === 1 ? `x^{${i}}` : coeff === -1 ? `-x^{${i}}` : `${coeff}x^{${i}}`;
        }

        if (terms.length > 0 && coeff > 0) {
            terms.push(`+${term}`);
        } else {
            terms.push(term);
        }
    }
    return terms.length === 0 ? "0" : terms.join("");
};

const getAntiderivativeAt = (coeffs: number[], x: number) => {
    let sum = 0;
    for (let i = 0; i < coeffs.length; i++) {
        sum += (coeffs[i] * Math.pow(x, i + 1)) / (i + 1);
    }
    return sum;
};

export function generateAntiderivativeQuests(t: any, difficulty: Difficulty): GM102Quest[] {
    const quests: GM102Quest[] = [];
    const stage = "ANTIDERIVATIVE";

    for (let i = 0; i < 60; i++) {
        const id = `A-${difficulty.charAt(0)}-${i + 1}`;
        let coeffs: number[] = [0, 1]; // default ∫x dx

        if (difficulty === "BASIC") {
            const n = randomInt(1, 4);
            coeffs = new Array(n + 1).fill(0);
            coeffs[n] = 1;
        } else if (difficulty === "CORE") {
            const n = randomInt(1, 3);
            coeffs = new Array(n + 1).fill(0);
            coeffs[n] = randomInt(2, 5);
            if (Math.random() > 0.5) {
                coeffs[n - 1] = randomInt(1, 4);
            }
        } else if (difficulty === "ADVANCED") {
            const n = 2;
            coeffs = [randomInt(-4, 4), randomInt(-4, 4), randomInt(1, 4)];
            if (coeffs[0] === 0) coeffs[0] = 1;
        } else { // ELITE
            const n = 3;
            coeffs = [randomInt(-3, 3), randomInt(-3, 3), randomInt(-3, 3), randomInt(1, 3)];
        }

        const answer = round2(getAntiderivativeAt(coeffs, 1));
        const expr = buildExpr(coeffs);

        quests.push({
            id,
            difficulty,
            stage,
            functionCoeffs: coeffs,
            promptLatex: t("gm1_02.prompts.find_antiderivative", { expr }),
            expressionLatex: `\\int (${expr}) dx`,
            targetLatex: "F(1)",
            slots: [{ id: "answer", labelLatex: "F(1)", placeholder: "value", expected: answer }],
            correctLatex: `F(1) = ${answer}`,
        });
    }
    return quests;
}

export function generateDefiniteIntegralQuests(t: any, difficulty: Difficulty): GM102Quest[] {
    const quests: GM102Quest[] = [];
    const stage = "DEFINITE_INTEGRAL";

    for (let i = 0; i < 60; i++) {
        const id = `D-${difficulty.charAt(0)}-${i + 1}`;
        let coeffs: number[] = [0, 1];
        let a = 0, b = 1;

        if (difficulty === "BASIC") {
            const n = randomInt(1, 3);
            coeffs = new Array(n + 1).fill(0);
            coeffs[n] = 1;
            a = 0;
            b = randomInt(1, 2);
        } else if (difficulty === "CORE") {
            const n = randomInt(1, 2);
            a = pick([-1, 0, 1]);
            b = a + randomInt(1, 2);
            coeffs = new Array(n + 1).fill(0);
            coeffs[n] = randomInt(1, 3);
            coeffs[0] = randomInt(0, 2);
        } else if (difficulty === "ADVANCED") {
            a = randomInt(-2, 1);
            b = a + randomInt(1, 3);
            coeffs = [randomInt(-2, 2), randomInt(-2, 2), randomInt(1, 2)];
        } else { // ELITE
            a = randomInt(-1, 1);
            b = a + randomInt(2, 3);
            coeffs = [randomInt(-2, 2), randomInt(-2, 2), randomInt(-2, 2), randomInt(1, 2)];
        }

        const answer = round2(getAntiderivativeAt(coeffs, b) - getAntiderivativeAt(coeffs, a));
        const expr = buildExpr(coeffs);

        quests.push({
            id,
            difficulty,
            stage,
            functionCoeffs: coeffs,
            lowerBound: a,
            upperBound: b,
            promptLatex: t("gm1_02.prompts.evaluate_integral", { expr, a, b }),
            expressionLatex: `\\int_{${a}}^{${b}} (${expr}) dx`,
            targetLatex: "\\text{Result}",
            slots: [{ id: "answer", labelLatex: "\\text{Result}", placeholder: "value", expected: answer }],
            correctLatex: `\\int_{${a}}^{${b}} = ${answer}`,
        });
    }
    return quests;
}

export function generateApplicationQuests(t: any, difficulty: Difficulty): GM102Quest[] {
    const quests: GM102Quest[] = [];
    const stage = "APPLICATION";

    for (let i = 0; i < 60; i++) {
        const id = `AP-${difficulty.charAt(0)}-${i + 1}`;
        let coeffs: number[] = [0, 1];
        let a = 0, b = 1;
        let context: GM102Quest["context"] = "line";
        let upperCoeffs: number[] | undefined = undefined;

        if (difficulty === "BASIC") {
            context = "line";
            a = 0;
            b = randomInt(2, 4);
            coeffs = [randomInt(0, 2), randomInt(1, 2)];
        } else if (difficulty === "CORE") {
            context = "parabola";
            a = 0;
            b = randomInt(1, 2);
            coeffs = [randomInt(0, 1), 0, randomInt(1, 2)];
        } else if (difficulty === "ADVANCED") {
            context = "between";
            a = 0;
            b = randomInt(1, 2);
            // y_upper = C, y_lower = x^2
            const C = randomInt(2, 5);
            upperCoeffs = [C];
            coeffs = [0, 0, 1];
        } else { // ELITE
            const type = Math.random();
            if (type < 0.5) {
                context = "volume";
                a = 0;
                b = pick([1, 2]);
                coeffs = [0, randomInt(1, 2)]; // y=kx or similar
            } else {
                context = "work";
                a = 0;
                b = randomInt(2, 5);
                coeffs = [randomInt(1, 5), randomInt(1, 3)]; // F(x) = kx + c
            }
        }

        let answer: number;
        const expr = buildExpr(coeffs);

        if (context === "between" && upperCoeffs) {
            const area1 = getAntiderivativeAt(upperCoeffs, b) - getAntiderivativeAt(upperCoeffs, a);
            const area2 = getAntiderivativeAt(coeffs, b) - getAntiderivativeAt(coeffs, a);
            answer = round2(area1 - area2);
        } else if (context === "volume") {
            // V = pi * integral(f^2)
            // If f = kx, f^2 = k^2 x^2
            // coeffs is [0, k]
            const k = coeffs[1];
            const squaredCoeffs = [0, 0, k * k];
            const integral = getAntiderivativeAt(squaredCoeffs, b) - getAntiderivativeAt(squaredCoeffs, a);
            answer = round2(Math.PI * integral);
        } else {
            answer = round2(getAntiderivativeAt(coeffs, b) - getAntiderivativeAt(coeffs, a));
        }

        quests.push({
            id,
            difficulty,
            stage,
            functionCoeffs: coeffs,
            upperCoeffs,
            context,
            lowerBound: a,
            upperBound: b,
            promptLatex: t("gm1_02.prompts.find_area", { expr, a, b }),
            expressionLatex: `f(x) = ${expr}`,
            targetLatex: context === "volume" ? "V" : context === "work" ? "W" : "\\text{Area}",
            slots: [{
                id: "answer",
                labelLatex: context === "volume" ? "V" : context === "work" ? "W" : "\\text{Area}",
                placeholder: "value",
                expected: answer
            }],
            correctLatex: `${context === "volume" ? "V" : context === "work" ? "W" : "\\text{Area}"} = ${answer}`,
        });
    }
    return quests;
}
