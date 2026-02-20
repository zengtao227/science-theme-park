import { Quest, Difficulty } from "@/hooks/useQuestManager";

export interface OlympiadQuest extends Quest {
    category: "Logic" | "Geometry" | "Arithmetic" | "Combinatorics";
}

export const buildOlympiadPool = (difficulty: Difficulty, stage: string): OlympiadQuest[] => {
    const pool: OlympiadQuest[] = [];

    if (difficulty === "BASIC") {
        pool.push({
            id: "bq1",
            difficulty: "BASIC",
            stage: "logic",
            promptLatex: "In a race, Alice finished before Bob but after Charlie. David finished after Bob. Who came first?",
            expressionLatex: "\\text{Charlie} \\rightarrow \\text{Alice} \\rightarrow \\text{Bob} \\rightarrow \\text{David}",
            targetLatex: "\\text{Enter the name of the winner}",
            slots: [{ id: "ans", labelLatex: "Answer:", placeholder: "Name", expected: "Charlie" }],
            correctLatex: "\\text{Charlie}",
            category: "Logic"
        });
        pool.push({
            id: "bq2",
            difficulty: "BASIC",
            stage: "logic",
            promptLatex: "A group of 10 people are standing in a line. If you are the 4th person from the front, what is your position from the back?",
            expressionLatex: "10 - 4 + 1 = ?",
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "Position:", placeholder: "n", expected: 7 }],
            correctLatex: "7",
            category: "Arithmetic"
        });
        pool.push({
            id: "bq3",
            difficulty: "BASIC",
            stage: "logic",
            promptLatex: "Three sisters (Anna, Bella, Cora) have different favorite colors: Red, Blue, Green. Anna says: 'My favorite is not Red'. Bella says: 'My favorite is Blue'. Cora says: 'Anna's favorite is Red'. Only one of them is telling the truth. What is Anna's favorite color?",
            expressionLatex: "\\text{Truth Table Analysis}",
            targetLatex: "\\text{Color}",
            slots: [{ id: "ans", labelLatex: "Answer:", placeholder: "Color", expected: "Red" }],
            correctLatex: "Red",
            category: "Logic"
        });
    }

    if (difficulty === "CORE") {
        // Typical Kangaroo Level (Grade 7-8)
        pool.push({
            id: "cq1",
            difficulty: "CORE",
            stage: "logic",
            promptLatex: "A digital clock shows 12:34. How many minutes must pass before all four digits on the clock are the same for the first time?",
            expressionLatex: "12:34 \\rightarrow 22:22",
            targetLatex: "t \\text{ minutes}",
            slots: [{ id: "ans", labelLatex: "Time:", placeholder: "min", expected: 588 }],
            correctLatex: "588",
            category: "Arithmetic"
        });
        pool.push({
            id: "cq2",
            difficulty: "CORE",
            stage: "logic",
            promptLatex: "A cube of side 3cm is painted red and then cut into 1cm cubes. How many of the small cubes have exactly two faces painted red?",
            expressionLatex: "12 \\times (n - 2)",
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "Cubes:", placeholder: "count", expected: 12 }],
            correctLatex: "12",
            category: "Geometry"
        });
        pool.push({
            id: "cq3",
            difficulty: "CORE",
            stage: "logic",
            promptLatex: "The product of three different positive integers is 30. What is the maximum possible sum of these three integers?",
            expressionLatex: "a \\times b \\times c = 30, \\text{ max}(a+b+c)",
            targetLatex: "\\sum",
            slots: [{ id: "ans", labelLatex: "Sum:", placeholder: "S", expected: 16 }],
            correctLatex: "16 \\text{ (from } 1, 5, 6 \\text{ or } 1, 2, 15 \\text{... wait, } 1+2+15=18)",
            category: "Arithmetic"
        });
        // Correction: 1*2*15=30 -> 1+2+15=18. 1*1*30 is not 'different'. 1*3*10=30 -> 14. 1*5*6=30 -> 12. 2*3*5=30 -> 10.
        // So 1+2+15=18.
        pool[pool.length - 1].slots[0].expected = 18;
        pool[pool.length - 1].correctLatex = "18 \\text{ (1, 2, 15)}";
    }

    if (difficulty === "ADVANCED") {
        // Thinking puzzles
        pool.push({
            id: "aq1",
            difficulty: "ADVANCED",
            stage: "logic",
            promptLatex: "In a family of 4 children, at least two are girls. What is the probability that at least three are girls?",
            expressionLatex: "P(G \\ge 3 | G \\ge 2)",
            targetLatex: "\\frac{a}{b}",
            slots: [{ id: "ans", labelLatex: "Prob:", placeholder: "fraction", expected: "5/11" }],
            correctLatex: "\\frac{5}{11}",
            category: "Combinatorics"
        });
        pool.push({
            id: "aq2",
            difficulty: "ADVANCED",
            stage: "logic",
            promptLatex: "The number $2^{2024}$ is divided by 7. What is the remainder?",
            expressionLatex: "2^{3} \\equiv 1 \\pmod 7",
            targetLatex: "r",
            slots: [{ id: "ans", labelLatex: "Remainder:", placeholder: "r", expected: 4 }],
            correctLatex: "4 \\text{ (because } 2024 = 3 \\times 674 + 2, \\text{ so } 2^{2024} = (2^{3})^{674} \\times 2^{2} \\equiv 1 \\times 4 = 4)",
            category: "Arithmetic"
        });
    }

    if (difficulty === "ELITE") {
        pool.push({
            id: "eq1",
            difficulty: "ELITE",
            stage: "logic",
            promptLatex: "Find the smallest positive integer $n$ such that $n$ ends in 6 and if we move the 6 to the front, the new number is 4 times $n$.",
            expressionLatex: "10x + 6 \\rightarrow 6 \\cdot 10^k + x = 4(10x + 6)",
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "Integer:", placeholder: "n", expected: 153846 }],
            correctLatex: "153846",
            category: "Arithmetic"
        });
    }

    return pool;
};
