"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useCallback } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import S205_PowerCanvas, { type PowerVisual } from "@/components/chamber/sm2-05/PowerCanvas";

type Stage = "RULES" | "NEGATIVE" | "SCIENTIFIC";

interface S205Quest extends Quest {
    stage: Stage;
    visual: PowerVisual;
}

function buildStagePool(t: ReturnType<typeof useLanguage>['t'], difficulty: Difficulty, stage: Stage): S205Quest[] {
    const quests: S205Quest[] = [];

    if (stage === "RULES") {
        if (difficulty === "BASIC") {
            // BASIC: Simple numeric multiplication and division
            quests.push({
                id: "R1-B", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `2^{3} \\\\cdot 2^{2}`,
                targetLatex: `2^{x}`,
                visual: { mode: 'MULTIPLY', base: 2, m: 3, n: 2 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 5 }],
                correctLatex: `2^5`,
                hintLatex: [`a^m \\cdot a^n = a^{m+n}`, `2^{3+2}=2^5`],
            });
            quests.push({
                id: "R2-B", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `3^6 \\div 3^{2}`,
                targetLatex: `3^x`,
                visual: { mode: 'DIVIDE', base: 3, m: 6, n: 2 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 4 }],
                correctLatex: `3^{4}`,
                hintLatex: [`a^m \\div a^n = a^{m-n}`, `3^{6-2}=3^{4}`],
            });
            quests.push({
                id: "R3-B", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `5^{4} \\cdot 5^{3}`,
                targetLatex: `5^x`,
                visual: { mode: 'MULTIPLY', base: 5, m: 4, n: 3 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 7 }],
                correctLatex: `5^7`,
                hintLatex: [`a^m \\cdot a^n = a^{m+n}`, `5^{4+3}=5^7`],
            });
            quests.push({
                id: "R4-B", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `7^8 \\div 7^5`,
                targetLatex: `7^x`,
                visual: { mode: 'DIVIDE', base: 7, m: 8, n: 5 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 3 }],
                correctLatex: `7^{3}`,
                hintLatex: [`a^m \\div a^n = a^{m-n}`, `7^{8-5}=7^{3}`],
            });
            quests.push({
                id: "R5-B", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `(4^{2})^{3}`,
                targetLatex: `4^x`,
                visual: { mode: 'POWER', base: 4, m: 2, n: 3 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 6 }],
                correctLatex: `4^6`,
                hintLatex: [`(a^m)^n = a^{m \\cdot n}`, `4^{2 \\cdot 3}=4^6`],
            });
        } else if (difficulty === "CORE") {
            // CORE: Algebraic variables
            quests.push({
                id: "R1-C", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `x^5 \\cdot x^{4}`,
                targetLatex: `x^n`,
                visual: { mode: 'MULTIPLY', base: 'x', m: 5, n: 4 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 9 }],
                correctLatex: `x^9`,
                hintLatex: [`x^5 \\cdot x^{4} = x^{5+4}`],
            });
            quests.push({
                id: "R2-C", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `(z^{4})^{2}`,
                targetLatex: `z^n`,
                visual: { mode: 'POWER', base: 'z', m: 4, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 8 }],
                correctLatex: `z^8`,
                hintLatex: [`(z^{4})^{2} = z^{4 \\cdot 2}`],
            });
            quests.push({
                id: "R3-C", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `a^7 \\div a^{3}`,
                targetLatex: `a^n`,
                visual: { mode: 'DIVIDE', base: 'a', m: 7, n: 3 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 4 }],
                correctLatex: `a^{4}`,
                hintLatex: [`a^7 \\div a^{3} = a^{7-3}`],
            });
            quests.push({
                id: "R4-C", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `(y^{3})^{4}`,
                targetLatex: `y^n`,
                visual: { mode: 'POWER', base: 'y', m: 3, n: 4 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 12 }],
                correctLatex: `y^{12}`,
                hintLatex: [`(y^{3})^{4} = y^{3 \\cdot 4}`],
            });
            quests.push({
                id: "R5-C", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `m^6 \\cdot m^{2}`,
                targetLatex: `m^n`,
                visual: { mode: 'MULTIPLY', base: 'm', m: 6, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 8 }],
                correctLatex: `m^8`,
                hintLatex: [`m^6 \\cdot m^{2} = m^{6+2}`],
            });
        } else if (difficulty === "ADVANCED") {
            // ADVANCED: Combined rules
            quests.push({
                id: "R1-A", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `a^{2} \\cdot (a^{3})^{2}`,
                targetLatex: `a^n`,
                visual: { mode: 'POWER', base: 'a', m: 3, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 8 }],
                correctLatex: `a^{2} \\cdot a^6 = a^8`,
                hintLatex: [`Apply (a^m)^n first`, `Then a^m \\cdot a^n`],
            });
            quests.push({
                id: "R2-A", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `(b^{4} \\cdot b^{2})^{3}`,
                targetLatex: `b^n`,
                visual: { mode: 'MULTIPLY', base: 'b', m: 4, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 18 }],
                correctLatex: `(b^{4+2})^{3} = (b^6)^{3} = b^{18}`,
                hintLatex: [`Apply a^m \\cdot a^n inside parentheses first`],
            });
            quests.push({
                id: "R3-A", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `(x^5)^{2} \\div x^{3}`,
                targetLatex: `x^n`,
                visual: { mode: 'POWER', base: 'x', m: 5, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 7 }],
                correctLatex: `x^{10} \\div x^{3} = x^7`,
                hintLatex: [`Apply (x^m)^n first`, `Then x^m \\div x^n`],
            });
            quests.push({
                id: "R4-A", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `c^{3} \\cdot (c^{2})^{3} \\div c^{4}`,
                targetLatex: `c^n`,
                visual: { mode: 'POWER', base: 'c', m: 2, n: 3 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 5 }],
                correctLatex: `c^{3} \\cdot c^6 \\div c^{4} = c^5`,
                hintLatex: [`Apply power rule first`, `Then multiply and divide`],
            });
            quests.push({
                id: "R5-A", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `(d^{2})^{4} \\cdot d^{3}`,
                targetLatex: `d^n`,
                visual: { mode: 'POWER', base: 'd', m: 2, n: 4 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 11 }],
                correctLatex: `d^8 \\cdot d^{3} = d^{11}`,
                hintLatex: [`Apply (d^m)^n first`, `Then d^m \\cdot d^n`],
            });
        } else if (difficulty === "ELITE") {
            // ELITE: Coefficients and complex expressions
            quests.push({
                id: "R1-E", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `(2x^{3})^{2} \\div 4x^{2}`,
                targetLatex: `x^n`,
                visual: { mode: 'POWER', base: '2x', m: 3, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 4 }],
                correctLatex: `4x^6 \\div 4x^{2} = x^{4}`,
                hintLatex: [`(cx^m)^n = c^n \\cdot x^{mn}`, `Then divide`],
            });
            quests.push({
                id: "R2-E", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `(3a^{2})^{3} \\cdot 2a^{4}`,
                targetLatex: `54a^n`,
                visual: { mode: 'POWER', base: '3a', m: 2, n: 3 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 10 }],
                correctLatex: `27a^6 \\cdot 2a^{4} = 54a^{10}`,
                hintLatex: [`(3a^{2})^{3} = 27a^6`, `Then multiply`],
            });
            quests.push({
                id: "R3-E", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `(5y^{4})^{2} \\div (5y^{2})`,
                targetLatex: `5y^n`,
                visual: { mode: 'POWER', base: '5y', m: 4, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 6 }],
                correctLatex: `25y^8 \\div 5y^{2} = 5y^6`,
                hintLatex: [`Expand (5y^{4})^{2} first`, `Then divide`],
            });
            quests.push({
                id: "R4-E", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `(2m^{3})^{2} \\cdot (3m^{2})^{2}`,
                targetLatex: `36m^n`,
                visual: { mode: 'POWER', base: '2m', m: 3, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 10 }],
                correctLatex: `4m^6 \\cdot 9m^{4} = 36m^{10}`,
                hintLatex: [`Expand both powers`, `Then multiply`],
            });
            quests.push({
                id: "R5-E", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.rules_prompt_latex")}}`,
                expressionLatex: `(4n^{2})^{3} \\div 8n^{3}`,
                targetLatex: `8n^n`,
                visual: { mode: 'POWER', base: '4n', m: 2, n: 3 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 3 }],
                correctLatex: `64n^6 \\div 8n^{3} = 8n^{3}`,
                hintLatex: [`(4n^{2})^{3} = 64n^6`, `Then divide`],
            });
        }
        return quests;
    }

    if (stage === "NEGATIVE") {
        if (difficulty === "BASIC") {
            quests.push({
                id: "N1-B", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `5^{-2}`,
                targetLatex: `\\\\frac{1}{x}`,
                visual: { mode: 'NEGATIVE', base: 5, m: 1, n: 2 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 25 }],
                correctLatex: `\\\\frac{1}{5^2} = \\\\frac{1}{25}`,
                hintLatex: [`a^{-n} = \\\\frac{1}{a^n}`],
            });
            quests.push({
                id: "N2-B", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `3^{-3}`,
                targetLatex: `\\\\frac{1}{x}`,
                visual: { mode: 'NEGATIVE', base: 3, m: 1, n: 3 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 27 }],
                correctLatex: `\\\\frac{1}{3^3} = \\\\frac{1}{27}`,
                hintLatex: [`a^{-n} = \\\\frac{1}{a^n}`],
            });
            quests.push({
                id: "N3-B", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `2^{-4}`,
                targetLatex: `\\\\frac{1}{x}`,
                visual: { mode: 'NEGATIVE', base: 2, m: 1, n: 4 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 16 }],
                correctLatex: `\\\\frac{1}{2^4} = \\\\frac{1}{16}`,
                hintLatex: [`a^{-n} = \\\\frac{1}{a^n}`],
            });
            quests.push({
                id: "N4-B", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `10^{-1}`,
                targetLatex: `\\\\frac{1}{x}`,
                visual: { mode: 'NEGATIVE', base: 10, m: 1, n: 1 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 10 }],
                correctLatex: `\\\\frac{1}{10^1} = \\\\frac{1}{10}`,
                hintLatex: [`a^{-n} = \\\\frac{1}{a^n}`],
            });
            quests.push({
                id: "N5-B", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `4^{-2}`,
                targetLatex: `\\\\frac{1}{x}`,
                visual: { mode: 'NEGATIVE', base: 4, m: 1, n: 2 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 16 }],
                correctLatex: `\\\\frac{1}{4^2} = \\\\frac{1}{16}`,
                hintLatex: [`a^{-n} = \\\\frac{1}{a^n}`],
            });
        } else if (difficulty === "CORE") {
            quests.push({
                id: "N1-C", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `x^{-4}`,
                targetLatex: `\\\\frac{1}{x^n}`,
                visual: { mode: 'NEGATIVE', base: 'x', m: 1, n: 4 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 4 }],
                correctLatex: `\\\\frac{1}{x^4}`,
                hintLatex: [`a^{-n} = \\\\frac{1}{a^n}`],
            });
            quests.push({
                id: "N2-C", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `y^{-5}`,
                targetLatex: `\\\\frac{1}{y^n}`,
                visual: { mode: 'NEGATIVE', base: 'y', m: 1, n: 5 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 5 }],
                correctLatex: `\\\\frac{1}{y^5}`,
                hintLatex: [`a^{-n} = \\\\frac{1}{a^n}`],
            });
            quests.push({
                id: "N3-C", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `a^{-3}`,
                targetLatex: `\\\\frac{1}{a^n}`,
                visual: { mode: 'NEGATIVE', base: 'a', m: 1, n: 3 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 3 }],
                correctLatex: `\\\\frac{1}{a^3}`,
                hintLatex: [`a^{-n} = \\\\frac{1}{a^n}`],
            });
            quests.push({
                id: "N4-C", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `m^{-6}`,
                targetLatex: `\\\\frac{1}{m^n}`,
                visual: { mode: 'NEGATIVE', base: 'm', m: 1, n: 6 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 6 }],
                correctLatex: `\\\\frac{1}{m^6}`,
                hintLatex: [`a^{-n} = \\\\frac{1}{a^n}`],
            });
            quests.push({
                id: "N5-C", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `z^{-2}`,
                targetLatex: `\\\\frac{1}{z^n}`,
                visual: { mode: 'NEGATIVE', base: 'z', m: 1, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 2 }],
                correctLatex: `\\\\frac{1}{z^2}`,
                hintLatex: [`a^{-n} = \\\\frac{1}{a^n}`],
            });
        } else if (difficulty === "ADVANCED") {
            quests.push({
                id: "N1-A", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `\\\\frac{1}{a^{-3}}`,
                targetLatex: `a^n`,
                visual: { mode: 'NEGATIVE', base: 'a', m: 1, n: 3 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 3 }],
                correctLatex: `a^{3}`,
                hintLatex: [`\\\\frac{1}{a^{-n}} = a^n`],
            });
            quests.push({
                id: "N2-A", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `\\\\frac{1}{b^{-5}}`,
                targetLatex: `b^n`,
                visual: { mode: 'NEGATIVE', base: 'b', m: 1, n: 5 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 5 }],
                correctLatex: `b^5`,
                hintLatex: [`\\\\frac{1}{a^{-n}} = a^n`],
            });
            quests.push({
                id: "N3-A", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `x^{-2} \\cdot x^5`,
                targetLatex: `x^n`,
                visual: { mode: 'NEGATIVE', base: 'x', m: 1, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 3 }],
                correctLatex: `x^{-2+5} = x^{3}`,
                hintLatex: [`a^m \\cdot a^n = a^{m+n}`],
            });
            quests.push({
                id: "N4-A", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `y^{3} \\div y^{-2}`,
                targetLatex: `y^n`,
                visual: { mode: 'NEGATIVE', base: 'y', m: 1, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 5 }],
                correctLatex: `y^{3-(-2)} = y^5`,
                hintLatex: [`a^m \\div a^n = a^{m-n}`],
            });
            quests.push({
                id: "N5-A", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `(c^{-2})^{3}`,
                targetLatex: `c^n`,
                visual: { mode: 'NEGATIVE', base: 'c', m: 1, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: -6 }],
                correctLatex: `c^{-6}`,
                hintLatex: [`(a^m)^n = a^{m \\cdot n}`],
            });
        } else if (difficulty === "ELITE") {
            quests.push({
                id: "N1-E", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `\\left(\\\\frac{x}{2}\\right)^{-3}`,
                targetLatex: `\\\\frac{8}{x^n}`,
                visual: { mode: 'NEGATIVE', base: 'x/2', m: 1, n: 3 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 3 }],
                correctLatex: `(\\\\frac{2}{x})^{3} = \\\\frac{8}{x^3}`,
                hintLatex: [`(\\\\frac{a}{b})^{-n} = (\\\\frac{b}{a})^n`],
            });
            quests.push({
                id: "N2-E", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `\\left(\\\\frac{3}{y}\\right)^{-2}`,
                targetLatex: `\\\\frac{y^n}{9}`,
                visual: { mode: 'NEGATIVE', base: '3/y', m: 1, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 2 }],
                correctLatex: `(\\\\frac{y}{3})^{2} = \\\\frac{y^2}{9}`,
                hintLatex: [`(\\\\frac{a}{b})^{-n} = (\\\\frac{b}{a})^n`],
            });
            quests.push({
                id: "N3-E", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `(2a^{-3})^{-2}`,
                targetLatex: `\\\\frac{a^n}{4}`,
                visual: { mode: 'NEGATIVE', base: '2a', m: 1, n: 3 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 6 }],
                correctLatex: `(2^{-2})(a^{-3 \\cdot -2}) = \\\\frac{a^6}{4}`,
                hintLatex: [`(ca^m)^n = c^n \\cdot a^{mn}`],
            });
            quests.push({
                id: "N4-E", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `(3m^{2})^{-2} \\cdot 9m^5`,
                targetLatex: `m^n`,
                visual: { mode: 'NEGATIVE', base: '3m', m: 2, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 1 }],
                correctLatex: `\\\\frac{1}{9m^4} \\cdot 9m^5 = m`,
                hintLatex: [`Expand (3m^{2})^{-2}`, `Then multiply`],
            });
            quests.push({
                id: "N5-E", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.negative_prompt_latex")}}`,
                expressionLatex: `\\\\frac{(2x)^3}{(2x)^{-2}}`,
                targetLatex: `32x^n`,
                visual: { mode: 'NEGATIVE', base: '2x', m: 3, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 5 }],
                correctLatex: `(2x)^{3-(-2)} = (2x)^5 = 32x^5`,
                hintLatex: [`a^m \\div a^n = a^{m-n}`],
            });
        }
        return quests;
    }

    if (stage === "SCIENTIFIC") {
        if (difficulty === "BASIC") {
            quests.push({
                id: "S1-B", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `72000`,
                targetLatex: `7.2 \\\\cdot 10^{n}`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 7.2, n: 4 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 4 }],
                correctLatex: `7.2 \\cdot 10^{4}`,
                hintLatex: [`Move decimal 4 places left`],
            });
            quests.push({
                id: "S2-B", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `5600`,
                targetLatex: `5.6 \\cdot 10^n`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 5.6, n: 3 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 3 }],
                correctLatex: `5.6 \\cdot 10^{3}`,
                hintLatex: [`Move decimal 3 places left`],
            });
            quests.push({
                id: "S3-B", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `890000`,
                targetLatex: `8.9 \\cdot 10^n`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 8.9, n: 5 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 5 }],
                correctLatex: `8.9 \\cdot 10^5`,
                hintLatex: [`Move decimal 5 places left`],
            });
            quests.push({
                id: "S4-B", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `340`,
                targetLatex: `3.4 \\cdot 10^n`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 3.4, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 2 }],
                correctLatex: `3.4 \\cdot 10^{2}`,
                hintLatex: [`Move decimal 2 places left`],
            });
            quests.push({
                id: "S5-B", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `1200000`,
                targetLatex: `1.2 \\cdot 10^n`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 1.2, n: 6 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 6 }],
                correctLatex: `1.2 \\cdot 10^6`,
                hintLatex: [`Move decimal 6 places left`],
            });
        } else if (difficulty === "CORE") {
            quests.push({
                id: "S1-C", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `0.00035`,
                targetLatex: `3.5 \\cdot 10^n`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 3.5, n: -4 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: -4 }],
                correctLatex: `3.5 \\cdot 10^{-4}`,
                hintLatex: [`Move decimal 4 places right`],
            });
            quests.push({
                id: "S2-C", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `0.0082`,
                targetLatex: `8.2 \\cdot 10^n`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 8.2, n: -3 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: -3 }],
                correctLatex: `8.2 \\cdot 10^{-3}`,
                hintLatex: [`Move decimal 3 places right`],
            });
            quests.push({
                id: "S3-C", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `0.000067`,
                targetLatex: `6.7 \\cdot 10^n`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 6.7, n: -5 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: -5 }],
                correctLatex: `6.7 \\cdot 10^{-5}`,
                hintLatex: [`Move decimal 5 places right`],
            });
            quests.push({
                id: "S4-C", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `0.00000091`,
                targetLatex: `9.1 \\cdot 10^n`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 9.1, n: -7 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: -7 }],
                correctLatex: `9.1 \\cdot 10^{-7}`,
                hintLatex: [`Move decimal 7 places right`],
            });
            quests.push({
                id: "S5-C", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `0.0045`,
                targetLatex: `4.5 \\cdot 10^n`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 4.5, n: -3 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: -3 }],
                correctLatex: `4.5 \\cdot 10^{-3}`,
                hintLatex: [`Move decimal 3 places right`],
            });
        } else if (difficulty === "ADVANCED") {
            quests.push({
                id: "S1-A", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `1.2 \\cdot 10^5`,
                targetLatex: `x`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 1.2, n: 5 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "value", expected: 120000 }],
                correctLatex: `120,000`,
                hintLatex: [`Add 5 zeros and move decimal`],
            });
            quests.push({
                id: "S2-A", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `3.5 \\cdot 10^{-4}`,
                targetLatex: `x`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 3.5, n: -4 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "value", expected: 0.00035 }],
                correctLatex: `0.00035`,
                hintLatex: [`Move decimal 4 places left`],
            });
            quests.push({
                id: "S3-A", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `8.9 \\cdot 10^{3}`,
                targetLatex: `x`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 8.9, n: 3 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "value", expected: 8900 }],
                correctLatex: `8,900`,
                hintLatex: [`Move decimal 3 places right`],
            });
            quests.push({
                id: "S4-A", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `2.4 \\cdot 10^{-2}`,
                targetLatex: `x`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 2.4, n: -2 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "value", expected: 0.024 }],
                correctLatex: `0.024`,
                hintLatex: [`Move decimal 2 places left`],
            });
            quests.push({
                id: "S5-A", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `6.7 \\cdot 10^6`,
                targetLatex: `x`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 6.7, n: 6 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "value", expected: 6700000 }],
                correctLatex: `6,700,000`,
                hintLatex: [`Move decimal 6 places right`],
            });
        } else if (difficulty === "ELITE") {
            quests.push({
                id: "S1-E", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `(3 \\cdot 10^{4}) \\cdot (2 \\cdot 10^{3})`,
                targetLatex: `6 \\cdot 10^n`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 6, n: 7 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 7 }],
                correctLatex: `(3\\cdot 2) \\cdot 10^{4+3} = 6 \\cdot 10^7`,
                hintLatex: [`Multiply coefficients, add exponents`],
            });
            quests.push({
                id: "S2-E", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `(8 \\cdot 10^6) \\div (2 \\cdot 10^{2})`,
                targetLatex: `4 \\cdot 10^n`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 4, n: 4 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 4 }],
                correctLatex: `(8\\div 2) \\cdot 10^{6-2} = 4 \\cdot 10^{4}`,
                hintLatex: [`Divide coefficients, subtract exponents`],
            });
            quests.push({
                id: "S3-E", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `(5 \\cdot 10^{3})^{2}`,
                targetLatex: `25 \\cdot 10^n`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 25, n: 6 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 6 }],
                correctLatex: `5^{2} \\cdot (10^{3})^{2} = 25 \\cdot 10^6`,
                hintLatex: [`Square coefficient and multiply exponent by 2`],
            });
            quests.push({
                id: "S4-E", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `(9 \\cdot 10^5) \\cdot (4 \\cdot 10^{-2})`,
                targetLatex: `36 \\cdot 10^n`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 36, n: 3 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 3 }],
                correctLatex: `(9\\cdot 4) \\cdot 10^{5+(-2)} = 36 \\cdot 10^{3}`,
                hintLatex: [`Multiply coefficients, add exponents (including negative)`],
            });
            quests.push({
                id: "S5-E", difficulty, stage,
                promptLatex: `\\\\text{${t("sm2_05.stages.scientific_prompt_latex")}}`,
                expressionLatex: `(1.5 \\cdot 10^{4}) \\div (3 \\cdot 10^{-3})`,
                targetLatex: `0.5 \\cdot 10^n`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 0.5, n: 7 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 7 }],
                correctLatex: `(1.5\\div 3) \\cdot 10^{4-(-3)} = 0.5 \\cdot 10^7`,
                hintLatex: [`Divide coefficients, subtract exponents`],
            });
        }
        return quests;
    }

    return [];
}

export default function S205Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(t, d, s), [t]);

    const {
        difficulty, stage, inputs, lastCheck, currentQuest,
        successRate,
        setInputs, verify, next, handleDifficultyChange, handleStageChange,
        adaptiveRecommendation,
        aiFeedback,
        isRequestingAi,
        requestAiFeedback
    } = useQuestManager<S205Quest, Stage>({
        moduleCode: "sm2-05",
        buildPool,
        initialStage: "RULES",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sm2-05", stage);
        }
    }, [lastCheck, completeStage, stage]);

    return (
        <ChamberLayout
            adaptiveRecommendation={adaptiveRecommendation}
            aiFeedback={aiFeedback}
            isRequestingAi={isRequestingAi}
            onAiDiagnosisRequested={requestAiFeedback}
            title={t("sm2_05.title")}
            moduleCode="SM2.05"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "RULES", label: t("sm2_05.stages.rules") },
                { id: "NEGATIVE", label: t("sm2_05.stages.negative") },
                { id: "SCIENTIFIC", label: t("sm2_05.stages.scientific") },
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            successRate={successRate}
            checkStatus={lastCheck}
            translations={{
                back: t("sm2_05.back"),
                check: t("sm2_05.check"),
                next: t("sm2_05.next"),
                correct: t("sm2_05.correct"),
                incorrect: t("sm2_05.incorrect"),
                ready: t("sm2_05.ready"),
                monitor_title: t("sm2_05.monitor_title"),
                difficulty: {
                    basic: t("sm2_05.difficulty.basic"),
                    core: t("sm2_05.difficulty.core"),
                    advanced: t("sm2_05.difficulty.advanced"),
                    elite: t("sm2_05.difficulty.elite")
                },
            }}
            monitorContent={
                <div className="w-full flex justify-center">
                    <S205_PowerCanvas visual={currentQuest?.visual} />
                </div>
            }
        >
            <div className="space-y-12">
                <div className="text-center group">
                    <div className="text-[10px] text-white/90 uppercase tracking-[0.5em] font-black mb-4 group-hover:text-neon-purple transition-colors">
                        {t("sm2_05.objective_title")}
                    </div>
                    <div className="text-3xl text-white font-black italic whitespace-normal break-words leading-tight">
                        {(() => {
                            const latex = currentQuest?.promptLatex || "";
                            if (latex.startsWith("\\\\text{") && latex.endsWith("}")) {
                                const clean = latex.replace(/^\\\\text\{/, "").replace(/\}$/, "");
                                return <span className="font-sans font-black not-italic whitespace-pre-wrap">{clean}</span>;
                            }
                            if (!latex.includes("\\\\") && !latex.includes("$")) {
                                return <span className="font-sans font-black not-italic whitespace-pre-wrap">{latex}</span>;
                            }
                            return <InlineMath math={latex || ""} />;
                        })()}
                    </div>
                    <div className="mt-8 p-8 bg-white/[0.03] border border-white/10 rounded-2xl inline-block backdrop-blur-sm shadow-2xl">
                        <div className="text-5xl text-white font-black tracking-widest">
                            <InlineMath math={currentQuest?.expressionLatex || ""} />
                        </div>
                        <div className="mt-4 text-white/90 font-mono text-[10px] tracking-[0.4em] uppercase">
                            Target_Pattern: <InlineMath math={currentQuest?.targetLatex || ""} />
                        </div>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {currentQuest?.slots.map((slot) => (
                            <div key={slot.id} className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-neon-purple/50" />
                                    <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                                        Input_Param: <InlineMath math={slot.labelLatex} />
                                    </div>
                                </div>
                                <input
                                    value={inputs[slot.id] ?? ""}
                                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                                    placeholder={slot.placeholder}
                                    className="w-full bg-black/60 border-2 border-white/10 p-6 text-center outline-none focus:border-neon-purple text-white font-black text-4xl rounded-2xl transition-all focus:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center gap-8 opacity-20 group pointer-events-none">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/60 self-center" />
                    <div className="text-[8px] font-mono text-white tracking-[0.6em] uppercase">
                        Quantum_Scaling_Active...
                    </div>
                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/60 self-center" />
                </div>
            </div>
        </ChamberLayout>
    );
}
