"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const MetabolicCell = dynamic(() => import("@/components/chamber/sb1-01/MetabolicCell"), {
    ssr: false,
});

export default function SB1_01_Metabolic() {
    const { t } = useLanguage();
    const [osmolarity, setOsmolarity] = useState(0);
    const [showATP, setShowATP] = useState(true);

    const getOsmolarityStatus = () => {
        if (osmolarity > 0.3) return { status: "HYPOTONIC", color: "text-blue-400", desc: "Cell swelling (water influx)" };
        if (osmolarity < -0.3) return { status: "HYPERTONIC", color: "text-red-400", desc: "Cell shrinking (water efflux)" };
        return { status: "ISOTONIC", color: "text-green-400", desc: "Equilibrium (no net water movement)" };
    };

    const status = getOsmolarityStatus();

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
                        SB1.01 // METABOLIC ENGINE
                    </h1>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors"
                    >
                        Back to Nexus
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">SB1.01_METABOLIC_ENGINE // NODE: BASEL</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Canvas */}
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[600px]">
                    <MetabolicCell
                        osmolarity={osmolarity}
                        showATP={showATP}
                    />
                </div>

                {/* Control Panel */}
                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[600px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">
                            METABOLIC MONITOR
                        </h2>
                    </div>

                    {/* Osmolarity Control */}
                    <div className="space-y-2">
                        <label className="text-sm text-cyan-400">EXTERNAL OSMOLARITY</label>
                        <input
                            type="range"
                            min="-1"
                            max="1"
                            step="0.1"
                            value={osmolarity}
                            onChange={(e) => setOsmolarity(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs">
                            <span className="text-red-400">Hypertonic</span>
                            <span className="text-green-400">Isotonic</span>
                            <span className="text-blue-400">Hypotonic</span>
                        </div>
                    </div>

                    {/* Osmotic Status */}
                    <div className={`border border-purple-500 p-3 space-y-2 ${
                        osmolarity > 0.3 ? "bg-blue-900/20" : 
                        osmolarity < -0.3 ? "bg-red-900/20" : 
                        "bg-green-900/20"
                    }`}>
                        <div className="text-sm text-purple-400 font-bold">OSMOTIC STATUS</div>
                        <div className={`text-lg font-bold ${status.color}`}>
                            {status.status}
                        </div>
                        <div className="text-xs text-purple-300/80">
                            {status.desc}
                        </div>
                        <div className="text-xs text-purple-300/80 mt-2">
                            Deformation: {osmolarity > 0 ? "+" : ""}{(osmolarity * 100).toFixed(0)}%
                        </div>
                    </div>

                    {/* ATP Toggle */}
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showATP}
                            onChange={(e) => setShowATP(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <span className="text-amber-400">Show ATP Flow</span>
                    </label>

                    {/* ATP Info */}
                    {showATP && (
                        <div className="border border-amber-500 p-3 space-y-2">
                            <div className="text-sm text-amber-400 font-bold">ATP PRODUCTION</div>
                            <div className="text-xs text-amber-300/80 space-y-1">
                                <div>• Yellow particles = ATP molecules</div>
                                <div>• Generated in mitochondria</div>
                                <div>• Flow to cell membrane (ion pumps)</div>
                                <div>• Powers active transport</div>
                            </div>
                        </div>
                    )}

                    {/* Osmosis Explanation */}
                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400 font-bold">OSMOSIS</div>
                        <div className="text-xs text-cyan-300/80 space-y-1">
                            <div>Water moves from low to high solute concentration</div>
                            <div className="mt-2 text-blue-400">Hypotonic (low solute outside):</div>
                            <div>→ Water enters cell → Swelling</div>
                            <div className="mt-2 text-red-400">Hypertonic (high solute outside):</div>
                            <div>→ Water leaves cell → Shrinking</div>
                            <div className="mt-2 text-green-400">Isotonic (equal solute):</div>
                            <div>→ No net water movement → Stable</div>
                        </div>
                    </div>

                    {/* Cellular Respiration */}
                    <div className="border border-pink-500 p-3 space-y-2">
                        <div className="text-sm text-pink-400 font-bold">CELLULAR RESPIRATION</div>
                        <div className="text-xs text-pink-300/80 space-y-1">
                            <div>C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP</div>
                            <div className="mt-2">Glucose + Oxygen → Carbon Dioxide + Water + Energy</div>
                            <div className="mt-2">Mitochondria produce ~36-38 ATP per glucose</div>
                        </div>
                    </div>

                    {/* Organelles */}
                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400 font-bold">ORGANELLES</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                <span className="text-purple-300">Nucleus (DNA storage)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                                <span className="text-pink-300">Mitochondria (ATP production)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                                <span className="text-cyan-300">Cell Membrane (selective barrier)</span>
                            </div>
                        </div>
                    </div>

                    {/* Mission Info */}
                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400">MISSION: CELL METABOLISM</div>
                        <div className="text-xs text-amber-300/80">
                            Explore cellular respiration and osmotic regulation. Understand how cells maintain homeostasis.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
