"use client";

import { useLanguage } from "@/lib/i18n";

interface DataVisualizationProps {
    quest: any;
    stage: string;
}

export default function DataVisualization({ quest, stage }: DataVisualizationProps) {
    void quest;
    const canvasSize = 400;
    const { currentLanguage, t } = useLanguage();

    const copy =
        currentLanguage === "CN"
            ? {
                boxPlot: "箱线图 (Box-and-Whisker)",
                keyConcepts: "关键概念",
                medianMiddle: "中位数：中间值（第50百分位）",
                quartiles: "Q1: 第25百分位, Q3: 第75百分位",
                iqrSpread: "IQR: 中间50%的数据离散程度",
                outlierRule: "异常值：距离箱体超过 1.5×IQR",
                iqrFormula: "IQR = Q_3 - Q_1",
                positive: "正相关",
                negative: "负相关",
                none: "无相关",
                bothIncrease: "两者同时上升",
                oneUpOneDown: "一个上升，一个下降",
                noPattern: "无明显模式",
                corrStrength: "相关强度",
                corrStrongWeak: "强：点靠近直线 | 弱：点更分散",
                corrCoeff: "相关系数 (r)",
                interpretingR: "r 的解释",
                strongPos: "r = 0.8 到 1.0：强正相关",
                moderatePos: "r = 0.5 到 0.8：中等正相关",
                weakNone: "r = -0.3 到 0.3：弱/无相关",
                moderateNeg: "r = -0.5 到 -0.8：中等负相关",
                strongNeg: "r = -0.8 到 -1.0：强负相关",
                warning: "相关不等于因果！",
                eliteTitle: "精英分析流程",
                eliteStep1: "1. 标准化：z = (x - μ) / σ",
                eliteStep2: "2. 区间估计：CI = x̄ ± z*SE",
                eliteStep3: "3. 相关诊断：识别混淆变量",
                eliteStep4: "4. 解释结论：区分相关与因果",
                eliteGoal: "目标：将统计结论转化为可执行决策",
            }
            : currentLanguage === "DE"
                ? {
                    boxPlot: "BOXPLOT (Box-and-Whisker)",
                    keyConcepts: "SCHLÜSSELKONZEPTE",
                    medianMiddle: "Median: Mittlerer Wert (50. Perzentil)",
                    quartiles: "Q1: 25. Perzentil, Q3: 75. Perzentil",
                    iqrSpread: "IQR: Streuung der mittleren 50%",
                    outlierRule: "Ausreißer: weiter als 1.5×IQR von der Box",
                    iqrFormula: "IQR = Q_3 - Q_1",
                    positive: "POSITIV",
                    negative: "NEGATIV",
                    none: "KEINE",
                    bothIncrease: "Beide steigen",
                    oneUpOneDown: "Eins hoch, eins runter",
                    noPattern: "Kein Muster",
                    corrStrength: "KORRELATIONSSTÄRKE",
                    corrStrongWeak: "Stark: Punkte nahe Linie | Schwach: stärker gestreut",
                    corrCoeff: "KORRELATIONSKOEFFIZIENT (r)",
                    interpretingR: "INTERPRETATION VON r",
                    strongPos: "r = 0.8 bis 1.0: Stark positiv",
                    moderatePos: "r = 0.5 bis 0.8: Mäßig positiv",
                    weakNone: "r = -0.3 bis 0.3: Schwach/keine Korrelation",
                    moderateNeg: "r = -0.5 bis -0.8: Mäßig negativ",
                    strongNeg: "r = -0.8 bis -1.0: Stark negativ",
                    warning: "Korrelation ist nicht Kausalität!",
                    eliteTitle: "ELITE-ANALYSE-PIPELINE",
                    eliteStep1: "1. Standardisierung: z = (x - μ) / σ",
                    eliteStep2: "2. Intervallschätzung: KI = x̄ ± z*SE",
                    eliteStep3: "3. Korrelationsdiagnostik: Störvariablen prüfen",
                    eliteStep4: "4. Schlussfolgerung: Korrelation von Kausalität trennen",
                    eliteGoal: "Ziel: Statistik in belastbare Entscheidungen überführen",
                }
                : {
                    boxPlot: "BOX PLOT (Box-and-Whisker)",
                    keyConcepts: "KEY CONCEPTS",
                    medianMiddle: "Median: Middle value (50th percentile)",
                    quartiles: "Q1: 25th percentile, Q3: 75th percentile",
                    iqrSpread: "IQR: Spread of the middle 50%",
                    outlierRule: "Outliers: farther than 1.5×IQR from the box",
                    iqrFormula: "IQR = Q_3 - Q_1",
                    positive: "POSITIVE",
                    negative: "NEGATIVE",
                    none: "NONE",
                    bothIncrease: "Both increase",
                    oneUpOneDown: "One up, one down",
                    noPattern: "No pattern",
                    corrStrength: "CORRELATION STRENGTH",
                    corrStrongWeak: "Strong: points near a line | Weak: points scattered",
                    corrCoeff: "CORRELATION COEFFICIENT (r)",
                    interpretingR: "INTERPRETING r",
                    strongPos: "r = 0.8 to 1.0: Strong positive",
                    moderatePos: "r = 0.5 to 0.8: Moderate positive",
                    weakNone: "r = -0.3 to 0.3: Weak/No correlation",
                    moderateNeg: "r = -0.5 to -0.8: Moderate negative",
                    strongNeg: "r = -0.8 to -1.0: Strong negative",
                    warning: "Correlation does not imply causation!",
                    eliteTitle: "ELITE ANALYSIS PIPELINE",
                    eliteStep1: "1. Standardize: z = (x - μ) / σ",
                    eliteStep2: "2. Interval estimate: CI = x̄ ± z*SE",
                    eliteStep3: "3. Correlation diagnostics: check confounders",
                    eliteStep4: "4. Interpret outcome: separate correlation from causation",
                    eliteGoal: "Goal: turn statistical evidence into actionable decisions",
                };

    const stageTitle =
        stage === "BOX_PLOTS"
            ? t("sm2_10.stages.box_plots")
            : stage === "SCATTER_PLOTS"
                ? t("sm2_10.stages.scatter_plots")
                : stage === "CORRELATION"
                    ? t("sm2_10.stages.correlation")
                    : t("sm2_10.stages.elite");

    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900/50 rounded-xl p-4">
            <svg width={canvasSize} height={canvasSize} className="bg-black/30 rounded-lg">
                {stage === "BOX_PLOTS" && (
                    <>
                        <g>
                            {/* Box plot example */}
                            <g transform="translate(50, 80)">
                                <text x={150} y={0} textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">
                                    {copy.boxPlot}
                                </text>
                                
                                {/* Number line */}
                                <line x1={50} y1={150} x2={250} y2={150} stroke="white" strokeWidth={2} />
                                {[0, 5, 10, 15, 20, 25, 30].map((val, i) => (
                                    <g key={i}>
                                        <line x1={50 + i * 33.3} y1={145} x2={50 + i * 33.3} y2={155} stroke="white" strokeWidth={1} />
                                        <text x={50 + i * 33.3} y={170} textAnchor="middle" fill="white" fontSize="9">
                                            {val}
                                        </text>
                                    </g>
                                ))}
                                
                                {/* Whisker (Min to Q1) */}
                                <line x1={70} y1={100} x2={110} y2={100} stroke="#a78bfa" strokeWidth={2} />
                                <line x1={70} y1={90} x2={70} y2={110} stroke="#a78bfa" strokeWidth={2} />
                                
                                {/* Box (Q1 to Q3) */}
                                <rect x={110} y={80} width={80} height={40} fill="#a78bfa" opacity={0.3} stroke="#a78bfa" strokeWidth={2} />
                                
                                {/* Median line */}
                                <line x1={150} y1={80} x2={150} y2={120} stroke="#ffd93d" strokeWidth={3} />
                                
                                {/* Whisker (Q3 to Max) */}
                                <line x1={190} y1={100} x2={230} y2={100} stroke="#a78bfa" strokeWidth={2} />
                                <line x1={230} y1={90} x2={230} y2={110} stroke="#a78bfa" strokeWidth={2} />
                                
                                {/* Labels */}
                                <text x={70} y={75} textAnchor="middle" fill="#a78bfa" fontSize="9">
                                    {t("sm2_10.labels.min")}
                                </text>
                                <text x={110} y={75} textAnchor="middle" fill="#a78bfa" fontSize="9">
                                    Q_1
                                </text>
                                <text x={150} y={75} textAnchor="middle" fill="#ffd93d" fontSize="9" fontWeight="bold">
                                    {t("sm2_10.labels.median")}
                                </text>
                                <text x={190} y={75} textAnchor="middle" fill="#a78bfa" fontSize="9">
                                    Q_3
                                </text>
                                <text x={230} y={75} textAnchor="middle" fill="#a78bfa" fontSize="9">
                                    {t("sm2_10.labels.max")}
                                </text>
                                
                                {/* IQR bracket */}
                                <line x1={110} y1={130} x2={190} y2={130} stroke="#00e5ff" strokeWidth={1} strokeDasharray="2,2" />
                                <text x={150} y={145} textAnchor="middle" fill="#00e5ff" fontSize="9">
                                    {copy.iqrFormula}
                                </text>
                            </g>

                            {/* Key concepts */}
                            <g transform="translate(50, 260)">
                                <rect x={0} y={0} width={300} height={100} fill="none" stroke="#a78bfa" strokeWidth={1} opacity={0.3} />
                                <text x={150} y={20} textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">
                                    {copy.keyConcepts}
                                </text>
                                <text x={10} y={40} fill="white" fontSize="9">
                                    • {copy.medianMiddle}
                                </text>
                                <text x={10} y={56} fill="white" fontSize="9">
                                    • {copy.quartiles}
                                </text>
                                <text x={10} y={72} fill="white" fontSize="9">
                                    • {copy.iqrSpread}
                                </text>
                                <text x={10} y={88} fill="white" fontSize="9">
                                    • {copy.outlierRule}
                                </text>
                            </g>
                        </g>
                    </>
                )}

                {stage === "SCATTER_PLOTS" && (
                    <>
                        <g>
                            {/* Positive correlation */}
                            <g transform="translate(40, 60)">
                                <text x={60} y={0} textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">
                                    {copy.positive}
                                </text>
                                
                                {/* Axes */}
                                <line x1={10} y1={90} x2={110} y2={90} stroke="white" strokeWidth={1} />
                                <line x1={10} y1={90} x2={10} y2={10} stroke="white" strokeWidth={1} />
                                
                                {/* Points with upward trend */}
                                {[[20, 75], [30, 65], [40, 55], [50, 50], [60, 40], [70, 30], [80, 25], [90, 20]].map((p, i) => (
                                    <circle key={i} cx={p[0]} cy={p[1]} r={3} fill="#22c55e" opacity={0.7} />
                                ))}
                                
                                {/* Trend line */}
                                <line x1={15} y1={80} x2={95} y2={15} stroke="#22c55e" strokeWidth={2} strokeDasharray="3,3" />
                                
                                <text x={60} y={105} textAnchor="middle" fill="white" fontSize="8">
                                    {copy.bothIncrease}
                                </text>
                            </g>

                            {/* Negative correlation */}
                            <g transform="translate(160, 60)">
                                <text x={60} y={0} textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">
                                    {copy.negative}
                                </text>
                                
                                {/* Axes */}
                                <line x1={10} y1={90} x2={110} y2={90} stroke="white" strokeWidth={1} />
                                <line x1={10} y1={90} x2={10} y2={10} stroke="white" strokeWidth={1} />
                                
                                {/* Points with downward trend */}
                                {[[20, 20], [30, 25], [40, 35], [50, 45], [60, 55], [70, 65], [80, 70], [90, 80]].map((p, i) => (
                                    <circle key={i} cx={p[0]} cy={p[1]} r={3} fill="#ef4444" opacity={0.7} />
                                ))}
                                
                                {/* Trend line */}
                                <line x1={15} y1={15} x2={95} y2={85} stroke="#ef4444" strokeWidth={2} strokeDasharray="3,3" />
                                
                                <text x={60} y={105} textAnchor="middle" fill="white" fontSize="8">
                                    {copy.oneUpOneDown}
                                </text>
                            </g>

                            {/* No correlation */}
                            <g transform="translate(280, 60)">
                                <text x={60} y={0} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                                    {copy.none}
                                </text>
                                
                                {/* Axes */}
                                <line x1={10} y1={90} x2={110} y2={90} stroke="white" strokeWidth={1} />
                                <line x1={10} y1={90} x2={10} y2={10} stroke="white" strokeWidth={1} />
                                
                                {/* Random points */}
                                {[[25, 30], [35, 70], [45, 40], [55, 60], [65, 25], [75, 75], [85, 45], [95, 55]].map((p, i) => (
                                    <circle key={i} cx={p[0]} cy={p[1]} r={3} fill="#94a3b8" opacity={0.7} />
                                ))}
                                
                                <text x={60} y={105} textAnchor="middle" fill="white" fontSize="8">
                                    {copy.noPattern}
                                </text>
                            </g>

                            {/* Correlation strength */}
                            <g transform="translate(50, 200)">
                                <rect x={0} y={0} width={300} height={140} fill="none" stroke="#a78bfa" strokeWidth={1} opacity={0.3} />
                                <text x={150} y={20} textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">
                                    {copy.corrStrength}
                                </text>

                                <text x={10} y={50} fill="#22c55e" fontSize="10" fontWeight="bold">
                                    {copy.positive}: {copy.bothIncrease}
                                </text>
                                <text x={10} y={75} fill="#ef4444" fontSize="10" fontWeight="bold">
                                    {copy.negative}: {copy.oneUpOneDown}
                                </text>
                                <text x={10} y={100} fill="#94a3b8" fontSize="10" fontWeight="bold">
                                    {copy.none}: {copy.noPattern}
                                </text>
                                <text x={10} y={125} fill="white" fontSize="9">
                                    {copy.corrStrongWeak}
                                </text>
                            </g>
                        </g>
                    </>
                )}

                {stage === "CORRELATION" && (
                    <>
                        <g>
                            {/* Correlation coefficient scale */}
                            <g transform="translate(50, 80)">
                                <text x={150} y={0} textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">
                                    {copy.corrCoeff}
                                </text>
                                
                                {/* Scale line */}
                                <defs>
                                    <linearGradient id="corrGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#ef4444" />
                                        <stop offset="50%" stopColor="#94a3b8" />
                                        <stop offset="100%" stopColor="#22c55e" />
                                    </linearGradient>
                                </defs>
                                
                                <rect x={50} y={30} width={200} height={20} fill="url(#corrGradient)" rx={5} />
                                
                                {/* Markers */}
                                <line x1={50} y1={55} x2={50} y2={65} stroke="white" strokeWidth={2} />
                                <text x={50} y={75} textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">
                                    -1
                                </text>
                                <text x={50} y={88} textAnchor="middle" fill="white" fontSize="8">
                                    Perfect
                                </text>
                                <text x={50} y={98} textAnchor="middle" fill="white" fontSize="8">
                                    Negative
                                </text>
                                
                                <line x1={150} y1={55} x2={150} y2={65} stroke="white" strokeWidth={2} />
                                <text x={150} y={75} textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
                                    0
                                </text>
                                <text x={150} y={88} textAnchor="middle" fill="white" fontSize="8">
                                    No
                                </text>
                                <text x={150} y={98} textAnchor="middle" fill="white" fontSize="8">
                                    Correlation
                                </text>
                                
                                <line x1={250} y1={55} x2={250} y2={65} stroke="white" strokeWidth={2} />
                                <text x={250} y={75} textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">
                                    +1
                                </text>
                                <text x={250} y={88} textAnchor="middle" fill="white" fontSize="8">
                                    Perfect
                                </text>
                                <text x={250} y={98} textAnchor="middle" fill="white" fontSize="8">
                                    Positive
                                </text>
                            </g>

                            {/* Interpretation guide */}
                            <g transform="translate(50, 200)">
                                <rect x={0} y={0} width={300} height={140} fill="none" stroke="#a78bfa" strokeWidth={1} opacity={0.3} />
                                <text x={150} y={20} textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">
                                    {copy.interpretingR}
                                </text>
                                
                                <text x={10} y={40} fill="#22c55e" fontSize="9">
                                    {copy.strongPos}
                                </text>
                                <text x={10} y={55} fill="#22c55e" fontSize="9">
                                    {copy.moderatePos}
                                </text>
                                <text x={10} y={70} fill="#94a3b8" fontSize="9">
                                    {copy.weakNone}
                                </text>
                                <text x={10} y={85} fill="#ef4444" fontSize="9">
                                    {copy.moderateNeg}
                                </text>
                                <text x={10} y={100} fill="#ef4444" fontSize="9">
                                    {copy.strongNeg}
                                </text>
                                
                                <line x1={10} y1={110} x2={290} y2={110} stroke="white" strokeWidth={1} opacity={0.3} />
                                
                                <text x={150} y={128} textAnchor="middle" fill="#ffd93d" fontSize="9" fontWeight="bold">
                                    {copy.warning}
                                </text>
                            </g>
                        </g>
                    </>
                )}

                {stage === "ELITE" && (
                    <g transform="translate(30, 70)">
                        <rect x={0} y={0} width={340} height={270} fill="none" stroke="#a78bfa" strokeWidth={1.5} opacity={0.6} />
                        <text x={170} y={24} textAnchor="middle" fill="#a78bfa" fontSize="13" fontWeight="bold">
                            {copy.eliteTitle}
                        </text>

                        <text x={16} y={62} fill="white" fontSize="10">{copy.eliteStep1}</text>
                        <text x={16} y={98} fill="white" fontSize="10">{copy.eliteStep2}</text>
                        <text x={16} y={134} fill="white" fontSize="10">{copy.eliteStep3}</text>
                        <text x={16} y={170} fill="white" fontSize="10">{copy.eliteStep4}</text>

                        <line x1={16} y1={190} x2={324} y2={190} stroke="#a78bfa" strokeWidth={1} opacity={0.5} />
                        <text x={16} y={220} fill="#ffd93d" fontSize="10" fontWeight="bold">{copy.eliteGoal}</text>
                    </g>
                )}

                <text x={canvasSize / 2} y={25} textAnchor="middle" fill="#a78bfa" fontSize="16" fontWeight="bold">
                    {stageTitle}
                </text>
            </svg>
        </div>
    );
}
