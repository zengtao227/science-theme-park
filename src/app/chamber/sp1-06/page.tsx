"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const PendulumCanvas = dynamic(() => import("@/components/chamber/sp1-06/PendulumCanvas"), {
    ssr: false,
});

export default function SP1_06_SwissPendulum() {
    const { t } = useLanguage();
    const [length, setLength] = useState(2.0); // meters
    const [initialAngle, setInitialAngle] = useState(Math.PI / 6); // 30 degrees
    const [gravity, setGravity] = useState(9.81); // m/s²
    const [damping, setDamping] = useState(0.05);
    const [showPhaseSpace, setShowPhaseSpace] = useState(true);
    const [showEnergy, setShowEnergy] = useState(true);

    // Calculate period with nonlinear correction
    const T_small = 2 * Math.PI * Math.sqrt(length / gravity);
    const T_large = T_small * (1 + (1 / 16) * initialAngle * initialAngle);
    const frequency = 1 / T_large;

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
                        {t("sp1_06.title")}
                    </h1>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors"
                    >
                        {t("sp1_06.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("sp1_06.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Canvas */}
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[600px]">
                    <PendulumCanvas
                        length={length}
                        initialAngle={initialAngle}
                        gravity={gravity}
                        damping={damping}
                        showPhaseSpace={showPhaseSpace}
                        showEnergy={showEnergy}
                    />
                </div>

                {/* Control Panel */}
                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[600px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">
                            {t("sp1_06.monitor_title")}
                        </h2>
                    </div>

                    {/* Period Display */}
                    <div className="border border-green-500 p-3 space-y-2">
                        <div className="text-sm text-green-400">{t("sp1_06.labels.period")}</div>
                        <div className="text-center text-3xl text-green-300 font-bold py-2">
                            {T_large.toFixed(3)} s
                        </div>
                        <div className="text-xs text-green-300/60 text-center">
                            f = {frequency.toFixed(3)} Hz
                        </div>
                    </div>

                    {/* Length Control */}
                    <div className="space-y-2">
                        <label className="text-sm text-cyan-400">
                            {t("sp1_06.labels.length")} (L)
                        </label>
                        <input
                            type="range"
                            min="0.5"
                            max="5.0"
                            step="0.1"
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center text-lg text-cyan-300">{length.toFixed(1)} m</div>
                    </div>

                    {/* Initial Angle Control */}
                    <div className="space-y-2">
                        <label className="text-sm text-purple-400">
                            {t("sp1_06.labels.initial_angle")} (θ₀)
                        </label>
                        <input
                            type="range"
                            min="0.1"
                            max="1.5"
                            step="0.05"
                            value={initialAngle}
                            onChange={(e) => setInitialAngle(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center text-lg text-purple-300">
                            {(initialAngle * 180 / Math.PI).toFixed(1)}° ({initialAngle.toFixed(2)} rad)
                        </div>
                    </div>

                    {/* Gravity Control */}
                    <div className="space-y-2">
                        <label className="text-sm text-amber-400">
                            {t("sp1_06.labels.gravity")} (g)
                        </label>
                        <input
                            type="range"
                            min="1.0"
                            max="20.0"
                            step="0.1"
                            value={gravity}
                            onChange={(e) => setGravity(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center text-lg text-amber-300">{gravity.toFixed(2)} m/s²</div>
                    </div>

                    {/* Damping Control */}
                    <div className="space-y-2">
                        <label className="text-sm text-pink-400">
                            {t("sp1_06.labels.damping")} (γ)
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="0.5"
                            step="0.01"
                            value={damping}
                            onChange={(e) => setDamping(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center text-lg text-pink-300">{damping.toFixed(2)}</div>
                    </div>

                    {/* Visualization Toggles */}
                    <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showPhaseSpace}
                                onChange={(e) => setShowPhaseSpace(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span className="text-cyan-400">{t("sp1_06.labels.show_phase_space")}</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showEnergy}
                                onChange={(e) => setShowEnergy(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span className="text-green-400">{t("sp1_06.labels.show_energy")}</span>
                        </label>
                    </div>

                    {/* Period Comparison */}
                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("sp1_06.labels.period_comparison")}</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span className="text-cyan-300">Small angle:</span>
                                <span className="text-cyan-200 font-bold">{T_small.toFixed(3)} s</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-cyan-300">Large angle:</span>
                                <span className="text-cyan-200 font-bold">{T_large.toFixed(3)} s</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-cyan-300">Correction:</span>
                                <span className="text-cyan-200 font-bold">
                                    {((T_large - T_small) / T_small * 100).toFixed(2)}%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Formulas */}
                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400">{t("sp1_06.labels.formulas")}</div>
                        <div className="text-xs space-y-1 text-purple-300/80">
                            <div>T = 2π√(L/g)</div>
                            <div>T ≈ T₀(1 + θ₀²/16)</div>
                            <div>d²θ/dt² = -(g/L)sin(θ) - γ(dθ/dt)</div>
                            <div>E = ½mL²ω² + mgL(1-cos(θ))</div>
                        </div>
                    </div>

                    {/* Mission Info */}
                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400">{t("sp1_06.mission.title")}</div>
                        <div className="text-xs text-amber-300/80">
                            {t("sp1_06.mission.description")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
