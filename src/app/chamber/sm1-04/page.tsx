"use client";

import { useEffect, useCallback } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import IntegerCanvas from "@/components/chamber/sm1-04/IntegerCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "NUMBER_LINE" | "RATIONALS" | "QUADRANTS";
type IntegerQuest = Quest & { stage: Stage; context?: string; scenario?: string; value?: number; x?: number; y?: number };

export default function SM104Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const locale = translations[currentLanguage as keyof typeof translations] as typeof translations.EN;
  const t = locale.sm1_04 || translations.EN.sm1_04;

  const buildStagePool = useCallback((t: typeof translations.EN.sm1_04, difficulty: Difficulty, stage: Stage): IntegerQuest[] => {
    const pools: Record<Stage, Record<Difficulty, IntegerQuest[]>> = {
      NUMBER_LINE: {
        BASIC: [
          {
            id: "NL_B1",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_identify_neg3,
            promptLatex: "\\text{Position}",
            expressionLatex: "-3",
            targetLatex: "x",
            value: -3,
            slots: [{ id: "x", labelLatex: "x", placeholder: "-x", expected: -3, unit: "" }],
            correctLatex: "x = -3",
          },
          {
            id: "NL_B2",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_identify_5,
            promptLatex: "\\text{Position}",
            expressionLatex: "5",
            targetLatex: "x",
            value: 5,
            slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 5, unit: "" }],
            correctLatex: "x = 5",
          },
          {
            id: "NL_B3",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_temp_neg2,
            promptLatex: "\\text{Temperature}",
            expressionLatex: "-2°C",
            targetLatex: "T",
            value: -2,
            slots: [{ id: "T", labelLatex: "T", placeholder: "-x", expected: -2, unit: "°C" }],
            correctLatex: "T = -2°C",
          },
          {
            id: "NL_B4",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_depth_neg4,
            promptLatex: "\\text{Depth}",
            expressionLatex: "-4m",
            targetLatex: "d",
            value: -4,
            slots: [{ id: "d", labelLatex: "d", placeholder: "-x", expected: -4, unit: "m" }],
            correctLatex: "d = -4m",
          },
          {
            id: "NL_B5",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_identify_0,
            promptLatex: "\\text{Position}",
            expressionLatex: "0",
            targetLatex: "x",
            value: 0,
            slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 0, unit: "" }],
            correctLatex: "x = 0",
          },
        ],
        CORE: [
          {
            id: "NL_C1",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_compare_neg5_neg2,
            promptLatex: "\\text{Which is colder?}",
            expressionLatex: "-5 < -2",
            targetLatex: "x",
            value: -5,
            slots: [{ id: "x", labelLatex: "x", placeholder: "-x", expected: -5, unit: "" }],
            correctLatex: "x = -5 \\text{ (colder)}",
          },
          {
            id: "NL_C2",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_compare_neg3_1,
            promptLatex: "\\text{Which is smaller?}",
            expressionLatex: "-3 < 1",
            targetLatex: "x",
            value: -3,
            slots: [{ id: "x", labelLatex: "x", placeholder: "-x", expected: -3, unit: "" }],
            correctLatex: "x = -3",
          },
          {
            id: "NL_C3",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_order_three,
            promptLatex: "\\text{Middle value}",
            expressionLatex: "-4, 0, 3",
            targetLatex: "x",
            value: 0,
            slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 0, unit: "" }],
            correctLatex: "x = 0",
          },
          {
            id: "NL_C4",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_rhine_level,
            promptLatex: "\\text{Water level}",
            expressionLatex: "5 - 8 = -3",
            targetLatex: "L",
            value: -3,
            slots: [{ id: "L", labelLatex: "L", placeholder: "-x", expected: -3, unit: "m" }],
            correctLatex: "L = -3m",
          },
          {
            id: "NL_C5",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_temp_drop,
            promptLatex: "\\text{Final temperature}",
            expressionLatex: "2 - 7 = -5",
            targetLatex: "T",
            value: -5,
            slots: [{ id: "T", labelLatex: "T", placeholder: "-x", expected: -5, unit: "°C" }],
            correctLatex: "T = -5°C",
          },
        ],
        ADVANCED: [
          {
            id: "NL_A1",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_distance_abs,
            promptLatex: "\\text{Distance}",
            expressionLatex: "|-5 - 2| = 7",
            targetLatex: "d",
            value: 7,
            slots: [{ id: "d", labelLatex: "d", placeholder: "x", expected: 7, unit: "" }],
            correctLatex: "d = 7",
          },
          {
            id: "NL_A2",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_abs_value,
            promptLatex: "\\text{Absolute value}",
            expressionLatex: "|-8| = 8",
            targetLatex: "x",
            value: 8,
            slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 8, unit: "" }],
            correctLatex: "|x| = 8",
          },
          {
            id: "NL_A3",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_distance_neg_neg,
            promptLatex: "\\text{Distance}",
            expressionLatex: "|-7 - (-3)| = 4",
            targetLatex: "d",
            value: 4,
            slots: [{ id: "d", labelLatex: "d", placeholder: "x", expected: 4, unit: "" }],
            correctLatex: "d = 4",
          },
          {
            id: "NL_A4",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_midpoint,
            promptLatex: "\\text{Midpoint}",
            expressionLatex: "\\frac{-6 + 4}{2} = -1",
            targetLatex: "m",
            value: -1,
            slots: [{ id: "m", labelLatex: "m", placeholder: "-x", expected: -1, unit: "" }],
            correctLatex: "m = -1",
          },
          {
            id: "NL_A5",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_temp_range,
            promptLatex: "\\text{Temperature range}",
            expressionLatex: "|5 - (-8)| = 13",
            targetLatex: "R",
            value: 13,
            slots: [{ id: "R", labelLatex: "R", placeholder: "xx", expected: 13, unit: "°C" }],
            correctLatex: "R = 13°C",
          },
        ],
        ELITE: [
          {
            id: "NL_E1",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_operation_add,
            promptLatex: "\\text{Result}",
            expressionLatex: "-5 + 3 = -2",
            targetLatex: "x",
            value: -2,
            slots: [{ id: "x", labelLatex: "x", placeholder: "-x", expected: -2, unit: "" }],
            correctLatex: "x = -2",
          },
          {
            id: "NL_E2",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_operation_sub,
            promptLatex: "\\text{Result}",
            expressionLatex: "-3 - 4 = -7",
            targetLatex: "x",
            value: -7,
            slots: [{ id: "x", labelLatex: "x", placeholder: "-x", expected: -7, unit: "" }],
            correctLatex: "x = -7",
          },
          {
            id: "NL_E3",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_operation_mult,
            promptLatex: "\\text{Result}",
            expressionLatex: "-4 \\times 2 = -8",
            targetLatex: "x",
            value: -8,
            slots: [{ id: "x", labelLatex: "x", placeholder: "-x", expected: -8, unit: "" }],
            correctLatex: "x = -8",
          },
          {
            id: "NL_E4",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_multi_step,
            promptLatex: "\\text{Result}",
            expressionLatex: "-6 + 8 - 5 = -3",
            targetLatex: "x",
            value: -3,
            slots: [{ id: "x", labelLatex: "x", placeholder: "-x", expected: -3, unit: "" }],
            correctLatex: "x = -3",
          },
          {
            id: "NL_E5",
            difficulty,
            stage,
            scenario: t.scenarios.number_line,
            context: t.problems.nl_complex_op,
            promptLatex: "\\text{Result}",
            expressionLatex: "(-2 + 5) - (3 - 7) = 7",
            targetLatex: "x",
            value: 7,
            slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 7, unit: "" }],
            correctLatex: "x = 7",
          },
        ],
      },
      RATIONALS: {
        BASIC: [
          {
            id: "R_B1",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_place_half,
            promptLatex: "\\text{Position}",
            expressionLatex: "0.5",
            targetLatex: "x",
            value: 0.5,
            slots: [{ id: "x", labelLatex: "x", placeholder: "0.x", expected: 0.5, unit: "" }],
            correctLatex: "x = 0.5",
          },
          {
            id: "R_B2",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_place_neg_half,
            promptLatex: "\\text{Position}",
            expressionLatex: "-0.5",
            targetLatex: "x",
            value: -0.5,
            slots: [{ id: "x", labelLatex: "x", placeholder: "-0.x", expected: -0.5, unit: "" }],
            correctLatex: "x = -0.5",
          },
          {
            id: "R_B3",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_place_1_5,
            promptLatex: "\\text{Position}",
            expressionLatex: "1.5",
            targetLatex: "x",
            value: 1.5,
            slots: [{ id: "x", labelLatex: "x", placeholder: "x.x", expected: 1.5, unit: "" }],
            correctLatex: "x = 1.5",
          },
          {
            id: "R_B4",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_place_neg2_5,
            promptLatex: "\\text{Position}",
            expressionLatex: "-2.5",
            targetLatex: "x",
            value: -2.5,
            slots: [{ id: "x", labelLatex: "x", placeholder: "-x.x", expected: -2.5, unit: "" }],
            correctLatex: "x = -2.5",
          },
          {
            id: "R_B5",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_fraction_third,
            promptLatex: "\\text{Decimal}",
            expressionLatex: "\\frac{1}{3} \\approx 0.33",
            targetLatex: "x",
            value: 0.33,
            slots: [{ id: "x", labelLatex: "x", placeholder: "0.xx", expected: 0.33, unit: "" }],
            correctLatex: "x \\approx 0.33",
          },
        ],
        CORE: [
          {
            id: "R_C1",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_compare_fractions,
            promptLatex: "\\text{Which is larger?}",
            expressionLatex: "-\\frac{1}{2} > -\\frac{1}{3}",
            targetLatex: "x",
            value: -0.33,
            slots: [{ id: "x", labelLatex: "x", placeholder: "-0.xx", expected: -0.33, unit: "" }],
            correctLatex: "x = -\\frac{1}{3} \\approx -0.33",
          },
          {
            id: "R_C2",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_compare_decimals,
            promptLatex: "\\text{Which is smaller?}",
            expressionLatex: "-0.75 < -0.5",
            targetLatex: "x",
            value: -0.75,
            slots: [{ id: "x", labelLatex: "x", placeholder: "-0.xx", expected: -0.75, unit: "" }],
            correctLatex: "x = -0.75",
          },
          {
            id: "R_C3",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_order_mixed,
            promptLatex: "\\text{Smallest value}",
            expressionLatex: "-1.5, -0.5, 0.5",
            targetLatex: "x",
            value: -1.5,
            slots: [{ id: "x", labelLatex: "x", placeholder: "-x.x", expected: -1.5, unit: "" }],
            correctLatex: "x = -1.5",
          },
          {
            id: "R_C4",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_add_decimals,
            promptLatex: "\\text{Sum}",
            expressionLatex: "0.5 + 0.25 = 0.75",
            targetLatex: "x",
            value: 0.75,
            slots: [{ id: "x", labelLatex: "x", placeholder: "0.xx", expected: 0.75, unit: "" }],
            correctLatex: "x = 0.75",
          },
          {
            id: "R_C5",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_sub_decimals,
            promptLatex: "\\text{Difference}",
            expressionLatex: "1.5 - 2.25 = -0.75",
            targetLatex: "x",
            value: -0.75,
            slots: [{ id: "x", labelLatex: "x", placeholder: "-0.xx", expected: -0.75, unit: "" }],
            correctLatex: "x = -0.75",
          },
        ],
        ADVANCED: [
          {
            id: "R_A1",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_compare_neg_decimals,
            promptLatex: "\\text{Which is colder?}",
            expressionLatex: "-0.75 < -0.8",
            targetLatex: "T",
            value: -0.8,
            slots: [{ id: "T", labelLatex: "T", placeholder: "-0.x", expected: -0.8, unit: "°C" }],
            correctLatex: "T = -0.8°C",
          },
          {
            id: "R_A2",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_fraction_to_decimal,
            promptLatex: "\\text{Decimal}",
            expressionLatex: "-\\frac{3}{4} = -0.75",
            targetLatex: "x",
            value: -0.75,
            slots: [{ id: "x", labelLatex: "x", placeholder: "-0.xx", expected: -0.75, unit: "" }],
            correctLatex: "x = -0.75",
          },
          {
            id: "R_A3",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_mult_decimals,
            promptLatex: "\\text{Product}",
            expressionLatex: "0.5 \\times 1.5 = 0.75",
            targetLatex: "x",
            value: 0.75,
            slots: [{ id: "x", labelLatex: "x", placeholder: "0.xx", expected: 0.75, unit: "" }],
            correctLatex: "x = 0.75",
          },
          {
            id: "R_A4",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_div_decimals,
            promptLatex: "\\text{Quotient}",
            expressionLatex: "1.5 \\div 0.5 = 3",
            targetLatex: "x",
            value: 3,
            slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 3, unit: "" }],
            correctLatex: "x = 3",
          },
          {
            id: "R_A5",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_mixed_operations,
            promptLatex: "\\text{Result}",
            expressionLatex: "0.5 + 1.25 - 0.75 = 1",
            targetLatex: "x",
            value: 1,
            slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 1, unit: "" }],
            correctLatex: "x = 1",
          },
        ],
        ELITE: [
          {
            id: "R_E1",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_order_complex,
            promptLatex: "\\text{Order from smallest}",
            expressionLatex: "-1.5, -\\frac{3}{2}, 0, 1.2",
            targetLatex: "x_1",
            value: -1.5,
            slots: [{ id: "x1", labelLatex: "x_1", placeholder: "-x.x", expected: -1.5, unit: "" }],
            correctLatex: "x_1 = -1.5 = -\\frac{3}{2}",
          },
          {
            id: "R_E2",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_fraction_operations,
            promptLatex: "\\text{Result}",
            expressionLatex: "\\frac{1}{2} + \\frac{1}{4} = \\frac{3}{4}",
            targetLatex: "x",
            value: 0.75,
            slots: [{ id: "x", labelLatex: "x", placeholder: "0.xx", expected: 0.75, unit: "" }],
            correctLatex: "x = 0.75",
          },
          {
            id: "R_E3",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_neg_fraction_ops,
            promptLatex: "\\text{Result}",
            expressionLatex: "-\\frac{1}{2} - \\frac{1}{4} = -\\frac{3}{4}",
            targetLatex: "x",
            value: -0.75,
            slots: [{ id: "x", labelLatex: "x", placeholder: "-0.xx", expected: -0.75, unit: "" }],
            correctLatex: "x = -0.75",
          },
          {
            id: "R_E4",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_complex_decimal,
            promptLatex: "\\text{Result}",
            expressionLatex: "(0.5 - 1.25) \\times 2 = -1.5",
            targetLatex: "x",
            value: -1.5,
            slots: [{ id: "x", labelLatex: "x", placeholder: "-x.x", expected: -1.5, unit: "" }],
            correctLatex: "x = -1.5",
          },
          {
            id: "R_E5",
            difficulty,
            stage,
            scenario: t.scenarios.rationals,
            context: t.problems.r_repeating_decimal,
            promptLatex: "\\text{Decimal}",
            expressionLatex: "\\frac{2}{3} \\approx 0.67",
            targetLatex: "x",
            value: 0.67,
            slots: [{ id: "x", labelLatex: "x", placeholder: "0.xx", expected: 0.67, unit: "" }],
            correctLatex: "x \\approx 0.67",
          },
        ],
      },
      QUADRANTS: {
        BASIC: [
          {
            id: "Q_B1",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_identify_point,
            promptLatex: "\\text{x-coordinate}",
            expressionLatex: "(2, 3)",
            targetLatex: "x",
            x: 2,
            y: 3,
            slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 2, unit: "" }],
            correctLatex: "x = 2",
          },
          {
            id: "Q_B2",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_identify_y,
            promptLatex: "\\text{y-coordinate}",
            expressionLatex: "(3, 4)",
            targetLatex: "y",
            x: 3,
            y: 4,
            slots: [{ id: "y", labelLatex: "y", placeholder: "y", expected: 4, unit: "" }],
            correctLatex: "y = 4",
          },
          {
            id: "Q_B3",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_plot_positive,
            promptLatex: "\\text{Plot point}",
            expressionLatex: "(1, 2)",
            targetLatex: "x",
            x: 1,
            y: 2,
            slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 1, unit: "" }],
            correctLatex: "(1, 2)",
          },
          {
            id: "Q_B4",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_origin,
            promptLatex: "\\text{x-coordinate at origin}",
            expressionLatex: "(0, 0)",
            targetLatex: "x",
            x: 0,
            y: 0,
            slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 0, unit: "" }],
            correctLatex: "x = 0",
          },
          {
            id: "Q_B5",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_axis_point,
            promptLatex: "\\text{y-coordinate}",
            expressionLatex: "(3, 0)",
            targetLatex: "y",
            x: 3,
            y: 0,
            slots: [{ id: "y", labelLatex: "y", placeholder: "y", expected: 0, unit: "" }],
            correctLatex: "y = 0",
          },
        ],
        CORE: [
          {
            id: "Q_C1",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_quadrant_2,
            promptLatex: "\\text{Quadrant}",
            expressionLatex: "(-2, 5)",
            targetLatex: "Q",
            x: -2,
            y: 5,
            slots: [{ id: "Q", labelLatex: "Q", placeholder: "1-4", expected: 2, unit: "" }],
            correctLatex: "Q = 2",
          },
          {
            id: "Q_C2",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_quadrant_3,
            promptLatex: "\\text{Quadrant}",
            expressionLatex: "(-3, -4)",
            targetLatex: "Q",
            x: -3,
            y: -4,
            slots: [{ id: "Q", labelLatex: "Q", placeholder: "1-4", expected: 3, unit: "" }],
            correctLatex: "Q = 3",
          },
          {
            id: "Q_C3",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_quadrant_4,
            promptLatex: "\\text{Quadrant}",
            expressionLatex: "(4, -2)",
            targetLatex: "Q",
            x: 4,
            y: -2,
            slots: [{ id: "Q", labelLatex: "Q", placeholder: "1-4", expected: 4, unit: "" }],
            correctLatex: "Q = 4",
          },
          {
            id: "Q_C4",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_basel_landmarks,
            promptLatex: "\\text{x-coordinate of Kleinbasel}",
            expressionLatex: "(-3, 2)",
            targetLatex: "x",
            x: -3,
            y: 2,
            slots: [{ id: "x", labelLatex: "x", placeholder: "-x", expected: -3, unit: "" }],
            correctLatex: "x = -3",
          },
          {
            id: "Q_C5",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_distance_horizontal,
            promptLatex: "\\text{Distance}",
            expressionLatex: "|5 - 2| = 3",
            targetLatex: "d",
            x: 5,
            y: 0,
            slots: [{ id: "d", labelLatex: "d", placeholder: "x", expected: 3, unit: "" }],
            correctLatex: "d = 3",
          },
        ],
        ADVANCED: [
          {
            id: "Q_A1",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_reflect_x_axis,
            promptLatex: "\\text{y-coordinate after reflection}",
            expressionLatex: "(3, 4) \\to (3, -4)",
            targetLatex: "y'",
            x: 3,
            y: -4,
            slots: [{ id: "yp", labelLatex: "y'", placeholder: "-y", expected: -4, unit: "" }],
            correctLatex: "y' = -4",
          },
          {
            id: "Q_A2",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_reflect_y_axis,
            promptLatex: "\\text{x-coordinate after reflection}",
            expressionLatex: "(5, 2) \\to (-5, 2)",
            targetLatex: "x'",
            x: -5,
            y: 2,
            slots: [{ id: "xp", labelLatex: "x'", placeholder: "-x", expected: -5, unit: "" }],
            correctLatex: "x' = -5",
          },
          {
            id: "Q_A3",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_reflect_origin,
            promptLatex: "\\text{x-coordinate after reflection}",
            expressionLatex: "(3, 4) \\to (-3, -4)",
            targetLatex: "x'",
            x: -3,
            y: -4,
            slots: [{ id: "xp", labelLatex: "x'", placeholder: "-x", expected: -3, unit: "" }],
            correctLatex: "x' = -3",
          },
          {
            id: "Q_A4",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_translate,
            promptLatex: "\\text{x-coordinate after translation}",
            expressionLatex: "(2, 3) + (4, 0) = (6, 3)",
            targetLatex: "x'",
            x: 6,
            y: 3,
            slots: [{ id: "xp", labelLatex: "x'", placeholder: "x", expected: 6, unit: "" }],
            correctLatex: "x' = 6",
          },
          {
            id: "Q_A5",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_midpoint_2d,
            promptLatex: "\\text{x-coordinate of midpoint}",
            expressionLatex: "\\frac{2 + 6}{2} = 4",
            targetLatex: "x_m",
            x: 4,
            y: 3,
            slots: [{ id: "xm", labelLatex: "x_m", placeholder: "x", expected: 4, unit: "" }],
            correctLatex: "x_m = 4",
          },
        ],
        ELITE: [
          {
            id: "Q_E1",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_distance_vertical,
            promptLatex: "\\text{Distance}",
            expressionLatex: "|5 - (-3)| = 8",
            targetLatex: "d",
            x: 0,
            y: 5,
            slots: [{ id: "d", labelLatex: "d", placeholder: "x", expected: 8, unit: "" }],
            correctLatex: "d = 8",
          },
          {
            id: "Q_E2",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_perimeter_rectangle,
            promptLatex: "\\text{Perimeter}",
            expressionLatex: "2(4 + 3) = 14",
            targetLatex: "P",
            x: 4,
            y: 3,
            slots: [{ id: "P", labelLatex: "P", placeholder: "xx", expected: 14, unit: "" }],
            correctLatex: "P = 14",
          },
          {
            id: "Q_E3",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_area_rectangle,
            promptLatex: "\\text{Area}",
            expressionLatex: "4 \\times 3 = 12",
            targetLatex: "A",
            x: 4,
            y: 3,
            slots: [{ id: "A", labelLatex: "A", placeholder: "xx", expected: 12, unit: "" }],
            correctLatex: "A = 12",
          },
          {
            id: "Q_E4",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_diagonal_distance,
            promptLatex: "\\text{Horizontal distance}",
            expressionLatex: "|6 - 2| = 4",
            targetLatex: "d_x",
            x: 6,
            y: 5,
            slots: [{ id: "dx", labelLatex: "d_x", placeholder: "x", expected: 4, unit: "" }],
            correctLatex: "d_x = 4",
          },
          {
            id: "Q_E5",
            difficulty,
            stage,
            scenario: t.scenarios.quadrants,
            context: t.problems.q_complex_translation,
            promptLatex: "\\text{Final x-coordinate}",
            expressionLatex: "2 + 3 - 1 = 4",
            targetLatex: "x'",
            x: 4,
            y: 5,
            slots: [{ id: "xp", labelLatex: "x'", placeholder: "x", expected: 4, unit: "" }],
            correctLatex: "x' = 4",
          },
        ],
      },
    };

    return pools[stage][difficulty] || [];
  }, []);

  const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => buildStagePool(t, difficulty, stage), [t, buildStagePool]);

  const {
    currentQuest: quest,
    stage,
    inputs,
    setInputs,
    lastCheck,
    verify,
    next,
    handleStageChange,
    difficulty,
    handleDifficultyChange,
  } = useQuestManager<IntegerQuest, Stage>({
    buildPool,
    initialStage: "NUMBER_LINE",
    tolerance: 0.01,
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sm1-04", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="SM1.04"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "NUMBER_LINE", label: t.stages.number_line },
        { id: "RATIONALS", label: t.stages.rationals },
        { id: "QUADRANTS", label: t.stages.quadrants },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t.footer_left}
      translations={{
        back: t.back,
        check: t.check,
        next: t.next,
        correct: t.correct,
        incorrect: t.incorrect,
        ready: t.ready,
        monitor_title: t.monitor_title,
        difficulty: {
          basic: t.difficulty.basic,
          core: t.difficulty.core,
          advanced: t.difficulty.advanced,
          elite: t.difficulty.elite,
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <IntegerCanvas 
            stage={stage} 
            quest={quest}
            language={currentLanguage as "EN" | "CN" | "DE"} 
          />
        </div>
      }
    >
      <div className="space-y-8">
        {quest?.scenario && (
          <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl">
            <div className="text-[10px] uppercase tracking-[0.4em] text-purple-400 font-black mb-3">
              {t.basel_scenario}
            </div>
            <p className="text-white/90 leading-relaxed font-medium">{quest.scenario}</p>
          </div>
        )}

        {quest?.context && (
          <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
            <div className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-black mb-3">
              {t.scenario_title}
            </div>
            <p className="text-white/80 leading-relaxed">{quest.context}</p>
          </div>
        )}

        <div className="text-center space-y-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t.calculate_title}
          </div>
          <div className="text-3xl text-white font-black">
            <InlineMath math={quest?.promptLatex || ""} />
          </div>
        </div>

        {quest?.expressionLatex && (
          <div className="text-center p-4 bg-white/5 border border-white/10 rounded-xl">
            <BlockMath math={quest.expressionLatex} />
          </div>
        )}

        <div className="max-w-md mx-auto space-y-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white font-black text-center">
            {t.answer_title}
          </div>
          {quest?.slots.map((slot) => (
            <div key={slot.id} className="space-y-2">
              <label className="text-sm text-white/70 font-mono">
                <InlineMath math={slot.labelLatex} />
              </label>
              <input
                value={inputs[slot.id] ?? ""}
                onChange={(e) => setInputs((prev) => ({ ...prev, [slot.id]: e.target.value }))}
                className="w-full bg-black border-2 border-cyan-500/50 p-4 text-center outline-none focus:border-cyan-400 placeholder:text-white/40 font-black text-2xl text-white rounded-lg"
                placeholder={slot.placeholder}
              />
            </div>
          ))}
        </div>

        {lastCheck?.ok && quest?.correctLatex && (
          <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
            <div className="text-green-400 font-black mb-2">{t.solution_title}</div>
            <BlockMath math={quest.correctLatex} />
          </div>
        )}
      </div>
    </ChamberLayout>
  );
}
