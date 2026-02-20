"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import dynamic from "next/dynamic";
import ChamberLayout from "@/components/layout/ChamberLayout";

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
        <ChamberLayout
            title={t("sc1_03.title")}
            moduleCode="SC1.03"
            difficulty="CORE"
            onDifficultyChange={() => { }}
            stages={[{ id: "SANDBOX", label: t("sc1_03.stages.sandbox") || "Sandbox" }]}
            currentStage="SANDBOX"
            onStageChange={() => { }}
            translations={{
                back: t("sc1_03.back"),
                difficulty: { core: "CORE" },
                check: t("sc1_01.check"),
                next: t("sc1_01.next"),
                correct: t("sc1_01.correct"),
                incorrect: t("sc1_01.incorrect"),
                ready: "QUANTUM_ONLINE",
                monitor_title: t("sc1_03.monitor_title")
            }}
            monitorContent={
                <OrbitalCanvas
                    element={selectedElement.symbol}
                    atomicNumber={selectedElement.z}
                    orbitalType={orbitalType}
                    showTransition={showTransition}
                />
            }
        >
            <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-2">
                {/* Selected Element Info */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                    <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">
                        {t("sc1_03.labels.selected_element")}
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-6xl text-cyan-400 font-black italic">{selectedElement.symbol}</div>
                        <div>
                            <div className="text-xl text-white font-black">{selectedElement.name}</div>
                            <div className="text-white/40 font-mono">ATOMIC NUMBER: {selectedElement.z}</div>
                        </div>
                    </div>
                </div>

                {/* Orbital Control */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">
                            {t("sc1_03.labels.orbital_type")}
                        </div>
                        <div className="flex gap-2">
                            {["s", "p", "d"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setOrbitalType(type as any)}
                                    className={`w-10 h-10 rounded-lg border-2 font-black transition-all ${orbitalType === type
                                            ? "bg-white text-black border-white"
                                            : "border-white/20 text-white/40 hover:border-white/60"
                                        }`}
                                >
                                    {type.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                        <span className="text-xs text-white/60 font-black tracking-widest uppercase">
                            {t("sc1_03.labels.show_transition")}
                        </span>
                        <button
                            onClick={() => setShowTransition(!showTransition)}
                            className={`w-12 h-6 rounded-full transition-all relative ${showTransition ? "bg-cyan-500" : "bg-white/10"}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${showTransition ? "left-7" : "left-1"}`} />
                        </button>
                    </div>
                </div>

                {/* Periodic Table Selection */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                    <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">
                        {t("sc1_03.labels.periodic_table")}
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {elements.map((elem) => (
                            <button
                                key={elem.z}
                                onClick={() => {
                                    setSelectedElement(elem);
                                    if (elem.orbital !== orbitalType) setOrbitalType(elem.orbital as any);
                                }}
                                className={`p-2 border rounded-lg flex flex-col items-center transition-all ${selectedElement.z === elem.z
                                        ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                                        : "border-white/10 text-white/40 hover:border-white/30"
                                    }`}
                            >
                                <span className="text-sm font-black">{elem.symbol}</span>
                                <span className="text-[8px] font-mono">{elem.z}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Physics Legend */}
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">
                            {t("sc1_03.labels.quantum_numbers")}
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-[10px] text-white/70 font-mono tracking-wider">
                            <div className="flex justify-between border-b border-white/5 pb-1">
                                <span>PRINCIPAL (n)</span>
                                <span className="text-cyan-400">ENERGY LEVEL</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-1">
                                <span>ANGULAR (l)</span>
                                <span className="text-purple-400">0=s, 1=p, 2=d</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-1">
                                <span>MAGNETIC (m_l)</span>
                                <span className="text-pink-400">-l to +l</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-1">
                                <span>SPIN (m_s)</span>
                                <span className="text-amber-400">±½</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
