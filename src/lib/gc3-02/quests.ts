import { Difficulty } from "@/hooks/useQuestManager";

export type Stage = "SC" | "BCC" | "FCC";

export interface GC302Quest {
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
    }>;
    correctLatex: string;
    simConfig: {
        latticeType: "SC" | "BCC" | "FCC";
        showVoids: boolean;
        slicePosition?: number;
    };
}

export function generateCrystalQuests(t: any, difficulty: Difficulty, stage: Stage): GC302Quest[] {
    const quests: GC302Quest[] = [];
    const keys = ["atoms_per_cell", "coord_num", "pack_eff", "void_type", "density_calc", "coord_num", "pack_eff", "void_count", "lattice_param", "stability"];

    for (let i = 0; i < 60; i++) {
        const key = keys[i % keys.length];
        let expected: string | number = "1";
        if (key === "atoms_per_cell") expected = stage === "SC" ? "1" : stage === "BCC" ? "2" : "4";
        if (key === "coord_num") expected = stage === "SC" ? "6" : stage === "BCC" ? "8" : "12";
        if (key === "pack_eff") expected = stage === "SC" ? "52" : stage === "BCC" ? "68" : "74";

        quests.push({
            id: `${stage}-${difficulty.charAt(0)}-${i + 1}`,
            difficulty, stage,
            promptLatex: `\\text{${t(`gc3_02.prompts.${key}`)}}`,
            expressionLatex: "",
            targetLatex: "\\text{Result}",
            slots: [{ id: "ans", labelLatex: "Answer", placeholder: "...", expected }],
            correctLatex: `${expected}`,
            simConfig: { latticeType: stage, showVoids: key.includes("void") }
        });
    }
    return quests;
}
