"use client";

import { useEffect, useCallback, useMemo } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useLanguage, useNamespace } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";
import IntegerCanvas from "@/components/chamber/sm1-03/IntegerCanvas";
import { Difficulty, useQuestManager } from "@/hooks/useQuestManager";
import { renderMixedText } from "@/lib/latex-utils";
import { createSM103FeedbackProvider } from "@/lib/sm1-03/provider";
import type { IntegerQuest, SM103Stage as Stage } from "@/lib/sm1-03/types";

export default function SM103Page() {
  const { t } = useLanguage();
  const feedbackContentProvider = useMemo(() => createSM103FeedbackProvider(t), [t]);

  // Pre-extract all translations
  const sm1_03_t = useNamespace("sm1_03");

  const buildStagePool = useCallback((tObj: typeof sm1_03_t, difficulty: Difficulty, stage: Stage): IntegerQuest[] => {
    const pools: Record<Stage, Record<Difficulty, IntegerQuest[]>> = {
      NUMBER_LINE: {
        BASIC: [
          {
            id: "NL_B1",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_identify_neg3,
            promptLatex: t("sm1_03.prompts.pos"),
            expressionLatex: "-3",
            targetLatex: "x",
            value: -3,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.minus_x"), expected: -3, unit: "" }],
            correctLatex: "x = -3",
          },
          {
            id: "NL_B2",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_identify_5,
            promptLatex: t("sm1_03.prompts.pos"),
            expressionLatex: "5",
            targetLatex: "x",
            value: 5,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.x"), expected: 5, unit: "" }],
            correctLatex: "x = 5",
          },
          {
            id: "NL_B3",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_temp_neg2,
            promptLatex: t("sm1_03.prompts.final_temp"),
            expressionLatex: "-2^\\circ\\text{C}",
            targetLatex: "T",
            value: -2,
            slots: [{ id: "T", labelLatex: "T", placeholder: t("sm1_03.placeholders.minus_x"), expected: -2, unit: "°C" }],
            correctLatex: "T = -2^\\circ\\text{C}",
          },
          {
            id: "NL_B4",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_depth_neg4,
            promptLatex: t("sm1_03.prompts.dist"),
            expressionLatex: "-4\\text{m}",
            targetLatex: "d",
            value: -4,
            slots: [{ id: "d", labelLatex: "d", placeholder: t("sm1_03.placeholders.minus_x"), expected: -4, unit: "m" }],
            correctLatex: "d = -4\\text{m}",
          },
          {
            id: "NL_B5",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_identify_0,
            promptLatex: t("sm1_03.prompts.pos"),
            expressionLatex: "0",
            targetLatex: "x",
            value: 0,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.x"), expected: 0, unit: "" }],
            correctLatex: "x = 0",
          },
        ],
        CORE: [
          {
            id: "NL_C1",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_compare_neg5_neg2,
            promptLatex: t("sm1_03.prompts.colder"),
            expressionLatex: "-5 < -2",
            targetLatex: "x",
            value: -5,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.minus_x"), expected: -5, unit: "" }],
            correctLatex: "x = -5 \\text{ (colder)}",
          },
          {
            id: "NL_C2",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_compare_neg3_1,
            promptLatex: t("sm1_03.prompts.smaller"),
            expressionLatex: "-3 < 1",
            targetLatex: "x",
            value: -3,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.minus_x"), expected: -3, unit: "" }],
            correctLatex: "x = -3",
          },
          {
            id: "NL_C3",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_order_three,
            promptLatex: t("sm1_03.prompts.middle_value"),
            expressionLatex: "-4, 0, 3",
            targetLatex: "x",
            value: 0,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.x"), expected: 0, unit: "" }],
            correctLatex: "x = 0",
          },
          {
            id: "NL_C4",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_rhine_level,
            promptLatex: t("sm1_03.prompts.water_lvl"),
            expressionLatex: "5 - 8 = -3",
            targetLatex: "L",
            value: -3,
            slots: [{ id: "L", labelLatex: "L", placeholder: t("sm1_03.placeholders.minus_x"), expected: -3, unit: "m" }],
            correctLatex: "L = -3\\text{m}",
          },
          {
            id: "NL_C5",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_temp_drop,
            promptLatex: t("sm1_03.prompts.final_temp"),
            expressionLatex: "2 - 7 = -5",
            targetLatex: "T",
            value: -5,
            slots: [{ id: "T", labelLatex: "T", placeholder: t("sm1_03.placeholders.minus_x"), expected: -5, unit: "°C" }],
            correctLatex: "T = -5^\\circ\\text{C}",
          },
        ],
        ADVANCED: [
          {
            id: "NL_A1",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_distance_abs,
            promptLatex: t("sm1_03.prompts.dist"),
            expressionLatex: "|-5 - 2| = 7",
            targetLatex: "d",
            value: 7,
            slots: [{ id: "d", labelLatex: "d", placeholder: t("sm1_03.placeholders.x"), expected: 7, unit: "" }],
            correctLatex: "d = 7",
          },
          {
            id: "NL_A2",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_abs_value,
            promptLatex: t("sm1_03.prompts.abs"),
            expressionLatex: "|-8| = 8",
            targetLatex: "x",
            value: 8,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.x"), expected: 8, unit: "" }],
            correctLatex: "|x| = 8",
          },
          {
            id: "NL_A3",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_distance_neg_neg,
            promptLatex: t("sm1_03.prompts.dist"),
            expressionLatex: "|-7 - (-3)| = 4",
            targetLatex: "d",
            value: 4,
            slots: [{ id: "d", labelLatex: "d", placeholder: t("sm1_03.placeholders.x"), expected: 4, unit: "" }],
            correctLatex: "d = 4",
          },
          {
            id: "NL_A4",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_midpoint,
            promptLatex: t("sm1_03.prompts.midpoint"),
            expressionLatex: "\\frac{-6 + 4}{2} = -1",
            targetLatex: "m",
            value: -1,
            slots: [{ id: "m", labelLatex: "m", placeholder: t("sm1_03.placeholders.minus_x"), expected: -1, unit: "" }],
            correctLatex: "m = -1",
          },
          {
            id: "NL_A5",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_temp_range,
            promptLatex: t("sm1_03.prompts.range"),
            expressionLatex: "|5 - (-8)| = 13",
            targetLatex: "R",
            value: 13,
            slots: [{ id: "R", labelLatex: "R", placeholder: t("sm1_03.placeholders.xx"), expected: 13, unit: "°C" }],
            correctLatex: "R = 13^\\circ\\text{C}",
          },
        ],
        ELITE: [
          {
            id: "NL_E1",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_operation_add,
            promptLatex: t("sm1_03.prompts.result"),
            expressionLatex: "-5 + 3 = -2",
            targetLatex: "x",
            value: -2,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.minus_x"), expected: -2, unit: "" }],
            correctLatex: "x = -2",
          },
          {
            id: "NL_E2",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_operation_sub,
            promptLatex: t("sm1_03.prompts.result"),
            expressionLatex: "-3 - 4 = -7",
            targetLatex: "x",
            value: -7,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.minus_x"), expected: -7, unit: "" }],
            correctLatex: "x = -7",
          },
          {
            id: "NL_E3",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_operation_mult,
            promptLatex: t("sm1_03.prompts.result"),
            expressionLatex: "-4 \\times 2 = -8",
            targetLatex: "x",
            value: -8,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.minus_x"), expected: -8, unit: "" }],
            correctLatex: "x = -8",
          },
          {
            id: "NL_E4",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_multi_step,
            promptLatex: t("sm1_03.prompts.result"),
            expressionLatex: "-6 + 8 - 5 = -3",
            targetLatex: "x",
            value: -3,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.minus_x"), expected: -3, unit: "" }],
            correctLatex: "x = -3",
          },
          {
            id: "NL_E5",
            difficulty,
            stage,
            scenario: tObj.scenarios.number_line,
            context: tObj.problems.nl_complex_op,
            promptLatex: t("sm1_03.prompts.result"),
            expressionLatex: "(-2 + 5) - (3 - 7) = 7",
            targetLatex: "x",
            value: 7,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.x"), expected: 7, unit: "" }],
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
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_place_half,
            promptLatex: t("sm1_03.prompts.pos"),
            expressionLatex: "0.5",
            targetLatex: "x",
            value: 0.5,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.v_0_dot_x"), expected: 0.5, unit: "" }],
            correctLatex: "x = 0.5",
          },
          {
            id: "R_B2",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_place_neg_half,
            promptLatex: t("sm1_03.prompts.pos"),
            expressionLatex: "-0.5",
            targetLatex: "x",
            value: -0.5,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.minus_0_dot_x"), expected: -0.5, unit: "" }],
            correctLatex: "x = -0.5",
          },
          {
            id: "R_B3",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_place_1_5,
            promptLatex: t("sm1_03.prompts.pos"),
            expressionLatex: "1.5",
            targetLatex: "x",
            value: 1.5,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.x_dot_x"), expected: 1.5, unit: "" }],
            correctLatex: "x = 1.5",
          },
          {
            id: "R_B4",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_place_neg2_5,
            promptLatex: t("sm1_03.prompts.pos"),
            expressionLatex: "-2.5",
            targetLatex: "x",
            value: -2.5,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.minus_x_dot_x"), expected: -2.5, unit: "" }],
            correctLatex: "x = -2.5",
          },
          {
            id: "R_B5",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_fraction_third,
            promptLatex: t("sm1_03.prompts.decimal"),
            expressionLatex: "\\frac{1}{3} \\approx 0.33",
            targetLatex: "x",
            value: 0.33,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.v_0_dot_xx"), expected: 0.33, unit: "" }],
            correctLatex: "x \\approx 0.33",
          },
        ],
        CORE: [
          {
            id: "R_C1",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_compare_fractions,
            promptLatex: t("sm1_03.prompts.which_is_larger"),
            expressionLatex: "-\\frac{1}{2} > -\\frac{1}{3}",
            targetLatex: "x",
            value: -0.33,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.minus_0_dot_xx"), expected: -0.33, unit: "" }],
            correctLatex: "x = -\\frac{1}{3} \\approx -0.33",
          },
          {
            id: "R_C2",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_compare_decimals,
            promptLatex: t("sm1_03.prompts.smaller"),
            expressionLatex: "-0.75 < -0.5",
            targetLatex: "x",
            value: -0.75,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.minus_0_dot_xx"), expected: -0.75, unit: "" }],
            correctLatex: "x = -0.75",
          },
          {
            id: "R_C3",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_order_mixed,
            promptLatex: t("sm1_03.prompts.smallest_value"),
            expressionLatex: "-1.5, -0.5, 0.5",
            targetLatex: "x",
            value: -1.5,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.minus_x_dot_x"), expected: -1.5, unit: "" }],
            correctLatex: "x = -1.5",
          },
          {
            id: "R_C4",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_add_decimals,
            promptLatex: t("sm1_03.prompts.sum"),
            expressionLatex: "0.5 + 0.25 = 0.75",
            targetLatex: "x",
            value: 0.75,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.v_0_dot_xx"), expected: 0.75, unit: "" }],
            correctLatex: "x = 0.75",
          },
          {
            id: "R_C5",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_sub_decimals,
            promptLatex: t("sm1_03.prompts.difference"),
            expressionLatex: "1.5 - 2.25 = -0.75",
            targetLatex: "x",
            value: -0.75,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.minus_0_dot_xx"), expected: -0.75, unit: "" }],
            correctLatex: "x = -0.75",
          },
        ],
        ADVANCED: [
          {
            id: "R_A1",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_compare_neg_decimals,
            promptLatex: t("sm1_03.prompts.colder"),
            expressionLatex: "-0.75 < -0.8",
            targetLatex: "T",
            value: -0.8,
            slots: [{ id: "T", labelLatex: "T", placeholder: t("sm1_03.placeholders.minus_0_dot_x"), expected: -0.8, unit: "°C" }],
            correctLatex: "T = -0.8^\\circ\\text{C}",
          },
          {
            id: "R_A2",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_fraction_to_decimal,
            promptLatex: t("sm1_03.prompts.decimal"),
            expressionLatex: "-\\frac{3}{4} = -0.75",
            targetLatex: "x",
            value: -0.75,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.minus_0_dot_xx"), expected: -0.75, unit: "" }],
            correctLatex: "x = -0.75",
          },
          {
            id: "R_A3",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_mult_decimals,
            promptLatex: t("sm1_03.prompts.product"),
            expressionLatex: "0.5 \\times 1.5 = 0.75",
            targetLatex: "x",
            value: 0.75,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.v_0_dot_xx"), expected: 0.75, unit: "" }],
            correctLatex: "x = 0.75",
          },
          {
            id: "R_A4",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_div_decimals,
            promptLatex: t("sm1_03.prompts.quotient"),
            expressionLatex: "1.5 \\div 0.5 = 3",
            targetLatex: "x",
            value: 3,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.x"), expected: 3, unit: "" }],
            correctLatex: "x = 3",
          },
          {
            id: "R_A5",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_mixed_operations,
            promptLatex: t("sm1_03.prompts.result"),
            expressionLatex: "0.5 + 1.25 - 0.75 = 1",
            targetLatex: "x",
            value: 1,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.x"), expected: 1, unit: "" }],
            correctLatex: "x = 1",
          },
        ],
        ELITE: [
          {
            id: "R_E1",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_order_complex,
            promptLatex: t("sm1_03.prompts.order_smallest"),
            expressionLatex: "-1.5, -\\frac{3}{2}, 0, 1.2",
            targetLatex: "x_1",
            value: -1.5,
            slots: [{ id: "x1", labelLatex: "x_1", placeholder: t("sm1_03.placeholders.minus_x_dot_x"), expected: -1.5, unit: "" }],
            correctLatex: "x_1 = -1.5 = -\\frac{3}{2}",
          },
          {
            id: "R_E2",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_fraction_operations,
            promptLatex: t("sm1_03.prompts.result"),
            expressionLatex: "\\frac{1}{2} + \\frac{1}{4} = \\frac{3}{4}",
            targetLatex: "x",
            value: 0.75,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.v_0_dot_xx"), expected: 0.75, unit: "" }],
            correctLatex: "x = 0.75",
          },
          {
            id: "R_E3",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_neg_fraction_ops,
            promptLatex: t("sm1_03.prompts.result"),
            expressionLatex: "-\\frac{1}{2} - \\frac{1}{4} = -\\frac{3}{4}",
            targetLatex: "x",
            value: -0.75,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.minus_0_dot_xx"), expected: -0.75, unit: "" }],
            correctLatex: "x = -0.75",
          },
          {
            id: "R_E4",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_complex_decimal,
            promptLatex: t("sm1_03.prompts.result"),
            expressionLatex: "(0.5 - 1.25) \\times 2 = -1.5",
            targetLatex: "x",
            value: -1.5,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.minus_x_dot_x"), expected: -1.5, unit: "" }],
            correctLatex: "x = -1.5",
          },
          {
            id: "R_E5",
            difficulty,
            stage,
            scenario: tObj.scenarios.rationals,
            context: tObj.problems.r_repeating_decimal,
            promptLatex: t("sm1_03.prompts.decimal"),
            expressionLatex: "\\frac{2}{3} \\approx 0.67",
            targetLatex: "x",
            value: 0.67,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.v_0_dot_xx"), expected: 0.67, unit: "" }],
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
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_identify_point,
            promptLatex: t("sm1_03.prompts.x_coord"),
            expressionLatex: "(2, 3)",
            targetLatex: "x",
            x: 2,
            y: 3,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.x"), expected: 2, unit: "" }],
            correctLatex: "x = 2",
          },
          {
            id: "Q_B2",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_identify_y,
            promptLatex: t("sm1_03.prompts.y_coord"),
            expressionLatex: "(3, 4)",
            targetLatex: "y",
            x: 3,
            y: 4,
            slots: [{ id: "y", labelLatex: "y", placeholder: t("sm1_03.placeholders.y"), expected: 4, unit: "" }],
            correctLatex: "y = 4",
          },
          {
            id: "Q_B3",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_plot_positive,
            promptLatex: t("sm1_03.prompts.plot_point"),
            expressionLatex: "(1, 2)",
            targetLatex: "x",
            x: 1,
            y: 2,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.x"), expected: 1, unit: "" }],
            correctLatex: "(1, 2)",
          },
          {
            id: "Q_B4",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_origin,
            promptLatex: t("sm1_03.prompts.x_coord"),
            expressionLatex: "(0, 0)",
            targetLatex: "x",
            x: 0,
            y: 0,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.x"), expected: 0, unit: "" }],
            correctLatex: "x = 0",
          },
          {
            id: "Q_B5",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_axis_point,
            promptLatex: t("sm1_03.prompts.y_coord"),
            expressionLatex: "(3, 0)",
            targetLatex: "y",
            x: 3,
            y: 0,
            slots: [{ id: "y", labelLatex: "y", placeholder: t("sm1_03.placeholders.y"), expected: 0, unit: "" }],
            correctLatex: "y = 0",
          },
        ],
        CORE: [
          {
            id: "Q_C1",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_quadrant_2,
            promptLatex: t("sm1_03.prompts.quadrant"),
            expressionLatex: "(-2, 5)",
            targetLatex: "Q",
            x: -2,
            y: 5,
            slots: [{ id: "Q", labelLatex: "Q", placeholder: t("sm1_03.placeholders.v_1_minus_4"), expected: 2, unit: "" }],
            correctLatex: "Q = 2",
          },
          {
            id: "Q_C2",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_quadrant_3,
            promptLatex: t("sm1_03.prompts.quadrant"),
            expressionLatex: "(-3, -4)",
            targetLatex: "Q",
            x: -3,
            y: -4,
            slots: [{ id: "Q", labelLatex: "Q", placeholder: t("sm1_03.placeholders.v_1_minus_4"), expected: 3, unit: "" }],
            correctLatex: "Q = 3",
          },
          {
            id: "Q_C3",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_quadrant_4,
            promptLatex: t("sm1_03.prompts.quadrant"),
            expressionLatex: "(4, -2)",
            targetLatex: "Q",
            x: 4,
            y: -2,
            slots: [{ id: "Q", labelLatex: "Q", placeholder: t("sm1_03.placeholders.v_1_minus_4"), expected: 4, unit: "" }],
            correctLatex: "Q = 4",
          },
          {
            id: "Q_C4",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_basel_landmarks,
            promptLatex: t("sm1_03.prompts.x_coord"),
            expressionLatex: "(-3, 2)",
            targetLatex: "x",
            x: -3,
            y: 2,
            slots: [{ id: "x", labelLatex: "x", placeholder: t("sm1_03.placeholders.minus_x"), expected: -3, unit: "" }],
            correctLatex: "x = -3",
          },
          {
            id: "Q_C5",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_distance_horizontal,
            promptLatex: t("sm1_03.prompts.dist"),
            expressionLatex: "|5 - 2| = 3",
            targetLatex: "d",
            x: 5,
            y: 0,
            slots: [{ id: "d", labelLatex: "d", placeholder: t("sm1_03.placeholders.x"), expected: 3, unit: "" }],
            correctLatex: "d = 3",
          },
        ],
        ADVANCED: [
          {
            id: "Q_A1",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_reflect_x_axis,
            promptLatex: t("sm1_03.prompts.y_coord"),
            expressionLatex: "(3, 4) \\to (3, -4)",
            targetLatex: "y'",
            x: 3,
            y: -4,
            slots: [{ id: "yp", labelLatex: "y'", placeholder: t("sm1_03.placeholders.minus_y"), expected: -4, unit: "" }],
            correctLatex: "y' = -4",
          },
          {
            id: "Q_A2",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_reflect_y_axis,
            promptLatex: t("sm1_03.prompts.x_coord"),
            expressionLatex: "(5, 2) \\to (-5, 2)",
            targetLatex: "x'",
            x: -5,
            y: 2,
            slots: [{ id: "xp", labelLatex: "x'", placeholder: t("sm1_03.placeholders.minus_x"), expected: -5, unit: "" }],
            correctLatex: "x' = -5",
          },
          {
            id: "Q_A3",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_reflect_origin,
            promptLatex: t("sm1_03.prompts.x_coord"),
            expressionLatex: "(3, 4) \\to (-3, -4)",
            targetLatex: "x'",
            x: -3,
            y: -4,
            slots: [{ id: "xp", labelLatex: "x'", placeholder: t("sm1_03.placeholders.minus_x"), expected: -3, unit: "" }],
            correctLatex: "x' = -3",
          },
          {
            id: "Q_A4",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_translate,
            promptLatex: t("sm1_03.prompts.x_coord"),
            expressionLatex: "(2, 3) + (4, 0) = (6, 3)",
            targetLatex: "x'",
            x: 6,
            y: 3,
            slots: [{ id: "xp", labelLatex: "x'", placeholder: t("sm1_03.placeholders.x"), expected: 6, unit: "" }],
            correctLatex: "x' = 6",
          },
          {
            id: "Q_A5",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_midpoint_2d,
            promptLatex: t("sm1_03.prompts.x_coord"),
            expressionLatex: "\\frac{2 + 6}{2} = 4",
            targetLatex: "x_m",
            x: 4,
            y: 3,
            slots: [{ id: "xm", labelLatex: "x_m", placeholder: t("sm1_03.placeholders.x"), expected: 4, unit: "" }],
            correctLatex: "x_m = 4",
          },
        ],
        ELITE: [
          {
            id: "Q_E1",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_distance_vertical,
            promptLatex: t("sm1_03.prompts.dist"),
            expressionLatex: "|5 - (-3)| = 8",
            targetLatex: "d",
            x: 0,
            y: 5,
            slots: [{ id: "d", labelLatex: "d", placeholder: t("sm1_03.placeholders.x"), expected: 8, unit: "" }],
            correctLatex: "d = 8",
          },
          {
            id: "Q_E2",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_perimeter_rectangle,
            promptLatex: t("sm1_03.prompts.perimeter"),
            expressionLatex: "2(4 + 3) = 14",
            targetLatex: "P",
            x: 4,
            y: 3,
            slots: [{ id: "P", labelLatex: "P", placeholder: t("sm1_03.placeholders.xx"), expected: 14, unit: "" }],
            correctLatex: "P = 14",
          },
          {
            id: "Q_E3",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_area_rectangle,
            promptLatex: t("sm1_03.prompts.area"),
            expressionLatex: "4 \\times 3 = 12",
            targetLatex: "A",
            x: 4,
            y: 3,
            slots: [{ id: "A", labelLatex: "A", placeholder: t("sm1_03.placeholders.xx"), expected: 12, unit: "" }],
            correctLatex: "A = 12",
          },
          {
            id: "Q_E4",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_diagonal_distance,
            promptLatex: t("sm1_03.prompts.distance"),
            expressionLatex: "|6 - 2| = 4",
            targetLatex: "d_x",
            x: 6,
            y: 5,
            slots: [{ id: "dx", labelLatex: "d_x", placeholder: t("sm1_03.placeholders.x"), expected: 4, unit: "" }],
            correctLatex: "d_x = 4",
          },
          {
            id: "Q_E5",
            difficulty,
            stage,
            scenario: tObj.scenarios.quadrants,
            context: tObj.problems.q_complex_translation,
            promptLatex: t("sm1_03.prompts.x_coord"),
            expressionLatex: "2 + 3 - 1 = 4",
            targetLatex: "x'",
            x: 4,
            y: 5,
            slots: [{ id: "xp", labelLatex: "x'", placeholder: t("sm1_03.placeholders.x"), expected: 4, unit: "" }],
            correctLatex: "x' = 4",
          },
        ],
      },
    };

    return pools[stage][difficulty] || [];
  }, [t]);

  const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => buildStagePool(sm1_03_t, difficulty, stage), [sm1_03_t, buildStagePool]);

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
      chamberLayoutProps,
  } = useQuestManager<IntegerQuest, Stage>({
    moduleCode: "sm1-03",
    buildPool,
    initialStage: "NUMBER_LINE",
    tolerance: 0.01,
    feedbackContentProvider,
  });


  const stages = useMemo<{ id: Stage; label: string }[]>(() => [
    { id: "NUMBER_LINE", label: t("sm1_03.stages.number_line") },
    { id: "RATIONALS", label: t("sm1_03.stages.rationals") },
    { id: "QUADRANTS", label: t("sm1_03.stages.quadrants") },
  ], [t]);
  const difficultyLabelMap = useMemo<Record<Difficulty, string>>(() => ({
    BASIC: t("sm1_03.difficulty.basic"),
    CORE: t("sm1_03.difficulty.core"),
    ADVANCED: t("sm1_03.difficulty.advanced"),
    ELITE: t("sm1_03.difficulty.elite"),
  }), [t]);
  const printSections = useMemo(() => () => buildQuestPrintSections<IntegerQuest, Stage>({
    moduleTitle: t("sm1_03.title"),
    stages,
    difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
    difficultyLabels: difficultyLabelMap,
    buildPool,
    showHints: true,
    maxHints: 1,
  }), [buildPool, difficultyLabelMap, stages, t]);

  return (
    <ChamberLayout
      {...chamberLayoutProps}
      title={t("sm1_03.title")}
      moduleCode="SM1.03"
      stages={stages}
      printSectionsBuilder={printSections}
      translations={{
        back: t("sm1_03.back"),
        check: t("sm1_03.check"),
        next: t("sm1_03.next"),
        correct: t("sm1_03.correct"),
        incorrect: t("sm1_03.incorrect"),
        monitor_title: t("sm1_03.monitor_title"),
        difficulty: {
          basic: difficultyLabelMap.BASIC,
          core: difficultyLabelMap.CORE,
          advanced: difficultyLabelMap.ADVANCED,
          elite: difficultyLabelMap.ELITE,
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <IntegerCanvas
            stage={stage}
            quest={quest}
            translations={{
              integer_number_line: sm1_03_t.labels.integer_number_line,
              rational_number_line: sm1_03_t.labels.rational_number_line,
              coordinate_plane: sm1_03_t.labels.coordinate_plane,
              unit_celsius: sm1_03_t.labels.unit_celsius
            }}
          />
        </div>
      }
    >
      <div className="space-y-8">
        {quest?.scenario && (
          <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl">
            <div className="text-[10px] uppercase tracking-[0.4em] text-purple-400 font-black mb-3">
              {t("sm1_03.objective_title")}
            </div>
            <p className="text-white/90 leading-relaxed font-medium">{renderMixedText(quest.scenario)}</p>
          </div>
        )}

        {quest?.context && (
          <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
            <div className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-black mb-3">
              {t("sm1_03.scenario_title")}
            </div>
            <p className="text-white/80 leading-relaxed italic">{renderMixedText(quest.context)}</p>
          </div>
        )}

        <div className="text-center space-y-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t("sm1_03.calculate_title")}
          </div>
          <div className="text-3xl text-white font-black">
            {renderMixedText(quest?.promptLatex)}
          </div>
        </div>

        {quest?.expressionLatex && (
          <div className="text-center p-4 bg-white/5 border border-white/10 rounded-xl">
            <BlockMath math={quest.expressionLatex} />
          </div>
        )}

        <div className="max-w-md mx-auto space-y-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white font-black text-center">
            {t("sm1_03.answer_title")}
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
            <div className="text-green-400 font-black mb-2">{t("sm1_03.solution_title")}</div>
            <BlockMath math={quest.correctLatex} />
          </div>
        )}
      </div>
    </ChamberLayout>
  );
}
