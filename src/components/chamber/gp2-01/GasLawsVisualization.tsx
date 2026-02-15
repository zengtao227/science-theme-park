"use client";

interface GasLawsVisualizationProps {
    quest: any;
    stage: string;
}

export default function GasLawsVisualization({ quest, stage }: GasLawsVisualizationProps) {
    const canvasSize = 400;

    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900/50 rounded-xl p-4">
            <svg width={canvasSize} height={canvasSize} className="bg-black/30 rounded-lg">
                {stage === "IDEAL_GAS" && (
                    <>
                        <g>
                            <rect x={100} y={100} width={200} height={200} fill="none" stroke="#00e5ff" strokeWidth={3} />
                            
                            {/* Gas particles */}
                            {[...Array(20)].map((_, i) => {
                                const x = 120 + (i % 5) * 35;
                                const y = 120 + Math.floor(i / 5) * 45;
                                return (
                                    <circle key={i} cx={x} cy={y} r={5} fill="#ff6b6b" opacity={0.8}>
                                        <animate attributeName="cx" values={`${x};${x+10};${x-10};${x}`} dur="2s" repeatCount="indefinite" />
                                        <animate attributeName="cy" values={`${y};${y-10};${y+10};${y}`} dur="1.8s" repeatCount="indefinite" />
                                    </circle>
                                );
                            })}
                            
                            <text x={200} y={330} textAnchor="middle" fill="#00e5ff" fontSize="16" fontWeight="bold">
                                PV = nRT
                            </text>
                            
                            <text x={200} y={360} textAnchor="middle" fill="white" fontSize="12">
                                Ideal Gas Law
                            </text>
                        </g>
                    </>
                )}

                {stage === "BOYLES_LAW" && (
                    <>
                        <g>
                            {/* Before compression */}
                            <g>
                                <rect x={50} y={100} width={120} height={150} fill="none" stroke="#00e5ff" strokeWidth={2} />
                                <text x={110} y={80} textAnchor="middle" fill="#00e5ff" fontSize="12">BEFORE</text>
                                
                                {[...Array(12)].map((_, i) => (
                                    <circle key={i} cx={70 + (i % 3) * 30} cy={120 + Math.floor(i / 3) * 35} r={5} fill="#ff6b6b" opacity={0.7} />
                                ))}
                                
                                <text x={110} y={270} textAnchor="middle" fill="white" fontSize="11">V = 2L</text>
                                <text x={110} y={285} textAnchor="middle" fill="white" fontSize="11">P = 100 kPa</text>
                            </g>
                            
                            {/* Arrow */}
                            <path d="M 180 175 L 220 175" stroke="#ffd93d" strokeWidth={3} markerEnd="url(#arrow)" />
                            
                            {/* After compression */}
                            <g>
                                <rect x={230} y={125} width={60} height={100} fill="none" stroke="#ff3300" strokeWidth={2} />
                                <text x={260} y={80} textAnchor="middle" fill="#ff3300" fontSize="12">AFTER</text>
                                
                                {[...Array(12)].map((_, i) => (
                                    <circle key={i} cx={245 + (i % 2) * 20} cy={140 + Math.floor(i / 2) * 15} r={5} fill="#ff6b6b" opacity={0.9} />
                                ))}
                                
                                <text x={260} y={245} textAnchor="middle" fill="white" fontSize="11">V = 1L</text>
                                <text x={260} y={260} textAnchor="middle" fill="white" fontSize="11">P = 200 kPa</text>
                            </g>
                            
                            <text x={200} y={330} textAnchor="middle" fill="#00e5ff" fontSize="14" fontWeight="bold">
                                P₁V₁ = P₂V₂
                            </text>
                            <text x={200} y={350} textAnchor="middle" fill="white" fontSize="11">
                                (constant T)
                            </text>
                        </g>
                        
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                <polygon points="0 0, 10 3, 0 6" fill="#ffd93d" />
                            </marker>
                        </defs>
                    </>
                )}

                {stage === "CHARLES_LAW" && (
                    <>
                        <g>
                            {/* Cold gas */}
                            <g>
                                <rect x={50} y={150} width={100} height={120} fill="none" stroke="#0066ff" strokeWidth={2} />
                                <text x={100} y={130} textAnchor="middle" fill="#0066ff" fontSize="12">COLD</text>
                                
                                {[...Array(10)].map((_, i) => (
                                    <circle key={i} cx={70 + (i % 2) * 40} cy={170 + Math.floor(i / 2) * 22} r={4} fill="#4da6ff" opacity={0.7}>
                                        <animate attributeName="cx" values={`${70 + (i % 2) * 40};${75 + (i % 2) * 40};${70 + (i % 2) * 40}`} dur="3s" repeatCount="indefinite" />
                                    </circle>
                                ))}
                                
                                <text x={100} y={290} textAnchor="middle" fill="white" fontSize="11">T = 300 K</text>
                                <text x={100} y={305} textAnchor="middle" fill="white" fontSize="11">V = 2 L</text>
                            </g>
                            
                            {/* Heating arrow */}
                            <g>
                                <path d="M 160 210 L 200 210" stroke="#ff9900" strokeWidth={3} markerEnd="url(#arrowHeat)" />
                                <text x={180} y={200} textAnchor="middle" fill="#ff9900" fontSize="10">HEAT</text>
                            </g>
                            
                            {/* Hot gas */}
                            <g>
                                <rect x={210} y={100} width={100} height={220} fill="none" stroke="#ff3300" strokeWidth={2} />
                                <text x={260} y={80} textAnchor="middle" fill="#ff3300" fontSize="12">HOT</text>
                                
                                {[...Array(10)].map((_, i) => (
                                    <circle key={i} cx={230 + (i % 2) * 40} cy={120 + Math.floor(i / 2) * 42} r={4} fill="#ff6b6b" opacity={0.9}>
                                        <animate attributeName="cx" values={`${230 + (i % 2) * 40};${240 + (i % 2) * 40};${230 + (i % 2) * 40}`} dur="1s" repeatCount="indefinite" />
                                    </circle>
                                ))}
                                
                                <text x={260} y={340} textAnchor="middle" fill="white" fontSize="11">T = 600 K</text>
                                <text x={260} y={355} textAnchor="middle" fill="white" fontSize="11">V = 4 L</text>
                            </g>
                            
                            <text x={200} y={385} textAnchor="middle" fill="#00e5ff" fontSize="14" fontWeight="bold">
                                V₁/T₁ = V₂/T₂
                            </text>
                        </g>
                        
                        <defs>
                            <marker id="arrowHeat" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                <polygon points="0 0, 10 3, 0 6" fill="#ff9900" />
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
