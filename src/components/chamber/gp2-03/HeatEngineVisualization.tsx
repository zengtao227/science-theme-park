"use client";

interface HeatEngineVisualizationProps {
    quest: any;
    stage: string;
}

export default function HeatEngineVisualization({ quest, stage }: HeatEngineVisualizationProps) {
    const canvasSize = 400;

    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900/50 rounded-xl p-4">
            <svg width={canvasSize} height={canvasSize} className="bg-black/30 rounded-lg">
                {stage === "EFFICIENCY" && (
                    <>
                        <g>
                            {/* Hot reservoir */}
                            <rect x={120} y={50} width={160} height={40} fill="#ff3300" opacity={0.7} rx={5} />
                            <text x={200} y={75} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                                HOT (Qₕ)
                            </text>
                            
                            {/* Heat flow in */}
                            <path d="M 200 90 L 200 130" stroke="#ff6b6b" strokeWidth={4} markerEnd="url(#arrowQh)" />
                            <text x={220} y={115} fill="#ff6b6b" fontSize="11">Qₕ = 1000 J</text>
                            
                            {/* Engine */}
                            <rect x={150} y={140} width={100} height={80} fill="#4a5568" stroke="#00e5ff" strokeWidth={3} rx={5} />
                            <text x={200} y={170} textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                                ENGINE
                            </text>
                            <text x={200} y={195} textAnchor="middle" fill="#ffd93d" fontSize="12">
                                η = W/Qₕ
                            </text>
                            <text x={200} y={210} textAnchor="middle" fill="#00e5ff" fontSize="11">
                                = 300/1000
                            </text>
                            
                            {/* Work output */}
                            <path d="M 250 180 L 310 180" stroke="#ffd93d" strokeWidth={4} markerEnd="url(#arrowW)" />
                            <text x={320} y={185} fill="#ffd93d" fontSize="12" fontWeight="bold">W = 300 J</text>
                            
                            {/* Heat flow out */}
                            <path d="M 200 220 L 200 260" stroke="#4da6ff" strokeWidth={4} markerEnd="url(#arrowQc)" />
                            <text x={220} y={245} fill="#4da6ff" fontSize="11">Qc = 700 J</text>
                            
                            {/* Cold reservoir */}
                            <rect x={120} y={270} width={160} height={40} fill="#0066ff" opacity={0.7} rx={5} />
                            <text x={200} y={295} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                                COLD (Qc)
                            </text>
                            
                            {/* Efficiency box */}
                            <g transform="translate(50, 330)">
                                <text x={150} y={0} textAnchor="middle" fill="#00e5ff" fontSize="14" fontWeight="bold">
                                    η = 30% (Efficiency)
                                </text>
                                <text x={150} y={20} textAnchor="middle" fill="white" fontSize="10">
                                    70% wasted as heat
                                </text>
                            </g>
                        </g>
                        
                        <defs>
                            <marker id="arrowQh" markerWidth="10" markerHeight="10" refX="5" refY="9" orient="auto">
                                <polygon points="0 0, 10 0, 5 10" fill="#ff6b6b" />
                            </marker>
                            <marker id="arrowW" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                <polygon points="0 0, 10 3, 0 6" fill="#ffd93d" />
                            </marker>
                            <marker id="arrowQc" markerWidth="10" markerHeight="10" refX="5" refY="9" orient="auto">
                                <polygon points="0 0, 10 0, 5 10" fill="#4da6ff" />
                            </marker>
                        </defs>
                    </>
                )}

                {stage === "CARNOT_CYCLE" && (
                    <>
                        <g>
                            {/* PV diagram for Carnot cycle */}
                            <g>
                                <line x1={80} y1={300} x2={320} y2={300} stroke="white" strokeWidth={2} />
                                <line x1={80} y1={300} x2={80} y2={80} stroke="white" strokeWidth={2} />
                                <text x={200} y={330} textAnchor="middle" fill="white" fontSize="12">Volume</text>
                                <text x={50} y={190} textAnchor="middle" fill="white" fontSize="12" transform="rotate(-90, 50, 190)">
                                    Pressure
                                </text>
                                
                                {/* Carnot cycle path */}
                                {/* 1. Isothermal expansion (hot) */}
                                <path d="M 120 120 Q 160 140 200 150" stroke="#ff3300" strokeWidth={3} fill="none" />
                                <text x={160} y={110} fill="#ff3300" fontSize="10">1. Isothermal (Tₕ)</text>
                                
                                {/* 2. Adiabatic expansion */}
                                <path d="M 200 150 Q 230 200 250 260" stroke="#ff9900" strokeWidth={3} fill="none" />
                                <text x={260} y={200} fill="#ff9900" fontSize="10">2. Adiabatic</text>
                                
                                {/* 3. Isothermal compression (cold) */}
                                <path d="M 250 260 Q 210 270 170 275" stroke="#0066ff" strokeWidth={3} fill="none" />
                                <text x={210} y={295} fill="#0066ff" fontSize="10">3. Isothermal (Tc)</text>
                                
                                {/* 4. Adiabatic compression */}
                                <path d="M 170 275 Q 140 220 120 120" stroke="#4da6ff" strokeWidth={3} fill="none" />
                                <text x={100} y={200} fill="#4da6ff" fontSize="10">4. Adiabatic</text>
                                
                                {/* Work area */}
                                <text x={180} y={210} textAnchor="middle" fill="#ffd93d" fontSize="11" fontWeight="bold">
                                    W = Area
                                </text>
                            </g>
                            
                            {/* Carnot efficiency formula */}
                            <g transform="translate(50, 350)">
                                <text x={150} y={0} textAnchor="middle" fill="#00e5ff" fontSize="13" fontWeight="bold">
                                    ηc = 1 - Tc/Tₕ
                                </text>
                                <text x={150} y={18} textAnchor="middle" fill="white" fontSize="10">
                                    Maximum possible efficiency
                                </text>
                            </g>
                        </g>
                    </>
                )}

                {stage === "HEAT_FLOW" && (
                    <>
                        <g>
                            {/* Temperature reservoirs */}
                            <g>
                                {/* Hot reservoir */}
                                <rect x={50} y={80} width={120} height={50} fill="#ff3300" opacity={0.7} rx={5} />
                                <text x={110} y={110} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                                    Tₕ = 600 K
                                </text>
                                
                                {/* Cold reservoir */}
                                <rect x={50} y={270} width={120} height={50} fill="#0066ff" opacity={0.7} rx={5} />
                                <text x={110} y={300} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                                    Tc = 300 K
                                </text>
                            </g>
                            
                            {/* Engine in middle */}
                            <g>
                                <circle cx={110} cy={200} r={50} fill="#4a5568" stroke="#00e5ff" strokeWidth={3} />
                                <text x={110} y={195} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                                    CARNOT
                                </text>
                                <text x={110} y={210} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                                    ENGINE
                                </text>
                            </g>
                            
                            {/* Heat flows */}
                            <g>
                                {/* Qh in */}
                                <path d="M 110 130 L 110 150" stroke="#ff6b6b" strokeWidth={4} markerEnd="url(#arrowQhIn)" />
                                <text x={130} y={145} fill="#ff6b6b" fontSize="11">Qₕ</text>
                                
                                {/* Qc out */}
                                <path d="M 110 250 L 110 270" stroke="#4da6ff" strokeWidth={4} markerEnd="url(#arrowQcOut)" />
                                <text x={130} y={265} fill="#4da6ff" fontSize="11">Qc</text>
                                
                                {/* Work out */}
                                <path d="M 160 200 L 210 200" stroke="#ffd93d" strokeWidth={4} markerEnd="url(#arrowWOut)" />
                                <text x={220} y={205} fill="#ffd93d" fontSize="12" fontWeight="bold">W</text>
                            </g>
                            
                            {/* Formulas */}
                            <g transform="translate(230, 100)">
                                <rect x={0} y={0} width={140} height={180} fill="none" stroke="#00e5ff" strokeWidth={1} opacity={0.3} />
                                <text x={70} y={25} textAnchor="middle" fill="#00e5ff" fontSize="11" fontWeight="bold">
                                    CARNOT RELATIONS
                                </text>
                                
                                <text x={70} y={50} textAnchor="middle" fill="white" fontSize="10">
                                    ηc = 1 - Tc/Tₕ
                                </text>
                                <text x={70} y={65} textAnchor="middle" fill="white" fontSize="10">
                                    = 1 - 300/600
                                </text>
                                <text x={70} y={80} textAnchor="middle" fill="#ffd93d" fontSize="11">
                                    = 0.5 = 50%
                                </text>
                                
                                <line x1={10} y1={90} x2={130} y2={90} stroke="white" strokeWidth={1} opacity={0.3} />
                                
                                <text x={70} y={110} textAnchor="middle" fill="white" fontSize="10">
                                    Qc/Qₕ = Tc/Tₕ
                                </text>
                                <text x={70} y={125} textAnchor="middle" fill="white" fontSize="10">
                                    = 300/600
                                </text>
                                <text x={70} y={140} textAnchor="middle" fill="#4da6ff" fontSize="11">
                                    = 0.5
                                </text>
                                
                                <line x1={10} y1={150} x2={130} y2={150} stroke="white" strokeWidth={1} opacity={0.3} />
                                
                                <text x={70} y={170} textAnchor="middle" fill="white" fontSize="10">
                                    W = Qₕ - Qc
                                </text>
                            </g>
                        </g>
                        
                        <defs>
                            <marker id="arrowQhIn" markerWidth="10" markerHeight="10" refX="5" refY="9" orient="auto">
                                <polygon points="0 0, 10 0, 5 10" fill="#ff6b6b" />
                            </marker>
                            <marker id="arrowQcOut" markerWidth="10" markerHeight="10" refX="5" refY="9" orient="auto">
                                <polygon points="0 0, 10 0, 5 10" fill="#4da6ff" />
                            </marker>
                            <marker id="arrowWOut" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                <polygon points="0 0, 10 3, 0 6" fill="#ffd93d" />
                            </marker>
                        </defs>
                    </>
                )}

                <text x={canvasSize / 2} y={25} textAnchor="middle" fill="#00e5ff" fontSize="16" fontWeight="bold">
                    {stage.replace(/_/g, ' ')}
                </text>
            </svg>
        </div>
    );
}
