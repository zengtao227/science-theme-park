"use client";

interface BodySystemVisualizationProps {
    quest: any;
    stage: string;
}

export default function BodySystemVisualization({ quest, stage }: BodySystemVisualizationProps) {
    const canvasSize = 400;

    const systemColors: Record<string, string> = {
        digestive: "#ff9f43",
        circulatory: "#ee5a6f",
        respiratory: "#54a0ff",
    };

    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900/50 rounded-xl p-4">
            <svg width={canvasSize} height={canvasSize} className="bg-black/30 rounded-lg">
                {stage === "DIGESTIVE" && (
                    <>
                        {/* Digestive system pathway */}
                        <g>
                            {/* Mouth */}
                            <circle cx={200} cy={50} r={15} fill={systemColors.digestive} opacity={0.8} />
                            <text x={200} y={55} textAnchor="middle" fill="white" fontSize="10">MOUTH</text>
                            
                            {/* Esophagus */}
                            <rect x={190} y={70} width={20} height={60} fill={systemColors.digestive} opacity={0.7} />
                            <text x={230} y={100} fill="white" fontSize="10">ESOPHAGUS</text>
                            
                            {/* Stomach */}
                            <ellipse cx={200} cy={160} rx={40} ry={30} fill={systemColors.digestive} opacity={0.8} />
                            <text x={200} y={165} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">STOMACH</text>
                            
                            {/* Small intestine */}
                            <path
                                d="M 200 190 Q 150 220 180 250 Q 210 280 160 300"
                                stroke={systemColors.digestive}
                                strokeWidth={15}
                                fill="none"
                                opacity={0.7}
                            />
                            <text x={140} y={250} fill="white" fontSize="10">SMALL</text>
                            <text x={140} y={265} fill="white" fontSize="10">INTESTINE</text>
                            
                            {/* Large intestine */}
                            <path
                                d="M 160 300 Q 200 320 240 300 Q 260 270 240 240"
                                stroke={systemColors.digestive}
                                strokeWidth={20}
                                fill="none"
                                opacity={0.6}
                            />
                            <text x={260} y={280} fill="white" fontSize="10">LARGE</text>
                            <text x={260} y={295} fill="white" fontSize="10">INTESTINE</text>
                            
                            {/* Liver */}
                            <ellipse cx={280} cy={140} rx={35} ry={25} fill="#8b4513" opacity={0.7} />
                            <text x={280} y={145} textAnchor="middle" fill="white" fontSize="10">LIVER</text>
                            
                            {/* Pancreas */}
                            <ellipse cx={260} cy={180} rx={30} ry={12} fill="#d4a574" opacity={0.7} />
                            <text x={260} y={185} textAnchor="middle" fill="white" fontSize="9">PANCREAS</text>
                        </g>
                    </>
                )}

                {stage === "CIRCULATORY" && (
                    <>
                        {/* Circulatory system */}
                        <g>
                            {/* Heart */}
                            <path
                                d="M 200 150 L 180 180 L 200 220 L 220 180 Z"
                                fill={systemColors.circulatory}
                                opacity={0.8}
                            />
                            <text x={200} y={190} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">HEART</text>
                            
                            {/* Arteries (red) */}
                            <g>
                                <path
                                    d="M 220 160 Q 280 120 300 80"
                                    stroke="#ff6b6b"
                                    strokeWidth={8}
                                    fill="none"
                                    opacity={0.8}
                                />
                                <path
                                    d="M 220 200 Q 280 240 300 280"
                                    stroke="#ff6b6b"
                                    strokeWidth={8}
                                    fill="none"
                                    opacity={0.8}
                                />
                                <text x={310} y={85} fill="#ff6b6b" fontSize="11" fontWeight="bold">ARTERIES</text>
                                <text x={310} y={285} fill="#ff6b6b" fontSize="10">(Oxygenated)</text>
                            </g>
                            
                            {/* Veins (blue) */}
                            <g>
                                <path
                                    d="M 100 80 Q 120 120 180 160"
                                    stroke="#4a90e2"
                                    strokeWidth={8}
                                    fill="none"
                                    opacity={0.8}
                                />
                                <path
                                    d="M 100 280 Q 120 240 180 200"
                                    stroke="#4a90e2"
                                    strokeWidth={8}
                                    fill="none"
                                    opacity={0.8}
                                />
                                <text x={50} y={85} fill="#4a90e2" fontSize="11" fontWeight="bold">VEINS</text>
                                <text x={50} y={285} fill="#4a90e2" fontSize="10">(Deoxygenated)</text>
                            </g>
                            
                            {/* Blood flow arrows */}
                            <defs>
                                <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                    <polygon points="0 0, 10 3, 0 6" fill="#ff6b6b" />
                                </marker>
                                <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                    <polygon points="0 0, 10 3, 0 6" fill="#4a90e2" />
                                </marker>
                            </defs>
                        </g>
                    </>
                )}

                {stage === "RESPIRATORY" && (
                    <>
                        {/* Respiratory system */}
                        <g>
                            {/* Nose */}
                            <ellipse cx={200} cy={50} rx={20} ry={15} fill={systemColors.respiratory} opacity={0.7} />
                            <text x={200} y={55} textAnchor="middle" fill="white" fontSize="10">NOSE</text>
                            
                            {/* Pharynx */}
                            <rect x={190} y={70} width={20} height={30} fill={systemColors.respiratory} opacity={0.7} />
                            <text x={230} y={88} fill="white" fontSize="9">PHARYNX</text>
                            
                            {/* Larynx */}
                            <rect x={185} y={105} width={30} height={25} fill={systemColors.respiratory} opacity={0.8} />
                            <text x={200} y={120} textAnchor="middle" fill="white" fontSize="10">LARYNX</text>
                            
                            {/* Trachea */}
                            <rect x={190} y={135} width={20} height={60} fill={systemColors.respiratory} opacity={0.7} />
                            <text x={230} y={168} fill="white" fontSize="9">TRACHEA</text>
                            
                            {/* Bronchi */}
                            <line x1={200} y1={195} x2={150} y2={220} stroke={systemColors.respiratory} strokeWidth={12} opacity={0.7} />
                            <line x1={200} y1={195} x2={250} y2={220} stroke={systemColors.respiratory} strokeWidth={12} opacity={0.7} />
                            
                            {/* Left Lung */}
                            <ellipse cx={140} cy={260} rx={50} ry={70} fill={systemColors.respiratory} opacity={0.6} />
                            <text x={140} y={265} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">LEFT</text>
                            <text x={140} y={280} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">LUNG</text>
                            
                            {/* Right Lung */}
                            <ellipse cx={260} cy={260} rx={50} ry={70} fill={systemColors.respiratory} opacity={0.6} />
                            <text x={260} y={265} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">RIGHT</text>
                            <text x={260} y={280} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">LUNG</text>
                            
                            {/* Alveoli detail */}
                            <g opacity={0.8}>
                                <circle cx={120} cy={300} r={8} fill="#ff6b9d" />
                                <circle cx={135} cy={305} r={8} fill="#ff6b9d" />
                                <circle cx={125} cy={315} r={8} fill="#ff6b9d" />
                                <text x={90} y={325} fill="#ff6b9d" fontSize="9">ALVEOLI</text>
                            </g>
                            
                            {/* Diaphragm */}
                            <path
                                d="M 80 340 Q 200 360 320 340"
                                stroke="#ffd93d"
                                strokeWidth={6}
                                fill="none"
                                opacity={0.8}
                            />
                            <text x={200} y={375} textAnchor="middle" fill="#ffd93d" fontSize="10">DIAPHRAGM</text>
                        </g>
                    </>
                )}

                {/* Title */}
                <text x={canvasSize / 2} y={25} textAnchor="middle" fill="#00e5ff" fontSize="16" fontWeight="bold">
                    {stage} SYSTEM
                </text>
            </svg>
        </div>
    );
}
