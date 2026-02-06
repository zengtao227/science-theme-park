"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const DnaCanvas = dynamic(() => import("@/components/chamber/gb3-01/DnaCanvas"), {
    ssr: false,
});

export default function GB3_01_DnaForge() {
    const { t } = useLanguage();
    const [rotation, setRotation] = useState(0);
    const [showBonds, setShowBonds] = useState(true);
    const [highlightPair, setHighlightPair] = useState<number | null>(null);
    const [autoRotate, setAutoRotate] = useState(false);

    // Auto-rotation effect
    useEffect(() => {
        if (!autoRotate) return;
        const interval = setInterval(() => {
            setRotation((prev) => (prev + 0.02) % (Math.PI * 2));
        }, 50);
        return () => clearInterval(interval);
    }, [autoRotate]);

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
                        {t("gb3_01.title")}
                    </h1>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors"
                    >
                        {t("gb3_01.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("gb3_01.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Canvas */}
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[600px]">
                    <DnaCanvas
                        rotation={rotation}
                        showBonds={showBonds}
                        highlightPair={highlightPair}
                    />
                </div>

                {/* Control Panel */}
                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[600px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">
                            {t("gb3_01.monitor_title")}
                        </h2>
                    </div>

                    {/* Rotation Control */}
                    <div className="space-y-2">
                        <label className="text-sm text-cyan-400">{t("gb3_01.labels.rotation")}</label>
                        <input
                            type="range"
                            min="0"
                            max={Math.PI * 2}
                            step="0.01"
                            value={rotation}
                            onChange={(e) => setRotation(Number(e.target.value))}
                            className="w-full"
                            disabled={autoRotate}
                        />
                        <div className="text-center text-sm text-cyan-300">
                            {((rotation * 180) / Math.PI).toFixed(0)}°
                        </div>
                    </div>

                    {/* Auto Rotate */}
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={autoRotate}
                            onChange={(e) => setAutoRotate(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <span className="text-purple-400">{t("gb3_01.labels.auto_rotate")}</span>
                    </label>

                    {/* Show Bonds */}
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showBonds}
                            onChange={(e) => setShowBonds(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <span className="text-cyan-400">{t("gb3_01.labels.show_bonds")}</span>
                    </label>

                    {/* Base Pair Selection */}
                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400">{t("gb3_01.labels.highlight_pair")}</div>
                        <div className="grid grid-cols-5 gap-1">
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                                <button
                                    key={i}
                                    onClick={() => setHighlightPair(highlightPair === i ? null : i)}
                                    className={`px-2 py-1 border text-xs transition-colors ${
                                        highlightPair === i
                                            ? "border-cyan-400 bg-cyan-500/30 text-cyan-200"
                                            : "border-gray-600 text-gray-400 hover:border-cyan-500/50"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Base Pairing Rules */}
                    <div className="border border-green-500 p-3 space-y-2">
                        <div className="text-sm text-green-400 font-bold">{t("gb3_01.labels.pairing_rules")}</div>
                        <div className="text-xs text-green-300/80 space-y-1">
                            <div className="flex items-center space-x-2">
                                <span className="text-cyan-400">A</span>
                                <span>↔</span>
                                <span className="text-pink-400">T</span>
                                <span className="text-gray-400">(2 H-bonds)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-green-400">C</span>
                                <span>↔</span>
                                <span className="text-amber-400">G</span>
                                <span className="text-gray-400">(3 H-bonds)</span>
                            </div>
                        </div>
                    </div>

                    {/* Base Colors */}
                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400 font-bold">{t("gb3_01.labels.bases")}</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                                <span className="text-cyan-300">Adenine (A)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                                <span className="text-pink-300">Thymine (T)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-green-300">Cytosine (C)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <span className="text-amber-300">Guanine (G)</span>
                            </div>
                        </div>
                    </div>

                    {/* DNA Structure */}
                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400 font-bold">{t("gb3_01.labels.structure")}</div>
                        <div className="text-xs text-purple-300/80 space-y-1">
                            <div>• Double helix structure</div>
                            <div>• Antiparallel strands (5&apos; → 3&apos;)</div>
                            <div>• Sugar-phosphate backbone</div>
                            <div>• Complementary base pairing</div>
                            <div>• Right-handed helix</div>
                        </div>
                    </div>

                    {/* Mission Info */}
                    <div className="border border-pink-500 p-3 space-y-2">
                        <div className="text-sm text-pink-400">{t("gb3_01.mission.title")}</div>
                        <div className="text-xs text-pink-300/80">
                            {t("gb3_01.mission.description")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
