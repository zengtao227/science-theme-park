"use client";

interface TemperatureVisualizationProps {
    quest: any;
    stage: string;
}

export default function TemperatureVisualization({ quest, stage }: TemperatureVisualizationProps) {
    const canvasSize = 400;

    // Temperature color mapping (blue = cold, red = hot)
    const getTempColor = (temp: number) => {
        // temp range: 0-373K mapped to blue-red
        const ratio = Math.min(Math.max(temp / 373, 0), 1);
        const r = Math.floor(ratio * 255);
        const b = Math.floor((1 - ratio) * 255);
        return `rgb(${r}, 100, ${b})`;
    };

    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900/50 rounded-xl p-4">
            <svg width={canvasSize} height={canvasSize} className="bg-black/30 rounded-lg">
                {stage === "TEMPERATURE" && (
                    <>
                        {/* Temperature scale visualization */}
                        <g>
                            {/* Kelvin scale */}
                            <line x1={100} y1={80} x2={100} y2={320} stroke="#00e5ff" strokeWidth={4} />
                            
                            {/* Temperature markers */}
                            <g>
                                {/* Absolute zero */}
                                <circle cx={100} cy={320} r={8} fill="#0066ff" />
                                <text x={130} y={325} fill="white" fontSize="12">0 K (Absolute Zero)</text>
                                
                                {/* Water freezes */}
                                <circle cx={100} cy={240} r={8} fill="#4da6ff" />
                                <text x={130} y={245} fill="white" fontSize="12">273 K (0°C)</text>
                                
                                {/* Room temp */}
                                <circle cx={100} cy={200} r={8} fill="#ffaa00" />
                                <text x={130} y={205} fill="white" fontSize="12">293 K (20°C)</text>
                                
                                {/* Water boils */}
                                <circle cx={100} cy={80} r={8} fill="#ff3300" />
                                <text x={130} y={85} fill="white" fontSize="12">373 K (100°C)</text>
                            </g>
                            
                            {/* Thermometer bulb */}
                            <circle cx={100} cy={340} r={20} fill="#ff6b6b" opacity={0.7} />
                            <text x={100} y={375} textAnchor="middle" fill="#00e5ff" fontSize="14" fontWeight="bold">
                                THERMOMETER
                            </text>
                        </g>
                    </>
                )}

                {stage === "HEAT_TRANSFER" && (
                    <>
                        {/* Heat transfer visualization */}
                        <g>
                            {/* Hot object */}
                            <rect x={80} y={100} width={80} height={80} fill="#ff3300" opacity={0.8} rx={10} />
                            <text x={120} y={145} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">HOT</text>
                            <text x={120} y={165} textAnchor="middle" fill="white" fontSize="12">100°C</text>
                            
                            {/* Heat flow arrows */}
                            <g>
                                {[0, 1, 2].map((i) => (
                                    <g key={i}>
                                        <path
                                            d={`M ${170 + i * 15} ${130 + i * 10} L ${210 + i * 15} ${130 + i * 10}`}
                                            stroke="#ff9900"
                                            strokeWidth={3}
                                            markerEnd="url(#arrowHeat)"
                                        />
                                    </g>
                                ))}
                            </g>
                            
                            {/* Cold object */}
                            <rect x={240} y={100} width={80} height={80} fill="#0066ff" opacity={0.8} rx={10} />
                            <text x={280} y={145} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">COLD</text>
                            <text x={280} y={165} textAnchor="middle" fill="white" fontSize="12">20°C</text>
                            
                            {/* Heat equation */}
                            <text x={200} y={240} textAnchor="middle" fill="#00e5ff" fontSize="16" fontWeight="bold">
                                Q = mcΔT
                            </text>
                            
                            {/* Material comparison */}
                            <g transform="translate(50, 270)">
                                <rect x={0} y={0} width={60} height={30} fill="#b8860b" opacity={0.7} />
                                <text x={30} y={20} textAnchor="middle" fill="white" fontSize="10">Copper</text>
                                
                                <rect x={80} y={0} width={60} height={30} fill="#8b4513" opacity={0.7} />
                                <text x={110} y={20} textAnchor="middle" fill="white" fontSize="10">Wood</text>
                                
                                <rect x={160} y={0} width={60} height={30} fill="#87ceeb" opacity={0.5} />
                                <text x={190} y={20} textAnchor="middle" fill="white" fontSize="10">Air</text>
                                
                                <text x={110} y={50} textAnchor="middle" fill="#00e5ff" fontSize="11">
                                    Thermal Conductivity →
                                </text>
                            </g>
                        </g>
                        
                        <defs>
                            <marker id="arrowHeat" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                <polygon points="0 0, 10 3, 0 6" fill="#ff9900" />
                            </marker>
                        </defs>
                    </>
                )}

                {stage === "THERMAL_EQUILIBRIUM" && (
                    <>
                        {/* Thermal equilibrium visualization */}
                        <g>
                            {/* Before mixing */}
                            <g>
                                <text x={100} y={40} textAnchor="middle" fill="#00e5ff" fontSize="12" fontWeight="bold">
                                    BEFORE
                                </text>
                                
                                <circle cx={80} cy={100} r={30} fill="#ff3300" opacity={0.8} />
                                <text x={80} y={105} textAnchor="middle" fill="white" fontSize="14">80°C</text>
                                
                                <circle cx={120} cy={100} r={30} fill="#0066ff" opacity={0.8} />
                                <text x={120} y={105} textAnchor="middle" fill="white" fontSize="14">20°C</text>
                            </g>
                            
                            {/* Mixing arrow */}
                            <g>
                                <path d="M 100 140 L 100 180" stroke="#00e5ff" strokeWidth={3} markerEnd="url(#arrowDown)" />
                                <text x={120} y={165} fill="#00e5ff" fontSize="11">MIX</text>
                            </g>
                            
                            {/* After mixing */}
                            <g>
                                <text x={100} y={220} textAnchor="middle" fill="#00e5ff" fontSize="12" fontWeight="bold">
                                    AFTER (Equilibrium)
                                </text>
                                
                                <circle cx={100} cy={270} r={40} fill="#ff9900" opacity={0.8} />
                                <text x={100} y={275} textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                                    50°C
                                </text>
                            </g>
                            
                            {/* Energy conservation */}
                            <g transform="translate(200, 80)">
                                <rect x={0} y={0} width={150} height={200} fill="none" stroke="#00e5ff" strokeWidth={1} opacity={0.3} />
                                <text x={75} y={25} textAnchor="middle" fill="#00e5ff" fontSize="11" fontWeight="bold">
                                    ENERGY BALANCE
                                </text>
                                
                                <text x={10} y={60} fill="white" fontSize="10">Heat lost (hot):</text>
                                <text x={10} y={80} fill="#ff6b6b" fontSize="10">Q_1 = m_1c(T_1 - Tf)</text>
                                
                                <text x={10} y={110} fill="white" fontSize="10">Heat gained (cold):</text>
                                <text x={10} y={130} fill="#4da6ff" fontSize="10">Q_2 = m_2c(Tf - T_2)</text>
                                
                                <text x={75} y={160} textAnchor="middle" fill="#00e5ff" fontSize="11" fontWeight="bold">
                                    Q_1 = Q_2
                                </text>
                                
                                <text x={75} y={185} textAnchor="middle" fill="white" fontSize="9">
                                    (Conservation of Energy)
                                </text>
                            </g>
                        </g>
                        
                        <defs>
                            <marker id="arrowDown" markerWidth="10" markerHeight="10" refX="5" refY="9" orient="auto">
                                <polygon points="0 0, 10 0, 5 10" fill="#00e5ff" />
                            </marker>
                        </defs>
                    </>
                )}

                {/* Title */}
                <text x={canvasSize / 2} y={25} textAnchor="middle" fill="#00e5ff" fontSize="16" fontWeight="bold">
                    {stage.replace(/_/g, ' ')}
                </text>
            </svg>
        </div>
    );
}
