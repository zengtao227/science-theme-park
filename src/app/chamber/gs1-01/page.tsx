"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const FractalCanvas = dynamic(() => import("@/components/chamber/gs1-01/FractalCanvas"), { ssr: false });

export default function GS1_01_ComplexFractal() {
    const { t } = useLanguage();
    const [maxIterations, setMaxIterations] = useState(100);
    const [zoom, setZoom] = useState(1);
    const [centerX, setCenterX] = useState(-0.5);
    const [centerY, setCenterY] = useState(0);
    const [colorScheme, setColorScheme] = useState<"classic" | "fire" | "ice" | "rainbow">("classic");
    const zoomValue = t("gs1_01.labels.zoom_value").replace("{value}", zoom.toFixed(1));
    const schemeLabels = {
        classic: t("gs1_01.labels.scheme.classic"),
        fire: t("gs1_01.labels.scheme.fire"),
        ice: t("gs1_01.labels.scheme.ice"),
        rainbow: t("gs1_01.labels.scheme.rainbow"),
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
                    <h1 className="text-2xl font-bold text-cyan-400">{t("gs1_01.title")}</h1>
                    <Link href="/" className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors">
                        {t("gs1_01.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("gs1_01.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[600px]">
                    <FractalCanvas maxIterations={maxIterations} zoom={zoom} centerX={centerX} centerY={centerY} colorScheme={colorScheme} />
                </div>

                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[600px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">{t("gs1_01.monitor_title")}</h2>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-cyan-400">{t("gs1_01.labels.max_iterations")}</label>
                        <input type="range" min="50" max="500" step="10" value={maxIterations}
                            onChange={(e) => setMaxIterations(Number(e.target.value))} className="w-full" />
                        <div className="text-center text-lg text-cyan-300">{maxIterations}</div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-purple-400">{t("gs1_01.labels.zoom")}</label>
                        <input type="range" min="0.1" max="100" step="0.1" value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))} className="w-full" />
                        <div className="text-center text-lg text-purple-300">{zoomValue}</div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-amber-400">{t("gs1_01.labels.center_x")}</label>
                        <input type="range" min="-2" max="1" step="0.01" value={centerX}
                            onChange={(e) => setCenterX(Number(e.target.value))} className="w-full" />
                        <div className="text-center text-lg text-amber-300">{centerX.toFixed(3)}</div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-pink-400">{t("gs1_01.labels.center_y")}</label>
                        <input type="range" min="-1" max="1" step="0.01" value={centerY}
                            onChange={(e) => setCenterY(Number(e.target.value))} className="w-full" />
                        <div className="text-center text-lg text-pink-300">{centerY.toFixed(3)}</div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-green-400">{t("gs1_01.labels.color_scheme")}</label>
                        <div className="grid grid-cols-2 gap-2">
                            {(["classic", "fire", "ice", "rainbow"] as const).map((scheme) => (
                                <button key={scheme} onClick={() => setColorScheme(scheme)}
                                    className={`px-3 py-2 border transition-colors ${
                                        colorScheme === scheme ? "border-green-500 bg-green-500/20 text-green-300" : "border-gray-600 text-gray-400"
                                    }`}>
                                    {schemeLabels[scheme]}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400">{t("gs1_01.mandelbrot.title")}</div>
                        <div className="text-xs space-y-1 text-purple-300/80">
                            <div>{t("gs1_01.mandelbrot.line_1")}</div>
                            <div>{t("gs1_01.mandelbrot.line_2")}</div>
                            <div>{t("gs1_01.mandelbrot.line_3")}</div>
                        </div>
                    </div>

                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("gs1_01.mission.title")}</div>
                        <div className="text-xs text-cyan-300/80">{t("gs1_01.mission.description")}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
