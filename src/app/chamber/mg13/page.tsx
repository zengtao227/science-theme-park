"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, BarChart3, Binary } from "lucide-react";
import { clsx } from "clsx";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";

type Mg13T = typeof translations.EN.mg13;

type Difficulty = "BASIC" | "CORE" | "ADVANCED" | "ELITE";
type Stage = "STATISTICS" | "PROBABILITY" | "COMBINATORICS" | "MISSION";

type Slot = {
    id: string;
    labelLatex: string;
    placeholder: string;
    expected: number;
};

type Quest = {
    id: string;
    difficulty: Difficulty;
    stage: Stage;
    promptLatex: string;
    dataLatex: string;
    slots: Slot[];
    correctLatex: string;
    hintLatex?: string[];
};

function parseValue(s: string, locale: "DE" | "EN" | "CN") {
    const raw = s.trim();
    if (!raw) return null;
    const normalized = locale === "DE" ? raw.replace(/,/g, ".") : raw;
    const v = Number(normalized);
    return Number.isFinite(v) ? v : null;
}

function stageLabel(t: Mg13T, stage: Stage) {
    if (stage === "STATISTICS") return t.stages.statistics;
    if (stage === "PROBABILITY") return t.stages.probability;
    if (stage === "MISSION") return t.mission?.title ?? "MISSION";
    return t.stages.combinatorics;
}

function buildStagePool(t: Mg13T, difficulty: Difficulty, stage: Stage): Quest[] {
    if (stage === "STATISTICS") {
        const all: Quest[] = [
            {
                id: "S1",
                difficulty,
                stage,
                promptLatex: t.stages.statistics_prompt_latex,
                dataLatex: `3, 7, 8, 10, 12`,
                slots: [
                    { id: "mean", labelLatex: `\\bar{x}`, placeholder: "Mean", expected: 8 },
                    { id: "median", labelLatex: `\\tilde{x}`, placeholder: "Median", expected: 8 }
                ],
                correctLatex: `\\bar{x}=8, \\tilde{x}=8`,
                hintLatex: [
                    `\\bar{x} = \\frac{\\sum x_i}{n}`,
                    `\\tilde{x} \\text{ is the middle value.}`
                ],
            },
            {
                id: "S2",
                difficulty,
                stage,
                promptLatex: t.stages.statistics_prompt_latex,
                dataLatex: `5, 2, 9, 2, 7`,
                slots: [
                    { id: "mean", labelLatex: `\\bar{x}`, placeholder: "Mean", expected: 5 },
                    { id: "mode", labelLatex: `Mo`, placeholder: "Mode", expected: 2 }
                ],
                correctLatex: `\\bar{x}=5, Mo=2`,
            }
        ];
        return all;
    }

    if (stage === "PROBABILITY") {
        const all: Quest[] = [
            {
                id: "P1",
                difficulty,
                stage,
                promptLatex: t.stages.probability_prompt_latex,
                dataLatex: `\\text{Urne: 3 rote, 7 blaue Kugeln}`,
                slots: [{ id: "p", labelLatex: `P(rot)`, placeholder: "0.0 - 1.0", expected: 0.3 }],
                correctLatex: `P(rot) = \\frac{3}{10} = 0.3`,
            },
            {
                id: "P2",
                difficulty,
                stage,
                promptLatex: t.stages.probability_prompt_latex,
                dataLatex: `\\text{Zweifacher Münzwurf}`,
                slots: [{ id: "p", labelLatex: `P(HH)`, placeholder: "P", expected: 0.25 }],
                correctLatex: `P(HH) = 0.5 \\cdot 0.5 = 0.25`,
                hintLatex: [`P(A \\cap B) = P(A) \\cdot P(B)`],
            }
        ];
        return all;
    }

    if (stage === "MISSION") {
        const all: Quest[] = [
            {
                id: "M1",
                difficulty,
                stage,
                promptLatex: `\\text{${t.mission?.description}}`,
                dataLatex: `12, 15, 9, 14, 10`,
                slots: [
                    { id: "mean", labelLatex: `\\bar{x}`, placeholder: "Mean", expected: 12 },
                    { id: "median", labelLatex: `\\tilde{x}`, placeholder: "Median", expected: 12 }
                ],
                correctLatex: `\\bar{x}=12, \\tilde{x}=12`,
                hintLatex: [
                    `\\bar{x} = \\frac{\\sum x_i}{n}`,
                    `\\tilde{x} \\text{ is the middle value.}`
                ],
            }
        ];
        return all;
    }

    return [];
}

export default function MG13Page() {
    const { currentLanguage, setLanguage } = useAppStore();
    const t = translations[currentLanguage].mg13;

    const [difficulty] = useState<Difficulty>("CORE");
    const [stage, setStage] = useState<Stage>("STATISTICS");
    const [nonce, setNonce] = useState(0);

    const [inputs, setInputs] = useState<Record<string, string>>({});
    const [lastCheck, setLastCheck] = useState<null | { ok: boolean; correct: string }>(null);

    const locale = currentLanguage === "DE" ? "DE" : currentLanguage === "CN" ? "CN" : "EN";

    const pool = useMemo(() => buildStagePool(t, difficulty, stage), [difficulty, stage, t]);
    const currentQuest = useMemo(() => {
        const sorted = [...pool].sort((a, b) => a.id.localeCompare(b.id));
        return sorted[nonce % Math.max(1, sorted.length)];
    }, [nonce, pool]);

    const clearInputs = () => {
        setInputs({});
        setLastCheck(null);
    };

    const next = () => {
        clearInputs();
        setNonce((v) => v + 1);
    };

    const verify = () => {
        for (const slot of currentQuest.slots) {
            const raw = inputs[slot.id] ?? "";
            const v = parseValue(raw, locale);
            if (v === null || Math.abs(v - slot.expected) > 1e-6) {
                setLastCheck({ ok: false, correct: currentQuest.correctLatex });
                return;
            }
        }
        setLastCheck({ ok: true, correct: currentQuest.correctLatex });
    };

    return (
        <div className="w-full h-screen bg-black text-white overflow-hidden flex flex-col font-mono">
            <header className="relative p-4 border-b-2 border-white flex justify-between items-center bg-black z-30 shadow-2xl h-20">
                <Link href="/" className="flex items-center gap-2 px-3 py-1.5 hover:text-white text-white/70 transition-all group z-10">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black tracking-[0.2em] uppercase">{t.back}</span>
                </Link>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <div className="text-lg font-black tracking-[0.35em] uppercase text-white shadow-neon text-nowrap">
                        {t.title}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {(['DE', 'EN', 'CN'] as const).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={clsx(
                                "text-[10px] font-black w-6 h-6 flex items-center justify-center rounded transition-all border",
                                currentLanguage === lang
                                    ? "bg-white text-black border-white"
                                    : "text-white border-white/30"
                            )}
                        >
                            {lang}
                        </button>
                    ))}
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="flex justify-center gap-3">
                            {([
                                { id: "STATISTICS", label: stageLabel(t, "STATISTICS") },
                                { id: "PROBABILITY", label: stageLabel(t, "PROBABILITY") },
                                { id: "MISSION", label: stageLabel(t, "MISSION") },
                            ] as const).map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => {
                                        setStage(s.id);
                                        setNonce(0);
                                        clearInputs();
                                    }}
                                    className={clsx(
                                        "px-4 py-2 border-2 text-[10px] font-black tracking-[0.35em] uppercase transition-all",
                                        stage === s.id ? "border-neon-green bg-neon-green/10 text-neon-green shadow-[0_0_15px_rgba(0,255,157,0.3)]" : "border-white/20 text-white/50"
                                    )}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>

                        <div className="text-center space-y-4">
                            <h3 className="text-[10px] text-white/40 uppercase tracking-[0.5em] font-black">{t.objective_title}</h3>
                            <p className="text-2xl text-white font-black italic">
                                <InlineMath math={currentQuest.promptLatex} />
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="p-10 bg-white/[0.02] border border-white/10 rounded-3xl text-center relative w-full shadow-2xl overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.8em] font-black block mb-6">{t.target_title}</span>
                                <div className="text-white font-black text-4xl mb-8">
                                    <InlineMath math={currentQuest.dataLatex} />
                                </div>

                                <div className="flex justify-center gap-4 py-6 border-t border-white/5 opacity-40">
                                    <BarChart3 className="w-8 h-8" />
                                    <Binary className="w-8 h-8" />
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6 max-w-2xl mx-auto w-full">
                            <div className="grid gap-4 grid-cols-2">
                                {currentQuest.slots.map((slot) => (
                                    <div key={slot.id} className="space-y-2">
                                        <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                                            <InlineMath math={slot.labelLatex} />
                                        </div>
                                        <input
                                            value={inputs[slot.id] ?? ""}
                                            onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                                            className="w-full bg-black border-2 border-white/20 p-5 text-center outline-none focus:border-neon-green placeholder:text-white/20 font-black text-2xl text-white transition-all shadow-inner"
                                            placeholder={slot.placeholder}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button onClick={verify} className="flex-1 py-5 bg-white text-black text-xs font-black tracking-[0.5em] uppercase hover:bg-neon-green transition-all shadow-lg active:scale-95">
                                    {t.check}
                                </button>
                                <button onClick={next} className="flex-1 py-5 border-2 border-white/20 text-white text-xs font-black tracking-[0.5em] uppercase hover:border-white transition-all active:scale-95">
                                    {t.next}
                                </button>
                            </div>

                            {lastCheck && (
                                <div className={clsx("text-center py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all animate-in fade-in slide-in-from-bottom-2", lastCheck.ok ? "text-neon-green bg-neon-green/10 border border-neon-green/20" : "text-red-400 bg-red-400/10 border border-red-400/20")}>
                                    {lastCheck.ok ? t.correct : `${t.incorrect}: ${lastCheck.correct}`}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            <footer className="p-4 border-t border-white/10 bg-black/80 backdrop-blur-md text-[10px] font-black flex justify-between tracking-[0.4em] text-white/50 uppercase">
                <span>{t.footer_left}</span>
                <span className="text-neon-green">{difficulty}</span>
            </footer>
        </div>
    );
}
