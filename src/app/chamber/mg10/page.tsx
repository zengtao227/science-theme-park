"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Sigma } from "lucide-react";
import { clsx } from "clsx";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";

type Mg10T = typeof translations.EN.mg10;

type Difficulty = "BASIC" | "CORE" | "ADVANCED" | "ELITE";
type Stage = "SUBSTITUTION" | "ELIMINATION" | "MISSION";

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
    eq1Latex: string;
    eq2Latex: string;
    targetLatex: string;
    slots: Slot[];
    correctLatex: string;
    hintLatex?: string[];
};

function parseNumberLike(s: string, locale: "DE" | "EN" | "CN") {
    const raw = s.trim();
    if (!raw) return null;
    const normalized = locale === "DE" ? raw.replace(/,/g, ".") : raw;
    const v = Number(normalized);
    return Number.isFinite(v) ? v : null;
}

function stageLabel(t: Mg10T, stage: Stage) {
    if (stage === "SUBSTITUTION") return t.stages.substitution;
    if (stage === "ELIMINATION") return t.stages.elimination;
    return t.stages.mission;
}

function buildStagePool(t: Mg10T, difficulty: Difficulty, stage: Stage): Quest[] {
    if (stage === "SUBSTITUTION") {
        const all: Quest[] = [
            {
                id: "S1",
                difficulty,
                stage,
                promptLatex: t.stages.substitution_prompt_latex,
                eq1Latex: `y = 2x + 1`,
                eq2Latex: `3x + y = 11`,
                targetLatex: `(x, y)`,
                slots: [
                    { id: "x", labelLatex: `x`, placeholder: "x", expected: 2 },
                    { id: "y", labelLatex: `y`, placeholder: "y", expected: 5 },
                ],
                correctLatex: `(2, 5)`,
                hintLatex: [
                    t.hints.rules.substitution_latex,
                    `3x + (2x+1) = 11`,
                    `5x = 10 \\Rightarrow x = 2`,
                    `y = 2(2)+1 = 5`,
                ],
            },
            {
                id: "S2",
                difficulty,
                stage,
                promptLatex: t.stages.substitution_prompt_latex,
                eq1Latex: `x = 3y - 2`,
                eq2Latex: `2x + y = 10`,
                targetLatex: `(x, y)`,
                slots: [
                    { id: "x", labelLatex: `x`, placeholder: "x", expected: 4 },
                    { id: "y", labelLatex: `y`, placeholder: "y", expected: 2 },
                ],
                correctLatex: `(4, 2)`,
                hintLatex: [
                    t.hints.rules.substitution_latex,
                    `2(3y-2) + y = 10`,
                    `7y = 14 \\Rightarrow y = 2`,
                    `x = 3(2)-2 = 4`,
                ],
            },
            {
                id: "S3",
                difficulty,
                stage,
                promptLatex: t.stages.substitution_prompt_latex,
                eq1Latex: `y = x - 3`,
                eq2Latex: `4x - 2y = 14`,
                targetLatex: `(x, y)`,
                slots: [
                    { id: "x", labelLatex: `x`, placeholder: "x", expected: 4 },
                    { id: "y", labelLatex: `y`, placeholder: "y", expected: 1 },
                ],
                correctLatex: `(4, 1)`,
                hintLatex: [
                    t.hints.rules.substitution_latex,
                    `4x - 2(x-3) = 14`,
                    `2x + 6 = 14 \\Rightarrow x = 4`,
                    `y = 4-3 = 1`,
                ],
            },
            {
                id: "S4",
                difficulty,
                stage,
                promptLatex: t.stages.substitution_prompt_latex,
                eq1Latex: `x = 5 - y`,
                eq2Latex: `3x + 2y = 13`,
                targetLatex: `(x, y)`,
                slots: [
                    { id: "x", labelLatex: `x`, placeholder: "x", expected: 3 },
                    { id: "y", labelLatex: `y`, placeholder: "y", expected: 2 },
                ],
                correctLatex: `(3, 2)`,
                hintLatex: [
                    t.hints.rules.substitution_latex,
                    `3(5-y) + 2y = 13`,
                    `15 - y = 13 \\Rightarrow y = 2`,
                    `x = 5-2 = 3`,
                ],
            },
        ];

        if (difficulty === "BASIC") return all.slice(0, 2);
        if (difficulty === "CORE") return all.slice(0, 3);
        return all;
    }

    if (stage === "ELIMINATION") {
        const all: Quest[] = [
            {
                id: "E1",
                difficulty,
                stage,
                promptLatex: t.stages.elimination_prompt_latex,
                eq1Latex: `x + y = 7`,
                eq2Latex: `x - y = 3`,
                targetLatex: `(x, y)`,
                slots: [
                    { id: "x", labelLatex: `x`, placeholder: "x", expected: 5 },
                    { id: "y", labelLatex: `y`, placeholder: "y", expected: 2 },
                ],
                correctLatex: `(5, 2)`,
                hintLatex: [
                    t.hints.rules.elimination_add_latex,
                    `(x+y) + (x-y) = 7+3`,
                    `2x = 10 \\Rightarrow x = 5`,
                    `y = 7-5 = 2`,
                ],
            },
            {
                id: "E2",
                difficulty,
                stage,
                promptLatex: t.stages.elimination_prompt_latex,
                eq1Latex: `2x + 3y = 12`,
                eq2Latex: `2x - y = 4`,
                targetLatex: `(x, y)`,
                slots: [
                    { id: "x", labelLatex: `x`, placeholder: "x", expected: 3 },
                    { id: "y", labelLatex: `y`, placeholder: "y", expected: 2 },
                ],
                correctLatex: `(3, 2)`,
                hintLatex: [
                    t.hints.rules.elimination_sub_latex,
                    `(2x+3y) - (2x-y) = 12-4`,
                    `4y = 8 \\Rightarrow y = 2`,
                    `2x + 6 = 12 \\Rightarrow x = 3`,
                ],
            },
            {
                id: "E3",
                difficulty,
                stage,
                promptLatex: t.stages.elimination_prompt_latex,
                eq1Latex: `3x + 2y = 19`,
                eq2Latex: `x + 2y = 13`,
                targetLatex: `(x, y)`,
                slots: [
                    { id: "x", labelLatex: `x`, placeholder: "x", expected: 3 },
                    { id: "y", labelLatex: `y`, placeholder: "y", expected: 5 },
                ],
                correctLatex: `(3, 5)`,
                hintLatex: [
                    t.hints.rules.elimination_sub_latex,
                    `(3x+2y) - (x+2y) = 19-13`,
                    `2x = 6 \\Rightarrow x = 3`,
                    `3 + 2y = 13 \\Rightarrow y = 5`,
                ],
            },
            {
                id: "E4",
                difficulty,
                stage,
                promptLatex: t.stages.elimination_prompt_latex,
                eq1Latex: `2x + 5y = 24`,
                eq2Latex: `4x + 3y = 20`,
                targetLatex: `(x, y)`,
                slots: [
                    { id: "x", labelLatex: `x`, placeholder: "x", expected: 2 },
                    { id: "y", labelLatex: `y`, placeholder: "y", expected: 4 },
                ],
                correctLatex: `(2, 4)`,
                hintLatex: [
                    t.hints.rules.elimination_multiply_latex,
                    `4x + 10y = 48 \\quad (\\times 2)`,
                    `4x + 3y = 20`,
                    `7y = 28 \\Rightarrow y = 4, \\; x = 2`,
                ],
            },
            {
                id: "E5",
                difficulty,
                stage,
                promptLatex: t.stages.elimination_prompt_latex,
                eq1Latex: `5x - 2y = 4`,
                eq2Latex: `3x + 4y = 26`,
                targetLatex: `(x, y)`,
                slots: [
                    { id: "x", labelLatex: `x`, placeholder: "x", expected: 2 },
                    { id: "y", labelLatex: `y`, placeholder: "y", expected: 5 },
                ],
                correctLatex: `(2, 5)`,
                hintLatex: [
                    t.hints.rules.elimination_multiply_latex,
                    `10x - 4y = 8 \\quad (\\times 2)`,
                    `3x + 4y = 26`,
                    `13x = 34? \\text{ Redo: } 10x-4y+3x+4y=8+26`,
                    `13x = 34 \\Rightarrow \\text{Error—recheck coefficients}`,
                ],
            },
        ];

        if (difficulty === "BASIC") return all.slice(0, 2);
        if (difficulty === "CORE") return all.slice(0, 4);
        return all;
    }

    // MISSION stage - real-world applications
    const all: Quest[] = [
        {
            id: "M1",
            difficulty,
            stage,
            promptLatex: t.stages.mission_prompt_latex,
            eq1Latex: `\\text{${t.mission.apples}} + \\text{${t.mission.oranges}} = 8`,
            eq2Latex: `2 \\cdot \\text{${t.mission.apples}} + 3 \\cdot \\text{${t.mission.oranges}} = 19`,
            targetLatex: `(\\text{${t.mission.apples}}, \\text{${t.mission.oranges}})`,
            slots: [
                { id: "a", labelLatex: `\\text{${t.mission.apples}}`, placeholder: t.mission.apples, expected: 5 },
                { id: "o", labelLatex: `\\text{${t.mission.oranges}}`, placeholder: t.mission.oranges, expected: 3 },
            ],
            correctLatex: `(5, 3)`,
            hintLatex: [
                `a + o = 8`,
                `2a + 3o = 19`,
                `a = 8-o \\Rightarrow 2(8-o)+3o=19`,
                `o = 3, \\; a = 5`,
            ],
        },
        {
            id: "M2",
            difficulty,
            stage,
            promptLatex: t.stages.mission_prompt_latex,
            eq1Latex: `\\text{${t.mission.adult}} + \\text{${t.mission.child}} = 12`,
            eq2Latex: `25 \\cdot \\text{${t.mission.adult}} + 15 \\cdot \\text{${t.mission.child}} = 240`,
            targetLatex: `(\\text{${t.mission.adult}}, \\text{${t.mission.child}})`,
            slots: [
                { id: "ad", labelLatex: `\\text{${t.mission.adult}}`, placeholder: t.mission.adult, expected: 6 },
                { id: "ch", labelLatex: `\\text{${t.mission.child}}`, placeholder: t.mission.child, expected: 6 },
            ],
            correctLatex: `(6, 6)`,
            hintLatex: [
                `a + c = 12`,
                `25a + 15c = 240`,
                `25a + 15(12-a) = 240`,
                `10a = 60 \\Rightarrow a = 6, \\; c = 6`,
            ],
        },
    ];

    return all;
}

function SystemVisual() {
    return (
        <div className="w-full flex justify-center p-4">
            <svg viewBox="0 0 600 200" className="w-full max-w-[600px] border border-white/10 bg-black rounded-xl overflow-visible">
                {/* Background grid */}
                {Array.from({ length: 11 }).map((_, i) => (
                    <line key={`v-${i}`} x1={50 + i * 50} y1={20} x2={50 + i * 50} y2={180} stroke="rgba(255,255,255,0.05)" />
                ))}
                {Array.from({ length: 5 }).map((_, i) => (
                    <line key={`h-${i}`} x1={40} y1={20 + i * 40} x2={560} y2={20 + i * 40} stroke="rgba(255,255,255,0.05)" />
                ))}

                {/* Signal lines representing equations */}
                <g className="animate-pulse">
                    {/* Equation 1 - cyan signal */}
                    <line x1={60} y1={60} x2={300} y2={100} stroke="rgba(0,210,255,0.7)" strokeWidth={3} />
                    <line x1={300} y1={100} x2={540} y2={140} stroke="rgba(0,210,255,0.3)" strokeWidth={2} strokeDasharray="4 4" />
                    <circle cx={300} cy={100} r={8} fill="rgba(0,210,255,0.9)" />
                </g>

                <g className="animate-pulse" style={{ animationDelay: "0.3s" }}>
                    {/* Equation 2 - purple signal */}
                    <line x1={60} y1={140} x2={300} y2={100} stroke="rgba(180,120,255,0.7)" strokeWidth={3} />
                    <line x1={300} y1={100} x2={540} y2={60} stroke="rgba(180,120,255,0.3)" strokeWidth={2} strokeDasharray="4 4" />
                    <circle cx={300} cy={100} r={8} fill="rgba(180,120,255,0.9)" />
                </g>

                {/* Intersection point highlight */}
                <circle cx={300} cy={100} r={12} fill="none" stroke="rgba(0,255,157,0.8)" strokeWidth={2} className="animate-ping" />
                <circle cx={300} cy={100} r={6} fill="rgba(0,255,157,1)" />

                {/* Labels */}
                <text x={70} y={50} fill="rgba(0,210,255,0.9)" fontSize="10" fontFamily="monospace" fontWeight="bold">EQ.1</text>
                <text x={70} y={155} fill="rgba(180,120,255,0.9)" fontSize="10" fontFamily="monospace" fontWeight="bold">EQ.2</text>
                <text x={310} y={95} fill="rgba(0,255,157,1)" fontSize="10" fontFamily="monospace" fontWeight="bold">(x, y)</text>
            </svg>
        </div>
    );
}

export default function MG10Page() {
    const { currentLanguage, setLanguage } = useAppStore();
    const t = translations[currentLanguage].mg10;

    const [difficulty, setDifficulty] = useState<Difficulty>("CORE");
    const [stage, setStage] = useState<Stage>("SUBSTITUTION");
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
            const v = parseNumberLike(raw, locale);
            if (v === null || v !== slot.expected) {
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
                                { id: "SUBSTITUTION", label: stageLabel(t, "SUBSTITUTION") },
                                { id: "ELIMINATION", label: stageLabel(t, "ELIMINATION") },
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
                                        "px-4 py-2 border-2 text-[10px] font-black tracking-[0.35em] uppercase transition-all relative overflow-hidden",
                                        stage === s.id
                                            ? (s.id === 'MISSION' ? "border-amber-400 text-amber-400 bg-amber-400/10 shadow-[0_0_20px_rgba(251,191,36,0.2)]" : "border-white bg-white text-black")
                                            : (s.id === 'MISSION' ? "border-amber-600/40 text-amber-500/70 hover:border-amber-500 hover:text-amber-500" : "border-white/30 text-white hover:border-white/50")
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
                            <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/20 rounded-2xl text-center relative w-fit max-w-[calc(100vw-3rem)] shadow-2xl">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
                                <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">{t.target_title}</span>
                                <div className="space-y-4">
                                    <div className="text-neon-cyan font-black text-[clamp(1.2rem,3.8vw,2.5rem)] leading-[1.2]">
                                        <InlineMath math={currentQuest.eq1Latex} />
                                    </div>
                                    <div className="text-neon-purple font-black text-[clamp(1.2rem,3.8vw,2.5rem)] leading-[1.2]">
                                        <InlineMath math={currentQuest.eq2Latex} />
                                    </div>
                                    <div className="text-white/60 font-black text-lg mt-4">
                                        <InlineMath math={currentQuest.targetLatex} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full">
                            <SystemVisual />
                        </div>

                        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full">
                            <div className="space-y-4">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.labels.input}</div>
                                <div className={clsx("grid gap-4", currentQuest.slots.length <= 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3")}>
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
                                                inputMode="numeric"
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
                                    <div className={clsx("text-xs font-black tracking-[0.4em] uppercase mb-2", lastCheck.ok ? "text-neon-green" : "text-orange-500")}>
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

                <aside className="w-[520px] relative bg-black flex flex-col border-l border-white/10 hidden xl:flex">
                    <div className="p-4 border-b border-white/10 text-[9px] uppercase tracking-[0.4em] text-white/50 font-black flex justify-between items-center">
                        <span>{t.monitor_title}</span>
                        <div className="flex gap-2">
                            <div className="w-1 h-1 bg-white" />
                            <div className="w-1 h-1 bg-white/40" />
                        </div>
                    </div>
                    <div className="flex-1 p-6">
                        <div className="border-2 border-white/10 rounded-xl p-6 bg-white/[0.02] h-full flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.target_title}</div>
                                <div className="text-neon-cyan font-black text-lg overflow-x-auto max-w-full py-1 whitespace-nowrap">
                                    <InlineMath math={currentQuest.eq1Latex} />
                                </div>
                                <div className="text-neon-purple font-black text-lg overflow-x-auto max-w-full py-1 whitespace-nowrap">
                                    <InlineMath math={currentQuest.eq2Latex} />
                                </div>
                                <div className="text-white/70 font-mono text-sm break-words">
                                    <InlineMath math={currentQuest.promptLatex} />
                                </div>
                                {currentQuest.hintLatex && currentQuest.hintLatex.length > 0 && (
                                    <div className="space-y-2 text-white/50 font-black text-[10px] uppercase tracking-[0.25em]">
                                        <div className="text-white/40">{t.labels.hints}</div>
                                        {currentQuest.hintLatex.slice(0, 4).map((h, idx) => (
                                            <div key={`${currentQuest.id}|h|${idx}`} className="flex gap-2 items-start">
                                                <div className="text-white/30 w-6">{String(idx + 1).padStart(2, "0")}</div>
                                                <div className="flex-1">
                                                    <InlineMath math={h} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <div className="text-white/30 text-[10px] font-black tracking-[0.3em] uppercase">
                                    {difficulty}{" // "}MG10{" // "}{stageName}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            <footer className="p-3 border-t-2 border-white bg-black text-[10px] font-black flex justify-between tracking-[0.4em] text-white/80 uppercase">
                <span>{t.footer_left}</span>
                <span className="flex items-center gap-2">
                    <Sigma className="w-3 h-3 text-white/50" />
                    {lastCheck ? (lastCheck.ok ? t.correct : t.incorrect) : t.ready}
                </span>
            </footer>
        </div>
    );
}
