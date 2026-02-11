"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const OrbitalCanvas = dynamic(() => import("@/components/chamber/sc1-03/OrbitalCanvas"), {
    ssr: false,
});

// Periodic table elements (first 20)
const elements = [
    { symbol: "H", name: "Hydrogen", z: 1, orbital: "s" },
    { symbol: "He", name: "Helium", z: 2, orbital: "s" },
    { symbol: "Li", name: "Lithium", z: 3, orbital: "s" },
    { symbol: "Be", name: "Beryllium", z: 4, orbital: "s" },
    { symbol: "B", name: "Boron", z: 5, orbital: "p" },
    { symbol: "C", name: "Carbon", z: 6, orbital: "p" },
    { symbol: "N", name: "Nitrogen", z: 7, orbital: "p" },
    { symbol: "O", name: "Oxygen", z: 8, orbital: "p" },
    { symbol: "F", name: "Fluorine", z: 9, orbital: "p" },
    { symbol: "Ne", name: "Neon", z: 10, orbital: "p" },
    { symbol: "Na", name: "Sodium", z: 11, orbital: "s" },
    { symbol: "Mg", name: "Magnesium", z: 12, orbital: "s" },
    { symbol: "Al", name: "Aluminum", z: 13, orbital: "p" },
    { symbol: "Si", name: "Silicon", z: 14, orbital: "p" },
    { symbol: "P", name: "Phosphorus", z: 15, orbital: "p" },
    { symbol: "S", name: "Sulfur", z: 16, orbital: "p" },
    { symbol: "Cl", name: "Chlorine", z: 17, orbital: "p" },
    { symbol: "Ar", name: "Argon", z: 18, orbital: "p" },
    { symbol: "K", name: "Potassium", z: 19, orbital: "s" },
    { symbol: "Ca", name: "Calcium", z: 20, orbital: "s" },
];

export default function SC1_03_AtomsForge() {
    const { t } = useLanguage();
    const [selectedElement, setSelectedElement] = useState(elements[5]); // Carbon
    const [orbitalType, setOrbitalType] = useState<"s" | "p" | "d">("p");
    const [showTransition, setShowTransition] = useState(false);

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
                        {t("sc1_03.title")}
                    </h1>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors"
                    >
                        {t("sc1_03.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("sc1_03.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Canvas */}
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[600px]">
                    <OrbitalCanvas
                        element={selectedElement.symbol}
                        atomicNumber={selectedElement.z}
                        orbitalType={orbitalType}
                        showTransition={showTransition}
                    />
                </div>

                {/* Control Panel */}
                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[600px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">
                            {t("sc1_03.monitor_title")}
                        </h2>
                    </div>

                    {/* Selected Element Info */}
                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("sc1_03.labels.selected_element")}</div>
                        <div className="text-center">
                            <div className="text-4xl text-cyan-300 font-bold">{selectedElement.symbol}</div>
                            <div className="text-sm text-cyan-300/70">{selectedElement.name}</div>
                            <div className="text-xs text-cyan-300/50">Z = {selectedElement.z}</div>
                        </div>
                    </div>

                    {/* Orbital Type Selection */}
                    <div className="space-y-2">
                        <label className="text-sm text-purple-400">{t("sc1_03.labels.orbital_type")}</label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => setOrbitalType("s")}
                                className={`px-3 py-2 border transition-colors ${
                                    orbitalType === "s"
                                        ? "border-cyan-500 bg-cyan-500/20 text-cyan-300"
                                        : "border-gray-600 text-white hover:border-cyan-500/50"
                                }`}
                            >
                                s
                            </button>
                            <button
                                onClick={() => setOrbitalType("p")}
                                className={`px-3 py-2 border transition-colors ${
                                    orbitalType === "p"
                                        ? "border-purple-500 bg-purple-500/20 text-purple-300"
                                        : "border-gray-600 text-white hover:border-purple-500/50"
                                }`}
                            >
                                p
                            </button>
                            <button
                                onClick={() => setOrbitalType("d")}
                                className={`px-3 py-2 border transition-colors ${
                                    orbitalType === "d"
                                        ? "border-pink-500 bg-pink-500/20 text-pink-300"
                                        : "border-gray-600 text-white hover:border-pink-500/50"
                                }`}
                            >
                                d
                            </button>
                        </div>
                    </div>

                    {/* Transition Toggle */}
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showTransition}
                            onChange={(e) => setShowTransition(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <span className="text-yellow-400">{t("sc1_03.labels.show_transition")}</span>
                    </label>

                    {/* Periodic Table */}
                    <div className="border border-green-500 p-3 space-y-2">
                        <div className="text-sm text-green-400">{t("sc1_03.labels.periodic_table")}</div>
                        <div className="grid grid-cols-5 gap-1">
                            {elements.map((elem) => (
                                <button
                                    key={elem.z}
                                    onClick={() => {
                                        setSelectedElement(elem);
                                        setOrbitalType(elem.orbital as "s" | "p");
                                    }}
                                    className={`px-2 py-2 border text-xs transition-colors ${
                                        selectedElement.z === elem.z
                                            ? "border-cyan-500 bg-cyan-500/20 text-cyan-300"
                                            : "border-gray-700 text-white hover:border-cyan-500/50"
                                    }`}
                                >
                                    <div className="font-bold">{elem.symbol}</div>
                                    <div className="text-[10px]">{elem.z}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Orbital Descriptions */}
                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400">{t("sc1_03.labels.orbital_shapes")}</div>
                        <div className="text-xs space-y-1 text-purple-300/80">
                            <div><span className="text-cyan-400">s:</span> Spherical (l=0)</div>
                            <div><span className="text-purple-400">p:</span> Dumbbell (l=1)</div>
                            <div><span className="text-pink-400">d:</span> Cloverleaf (l=2)</div>
                        </div>
                    </div>

                    {/* Quantum Numbers */}
                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400">{t("sc1_03.labels.quantum_numbers")}</div>
                        <div className="text-xs space-y-1 text-amber-300/80">
                            <div>n: Principal (energy level)</div>
                            <div>l: Angular momentum (0=s, 1=p, 2=d)</div>
                            <div>m_l: Magnetic (-l to +l)</div>
                            <div>m_s: Spin (±½)</div>
                        </div>
                    </div>

                    {/* Mission Info */}
                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("sc1_03.mission.title")}</div>
                        <div className="text-xs text-cyan-300/80">
                            {t("sc1_03.mission.description")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
