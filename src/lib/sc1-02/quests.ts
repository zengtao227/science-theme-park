import { Difficulty } from "@/hooks/useQuestManager";

export type Stage = "MOLAR_MASS" | "STOICHIOMETRY" | "YIELD";

export interface ReagentInfo {
    label: string;
    value: string;
}

export interface SC102Quest {
    id: string;
    difficulty: Difficulty;
    stage: Stage;
    reactionLatex?: string;
    reagents: ReagentInfo[];
    scaleReading: string;
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
}

const atomicWeights: Record<string, number> = {
    H: 1.008, C: 12.01, O: 16.0, Na: 22.99, Cl: 35.45, Ca: 40.08, N: 14.01, S: 32.06, Al: 26.98, Fe: 55.85, K: 39.1, Mg: 24.31, P: 30.97,
};

const round2 = (v: number) => Math.round(v * 100) / 100;

export function generateMolarMassQuests(t: any, difficulty: Difficulty): SC102Quest[] {
    const quests: SC102Quest[] = [];
    const formulas = [
        { f: "H2O", l: "H_{2}O" }, { f: "CO2", l: "CO_{2}" }, { f: "NaCl", l: "NaCl" },
        { f: "CaCO3", l: "CaCO_{3}" }, { f: "H2SO4", l: "H_{2}SO_{4}" }, { f: "C6H12O6", l: "C_{6}H_{12}O_{6}" },
    ];

    for (let i = 0; i < 60; i++) {
        const item = formulas[Math.floor(Math.random() * formulas.length)];
        const id = `M-${difficulty.charAt(0)}-${i + 1}`;

        // Simplified mass calculation for demo
        let mass = 18.02;
        if (item.f === "CO2") mass = 44.01;
        if (item.f === "NaCl") mass = 58.44;

        quests.push({
            id, difficulty, stage: "MOLAR_MASS",
            reactionLatex: item.l,
            promptLatex: `\\text{${t("sc1_02.stages.molar_mass_prompt_latex")}}`,
            expressionLatex: item.l,
            targetLatex: "\\text{M}",
            slots: [{ id: "M", labelLatex: "\\text{M}", placeholder: "g/mol", expected: mass }],
            correctLatex: `M = ${mass}\\;\\text{g/mol}`,
            reagents: [{ label: "Formula", value: item.l }],
            scaleReading: `${mass}\\;\\text{g/mol}`,
        });
    }
    return quests;
}

export function generateStoichiometryQuests(t: any, difficulty: Difficulty): SC102Quest[] {
    const quests: SC102Quest[] = [];
    for (let i = 0; i < 60; i++) {
        const id = `S-${difficulty.charAt(0)}-${i + 1}`;
        const moles = round2(1 + Math.random() * 5);
        const result = round2(moles * 2);

        quests.push({
            id, difficulty, stage: "STOICHIOMETRY",
            reactionLatex: "2H_2 + O_2 \\rightarrow 2H_2O",
            promptLatex: `\\text{${t("sc1_02.stages.stoichiometry_prompt_latex")}}`,
            expressionLatex: "2H_2 + O_2 \\rightarrow 2H_2O",
            targetLatex: "n(H_2O)",
            slots: [{ id: "n", labelLatex: "n", placeholder: "mol", expected: result }],
            correctLatex: `n = ${result}\\;\\text{mol}`,
            reagents: [{ label: "Given", value: `${moles}\\;\\text{mol } H_2` }],
            scaleReading: `${result}\\;\\text{mol}`,
        });
    }
    return quests;
}

export function generateYieldQuests(t: any, difficulty: Difficulty): SC102Quest[] {
    const quests: SC102Quest[] = [];
    for (let i = 0; i < 60; i++) {
        const id = `Y-${difficulty.charAt(0)}-${i + 1}`;
        const mass = round2(10 + Math.random() * 90);
        const yield_val = round2(mass * 0.9);

        quests.push({
            id, difficulty, stage: "YIELD",
            reactionLatex: "N_2 + 3H_2 \\rightarrow 2NH_3",
            promptLatex: `\\text{${t("sc1_02.stages.yield_prompt_latex")}}`,
            expressionLatex: "N_2 + 3H_2 \\rightarrow 2NH_3",
            targetLatex: "m(NH_3)",
            slots: [{ id: "m", labelLatex: "m", placeholder: "g", expected: yield_val }],
            correctLatex: `m = ${yield_val}\\;\\text{g}`,
            reagents: [{ label: "Reactant", value: `${mass}\\;\\text{g } N_2` }],
            scaleReading: `${yield_val}\\;\\text{g}`,
        });
    }
    return quests;
}
