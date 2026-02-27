"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { renderMixedText } from "@/lib/latex-utils";
import ChamberLayout from "@/components/layout/ChamberLayout";
import DataVisualization from "@/components/chamber/sm2-10/DataVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "BOX_PLOTS" | "SCATTER_PLOTS" | "CORRELATION" | "ELITE";

interface SM210Quest extends Quest {
    stage: Stage;
    dataType?: string;
}

export default function SM210Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SM210Quest[] => {
        const quests: SM210Quest[] = [];

        if (stage === "BOX_PLOTS") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "BP-B1", difficulty, stage, dataType: "median",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_b1"),
                        expressionLatex: `\\text{Median = middle value}`,
                        targetLatex: `\\text{${t("sm2_10.labels.median")}}`,
                        slots: [{ id: "median", labelLatex: `\\text{${t("sm2_10.labels.median")}}`, placeholder: "6", expected: 6 }],
                        correctLatex: `6`,
                        hintLatex: [`\\text{Middle of 5 values is 3rd value}`]
                    },
                    {
                        id: "BP-B2", difficulty, stage, dataType: "quartiles",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_b2"),
                        expressionLatex: `\\text{Q1 = median of lower half}`,
                        targetLatex: `Q_1`,
                        slots: [{ id: "q1", labelLatex: `Q_1`, placeholder: "3", expected: 3 }],
                        correctLatex: `Q_1 = 3`,
                        hintLatex: [`\\text{Lower half: } 1, 3`]
                    },
                    {
                        id: "BP-B3", difficulty, stage, dataType: "range",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_b3"),
                        expressionLatex: `\\text{Range} = \\text{Max} - \\text{Min}`,
                        targetLatex: `\\text{${t("sm2_10.labels.range")}}`,
                        slots: [{ id: "range", labelLatex: `\\text{${t("sm2_10.labels.range")}}`, placeholder: "20", expected: 20 }],
                        correctLatex: `20`,
                        hintLatex: [`30 - 10 = 20`]
                    },
                    {
                        id: "BP-B4", difficulty, stage, dataType: "iqr",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_b4"),
                        expressionLatex: `\\text{IQR} = Q_3 - Q_1`,
                        targetLatex: `\\text{IQR}`,
                        slots: [{ id: "iqr", labelLatex: `\\text{IQR}`, placeholder: "10", expected: 10 }],
                        correctLatex: `\\text{IQR} = 10`,
                        hintLatex: [`15 - 5 = 10`]
                    },
                    {
                        id: "BP-B5", difficulty, stage, dataType: "outlier",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_b5"),
                        expressionLatex: `\\text{Outlier = far from others}`,
                        targetLatex: `\\text{${t("sm2_10.labels.outlier")}}`,
                        slots: [{ id: "outlier", labelLatex: `\\text{${t("sm2_10.labels.outlier")}}`, placeholder: "20", expected: 20 }],
                        correctLatex: `20`,
                        hintLatex: [`\\text{20 is much larger than others}`]
                    }
                );
            } else if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "BP-C1", difficulty, stage, dataType: "q3",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_c1"),
                        expressionLatex: `Q_3 = \\text{median of upper half}`,
                        targetLatex: `Q_3`,
                        slots: [{ id: "q3", labelLatex: `Q_3`, placeholder: "12", expected: 12 }],
                        correctLatex: `Q_3 = 12`,
                        hintLatex: [`\\text{Upper half: } 10, 12, 14`]
                    },
                    {
                        id: "BP-C2", difficulty, stage, dataType: "iqr_calc",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_c2"),
                        expressionLatex: `\\text{IQR} = Q_3 - Q_1`,
                        targetLatex: `\\text{IQR}`,
                        slots: [{ id: "iqr", labelLatex: `\\text{IQR}`, placeholder: "20", expected: 20 }],
                        correctLatex: `\\text{IQR} = 20`,
                        hintLatex: [`Q_1 = 10, Q_3 = 30`]
                    },
                    {
                        id: "BP-C3", difficulty, stage, dataType: "mean",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_c3"),
                        expressionLatex: `\\text{Mean} = \\frac{\\text{sum}}{n}`,
                        targetLatex: `\\text{${t("sm2_10.labels.mean")}}`,
                        slots: [{ id: "mean", labelLatex: `\\text{${t("sm2_10.labels.mean")}}`, placeholder: "8", expected: 8 }],
                        correctLatex: `\\text{Mean} = 8`,
                        hintLatex: [`\\frac{4+6+8+10+12}{5} = 8`]
                    },
                    {
                        id: "BP-C4", difficulty, stage, dataType: "outlier_detect",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_c4"),
                        expressionLatex: `\\text{Outlier if far from Q1-Q3 range}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Outlier?}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\text{${t("sm2_10.answers.yes")}}`,
                        hintLatex: [`50 \\text{ is much larger than others}`]
                    },
                    {
                        id: "BP-C5", difficulty, stage, dataType: "box_parts",
                        promptLatex: t("sm2_10.prompts.b2_1_box_represents"),
                        expressionLatex: `\\text{Box = IQR (Q1 to Q3)}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Represents}`, placeholder: "IQR", expected: "IQR" }],
                        correctLatex: `\\text{IQR (middle 50\\%)}`,
                        hintLatex: [`\\text{Box shows Q1 to Q3}`]
                    }
                );
            } else if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "BP-A1", difficulty, stage, dataType: "outlier_rule",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_a1"),
                        expressionLatex: `\\text{Upper boundary} = Q_3 + 1.5 \\times \\text{IQR}`,
                        targetLatex: `\\text{${t("sm2_10.labels.boundary")}}`,
                        slots: [{ id: "boundary", labelLatex: `\\text{${t("sm2_10.labels.upper")}}`, placeholder: "35", expected: 35 }],
                        correctLatex: `35`,
                        hintLatex: [`20 + 1.5 \\times 10 = 35`]
                    },
                    {
                        id: "BP-A2", difficulty, stage, dataType: "lower_outlier",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_a2"),
                        expressionLatex: `\\text{Lower boundary} = Q_1 - 1.5 \\times \\text{IQR}`,
                        targetLatex: `\\text{${t("sm2_10.labels.boundary")}}`,
                        slots: [{ id: "boundary", labelLatex: `\\text{${t("sm2_10.labels.lower")}}`, placeholder: "3", expected: 3 }],
                        correctLatex: `3`,
                        hintLatex: [`15 - 1.5 \\times 8 = 3`]
                    },
                    {
                        id: "BP-A3", difficulty, stage, dataType: "skewness",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_a3"),
                        expressionLatex: `\\text{Median near Q1} = \\text{right skewed}`,
                        targetLatex: `\\text{Skew}`,
                        slots: [{ id: "skew", labelLatex: `\\text{${t("sm2_10.labels.direction")}}`, placeholder: "right", expected: "right" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.right_skewed")}}`,
                        hintLatex: [`\\text{Long tail on right}`]
                    },
                    {
                        id: "BP-A4", difficulty, stage, dataType: "compare_spread",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_a4"),
                        expressionLatex: `\\text{Larger IQR} = \\text{more spread}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{${t("sm2_10.labels.dataset")}}`, placeholder: "B", expected: "B" }],
                        correctLatex: `\\text{${t("sm2_10.answers.dataset_b")}}`,
                        hintLatex: [`\\text{Larger IQR means more variability}`]
                    },
                    {
                        id: "BP-A5", difficulty, stage, dataType: "percentile",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_a5"),
                        expressionLatex: `Q_1 = 25\\text{th percentile}`,
                        targetLatex: `\\text{${t("sm2_10.labels.percentile")}}`,
                        slots: [{ id: "pct", labelLatex: `\\text{${t("sm2_10.labels.percentile")}}`, placeholder: "25", expected: 25 }],
                        correctLatex: `25\\text{th}`,
                        hintLatex: [`Q_1 \\text{ is 25th percentile}`]
                    }
                );
            } else if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "BP-E1", difficulty, stage, dataType: "modified_box",
                        promptLatex: t("sm2_10.prompts.b2_1_modified_boxplot_useful"),
                        expressionLatex: `\\text{Shows extreme values clearly}`,
                        targetLatex: `\\text{${t("sm2_10.labels.reason")}}`,
                        slots: [{ id: "reason", labelLatex: `\\text{${t("sm2_10.labels.benefit")}}`, placeholder: "clarity", expected: "clarity" }],
                        correctLatex: `\\text{${t("sm2_10.answers.identifies_extreme_values")}}`,
                        hintLatex: [`\\text{Outliers shown as individual points}`]
                    },
                    {
                        id: "BP-E2", difficulty, stage, dataType: "compare_distributions",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_e2"),
                        expressionLatex: `\\text{IQR measures middle 50\\%, range measures all}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{More variable}`, placeholder: "depends", expected: "depends" }],
                        correctLatex: `\\text{${t("sm2_10.answers.depends_on_context")}}`,
                        hintLatex: [`\\text{IQR vs range measure different things}`]
                    },
                    {
                        id: "BP-E3", difficulty, stage, dataType: "resistant_measure",
                        promptLatex: t("sm2_10.prompts.b2_1_median_or_mean_resistant"),
                        expressionLatex: `\\text{Median not affected by extreme values}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{More resistant}`, placeholder: "median", expected: "median" }],
                        correctLatex: `\\text{${t("sm2_10.labels.median")}}`,
                        hintLatex: [`\\text{Median is position-based}`]
                    },
                    {
                        id: "BP-E4", difficulty, stage, dataType: "five_number",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_e4"),
                        expressionLatex: `\\text{Five numbers describe distribution}`,
                        targetLatex: `\\text{Fifth number}`,
                        slots: [{ id: "num", labelLatex: `\\text{Fifth}`, placeholder: "Max", expected: "Max" }],
                        correctLatex: `\\text{Maximum}`,
                        hintLatex: [`\\text{Min, Q1, Med, Q3, Max}`]
                    },
                    {
                        id: "BP-E5", difficulty, stage, dataType: "symmetric",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_e5"),
                        expressionLatex: `\\text{Symmetric distribution}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.distribution")}}`, placeholder: "symmetric", expected: "symmetric" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.symmetric")}}`,
                        hintLatex: [`\\text{Balanced on both sides}`]
                    }
                );
            }
        }

        if (stage === "SCATTER_PLOTS") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "SP-B1", difficulty, stage, dataType: "identify",
                        promptLatex: t("sm2_10.prompts.b2_1_points_up_correlation"),
                        expressionLatex: `\\text{Upward trend = positive}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: "positive", expected: "positive" }],
                        correctLatex: `\\text{${t("sm2_10.labels.positive")}}`,
                        hintLatex: [`\\text{Both variables increase}`]
                    },
                    {
                        id: "SP-B2", difficulty, stage, dataType: "downward",
                        promptLatex: t("sm2_10.prompts.b2_1_points_down_correlation"),
                        expressionLatex: `\\text{Downward trend = negative}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: "negative", expected: "negative" }],
                        correctLatex: `\\text{${t("sm2_10.labels.negative")}}`,
                        hintLatex: [`\\text{One up, one down}`]
                    },
                    {
                        id: "SP-B3", difficulty, stage, dataType: "scatter",
                        promptLatex: t("sm2_10.prompts.b2_1_points_random_correlation"),
                        expressionLatex: `\\text{No pattern = no correlation}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: "none", expected: "none" }],
                        correctLatex: `\\text{${t("sm2_10.answers.none")}}`,
                        hintLatex: [`\\text{No relationship}`]
                    },
                    {
                        id: "SP-B4", difficulty, stage, dataType: "axes",
                        promptLatex: t("sm2_10.prompts.b2_1_scatter_independent_axis"),
                        expressionLatex: `\\text{Independent on x-axis}`,
                        targetLatex: `\\text{${t("sm2_10.labels.axis")}}`,
                        slots: [{ id: "axis", labelLatex: `\\text{${t("sm2_10.labels.axis")}}`, placeholder: "x", expected: "x" }],
                        correctLatex: `\\text{x-axis}`,
                        hintLatex: [`\\text{x = independent, y = dependent}`]
                    },
                    {
                        id: "SP-B5", difficulty, stage, dataType: "point",
                        promptLatex: t("sm2_10.prompts.b2_1_each_point_represents"),
                        expressionLatex: `\\text{Point = one data pair}`,
                        targetLatex: `\\text{Represents}`,
                        slots: [{ id: "rep", labelLatex: `\\text{Represents}`, placeholder: "pair", expected: "pair" }],
                        correctLatex: `\\text{${t("sm2_10.answers.one_data_pair")}}`,
                        hintLatex: [`\\text{One observation with two values}`]
                    }
                );
            } else if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "SP-C1", difficulty, stage, dataType: "positive",
                        promptLatex: t("sm2_10.prompts.b2_1_study_scores_correlation"),
                        expressionLatex: `\\text{Both increase together}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: "positive", expected: "positive" }],
                        correctLatex: `\\text{${t("sm2_10.answers.positive_correlation")}}`,
                        hintLatex: [`\\text{Both go up = positive}`]
                    },
                    {
                        id: "SP-C2", difficulty, stage, dataType: "negative",
                        promptLatex: t("sm2_10.prompts.b2_1_temp_heating_correlation"),
                        expressionLatex: `\\text{One up, one down}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: "negative", expected: "negative" }],
                        correctLatex: `\\text{${t("sm2_10.answers.negative_correlation")}}`,
                        hintLatex: [`\\text{Opposite directions = negative}`]
                    },
                    {
                        id: "SP-C3", difficulty, stage, dataType: "none",
                        promptLatex: t("sm2_10.prompts.b2_1_shoe_math_no_pattern"),
                        expressionLatex: `\\text{No relationship}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: "none", expected: "none" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.no_correlation")}}`,
                        hintLatex: [`\\text{No pattern = no correlation}`]
                    },
                    {
                        id: "SP-C4", difficulty, stage, dataType: "strong",
                        promptLatex: t("sm2_10.prompts.b2_1_points_cluster_strength"),
                        expressionLatex: `\\text{Tight cluster = strong}`,
                        targetLatex: `\\text{${t("sm2_10.labels.strength")}}`,
                        slots: [{ id: "strength", labelLatex: `\\text{${t("sm2_10.labels.strength")}}`, placeholder: "strong", expected: "strong" }],
                        correctLatex: `\\text{${t("sm2_10.answers.strong_correlation")}}`,
                        hintLatex: [`\\text{Close to line = strong}`]
                    },
                    {
                        id: "SP-C5", difficulty, stage, dataType: "trend",
                        promptLatex: t("sm2_10.prompts.b2_1_best_fit_positive_slope"),
                        expressionLatex: `\\text{Positive slope = positive trend}`,
                        targetLatex: `\\text{Trend}`,
                        slots: [{ id: "trend", labelLatex: `\\text{Trend}`, placeholder: "positive", expected: "positive" }],
                        correctLatex: `\\text{${t("sm2_10.answers.positive_trend")}}`,
                        hintLatex: [`\\text{Upward slope = positive}`]
                    }
                );
            } else if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "SP-A1", difficulty, stage, dataType: "best_fit",
                        promptLatex: t("sm2_10.prompts.b2_1_best_fit_minimizes"),
                        expressionLatex: `\\text{Minimizes distance from points}`,
                        targetLatex: `\\text{Minimizes}`,
                        slots: [{ id: "min", labelLatex: `\\text{Minimizes}`, placeholder: "distance", expected: "distance" }],
                        correctLatex: `\\text{${t("sm2_10.answers.sum_of_squared_distances")}}`,
                        hintLatex: [`\\text{${t("sm2_10.formula_phrases.least_squares")}}`]
                    },
                    {
                        id: "SP-A2", difficulty, stage, dataType: "extrapolation",
                        promptLatex: t("sm2_10.prompts.b2_1_predict_beyond_range"),
                        expressionLatex: `\\text{Beyond range = extrapolation}`,
                        targetLatex: `\\text{${t("sm2_10.labels.term")}}`,
                        slots: [{ id: "term", labelLatex: `\\text{${t("sm2_10.labels.term")}}`, placeholder: "extrapolation", expected: "extrapolation" }],
                        correctLatex: `\\text{${t("sm2_10.labels.extrapolation")}}`,
                        hintLatex: [`\\text{Extra = beyond, polation = prediction}`]
                    },
                    {
                        id: "SP-A3", difficulty, stage, dataType: "interpolation",
                        promptLatex: t("sm2_10.prompts.b2_1_predict_within_range"),
                        expressionLatex: `\\text{Within range = interpolation}`,
                        targetLatex: `\\text{${t("sm2_10.labels.term")}}`,
                        slots: [{ id: "term", labelLatex: `\\text{${t("sm2_10.labels.term")}}`, placeholder: "interpolation", expected: "interpolation" }],
                        correctLatex: `\\text{${t("sm2_10.labels.interpolation")}}`,
                        hintLatex: [`\\text{Inter = between}`]
                    },
                    {
                        id: "SP-A4", difficulty, stage, dataType: "residual",
                        promptLatex: t("sm2_10.prompts.b2_1_actual_predicted_difference"),
                        expressionLatex: `\\text{Actual - Predicted = Residual}`,
                        targetLatex: `\\text{${t("sm2_10.labels.term")}}`,
                        slots: [{ id: "term", labelLatex: `\\text{${t("sm2_10.labels.term")}}`, placeholder: "residual", expected: "residual" }],
                        correctLatex: `\\text{${t("sm2_10.labels.residual")}}`,
                        hintLatex: [`\\text{Residual = leftover error}`]
                    },
                    {
                        id: "SP-A5", difficulty, stage, dataType: "weak_correlation",
                        promptLatex: t("sm2_10.prompts.b2_1_points_wide_scatter"),
                        expressionLatex: `\\text{Wide scatter = weak}`,
                        targetLatex: `\\text{${t("sm2_10.labels.strength")}}`,
                        slots: [{ id: "strength", labelLatex: `\\text{${t("sm2_10.labels.strength")}}`, placeholder: "weak", expected: "weak" }],
                        correctLatex: `\\text{${t("sm2_10.labels.weak")}}`,
                        hintLatex: [`\\text{Far from line = weak}`]
                    }
                );
            } else if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "SP-E1", difficulty, stage, dataType: "nonlinear",
                        promptLatex: t("sm2_10.prompts.b2_1_curve_not_line_relationship"),
                        expressionLatex: `\\text{Curved pattern = nonlinear}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: "nonlinear", expected: "nonlinear" }],
                        correctLatex: `\\text{${t("sm2_10.labels.nonlinear")}}`,
                        hintLatex: [`\\text{Not a straight line}`]
                    },
                    {
                        id: "SP-E2", difficulty, stage, dataType: "influential",
                        promptLatex: t("sm2_10.prompts.b2_1_far_point_affects_line"),
                        expressionLatex: `\\text{Influential point or outlier}`,
                        targetLatex: `\\text{${t("sm2_10.labels.term")}}`,
                        slots: [{ id: "term", labelLatex: `\\text{${t("sm2_10.labels.term")}}`, placeholder: "influential", expected: "influential" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.influential_point")}}`,
                        hintLatex: [`\\text{Has large influence on line}`]
                    },
                    {
                        id: "SP-E3", difficulty, stage, dataType: "lurking",
                        promptLatex: t("sm2_10.prompts.b2_1_hidden_variable_name"),
                        expressionLatex: `\\text{Hidden variable = lurking variable}`,
                        targetLatex: `\\text{${t("sm2_10.labels.term")}}`,
                        slots: [{ id: "term", labelLatex: `\\text{${t("sm2_10.labels.term")}}`, placeholder: "lurking", expected: "lurking" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.lurking_variable")}}`,
                        hintLatex: [`\\text{Lurking = hidden}`]
                    },
                    {
                        id: "SP-E4", difficulty, stage, dataType: "regression",
                        promptLatex: t("sm2_10.prompts.b2_1_process_best_fit"),
                        expressionLatex: `\\text{Finding best fit = regression}`,
                        targetLatex: `\\text{${t("sm2_10.labels.process")}}`,
                        slots: [{ id: "proc", labelLatex: `\\text{${t("sm2_10.labels.process")}}`, placeholder: "regression", expected: "regression" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.linear_regression")}}`,
                        hintLatex: [`\\text{Regression analysis}`]
                    },
                    {
                        id: "SP-E5", difficulty, stage, dataType: "r_squared",
                        promptLatex: t("sm2_10.prompts.b2_2_sp_e5"),
                        expressionLatex: `r^{2} \\times 100\\% = \\text{percent explained}`,
                        targetLatex: `\\text{${t("sm2_10.labels.percent")}}`,
                        slots: [{ id: "pct", labelLatex: `\\text{${t("sm2_10.labels.percent")}}`, placeholder: "81", expected: 81 }],
                        correctLatex: `81\\%`,
                        hintLatex: [`r^{2} = 0.81 = 81\\%`]
                    }
                );
            }
        }

        if (stage === "CORRELATION") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "C-B1", difficulty, stage, dataType: "definition",
                        promptLatex: t("sm2_10.prompts.b2_1_correlation_measures"),
                        expressionLatex: `\\text{Measures relationship strength}`,
                        targetLatex: `\\text{Measures}`,
                        slots: [{ id: "meas", labelLatex: `\\text{Measures}`, placeholder: "relationship", expected: "relationship" }],
                        correctLatex: `\\text{${t("sm2_10.answers.relationship_between_variables")}}`,
                        hintLatex: [`\\text{How variables relate}`]
                    },
                    {
                        id: "C-B2", difficulty, stage, dataType: "range",
                        promptLatex: t("sm2_10.prompts.b2_1_r_range"),
                        expressionLatex: `-1 \\leq r \\leq 1`,
                        targetLatex: `\\text{${t("sm2_10.labels.range")}}`,
                        slots: [{ id: "min", labelLatex: `\\text{${t("sm2_10.labels.min")}}`, placeholder: "-1", expected: -1 }, { id: "max", labelLatex: `\\text{${t("sm2_10.labels.max")}}`, placeholder: "1", expected: 1 }],
                        correctLatex: `-1 \\text{ to } 1`,
                        hintLatex: [`r \\text{ is between } -1 \\text{ and } 1`]
                    },
                    {
                        id: "C-B3", difficulty, stage, dataType: "perfect_positive",
                        promptLatex: t("sm2_10.prompts.b2_1_r_perfect_positive"),
                        expressionLatex: `r = 1 = \\text{perfect positive}`,
                        targetLatex: `r`,
                        slots: [{ id: "r", labelLatex: `r`, placeholder: "1", expected: 1 }],
                        correctLatex: `r = 1`,
                        hintLatex: [`\\text{Perfect positive} = 1`]
                    },
                    {
                        id: "C-B4", difficulty, stage, dataType: "perfect_negative",
                        promptLatex: t("sm2_10.prompts.b2_1_r_perfect_negative"),
                        expressionLatex: `r = -1 = \\text{perfect negative}`,
                        targetLatex: `r`,
                        slots: [{ id: "r", labelLatex: `r`, placeholder: "-1", expected: -1 }],
                        correctLatex: `r = -1`,
                        hintLatex: [`\\text{Perfect negative} = -1`]
                    },
                    {
                        id: "C-B5", difficulty, stage, dataType: "no_correlation",
                        promptLatex: t("sm2_10.prompts.b2_1_r_no_correlation"),
                        expressionLatex: `r = 0 = \\text{no correlation}`,
                        targetLatex: `r`,
                        slots: [{ id: "r", labelLatex: `r`, placeholder: "0", expected: 0 }],
                        correctLatex: `r = 0`,
                        hintLatex: [`\\text{No correlation} = 0`]
                    }
                );
            } else if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "C-C1", difficulty, stage, dataType: "interpret_r",
                        promptLatex: t("sm2_10.prompts.b2_2_c_c1"),
                        expressionLatex: `r > 0 = \\text{positive}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: "positive", expected: "positive" }],
                        correctLatex: `\\text{${t("sm2_10.labels.positive")}}`,
                        hintLatex: [`\\text{Positive r = positive correlation}`]
                    },
                    {
                        id: "C-C2", difficulty, stage, dataType: "strength",
                        promptLatex: t("sm2_10.prompts.b2_2_c_c2"),
                        expressionLatex: `|r| \\text{ near } 1 = \\text{strong}`,
                        targetLatex: `\\text{${t("sm2_10.labels.strength")}}`,
                        slots: [{ id: "strength", labelLatex: `\\text{${t("sm2_10.labels.strength")}}`, placeholder: "strong", expected: "strong" }],
                        correctLatex: `\\text{${t("sm2_10.labels.strong")}}`,
                        hintLatex: [`0.95 \\text{ is close to } 1`]
                    },
                    {
                        id: "C-C3", difficulty, stage, dataType: "weak",
                        promptLatex: t("sm2_10.prompts.b2_2_c_c3"),
                        expressionLatex: `|r| \\text{ near } 0 = \\text{weak}`,
                        targetLatex: `\\text{${t("sm2_10.labels.strength")}}`,
                        slots: [{ id: "strength", labelLatex: `\\text{${t("sm2_10.labels.strength")}}`, placeholder: "weak", expected: "weak" }],
                        correctLatex: `\\text{${t("sm2_10.labels.weak")}}`,
                        hintLatex: [`0.15 \\text{ is close to } 0`]
                    },
                    {
                        id: "C-C4", difficulty, stage, dataType: "negative_strong",
                        promptLatex: t("sm2_10.prompts.b2_2_c_c4"),
                        expressionLatex: `r < 0, |r| \\text{ near } 1`,
                        targetLatex: `\\text{Description}`,
                        slots: [{ id: "desc", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: "strong negative", expected: "strong negative" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.strong_negative")}}`,
                        hintLatex: [`\\text{Negative and close to } -1`]
                    },
                    {
                        id: "C-C5", difficulty, stage, dataType: "moderate",
                        promptLatex: t("sm2_10.prompts.b2_2_c_c5"),
                        expressionLatex: `0.3 < |r| < 0.7 = \\text{moderate}`,
                        targetLatex: `\\text{${t("sm2_10.labels.strength")}}`,
                        slots: [{ id: "strength", labelLatex: `\\text{${t("sm2_10.labels.strength")}}`, placeholder: "moderate", expected: "moderate" }],
                        correctLatex: `\\text{${t("sm2_10.labels.moderate")}}`,
                        hintLatex: [`\\text{Middle range}`]
                    }
                );
            } else if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "C-A1", difficulty, stage, dataType: "causation",
                        promptLatex: t("sm2_10.prompts.b2_1_icecream_drowning"),
                        expressionLatex: `\\text{Correlation} \\neq \\text{Causation}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Cause?}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{${t("sm2_10.answers.no_hot_weather_cause")}}`,
                        hintLatex: [`\\text{Correlation doesn't mean causation}`]
                    },
                    {
                        id: "C-A2", difficulty, stage, dataType: "coefficient",
                        promptLatex: t("sm2_10.prompts.b2_2_c_a2"),
                        expressionLatex: `r \\text{ close to } 1 = \\text{strong}`,
                        targetLatex: `\\text{${t("sm2_10.labels.strength")}}`,
                        slots: [{ id: "strength", labelLatex: `\\text{${t("sm2_10.labels.strength")}}`, placeholder: "strong", expected: "strong" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.strong_positive")}}`,
                        hintLatex: [`r \\text{ near } 1 = \\text{strong positive}`]
                    },
                    {
                        id: "C-A3", difficulty, stage, dataType: "negative_r",
                        promptLatex: t("sm2_10.prompts.b2_2_c_a3"),
                        expressionLatex: `r < 0 = \\text{negative}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: "negative", expected: "negative" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.strong_negative")}}`,
                        hintLatex: [`\\text{Negative } r = \\text{negative correlation}`]
                    },
                    {
                        id: "C-A4", difficulty, stage, dataType: "zero_r",
                        promptLatex: t("sm2_10.prompts.b2_2_c_a4"),
                        expressionLatex: `r \\approx 0 = \\text{no correlation}`,
                        targetLatex: `\\text{Meaning}`,
                        slots: [{ id: "meaning", labelLatex: `\\text{Meaning}`, placeholder: "none", expected: "none" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.no_correlation")}}`,
                        hintLatex: [`r \\text{ near } 0 = \\text{no correlation}`]
                    },
                    {
                        id: "C-A5", difficulty, stage, dataType: "prediction",
                        promptLatex: t("sm2_10.prompts.b2_1_strong_positive_predict"),
                        expressionLatex: `\\text{Strong correlation allows prediction}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Predict?}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\text{${t("sm2_10.answers.yes_with_some_error")}}`,
                        hintLatex: [`\\text{Strong correlation enables prediction}`]
                    }
                );
            } else if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "C-E1", difficulty, stage, dataType: "confounding",
                        promptLatex: t("sm2_10.prompts.b2_1_false_correlation_variable"),
                        expressionLatex: `\\text{${t("sm2_10.formula_phrases.confounding_variable")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.term")}}`,
                        slots: [{ id: "term", labelLatex: `\\text{${t("sm2_10.labels.term")}}`, placeholder: "confounding", expected: "confounding" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.confounding_variable")}}`,
                        hintLatex: [`\\text{Confounds = confuses the relationship}`]
                    },
                    {
                        id: "C-E2", difficulty, stage, dataType: "spurious",
                        promptLatex: t("sm2_10.prompts.b2_1_no_causal_relationship"),
                        expressionLatex: `\\text{${t("sm2_10.formula_phrases.spurious_correlation")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.term")}}`,
                        slots: [{ id: "term", labelLatex: `\\text{${t("sm2_10.labels.term")}}`, placeholder: "spurious", expected: "spurious" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.spurious_correlation")}}`,
                        hintLatex: [`\\text{Spurious = false/misleading}`]
                    },
                    {
                        id: "C-E3", difficulty, stage, dataType: "pearson",
                        promptLatex: t("sm2_10.prompts.b2_1_common_correlation_coefficient"),
                        expressionLatex: `\\text{Pearson's r}`,
                        targetLatex: `\\text{Name}`,
                        slots: [{ id: "name", labelLatex: `\\text{Name}`, placeholder: "Pearson", expected: "Pearson" }],
                        correctLatex: `\\text{${t("sm2_10.answers.pearson_correlation_coefficient")}}`,
                        hintLatex: [`\\text{Named after Karl Pearson}`]
                    },
                    {
                        id: "C-E4", difficulty, stage, dataType: "assumptions",
                        promptLatex: t("sm2_10.prompts.b2_1_pearson_assumes_relationship"),
                        expressionLatex: `\\text{Assumes linear relationship}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: "linear", expected: "linear" }],
                        correctLatex: `\\text{${t("sm2_10.labels.linear")}}`,
                        hintLatex: [`\\text{Straight line relationship}`]
                    },
                    {
                        id: "C-E5", difficulty, stage, dataType: "coefficient_determination",
                        promptLatex: t("sm2_10.prompts.b2_2_c_e5"),
                        expressionLatex: `r^{2} = \\text{coefficient of determination}`,
                        targetLatex: `\\text{Name}`,
                        slots: [{ id: "name", labelLatex: `\\text{Name}`, placeholder: "determination", expected: "determination" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.coefficient_of_determination")}}`,
                        hintLatex: [`\\text{Determines percent of variation explained}`]
                    }
                );
            }
        }

        if (stage === "ELITE") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "ELITE-B1", difficulty, stage, dataType: "rhine_temp_fish",
                        promptLatex: t("sm2_10.prompts.b2_2_elite_b1"),
                        expressionLatex: `z = \\frac{x - \\mu}{\\sigma}, \\text{ then use normal distribution}`,
                        targetLatex: `P(T > 24)`,
                        slots: [{ id: "prob", labelLatex: `P(T > 24)`, placeholder: "0.138", expected: 0.138 }],
                        correctLatex: `0.138 \\text{ or } 13.8\\%`,
                        hintLatex: [
                            `z = \\frac{24 - 21.5}{2.3} = 1.087`,
                            `P(z > 1.087) \\approx 0.138`,
                            `\\text{Strong negative correlation means higher temp reduces diversity}`
                        ]
                    },
                    {
                        id: "ELITE-B2", difficulty, stage, dataType: "park_biodiversity",
                        promptLatex: t("sm2_10.prompts.b2_2_elite_b2"),
                        expressionLatex: `\\text{SE}_{\\text{diff}} = \\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}, \\text{ CI: diff } \\pm 1.96(\\text{SE})`,
                        targetLatex: `\\text{Lower bound}`,
                        slots: [{ id: "lower", labelLatex: `\\text{${t("sm2_10.labels.lower")}}`, placeholder: "1.52", expected: 1.52 }],
                        correctLatex: `1.52 \\text{ species}`,
                        hintLatex: [
                            `\\text{Difference} = 32 - 28 = 4`,
                            `\\text{SE} = \\sqrt{\\frac{4.2^2}{20} + \\frac{3.8^2}{20}} = 1.267`,
                            `\\text{CI: } 4 \\pm 1.96(1.267) = (1.52, 6.48)`
                        ]
                    }
                );
            } else if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "ELITE-C1", difficulty, stage, dataType: "climate_trend",
                        promptLatex: t("sm2_10.prompts.b2_2_elite_c1"),
                        expressionLatex: `\\text{Temp increase} \\times \\text{days per degC} + \\text{baseline}`,
                        targetLatex: `\\text{Days in 2024}`,
                        slots: [{ id: "days", labelLatex: `\\text{${t("sm2_10.labels.days")}}`, placeholder: "179", expected: 179 }],
                        correctLatex: `179 \\text{ days}`,
                        hintLatex: [
                            `\\text{Temp increase} = 11.0 - 9.2 = 1.8deg\\text{C}`,
                            `\\text{Growing season increase} = 1.8 \\times 8 = 14.4 \\text{ days}`,
                            `2024: 165 + 14.4 = 179.4 \\approx 179 \\text{ days}`
                        ]
                    },
                    {
                        id: "ELITE-C2", difficulty, stage, dataType: "fox_population",
                        promptLatex: t("sm2_10.prompts.b2_2_elite_c2"),
                        expressionLatex: `P(X < 120) + P(X > 180)`,
                        targetLatex: `P(\\text{outside})`,
                        slots: [{ id: "prob", labelLatex: `P(\\text{out})`, placeholder: "0.096", expected: 0.096 }],
                        correctLatex: `0.096 \\text{ or } 9.6\\%`,
                        hintLatex: [
                            `z_1 = \\frac{120-150}{18} = -1.667, P(X<120) = 0.048`,
                            `z_2 = \\frac{180-150}{18} = 1.667, P(X>180) = 0.048`,
                            `P(\\text{outside}) = 0.048 + 0.048 = 0.096`
                        ]
                    }
                );
            } else if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "ELITE-A1", difficulty, stage, dataType: "dissolved_oxygen",
                        promptLatex: t("sm2_10.prompts.b2_2_elite_a1"),
                        expressionLatex: `\\text{SE} = \\frac{s}{\\sqrt{n}}, \\text{ 90\\% CI: } \\mu \\pm 1.645(\\text{SE})`,
                        targetLatex: `\\text{Lower bound}`,
                        slots: [{ id: "lower", labelLatex: `\\text{${t("sm2_10.labels.lower")}}`, placeholder: "9.34", expected: 9.34 }],
                        correctLatex: `9.34 \\text{ mg/L}`,
                        hintLatex: [
                            `\\text{SE} = \\frac{1.4}{\\sqrt{25}} = \\frac{1.4}{5} = 0.28`,
                            `\\text{90\\% CI: } 9.8 \\pm 1.645(0.28) = 9.8 \\pm 0.461`,
                            `\\text{Lower bound} = 9.34 > 8.0 \\text{ (safe for fish)}`
                        ]
                    }
                );
            }
        }

        return quests;
    }, []);

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(d, s), [buildStagePool]);

    const {
        currentQuest,
        difficulty,
        stage,
        lastCheck,
        inputs,
        setInputs,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
        adaptiveRecommendation,
        aiFeedback,
        isRequestingAi,
        requestAiFeedback
    } = useQuestManager<SM210Quest, Stage>({
        moduleCode: "sm2-10",
        buildPool,
        initialStage: "BOX_PLOTS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sm2-10", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "BOX_PLOTS" as Stage, label: t("sm2_10.stages.box_plots") },
        { id: "SCATTER_PLOTS" as Stage, label: t("sm2_10.stages.scatter_plots") },
        { id: "CORRELATION" as Stage, label: t("sm2_10.stages.correlation") },
        { id: "ELITE" as Stage, label: t("sm2_10.stages.elite") },
    ], [t]);

    if (!currentQuest) {
        return (
            <ChamberLayout
                adaptiveRecommendation={adaptiveRecommendation}
                aiFeedback={aiFeedback}
                isRequestingAi={isRequestingAi}
                onAiDiagnosisRequested={requestAiFeedback}
                title={t("sm2_10.title")}
                moduleCode="SM2.10"
                difficulty={difficulty}
                onDifficultyChange={handleDifficultyChange}
                stages={stagesProps}
                currentStage={stage}
                onStageChange={(s) => handleStageChange(s as Stage)}
                footerLeft={t("sm2_10.footer_left")}
                translations={{
                    back: t("sm2_10.back"),
                    check: t("sm2_10.check"),
                    next: t("sm2_10.next"),
                    correct: t("sm2_10.correct"),
                    incorrect: t("sm2_10.incorrect"),
                    difficulty: t("sm2_10.difficulty"),
                }}
                monitorContent={<DataVisualization quest={null} stage={stage} />}
            >
                <div className="text-center text-purple-400 text-xl">Module Complete!</div>
            </ChamberLayout>
        );
    }

    return (
        <ChamberLayout
            adaptiveRecommendation={adaptiveRecommendation}
            aiFeedback={aiFeedback}
            isRequestingAi={isRequestingAi}
            onAiDiagnosisRequested={requestAiFeedback}
            title={t("sm2_10.title")}
            moduleCode="SM2.10"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sm2_10.footer_left")}
            translations={{
                back: t("sm2_10.back"),
                check: t("sm2_10.check"),
                next: t("sm2_10.next"),
                correct: t("sm2_10.correct"),
                incorrect: t("sm2_10.incorrect"),
                difficulty: t("sm2_10.difficulty"),
            }}
            monitorContent={<DataVisualization quest={currentQuest} stage={stage} />}
        >
            <div className="space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/30">
                    <h3 className="text-purple-400 font-bold mb-2">{t("sm2_10.objective_title")}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {t(`sm2_10.scenarios.${stage.toLowerCase()}`)}
                    </p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
                    <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                        {renderMixedText(currentQuest?.promptLatex || "")}
                    </div>

                    <div className="text-purple-300">
                        <InlineMath math={currentQuest?.expressionLatex || ""} />
                    </div>

                    <div className="space-y-3">
                        {currentQuest?.slots.map((slot) => (
                            <div key={slot.id} className="flex items-center gap-3">
                                <InlineMath math={slot.labelLatex} />
                                <input
                                    type="text"
                                    value={inputs[slot.id] || ""}
                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                    placeholder={slot.placeholder}
                                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                                    disabled={lastCheck?.ok}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
