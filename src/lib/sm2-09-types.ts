// SM2.09 Inequalities Module - Core Type Definitions

import { Quest } from "@/hooks/useQuestManager";

export type Difficulty = "BASIC" | "CORE" | "ADVANCED" | "ELITE";

export type Stage = "INEQUALITY_BASICS" | "SYSTEMS" | "ABSOLUTE_VALUE";

export type InequalityType = 
    | "LINEAR"           // ax + b < c
    | "SYSTEM"           // Multiple inequalities
    | "ABSOLUTE_VALUE"   // |ax + b| < c
    | "COMPOUND";        // a < x < b

export type SolutionType = 
    | "INTERVAL"         // Single or multiple intervals
    | "POINT"            // Single point solution
    | "EMPTY"            // No solution
    | "ALL_REALS";       // All real numbers

export interface Interval {
    start: number;
    end: number;
    startInclusive: boolean;
    endInclusive: boolean;
}

export interface SolutionStep {
    stepNumber: number;
    expression: string;
    expressionLatex: string;
    justification: string;
    reversesInequality: boolean;
}

export interface SM209Quest extends Quest {
    id: string;
    difficulty: Difficulty;
    stage: Stage;
    inequalityType: InequalityType;
    expression: string;
    variable: string;
    coefficients?: number[];
    constants?: number[];
    systemInequalities?: string[];
    absoluteValueExpression?: string;
    promptLatex: string;
    expressionLatex: string;
    solutionType: SolutionType;
    solutionInterval?: Interval | Interval[];
    solutionSet?: string;
    steps?: SolutionStep[];
    slots: Array<{
        id: string;
        labelLatex: string;
        placeholder: string;
        expected: string;
        acceptedFormats: string[];
    }>;
    correctLatex: string;
    answer: string;
    baselScenario?: string;
}

export interface InequalityVisualizationProps {
    quest: SM209Quest;
    stage: Stage;
    onBoundaryDrag?: (value: number) => void;
    translations: {
        number_line: string;
        graph: string;
        solution_set: string;
    };
}

export interface StepBySolverProps {
    quest: SM209Quest;
    visible: boolean;
    translations: {
        step: string;
        justification: string;
        final_solution: string;
    };
}

export interface BoundaryRendering {
    lineStyle: "solid" | "dashed";
    pointStyle: "filled" | "open";
}

export interface GraphShading {
    isPointShaded: (x: number, y: number) => boolean;
}
