"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useCallback, useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { renderMixedText, KatexTextWrap } from "@/lib/latex-utils";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import AlchemistCanvas, { type SystemsVisual } from "@/components/chamber/sm2-06/AlchemistCanvas";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";

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
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
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
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 6 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
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
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 3 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 6 }
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
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 5 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 5 }
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
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 8 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
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
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 2 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 5 }
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
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 3 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 7 }
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
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 5 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 4 }
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
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 3 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 10 }
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
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 8 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
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
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 3 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 4 }
          ],
          correctLatex: `x=3, y=4`,
        },
        {
          id: "SUB_A2", difficulty, stage,
          promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
          expressionLatex: `\\begin{cases} x = \\frac{2y+3}{3} \\\\ 3x + y = 15 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 1, b: -2 / 3, c: -1 },
            eq2: { a: 3, b: 1, c: 15 },
            intersect: { x: 3, y: 6 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 3 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 6 }
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
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 5 }
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
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 3.5 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 4 }
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
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 5.5 }
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
          { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
          { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 4.33 }
        ],
        correctLatex: `x=4, y=\\frac{13}{3}\\approx 4.33`,
      },
      {
        id: "SUB_E2", difficulty, stage,
        promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
        expressionLatex: `\\begin{cases} x = \\frac{7y-11}{5} \\\\ 5x + 2y = 23 \\end{cases}`,
        targetLatex: `x, y`,
        visual: {
          eq1: { a: 1, b: -7 / 5, c: 11 / 5 },
          eq2: { a: 5, b: 2, c: 23 },
          intersect: { x: 3, y: 4 }
        },
        slots: [
          { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 3 },
          { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 4 }
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
          { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
          { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 3.8 }
        ],
        correctLatex: `x=4, y=\\frac{19}{5}=3.8`,
      },
      {
        id: "SUB_E4", difficulty, stage,
        promptLatex: t("sm2_06.stages.substitution_prompt_latex"),
        expressionLatex: `\\begin{cases} x = \\frac{9y-17}{7} \\\\ 7x + 3y = 35 \\end{cases}`,
        targetLatex: `x, y`,
        visual: {
          eq1: { a: 1, b: -9 / 7, c: 17 / 7 },
          eq2: { a: 7, b: 3, c: 35 },
          intersect: { x: 4, y: 3.67 }
        },
        slots: [
          { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
          { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 3.67 }
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
          { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 5 },
          { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 4.33 }
        ],
        correctLatex: `x=5, y=\\frac{13}{3}\\approx 4.33`,
      },
    ];
  }

  // ELIMINATION STAGE
  if (stage === "ELIMINATION") {
    if (difficulty === "BASIC") {
      return [
        {
          id: "ELIM_B1", difficulty, stage,
          promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
          expressionLatex: `\\begin{cases} x + y = 5 \\\\ x - y = 1 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 1, b: 1, c: 5 },
            eq2: { a: 1, b: -1, c: 1 },
            intersect: { x: 3, y: 2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 3 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
          ],
          correctLatex: `x=3, y=2`,
        },
        {
          id: "ELIM_B2", difficulty, stage,
          promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
          expressionLatex: `\\begin{cases} x + y = 7 \\\\ x - y = 3 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 1, b: 1, c: 7 },
            eq2: { a: 1, b: -1, c: 3 },
            intersect: { x: 5, y: 2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 5 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
          ],
          correctLatex: `x=5, y=2`,
        },
        {
          id: "ELIM_B3", difficulty, stage,
          promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
          expressionLatex: `\\begin{cases} 2x + y = 10 \\\\ 2x - y = 6 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 2, b: 1, c: 10 },
            eq2: { a: 2, b: -1, c: 6 },
            intersect: { x: 4, y: 2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
          ],
          correctLatex: `x=4, y=2`,
        },
        {
          id: "ELIM_B4", difficulty, stage,
          promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
          expressionLatex: `\\begin{cases} x + 2y = 8 \\\\ x - 2y = 0 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 1, b: 2, c: 8 },
            eq2: { a: 1, b: -2, c: 0 },
            intersect: { x: 4, y: 2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
          ],
          correctLatex: `x=4, y=2`,
        },
        {
          id: "ELIM_B5", difficulty, stage,
          promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
          expressionLatex: `\\begin{cases} 3x + y = 11 \\\\ 3x - y = 7 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 3, b: 1, c: 11 },
            eq2: { a: 3, b: -1, c: 7 },
            intersect: { x: 3, y: 2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 3 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
          ],
          correctLatex: `x=3, y=2`,
        },
      ];
    }

    if (difficulty === "CORE") {
      return [
        {
          id: "ELIM_C1", difficulty, stage,
          promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
          expressionLatex: `\\begin{cases} 2x + 3y = 13 \\\\ 2x - y = 5 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 2, b: 3, c: 13 },
            eq2: { a: 2, b: -1, c: 5 },
            intersect: { x: 4, y: 2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
          ],
          correctLatex: `x=4, y=\\frac{5}{4}`,
        },
        {
          id: "ELIM_C2", difficulty, stage,
          promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
          expressionLatex: `\\begin{cases} 3x + 2y = 16 \\\\ 3x - 4y = 4 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 3, b: 2, c: 16 },
            eq2: { a: 3, b: -4, c: 4 },
            intersect: { x: 4, y: 2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
          ],
          correctLatex: `x=4, y=2`,
        },
        {
          id: "ELIM_C3", difficulty, stage,
          promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
          expressionLatex: `\\begin{cases} 4x + 3y = 22 \\\\ 2x + 3y = 14 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 4, b: 3, c: 22 },
            eq2: { a: 2, b: 3, c: 14 },
            intersect: { x: 4, y: 2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
          ],
          correctLatex: `x=4, y=2`,
        },
        {
          id: "ELIM_C4", difficulty, stage,
          promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
          expressionLatex: `\\begin{cases} 5x + 2y = 24 \\\\ 3x + 2y = 16 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 5, b: 2, c: 24 },
            eq2: { a: 3, b: 2, c: 16 },
            intersect: { x: 4, y: 2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
          ],
          correctLatex: `x=4, y=2`,
        },
        {
          id: "ELIM_C5", difficulty, stage,
          promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
          expressionLatex: `\\begin{cases} 3x + 4y = 20 \\\\ 3x - 2y = 8 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 3, b: 4, c: 20 },
            eq2: { a: 3, b: -2, c: 8 },
            intersect: { x: 4, y: 2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
          ],
          correctLatex: `x=4, y=2`,
        },
      ];
    }

    if (difficulty === "ADVANCED") {
      return [
        {
          id: "ELIM_A1", difficulty, stage,
          promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
          expressionLatex: `\\begin{cases} 3x + 5y = 23 \\\\ 2x - 5y = -3 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 3, b: 5, c: 23 },
            eq2: { a: 2, b: -5, c: -3 },
            intersect: { x: 4, y: 2.2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2.2 }
          ],
          correctLatex: `x=4, y=2.2`,
        },
        {
          id: "ELIM_A2", difficulty, stage,
          promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
          expressionLatex: `\\begin{cases} 4x + 7y = 30 \\\\ 3x - 7y = -2 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 4, b: 7, c: 30 },
            eq2: { a: 3, b: -7, c: -2 },
            intersect: { x: 4, y: 2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
          ],
          correctLatex: `x=4, y=2`,
        },
        {
          id: "ELIM_A3", difficulty, stage,
          promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
          expressionLatex: `\\begin{cases} 5x + 3y = 26 \\\\ 4x - 3y = 10 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 5, b: 3, c: 26 },
            eq2: { a: 4, b: -3, c: 10 },
            intersect: { x: 4, y: 2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
          ],
          correctLatex: `x=4, y=2`,
        },
        {
          id: "ELIM_A4", difficulty, stage,
          promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
          expressionLatex: `\\begin{cases} 7x + 4y = 36 \\\\ 5x - 4y = 12 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 7, b: 4, c: 36 },
            eq2: { a: 5, b: -4, c: 12 },
            intersect: { x: 4, y: 2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
          ],
          correctLatex: `x=4, y=2`,
        },
        {
          id: "ELIM_A5", difficulty, stage,
          promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
          expressionLatex: `\\begin{cases} 6x + 5y = 34 \\\\ 4x - 5y = 6 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 6, b: 5, c: 34 },
            eq2: { a: 4, b: -5, c: 6 },
            intersect: { x: 4, y: 2 }
          },
          slots: [
            { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
            { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
          ],
          correctLatex: `x=4, y=2`,
        },
      ];
    }

    // ELITE difficulty
    return [
      {
        id: "ELIM_E1", difficulty, stage,
        promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
        expressionLatex: `\\begin{cases} 7x + 11y = 50 \\\\ 5x - 11y = -2 \\end{cases}`,
        targetLatex: `x, y`,
        visual: {
          eq1: { a: 7, b: 11, c: 50 },
          eq2: { a: 5, b: -11, c: -2 },
          intersect: { x: 4, y: 2 }
        },
        slots: [
          { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
          { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
        ],
        correctLatex: `x=4, y=2`,
      },
      {
        id: "ELIM_E2", difficulty, stage,
        promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
        expressionLatex: `\\begin{cases} 9x + 13y = 62 \\\\ 7x - 13y = 2 \\end{cases}`,
        targetLatex: `x, y`,
        visual: {
          eq1: { a: 9, b: 13, c: 62 },
          eq2: { a: 7, b: -13, c: 2 },
          intersect: { x: 4, y: 2 }
        },
        slots: [
          { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
          { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
        ],
        correctLatex: `x=4, y=2`,
      },
      {
        id: "ELIM_E3", difficulty, stage,
        promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
        expressionLatex: `\\begin{cases} 11x + 8y = 60 \\\\ 9x - 8y = 20 \\end{cases}`,
        targetLatex: `x, y`,
        visual: {
          eq1: { a: 11, b: 8, c: 60 },
          eq2: { a: 9, b: -8, c: 20 },
          intersect: { x: 4, y: 2 }
        },
        slots: [
          { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
          { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
        ],
        correctLatex: `x=4, y=2`,
      },
      {
        id: "ELIM_E4", difficulty, stage,
        promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
        expressionLatex: `\\begin{cases} 13x + 9y = 70 \\\\ 11x - 9y = 26 \\end{cases}`,
        targetLatex: `x, y`,
        visual: {
          eq1: { a: 13, b: 9, c: 70 },
          eq2: { a: 11, b: -9, c: 26 },
          intersect: { x: 4, y: 2 }
        },
        slots: [
          { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
          { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
        ],
        correctLatex: `x=4, y=2`,
      },
      {
        id: "ELIM_E5", difficulty, stage,
        promptLatex: t("sm2_06.stages.elimination_prompt_latex"),
        expressionLatex: `\\begin{cases} 15x + 7y = 74 \\\\ 13x - 7y = 38 \\end{cases}`,
        targetLatex: `x, y`,
        visual: {
          eq1: { a: 15, b: 7, c: 74 },
          eq2: { a: 13, b: -7, c: 38 },
          intersect: { x: 4, y: 2 }
        },
        slots: [
          { id: "x", labelLatex: "x", placeholder: t("sm2_06.placeholders.x"), expected: 4 },
          { id: "y", labelLatex: "y", placeholder: t("sm2_06.placeholders.y"), expected: 2 }
        ],
        correctLatex: `x=4, y=2`,
      },
    ];
  }

  // MISSION STAGE - Word Problems
  if (stage === "MISSION") {
    if (difficulty === "BASIC") {
      return [
        {
          id: "MISS_B1", difficulty, stage,
          promptLatex: t("sm2_06.stages.mission_prompt_1"),
          expressionLatex: `\\begin{cases} x + y = 10 \\\\ x = 2y \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 1, b: 1, c: 10 },
            eq2: { a: 1, b: -2, c: 0 },
            intersect: { x: 6.67, y: 3.33 }
          },
          slots: [
            { id: "x", labelLatex: `\\text{${t("sm2_06.mission.apples")}}`, placeholder: t("sm2_06.placeholders.apples"), expected: 6.67 },
            { id: "y", labelLatex: `\\text{${t("sm2_06.mission.oranges")}}`, placeholder: t("sm2_06.placeholders.oranges"), expected: 3.33 }
          ],
          correctLatex: `\\text{${t("sm2_06.mission.apples")}}=6.67, \\text{${t("sm2_06.mission.oranges")}}=3.33`,
        },
        {
          id: "MISS_B2", difficulty, stage,
          promptLatex: t("sm2_06.stages.mission_prompt_2"),
          expressionLatex: `\\begin{cases} x + y = 15 \\\\ x - y = 5 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 1, b: 1, c: 15 },
            eq2: { a: 1, b: -1, c: 5 },
            intersect: { x: 10, y: 5 }
          },
          slots: [
            { id: "x", labelLatex: `\\text{${t("sm2_06.mission.adult")}}`, placeholder: t("sm2_06.placeholders.adult"), expected: 10 },
            { id: "y", labelLatex: `\\text{${t("sm2_06.mission.child")}}`, placeholder: t("sm2_06.placeholders.child"), expected: 5 }
          ],
          correctLatex: `\\text{${t("sm2_06.mission.adult")}}=10, \\text{${t("sm2_06.mission.child")}}=5`,
        },
        {
          id: "MISS_B3", difficulty, stage,
          promptLatex: t("sm2_06.stages.mission_prompt_3"),
          expressionLatex: `\\begin{cases} x + y = 20 \\\\ 2x + y = 35 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 1, b: 1, c: 20 },
            eq2: { a: 2, b: 1, c: 35 },
            intersect: { x: 15, y: 5 }
          },
          slots: [
            { id: "x", labelLatex: `\\text{${t("sm2_06.mission.pens")}}`, placeholder: t("sm2_06.placeholders.pens"), expected: 15 },
            { id: "y", labelLatex: `\\text{${t("sm2_06.mission.pencils")}}`, placeholder: t("sm2_06.placeholders.pencils"), expected: 5 }
          ],
          correctLatex: `\\text{${t("sm2_06.mission.pens")}}=15, \\text{${t("sm2_06.mission.pencils")}}=5`,
        },
        {
          id: "MISS_B4", difficulty, stage,
          promptLatex: t("sm2_06.stages.mission_prompt_4"),
          expressionLatex: `\\begin{cases} x + y = 12 \\\\ x = 3y \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 1, b: 1, c: 12 },
            eq2: { a: 1, b: -3, c: 0 },
            intersect: { x: 9, y: 3 }
          },
          slots: [
            { id: "x", labelLatex: `\\text{${t("sm2_06.mission.dogs")}}`, placeholder: t("sm2_06.placeholders.dogs"), expected: 9 },
            { id: "y", labelLatex: `\\text{${t("sm2_06.mission.cats")}}`, placeholder: t("sm2_06.placeholders.cats"), expected: 3 }
          ],
          correctLatex: `\\text{${t("sm2_06.mission.dogs")}}=9, \\text{${t("sm2_06.mission.cats")}}=3`,
        },
        {
          id: "MISS_B5", difficulty, stage,
          promptLatex: t("sm2_06.stages.mission_prompt_5"),
          expressionLatex: `\\begin{cases} x + y = 18 \\\\ x - y = 6 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 1, b: 1, c: 18 },
            eq2: { a: 1, b: -1, c: 6 },
            intersect: { x: 12, y: 6 }
          },
          slots: [
            { id: "x", labelLatex: `\\text{${t("sm2_06.mission.large")}}`, placeholder: t("sm2_06.placeholders.large"), expected: 12 },
            { id: "y", labelLatex: `\\text{${t("sm2_06.mission.small")}}`, placeholder: t("sm2_06.placeholders.small"), expected: 6 }
          ],
          correctLatex: `\\text{${t("sm2_06.mission.large")}}=12, \\text{${t("sm2_06.mission.small")}}=6`,
        },
      ];
    }

    if (difficulty === "CORE") {
      return [
        {
          id: "MISS_C1", difficulty, stage,
          promptLatex: t("sm2_06.stages.mission_prompt_6"),
          expressionLatex: `\\begin{cases} 2x + 3y = 23 \\\\ x + y = 9 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 2, b: 3, c: 23 },
            eq2: { a: 1, b: 1, c: 9 },
            intersect: { x: 4, y: 5 }
          },
          slots: [
            { id: "x", labelLatex: `\\text{${t("sm2_06.mission.coffee")}}`, placeholder: t("sm2_06.placeholders.coffee"), expected: 4 },
            { id: "y", labelLatex: `\\text{${t("sm2_06.mission.tea")}}`, placeholder: t("sm2_06.placeholders.tea"), expected: 5 }
          ],
          correctLatex: `\\text{${t("sm2_06.mission.coffee")}}=4, \\text{${t("sm2_06.mission.tea")}}=5`,
        },
        {
          id: "MISS_C2", difficulty, stage,
          promptLatex: t("sm2_06.stages.mission_prompt_7"),
          expressionLatex: `\\begin{cases} 3x + 2y = 26 \\\\ x + y = 10 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 3, b: 2, c: 26 },
            eq2: { a: 1, b: 1, c: 10 },
            intersect: { x: 6, y: 4 }
          },
          slots: [
            { id: "x", labelLatex: `\\text{${t("sm2_06.mission.hours")}}`, placeholder: t("sm2_06.placeholders.hours"), expected: 6 },
            { id: "y", labelLatex: `\\text{${t("sm2_06.mission.days")}}`, placeholder: t("sm2_06.placeholders.days"), expected: 4 }
          ],
          correctLatex: `\\text{${t("sm2_06.mission.hours")}}=6, \\text{${t("sm2_06.mission.days")}}=4`,
        },
        {
          id: "MISS_C3", difficulty, stage,
          promptLatex: t("sm2_06.stages.mission_prompt_8"),
          expressionLatex: `\\begin{cases} 4x + 5y = 38 \\\\ 2x + y = 14 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 4, b: 5, c: 38 },
            eq2: { a: 2, b: 1, c: 14 },
            intersect: { x: 4, y: 6 }
          },
          slots: [
            { id: "x", labelLatex: `\\text{${t("sm2_06.mission.books")}}`, placeholder: t("sm2_06.placeholders.books"), expected: 4 },
            { id: "y", labelLatex: `\\text{${t("sm2_06.mission.magazines")}}`, placeholder: t("sm2_06.placeholders.magazines"), expected: 6 }
          ],
          correctLatex: `\\text{${t("sm2_06.mission.books")}}=4, \\text{${t("sm2_06.mission.magazines")}}=6`,
        },
        {
          id: "MISS_C4", difficulty, stage,
          promptLatex: t("sm2_06.stages.mission_prompt_9"),
          expressionLatex: `\\begin{cases} 5x + 3y = 34 \\\\ 2x + y = 13 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 5, b: 3, c: 34 },
            eq2: { a: 2, b: 1, c: 13 },
            intersect: { x: 5, y: 3 }
          },
          slots: [
            { id: "x", labelLatex: `\\text{${t("sm2_06.mission.chairs")}}`, placeholder: t("sm2_06.placeholders.chairs"), expected: 5 },
            { id: "y", labelLatex: `\\text{${t("sm2_06.mission.tables")}}`, placeholder: t("sm2_06.placeholders.tables"), expected: 3 }
          ],
          correctLatex: `\\text{${t("sm2_06.mission.chairs")}}=5, \\text{${t("sm2_06.mission.tables")}}=3`,
        },
        {
          id: "MISS_C5", difficulty, stage,
          promptLatex: t("sm2_06.stages.mission_prompt_10"),
          expressionLatex: `\\begin{cases} 3x + 4y = 29 \\\\ x + 2y = 13 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 3, b: 4, c: 29 },
            eq2: { a: 1, b: 2, c: 13 },
            intersect: { x: 5, y: 4 }
          },
          slots: [
            { id: "x", labelLatex: `\\text{${t("sm2_06.mission.red")}}`, placeholder: t("sm2_06.placeholders.red"), expected: 5 },
            { id: "y", labelLatex: `\\text{${t("sm2_06.mission.blue")}}`, placeholder: t("sm2_06.placeholders.blue"), expected: 4 }
          ],
          correctLatex: `\\text{${t("sm2_06.mission.red")}}=5, \\text{${t("sm2_06.mission.blue")}}=4`,
        },
      ];
    }

    if (difficulty === "ADVANCED") {
      return [
        {
          id: "MISS_A1", difficulty, stage,
          promptLatex: t("sm2_06.stages.mission_prompt_11"),
          expressionLatex: `\\begin{cases} 7x + 5y = 59 \\\\ 3x + 2y = 25 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 7, b: 5, c: 59 },
            eq2: { a: 3, b: 2, c: 25 },
            intersect: { x: 4.67, y: 5.5 }
          },
          slots: [
            { id: "x", labelLatex: `\\text{${t("sm2_06.mission.speed")}}_{1}`, placeholder: t("sm2_06.placeholders.speed1"), expected: 4.67 },
            { id: "y", labelLatex: `\\text{${t("sm2_06.mission.speed")}}_{2}`, placeholder: t("sm2_06.placeholders.speed2"), expected: 5.5 }
          ],
          correctLatex: `\\text{${t("sm2_06.mission.speed")}}_{1}=4.67, \\text{${t("sm2_06.mission.speed")}}_{2}=5.5`,
        },
        {
          id: "MISS_A2", difficulty, stage,
          promptLatex: t("sm2_06.stages.mission_prompt_12"),
          expressionLatex: `\\begin{cases} 6x + 7y = 62 \\\\ 4x + 3y = 38 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 6, b: 7, c: 62 },
            eq2: { a: 4, b: 3, c: 38 },
            intersect: { x: 5.5, y: 4 }
          },
          slots: [
            { id: "x", labelLatex: `\\text{${t("sm2_06.mission.rate")}}_{A}`, placeholder: t("sm2_06.placeholders.ratea"), expected: 5.5 },
            { id: "y", labelLatex: `\\text{${t("sm2_06.mission.rate")}}_{B}`, placeholder: t("sm2_06.placeholders.rateb"), expected: 4 }
          ],
          correctLatex: `\\text{${t("sm2_06.mission.rate")}}_{A}=5.5, \\text{${t("sm2_06.mission.rate")}}_{B}=4`,
        },
        {
          id: "MISS_A3", difficulty, stage,
          promptLatex: t("sm2_06.stages.mission_prompt_13"),
          expressionLatex: `\\begin{cases} 8x + 9y = 89 \\\\ 5x + 4y = 50 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 8, b: 9, c: 89 },
            eq2: { a: 5, b: 4, c: 50 },
            intersect: { x: 4.67, y: 5.83 }
          },
          slots: [
            { id: "x", labelLatex: `\\text{${t("sm2_06.mission.time")}}_{1}`, placeholder: t("sm2_06.placeholders.time1"), expected: 4.67 },
            { id: "y", labelLatex: `\\text{${t("sm2_06.mission.time")}}_{2}`, placeholder: t("sm2_06.placeholders.time2"), expected: 5.83 }
          ],
          correctLatex: `\\text{${t("sm2_06.mission.time")}}_{1}=4.67, \\text{${t("sm2_06.mission.time")}}_{2}=5.83`,
        },
        {
          id: "MISS_A4", difficulty, stage,
          promptLatex: t("sm2_06.stages.mission_prompt_14"),
          expressionLatex: `\\begin{cases} 9x + 7y = 85 \\\\ 6x + 5y = 59 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 9, b: 7, c: 85 },
            eq2: { a: 6, b: 5, c: 59 },
            intersect: { x: 5.33, y: 5.4 }
          },
          slots: [
            { id: "x", labelLatex: `\\text{${t("sm2_06.mission.cost")}}_{A}`, placeholder: t("sm2_06.placeholders.costa"), expected: 5.33 },
            { id: "y", labelLatex: `\\text{${t("sm2_06.mission.cost")}}_{B}`, placeholder: t("sm2_06.placeholders.costb"), expected: 5.4 }
          ],
          correctLatex: `\\text{${t("sm2_06.mission.cost")}}_{A}=5.33, \\text{${t("sm2_06.mission.cost")}}_{B}=5.4`,
        },
        {
          id: "MISS_A5", difficulty, stage,
          promptLatex: t("sm2_06.stages.mission_prompt_15"),
          expressionLatex: `\\begin{cases} 11x + 8y = 98 \\\\ 7x + 5y = 62 \\end{cases}`,
          targetLatex: `x, y`,
          visual: {
            eq1: { a: 11, b: 8, c: 98 },
            eq2: { a: 7, b: 5, c: 62 },
            intersect: { x: 5.14, y: 4.8 }
          },
          slots: [
            { id: "x", labelLatex: `\\text{${t("sm2_06.mission.price")}}_{1}`, placeholder: t("sm2_06.placeholders.price1"), expected: 5.14 },
            { id: "y", labelLatex: `\\text{${t("sm2_06.mission.price")}}_{2}`, placeholder: t("sm2_06.placeholders.price2"), expected: 4.8 }
          ],
          correctLatex: `\\text{${t("sm2_06.mission.price")}}_{1}=5.14, \\text{${t("sm2_06.mission.price")}}_{2}=4.8`,
        },
      ];
    }

    // ELITE difficulty
    return [
      {
        id: "MISS_E1", difficulty, stage,
        promptLatex: t("sm2_06.stages.mission_prompt_16"),
        expressionLatex: `\\begin{cases} 13x + 11y = 127 \\\\ 9x + 7y = 89 \\end{cases}`,
        targetLatex: `x, y`,
        visual: {
          eq1: { a: 13, b: 11, c: 127 },
          eq2: { a: 9, b: 7, c: 89 },
          intersect: { x: 5.5, y: 5.36 }
        },
        slots: [
          { id: "x", labelLatex: `\\text{${t("sm2_06.mission.var")}}_{1}`, placeholder: t("sm2_06.placeholders.var1"), expected: 5.5 },
          { id: "y", labelLatex: `\\text{${t("sm2_06.mission.var")}}_{2}`, placeholder: t("sm2_06.placeholders.var2"), expected: 5.36 }
        ],
        correctLatex: `\\text{${t("sm2_06.mission.var")}}_{1}=5.5, \\text{${t("sm2_06.mission.var")}}_{2}=5.36`,
      },
      {
        id: "MISS_E2", difficulty, stage,
        promptLatex: t("sm2_06.stages.mission_prompt_17"),
        expressionLatex: `\\begin{cases} 15x + 13y = 149 \\\\ 11x + 9y = 107 \\end{cases}`,
        targetLatex: `x, y`,
        visual: {
          eq1: { a: 15, b: 13, c: 149 },
          eq2: { a: 11, b: 9, c: 107 },
          intersect: { x: 5.67, y: 5.54 }
        },
        slots: [
          { id: "x", labelLatex: `\\text{${t("sm2_06.mission.param")}}_{A}`, placeholder: t("sm2_06.placeholders.parama"), expected: 5.67 },
          { id: "y", labelLatex: `\\text{${t("sm2_06.mission.param")}}_{B}`, placeholder: t("sm2_06.placeholders.paramb"), expected: 5.54 }
        ],
        correctLatex: `\\text{${t("sm2_06.mission.param")}}_{A}=5.67, \\text{${t("sm2_06.mission.param")}}_{B}=5.54`,
      },
      {
        id: "MISS_E3", difficulty, stage,
        promptLatex: t("sm2_06.stages.mission_prompt_18"),
        expressionLatex: `\\begin{cases} 17x + 14y = 169 \\\\ 13x + 11y = 133 \\end{cases}`,
        targetLatex: `x, y`,
        visual: {
          eq1: { a: 17, b: 14, c: 169 },
          eq2: { a: 13, b: 11, c: 133 },
          intersect: { x: 5.71, y: 5.64 }
        },
        slots: [
          { id: "x", labelLatex: `\\text{${t("sm2_06.mission.factor")}}_{X}`, placeholder: t("sm2_06.placeholders.factorx"), expected: 5.71 },
          { id: "y", labelLatex: `\\text{${t("sm2_06.mission.factor")}}_{Y}`, placeholder: t("sm2_06.placeholders.factory"), expected: 5.64 }
        ],
        correctLatex: `\\text{${t("sm2_06.mission.factor")}}_{X}=5.71, \\text{${t("sm2_06.mission.factor")}}_{Y}=5.64`,
      },
      {
        id: "MISS_E4", difficulty, stage,
        promptLatex: t("sm2_06.stages.mission_prompt_19"),
        expressionLatex: `\\begin{cases} 19x + 16y = 193 \\\\ 15x + 13y = 157 \\end{cases}`,
        targetLatex: `x, y`,
        visual: {
          eq1: { a: 19, b: 16, c: 193 },
          eq2: { a: 15, b: 13, c: 157 },
          intersect: { x: 5.79, y: 5.71 }
        },
        slots: [
          { id: "x", labelLatex: `\\text{${t("sm2_06.mission.coeff")}}_{1}`, placeholder: t("sm2_06.placeholders.coeff1"), expected: 5.79 },
          { id: "y", labelLatex: `\\text{${t("sm2_06.mission.coeff")}}_{2}`, placeholder: t("sm2_06.placeholders.coeff2"), expected: 5.71 }
        ],
        correctLatex: `\\text{${t("sm2_06.mission.coeff")}}_{1}=5.79, \\text{${t("sm2_06.mission.coeff")}}_{2}=5.71`,
      },
      {
        id: "MISS_E5", difficulty, stage,
        promptLatex: t("sm2_06.stages.mission_prompt_20"),
        expressionLatex: `\\begin{cases} 21x + 17y = 215 \\\\ 17x + 14y = 177 \\end{cases}`,
        targetLatex: `x, y`,
        visual: {
          eq1: { a: 21, b: 17, c: 215 },
          eq2: { a: 17, b: 14, c: 177 },
          intersect: { x: 5.86, y: 5.76 }
        },
        slots: [
          { id: "x", labelLatex: `\\text{${t("sm2_06.mission.value")}}_{A}`, placeholder: t("sm2_06.placeholders.valuea"), expected: 5.86 },
          { id: "y", labelLatex: `\\text{${t("sm2_06.mission.value")}}_{B}`, placeholder: t("sm2_06.placeholders.valueb"), expected: 5.76 }
        ],
        correctLatex: `\\text{${t("sm2_06.mission.value")}}_{A}=5.86, \\text{${t("sm2_06.mission.value")}}_{B}=5.76`,
      },
    ];
  }

  // Default fallback
  return [];
}

export default function S206Page() {
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
    adaptiveRecommendation,
    aiFeedback,
    isRequestingAi,
    requestAiFeedback
  } = useQuestManager<S206Quest, Stage>({
    moduleCode: "sm2-06",
    buildPool,
    initialStage: "SUBSTITUTION",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sm2-06", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const stages = useMemo<{ id: Stage; label: string }[]>(() => [
    { id: "SUBSTITUTION", label: t("sm2_06.stages.substitution") },
    { id: "ELIMINATION", label: t("sm2_06.stages.elimination") },
    { id: "MISSION", label: t("sm2_06.stages.mission") },
  ], [t]);
  const difficultyLabelMap = useMemo<Record<Difficulty, string>>(() => ({
    BASIC: t("sm2_06.difficulty.basic"),
    CORE: t("sm2_06.difficulty.core"),
    ADVANCED: t("sm2_06.difficulty.advanced"),
    ELITE: t("sm2_06.difficulty.elite"),
  }), [t]);
  const printSections = useMemo(() => buildQuestPrintSections<S206Quest, Stage>({
    moduleTitle: t("sm2_06.title"),
    stages,
    difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
    difficultyLabels: difficultyLabelMap,
    buildPool,
    showHints: true,
    maxHints: 1,
  }), [buildPool, difficultyLabelMap, stages, t]);

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("sm2_06.title")}
      moduleCode="SM2.06"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      successRate={successRate}
      checkStatus={lastCheck}
      printSections={printSections}
      translations={{
        back: t("sm2_06.back"),
        check: t("sm2_06.check"),
        next: t("sm2_06.next"),
        correct: t("sm2_06.correct"),
        incorrect: t("sm2_06.incorrect"),
        monitor_title: t("sm2_06.monitor_title"),
        difficulty: {
          basic: difficultyLabelMap.BASIC,
          core: difficultyLabelMap.CORE,
          advanced: difficultyLabelMap.ADVANCED,
          elite: difficultyLabelMap.ELITE,
        },
      }}
      monitorContent={
        <div className="w-full flex justify-center">
          <AlchemistCanvas
            visual={currentQuest?.visual}
            inputs={inputs}
            translations={{
              legend: t("sm2_06.canvas_translations.legend"),
              eq1: t("sm2_06.canvas_translations.eq1"),
              eq2: t("sm2_06.canvas_translations.eq2"),
              cursor: t("sm2_06.canvas_translations.cursor"),
              locked: t("sm2_06.canvas_translations.locked"),
              view: t("sm2_06.canvas_translations.view"),
            }}
          />
        </div>
      }
    >
      <div className="space-y-12">
        <div className="text-center group">
          <div className="text-[10px] text-white/90 uppercase tracking-[0.5em] font-black mb-4 group-hover:text-neon-cyan transition-colors">
            {t("sm2_06.objective_title")}
          </div>
          <p className="text-3xl text-white font-black italic whitespace-normal break-words">
            {renderMixedText(currentQuest?.promptLatex || "")}
          </p>
          <div className="mt-8 p-6 bg-white/[0.03] border border-white/10 rounded-2xl inline-block backdrop-blur-sm">
            <div className="text-4xl text-white font-black">
              <KatexTextWrap math={currentQuest?.expressionLatex || ""} />
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto w-full">
          <div className="grid grid-cols-2 gap-6">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan/50" />
                  <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                    <InlineMath math={slot.labelLatex} />
                  </div>
                </div>
                <input
                  value={inputs[slot.id] ?? ""}
                  onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                  placeholder={slot.placeholder}
                  className="w-full bg-black/40 border-2 border-white/10 p-5 text-center outline-none focus:border-neon-cyan text-white font-black text-3xl rounded-xl transition-all focus:shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Decoder Overlay Effect */}
        <div className="text-center opacity-20 pointer-events-none">
          <div className="text-[8px] font-mono text-white tracking-[0.5em] uppercase">
            Systems_Optimization_Algorithm_Running...
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
