"use client";

interface ThermodynamicsVisualizationProps {
    quest: any;
    stage: string;
}

export default function ThermodynamicsVisualization({ quest, stage }: ThermodynamicsVisualizationProps) {
    const canvasSize = 400;

    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900/50 rounded-xl p-4">
            <svg width={canvasSize} height={canvasSize} className="bg-black/30 rounded-lg">
                {stage === "FIRST_LAW" && (
                    <>
                        <g>
                            {/* System box */}
                            <rect x={150} y={150} width={100} height={100} fill="#4a5568" stroke="#00e5ff" strokeWidth={3} />
                            <text x={200} y={205} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                                SYSTEM
                            </text>
                            
                            {/* Heat input */}
                            <g>
                                <path d="M 200 120 L 200 150" stroke="#ff6b6b" strokeWidth={4} markerEnd="url(#arrowQ)" />
                                <text x={200} y={110} textAnchor="middle" fill="#ff6b6b" fontSize="12" fontWeight="bold">
                                    Q (Heat In)
                                </text>
                            </g>
                            
                            {/* Work output */}
                            <g>
                                <path d="M 250 200 L 290 200" stroke="#ffd93d" strokeWidth={4} markerEnd="url(#arrowW)" />
                                <text x={300} y={205} textAnchor="start" fill="#ffd93d" fontSize="12" fontWeight="bold">
                                    W (Work Out)
                                </text>
                            </g>
                            
                            {/* Internal energy */}
                            <text x={200} y={230} textAnchor="middle" fill="#00e5ff" fontSize="11">
                                ΔU = Q - W
                            </text>
                            
                            {/* First Law equation */}
                            <g transform="translate(50, 300)">
                                <rect x={0} y={0} width={300} height={70} fill="none" stroke="#00e5ff" strokeWidth={1} opacity={0.3} />
                                <text x={150} y={25} textAnchor="middle" fill="#00e5ff" fontSize="14" fontWeight="bold">
                                    FIRST LAW OF THERMODYNAMICS
                                </text>
                                <text x={150} y={50} textAnchor="middle" fill="white" fontSize="12">
                                    ΔU = Q - W
                                </text>
                            </g>
                        </g>
                        
                        <defs>
                            <marker id="arrowQ" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                <polygon points="0 0, 10 3, 0 6" fill="#ff6b6b" />
                            </marker>
                            <marker id="arrowW" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                <polygon points="0 0, 10 3, 0 6" fill="#ffd93d" />
                            </marker>
                        </defs>
                    </>
                )}

                {stage === "INTERNAL_ENERGY" && (
                    <>
                        <g>
                            {/* Temperature scale */}
                            <g>
                                <line x1={100} y1={100} x2={100} y2={300} stroke="#00e5ff" strokeWidth={3} />
                                
                                {/* Low temperature */}
                                <circle cx={100} cy={280} r={30} fill="#0066ff" opacity={0.6} />
                                <text x={100} y={285} textAnchor="middle" fill="white" fontSize="12">LOW T</text>
                                <text x={150} y={285} fill="white" fontSize="11">U = small</text>
                                
                                {/* Medium temperature */}
                                <circle cx={100} cy={200} r={35} fill="#ff9900" opacity={0.6} />
                                <text x={100} y={205} textAnchor="middle" fill="white" fontSize="12">MED T</text>
                                <text x={150} y={205} fill="white" fontSize="11">U = medium</text>
                                
                                {/* High temperature */}
                                <circle cx={100} cy={120} r={40} fill="#ff3300" opacity={0.6} />
                                <text x={100} y={125} textAnchor="middle" fill="white" fontSize="12">HIGH T</text>
                                <text x={150} y={125} fill="white" fontSize="11">U = large</text>
                            </g>
                            
                            {/* Molecular motion */}
                            <g transform="translate(250, 150)">
                                <text x={0} y={-30} textAnchor="middle" fill="#00e5ff" fontSize="12" fontWeight="bold">
                                    MOLECULAR MOTION
                                </text>
                                
                                {/* Fast molecules */}
                                {[...Array(8)].map((_, i) => (
                                    <circle key={i} cx={(i % 3) * 25} cy={Math.floor(i / 3) * 25} r={4} fill="#ff6b6b" opacity={0.8}>
                                        <animate attributeName="cx" values={`${(i % 3) * 25};${(i % 3) * 25 + 15};${(i % 3) * 25}`} dur="0.5s" repeatCount="indefinite" />
                                        <animate attributeName="cy" values={`${Math.floor(i / 3) * 25};${Math.floor(i / 3) * 25 - 10};${Math.floor(i / 3) * 25}`} dur="0.6s" repeatCount="indefinite" />
                                    </circle>
                                ))}
                            </g>
                            
                            {/* Formula */}
                            <g transform="translate(50, 330)">
                                <text x={150} y={0} textAnchor="middle" fill="#00e5ff" fontSize="13" fontWeight="bold">
                                    U = (3/2)nRT (monatomic)
                                </text>
                                <text x={150} y={20} textAnchor="middle" fill="white" fontSize="11">
                                    Internal Energy ∝ Temperature
                                </text>
                            </g>
                        </g>
                    </>
                )}

                {stage === "WORK_HEAT" && (
                    <>
                        <g>
                            {/* PV diagram */}
                            <g>
                                <line x1={80} y1={300} x2={320} y2={300} stroke="white" strokeWidth={2} />
                                <line x1={80} y1={300} x2={80} y2={80} stroke="white" strokeWidth={2} />
                                <text x={200} y={330} textAnchor="middle" fill="white" fontSize="12">Volume (V)</text>
                                <text x={50} y={190} textAnchor="middle" fill="white" fontSize="12" transform="rotate(-90, 50, 190)">
                                    Pressure (P)
                                </text>
                                
                                {/* Isobaric process (constant P) */}
                                <line x1={120} y1={150} x2={240} y2={150} stroke="#ff9900" strokeWidth={3} />
                                <text x={180} y={140} textAnchor="middle" fill="#ff9900" fontSize="10">Isobaric</text>
                                <text x={180} y={170} textAnchor="middle" fill="#ff9900" fontSize="9">W = PΔV</text>
                                
                                {/* Isochoric process (constant V) */}
                                <line x1={160} y1={200} x2={160} y2={260} stroke="#4da6ff" strokeWidth={3} />
                                <text x={190} y={230} fill="#4da6ff" fontSize="10">Isochoric</text>
                                <text x={190} y={245} fill="#4da6ff" fontSize="9">W = 0</text>
                                
                                {/* Isothermal process */}
                                <path d="M 120 120 Q 180 160 240 220" stroke="#00ff88" strokeWidth={3} fill="none" />
                                <text x={180} y={110} textAnchor="middle" fill="#00ff88" fontSize="10">Isothermal</text>
                                <text x={180} y={125} textAnchor="middle" fill="#00ff88" fontSize="9">ΔU = 0</text>
                                
                                {/* Adiabatic process */}
                                <path d="M 120 100 Q 160 180 200 280" stroke="#ff6b9d" strokeWidth={3} fill="none" />
                                <text x={140} y={90} fill="#ff6b9d" fontSize="10">Adiabatic</text>
                                <text x={140} y={105} fill="#ff6b9d" fontSize="9">Q = 0</text>
                            </g>
                            
                            {/* Legend */}
                            <g transform="translate(250, 340)">
                                <text x={0} y={0} fill="white" fontSize="9">Work = Area under curve</text>
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
