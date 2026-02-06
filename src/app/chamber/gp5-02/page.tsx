"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const RelativityCanvas = dynamic(() => import("@/components/chamber/gp5-02/RelativityCanvas"), {
    ssr: false,
});

export default function GP5_02_RelativityLab() {
    const { t } = useLanguage();
    const [velocity, setVelocity] = useState(0.5); // fraction of c
    const [showDoppler, setShowDoppler] = useState(true);
    const [showContraction, setShowContraction] = useState(true);

    const gamma = 1 / Math.sqrt(1 - velocity * velocity);
    const timeDilation = gamma;
    const lengthContraction = 1 / gamma;

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
                    <h1 className="text-2xl font-bold text-cyan-400">{t("gp5_02.title")}</h1>
                    <Link href="/" className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors">
                        {t("gp5_02.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("gp5_02.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[600px]">
                    <RelativityCanvas velocity={velocity} showDoppler={showDoppler} showContraction={showContraction} />
                </div>

                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[600px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">{t("gp5_02.monitor_title")}</h2>
                    </div>

                    <div className="border border-green-500 p-3 space-y-2">
                        <div className="text-sm text-green-400">LORENTZ FACTOR</div>
                        <div className="text-center text-3xl text-green-300 font-bold py-2">γ = {gamma.toFixed(3)}</div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-cyan-400">VELOCITY (v/c)</label>
                        <input type="range" min="0" max="0.99" step="0.01" value={velocity}
                            onChange={(e) => setVelocity(Number(e.target.value))} className="w-full" />
                        <div className="text-center text-lg text-cyan-300">{(velocity * 100).toFixed(0)}% c</div>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" checked={showDoppler} onChange={(e) => setShowDoppler(e.target.checked)} className="w-4 h-4" />
                            <span className="text-purple-400">Show Doppler Effect</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" checked={showContraction} onChange={(e) => setShowContraction(e.target.checked)} className="w-4 h-4" />
                            <span className="text-pink-400">Show Length Contraction</span>
                        </label>
                    </div>

                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">RELATIVISTIC EFFECTS</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span className="text-cyan-300">Time Dilation:</span>
                                <span className="text-cyan-200 font-bold">Δt&apos; = {timeDilation.toFixed(3)}Δt</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-cyan-300">Length Contraction:</span>
                                <span className="text-cyan-200 font-bold">L&apos; = {lengthContraction.toFixed(3)}L</span>
                            </div>
                        </div>
                    </div>

                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400">FORMULAS</div>
                        <div className="text-xs space-y-1 text-purple-300/80">
                            <div>γ = 1/√(1 - v²/c²)</div>
                            <div>Δt&apos; = γΔt</div>
                            <div>L&apos; = L/γ</div>
                            <div>E = γmc²</div>
                        </div>
                    </div>

                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400">{t("gp5_02.mission.title")}</div>
                        <div className="text-xs text-amber-300/80">{t("gp5_02.mission.description")}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
