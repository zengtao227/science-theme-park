"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Zap } from "lucide-react";
import { clsx } from "clsx";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";

type Mg11T = typeof translations.EN.mg11;

type Difficulty = "BASIC" | "CORE" | "ADVANCED" | "ELITE";
type Stage = "RULES" | "NEGATIVE" | "SCIENTIFIC";

type Slot = {
    id: string;
    labelLatex: string;
    placeholder: string;
    expected: string | number; // Allow string for scientific notation or large numbers
};

type Quest = {
    id: string;
    difficulty: Difficulty;
    stage: Stage;
    promptLatex: string;
    expressionLatex: string;
    targetLatex: string;
    slots: Slot[];
    correctLatex: string;
    hintLatex?: string[];
};

function parseValue(s: string, locale: "DE" | "EN" | "CN") {
    const raw = s.trim();
    if (!raw) return null;
    const normalized = locale === "DE" ? raw.replace(/,/g, ".") : raw;
    return normalized;
}

function stageLabel(t: Mg11T, stage: Stage) {
    if (stage === "RULES") return t.stages.rules;
    if (stage === "NEGATIVE") return t.stages.negative;
    return t.stages.scientific;
}

function buildStagePool(t: Mg11T, difficulty: Difficulty, stage: Stage): Quest[] {
    if (stage === "RULES") {
        const all: Quest[] = [
            {
                id: "R1",
                difficulty,
                stage,
                promptLatex: t.stages.rules_prompt_latex,
                expressionLatex: `x^3 \cdot x^4`,
                targetLatex: `x^n`,
                slots: [{ id: "n", labelLatex: `n`, placeholder: "n", expected: 7 }],
                correctLatex: `x^7`,
                hintLatex: [`a^m \cdot a^n = a^{m+n}`],
            },
            {
                id: "R2",
                difficulty,
                stage,
                promptLatex: t.stages.rules_prompt_latex,
                expressionLatex: `(y^2)^5`,
                targetLatex: `y^n`,
                slots: [{ id: "n", labelLatex: `n`, placeholder: "n", expected: 10 }],
                correctLatex: `y^{10}`,
                hintLatex: [`(a^m)^n = a^{m \cdot n}`],
            },
            {
                id: "R3",
                difficulty,
                stage,
                promptLatex: t.stages.rules_prompt_latex,
                expressionLatex: `\\frac{a^8}{a^3}`,
                targetLatex: `a^n`,
                slots: [{ id: "n", labelLatex: `n`, placeholder: "n", expected: 5 }],
                correctLatex: `a^5`,
                hintLatex: [`\\frac{a^m}{a^n} = a^{m-n}`],
            },
            {
                id: "R4",
                difficulty,
                stage,
                promptLatex: t.stages.rules_prompt_latex,
                expressionLatex: `(2x^3)^2`,
                targetLatex: `Ax^n`,
                slots: [
                    { id: "A", labelLatex: `A`, placeholder: "coeff", expected: 4 },
                    { id: "n", labelLatex: `n`, placeholder: "exp", expected: 6 }
                ],
                correctLatex: `4x^6`,
                hintLatex: [`(ab)^n = a^n b^n`],
            }
        ];
        if (difficulty === "BASIC") return all.slice(0, 2);
        return all;
    }

    if (stage === "NEGATIVE") {
        const all: Quest[] = [
            {
                id: "N1",
                difficulty,
                stage,
                promptLatex: t.stages.negative_prompt_latex,
                expressionLatex: `x^{-3}`,
                targetLatex: `\\frac{1}{x^n}`,
                slots: [{ id: "n", labelLatex: `n`, placeholder: "n", expected: 3 }],
                correctLatex: `\\frac{1}{x^3}`,
                hintLatex: [`a^{-n} = \\frac{1}{a^n}`],
            },
            {
                id: "N2",
                difficulty,
                stage,
                promptLatex: t.stages.negative_prompt_latex,
                expressionLatex: `\\frac{1}{2^{-2}}`,
                targetLatex: `A`,
                slots: [{ id: "A", labelLatex: `A`, placeholder: "Value", expected: 4 }],
                correctLatex: `4`,
                hintLatex: [`\\frac{1}{a^{-n}} = a^n`, `2^2 = 4`],
            },
            {
                id: "N3",
                difficulty,
                stage,
                promptLatex: t.stages.negative_prompt_latex,
                expressionLatex: `(x^2 \cdot x^{-5})^3`,
                targetLatex: `x^n`,
                slots: [{ id: "n", labelLatex: `n`, placeholder: "n", expected: -9 }],
                correctLatex: `x^{-9}`,
                hintLatex: [`x^2 \cdot x^{-5} = x^{-3}`, `(x^{-3})^3 = x^{-9}`],
            }
        ];
        return all;
    }

    if (stage === "SCIENTIFIC") {
        const all: Quest[] = [
            {
                id: "S1",
                difficulty,
                stage,
                promptLatex: t.stages.scientific_prompt_latex,
                expressionLatex: `350'000`,
                targetLatex: `a \cdot 10^n`,
                slots: [
                    { id: "a", labelLatex: `a`, placeholder: "1.0 - 9.9", expected: "3.5" },
                    { id: "n", labelLatex: `n`, placeholder: "n", expected: 5 }
                ],
                correctLatex: `3.5 \cdot 10^5`,
            },
            {
                id: "S2",
                difficulty,
                stage,
                promptLatex: t.stages.scientific_prompt_latex,
                expressionLatex: `0.00042`,
                targetLatex: `a \cdot 10^n`,
                slots: [
                    { id: "a", labelLatex: `a`, placeholder: "a", expected: "4.2" },
                    { id: "n", labelLatex: `n`, placeholder: "n", expected: -4 }
                ],
                correctLatex: `4.2 \cdot 10^{-4}`,
            },
            {
                id: "S3",
                difficulty,
                stage,
                promptLatex: t.stages.scientific_prompt_latex,
                expressionLatex: `(2 \cdot 10^3) \cdot (4 \cdot 10^2)`,
                targetLatex: `a \cdot 10^n`,
                slots: [
                    { id: "a", labelLatex: `a`, placeholder: "a", expected: "8" },
                    { id: "n", labelLatex: `n`, placeholder: "n", expected: 5 }
                ],
                correctLatex: `8 \cdot 10^5`,
            }
        ];
        return all;
    }

    return [];
}

export default function MG11Page() {
    const { currentLanguage, setLanguage } = useAppStore();
    const t = translations[currentLanguage].mg11;

    const [difficulty, setDifficulty] = useState<Difficulty>("CORE");
    const [stage, setStage] = useState<Stage>("RULES");
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
            if (v === null || v.toString() !== slot.expected.toString()) {
                setLastCheck({ ok: false, correct: currentQuest.correctLatex });
                return;
            }
        }
        setLastCheck({ ok: true, correct: currentQuest.correctLatex });
    };

    const stageName = stageLabel(t, stage);

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

                <div className="flex items-center gap-6 z-10">
                    <div className="hidden md:flex items-center gap-1">
                        {([
                            { id: "BASIC", label: t.difficulty.basic },
                            { id: "CORE", label: t.difficulty.core },
                            { id: "ADVANCED", label: t.difficulty.advanced },
                            { id: "ELITE", label: t.difficulty.elite },
                        ] as const).map((d) => (
                            <button
                                key={d.id}
                                onClick={() => {
                                    setDifficulty(d.id);
                                    setNonce(0);
                                    clearInputs();
                                }}
                                className={clsx(
                                    "px-2 py-1 text-[9px] font-black tracking-[0.2em] uppercase transition-all border",
                                    difficulty === d.id
                                        ? "border-white bg-white text-black"
                                        : "border-white/30 text-white hover:border-white/50"
                                )}
                            >
                                {d.label}
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-4 bg-white/20 hidden md:block" />

                    <div className="flex items-center gap-2">
                        {(['DE', 'EN', 'CN'] as const).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                className={clsx(
                                    "text-[10px] font-black w-6 h-6 flex items-center justify-center rounded transition-all border",
                                    currentLanguage === lang
                                        ? "bg-white text-black border-white"
                                        : "text-white border-white/30 hover:border-white/50"
                                )}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-6xl mx-auto space-y-6">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {([
                                { id: "RULES", label: stageLabel(t, "RULES") },
                                { id: "NEGATIVE", label: stageLabel(t, "NEGATIVE") },
                                { id: "SCIENTIFIC", label: stageLabel(t, "SCIENTIFIC") },
                            ] as const).map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => {
                                        setStage(s.id);
                                        setNonce(0);
                                        clearInputs();
                                    }}
                                    className={clsx(
                                        "px-4 py-2 border-2 text-[10px] font-black tracking-[0.35em] uppercase transition-all relative overflow-hidden",
                                        stage === s.id
                                            ? "border-white bg-white text-black"
                                            : "border-white/30 text-white hover:border-white/50"
                                    )}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>

                        <div className="text-center">
                            <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.objective_title}</h3>
                            <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic">
                                <InlineMath math={currentQuest.promptLatex} />
                            </p>
                        </div>

                        <div className="flex justify-center overflow-x-auto w-full">
                            <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/20 rounded-2xl text-center relative w-fit max-w-[calc(100vw-3rem)] shadow-2xl min-w-[300px]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
                                <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">{t.target_title}</span>
                                <div className="space-y-4">
                                    <div className="text-white font-black text-[clamp(1.5rem,5vw,4rem)] leading-[1.2]">
                                        <InlineMath math={currentQuest.expressionLatex} />
                                    </div>
                                    <div className="text-white/40 font-black text-xl">
                                        <InlineMath math={currentQuest.targetLatex} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full">
                            <div className="space-y-4">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.labels.input}</div>
                                <div className={clsx("grid gap-4", currentQuest.slots.length <= 1 ? "grid-cols-1 max-w-xs mx-auto" : "grid-cols-2")}>
                                    {currentQuest.slots.map((slot) => (
                                        <div key={slot.id} className="space-y-2">
                                            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                                                <InlineMath math={slot.labelLatex} />
                                            </div>
                                            <input
                                                value={inputs[slot.id] ?? ""}
                                                onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                                                className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-2xl text-white"
                                                placeholder={slot.placeholder}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                                <button
                                    onClick={verify}
                                    className="px-6 py-3 border-2 border-white text-[10px] font-black tracking-[0.4em] uppercase transition-all hover:bg-white hover:text-black"
                                >
                                    {t.check}
                                </button>
                                <button
                                    onClick={next}
                                    className="px-6 py-3 border-2 border-white/30 text-[10px] font-black tracking-[0.4em] uppercase transition-all hover:border-white hover:text-white"
                                >
                                    {t.next}
                                </button>
                            </div>

                            {lastCheck && (
                                <div className="mt-6 text-center">
                                    <div className={clsx("text-xs font-black tracking-[0.4em] uppercase mb-2", lastCheck.ok ? "text-neon-cyan" : "text-red-500")}>
                                        {lastCheck.ok ? t.correct : t.incorrect}
                                    </div>
                                    {!lastCheck.ok && (
                                        <div className="flex justify-center items-center gap-2 text-white/90 text-sm bg-white/5 py-3 px-4 rounded border border-white/10">
                                            <span className="text-white/50 text-[10px] uppercase tracking-widest mr-2">CORRECT:</span>
                                            <InlineMath math={lastCheck.correct} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                <aside className="w-[400px] relative bg-black flex flex-col border-l border-white/10 hidden xl:flex">
                    <div className="p-4 border-b border-white/10 text-[9px] uppercase tracking-[0.4em] text-white/50 font-black flex justify-between items-center">
                        <span>{t.monitor_title}</span>
                        <Zap className="w-3 h-3 text-white/30" />
                    </div>
                    <div className="flex-1 p-6 overflow-y-auto">
                        <div className="space-y-6">
                            <div className="p-4 border border-white/10 rounded bg-white/[0.02]">
                                <h4 className="text-[10px] text-white/40 uppercase mb-3 tracking-widest">{t.labels.hints}</h4>
                                <div className="space-y-3">
                                    {currentQuest.hintLatex?.map((h, i) => (
                                        <div key={i} className="text-sm text-white/70 italic">
                                            <InlineMath math={h} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5">
                                <p className="text-[9px] text-white/30 leading-relaxed uppercase tracking-tighter">
                                    System: Quantizing magnitude...
                                    Input recognized as valid power form.
                                    Encryption depth: {nonce + 1}
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            <footer className="p-3 border-t-2 border-white bg-black text-[10px] font-black flex justify-between tracking-[0.4em] text-white/80 uppercase">
                <span>{t.footer_left}</span>
                <span className="flex items-center gap-2">
                    {difficulty}{" // "}{stageName}
                </span>
            </footer>
        </div>
    );
}
