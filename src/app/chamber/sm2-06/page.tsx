"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useCallback } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import AlchemistCanvas, { type SystemsVisual } from "@/components/chamber/sm2-06/AlchemistCanvas";

type Stage = "SUBSTITUTION" | "ELIMINATION" | "MISSION";

interface S206Quest extends Quest {
  stage: Stage;
  visual: SystemsVisual;
}

function buildStagePool(t: (path: string, params?: Record<string, string | number>) => any, difficulty: Difficulty, stage: Stage): S206Quest[] {
  // SUBSTITUTION STAGE
  if (stage === "SUBSTITUTION") {
    if (difficulty === "BASIC") {
      return [
        {
          id: "SUB_B1", difficulty, stage,
          promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
          expressionLatex: `\\begin{cases} x = 2y \\\\ x + y = 6 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 1, b: -2, c: 0 },
            eq2: { a: 1, b: 1, c: 6 },
            intersect: { x: 4, y: 2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: "x", expected: 4 },
            { id: "y", labelLatex: "y", placeholder: "y", expected: 2 }
          ],
          correctLatex: `x=4, y=2`,
        },
        {
          id: "SUB_B2", difficulty, stage,
          promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
          expressionLatex: `\\begin{cases} x = 3y \\\\ x + y = 8 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 1, b: -3, c: 0 },
            eq2: { a: 1, b: 1, c: 8 },
            intersect: { x: 6, y: 2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: "x", expected: 6 },
            { id: "y", labelLatex: "y", placeholder: "y", expected: 2 }
          ],
          correctLatex: `x=6, y=2`,
        },
        {
          id: "SUB_B3", difficulty, stage,
          promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
          expressionLatex: `\\begin{cases} y = 2x \\\\ x + y = 9 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 2, b: -1, c: 0 },
            eq2: { a: 1, b: 1, c: 9 },
            intersect: { x: 3, y: 6 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: "x", expected: 3 },
            { id: "y", labelLatex: "y", placeholder: "y", expected: 6 }
          ],
          correctLatex: `x=3, y=6`,
        },
        {
          id: "SUB_B4", difficulty, stage,
          promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
          expressionLatex: `\\begin{cases} x = y \\\\ x + y = 10 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 1, b: -1, c: 0 },
            eq2: { a: 1, b: 1, c: 10 },
            intersect: { x: 5, y: 5 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: "x", expected: 5 },
            { id: "y", labelLatex: "y", placeholder: "y", expected: 5 }
          ],
          correctLatex: `x=5, y=5`,
        },
        {
          id: "SUB_B5", difficulty, stage,
          promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
          expressionLatex: `\\begin{cases} x = 4y \\\\ x + y = 10 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 1, b: -4, c: 0 },
            eq2: { a: 1, b: 1, c: 10 },
            intersect: { x: 8, y: 2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: "x", expected: 8 },
            { id: "y", labelLatex: "y", placeholder: "y", expected: 2 }
          ],
          correctLatex: `x=8, y=2`,
        },
      ];
    }
    
    if (difficulty === "CORE") {
      return [
        {
          id: "SUB_C1", difficulty, stage,
          promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
          expressionLatex: `\\begin{cases} y = 3x - 1 \\\\ x + y = 7 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 3, b: -1, c: 1 },
            eq2: { a: 1, b: 1, c: 7 },
            intersect: { x: 2, y: 5 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: "x", expected: 2 },
            { id: "y", labelLatex: "y", placeholder: "y", expected: 5 }
          ],
          correctLatex: `x=2, y=5`,
        },
        {
          id: "SUB_C2", difficulty, stage,
          promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
          expressionLatex: `\\begin{cases} y = 2x + 1 \\\\ x + y = 10 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 2, b: -1, c: -1 },
            eq2: { a: 1, b: 1, c: 10 },
            intersect: { x: 3, y: 7 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: "x", expected: 3 },
            { id: "y", labelLatex: "y", placeholder: "y", expected: 7 }
          ],
          correctLatex: `x=3, y=7`,
        },
        {
          id: "SUB_C3", difficulty, stage,
          promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
          expressionLatex: `\\begin{cases} x = 2y - 3 \\\\ x + y = 9 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 1, b: -2, c: -3 },
            eq2: { a: 1, b: 1, c: 9 },
            intersect: { x: 5, y: 4 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: "x", expected: 5 },
            { id: "y", labelLatex: "y", placeholder: "y", expected: 4 }
          ],
          correctLatex: `x=5, y=4`,
        },
        {
          id: "SUB_C4", difficulty, stage,
          promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
          expressionLatex: `\\begin{cases} y = 4x - 2 \\\\ 2x + y = 16 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 4, b: -1, c: 2 },
            eq2: { a: 2, b: 1, c: 16 },
            intersect: { x: 3, y: 10 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: "x", expected: 3 },
            { id: "y", labelLatex: "y", placeholder: "y", expected: 10 }
          ],
          correctLatex: `x=3, y=10`,
        },
        {
          id: "SUB_C5", difficulty, stage,
          promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
          expressionLatex: `\\begin{cases} x = 3y + 2 \\\\ x + 2y = 12 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 1, b: -3, c: -2 },
            eq2: { a: 1, b: 2, c: 12 },
            intersect: { x: 8, y: 2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: "x", expected: 8 },
            { id: "y", labelLatex: "y", placeholder: "y", expected: 2 }
          ],
          correctLatex: `x=8, y=2`,
        },
      ];
    }
    
    if (difficulty === "ADVANCED") {
      return [
        {
          id: "SUB_A1", difficulty, stage,
          promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
          expressionLatex: `\\begin{cases} y = \\frac{3x-1}{2} \\\\ 2x + y = 11 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 3, b: -2, c: 1 },
            eq2: { a: 2, b: 1, c: 11 },
            intersect: { x: 3, y: 4 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: "x", expected: 3 },
            { id: "y", labelLatex: "y", placeholder: "y", expected: 4 }
          ],
          correctLatex: `x=3, y=4`,
        },
        {
          id: "SUB_A2", difficulty, stage,
          promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
          expressionLatex: `\\begin{cases} x = \\frac{2y+3}{3} \\\\ 3x + y = 15 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 1, b: -2/3, c: -1 },
            eq2: { a: 3, b: 1, c: 15 },
            intersect: { x: 3, y: 6 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: "x", expected: 3 },
            { id: "y", labelLatex: "y", placeholder: "y", expected: 6 }
          ],
          correctLatex: `x=3, y=6`,
        },
        {
          id: "SUB_A3", difficulty, stage,
          promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
          expressionLatex: `\\begin{cases} y = \\frac{5x-4}{3} \\\\ x + 2y = 14 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 5, b: -3, c: 4 },
            eq2: { a: 1, b: 2, c: 14 },
            intersect: { x: 4, y: 5 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: "x", expected: 4 },
            { id: "y", labelLatex: "y", placeholder: "y", expected: 5 }
          ],
          correctLatex: `x=4, y=5`,
        },
        {
          id: "SUB_A4", difficulty, stage,
          promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
          expressionLatex: `\\begin{cases} x = \\frac{4y-5}{2} \\\\ 2x + 3y = 19 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 1, b: -2, c: 2.5 },
            eq2: { a: 2, b: 3, c: 19 },
            intersect: { x: 3.5, y: 4 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: "x", expected: 3.5 },
            { id: "y", labelLatex: "y", placeholder: "y", expected: 4 }
          ],
          correctLatex: `x=3.5, y=4`,
        },
        {
          id: "SUB_A5", difficulty, stage,
          promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
          expressionLatex: `\\begin{cases} y = \\frac{7x-6}{4} \\\\ 3x + 2y = 18 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 7, b: -4, c: 6 },
            eq2: { a: 3, b: 2, c: 18 },
            intersect: { x: 4, y: 5.5 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: "x", expected: 4 },
            { id: "y", labelLatex: "y", placeholder: "y", expected: 5.5 }
          ],
          correctLatex: `x=4, y=5.5`,
        },
      ];
    }
    
    // ELITE difficulty
    return [
      {
        id: "SUB_E1", difficulty, stage,
        promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
        expressionLatex: `\\begin{cases} y = \\frac{5x-7}{3} \\\\ 4x + 3y = 25 \\end{cases}`,
        targetLatex: `x, y`,
        visual: {
          eq1: { a: 5, b: -3, c: 7 },
          eq2: { a: 4, b: 3, c: 25 },
          intersect: { x: 4, y: 4.33 }
        },
        slots: [
          { id: "x", labelLatex: "x", placeholder: "x", expected: 4 },
          { id: "y", labelLatex: "y", placeholder: "y", expected: 4.33 }
        ],
        correctLatex: `x=4, y=\\frac{13}{3}\\approx 4.33`,
      },
      {
        id: "SUB_E2", difficulty, stage,
        promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
        expressionLatex: `\\begin{cases} x = \\frac{7y-11}{5} \\\\ 5x + 2y = 23 \\end{cases}`,
        targetLatex: `x, y`,
        visual: {
          eq1: { a: 1, b: -7/5, c: 11/5 },
          eq2: { a: 5, b: 2, c: 23 },
          intersect: { x: 3, y: 4 }
        },
        slots: [
          { id: "x", labelLatex: "x", placeholder: "x", expected: 3 },
          { id: "y", labelLatex: "y", placeholder: "y", expected: 4 }
        ],
        correctLatex: `x=3, y=4`,
      },
      {
        id: "SUB_E3", difficulty, stage,
        promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
        expressionLatex: `\\begin{cases} y = \\frac{8x-13}{5} \\\\ 3x + 5y = 31 \\end{cases}`,
        targetLatex: `x, y`,
        visual: {
          eq1: { a: 8, b: -5, c: 13 },
          eq2: { a: 3, b: 5, c: 31 },
          intersect: { x: 4, y: 3.8 }
        },
        slots: [
          { id: "x", labelLatex: "x", placeholder: "x", expected: 4 },
          { id: "y", labelLatex: "y", placeholder: "y", expected: 3.8 }
        ],
        correctLatex: `x=4, y=\\frac{19}{5}=3.8`,
      },
      {
        id: "SUB_E4", difficulty, stage,
        promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
        expressionLatex: `\\begin{cases} x = \\frac{9y-17}{7} \\\\ 7x + 3y = 35 \\end{cases}`,
        targetLatex: `x, y`,
        visual: {
          eq1: { a: 1, b: -9/7, c: 17/7 },
          eq2: { a: 7, b: 3, c: 35 },
          intersect: { x: 4, y: 3.67 }
        },
        slots: [
          { id: "x", labelLatex: "x", placeholder: "x", expected: 4 },
          { id: "y", labelLatex: "y", placeholder: "y", expected: 3.67 }
        ],
        correctLatex: `x=4, y=\\frac{11}{3}\\approx 3.67`,
      },
      {
        id: "SUB_E5", difficulty, stage,
        promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
        expressionLatex: `\\begin{cases} y = \\frac{11x-19}{6} \\\\ 2x + 3y = 17 \\end{cases}`,
        targetLatex: `x, y`,
        visual: {
          eq1: { a: 11, b: -6, c: 19 },
          eq2: { a: 2, b: 3, c: 17 },
          intersect: { x: 5, y: 4.33 }
        },
        slots: [
          { id: "x", labelLatex: "x", placeholder: "x", expected: 5 },
          { id: "y", labelLatex: "y", placeholder: "y", expected: 4.33 }
        ],
        correctLatex: `x=5, y=\\frac{13}{3}\\approx 4.33`,
      },
    ];
  }
