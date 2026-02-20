"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { clsx } from "clsx";
import { useEffect, useCallback, useState } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import dynamic from "next/dynamic";

const TrigCanvas = dynamic(() => import("@/components/chamber/sm3-02/TrigCanvas"), {
    ssr: false,
});



import {
    S302Quest,
    Stage,
    generateUnitCircleQuests,
    generateProjectionsQuests,
    generateWavesQuests,
} from "@/lib/sm3-02/quests";

// ----------------------------------------------------------------------------
// HELPER: EXACT VALUES MAP
// ----------------------------------------------------------------------------
const EXACT_VALUES: Record<number, { sin: string; cos: string; tan: string }> = {
    0: { sin: "0", cos: "1", tan: "0" },
    30: { sin: "\\frac{1}{2}", cos: "\\frac{\\sqrt{3}}{2}", tan: "\\frac{\\sqrt{3}}{3}" },
    45: { sin: "\\frac{\\sqrt{2}}{2}", cos: "\\frac{\\sqrt{2}}{2}", tan: "1" },
    60: { sin: "\\frac{\\sqrt{3}}{2}", cos: "\\frac{1}{2}", tan: "\\sqrt{3}" },
    90: { sin: "1", cos: "0", tan: "\\infty" },
    120: { sin: "\\frac{\\sqrt{3}}{2}", cos: "-\\frac{1}{2}", tan: "-\\sqrt{3}" },
    135: { sin: "\\frac{\\sqrt{2}}{2}", cos: "-\\frac{\\sqrt{2}}{2}", tan: "-1" },
    150: { sin: "\\frac{1}{2}", cos: "-\\frac{\\sqrt{3}}{2}", tan: "-\\frac{\\sqrt{3}}{3}" },
    180: { sin: "0", cos: "-1", tan: "0" },
    210: { sin: "-\\frac{1}{2}", cos: "-\\frac{\\sqrt{3}}{2}", tan: "\\frac{\\sqrt{3}}{3}" },
    225: { sin: "-\\frac{\\sqrt{2}}{2}", cos: "-\\frac{\\sqrt{2}}{2}", tan: "1" },
    240: { sin: "-\\frac{\\sqrt{3}}{2}", cos: "-\\frac{1}{2}", tan: "\\sqrt{3}" },
    270: { sin: "-1", cos: "0", tan: "\\infty" },
    300: { sin: "-\\frac{\\sqrt{3}}{2}", cos: "\\frac{1}{2}", tan: "-\\sqrt{3}" },
    315: { sin: "-\\frac{\\sqrt{2}}{2}", cos: "\\frac{\\sqrt{2}}{2}", tan: "-1" },
    330: { sin: "-\\frac{1}{2}", cos: "\\frac{\\sqrt{3}}{2}", tan: "-\\frac{\\sqrt{3}}{3}" },
    360: { sin: "0", cos: "1", tan: "0" },
};

// ----------------------------------------------------------------------------
// HELPER: QUESTION BUILDER
// ----------------------------------------------------------------------------
function buildStagePool(t: ReturnType<typeof useLanguage>["t"], difficulty: Difficulty, stage: Stage): S302Quest[] {
    if (stage === "UNIT_CIRCLE") return generateUnitCircleQuests(t, difficulty);
    if (stage === "PROJECTIONS") return generateProjectionsQuests(t, difficulty);
    if (stage === "WAVES") return generateWavesQuests(t, difficulty);
    return [];
}

// ----------------------------------------------------------------------------
// COMPONENT: MONITOR PANEL
// ----------------------------------------------------------------------------
function TrigMonitorPanel({
    angle,
    setAngle,
    showSin,
    setShowSin,
    showCos,
    setShowCos,
    showTan,
    setShowTan,
    showWaves,
    setShowWaves,
}: {
    angle: number;
    setAngle: (a: number) => void;
    showSin: boolean;
    setShowSin: (v: boolean) => void;
    showCos: boolean;
    setShowCos: (v: boolean) => void;
    showTan: boolean;
    setShowTan: (v: boolean) => void;
    showWaves: boolean;
    setShowWaves: (v: boolean) => void;
}) {
    const { t } = useLanguage();
    const rad = (angle * Math.PI) / 180;
    const sinValue = Math.sin(rad);
    const cosValue = Math.cos(rad);
    const tanValue = Math.tan(rad);

    const specialAngles = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360];
    const keyAngles = [0, 90, 180, 270, 360];

    const exact = EXACT_VALUES[angle];

    return (
        <div className="space-y-6">
            <div className="rounded-xl overflow-hidden border border-white/10 aspect-[4/3] bg-black/40">
                <TrigCanvas
                    angle={angle}
                    showSin={showSin}
                    showCos={showCos}
                    showTan={showTan}
                    showWaves={showWaves}
                />
            </div>

            {/* SPECIAL ANGLES */}
            <div className="space-y-2">
                <div className="text-[9px] uppercase tracking-[0.3em] font-black text-cyan-400/70">
                    {t("sm3_02.labels.special_angles")}
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {specialAngles.map((a) => (
                        <button
                            key={a}
                            onClick={() => setAngle(a)}
                            className={clsx(
                                "px-2 py-1 rounded text-xs font-mono border transition-all",
                                angle === a
                                    ? "bg-cyan-500 text-black border-cyan-400 font-bold"
                                    : keyAngles.includes(a)
                                        ? "border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
                                        : "border-white/10 text-white/40 hover:border-white/30"
                            )}
                        >
                            {a}°
                        </button>
                    ))}
                </div>
            </div>

            {/* ANGLE SLIDER */}
            <div className="space-y-2">
                <label className="text-[10px] text-cyan-400/60 uppercase tracking-widest">{t("sm3_02.labels.angle")}</label>
                <input
                    type="range"
                    min="0"
                    max="360"
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between font-mono text-xs">
                    <span className="text-cyan-300">{angle}°</span>
                    <span className="text-cyan-300/50">{rad.toFixed(2)} rad</span>
                </div>
            </div>

            {/* VALUES DISPLAY */}
            <div className="space-y-2">
                <div className="text-[9px] uppercase tracking-[0.3em] font-black text-cyan-400/70">
                    {exact ? t("sm3_02.labels.exact_value") : t("sm3_02.labels.decimal_value")}
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/5 rounded p-2 border border-white/10">
                        <div className="text-[9px] text-yellow-400/70 mb-1">SIN</div>
                        <div className="font-mono text-sm text-yellow-300 font-bold flex items-center h-6 overflow-hidden">
                            {exact ? <InlineMath math={exact.sin} /> : sinValue.toFixed(4)}
                        </div>
                    </div>
                    <div className="bg-white/5 rounded p-2 border border-white/10">
                        <div className="text-[9px] text-green-400/70 mb-1">COS</div>
                        <div className="font-mono text-sm text-green-300 font-bold flex items-center h-6 overflow-hidden">
                            {exact ? <InlineMath math={exact.cos} /> : cosValue.toFixed(4)}
                        </div>
                    </div>
                    <div className="bg-white/5 rounded p-2 border border-white/10">
                        <div className="text-[9px] text-pink-400/70 mb-1">TAN</div>
                        <div className="font-mono text-sm text-pink-300 font-bold flex items-center h-6 overflow-hidden">
                            {exact ? <InlineMath math={exact.tan} /> : Math.abs(cosValue) < 0.001 ? "∞" : tanValue.toFixed(4)}
                        </div>
                    </div>
                </div>
            </div>

            {/* DISPLAY OPTIONS */}
            <div className="space-y-2">
                <div className="text-[9px] uppercase tracking-[0.3em] font-black text-cyan-400/70">
                    {t("sm3_02.labels.display")}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center gap-2 cursor-pointer bg-white/5 p-2 rounded border border-white/10 hover:bg-white/10 transition-colors">
                        <input type="checkbox" checked={showSin} onChange={(e) => setShowSin(e.target.checked)} className="accent-yellow-400" />
                        <span className="text-xs text-yellow-400 font-mono">sin(θ)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer bg-white/5 p-2 rounded border border-white/10 hover:bg-white/10 transition-colors">
                        <input type="checkbox" checked={showCos} onChange={(e) => setShowCos(e.target.checked)} className="accent-green-400" />
                        <span className="text-xs text-green-400 font-mono">cos(θ)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer bg-white/5 p-2 rounded border border-white/10 hover:bg-white/10 transition-colors">
                        <input type="checkbox" checked={showTan} onChange={(e) => setShowTan(e.target.checked)} className="accent-pink-400" />
                        <span className="text-xs text-pink-400 font-mono">tan(θ)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer bg-white/5 p-2 rounded border border-white/10 hover:bg-white/10 transition-colors">
                        <input type="checkbox" checked={showWaves} onChange={(e) => setShowWaves(e.target.checked)} className="accent-purple-400" />
                        <span className="text-xs text-purple-400 font-mono">Waves</span>
                    </label>
                </div>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ----------------------------------------------------------------------------
export default function S302Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    // Canvas State
    const [angle, setAngle] = useState(45);
    const [showSin, setShowSin] = useState(true);
    const [showCos, setShowCos] = useState(true);
    const [showTan, setShowTan] = useState(false);
    const [showWaves, setShowWaves] = useState(false);

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(t, d, s), [t]);

    const {
        difficulty,
        stage,
        inputs,
        lastCheck,
        currentQuest,
        successRate,
        setInputs,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
        parseNumberLike,
      adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<S302Quest, Stage>({
    moduleCode: "sm3-02",
        buildPool,
        initialStage: "UNIT_CIRCLE",
    });

    // Sync angle from quest - using the "adjust state during render" pattern to satisfy React Compiler
    const [prevQuestId, setPrevQuestId] = useState<string | undefined>();
    if (currentQuest?.id !== prevQuestId) {
        setPrevQuestId(currentQuest?.id);
        if (currentQuest?.angle != null) {
            setAngle(currentQuest?.angle);
            // Auto toggle relevant visuals based on quest type
            if (currentQuest?.trigFunc === "sin") { setShowSin(true); setShowCos(false); setShowTan(false); }
            if (currentQuest?.trigFunc === "cos") { setShowSin(false); setShowCos(true); setShowTan(false); }
            if (currentQuest?.trigFunc === "tan") { setShowSin(false); setShowCos(false); setShowTan(true); }
        }
    }

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sm3-02", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stages = [
        { id: "UNIT_CIRCLE", label: t("sm3_02.stages.unit_circle") },
        { id: "PROJECTIONS", label: t("sm3_02.stages.projections") },
        { id: "WAVES", label: t("sm3_02.stages.waves") },
    ];

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("sm3_02.title")}
            moduleCode="SM3.02"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stages}
            currentStage={stage}
            onStageChange={handleStageChange as (s: string) => void}
            successRate={successRate}
            onNext={next}
            onVerify={verify}
            checkStatus={lastCheck}
            translations={{
                back: t("sm3_02.back"),
                check: t("sm3_02.check"),
                next: t("sm3_02.next"),
                correct: t("sm3_02.correct"),
                incorrect: t("sm3_02.incorrect"),
                ready: t("sm3_02.ready"),
                monitor_title: t("sm3_02.monitor_title"),
                difficulty: {
                    basic: t("sm3_02.difficulty.basic"),
                    core: t("sm3_02.difficulty.core"),
                    advanced: t("sm3_02.difficulty.advanced"),
                    elite: t("sm3_02.difficulty.elite"),
                },
            }}
            footerLeft={t("sm3_02.footer_left")}
            monitorContent={
                <TrigMonitorPanel
                    angle={angle}
                    setAngle={setAngle}
                    showSin={showSin}
                    setShowSin={setShowSin}
                    showCos={showCos}
                    setShowCos={setShowCos}
                    showTan={showTan}
                    setShowTan={setShowTan}
                    showWaves={showWaves}
                    setShowWaves={setShowWaves}
                />
            }
        >
            <div className="w-full max-w-5xl space-y-10">
                {/* Quest Section */}
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="text-xs font-mono text-cyan-400 mb-2 uppercase tracking-widest opacity-60">
                            {t("sm3_02.objective_title")}
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">
                            <InlineMath math={currentQuest?.promptLatex || ""} />
                        </h2>
                        {currentQuest?.expressionLatex && (
                            <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 inline-block min-w-[300px]">
                                <span className="text-4xl text-cyan-300 font-serif">
                                    <InlineMath math={currentQuest?.expressionLatex || ""} />
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Input Slots */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        {currentQuest?.slots.map((slot) => {
                            const isCorrect = lastCheck?.ok;
                            const value = inputs[slot.id] || "";
                            return (
                                <div key={slot.id} className="relative group">
                                    <div className="absolute -top-3 left-3 px-1 bg-[#0a0a0a] text-[9px] text-gray-500 uppercase tracking-widest font-bold z-10 group-focus-within:text-cyan-400 transition-colors">
                                        <InlineMath math={slot.labelLatex} />
                                    </div>
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                        placeholder={slot.placeholder}
                                        disabled={isCorrect}
                                        className={clsx(
                                            "w-32 h-14 bg-white/5 border-2 rounded-xl text-center text-xl font-bold font-mono transition-all outline-none",
                                            isCorrect
                                                ? "border-green-500/50 text-green-400 bg-green-500/10"
                                                : lastCheck && !lastCheck.ok
                                                    ? "border-red-500/50 text-white focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                                                    : "border-white/10 text-white focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:border-white/20"
                                        )}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Feedback Message */}
                    {lastCheck && (
                        <div className={clsx(
                            "text-center font-mono text-sm tracking-widest uppercase transition-all duration-500",
                            lastCheck.ok ? "text-green-400 opacity-100 scale-100" : "text-red-400 opacity-100"
                        )}>
                            {lastCheck.ok ? t("sm3_02.correct") : `${t("sm3_02.incorrect")}: ${lastCheck.correct}`}
                        </div>
                    )}
                </div>
            </div>
        </ChamberLayout>
    );
}
