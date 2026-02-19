"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
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
                        promptLatex: `\\\\text{Data: } 2, 4, 6, 8, 10. \\\\text{ What is the median?}`,
                        expressionLatex: `\\\\text{Median = middle value}`,
                        targetLatex: `\\\\text{Median}`,
                        slots: [{ id: "median", labelLatex: `\\\\text{Median}`, placeholder: "6", expected: 6 }],
                        correctLatex: `6`,
                        hintLatex: [`\\\\text{Middle of 5 values is 3rd value}`]
                    },
                    {
                        id: "BP-B2", difficulty, stage, dataType: "quartiles",
                        promptLatex: `\\\\text{Data: } 1, 3, 5, 7, 9. \\\\text{ What is Q1 (first quartile)?}`,
                        expressionLatex: `\\\\text{Q1 = median of lower half}`,
                        targetLatex: `Q_1`,
                        slots: [{ id: "q1", labelLatex: `Q_1`, placeholder: "3", expected: 3 }],
                        correctLatex: `Q_1 = 3`,
                        hintLatex: [`\\\\text{Lower half: } 1, 3`]
                    },
                    {
                        id: "BP-B3", difficulty, stage, dataType: "range",
                        promptLatex: `\\\\text{Data: } 10, 15, 20, 25, 30. \\\\text{ What is the range?}`,
                        expressionLatex: `\\\\text{Range} = \\\\text{Max} - \\\\text{Min}`,
                        targetLatex: `\\\\text{Range}`,
                        slots: [{ id: "range", labelLatex: `\\\\text{Range}`, placeholder: "20", expected: 20 }],
                        correctLatex: `20`,
                        hintLatex: [`30 - 10 = 20`]
                    },
                    {
                        id: "BP-B4", difficulty, stage, dataType: "iqr",
                        promptLatex: `\\\\text{Q1 = 5, Q3 = 15. What is IQR (interquartile range)?}`,
                        expressionLatex: `\\\\text{IQR} = Q_3 - Q_1`,
                        targetLatex: `\\\\text{IQR}`,
                        slots: [{ id: "iqr", labelLatex: `\\\\text{IQR}`, placeholder: "10", expected: 10 }],
                        correctLatex: `\\\\text{IQR} = 10`,
                        hintLatex: [`15 - 5 = 10`]
                    },
                    {
                        id: "BP-B5", difficulty, stage, dataType: "outlier",
                        promptLatex: `\\\\text{Data: } 2, 3, 4, 5, 20. \\\\text{ Which value is an outlier?}`,
                        expressionLatex: `\\\\text{Outlier = far from others}`,
                        targetLatex: `\\\\text{Outlier}`,
                        slots: [{ id: "outlier", labelLatex: `\\\\text{Outlier}`, placeholder: "20", expected: 20 }],
                        correctLatex: `20`,
                        hintLatex: [`\\\\text{20 is much larger than others}`]
                    }
                );
            } else if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "BP-C1", difficulty, stage, dataType: "q3",
                        promptLatex: `\\\\text{Data: } 2, 4, 6, 8, 10, 12, 14. \\\\text{ What is Q3?}`,
                        expressionLatex: `Q_3 = \\\\text{median of upper half}`,
                        targetLatex: `Q_3`,
                        slots: [{ id: "q3", labelLatex: `Q_3`, placeholder: "12", expected: 12 }],
                        correctLatex: `Q_3 = 12`,
                        hintLatex: [`\\\\text{Upper half: } 10, 12, 14`]
                    },
                    {
                        id: "BP-C2", difficulty, stage, dataType: "iqr_calc",
                        promptLatex: `\\\\text{Data: } 5, 10, 15, 20, 25, 30, 35. \\\\text{ Calculate IQR.}`,
                        expressionLatex: `\\\\text{IQR} = Q_3 - Q_1`,
                        targetLatex: `\\\\text{IQR}`,
                        slots: [{ id: "iqr", labelLatex: `\\\\text{IQR}`, placeholder: "20", expected: 20 }],
                        correctLatex: `\\\\text{IQR} = 20`,
                        hintLatex: [`Q_1 = 10, Q_3 = 30`]
                    },
                    {
                        id: "BP-C3", difficulty, stage, dataType: "mean",
                        promptLatex: `\\\\text{Data: } 4, 6, 8, 10, 12. \\\\text{ What is the mean?}`,
                        expressionLatex: `\\\\text{Mean} = \\\\frac{\\\\text{sum}}{n}`,
                        targetLatex: `\\\\text{Mean}`,
                        slots: [{ id: "mean", labelLatex: `\\\\text{Mean}`, placeholder: "8", expected: 8 }],
                        correctLatex: `\\\\text{Mean} = 8`,
                        hintLatex: [`\\\\frac{4+6+8+10+12}{5} = 8`]
                    },
                    {
                        id: "BP-C4", difficulty, stage, dataType: "outlier_detect",
                        promptLatex: `\\\\text{Data: } 10, 12, 14, 16, 50. \\\\text{ Is 50 an outlier?}`,
                        expressionLatex: `\\\\text{Outlier if far from Q1-Q3 range}`,
                        targetLatex: `\\\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\\\text{Outlier?}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\\\text{Yes}`,
                        hintLatex: [`50 \\\\text{ is much larger than others}`]
                    },
                    {
                        id: "BP-C5", difficulty, stage, dataType: "box_parts",
                        promptLatex: `\\\\text{In a box plot, what does the box represent?}`,
                        expressionLatex: `\\\\text{Box = IQR (Q1 to Q3)}`,
                        targetLatex: `\\\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\\\text{Represents}`, placeholder: "IQR", expected: "IQR" }],
                        correctLatex: `\\\\text{IQR (middle 50\\%)}`,
                        hintLatex: [`\\\\text{Box shows Q1 to Q3}`]
                    }
                );
            } else if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "BP-A1", difficulty, stage, dataType: "outlier_rule",
                        promptLatex: `\\\\text{Q1 = 10, Q3 = 20, IQR = 10. What is the upper outlier boundary?}`,
                        expressionLatex: `\\\\text{Upper boundary} = Q_3 + 1.5 \\times \\\\text{IQR}`,
                        targetLatex: `\\\\text{Boundary}`,
                        slots: [{ id: "boundary", labelLatex: `\\\\text{Upper}`, placeholder: "35", expected: 35 }],
                        correctLatex: `35`,
                        hintLatex: [`20 + 1.5 \\times 10 = 35`]
                    },
                    {
                        id: "BP-A2", difficulty, stage, dataType: "lower_outlier",
                        promptLatex: `\\\\text{Q1 = 15, IQR = 8. What is the lower outlier boundary?}`,
                        expressionLatex: `\\\\text{Lower boundary} = Q_1 - 1.5 \\times \\\\text{IQR}`,
                        targetLatex: `\\\\text{Boundary}`,
                        slots: [{ id: "boundary", labelLatex: `\\\\text{Lower}`, placeholder: "3", expected: 3 }],
                        correctLatex: `3`,
                        hintLatex: [`15 - 1.5 \\times 8 = 3`]
                    },
                    {
                        id: "BP-A3", difficulty, stage, dataType: "skewness",
                        promptLatex: `\\\\text{Median closer to Q1 than Q3. Is data left or right skewed?}`,
                        expressionLatex: `\\\\text{Median near Q1} = \\\\text{right skewed}`,
                        targetLatex: `\\\\text{Skew}`,
                        slots: [{ id: "skew", labelLatex: `\\\\text{Direction}`, placeholder: "right", expected: "right" }],
                        correctLatex: `\\\\text{Right skewed}`,
                        hintLatex: [`\\\\text{Long tail on right}`]
                    },
                    {
                        id: "BP-A4", difficulty, stage, dataType: "compare_spread",
                        promptLatex: `\\\\text{Dataset A: IQR = 10. Dataset B: IQR = 20. Which is more spread out?}`,
                        expressionLatex: `\\\\text{Larger IQR} = \\\\text{more spread}`,
                        targetLatex: `\\\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\\\text{Dataset}`, placeholder: "B", expected: "B" }],
                        correctLatex: `\\\\text{Dataset B}`,
                        hintLatex: [`\\\\text{Larger IQR means more variability}`]
                    },
                    {
                        id: "BP-A5", difficulty, stage, dataType: "percentile",
                        promptLatex: `\\\\text{Q1 represents what percentile?}`,
                        expressionLatex: `Q_1 = 25\\\\text{th percentile}`,
                        targetLatex: `\\\\text{Percentile}`,
                        slots: [{ id: "pct", labelLatex: `\\\\text{Percentile}`, placeholder: "25", expected: 25 }],
                        correctLatex: `25\\\\text{th}`,
                        hintLatex: [`Q_1 \\\\text{ is 25th percentile}`]
                    }
                );
            } else if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "BP-E1", difficulty, stage, dataType: "modified_box",
                        promptLatex: `\\\\text{Modified box plot shows outliers separately. Why is this useful?}`,
                        expressionLatex: `\\\\text{Shows extreme values clearly}`,
                        targetLatex: `\\\\text{Reason}`,
                        slots: [{ id: "reason", labelLatex: `\\\\text{Benefit}`, placeholder: "clarity", expected: "clarity" }],
                        correctLatex: `\\\\text{Identifies extreme values}`,
                        hintLatex: [`\\\\text{Outliers shown as individual points}`]
                    },
                    {
                        id: "BP-E2", difficulty, stage, dataType: "compare_distributions",
                        promptLatex: `\\\\text{Two box plots: A has larger IQR, B has larger range. Which is more variable?}`,
                        expressionLatex: `\\\\text{IQR measures middle 50\\%, range measures all}`,
                        targetLatex: `\\\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\\\text{More variable}`, placeholder: "depends", expected: "depends" }],
                        correctLatex: `\\\\text{Depends on context}`,
                        hintLatex: [`\\\\text{IQR vs range measure different things}`]
                    },
                    {
                        id: "BP-E3", difficulty, stage, dataType: "resistant_measure",
                        promptLatex: `\\\\text{Is median or mean more resistant to outliers?}`,
                        expressionLatex: `\\\\text{Median not affected by extreme values}`,
                        targetLatex: `\\\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\\\text{More resistant}`, placeholder: "median", expected: "median" }],
                        correctLatex: `\\\\text{Median}`,
                        hintLatex: [`\\\\text{Median is position-based}`]
                    },
                    {
                        id: "BP-E4", difficulty, stage, dataType: "five_number",
                        promptLatex: `\\\\text{Five-number summary includes: Min, Q1, Median, Q3, and what?}`,
                        expressionLatex: `\\\\text{Five numbers describe distribution}`,
                        targetLatex: `\\\\text{Fifth number}`,
                        slots: [{ id: "num", labelLatex: `\\\\text{Fifth}`, placeholder: "Max", expected: "Max" }],
                        correctLatex: `\\\\text{Maximum}`,
                        hintLatex: [`\\\\text{Min, Q1, Med, Q3, Max}`]
                    },
                    {
                        id: "BP-E5", difficulty, stage, dataType: "symmetric",
                        promptLatex: `\\\\text{Median = Mean, Q1 and Q3 equidistant from median. What type of distribution?}`,
                        expressionLatex: `\\\\text{Symmetric distribution}`,
                        targetLatex: `\\\\text{Type}`,
                        slots: [{ id: "type", labelLatex: `\\\\text{Distribution}`, placeholder: "symmetric", expected: "symmetric" }],
                        correctLatex: `\\\\text{Symmetric}`,
                        hintLatex: [`\\\\text{Balanced on both sides}`]
                    }
                );
            }
        }

        if (stage === "SCATTER_PLOTS") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "SP-B1", difficulty, stage, dataType: "identify",
                        promptLatex: `\\\\text{Points go up from left to right. What type of correlation?}`,
                        expressionLatex: `\\\\text{Upward trend = positive}`,
                        targetLatex: `\\\\text{Type}`,
                        slots: [{ id: "type", labelLatex: `\\\\text{Type}`, placeholder: "positive", expected: "positive" }],
                        correctLatex: `\\\\text{Positive}`,
                        hintLatex: [`\\\\text{Both variables increase}`]
                    },
                    {
                        id: "SP-B2", difficulty, stage, dataType: "downward",
                        promptLatex: `\\\\text{Points go down from left to right. What correlation?}`,
                        expressionLatex: `\\\\text{Downward trend = negative}`,
                        targetLatex: `\\\\text{Type}`,
                        slots: [{ id: "type", labelLatex: `\\\\text{Type}`, placeholder: "negative", expected: "negative" }],
                        correctLatex: `\\\\text{Negative}`,
                        hintLatex: [`\\\\text{One up, one down}`]
                    },
                    {
                        id: "SP-B3", difficulty, stage, dataType: "scatter",
                        promptLatex: `\\\\text{Points scattered randomly. What correlation?}`,
                        expressionLatex: `\\\\text{No pattern = no correlation}`,
                        targetLatex: `\\\\text{Type}`,
                        slots: [{ id: "type", labelLatex: `\\\\text{Type}`, placeholder: "none", expected: "none" }],
                        correctLatex: `\\\\text{None}`,
                        hintLatex: [`\\\\text{No relationship}`]
                    },
                    {
                        id: "SP-B4", difficulty, stage, dataType: "axes",
                        promptLatex: `\\\\text{In a scatter plot, which axis shows the independent variable?}`,
                        expressionLatex: `\\\\text{Independent on x-axis}`,
                        targetLatex: `\\\\text{Axis}`,
                        slots: [{ id: "axis", labelLatex: `\\\\text{Axis}`, placeholder: "x", expected: "x" }],
                        correctLatex: `\\\\text{x-axis}`,
                        hintLatex: [`\\\\text{x = independent, y = dependent}`]
                    },
                    {
                        id: "SP-B5", difficulty, stage, dataType: "point",
                        promptLatex: `\\\\text{Each point on a scatter plot represents what?}`,
                        expressionLatex: `\\\\text{Point = one data pair}`,
                        targetLatex: `\\\\text{Represents}`,
                        slots: [{ id: "rep", labelLatex: `\\\\text{Represents}`, placeholder: "pair", expected: "pair" }],
                        correctLatex: `\\\\text{One data pair (x,y)}`,
                        hintLatex: [`\\\\text{One observation with two values}`]
                    }
                );
            } else if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "SP-C1", difficulty, stage, dataType: "positive",
                        promptLatex: `\\\\text{As study time increases, test scores increase. What type of correlation?}`,
                        expressionLatex: `\\\\text{Both increase together}`,
                        targetLatex: `\\\\text{Type}`,
                        slots: [{ id: "type", labelLatex: `\\\\text{Type}`, placeholder: "positive", expected: "positive" }],
                        correctLatex: `\\\\text{Positive correlation}`,
                        hintLatex: [`\\\\text{Both go up = positive}`]
                    },
                    {
                        id: "SP-C2", difficulty, stage, dataType: "negative",
                        promptLatex: `\\\\text{As temperature decreases, heating costs increase. What correlation?}`,
                        expressionLatex: `\\\\text{One up, one down}`,
                        targetLatex: `\\\\text{Type}`,
                        slots: [{ id: "type", labelLatex: `\\\\text{Type}`, placeholder: "negative", expected: "negative" }],
                        correctLatex: `\\\\text{Negative correlation}`,
                        hintLatex: [`\\\\text{Opposite directions = negative}`]
                    },
                    {
                        id: "SP-C3", difficulty, stage, dataType: "none",
                        promptLatex: `\\\\text{Shoe size vs. math score shows no pattern. What correlation?}`,
                        expressionLatex: `\\\\text{No relationship}`,
                        targetLatex: `\\\\text{Type}`,
                        slots: [{ id: "type", labelLatex: `\\\\text{Type}`, placeholder: "none", expected: "none" }],
                        correctLatex: `\\\\text{No correlation}`,
                        hintLatex: [`\\\\text{No pattern = no correlation}`]
                    },
                    {
                        id: "SP-C4", difficulty, stage, dataType: "strong",
                        promptLatex: `\\\\text{Points cluster tightly around a line. Is correlation strong or weak?}`,
                        expressionLatex: `\\\\text{Tight cluster = strong}`,
                        targetLatex: `\\\\text{Strength}`,
                        slots: [{ id: "strength", labelLatex: `\\\\text{Strength}`, placeholder: "strong", expected: "strong" }],
                        correctLatex: `\\\\text{Strong correlation}`,
                        hintLatex: [`\\\\text{Close to line = strong}`]
                    },
                    {
                        id: "SP-C5", difficulty, stage, dataType: "trend",
                        promptLatex: `\\\\text{Line of best fit has positive slope. What does this indicate?}`,
                        expressionLatex: `\\\\text{Positive slope = positive trend}`,
                        targetLatex: `\\\\text{Trend}`,
                        slots: [{ id: "trend", labelLatex: `\\\\text{Trend}`, placeholder: "positive", expected: "positive" }],
                        correctLatex: `\\\\text{Positive trend}`,
                        hintLatex: [`\\\\text{Upward slope = positive}`]
                    }
                );
            } else if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "SP-A1", difficulty, stage, dataType: "best_fit",
                        promptLatex: `\\\\text{Line of best fit minimizes what?}`,
                        expressionLatex: `\\\\text{Minimizes distance from points}`,
                        targetLatex: `\\\\text{Minimizes}`,
                        slots: [{ id: "min", labelLatex: `\\\\text{Minimizes}`, placeholder: "distance", expected: "distance" }],
                        correctLatex: `\\\\text{Sum of squared distances}`,
                        hintLatex: [`\\\\text{Least squares method}`]
                    },
                    {
                        id: "SP-A2", difficulty, stage, dataType: "extrapolation",
                        promptLatex: `\\\\text{Using line to predict beyond data range is called what?}`,
                        expressionLatex: `\\\\text{Beyond range = extrapolation}`,
                        targetLatex: `\\\\text{Term}`,
                        slots: [{ id: "term", labelLatex: `\\\\text{Term}`, placeholder: "extrapolation", expected: "extrapolation" }],
                        correctLatex: `\\\\text{Extrapolation}`,
                        hintLatex: [`\\\\text{Extra = beyond, polation = prediction}`]
                    },
                    {
                        id: "SP-A3", difficulty, stage, dataType: "interpolation",
                        promptLatex: `\\\\text{Predicting within data range is called what?}`,
                        expressionLatex: `\\\\text{Within range = interpolation}`,
                        targetLatex: `\\\\text{Term}`,
                        slots: [{ id: "term", labelLatex: `\\\\text{Term}`, placeholder: "interpolation", expected: "interpolation" }],
                        correctLatex: `\\\\text{Interpolation}`,
                        hintLatex: [`\\\\text{Inter = between}`]
                    },
                    {
                        id: "SP-A4", difficulty, stage, dataType: "residual",
                        promptLatex: `\\\\text{Difference between actual and predicted value is called what?}`,
                        expressionLatex: `\\\\text{Actual - Predicted = Residual}`,
                        targetLatex: `\\\\text{Term}`,
                        slots: [{ id: "term", labelLatex: `\\\\text{Term}`, placeholder: "residual", expected: "residual" }],
                        correctLatex: `\\\\text{Residual}`,
                        hintLatex: [`\\\\text{Residual = leftover error}`]
                    },
                    {
                        id: "SP-A5", difficulty, stage, dataType: "weak_correlation",
                        promptLatex: `\\\\text{Points widely scattered. Is correlation strong or weak?}`,
                        expressionLatex: `\\\\text{Wide scatter = weak}`,
                        targetLatex: `\\\\text{Strength}`,
                        slots: [{ id: "strength", labelLatex: `\\\\text{Strength}`, placeholder: "weak", expected: "weak" }],
                        correctLatex: `\\\\text{Weak}`,
                        hintLatex: [`\\\\text{Far from line = weak}`]
                    }
                );
            } else if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "SP-E1", difficulty, stage, dataType: "nonlinear",
                        promptLatex: `\\\\text{Points form a curve, not a line. What type of relationship?}`,
                        expressionLatex: `\\\\text{Curved pattern = nonlinear}`,
                        targetLatex: `\\\\text{Type}`,
                        slots: [{ id: "type", labelLatex: `\\\\text{Type}`, placeholder: "nonlinear", expected: "nonlinear" }],
                        correctLatex: `\\\\text{Nonlinear}`,
                        hintLatex: [`\\\\text{Not a straight line}`]
                    },
                    {
                        id: "SP-E2", difficulty, stage, dataType: "influential",
                        promptLatex: `\\\\text{One point far from others greatly affects line. What is this point called?}`,
                        expressionLatex: `\\\\text{Influential point or outlier}`,
                        targetLatex: `\\\\text{Term}`,
                        slots: [{ id: "term", labelLatex: `\\\\text{Term}`, placeholder: "influential", expected: "influential" }],
                        correctLatex: `\\\\text{Influential point}`,
                        hintLatex: [`\\\\text{Has large influence on line}`]
                    },
                    {
                        id: "SP-E3", difficulty, stage, dataType: "lurking",
                        promptLatex: `\\\\text{Hidden variable affecting both x and y is called what?}`,
                        expressionLatex: `\\\\text{Hidden variable = lurking variable}`,
                        targetLatex: `\\\\text{Term}`,
                        slots: [{ id: "term", labelLatex: `\\\\text{Term}`, placeholder: "lurking", expected: "lurking" }],
                        correctLatex: `\\\\text{Lurking variable}`,
                        hintLatex: [`\\\\text{Lurking = hidden}`]
                    },
                    {
                        id: "SP-E4", difficulty, stage, dataType: "regression",
                        promptLatex: `\\\\text{Process of finding line of best fit is called what?}`,
                        expressionLatex: `\\\\text{Finding best fit = regression}`,
                        targetLatex: `\\\\text{Process}`,
                        slots: [{ id: "proc", labelLatex: `\\\\text{Process}`, placeholder: "regression", expected: "regression" }],
                        correctLatex: `\\\\text{Linear regression}`,
                        hintLatex: [`\\\\text{Regression analysis}`]
                    },
                    {
                        id: "SP-E5", difficulty, stage, dataType: "r_squared",
                        promptLatex: `\\\\text{r² = 0.81 means what percent of variation is explained?}`,
                        expressionLatex: `r^2 \\times 100\\% = \\\\text{percent explained}`,
                        targetLatex: `\\\\text{Percent}`,
                        slots: [{ id: "pct", labelLatex: `\\\\text{Percent}`, placeholder: "81", expected: 81 }],
                        correctLatex: `81\\%`,
                        hintLatex: [`r^2 = 0.81 = 81\\%`]
                    }
                );
            }
        }

        if (stage === "CORRELATION") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "C-B1", difficulty, stage, dataType: "definition",
                        promptLatex: `\\\\text{Correlation measures what?}`,
                        expressionLatex: `\\\\text{Measures relationship strength}`,
                        targetLatex: `\\\\text{Measures}`,
                        slots: [{ id: "meas", labelLatex: `\\\\text{Measures}`, placeholder: "relationship", expected: "relationship" }],
                        correctLatex: `\\\\text{Relationship between variables}`,
                        hintLatex: [`\\\\text{How variables relate}`]
                    },
                    {
                        id: "C-B2", difficulty, stage, dataType: "range",
                        promptLatex: `\\\\text{Correlation coefficient r ranges from what to what?}`,
                        expressionLatex: `-1 \\leq r \\leq 1`,
                        targetLatex: `\\\\text{Range}`,
                        slots: [{ id: "min", labelLatex: `\\\\text{Min}`, placeholder: "-1", expected: -1 }, { id: "max", labelLatex: `\\\\text{Max}`, placeholder: "1", expected: 1 }],
                        correctLatex: `-1 \\\\text{ to } 1`,
                        hintLatex: [`r \\\\text{ is between } -1 \\\\text{ and } 1`]
                    },
                    {
                        id: "C-B3", difficulty, stage, dataType: "perfect_positive",
                        promptLatex: `\\\\text{What value of r indicates perfect positive correlation?}`,
                        expressionLatex: `r = 1 = \\\\text{perfect positive}`,
                        targetLatex: `r`,
                        slots: [{ id: "r", labelLatex: `r`, placeholder: "1", expected: 1 }],
                        correctLatex: `r = 1`,
                        hintLatex: [`\\\\text{Perfect positive} = 1`]
                    },
                    {
                        id: "C-B4", difficulty, stage, dataType: "perfect_negative",
                        promptLatex: `\\\\text{What value of r indicates perfect negative correlation?}`,
                        expressionLatex: `r = -1 = \\\\text{perfect negative}`,
                        targetLatex: `r`,
                        slots: [{ id: "r", labelLatex: `r`, placeholder: "-1", expected: -1 }],
                        correctLatex: `r = -1`,
                        hintLatex: [`\\\\text{Perfect negative} = -1`]
                    },
                    {
                        id: "C-B5", difficulty, stage, dataType: "no_correlation",
                        promptLatex: `\\\\text{What value of r indicates no correlation?}`,
                        expressionLatex: `r = 0 = \\\\text{no correlation}`,
                        targetLatex: `r`,
                        slots: [{ id: "r", labelLatex: `r`, placeholder: "0", expected: 0 }],
                        correctLatex: `r = 0`,
                        hintLatex: [`\\\\text{No correlation} = 0`]
                    }
                );
            } else if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "C-C1", difficulty, stage, dataType: "interpret_r",
                        promptLatex: `\\\\text{r = 0.7. Is this positive or negative correlation?}`,
                        expressionLatex: `r > 0 = \\\\text{positive}`,
                        targetLatex: `\\\\text{Type}`,
                        slots: [{ id: "type", labelLatex: `\\\\text{Type}`, placeholder: "positive", expected: "positive" }],
                        correctLatex: `\\\\text{Positive}`,
                        hintLatex: [`\\\\text{Positive r = positive correlation}`]
                    },
                    {
                        id: "C-C2", difficulty, stage, dataType: "strength",
                        promptLatex: `\\\\text{r = 0.95. Is this strong or weak correlation?}`,
                        expressionLatex: `|r| \\\\text{ near } 1 = \\\\text{strong}`,
                        targetLatex: `\\\\text{Strength}`,
                        slots: [{ id: "strength", labelLatex: `\\\\text{Strength}`, placeholder: "strong", expected: "strong" }],
                        correctLatex: `\\\\text{Strong}`,
                        hintLatex: [`0.95 \\\\text{ is close to } 1`]
                    },
                    {
                        id: "C-C3", difficulty, stage, dataType: "weak",
                        promptLatex: `\\\\text{r = 0.15. Is this strong or weak correlation?}`,
                        expressionLatex: `|r| \\\\text{ near } 0 = \\\\text{weak}`,
                        targetLatex: `\\\\text{Strength}`,
                        slots: [{ id: "strength", labelLatex: `\\\\text{Strength}`, placeholder: "weak", expected: "weak" }],
                        correctLatex: `\\\\text{Weak}`,
                        hintLatex: [`0.15 \\\\text{ is close to } 0`]
                    },
                    {
                        id: "C-C4", difficulty, stage, dataType: "negative_strong",
                        promptLatex: `\\\\text{r = -0.85. What type and strength?}`,
                        expressionLatex: `r < 0, |r| \\\\text{ near } 1`,
                        targetLatex: `\\\\text{Description}`,
                        slots: [{ id: "desc", labelLatex: `\\\\text{Type}`, placeholder: "strong negative", expected: "strong negative" }],
                        correctLatex: `\\\\text{Strong negative}`,
                        hintLatex: [`\\\\text{Negative and close to } -1`]
                    },
                    {
                        id: "C-C5", difficulty, stage, dataType: "moderate",
                        promptLatex: `\\\\text{r = 0.5. Is this weak, moderate, or strong?}`,
                        expressionLatex: `0.3 < |r| < 0.7 = \\\\text{moderate}`,
                        targetLatex: `\\\\text{Strength}`,
                        slots: [{ id: "strength", labelLatex: `\\\\text{Strength}`, placeholder: "moderate", expected: "moderate" }],
                        correctLatex: `\\\\text{Moderate}`,
                        hintLatex: [`\\\\text{Middle range}`]
                    }
                );
            } else if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "C-A1", difficulty, stage, dataType: "causation",
                        promptLatex: `\\\\text{Ice cream sales and drowning both increase in summer. Does ice cream cause drowning?}`,
                        expressionLatex: `\\\\text{Correlation} \\neq \\\\text{Causation}`,
                        targetLatex: `\\\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\\\text{Cause?}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\\\text{No (both caused by hot weather)}`,
                        hintLatex: [`\\text{Correlation doesn't mean causation}`]
                    },
                    {
                        id: "C-A2", difficulty, stage, dataType: "coefficient",
                        promptLatex: `\\\\text{Correlation coefficient r = 0.9. Is this strong or weak?}`,
                        expressionLatex: `r \\\\text{ close to } 1 = \\\\text{strong}`,
                        targetLatex: `\\\\text{Strength}`,
                        slots: [{ id: "strength", labelLatex: `\\\\text{Strength}`, placeholder: "strong", expected: "strong" }],
                        correctLatex: `\\\\text{Strong positive}`,
                        hintLatex: [`r \\\\text{ near } 1 = \\\\text{strong positive}`]
                    },
                    {
                        id: "C-A3", difficulty, stage, dataType: "negative_r",
                        promptLatex: `\\\\text{Correlation coefficient r = -0.8. What type of correlation?}`,
                        expressionLatex: `r < 0 = \\\\text{negative}`,
                        targetLatex: `\\\\text{Type}`,
                        slots: [{ id: "type", labelLatex: `\\\\text{Type}`, placeholder: "negative", expected: "negative" }],
                        correctLatex: `\\\\text{Strong negative}`,
                        hintLatex: [`\\\\text{Negative } r = \\\\text{negative correlation}`]
                    },
                    {
                        id: "C-A4", difficulty, stage, dataType: "zero_r",
                        promptLatex: `\\\\text{Correlation coefficient r = 0.05. What does this mean?}`,
                        expressionLatex: `r \\approx 0 = \\\\text{no correlation}`,
                        targetLatex: `\\\\text{Meaning}`,
                        slots: [{ id: "meaning", labelLatex: `\\\\text{Meaning}`, placeholder: "none", expected: "none" }],
                        correctLatex: `\\\\text{No correlation}`,
                        hintLatex: [`r \\\\text{ near } 0 = \\\\text{no correlation}`]
                    },
                    {
                        id: "C-A5", difficulty, stage, dataType: "prediction",
                        promptLatex: `\\\\text{Strong positive correlation between hours studied and test score. Can we predict scores?}`,
                        expressionLatex: `\\\\text{Strong correlation allows prediction}`,
                        targetLatex: `\\\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\\\text{Predict?}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\\\text{Yes (with some error)}`,
                        hintLatex: [`\\\\text{Strong correlation enables prediction}`]
                    }
                );
            } else if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "C-E1", difficulty, stage, dataType: "confounding",
                        promptLatex: `\\\\text{Variable that affects both x and y, creating false correlation, is called what?}`,
                        expressionLatex: `\\\\text{Confounding variable}`,
                        targetLatex: `\\\\text{Term}`,
                        slots: [{ id: "term", labelLatex: `\\\\text{Term}`, placeholder: "confounding", expected: "confounding" }],
                        correctLatex: `\\\\text{Confounding variable}`,
                        hintLatex: [`\\\\text{Confounds = confuses the relationship}`]
                    },
                    {
                        id: "C-E2", difficulty, stage, dataType: "spurious",
                        promptLatex: `\\\\text{Correlation without causal relationship is called what?}`,
                        expressionLatex: `\\\\text{Spurious correlation}`,
                        targetLatex: `\\\\text{Term}`,
                        slots: [{ id: "term", labelLatex: `\\\\text{Term}`, placeholder: "spurious", expected: "spurious" }],
                        correctLatex: `\\\\text{Spurious correlation}`,
                        hintLatex: [`\\\\text{Spurious = false/misleading}`]
                    },
                    {
                        id: "C-E3", difficulty, stage, dataType: "pearson",
                        promptLatex: `\\\\text{Most common correlation coefficient is called what?}`,
                        expressionLatex: `\\text{Pearson's r}`,
                        targetLatex: `\\\\text{Name}`,
                        slots: [{ id: "name", labelLatex: `\\\\text{Name}`, placeholder: "Pearson", expected: "Pearson" }],
                        correctLatex: `\\\\text{Pearson correlation coefficient}`,
                        hintLatex: [`\\\\text{Named after Karl Pearson}`]
                    },
                    {
                        id: "C-E4", difficulty, stage, dataType: "assumptions",
                        promptLatex: `\\text{Pearson's r assumes what type of relationship?}`,
                        expressionLatex: `\\\\text{Assumes linear relationship}`,
                        targetLatex: `\\\\text{Type}`,
                        slots: [{ id: "type", labelLatex: `\\\\text{Type}`, placeholder: "linear", expected: "linear" }],
                        correctLatex: `\\\\text{Linear}`,
                        hintLatex: [`\\\\text{Straight line relationship}`]
                    },
                    {
                        id: "C-E5", difficulty, stage, dataType: "coefficient_determination",
                        promptLatex: `\\\\text{r² is called what?}`,
                        expressionLatex: `r^2 = \\\\text{coefficient of determination}`,
                        targetLatex: `\\\\text{Name}`,
                        slots: [{ id: "name", labelLatex: `\\\\text{Name}`, placeholder: "determination", expected: "determination" }],
                        correctLatex: `\\\\text{Coefficient of determination}`,
                        hintLatex: [`\\\\text{Determines percent of variation explained}`]
                    }
                );
            }
        }

        if (stage === "ELITE") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "ELITE-B1", difficulty, stage, dataType: "rhine_temp_fish",
                        promptLatex: `\\\\text{Basel Rhine River: summer temp } \\\\mu = 21.5°\\\\text{C, } \\\\sigma = 2.3°\\\\text{C (normal). Fish diversity correlates } r = -0.72. \\\\text{ Calculate } P(T > 24°\\\\text{C}).`,
                        expressionLatex: `z = \\\\frac{x - \\\\mu}{\\\\sigma}, \\\\text{ then use normal distribution}`,
                        targetLatex: `P(T > 24)`,
                        slots: [{ id: "prob", labelLatex: `P(T > 24)`, placeholder: "0.138", expected: 0.138 }],
                        correctLatex: `0.138 \\\\text{ or } 13.8\\\\%`,
                        hintLatex: [
                            `z = \\\\frac{24 - 21.5}{2.3} = 1.087`,
                            `P(z > 1.087) \\\\approx 0.138`,
                            `\\\\text{Strong negative correlation means higher temp reduces diversity}`
                        ]
                    },
                    {
                        id: "ELITE-B2", difficulty, stage, dataType: "park_biodiversity",
                        promptLatex: `\\\\text{Kannenfeldpark birds (n=20): mean=32, SD=4.2. Novartis Campus (n=20): mean=28, SD=3.8. Find lower bound of 95\\% CI for difference.}`,
                        expressionLatex: `\\\\text{SE}_{\\\\text{diff}} = \\\\sqrt{\\\\frac{s_1^2}{n_1} + \\\\frac{s_2^2}{n_2}}, \\\\text{ CI: diff } \\\\pm 1.96(\\\\text{SE})`,
                        targetLatex: `\\\\text{Lower bound}`,
                        slots: [{ id: "lower", labelLatex: `\\\\text{Lower}`, placeholder: "1.52", expected: 1.52 }],
                        correctLatex: `1.52 \\\\text{ species}`,
                        hintLatex: [
                            `\\\\text{Difference} = 32 - 28 = 4`,
                            `\\\\text{SE} = \\\\sqrt{\\\\frac{4.2^2}{20} + \\\\frac{3.8^2}{20}} = 1.267`,
                            `\\\\text{CI: } 4 \\\\pm 1.96(1.267) = (1.52, 6.48)`
                        ]
                    }
                );
            } else if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "ELITE-C1", difficulty, stage, dataType: "climate_trend",
                        promptLatex: `\\\\text{Basel temp: 9.2°C (1990) to 11.0°C (2024), 34 years. Growing season was 165 days (1990), increases 8 days per °C. Calculate 2024 growing season.}`,
                        expressionLatex: `\\\\text{Temp increase} \\\\times \\\\text{days per °C} + \\\\text{baseline}`,
                        targetLatex: `\\\\text{Days in 2024}`,
                        slots: [{ id: "days", labelLatex: `\\\\text{Days}`, placeholder: "179", expected: 179 }],
                        correctLatex: `179 \\\\text{ days}`,
                        hintLatex: [
                            `\\\\text{Temp increase} = 11.0 - 9.2 = 1.8°\\\\text{C}`,
                            `\\\\text{Growing season increase} = 1.8 \\\\times 8 = 14.4 \\\\text{ days}`,
                            `2024: 165 + 14.4 = 179.4 \\\\approx 179 \\\\text{ days}`
                        ]
                    },
                    {
                        id: "ELITE-C2", difficulty, stage, dataType: "fox_population",
                        promptLatex: `\\\\text{Basel urban fox: mean K=150, SD=18 (normal). Safe range: 120-180. Calculate } P(\\\\text{outside safe range}).`,
                        expressionLatex: `P(X < 120) + P(X > 180)`,
                        targetLatex: `P(\\\\text{outside})`,
                        slots: [{ id: "prob", labelLatex: `P(\\\\text{out})`, placeholder: "0.096", expected: 0.096 }],
                        correctLatex: `0.096 \\\\text{ or } 9.6\\\\%`,
                        hintLatex: [
                            `z_1 = \\\\frac{120-150}{18} = -1.667, P(X<120) = 0.048`,
                            `z_2 = \\\\frac{180-150}{18} = 1.667, P(X>180) = 0.048`,
                            `P(\\\\text{outside}) = 0.048 + 0.048 = 0.096`
                        ]
                    }
                );
            } else if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "ELITE-A1", difficulty, stage, dataType: "dissolved_oxygen",
                        promptLatex: `\\\\text{Rhine dissolved oxygen (n=25): mean=9.8 mg/L, SD=1.4. Fish need } \\\\geq 8.0 \\\\text{ mg/L. Find lower bound of 90\\% CI.}`,
                        expressionLatex: `\\\\text{SE} = \\\\frac{s}{\\\\sqrt{n}}, \\\\text{ 90\\% CI: } \\\\mu \\\\pm 1.645(\\\\text{SE})`,
                        targetLatex: `\\\\text{Lower bound}`,
                        slots: [{ id: "lower", labelLatex: `\\\\text{Lower}`, placeholder: "9.34", expected: 9.34 }],
                        correctLatex: `9.34 \\\\text{ mg/L}`,
                        hintLatex: [
                            `\\\\text{SE} = \\\\frac{1.4}{\\\\sqrt{25}} = \\\\frac{1.4}{5} = 0.28`,
                            `\\\\text{90\\% CI: } 9.8 \\\\pm 1.645(0.28) = 9.8 \\\\pm 0.461`,
                            `\\\\text{Lower bound} = 9.34 > 8.0 \\\\text{ (safe for fish)}`
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
    } = useQuestManager<SM210Quest, Stage>({
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
                    <div className="text-lg">
                        <InlineMath math={currentQuest.promptLatex} />
                    </div>
                    
                    <div className="text-purple-300">
                        <InlineMath math={currentQuest.expressionLatex} />
                    </div>

                    <div className="space-y-3">
                        {currentQuest.slots.map((slot) => (
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
