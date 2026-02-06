"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const VectorFieldCanvas = dynamic(() => import("@/components/chamber/g2-01/VectorFieldCanvas"), {
    ssr: false,
});

export default function G2_01_VectorPilot() {
    const { t } = useLanguage();
    const [vectorA, setVectorA] = useState<[number, number, number]>([3, 2, 1]);
    const [vectorB, setVectorB] = useState<[number, number, number]>([1, 3, 2]);
    const [showDotProduct, setShowDotProduct] = useState(true);
    const [showCrossProduct, setShowCrossProduct] = useState(true);
    const [showProjection, setShowProjection] = useState(false);

    // Calculate vector operations
    const dotProduct = vectorA[0] * vectorB[0] + vectorA[1] * vectorB[1] + vectorA[2] * vectorB[2];
    const crossProduct: [number, number, number] = [
        vectorA[1] * vectorB[2] - vectorA[2] * vectorB[1],
        vectorA[2] * vectorB[0] - vectorA[0] * vectorB[2],
        vectorA[0] * vectorB[1] - vectorA[1] * vectorB[0],
    ];
    
    const magnitudeA = Math.sqrt(vectorA[0] ** 2 + vectorA[1] ** 2 + vectorA[2] ** 2);
    const magnitudeB = Math.sqrt(vectorB[0] ** 2 + vectorB[1] ** 2 + vectorB[2] ** 2);
    const magnitudeCross = Math.sqrt(crossProduct[0] ** 2 + crossProduct[1] ** 2 + crossProduct[2] ** 2);
    
    const angle = Math.acos(dotProduct / (magnitudeA * magnitudeB)) * 180 / Math.PI;
    const projectionLength = dotProduct / magnitudeB;

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
                        {t("g2_01.title")}
                    </h1>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors"
                    >
                        {t("g2_01.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("g2_01.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Canvas */}
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[600px]">
                    <VectorFieldCanvas
                        vectorA={vectorA}
                        vectorB={vectorB}
                        showDotProduct={showDotProduct}
                        showCrossProduct={showCrossProduct}
                        showProjection={showProjection}
                    />
                </div>

                {/* Control Panel */}
                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[600px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">
                            {t("g2_01.monitor_title")}
                        </h2>
                    </div>

                    {/* Vector A Controls */}
                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("g2_01.labels.vector_a")}</div>
                        <div className="space-y-2">
                            <div>
                                <label className="text-xs text-cyan-300">x:</label>
                                <input
                                    type="range"
                                    min="-5"
                                    max="5"
                                    step="0.5"
                                    value={vectorA[0]}
                                    onChange={(e) => setVectorA([Number(e.target.value), vectorA[1], vectorA[2]])}
                                    className="w-full"
                                />
                                <div className="text-center text-sm text-cyan-300">{vectorA[0].toFixed(1)}</div>
                            </div>
                            <div>
                                <label className="text-xs text-cyan-300">y:</label>
                                <input
                                    type="range"
                                    min="-5"
                                    max="5"
                                    step="0.5"
                                    value={vectorA[1]}
                                    onChange={(e) => setVectorA([vectorA[0], Number(e.target.value), vectorA[2]])}
                                    className="w-full"
                                />
                                <div className="text-center text-sm text-cyan-300">{vectorA[1].toFixed(1)}</div>
                            </div>
                            <div>
                                <label className="text-xs text-cyan-300">z:</label>
                                <input
                                    type="range"
                                    min="-5"
                                    max="5"
                                    step="0.5"
                                    value={vectorA[2]}
                                    onChange={(e) => setVectorA([vectorA[0], vectorA[1], Number(e.target.value)])}
                                    className="w-full"
                                />
                                <div className="text-center text-sm text-cyan-300">{vectorA[2].toFixed(1)}</div>
                            </div>
                        </div>
                        <div className="text-center text-xs text-cyan-300/70">
                            |A| = {magnitudeA.toFixed(3)}
                        </div>
                    </div>

                    {/* Vector B Controls */}
                    <div className="border border-pink-500 p-3 space-y-2">
                        <div className="text-sm text-pink-400">{t("g2_01.labels.vector_b")}</div>
                        <div className="space-y-2">
                            <div>
                                <label className="text-xs text-pink-300">x:</label>
                                <input
                                    type="range"
                                    min="-5"
                                    max="5"
                                    step="0.5"
                                    value={vectorB[0]}
                                    onChange={(e) => setVectorB([Number(e.target.value), vectorB[1], vectorB[2]])}
                                    className="w-full"
                                />
                                <div className="text-center text-sm text-pink-300">{vectorB[0].toFixed(1)}</div>
                            </div>
                            <div>
                                <label className="text-xs text-pink-300">y:</label>
                                <input
                                    type="range"
                                    min="-5"
                                    max="5"
                                    step="0.5"
                                    value={vectorB[1]}
                                    onChange={(e) => setVectorB([vectorB[0], Number(e.target.value), vectorB[2]])}
                                    className="w-full"
                                />
                                <div className="text-center text-sm text-pink-300">{vectorB[1].toFixed(1)}</div>
                            </div>
                            <div>
                                <label className="text-xs text-pink-300">z:</label>
                                <input
                                    type="range"
                                    min="-5"
                                    max="5"
                                    step="0.5"
                                    value={vectorB[2]}
                                    onChange={(e) => setVectorB([vectorB[0], vectorB[1], Number(e.target.value)])}
                                    className="w-full"
                                />
                                <div className="text-center text-sm text-pink-300">{vectorB[2].toFixed(1)}</div>
                            </div>
                        </div>
                        <div className="text-center text-xs text-pink-300/70">
                            |B| = {magnitudeB.toFixed(3)}
                        </div>
                    </div>

                    {/* Visualization Toggles */}
                    <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showDotProduct}
                                onChange={(e) => setShowDotProduct(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span className="text-cyan-400">{t("g2_01.labels.show_dot_product")}</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showCrossProduct}
                                onChange={(e) => setShowCrossProduct(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span className="text-green-400">{t("g2_01.labels.show_cross_product")}</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showProjection}
                                onChange={(e) => setShowProjection(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span className="text-yellow-400">{t("g2_01.labels.show_projection")}</span>
                        </label>
                    </div>

                    {/* Dot Product */}
                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("g2_01.labels.dot_product")}</div>
                        <div className="text-center text-2xl text-cyan-300 font-bold">
                            {dotProduct.toFixed(3)}
                        </div>
                        <div className="text-xs space-y-1 text-cyan-300/80">
                            <div>A·B = |A||B|cos(θ)</div>
                            <div>θ = {angle.toFixed(1)}°</div>
                            <div>Projection: {projectionLength.toFixed(3)}</div>
                        </div>
                    </div>

                    {/* Cross Product */}
                    <div className="border border-green-500 p-3 space-y-2">
                        <div className="text-sm text-green-400">{t("g2_01.labels.cross_product")}</div>
                        <div className="text-center text-sm text-green-300 font-bold">
                            ({crossProduct[0].toFixed(1)}, {crossProduct[1].toFixed(1)}, {crossProduct[2].toFixed(1)})
                        </div>
                        <div className="text-xs space-y-1 text-green-300/80">
                            <div>|A×B| = {magnitudeCross.toFixed(3)}</div>
                            <div>Area = |A||B|sin(θ)</div>
                            <div>Area = {(magnitudeA * magnitudeB * Math.sin(angle * Math.PI / 180)).toFixed(3)}</div>
                        </div>
                    </div>

                    {/* Formulas */}
                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400">{t("g2_01.labels.formulas")}</div>
                        <div className="text-xs space-y-1 text-purple-300/80">
                            <div>A·B = Aₓ Bₓ + Aᵧ Bᵧ + A_z B_z</div>
                            <div>A×B = (AᵧB_z - A_zBᵧ, A_zBₓ - AₓB_z, AₓBᵧ - AᵧBₓ)</div>
                            <div>|A| = √(Aₓ² + Aᵧ² + A_z²)</div>
                        </div>
                    </div>

                    {/* Mission Info */}
                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400">{t("g2_01.mission.title")}</div>
                        <div className="text-xs text-amber-300/80">
                            {t("g2_01.mission.description")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
