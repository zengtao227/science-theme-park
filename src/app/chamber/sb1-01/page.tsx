"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const CellCanvas = dynamic(() => import("@/components/chamber/sb1-01/CellCanvas"), {
    ssr: false,
});

export default function SB1_01_CellFactory() {
    const { t } = useLanguage();
    const [selectedOrganelle, setSelectedOrganelle] = useState<string | null>(null);
    const [showCutaway, setShowCutaway] = useState(true);
    const organelleInfo: Record<string, { name: string; function: string; details: string }> = {
        nucleus: {
            name: "Nucleus",
            function: "Control Center",
            details: "Contains DNA and controls all cell activities. The 'brain' of the cell.",
        },
        mitochondria1: {
            name: "Mitochondria",
            function: "Powerhouse",
            details: "Produces ATP through cellular respiration. Converts glucose into energy.",
        },
        mitochondria2: {
            name: "Mitochondria",
            function: "Powerhouse",
            details: "Produces ATP through cellular respiration. Converts glucose into energy.",
        },
        ribosome1: {
            name: "Ribosome",
            function: "Protein Factory",
            details: "Synthesizes proteins by reading mRNA sequences.",
        },
        ribosome2: {
            name: "Ribosome",
            function: "Protein Factory",
            details: "Synthesizes proteins by reading mRNA sequences.",
        },
        ribosome3: {
            name: "Ribosome",
            function: "Protein Factory",
            details: "Synthesizes proteins by reading mRNA sequences.",
        },
        golgi: {
            name: "Golgi Apparatus",
            function: "Packaging Center",
            details: "Modifies, packages, and transports proteins to their destinations.",
        },
        er: {
            name: "Endoplasmic Reticulum",
            function: "Synthesis Network",
            details: "Rough ER: protein synthesis. Smooth ER: lipid synthesis and detoxification.",
        },
    };

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
                        {t("sb1_01.title")}
                    </h1>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors"
                    >
                        {t("sb1_01.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("sb1_01.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Canvas */}
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[600px]">
                    <CellCanvas
                        selectedOrganelle={selectedOrganelle}
                        onSelectOrganelle={setSelectedOrganelle}
                        showCutaway={showCutaway}
                    />
                </div>

                {/* Control Panel */}
                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[600px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">
                            {t("sb1_01.monitor_title")}
                        </h2>
                    </div>

                    {/* View Controls */}
                    <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showCutaway}
                                onChange={(e) => setShowCutaway(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span className="text-cyan-400">{t("sb1_01.labels.cutaway_view")}</span>
                        </label>
                    </div>

                    {/* Selected Organelle Info */}
                    {selectedOrganelle && organelleInfo[selectedOrganelle] && (
                        <div className="border border-purple-500 p-3 space-y-2">
                            <div className="text-sm text-purple-400">{t("sb1_01.labels.selected")}</div>
                            <div className="text-lg font-bold text-purple-300">
                                {organelleInfo[selectedOrganelle].name}
                            </div>
                            <div className="text-sm text-purple-200">
                                <span className="text-purple-400">Function: </span>
                                {organelleInfo[selectedOrganelle].function}
                            </div>
                            <div className="text-xs text-purple-300/80">
                                {organelleInfo[selectedOrganelle].details}
                            </div>
                        </div>
                    )}

                    {/* Organelle List */}
                    <div className="border border-green-500 p-3 space-y-2">
                        <div className="text-sm text-green-400">{t("sb1_01.labels.organelles")}</div>
                        <div className="space-y-1 text-xs">
                            <div
                                className="flex items-center space-x-2 cursor-pointer hover:bg-purple-500/20 p-1 rounded"
                                onClick={() => setSelectedOrganelle("nucleus")}
                            >
                                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                <span>Nucleus</span>
                            </div>
                            <div
                                className="flex items-center space-x-2 cursor-pointer hover:bg-pink-500/20 p-1 rounded"
                                onClick={() => setSelectedOrganelle("mitochondria1")}
                            >
                                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                                <span>Mitochondria</span>
                            </div>
                            <div
                                className="flex items-center space-x-2 cursor-pointer hover:bg-green-500/20 p-1 rounded"
                                onClick={() => setSelectedOrganelle("ribosome1")}
                            >
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span>Ribosomes</span>
                            </div>
                            <div
                                className="flex items-center space-x-2 cursor-pointer hover:bg-amber-500/20 p-1 rounded"
                                onClick={() => setSelectedOrganelle("golgi")}
                            >
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <span>Golgi Apparatus</span>
                            </div>
                            <div
                                className="flex items-center space-x-2 cursor-pointer hover:bg-cyan-500/20 p-1 rounded"
                                onClick={() => setSelectedOrganelle("er")}
                            >
                                <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                                <span>Endoplasmic Reticulum</span>
                            </div>
                        </div>
                    </div>

                    {/* Mission Info */}
                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400">{t("sb1_01.mission.title")}</div>
                        <div className="text-xs text-amber-300/80">
                            {t("sb1_01.mission.description")}
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("sb1_01.labels.instructions")}</div>
                        <div className="text-xs text-cyan-300/80 space-y-1">
                            <div>• Click on organelles to learn their functions</div>
                            <div>• Drag to rotate the cell view</div>
                            <div>• Scroll to zoom in/out</div>
                            <div>• Toggle cutaway view to see inside</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
