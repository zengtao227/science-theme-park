import { Difficulty } from "@/hooks/useQuestManager";

export type Stage = "POWER_RULE" | "FACTOR_RULE" | "SUM_RULE" | "PRODUCT_RULE" | "QUOTIENT_RULE" | "CHAIN_RULE";

export interface G101Quest {
    id: string;
    difficulty: Difficulty;
    stage: Stage;
    functionType: "power" | "factor" | "sum" | "product" | "quotient" | "chain";
    xPosition: number;
    coefficient?: number;
    exponent?: number;
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

    // Needed by the useQuestManager wrapper
    scenarioKey?: string;
    unit?: string;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generatePowerRuleQuests(gm1_01_t: any, difficulty: Difficulty): G101Quest[] {
    const quests: G101Quest[] = [];
    const stage = "POWER_RULE";

    for (let i = 0; i < 60; i++) {
        const id = `P-${difficulty.charAt(0)}-${i + 1}`;
        let n = 2;
        let x = 1;

        if (difficulty === "BASIC") {
            n = randomInt(2, 3);
            x = pick([1, 2, 3]);
        } else if (difficulty === "CORE") {
            n = randomInt(4, 5);
            x = pick([1, 2, 3]);
        } else if (difficulty === "ADVANCED") {
            n = randomInt(6, 7);
            x = pick([-2, -1, 1, 2, 3]);
        } else { // ELITE
            n = randomInt(4, 8);
            x = pick([1.2, 1.5, 1.8, 2.3, 2.5]);
        }

        const derivative = round2(n * Math.pow(x, n - 1));
        const expr = `f(x)=x^{${n}},\\; x=${x}`;

        quests.push({
            id,
            difficulty,
            stage,
            functionType: "power",
            xPosition: x,
            coefficient: 1,
            exponent: n,
            promptLatex: gm1_01_t.stages.power_rule_prompt_latex,
            expressionLatex: expr,
            targetLatex: "f'(x)",
            slots: [{ id: "derivative", labelLatex: "f'(x)", placeholder: "derivative", expected: derivative }],
            correctLatex: `f'(${x})=${derivative}`,
        });
    }
    return quests;
}

export function generateFactorRuleQuests(gm1_01_t: any, difficulty: Difficulty): G101Quest[] {
    const quests: G101Quest[] = [];
    const stage = "FACTOR_RULE";

    for (let i = 0; i < 60; i++) {
        const id = `F-${difficulty.charAt(0)}-${i + 1}`;
        let a = 2, n = 2, x = 1;

        if (difficulty === "BASIC") {
            a = randomInt(2, 4);
            n = randomInt(2, 3);
            x = pick([1, 2]);
        } else if (difficulty === "CORE") {
            a = randomInt(2, 5);
            n = randomInt(2, 4);
            x = pick([1, 2, 3]);
        } else if (difficulty === "ADVANCED") {
            a = randomInt(2, 6);
            n = randomInt(2, 5);
            x = pick([-3, -2, -1, 1, 2, 3]);
        } else { // ELITE
            a = randomInt(2, 7);
            n = randomInt(2, 6);
            x = pick([1.2, 1.4, 1.5, 1.8, 2.1, 2.5]);
        }

        const derivative = round2(a * n * Math.pow(x, n - 1));
        const expr = `f(x)=${a}x^{${n}},\\; x=${x}`;

        quests.push({
            id,
            difficulty,
            stage,
            functionType: "factor",
            xPosition: x,
            coefficient: a,
            exponent: n,
            promptLatex: gm1_01_t.stages.factor_rule_prompt_latex,
            expressionLatex: expr,
            targetLatex: "f'(x)",
            slots: [{ id: "derivative", labelLatex: "f'(x)", placeholder: "derivative", expected: derivative }],
            correctLatex: `f'(${x})=${derivative}`,
        });
    }
    return quests;
}

export function generateSumRuleQuests(gm1_01_t: any, difficulty: Difficulty): G101Quest[] {
    const quests: G101Quest[] = [];
    const stage = "SUM_RULE";

    for (let i = 0; i < 60; i++) {
        const id = `S-${difficulty.charAt(0)}-${i + 1}`;
        let a = 1, n = 2, b = 1, c = 0, x = 1;

        if (difficulty === "BASIC") {
            a = 1;
            n = randomInt(2, 3);
            b = randomInt(1, 3);
            c = 0;
            x = pick([1, 2]);
        } else if (difficulty === "CORE") {
            a = randomInt(1, 3);
            n = randomInt(2, 3);
            b = randomInt(1, 4);
            c = 0;
            x = pick([1, 2]);
        } else if (difficulty === "ADVANCED") {
            a = randomInt(1, 4);
            n = randomInt(2, 3);
            b = randomInt(1, 8) - 4; // -4 to 4, roughly (can be 0, handled)
            c = pick([-2, -1, 0, 1, 2, 3]);
            x = pick([-2, -1, 1, 2]);
            if (b === 0) b = 1;
        } else { // ELITE
            a = randomInt(1, 4);
            n = randomInt(2, 3);
            b = randomInt(1, 8) - 4;
            c = pick([-3, -2, -1, 0, 1, 2, 3]);
            x = pick([0.8, 1.2, 1.5, 2.1, 2.5]);
            if (b === 0) b = -1;
        }

        const derivative = round2(n * a * Math.pow(x, n - 1) + b);

        let expr = `f(x)=`;
        if (a !== 1) expr += `${a}`;
        expr += `x^{${n}}`;

        if (b !== 0) {
            expr += b > 0 ? `+${b}x` : `${b}x`;
        }
        if (c !== 0) {
            expr += c > 0 ? `+${c}` : `${c}`;
        }
        expr += `,\\; x=${x}`;

        quests.push({
            id,
            difficulty,
            stage,
            functionType: "sum",
            xPosition: x,
            coefficient: a,
            exponent: n,
            promptLatex: gm1_01_t.stages.sum_rule_prompt_latex,
            expressionLatex: expr,
            targetLatex: "f'(x)",
            slots: [{ id: "derivative", labelLatex: "f'(x)", placeholder: "derivative", expected: derivative }],
            correctLatex: `f'(${x})=${derivative}`,
        });
    }
    return quests;
}

export function generateProductRuleQuests(gm1_01_t: any, difficulty: Difficulty): G101Quest[] {
    const quests: G101Quest[] = [];
    const stage = "PRODUCT_RULE";

    for (let i = 0; i < 60; i++) {
        const id = `PR-${difficulty.charAt(0)}-${i + 1}`;
        let x = 0;

        if (difficulty === "BASIC") {
            x = pick([0, Math.PI / 2, Math.PI, 1]);
        } else if (difficulty === "CORE") {
            x = pick([Math.PI / 4, Math.PI / 3, 1.5, 2, 3]);
        } else if (difficulty === "ADVANCED") {
            x = pick([Math.PI / 6, 2 * Math.PI / 3, 0.5, 2.5, 3.5]);
        } else { // ELITE
            x = pick([0.8, 1.2, 2.3, 3.7, 4.2]);
        }

        const derivative = round2(Math.sin(x) + x * Math.cos(x));

        quests.push({
            id,
            difficulty,
            stage,
            functionType: "product",
            xPosition: x,
            promptLatex: gm1_01_t.stages.product_rule_prompt_latex,
            expressionLatex: `f(x)=x\\cdot\\sin(x),\\; x=${round2(x)}`,
            targetLatex: "f'(x)",
            slots: [{ id: "derivative", labelLatex: "f'(x)", placeholder: "derivative", expected: derivative }],
            correctLatex: `f'(${round2(x)})=${derivative}`,
        });
    }
    return quests;
}

export function generateQuotientRuleQuests(gm1_01_t: any, difficulty: Difficulty): G101Quest[] {
    const quests: G101Quest[] = [];
    const stage = "QUOTIENT_RULE";

    for (let i = 0; i < 60; i++) {
        const id = `Q-${difficulty.charAt(0)}-${i + 1}`;
        let x = Math.PI / 2;

        if (difficulty === "BASIC") {
            x = pick([Math.PI / 2, Math.PI / 4, Math.PI / 3, 1]);
        } else if (difficulty === "CORE") {
            x = pick([Math.PI / 6, 2 * Math.PI / 3, 1.5, 2, 2.5]);
        } else if (difficulty === "ADVANCED") {
            x = pick([5 * Math.PI / 6, 0.8, 1.2, 2.3, 2.8]);
        } else { // ELITE
            x = pick([0.9, 1.1, 1.7, 2.2, 2.6]);
        }

        const sinX = Math.sin(x);
        const cosX = Math.cos(x);
        const derivative = round2((sinX - x * cosX) / (sinX * sinX));

        quests.push({
            id,
            difficulty,
            stage,
            functionType: "quotient",
            xPosition: x,
            promptLatex: gm1_01_t.stages.quotient_rule_prompt_latex,
            expressionLatex: `f(x)=\\frac{x}{\\sin(x)},\\; x=${round2(x)}`,
            targetLatex: "f'(x)",
            slots: [{ id: "derivative", labelLatex: "f'(x)", placeholder: "derivative", expected: derivative }],
            correctLatex: `f'(${round2(x)})=${derivative}`,
        });
    }
    return quests;
}

export function generateChainRuleQuests(gm1_01_t: any, difficulty: Difficulty): G101Quest[] {
    const quests: G101Quest[] = [];
    const stage = "CHAIN_RULE";

    for (let i = 0; i < 60; i++) {
        const id = `C-${difficulty.charAt(0)}-${i + 1}`;
        let k = 2;
        let x = 0;

        if (difficulty === "BASIC") {
            k = 2;
            x = pick([0, Math.PI / 2, Math.PI, 1]);
        } else if (difficulty === "CORE") {
            k = pick([2, 3]);
            x = pick([Math.PI / 4, Math.PI / 3, 1, 2]);
        } else if (difficulty === "ADVANCED") {
            k = pick([3, 4]);
            x = pick([Math.PI / 6, Math.PI / 4, 0, 1, 2]);
        } else { // ELITE
            k = pick([4, 5]);
            x = pick([Math.PI / 6, 0.5, 1.2, 1.8, 2.3]);
        }

        const derivative = round2(k * Math.cos(k * x));

        quests.push({
            id,
            difficulty,
            stage,
            functionType: "chain",
            xPosition: x,
            promptLatex: gm1_01_t.stages.chain_rule_prompt_latex,
            expressionLatex: `f(x)=\\sin(${k}x),\\; x=${round2(x)}`,
            targetLatex: "f'(x)",
            slots: [{ id: "derivative", labelLatex: "f'(x)", placeholder: "derivative", expected: derivative }],
            correctLatex: `f'(${round2(x)})=${derivative}`,
        });
    }
    return quests;
}
