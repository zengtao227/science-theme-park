"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const CircuitCanvas = dynamic(() => import("@/components/chamber/sp2-02/CircuitCanvas"), {
    ssr: false,
});

interface CircuitComponent {
    id: string;
    type: "resistor" | "capacitor" | "inductor" | "battery" | "wire";
    position: [number, number, number];
    value: number;
    connections: string[];
}

export default function SP2_02_CircuitSandbox() {
    const { t } = useLanguage();
    const [time, setTime] = useState(0);
    const [multimeterMode, setMultimeterMode] = useState<"voltage" | "current" | "off">("off");
    const [selectedPoints, setSelectedPoints] = useState<string[]>([]);
    const [oscilloscopeData, setOscilloscopeData] = useState<number[]>([]);
    const [resistance, setResistance] = useState(100); // Ω
    const [capacitance, setCapacitance] = useState(0.001); // F (1 mF)
    const [inductance, setInductance] = useState(0.1); // H
    const [voltage, setVoltage] = useState(12); // V
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Sample circuit: RLC series circuit
    const [components] = useState<CircuitComponent[]>([
        {
            id: "battery1",
            type: "battery",
            position: [-4, 0, 0],
            value: voltage,
            connections: ["resistor1"],
        },
        {
            id: "resistor1",
            type: "resistor",
            position: [-2, 0, 2],
            value: resistance,
            connections: ["battery1", "capacitor1"],
        },
        {
            id: "capacitor1",
            type: "capacitor",
            position: [0, 0, 4],
            value: capacitance,
            connections: ["resistor1", "inductor1"],
        },
        {
            id: "inductor1",
            type: "inductor",
            position: [2, 0, 2],
            value: inductance,
            connections: ["capacitor1", "battery1"],
        },
    ]);

    // RLC transient analysis
    const solveRLC = (t: number) => {
        const R = resistance;
        const L = inductance;
        const C = capacitance;
        const V0 = voltage;

        // Damping coefficient
        const alpha = R / (2 * L);
        // Natural frequency
        const omega0 = 1 / Math.sqrt(L * C);
        // Discriminant
        const discriminant = alpha * alpha - omega0 * omega0;

        let v_t = 0;

        if (discriminant > 0) {
            // Overdamped
            const s1 = -alpha + Math.sqrt(discriminant);
            const s2 = -alpha - Math.sqrt(discriminant);
            v_t = V0 * (1 - ((s2 * Math.exp(s1 * t) - s1 * Math.exp(s2 * t)) / (s2 - s1)));
        } else if (discriminant < 0) {
            // Underdamped (oscillatory)
            const omegaD = Math.sqrt(-discriminant);
            v_t = V0 * (1 - Math.exp(-alpha * t) * (Math.cos(omegaD * t) + (alpha / omegaD) * Math.sin(omegaD * t)));
        } else {
            // Critically damped
            v_t = V0 * (1 - (1 + alpha * t) * Math.exp(-alpha * t));
        }

        return v_t;
    };

    // Update time and oscilloscope
    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prev) => prev + 0.016); // ~60 FPS

            // Update oscilloscope data
            setOscilloscopeData((prev) => {
                const newData = [...prev, solveRLC(time)];
                return newData.slice(-200); // Keep last 200 points
            });
        }, 16);

        return () => clearInterval(interval);
    }, [time, resistance, capacitance, inductance, voltage]);

    // Draw oscilloscope
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = "#003344";
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const x = (i / 10) * canvas.width;
            const y = (i / 10) * canvas.height;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Draw center line
        ctx.strokeStyle = "#00e5ff";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        // Draw waveform
        if (oscilloscopeData.length > 1) {
            ctx.strokeStyle = "#39ff14";
            ctx.lineWidth = 2;
            ctx.beginPath();

            const maxVoltage = voltage * 1.5;
            oscilloscopeData.forEach((v, i) => {
                const x = (i / oscilloscopeData.length) * canvas.width;
                const y = canvas.height / 2 - (v / maxVoltage) * (canvas.height / 2);
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();
        }

        // Draw labels
        ctx.fillStyle = "#00e5ff";
        ctx.font = "12px monospace";
        ctx.fillText(`V(t)`, 10, 20);
        ctx.fillText(`${voltage.toFixed(1)}V`, 10, canvas.height - 10);
        ctx.fillText(`0V`, 10, canvas.height / 2);
    }, [oscilloscopeData, voltage]);

    const handleComponentClick = (id: string) => {
        if (multimeterMode === "off") return;

        setSelectedPoints((prev) => {
            if (prev.includes(id)) {
                return prev.filter((p) => p !== id);
            } else if (prev.length < 2) {
                return [...prev, id];
            } else {
                return [id];
            }
        });
    };

    // Calculate multimeter reading
    const getMultimeterReading = () => {
        if (selectedPoints.length !== 2) return "Select 2 points";

        const comp1 = components.find((c) => c.id === selectedPoints[0]);
        const comp2 = components.find((c) => c.id === selectedPoints[1]);

        if (!comp1 || !comp2) return "Invalid selection";

        if (multimeterMode === "voltage") {
            // Simplified voltage calculation
            const v1 = comp1.type === "battery" ? comp1.value : solveRLC(time);
            const v2 = comp2.type === "battery" ? comp2.value : solveRLC(time);
            return `${Math.abs(v1 - v2).toFixed(2)} V`;
        } else {
            // Simplified current calculation using Ohm's law
            const totalR = resistance;
            const current = voltage / totalR;
            return `${current.toFixed(3)} A`;
        }
    };

    // Calculate circuit parameters
    const omega0 = 1 / Math.sqrt(inductance * capacitance);
    const alpha = resistance / (2 * inductance);
    const discriminant = alpha * alpha - omega0 * omega0;
    const dampingType = discriminant > 0 ? "Overdamped" : discriminant < 0 ? "Underdamped" : "Critically Damped";
    const Q = omega0 * inductance / resistance;

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono p-4 relative overflow-hidden">
            {/* Cyber grid background */}
            <div className="fixed inset-0 opacity-10 pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 229, 255, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>

            {/* Header */}
            <div className="relative z-10 mb-6 border-2 border-cyan-500 p-4 bg-black/80">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-2xl font-bold text-cyan-400">
                        {t("sp2_02.title")}
                    </h1>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors"
                    >
                        {t("sp2_02.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("sp2_02.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Canvas */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="border-2 border-purple-500 bg-black/80 h-[400px]">
                        <CircuitCanvas
                            components={components}
                            onComponentClick={handleComponentClick}
                            multimeterMode={multimeterMode}
                            selectedPoints={selectedPoints}
                            time={time}
                        />
                    </div>

                    {/* Oscilloscope */}
                    <div className="border-2 border-green-500 bg-black/80 p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-bold text-green-400">{t("sp2_02.labels.oscilloscope")}</h3>
                            <button
                                onClick={() => setOscilloscopeData([])}
                                className="px-3 py-1 border border-green-500 hover:bg-green-500/20 transition-colors text-sm"
                            >
                                {t("sp2_02.labels.reset")}
                            </button>
                        </div>
                        <canvas
                            ref={canvasRef}
                            width={800}
                            height={200}
                            className="w-full border border-green-500/50"
                        />
                    </div>
                </div>

                {/* Control Panel */}
                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[650px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">
                            {t("sp2_02.monitor_title")}
                        </h2>
                    </div>

                    {/* Multimeter */}
                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("sp2_02.labels.multimeter")}</div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setMultimeterMode("voltage")}
                                className={`flex-1 px-2 py-1 border text-xs transition-colors ${
                                    multimeterMode === "voltage"
                                        ? "border-cyan-500 bg-cyan-500/20 text-cyan-300"
                                        : "border-gray-600 text-gray-400"
                                }`}
                            >
                                V
                            </button>
                            <button
                                onClick={() => setMultimeterMode("current")}
                                className={`flex-1 px-2 py-1 border text-xs transition-colors ${
                                    multimeterMode === "current"
                                        ? "border-cyan-500 bg-cyan-500/20 text-cyan-300"
                                        : "border-gray-600 text-gray-400"
                                }`}
                            >
                                A
                            </button>
                            <button
                                onClick={() => {
                                    setMultimeterMode("off");
                                    setSelectedPoints([]);
                                }}
                                className={`flex-1 px-2 py-1 border text-xs transition-colors ${
                                    multimeterMode === "off"
                                        ? "border-gray-500 bg-gray-500/20 text-gray-300"
                                        : "border-gray-600 text-gray-400"
                                }`}
                            >
                                OFF
                            </button>
                        </div>
                        <div className="text-center text-xl text-cyan-300 font-bold py-2 border border-cyan-500/30 bg-cyan-500/10">
                            {getMultimeterReading()}
                        </div>
                    </div>

                    {/* Component Values */}
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <label className="text-sm text-yellow-400">
                                {t("sp2_02.labels.resistance")} (R)
                            </label>
                            <input
                                type="range"
                                min="10"
                                max="1000"
                                step="10"
                                value={resistance}
                                onChange={(e) => setResistance(Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="text-center text-lg text-yellow-300">{resistance} Ω</div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-purple-400">
                                {t("sp2_02.labels.capacitance")} (C)
                            </label>
                            <input
                                type="range"
                                min="0.0001"
                                max="0.01"
                                step="0.0001"
                                value={capacitance}
                                onChange={(e) => setCapacitance(Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="text-center text-lg text-purple-300">
                                {(capacitance * 1000).toFixed(2)} mF
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-pink-400">
                                {t("sp2_02.labels.inductance")} (L)
                            </label>
                            <input
                                type="range"
                                min="0.01"
                                max="1.0"
                                step="0.01"
                                value={inductance}
                                onChange={(e) => setInductance(Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="text-center text-lg text-pink-300">{inductance.toFixed(2)} H</div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-green-400">
                                {t("sp2_02.labels.voltage")} (V)
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="24"
                                step="1"
                                value={voltage}
                                onChange={(e) => setVoltage(Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="text-center text-lg text-green-300">{voltage} V</div>
                        </div>
                    </div>

                    {/* Circuit Analysis */}
                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400">{t("sp2_02.labels.analysis")}</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span className="text-amber-300">{t("sp2_02.labels.damping")}:</span>
                                <span className="text-amber-200 font-bold">{dampingType}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-amber-300">ω₀:</span>
                                <span className="text-amber-200 font-bold">{omega0.toFixed(2)} rad/s</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-amber-300">α:</span>
                                <span className="text-amber-200 font-bold">{alpha.toFixed(2)} s⁻¹</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-amber-300">Q:</span>
                                <span className="text-amber-200 font-bold">{Q.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Formulas */}
                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400">{t("sp2_02.labels.formulas")}</div>
                        <div className="text-xs space-y-1 text-purple-300/80">
                            <div>L(d²q/dt²) + R(dq/dt) + q/C = V(t)</div>
                            <div>ω₀ = 1/√(LC)</div>
                            <div>α = R/(2L)</div>
                            <div>Q = ω₀L/R</div>
                        </div>
                    </div>

                    {/* Mission Info */}
                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("sp2_02.mission.title")}</div>
                        <div className="text-xs text-cyan-300/80">
                            {t("sp2_02.mission.description")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
