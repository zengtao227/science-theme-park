"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { clsx } from "clsx";
import { useEffect, useCallback } from "react";

import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import S204_SimilarityCanvas, { SimilarityVisual } from "@/components/chamber/sm2-04/SimilarityCanvas";

type Stage = "SCALE_FACTOR" | "SIMILAR_TRIANGLES" | "MISSION";

interface S204Quest extends Quest {
    stage: Stage;
    visual?: SimilarityVisual;
}

function buildStagePool(t: (path: string, params?: Record<string, string | number>) => any, difficulty: Difficulty, stage: Stage): S204Quest[] {
    if (stage === "SCALE_FACTOR") {
        // Each difficulty gets exactly 5 questions
        if (difficulty === "BASIC") {
            return [
                {
                    id: "SF_B1", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\text{Old}=4,\\; k=2`,
                    targetLatex: `\\text{New}`,
                    slots: [{ id: "n", labelLatex: `\\text{New}`, placeholder: "value", expected: 8 }],
                    correctLatex: `\\text{New}=4\\cdot 2=8`,
                    hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `\\text{New}=k\\cdot \\text{Old}`, `8`],
                    visual: { kind: "rect-scale", a: 4, b: 2, k: 2 },
                },
                {
                    id: "SF_B2", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\text{Old}=6,\\; k=3`,
                    targetLatex: `\\text{New}`,
                    slots: [{ id: "n", labelLatex: `\\text{New}`, placeholder: "value", expected: 18 }],
                    correctLatex: `\\text{New}=6\\cdot 3=18`,
                    hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `\\text{New}=k\\cdot \\text{Old}`, `18`],
                    visual: { kind: "rect-scale", a: 6, b: 2, k: 3 },
                },
                {
                    id: "SF_B3", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\text{Old}=10,\\; k=2`,
                    targetLatex: `\\text{New}`,
                    slots: [{ id: "n", labelLatex: `\\text{New}`, placeholder: "value", expected: 20 }],
                    correctLatex: `\\text{New}=10\\cdot 2=20`,
                    hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `\\text{New}=k\\cdot \\text{Old}`, `20`],
                    visual: { kind: "rect-scale", a: 10, b: 3, k: 2 },
                },
                {
                    id: "SF_B4", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\text{Old}=5,\\; k=4`,
                    targetLatex: `\\text{New}`,
                    slots: [{ id: "n", labelLatex: `\\text{New}`, placeholder: "value", expected: 20 }],
                    correctLatex: `\\text{New}=5\\cdot 4=20`,
                    hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `\\text{New}=k\\cdot \\text{Old}`, `20`],
                    visual: { kind: "rect-scale", a: 5, b: 2, k: 4 },
                },
                {
                    id: "SF_B5", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\text{Old}=8,\\; k=2`,
                    targetLatex: `\\text{New}`,
                    slots: [{ id: "n", labelLatex: `\\text{New}`, placeholder: "value", expected: 16 }],
                    correctLatex: `\\text{New}=8\\cdot 2=16`,
                    hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `\\text{New}=k\\cdot \\text{Old}`, `16`],
                    visual: { kind: "rect-scale", a: 8, b: 3, k: 2 },
                },
            ];
        }
        
        if (difficulty === "CORE") {
            return [
                {
                    id: "SF_C1", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\text{Old}=4,\\; k=\\frac{3}{2}`,
                    targetLatex: `\\text{New}`,
                    slots: [{ id: "n", labelLatex: `\\text{New}`, placeholder: "value", expected: 6 }],
                    correctLatex: `\\text{New}=4\\cdot \\frac{3}{2}=6`,
                    hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `\\text{New}=k\\cdot \\text{Old}`, `6`],
                    visual: { kind: "rect-scale", a: 4, b: 2, k: 1.5 },
                },
                {
                    id: "SF_C2", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\text{Old}=8,\\; \\text{New}=12`,
                    targetLatex: `k`,
                    slots: [{ id: "k", labelLatex: `k`, placeholder: "k", expected: 1.5 }],
                    correctLatex: `k=\\frac{12}{8}=\\frac{3}{2}=1.5`,
                    hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `k=\\frac{\\text{New}}{\\text{Old}}`, `k=\\frac{3}{2}`],
                    visual: { kind: "rect-scale", a: 8, b: 3, k: 1.5 },
                },
                {
                    id: "SF_C3", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\text{Old}=6,\\; k=\\frac{5}{3}`,
                    targetLatex: `\\text{New}`,
                    slots: [{ id: "n", labelLatex: `\\text{New}`, placeholder: "value", expected: 10 }],
                    correctLatex: `\\text{New}=6\\cdot \\frac{5}{3}=10`,
                    hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `\\text{New}=k\\cdot \\text{Old}`, `10`],
                    visual: { kind: "rect-scale", a: 6, b: 2, k: 5/3 },
                },
                {
                    id: "SF_C4", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\text{Old}=12,\\; \\text{New}=18`,
                    targetLatex: `k`,
                    slots: [{ id: "k", labelLatex: `k`, placeholder: "k", expected: 1.5 }],
                    correctLatex: `k=\\frac{18}{12}=\\frac{3}{2}=1.5`,
                    hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `k=\\frac{\\text{New}}{\\text{Old}}`, `1.5`],
                    visual: { kind: "rect-scale", a: 12, b: 3, k: 1.5 },
                },
                {
                    id: "SF_C5", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\text{Old}=9,\\; k=\\frac{4}{3}`,
                    targetLatex: `\\text{New}`,
                    slots: [{ id: "n", labelLatex: `\\text{New}`, placeholder: "value", expected: 12 }],
                    correctLatex: `\\text{New}=9\\cdot \\frac{4}{3}=12`,
                    hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `\\text{New}=k\\cdot \\text{Old}`, `12`],
                    visual: { kind: "rect-scale", a: 9, b: 3, k: 4/3 },
                },
            ];
        }
        
        if (difficulty === "ADVANCED") {
            return [
                {
                    id: "SF_A1", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\text{Old}=5,\\; k=0.8`,
                    targetLatex: `\\text{New}`,
                    slots: [{ id: "n", labelLatex: `\\text{New}`, placeholder: "value", expected: 4 }],
                    correctLatex: `\\text{New}=5\\cdot 0.8=4`,
                    hintLatex: [`\\text{Multiply by }k.`, `4`],
                    visual: { kind: "rect-scale", a: 5, b: 2, k: 0.8 },
                },
                {
                    id: "SF_A2", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\text{Old}=15,\\; \\text{New}=9`,
                    targetLatex: `k`,
                    slots: [{ id: "k", labelLatex: `k`, placeholder: "k", expected: 0.6 }],
                    correctLatex: `k=\\frac{9}{15}=0.6`,
                    hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `k=\\frac{9}{15}`, `0.6`],
                    visual: { kind: "rect-scale", a: 15, b: 4, k: 0.6 },
                },
                {
                    id: "SF_A3", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\text{Old}=7.5,\\; k=1.6`,
                    targetLatex: `\\text{New}`,
                    slots: [{ id: "n", labelLatex: `\\text{New}`, placeholder: "value", expected: 12 }],
                    correctLatex: `\\text{New}=7.5\\cdot 1.6=12`,
                    hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `\\text{New}=k\\cdot \\text{Old}`, `12`],
                    visual: { kind: "rect-scale", a: 7.5, b: 3, k: 1.6 },
                },
                {
                    id: "SF_A4", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\text{Old}=20,\\; \\text{New}=14`,
                    targetLatex: `k`,
                    slots: [{ id: "k", labelLatex: `k`, placeholder: "k", expected: 0.7 }],
                    correctLatex: `k=\\frac{14}{20}=0.7`,
                    hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `k=\\frac{14}{20}`, `0.7`],
                    visual: { kind: "rect-scale", a: 20, b: 5, k: 0.7 },
                },
                {
                    id: "SF_A5", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\text{Old}=12.5,\\; k=0.64`,
                    targetLatex: `\\text{New}`,
                    slots: [{ id: "n", labelLatex: `\\text{New}`, placeholder: "value", expected: 8 }],
                    correctLatex: `\\text{New}=12.5\\cdot 0.64=8`,
                    hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `\\text{New}=k\\cdot \\text{Old}`, `8`],
                    visual: { kind: "rect-scale", a: 12.5, b: 4, k: 0.64 },
                },
            ];
        }
        
        // ELITE difficulty
        return [
            {
                id: "SF_E1", difficulty, stage,
                promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                expressionLatex: `\\text{Old}=18,\\; \\text{New}=10.8`,
                targetLatex: `k`,
                slots: [{ id: "k", labelLatex: `k`, placeholder: "k", expected: 0.6 }],
                correctLatex: `k=\\frac{10.8}{18}=0.6`,
                hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `k=\\frac{10.8}{18}`, `0.6`],
                visual: { kind: "rect-scale", a: 18, b: 5, k: 0.6 },
            },
            {
                id: "SF_E2", difficulty, stage,
                promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                expressionLatex: `\\text{Old}=22.5,\\; k=\\frac{8}{15}`,
                targetLatex: `\\text{New}`,
                slots: [{ id: "n", labelLatex: `\\text{New}`, placeholder: "value", expected: 12 }],
                correctLatex: `\\text{New}=22.5\\cdot \\frac{8}{15}=12`,
                hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `\\text{New}=k\\cdot \\text{Old}`, `12`],
                visual: { kind: "rect-scale", a: 22.5, b: 6, k: 8/15 },
            },
            {
                id: "SF_E3", difficulty, stage,
                promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                expressionLatex: `\\text{Old}=16.8,\\; \\text{New}=25.2`,
                targetLatex: `k`,
                slots: [{ id: "k", labelLatex: `k`, placeholder: "k", expected: 1.5 }],
                correctLatex: `k=\\frac{25.2}{16.8}=1.5`,
                hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `k=\\frac{25.2}{16.8}`, `1.5`],
                visual: { kind: "rect-scale", a: 16.8, b: 5, k: 1.5 },
            },
            {
                id: "SF_E4", difficulty, stage,
                promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                expressionLatex: `\\text{Old}=27,\\; k=\\frac{5}{9}`,
                targetLatex: `\\text{New}`,
                slots: [{ id: "n", labelLatex: `\\text{New}`, placeholder: "value", expected: 15 }],
                correctLatex: `\\text{New}=27\\cdot \\frac{5}{9}=15`,
                hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `\\text{New}=k\\cdot \\text{Old}`, `15`],
                visual: { kind: "rect-scale", a: 27, b: 7, k: 5/9 },
            },
            {
                id: "SF_E5", difficulty, stage,
                promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                expressionLatex: `\\text{Old}=35,\\; \\text{New}=21`,
                targetLatex: `k`,
                slots: [{ id: "k", labelLatex: `k`, placeholder: "k", expected: 0.6 }],
                correctLatex: `k=\\frac{21}{35}=\\frac{3}{5}=0.6`,
                hintLatex: [t("sm2_04.hints.rules.scale_factor_latex"), `k=\\frac{21}{35}=\\frac{3}{5}`, `0.6`],
                visual: { kind: "rect-scale", a: 35, b: 8, k: 0.6 },
            },
        ];
    }


    if (stage === "SIMILAR_TRIANGLES") {
        // Each difficulty gets exactly 5 questions
        if (difficulty === "BASIC") {
            return [
                {
                    id: "ST_B1", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\frac{6}{3}=\\frac{x}{4}`,
                    targetLatex: `x`,
                    slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 8 }],
                    correctLatex: `k=2\\Rightarrow x=2\\cdot 4=8`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), t("sm2_04.hints.rules.cross_multiply_latex"), `x=8`],
                    visual: { kind: "tri-sim", a: 4, b: 8, k: 2 },
                },
                {
                    id: "ST_B2", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\frac{9}{3}=\\frac{x}{5}`,
                    targetLatex: `x`,
                    slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 15 }],
                    correctLatex: `k=3\\Rightarrow x=3\\cdot 5=15`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{9}{3}=3`, `x=15`],
                    visual: { kind: "tri-sim", a: 5, b: 15, k: 3 },
                },
                {
                    id: "ST_B3", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\frac{8}{4}=\\frac{x}{6}`,
                    targetLatex: `x`,
                    slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 12 }],
                    correctLatex: `k=2\\Rightarrow x=2\\cdot 6=12`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{8}{4}=2`, `x=12`],
                    visual: { kind: "tri-sim", a: 6, b: 12, k: 2 },
                },
                {
                    id: "ST_B4", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\frac{12}{4}=\\frac{x}{7}`,
                    targetLatex: `x`,
                    slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 21 }],
                    correctLatex: `k=3\\Rightarrow x=3\\cdot 7=21`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{12}{4}=3`, `x=21`],
                    visual: { kind: "tri-sim", a: 7, b: 21, k: 3 },
                },
                {
                    id: "ST_B5", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\frac{10}{5}=\\frac{x}{8}`,
                    targetLatex: `x`,
                    slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 16 }],
                    correctLatex: `k=2\\Rightarrow x=2\\cdot 8=16`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{10}{5}=2`, `x=16`],
                    visual: { kind: "tri-sim", a: 8, b: 16, k: 2 },
                },
            ];
        }
        
        if (difficulty === "CORE") {
            return [
                {
                    id: "ST_C1", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\frac{15}{5}=\\frac{x}{7}`,
                    targetLatex: `x`,
                    slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 21 }],
                    correctLatex: `x=7\\cdot 3=21`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{15}{5}=3`, `x=21`],
                    visual: { kind: "tri-sim", a: 7, b: 21, k: 3 },
                },
                {
                    id: "ST_C2", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\frac{9}{6}=\\frac{x}{12}`,
                    targetLatex: `x`,
                    slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 18 }],
                    correctLatex: `x=12\\cdot \\frac{3}{2}=18`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), t("sm2_04.hints.rules.cross_multiply_latex"), `x=18`],
                    visual: { kind: "tri-sim", a: 12, b: 18, k: 1.5 },
                },
                {
                    id: "ST_C3", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\frac{12}{8}=\\frac{y}{10}`,
                    targetLatex: `y`,
                    slots: [{ id: "y", labelLatex: `y`, placeholder: "y", expected: 15 }],
                    correctLatex: `y=10\\cdot \\frac{3}{2}=15`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{12}{8}=\\frac{3}{2}`, `y=15`],
                    visual: { kind: "tri-sim", a: 10, b: 15, k: 1.5 },
                },
                {
                    id: "ST_C4", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\frac{20}{8}=\\frac{x}{14}`,
                    targetLatex: `x`,
                    slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 35 }],
                    correctLatex: `x=14\\cdot \\frac{5}{2}=35`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{20}{8}=\\frac{5}{2}`, `x=35`],
                    visual: { kind: "tri-sim", a: 14, b: 35, k: 2.5 },
                },
                {
                    id: "ST_C5", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\frac{18}{12}=\\frac{z}{16}`,
                    targetLatex: `z`,
                    slots: [{ id: "z", labelLatex: `z`, placeholder: "z", expected: 24 }],
                    correctLatex: `z=16\\cdot \\frac{3}{2}=24`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{18}{12}=\\frac{3}{2}`, `z=24`],
                    visual: { kind: "tri-sim", a: 16, b: 24, k: 1.5 },
                },
            ];
        }
        
        if (difficulty === "ADVANCED") {
            return [
                {
                    id: "ST_A1", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\frac{7.5}{5}=\\frac{x}{8}`,
                    targetLatex: `x`,
                    slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 12 }],
                    correctLatex: `x=8\\cdot 1.5=12`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{7.5}{5}=1.5`, `x=12`],
                    visual: { kind: "tri-sim", a: 8, b: 12, k: 1.5 },
                },
                {
                    id: "ST_A2", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\frac{13.5}{9}=\\frac{y}{12}`,
                    targetLatex: `y`,
                    slots: [{ id: "y", labelLatex: `y`, placeholder: "y", expected: 18 }],
                    correctLatex: `y=12\\cdot 1.5=18`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{13.5}{9}=1.5`, `y=18`],
                    visual: { kind: "tri-sim", a: 12, b: 18, k: 1.5 },
                },
                {
                    id: "ST_A3", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\frac{16.8}{12}=\\frac{x}{15}`,
                    targetLatex: `x`,
                    slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 21 }],
                    correctLatex: `x=15\\cdot 1.4=21`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{16.8}{12}=1.4`, `x=21`],
                    visual: { kind: "tri-sim", a: 15, b: 21, k: 1.4 },
                },
                {
                    id: "ST_A4", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\frac{22.5}{15}=\\frac{z}{18}`,
                    targetLatex: `z`,
                    slots: [{ id: "z", labelLatex: `z`, placeholder: "z", expected: 27 }],
                    correctLatex: `z=18\\cdot 1.5=27`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{22.5}{15}=1.5`, `z=27`],
                    visual: { kind: "tri-sim", a: 18, b: 27, k: 1.5 },
                },
                {
                    id: "ST_A5", difficulty, stage,
                    promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                    expressionLatex: `\\frac{19.2}{16}=\\frac{w}{20}`,
                    targetLatex: `w`,
                    slots: [{ id: "w", labelLatex: `w`, placeholder: "w", expected: 24 }],
                    correctLatex: `w=20\\cdot 1.2=24`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{19.2}{16}=1.2`, `w=24`],
                    visual: { kind: "tri-sim", a: 20, b: 24, k: 1.2 },
                },
            ];
        }
        
        // ELITE difficulty
        return [
            {
                id: "ST_E1", difficulty, stage,
                promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                expressionLatex: `\\frac{24.5}{17.5}=\\frac{x}{21}`,
                targetLatex: `x`,
                slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 29.4 }],
                correctLatex: `x=21\\cdot 1.4=29.4`,
                hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{24.5}{17.5}=1.4`, `x=29.4`],
                visual: { kind: "tri-sim", a: 21, b: 29.4, k: 1.4 },
            },
            {
                id: "ST_E2", difficulty, stage,
                promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                expressionLatex: `\\frac{31.5}{22.5}=\\frac{y}{27}`,
                targetLatex: `y`,
                slots: [{ id: "y", labelLatex: `y`, placeholder: "y", expected: 37.8 }],
                correctLatex: `y=27\\cdot 1.4=37.8`,
                hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{31.5}{22.5}=1.4`, `y=37.8`],
                visual: { kind: "tri-sim", a: 27, b: 37.8, k: 1.4 },
            },
            {
                id: "ST_E3", difficulty, stage,
                promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                expressionLatex: `\\frac{28.8}{19.2}=\\frac{z}{24}`,
                targetLatex: `z`,
                slots: [{ id: "z", labelLatex: `z`, placeholder: "z", expected: 36 }],
                correctLatex: `z=24\\cdot 1.5=36`,
                hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{28.8}{19.2}=1.5`, `z=36`],
                visual: { kind: "tri-sim", a: 24, b: 36, k: 1.5 },
            },
            {
                id: "ST_E4", difficulty, stage,
                promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                expressionLatex: `\\frac{35.7}{25.5}=\\frac{w}{30}`,
                targetLatex: `w`,
                slots: [{ id: "w", labelLatex: `w`, placeholder: "w", expected: 42 }],
                correctLatex: `w=30\\cdot 1.4=42`,
                hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{35.7}{25.5}=1.4`, `w=42`],
                visual: { kind: "tri-sim", a: 30, b: 42, k: 1.4 },
            },
            {
                id: "ST_E5", difficulty, stage,
                promptLatex: t("sm2_04.stages.stages_prompt_latex"),
                expressionLatex: `\\frac{42}{28}=\\frac{v}{33}`,
                targetLatex: `v`,
                slots: [{ id: "v", labelLatex: `v`, placeholder: "v", expected: 49.5 }],
                correctLatex: `v=33\\cdot 1.5=49.5`,
                hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{42}{28}=1.5`, `v=49.5`],
                visual: { kind: "tri-sim", a: 33, b: 49.5, k: 1.5 },
            },
        ];
    }


    if (stage === "MISSION") {
        // Each difficulty gets exactly 5 questions
        if (difficulty === "BASIC") {
            return [
                {
                    id: "M_B1", difficulty, stage,
                    promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.tower_title")}\n${t("sm2_04.mission.description")}`,
                    expressionLatex: `\\text{Tower Shadow}=10\\text{ m},\\; \\text{Stick}(2\\text{ m})\\text{ Shadow}=4\\text{ m}`,
                    targetLatex: `\\text{Tower Height}(H)`,
                    slots: [{ id: "h", labelLatex: `H`, placeholder: "H", expected: 5 }],
                    correctLatex: `\\frac{H}{10}=\\frac{2}{4}\\Rightarrow H=5`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{H}{10}=0.5`, `H=5`],
                    visual: { kind: "shadow", a: 5, b: 10, k: 0.5 },
                },
                {
                    id: "M_B2", difficulty, stage,
                    promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.tower_title")}\n${t("sm2_04.mission.description")}`,
                    expressionLatex: `\\text{Tower Shadow}=12\\text{ m},\\; \\text{Stick}(2\\text{ m})\\text{ Shadow}=3\\text{ m}`,
                    targetLatex: `\\text{Tower Height}(H)`,
                    slots: [{ id: "h", labelLatex: `H`, placeholder: "H", expected: 8 }],
                    correctLatex: `\\frac{H}{12}=\\frac{2}{3}\\Rightarrow H=8`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{2}{3}\\approx 0.667`, `H=8`],
                    visual: { kind: "shadow", a: 8, b: 12, k: 2/3 },
                },
                {
                    id: "M_B3", difficulty, stage,
                    promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.tower_title")}\n${t("sm2_04.mission.description")}`,
                    expressionLatex: `\\text{Tower Shadow}=15\\text{ m},\\; \\text{Stick}(2\\text{ m})\\text{ Shadow}=5\\text{ m}`,
                    targetLatex: `\\text{Tower Height}(H)`,
                    slots: [{ id: "h", labelLatex: `H`, placeholder: "H", expected: 6 }],
                    correctLatex: `\\frac{H}{15}=\\frac{2}{5}\\Rightarrow H=6`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{2}{5}=0.4`, `H=6`],
                    visual: { kind: "shadow", a: 6, b: 15, k: 0.4 },
                },
                {
                    id: "M_B4", difficulty, stage,
                    promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.tower_title")}\n${t("sm2_04.mission.description")}`,
                    expressionLatex: `\\text{Tower Shadow}=8\\text{ m},\\; \\text{Stick}(2\\text{ m})\\text{ Shadow}=4\\text{ m}`,
                    targetLatex: `\\text{Tower Height}(H)`,
                    slots: [{ id: "h", labelLatex: `H`, placeholder: "H", expected: 4 }],
                    correctLatex: `\\frac{H}{8}=\\frac{2}{4}\\Rightarrow H=4`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{2}{4}=0.5`, `H=4`],
                    visual: { kind: "shadow", a: 4, b: 8, k: 0.5 },
                },
                {
                    id: "M_B5", difficulty, stage,
                    promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.tower_title")}\n${t("sm2_04.mission.description")}`,
                    expressionLatex: `\\text{Tower Shadow}=18\\text{ m},\\; \\text{Stick}(2\\text{ m})\\text{ Shadow}=6\\text{ m}`,
                    targetLatex: `\\text{Tower Height}(H)`,
                    slots: [{ id: "h", labelLatex: `H`, placeholder: "H", expected: 6 }],
                    correctLatex: `\\frac{H}{18}=\\frac{2}{6}\\Rightarrow H=6`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{2}{6}\\approx 0.333`, `H=6`],
                    visual: { kind: "shadow", a: 6, b: 18, k: 1/3 },
                },
            ];
        }
        
        if (difficulty === "CORE") {
            return [
                {
                    id: "M_C1", difficulty, stage,
                    promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.tower_title")}\n${t("sm2_04.mission.description")}`,
                    expressionLatex: `\\text{Tower Shadow}=12\\text{ m},\\; \\text{Stick}(1.5\\text{ m})\\text{ Shadow}=2.4\\text{ m}`,
                    targetLatex: `\\text{Tower Height}(H)`,
                    slots: [{ id: "h", labelLatex: `H`, placeholder: "H", expected: 7.5 }],
                    correctLatex: `\\frac{H}{12}=\\frac{1.5}{2.4}\\Rightarrow H=7.5`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{H}{12}=0.625`, `H=7.5`],
                    visual: { kind: "shadow", a: 7.5, b: 12, k: 0.625 },
                },
                {
                    id: "M_C2", difficulty, stage,
                    promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.tower_title")}\n${t("sm2_04.mission.description")}`,
                    expressionLatex: `\\text{Tower Shadow}=15\\text{ m},\\; \\text{Stick}(1.8\\text{ m})\\text{ Shadow}=3\\text{ m}`,
                    targetLatex: `\\text{Tower Height}(H)`,
                    slots: [{ id: "h", labelLatex: `H`, placeholder: "H", expected: 9 }],
                    correctLatex: `\\frac{H}{15}=\\frac{1.8}{3}\\Rightarrow H=9`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{1.8}{3}=0.6`, `H=9`],
                    visual: { kind: "shadow", a: 9, b: 15, k: 0.6 },
                },
                {
                    id: "M_C3", difficulty, stage,
                    promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.tower_title")}\n${t("sm2_04.mission.description")}`,
                    expressionLatex: `\\text{Tower Shadow}=18\\text{ m},\\; \\text{Stick}(2.5\\text{ m})\\text{ Shadow}=4.5\\text{ m}`,
                    targetLatex: `\\text{Tower Height}(H)`,
                    slots: [{ id: "h", labelLatex: `H`, placeholder: "H", expected: 10 }],
                    correctLatex: `\\frac{H}{18}=\\frac{2.5}{4.5}\\Rightarrow H=10`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{2.5}{4.5}\\approx 0.556`, `H=10`],
                    visual: { kind: "shadow", a: 10, b: 18, k: 5/9 },
                },
                {
                    id: "M_C4", difficulty, stage,
                    promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.tower_title")}\n${t("sm2_04.mission.description")}`,
                    expressionLatex: `\\text{Tower Shadow}=20\\text{ m},\\; \\text{Stick}(1.6\\text{ m})\\text{ Shadow}=3.2\\text{ m}`,
                    targetLatex: `\\text{Tower Height}(H)`,
                    slots: [{ id: "h", labelLatex: `H`, placeholder: "H", expected: 10 }],
                    correctLatex: `\\frac{H}{20}=\\frac{1.6}{3.2}\\Rightarrow H=10`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{1.6}{3.2}=0.5`, `H=10`],
                    visual: { kind: "shadow", a: 10, b: 20, k: 0.5 },
                },
                {
                    id: "M_C5", difficulty, stage,
                    promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.tower_title")}\n${t("sm2_04.mission.description")}`,
                    expressionLatex: `\\text{Tower Shadow}=24\\text{ m},\\; \\text{Stick}(2.1\\text{ m})\\text{ Shadow}=4.2\\text{ m}`,
                    targetLatex: `\\text{Tower Height}(H)`,
                    slots: [{ id: "h", labelLatex: `H`, placeholder: "H", expected: 12 }],
                    correctLatex: `\\frac{H}{24}=\\frac{2.1}{4.2}\\Rightarrow H=12`,
                    hintLatex: [t("sm2_04.hints.rules.proportional_latex"), `\\frac{2.1}{4.2}=0.5`, `H=12`],
                    visual: { kind: "shadow", a: 12, b: 24, k: 0.5 },
                },
            ];
        }
        
        if (difficulty === "ADVANCED") {
            return [
                {
                    id: "M_A1", difficulty, stage,
                    promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.ring_title")}\n${t("sm2_04.mission.ring_desc")}`,
                    expressionLatex: `R=6\\text{ cm},\\; L=9.6\\text{ cm}`,
                    targetLatex: `w`,
                    slots: [{ id: "w", labelLatex: `w`, placeholder: "width", expected: 1.2 }],
                    correctLatex: `d=\\sqrt{36-23.04}=3.6,\\; w=6-3.6=2.4`,
                    hintLatex: [`d=\\sqrt{R^2-(\\frac{L}{2})^2}`, `w=R-d`, `w=2.4`],
                    visual: { kind: "ring", a: 2.4, b: 6, r: 6, l: 9.6 },
                },
                {
                    id: "M_A2", difficulty, stage,
                    promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.ring_title")}\n${t("sm2_04.mission.ring_desc")}`,
                    expressionLatex: `R=8\\text{ cm},\\; L=12.8\\text{ cm}`,
                    targetLatex: `w`,
                    slots: [{ id: "w", labelLatex: `w`, placeholder: "width", expected: 3.2 }],
                    correctLatex: `d=\\sqrt{64-40.96}=4.8,\\; w=8-4.8=3.2`,
                    hintLatex: [`d=\\sqrt{R^2-(\\frac{L}{2})^2}`, `w=R-d`, `w=3.2`],
                    visual: { kind: "ring", a: 3.2, b: 8, r: 8, l: 12.8 },
                },
                {
                    id: "M_A3", difficulty, stage,
                    promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.ring_title")}\n${t("sm2_04.mission.ring_desc")}`,
                    expressionLatex: `R=10\\text{ cm},\\; L=16\\text{ cm}`,
                    targetLatex: `w`,
                    slots: [{ id: "w", labelLatex: `w`, placeholder: "width", expected: 4 }],
                    correctLatex: `d=\\sqrt{100-64}=6,\\; w=10-6=4`,
                    hintLatex: [`d=\\sqrt{R^2-(\\frac{L}{2})^2}`, `w=R-d`, `w=4`],
                    visual: { kind: "ring", a: 4, b: 10, r: 10, l: 16 },
                },
                {
                    id: "M_A4", difficulty, stage,
                    promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.ring_title")}\n${t("sm2_04.mission.ring_desc")}`,
                    expressionLatex: `R=7\\text{ cm},\\; L=11.2\\text{ cm}`,
                    targetLatex: `w`,
                    slots: [{ id: "w", labelLatex: `w`, placeholder: "width", expected: 2.8 }],
                    correctLatex: `d=\\sqrt{49-31.36}=4.2,\\; w=7-4.2=2.8`,
                    hintLatex: [`d=\\sqrt{R^2-(\\frac{L}{2})^2}`, `w=R-d`, `w=2.8`],
                    visual: { kind: "ring", a: 2.8, b: 7, r: 7, l: 11.2 },
                },
                {
                    id: "M_A5", difficulty, stage,
                    promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.ring_title")}\n${t("sm2_04.mission.ring_desc")}`,
                    expressionLatex: `R=9\\text{ cm},\\; L=14.4\\text{ cm}`,
                    targetLatex: `w`,
                    slots: [{ id: "w", labelLatex: `w`, placeholder: "width", expected: 3.6 }],
                    correctLatex: `d=\\sqrt{81-51.84}=5.4,\\; w=9-5.4=3.6`,
                    hintLatex: [`d=\\sqrt{R^2-(\\frac{L}{2})^2}`, `w=R-d`, `w=3.6`],
                    visual: { kind: "ring", a: 3.6, b: 9, r: 9, l: 14.4 },
                },
            ];
        }
        
        // ELITE difficulty
        return [
            {
                id: "M_E1", difficulty, stage,
                promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.ring_title")}\n${t("sm2_04.mission.ring_desc")}`,
                expressionLatex: `R=12\\text{ cm},\\; L=19.2\\text{ cm}`,
                targetLatex: `w`,
                slots: [{ id: "w", labelLatex: `w`, placeholder: "width", expected: 4.8 }],
                correctLatex: `d=\\sqrt{144-92.16}=7.2,\\; w=12-7.2=4.8`,
                hintLatex: [`d=\\sqrt{R^2-(\\frac{L}{2})^2}`, `w=R-d`, `w=4.8`],
                visual: { kind: "ring", a: 4.8, b: 12, r: 12, l: 19.2 },
            },
            {
                id: "M_E2", difficulty, stage,
                promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.ring_title")}\n${t("sm2_04.mission.ring_desc")}`,
                expressionLatex: `R=14\\text{ cm},\\; L=22.4\\text{ cm}`,
                targetLatex: `w`,
                slots: [{ id: "w", labelLatex: `w`, placeholder: "width", expected: 5.6 }],
                correctLatex: `d=\\sqrt{196-125.44}=8.4,\\; w=14-8.4=5.6`,
                hintLatex: [`d=\\sqrt{R^2-(\\frac{L}{2})^2}`, `w=R-d`, `w=5.6`],
                visual: { kind: "ring", a: 5.6, b: 14, r: 14, l: 22.4 },
            },
            {
                id: "M_E3", difficulty, stage,
                promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.ring_title")}\n${t("sm2_04.mission.ring_desc")}`,
                expressionLatex: `R=11\\text{ cm},\\; L=17.6\\text{ cm}`,
                targetLatex: `w`,
                slots: [{ id: "w", labelLatex: `w`, placeholder: "width", expected: 4.4 }],
                correctLatex: `d=\\sqrt{121-77.44}=6.6,\\; w=11-6.6=4.4`,
                hintLatex: [`d=\\sqrt{R^2-(\\frac{L}{2})^2}`, `w=R-d`, `w=4.4`],
                visual: { kind: "ring", a: 4.4, b: 11, r: 11, l: 17.6 },
            },
            {
                id: "M_E4", difficulty, stage,
                promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.ring_title")}\n${t("sm2_04.mission.ring_desc")}`,
                expressionLatex: `R=13\\text{ cm},\\; L=20.8\\text{ cm}`,
                targetLatex: `w`,
                slots: [{ id: "w", labelLatex: `w`, placeholder: "width", expected: 5.2 }],
                correctLatex: `d=\\sqrt{169-108.16}=7.8,\\; w=13-7.8=5.2`,
                hintLatex: [`d=\\sqrt{R^2-(\\frac{L}{2})^2}`, `w=R-d`, `w=5.2`],
                visual: { kind: "ring", a: 5.2, b: 13, r: 13, l: 20.8 },
            },
            {
                id: "M_E5", difficulty, stage,
                promptLatex: `${t("sm2_04.mission.protocol")}\n${t("sm2_04.mission.ring_title")}\n${t("sm2_04.mission.ring_desc")}`,
                expressionLatex: `R=15\\text{ cm},\\; L=24\\text{ cm}`,
                targetLatex: `w`,
                slots: [{ id: "w", labelLatex: `w`, placeholder: "width", expected: 6 }],
                correctLatex: `d=\\sqrt{225-144}=9,\\; w=15-9=6`,
                hintLatex: [`d=\\sqrt{R^2-(\\frac{L}{2})^2}`, `w=R-d`, `w=6`],
                visual: { kind: "ring", a: 6, b: 15, r: 15, l: 24 },
            },
        ];
    }

    return [];
}

export default function S204Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(t, d, s), [t]);

    const {
        difficulty,
        stage,
        inputs,
        lastCheck,
        currentQuest,
        successRate,
        setInputs,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
    } = useQuestManager<S204Quest, Stage>({
        buildPool,
        initialStage: "SCALE_FACTOR",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sm2-04", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stages = [
        { id: "SCALE_FACTOR", label: t("sm2_04.stages.scale_factor") },
        { id: "SIMILAR_TRIANGLES", label: t("sm2_04.stages.similar_triangles") },
        { id: "MISSION", label: t("sm2_04.mission.title") || t("sm2_04.stages.application") },
    ];

    return (
        <ChamberLayout
            title={t("sm2_04.title")}
            moduleCode="SM2.04"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stages}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            successRate={successRate}
            footerLeft={t("sm2_04.footer_left")}
            checkStatus={lastCheck}
            translations={{
                back: t("sm2_04.back"),
                check: t("sm2_04.check"),
                next: t("sm2_04.next"),
                correct: t("sm2_04.correct"),
                incorrect: t("sm2_04.incorrect"),
                ready: t("sm2_04.ready"),
                monitor_title: t("sm2_04.monitor_title"),
                difficulty: {
                    basic: t("sm2_04.difficulty.basic"),
                    core: t("sm2_04.difficulty.core"),
                    advanced: t("sm2_04.difficulty.advanced"),
                    elite: t("sm2_04.difficulty.elite"),
                },
            }}
            monitorContent={
                <>
                    <S204_SimilarityCanvas
                        visual={currentQuest.visual}
                        labels={{
                            tower: t("sm2_04.mission.labels.tower"),
                            tower_shadow: t("sm2_04.mission.labels.tower_shadow"),
                            stick: t("sm2_04.mission.labels.stick"),
                            stick_shadow: t("sm2_04.mission.labels.stick_shadow"),
                        }}
                    />

                    <div className="space-y-4">
                        <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
                            {t("sm2_04.target_title")}
                        </div>
                        <div className="text-white font-black text-xl overflow-x-auto max-w-full py-1 whitespace-normal break-words">
                            <span className="inline-block">
                                <InlineMath math={currentQuest.expressionLatex} />
                            </span>
                        </div>
                        <div className="text-white/70 font-mono text-sm whitespace-pre-wrap break-words">
                            {currentQuest.promptLatex}
                        </div>
                        {currentQuest.hintLatex && currentQuest.hintLatex.length > 0 && (
                            <div className="space-y-2 text-white font-black text-[10px] uppercase tracking-[0.25em]">
                                <div className="text-white/90">{t("sm2_04.labels.hints")}</div>
                                {currentQuest.hintLatex.slice(0, 3).map((h, idx) => (
                                    <div key={`${currentQuest.id}|h|${idx}`} className="flex gap-2 items-start">
                                        <div className="text-white/70 w-6">{String(idx + 1).padStart(2, "0")}</div>
                                        <div className="flex-1">
                                            <InlineMath math={h} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="text-white/70 text-[10px] font-black tracking-[0.3em] uppercase">
                            {difficulty}{" // "}S2.04{" // "}{stages.find(s => s.id === stage)?.label}
                        </div>
                    </div>
                </>
            }
        >
            <div className="space-y-6">
                <div className="text-center">
                    <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
                        {t("sm2_04.objective_title")}
                    </h3>
                    <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic whitespace-pre-wrap break-words">
                        {currentQuest.promptLatex}
                    </p>
                </div>

                <div className="flex justify-center overflow-x-auto w-full">
                    <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/60 rounded-2xl text-center relative w-fit max-w-[calc(100vw-3rem)] shadow-2xl">
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
                        <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">
                            {t("sm2_04.target_title")}
                        </span>
                        <div className="space-y-4">
                            <div className="text-white font-black text-[clamp(1.2rem,3.8vw,3.3rem)] leading-[1.2] whitespace-normal break-words">
                                <InlineMath math={currentQuest.expressionLatex} />
                            </div>
                            <div className="text-white/60 font-black">
                                <InlineMath math={currentQuest.targetLatex} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full">
                <div className="space-y-4">
                    <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
                        {t("sm2_04.labels.input")}
                    </div>
                    <div className={clsx("grid gap-4", currentQuest.slots.length <= 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3")}>
                        {currentQuest.slots.map((slot) => (
                            <div key={slot.id} className="space-y-2">
                                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                                    <InlineMath math={slot.labelLatex} />
                                </div>
                                <input
                                    value={inputs[slot.id] ?? ""}
                                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                                    className="w-full bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/70 font-black text-2xl text-white"
                                    placeholder={slot.placeholder}
                                    inputMode="numeric"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </ChamberLayout>
    );
}
