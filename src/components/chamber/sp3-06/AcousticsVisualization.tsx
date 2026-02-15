"use client";

import { useMemo } from "react";

type Stage = "SOUND_WAVES" | "FREQUENCY_PITCH" | "LOUDNESS_INTENSITY";

interface AcousticsVisualizationProps {
    stage: Stage;
}

export default function AcousticsVisualization({ stage }: AcousticsVisualizationProps) {
    const visualization = useMemo(() => {
        const canvasSize = 400;
        
        if (stage === "SOUND_WAVES") {
            // Sound wave visualization
            return (
                <svg width={canvasSize} height={canvasSize} viewBox={`0 0 ${canvasSize} ${canvasSize}`} className="bg-black/50 rounded-xl border border-white/10">
                    {/* Title */}
                    <text x={canvasSize/2} y={30} fill="#60a5fa" fontSize="16" fontWeight="bold" textAnchor="middle">
                        Sound Wave
                    </text>
                    
                    {/* Longitudinal wave representation */}
                    <g transform={`translate(0, ${canvasSize/2})`}>
                        {/* Compression and rarefaction */}
                        {Array.from({ length: 8 }).map((_, i) => {
                            const x = 50 + i * 40;
                            const compression = i % 2 === 0;
                            const spacing = compression ? 3 : 8;
                            
                            return (
                                <g key={i}>
                                    {Array.from({ length: 5 }).map((_, j) => (
                                        <line
                                            key={j}
                                            x1={x + j * spacing}
                                            y1={-40}
                                            x2={x + j * spacing}
                                            y2={40}
                                            stroke={compression ? "#60a5fa" : "#3b82f6"}
                                            strokeWidth="2"
                                            opacity={compression ? 0.9 : 0.4}
                                        />
                                    ))}
                                </g>
                            );
                        })}
                    </g>
                    
                    {/* Labels */}
                    <text x={70} y={canvasSize/2 + 70} fill="#60a5fa" fontSize="12" textAnchor="middle">
                        Compression
                    </text>
                    <text x={150} y={canvasSize/2 + 70} fill="#3b82f6" fontSize="12" textAnchor="middle">
                        Rarefaction
                    </text>
                    
                    {/* Wave equation */}
                    <text x={canvasSize/2} y={canvasSize - 60} fill="#9ca3af" fontSize="14" textAnchor="middle">
                        v = f × λ
                    </text>
                    <text x={canvasSize/2} y={canvasSize - 40} fill="#9ca3af" fontSize="12" textAnchor="middle">
                        Speed = Frequency × Wavelength
                    </text>
                    <text x={canvasSize/2} y={canvasSize - 20} fill="#9ca3af" fontSize="12" textAnchor="middle">
                        Air: 343 m/s | Water: 1480 m/s
                    </text>
                </svg>
            );
        }
        
        if (stage === "FREQUENCY_PITCH") {
            // Frequency and pitch visualization
            return (
                <svg width={canvasSize} height={canvasSize} viewBox={`0 0 ${canvasSize} ${canvasSize}`} className="bg-black/50 rounded-xl border border-white/10">
                    {/* Title */}
                    <text x={canvasSize/2} y={30} fill="#60a5fa" fontSize="16" fontWeight="bold" textAnchor="middle">
                        Frequency & Pitch
                    </text>
                    
                    {/* Low frequency wave */}
                    <g transform="translate(0, 100)">
                        <text x={20} y={0} fill="#60a5fa" fontSize="12">Low Frequency</text>
                        <text x={20} y={15} fill="#9ca3af" fontSize="10">220 Hz (Low Pitch)</text>
                        <path
                            d={`M 50 30 ${Array.from({ length: 4 }).map((_, i) => {
                                const x = 50 + i * 80;
                                return `Q ${x + 20} 10, ${x + 40} 30 Q ${x + 60} 50, ${x + 80} 30`;
                            }).join(' ')}`}
                            fill="none"
                            stroke="#60a5fa"
                            strokeWidth="2"
                        />
                    </g>
                    
                    {/* High frequency wave */}
                    <g transform="translate(0, 200)">
                        <text x={20} y={0} fill="#3b82f6" fontSize="12">High Frequency</text>
                        <text x={20} y={15} fill="#9ca3af" fontSize="10">880 Hz (High Pitch)</text>
                        <path
                            d={`M 50 30 ${Array.from({ length: 16 }).map((_, i) => {
                                const x = 50 + i * 20;
                                return `Q ${x + 5} 10, ${x + 10} 30 Q ${x + 15} 50, ${x + 20} 30`;
                            }).join(' ')}`}
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                        />
                    </g>
                    
                    {/* Musical notes */}
                    <g transform="translate(0, 300)">
                        <text x={canvasSize/2} y={0} fill="#9ca3af" fontSize="12" textAnchor="middle">
                            Musical Notes
                        </text>
                        <text x={80} y={25} fill="#60a5fa" fontSize="11">A4: 440 Hz</text>
                        <text x={80} y={45} fill="#3b82f6" fontSize="11">A5: 880 Hz (octave)</text>
                        <text x={80} y={65} fill="#9ca3af" fontSize="10">Human: 20-20,000 Hz</text>
                    </g>
                </svg>
            );
        }
        
        // LOUDNESS_INTENSITY
        return (
            <svg width={canvasSize} height={canvasSize} viewBox={`0 0 ${canvasSize} ${canvasSize}`} className="bg-black/50 rounded-xl border border-white/10">
                {/* Title */}
                <text x={canvasSize/2} y={30} fill="#60a5fa" fontSize="16" fontWeight="bold" textAnchor="middle">
                    Sound Intensity (dB)
                </text>
                
                {/* Decibel scale */}
                <g transform="translate(50, 60)">
                    {[
                        { db: 0, label: "Threshold of hearing", y: 0, color: "#4ade80" },
                        { db: 30, label: "Whisper", y: 40, color: "#60a5fa" },
                        { db: 60, label: "Conversation", y: 80, color: "#3b82f6" },
                        { db: 85, label: "Safety limit", y: 120, color: "#f59e0b" },
                        { db: 110, label: "Rock concert", y: 160, color: "#ef4444" },
                        { db: 140, label: "Jet engine (pain)", y: 200, color: "#dc2626" },
                    ].map((item) => (
                        <g key={item.db} transform={`translate(0, ${item.y})`}>
                            <rect x={0} y={0} width={item.db * 2} height={25} fill={item.color} opacity={0.3} />
                            <text x={5} y={17} fill={item.color} fontSize="11" fontWeight="bold">
                                {item.db} dB
                            </text>
                            <text x={item.db * 2 + 10} y={17} fill="#9ca3af" fontSize="10">
                                {item.label}
                            </text>
                        </g>
                    ))}
                </g>
                
                {/* Inverse square law */}
                <g transform="translate(50, 300)">
                    <text x={0} y={0} fill="#9ca3af" fontSize="12" fontWeight="bold">
                        Distance Effect:
                    </text>
                    <text x={0} y={20} fill="#60a5fa" fontSize="11">
                        2× distance → -6 dB
                    </text>
                    <text x={0} y={40} fill="#3b82f6" fontSize="11">
                        10× distance → -20 dB
                    </text>
                    <text x={0} y={60} fill="#9ca3af" fontSize="10">
                        (Inverse square law)
                    </text>
                </g>
            </svg>
        );
    }, [stage]);

    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            {visualization}
        </div>
    );
}
