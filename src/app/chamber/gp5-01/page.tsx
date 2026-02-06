"use client";

import { useState, useCallback, useMemo } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";
import { calculateBindingEnergy, calculateBEperNucleon, isStable, getDecayMode } from "@/components/chamber/gp5-01/NuclearSim";

const NuclearSim = dynamic(() => import("@/components/chamber/gp5-01/NuclearSim"), {
    ssr: false,
});

export default function GP5_01_AtomicCore() {
    const { t } = useLanguage();
    const [protons, setProtons] = useState(26); // Iron-56
    const [neutrons, setNeutrons] = useState(30);
    const [showStabilityIsland, setShowStabilityIsland] = useState(true);
    
    const A = protons + neutrons;
    const bindingEnergy = calculateBindingEnergy(A, protons);
    const bePerNucleon = calculateBEperNucleon(A, protons);
    const stable = isStable(protons, neutrons);
    const decayMode = getDecayMode(protons, neutrons);
    
    // Simulate decay chain
    const buildDecayChain = useCallback(() => {
        const chain: Array<{Z: number, N: number, mode: string}> = [];
        let currentZ = protons;
        let currentN = neutrons;
        let iterations = 0;
        const maxIterations = 10;
        
        while (!isStable(currentZ, currentN) && iterations < maxIterations) {
            const mode = getDecayMode(currentZ, currentN);
            chain.push({ Z: currentZ, N: currentN, mode });
            
            if (mode === "alpha") {
                currentZ -= 2;
                currentN -= 2;
            } else if (mode === "beta-") {
                currentZ += 1;
                currentN -= 1;
            } else if (mode === "beta+") {
                currentZ -= 1;
                currentN += 1;
            } else {
                break;
            }
            
            iterations++;
        }
        
        if (isStable(currentZ, currentN)) {
            chain.push({ Z: currentZ, N: currentN, mode: "stable" });
        }
        
        return chain;
    }, [protons, neutrons]);

    const decayChain = useMemo(() => {
        if (stable) return [];
        return buildDecayChain();
    }, [stable, buildDecayChain]);
    
    // Preset nuclei
    const presets = [
        { name: "H-1", Z: 1, N: 0 },
        { name: "He-4", Z: 2, N: 2 },
        { name: "C-12", Z: 6, N: 6 },
        { name: "Fe-56", Z: 26, N: 30 },
        { name: "U-238", Z: 92, N: 146 },
        { name: "Pu-239", Z: 94, N: 145 },
    ];
    
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
                        {t("gp5_01.title")}
                    </h1>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors"
                    >
                        {t("gp5_01.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("gp5_01.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Canvas */}
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[700px]">
                    <NuclearSim
                        protons={protons}
                        neutrons={neutrons}
                        showStabilityIsland={showStabilityIsland}
                    />
                </div>

                {/* Control Panel */}
                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[700px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">
                            {t("gp5_01.monitor_title")}
                        </h2>
                    </div>

                    {/* Nucleus Info */}
                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400 font-bold">NUCLEUS INFO</div>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-purple-300">Protons (Z):</span>
                                <span className="text-pink-300 font-bold">{protons}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-purple-300">Neutrons (N):</span>
                                <span className="text-cyan-300 font-bold">{neutrons}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-purple-300">Mass Number (A):</span>
                                <span className="text-amber-300 font-bold">{A}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-purple-300">Status:</span>
                                <span className={`font-bold ${stable ? "text-green-300" : "text-red-300"}`}>
                                    {stable ? "STABLE" : "UNSTABLE"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Proton Control */}
                    <div className="space-y-2">
                        <label className="text-sm text-pink-400">PROTONS (Z)</label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={protons}
                            onChange={(e) => setProtons(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center text-lg text-pink-300">{protons}</div>
                    </div>

                    {/* Neutron Control */}
                    <div className="space-y-2">
                        <label className="text-sm text-cyan-400">NEUTRONS (N)</label>
                        <input
                            type="range"
                            min="0"
                            max="150"
                            value={neutrons}
                            onChange={(e) => setNeutrons(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center text-lg text-cyan-300">{neutrons}</div>
                    </div>

                    {/* Binding Energy */}
                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400 font-bold">BINDING ENERGY (SEMF)</div>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-amber-300">Total B.E.:</span>
                                <span className="text-amber-200 font-bold">{bindingEnergy.toFixed(2)} MeV</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-amber-300">B.E. per nucleon:</span>
                                <span className="text-amber-200 font-bold">{bePerNucleon.toFixed(3)} MeV</span>
                            </div>
                        </div>
                    </div>

                    {/* Decay Mode */}
                    {!stable && (
                        <div className="border border-red-500 p-3 space-y-2">
                            <div className="text-sm text-red-400 font-bold">DECAY MODE</div>
                            <div className="text-lg text-red-300 font-bold">{decayMode.toUpperCase()}</div>
                            {decayMode === "alpha" && (
                                <div className="text-xs text-red-300/80">
                                    Emits α particle (He-4 nucleus)
                                </div>
                            )}
                            {decayMode === "beta-" && (
                                <div className="text-xs text-red-300/80">
                                    Neutron → Proton + electron + antineutrino
                                </div>
                            )}
                            {decayMode === "beta+" && (
                                <div className="text-xs text-red-300/80">
                                    Proton → Neutron + positron + neutrino
                                </div>
                            )}
                        </div>
                    )}

                    {/* Decay Chain */}
                    {decayChain.length > 0 && (
                        <div className="border border-pink-500 p-3 space-y-2">
                            <div className="text-sm text-pink-400 font-bold">DECAY CHAIN</div>
                            <div className="space-y-1 text-xs">
                                {decayChain.map((step, i) => (
                                    <div key={i} className="flex items-center space-x-2">
                                        <span className="text-pink-300">
                                            {step.Z + step.N}-{step.Z}
                                        </span>
                                        {i < decayChain.length - 1 && (
                                            <>
                                                <span className="text-gray-400">→</span>
                                                <span className="text-red-400 text-xs">{step.mode}</span>
                                            </>
                                        )}
                                        {step.mode === "stable" && (
                                            <span className="text-green-400 text-xs">✓ STABLE</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Presets */}
                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400 font-bold">PRESETS</div>
                        <div className="grid grid-cols-2 gap-2">
                            {presets.map((preset) => (
                                <button
                                    key={preset.name}
                                    onClick={() => {
                                        setProtons(preset.Z);
                                        setNeutrons(preset.N);
                                    }}
                                    className="px-2 py-1 border border-cyan-500 hover:bg-cyan-500/20 transition-colors text-xs"
                                >
                                    {preset.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Toggle Stability Island */}
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showStabilityIsland}
                            onChange={(e) => setShowStabilityIsland(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <span className="text-green-400">Show Stability Island</span>
                    </label>

                    {/* Mission Info */}
                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400">{t("gp5_01.mission.title")}</div>
                        <div className="text-xs text-amber-300/80">
                            {t("gp5_01.mission.description")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
