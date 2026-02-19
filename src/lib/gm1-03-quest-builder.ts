/**
 * GM1.03 - Limits & Continuity Module
 * Quest pool builder function
 */

import { Difficulty } from "@/hooks/useQuestManager";
import { GM103Quest, Stage } from "./gm1-03-types";
import {
  limitBasicsDataBasic,
  limitBasicsDataCore,
  limitBasicsDataAdvanced,
  limitBasicsDataElite,
  limitOperationsDataBasic,
  limitOperationsDataCore,
  limitOperationsDataAdvanced,
  limitOperationsDataElite,
  continuityDataBasic,
  continuityDataCore,
  continuityDataAdvanced,
  continuityDataElite,
} from "./gm1-03-quest-data";

const round2 = (v: number) => Math.round(v * 100) / 100;

/**
 * Build quest pool for a given difficulty and stage
 * @param t - Translation function
 * @param difficulty - Difficulty level (BASIC/CORE/ADVANCED/ELITE)
 * @param stage - Stage (LIMIT_BASICS/LIMIT_OPERATIONS/CONTINUITY)
 * @returns Array of 5 quests for the given difficulty and stage
 */
export function buildStagePool(
  t: (key: string, params?: Record<string, any>) => string,
  difficulty: Difficulty,
  stage: Stage
): GM103Quest[] {
  // ============================================================================
  // LIMIT_BASICS STAGE
  // ============================================================================
  if (stage === "LIMIT_BASICS") {
    let dataSet;
    switch (difficulty) {
      case "BASIC":
        dataSet = limitBasicsDataBasic;
        break;
      case "CORE":
        dataSet = limitBasicsDataCore;
        break;
      case "ADVANCED":
        dataSet = limitBasicsDataAdvanced;
        break;
      case "ELITE":
        dataSet = limitBasicsDataElite;
        break;
      default:
        dataSet = limitBasicsDataBasic;
    }

    return dataSet.map((item) => {
      const formatValue = (val: number | string) => {
        if (typeof val === "string") return val;
        if (val === Infinity) return "\\infty";
        if (val === -Infinity) return "-\\infty";
        return round2(val).toString();
      };

      const limitValueFormatted = formatValue(item.limitValue);
      
      // Build LaTeX expression
      let expressionLatex = item.functionExpr
        .replace(/\^/g, "^{")
        .replace(/sqrt\(/g, "\\sqrt{")
        .replace(/abs\(/g, "|")
        .replace(/\)/g, "}");
      
      // Fix closing braces for sqrt and powers
      expressionLatex = expressionLatex
        .replace(/\^{(\d+)}/g, "^{$1}")
        .replace(/\\sqrt{([^}]+)}/g, "\\sqrt{$1}");

      const promptLatex = `\\lim_{x \\to ${item.limitPoint === Infinity ? "\\infty" : item.limitPoint}} ${expressionLatex}`;

      // Determine expected answer
      let expected: number | string;
      if (item.type === "one-sided") {
        // For one-sided limits, ask for the right-hand limit
        expected = typeof item.rightLimit === "number" ? round2(item.rightLimit) : item.rightLimit || "DNE";
      } else {
        expected = typeof item.limitValue === "number" ? round2(item.limitValue) : item.limitValue;
      }

      return {
        id: item.id,
        difficulty,
        stage,
        functionExpr: item.functionExpr,
        limitPoint: item.limitPoint,
        limitValue: item.limitValue,
        leftLimit: item.leftLimit,
        rightLimit: item.rightLimit,
        promptLatex,
        expressionLatex: `f(x) = ${expressionLatex}`,
        targetLatex: "\\lim",
        slots: [
          {
            id: "limit",
            labelLatex: "\\text{Limit}",
            placeholder: "value",
            expected,
          },
        ],
        correctLatex: `${promptLatex} = ${limitValueFormatted}`,
      };
    });
  }

  // ============================================================================
  // LIMIT_OPERATIONS STAGE
  // ============================================================================
  if (stage === "LIMIT_OPERATIONS") {
    let dataSet;
    switch (difficulty) {
      case "BASIC":
        dataSet = limitOperationsDataBasic;
        break;
      case "CORE":
        dataSet = limitOperationsDataCore;
        break;
      case "ADVANCED":
        dataSet = limitOperationsDataAdvanced;
        break;
      case "ELITE":
        dataSet = limitOperationsDataElite;
        break;
      default:
        dataSet = limitOperationsDataBasic;
    }

    return dataSet.map((item) => {
      const formatExpr = (expr: string) => {
        return expr
          .replace(/\^/g, "^{")
          .replace(/sqrt\(/g, "\\sqrt{")
          .replace(/sin\(/g, "\\sin(")
          .replace(/cos\(/g, "\\cos(")
          .replace(/e\^/g, "e^{")
          .replace(/ln\(/g, "\\ln(")
          .replace(/\)/g, "}")
          .replace(/\^{(\d+)}/g, "^{$1}");
      };

      const fLatex = formatExpr(item.f);
      const gLatex = item.g ? formatExpr(item.g) : "";

      let expressionLatex: string;
      let promptLatex: string;

      if (item.operation === "sum") {
        expressionLatex = `f(x) = ${fLatex}, \\; g(x) = ${gLatex}`;
        promptLatex = `\\lim_{x \\to ${item.limitPoint}} [f(x) + g(x)]`;
      } else if (item.operation === "product") {
        expressionLatex = `f(x) = ${fLatex}, \\; g(x) = ${gLatex}`;
        promptLatex = `\\lim_{x \\to ${item.limitPoint}} [f(x) \\cdot g(x)]`;
      } else if (item.operation === "quotient") {
        if (item.method === "lhopital") {
          expressionLatex = `f(x) = ${fLatex}`;
          promptLatex = `\\lim_{x \\to ${item.limitPoint}} ${fLatex}`;
        } else {
          expressionLatex = `f(x) = ${fLatex}, \\; g(x) = ${gLatex}`;
          promptLatex = `\\lim_{x \\to ${item.limitPoint}} \\frac{f(x)}{g(x)}`;
        }
      } else {
        // composition
        expressionLatex = `f(x) = ${fLatex}, \\; g(x) = ${gLatex}`;
        promptLatex = `\\lim_{x \\to ${item.limitPoint}} f(g(x))`;
      }

      const expected = typeof item.answer === "number" ? round2(item.answer) : item.answer;

      return {
        id: item.id,
        difficulty,
        stage,
        functionExpr: item.f,
        limitPoint: item.limitPoint,
        limitValue: item.answer,
        promptLatex,
        expressionLatex,
        targetLatex: "\\lim",
        slots: [
          {
            id: "answer",
            labelLatex: "\\text{Result}",
            placeholder: "value",
            expected,
          },
        ],
        correctLatex: `${promptLatex} = ${expected}`,
      };
    });
  }

  // ============================================================================
  // CONTINUITY STAGE
  // ============================================================================
  let dataSet;
  switch (difficulty) {
    case "BASIC":
      dataSet = continuityDataBasic;
      break;
    case "CORE":
      dataSet = continuityDataCore;
      break;
    case "ADVANCED":
      dataSet = continuityDataAdvanced;
      break;
    case "ELITE":
      dataSet = continuityDataElite;
      break;
    default:
      dataSet = continuityDataBasic;
  }

  return dataSet.map((item) => {
    const formatExpr = (expr: string) => {
      return expr
        .replace(/\^/g, "^{")
        .replace(/sqrt\(/g, "\\sqrt{")
        .replace(/abs\(/g, "|")
        .replace(/floor\(/g, "\\lfloor ")
        .replace(/sign\(/g, "\\text{sign}(")
        .replace(/tan\(/g, "\\tan(")
        .replace(/\)/g, "}")
        .replace(/\^{(\d+)}/g, "^{$1}");
    };

    const expressionLatex = formatExpr(item.functionExpr);
    const promptLatex = `\\text{Is } f(x) = ${expressionLatex} \\text{ continuous at } x = ${item.point}?`;

    // For continuity questions, ask for continuity status
    const expected = item.isContinuous ? "yes" : "no";

    return {
      id: item.id,
      difficulty,
      stage,
      functionExpr: item.functionExpr,
      limitPoint: item.point,
      isContinuous: item.isContinuous,
      discontinuityType: item.discontinuityType,
      leftLimit: item.leftLimit,
      rightLimit: item.rightLimit,
      limitValue: item.limitValue,
      promptLatex,
      expressionLatex: `f(x) = ${expressionLatex}`,
      targetLatex: "\\text{Continuous?}",
      slots: [
        {
          id: "continuous",
          labelLatex: "\\text{Continuous?}",
          placeholder: "yes/no",
          expected,
        },
      ],
      correctLatex: `\\text{${item.isContinuous ? "Continuous" : `Discontinuous (${item.discontinuityType})`}}`,
    };
  });
}
