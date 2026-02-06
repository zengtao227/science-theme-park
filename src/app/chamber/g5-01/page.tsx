"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const MatrixCanvas = dynamic(() => import("@/components/chamber/g5-01/MatrixCanvas"), { ssr: false });

export default function G5_01_MatrixGeometry() {
    const { t } = useLanguage();
    const [matrix, setMatrix] = useState([[2, 0, 0], [0, 1, 0], [0, 0, 1]]);
    const [showEigenvectors, setShowEigenvectors] = useState(true);
    const [showGrid, setShowGrid] = useState(true);
    const [animate, setAnimate] = useState(true);

    const updateMatrix = (row: number, col: number, value: number) => {
        const newMatrix = matrix.map((r, i) => i === row ? r.map((v, j) => j === col ? value : v) : r);
        setMatrix(newMatrix);
    };

    const det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    const detLabel = t("g5_01.labels.det_value").replace("{value}", det.toFixed(2));

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
                    <h1 className="text-2xl font-bold text-cyan-400">{t("g5_01.title")}</h1>
                    <Link href="/" className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors">
                        {t("g5_01.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("g5_01.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[600px]">
                    <MatrixCanvas matrix={matrix} showEigenvectors={showEigenvectors} showGrid={showGrid} animate={animate} />
                </div>

                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[600px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">{t("g5_01.monitor_title")}</h2>
                    </div>

                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("g5_01.labels.matrix_title")}</div>
                        <div className="grid grid-cols-2 gap-2">
                            {[0, 1].map(row => [0, 1].map(col => (
                                <div key={`${row}-${col}`}>
                                    <input type="number" step="0.1" value={matrix[row][col]}
                                        onChange={(e) => updateMatrix(row, col, Number(e.target.value))}
                                        className="w-full px-2 py-1 bg-black border border-cyan-500 text-cyan-300 text-center" />
                                </div>
                            )))}
                        </div>
                        <div className="text-center text-xs text-cyan-300/70">{detLabel}</div>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" checked={showEigenvectors} onChange={(e) => setShowEigenvectors(e.target.checked)} className="w-4 h-4" />
                            <span className="text-yellow-400">{t("g5_01.labels.show_eigenvectors")}</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} className="w-4 h-4" />
                            <span className="text-purple-400">{t("g5_01.labels.show_grid")}</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" checked={animate} onChange={(e) => setAnimate(e.target.checked)} className="w-4 h-4" />
                            <span className="text-green-400">{t("g5_01.labels.animate")}</span>
                        </label>
                    </div>

                    <div className="border border-green-500 p-3 space-y-2">
                        <div className="text-sm text-green-400">{t("g5_01.presets.title")}</div>
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => setMatrix([[2, 0, 0], [0, 2, 0], [0, 0, 1]])}
                                className="px-2 py-1 border border-green-500 hover:bg-green-500/20 text-xs">
                                {t("g5_01.presets.scale")}
                            </button>
                            <button onClick={() => setMatrix([[0, -1, 0], [1, 0, 0], [0, 0, 1]])}
                                className="px-2 py-1 border border-green-500 hover:bg-green-500/20 text-xs">
                                {t("g5_01.presets.rotate")}
                            </button>
                            <button onClick={() => setMatrix([[1, 1, 0], [0, 1, 0], [0, 0, 1]])}
                                className="px-2 py-1 border border-green-500 hover:bg-green-500/20 text-xs">
                                {t("g5_01.presets.shear")}
                            </button>
                            <button onClick={() => setMatrix([[-1, 0, 0], [0, 1, 0], [0, 0, 1]])}
                                className="px-2 py-1 border border-green-500 hover:bg-green-500/20 text-xs">
                                {t("g5_01.presets.reflect")}
                            </button>
                        </div>
                    </div>

                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400">{t("g5_01.linear.title")}</div>
                        <div className="text-xs space-y-1 text-purple-300/80">
                            <div>{t("g5_01.linear.line_1")}</div>
                            <div>{t("g5_01.linear.line_2")}</div>
                            <div>{t("g5_01.linear.line_3")}</div>
                        </div>
                    </div>

                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("g5_01.mission.title")}</div>
                        <div className="text-xs text-cyan-300/80">{t("g5_01.mission.description")}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
