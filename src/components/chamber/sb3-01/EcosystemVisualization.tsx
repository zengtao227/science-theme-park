"use client";

interface EcosystemVisualizationProps {
    quest: any;
    stage: string;
}

export default function EcosystemVisualization({ quest, stage }: EcosystemVisualizationProps) {
    const canvasSize = 400;

    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900/50 rounded-xl p-4">
            <svg width={canvasSize} height={canvasSize} className="bg-black/30 rounded-lg">
                {stage === "FOOD_CHAINS" && (
                    <>
                        <g>
                            {/* Sun */}
                            <circle cx={200} cy={40} r={25} fill="#ffd93d" opacity={0.8} />
                            <text x={200} y={45} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                                SUN
                            </text>

                            {/* Energy arrow down */}
                            <path d="M 200 70 L 200 110" stroke="#ffd93d" strokeWidth={3} markerEnd="url(#arrowSun)" />
                            <text x={220} y={95} fill="#ffd93d" fontSize="10">
                                100%
                            </text>

                            {/* Producer (Plants) */}
                            <rect x={150} y={120} width={100} height={50} fill="#22c55e" opacity={0.7} rx={5} />
                            <text x={200} y={145} textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
                                PRODUCERS
                            </text>
                            <text x={200} y={160} textAnchor="middle" fill="white" fontSize="9">
                                (Plants/Algae)
                            </text>

                            {/* Energy arrow */}
                            <path d="M 200 170 L 200 200" stroke="#00e5ff" strokeWidth={3} markerEnd="url(#arrowEnergy)" />
                            <text x={220} y={190} fill="#00e5ff" fontSize="10">
                                10%
                            </text>

                            {/* Primary Consumer */}
                            <rect x={150} y={210} width={100} height={50} fill="#3b82f6" opacity={0.7} rx={5} />
                            <text x={200} y={230} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                                PRIMARY
                            </text>
                            <text x={200} y={245} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                                CONSUMER
                            </text>
                            <text x={200} y={255} textAnchor="middle" fill="white" fontSize="8">
                                (Herbivores)
                            </text>

                            {/* Energy arrow */}
                            <path d="M 200 260 L 200 290" stroke="#00e5ff" strokeWidth={3} markerEnd="url(#arrowEnergy)" />
                            <text x={220} y={280} fill="#00e5ff" fontSize="10">
                                10%
                            </text>

                            {/* Secondary Consumer */}
                            <rect x={150} y={300} width={100} height={50} fill="#8b5cf6" opacity={0.7} rx={5} />
                            <text x={200} y={320} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                                SECONDARY
                            </text>
                            <text x={200} y={335} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                                CONSUMER
                            </text>
                            <text x={200} y={345} textAnchor="middle" fill="white" fontSize="8">
                                (Carnivores)
                            </text>

                            {/* Decomposers */}
                            <g transform="translate(280, 250)">
                                <circle cx={0} cy={0} r={40} fill="#78350f" opacity={0.6} />
                                <text x={0} y={-5} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                                    DECOMPOSERS
                                </text>
                                <text x={0} y={8} textAnchor="middle" fill="white" fontSize="8">
                                    (Bacteria/Fungi)
                                </text>
                            </g>

                            {/* Decomposer arrows */}
                            <path d="M 250 145 L 270 230" stroke="#78350f" strokeWidth={2} strokeDasharray="3,3" />
                            <path d="M 250 235 L 270 245" stroke="#78350f" strokeWidth={2} strokeDasharray="3,3" />
                            <path d="M 250 325 L 270 270" stroke="#78350f" strokeWidth={2} strokeDasharray="3,3" />
                        </g>

                        <defs>
                            <marker id="arrowSun" markerWidth="10" markerHeight="10" refX="5" refY="9" orient="auto">
                                <polygon points="0 0, 10 0, 5 10" fill="#ffd93d" />
                            </marker>
                            <marker id="arrowEnergy" markerWidth="10" markerHeight="10" refX="5" refY="9" orient="auto">
                                <polygon points="0 0, 10 0, 5 10" fill="#00e5ff" />
                            </marker>
                        </defs>
                    </>
                )}

                {stage === "NUTRIENT_CYCLES" && (
                    <>
                        <g>
                            {/* Carbon Cycle */}
                            <g transform="translate(50, 80)">
                                <text x={100} y={0} textAnchor="middle" fill="#00e5ff" fontSize="14" fontWeight="bold">
                                    CARBON CYCLE
                                </text>

                                {/* Atmosphere CO2 */}
                                <rect x={60} y={20} width={80} height={40} fill="#3b82f6" opacity={0.6} rx={5} />
                                <text x={100} y={40} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                                    CO₂ in Air
                                </text>

                                {/* Photosynthesis arrow down */}
                                <path d="M 80 60 L 60 100" stroke="#22c55e" strokeWidth={2} markerEnd="url(#arrowPhoto)" />
                                <text x={50} y={85} fill="#22c55e" fontSize="8">
                                    Photo
                                </text>

                                {/* Plants */}
                                <rect x={20} y={110} width={60} height={35} fill="#22c55e" opacity={0.7} rx={5} />
                                <text x={50} y={130} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                                    Plants
                                </text>

                                {/* Respiration arrow up */}
                                <path d="M 120 60 L 140 100" stroke="#ff6b6b" strokeWidth={2} markerEnd="url(#arrowResp)" />
                                <text x={145} y={85} fill="#ff6b6b" fontSize="8">
                                    Resp
                                </text>

                                {/* Animals */}
                                <rect x={120} y={110} width={60} height={35} fill="#f59e0b" opacity={0.7} rx={5} />
                                <text x={150} y={130} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                                    Animals
                                </text>

                                {/* Eating arrow */}
                                <path d="M 80 127 L 120 127" stroke="white" strokeWidth={2} markerEnd="url(#arrowEat)" />
                                <text x={100} y={120} textAnchor="middle" fill="white" fontSize="7">
                                    eat
                                </text>

                                {/* Decomposition */}
                                <ellipse cx={100} cy={170} rx={50} ry={20} fill="#78350f" opacity={0.6} />
                                <text x={100} y={175} textAnchor="middle" fill="white" fontSize="9">
                                    Decomposers
                                </text>

                                {/* Arrows to decomposers */}
                                <path d="M 50 145 L 70 155" stroke="#78350f" strokeWidth={1.5} strokeDasharray="2,2" />
                                <path d="M 150 145 L 130 155" stroke="#78350f" strokeWidth={1.5} strokeDasharray="2,2" />
                            </g>

                            {/* Nitrogen Cycle */}
                            <g transform="translate(250, 80)">
                                <text x={50} y={0} textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">
                                    N CYCLE
                                </text>

                                {/* N2 in air */}
                                <rect x={10} y={20} width={80} height={35} fill="#6366f1" opacity={0.6} rx={5} />
                                <text x={50} y={40} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                                    N₂ (78%)
                                </text>

                                {/* Fixation */}
                                <path d="M 50 55 L 50 85" stroke="#22c55e" strokeWidth={2} markerEnd="url(#arrowFix)" />
                                <text x={60} y={75} fill="#22c55e" fontSize="7">
                                    Fix
                                </text>

                                {/* Nitrate */}
                                <rect x={10} y={95} width={80} height={35} fill="#22c55e" opacity={0.7} rx={5} />
                                <text x={50} y={110} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                                    NO₃⁻
                                </text>
                                <text x={50} y={122} textAnchor="middle" fill="white" fontSize="7">
                                    (Nitrate)
                                </text>

                                {/* Denitrification */}
                                <path d="M 30 95 L 30 60" stroke="#ff6b6b" strokeWidth={2} markerEnd="url(#arrowDenit)" />
                                <text x={15} y={80} fill="#ff6b6b" fontSize="7">
                                    Denit
                                </text>

                                {/* Plants uptake */}
                                <text x={50} y={150} textAnchor="middle" fill="white" fontSize="8">
                                    ↓ Plants
                                </text>
                            </g>

                            {/* Water Cycle */}
                            <g transform="translate(50, 260)">
                                <text x={150} y={0} textAnchor="middle" fill="#00e5ff" fontSize="14" fontWeight="bold">
                                    WATER CYCLE
                                </text>

                                {/* Cloud */}
                                <ellipse cx={150} cy={30} rx={40} ry={20} fill="#94a3b8" opacity={0.7} />
                                <text x={150} y={35} textAnchor="middle" fill="white" fontSize="10">
                                    Clouds
                                </text>

                                {/* Precipitation */}
                                <path d="M 140 50 L 130 80" stroke="#00e5ff" strokeWidth={2} />
                                <path d="M 150 50 L 150 80" stroke="#00e5ff" strokeWidth={2} />
                                <path d="M 160 50 L 170 80" stroke="#00e5ff" strokeWidth={2} />
                                <text x={180} y={70} fill="#00e5ff" fontSize="8">
                                    Rain
                                </text>

                                {/* Water body */}
                                <rect x={100} y={90} width={100} height={30} fill="#3b82f6" opacity={0.7} rx={5} />
                                <text x={150} y={108} textAnchor="middle" fill="white" fontSize="10">
                                    Rhine River
                                </text>

                                {/* Evaporation */}
                                <path d="M 170 90 L 165 55" stroke="#ffd93d" strokeWidth={2} markerEnd="url(#arrowEvap)" />
                                <text x={175} y={75} fill="#ffd93d" fontSize="8">
                                    Evap
                                </text>
                            </g>
                        </g>

                        <defs>
                            <marker id="arrowPhoto" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto">
                                <polygon points="0 0, 8 0, 4 8" fill="#22c55e" />
                            </marker>
                            <marker id="arrowResp" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto">
                                <polygon points="0 0, 8 0, 4 8" fill="#ff6b6b" />
                            </marker>
                            <marker id="arrowEat" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                                <polygon points="0 0, 8 3, 0 6" fill="white" />
                            </marker>
                            <marker id="arrowFix" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto">
                                <polygon points="0 0, 8 0, 4 8" fill="#22c55e" />
                            </marker>
                            <marker id="arrowDenit" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto">
                                <polygon points="0 0, 8 0, 4 8" fill="#ff6b6b" />
                            </marker>
                            <marker id="arrowEvap" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto">
                                <polygon points="0 0, 8 0, 4 8" fill="#ffd93d" />
                            </marker>
                        </defs>
                    </>
                )}

                {stage === "POPULATION_DYNAMICS" && (
                    <>
                        <g>
                            {/* Population growth curve */}
                            <g transform="translate(50, 50)">
                                {/* Axes */}
                                <line x1={0} y1={250} x2={300} y2={250} stroke="white" strokeWidth={2} />
                                <line x1={0} y1={250} x2={0} y2={50} stroke="white" strokeWidth={2} />
                                
                                <text x={150} y={280} textAnchor="middle" fill="white" fontSize="12">
                                    Time
                                </text>
                                <text x={-30} y={150} textAnchor="middle" fill="white" fontSize="12" transform="rotate(-90, -30, 150)">
                                    Population
                                </text>

                                {/* Carrying capacity line */}
                                <line x1={0} y1={100} x2={300} y2={100} stroke="#ffd93d" strokeWidth={2} strokeDasharray="5,5" />
                                <text x={310} y={105} fill="#ffd93d" fontSize="11" fontWeight="bold">
                                    K
                                </text>
                                <text x={200} y={90} fill="#ffd93d" fontSize="9">
                                    Carrying Capacity
                                </text>

                                {/* S-curve (logistic growth) */}
                                <path 
                                    d="M 0 240 Q 50 230 75 200 T 150 120 T 250 100 L 300 100" 
                                    stroke="#00e5ff" 
                                    strokeWidth={3} 
                                    fill="none"
                                />

                                {/* Growth phases */}
                                <text x={40} y={270} fill="#22c55e" fontSize="9">
                                    Lag
                                </text>
                                <text x={100} y={270} fill="#22c55e" fontSize="9">
                                    Exponential
                                </text>
                                <text x={200} y={270} fill="#f59e0b" fontSize="9">
                                    Plateau
                                </text>

                                {/* Limiting factors */}
                                <g transform="translate(20, 20)">
                                    <text x={0} y={0} fill="white" fontSize="10" fontWeight="bold">
                                        Limiting Factors:
                                    </text>
                                    <text x={0} y={15} fill="#ff6b6b" fontSize="8">
                                        • Food shortage
                                    </text>
                                    <text x={0} y={28} fill="#ff6b6b" fontSize="8">
                                        • Disease
                                    </text>
                                    <text x={0} y={41} fill="#ff6b6b" fontSize="8">
                                        • Predation
                                    </text>
                                </g>
                            </g>

                            {/* Predator-Prey cycle */}
                            <g transform="translate(50, 320)">
                                <text x={0} y={0} fill="white" fontSize="11" fontWeight="bold">
                                    Predator-Prey Cycle:
                                </text>
                                <circle cx={50} cy={20} r={8} fill="#3b82f6" opacity={0.7} />
                                <text x={65} y={25} fill="white" fontSize="9">
                                    Prey ↑ → Predator ↑
                                </text>
                                <circle cx={200} cy={20} r={8} fill="#ef4444" opacity={0.7} />
                                <text x={215} y={25} fill="white" fontSize="9">
                                    Predator ↑ → Prey ↓
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
