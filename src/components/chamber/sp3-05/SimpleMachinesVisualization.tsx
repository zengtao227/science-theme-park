"use client";

interface SimpleMachinesVisualizationProps {
    quest: any;
    stage: string;
}

export default function SimpleMachinesVisualization({ quest, stage }: SimpleMachinesVisualizationProps) {
    const canvasSize = 400;

    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900/50 rounded-xl p-4">
            <svg width={canvasSize} height={canvasSize} className="bg-black/30 rounded-lg">
                {stage === "LEVERS" && (
                    <>
                        <g>
                            {/* Class 1 Lever (Seesaw) */}
                            <g transform="translate(50, 80)">
                                <text x={100} y={0} textAnchor="middle" fill="#00e5ff" fontSize="13" fontWeight="bold">
                                    CLASS 1 LEVER
                                </text>
                                
                                {/* Fulcrum */}
                                <polygon points="100,60 90,80 110,80" fill="#ffd93d" />
                                <text x={100} y={95} textAnchor="middle" fill="#ffd93d" fontSize="9">
                                    Fulcrum
                                </text>
                                
                                {/* Lever bar */}
                                <rect x={30} y={55} width={140} height={8} fill="#94a3b8" rx={2} />
                                
                                {/* Effort */}
                                <circle cx={40} cy={59} r={12} fill="#22c55e" opacity={0.7} />
                                <text x={40} y={63} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                                    F₁
                                </text>
                                <path d="M 40 45 L 40 35" stroke="#22c55e" strokeWidth={2} markerEnd="url(#arrowEffort)" />
                                
                                {/* Load */}
                                <circle cx={160} cy={59} r={12} fill="#ef4444" opacity={0.7} />
                                <text x={160} y={63} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                                    F₂
                                </text>
                                
                                {/* Distance labels */}
                                <line x1={40} y1={110} x2={100} y2={110} stroke="white" strokeWidth={1} strokeDasharray="2,2" />
                                <text x={70} y={125} textAnchor="middle" fill="white" fontSize="9">
                                    d₁
                                </text>
                                
                                <line x1={100} y1={110} x2={160} y2={110} stroke="white" strokeWidth={1} strokeDasharray="2,2" />
                                <text x={130} y={125} textAnchor="middle" fill="white" fontSize="9">
                                    d₂
                                </text>
                            </g>

                            {/* Class 2 Lever (Wheelbarrow) */}
                            <g transform="translate(50, 200)">
                                <text x={100} y={0} textAnchor="middle" fill="#00e5ff" fontSize="13" fontWeight="bold">
                                    CLASS 2 LEVER
                                </text>
                                
                                {/* Fulcrum (wheel) */}
                                <circle cx={40} cy={70} r={15} fill="#ffd93d" opacity={0.7} />
                                <text x={40} y={95} textAnchor="middle" fill="#ffd93d" fontSize="9">
                                    Fulcrum
                                </text>
                                
                                {/* Lever bar */}
                                <rect x={40} y={55} width={120} height={8} fill="#94a3b8" rx={2} />
                                
                                {/* Load (in middle) */}
                                <circle cx={100} cy={59} r={12} fill="#ef4444" opacity={0.7} />
                                <text x={100} y={63} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                                    F₂
                                </text>
                                
                                {/* Effort (at end) */}
                                <circle cx={160} cy={59} r={12} fill="#22c55e" opacity={0.7} />
                                <text x={160} y={63} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                                    F₁
                                </text>
                                <path d="M 160 45 L 160 35" stroke="#22c55e" strokeWidth={2} markerEnd="url(#arrowEffort)" />
                            </g>

                            {/* Formula */}
                            <g transform="translate(50, 330)">
                                <rect x={0} y={0} width={300} height={50} fill="none" stroke="#00e5ff" strokeWidth={1} opacity={0.3} />
                                <text x={150} y={20} textAnchor="middle" fill="#00e5ff" fontSize="12" fontWeight="bold">
                                    LEVER PRINCIPLE
                                </text>
                                <text x={150} y={38} textAnchor="middle" fill="white" fontSize="11">
                                    F₁ × d₁ = F₂ × d₂
                                </text>
                            </g>
                        </g>

                        <defs>
                            <marker id="arrowEffort" markerWidth="10" markerHeight="10" refX="5" refY="9" orient="auto">
                                <polygon points="0 0, 10 0, 5 10" fill="#22c55e" />
                            </marker>
                        </defs>
                    </>
                )}

                {stage === "PULLEYS" && (
                    <>
                        <g>
                            {/* Fixed Pulley */}
                            <g transform="translate(70, 60)">
                                <text x={50} y={0} textAnchor="middle" fill="#00e5ff" fontSize="12" fontWeight="bold">
                                    FIXED PULLEY
                                </text>
                                
                                {/* Support */}
                                <rect x={40} y={15} width={20} height={5} fill="#94a3b8" />
                                
                                {/* Pulley wheel */}
                                <circle cx={50} cy={40} r={20} fill="none" stroke="#ffd93d" strokeWidth={3} />
                                <circle cx={50} cy={40} r={5} fill="#ffd93d" />
                                
                                {/* Rope */}
                                <line x1={30} y1={40} x2={30} y2={100} stroke="#94a3b8" strokeWidth={2} />
                                <line x1={70} y1={40} x2={70} y2={100} stroke="#94a3b8" strokeWidth={2} />
                                
                                {/* Effort */}
                                <path d="M 70 90 L 70 80" stroke="#22c55e" strokeWidth={3} markerEnd="url(#arrowDown)" />
                                <text x={85} y={95} fill="#22c55e" fontSize="10">
                                    F
                                </text>
                                
                                {/* Load */}
                                <rect x={20} y={100} width={20} height={20} fill="#ef4444" opacity={0.7} />
                                <text x={30} y={135} textAnchor="middle" fill="white" fontSize="9">
                                    Load
                                </text>
                                
                                <text x={50} y={155} textAnchor="middle" fill="white" fontSize="9">
                                    MA = 1
                                </text>
                            </g>

                            {/* Movable Pulley */}
                            <g transform="translate(220, 60)">
                                <text x={50} y={0} textAnchor="middle" fill="#00e5ff" fontSize="12" fontWeight="bold">
                                    MOVABLE
                                </text>
                                
                                {/* Fixed support */}
                                <rect x={20} y={15} width={10} height={5} fill="#94a3b8" />
                                <rect x={70} y={15} width={10} height={5} fill="#94a3b8" />
                                
                                {/* Rope from supports */}
                                <line x1={25} y1={20} x2={50} y2={60} stroke="#94a3b8" strokeWidth={2} />
                                <line x1={75} y1={20} x2={50} y2={60} stroke="#94a3b8" strokeWidth={2} />
                                
                                {/* Movable pulley */}
                                <circle cx={50} cy={70} r={15} fill="none" stroke="#ffd93d" strokeWidth={3} />
                                <circle cx={50} cy={70} r={4} fill="#ffd93d" />
                                
                                {/* Load */}
                                <rect x={40} y={90} width={20} height={20} fill="#ef4444" opacity={0.7} />
                                
                                {/* Effort rope */}
                                <line x1={65} y1={70} x2={90} y2={70} stroke="#94a3b8" strokeWidth={2} />
                                <path d="M 90 70 L 90 80" stroke="#22c55e" strokeWidth={3} markerEnd="url(#arrowDown)" />
                                <text x={95} y={75} fill="#22c55e" fontSize="10">
                                    F/2
                                </text>
                                
                                <text x={50} y={135} textAnchor="middle" fill="white" fontSize="9">
                                    MA = 2
                                </text>
                            </g>

                            {/* Formula */}
                            <g transform="translate(50, 220)">
                                <rect x={0} y={0} width={300} height={80} fill="none" stroke="#00e5ff" strokeWidth={1} opacity={0.3} />
                                <text x={150} y={20} textAnchor="middle" fill="#00e5ff" fontSize="12" fontWeight="bold">
                                    PULLEY PRINCIPLES
                                </text>
                                <text x={150} y={40} textAnchor="middle" fill="white" fontSize="10">
                                    MA = Number of supporting ropes
                                </text>
                                <text x={150} y={58} textAnchor="middle" fill="white" fontSize="10">
                                    Fixed: Changes direction only
                                </text>
                                <text x={150} y={74} textAnchor="middle" fill="white" fontSize="10">
                                    Movable: Reduces force by half
                                </text>
                            </g>
                        </g>

                        <defs>
                            <marker id="arrowDown" markerWidth="10" markerHeight="10" refX="5" refY="9" orient="auto">
                                <polygon points="0 0, 10 0, 5 10" fill="#22c55e" />
                            </marker>
                        </defs>
                    </>
                )}

                {stage === "INCLINED_PLANES" && (
                    <>
                        <g>
                            {/* Inclined Plane */}
                            <g transform="translate(50, 80)">
                                <text x={150} y={0} textAnchor="middle" fill="#00e5ff" fontSize="13" fontWeight="bold">
                                    INCLINED PLANE
                                </text>
                                
                                {/* Ground */}
                                <line x1={0} y1={200} x2={300} y2={200} stroke="#94a3b8" strokeWidth={3} />
                                
                                {/* Ramp */}
                                <polygon points="50,200 250,200 250,100" fill="#6366f1" opacity={0.3} stroke="#6366f1" strokeWidth={2} />
                                
                                {/* Box on ramp */}
                                <rect x={140} y={135} width={30} height={30} fill="#ef4444" opacity={0.7} stroke="white" strokeWidth={2} />
                                
                                {/* Effort force */}
                                <path d="M 155 150 L 125 150" stroke="#22c55e" strokeWidth={3} markerEnd="url(#arrowLeft)" />
                                <text x={110} y={155} fill="#22c55e" fontSize="10" fontWeight="bold">
                                    F
                                </text>
                                
                                {/* Height */}
                                <line x1={260} y1={100} x2={260} y2={200} stroke="#ffd93d" strokeWidth={2} strokeDasharray="3,3" />
                                <text x={270} y={155} fill="#ffd93d" fontSize="11" fontWeight="bold">
                                    h
                                </text>
                                
                                {/* Length */}
                                <line x1={50} y1={210} x2={250} y2={210} stroke="#00e5ff" strokeWidth={2} strokeDasharray="3,3" />
                                <text x={150} y={230} textAnchor="middle" fill="#00e5ff" fontSize="11" fontWeight="bold">
                                    L (length)
                                </text>
                            </g>

                            {/* Other simple machines */}
                            <g transform="translate(50, 300)">
                                <text x={0} y={0} fill="white" fontSize="11" fontWeight="bold">
                                    Related Machines:
                                </text>
                                
                                {/* Wedge */}
                                <g transform="translate(0, 15)">
                                    <polygon points="10,20 30,20 20,5" fill="#8b5cf6" opacity={0.7} />
                                    <text x={45} y={18} fill="white" fontSize="9">
                                        Wedge (moving ramp)
                                    </text>
                                </g>
                                
                                {/* Screw */}
                                <g transform="translate(0, 45)">
                                    <rect x={15} y={0} width={5} height={25} fill="#94a3b8" />
                                    <ellipse cx={17.5} cy={5} rx={8} ry={3} fill="none" stroke="#94a3b8" strokeWidth={1.5} />
                                    <ellipse cx={17.5} cy={12} rx={8} ry={3} fill="none" stroke="#94a3b8" strokeWidth={1.5} />
                                    <ellipse cx={17.5} cy={19} rx={8} ry={3} fill="none" stroke="#94a3b8" strokeWidth={1.5} />
                                    <text x={45} y={15} fill="white" fontSize="9">
                                        Screw (wrapped ramp)
                                    </text>
                                </g>
                            </g>

                            {/* Formula */}
                            <g transform="translate(200, 300)">
                                <rect x={0} y={0} width={140} height={60} fill="none" stroke="#00e5ff" strokeWidth={1} opacity={0.3} />
                                <text x={70} y={18} textAnchor="middle" fill="#00e5ff" fontSize="11" fontWeight="bold">
                                    MA = L / h
                                </text>
                                <text x={70} y={35} textAnchor="middle" fill="white" fontSize="9">
                                    Longer ramp =
                                </text>
                                <text x={70} y={50} textAnchor="middle" fill="white" fontSize="9">
                                    Less force needed
                                </text>
                            </g>
                        </g>

                        <defs>
                            <marker id="arrowLeft" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                <polygon points="0 0, 10 3, 0 6" fill="#22c55e" />
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
