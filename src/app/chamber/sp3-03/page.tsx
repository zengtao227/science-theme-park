"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const WaveCanvas = dynamic(() => import("@/components/chamber/sp3-03/WaveCanvas"), {
    ssr: false,
});

export default function SP3_03_WaveBasics() {
    const { t } = useLanguage();
    const [amplitude, setAmplitude] = useState(1.0);
    const [frequency, setFrequency] = useState(0.5);
    const [waveSpeed, setWaveSpeed] = useState(1.0);
    const [showParticles, setShowParticles] = useState(true);
    const [waveType, setWaveType] = useState<"transverse" | "longitudinal">("transverse");

    const wavelength = waveSpeed / frequency;
    const period = 1 / frequency;
    const omega = 2 * Math.PI * frequency;

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
                        {t("sp3_03.title")}
                    </h1>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors"
                    >
                        {t("sp3_03.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("sp3_03.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Canvas */}
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[600px]">
                    <WaveCanvas
                        amplitude={amplitude}
                        frequency={frequency}
                        waveSpeed={waveSpeed}
                        showParticles={showParticles}
                        waveType={waveType}
                    />
                </div>

                {/* Control Panel */}
                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[600px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">
                            {t("sp3_03.monitor_title")}
                        </h2>
                    </div>

                    {/* Wave Type Selection */}
                    <div className="space-y-2">
                        <label className="text-sm text-cyan-400">{t("sp3_03.labels.wave_type")}</label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setWaveType("transverse")}
                                className={`flex-1 px-3 py-2 border transition-colors ${
                                    waveType === "transverse"
                                        ? "border-cyan-500 bg-cyan-500/20 text-cyan-300"
                                        : "border-gray-600 text-white hover:border-cyan-500/50"
                                }`}
                            >
                                {t("sp3_03.labels.transverse")}
                            </button>
                            <button
                                onClick={() => setWaveType("longitudinal")}
                                className={`flex-1 px-3 py-2 border transition-colors ${
                                    waveType === "longitudinal"
                                        ? "border-green-500 bg-green-500/20 text-green-300"
                                        : "border-gray-600 text-white hover:border-green-500/50"
                                }`}
                            >
                                {t("sp3_03.labels.longitudinal")}
                            </button>
                        </div>
                    </div>

                    {/* Amplitude Control */}
                    <div className="space-y-2">
                        <label className="text-sm text-yellow-400">
                            {t("sp3_03.labels.amplitude")} (A)
                        </label>
                        <input
                            type="range"
                            min="0.2"
                            max="2.0"
                            step="0.1"
                            value={amplitude}
                            onChange={(e) => setAmplitude(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center text-lg text-yellow-300">{amplitude.toFixed(1)} m</div>
                    </div>

                    {/* Frequency Control */}
                    <div className="space-y-2">
                        <label className="text-sm text-purple-400">
                            {t("sp3_03.labels.frequency")} (f)
                        </label>
                        <input
                            type="range"
                            min="0.1"
                            max="2.0"
                            step="0.1"
                            value={frequency}
                            onChange={(e) => setFrequency(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center text-lg text-purple-300">{frequency.toFixed(1)} Hz</div>
                    </div>

                    {/* Wave Speed Control */}
                    <div className="space-y-2">
                        <label className="text-sm text-pink-400">
                            {t("sp3_03.labels.wave_speed")} (v)
                        </label>
                        <input
                            type="range"
                            min="0.5"
                            max="3.0"
                            step="0.1"
                            value={waveSpeed}
                            onChange={(e) => setWaveSpeed(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center text-lg text-pink-300">{waveSpeed.toFixed(1)} m/s</div>
                    </div>

                    {/* Show Particles Toggle */}
                    {waveType === "transverse" && (
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showParticles}
                                onChange={(e) => setShowParticles(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span className="text-cyan-400">{t("sp3_03.labels.show_particles")}</span>
                        </label>
                    )}

                    {/* Calculated Values */}
                    <div className="border border-green-500 p-3 space-y-2">
                        <div className="text-sm text-green-400">{t("sp3_03.labels.calculated")}</div>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-cyan-300">{t("sp3_03.labels.wavelength")} (λ):</span>
                                <span className="text-cyan-200 font-bold">{wavelength.toFixed(2)} m</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-cyan-300">{t("sp3_03.labels.period")} (T):</span>
                                <span className="text-cyan-200 font-bold">{period.toFixed(2)} s</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-cyan-300">{t("sp3_03.labels.angular_freq")} (ω):</span>
                                <span className="text-cyan-200 font-bold">{omega.toFixed(2)} rad/s</span>
                            </div>
                        </div>
                    </div>

                    {/* Formulas */}
                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400">{t("sp3_03.labels.formulas")}</div>
                        <div className="text-xs space-y-1 text-purple-300/80">
                            <div>y = A·sin(kx - ωt + φ)</div>
                            <div>v = λ·f</div>
                            <div>T = 1/f</div>
                            <div>ω = 2πf</div>
                            <div>k = 2π/λ</div>
                        </div>
                    </div>

                    {/* Mission Info */}
                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400">{t("sp3_03.mission.title")}</div>
                        <div className="text-xs text-amber-300/80">
                            {t("sp3_03.mission.description")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
