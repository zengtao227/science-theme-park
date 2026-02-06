"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const OrganicCanvas = dynamic(() => import("@/components/chamber/gc2-01/OrganicCanvas"), { ssr: false });

export default function GC2_01_CarbonKingdom() {
    const { t } = useLanguage();
    const [molecule, setMolecule] = useState<"methane" | "ethane" | "benzene" | "glucose" | "alanine">("benzene");
    const [showBonds, setShowBonds] = useState(true);
    const [showHydrogens, setShowHydrogens] = useState(true);
    const [rotationSpeed, setRotationSpeed] = useState(0.5);

    const moleculeInfo: Record<string, { formula: string; name: string; type: string }> = {
        methane: { formula: "CH₄", name: "Methane", type: "Alkane" },
        ethane: { formula: "C₂H₆", name: "Ethane", type: "Alkane" },
        benzene: { formula: "C₆H₆", name: "Benzene", type: "Aromatic" },
        glucose: { formula: "C₆H₁₂O₆", name: "Glucose", type: "Carbohydrate" },
        alanine: { formula: "C₃H₇NO₂", name: "Alanine", type: "Amino Acid" },
    };

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono p-4 relative overflow-hidden">
            <div className="fixed inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full" style={{
                    backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(0, 229, 255, 0.3) 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                }} />
            </div>

            <div className="relative z-10 mb-6 border-2 border-cyan-500 p-4 bg-black/80">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-2xl font-bold text-cyan-400">{t("gc2_01.title")}</h1>
                    <Link href="/" className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors">
                        {t("gc2_01.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("gc2_01.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[600px]">
                    <OrganicCanvas molecule={molecule} showBonds={showBonds} showHydrogens={showHydrogens} rotationSpeed={rotationSpeed} />
                </div>

                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[600px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">{t("gc2_01.monitor_title")}</h2>
                    </div>

                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">MOLECULE INFO</div>
                        <div className="text-center">
                            <div className="text-2xl text-cyan-300 font-bold">{moleculeInfo[molecule].formula}</div>
                            <div className="text-sm text-cyan-300/70">{moleculeInfo[molecule].name}</div>
                            <div className="text-xs text-cyan-300/50">{moleculeInfo[molecule].type}</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-green-400">SELECT MOLECULE</label>
                        <div className="grid grid-cols-2 gap-2">
                            {(["methane", "ethane", "benzene", "glucose", "alanine"] as const).map((mol) => (
                                <button key={mol} onClick={() => setMolecule(mol)}
                                    className={`px-2 py-2 border text-xs transition-colors ${
                                        molecule === mol ? "border-green-500 bg-green-500/20 text-green-300" : "border-gray-600 text-gray-400"
                                    }`}>
                                    {moleculeInfo[mol].name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-purple-400">ROTATION SPEED</label>
                        <input type="range" min="0" max="2" step="0.1" value={rotationSpeed}
                            onChange={(e) => setRotationSpeed(Number(e.target.value))} className="w-full" />
                        <div className="text-center text-lg text-purple-300">{rotationSpeed.toFixed(1)}x</div>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" checked={showBonds} onChange={(e) => setShowBonds(e.target.checked)} className="w-4 h-4" />
                            <span className="text-cyan-400">Show Bonds</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" checked={showHydrogens} onChange={(e) => setShowHydrogens(e.target.checked)} className="w-4 h-4" />
                            <span className="text-pink-400">Show Hydrogens</span>
                        </label>
                    </div>

                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400">ATOM COLORS</div>
                        <div className="text-xs space-y-1 text-amber-300/80">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                                <span>Carbon (C)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-white"></div>
                                <span>Hydrogen (H)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span>Oxygen (O)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span>Nitrogen (N)</span>
                            </div>
                        </div>
                    </div>

                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400">BOND TYPES</div>
                        <div className="text-xs space-y-1 text-purple-300/80">
                            <div>Single Bond: C-C</div>
                            <div>Double Bond: C=C</div>
                            <div>Triple Bond: C≡C</div>
                        </div>
                    </div>

                    <div className="border border-green-500 p-3 space-y-2">
                        <div className="text-sm text-green-400">{t("gc2_01.mission.title")}</div>
                        <div className="text-xs text-green-300/80">{t("gc2_01.mission.description")}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
