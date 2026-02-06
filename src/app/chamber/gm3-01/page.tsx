"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const ProbabilityCanvas = dynamic(() => import("@/components/chamber/gm3-01/ProbabilityCanvas"), { ssr: false });

export default function G3_01_ProbabilityVault() {
    const { t } = useLanguage();
    const [rows, setRows] = useState(12);
    const [ballCount, setBallCount] = useState(100);
    const [showDistribution, setShowDistribution] = useState(true);

    const mean = rows / 2;
    const stdDev = Math.sqrt(rows / 4);

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
                    <h1 className="text-2xl font-bold text-cyan-400">{t("g3_01.title")}</h1>
                    <Link href="/" className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors">
                        {t("g3_01.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("g3_01.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[600px]">
                    <ProbabilityCanvas rows={rows} ballCount={ballCount} showDistribution={showDistribution} />
                </div>

                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[600px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">{t("g3_01.monitor_title")}</h2>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-cyan-400">{t("g3_01.labels.rows")}</label>
                        <input type="range" min="6" max="20" step="1" value={rows}
                            onChange={(e) => setRows(Number(e.target.value))} className="w-full" />
                        <div className="text-center text-lg text-cyan-300">{rows}</div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-purple-400">{t("g3_01.labels.ball_count")}</label>
                        <input type="range" min="50" max="200" step="10" value={ballCount}
                            onChange={(e) => setBallCount(Number(e.target.value))} className="w-full" />
                        <div className="text-center text-lg text-purple-300">{ballCount}</div>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" checked={showDistribution} onChange={(e) => setShowDistribution(e.target.checked)} className="w-4 h-4" />
                            <span className="text-green-400">{t("g3_01.labels.show_distribution")}</span>
                        </label>
                    </div>

                    <div className="border border-green-500 p-3 space-y-2">
                        <div className="text-sm text-green-400">{t("g3_01.normal.title")}</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span className="text-green-300">{t("g3_01.normal.mean")}</span>
                                <span className="text-green-200 font-bold">{mean.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-green-300">{t("g3_01.normal.std_dev")}</span>
                                <span className="text-green-200 font-bold">{stdDev.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-green-300">{t("g3_01.normal.variance")}</span>
                                <span className="text-green-200 font-bold">{(stdDev * stdDev).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400">{t("g3_01.binomial.title")}</div>
                        <div className="text-xs space-y-1 text-purple-300/80">
                            <div>{t("g3_01.binomial.line_1")}</div>
                            <div>{t("g3_01.binomial.line_2")}</div>
                            <div>{t("g3_01.binomial.line_3")}</div>
                            <div>{t("g3_01.binomial.line_4")}</div>
                        </div>
                    </div>

                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("g3_01.mission.title")}</div>
                        <div className="text-xs text-cyan-300/80">{t("g3_01.mission.description")}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
