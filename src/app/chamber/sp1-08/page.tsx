"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const OpticsCanvas = dynamic(() => import("@/components/chamber/sp1-08/OpticsCanvas"), { ssr: false });

export default function SP1_08_OpticsBench() {
    const { t } = useLanguage();
    const [n1, setN1] = useState(1.0); // Air
    const [n2, setN2] = useState(1.5); // Glass
    const [incidentAngle, setIncidentAngle] = useState(30);
    const [showPrism, setShowPrism] = useState(false);
    const [showTotalReflection, setShowTotalReflection] = useState(false);

    const criticalAngle = n1 > n2 ? Math.asin(n2 / n1) * 180 / Math.PI : 90;
    const sinTheta2 = (n1 / n2) * Math.sin(incidentAngle * Math.PI / 180);
    const totalReflection = Math.abs(sinTheta2) > 1;
    const refractedAngle = totalReflection ? 0 : Math.asin(sinTheta2) * 180 / Math.PI;

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
                    <h1 className="text-2xl font-bold text-cyan-400">{t("sp1_08.title")}</h1>
                    <Link href="/" className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors">
                        {t("sp1_08.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("sp1_08.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[600px]">
                    <OpticsCanvas n1={n1} n2={n2} incidentAngle={incidentAngle} showPrism={showPrism} showTotalReflection={showTotalReflection} />
                </div>

                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[600px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">{t("sp1_08.monitor_title")}</h2>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" checked={showPrism} onChange={(e) => setShowPrism(e.target.checked)} className="w-4 h-4" />
                            <span className="text-purple-400">Show Prism Dispersion</span>
                        </label>
                    </div>

                    {!showPrism && (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm text-cyan-400">MEDIUM 1 (n₁)</label>
                                <input type="range" min="1.0" max="2.5" step="0.1" value={n1}
                                    onChange={(e) => setN1(Number(e.target.value))} className="w-full" />
                                <div className="text-center text-lg text-cyan-300">{n1.toFixed(2)}</div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-purple-400">MEDIUM 2 (n₂)</label>
                                <input type="range" min="1.0" max="2.5" step="0.1" value={n2}
                                    onChange={(e) => setN2(Number(e.target.value))} className="w-full" />
                                <div className="text-center text-lg text-purple-300">{n2.toFixed(2)}</div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-amber-400">INCIDENT ANGLE (θ₁)</label>
                                <input type="range" min="0" max="89" step="1" value={incidentAngle}
                                    onChange={(e) => setIncidentAngle(Number(e.target.value))} className="w-full" />
                                <div className="text-center text-lg text-amber-300">{incidentAngle}°</div>
                            </div>

                            <div className="border border-green-500 p-3 space-y-2">
                                <div className="text-sm text-green-400">REFRACTION</div>
                                <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-green-300">Refracted Angle (θ₂):</span>
                                        <span className="text-green-200 font-bold">
                                            {totalReflection ? "N/A" : `${refractedAngle.toFixed(1)}°`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-green-300">Critical Angle:</span>
                                        <span className="text-green-200 font-bold">{criticalAngle.toFixed(1)}°</span>
                                    </div>
                                    {totalReflection && (
                                        <div className="text-red-400 font-bold text-center mt-2">TOTAL INTERNAL REFLECTION</div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400">SNELL&apos;S LAW</div>
                        <div className="text-xs space-y-1 text-purple-300/80">
                            <div>n₁ sin(θ₁) = n₂ sin(θ₂)</div>
                            <div>θ_c = arcsin(n₂/n₁)</div>
                            <div>v = c/n</div>
                        </div>
                    </div>

                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("sp1_08.mission.title")}</div>
                        <div className="text-xs text-cyan-300/80">{t("sp1_08.mission.description")}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
