"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const TitrationCanvas = dynamic(() => import("@/components/chamber/sc2-02/TitrationCanvas"), {
    ssr: false,
});

export default function SC2_02_pHSentinel() {
    const { t } = useLanguage();
    const [acidType, setAcidType] = useState<"strong" | "weak">("weak");
    const [baseType] = useState<"strong" | "weak">("strong");
    const [acidConcentration, setAcidConcentration] = useState(0.1); // M
    const [baseConcentration, setBaseConcentration] = useState(0.1); // M
    const [volumeAdded, setVolumeAdded] = useState(0); // mL
    const [indicator, setIndicator] = useState<"phenolphthalein" | "methyl_orange" | "universal">("phenolphthalein");
    const [isRunning, setIsRunning] = useState(false);

    // Auto-titration
    const handleStartTitration = () => {
        setIsRunning(true);
        setVolumeAdded(0);
        
        const interval = setInterval(() => {
            setVolumeAdded((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsRunning(false);
                    return 100;
                }
                return prev + 0.5;
            });
        }, 100);
    };

    const handleReset = () => {
        setIsRunning(false);
        setVolumeAdded(0);
    };

    // Calculate equivalence point
    const equivalenceVolume = (acidConcentration * 50) / baseConcentration;

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
                        {t("sc2_02.title")}
                    </h1>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors"
                    >
                        {t("sc2_02.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("sc2_02.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Canvas */}
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[600px]">
                    <TitrationCanvas
                        acidType={acidType}
                        baseType={baseType}
                        acidConcentration={acidConcentration}
                        baseConcentration={baseConcentration}
                        volumeAdded={volumeAdded}
                        indicator={indicator}
                    />
                </div>

                {/* Control Panel */}
                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[600px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">
                            {t("sc2_02.monitor_title")}
                        </h2>
                    </div>

                    {/* Titration Controls */}
                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("sc2_02.labels.titration_control")}</div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleStartTitration}
                                disabled={isRunning}
                                className={`flex-1 px-3 py-2 border transition-colors ${
                                    isRunning
                                        ? "border-gray-600 text-gray-600"
                                        : "border-green-500 text-green-300 hover:bg-green-500/20"
                                }`}
                            >
                                {t("sc2_02.labels.start")}
                            </button>
                            <button
                                onClick={handleReset}
                                className="flex-1 px-3 py-2 border border-red-500 text-red-300 hover:bg-red-500/20 transition-colors"
                            >
                                {t("sc2_02.labels.reset")}
                            </button>
                        </div>
                    </div>

                    {/* Volume Control */}
                    <div className="space-y-2">
                        <label className="text-sm text-purple-400">
                            {t("sc2_02.labels.volume_added")}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="0.5"
                            value={volumeAdded}
                            onChange={(e) => setVolumeAdded(Number(e.target.value))}
                            disabled={isRunning}
                            className="w-full"
                        />
                        <div className="text-center text-lg text-purple-300">{volumeAdded.toFixed(1)} mL</div>
                    </div>

                    {/* Acid Type */}
                    <div className="space-y-2">
                        <label className="text-sm text-cyan-400">{t("sc2_02.labels.acid_type")}</label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setAcidType("strong")}
                                className={`flex-1 px-3 py-2 border transition-colors ${
                                    acidType === "strong"
                                        ? "border-cyan-500 bg-cyan-500/20 text-cyan-300"
                                        : "border-gray-600 text-white"
                                }`}
                            >
                                {t("sc2_02.labels.strong")}
                            </button>
                            <button
                                onClick={() => setAcidType("weak")}
                                className={`flex-1 px-3 py-2 border transition-colors ${
                                    acidType === "weak"
                                        ? "border-cyan-500 bg-cyan-500/20 text-cyan-300"
                                        : "border-gray-600 text-white"
                                }`}
                            >
                                {t("sc2_02.labels.weak")}
                            </button>
                        </div>
                    </div>

                    {/* Acid Concentration */}
                    <div className="space-y-2">
                        <label className="text-sm text-amber-400">
                            {t("sc2_02.labels.acid_concentration")}
                        </label>
                        <input
                            type="range"
                            min="0.01"
                            max="1.0"
                            step="0.01"
                            value={acidConcentration}
                            onChange={(e) => setAcidConcentration(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center text-lg text-amber-300">{acidConcentration.toFixed(2)} M</div>
                    </div>

                    {/* Base Concentration */}
                    <div className="space-y-2">
                        <label className="text-sm text-pink-400">
                            {t("sc2_02.labels.base_concentration")}
                        </label>
                        <input
                            type="range"
                            min="0.01"
                            max="1.0"
                            step="0.01"
                            value={baseConcentration}
                            onChange={(e) => setBaseConcentration(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center text-lg text-pink-300">{baseConcentration.toFixed(2)} M</div>
                    </div>

                    {/* Indicator Selection */}
                    <div className="space-y-2">
                        <label className="text-sm text-green-400">{t("sc2_02.labels.indicator")}</label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => setIndicator("phenolphthalein")}
                                className={`px-2 py-2 border text-xs transition-colors ${
                                    indicator === "phenolphthalein"
                                        ? "border-pink-500 bg-pink-500/20 text-pink-300"
                                        : "border-gray-600 text-white"
                                }`}
                            >
                                Phenol.
                            </button>
                            <button
                                onClick={() => setIndicator("methyl_orange")}
                                className={`px-2 py-2 border text-xs transition-colors ${
                                    indicator === "methyl_orange"
                                        ? "border-orange-500 bg-orange-500/20 text-orange-300"
                                        : "border-gray-600 text-white"
                                }`}
                            >
                                Methyl O.
                            </button>
                            <button
                                onClick={() => setIndicator("universal")}
                                className={`px-2 py-2 border text-xs transition-colors ${
                                    indicator === "universal"
                                        ? "border-purple-500 bg-purple-500/20 text-purple-300"
                                        : "border-gray-600 text-white"
                                }`}
                            >
                                Universal
                            </button>
                        </div>
                    </div>

                    {/* Equivalence Point */}
                    <div className="border border-green-500 p-3 space-y-2">
                        <div className="text-sm text-green-400">{t("sc2_02.labels.equivalence_point")}</div>
                        <div className="text-center text-xl text-green-300 font-bold">
                            {equivalenceVolume.toFixed(1)} mL
                        </div>
                        <div className="text-xs text-green-300/60 text-center">
                            {volumeAdded >= equivalenceVolume - 2 && volumeAdded <= equivalenceVolume + 2
                                ? t("sc2_02.labels.near_equivalence")
                                : ""}
                        </div>
                    </div>

                    {/* Formulas */}
                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400">{t("sc2_02.labels.formulas")}</div>
                        <div className="text-xs space-y-1 text-purple-300/80">
                            <div>pH = -log[H⁺]</div>
                            <div>pOH = -log[OH⁻]</div>
                            <div>pH + pOH = 14</div>
                            <div>Henderson-Hasselbalch:</div>
                            <div>pH = pKa + log([A⁻]/[HA])</div>
                        </div>
                    </div>

                    {/* Mission Info */}
                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("sc2_02.mission.title")}</div>
                        <div className="text-xs text-cyan-300/80">
                            {t("sc2_02.mission.description")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
