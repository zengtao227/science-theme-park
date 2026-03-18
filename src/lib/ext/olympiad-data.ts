import { Quest, Difficulty } from "@/hooks/useQuestManager";

export interface OlympiadQuest extends Quest {
    category: "logic" | "geometry" | "arithmetic" | "combinatorics";
}

type Translate = (key: string) => string;

export const buildOlympiadPool = (t: Translate, difficulty: Difficulty, stage: string): OlympiadQuest[] => {
    void stage;
    const pool: OlympiadQuest[] = [];
    const placeholder = (key: string) => t(`em3_01.placeholders.${key}`);
    const questionText = (id: string, field: string) => t(`em3_01.questions.${id}.${field}`);

    // =====================================================================
    // BASIC (TRAINING) — 10 questions
    // Kangaroo Junior level (Grade 5-6). Quick reasoning, pattern recognition.
    // =====================================================================
    if (difficulty === "BASIC") {
        pool.push({
            id: "B01", difficulty: "BASIC", stage: "logic", category: "logic",
            promptLatex: questionText("B01", "prompt"),
            expressionLatex: questionText("B01", "expression"),
            targetLatex: "\\text{Name}",
            slots: [{ id: "ans", labelLatex: questionText("B01", "label"), placeholder: placeholder("name"), expected: questionText("B01", "expected") }],
            correctLatex: questionText("B01", "correct"),
            hintLatex: [questionText("B01", "hint")],
        });
        pool.push({
            id: "B02", difficulty: "BASIC", stage: "logic", category: "arithmetic",
            promptLatex: questionText("B02", "prompt"),
            expressionLatex: questionText("B02", "expression"),
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: placeholder("position"), expected: 7 }],
            correctLatex: questionText("B02", "correct"),
            hintLatex: [questionText("B02", "hint")],
        });
        pool.push({
            id: "B03", difficulty: "BASIC", stage: "logic", category: "logic",
            promptLatex: questionText("B03", "prompt"),
            expressionLatex: questionText("B03", "expression"),
            targetLatex: "\\text{Color}",
            slots: [{ id: "ans", labelLatex: questionText("B03", "label"), placeholder: placeholder("color"), expected: questionText("B03", "expected") }],
            correctLatex: questionText("B03", "correct"),
            hintLatex: [questionText("B03", "hint")],
        });
        pool.push({
            id: "B04", difficulty: "BASIC", stage: "logic", category: "arithmetic",
            promptLatex: questionText("B04", "prompt"),
            expressionLatex: questionText("B04", "expression"),
            targetLatex: "S",
            slots: [{ id: "ans", labelLatex: "S", placeholder: placeholder("sum"), expected: 210 }],
            correctLatex: questionText("B04", "correct"),
            hintLatex: [questionText("B04", "hint")],
        });
        pool.push({
            id: "B05", difficulty: "BASIC", stage: "logic", category: "geometry",
            promptLatex: questionText("B05", "prompt"),
            expressionLatex: questionText("B05", "expression"),
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: placeholder("count"), expected: 5 }],
            correctLatex: questionText("B05", "correct"),
            hintLatex: [questionText("B05", "hint")],
        });
        pool.push({
            id: "B06", difficulty: "BASIC", stage: "logic", category: "combinatorics",
            promptLatex: questionText("B06", "prompt"),
            expressionLatex: questionText("B06", "expression"),
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: placeholder("outfits"), expected: 6 }],
            correctLatex: questionText("B06", "correct"),
            hintLatex: [questionText("B06", "hint")],
        });
        pool.push({
            id: "B07", difficulty: "BASIC", stage: "logic", category: "arithmetic",
            promptLatex: questionText("B07", "prompt"),
            expressionLatex: questionText("B07", "expression"),
            targetLatex: "\\text{Day}",
            slots: [{ id: "ans", labelLatex: questionText("B07", "label"), placeholder: placeholder("day"), expected: questionText("B07", "expected") }],
            correctLatex: questionText("B07", "correct"),
            hintLatex: [questionText("B07", "hint")],
        });
        pool.push({
            id: "B08", difficulty: "BASIC", stage: "logic", category: "logic",
            promptLatex: questionText("B08", "prompt"),
            expressionLatex: questionText("B08", "expression"),
            targetLatex: "d",
            slots: [{ id: "ans", labelLatex: "d", placeholder: placeholder("days"), expected: 8 }],
            correctLatex: questionText("B08", "correct"),
            hintLatex: [questionText("B08", "hint")],
        });
        pool.push({
            id: "B09", difficulty: "BASIC", stage: "logic", category: "geometry",
            promptLatex: questionText("B09", "prompt"),
            expressionLatex: questionText("B09", "expression"),
            targetLatex: "A",
            slots: [{ id: "ans", labelLatex: "A", placeholder: placeholder("area"), expected: 21 }],
            correctLatex: questionText("B09", "correct"),
            hintLatex: [questionText("B09", "hint")],
        });
        pool.push({
            id: "B10", difficulty: "BASIC", stage: "logic", category: "combinatorics",
            promptLatex: questionText("B10", "prompt"),
            expressionLatex: questionText("B10", "expression"),
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: placeholder("count"), expected: 10 }],
            correctLatex: questionText("B10", "correct"),
            hintLatex: [questionText("B10", "hint")],
        });
    }

    // =====================================================================
    // CORE (COMPETITION) — 10 questions
    // Kangaroo Standard level (Grade 7-8). Multi-step reasoning required.
    // =====================================================================
    if (difficulty === "CORE") {
        pool.push({
            id: "C01", difficulty: "CORE", stage: "logic", category: "arithmetic",
            promptLatex: questionText("C01", "prompt"),
            expressionLatex: questionText("C01", "expression"),
            targetLatex: "t",
            slots: [{ id: "ans", labelLatex: "t \\;(\\text{min})", placeholder: placeholder("minutes"), expected: 588 }],
            correctLatex: questionText("C01", "correct"),
            hintLatex: [questionText("C01", "hint")],
        });
        pool.push({
            id: "C02", difficulty: "CORE", stage: "logic", category: "geometry",
            promptLatex: questionText("C02", "prompt"),
            expressionLatex: questionText("C02", "expression"),
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: placeholder("count"), expected: 12 }],
            correctLatex: questionText("C02", "correct"),
            hintLatex: [questionText("C02", "hint")],
        });
        pool.push({
            id: "C03", difficulty: "CORE", stage: "logic", category: "arithmetic",
            promptLatex: questionText("C03", "prompt"),
            expressionLatex: questionText("C03", "expression"),
            targetLatex: "S_{\\max}",
            slots: [{ id: "ans", labelLatex: "S", placeholder: placeholder("sum"), expected: 18 }],
            correctLatex: questionText("C03", "correct"),
            hintLatex: [questionText("C03", "hint")],
        });
        pool.push({
            id: "C04", difficulty: "CORE", stage: "logic", category: "combinatorics",
            promptLatex: questionText("C04", "prompt"),
            expressionLatex: questionText("C04", "expression"),
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: placeholder("count"), expected: 12 }],
            correctLatex: questionText("C04", "correct"),
            hintLatex: [questionText("C04", "hint")],
        });
        pool.push({
            id: "C05", difficulty: "CORE", stage: "logic", category: "logic",
            promptLatex: questionText("C05", "prompt"),
            expressionLatex: questionText("C05", "expression"),
            targetLatex: "\\text{Types}",
            slots: [{ id: "ans", labelLatex: questionText("C05", "label"), placeholder: placeholder("knight_knave"), expected: questionText("C05", "expected") }],
            correctLatex: questionText("C05", "correct"),
            hintLatex: [questionText("C05", "hint")],
        });
        pool.push({
            id: "C06", difficulty: "CORE", stage: "logic", category: "geometry",
            promptLatex: questionText("C06", "prompt"),
            expressionLatex: questionText("C06", "expression"),
            targetLatex: "S",
            slots: [{ id: "ans", labelLatex: "S\\;(°)", placeholder: placeholder("degrees"), expected: 720 }],
            correctLatex: questionText("C06", "correct"),
            hintLatex: [questionText("C06", "hint")],
        });
        pool.push({
            id: "C07", difficulty: "CORE", stage: "logic", category: "arithmetic",
            promptLatex: questionText("C07", "prompt"),
            expressionLatex: questionText("C07", "expression"),
            targetLatex: "r",
            slots: [{ id: "ans", labelLatex: "r", placeholder: placeholder("last_two_digits"), expected: 1 }],
            correctLatex: questionText("C07", "correct"),
            hintLatex: [questionText("C07", "hint")],
        });
        pool.push({
            id: "C08", difficulty: "CORE", stage: "logic", category: "combinatorics",
            promptLatex: questionText("C08", "prompt"),
            expressionLatex: questionText("C08", "expression"),
            targetLatex: "P",
            slots: [{ id: "ans", labelLatex: "P", placeholder: placeholder("fraction"), expected: "1/6" }],
            correctLatex: questionText("C08", "correct"),
            hintLatex: [questionText("C08", "hint")],
        });
        pool.push({
            id: "C09", difficulty: "CORE", stage: "logic", category: "logic",
            promptLatex: questionText("C09", "prompt"),
            expressionLatex: questionText("C09", "expression"),
            targetLatex: "\\text{How many open?}",
            slots: [{ id: "ans", labelLatex: "n", placeholder: placeholder("count"), expected: 10 }],
            correctLatex: questionText("C09", "correct"),
            hintLatex: [questionText("C09", "hint")],
        });
        pool.push({
            id: "C10", difficulty: "CORE", stage: "logic", category: "geometry",
            promptLatex: questionText("C10", "prompt"),
            expressionLatex: questionText("C10", "expression"),
            targetLatex: "C",
            slots: [{ id: "ans", labelLatex: "C\\;(°)", placeholder: placeholder("degrees"), expected: 70 }],
            correctLatex: questionText("C10", "correct"),
            hintLatex: [questionText("C10", "hint")],
        });
    }

    // =====================================================================
    // ADVANCED (OLYMPIAD) — 10 questions
    // AMC/SMO level (Grade 9-10). Proof-style, more creative reasoning.
    // =====================================================================
    if (difficulty === "ADVANCED") {
        pool.push({
            id: "A01", difficulty: "ADVANCED", stage: "logic", category: "combinatorics",
            promptLatex: questionText("A01", "prompt"),
            expressionLatex: questionText("A01", "expression"),
            targetLatex: "P",
            slots: [{ id: "ans", labelLatex: "P", placeholder: placeholder("fraction"), expected: "5/11" }],
            correctLatex: questionText("A01", "correct"),
            hintLatex: [questionText("A01", "hint")],
        });
        pool.push({
            id: "A02", difficulty: "ADVANCED", stage: "logic", category: "arithmetic",
            promptLatex: questionText("A02", "prompt"),
            expressionLatex: questionText("A02", "expression"),
            targetLatex: "r",
            slots: [{ id: "ans", labelLatex: "r", placeholder: placeholder("remainder"), expected: 4 }],
            correctLatex: questionText("A02", "correct"),
            hintLatex: [questionText("A02", "hint")],
        });
        pool.push({
            id: "A03", difficulty: "ADVANCED", stage: "logic", category: "geometry",
            promptLatex: questionText("A03", "prompt"),
            expressionLatex: questionText("A03", "expression"),
            targetLatex: "d",
            slots: [{ id: "ans", labelLatex: "d", placeholder: placeholder("distance"), expected: 6 }],
            correctLatex: questionText("A03", "correct"),
            hintLatex: [questionText("A03", "hint")],
        });
        pool.push({
            id: "A04", difficulty: "ADVANCED", stage: "logic", category: "combinatorics",
            promptLatex: questionText("A04", "prompt"),
            expressionLatex: questionText("A04", "expression"),
            targetLatex: "f(10)",
            slots: [{ id: "ans", labelLatex: "f(10)", placeholder: placeholder("ways"), expected: 89 }],
            correctLatex: questionText("A04", "correct"),
            hintLatex: [questionText("A04", "hint")],
        });
        pool.push({
            id: "A05", difficulty: "ADVANCED", stage: "logic", category: "logic",
            promptLatex: questionText("A05", "prompt"),
            expressionLatex: questionText("A05", "expression"),
            targetLatex: "\\text{Criminal}",
            slots: [{ id: "ans", labelLatex: questionText("A05", "label"), placeholder: placeholder("suspect"), expected: questionText("A05", "expected") }],
            correctLatex: questionText("A05", "correct"),
            hintLatex: [questionText("A05", "hint")],
        });
        pool.push({
            id: "A06", difficulty: "ADVANCED", stage: "logic", category: "arithmetic",
            promptLatex: questionText("A06", "prompt"),
            expressionLatex: questionText("A06", "expression"),
            targetLatex: "\\sigma(360)",
            slots: [{ id: "ans", labelLatex: "\\sigma", placeholder: placeholder("sum"), expected: 1170 }],
            correctLatex: questionText("A06", "correct"),
            hintLatex: [questionText("A06", "hint")],
        });
        pool.push({
            id: "A07", difficulty: "ADVANCED", stage: "logic", category: "geometry",
            promptLatex: questionText("A07", "prompt"),
            expressionLatex: questionText("A07", "expression"),
            targetLatex: "A",
            slots: [{ id: "ans", labelLatex: "A", placeholder: placeholder("area"), expected: 120 }],
            correctLatex: questionText("A07", "correct"),
            hintLatex: [questionText("A07", "hint")],
        });
        pool.push({
            id: "A08", difficulty: "ADVANCED", stage: "logic", category: "combinatorics",
            promptLatex: questionText("A08", "prompt"),
            expressionLatex: questionText("A08", "expression"),
            targetLatex: "P",
            slots: [{ id: "ans", labelLatex: "P", placeholder: placeholder("fraction"), expected: "31/35" }],
            correctLatex: questionText("A08", "correct"),
            hintLatex: [questionText("A08", "hint")],
        });
        pool.push({
            id: "A09", difficulty: "ADVANCED", stage: "logic", category: "arithmetic",
            promptLatex: questionText("A09", "prompt"),
            expressionLatex: questionText("A09", "expression"),
            targetLatex: "d",
            slots: [{ id: "ans", labelLatex: "d", placeholder: placeholder("digit"), expected: 3 }],
            correctLatex: questionText("A09", "correct"),
            hintLatex: [questionText("A09", "hint")],
        });
        pool.push({
            id: "A10", difficulty: "ADVANCED", stage: "logic", category: "logic",
            promptLatex: questionText("A10", "prompt"),
            expressionLatex: questionText("A10", "expression"),
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: placeholder("races"), expected: 7 }],
            correctLatex: questionText("A10", "correct"),
            hintLatex: [questionText("A10", "hint")],
        });
    }

    // =====================================================================
    // ELITE (LEGENDARY) — 10 questions
    // IMO/Putnam style. Deep mathematical insight, elegant solutions.
    // =====================================================================
    if (difficulty === "ELITE") {
        pool.push({
            id: "E01", difficulty: "ELITE", stage: "logic", category: "arithmetic",
            promptLatex: questionText("E01", "prompt"),
            expressionLatex: questionText("E01", "expression"),
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: placeholder("integer"), expected: 153846 }],
            correctLatex: questionText("E01", "correct"),
            hintLatex: [questionText("E01", "hint")],
        });
        pool.push({
            id: "E02", difficulty: "ELITE", stage: "logic", category: "geometry",
            promptLatex: questionText("E02", "prompt"),
            expressionLatex: questionText("E02", "expression"),
            targetLatex: "A",
            slots: [{ id: "ans", labelLatex: "A", placeholder: placeholder("area"), expected: 84 }],
            correctLatex: questionText("E02", "correct"),
            hintLatex: [questionText("E02", "hint")],
        });
        pool.push({
            id: "E03", difficulty: "ELITE", stage: "logic", category: "combinatorics",
            promptLatex: questionText("E03", "prompt"),
            expressionLatex: questionText("E03", "expression"),
            targetLatex: "C_5",
            slots: [{ id: "ans", labelLatex: "C_5", placeholder: placeholder("paths"), expected: 42 }],
            correctLatex: questionText("E03", "correct"),
            hintLatex: [questionText("E03", "hint")],
        });
        pool.push({
            id: "E04", difficulty: "ELITE", stage: "logic", category: "arithmetic",
            promptLatex: questionText("E04", "prompt"),
            expressionLatex: questionText("E04", "expression"),
            targetLatex: "S",
            slots: [{ id: "ans", labelLatex: "S", placeholder: placeholder("sum"), expected: 615 }],
            correctLatex: questionText("E04", "correct"),
            hintLatex: [questionText("E04", "hint")],
        });
        pool.push({
            id: "E05", difficulty: "ELITE", stage: "logic", category: "logic",
            promptLatex: questionText("E05", "prompt"),
            expressionLatex: questionText("E05", "expression"),
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: placeholder("guaranteed"), expected: 99 }],
            correctLatex: questionText("E05", "correct"),
            hintLatex: [questionText("E05", "hint")],
        });
        pool.push({
            id: "E06", difficulty: "ELITE", stage: "logic", category: "geometry",
            promptLatex: questionText("E06", "prompt"),
            expressionLatex: questionText("E06", "expression"),
            targetLatex: "A_{\\max}",
            slots: [{ id: "ans", labelLatex: "A", placeholder: placeholder("area"), expected: 100 }],
            correctLatex: questionText("E06", "correct"),
            hintLatex: [questionText("E06", "hint")],
        });
        pool.push({
            id: "E07", difficulty: "ELITE", stage: "logic", category: "combinatorics",
            promptLatex: questionText("E07", "prompt"),
            expressionLatex: questionText("E07", "expression"),
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: placeholder("ways"), expected: 40320 }],
            correctLatex: questionText("E07", "correct"),
            hintLatex: [questionText("E07", "hint")],
        });
        pool.push({
            id: "E08", difficulty: "ELITE", stage: "logic", category: "arithmetic",
            promptLatex: questionText("E08", "prompt"),
            expressionLatex: questionText("E08", "expression"),
            targetLatex: "r",
            slots: [{ id: "ans", labelLatex: "r", placeholder: placeholder("last_three_digits"), expected: 376 }],
            correctLatex: questionText("E08", "correct"),
            hintLatex: [questionText("E08", "hint")],
        });
        pool.push({
            id: "E09", difficulty: "ELITE", stage: "logic", category: "logic",
            promptLatex: questionText("E09", "prompt"),
            expressionLatex: questionText("E09", "expression"),
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: placeholder("weighings"), expected: 3 }],
            correctLatex: questionText("E09", "correct"),
            hintLatex: [questionText("E09", "hint")],
        });
        pool.push({
            id: "E10", difficulty: "ELITE", stage: "logic", category: "geometry",
            promptLatex: questionText("E10", "prompt"),
            expressionLatex: questionText("E10", "expression"),
            targetLatex: "V",
            slots: [{ id: "ans", labelLatex: "V", placeholder: placeholder("volume"), expected: 25.46 }],
            correctLatex: questionText("E10", "correct"),
            hintLatex: [questionText("E10", "hint")],
        });
    }

    return pool;
};
