"use client";

import type { ReactNode } from "react";
import { BlockMath, InlineMath } from "react-katex";
import type { Difficulty, Quest } from "@/hooks/useQuestManager";
import { renderMixedText } from "@/lib/latex-utils";

export const DEFAULT_PRINT_DIFFICULTIES: Difficulty[] = ["BASIC", "CORE", "ADVANCED", "ELITE"];

export type PrintSection = {
    id: string;
    label: string;
    content: ReactNode;
};

export type PrintStage<S extends string> = {
    id: S;
    label: string;
};

type PrintGroup<T extends Quest> = {
    difficultyLabel: string;
    quests: T[];
};

type QuestPrintSectionProps<T extends Quest> = {
    moduleTitle: string;
    stageLabel: string;
    groups: PrintGroup<T>[];
    showHints?: boolean;
    maxHints?: number;
};

type BuildQuestPrintSectionsOptions<T extends Quest, S extends string> = {
    moduleTitle: string;
    stages: PrintStage<S>[];
    difficultyOrder: Difficulty[];
    difficultyLabels: Record<Difficulty, string>;
    buildPool: (difficulty: Difficulty, stage: S) => T[];
    showHints?: boolean;
    maxHints?: number;
};

function QuestPrintSection<T extends Quest>({
    moduleTitle,
    stageLabel,
    groups,
    showHints = false,
    maxHints = 1,
}: QuestPrintSectionProps<T>) {
    return (
        <article className="text-black bg-white px-8 py-6 space-y-6">
            <header className="border-b-2 border-black pb-3">
                <h2 className="text-2xl font-black tracking-wide">{moduleTitle}</h2>
                <p className="text-sm font-semibold mt-1">{stageLabel}</p>
            </header>

            {groups.map((group) => (
                <section key={group.difficultyLabel} className="space-y-4">
                    <h3 className="text-lg font-black border-l-4 border-black pl-3">{group.difficultyLabel}</h3>
                    <div className="space-y-5">
                        {group.quests.map((quest, index) => (
                            <div key={quest.id} className="border border-black/30 p-4 space-y-3 break-inside-avoid">
                                <div className="text-sm font-bold">
                                    {index + 1}. {renderMixedText(quest.promptLatex || "", "whitespace-pre-wrap")}
                                </div>

                                {quest.expressionLatex ? (
                                    <div className="text-black">
                                        <BlockMath math={quest.expressionLatex} />
                                    </div>
                                ) : null}

                                {showHints && quest.hintLatex?.length ? (
                                    <div className="space-y-2 pt-1">
                                        {quest.hintLatex.slice(0, maxHints).map((hint, hintIndex) => (
                                            <div key={`${quest.id}-hint-${hintIndex}`} className="text-sm">
                                                <InlineMath math={hint} />
                                            </div>
                                        ))}
                                    </div>
                                ) : null}

                                <div className="space-y-2 pt-1">
                                    {quest.slots.map((slot) => (
                                        <div key={slot.id} className="space-y-1">
                                            <div className="text-sm flex items-center gap-2">
                                                <InlineMath math={slot.labelLatex} />
                                                {slot.unit ? <span className="text-xs opacity-70">({slot.unit})</span> : null}
                                            </div>
                                            <div className="h-7 border-b border-black" />
                                        </div>
                                    ))}
                                </div>

                                <div className="text-xs opacity-60">Q{index + 1}.{quest.id}</div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </article>
    );
}

export function buildQuestPrintSections<T extends Quest, S extends string>({
    moduleTitle,
    stages,
    difficultyOrder,
    difficultyLabels,
    buildPool,
    showHints = false,
    maxHints = 1,
}: BuildQuestPrintSectionsOptions<T, S>): PrintSection[] {
    return stages.flatMap((stage) => {
        const groups = difficultyOrder
            .map((difficulty) => ({
                difficultyLabel: difficultyLabels[difficulty],
                quests: buildPool(difficulty, stage.id),
            }))
            .filter((group) => group.quests.length > 0);

        if (!groups.length) {
            return [];
        }

        return [{
            id: stage.id,
            label: stage.label,
            content: (
                <QuestPrintSection
                    moduleTitle={moduleTitle}
                    stageLabel={stage.label}
                    groups={groups}
                    showHints={showHints}
                    maxHints={maxHints}
                />
            ),
        }];
    });
}
