"use client";

import React, { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import type { FeedbackLevel, FeedbackContent, PlatformSolutionStep, FeedbackPolicy } from "@/hooks/useQuestManager";

interface LayeredFeedbackPanelProps {
    feedbackContent: FeedbackContent;
    feedbackLevel: FeedbackLevel;
    feedbackAvailability: {
        canShowHint: boolean;
        canShowSteps: boolean;
        canShowFull: boolean;
    };
    policy: FeedbackPolicy;
    isCorrect: boolean; // whether last answer was correct (for dimmed styling)
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
        correct_answer_title: string;
        step_label: string;
        confirm_full_solution: string;
        confirm_yes: string;
        confirm_cancel: string;
    };
}

export default function LayeredFeedbackPanel({
    feedbackContent,
    feedbackLevel,
    feedbackAvailability,
    policy,
    isCorrect,
    onShowHint,
    onShowSteps,
    onShowFull,
    translations,
}: LayeredFeedbackPanelProps) {
    const { canShowHint, canShowSteps, canShowFull } = feedbackAvailability;
    const anyAvailable = canShowHint || canShowSteps || canShowFull;
    const [showConfirm, setShowConfirm] = useState(false);

    if (!anyAvailable) return null;

    // Post-correct: dimmed styling
    const dimClass = isCorrect ? "opacity-60" : "";

    const handleFullClick = () => {
        if (policy.confirmFullSolution && feedbackLevel !== "FULL") {
            setShowConfirm(true);
        } else {
            onShowFull();
        }
    };

    const handleConfirmYes = () => {
        setShowConfirm(false);
        onShowFull();
    };

    // Determine full solution section title based on whether it's a real solution or fallback
    const fullSolutionTitle = feedbackContent.hasFullSolution
        ? translations.full_solution_title
        : translations.correct_answer_title;

    return (
        <div className={`mt-4 space-y-3 animate-in fade-in slide-in-from-bottom-2 ${dimClass}`}>
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
                        onClick={handleFullClick}
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

            {/* Anti-spoiler confirmation dialog */}
            {showConfirm && (
                <div className="p-4 rounded-lg border border-rose-500/30 bg-rose-500/5 text-center space-y-3">
                    <p className="text-sm text-rose-300">{translations.confirm_full_solution}</p>
                    <div className="flex justify-center gap-3">
                        <button
                            onClick={handleConfirmYes}
                            className="px-4 py-1.5 text-[9px] font-black tracking-[0.2em] uppercase border border-rose-500/50 rounded text-rose-300 hover:bg-rose-500/20 transition-all"
                        >
                            {translations.confirm_yes}
                        </button>
                        <button
                            onClick={() => setShowConfirm(false)}
                            className="px-4 py-1.5 text-[9px] font-black tracking-[0.2em] uppercase border border-white/20 rounded text-white/50 hover:bg-white/5 transition-all"
                        >
                            {translations.confirm_cancel}
                        </button>
                    </div>
                </div>
            )}

            {/* Expanded feedback content */}
            {feedbackLevel !== "NONE" && (
                <div className="rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden">
                    {/* Hint layer */}
                    {(feedbackLevel === "HINT" || feedbackLevel === "STEPS" || feedbackLevel === "FULL") && feedbackContent.hint && (
                        <div className="p-4 border-b border-white/5">
                            <div className="text-[9px] uppercase tracking-[0.3em] text-amber-400 font-black mb-2 flex items-center gap-2">
                                💡 {translations.hint_title}
                            </div>
                            <div className="text-sm text-white/80 font-mono">
                                <InlineMath math={feedbackContent.hint} />
                            </div>
                        </div>
                    )}

                    {/* Steps layer */}
                    {(feedbackLevel === "STEPS" || feedbackLevel === "FULL") && feedbackContent.steps.length > 0 && (
                        <div className="p-4 border-b border-white/5">
                            <div className="text-[9px] uppercase tracking-[0.3em] text-cyan-400 font-black mb-3 flex items-center gap-2">
                                📝 {translations.steps_title}
                            </div>
                            <div className="space-y-3">
                                {feedbackContent.steps.map((step: PlatformSolutionStep, index: number) => (
                                    <div
                                        key={index}
                                        className={`p-3 rounded ${
                                            step.emphasis === "warning"
                                                ? "bg-red-500/10 border border-red-500/30"
                                                : step.emphasis === "key"
                                                ? "bg-cyan-500/10 border border-cyan-500/30"
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
                                                    step.emphasis === "warning"
                                                        ? "text-red-400 font-black"
                                                        : "text-white/50"
                                                }`}>
                                                    {step.justification}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Full solution layer */}
                    {feedbackLevel === "FULL" && feedbackContent.fullSolutionLatex && (
                        <div className="p-4">
                            <div className="text-[9px] uppercase tracking-[0.3em] text-rose-400 font-black mb-2 flex items-center gap-2">
                                📖 {fullSolutionTitle}
                            </div>
                            <div className="p-3 rounded bg-white/[0.03] border border-white/10">
                                <BlockMath math={feedbackContent.fullSolutionLatex} />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
