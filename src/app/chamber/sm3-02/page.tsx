"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const TrigCanvas = dynamic(() => import("@/components/chamber/sm3-02/TrigCanvas"), {
    ssr: false,
});

export default function S3_02_TrigCircle() {
    const { t } = useLanguage();
    const [angle, setAngle] = useState(45);
    const [showSin, setShowSin] = useState(true);
    const [showCos, setShowCos] = useState(true);
    const [showTan, setShowTan] = useState(false);
    const [showWaves, setShowWaves] = useState(false);

    const rad = (angle * Math.PI) / 180;
    const sinValue = Math.sin(rad);
    const cosValue = Math.cos(rad);
    const tanValue = Math.tan(rad);

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
                        {t("s3_02.title")}
                    </h1>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors"
                    >
                        {t("s3_02.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("s3_02.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Canvas */}
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[600px]">
                    <TrigCanvas
                        angle={angle}
                        showSin={showSin}
                        showCos={showCos}
                        showTan={showTan}
                        showWaves={showWaves}
                    />
                </div>

                {/* Control Panel */}
                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">
                            {t("s3_02.monitor_title")}
                        </h2>
                    </div>

                    {/* Angle Control */}
                    <div className="space-y-2">
                        <label className="text-sm text-cyan-400">{t("s3_02.labels.angle")}</label>
                        <input
                            type="range"
                            min="0"
                            max="360"
                            value={angle}
                            onChange={(e) => setAngle(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center text-xl text-cyan-300">{angle}°</div>
                        <div className="text-center text-sm text-cyan-300/70">
                            {(rad).toFixed(3)} rad
                        </div>
                    </div>

                    {/* Values Display */}
                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-300">{t("s3_02.labels.values")}</div>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-yellow-400">sin(θ) =</span>
                                <span className="text-yellow-300 font-bold">{sinValue.toFixed(4)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-green-400">cos(θ) =</span>
                                <span className="text-green-300 font-bold">{cosValue.toFixed(4)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-pink-400">tan(θ) =</span>
                                <span className="text-pink-300 font-bold">
                                    {Math.abs(cosValue) < 0.01 ? "∞" : tanValue.toFixed(4)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Toggle Controls */}
                    <div className="space-y-2">
                        <div className="text-sm text-cyan-400 mb-2">{t("s3_02.labels.display")}</div>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showSin}
                                onChange={(e) => setShowSin(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span className="text-yellow-400">sin(θ)</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showCos}
                                onChange={(e) => setShowCos(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span className="text-green-400">cos(θ)</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showTan}
                                onChange={(e) => setShowTan(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span className="text-pink-400">tan(θ)</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showWaves}
                                onChange={(e) => setShowWaves(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span className="text-purple-400">{t("s3_02.labels.show_waves")}</span>
                        </label>
                    </div>

                    {/* Formulas */}
                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("s3_02.labels.formulas")}</div>
                        <div className="text-xs space-y-1 text-cyan-300/80">
                            <div>x = r·cos(θ)</div>
                            <div>y = r·sin(θ)</div>
                            <div>tan(θ) = sin(θ)/cos(θ)</div>
                            <div>sin²(θ) + cos²(θ) = 1</div>
                        </div>
                    </div>

                    {/* Mission Info */}
                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400">{t("s3_02.mission.title")}</div>
                        <div className="text-xs text-amber-300/80">
                            {t("s3_02.mission.description")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
