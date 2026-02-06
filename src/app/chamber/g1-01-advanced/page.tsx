"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const CalculusCanvas = dynamic(() => import("@/components/chamber/g1-01/CalculusCanvas"), {
    ssr: false,
});

export default function G1_01_Advanced() {
    const { t } = useLanguage();
    const [mode, setMode] = useState<"tangent" | "newton">("tangent");
    const [xPosition, setXPosition] = useState(1);
    const [functionType, setFunctionType] = useState<"parabola" | "cubic" | "sine">("parabola");

    const functions = {
        parabola: { name: "f(x) = x²", formula: "x²", derivative: "2x" },
        cubic: { name: "f(x) = x³ - 3x", formula: "x³ - 3x", derivative: "3x² - 3" },
        sine: { name: "f(x) = 2sin(x)", formula: "2sin(x)", derivative: "2cos(x)" },
    };

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
                        G1.01 // DERIVATIVE MOUNTAIN
                    </h1>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors"
                    >
                        Back to Nexus
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">G1.01_CALCULUS // NODE: ZURICH</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Canvas */}
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[600px]">
                    <CalculusCanvas
                        mode={mode}
                        xPosition={xPosition}
                        functionType={functionType}
                    />
                </div>

                {/* Control Panel */}
                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[600px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">
                            CALCULUS MONITOR
                        </h2>
                    </div>

                    {/* Mode Selection */}
                    <div className="space-y-2">
                        <label className="text-sm text-cyan-400">VISUALIZATION MODE</label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setMode("tangent")}
                                className={`flex-1 px-3 py-2 border transition-colors ${
                                    mode === "tangent"
                                        ? "border-cyan-500 bg-cyan-500/20 text-cyan-300"
                                        : "border-gray-600 text-gray-400 hover:border-cyan-500/50"
                                }`}
                            >
                                TANGENT LINE
                            </button>
                            <button
                                onClick={() => setMode("newton")}
                                className={`flex-1 px-3 py-2 border transition-colors ${
                                    mode === "newton"
                                        ? "border-purple-500 bg-purple-500/20 text-purple-300"
                                        : "border-gray-600 text-gray-400 hover:border-purple-500/50"
                                }`}
                            >
                                NEWTON'S METHOD
                            </button>
                        </div>
                    </div>

                    {/* Function Selection */}
                    <div className="space-y-2">
                        <label className="text-sm text-purple-400">FUNCTION</label>
                        <div className="space-y-2">
                            {(Object.keys(functions) as Array<keyof typeof functions>).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setFunctionType(key)}
                                    className={`w-full px-3 py-2 border transition-colors text-left ${
                                        functionType === key
                                            ? "border-purple-400 bg-purple-500/20 text-purple-200"
                                            : "border-gray-600 text-gray-400 hover:border-purple-500/50"
                                    }`}
                                >
                                    <div className="font-bold">{functions[key].name}</div>
                                    <div className="text-xs">f'(x) = {functions[key].derivative}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* X Position Control */}
                    <div className="space-y-2">
                        <label className="text-sm text-pink-400">
                            {mode === "tangent" ? "POINT POSITION (x)" : "STARTING POINT (x₀)"}
                        </label>
                        <input
                            type="range"
                            min="-4"
                            max="4"
                            step="0.1"
                            value={xPosition}
                            onChange={(e) => setXPosition(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center text-lg text-pink-300">{xPosition.toFixed(1)}</div>
                    </div>

                    {/* Mode Info */}
                    {mode === "tangent" && (
                        <div className="border border-pink-500 p-3 space-y-2">
                            <div className="text-sm text-pink-400 font-bold">TANGENT LINE</div>
                            <div className="text-xs text-pink-300/80 space-y-1">
                                <div>The tangent line touches the curve at exactly one point.</div>
                                <div>Slope = f'(x) = derivative at that point</div>
                                <div>Equation: y - y₀ = m(x - x₀)</div>
                            </div>
                        </div>
                    )}

                    {mode === "newton" && (
                        <div className="border border-purple-500 p-3 space-y-2">
                            <div className="text-sm text-purple-400 font-bold">NEWTON'S METHOD</div>
                            <div className="text-xs text-purple-300/80 space-y-1">
                                <div>Iterative root-finding algorithm</div>
                                <div>Formula: xₙ₊₁ = xₙ - f(xₙ)/f'(xₙ)</div>
                                <div>Yellow dots: iteration points</div>
                                <div>Green dot: converged root</div>
                                <div>Purple lines: tangent approximations</div>
                            </div>
                        </div>
                    )}

                    {/* Formulas */}
                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400 font-bold">DERIVATIVE RULES</div>
                        <div className="text-xs text-amber-300/80 space-y-1">
                            <div>Power Rule: d/dx(xⁿ) = n·xⁿ⁻¹</div>
                            <div>Chain Rule: d/dx(f(g(x))) = f'(g(x))·g'(x)</div>
                            <div>Product Rule: d/dx(u·v) = u'v + uv'</div>
                        </div>
                    </div>

                    {/* Mission Info */}
                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">MISSION: CALCULUS INTUITION</div>
                        <div className="text-xs text-cyan-300/80">
                            Visualize derivatives and root-finding. Master the geometric meaning of calculus.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
