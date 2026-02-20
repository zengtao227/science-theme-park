import { Difficulty } from "@/hooks/useQuestManager";

export type Stage = "NAVIGATION" | "DOT" | "MISSION";

export interface G201Quest {
    id: string;
    difficulty: Difficulty;
    stage: Stage;
    pointA?: [number, number, number];
    pointB?: [number, number, number];
    vectorV?: [number, number, number];
    vectorW?: [number, number, number];
    showDotProduct?: boolean;
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
}

const round2 = (v: number) => Math.round(v * 100) / 100;

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateNavigationQuests(gm2_01_t: any, difficulty: Difficulty): G201Quest[] {
    const quests: G201Quest[] = [];
    const stage = "NAVIGATION";

    for (let i = 0; i < 60; i++) {
        const id = `N-${difficulty.charAt(0)}-${i + 1}`;
        let A: [number, number, number] = [0, 0, 0];
        let B: [number, number, number] = [0, 0, 0];

        if (difficulty === "BASIC") {
            A = [0, 0, 0];
            const axis = pick([0, 1, 2]);
            B = [0, 0, 0];
            B[axis] = randomInt(3, 8);
        } else if (difficulty === "CORE") {
            A = [randomInt(0, 2), randomInt(0, 2), 0];
            B = [A[0] + randomInt(2, 5), A[1] + randomInt(2, 5), 0];
            if (Math.random() > 0.7) B[2] = randomInt(2, 4);
        } else if (difficulty === "ADVANCED") {
            A = [randomInt(1, 4), randomInt(1, 4), randomInt(1, 4)];
            B = [A[0] + randomInt(2, 6), A[1] + randomInt(2, 6), A[2] + randomInt(2, 6)];
        } else { // ELITE
            A = [round2(Math.random() * 5), round2(Math.random() * 5), round2(Math.random() * 5)];
            B = [round2(A[0] + Math.random() * 10 + 2), round2(A[1] + Math.random() * 10 + 2), round2(A[2] + Math.random() * 10 + 2)];
        }

        const v = [B[0] - A[0], B[1] - A[1], B[2] - A[2]];
        const magnitude = round2(Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2));

        quests.push({
            id,
            difficulty,
            stage,
            pointA: A,
            pointB: B,
            promptLatex: gm2_01_t.stages.navigation_prompt_latex,
            expressionLatex: `A(${A.join(',')})\\;\\text{to}\\;B(${B.join(',')})`,
            targetLatex: "\\vec v,\\;|\\vec v|",
            slots: [
                { id: "vx", labelLatex: "v_x", placeholder: "x", expected: round2(v[0]) },
                { id: "vy", labelLatex: "v_y", placeholder: "y", expected: round2(v[1]) },
                { id: "vz", labelLatex: "v_z", placeholder: "z", expected: round2(v[2]) },
                { id: "magnitude", labelLatex: "|\\vec v|", placeholder: "magnitude", expected: magnitude },
            ],
            correctLatex: `\\vec v=(${round2(v[0])},${round2(v[1])},${round2(v[2])}),\\;|\\vec v|=${magnitude}`,
        });
    }
    return quests;
}

export function generateDotQuests(gm2_01_t: any, difficulty: Difficulty): G201Quest[] {
    const quests: G201Quest[] = [];
    const stage = "DOT";

    for (let i = 0; i < 60; i++) {
        const id = `D-${difficulty.charAt(0)}-${i + 1}`;
        let v: [number, number, number] = [0, 0, 0];
        let w: [number, number, number] = [0, 0, 0];

        if (difficulty === "BASIC") {
            const axis = pick([0, 1, 2]);
            v = [0, 0, 0]; v[axis] = randomInt(2, 5);
            w = [0, 0, 0]; w[axis] = randomInt(2, 5);
            if (Math.random() > 0.5) {
                const axis2 = (axis + 1) % 3;
                w = [0, 0, 0]; w[axis2] = randomInt(2, 5);
            }
        } else if (difficulty === "CORE") {
            v = [randomInt(1, 4), randomInt(1, 4), 0];
            w = [randomInt(1, 4), randomInt(1, 4), 0];
        } else if (difficulty === "ADVANCED") {
            v = [randomInt(-4, 4), randomInt(-4, 4), randomInt(1, 4)];
            w = [randomInt(-4, 4), randomInt(-4, 4), randomInt(1, 4)];
        } else { // ELITE
            v = [round2(Math.random() * 8 - 4), round2(Math.random() * 8 - 4), round2(Math.random() * 8 - 4)];
            w = [round2(Math.random() * 8 - 4), round2(Math.random() * 8 - 4), round2(Math.random() * 8 - 4)];
        }

        const dotProduct = round2(v[0] * w[0] + v[1] * w[1] + v[2] * w[2]);

        quests.push({
            id,
            difficulty,
            stage,
            vectorV: v,
            vectorW: w,
            showDotProduct: true,
            promptLatex: gm2_01_t.stages.dot_prompt_latex,
            expressionLatex: `\\vec v=(${v.join(',')}),\\;\\vec w=(${w.join(',')})`,
            targetLatex: "\\vec v\\cdot\\vec w",
            slots: [
                { id: "dot", labelLatex: "\\vec v\\cdot\\vec w", placeholder: "dot product", expected: dotProduct },
            ],
            correctLatex: `\\vec v\\cdot\\vec w=${dotProduct}`,
        });
    }
    return quests;
}

export function generateMissionQuests(gm2_01_t: any, difficulty: Difficulty): G201Quest[] {
    const quests: G201Quest[] = [];
    const stage = "MISSION";

    for (let i = 0; i < 60; i++) {
        const id = `M-${difficulty.charAt(0)}-${i + 1}`;
        let A: [number, number, number] = [0, 0, 0];
        let B: [number, number, number] = [0, 0, 0];
        let s: [number, number, number] = [0, 0, 0];

        if (difficulty === "BASIC") {
            A = [0, 0, 0];
            B = [randomInt(2, 5), 0, 0];
            s = [1, 0, 0];
        } else if (difficulty === "CORE") {
            A = [randomInt(0, 2), randomInt(0, 2), 0];
            B = [A[0] + randomInt(2, 4), A[1] + randomInt(2, 4), 0];
            s = [1, 1, 0];
        } else if (difficulty === "ADVANCED") {
            A = [randomInt(1, 3), randomInt(1, 3), randomInt(1, 3)];
            B = [A[0] + randomInt(2, 5), A[1] + randomInt(2, 5), A[2] + randomInt(2, 5)];
            s = [randomInt(1, 2), randomInt(1, 2), randomInt(1, 2)];
        } else { // ELITE
            A = [round2(Math.random() * 5), round2(Math.random() * 5), round2(Math.random() * 5)];
            B = [round2(A[0] + Math.random() * 10 + 2), round2(A[1] + Math.random() * 10 + 2), round2(A[2] + Math.random() * 10 + 2)];
            s = [round2(Math.random() * 3), round2(Math.random() * 3), round2(Math.random() * 3)];
        }

        const v = [B[0] - A[0], B[1] - A[1], B[2] - A[2]];
        const magnitude = round2(Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2));
        const dotProduct = round2(v[0] * s[0] + v[1] * s[1] + v[2] * s[2]);

        quests.push({
            id,
            difficulty,
            stage,
            pointA: A,
            pointB: B,
            vectorW: s,
            showDotProduct: true,
            promptLatex: gm2_01_t.stages.mission_prompt_latex,
            expressionLatex: `A(${A.join(',')})\\;\\text{to}\\;B(${B.join(',')}),\\;\\vec s=(${s.join(',')})`,
            targetLatex: "\\vec v,\\;\\vec v\\cdot\\vec s,\\;|\\vec v|",
            slots: [
                { id: "vx", labelLatex: "v_x", placeholder: "x", expected: round2(v[0]) },
                { id: "vy", labelLatex: "v_y", placeholder: "y", expected: round2(v[1]) },
                { id: "vz", labelLatex: "v_z", placeholder: "z", expected: round2(v[2]) },
                { id: "dot", labelLatex: "\\vec v\\cdot\\vec s", placeholder: "dot", expected: dotProduct },
                { id: "magnitude", labelLatex: "|\\vec v|", placeholder: "magnitude", expected: magnitude },
            ],
            correctLatex: `\\vec v=(${round2(v[0])},${round2(v[1])},${round2(v[2])}),\\;\\vec v\\cdot\\vec s=${dotProduct},\\;|\\vec v|=${magnitude}`,
        });
    }
    return quests;
}
