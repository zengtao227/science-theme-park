"use client";

import { useEffect, useCallback, useMemo } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { renderMixedText, KatexTextWrap } from "@/lib/latex-utils";
import ChamberLayout from "@/components/layout/ChamberLayout";
import DataVisualization from "@/components/chamber/sm2-10/DataVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "BOX_PLOTS" | "SCATTER_PLOTS" | "CORRELATION" | "ELITE";

interface SM210Quest extends Quest {
    stage: Stage;
    dataType?: string;
}

const PRINT_STAGE_ORDER: Stage[] = ["BOX_PLOTS", "SCATTER_PLOTS", "CORRELATION", "ELITE"];
const PRINT_DIFFICULTY_ORDER: Difficulty[] = ["BASIC", "CORE", "ADVANCED", "ELITE"];

function PrintableSM210Section({
    moduleTitle,
    stageLabel,
    groups,
}: {
    moduleTitle: string;
    stageLabel: string;
    groups: { difficultyLabel: string; quests: SM210Quest[] }[];
}) {
    return (
        <article className="text-black bg-white px-8 py-6 space-y-6">
            <header className="border-b-2 border-black pb-3">
                <h2 className="text-2xl font-black tracking-wide">{moduleTitle}</h2>
                <p className="text-sm font-semibold mt-1">{stageLabel}</p>
            </header>

            {groups.map((group) => (
                <section key={group.difficultyLabel} className="space-y-4">
                    <h3 className="text-lg font-black border-l-4 border-black pl-3">{group.difficultyLabel}</h3>
                    <div className="space-y-5">
                        {group.quests.map((quest, index) => (
                            <div key={quest.id} className="border border-black/30 p-4 space-y-3">
                                <div className="text-sm font-bold">
                                    {index + 1}. {renderMixedText(quest.promptLatex)}
                                </div>
                                <div className="text-black">
                                    <BlockMath math={quest.expressionLatex} />
                                </div>
                                <div className="space-y-2 pt-1">
                                    {quest.slots.map((slot) => (
                                        <div key={slot.id} className="space-y-1">
                                            <div className="text-sm">
                                                <InlineMath math={slot.labelLatex} />
                                            </div>
                                            <div className="h-7 border-b border-black" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </article>
    );
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
                        expressionLatex: `\\text{${t("sm2_10.expressions.median_middle_value")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.median")}}`,
                        slots: [{ id: "median", labelLatex: `\\text{${t("sm2_10.labels.median")}}`, placeholder: "6", expected: 6 }],
                        correctLatex: `6`,
                        hintLatex: [`\\text{${t("sm2_10.hints.middle_of_5_third")}}`]
                    },
                    {
                        id: "BP-B2", difficulty, stage, dataType: "quartiles",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_b2"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.q1_median_lower_half")}}`,
                        targetLatex: `Q_1`,
                        slots: [{ id: "q1", labelLatex: `Q_1`, placeholder: "3", expected: 3 }],
                        correctLatex: `Q_1 = 3`,
                        hintLatex: [`\\text{${t("sm2_10.hints.lower_half")}} 1, 3`]
                    },
                    {
                        id: "BP-B3", difficulty, stage, dataType: "range",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_b3"),
                        expressionLatex: `\\text{${t("sm2_10.labels.range")}} = \\text{${t("sm2_10.labels.max")}} - \\text{${t("sm2_10.labels.min")}}`,
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
                        expressionLatex: `\\text{${t("sm2_10.expressions.outlier_far_from_others")}}`,
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
                        expressionLatex: `Q_3 = \\text{${t("sm2_10.expressions.q3_median_upper_half")}}`,
                        targetLatex: `Q_3`,
                        slots: [{ id: "q3", labelLatex: `Q_3`, placeholder: "12", expected: 12 }],
                        correctLatex: `Q_3 = 12`,
                        hintLatex: [`\\text{${t("sm2_10.hints.upper_half")}} 10, 12, 14`]
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
                        expressionLatex: `\\text{${t("sm2_10.labels.mean")}} = \\frac{\\text{${t("sm2_10.expressions.sum")}}}{n}`,
                        targetLatex: `\\text{${t("sm2_10.labels.mean")}}`,
                        slots: [{ id: "mean", labelLatex: `\\text{${t("sm2_10.labels.mean")}}`, placeholder: "8", expected: 8 }],
                        correctLatex: t("sm2_10.labels.mean_equals_8"),
                        hintLatex: [`\\frac{4+6+8+10+12}{5} = 8`]
                    },
                    {
                        id: "BP-C4", difficulty, stage, dataType: "outlier_detect",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_c4"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.outlier_q1_q3_range")}}`,
                        targetLatex: t("sm2_10.labels.answer"),
                        slots: [{ id: "ans", labelLatex: `\\text{${t("sm2_10.labels.outlier")}?}`, placeholder: t("sm2_10.placeholders.yes"), expected: "yes" }],
                        correctLatex: `\\text{${t("sm2_10.answers.yes")}}`,
                        hintLatex: [`50 \\text{ is much larger than others}`]
                    },
                    {
                        id: "BP-C5", difficulty, stage, dataType: "box_parts",
                        promptLatex: t("sm2_10.prompts.b2_1_box_represents"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.box_iqr_q1_q3")}}`,
                        targetLatex: t("sm2_10.labels.answer"),
                        slots: [{ id: "ans", labelLatex: t("sm2_10.labels.represents"), placeholder: "IQR", expected: "IQR" }],
                        correctLatex: `\\text{IQR (middle 50\\%)}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.box_shows_q1_q3")}}`]
                    }
                );
            } else if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "BP-A1", difficulty, stage, dataType: "outlier_rule",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_a1"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.upper_boundary")}} = Q_3 + 1.5 \\times \\text{IQR}`,
                        targetLatex: `\\text{${t("sm2_10.labels.boundary")}}`,
                        slots: [{ id: "boundary", labelLatex: `\\text{${t("sm2_10.labels.upper")}}`, placeholder: "35", expected: 35 }],
                        correctLatex: `35`,
                        hintLatex: [`20 + 1.5 \\times 10 = 35`]
                    },
                    {
                        id: "BP-A2", difficulty, stage, dataType: "lower_outlier",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_a2"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.lower_boundary")}} = Q_1 - 1.5 \\times \\text{IQR}`,
                        targetLatex: `\\text{${t("sm2_10.labels.boundary")}}`,
                        slots: [{ id: "boundary", labelLatex: `\\text{${t("sm2_10.labels.lower")}}`, placeholder: "3", expected: 3 }],
                        correctLatex: `3`,
                        hintLatex: [`15 - 1.5 \\times 8 = 3`]
                    },
                    {
                        id: "BP-A3", difficulty, stage, dataType: "skewness",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_a3"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.median_near_q1")}} = \\text{${t("sm2_10.formula_phrases.right_skewed")}}`,
                        targetLatex: t("sm2_10.labels.skew"),
                        slots: [{ id: "skew", labelLatex: `\\text{${t("sm2_10.labels.direction")}}`, placeholder: t("sm2_10.placeholders.right"), expected: "right" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.right_skewed")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.long_tail_right")}}`]
                    },
                    {
                        id: "BP-A4", difficulty, stage, dataType: "compare_spread",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_a4"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.larger_iqr")}} = \\text{${t("sm2_10.expressions.more_spread")}}`,
                        targetLatex: t("sm2_10.labels.answer"),
                        slots: [{ id: "ans", labelLatex: `\\text{${t("sm2_10.labels.dataset")}}`, placeholder: "B", expected: "B" }],
                        correctLatex: `\\text{${t("sm2_10.answers.dataset_b")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.larger_iqr_more_variability")}}`]
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
                        expressionLatex: `\\text{${t("sm2_10.expressions.shows_extreme_values_clearly")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.reason")}}`,
                        slots: [{ id: "reason", labelLatex: `\\text{${t("sm2_10.labels.benefit")}}`, placeholder: "clarity", expected: "clarity" }],
                        correctLatex: `\\text{${t("sm2_10.answers.identifies_extreme_values")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.outliers_individual_points")}}`]
                    },
                    {
                        id: "BP-E2", difficulty, stage, dataType: "compare_distributions",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_e2"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.iqr_middle_50_range_all")}}`,
                        targetLatex: t("sm2_10.labels.answer"),
                        slots: [{ id: "ans", labelLatex: t("sm2_10.labels.more_variable"), placeholder: "depends", expected: "depends" }],
                        correctLatex: `\\text{${t("sm2_10.answers.depends_on_context")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.iqr_vs_range_different")}}`]
                    },
                    {
                        id: "BP-E3", difficulty, stage, dataType: "resistant_measure",
                        promptLatex: t("sm2_10.prompts.b2_1_median_or_mean_resistant"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.median_not_affected_by_extremes")}}`,
                        targetLatex: t("sm2_10.labels.answer"),
                        slots: [{ id: "ans", labelLatex: t("sm2_10.labels.more_resistant"), placeholder: "median", expected: "median" }],
                        correctLatex: `\\text{${t("sm2_10.labels.median")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.median_position_based")}}`]
                    },
                    {
                        id: "BP-E4", difficulty, stage, dataType: "five_number",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_e4"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.five_numbers_describe_distribution")}}`,
                        targetLatex: t("sm2_10.labels.fifth_number"),
                        slots: [{ id: "num", labelLatex: t("sm2_10.labels.fifth"), placeholder: "Max", expected: "Max" }],
                        correctLatex: t("sm2_10.labels.maximum"),
                        hintLatex: [t("sm2_10.labels.five_number_summary")]
                    },
                    {
                        id: "BP-E5", difficulty, stage, dataType: "symmetric",
                        promptLatex: t("sm2_10.prompts.b2_2_bp_e5"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.symmetric_distribution")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.distribution")}}`, placeholder: "symmetric", expected: "symmetric" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.symmetric")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.balanced_both_sides")}}`]
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
                        expressionLatex: `\\text{${t("sm2_10.expressions.upward_trend")}} = \\text{${t("sm2_10.labels.positive")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: t("sm2_10.placeholders.positive"), expected: "positive" }],
                        correctLatex: `\\text{${t("sm2_10.labels.positive")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.both_variables_increase")}}`]
                    },
                    {
                        id: "SP-B2", difficulty, stage, dataType: "downward",
                        promptLatex: t("sm2_10.prompts.b2_1_points_down_correlation"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.downward_trend")}} = \\text{${t("sm2_10.labels.negative")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: t("sm2_10.placeholders.negative"), expected: "negative" }],
                        correctLatex: `\\text{${t("sm2_10.labels.negative")}}`,
                        hintLatex: [`\\text{${t("sm2_10.expressions.one_up_one_down")}}`]
                    },
                    {
                        id: "SP-B3", difficulty, stage, dataType: "scatter",
                        promptLatex: t("sm2_10.prompts.b2_1_points_random_correlation"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.no_pattern")}} = \\text{${t("sm2_10.formula_phrases.no_correlation")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: "none", expected: "none" }],
                        correctLatex: `\\text{${t("sm2_10.answers.none")}}`,
                        hintLatex: [`\\text{${t("sm2_10.expressions.no_relationship")}}`]
                    },
                    {
                        id: "SP-B4", difficulty, stage, dataType: "axes",
                        promptLatex: t("sm2_10.prompts.b2_1_scatter_independent_axis"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.independent_on_x_axis")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.axis")}}`,
                        slots: [{ id: "axis", labelLatex: `\\text{${t("sm2_10.labels.axis")}}`, placeholder: "x", expected: "x" }],
                        correctLatex: `\\text{x-axis}`,
                        hintLatex: [`\\text{x = independent, y = dependent}`]
                    },
                    {
                        id: "SP-B5", difficulty, stage, dataType: "point",
                        promptLatex: t("sm2_10.prompts.b2_1_each_point_represents"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.point_one_data_pair")}}`,
                        targetLatex: t("sm2_10.labels.represents"),
                        slots: [{ id: "rep", labelLatex: t("sm2_10.labels.represents"), placeholder: "pair", expected: "pair" }],
                        correctLatex: `\\text{${t("sm2_10.answers.one_data_pair")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.one_observation_two_values")}}`]
                    }
                );
            } else if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "SP-C1", difficulty, stage, dataType: "positive",
                        promptLatex: t("sm2_10.prompts.b2_1_study_scores_correlation"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.both_increase_together")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: t("sm2_10.placeholders.positive"), expected: "positive" }],
                        correctLatex: `\\text{${t("sm2_10.answers.positive_correlation")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.both_up_positive")}}`]
                    },
                    {
                        id: "SP-C2", difficulty, stage, dataType: "negative",
                        promptLatex: t("sm2_10.prompts.b2_1_temp_heating_correlation"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.one_up_one_down")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: t("sm2_10.placeholders.negative"), expected: "negative" }],
                        correctLatex: `\\text{${t("sm2_10.answers.negative_correlation")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.opposite_directions_negative")}}`]
                    },
                    {
                        id: "SP-C3", difficulty, stage, dataType: "none",
                        promptLatex: t("sm2_10.prompts.b2_1_shoe_math_no_pattern"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.no_relationship")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: "none", expected: "none" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.no_correlation")}}`,
                        hintLatex: [`\\text{${t("sm2_10.expressions.no_pattern")}} = \\text{${t("sm2_10.formula_phrases.no_correlation")}}`]
                    },
                    {
                        id: "SP-C4", difficulty, stage, dataType: "strong",
                        promptLatex: t("sm2_10.prompts.b2_1_points_cluster_strength"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.tight_cluster")}} = \\text{${t("sm2_10.labels.strong")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.strength")}}`,
                        slots: [{ id: "strength", labelLatex: `\\text{${t("sm2_10.labels.strength")}}`, placeholder: "strong", expected: "strong" }],
                        correctLatex: `\\text{${t("sm2_10.answers.strong_correlation")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.close_to_line_strong")}}`]
                    },
                    {
                        id: "SP-C5", difficulty, stage, dataType: "trend",
                        promptLatex: t("sm2_10.prompts.b2_1_best_fit_positive_slope"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.positive_slope")}} = \\text{${t("sm2_10.answers.positive_trend")}}`,
                        targetLatex: t("sm2_10.labels.trend"),
                        slots: [{ id: "trend", labelLatex: t("sm2_10.labels.trend"), placeholder: t("sm2_10.placeholders.positive"), expected: "positive" }],
                        correctLatex: `\\text{${t("sm2_10.answers.positive_trend")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.upward_slope_positive")}}`]
                    }
                );
            } else if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "SP-A1", difficulty, stage, dataType: "best_fit",
                        promptLatex: t("sm2_10.prompts.b2_1_best_fit_minimizes"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.minimizes_distance_from_points")}}`,
                        targetLatex: t("sm2_10.labels.minimizes"),
                        slots: [{ id: "min", labelLatex: t("sm2_10.labels.minimizes"), placeholder: t("sm2_10.placeholders.distance"), expected: "distance" }],
                        correctLatex: `\\text{${t("sm2_10.answers.sum_of_squared_distances")}}`,
                        hintLatex: [`\\text{${t("sm2_10.formula_phrases.least_squares")}}`]
                    },
                    {
                        id: "SP-A2", difficulty, stage, dataType: "extrapolation",
                        promptLatex: t("sm2_10.prompts.b2_1_predict_beyond_range"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.beyond_range")}} = \\text{${t("sm2_10.labels.extrapolation")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.term")}}`,
                        slots: [{ id: "term", labelLatex: `\\text{${t("sm2_10.labels.term")}}`, placeholder: "extrapolation", expected: "extrapolation" }],
                        correctLatex: `\\text{${t("sm2_10.labels.extrapolation")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.extra_beyond_polation_prediction")}}`]
                    },
                    {
                        id: "SP-A3", difficulty, stage, dataType: "interpolation",
                        promptLatex: t("sm2_10.prompts.b2_1_predict_within_range"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.within_range")}} = \\text{${t("sm2_10.labels.interpolation")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.term")}}`,
                        slots: [{ id: "term", labelLatex: `\\text{${t("sm2_10.labels.term")}}`, placeholder: "interpolation", expected: "interpolation" }],
                        correctLatex: `\\text{${t("sm2_10.labels.interpolation")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.inter_between")}}`]
                    },
                    {
                        id: "SP-A4", difficulty, stage, dataType: "residual",
                        promptLatex: t("sm2_10.prompts.b2_1_actual_predicted_difference"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.actual_minus_predicted")}} = \\text{${t("sm2_10.labels.residual")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.term")}}`,
                        slots: [{ id: "term", labelLatex: `\\text{${t("sm2_10.labels.term")}}`, placeholder: "residual", expected: "residual" }],
                        correctLatex: `\\text{${t("sm2_10.labels.residual")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.residual_leftover_error")}}`]
                    },
                    {
                        id: "SP-A5", difficulty, stage, dataType: "weak_correlation",
                        promptLatex: t("sm2_10.prompts.b2_1_points_wide_scatter"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.wide_scatter")}} = \\text{${t("sm2_10.labels.weak")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.strength")}}`,
                        slots: [{ id: "strength", labelLatex: `\\text{${t("sm2_10.labels.strength")}}`, placeholder: "weak", expected: "weak" }],
                        correctLatex: `\\text{${t("sm2_10.labels.weak")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.far_from_line_weak")}}`]
                    }
                );
            } else if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "SP-E1", difficulty, stage, dataType: "nonlinear",
                        promptLatex: t("sm2_10.prompts.b2_1_curve_not_line_relationship"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.curved_pattern")}} = \\text{${t("sm2_10.labels.nonlinear")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: t("sm2_10.placeholders.nonlinear"), expected: "nonlinear" }],
                        correctLatex: `\\text{${t("sm2_10.labels.nonlinear")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.not_straight_line")}}`]
                    },
                    {
                        id: "SP-E2", difficulty, stage, dataType: "influential",
                        promptLatex: t("sm2_10.prompts.b2_1_far_point_affects_line"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.influential_point_or_outlier")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.term")}}`,
                        slots: [{ id: "term", labelLatex: `\\text{${t("sm2_10.labels.term")}}`, placeholder: "influential", expected: "influential" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.influential_point")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.large_influence_on_line")}}`]
                    },
                    {
                        id: "SP-E3", difficulty, stage, dataType: "lurking",
                        promptLatex: t("sm2_10.prompts.b2_1_hidden_variable_name"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.hidden_variable")}} = \\text{${t("sm2_10.formula_phrases.lurking_variable")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.term")}}`,
                        slots: [{ id: "term", labelLatex: `\\text{${t("sm2_10.labels.term")}}`, placeholder: "lurking", expected: "lurking" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.lurking_variable")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.lurking_hidden")}}`]
                    },
                    {
                        id: "SP-E4", difficulty, stage, dataType: "regression",
                        promptLatex: t("sm2_10.prompts.b2_1_process_best_fit"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.finding_best_fit")}} = \\text{${t("sm2_10.labels.regression")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.process")}}`,
                        slots: [{ id: "proc", labelLatex: `\\text{${t("sm2_10.labels.process")}}`, placeholder: "regression", expected: "regression" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.linear_regression")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.regression_analysis")}}`]
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
                        expressionLatex: `\\text{${t("sm2_10.expressions.measures_relationship_strength")}}`,
                        targetLatex: t("sm2_10.labels.measures"),
                        slots: [{ id: "meas", labelLatex: t("sm2_10.labels.measures"), placeholder: "relationship", expected: "relationship" }],
                        correctLatex: `\\text{${t("sm2_10.answers.relationship_between_variables")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.how_variables_relate")}}`]
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
                        hintLatex: [`\\text{${t("sm2_10.hints.perfect_positive")}} = 1`]
                    },
                    {
                        id: "C-B4", difficulty, stage, dataType: "perfect_negative",
                        promptLatex: t("sm2_10.prompts.b2_1_r_perfect_negative"),
                        expressionLatex: `r = -1 = \\text{${t("sm2_10.formula_phrases.perfect_negative")}}`,
                        targetLatex: `r`,
                        slots: [{ id: "r", labelLatex: `r`, placeholder: "-1", expected: -1 }],
                        correctLatex: `r = -1`,
                        hintLatex: [`\\text{${t("sm2_10.hints.perfect_negative")}} = -1`]
                    },
                    {
                        id: "C-B5", difficulty, stage, dataType: "no_correlation",
                        promptLatex: t("sm2_10.prompts.b2_1_r_no_correlation"),
                        expressionLatex: `r = 0 = \\text{${t("sm2_10.formula_phrases.no_correlation")}}`,
                        targetLatex: `r`,
                        slots: [{ id: "r", labelLatex: `r`, placeholder: "0", expected: 0 }],
                        correctLatex: `r = 0`,
                        hintLatex: [`\\text{${t("sm2_10.hints.no_correlation")}} = 0`]
                    }
                );
            } else if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "C-C1", difficulty, stage, dataType: "interpret_r",
                        promptLatex: t("sm2_10.prompts.b2_2_c_c1"),
                        expressionLatex: `r > 0 = \\text{${t("sm2_10.labels.positive")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: t("sm2_10.placeholders.positive"), expected: "positive" }],
                        correctLatex: `\\text{${t("sm2_10.labels.positive")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.positive_r_positive_correlation")}}`]
                    },
                    {
                        id: "C-C2", difficulty, stage, dataType: "strength",
                        promptLatex: t("sm2_10.prompts.b2_2_c_c2"),
                        expressionLatex: `|r| \\text{ ${t("sm2_10.expressions.near")} } 1 = \\text{${t("sm2_10.labels.strong")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.strength")}}`,
                        slots: [{ id: "strength", labelLatex: `\\text{${t("sm2_10.labels.strength")}}`, placeholder: "strong", expected: "strong" }],
                        correctLatex: `\\text{${t("sm2_10.labels.strong")}}`,
                        hintLatex: [`0.95 \\text{ ${t("sm2_10.expressions.close_to")} } 1`]
                    },
                    {
                        id: "C-C3", difficulty, stage, dataType: "weak",
                        promptLatex: t("sm2_10.prompts.b2_2_c_c3"),
                        expressionLatex: `|r| \\text{ ${t("sm2_10.expressions.near")} } 0 = \\text{${t("sm2_10.labels.weak")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.strength")}}`,
                        slots: [{ id: "strength", labelLatex: `\\text{${t("sm2_10.labels.strength")}}`, placeholder: "weak", expected: "weak" }],
                        correctLatex: `\\text{${t("sm2_10.labels.weak")}}`,
                        hintLatex: [`0.15 \\text{ ${t("sm2_10.expressions.close_to")} } 0`]
                    },
                    {
                        id: "C-C4", difficulty, stage, dataType: "negative_strong",
                        promptLatex: t("sm2_10.prompts.b2_2_c_c4"),
                        expressionLatex: `r < 0, \\ |r| \\text{ ${t("sm2_10.expressions.near")} } 1`,
                        targetLatex: t("sm2_10.labels.description"),
                        slots: [{ id: "desc", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: "strong negative", expected: "strong negative" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.strong_negative")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.negative_and_close_to")} } -1`]
                    },
                    {
                        id: "C-C5", difficulty, stage, dataType: "moderate",
                        promptLatex: t("sm2_10.prompts.b2_2_c_c5"),
                        expressionLatex: `0.3 < |r| < 0.7 = \\text{${t("sm2_10.labels.moderate")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.strength")}}`,
                        slots: [{ id: "strength", labelLatex: `\\text{${t("sm2_10.labels.strength")}}`, placeholder: "moderate", expected: "moderate" }],
                        correctLatex: `\\text{${t("sm2_10.labels.moderate")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.middle_range")}}`]
                    }
                );
            } else if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "C-A1", difficulty, stage, dataType: "causation",
                        promptLatex: t("sm2_10.prompts.b2_1_icecream_drowning"),
                        expressionLatex: `\\text{${t("sm2_10.labels.correlation")}} \\neq \\text{${t("sm2_10.labels.causation")}}`,
                        targetLatex: t("sm2_10.labels.answer"),
                        slots: [{ id: "ans", labelLatex: t("sm2_10.labels.cause_q"), placeholder: t("sm2_10.placeholders.no"), expected: "no" }],
                        correctLatex: `\\text{${t("sm2_10.answers.no_hot_weather_cause")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.correlation_not_causation")}}`]
                    },
                    {
                        id: "C-A2", difficulty, stage, dataType: "coefficient",
                        promptLatex: t("sm2_10.prompts.b2_2_c_a2"),
                        expressionLatex: `r \\text{ ${t("sm2_10.expressions.close_to")} } 1 = \\text{${t("sm2_10.labels.strong")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.strength")}}`,
                        slots: [{ id: "strength", labelLatex: `\\text{${t("sm2_10.labels.strength")}}`, placeholder: "strong", expected: "strong" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.strong_positive")}}`,
                        hintLatex: [`r \\text{ ${t("sm2_10.expressions.near")} } 1 = \\text{${t("sm2_10.formula_phrases.strong_positive")}}`]
                    },
                    {
                        id: "C-A3", difficulty, stage, dataType: "negative_r",
                        promptLatex: t("sm2_10.prompts.b2_2_c_a3"),
                        expressionLatex: `r < 0 = \\text{${t("sm2_10.labels.negative")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: t("sm2_10.placeholders.negative"), expected: "negative" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.strong_negative")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.opposite_directions_negative")}}`]
                    },
                    {
                        id: "C-A4", difficulty, stage, dataType: "zero_r",
                        promptLatex: t("sm2_10.prompts.b2_2_c_a4"),
                        expressionLatex: `r \\approx 0 = \\text{${t("sm2_10.formula_phrases.no_correlation")}}`,
                        targetLatex: t("sm2_10.labels.meaning"),
                        slots: [{ id: "meaning", labelLatex: t("sm2_10.labels.meaning"), placeholder: "none", expected: "none" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.no_correlation")}}`,
                        hintLatex: [`r \\text{ ${t("sm2_10.expressions.near")} } 0 = \\text{${t("sm2_10.formula_phrases.no_correlation")}}`]
                    },
                    {
                        id: "C-A5", difficulty, stage, dataType: "prediction",
                        promptLatex: t("sm2_10.prompts.b2_1_strong_positive_predict"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.strong_correlation_allows_prediction")}}`,
                        targetLatex: t("sm2_10.labels.answer"),
                        slots: [{ id: "ans", labelLatex: t("sm2_10.labels.predict_q"), placeholder: t("sm2_10.placeholders.yes"), expected: "yes" }],
                        correctLatex: `\\text{${t("sm2_10.answers.yes_with_some_error")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.strong_correlation_enables_prediction")}}`]
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
                        hintLatex: [`\\text{${t("sm2_10.hints.confounds_confuses_relationship")}}`]
                    },
                    {
                        id: "C-E2", difficulty, stage, dataType: "spurious",
                        promptLatex: t("sm2_10.prompts.b2_1_no_causal_relationship"),
                        expressionLatex: `\\text{${t("sm2_10.formula_phrases.spurious_correlation")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.term")}}`,
                        slots: [{ id: "term", labelLatex: `\\text{${t("sm2_10.labels.term")}}`, placeholder: "spurious", expected: "spurious" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.spurious_correlation")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.spurious_false_misleading")}}`]
                    },
                    {
                        id: "C-E3", difficulty, stage, dataType: "pearson",
                        promptLatex: t("sm2_10.prompts.b2_1_common_correlation_coefficient"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.pearsons_r")}}`,
                        targetLatex: t("sm2_10.labels.name"),
                        slots: [{ id: "name", labelLatex: t("sm2_10.labels.name"), placeholder: "Pearson", expected: "Pearson" }],
                        correctLatex: `\\text{${t("sm2_10.answers.pearson_correlation_coefficient")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.named_after_karl_pearson")}}`]
                    },
                    {
                        id: "C-E4", difficulty, stage, dataType: "assumptions",
                        promptLatex: t("sm2_10.prompts.b2_1_pearson_assumes_relationship"),
                        expressionLatex: `\\text{${t("sm2_10.expressions.assumes_linear_relationship")}}`,
                        targetLatex: `\\text{${t("sm2_10.labels.type")}}`,
                        slots: [{ id: "type", labelLatex: `\\text{${t("sm2_10.labels.type")}}`, placeholder: "linear", expected: "linear" }],
                        correctLatex: `\\text{${t("sm2_10.labels.linear")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.straight_line_relationship")}}`]
                    },
                    {
                        id: "C-E5", difficulty, stage, dataType: "coefficient_determination",
                        promptLatex: t("sm2_10.prompts.b2_2_c_e5"),
                        expressionLatex: `r^{2} = \\text{${t("sm2_10.formula_phrases.coefficient_of_determination")}}`,
                        targetLatex: t("sm2_10.labels.name"),
                        slots: [{ id: "name", labelLatex: t("sm2_10.labels.name"), placeholder: "determination", expected: "determination" }],
                        correctLatex: `\\text{${t("sm2_10.formula_phrases.coefficient_of_determination")}}`,
                        hintLatex: [`\\text{${t("sm2_10.hints.determines_percent_variation_explained")}}`]
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
                        expressionLatex: `z = \\frac{x - \\mu}{\\sigma}, \\text{${t("sm2_10.expressions.then_use_normal_distribution")}}`,
                        targetLatex: `P(T > 24)`,
                        slots: [{ id: "prob", labelLatex: `P(T > 24)`, placeholder: "0.138", expected: 0.138 }],
                        correctLatex: `0.138 \\text{ or } 13.8\\%`,
                        hintLatex: [
                            `z = \\frac{24 - 21.5}{2.3} = 1.087`,
                            `P(z > 1.087) \\approx 0.138`,
                            `\\text{${t("sm2_10.hints.strong_negative_temp_reduces_diversity")}}`
                        ]
                    },
                    {
                        id: "ELITE-B2", difficulty, stage, dataType: "park_biodiversity",
                        promptLatex: t("sm2_10.prompts.b2_2_elite_b2"),
                        expressionLatex: `\\text{${t("sm2_10.labels.se")}}_{\\text{diff}} = \\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}, \\text{ ${t("sm2_10.expressions.ci_diff")} } \\pm 1.96(\\text{${t("sm2_10.labels.se")}})`,
                        targetLatex: t("sm2_10.labels.lower_bound"),
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
                        expressionLatex: `\\text{${t("sm2_10.expressions.temp_increase")}} \\times \\text{${t("sm2_10.expressions.days_per_deg_c")}} + \\text{${t("sm2_10.expressions.baseline")}}`,
                        targetLatex: t("sm2_10.labels.days_in_2024"),
                        slots: [{ id: "days", labelLatex: `\\text{${t("sm2_10.labels.days")}}`, placeholder: "179", expected: 179 }],
                        correctLatex: `179 \\text{ days}`,
                        hintLatex: [
                            `\\text{${t("sm2_10.expressions.temp_increase")}} = 11.0 - 9.2 = 1.8^\\circ\\text{C}`,
                            `\\text{${t("sm2_10.expressions.growing_season_increase")}} = 1.8 \\times 8 = 14.4 \\text{ days}`,
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
                        expressionLatex: `\\text{${t("sm2_10.labels.se")}} = \\frac{s}{\\sqrt{n}}, \\text{ ${t("sm2_10.expressions.ci_90")} } \\mu \\pm 1.645(\\text{${t("sm2_10.labels.se")}})`,
                        targetLatex: t("sm2_10.labels.lower_bound"),
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
    }, [t]);

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

    const printSections = useMemo(() => {
        const stageLabels: Record<Stage, string> = {
            BOX_PLOTS: t("sm2_10.stages.box_plots"),
            SCATTER_PLOTS: t("sm2_10.stages.scatter_plots"),
            CORRELATION: t("sm2_10.stages.correlation"),
            ELITE: t("sm2_10.stages.elite"),
        };

        return PRINT_STAGE_ORDER.map((stageId) => {
            const groups = PRINT_DIFFICULTY_ORDER
                .map((diff) => {
                    const key = diff.toLowerCase();
                    return {
                        difficultyLabel: t(`sm2_10.difficulty.${key}`),
                        quests: buildStagePool(diff, stageId),
                    };
                })
                .filter((group) => group.quests.length > 0);

            return {
                id: stageId,
                label: stageLabels[stageId],
                content: (
                    <PrintableSM210Section
                        moduleTitle={t("sm2_10.title")}
                        stageLabel={stageLabels[stageId]}
                        groups={groups}
                    />
                ),
            };
        });
    }, [buildStagePool, t]);

    if (!currentQuest) {
        return (
            <ChamberLayout
                adaptiveRecommendation={adaptiveRecommendation}
                aiFeedback={aiFeedback}
                isRequestingAi={isRequestingAi}
                onAiDiagnosisRequested={requestAiFeedback}
                title={t("sm2_10.title")}
                moduleCode="SM2.10"
                defaultLeftWidth={62}
                minLeftWidth={35}
                maxLeftWidth={85}
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
                printSections={printSections}
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
            defaultLeftWidth={62}
            minLeftWidth={35}
            maxLeftWidth={85}
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
            printSections={printSections}
            monitorContent={<DataVisualization quest={currentQuest} stage={stage} />}
        >
            <div className="space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/30">
                    <h3 className="text-purple-400 font-bold mb-2">{t("sm2_10.objective_title")}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {renderMixedText(t(`sm2_10.scenarios.${stage.toLowerCase()}`), "whitespace-pre-wrap")}
                    </p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
                    <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                        {renderMixedText(currentQuest?.promptLatex || "")}
                    </div>

                    <div className="text-purple-300">
                        <KatexTextWrap math={currentQuest?.expressionLatex || ""} />
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
