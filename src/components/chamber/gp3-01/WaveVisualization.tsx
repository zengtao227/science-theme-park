"use client";

import { useMemo, useState, useEffect } from "react";

interface GP301Quest {
    stage: string;
    amplitude?: number;
    frequency?: number;
    wavelength?: number;
    velocity?: number;
    medium?: string;
    waveType?: string;
}

interface WaveVisualizationProps {
    quest: GP301Quest | null;
    inputs: Record<string, string>;
    checkStatus: { ok: boolean; correct: string } | null;
}

export default function WaveVisualization({
    quest,
    inputs,
    checkStatus
}: WaveVisualizationProps) {
    const canvasSize = 400;
    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;
    
    // Animation time state
    const [time, setTime] = useState(0);

    // Animate wave motion using requestAnimationFrame
    useEffect(() => {
        let animationFrameId: number;
        let lastTimestamp = 0;

        const animate = (timestamp: number) => {
            if (lastTimestamp === 0) {
                lastTimestamp = timestamp;
            }
            const deltaTime = (timestamp - lastTimestamp) / 1000; // Convert to seconds
            lastTimestamp = timestamp;

            setTime((prevTime) => prevTime + deltaTime);
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Generate animated wave path
    const wavePath = useMemo(() => {
        if (!quest) return "";
        
        const amplitude = quest.amplitude || 50;
        const wavelength = quest.wavelength || 100;
        const frequency = quest.frequency || 1;
        const points: string[] = [];
        
        for (let x = 0; x <= canvasSize; x += 2) {
            // Deterministic wave function: y = A * sin(kx - ωt)
            // k = 2π/λ, ω = 2πf
            const k = (2 * Math.PI) / wavelength;
            const omega = 2 * Math.PI * frequency;
            const phase = k * x - omega * time;
            const y = centerY - amplitude * Math.sin(phase);
            points.push(`${x},${y}`);
        }
        
        return `M ${points.join(" L ")}`;
    }, [quest, canvasSize, centerY, time]);

    // Generate second wave for SUPERPOSITION stage
    const wave2Path = useMemo(() => {
        if (!quest || quest.stage !== "SUPERPOSITION") return "";
        
        const amplitude = (quest.amplitude || 50) * 0.7; // Slightly different amplitude
        const wavelength = quest.wavelength || 100;
        const frequency = quest.frequency || 1;
        const points: string[] = [];
        
        for (let x = 0; x <= canvasSize; x += 2) {
            const k = (2 * Math.PI) / wavelength;
            const omega = 2 * Math.PI * frequency;
            // Phase shift for second wave
            const phase = k * x - omega * time + Math.PI / 4;
            const y = centerY - amplitude * Math.sin(phase);
            points.push(`${x},${y}`);
        }
        
        return `M ${points.join(" L ")}`;
    }, [quest, canvasSize, centerY, time]);

    // Generate superposition (combined) wave
    const superpositionPath = useMemo(() => {
        if (!quest || quest.stage !== "SUPERPOSITION") return "";
        
        const amplitude1 = quest.amplitude || 50;
        const amplitude2 = amplitude1 * 0.7;
        const wavelength = quest.wavelength || 100;
        const frequency = quest.frequency || 1;
        const points: string[] = [];
        
        for (let x = 0; x <= canvasSize; x += 2) {
            const k = (2 * Math.PI) / wavelength;
            const omega = 2 * Math.PI * frequency;
            
            // Wave 1
            const phase1 = k * x - omega * time;
            const y1 = amplitude1 * Math.sin(phase1);
            
            // Wave 2
            const phase2 = k * x - omega * time + Math.PI / 4;
            const y2 = amplitude2 * Math.sin(phase2);
            
            // Superposition
            const y = centerY - (y1 + y2);
            points.push(`${x},${y}`);
        }
        
        return `M ${points.join(" L ")}`;
    }, [quest, canvasSize, centerY, time]);

    if (!quest) {
        return (
            <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
                No wave data available
            </div>
        );
    }

    // Render OPTICS stage with light ray diagrams
    if (quest.stage === "OPTICS") {
        return (
            <div className="w-full h-full flex flex-col gap-4">
                <div className="flex-1 relative bg-gray-900/50 rounded-lg p-4">
                    <svg
                        width="100%"
                        height="100%"
                        viewBox={`0 0 ${canvasSize} ${canvasSize}`}
                        className="w-full h-full"
                    >
                        {/* Interface line (between two media) */}
                        <line
                            x1={centerX}
                            y1="0"
                            x2={centerX}
                            y2={canvasSize}
                            stroke="rgba(255,255,255,0.4)"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                        />
                        
                        {/* Normal line */}
                        <line
                            x1={centerX}
                            y1={centerY - 100}
                            x2={centerX}
                            y2={centerY + 100}
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="1"
                            strokeDasharray="2,2"
                        />
                        
                        {/* Incident ray */}
                        <line
                            x1={centerX - 80}
                            y1={centerY - 80}
                            x2={centerX}
                            y2={centerY}
                            stroke="#ff6b6b"
                            strokeWidth="2"
                        />
                        <text x={centerX - 100} y={centerY - 85} fill="#ff6b6b" fontSize="11">
                            Incident
                        </text>
                        
                        {/* Reflected ray */}
                        <line
                            x1={centerX}
                            y1={centerY}
                            x2={centerX - 80}
                            y2={centerY + 80}
                            stroke="#4ecdc4"
                            strokeWidth="2"
                        />
                        <text x={centerX - 100} y={centerY + 100} fill="#4ecdc4" fontSize="11">
                            Reflected
                        </text>
                        
                        {/* Refracted ray */}
                        <line
                            x1={centerX}
                            y1={centerY}
                            x2={centerX + 60}
                            y2={centerY + 80}
                            stroke="#00ff88"
                            strokeWidth="2"
                        />
                        <text x={centerX + 65} y={centerY + 85} fill="#00ff88" fontSize="11">
                            Refracted
                        </text>
                        
                        {/* Medium labels */}
                        <text x="20" y="30" fill="rgba(255,255,255,0.6)" fontSize="12">
                            Medium 1 (n_1)
                        </text>
                        <text x={centerX + 20} y="30" fill="rgba(255,255,255,0.6)" fontSize="12">
                            Medium 2 (n_2)
                        </text>
                        
                        {/* Angle markers */}
                        <path
                            d={`M ${centerX - 30} ${centerY} A 30 30 0 0 1 ${centerX} ${centerY - 30}`}
                            fill="none"
                            stroke="#ff6b6b"
                            strokeWidth="1"
                        />
                        <text x={centerX - 40} y={centerY - 15} fill="#ff6b6b" fontSize="10">
                            θᵢ
                        </text>
                        
                        <path
                            d={`M ${centerX} ${centerY + 30} A 30 30 0 0 1 ${centerX + 30} ${centerY}`}
                            fill="none"
                            stroke="#00ff88"
                            strokeWidth="1"
                        />
                        <text x={centerX + 15} y={centerY + 45} fill="#00ff88" fontSize="10">
                            θᵣ
                        </text>
                    </svg>
                </div>
                
                <div className="text-xs text-white/60 font-mono text-center">
                    {checkStatus ? (
                        checkStatus.ok ? "✓ VERIFIED" : "✗ MISMATCH"
                    ) : "READY"}
                </div>
            </div>
        );
    }

    // Render SUPERPOSITION stage with two waves + combined wave
    if (quest.stage === "SUPERPOSITION") {
        return (
            <div className="w-full h-full flex flex-col gap-4">
                <div className="flex-1 relative bg-gray-900/50 rounded-lg p-4">
                    <svg
                        width="100%"
                        height="100%"
                        viewBox={`0 0 ${canvasSize} ${canvasSize}`}
                        className="w-full h-full"
                    >
                        {/* Axes */}
                        <line
                            x1="0"
                            y1={centerY}
                            x2={canvasSize}
                            y2={centerY}
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="1"
                        />
                        
                        {/* Wave 1 */}
                        <path
                            d={wavePath}
                            fill="none"
                            stroke="#ff6b6b"
                            strokeWidth="1.5"
                            opacity="0.7"
                        />
                        
                        {/* Wave 2 */}
                        <path
                            d={wave2Path}
                            fill="none"
                            stroke="#4ecdc4"
                            strokeWidth="1.5"
                            opacity="0.7"
                        />
                        
                        {/* Superposition (combined wave) */}
                        <path
                            d={superpositionPath}
                            fill="none"
                            stroke="#00ff88"
                            strokeWidth="2.5"
                        />
                        
                        {/* Labels */}
                        <text x="10" y="20" fill="#ff6b6b" fontSize="11">
                            Wave 1
                        </text>
                        <text x="10" y="35" fill="#4ecdc4" fontSize="11">
                            Wave 2
                        </text>
                        <text x="10" y="50" fill="#00ff88" fontSize="12" fontWeight="bold">
                            Superposition
                        </text>
                        
                        {quest.amplitude && (
                            <text x="10" y="70" fill="rgba(255,255,255,0.7)" fontSize="11">
                                A = {quest.amplitude} m
                            </text>
                        )}
                        {quest.wavelength && (
                            <text x="10" y="85" fill="rgba(255,255,255,0.7)" fontSize="11">
                                λ = {quest.wavelength} m
                            </text>
                        )}
                        {quest.frequency && (
                            <text x="10" y="100" fill="rgba(255,255,255,0.7)" fontSize="11">
                                f = {quest.frequency} Hz
                            </text>
                        )}
                    </svg>
                </div>
                
                <div className="text-xs text-white/60 font-mono text-center">
                    {checkStatus ? (
                        checkStatus.ok ? "✓ VERIFIED" : "✗ MISMATCH"
                    ) : "READY"}
                </div>
            </div>
        );
    }

    // Default: WAVE_PROPERTIES stage with single animated wave
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <div className="flex-1 relative bg-gray-900/50 rounded-lg p-4">
                <svg
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${canvasSize} ${canvasSize}`}
                    className="w-full h-full"
                >
                    {/* Axes */}
                    <line
                        x1="0"
                        y1={centerY}
                        x2={canvasSize}
                        y2={centerY}
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                    />
                    <line
                        x1={centerX}
                        y1="0"
                        x2={centerX}
                        y2={canvasSize}
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                    />
                    
                    {/* Animated Wave */}
                    <path
                        d={wavePath}
                        fill="none"
                        stroke="#00ff88"
                        strokeWidth="2.5"
                    />
                    
                    {/* Amplitude markers */}
                    {quest.amplitude && (
                        <>
                            <line
                                x1="50"
                                y1={centerY - (quest.amplitude || 50)}
                                x2="70"
                                y2={centerY - (quest.amplitude || 50)}
                                stroke="#ff6b6b"
                                strokeWidth="1"
                                strokeDasharray="3,3"
                            />
                            <line
                                x1="50"
                                y1={centerY + (quest.amplitude || 50)}
                                x2="70"
                                y2={centerY + (quest.amplitude || 50)}
                                stroke="#ff6b6b"
                                strokeWidth="1"
                                strokeDasharray="3,3"
                            />
                            <line
                                x1="60"
                                y1={centerY - (quest.amplitude || 50)}
                                x2="60"
                                y2={centerY + (quest.amplitude || 50)}
                                stroke="#ff6b6b"
                                strokeWidth="1.5"
                            />
                            <text x="75" y={centerY + 5} fill="#ff6b6b" fontSize="11">
                                2A
                            </text>
                        </>
                    )}
                    
                    {/* Wavelength marker */}
                    {quest.wavelength && (
                        <>
                            <line
                                x1="100"
                                y1={centerY + 60}
                                x2={100 + (quest.wavelength || 100)}
                                y2={centerY + 60}
                                stroke="#4ecdc4"
                                strokeWidth="1.5"
                            />
                            <line
                                x1="100"
                                y1={centerY + 55}
                                x2="100"
                                y2={centerY + 65}
                                stroke="#4ecdc4"
                                strokeWidth="1"
                            />
                            <line
                                x1={100 + (quest.wavelength || 100)}
                                y1={centerY + 55}
                                x2={100 + (quest.wavelength || 100)}
                                y2={centerY + 65}
                                stroke="#4ecdc4"
                                strokeWidth="1"
                            />
                            <text 
                                x={100 + (quest.wavelength || 100) / 2 - 5} 
                                y={centerY + 75} 
                                fill="#4ecdc4" 
                                fontSize="11"
                            >
                                λ
                            </text>
                        </>
                    )}
                    
                    {/* Labels */}
                    {quest.amplitude && (
                        <text x="10" y="20" fill="#00ff88" fontSize="12">
                            A = {quest.amplitude} m
                        </text>
                    )}
                    {quest.wavelength && (
                        <text x="10" y="35" fill="#00ff88" fontSize="12">
                            λ = {quest.wavelength} m
                        </text>
                    )}
                    {quest.frequency && (
                        <text x="10" y="50" fill="#00ff88" fontSize="12">
                            f = {quest.frequency} Hz
                        </text>
                    )}
                    {quest.velocity && (
                        <text x="10" y="65" fill="#00ff88" fontSize="12">
                            v = {quest.velocity} m/s
                        </text>
                    )}
                </svg>
            </div>
            
            {/* Status indicator */}
            <div className="text-xs text-white/60 font-mono text-center">
                {checkStatus ? (
                    checkStatus.ok ? "✓ VERIFIED" : "✗ MISMATCH"
                ) : "READY"}
            </div>
        </div>
    );
}
