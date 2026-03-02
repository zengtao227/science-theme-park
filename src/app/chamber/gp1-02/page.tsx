"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/lib/i18n";
import { renderMixedText } from "@/lib/latex-utils";
import Link from "next/link";
import dynamic from "next/dynamic";
import { InlineMath } from "react-katex";

const RelativityCanvas = dynamic(() => import("@/components/chamber/gp1-02/RelativityCanvas"), {
    ssr: false,
});

type QuizStage = "lorentz" | "contraction" | "dilation";

type QuizItem = {
    id: string;
    promptLatex: string;
    expressionLatex: string;
    labelLatex: string;
    expected: number;
    placeholder: string;
    correctLatex: string;
};

export default function GP1_02_RelativityLab() {
    const { t } = useLanguage();
    const [velocity, setVelocity] = useState(0.5);
    const [showDoppler, setShowDoppler] = useState(true);
    const [showContraction, setShowContraction] = useState(true);

    const [quizStage, setQuizStage] = useState<QuizStage>("lorentz");
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizInput, setQuizInput] = useState("");
    const [quizResult, setQuizResult] = useState<null | boolean>(null);

    const gamma = 1 / Math.sqrt(1 - velocity * velocity);
    const timeDilation = gamma;
    const lengthContraction = 1 / gamma;
    const velocityLabel = t("gp1_02.labels.velocity_value").replace("{value}", (velocity * 100).toFixed(0));
    const gammaValue = t("gp1_02.labels.gamma_value").replace("{value}", gamma.toFixed(3));
    const timeDilationValue = t("gp1_02.effects.time_dilation_value").replace("{value}", timeDilation.toFixed(3));
    const lengthContractionValue = t("gp1_02.effects.length_contraction_value").replace("{value}", lengthContraction.toFixed(3));
    const gp1_02_prompts = useMemo(() => ({
        lorentz_l1: t("gp1_02.prompts.lorentz_l1"),
        lorentz_l2: t("gp1_02.prompts.lorentz_l2"),
        lorentz_l3: t("gp1_02.prompts.lorentz_l3"),
        contraction_c1: t("gp1_02.prompts.contraction_c1"),
        contraction_c2: t("gp1_02.prompts.contraction_c2"),
        contraction_c3: t("gp1_02.prompts.contraction_c3"),
        dilation_d1: t("gp1_02.prompts.dilation_d1"),
        dilation_d2: t("gp1_02.prompts.dilation_d2"),
        dilation_d3: t("gp1_02.prompts.dilation_d3"),
    }), [t]);

    const quizBank = useMemo<Record<QuizStage, QuizItem[]>>(() => ({
        lorentz: [
            {
                id: "L-1",
                promptLatex: gp1_02_prompts.lorentz_l1,
                expressionLatex: "v=0.80c,\\;\\gamma=\\frac{1}{\\sqrt{1-v^2/c^2}}",
                labelLatex: "\\gamma",
                expected: 1.67,
                placeholder: "x.xx",
                correctLatex: "\\gamma\\approx 1.67",
            },
            {
                id: "L-2",
                promptLatex: gp1_02_prompts.lorentz_l2,
                expressionLatex: "v=0.60c,\\;\\gamma=\\frac{1}{\\sqrt{1-v^2/c^2}}",
                labelLatex: "\\gamma",
                expected: 1.25,
                placeholder: "x.xx",
                correctLatex: "\\gamma=1.25",
            },
            {
                id: "L-3",
                promptLatex: gp1_02_prompts.lorentz_l3,
                expressionLatex: "v=0.95c,\\;\\gamma=\\frac{1}{\\sqrt{1-v^2/c^2}}",
                labelLatex: "\\gamma",
                expected: 3.20,
                placeholder: "x.xx",
                correctLatex: "\\gamma\\approx 3.20",
            },
        ],
        contraction: [
            {
                id: "C-1",
                promptLatex: gp1_02_prompts.contraction_c1,
                expressionLatex: "L_0=12\\,m,\\;\\gamma=2,\\;L=\\frac{L_0}{\\gamma}",
                labelLatex: "L(m)",
                expected: 6,
                placeholder: "x",
                correctLatex: "L=6\\,m",
            },
            {
                id: "C-2",
                promptLatex: gp1_02_prompts.contraction_c2,
                expressionLatex: "L_0=9\\,m,\\;\\gamma=3,\\;L=\\frac{L_0}{\\gamma}",
                labelLatex: "L(m)",
                expected: 3,
                placeholder: "x",
                correctLatex: "L=3\\,m",
            },
            {
                id: "C-3",
                promptLatex: gp1_02_prompts.contraction_c3,
                expressionLatex: "L_0=10\\,m,\\;\\gamma=1.25,\\;L=\\frac{L_0}{\\gamma}",
                labelLatex: "L(m)",
                expected: 8,
                placeholder: "x",
                correctLatex: "L=8\\,m",
            },
        ],
        dilation: [
            {
                id: "D-1",
                promptLatex: gp1_02_prompts.dilation_d1,
                expressionLatex: "\\Delta t_0=2\\,\\mu s,\\;\\gamma=3,\\;\\Delta t=\\gamma\\Delta t_0",
                labelLatex: "\\Delta t(\\mu s)",
                expected: 6,
                placeholder: "x",
                correctLatex: "\\Delta t=6\\,\\mu s",
            },
            {
                id: "D-2",
                promptLatex: gp1_02_prompts.dilation_d2,
                expressionLatex: "\\Delta t_0=5\\,ms,\\;\\gamma=1.67,\\;\\Delta t=\\gamma\\Delta t_0",
                labelLatex: "\\Delta t(ms)",
                expected: 8.35,
                placeholder: "x.xx",
                correctLatex: "\\Delta t\\approx 8.35\\,ms",
            },
            {
                id: "D-3",
                promptLatex: gp1_02_prompts.dilation_d3,
                expressionLatex: "\\Delta t_0=1\\,s,\\;\\gamma=2.5,\\;\\Delta t=\\gamma\\Delta t_0",
                labelLatex: "\\Delta t(s)",
                expected: 2.5,
                placeholder: "x.x",
                correctLatex: "\\Delta t=2.5\\,s",
            },
        ],
    }), [gp1_02_prompts]);

    const currentQuest = quizBank[quizStage][quizIndex % quizBank[quizStage].length];

    const verify = () => {
        const value = Number(quizInput.trim());
        if (!Number.isFinite(value)) {
            setQuizResult(false);
            return;
        }
        setQuizResult(Math.abs(value - currentQuest.expected) <= 0.03);
    };

    const next = () => {
        setQuizIndex((v) => v + 1);
        setQuizInput("");
        setQuizResult(null);
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
                    <h1 className="text-2xl font-bold text-cyan-400">{t("gp1_02.title")}</h1>
                    <Link href="/" className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors">
                        {t("gp1_02.back")}
                    </Link>
                </div>
                <div className="text-sm text-cyan-300/70">{t("gp1_02.footer_left")}</div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[600px]">
                    <RelativityCanvas velocity={velocity} showDoppler={showDoppler} showContraction={showContraction} />
                </div>

                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[600px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">{t("gp1_02.monitor_title")}</h2>
                    </div>

                    <div className="border border-green-500 p-3 space-y-2">
                        <div className="text-sm text-green-400">{t("gp1_02.labels.lorentz_factor_title")}</div>
                        <div className="text-center text-3xl text-green-300 font-bold py-2">{gammaValue}</div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-cyan-400">{t("gp1_02.labels.velocity_label")}</label>
                        <input type="range" min="0" max="0.99" step="0.01" value={velocity}
                            onChange={(e) => setVelocity(Number(e.target.value))} aria-label={t("gp1_02.labels.velocity_label")} className="w-full" />
                        <div className="text-center text-lg text-cyan-300">{velocityLabel}</div>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" checked={showDoppler} onChange={(e) => setShowDoppler(e.target.checked)} aria-label={t("gp1_02.labels.toggle_doppler")} className="w-4 h-4" />
                            <span className="text-purple-400">{t("gp1_02.labels.toggle_doppler")}</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" checked={showContraction} onChange={(e) => setShowContraction(e.target.checked)} aria-label={t("gp1_02.labels.toggle_contraction")} className="w-4 h-4" />
                            <span className="text-pink-400">{t("gp1_02.labels.toggle_contraction")}</span>
                        </label>
                    </div>

                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400">{t("gp1_02.effects.title")}</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span className="text-cyan-300">{t("gp1_02.effects.time_dilation_label")}</span>
                                <span className="text-cyan-200 font-bold">{timeDilationValue}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-cyan-300">{t("gp1_02.effects.length_contraction_label")}</span>
                                <span className="text-cyan-200 font-bold">{lengthContractionValue}</span>
                            </div>
                        </div>
                    </div>

                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400">{t("gp1_02.formulas.title")}</div>
                        <div className="text-xs space-y-1 text-purple-300/80">
                            <div>{t("gp1_02.formulas.gamma")}</div>
                            <div>{t("gp1_02.formulas.time")}</div>
                            <div>{t("gp1_02.formulas.length")}</div>
                            <div>{t("gp1_02.formulas.energy")}</div>
                        </div>
                    </div>

                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400">{t("gp1_02.mission.title")}</div>
                        <div className="text-xs text-amber-300/80">{t("gp1_02.mission.description")}</div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 mt-6 border-2 border-white/20 bg-black/80 p-5 space-y-4 max-w-4xl mx-auto">
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/70 font-black text-center">{t("gp1_02.labels.companion_quiz")}</div>
                <div className="flex flex-wrap justify-center gap-2">
                    <button
                        onClick={() => {
                            setQuizStage("lorentz");
                            setQuizIndex(0);
                            setQuizInput("");
                            setQuizResult(null);
                        }}
                        aria-label={t("gp1_02.stages.lorentz")}
                        className={`px-3 py-2 text-xs border ${quizStage === "lorentz" ? "border-cyan-400 text-cyan-300" : "border-white/30 text-white/70"}`}
                    >
                        {t("gp1_02.stages.lorentz")}
                    </button>
                    <button
                        onClick={() => {
                            setQuizStage("contraction");
                            setQuizIndex(0);
                            setQuizInput("");
                            setQuizResult(null);
                        }}
                        aria-label={t("gp1_02.stages.contraction")}
                        className={`px-3 py-2 text-xs border ${quizStage === "contraction" ? "border-cyan-400 text-cyan-300" : "border-white/30 text-white/70"}`}
                    >
                        {t("gp1_02.stages.contraction")}
                    </button>
                    <button
                        onClick={() => {
                            setQuizStage("dilation");
                            setQuizIndex(0);
                            setQuizInput("");
                            setQuizResult(null);
                        }}
                        aria-label={t("gp1_02.stages.dilation")}
                        className={`px-3 py-2 text-xs border ${quizStage === "dilation" ? "border-cyan-400 text-cyan-300" : "border-white/30 text-white/70"}`}
                    >
                        {t("gp1_02.stages.dilation")}
                    </button>
                </div>

                <div className="text-center text-2xl text-white font-black">{renderMixedText(currentQuest.promptLatex)}</div>
                <div className="text-center p-3 bg-white/5 border border-white/10 rounded-xl">
                    <InlineMath math={currentQuest.expressionLatex} />
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-white/70 font-mono">
                        <InlineMath math={currentQuest.labelLatex} />
                    </label>
                    <input
                        value={quizInput}
                        onChange={(e) => setQuizInput(e.target.value)}
                        aria-label={t("gp1_02.labels.companion_quiz")}
                        className="w-full bg-black border-2 border-cyan-500/50 p-4 text-center outline-none focus:border-cyan-400 placeholder:text-white/40 font-black text-2xl text-white rounded-lg"
                        placeholder={currentQuest.placeholder}
                    />
                </div>

                <div className="flex justify-center gap-4">
                    <button onClick={verify} aria-label={t("gp1_02.check")} className="px-4 py-2 border border-cyan-500 text-cyan-300 hover:bg-cyan-500/20">
                        {t("gp1_02.check")}
                    </button>
                    <button onClick={next} aria-label={t("gp1_02.next")} className="px-4 py-2 border border-white/40 text-white/80 hover:bg-white/10">
                        {t("gp1_02.next")}
                    </button>
                </div>

                {quizResult !== null && (
                    <div className="text-center p-3 rounded border border-white/20 bg-white/5">
                        <div className={`font-black ${quizResult ? "text-green-300" : "text-orange-300"}`}>
                            {quizResult ? t("gp1_02.correct") : t("gp1_02.incorrect")}
                        </div>
                        {!quizResult && (
                            <div className="mt-2 text-white/80">
                                <InlineMath math={currentQuest.correctLatex} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
