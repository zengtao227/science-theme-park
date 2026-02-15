"use client";

interface TissueVisualizationProps {
    quest: any;
    stage: string;
}

export default function TissueVisualization({ quest, stage }: TissueVisualizationProps) {
    const canvasSize = 400;

    const tissueColors: Record<string, string> = {
        epithelial: "#ff6b6b",
        connective: "#4ecdc4",
        muscle: "#ff9ff3",
        nervous: "#ffd93d",
        blood: "#ff6b9d",
    };

    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900/50 rounded-xl p-4">
            <svg width={canvasSize} height={canvasSize} className="bg-black/30 rounded-lg">
                {stage === "TISSUES" && quest?.tissueType && (
                    <>
                        {/* Tissue cell representation */}
                        <rect
                            x={canvasSize / 2 - 80}
                            y={canvasSize / 2 - 80}
                            width={160}
                            height={160}
                            fill={tissueColors[quest.tissueType] || "#888"}
                            opacity={0.7}
                            rx={10}
                        />
                        <text
                            x={canvasSize / 2}
                            y={canvasSize / 2}
                            textAnchor="middle"
                            fill="white"
                            fontSize="18"
                            fontWeight="bold"
                        >
                            {quest.tissueType.toUpperCase()}
                        </text>
                        <text
                            x={canvasSize / 2}
                            y={canvasSize / 2 + 30}
                            textAnchor="middle"
                            fill="#00e5ff"
                            fontSize="14"
                        >
                            TISSUE
                        </text>
                    </>
                )}

                {stage === "ORGANS" && quest?.organName && (
                    <>
                        {/* Organ representation with multiple tissue layers */}
                        <circle
                            cx={canvasSize / 2}
                            cy={canvasSize / 2}
                            r={100}
                            fill="none"
                            stroke="#00e5ff"
                            strokeWidth={2}
                        />
                        {[0, 1, 2, 3].map((i) => (
                            <circle
                                key={i}
                                cx={canvasSize / 2}
                                cy={canvasSize / 2}
                                r={80 - i * 20}
                                fill={Object.values(tissueColors)[i]}
                                opacity={0.3}
                            />
                        ))}
                        <text
                            x={canvasSize / 2}
                            y={canvasSize / 2}
                            textAnchor="middle"
                            fill="white"
                            fontSize="18"
                            fontWeight="bold"
                        >
                            {quest.organName.toUpperCase()}
                        </text>
                    </>
                )}

                {stage === "SYSTEMS" && (
                    <>
                        {/* System hierarchy visualization */}
                        <g>
                            {/* Cell level */}
                            <circle cx={100} cy={300} r={20} fill="#ff6b6b" opacity={0.7} />
                            <text x={100} y={340} textAnchor="middle" fill="white" fontSize="12">
                                CELL
                            </text>

                            {/* Tissue level */}
                            <rect x={160} y={270} width={60} height={60} fill="#4ecdc4" opacity={0.7} rx={5} />
                            <text x={190} y={360} textAnchor="middle" fill="white" fontSize="12">
                                TISSUE
                            </text>

                            {/* Organ level */}
                            <circle cx={280} cy={300} r={35} fill="#ff9ff3" opacity={0.7} />
                            <text x={280} y={360} textAnchor="middle" fill="white" fontSize="12">
                                ORGAN
                            </text>

                            {/* System level */}
                            <rect x={320} y={260} width={70} height={80} fill="#ffd93d" opacity={0.7} rx={10} />
                            <text x={355} y={370} textAnchor="middle" fill="white" fontSize="12">
                                SYSTEM
                            </text>

                            {/* Arrows */}
                            <path d="M 120 300 L 160 300" stroke="#00e5ff" strokeWidth={2} markerEnd="url(#arrowhead)" />
                            <path d="M 220 300 L 245 300" stroke="#00e5ff" strokeWidth={2} markerEnd="url(#arrowhead)" />
                            <path d="M 315 300 L 320 300" stroke="#00e5ff" strokeWidth={2} markerEnd="url(#arrowhead)" />
                        </g>

                        <defs>
                            <marker
                                id="arrowhead"
                                markerWidth="10"
                                markerHeight="10"
                                refX="9"
                                refY="3"
                                orient="auto"
                            >
                                <polygon points="0 0, 10 3, 0 6" fill="#00e5ff" />
                            </marker>
                        </defs>
                    </>
                )}

                {/* Title */}
                <text x={canvasSize / 2} y={30} textAnchor="middle" fill="#00e5ff" fontSize="16" fontWeight="bold">
                    {stage} VISUALIZATION
                </text>
            </svg>
        </div>
    );
}
