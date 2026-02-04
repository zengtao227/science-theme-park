"use client";

import Link from "next/link";
import { ArrowLeft, Sigma } from "lucide-react";
import { clsx } from "clsx";
import ConceptIcon from "@/components/ConceptIcon";
import { useAppStore } from "@/lib/store";
import { Difficulty } from "@/hooks/useQuestManager";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface ChamberLayoutProps {
    title: string;
    moduleCode: string;
    difficulty: Difficulty;
    onDifficultyChange: (d: Difficulty) => void;
    stages: { id: string; label: string }[];
    currentStage: string;
    onStageChange: (s: string) => void;
    children: React.ReactNode;
    monitorContent?: React.ReactNode;
    footerLeft?: string;
    checkStatus?: { ok: boolean; correct: string } | null;
    translations: {
        back: string;
        check: string;
        next: string;
        correct: string;
        incorrect: string;
        ready: string;
        monitor_title: string;
        difficulty: Record<string, string>;
    };
}

export default function ChamberLayout({
    title,
    moduleCode,
    difficulty,
    onDifficultyChange,
    stages,
    currentStage,
    onStageChange,
    children,
    monitorContent,
    footerLeft,
    checkStatus,
    translations
}: ChamberLayoutProps) {
    const { currentLanguage, setLanguage } = useAppStore();

    return (
        <div className="w-full h-screen bg-black text-white overflow-hidden flex flex-col font-mono">
            {/* Header */}
            <header className="relative p-4 border-b-2 border-white flex justify-between items-center bg-black z-30 shadow-2xl h-20">
                <Link href="/" className="flex items-center gap-2 px-3 py-1.5 hover:text-white text-white/70 transition-all group z-10 text-nowrap">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black tracking-[0.2em] uppercase">{translations.back}</span>
                </Link>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none flex flex-col items-center">
                    <ConceptIcon code={moduleCode} className="w-8 h-8 text-white/50 mb-1" />
                    <div className="text-lg font-black tracking-[0.25em] uppercase text-white shadow-neon text-nowrap">
                        {title}
                    </div>
                </div>

                <div className="flex items-center gap-6 z-10">
                    <div className="hidden md:flex items-center gap-1">
                        {(["BASIC", "CORE", "ADVANCED", "ELITE"] as const).map((d) => (
                            <button
                                key={d}
                                onClick={() => onDifficultyChange(d)}
                                className={clsx(
                                    "px-2 py-1 text-[9px] font-black tracking-[0.2em] uppercase transition-all border",
                                    difficulty === d
                                        ? "border-white bg-white text-black"
                                        : "border-white/30 text-white hover:border-white/50"
                                )}
                            >
                                {translations.difficulty[d.toLowerCase()]}
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
                {/* Main Content Area */}
                <main className="flex-1 border-r-2 border-white/10 p-6 flex flex-col gap-4 bg-black z-10 overflow-y-auto items-center">
                    <div className="w-full max-w-5xl space-y-10">
                        {/* Stage Tabs */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            {stages.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => onStageChange(s.id)}
                                    className={clsx(
                                        "px-4 py-2 border text-[10px] font-black tracking-[0.25em] uppercase transition-all",
                                        currentStage === s.id ? "border-white bg-white text-black" : "border-white/30 text-white hover:border-white/50"
                                    )}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>

                        {children}
                    </div>
                </main>

                {/* Aside Monitor Panel */}
                <aside className="w-[520px] relative bg-black flex flex-col border-l border-white/10 hidden xl:flex">
                    <div className="p-4 border-b border-white/10 text-[9px] uppercase tracking-[0.4em] text-white/50 font-black flex justify-between items-center">
                        <span>{translations.monitor_title}</span>
                        <div className="flex gap-2">
                            <div className="w-1 h-1 bg-white" />
                            <div className="w-1 h-1 bg-white/40" />
                        </div>
                    </div>
                    <div className="flex-1 p-6 overflow-y-auto">
                        <div className="border-2 border-white/10 rounded-xl p-6 bg-white/[0.02] min-h-full flex flex-col gap-6">
                            {monitorContent}
                        </div>
                    </div>
                </aside>
            </div>

            {/* Footer */}
            <footer className="p-3 border-t-2 border-white bg-black text-[10px] font-black flex justify-between tracking-[0.4em] text-white/80 uppercase">
                <span>{footerLeft}</span>
                <span className="flex items-center gap-2">
                    <Sigma className="w-3 h-3 text-white/50" />
                    {checkStatus ? (checkStatus.ok ? translations.correct : translations.incorrect) : translations.ready}
                </span>
            </footer>
        </div>
    );
}
