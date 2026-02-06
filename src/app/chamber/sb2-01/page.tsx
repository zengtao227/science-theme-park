"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import GeneticsLab from "@/components/chamber/sb2-01/GeneticsLab";

type Genotype = "RR" | "Rr" | "rR" | "rr";

export default function SB2_01_MendelsGarden() {
    const { t } = useLanguage();
    const [parent1, setParent1] = useState<Genotype>("Rr");
    const [parent2, setParent2] = useState<Genotype>("Rr");

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
                        {t("sb2_01.title")}
                    </h1>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors"
                    >
                        {t("sb2_01.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("sb2_01.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Main Lab Area */}
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 p-6">
                    <GeneticsLab
                        parent1={parent1}
                        parent2={parent2}
                        onParent1Change={setParent1}
                        onParent2Change={setParent2}
                    />
                </div>

                {/* Info Panel */}
                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[800px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">
                            {t("sb2_01.monitor_title")}
                        </h2>
                    </div>

                    {/* Genetics Basics */}
                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400 font-bold">{t("sb2_01.labels.genetics_basics")}</div>
                        <div className="text-xs text-purple-300/80 space-y-1">
                            <div><span className="text-purple-400">Allele:</span> A version of a gene</div>
                            <div><span className="text-purple-400">R (Dominant):</span> Purple flower</div>
                            <div><span className="text-purple-400">r (Recessive):</span> White flower</div>
                        </div>
                    </div>

                    {/* Genotype vs Phenotype */}
                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400 font-bold">{t("sb2_01.labels.genotype_phenotype")}</div>
                        <div className="text-xs text-cyan-300/80 space-y-1">
                            <div><span className="text-cyan-400">Genotype:</span> Genetic makeup (RR, Rr, rr)</div>
                            <div><span className="text-cyan-400">Phenotype:</span> Observable trait (Purple/White)</div>
                        </div>
                    </div>

                    {/* Dominance Rules */}
                    <div className="border border-green-500 p-3 space-y-2">
                        <div className="text-sm text-green-400 font-bold">{t("sb2_01.labels.dominance")}</div>
                        <div className="text-xs text-green-300/80 space-y-1">
                            <div>RR → Purple (Homozygous Dominant)</div>
                            <div>Rr → Purple (Heterozygous)</div>
                            <div>rr → White (Homozygous Recessive)</div>
                        </div>
                    </div>

                    {/* Mendel's Laws */}
                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400 font-bold">{t("sb2_01.labels.mendels_laws")}</div>
                        <div className="text-xs text-amber-300/80 space-y-2">
                            <div>
                                <div className="text-amber-400">Law of Segregation:</div>
                                <div>Each parent contributes one allele to offspring</div>
                            </div>
                            <div>
                                <div className="text-amber-400">Law of Independent Assortment:</div>
                                <div>Alleles separate independently during gamete formation</div>
                            </div>
                        </div>
                    </div>

                    {/* Mission Info */}
                    <div className="border border-pink-500 p-3 space-y-2">
                        <div className="text-sm text-pink-400">{t("sb2_01.mission.title")}</div>
                        <div className="text-xs text-pink-300/80">
                            {t("sb2_01.mission.description")}
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("sb2_01.labels.instructions")}</div>
                        <div className="text-xs text-cyan-300/80 space-y-1">
                            <div>• Select genotypes for both parents</div>
                            <div>• Observe the Punnett Square results</div>
                            <div>• Analyze genotype and phenotype ratios</div>
                            <div>• Try different combinations (RR×rr, Rr×Rr, etc.)</div>
                        </div>
                    </div>

                    {/* Classic Crosses */}
                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400 font-bold">CLASSIC CROSSES</div>
                        <div className="text-xs text-purple-300/80 space-y-1">
                            <div>Rr × Rr → 3:1 phenotype ratio</div>
                            <div>RR × rr → 100% Rr (all purple)</div>
                            <div>Rr × rr → 1:1 phenotype ratio</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
