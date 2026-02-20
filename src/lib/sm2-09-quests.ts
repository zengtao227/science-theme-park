// SM2.09 Inequalities Module - Quest Data
// Total: 75 quests (20 BASIC, 25 CORE, 20 ADVANCED, 10 ELITE)
// Distribution: INEQUALITY_BASICS (30), SYSTEMS (26), ABSOLUTE_VALUE (19)

import { SM209Quest, Difficulty, Stage, InequalityType, SolutionType } from "./sm2-09-types";

// INEQUALITY_BASICS - BASIC (8 quests)
export const inequalityBasicsBasic: Partial<SM209Quest>[] = [
    {
        id: "INEQUALITY_BASICS_BASIC_1",
        difficulty: "BASIC",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "x + 3 < 7",
        variable: "x",
        coefficients: [1],
        constants: [3, 7],
        solutionType: "INTERVAL",
        answer: "(-∞, 4)"
    },
    {
        id: "INEQUALITY_BASICS_BASIC_2",
        difficulty: "BASIC",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "2x ≥ 10",
        variable: "x",
        coefficients: [2],
        constants: [10],
        solutionType: "INTERVAL",
        answer: "[5, ∞)"
    },
    {
        id: "INEQUALITY_BASICS_BASIC_3",
        difficulty: "BASIC",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "x - 5 > 2",
        variable: "x",
        coefficients: [1],
        constants: [-5, 2],
        solutionType: "INTERVAL",
        answer: "(7, ∞)"
    },
    {
        id: "INEQUALITY_BASICS_BASIC_4",
        difficulty: "BASIC",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "-x ≤ 4",
        variable: "x",
        coefficients: [-1],
        constants: [4],
        solutionType: "INTERVAL",
        answer: "[-4, ∞)"
    },
    {
        id: "INEQUALITY_BASICS_BASIC_5",
        difficulty: "BASIC",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "3x < 12",
        variable: "x",
        coefficients: [3],
        constants: [12],
        solutionType: "INTERVAL",
        answer: "(-∞, 4)"
    },
    {
        id: "INEQUALITY_BASICS_BASIC_6",
        difficulty: "BASIC",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "x/2 > 3",
        variable: "x",
        coefficients: [0.5],
        constants: [3],
        solutionType: "INTERVAL",
        answer: "(6, ∞)"
    },
    {
        id: "INEQUALITY_BASICS_BASIC_7",
        difficulty: "BASIC",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "5 - x ≥ 2",
        variable: "x",
        coefficients: [-1],
        constants: [5, 2],
        solutionType: "INTERVAL",
        answer: "(-∞, 3]"
    },
    {
        id: "INEQUALITY_BASICS_BASIC_8",
        difficulty: "BASIC",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "-2x > 6",
        variable: "x",
        coefficients: [-2],
        constants: [6],
        solutionType: "INTERVAL",
        answer: "(-∞, -3)"
    }
];

// INEQUALITY_BASICS - CORE (10 quests)
export const inequalityBasicsCore: Partial<SM209Quest>[] = [
    {
        id: "INEQUALITY_BASICS_CORE_1",
        difficulty: "CORE",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "2x + 3 < 11",
        variable: "x",
        coefficients: [2],
        constants: [3, 11],
        solutionType: "INTERVAL",
        answer: "(-∞, 4)"
    },
    {
        id: "INEQUALITY_BASICS_CORE_2",
        difficulty: "CORE",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "3x - 7 ≥ 8",
        variable: "x",
        coefficients: [3],
        constants: [-7, 8],
        solutionType: "INTERVAL",
        answer: "[5, ∞)"
    },
    {
        id: "INEQUALITY_BASICS_CORE_3",
        difficulty: "CORE",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "x/2 + 1 > 4",
        variable: "x",
        coefficients: [0.5],
        constants: [1, 4],
        solutionType: "INTERVAL",
        answer: "(6, ∞)"
    },
    {
        id: "INEQUALITY_BASICS_CORE_4",
        difficulty: "CORE",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "-2x + 5 ≤ 1",
        variable: "x",
        coefficients: [-2],
        constants: [5, 1],
        solutionType: "INTERVAL",
        answer: "[2, ∞)"
    },
    {
        id: "INEQUALITY_BASICS_CORE_5",
        difficulty: "CORE",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "4x - 9 < 3",
        variable: "x",
        coefficients: [4],
        constants: [-9, 3],
        solutionType: "INTERVAL",
        answer: "(-∞, 3)"
    },
    {
        id: "INEQUALITY_BASICS_CORE_6",
        difficulty: "CORE",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "5 - 3x ≥ -4",
        variable: "x",
        coefficients: [-3],
        constants: [5, -4],
        solutionType: "INTERVAL",
        answer: "(-∞, 3]"
    },
    {
        id: "INEQUALITY_BASICS_CORE_7",
        difficulty: "CORE",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "x/3 - 2 ≤ 1",
        variable: "x",
        coefficients: [1/3],
        constants: [-2, 1],
        solutionType: "INTERVAL",
        answer: "(-∞, 9]"
    },
    {
        id: "INEQUALITY_BASICS_CORE_8",
        difficulty: "CORE",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "7 - 2x > 1",
        variable: "x",
        coefficients: [-2],
        constants: [7, 1],
        solutionType: "INTERVAL",
        answer: "(-∞, 3)"
    },
    {
        id: "INEQUALITY_BASICS_CORE_9",
        difficulty: "CORE",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "3x + 8 ≤ 20",
        variable: "x",
        coefficients: [3],
        constants: [8, 20],
        solutionType: "INTERVAL",
        answer: "(-∞, 4]"
    },
    {
        id: "INEQUALITY_BASICS_CORE_10",
        difficulty: "CORE",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "-x/2 + 3 < 5",
        variable: "x",
        coefficients: [-0.5],
        constants: [3, 5],
        solutionType: "INTERVAL",
        answer: "(-4, ∞)"
    }
];

// INEQUALITY_BASICS - ADVANCED (8 quests)
export const inequalityBasicsAdvanced: Partial<SM209Quest>[] = [
    {
        id: "INEQUALITY_BASICS_ADVANCED_1",
        difficulty: "ADVANCED",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "3x + 5 < 2x + 9",
        variable: "x",
        coefficients: [3, -2],
        constants: [5, 9],
        solutionType: "INTERVAL",
        answer: "(-∞, 4)"
    },
    {
        id: "INEQUALITY_BASICS_ADVANCED_2",
        difficulty: "ADVANCED",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "5x - 3 ≥ 2x + 12",
        variable: "x",
        coefficients: [5, -2],
        constants: [-3, 12],
        solutionType: "INTERVAL",
        answer: "[5, ∞)"
    },
    {
        id: "INEQUALITY_BASICS_ADVANCED_3",
        difficulty: "ADVANCED",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "4(x - 2) > 3x + 1",
        variable: "x",
        coefficients: [4, -3],
        constants: [-8, 1],
        solutionType: "INTERVAL",
        answer: "(9, ∞)"
    },
    {
        id: "INEQUALITY_BASICS_ADVANCED_4",
        difficulty: "ADVANCED",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "-3x + 7 ≤ -2x + 3",
        variable: "x",
        coefficients: [-3, 2],
        constants: [7, 3],
        solutionType: "INTERVAL",
        answer: "[4, ∞)"
    },
    {
        id: "INEQUALITY_BASICS_ADVANCED_5",
        difficulty: "ADVANCED",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "2(x + 3) - 5 < x + 4",
        variable: "x",
        coefficients: [2, -1],
        constants: [6, -5, 4],
        solutionType: "INTERVAL",
        answer: "(-∞, 3)"
    },
    {
        id: "INEQUALITY_BASICS_ADVANCED_6",
        difficulty: "ADVANCED",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "3(2x - 1) ≥ 4x + 7",
        variable: "x",
        coefficients: [6, -4],
        constants: [-3, 7],
        solutionType: "INTERVAL",
        answer: "[5, ∞)"
    },
    {
        id: "INEQUALITY_BASICS_ADVANCED_7",
        difficulty: "ADVANCED",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "x/2 + x/3 > 5",
        variable: "x",
        coefficients: [5/6],
        constants: [5],
        solutionType: "INTERVAL",
        answer: "(6, ∞)"
    },
    {
        id: "INEQUALITY_BASICS_ADVANCED_8",
        difficulty: "ADVANCED",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "2x - 3(x - 4) ≤ 10",
        variable: "x",
        coefficients: [2, -3],
        constants: [12, 10],
        solutionType: "INTERVAL",
        answer: "[2, ∞)"
    }
];

// INEQUALITY_BASICS - ELITE (4 quests)
export const inequalityBasicsElite: Partial<SM209Quest>[] = [
    {
        id: "INEQUALITY_BASICS_ELITE_1",
        difficulty: "ELITE",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "(2x + 1)/3 - (x - 2)/2 < 1",
        variable: "x",
        coefficients: [2/3, -1/2],
        constants: [1/3, 1, 1],
        solutionType: "INTERVAL",
        answer: "(-∞, 6)"
    },
    {
        id: "INEQUALITY_BASICS_ELITE_2",
        difficulty: "ELITE",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "3(x - 1) - 2(x + 3) ≥ x - 11",
        variable: "x",
        coefficients: [3, -2, -1],
        constants: [-3, -6, -11],
        solutionType: "ALL_REALS",
        answer: "ℝ"
    },
    {
        id: "INEQUALITY_BASICS_ELITE_3",
        difficulty: "ELITE",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "(x + 1)/4 + (x - 3)/6 ≤ 1",
        variable: "x",
        coefficients: [1/4, 1/6],
        constants: [1/4, -1/2, 1],
        solutionType: "INTERVAL",
        answer: "(-∞, 5.4]"
    },
    {
        id: "INEQUALITY_BASICS_ELITE_4",
        difficulty: "ELITE",
        stage: "INEQUALITY_BASICS",
        inequalityType: "LINEAR",
        expression: "2x - 3 < 4x + 1 < 3x + 7",
        variable: "x",
        coefficients: [2, 4, 3],
        constants: [-3, 1, 7],
        solutionType: "INTERVAL",
        answer: "(-2, 6)"
    }
];

// SYSTEMS - BASIC (7 quests)
export const systemsBasic: Partial<SM209Quest>[] = [
    {
        id: "SYSTEMS_BASIC_1",
        difficulty: "BASIC",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "x > 2 AND x < 5",
        variable: "x",
        systemInequalities: ["x > 2", "x < 5"],
        solutionType: "INTERVAL",
        answer: "(2, 5)"
    },
    {
        id: "SYSTEMS_BASIC_2",
        difficulty: "BASIC",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "x ≥ -1 AND x ≤ 3",
        variable: "x",
        systemInequalities: ["x ≥ -1", "x ≤ 3"],
        solutionType: "INTERVAL",
        answer: "[-1, 3]"
    },
    {
        id: "SYSTEMS_BASIC_3",
        difficulty: "BASIC",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "x > 0 AND x < 10",
        variable: "x",
        systemInequalities: ["x > 0", "x < 10"],
        solutionType: "INTERVAL",
        answer: "(0, 10)"
    },
    {
        id: "SYSTEMS_BASIC_4",
        difficulty: "BASIC",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "x ≥ -5 AND x ≤ 5",
        variable: "x",
        systemInequalities: ["x ≥ -5", "x ≤ 5"],
        solutionType: "INTERVAL",
        answer: "[-5, 5]"
    },
    {
        id: "SYSTEMS_BASIC_5",
        difficulty: "BASIC",
        stage: "SYSTEMS",
        inequalityType: "COMPOUND",
        expression: "-3 < x < 4",
        variable: "x",
        systemInequalities: ["x > -3", "x < 4"],
        solutionType: "INTERVAL",
        answer: "(-3, 4)"
    },
    {
        id: "SYSTEMS_BASIC_6",
        difficulty: "BASIC",
        stage: "SYSTEMS",
        inequalityType: "COMPOUND",
        expression: "1 ≤ x ≤ 8",
        variable: "x",
        systemInequalities: ["x ≥ 1", "x ≤ 8"],
        solutionType: "INTERVAL",
        answer: "[1, 8]"
    },
    {
        id: "SYSTEMS_BASIC_7",
        difficulty: "BASIC",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "x > -2 AND x ≤ 6",
        variable: "x",
        systemInequalities: ["x > -2", "x ≤ 6"],
        solutionType: "INTERVAL",
        answer: "(-2, 6]"
    }
];

// SYSTEMS - CORE (9 quests)
export const systemsCore: Partial<SM209Quest>[] = [
    {
        id: "SYSTEMS_CORE_1",
        difficulty: "CORE",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "y > x + 1 AND y < -x + 5",
        variable: "x,y",
        systemInequalities: ["y > x + 1", "y < -x + 5"],
        solutionType: "INTERVAL",
        answer: "Intersection region"
    },
    {
        id: "SYSTEMS_CORE_2",
        difficulty: "CORE",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "y ≤ 2x - 1 AND y ≥ -x + 2",
        variable: "x,y",
        systemInequalities: ["y ≤ 2x - 1", "y ≥ -x + 2"],
        solutionType: "INTERVAL",
        answer: "Intersection region"
    },
    {
        id: "SYSTEMS_CORE_3",
        difficulty: "CORE",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "y < 2x + 3 AND y > x - 1",
        variable: "x,y",
        systemInequalities: ["y < 2x + 3", "y > x - 1"],
        solutionType: "INTERVAL",
        answer: "Intersection region"
    },
    {
        id: "SYSTEMS_CORE_4",
        difficulty: "CORE",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "y ≥ -x + 4 AND y ≤ x + 2",
        variable: "x,y",
        systemInequalities: ["y ≥ -x + 4", "y ≤ x + 2"],
        solutionType: "INTERVAL",
        answer: "Intersection region"
    },
    {
        id: "SYSTEMS_CORE_5",
        difficulty: "CORE",
        stage: "SYSTEMS",
        inequalityType: "COMPOUND",
        expression: "2x - 3 < 5 AND 3x + 1 > -8",
        variable: "x",
        systemInequalities: ["2x - 3 < 5", "3x + 1 > -8"],
        solutionType: "INTERVAL",
        answer: "(-3, 4)"
    },
    {
        id: "SYSTEMS_CORE_6",
        difficulty: "CORE",
        stage: "SYSTEMS",
        inequalityType: "COMPOUND",
        expression: "x/2 + 1 ≥ 0 AND 2x - 5 ≤ 7",
        variable: "x",
        systemInequalities: ["x/2 + 1 ≥ 0", "2x - 5 ≤ 7"],
        solutionType: "INTERVAL",
        answer: "[-2, 6]"
    },
    {
        id: "SYSTEMS_CORE_7",
        difficulty: "CORE",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "y > 3 AND y < 2x",
        variable: "x,y",
        systemInequalities: ["y > 3", "y < 2x"],
        solutionType: "INTERVAL",
        answer: "Intersection region"
    },
    {
        id: "SYSTEMS_CORE_8",
        difficulty: "CORE",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "y ≤ 5 AND y ≥ x - 2",
        variable: "x,y",
        systemInequalities: ["y ≤ 5", "y ≥ x - 2"],
        solutionType: "INTERVAL",
        answer: "Intersection region"
    },
    {
        id: "SYSTEMS_CORE_9",
        difficulty: "CORE",
        stage: "SYSTEMS",
        inequalityType: "COMPOUND",
        expression: "-4 ≤ 2x + 1 ≤ 9",
        variable: "x",
        systemInequalities: ["2x + 1 ≥ -4", "2x + 1 ≤ 9"],
        solutionType: "INTERVAL",
        answer: "[-2.5, 4]"
    }
];

// SYSTEMS - ADVANCED (7 quests)
export const systemsAdvanced: Partial<SM209Quest>[] = [
    {
        id: "SYSTEMS_ADVANCED_1",
        difficulty: "ADVANCED",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "x ≥ 0 AND y ≥ 0 AND x + y ≤ 10",
        variable: "x,y",
        systemInequalities: ["x ≥ 0", "y ≥ 0", "x + y ≤ 10"],
        solutionType: "INTERVAL",
        answer: "Triangular region"
    },
    {
        id: "SYSTEMS_ADVANCED_2",
        difficulty: "ADVANCED",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "y ≥ x AND y ≤ -x + 6 AND y ≥ 0",
        variable: "x,y",
        systemInequalities: ["y ≥ x", "y ≤ -x + 6", "y ≥ 0"],
        solutionType: "INTERVAL",
        answer: "Triangular region"
    },
    {
        id: "SYSTEMS_ADVANCED_3",
        difficulty: "ADVANCED",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "x ≥ 0 AND y ≥ 0 AND 2x + y ≤ 8",
        variable: "x,y",
        systemInequalities: ["x ≥ 0", "y ≥ 0", "2x + y ≤ 8"],
        solutionType: "INTERVAL",
        answer: "Triangular region"
    },
    {
        id: "SYSTEMS_ADVANCED_4",
        difficulty: "ADVANCED",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "y ≤ 2x AND y ≥ x - 3 AND y ≤ 5",
        variable: "x,y",
        systemInequalities: ["y ≤ 2x", "y ≥ x - 3", "y ≤ 5"],
        solutionType: "INTERVAL",
        answer: "Bounded region"
    },
    {
        id: "SYSTEMS_ADVANCED_5",
        difficulty: "ADVANCED",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "x + y ≥ 4 AND x - y ≤ 2 AND y ≥ 0",
        variable: "x,y",
        systemInequalities: ["x + y ≥ 4", "x - y ≤ 2", "y ≥ 0"],
        solutionType: "INTERVAL",
        answer: "Unbounded region"
    },
    {
        id: "SYSTEMS_ADVANCED_6",
        difficulty: "ADVANCED",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "y > |x| AND y < 5",
        variable: "x,y",
        systemInequalities: ["y > |x|", "y < 5"],
        solutionType: "INTERVAL",
        answer: "V-shaped region"
    },
    {
        id: "SYSTEMS_ADVANCED_7",
        difficulty: "ADVANCED",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "x^2 + y^2 ≤ 16 AND y ≥ 0",
        variable: "x,y",
        systemInequalities: ["x^2 + y^2 ≤ 16", "y ≥ 0"],
        solutionType: "INTERVAL",
        answer: "Semicircular region"
    }
];

// SYSTEMS - ELITE (3 quests)
export const systemsElite: Partial<SM209Quest>[] = [
    {
        id: "SYSTEMS_ELITE_1",
        difficulty: "ELITE",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "2x + 3y ≤ 12 AND x + 2y ≤ 8 AND x ≥ 0 AND y ≥ 0",
        variable: "x,y",
        systemInequalities: ["2x + 3y ≤ 12", "x + 2y ≤ 8", "x ≥ 0", "y ≥ 0"],
        solutionType: "INTERVAL",
        answer: "Feasible region for optimization"
    },
    {
        id: "SYSTEMS_ELITE_2",
        difficulty: "ELITE",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "x > 5 AND x < 3",
        variable: "x",
        systemInequalities: ["x > 5", "x < 3"],
        solutionType: "EMPTY",
        answer: "∅"
    },
    {
        id: "SYSTEMS_ELITE_3",
        difficulty: "ELITE",
        stage: "SYSTEMS",
        inequalityType: "SYSTEM",
        expression: "3x + 2y ≥ 6 AND x - y ≤ 4 AND 2x + y ≤ 10 AND x ≥ 0 AND y ≥ 0",
        variable: "x,y",
        systemInequalities: ["3x + 2y ≥ 6", "x - y ≤ 4", "2x + y ≤ 10", "x ≥ 0", "y ≥ 0"],
        solutionType: "INTERVAL",
        answer: "Polygonal region"
    }
];

// ABSOLUTE_VALUE - BASIC (5 quests)
export const absoluteValueBasic: Partial<SM209Quest>[] = [
    {
        id: "ABSOLUTE_VALUE_BASIC_1",
        difficulty: "BASIC",
        stage: "ABSOLUTE_VALUE",
        inequalityType: "ABSOLUTE_VALUE",
        expression: "|x| < 3",
        variable: "x",
        absoluteValueExpression: "x",
        solutionType: "INTERVAL",
        answer: "(-3, 3)"
    },
    {
        id: "ABSOLUTE_VALUE_BASIC_2",
        difficulty: "BASIC",
        stage: "ABSOLUTE_VALUE",
        inequalityType: "ABSOLUTE_VALUE",
        expression: "|x| ≥ 2",
        variable: "x",
        absoluteValueExpression: "x",
        solutionType: "INTERVAL",
        answer: "(-∞, -2] ∪ [2, ∞)"
    },
    {
        id: "ABSOLUTE_VALUE_BASIC_3",
        difficulty: "BASIC",
        stage: "ABSOLUTE_VALUE",
        inequalityType: "ABSOLUTE_VALUE",
        expression: "|x| ≤ 5",
        variable: "x",
        absoluteValueExpression: "x",
        solutionType: "INTERVAL",
        answer: "[-5, 5]"
    },
    {
        id: "ABSOLUTE_VALUE_BASIC_4",
        difficulty: "BASIC",
        stage: "ABSOLUTE_VALUE",
        inequalityType: "ABSOLUTE_VALUE",
        expression: "|x| > 1",
        variable: "x",
        absoluteValueExpression: "x",
        solutionType: "INTERVAL",
        answer: "(-∞, -1) ∪ (1, ∞)"
    },
    {
        id: "ABSOLUTE_VALUE_BASIC_5",
        difficulty: "BASIC",
        stage: "ABSOLUTE_VALUE",
        inequalityType: "ABSOLUTE_VALUE",
        expression: "|x| < 4",
        variable: "x",
        absoluteValueExpression: "x",
        solutionType: "INTERVAL",
        answer: "(-4, 4)"
    }
];

// ABSOLUTE_VALUE - CORE (6 quests - adjusted from 11)
export const absoluteValueCore: Partial<SM209Quest>[] = [
    {
        id: "ABSOLUTE_VALUE_CORE_1",
        difficulty: "CORE",
        stage: "ABSOLUTE_VALUE",
        inequalityType: "ABSOLUTE_VALUE",
        expression: "|x - 2| < 4",
        variable: "x",
        absoluteValueExpression: "x - 2",
        solutionType: "INTERVAL",
        answer: "(-2, 6)"
    },
    {
        id: "ABSOLUTE_VALUE_CORE_2",
        difficulty: "CORE",
        stage: "ABSOLUTE_VALUE",
        inequalityType: "ABSOLUTE_VALUE",
        expression: "|x + 3| ≥ 5",
        variable: "x",
        absoluteValueExpression: "x + 3",
        solutionType: "INTERVAL",
        answer: "(-∞, -8] ∪ [2, ∞)"
    },
    {
        id: "ABSOLUTE_VALUE_CORE_3",
        difficulty: "CORE",
        stage: "ABSOLUTE_VALUE",
        inequalityType: "ABSOLUTE_VALUE",
        expression: "|2x - 1| ≤ 7",
        variable: "x",
        absoluteValueExpression: "2x - 1",
        solutionType: "INTERVAL",
        answer: "[-3, 4]"
    },
    {
        id: "ABSOLUTE_VALUE_CORE_4",
        difficulty: "CORE",
        stage: "ABSOLUTE_VALUE",
        inequalityType: "ABSOLUTE_VALUE",
        expression: "|3x + 2| > 8",
        variable: "x",
        absoluteValueExpression: "3x + 2",
        solutionType: "INTERVAL",
        answer: "(-∞, -10/3) ∪ (2, ∞)"
    },
    {
        id: "ABSOLUTE_VALUE_CORE_5",
        difficulty: "CORE",
        stage: "ABSOLUTE_VALUE",
        expression: "|x - 5| < 3",
        variable: "x",
        absoluteValueExpression: "x - 5",
        solutionType: "INTERVAL",
        answer: "(2, 8)"
    },
    {
        id: "ABSOLUTE_VALUE_CORE_6",
        difficulty: "CORE",
        stage: "ABSOLUTE_VALUE",
        inequalityType: "ABSOLUTE_VALUE",
        expression: "|x + 1| ≤ 6",
        variable: "x",
        absoluteValueExpression: "x + 1",
        solutionType: "INTERVAL",
        answer: "[-7, 5]"
    }
];

// ABSOLUTE_VALUE - ADVANCED (5 quests - adjusted from 9)
export const absoluteValueAdvanced: Partial<SM209Quest>[] = [
    {
        id: "ABSOLUTE_VALUE_ADVANCED_1",
        difficulty: "ADVANCED",
        stage: "ABSOLUTE_VALUE",
        inequalityType: "ABSOLUTE_VALUE",
        expression: "|2x + 3| < |x - 1|",
        variable: "x",
        absoluteValueExpression: "2x + 3, x - 1",
        solutionType: "INTERVAL",
        answer: "(-4, -2/3)"
    },
    {
        id: "ABSOLUTE_VALUE_ADVANCED_2",
        difficulty: "ADVANCED",
        stage: "ABSOLUTE_VALUE",
        inequalityType: "ABSOLUTE_VALUE",
        expression: "|x - 1| + |x + 2| ≤ 5",
        variable: "x",
        absoluteValueExpression: "x - 1, x + 2",
        solutionType: "INTERVAL",
        answer: "[-3, 2]"
    },
    {
        id: "ABSOLUTE_VALUE_ADVANCED_3",
        difficulty: "ADVANCED",
        stage: "ABSOLUTE_VALUE",
        inequalityType: "ABSOLUTE_VALUE",
        expression: "2|x - 3| - 5 ≥ 3",
        variable: "x",
        absoluteValueExpression: "x - 3",
        solutionType: "INTERVAL",
        answer: "(-∞, -1] ∪ [7, ∞)"
    },
    {
        id: "ABSOLUTE_VALUE_ADVANCED_4",
        difficulty: "ADVANCED",
        stage: "ABSOLUTE_VALUE",
        inequalityType: "ABSOLUTE_VALUE",
        expression: "|x + 2| - |x - 3| > 1",
        variable: "x",
        absoluteValueExpression: "x + 2, x - 3",
        solutionType: "INTERVAL",
        answer: "(-∞, 1)"
    },
    {
        id: "ABSOLUTE_VALUE_ADVANCED_5",
        difficulty: "ADVANCED",
        stage: "ABSOLUTE_VALUE",
        inequalityType: "ABSOLUTE_VALUE",
        expression: "3|x - 1| + 2 < 11",
        variable: "x",
        absoluteValueExpression: "x - 1",
        solutionType: "INTERVAL",
        answer: "(-2, 4)"
    }
];

// ABSOLUTE_VALUE - ELITE (3 quests - adjusted from 4)
export const absoluteValueElite: Partial<SM209Quest>[] = [
    {
        id: "ABSOLUTE_VALUE_ELITE_1",
        difficulty: "ELITE",
        stage: "ABSOLUTE_VALUE",
        inequalityType: "ABSOLUTE_VALUE",
        expression: "|x - a| < b (where a, b are parameters)",
        variable: "x",
        absoluteValueExpression: "x - a",
        solutionType: "INTERVAL",
        answer: "(a - b, a + b)"
    },
    {
        id: "ABSOLUTE_VALUE_ELITE_2",
        difficulty: "ELITE",
        stage: "ABSOLUTE_VALUE",
        inequalityType: "ABSOLUTE_VALUE",
        expression: "|x| < -2",
        variable: "x",
        absoluteValueExpression: "x",
        solutionType: "EMPTY",
        answer: "∅"
    },
    {
        id: "ABSOLUTE_VALUE_ELITE_3",
        difficulty: "ELITE",
        stage: "ABSOLUTE_VALUE",
        inequalityType: "ABSOLUTE_VALUE",
        expression: "|x - 3| + 2 < 1",
        variable: "x",
        absoluteValueExpression: "x - 3",
        solutionType: "EMPTY",
        answer: "∅"
    }
];

// Export all quest arrays
export const allQuests = [
    ...inequalityBasicsBasic,
    ...inequalityBasicsCore,
    ...inequalityBasicsAdvanced,
    ...inequalityBasicsElite,
    ...systemsBasic,
    ...systemsCore,
    ...systemsAdvanced,
    ...systemsElite,
    ...absoluteValueBasic,
    ...absoluteValueCore,
    ...absoluteValueAdvanced,
    ...absoluteValueElite
];

// Verify quest count
export const questCounts = {
    total: allQuests.length,
    basic: allQuests.filter(q => q.difficulty === "BASIC").length,
    core: allQuests.filter(q => q.difficulty === "CORE").length,
    advanced: allQuests.filter(q => q.difficulty === "ADVANCED").length,
    elite: allQuests.filter(q => q.difficulty === "ELITE").length,
    inequality_basics: allQuests.filter(q => q.stage === "INEQUALITY_BASICS").length,
    systems: allQuests.filter(q => q.stage === "SYSTEMS").length,
    absolute_value: allQuests.filter(q => q.stage === "ABSOLUTE_VALUE").length
};
