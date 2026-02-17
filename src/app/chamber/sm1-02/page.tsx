"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useCallback } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import AlgebraCanvas, { type AlgebraVisualMode } from "@/components/chamber/sm1-02/AlgebraCanvas";

type Stage = "VARIABLES" | "TERMS" | "SUBSTITUTION";

interface S103Quest extends Quest {
    visualMode: AlgebraVisualMode;
    visualData: {
        variables?: { label: string; value: number | string; color: string }[];
        expression?: string;
        items?: { type: string; count: number; color: string }[];
        inputValue?: number;
        formula?: string;
    };
}

function buildStagePool(sm1_02_t: any, difficulty: Difficulty, stage: Stage): S103Quest[] {
    const isBasic = difficulty === "BASIC";
    const isCore = difficulty === "CORE";
    const isAdv = difficulty === "ADVANCED";
    const isElite = difficulty === "ELITE";

    const quests: S103Quest[] = [];

    // --- STAGE 1: VARIABLES ---
    if (stage === "VARIABLES") {
        if (isBasic) {
            quests.push(
                {
                    id: "V1-B", difficulty, stage,
                    promptLatex: "\\text{If } x=5 \\text{, what is the value inside the container?}",
                    expressionLatex: "x", targetLatex: "5",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'x', value: 5, color: '#a855f7' }] },
                    slots: [{ id: "ans", labelLatex: "Value", placeholder: "?", expected: 5 }],
                    correctLatex: "x=5", hintLatex: ["\\text{The variable x holds the value 5.}"]
                },
                {
                    id: "V2-B", difficulty, stage,
                    promptLatex: "\\text{If } y=10 \\text{, what is } y?",
                    expressionLatex: "y", targetLatex: "10",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'y', value: 10, color: '#3b82f6' }] },
                    slots: [{ id: "ans", labelLatex: "Value", placeholder: "?", expected: 10 }],
                    correctLatex: "y=10", hintLatex: ["\\text{The variable y holds the value 10.}"]
                },
                {
                    id: "V3-B", difficulty, stage,
                    promptLatex: "\\text{If } z=2 \\text{, identify } z",
                    expressionLatex: "z", targetLatex: "2",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'z', value: 2, color: '#22c55e' }] },
                    slots: [{ id: "ans", labelLatex: "Value", placeholder: "?", expected: 2 }],
                    correctLatex: "z=2", hintLatex: ["\\text{Variable z equals 2.}"]
                },
                {
                    id: "V4-B", difficulty, stage,
                    promptLatex: "\\text{If } a=7 \\text{, what is inside } a?",
                    expressionLatex: "a", targetLatex: "7",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'a', value: 7, color: '#ef4444' }] },
                    slots: [{ id: "ans", labelLatex: "Value", placeholder: "?", expected: 7 }],
                    correctLatex: "a=7", hintLatex: ["\\text{The box 'a' contains 7.}"]
                },
                {
                    id: "V5-B", difficulty, stage,
                    promptLatex: "\\text{If } b=0 \\text{, what is } b?",
                    expressionLatex: "b", targetLatex: "0",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'b', value: 0, color: '#64748b' }] },
                    slots: [{ id: "ans", labelLatex: "Value", placeholder: "?", expected: 0 }],
                    correctLatex: "b=0", hintLatex: ["\\text{The container is empty, holding 0.}"]
                }
            );
        } else if (isCore) {
            quests.push(
                {
                    id: "V1-C", difficulty, stage,
                    promptLatex: "\\text{If } x=3 \\text{, calculate } x + x",
                    expressionLatex: "x+x", targetLatex: "6",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'x', value: 3, color: '#a855f7' }, { label: 'x', value: 3, color: '#a855f7' }] },
                    slots: [{ id: "ans", labelLatex: "Sum", placeholder: "?", expected: 6 }],
                    correctLatex: "3+3=6", hintLatex: ["\\text{Add the two x values.}"]
                },
                {
                    id: "V2-C", difficulty, stage,
                    promptLatex: "\\text{If } y=4 \\text{, calculate } y + y + y",
                    expressionLatex: "y+y+y", targetLatex: "12",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'y', value: 4, color: '#3b82f6' }, { label: 'y', value: 4, color: '#3b82f6' }, { label: 'y', value: 4, color: '#3b82f6' }] },
                    slots: [{ id: "ans", labelLatex: "Sum", placeholder: "?", expected: 12 }],
                    correctLatex: "4+4+4=12", hintLatex: ["\\text{Sum of three y's.}"]
                },
                {
                    id: "V3-C", difficulty, stage,
                    promptLatex: "\\text{If } a=5 \\text{, calculate } 2a",
                    expressionLatex: "2a", targetLatex: "10",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'a', value: 5, color: '#ef4444' }, { label: 'a', value: 5, color: '#ef4444' }] },
                    slots: [{ id: "ans", labelLatex: "Product", placeholder: "?", expected: 10 }],
                    correctLatex: "2(5)=10", hintLatex: ["\\text{Two groups of a.}"]
                },
                {
                    id: "V4-C", difficulty, stage,
                    promptLatex: "\\text{If } x=2 \\text{, what is } x + 5?",
                    expressionLatex: "x+5", targetLatex: "7",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'x', value: 2, color: '#a855f7' }, { label: '1', value: 5, color: '#64748b' }] },
                    slots: [{ id: "ans", labelLatex: "Sum", placeholder: "?", expected: 7 }],
                    correctLatex: "2+5=7", hintLatex: ["\\text{Add constant to variable.}"]
                },
                {
                    id: "V5-C", difficulty, stage,
                    promptLatex: "\\text{If } b=6 \\text{, calculate } b - 2",
                    expressionLatex: "b-2", targetLatex: "4",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'b', value: 6, color: '#22c55e' }] }, // Visual simplification
                    slots: [{ id: "ans", labelLatex: "Result", placeholder: "?", expected: 4 }],
                    correctLatex: "6-2=4", hintLatex: ["\\text{Subtract 2 from 6.}"]
                }
            );
        } else if (isAdv) {
            quests.push(
                {
                    id: "V1-A", difficulty, stage,
                    promptLatex: "\\text{If } a=4, b=2 \\text{, calculate } a + b",
                    expressionLatex: "a+b", targetLatex: "6",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'a', value: 4, color: '#ef4444' }, { label: 'b', value: 2, color: '#22c55e' }] },
                    slots: [{ id: "ans", labelLatex: "Sum", placeholder: "?", expected: 6 }],
                    correctLatex: "4+2=6", hintLatex: ["\\text{Sum of variables.}"]
                },
                {
                    id: "V2-A", difficulty, stage,
                    promptLatex: "\\text{If } x=5, y=3 \\text{, calculate } x - y",
                    expressionLatex: "x-y", targetLatex: "2",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'x', value: 5, color: '#a855f7' }, { label: 'y', value: 3, color: '#3b82f6' }] },
                    slots: [{ id: "ans", labelLatex: "Diff", placeholder: "?", expected: 2 }],
                    correctLatex: "5-3=2", hintLatex: ["\\text{Difference between x and y.}"]
                },
                {
                    id: "V3-A", difficulty, stage,
                    promptLatex: "\\text{If } a=3, b=4 \\text{, calculate } 2a + b",
                    expressionLatex: "2a+b", targetLatex: "10",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'a', value: 3, color: '#ef4444' }, { label: 'a', value: 3, color: '#ef4444' }, { label: 'b', value: 4, color: '#22c55e' }] },
                    slots: [{ id: "ans", labelLatex: "Sum", placeholder: "?", expected: 10 }],
                    correctLatex: "2(3)+4=10", hintLatex: ["\\text{Two a's plus one b.}"]
                },
                {
                    id: "V4-A", difficulty, stage,
                    promptLatex: "\\text{If } x=10 \\text{, calculate } \\frac{x}{2}",
                    expressionLatex: "\\frac{x}{2}", targetLatex: "5",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'x', value: 10, color: '#a855f7' }] },
                    slots: [{ id: "ans", labelLatex: "Quotient", placeholder: "?", expected: 5 }],
                    correctLatex: "10/2=5", hintLatex: ["\\text{Half of x.}"]
                },
                {
                    id: "V5-A", difficulty, stage,
                    promptLatex: "\\text{If } p=3, q=2 \\text{, calculate } 3p - q",
                    expressionLatex: "3p-q", targetLatex: "7",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'p', value: 3, color: '#eab308' }, { label: 'p', value: 3, color: '#eab308' }, { label: 'p', value: 3, color: '#eab308' }, { label: 'q', value: 2, color: '#ec4899' }] },
                    slots: [{ id: "ans", labelLatex: "Result", placeholder: "?", expected: 7 }],
                    correctLatex: "3(3)-2=9-2=7", hintLatex: ["\\text{Three p's minus one q.}"]
                }
            );
        } else {
            // Elite
            quests.push(
                {
                    id: "V1-E", difficulty, stage,
                    promptLatex: "\\text{If } x=3 \\text{, calculate } 2x + 1",
                    expressionLatex: "2x+1", targetLatex: "7",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'x', value: 3, color: '#a855f7' }, { label: 'x', value: 3, color: '#a855f7' }, { label: '1', value: 1, color: '#64748b' }] },
                    slots: [{ id: "ans", labelLatex: "Result", placeholder: "?", expected: 7 }],
                    correctLatex: "2(3)+1=7", hintLatex: ["\\text{Linear expression.}"]
                },
                {
                    id: "V2-E", difficulty, stage,
                    promptLatex: "\\text{If } x=5, y=2 \\text{, calculate } 2x - 3y",
                    expressionLatex: "2x-3y", targetLatex: "4",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'x', value: 5, color: '#a855f7' }, { label: 'x', value: 5, color: '#a855f7' }, { label: 'y', value: 2, color: '#3b82f6' }] },
                    slots: [{ id: "ans", labelLatex: "Result", placeholder: "?", expected: 4 }],
                    correctLatex: "2(5)-3(2)=10-6=4", hintLatex: ["\\text{Evaluate each term first.}"]
                },
                {
                    id: "V3-E", difficulty, stage,
                    promptLatex: "\\text{If } a=4 \\text{, calculate } a^2",
                    expressionLatex: "a^2", targetLatex: "16",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'a', value: 4, color: '#ef4444' }] },
                    slots: [{ id: "ans", labelLatex: "Square", placeholder: "?", expected: 16 }],
                    correctLatex: "4^2=16", hintLatex: ["\\text{Variable squared.}"]
                },
                {
                    id: "V4-E", difficulty, stage,
                    promptLatex: "\\text{If } x=2, y=3, z=4 \\text{, calculate } x+y+z",
                    expressionLatex: "x+y+z", targetLatex: "9",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'x', value: 2, color: '#a855f7' }, { label: 'y', value: 3, color: '#3b82f6' }, { label: 'z', value: 4, color: '#22c55e' }] },
                    slots: [{ id: "ans", labelLatex: "Sum", placeholder: "?", expected: 9 }],
                    correctLatex: "2+3+4=9", hintLatex: ["\\text{Sum of three variables.}"]
                },
                {
                    id: "V5-E", difficulty, stage,
                    promptLatex: "\\text{If } k=10 \\text{, calculate } 2k + 5",
                    expressionLatex: "2k+5", targetLatex: "25",
                    visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'k', value: 10, color: '#eab308' }, { label: 'k', value: 10, color: '#eab308' }, { label: '5', value: 5, color: '#64748b' }] },
                    slots: [{ id: "ans", labelLatex: "Result", placeholder: "?", expected: 25 }],
                    correctLatex: "2(10)+5=25", hintLatex: ["\\text{Complex linear term.}"]
                }
            );
        }
    }

    // --- STAGE 2: TERMS ---
    if (stage === "TERMS") {
        if (isBasic) {
            quests.push(
                {
                    id: "T1-B", difficulty, stage,
                    promptLatex: "\\text{Simplify: } 3a + 2a", expressionLatex: "3a + 2a", targetLatex: "5a",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'a', count: 3, color: '#ef4444' }, { type: 'a', count: 2, color: '#ef4444' }] },
                    slots: [{ id: "coef", labelLatex: "Coefficient", placeholder: "#", expected: 5 }, { id: "var", labelLatex: "Variable", placeholder: "x", expected: "a" }],
                    correctLatex: "5a", hintLatex: ["3+2=5"]
                },
                {
                    id: "T2-B", difficulty, stage,
                    promptLatex: "\\text{Simplify: } 4x + x", expressionLatex: "4x + x", targetLatex: "5x",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'x', count: 4, color: '#3b82f6' }, { type: 'x', count: 1, color: '#3b82f6' }] },
                    slots: [{ id: "coef", labelLatex: "Coefficient", placeholder: "#", expected: 5 }, { id: "var", labelLatex: "Variable", placeholder: "x", expected: "x" }],
                    correctLatex: "5x", hintLatex: ["4+1=5"]
                },
                {
                    id: "T3-B", difficulty, stage,
                    promptLatex: "\\text{Simplify: } 2y + 5y", expressionLatex: "2y + 5y", targetLatex: "7y",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'y', count: 2, color: '#eab308' }, { type: 'y', count: 5, color: '#eab308' }] },
                    slots: [{ id: "coef", labelLatex: "Coefficient", placeholder: "#", expected: 7 }, { id: "var", labelLatex: "Variable", placeholder: "x", expected: "y" }],
                    correctLatex: "7y", hintLatex: ["2+5=7"]
                },
                {
                    id: "T4-B", difficulty, stage,
                    promptLatex: "\\text{Simplify: } a + a", expressionLatex: "a + a", targetLatex: "2a",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'a', count: 1, color: '#ef4444' }, { type: 'a', count: 1, color: '#ef4444' }] },
                    slots: [{ id: "coef", labelLatex: "Coefficient", placeholder: "#", expected: 2 }, { id: "var", labelLatex: "Variable", placeholder: "x", expected: "a" }],
                    correctLatex: "2a", hintLatex: ["1+1=2"]
                },
                {
                    id: "T5-B", difficulty, stage,
                    promptLatex: "\\text{Simplify: } 6b + 2b", expressionLatex: "6b + 2b", targetLatex: "8b",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'b', count: 6, color: '#22c55e' }, { type: 'b', count: 2, color: '#22c55e' }] },
                    slots: [{ id: "coef", labelLatex: "Coefficient", placeholder: "#", expected: 8 }, { id: "var", labelLatex: "Variable", placeholder: "x", expected: "b" }],
                    correctLatex: "8b", hintLatex: ["6+2=8"]
                }
            );
        } else if (isCore) {
            quests.push(
                {
                    id: "T1-C", difficulty, stage,
                    promptLatex: "\\text{Simplify: } 5x - 2x", expressionLatex: "5x - 2x", targetLatex: "3x",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'x', count: 5, color: '#3b82f6' }, { type: 'x (remove)', count: -2, color: '#9ca3af' }] },
                    slots: [{ id: "coef", labelLatex: "Coefficient", placeholder: "#", expected: 3 }, { id: "var", labelLatex: "Variable", placeholder: "x", expected: "x" }],
                    correctLatex: "3x", hintLatex: ["5-2=3"]
                },
                {
                    id: "T2-C", difficulty, stage,
                    promptLatex: "\\text{Simplify: } 10y - 4y", expressionLatex: "10y - 4y", targetLatex: "6y",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'y', count: 10, color: '#eab308' }, { type: 'y', count: -4, color: '#9ca3af' }] },
                    slots: [{ id: "coef", labelLatex: "Coefficient", placeholder: "#", expected: 6 }, { id: "var", labelLatex: "Variable", placeholder: "x", expected: "y" }],
                    correctLatex: "6y", hintLatex: ["10-4=6"]
                },
                {
                    id: "T3-C", difficulty, stage,
                    promptLatex: "\\text{Simplify: } 3a + 4a - 2a", expressionLatex: "3a + 4a - 2a", targetLatex: "5a",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'a', count: 3, color: '#ef4444' }, { type: 'a', count: 4, color: '#ef4444' }, { type: 'a', count: -2, color: '#9ca3af' }] },
                    slots: [{ id: "coef", labelLatex: "Coefficient", placeholder: "#", expected: 5 }, { id: "var", labelLatex: "Variable", placeholder: "x", expected: "a" }],
                    correctLatex: "5a", hintLatex: ["(3+4)-2=5"]
                },
                {
                    id: "T4-C", difficulty, stage,
                    promptLatex: "\\text{Simplify: } 8z - z", expressionLatex: "8z - z", targetLatex: "7z",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'z', count: 8, color: '#22c55e' }, { type: 'z', count: -1, color: '#9ca3af' }] },
                    slots: [{ id: "coef", labelLatex: "Coefficient", placeholder: "#", expected: 7 }, { id: "var", labelLatex: "Variable", placeholder: "x", expected: "z" }],
                    correctLatex: "7z", hintLatex: ["8-1=7"]
                },
                {
                    id: "T5-C", difficulty, stage,
                    promptLatex: "\\text{Simplify: } 2x + 2x + 2x", expressionLatex: "2x + 2x + 2x", targetLatex: "6x",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'x', count: 2, color: '#3b82f6' }, { type: 'x', count: 2, color: '#3b82f6' }, { type: 'x', count: 2, color: '#3b82f6' }] },
                    slots: [{ id: "coef", labelLatex: "Coefficient", placeholder: "#", expected: 6 }, { id: "var", labelLatex: "Variable", placeholder: "x", expected: "x" }],
                    correctLatex: "6x", hintLatex: ["2+2+2=6"]
                }
            );
        } else if (isAdv) {
            quests.push(
                {
                    id: "T1-A", difficulty, stage,
                    promptLatex: "\\text{Simplify: } 2x + 3y + x", expressionLatex: "3x + 3y", targetLatex: "Ax + By",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'x', count: 2, color: '#3b82f6' }, { type: 'y', count: 3, color: '#eab308' }, { type: 'x', count: 1, color: '#3b82f6' }] },
                    slots: [{ id: "x_term", labelLatex: "Term x", placeholder: "Ax", expected: "3x" }, { id: "y_term", labelLatex: "Term y", placeholder: "By", expected: "3y" }],
                    correctLatex: "3x+3y", hintLatex: ["Combine x's"]
                },
                {
                    id: "T2-A", difficulty, stage,
                    promptLatex: "\\text{Simplify: } 4a + 2b + a", expressionLatex: "5a + 2b", targetLatex: "Aa + Bb",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'a', count: 4, color: '#ef4444' }, { type: 'b', count: 2, color: '#22c55e' }, { type: 'a', count: 1, color: '#ef4444' }] },
                    slots: [{ id: "a_term", labelLatex: "Term a", placeholder: "Aa", expected: "5a" }, { id: "b_term", labelLatex: "Term b", placeholder: "Bb", expected: "2b" }],
                    correctLatex: "5a+2b", hintLatex: ["4a+a=5a"]
                },
                {
                    id: "T3-A", difficulty, stage,
                    promptLatex: "\\text{Simplify: } 5x + 5y - 2x", expressionLatex: "3x + 5y", targetLatex: "Ax + By",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'x', count: 5, color: '#3b82f6' }, { type: 'y', count: 5, color: '#eab308' }, { type: 'x', count: -2, color: '#9ca3af' }] },
                    slots: [{ id: "x_term", labelLatex: "Term x", placeholder: "Ax", expected: "3x" }, { id: "y_term", labelLatex: "Term y", placeholder: "By", expected: "5y" }],
                    correctLatex: "3x+5y", hintLatex: ["5x-2x=3x"]
                },
                {
                    id: "T4-A", difficulty, stage,
                    promptLatex: "\\text{Simplify: } 3a + 2b + 3a + b", expressionLatex: "6a + 3b", targetLatex: "Aa + Bb",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'a', count: 3, color: '#ef4444' }, { type: 'b', count: 2, color: '#22c55e' }, { type: 'a', count: 3, color: '#ef4444' }, { type: 'b', count: 1, color: '#22c55e' }] },
                    slots: [{ id: "a_term", labelLatex: "Term a", placeholder: "Aa", expected: "6a" }, { id: "b_term", labelLatex: "Term b", placeholder: "Bb", expected: "3b" }],
                    correctLatex: "6a+3b", hintLatex: ["Combine like terms."]
                },
                {
                    id: "T5-A", difficulty, stage,
                    promptLatex: "\\text{Simplify: } x + y + x + y", expressionLatex: "2x + 2y", targetLatex: "Ax + By",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'x', count: 1, color: '#3b82f6' }, { type: 'y', count: 1, color: '#eab308' }, { type: 'x', count: 1, color: '#3b82f6' }, { type: 'y', count: 1, color: '#eab308' }] },
                    slots: [{ id: "x_term", labelLatex: "Term x", placeholder: "Ax", expected: "2x" }, { id: "y_term", labelLatex: "Term y", placeholder: "By", expected: "2y" }],
                    correctLatex: "2x+2y", hintLatex: ["Two x's and two y's."]
                }
            );
        } else {
            // Elite
            quests.push(
                {
                    id: "T1-E", difficulty, stage,
                    promptLatex: "\\text{Simplify: } 4a + 5 - a + 2", expressionLatex: "3a + 7", targetLatex: "Aa + B",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'a', count: 4, color: '#ef4444' }, { type: '1', count: 5, color: '#64748b' }, { type: 'a', count: -1, color: '#fca5a5' }, { type: '1', count: 2, color: '#64748b' }] },
                    slots: [{ id: "res", labelLatex: "Result", placeholder: "3a+7", expected: "3a+7" }],
                    correctLatex: "3a+7", hintLatex: ["Combine terms and constants."]
                },
                {
                    id: "T2-E", difficulty, stage,
                    promptLatex: "\\text{Simplify: } 2x - 3 + 5x + 10", expressionLatex: "7x + 7", targetLatex: "Ax + B",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'x', count: 2, color: '#3b82f6' }, { type: '1', count: -3, color: '#64748b' }, { type: 'x', count: 5, color: '#3b82f6' }, { type: '1', count: 10, color: '#64748b' }] },
                    slots: [{ id: "res", labelLatex: "Result", placeholder: "7x+7", expected: "7x+7" }],
                    correctLatex: "7x+7", hintLatex: ["2x+5x=7x, -3+10=7"]
                },
                {
                    id: "T3-E", difficulty, stage,
                    promptLatex: "\\text{Simplify: } 3y + 2 - y - 5", expressionLatex: "2y - 3", targetLatex: "Ay - B",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'y', count: 3, color: '#eab308' }, { type: '1', count: 2, color: '#64748b' }, { type: 'y', count: -1, color: '#fca5a5' }, { type: '1', count: -5, color: '#64748b' }] },
                    slots: [{ id: "res", labelLatex: "Result", placeholder: "2y-3", expected: "2y-3" }],
                    correctLatex: "2y-3", hintLatex: ["3y-y=2y, 2-5=-3"]
                },
                {
                    id: "T4-E", difficulty, stage,
                    promptLatex: "\\text{Simplify: } 5a - 2a + 3b - b", expressionLatex: "3a + 2b", targetLatex: "Aa + Bb",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'a', count: 5, color: '#ef4444' }, { type: 'a', count: -2, color: '#fca5a5' }, { type: 'b', count: 3, color: '#22c55e' }, { type: 'b', count: -1, color: '#9ca3af' }] },
                    slots: [{ id: "res", labelLatex: "Result", placeholder: "3a+2b", expected: "3a+2b" }],
                    correctLatex: "3a+2b", hintLatex: ["Simplify each variable group."]
                },
                {
                    id: "T5-E", difficulty, stage,
                    promptLatex: "\\text{Simplify: } x + x + x - 3x", expressionLatex: "0", targetLatex: "0",
                    visualMode: 'SORTING', visualData: { items: [{ type: 'x', count: 1, color: '#3b82f6' }, { type: 'x', count: 1, color: '#3b82f6' }, { type: 'x', count: 1, color: '#3b82f6' }, { type: 'x', count: -3, color: '#fca5a5' }] },
                    slots: [{ id: "res", labelLatex: "Result", placeholder: "0", expected: "0" }],
                    correctLatex: "0", hintLatex: ["3x - 3x = 0"]
                }
            );
        }
    }

    // --- STAGE 3: SUBSTITUTION ---
    if (stage === "SUBSTITUTION") {
        if (isBasic) {
            quests.push(
                {
                    id: "S1-B", difficulty, stage,
                    promptLatex: "\\text{Evaluate } 2x \\text{ for } x=3", expressionLatex: "2(3)", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 3, formula: "2x" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 6 }],
                    correctLatex: "6", hintLatex: ["2 \\times 3"]
                },
                {
                    id: "S2-B", difficulty, stage,
                    promptLatex: "\\text{Evaluate } x + 5 \\text{ for } x=2", expressionLatex: "2+5", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 2, formula: "x+5" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 7 }],
                    correctLatex: "7", hintLatex: ["2+5"]
                },
                {
                    id: "S3-B", difficulty, stage,
                    promptLatex: "\\text{Evaluate } x - 1 \\text{ for } x=10", expressionLatex: "10-1", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 10, formula: "x-1" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 9 }],
                    correctLatex: "9", hintLatex: ["10-1"]
                },
                {
                    id: "S4-B", difficulty, stage,
                    promptLatex: "\\text{Evaluate } 3x \\text{ for } x=0", expressionLatex: "3(0)", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 0, formula: "3x" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 0 }],
                    correctLatex: "0", hintLatex: ["Any number times 0 is 0"]
                },
                {
                    id: "S5-B", difficulty, stage,
                    promptLatex: "\\text{Evaluate } \\frac{x}{2} \\text{ for } x=8", expressionLatex: "8/2", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 8, formula: "x/2" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 4 }],
                    correctLatex: "4", hintLatex: ["Half of 8"]
                }
            );
        } else if (isCore) {
            quests.push(
                {
                    id: "S1-C", difficulty, stage,
                    promptLatex: "\\text{Evaluate } 3x + 2 \\text{ for } x=4", expressionLatex: "3(4)+2", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 4, formula: "3x+2" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 14 }],
                    correctLatex: "14", hintLatex: ["3*4=12, 12+2=14"]
                },
                {
                    id: "S2-C", difficulty, stage,
                    promptLatex: "\\text{Evaluate } 2x - 5 \\text{ for } x=5", expressionLatex: "2(5)-5", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 5, formula: "2x-5" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 5 }],
                    correctLatex: "5", hintLatex: ["10-5=5"]
                },
                {
                    id: "S3-C", difficulty, stage,
                    promptLatex: "\\text{Evaluate } 4x + 1 \\text{ for } x=1", expressionLatex: "4(1)+1", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 1, formula: "4x+1" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 5 }],
                    correctLatex: "5", hintLatex: ["4+1=5"]
                },
                {
                    id: "S4-C", difficulty, stage,
                    promptLatex: "\\text{Evaluate } 10 - x \\text{ for } x=3", expressionLatex: "10-3", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 3, formula: "10-x" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 7 }],
                    correctLatex: "7", hintLatex: ["Subtract x from 10"]
                },
                {
                    id: "S5-C", difficulty, stage,
                    promptLatex: "\\text{Evaluate } 5x \\text{ for } x=1.5", expressionLatex: "5(1.5)", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 1.5, formula: "5x" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 7.5 }],
                    correctLatex: "7.5", hintLatex: ["5 * 1.5"]
                }
            );
        } else if (isAdv) {
            quests.push(
                {
                    id: "S1-A", difficulty, stage,
                    promptLatex: "\\text{Evaluate } x^2 \\text{ for } x=5", expressionLatex: "5^2", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 5, formula: "x^2" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 25 }],
                    correctLatex: "25", hintLatex: ["5 * 5"]
                },
                {
                    id: "S2-A", difficulty, stage,
                    promptLatex: "\\text{Evaluate } x^2 + 2 \\text{ for } x=3", expressionLatex: "3^2+2", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 3, formula: "x^2+2" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 11 }],
                    correctLatex: "11", hintLatex: ["9+2=11"]
                },
                {
                    id: "S3-A", difficulty, stage,
                    promptLatex: "\\text{Evaluate } 2x^2 \\text{ for } x=2", expressionLatex: "2(2^2)", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 2, formula: "2x^2" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 8 }],
                    correctLatex: "8", hintLatex: ["2*4=8"]
                },
                {
                    id: "S4-A", difficulty, stage,
                    promptLatex: "\\text{Evaluate } 100 - x^2 \\text{ for } x=4", expressionLatex: "100-4^2", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 4, formula: "100-x^2" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 84 }],
                    correctLatex: "84", hintLatex: ["100-16"]
                },
                {
                    id: "S5-A", difficulty, stage,
                    promptLatex: "\\text{Evaluate } (x+1)^2 \\text{ for } x=3", expressionLatex: "(3+1)^2", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 3, formula: "(x+1)^2" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 16 }],
                    correctLatex: "16", hintLatex: ["4^2=16"]
                }
            );
        } else {
            // Elite
            quests.push(
                {
                    id: "S1-E", difficulty, stage,
                    promptLatex: "\\text{Evaluate } 2x^2 + 1 \\text{ for } x=3", expressionLatex: "2(3^2)+1", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 3, formula: "2x^2+1" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 19 }],
                    correctLatex: "19", hintLatex: ["18+1=19"]
                },
                {
                    id: "S2-E", difficulty, stage,
                    promptLatex: "\\text{Evaluate } x^2 - 3x \\text{ for } x=5", expressionLatex: "5^2 - 3(5)", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 5, formula: "x^2-3x" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 10 }],
                    correctLatex: "10", hintLatex: ["25 - 15"]
                },
                {
                    id: "S3-E", difficulty, stage,
                    promptLatex: "\\text{Evaluate } \\frac{x^2}{2} \\text{ for } x=4", expressionLatex: "4^2/2", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 4, formula: "x^2/2" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 8 }],
                    correctLatex: "8", hintLatex: ["16/2"]
                },
                {
                    id: "S4-E", difficulty, stage,
                    promptLatex: "\\text{Evaluate } 3x^2 + x - 10 \\text{ for } x=2", expressionLatex: "3(2^2)+2-10", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 2, formula: "3x^2+x-10" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 4 }],
                    correctLatex: "4", hintLatex: ["12+2-10=4"]
                },
                {
                    id: "S5-E", difficulty, stage,
                    promptLatex: "\\text{Evaluate } \\sqrt{x} + 5 \\text{ for } x=16", expressionLatex: "\\sqrt{16}+5", targetLatex: "?",
                    visualMode: 'MACHINE', visualData: { inputValue: 16, formula: "\\sqrt{x}+5" },
                    slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 9 }],
                    correctLatex: "9", hintLatex: ["4+5=9"]
                }
            );
        }
    }

    return quests;
}

export default function SM103Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
    
    const sm1_02_t = {
        title: t("sm1_02.title"),
        back: t("sm1_02.back"),
        check: t("sm1_02.check"),
        next: t("sm1_02.next"),
        correct: t("sm1_02.correct"),
        incorrect: t("sm1_02.incorrect"),
        ready: t("sm1_02.ready"),
        difficulty: {
            basic: t("sm1_02.difficulty.basic"),
            core: t("sm1_02.difficulty.core"),
            advanced: t("sm1_02.difficulty.advanced"),
            elite: t("sm1_02.difficulty.elite")
        },
        stages: {
            variables: t("sm1_02.stages.variables"),
            terms: t("sm1_02.stages.terms"),
            substitution: t("sm1_02.stages.substitution")
        },
        scenarios: {
            variables: t("sm1_02.scenarios.variables"),
            terms: t("sm1_02.scenarios.terms"),
            substitution: t("sm1_02.scenarios.substitution")
        }
    };

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(sm1_02_t, d, s), [sm1_02_t]);

    const {
        difficulty, stage, inputs, lastCheck, currentQuest,
        successRate,
        setInputs, verify, next, handleDifficultyChange, handleStageChange,
    } = useQuestManager<S103Quest, Stage>({
        buildPool,
        initialStage: "VARIABLES",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sm1-02", stage);
        }
    }, [lastCheck, completeStage, stage]);

    // Format Visual Data for component
    const visualProps = currentQuest ? {
        mode: currentQuest.visualMode,
        data: currentQuest.visualData
    } : { mode: 'CONTAINERS' as AlgebraVisualMode, data: {} };


    return (
        <ChamberLayout
            title={sm1_02_t.title}
            moduleCode="SM1.02"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "VARIABLES", label: sm1_02_t.stages.variables },
                { id: "TERMS", label: sm1_02_t.stages.terms },
                { id: "SUBSTITUTION", label: sm1_02_t.stages.substitution },
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            successRate={successRate}
            checkStatus={lastCheck}
            translations={{
                back: sm1_02_t.back, check: sm1_02_t.check, next: sm1_02_t.next, correct: sm1_02_t.correct, incorrect: sm1_02_t.incorrect,
                ready: sm1_02_t.ready, monitor_title: "ALGEBRA_VISUALIZER",
                difficulty: { basic: sm1_02_t.difficulty.basic, core: sm1_02_t.difficulty.core, advanced: sm1_02_t.difficulty.advanced, elite: sm1_02_t.difficulty.elite },
            }}
            monitorContent={
                <div className="w-full h-full flex items-center justify-center">
                    <AlgebraCanvas {...visualProps} />
                </div>
            }
        >
            <div className="space-y-12">
                <div className="text-center group">
                    <div className="text-[10px] text-white/90 uppercase tracking-[0.5em] font-black mb-4 group-hover:text-neon-purple transition-colors">
                        MISSION OBJECTIVE
                    </div>
                    <div className="text-2xl text-white font-black italic whitespace-normal break-words leading-tight min-h-[5rem] flex items-center justify-center">
                        {currentQuest?.promptLatex && (
                            <InlineMath math={currentQuest.promptLatex} />
                        )}
                    </div>
                </div>

                <div className="max-w-2xl mx-auto w-full">
                    <div className="flex flex-wrap justify-center gap-8">
                        {currentQuest?.slots.map((slot) => (
                            <div key={slot.id} className="space-y-4">
                                <div className="flex items-center gap-2 justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-neon-purple/50" />
                                    <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                                        <InlineMath math={slot.labelLatex} />
                                    </div>
                                </div>
                                <input
                                    value={inputs[slot.id] ?? ""}
                                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                                    placeholder={slot.placeholder}
                                    className="w-48 bg-black/60 border-2 border-white/10 p-4 text-center outline-none focus:border-neon-purple text-white font-black text-3xl rounded-2xl transition-all focus:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scenario Hint Footer */}
                <div className="mt-8 text-center opacity-60 hover:opacity-100 transition-opacity">
                    <div className="text-xs font-mono text-neon-blue mb-2">SCENARIO CONTEXT</div>
                    <div className="text-sm italic text-white max-w-lg mx-auto leading-relaxed">
                        {stage === 'VARIABLES' && sm1_02_t.scenarios.variables}
                        {stage === 'TERMS' && sm1_02_t.scenarios.terms}
                        {stage === 'SUBSTITUTION' && sm1_02_t.scenarios.substitution}
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
