"use client";

import { useMemo } from "react";

type Stage = "COMPONENTS" | "SIMPLE_CIRCUITS" | "CIRCUIT_DIAGRAMS";

interface Quest {
    stage: Stage;
    component?: string;
    circuit?: {
        battery: number;
        bulbs: number;
        switches: number;
        wires: number;
    };
    symbol?: string;
    answer: string;
}

interface CircuitVisualizationProps {
    quest: Quest;
    stage: Stage;
    lightIntensity: number;
    translations: {
        components: string;
        simple_circuits: string;
        circuit_diagrams: string;
    };
}

export default function CircuitVisualization({
    quest,
    stage,
    lightIntensity,
    translations,
}: CircuitVisualizationProps) {
    const canvasSize = 400;
    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;

    // Component visualization
    const renderComponent = useMemo(() => {
        if (stage !== "COMPONENTS" || !quest.component) return null;

        const component = quest.component;

        // Battery
        if (component.includes("battery")) {
            return (
                <g>
                    <line x1={centerX - 40} y1={centerY} x2={centerX - 20} y2={centerY} stroke="#00e5ff" strokeWidth="3" />
                    <line x1={centerX - 20} y1={centerY - 30} x2={centerX - 20} y2={centerY + 30} stroke="#00e5ff" strokeWidth="4" />
                    <line x1={centerX + 20} y1={centerY - 15} x2={centerX + 20} y2={centerY + 15} stroke="#00e5ff" strokeWidth="4" />
                    <line x1={centerX + 20} y1={centerY} x2={centerX + 40} y2={centerY} stroke="#00e5ff" strokeWidth="3" />
                    <text x={centerX} y={centerY + 60} fill="#00e5ff" fontSize="14" textAnchor="middle">Battery</text>
                </g>
            );
        }

        // Bulb
        if (component.includes("bulb")) {
            const brightness = component.includes("bright") ? 1 : component.includes("dim") ? 0.3 : 0.6;
            return (
                <g>
                    <circle cx={centerX} cy={centerY} r="40" fill="none" stroke="#00e5ff" strokeWidth="3" />
                    <circle cx={centerX} cy={centerY} r="30" fill={`rgba(255, 255, 0, ${brightness})`} />
                    <line x1={centerX - 20} y1={centerY - 20} x2={centerX + 20} y2={centerY + 20} stroke="#00e5ff" strokeWidth="2" />
                    <line x1={centerX + 20} y1={centerY - 20} x2={centerX - 20} y2={centerY + 20} stroke="#00e5ff" strokeWidth="2" />
                    <text x={centerX} y={centerY + 70} fill="#00e5ff" fontSize="14" textAnchor="middle">Bulb</text>
                </g>
            );
        }

        // Switch
        if (component.includes("switch")) {
            const isOpen = component.includes("open");
            return (
                <g>
                    <line x1={centerX - 40} y1={centerY} x2={centerX - 10} y2={centerY} stroke="#00e5ff" strokeWidth="3" />
                    <circle cx={centerX - 10} cy={centerY} r="5" fill="#00e5ff" />
                    <circle cx={centerX + 10} cy={centerY} r="5" fill="#00e5ff" />
                    {isOpen ? (
                        <line x1={centerX - 10} y1={centerY} x2={centerX + 10} y2={centerY - 20} stroke="#00e5ff" strokeWidth="3" />
                    ) : (
                        <line x1={centerX - 10} y1={centerY} x2={centerX + 10} y2={centerY} stroke="#00e5ff" strokeWidth="3" />
                    )}
                    <line x1={centerX + 10} y1={centerY} x2={centerX + 40} y2={centerY} stroke="#00e5ff" strokeWidth="3" />
                    <text x={centerX} y={centerY + 50} fill="#00e5ff" fontSize="14" textAnchor="middle">
                        Switch ({isOpen ? "Open" : "Closed"})
                    </text>
                </g>
            );
        }

        // Wire
        if (component === "wire") {
            return (
                <g>
                    <line x1={centerX - 80} y1={centerY} x2={centerX + 80} y2={centerY} stroke="#00e5ff" strokeWidth="3" />
                    <text x={centerX} y={centerY + 40} fill="#00e5ff" fontSize="14" textAnchor="middle">Wire</text>
                </g>
            );
        }

        // Resistor
        if (component === "resistor") {
            return (
                <g>
                    <line x1={centerX - 60} y1={centerY} x2={centerX - 40} y2={centerY} stroke="#00e5ff" strokeWidth="3" />
                    <rect x={centerX - 40} y={centerY - 15} width="80" height="30" fill="none" stroke="#00e5ff" strokeWidth="3" />
                    <line x1={centerX + 40} y1={centerY} x2={centerX + 60} y2={centerY} stroke="#00e5ff" strokeWidth="3" />
                    <text x={centerX} y={centerY + 50} fill="#00e5ff" fontSize="14" textAnchor="middle">Resistor</text>
                </g>
            );
        }

        // Ammeter
        if (component === "ammeter") {
            return (
                <g>
                    <circle cx={centerX} cy={centerY} r="40" fill="none" stroke="#00e5ff" strokeWidth="3" />
                    <text x={centerX} y={centerY + 10} fill="#00e5ff" fontSize="24" textAnchor="middle" fontWeight="bold">A</text>
                    <text x={centerX} y={centerY + 70} fill="#00e5ff" fontSize="14" textAnchor="middle">Ammeter</text>
                </g>
            );
        }

        // Voltmeter
        if (component === "voltmeter") {
            return (
                <g>
                    <circle cx={centerX} cy={centerY} r="40" fill="none" stroke="#00e5ff" strokeWidth="3" />
                    <text x={centerX} y={centerY + 10} fill="#00e5ff" fontSize="24" textAnchor="middle" fontWeight="bold">V</text>
                    <text x={centerX} y={centerY + 70} fill="#00e5ff" fontSize="14" textAnchor="middle">Voltmeter</text>
                </g>
            );
        }

        // Default component
        return (
            <g>
                <rect x={centerX - 50} y={centerY - 30} width="100" height="60" fill="none" stroke="#00e5ff" strokeWidth="3" rx="10" />
                <text x={centerX} y={centerY + 10} fill="#00e5ff" fontSize="14" textAnchor="middle">{component}</text>
            </g>
        );
    }, [stage, quest.component, centerX, centerY]);

    // Simple circuit visualization
    const renderCircuit = useMemo(() => {
        if (stage !== "SIMPLE_CIRCUITS" || !quest.circuit) return null;

        const { battery, bulbs, switches } = quest.circuit;
        const radius = 120;

        return (
            <g>
                {/* Circuit loop */}
                <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#00e5ff" strokeWidth="2" strokeDasharray="5,5" />
                
                {/* Battery */}
                <g transform={`translate(${centerX}, ${centerY - radius})`}>
                    <line x1={-15} y1={0} x2={-15} y2={-20} stroke="#00e5ff" strokeWidth="3" />
                    <line x1={15} y1={0} x2={15} y2={-10} stroke="#00e5ff" strokeWidth="3" />
                    <text x={0} y={-30} fill="#00e5ff" fontSize="12" textAnchor="middle">{battery}×</text>
                </g>

                {/* Bulbs */}
                {Array.from({ length: Math.min(bulbs, 3) }).map((_, i) => {
                    const angle = (Math.PI / 2) + (i * Math.PI / 3);
                    const x = centerX + radius * Math.cos(angle);
                    const y = centerY + radius * Math.sin(angle);
                    const brightness = lightIntensity / 100;
                    
                    return (
                        <g key={i}>
                            <circle cx={x} cy={y} r="20" fill="none" stroke="#00e5ff" strokeWidth="2" />
                            <circle cx={x} cy={y} r="15" fill={`rgba(255, 255, 0, ${brightness})`} />
                            <line x1={x - 10} y1={y - 10} x2={x + 10} y2={y + 10} stroke="#00e5ff" strokeWidth="1" />
                            <line x1={x + 10} y1={y - 10} x2={x - 10} y2={y + 10} stroke="#00e5ff" strokeWidth="1" />
                        </g>
                    );
                })}

                {/* Switches */}
                {switches > 0 && (
                    <g transform={`translate(${centerX + radius}, ${centerY})`}>
                        <circle cx={-10} cy={0} r="4" fill="#00e5ff" />
                        <circle cx={10} cy={0} r="4" fill="#00e5ff" />
                        <line x1={-10} y1={0} x2={10} y2={0} stroke="#00e5ff" strokeWidth="2" />
                    </g>
                )}

                {/* Info panel */}
                <g transform={`translate(${centerX}, ${centerY + radius + 40})`}>
                    <text x={0} y={0} fill="#00e5ff" fontSize="12" textAnchor="middle">
                        {battery}× Battery | {bulbs}× Bulbs | {switches}× Switches
                    </text>
                    <text x={0} y={20} fill="#ffff00" fontSize="12" textAnchor="middle">
                        Light Intensity: {Math.round(lightIntensity)}%
                    </text>
                </g>
            </g>
        );
    }, [stage, quest.circuit, centerX, centerY, lightIntensity]);

    // Circuit symbol visualization
    const renderSymbol = useMemo(() => {
        if (stage !== "CIRCUIT_DIAGRAMS" || !quest.symbol) return null;

        const symbol = quest.symbol;

        // Battery symbol
        if (symbol === "battery") {
            return (
                <g>
                    <line x1={centerX - 40} y1={centerY} x2={centerX - 20} y2={centerY} stroke="#00e5ff" strokeWidth="3" />
                    <line x1={centerX - 20} y1={centerY - 30} x2={centerX - 20} y2={centerY + 30} stroke="#00e5ff" strokeWidth="4" />
                    <line x1={centerX + 20} y1={centerY - 15} x2={centerX + 20} y2={centerY + 15} stroke="#00e5ff" strokeWidth="4" />
                    <line x1={centerX + 20} y1={centerY} x2={centerX + 40} y2={centerY} stroke="#00e5ff" strokeWidth="3" />
                    <text x={centerX - 20} y={centerY - 50} fill="#ff0000" fontSize="14" textAnchor="middle">+</text>
                    <text x={centerX + 20} y={centerY + 40} fill="#0000ff" fontSize="14" textAnchor="middle">−</text>
                </g>
            );
        }

        // Bulb symbol
        if (symbol === "bulb") {
            return (
                <g>
                    <circle cx={centerX} cy={centerY} r="40" fill="none" stroke="#00e5ff" strokeWidth="3" />
                    <line x1={centerX - 25} y1={centerY - 25} x2={centerX + 25} y2={centerY + 25} stroke="#00e5ff" strokeWidth="2" />
                    <line x1={centerX + 25} y1={centerY - 25} x2={centerX - 25} y2={centerY + 25} stroke="#00e5ff" strokeWidth="2" />
                </g>
            );
        }

        // Switch symbols
        if (symbol.includes("switch")) {
            const isOpen = symbol.includes("open");
            return (
                <g>
                    <line x1={centerX - 60} y1={centerY} x2={centerX - 10} y2={centerY} stroke="#00e5ff" strokeWidth="3" />
                    <circle cx={centerX - 10} cy={centerY} r="5" fill="#00e5ff" />
                    <circle cx={centerX + 10} cy={centerY} r="5" fill="#00e5ff" />
                    {isOpen ? (
                        <line x1={centerX - 10} y1={centerY} x2={centerX + 10} y2={centerY - 30} stroke="#00e5ff" strokeWidth="3" />
                    ) : (
                        <line x1={centerX - 10} y1={centerY} x2={centerX + 10} y2={centerY} stroke="#00e5ff" strokeWidth="3" />
                    )}
                    <line x1={centerX + 10} y1={centerY} x2={centerX + 60} y2={centerY} stroke="#00e5ff" strokeWidth="3" />
                </g>
            );
        }

        // Resistor symbol
        if (symbol === "resistor") {
            return (
                <g>
                    <line x1={centerX - 80} y1={centerY} x2={centerX - 40} y2={centerY} stroke="#00e5ff" strokeWidth="3" />
                    <rect x={centerX - 40} y={centerY - 15} width="80" height="30" fill="none" stroke="#00e5ff" strokeWidth="3" />
                    <line x1={centerX + 40} y1={centerY} x2={centerX + 80} y2={centerY} stroke="#00e5ff" strokeWidth="3" />
                </g>
            );
        }

        // Ammeter/Voltmeter symbols
        if (symbol === "ammeter" || symbol === "voltmeter") {
            const label = symbol === "ammeter" ? "A" : "V";
            return (
                <g>
                    <circle cx={centerX} cy={centerY} r="40" fill="none" stroke="#00e5ff" strokeWidth="3" />
                    <text x={centerX} y={centerY + 15} fill="#00e5ff" fontSize="32" textAnchor="middle" fontWeight="bold">{label}</text>
                </g>
            );
        }

        // Default symbol
        return (
            <g>
                <rect x={centerX - 60} y={centerY - 40} width="120" height="80" fill="none" stroke="#00e5ff" strokeWidth="3" rx="10" />
                <text x={centerX} y={centerY + 10} fill="#00e5ff" fontSize="14" textAnchor="middle">{symbol}</text>
            </g>
        );
    }, [stage, quest.symbol, centerX, centerY]);

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex-1 bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
                <svg width={canvasSize} height={canvasSize} className="w-full h-full">
                    {/* Grid background */}
                    <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width={canvasSize} height={canvasSize} fill="url(#grid)" />

                    {/* Render based on stage */}
                    {stage === "COMPONENTS" && renderComponent}
                    {stage === "SIMPLE_CIRCUITS" && renderCircuit}
                    {stage === "CIRCUIT_DIAGRAMS" && renderSymbol}
                </svg>
            </div>

            {/* Info Panel */}
            <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                <div className="text-white/70 text-sm">
                    <div className="font-bold text-white mb-2">Current Stage:</div>
                    <div>{translations[stage.toLowerCase() as keyof typeof translations]}</div>
                </div>
            </div>
        </div>
    );
}
