"use client";

import React from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import type { FeedbackLevel, Quest, SolutionStep } from "@/hooks/useQuestManager";

interface LayeredFeedbackPanelProps {
    quest: Quest;
    feedbackLevel: FeedbackLevel;
    feedbackAvailability: {
        canShowHint: boolean;
        canShowSteps: boolean;
        canShowFull: boolean;
    };
    currentHint: string | null;
    onShowHint: () => void;
    onShowSteps: () => void;
    onShowFull: () => void;
    translations: {
        view_hint: string;
        view_steps: string;
        view_full_solution: string;
        hint_title: string;
        steps_title: string;
        full_solution_title: string;
        step_label: string;
    };
}

export default function LayeredFeedbackPanel({
    quest,
    feedbackLevel,
    feedbackAvailability,
    currentHint,
    onShowHint,
    onShowSteps,
    onShowFull,
    translations,
}: LayeredFeedbackPanelProps) {
    const { canShowHint, canShowSteps, canShowFull } = feedbackAvailability;
    const anyAvailable = canShowHint || canShowSteps || canShowFull;

    if (!anyAvailable) return null;

    return (
        <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-bottom-2">
            {/* Feedback action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
                {canShowHint && (
                    <button
                        onClick={onShowHint}
                        disabled={feedbackLevel === "HINT" || feedbackLevel === "STEPS" || feedbackLevel === "FULL"}
                        className={`min-h-[36px] px-4 py-2 text-[9px] font-black tracking-[0.3em] uppercase transition-all border rounded ${
                            feedbackLevel === "HINT" || feedbackLevel === "STEPS" || feedbackLevel === "FULL"
                                ? "border-amber-500/50 bg-amber-500/20 text-amber-300"
                                : "border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/50"
                        }`}
                    >
                        💡 {translations.view_hint}
                    </button>
                )}
                {canShowSteps && (
                    <button
                        onClick={onShowSteps}
                        disabled={feedbackLevel === "STEPS" || feedbackLevel === "FULL"}
                        className={`min-h-[36px] px-4 py-2 text-[9px] font-black tracking-[0.3em] uppercase transition-all border rounded ${
                            feedbackLevel === "STEPS" || feedbackLevel === "FULL"
                                ? "border-cyan-500/50 bg-cyan-500/20 text-cyan-300"
                                : "border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50"
                        }`}
                    >
                        📝 {translations.view_steps}
                    </button>
                )}
                {canShowFull && (
                    <button
                        onClick={onShowFull}
                        disabled={feedbackLevel === "FULL"}
                        className={`min-h-[36px] px-4 py-2 text-[9px] font-black tracking-[0.3em] uppercase transition-all border rounded ${
                            feedbackLevel === "FULL"
                                ? "border-rose-500/50 bg-rose-500/20 text-rose-300"
                                : "border-rose-500/30 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/50"
                        }`}
                    >
                        📖 {translations.view_full_solution}
                    </button>
                )}
            </div>

            {/* Expanded feedback content */}
            {feedbackLevel !== "NONE" && (
                <div className="rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden">
                    {/* Hint layer */}
                    {(feedbackLevel === "HINT" || feedbackLevel === "STEPS" || feedbackLevel === "FULL") && currentHint && (
                        <div className="p-4 border-b border-white/5">
                            <div className="text-[9px] uppercase tracking-[0.3em] text-amber-400 font-black mb-2 flex items-center gap-2">
                                💡 {translations.hint_title}
                            </div>
                            <div className="text-sm text-white/80 font-mono">
                                <InlineMath math={currentHint} />
                            </div>
                        </div>
                    )}

                    {/* Steps layer */}
                    {(feedbackLevel === "STEPS" || feedbackLevel === "FULL") && quest.steps && quest.steps.length > 0 && (
                        <div className="p-4 border-b border-white/5">
                            <div className="text-[9px] uppercase tracking-[0.3em] text-cyan-400 font-black mb-3 flex items-center gap-2">
                                📝 {translations.steps_title}
                            </div>
                            <div className="space-y-3">
                                {quest.steps.map((step: SolutionStep, index: number) => (
                                    <div
                                        key={index}
                                        className={`p-3 rounded ${
                                            step.reversesInequality
                                                ? "bg-red-500/10 border border-red-500/30"
                                                : "bg-white/[0.02]"
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 text-[10px] font-black text-white/50 uppercase tracking-widest">
                                                {translations.step_label} {step.stepNumber}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="mb-1 overflow-x-auto">
                                                    <BlockMath math={step.expressionLatex} />
                                                </div>
                                                <div className={`text-[10px] ${
                                                    step.reversesInequality
                                                        ? "text-red-400 font-black"
                                                        : "text-white/50"
                                                }`}>
                                                    {step.justification}
                                                    {step.reversesInequality && (
                                                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[8px] bg-red-500/20 border border-red-500/30">
                                                            ⚠️ Inequality reversed
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Full solution layer */}
                    {feedbackLevel === "FULL" && (
                        <div className="p-4">
                            <div className="text-[9px] uppercase tracking-[0.3em] text-rose-400 font-black mb-2 flex items-center gap-2">
                                📖 {translations.full_solution_title}
                            </div>
                            <div className="p-3 rounded bg-white/[0.03] border border-white/10">
                                <BlockMath math={quest.fullSolutionLatex || quest.correctLatex} />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
