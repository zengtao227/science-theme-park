"use client";

interface DataVisualizationProps {
    quest: any;
    stage: string;
}

export default function DataVisualization({ quest, stage }: DataVisualizationProps) {
    const canvasSize = 400;

    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900/50 rounded-xl p-4">
            <svg width={canvasSize} height={canvasSize} className="bg-black/30 rounded-lg">
                {stage === "BOX_PLOTS" && (
                    <>
                        <g>
                            {/* Box plot example */}
                            <g transform="translate(50, 80)">
                                <text x={150} y={0} textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">
                                    BOX PLOT (Box-and-Whisker)
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
                                    Min
                                </text>
                                <text x={110} y={75} textAnchor="middle" fill="#a78bfa" fontSize="9">
                                    Q₁
                                </text>
                                <text x={150} y={75} textAnchor="middle" fill="#ffd93d" fontSize="9" fontWeight="bold">
                                    Median
                                </text>
                                <text x={190} y={75} textAnchor="middle" fill="#a78bfa" fontSize="9">
                                    Q₃
                                </text>
                                <text x={230} y={75} textAnchor="middle" fill="#a78bfa" fontSize="9">
                                    Max
                                </text>
                                
                                {/* IQR bracket */}
                                <line x1={110} y1={130} x2={190} y2={130} stroke="#00e5ff" strokeWidth={1} strokeDasharray="2,2" />
                                <text x={150} y={145} textAnchor="middle" fill="#00e5ff" fontSize="9">
                                    IQR = Q₃ - Q₁
                                </text>
                            </g>

                            {/* Key concepts */}
                            <g transform="translate(50, 260)">
                                <rect x={0} y={0} width={300} height={100} fill="none" stroke="#a78bfa" strokeWidth={1} opacity={0.3} />
                                <text x={150} y={20} textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">
                                    KEY CONCEPTS
                                </text>
                                <text x={10} y={40} fill="white" fontSize="9">
                                    • Median: Middle value (50th percentile)
                                </text>
                                <text x={10} y={56} fill="white" fontSize="9">
                                    • Q₁: 25th percentile, Q₃: 75th percentile
                                </text>
                                <text x={10} y={72} fill="white" fontSize="9">
                                    • IQR: Spread of middle 50% of data
                                </text>
                                <text x={10} y={88} fill="white" fontSize="9">
                                    • Outliers: Values far from box (1.5×IQR)
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
                                    POSITIVE
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
                                    Both increase
                                </text>
                            </g>

                            {/* Negative correlation */}
                            <g transform="translate(160, 60)">
                                <text x={60} y={0} textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">
                                    NEGATIVE
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
                                    One up, one down
                                </text>
                            </g>

                            {/* No correlation */}
                            <g transform="translate(280, 60)">
                                <text x={60} y={0} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                                    NONE
                                </text>
                                
                                {/* Axes */}
                                <line x1={10} y1={90} x2={110} y2={90} stroke="white" strokeWidth={1} />
                                <line x1={10} y1={90} x2={10} y2={10} stroke="white" strokeWidth={1} />
                                
                                {/* Random points */}
                                {[[25, 30], [35, 70], [45, 40], [55, 60], [65, 25], [75, 75], [85, 45], [95, 55]].map((p, i) => (
                                    <circle key={i} cx={p[0]} cy={p[1]} r={3} fill="#94a3b8" opacity={0.7} />
                                ))}
                                
                                <text x={60} y={105} textAnchor="middle" fill="white" fontSize="8">
                                    No pattern
                                </text>
                            </g>

                            {/* Correlation strength */}
                            <g transform="translate(50, 200)">
                                <rect x={0} y={0} width={300} height={140} fill="none" stroke="#a78bfa" strokeWidth={1} opacity={0.3} />
                                <text x={150} y={20} textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">
                                    CORRELATION STRENGTH
                                </text>
                                
                                <text x={10} y={45} fill="#22c55e" fontSize="10" fontWeight="bold">
                                    Positive: Both variables increase together
                                </text>
                                <text x={10} y={60} fill="white" fontSize="8">
                                    Example: Study time ↑ → Test score ↑
                                </text>
                                
                                <text x={10} y={85} fill="#ef4444" fontSize="10" fontWeight="bold">
                                    Negative: One up, other down
                                </text>
                                <text x={10} y={100} fill="white" fontSize="8">
                                    Example: Temperature ↓ → Heating cost ↑
                                </text>
                                
                                <text x={10} y={125} fill="white" fontSize="9">
                                    Strong: Points close to line | Weak: Points scattered
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
                                    CORRELATION COEFFICIENT (r)
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
                                    INTERPRETING r
                                </text>
                                
                                <text x={10} y={40} fill="#22c55e" fontSize="9">
                                    r = 0.8 to 1.0: Strong positive
                                </text>
                                <text x={10} y={55} fill="#22c55e" fontSize="9">
                                    r = 0.5 to 0.8: Moderate positive
                                </text>
                                <text x={10} y={70} fill="#94a3b8" fontSize="9">
                                    r = -0.3 to 0.3: Weak/No correlation
                                </text>
                                <text x={10} y={85} fill="#ef4444" fontSize="9">
                                    r = -0.5 to -0.8: Moderate negative
                                </text>
                                <text x={10} y={100} fill="#ef4444" fontSize="9">
                                    r = -0.8 to -1.0: Strong negative
                                </text>
                                
                                <line x1={10} y1={110} x2={290} y2={110} stroke="white" strokeWidth={1} opacity={0.3} />
                                
                                <text x={150} y={128} textAnchor="middle" fill="#ffd93d" fontSize="9" fontWeight="bold">
                                    ⚠ Correlation ≠ Causation!
                                </text>
                            </g>
                        </g>
                    </>
                )}

                <text x={canvasSize / 2} y={25} textAnchor="middle" fill="#a78bfa" fontSize="16" fontWeight="bold">
                    {stage.replace(/_/g, ' ')}
                </text>
            </svg>
        </div>
    );
}
