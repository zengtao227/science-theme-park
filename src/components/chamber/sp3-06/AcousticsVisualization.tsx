"use client";

import { useMemo } from "react";
import { useLanguage } from "@/lib/i18n";

type Stage = "SOUND_WAVES" | "FREQUENCY_PITCH" | "LOUDNESS_INTENSITY";

interface AcousticsVisualizationProps {
    stage: Stage;
}

export default function AcousticsVisualization({ stage }: AcousticsVisualizationProps) {
    const { t } = useLanguage();
    const visualization = useMemo(() => {
        const canvasSize = 400;
        const svgClassName = "aspect-square h-auto w-full max-w-[720px] rounded-xl border border-white/10 bg-black/50";
        
        if (stage === "SOUND_WAVES") {
            // Sound wave visualization
            return (
                <svg
                    viewBox={`0 0 ${canvasSize} ${canvasSize}`}
                    className={svgClassName}
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Title */}
                    <text x={canvasSize/2} y={30} fill="#60a5fa" fontSize="16" fontWeight="bold" textAnchor="middle">
                        {t("sp3_06.visualization.sound_waves.title")}
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
                        {t("sp3_06.visualization.sound_waves.compression")}
                    </text>
                    <text x={150} y={canvasSize/2 + 70} fill="#3b82f6" fontSize="12" textAnchor="middle">
                        {t("sp3_06.visualization.sound_waves.rarefaction")}
                    </text>
                    
                    {/* Wave equation */}
                    <text x={canvasSize/2} y={canvasSize - 60} fill="#9ca3af" fontSize="14" textAnchor="middle">
                        v = f × λ
                    </text>
                    <text x={canvasSize/2} y={canvasSize - 40} fill="#9ca3af" fontSize="12" textAnchor="middle">
                        {t("sp3_06.visualization.sound_waves.speed_frequency_wavelength")}
                    </text>
                    <text x={canvasSize/2} y={canvasSize - 20} fill="#9ca3af" fontSize="12" textAnchor="middle">
                        {t("sp3_06.visualization.sound_waves.medium_speeds")}
                    </text>
                </svg>
            );
        }
        
        if (stage === "FREQUENCY_PITCH") {
            // Frequency and pitch visualization
            return (
                <svg
                    viewBox={`0 0 ${canvasSize} ${canvasSize}`}
                    className={svgClassName}
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Title */}
                    <text x={canvasSize/2} y={30} fill="#60a5fa" fontSize="16" fontWeight="bold" textAnchor="middle">
                        {t("sp3_06.visualization.frequency_pitch.title")}
                    </text>
                    
                    {/* Low frequency wave */}
                    <g transform="translate(0, 100)">
                        <text x={20} y={0} fill="#60a5fa" fontSize="12">{t("sp3_06.visualization.frequency_pitch.low_frequency")}</text>
                        <text x={20} y={15} fill="#9ca3af" fontSize="10">{t("sp3_06.visualization.frequency_pitch.low_frequency_detail")}</text>
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
                        <text x={20} y={0} fill="#3b82f6" fontSize="12">{t("sp3_06.visualization.frequency_pitch.high_frequency")}</text>
                        <text x={20} y={15} fill="#9ca3af" fontSize="10">{t("sp3_06.visualization.frequency_pitch.high_frequency_detail")}</text>
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
                            {t("sp3_06.visualization.frequency_pitch.musical_notes")}
                        </text>
                        <text x={80} y={25} fill="#60a5fa" fontSize="11">{t("sp3_06.visualization.frequency_pitch.a4")}</text>
                        <text x={80} y={45} fill="#3b82f6" fontSize="11">{t("sp3_06.visualization.frequency_pitch.a5")}</text>
                        <text x={80} y={65} fill="#9ca3af" fontSize="10">{t("sp3_06.visualization.frequency_pitch.human_range")}</text>
                    </g>
                </svg>
            );
        }
        
        // LOUDNESS_INTENSITY
        return (
            <svg
                viewBox={`0 0 ${canvasSize} ${canvasSize}`}
                className={svgClassName}
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Title */}
                <text x={canvasSize/2} y={30} fill="#60a5fa" fontSize="16" fontWeight="bold" textAnchor="middle">
                    {t("sp3_06.visualization.loudness_intensity.title")}
                </text>
                
                {/* Decibel scale */}
                <g transform="translate(50, 60)">
                    {[
                        { db: 0, label: t("sp3_06.visualization.loudness_intensity.threshold_of_hearing"), y: 0, color: "#4ade80" },
                        { db: 30, label: t("sp3_06.visualization.loudness_intensity.whisper"), y: 40, color: "#60a5fa" },
                        { db: 60, label: t("sp3_06.visualization.loudness_intensity.conversation"), y: 80, color: "#3b82f6" },
                        { db: 85, label: t("sp3_06.visualization.loudness_intensity.safety_limit"), y: 120, color: "#f59e0b" },
                        { db: 110, label: t("sp3_06.visualization.loudness_intensity.rock_concert"), y: 160, color: "#ef4444" },
                        { db: 140, label: t("sp3_06.visualization.loudness_intensity.jet_engine"), y: 200, color: "#dc2626" },
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
                        {t("sp3_06.visualization.loudness_intensity.distance_effect")}
                    </text>
                    <text x={0} y={20} fill="#60a5fa" fontSize="11">
                        {t("sp3_06.visualization.loudness_intensity.double_distance")}
                    </text>
                    <text x={0} y={40} fill="#3b82f6" fontSize="11">
                        {t("sp3_06.visualization.loudness_intensity.tenfold_distance")}
                    </text>
                    <text x={0} y={60} fill="#9ca3af" fontSize="10">
                        {t("sp3_06.visualization.loudness_intensity.inverse_square_law")}
                    </text>
                </g>
            </svg>
        );
    }, [stage, t]);

    return (
        <div className="flex min-h-[680px] flex-col items-center justify-center p-4">
            {visualization}
        </div>
    );
}
