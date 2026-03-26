import { PlatformSolutionStep } from "@/hooks/useQuestManager";

export interface SM210Parameters {
    dataset?: number[];
    lowerHalf?: number[];
    upperHalf?: number[];
    rangeMin?: number;
    rangeMax?: number;
    q1?: number;
    q3?: number;
    iqr?: number;
    targetValue?: number;
    mean?: number;
    median?: number;
    lowerBound?: number;
    upperBound?: number;
    iqrA?: number;
    iqrB?: number;
    percentileValue?: number;
    rValue?: number;
    [key: string]: any;
}

interface RawStep {
    justification: string;
    expressionLatex: string;
}

type Translator = (path: string, params?: Record<string, string | number>) => any;

function formatNumberList(values: number[]): string {
    return values.join(", ");
}

export function solveSM210(
    dataType: string | undefined,
    parameters: SM210Parameters | undefined,
    t: Translator,
    correctLatex: string
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
    const rawSteps: RawStep[] = [];
    let fullSolutionLatex: string | null = null;

    if (!dataType) {
        return { steps: [], fullSolutionLatex };
    }

    const p = parameters || {};

    switch (dataType) {
        // --- Central Tendency & Box Plots ---
        case "median":
            if (p.dataset) {
                const sortedDataset = p.dataset.slice().sort((a, b) => a - b);
                rawSteps.push({
                    justification: t("sm2_10.reasons.sort_dataset"),
                    expressionLatex: formatNumberList(sortedDataset)
                });
            }
            rawSteps.push({
                justification: t("sm2_10.reasons.find_median"),
                expressionLatex: `\\text{Median} = ${p.median !== undefined ? p.median : correctLatex}`
            });
            break;

        case "quartiles":
        case "q3":
            if (p.q1 === undefined || p.q3 === undefined) {
                return { steps: [], fullSolutionLatex: null };
            }
            if (dataType === "quartiles" && p.lowerHalf) {
                rawSteps.push({
                    justification: t("sm2_10.reasons.identify_halves"),
                    expressionLatex: formatNumberList(p.lowerHalf)
                });
            }
            if (dataType === "q3" && p.upperHalf) {
                rawSteps.push({
                    justification: t("sm2_10.reasons.identify_halves"),
                    expressionLatex: formatNumberList(p.upperHalf)
                });
            }
            rawSteps.push({
                justification: t("sm2_10.reasons.identify_quartiles"),
                expressionLatex: dataType === "quartiles"
                    ? `Q_1 = ${p.q1}`
                    : `Q_3 = ${p.q3}`
            });
            break;

        case "range":
            if (p.rangeMin === undefined || p.rangeMax === undefined) {
                return { steps: [], fullSolutionLatex: null };
            }
            rawSteps.push({
                justification: t("sm2_10.reasons.compute_range"),
                expressionLatex: `\\text{Range} = ${p.rangeMax} - ${p.rangeMin} = ${correctLatex}`
            });
            break;

        case "iqr":
        case "iqr_calc":
            if (p.q1 === undefined || p.q3 === undefined || p.iqr === undefined) {
                return { steps: [], fullSolutionLatex: null };
            }
            if (p.q1 !== undefined && p.q3 !== undefined) {
                rawSteps.push({
                    justification: t("sm2_10.reasons.identify_quartiles"),
                    expressionLatex: `Q_1 = ${p.q1}, Q_3 = ${p.q3}`
                });
            }
            rawSteps.push({
                justification: t("sm2_10.reasons.calc_iqr"),
                expressionLatex: `\\text{IQR} = Q_3 - Q_1 = ${p.q3 ?? "?"} - ${p.q1 ?? "?"} = ${p.iqr ?? "?"}`
            });
            break;

        case "outlier_rule":
            if (p.q3 === undefined || p.iqr === undefined || p.upperBound === undefined) {
                return { steps: [], fullSolutionLatex: null };
            }
            rawSteps.push({
                justification: t("sm2_10.reasons.calc_upper_bound"),
                expressionLatex: `Q_3 + 1.5 \\times \\text{IQR} = ${p.q3 ?? "?"} + 1.5 \\times ${p.iqr ?? "?"} = ${p.upperBound ?? correctLatex}`
            });
            break;

        case "lower_outlier":
            if (p.q1 === undefined || p.iqr === undefined || p.lowerBound === undefined) {
                return { steps: [], fullSolutionLatex: null };
            }
            rawSteps.push({
                justification: t("sm2_10.reasons.calc_lower_bound"),
                expressionLatex: `Q_1 - 1.5 \\times \\text{IQR} = ${p.q1 ?? "?"} - 1.5 \\times ${p.iqr ?? "?"} = ${p.lowerBound ?? correctLatex}`
            });
            break;

        case "outlier":
        case "outlier_detect":
            if (p.lowerBound === undefined || p.upperBound === undefined || p.targetValue === undefined) {
                return { steps: [], fullSolutionLatex: null };
            }
            if (p.q1 !== undefined && p.q3 !== undefined && p.iqr !== undefined) {
                rawSteps.push({
                    justification: t("sm2_10.reasons.calc_iqr"),
                    expressionLatex: `\\text{IQR} = ${p.q3} - ${p.q1} = ${p.iqr}`
                });
            }
            rawSteps.push({
                justification: t("sm2_10.reasons.identify_outlier_rule"),
                expressionLatex: `[${p.lowerBound ?? "?"}, ${p.upperBound ?? "?"}]`
            });
            rawSteps.push({
                justification: t("sm2_10.reasons.compare_outlier"),
                expressionLatex: `${p.targetValue ?? "?"} \\notin [${p.lowerBound ?? "?"}, ${p.upperBound ?? "?"}] \\implies \\text{Outlier}`
            });
            break;

        case "mean":
            if (!p.dataset || p.mean === undefined) {
                return { steps: [], fullSolutionLatex: null };
            }
            rawSteps.push({
                justification: t("sm2_10.reasons.substitute_values"),
                expressionLatex: `\\frac{${formatNumberList(p.dataset).replace(/,\s/g, "+")}}{${p.dataset.length}}`
            });
            rawSteps.push({
                justification: t("sm2_10.reasons.compute_result"),
                expressionLatex: `\\text{Mean} = ${p.mean}`
            });
            break;

        case "box_parts":
            rawSteps.push({
                justification: t("sm2_10.reasons.interpret_box"),
                expressionLatex: `\\text{Box} = [Q_1, Q_3]`
            });
            rawSteps.push({
                justification: t("sm2_10.reasons.compute_result"),
                expressionLatex: correctLatex
            });
            break;

        // --- Correlation & Scatter Plots ---
        case "skewness":
            rawSteps.push({
                justification: t("sm2_10.reasons.interpret_skewness"),
                expressionLatex: `Q_2 - Q_1 < Q_3 - Q_2`
            });
            rawSteps.push({
                justification: t("sm2_10.reasons.compute_result"),
                expressionLatex: correctLatex
            });
            break;

        case "compare_spread":
            if (p.iqrA === undefined || p.iqrB === undefined) {
                return { steps: [], fullSolutionLatex: null };
            }
            rawSteps.push({
                justification: t("sm2_10.reasons.compare_iqr"),
                expressionLatex: `\\text{IQR}_A = ${p.iqrA},\\ \\text{IQR}_B = ${p.iqrB}`
            });
            rawSteps.push({
                justification: t("sm2_10.reasons.compute_result"),
                expressionLatex: correctLatex
            });
            break;

        case "percentile":
            if (p.percentileValue === undefined) {
                return { steps: [], fullSolutionLatex: null };
            }
            rawSteps.push({
                justification: t("sm2_10.reasons.interpret_percentile"),
                expressionLatex: `Q_1 = ${p.percentileValue}\\%`
            });
            rawSteps.push({
                justification: t("sm2_10.reasons.compute_result"),
                expressionLatex: correctLatex
            });
            break;

        case "modified_box":
            rawSteps.push({
                justification: t("sm2_10.reasons.interpret_modified_box"),
                expressionLatex: `\\text{Outliers} \\to \\text{separate points}`
            });
            rawSteps.push({
                justification: t("sm2_10.reasons.compute_result"),
                expressionLatex: correctLatex
            });
            break;

        case "compare_distributions":
            rawSteps.push({
                justification: t("sm2_10.reasons.compare_distribution_measures"),
                expressionLatex: `\\text{IQR} \\neq \\text{Range}`
            });
            rawSteps.push({
                justification: t("sm2_10.reasons.compute_result"),
                expressionLatex: correctLatex
            });
            break;

        case "resistant_measure":
            rawSteps.push({
                justification: t("sm2_10.reasons.identify_resistant_measure"),
                expressionLatex: `\\text{Median}`
            });
            rawSteps.push({
                justification: t("sm2_10.reasons.compute_result"),
                expressionLatex: correctLatex
            });
            break;

        case "five_number":
            rawSteps.push({
                justification: t("sm2_10.reasons.recall_five_number_summary"),
                expressionLatex: `\\min,\\ Q_1,\\ \\text{Median},\\ Q_3,\\ \\max`
            });
            rawSteps.push({
                justification: t("sm2_10.reasons.compute_result"),
                expressionLatex: correctLatex
            });
            break;

        case "symmetric":
            rawSteps.push({
                justification: t("sm2_10.reasons.assess_symmetry"),
                expressionLatex: `Q_2 - Q_1 \\approx Q_3 - Q_2`
            });
            rawSteps.push({
                justification: t("sm2_10.reasons.compute_result"),
                expressionLatex: correctLatex
            });
            break;

        case "strength":
        case "weak":
        case "strong":
        case "negative_strong":
        case "moderate":
        case "interpret_r":
            if (p.rValue !== undefined) {
                rawSteps.push({
                    justification: t("sm2_10.reasons.correlation_magnitude"),
                    expressionLatex: `r = ${p.rValue}`
                });
                rawSteps.push({
                    justification: t("sm2_10.reasons.correlation_direction"),
                    expressionLatex: p.rValue < 0 ? "\\text{Negative}" : "\\text{Positive}"
                });
            } else {
                return { steps: [], fullSolutionLatex: null };
            }
            break;

        // --- Fallback for Concepts ---
        default:
            return { steps: [], fullSolutionLatex: null };
    }

    const steps: PlatformSolutionStep[] = rawSteps.map((s, i) => ({
        stepNumber: i + 1,
        justification: s.justification,
        expressionLatex: s.expressionLatex
    }));

    // Default full solution strategy: Join all steps if not predefined
    if (steps.length > 0) {
        fullSolutionLatex = steps.map(s => `\\text{${s.justification}} \\implies ${s.expressionLatex}`).join(" \\\\ ");
    }

    return { steps, fullSolutionLatex };
}
