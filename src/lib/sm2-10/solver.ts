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

function finalizeConceptSteps(rawSteps: RawStep[], justification: string, correctLatex: string) {
    rawSteps.push({
        justification,
        expressionLatex: correctLatex,
    });
}

function pushStep(rawSteps: RawStep[], justification: string, expressionLatex: string) {
    rawSteps.push({
        justification,
        expressionLatex,
    });
}

export function solveSM210(
    stage: string | undefined,
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
            if (stage === "CORRELATION") {
                pushStep(
                    rawSteps,
                    t("sm2_10.reasons.recall_correlation_range"),
                    `-1 \\leq r \\leq 1`
                );
                finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
                break;
            }
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

        // --- Scatter Plots & Box Plot Concepts ---
        case "skewness":
            rawSteps.push({
                justification: t("sm2_10.reasons.interpret_skewness"),
                expressionLatex: `Q_2 - Q_1 < Q_3 - Q_2`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "compare_spread":
            if (p.iqrA === undefined || p.iqrB === undefined) {
                return { steps: [], fullSolutionLatex: null };
            }
            rawSteps.push({
                justification: t("sm2_10.reasons.compare_iqr"),
                expressionLatex: `\\text{IQR}_A = ${p.iqrA},\\ \\text{IQR}_B = ${p.iqrB}`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "percentile":
            if (p.percentileValue === undefined) {
                return { steps: [], fullSolutionLatex: null };
            }
            rawSteps.push({
                justification: t("sm2_10.reasons.interpret_percentile"),
                expressionLatex: `Q_1 = ${p.percentileValue}\\%`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "modified_box":
            rawSteps.push({
                justification: t("sm2_10.reasons.interpret_modified_box"),
                expressionLatex: `\\text{Outliers} \\to \\text{separate points}`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "compare_distributions":
            rawSteps.push({
                justification: t("sm2_10.reasons.compare_distribution_measures"),
                expressionLatex: `\\text{IQR} \\neq \\text{Range}`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "resistant_measure":
            rawSteps.push({
                justification: t("sm2_10.reasons.identify_resistant_measure"),
                expressionLatex: `\\text{Median}`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "five_number":
            rawSteps.push({
                justification: t("sm2_10.reasons.recall_five_number_summary"),
                expressionLatex: `\\min,\\ Q_1,\\ \\text{Median},\\ Q_3,\\ \\max`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "symmetric":
            rawSteps.push({
                justification: t("sm2_10.reasons.assess_symmetry"),
                expressionLatex: `Q_2 - Q_1 \\approx Q_3 - Q_2`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "identify":
        case "positive":
        case "trend":
            rawSteps.push({
                justification: t("sm2_10.reasons.read_scatter_direction"),
                expressionLatex: `x \\uparrow \\Rightarrow y \\uparrow`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.identify_positive_relationship"), correctLatex);
            break;

        case "downward":
        case "negative":
            rawSteps.push({
                justification: t("sm2_10.reasons.read_scatter_direction"),
                expressionLatex: `x \\uparrow \\Rightarrow y \\downarrow`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.identify_negative_relationship"), correctLatex);
            break;

        case "scatter":
        case "none":
            rawSteps.push({
                justification: t("sm2_10.reasons.read_scatter_pattern"),
                expressionLatex: `\\text{No stable upward or downward trend}`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.identify_no_relationship"), correctLatex);
            break;

        case "axes":
            rawSteps.push({
                justification: t("sm2_10.reasons.identify_axes_roles"),
                expressionLatex: `x = \\text{independent},\\ y = \\text{dependent}`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "point":
            rawSteps.push({
                justification: t("sm2_10.reasons.interpret_point_pair"),
                expressionLatex: `(x, y)`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "strong":
        case "weak_correlation":
            rawSteps.push({
                justification: t("sm2_10.reasons.assess_point_clustering"),
                expressionLatex: dataType === "strong"
                    ? `\\text{Points lie close to a line}`
                    : `\\text{Points are widely scattered}`
            });
            finalizeConceptSteps(
                rawSteps,
                dataType === "strong"
                    ? t("sm2_10.reasons.identify_strong_relationship")
                    : t("sm2_10.reasons.identify_weak_relationship"),
                correctLatex
            );
            break;

        case "best_fit":
            rawSteps.push({
                justification: t("sm2_10.reasons.identify_best_fit_goal"),
                expressionLatex: `\\sum (y - \\hat{y})^2`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "extrapolation":
        case "interpolation":
            rawSteps.push({
                justification: t("sm2_10.reasons.compare_prediction_range"),
                expressionLatex: dataType === "extrapolation"
                    ? `\\text{Prediction outside the observed data range}`
                    : `\\text{Prediction inside the observed data range}`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "residual":
            rawSteps.push({
                justification: t("sm2_10.reasons.define_residual"),
                expressionLatex: `\\text{Residual} = y - \\hat{y}`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "nonlinear":
            rawSteps.push({
                justification: t("sm2_10.reasons.identify_nonlinear_pattern"),
                expressionLatex: `\\text{The pattern follows a curve, not a line}`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "influential":
            rawSteps.push({
                justification: t("sm2_10.reasons.identify_influential_point"),
                expressionLatex: `\\text{One point changes the fitted line noticeably}`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "lurking":
            rawSteps.push({
                justification: t("sm2_10.reasons.identify_lurking_variable"),
                expressionLatex: `\\text{A third variable may affect both measured variables}`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "regression":
            rawSteps.push({
                justification: t("sm2_10.reasons.identify_regression_process"),
                expressionLatex: `\\hat{y} = a + bx`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "r_squared":
            rawSteps.push({
                justification: t("sm2_10.reasons.identify_r_squared"),
                expressionLatex: `r^2 \\times 100\\%`
            });
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        // --- Correlation ---
        case "definition":
            pushStep(
                rawSteps,
                t("sm2_10.reasons.define_correlation"),
                `\\text{Correlation describes the direction and strength of a relationship}`
            );
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "range":
            pushStep(
                rawSteps,
                t("sm2_10.reasons.recall_correlation_range"),
                `-1 \\leq r \\leq 1`
            );
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "perfect_positive":
            pushStep(
                rawSteps,
                t("sm2_10.reasons.identify_perfect_positive_r"),
                `r = 1`
            );
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "perfect_negative":
            pushStep(
                rawSteps,
                t("sm2_10.reasons.identify_perfect_negative_r"),
                `r = -1`
            );
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "no_correlation":
            pushStep(
                rawSteps,
                t("sm2_10.reasons.identify_zero_correlation_r"),
                `r = 0`
            );
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "strength":
        case "weak":
        case "negative_strong":
        case "moderate":
        case "interpret_r":
        case "coefficient":
        case "negative_r":
        case "zero_r":
            if (p.rValue === undefined) {
                return { steps: [], fullSolutionLatex: null };
            }

            pushStep(
                rawSteps,
                t("sm2_10.reasons.correlation_magnitude"),
                `r = ${p.rValue}`
            );
            pushStep(
                rawSteps,
                t("sm2_10.reasons.correlation_direction"),
                p.rValue < 0 ? "\\text{Negative}" : "\\text{Positive}"
            );
            if (dataType === "weak" || dataType === "zero_r") {
                pushStep(
                    rawSteps,
                    t("sm2_10.reasons.interpret_r_size"),
                    `|r| = ${Math.abs(p.rValue)} \\text{ is close to } 0`
                );
            } else if (dataType === "moderate") {
                pushStep(
                    rawSteps,
                    t("sm2_10.reasons.interpret_r_size"),
                    `|r| = ${Math.abs(p.rValue)} \\text{ is in a middle range}`
                );
            } else {
                pushStep(
                    rawSteps,
                    t("sm2_10.reasons.interpret_r_size"),
                    `|r| = ${Math.abs(p.rValue)} \\text{ is close to } 1`
                );
            }
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "causation":
            pushStep(
                rawSteps,
                t("sm2_10.reasons.distinguish_correlation_causation"),
                `\\text{Both variables may rise together because of the same outside factor}`
            );
            pushStep(
                rawSteps,
                t("sm2_10.reasons.identify_third_variable"),
                `\\text{Hot weather influences both ice cream sales and drowning risk}`
            );
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "prediction":
            pushStep(
                rawSteps,
                t("sm2_10.reasons.use_correlation_for_prediction"),
                `\\text{A strong correlation can support predictions, but not exact certainty}`
            );
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "confounding":
            pushStep(
                rawSteps,
                t("sm2_10.reasons.identify_third_variable"),
                `\\text{A confounding variable affects both measured variables}`
            );
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "spurious":
            pushStep(
                rawSteps,
                t("sm2_10.reasons.identify_spurious_pattern"),
                `\\text{The pattern is misleading and does not show a real causal link}`
            );
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "pearson":
            pushStep(
                rawSteps,
                t("sm2_10.reasons.recall_pearson_name"),
                `r = \\text{Pearson correlation coefficient}`
            );
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "assumptions":
            pushStep(
                rawSteps,
                t("sm2_10.reasons.recall_linear_assumption"),
                `\\text{Pearson's } r \\text{ is designed for linear relationships}`
            );
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "coefficient_determination":
            pushStep(
                rawSteps,
                t("sm2_10.reasons.connect_r_squared_name"),
                `r^2 = \\text{coefficient of determination}`
            );
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        // --- Elite Analysis ---
        case "rhine_temp_fish":
            if (
                p.mean === undefined ||
                p.targetValue === undefined ||
                p.stdDev === undefined ||
                p.zScore === undefined ||
                p.tailProbability === undefined
            ) {
                return { steps: [], fullSolutionLatex: null };
            }
            pushStep(
                rawSteps,
                t("sm2_10.reasons.standardize_value"),
                `z = \\frac{${p.targetValue} - ${p.mean}}{${p.stdDev}} = ${p.zScore}`
            );
            pushStep(
                rawSteps,
                t("sm2_10.reasons.read_tail_probability"),
                `P(Z > ${p.zScore}) \\approx ${p.tailProbability}`
            );
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "park_biodiversity":
            if (
                p.meanA === undefined ||
                p.meanB === undefined ||
                p.difference === undefined ||
                p.sdA === undefined ||
                p.sdB === undefined ||
                p.nA === undefined ||
                p.nB === undefined ||
                p.standardError === undefined ||
                p.zCritical === undefined ||
                p.lowerBound === undefined ||
                p.upperBound === undefined
            ) {
                return { steps: [], fullSolutionLatex: null };
            }
            pushStep(
                rawSteps,
                t("sm2_10.reasons.compute_difference"),
                `${p.meanA} - ${p.meanB} = ${p.difference}`
            );
            pushStep(
                rawSteps,
                t("sm2_10.reasons.compute_standard_error"),
                `\\text{SE} = \\sqrt{\\frac{${p.sdA}^{2}}{${p.nA}} + \\frac{${p.sdB}^{2}}{${p.nB}}} = ${p.standardError}`
            );
            pushStep(
                rawSteps,
                t("sm2_10.reasons.build_confidence_interval"),
                `${p.difference} \\pm ${p.zCritical}(${p.standardError}) = (${p.lowerBound}, ${p.upperBound})`
            );
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "climate_trend":
            if (
                p.baseValue === undefined ||
                p.currentValue === undefined ||
                p.deltaValue === undefined ||
                p.ratePerUnit === undefined ||
                p.baseDays === undefined ||
                p.predictedDays === undefined
            ) {
                return { steps: [], fullSolutionLatex: null };
            }
            pushStep(
                rawSteps,
                t("sm2_10.reasons.compute_change"),
                `${p.currentValue} - ${p.baseValue} = ${p.deltaValue}`
            );
            pushStep(
                rawSteps,
                t("sm2_10.reasons.apply_growth_rate"),
                `${p.deltaValue} \\times ${p.ratePerUnit} = ${Number(p.deltaValue) * Number(p.ratePerUnit)}`
            );
            pushStep(
                rawSteps,
                t("sm2_10.reasons.compute_result"),
                `${p.baseDays} + ${Number(p.deltaValue) * Number(p.ratePerUnit)} = ${p.predictedDays}`
            );
            break;

        case "fox_population":
            if (
                p.mean === undefined ||
                p.stdDev === undefined ||
                p.lowerBound === undefined ||
                p.upperBound === undefined ||
                p.leftZ === undefined ||
                p.rightZ === undefined ||
                p.leftTailProb === undefined ||
                p.rightTailProb === undefined ||
                p.totalProbability === undefined
            ) {
                return { steps: [], fullSolutionLatex: null };
            }
            pushStep(
                rawSteps,
                t("sm2_10.reasons.standardize_value"),
                `z_1 = \\frac{${p.lowerBound} - ${p.mean}}{${p.stdDev}} = ${p.leftZ},\\ z_2 = \\frac{${p.upperBound} - ${p.mean}}{${p.stdDev}} = ${p.rightZ}`
            );
            pushStep(
                rawSteps,
                t("sm2_10.reasons.read_tail_probability"),
                `P(X < ${p.lowerBound}) = ${p.leftTailProb},\\ P(X > ${p.upperBound}) = ${p.rightTailProb}`
            );
            pushStep(
                rawSteps,
                t("sm2_10.reasons.combine_tail_probabilities"),
                `${p.leftTailProb} + ${p.rightTailProb} = ${p.totalProbability}`
            );
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
            break;

        case "dissolved_oxygen":
            if (
                p.sampleMean === undefined ||
                p.sampleStdDev === undefined ||
                p.sampleSize === undefined ||
                p.standardError === undefined ||
                p.zCritical === undefined ||
                p.marginError === undefined ||
                p.lowerBound === undefined ||
                p.safeThreshold === undefined
            ) {
                return { steps: [], fullSolutionLatex: null };
            }
            pushStep(
                rawSteps,
                t("sm2_10.reasons.compute_standard_error"),
                `\\text{SE} = \\frac{${p.sampleStdDev}}{\\sqrt{${p.sampleSize}}} = ${p.standardError}`
            );
            pushStep(
                rawSteps,
                t("sm2_10.reasons.build_confidence_interval"),
                `${p.sampleMean} \\pm ${p.zCritical}(${p.standardError}) = ${p.sampleMean} \\pm ${p.marginError}`
            );
            pushStep(
                rawSteps,
                t("sm2_10.reasons.compare_to_threshold"),
                `${p.lowerBound} > ${p.safeThreshold}`
            );
            finalizeConceptSteps(rawSteps, t("sm2_10.reasons.compute_result"), correctLatex);
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
