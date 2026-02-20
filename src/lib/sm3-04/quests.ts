import { Difficulty } from "@/hooks/useQuestManager";
import { useLanguage } from "@/lib/i18n";

export type Stage = "PH" | "DECIBEL" | "RICHTER";

export interface S304Quest {
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
    value?: number;
    concentration?: number;
    intensity?: number;
    amplitude?: number;
    scenarioKey?: string;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generatePhQuests(t: ReturnType<typeof useLanguage>["t"], difficulty: Difficulty): S304Quest[] {
    const quests: S304Quest[] = [];

    for (let i = 0; i < 60; i++) {
        const id = `P-${difficulty.charAt(0)}-${i + 1}`;
        let concentration = 1e-7;
        let scenarioKey = "ph_basic";

        if (difficulty === "BASIC") {
            const exp = randomInt(3, 9);
            concentration = parseFloat(`1e-${exp}`);
            scenarioKey = "ph_basic";
        }
        else if (difficulty === "CORE") {
            const exp = pick([2, 4, 8, 10, 11]);
            concentration = parseFloat(`1e-${exp}`);
            scenarioKey = "ph_core";
        }
        else if (difficulty === "ADVANCED") {
            // non integer exponents approximation
            const exp = randomInt(2, 10);
            const coeff = pick([1.58, 2.51, 3.16, 6.31, 7.94]); // maps approximately to decimal log
            concentration = coeff * Math.pow(10, -exp);
            scenarioKey = "ph_advanced";
        }
        else { // ELITE
            const expPart = Math.round((Math.random() * 10 - 2) * 10) / 10; // -2 to 8
            concentration = Math.pow(10, -expPart);
            scenarioKey = "ph_elite";
        }

        const pH = round2(-Math.log10(concentration));

        quests.push({
            id, difficulty, stage: "PH",
            concentration, value: pH, scenarioKey,
            promptLatex: t("sm3_04.stages.ph_prompt_latex") || "\\text{Calculate pH}",
            expressionLatex: `[H^+]=${concentration.toExponential(2)}\\;M`,
            targetLatex: "pH",
            slots: [{ id: "pH", labelLatex: "pH", placeholder: "pH value", expected: pH }],
            correctLatex: `pH=${pH}`
        });
    }
    return quests;
}

export function generateDecibelQuests(t: ReturnType<typeof useLanguage>["t"], difficulty: Difficulty): S304Quest[] {
    const quests: S304Quest[] = [];
    const I0 = 1e-12;

    for (let i = 0; i < 60; i++) {
        const id = `D-${difficulty.charAt(0)}-${i + 1}`;

        if (difficulty === "ELITE") {
            const exp1 = randomInt(2, 6);
            const exp2 = randomInt(7, 10);
            const intensity = parseFloat(`1e-${exp1}`);
            const intensity2 = parseFloat(`1e-${exp2}`);

            const dB1 = round2(10 * Math.log10(intensity / I0));
            const dB2 = round2(10 * Math.log10(intensity2 / I0));
            const reduction = round2(dB1 - dB2);

            quests.push({
                id, difficulty, stage: "DECIBEL",
                intensity, value: reduction, scenarioKey: "decibel_elite",
                promptLatex: `\\text{${t("sm3_04.stages.decibel_reduction") || "Calculate dB reduction"}}`,
                expressionLatex: `I_1=${intensity.toExponential(0)}\\;W/m^{2},\\; I_2=${intensity2.toExponential(0)}\\;W/m^{2}`,
                targetLatex: "\\Delta L",
                slots: [{ id: "dB", labelLatex: "\\Delta L", placeholder: "dB reduction", expected: reduction, unit: "dB" }],
                correctLatex: `\\Delta L=${reduction}\\;dB`,
            });
        }
        else {
            let intensity = 1e-6;
            let scenarioKey = "decibel_basic";

            if (difficulty === "BASIC") {
                const exp = randomInt(6, 10);
                intensity = parseFloat(`1e-${exp}`);
                scenarioKey = "decibel_basic";
            }
            else if (difficulty === "CORE") {
                const exp = pick([0, 2, 3, 4, 5]); // up to 120 dB
                intensity = parseFloat(`1e-${exp}`);
                scenarioKey = "decibel_core";
            }
            else { // ADVANCED
                const exp = randomInt(3, 9);
                const coeff = pick([1.58, 2.51, 3.16, 6.31, 7.94]);
                intensity = coeff * Math.pow(10, -exp);
                scenarioKey = "decibel_advanced";
            }

            const dB = round2(10 * Math.log10(intensity / I0));
            quests.push({
                id, difficulty, stage: "DECIBEL",
                intensity, value: dB, scenarioKey,
                promptLatex: t("sm3_04.stages.decibel_prompt_latex") || "\\text{Calculate decibel}",
                expressionLatex: `I=${intensity.toExponential(0)}\\;W/m^{2},\\; I_0=10^{-12}\\;W/m^{2}`,
                targetLatex: "L",
                slots: [{ id: "L", labelLatex: "L", placeholder: "decibels", expected: dB, unit: "dB" }],
                correctLatex: `L=${dB}\\;dB`
            });
        }
    }
    return quests;
}

export function generateRichterQuests(t: ReturnType<typeof useLanguage>["t"], difficulty: Difficulty): S304Quest[] {
    const quests: S304Quest[] = [];

    for (let i = 0; i < 60; i++) {
        const id = `R-${difficulty.charAt(0)}-${i + 1}`;

        if (difficulty === "ELITE") {
            const exp1 = randomInt(6, 9);
            const diffExp = pick([1, 2, 3]);
            const exp2 = exp1 - diffExp;

            const amplitude = Math.pow(10, exp1);
            const amplitude2 = Math.pow(10, exp2);

            const M1 = round2(Math.log10(amplitude));
            const M2 = round2(Math.log10(amplitude2));
            const diff = round2(M1 - M2);

            quests.push({
                id, difficulty, stage: "RICHTER",
                amplitude, value: diff, scenarioKey: "richter_elite",
                promptLatex: `\\text{${t("sm3_04.stages.magnitude_difference") || "Magnitude diff"}}`,
                expressionLatex: `A_1=${amplitude}\\;\\mu m,\\; A_2=${amplitude2}\\;\\mu m`,
                targetLatex: "\\Delta M",
                slots: [{ id: "M", labelLatex: "\\Delta M", placeholder: "magnitude diff", expected: diff }],
                correctLatex: `\\Delta M=${diff}`,
            });
        }
        else {
            let amplitude = 1000;
            let scenarioKey = "richter_basic";

            if (difficulty === "BASIC") {
                const exp = randomInt(1, 4);
                amplitude = Math.pow(10, exp);
            }
            else if (difficulty === "CORE") {
                const exp = pick([5, 6, 7]);
                const coeff = pick([1, 3.16]);
                amplitude = coeff * Math.pow(10, exp);
                scenarioKey = "richter_core";
            }
            else { // ADVANCED
                const min = 3;
                const max = 6;
                const exp = randomInt(min, max);
                // random non-integer mag component
                const magFrac = randomInt(1, 9) / 10;
                amplitude = Math.round(Math.pow(10, exp + magFrac));
                scenarioKey = "richter_advanced";
            }

            const magnitude = round2(Math.log10(amplitude));
            quests.push({
                id, difficulty, stage: "RICHTER",
                amplitude, value: magnitude, scenarioKey,
                promptLatex: t("sm3_04.stages.richter_prompt_latex") || "\\text{Calculate magnitude}",
                expressionLatex: `A=${amplitude}\\;\\mu m`,
                targetLatex: "M",
                slots: [{ id: "M", labelLatex: "M", placeholder: "magnitude", expected: magnitude }],
                correctLatex: `M=${magnitude}`
            });
        }
    }
    return quests;
}

