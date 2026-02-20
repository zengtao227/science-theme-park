import { Difficulty } from "@/hooks/useQuestManager";

export type Stage = "BASIC_PROB" | "BINOMIAL" | "CONDITIONAL" | "MISSION";

export interface G301Quest {
    id: string;
    difficulty: Difficulty;
    stage: Stage;
    favorable?: number;
    total?: number;
    n?: number;
    k?: number;
    p?: number;
    eventA?: number;
    eventB?: number;
    eventAB?: number;
    problemText?: string;
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

    type?: "basic" | "binomial" | "conditional";
    scenarioKey?: string;
}

const round4 = (v: number) => Math.round(v * 10000) / 10000;

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

const binomial = (n: number, k: number): number => {
    if (k > n) return 0;
    if (k === 0 || k === n) return 1;
    let result = 1;
    for (let i = 1; i <= k; i++) {
        result = result * (n - i + 1) / i;
    }
    return result;
};

export function generateBasicProbQuests(gm3_01_t: any, difficulty: Difficulty): G301Quest[] {
    const quests: G301Quest[] = [];
    const stage = "BASIC_PROB";

    for (let i = 0; i < 60; i++) {
        const id = `BP-${difficulty.charAt(0)}-${i + 1}`;
        let favorable = 1, total = 6;
        let problemText = "";

        if (difficulty === "BASIC") {
            const type = pick(["die", "coin", "spin"]);
            if (type === "die") {
                favorable = randomInt(1, 3);
                total = 6;
                problemText = `You roll a standard six-sided die once. What is the probability of rolling one of the first ${favorable} numbers?`;
            } else if (type === "coin") {
                favorable = 1; total = 2;
                problemText = "You flip a fair coin once. What is the probability of getting heads?";
            } else {
                total = pick([8, 10, 12]);
                favorable = randomInt(1, 4);
                problemText = `You spin a wheel divided into ${total} equal sections. What is the probability of landing on one of the ${favorable} marked sections?`;
            }
        } else if (difficulty === "CORE") {
            const type = pick(["sum", "cards"]);
            if (type === "sum") {
                const targetSum = randomInt(4, 10);
                const combos = [];
                for (let d1 = 1; d1 <= 6; d1++) {
                    for (let d2 = 1; d2 <= 6; d2++) {
                        if (d1 + d2 === targetSum) combos.push([d1, d2]);
                    }
                }
                favorable = combos.length;
                total = 36;
                problemText = `You roll two standard dice. What is the probability that their sum equals ${targetSum}?`;
            } else {
                const cardType = pick(["suit", "honors", "red"]);
                total = 52;
                if (cardType === "suit") { favorable = 13; problemText = "What is the probability of drawing a heart?"; }
                else if (cardType === "honors") { favorable = 16; problemText = "What is the probability of drawing an honor card (A, K, Q, J)?"; }
                else { favorable = 26; problemText = "What is the probability of drawing a red card (Heart or Diamond)?"; }
            }
        } else if (difficulty === "ADVANCED") {
            // Implicit conditional or set logic
            const target = randomInt(3, 5);
            favorable = 6 - target; // even numbers > target? maybe too complex to textify simply
            // Let's use simpler text
            total = 6;
            favorable = 2;
            problemText = `You roll a die and it's known to be greater than 3. What is the probability it is a multiple of 3? (Condition: results are {4,5,6})`;
            // Resetting total for text consistency
            total = 3;
            favorable = 1; // Only '6' is a multiple of 3 in {4,5,6}
        } else { // ELITE
            total = 36;
            favorable = 11;
            problemText = "You roll two dice. What is the probability that AT LEAST one shows a 6?";
        }

        const prob = round4(favorable / total);

        quests.push({
            id,
            difficulty,
            stage,
            favorable,
            total,
            problemText,
            promptLatex: gm3_01_t.stages.basic_prob_prompt_latex,
            expressionLatex: `\\text{Favorable: }${favorable},\\;\\text{Total: }${total}`,
            targetLatex: "P(E)",
            slots: [{ id: "probability", labelLatex: "P(E)", placeholder: "0.0000", expected: prob }],
            correctLatex: `P(E)=${prob}`,
        });
    }
    return quests;
}

export function generateBinomialQuests(gm3_01_t: any, difficulty: Difficulty): G301Quest[] {
    const quests: G301Quest[] = [];
    const stage = "BINOMIAL";

    for (let i = 0; i < 60; i++) {
        const id = `BIN-${difficulty.charAt(0)}-${i + 1}`;
        let n = 5, k = 2, p = 0.5;

        if (difficulty === "BASIC") {
            n = randomInt(3, 4);
            k = randomInt(0, n);
            p = 0.5;
        } else if (difficulty === "CORE") {
            n = randomInt(5, 7);
            k = randomInt(1, n - 1);
            p = 0.5;
        } else if (difficulty === "ADVANCED") {
            n = randomInt(5, 10);
            k = randomInt(1, n - 1);
            p = pick([0.3, 0.4, 0.6, 0.7, 0.25]);
        } else { // ELITE
            n = randomInt(8, 15);
            k = randomInt(3, n - 2);
            p = round4(0.2 + Math.random() * 0.6);
        }

        const prob = round4(binomial(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k));
        const problemText = `A Basel research lab runs ${n} trials of a quantum experiment. Each trial has a success probability of ${p}. What is the probability of exactly ${k} successes?`;

        quests.push({
            id,
            difficulty,
            stage,
            n, k, p,
            problemText,
            promptLatex: gm3_01_t.stages.binomial_prompt_latex,
            expressionLatex: `n=${n},\\;k=${k},\\;p=${p}`,
            targetLatex: "P(X=k)",
            slots: [{ id: "probability", labelLatex: "P(X=k)", placeholder: "0.0000", expected: prob }],
            correctLatex: `P(X=${k})=${prob}`,
        });
    }
    return quests;
}

export function generateConditionalQuests(gm3_01_t: any, difficulty: Difficulty): G301Quest[] {
    const quests: G301Quest[] = [];
    const stage = "CONDITIONAL";

    for (let i = 0; i < 60; i++) {
        const id = `COND-${difficulty.charAt(0)}-${i + 1}`;
        let pA = 0.5, pB = 0.6, pAB = 0.3;

        if (difficulty === "BASIC") {
            pB = pick([0.4, 0.5, 0.6, 0.8]);
            const factor = pick([0.3, 0.4, 0.5]);
            pAB = round4(pB * factor);
            pA = round4(pAB + Math.random() * 0.2);
        } else if (difficulty === "CORE") {
            pB = round4(0.4 + Math.random() * 0.4);
            pAB = round4(pB * (0.2 + Math.random() * 0.4));
            pA = round4(pAB + Math.random() * 0.3);
        } else if (difficulty === "ADVANCED") {
            // Bayesian context: P(A|B) = P(B|A)P(A)/P(B)
            // We just give the direct P(A), P(B), P(AnB) for simplicity in this stage's interface
            pB = 0.05 + Math.random() * 0.1; // rare event condition
            pAB = pB * (0.8 + Math.random() * 0.15); // high correlation
            pA = pAB + Math.random() * 0.05;
        } else { // ELITE
            // Independence testing values
            pA = pick([0.2, 0.3, 0.4, 0.5]);
            pB = pick([0.4, 0.5, 0.6]);
            if (Math.random() > 0.5) {
                pAB = round4(pA * pB); // Independent
            } else {
                pAB = round4(pA * pB * (0.7 + Math.random() * 0.6)); // Not independent
            }
        }

        const condProb = round4(pAB / pB);
        const problemText = `In an insurance risk evaluation at Basler Versicherungen, the probability of an event A is ${pA}, and the probability of a risk factor B is ${pB}. The combined probability P(A∩B) is ${pAB}. Find P(A|B).`;

        quests.push({
            id,
            difficulty,
            stage,
            eventA: pA,
            eventB: pB,
            eventAB: pAB,
            problemText,
            promptLatex: gm3_01_t.stages.conditional_prompt_latex,
            expressionLatex: `P(A)=${pA},\\;P(B)=${pB},\\;P(A\\cap B)=${pAB}`,
            targetLatex: "P(A|B)",
            slots: [{ id: "probability", labelLatex: "P(A|B)", placeholder: "0.0000", expected: condProb }],
            correctLatex: `P(A|B)=${condProb}`,
        });
    }
    return quests;
}

export function generateMissionQuests(gm3_01_t: any, difficulty: Difficulty): G301Quest[] {
    const quests: G301Quest[] = [];
    const stage = "MISSION";

    for (let i = 0; i < 60; i++) {
        const type = pick(["basic", "binomial", "conditional"]) as "basic" | "binomial" | "conditional";
        let q: G301Quest;

        if (type === "basic") {
            q = generateBasicProbQuests(gm3_01_t, difficulty)[randomInt(0, 59)];
        } else if (type === "binomial") {
            q = generateBinomialQuests(gm3_01_t, difficulty)[randomInt(0, 59)];
        } else {
            q = generateConditionalQuests(gm3_01_t, difficulty)[randomInt(0, 59)];
        }

        q.id = `M-${difficulty.charAt(0)}-${i + 1}`;
        q.stage = "MISSION";
        q.type = type;
        q.promptLatex = gm3_01_t.stages.mission_prompt_latex;
        q.slots[0].labelLatex = "P";
        quests.push(q);
    }
    return quests;
}
