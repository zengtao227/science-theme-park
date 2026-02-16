"use client";

interface EntropyVisualizationProps {
    quest: any;
    stage: string;
}

export default function EntropyVisualization({ quest, stage }: EntropyVisualizationProps) {
    const canvasSize = 400;

    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900/50 rounded-xl p-4">
            <svg width={canvasSize} height={canvasSize} className="bg-black/30 rounded-lg">
                {stage === "ENTROPY_CONCEPT" && (
                    <>
                        <g>
                            {/* Ordered state (low entropy) */}
                            <g transform="translate(50, 80)">
                                <rect x={0} y={0} width={120} height={100} fill="none" stroke="#00e5ff" strokeWidth={2} rx={5} />
                                <text x={60} y={-10} textAnchor="middle" fill="#00e5ff" fontSize="12" fontWeight="bold">
                                    LOW ENTROPY
                                </text>
                                {/* Ordered particles in grid */}
                                {[0, 1, 2, 3].map(row =>
                                    [0, 1, 2, 3].map(col => (
                                        <circle
                                            key={`ordered-${row}-${col}`}
                                            cx={20 + col * 25}
                                            cy={20 + row * 20}
                                            r={4}
                                            fill="#4da6ff"
                                        />
                                    ))
                                )}
                                <text x={60} y={120} textAnchor="middle" fill="white" fontSize="10">
                                    Ordered (Ice)
                                </text>
                            </g>

                            {/* Arrow */}
                            <path d="M 180 130 L 220 130" stroke="#ffd93d" strokeWidth={3} markerEnd="url(#arrowEntropy)" />
                            <text x={200} y={120} textAnchor="middle" fill="#ffd93d" fontSize="11">
                                Heat
                            </text>

                            {/* Disordered state (high entropy) */}
                            <g transform="translate(230, 80)">
                                <rect x={0} y={0} width={120} height={100} fill="none" stroke="#ff3300" strokeWidth={2} rx={5} />
                                <text x={60} y={-10} textAnchor="middle" fill="#ff3300" fontSize="12" fontWeight="bold">
                                    HIGH ENTROPY
                                </text>
                                {/* Random particles */}
                                {[
                                    [15, 25], [45, 15], [75, 35], [95, 20],
                                    [25, 50], [55, 45], [85, 55], [105, 65],
                                    [20, 75], [50, 80], [80, 70], [100, 85],
                                    [35, 90], [65, 95], [90, 90], [110, 95]
                                ].map((pos, i) => (
                                    <circle
                                        key={`random-${i}`}
                                        cx={pos[0]}
                                        cy={pos[1]}
                                        r={4}
                                        fill="#ff6b6b"
                                    />
                                ))}
                                <text x={60} y={120} textAnchor="middle" fill="white" fontSize="10">
                                    Disordered (Water)
                                </text>
                            </g>

                            {/* Entropy formula */}
                            <g transform="translate(50, 220)">
                                <rect x={0} y={0} width={300} height={80} fill="none" stroke="#00e5ff" strokeWidth={1} opacity={0.3} />
                                <text x={150} y={25} textAnchor="middle" fill="#00e5ff" fontSize="13" fontWeight="bold">
                                    ENTROPY (S)
                                </text>
                                <text x={150} y={45} textAnchor="middle" fill="white" fontSize="11">
                                    Measure of disorder/randomness
                                </text>
                                <text x={150} y={65} textAnchor="middle" fill="#ffd93d" fontSize="10">
                                    ΔS = Q/T (for reversible processes)
                                </text>
                            </g>

                            {/* Phase transitions */}
                            <g transform="translate(50, 320)">
                                <text x={150} y={0} textAnchor="middle" fill="white" fontSize="11">
                                    Solid → Liquid → Gas
                                </text>
                                <text x={150} y={18} textAnchor="middle" fill="#ff6b6b" fontSize="10">
                                    Entropy INCREASES
                                </text>
                            </g>
                        </g>

                        <defs>
                            <marker id="arrowEntropy" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                <polygon points="0 0, 10 3, 0 6" fill="#ffd93d" />
                            </marker>
                        </defs>
                    </>
                )}

                {stage === "SECOND_LAW" && (
                    <>
                        <g>
                            {/* Second Law statement */}
                            <g transform="translate(50, 60)">
                                <rect x={0} y={0} width={300} height={60} fill="#1a1a2e" stroke="#00e5ff" strokeWidth={2} rx={5} />
                                <text x={150} y={25} textAnchor="middle" fill="#00e5ff" fontSize="13" fontWeight="bold">
                                    SECOND LAW OF THERMODYNAMICS
                                </text>
                                <text x={150} y={45} textAnchor="middle" fill="white" fontSize="11">
                                    ΔS_universe ≥ 0 (Entropy never decreases)
                                </text>
                            </g>

                            {/* Allowed process */}
                            <g transform="translate(50, 150)">
                                <rect x={0} y={0} width={130} height={100} fill="none" stroke="#00ff00" strokeWidth={2} rx={5} />
                                <text x={65} y={-10} textAnchor="middle" fill="#00ff00" fontSize="12" fontWeight="bold">
                                    ALLOWED ✓
                                </text>

                                {/* Hot to cold */}
                                <circle cx={30} cy={40} r={20} fill="#ff3300" opacity={0.7} />
                                <text x={30} y={45} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                                    HOT
                                </text>

                                <path d="M 55 40 L 75 40" stroke="#ffd93d" strokeWidth={3} markerEnd="url(#arrowHeat)" />
                                <text x={65} y={30} textAnchor="middle" fill="#ffd93d" fontSize="9">
                                    Heat
                                </text>

                                <circle cx={100} cy={40} r={20} fill="#0066ff" opacity={0.7} />
                                <text x={100} y={45} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                                    COLD
                                </text>

                                <text x={65} y={80} textAnchor="middle" fill="white" fontSize="9">
                                    Heat flows hot → cold
                                </text>
                                <text x={65} y={95} textAnchor="middle" fill="#00ff00" fontSize="9">
                                    ΔS &gt; 0 (Natural)
                                </text>
                            </g>

                            {/* Forbidden process */}
                            <g transform="translate(220, 150)">
                                <rect x={0} y={0} width={130} height={100} fill="none" stroke="#ff0000" strokeWidth={2} rx={5} />
                                <text x={65} y={-10} textAnchor="middle" fill="#ff0000" fontSize="12" fontWeight="bold">
                                    FORBIDDEN ✗
                                </text>

                                {/* Cold to hot (impossible) */}
                                <circle cx={30} cy={40} r={20} fill="#0066ff" opacity={0.7} />
                                <text x={30} y={45} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                                    COLD
                                </text>

                                <path d="M 55 40 L 75 40" stroke="#ff0000" strokeWidth={3} markerEnd="url(#arrowForbidden)" />
                                <text x={65} y={30} textAnchor="middle" fill="#ff0000" fontSize="9">
                                    Heat?
                                </text>

                                <circle cx={100} cy={40} r={20} fill="#ff3300" opacity={0.7} />
                                <text x={100} y={45} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                                    HOT
                                </text>

                                <text x={65} y={80} textAnchor="middle" fill="white" fontSize="9">
                                    Heat cold → hot?
                                </text>
                                <text x={65} y={95} textAnchor="middle" fill="#ff0000" fontSize="9">
                                    ΔS &lt; 0 (Impossible!)
                                </text>
                            </g>

                            {/* Isolated system */}
                            <g transform="translate(50, 280)">
                                <rect x={0} y={0} width={300} height={70} fill="none" stroke="#ffd93d" strokeWidth={1} opacity={0.5} />
                                <text x={150} y={25} textAnchor="middle" fill="#ffd93d" fontSize="12" fontWeight="bold">
                                    ISOLATED SYSTEM
                                </text>
                                <text x={150} y={45} textAnchor="middle" fill="white" fontSize="10">
                                    No energy exchange with surroundings
                                </text>
                                <text x={150} y={62} textAnchor="middle" fill="#00e5ff" fontSize="10">
                                    Entropy can only INCREASE or stay constant
                                </text>
                            </g>
                        </g>

                        <defs>
                            <marker id="arrowHeat" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                <polygon points="0 0, 10 3, 0 6" fill="#ffd93d" />
                            </marker>
                            <marker id="arrowForbidden" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                <polygon points="0 0, 10 3, 0 6" fill="#ff0000" />
                            </marker>
                        </defs>
                    </>
                )}

                {stage === "ARROW_OF_TIME" && (
                    <>
                        <g>
                            {/* Time arrow */}
                            <g transform="translate(50, 60)">
                                <rect x={0} y={0} width={300} height={50} fill="#1a1a2e" stroke="#00e5ff" strokeWidth={2} rx={5} />
                                <text x={150} y={25} textAnchor="middle" fill="#00e5ff" fontSize="13" fontWeight="bold">
                                    ARROW OF TIME
                                </text>
                                <text x={150} y={42} textAnchor="middle" fill="white" fontSize="10">
                                    Time flows in direction of increasing entropy
                                </text>
                            </g>

                            {/* Timeline */}
                            <g transform="translate(50, 140)">
                                <line x1={0} y1={50} x2={300} y2={50} stroke="white" strokeWidth={2} />
                                <path d="M 300 50 L 285 43 L 285 57 Z" fill="white" />
                                <text x={310} y={55} fill="white" fontSize="11" fontWeight="bold">
                                    TIME
                                </text>

                                {/* Past (ordered) */}
                                <g transform="translate(20, 0)">
                                    <text x={0} y={0} textAnchor="middle" fill="#4da6ff" fontSize="11" fontWeight="bold">
                                        PAST
                                    </text>
                                    <circle cx={0} cy={50} r={8} fill="#4da6ff" />
                                    <text x={0} y={80} textAnchor="middle" fill="white" fontSize="9">
                                        Low S
                                    </text>
                                    <text x={0} y={95} textAnchor="middle" fill="white" fontSize="8">
                                        (Ordered)
                                    </text>
                                </g>

                                {/* Present */}
                                <g transform="translate(150, 0)">
                                    <text x={0} y={0} textAnchor="middle" fill="#ffd93d" fontSize="11" fontWeight="bold">
                                        PRESENT
                                    </text>
                                    <circle cx={0} cy={50} r={8} fill="#ffd93d" />
                                    <text x={0} y={80} textAnchor="middle" fill="white" fontSize="9">
                                        Medium S
                                    </text>
                                </g>

                                {/* Future (disordered) */}
                                <g transform="translate(280, 0)">
                                    <text x={0} y={0} textAnchor="middle" fill="#ff3300" fontSize="11" fontWeight="bold">
                                        FUTURE
                                    </text>
                                    <circle cx={0} cy={50} r={8} fill="#ff3300" />
                                    <text x={0} y={80} textAnchor="middle" fill="white" fontSize="9">
                                        High S
                                    </text>
                                    <text x={0} y={95} textAnchor="middle" fill="white" fontSize="8">
                                        (Disordered)
                                    </text>
                                </g>
                            </g>

                            {/* Irreversible examples */}
                            <g transform="translate(50, 260)">
                                <rect x={0} y={0} width={300} height={100} fill="none" stroke="#ff6b6b" strokeWidth={1} opacity={0.3} />
                                <text x={150} y={20} textAnchor="middle" fill="#ff6b6b" fontSize="12" fontWeight="bold">
                                    IRREVERSIBLE PROCESSES
                                </text>
                                <text x={150} y={40} textAnchor="middle" fill="white" fontSize="10">
                                    • Glass shatters (can&apos;t spontaneously reassemble)
                                </text>
                                <text x={150} y={58} textAnchor="middle" fill="white" fontSize="10">
                                    • Milk mixes in coffee (can&apos;t unmix)
                                </text>
                                <text x={150} y={76} textAnchor="middle" fill="white" fontSize="10">
                                    • Heat flows hot → cold (never reverses)
                                </text>
                                <text x={150} y={94} textAnchor="middle" fill="#ffd93d" fontSize="9">
                                    All increase entropy (define time direction)
                                </text>
                            </g>
                        </g>
                    </>
                )}

                <text x={canvasSize / 2} y={25} textAnchor="middle" fill="#00e5ff" fontSize="16" fontWeight="bold">
                    {stage.replace(/_/g, ' ')}
                </text>
            </svg>
        </div>
    );
}
