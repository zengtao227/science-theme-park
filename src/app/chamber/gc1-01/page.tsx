"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const RedoxCanvas = dynamic(() => import("@/components/chamber/gc1-01/RedoxCanvas"), {
    ssr: false,
});

export default function GC1_01_RedoxTitan() {
    const { t } = useLanguage();
    const [znConcentration, setZnConcentration] = useState(1.0); // M
    const [cuConcentration, setCuConcentration] = useState(1.0); // M
    const [temperature, setTemperature] = useState(298); // K
    const [showElectrons, setShowElectrons] = useState(true);
    const [showIons, setShowIons] = useState(true);

    // Calculate cell potential using Nernst equation
    const E0_Zn = -0.76; // V
    const E0_Cu = 0.34; // V
    const E0_cell = E0_Cu - E0_Zn; // 1.10 V
    const n = 2; // electrons transferred
    const R = 8.314; // J/(mol·K)
    const F = 96485; // C/mol
    
    const Q = znConcentration / cuConcentration;
    const E = E0_cell - (R * temperature / (n * F)) * Math.log(Q);

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
                        {t("gc1_01.title")}
                    </h1>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors"
                    >
                        {t("gc1_01.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("gc1_01.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Canvas */}
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[600px]">
                    <RedoxCanvas
                        znConcentration={znConcentration}
                        cuConcentration={cuConcentration}
                        temperature={temperature}
                        showElectrons={showElectrons}
                        showIons={showIons}
                    />
                </div>

                {/* Control Panel */}
                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[600px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">
                            {t("gc1_01.monitor_title")}
                        </h2>
                    </div>

                    {/* Cell Potential Display */}
                    <div className="border border-green-500 p-3 space-y-2">
                        <div className="text-sm text-green-400">{t("gc1_01.labels.cell_potential")}</div>
                        <div className="text-center text-3xl text-green-300 font-bold py-2">
                            {E.toFixed(3)} V
                        </div>
                        <div className="text-xs text-green-300/60 text-center">
                            E° = {E0_cell.toFixed(2)} V
                        </div>
                    </div>

                    {/* Concentration Controls */}
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <label className="text-sm text-cyan-400">
                                {t("gc1_01.labels.zn_concentration")} [Zn²⁺]
                            </label>
                            <input
                                type="range"
                                min="0.01"
                                max="2.0"
                                step="0.01"
                                value={znConcentration}
                                onChange={(e) => setZnConcentration(Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="text-center text-lg text-cyan-300">{znConcentration.toFixed(2)} M</div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-purple-400">
                                {t("gc1_01.labels.cu_concentration")} [Cu²⁺]
                            </label>
                            <input
                                type="range"
                                min="0.01"
                                max="2.0"
                                step="0.01"
                                value={cuConcentration}
                                onChange={(e) => setCuConcentration(Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="text-center text-lg text-purple-300">{cuConcentration.toFixed(2)} M</div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-amber-400">
                                {t("gc1_01.labels.temperature")} (T)
                            </label>
                            <input
                                type="range"
                                min="273"
                                max="373"
                                step="1"
                                value={temperature}
                                onChange={(e) => setTemperature(Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="text-center text-lg text-amber-300">
                                {temperature} K ({(temperature - 273).toFixed(0)}°C)
                            </div>
                        </div>
                    </div>

                    {/* Visualization Toggles */}
                    <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showElectrons}
                                onChange={(e) => setShowElectrons(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span className="text-yellow-400">{t("gc1_01.labels.show_electrons")}</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showIons}
                                onChange={(e) => setShowIons(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span className="text-pink-400">{t("gc1_01.labels.show_ions")}</span>
                        </label>
                    </div>

                    {/* Reaction Quotient */}
                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("gc1_01.labels.reaction_quotient")}</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span className="text-cyan-300">Q = [Zn²⁺]/[Cu²⁺]:</span>
                                <span className="text-cyan-200 font-bold">{Q.toFixed(3)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-cyan-300">ln(Q):</span>
                                <span className="text-cyan-200 font-bold">{Math.log(Q).toFixed(3)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-cyan-300">log₁₀(Q):</span>
                                <span className="text-cyan-200 font-bold">{Math.log10(Q).toFixed(3)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Half Reactions */}
                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400">{t("gc1_01.labels.half_reactions")}</div>
                        <div className="text-xs space-y-1 text-purple-300/80">
                            <div className="font-bold text-purple-300">{t("gc1_01.labels.anode")} (Oxidation):</div>
                            <div>Zn(s) → Zn²⁺(aq) + 2e⁻</div>
                            <div className="text-purple-300/60">E° = -0.76 V</div>
                            <div className="font-bold text-purple-300 mt-2">{t("gc1_01.labels.cathode")} (Reduction):</div>
                            <div>Cu²⁺(aq) + 2e⁻ → Cu(s)</div>
                            <div className="text-purple-300/60">E° = +0.34 V</div>
                        </div>
                    </div>

                    {/* Nernst Equation */}
                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400">{t("gc1_01.labels.nernst_equation")}</div>
                        <div className="text-xs space-y-1 text-amber-300/80">
                            <div>E = E° - (RT/nF) × ln(Q)</div>
                            <div>E = E° - (0.0592/n) × log₁₀(Q)</div>
                            <div className="text-amber-300/60 mt-2">
                                R = 8.314 J/(mol·K)
                            </div>
                            <div className="text-amber-300/60">
                                F = 96485 C/mol
                            </div>
                            <div className="text-amber-300/60">
                                n = 2 (electrons)
                            </div>
                        </div>
                    </div>

                    {/* Mission Info */}
                    <div className="border border-green-500 p-3 space-y-2">
                        <div className="text-sm text-green-400">{t("gc1_01.mission.title")}</div>
                        <div className="text-xs text-green-300/80">
                            {t("gc1_01.mission.description")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
