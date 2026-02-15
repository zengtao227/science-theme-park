"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import DataVisualization from "@/components/chamber/sm2-10/DataVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "BOX_PLOTS" | "SCATTER_PLOTS" | "CORRELATION";

interface SM210Quest extends Quest {
    stage: Stage;
    dataType?: string;
}

type SM210T = typeof translations.EN.sm2_10;

export default function SM210Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sm2_10 || translations.EN.sm2_10) as SM210T;

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SM210Quest[] => {
        const quests: SM210Quest[] = [];

        if (stage === "BOX_PLOTS") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "BP-B1", difficulty, stage, dataType: "median",
                        promptLatex: `\\text{Data: } 2, 4, 6, 8, 10. \\text{ What is the median?}`,
                        expressionLatex: `\\text{Median = middle value}`,
                        targetLatex: `\\text{Median}`,
                        slots: [{ id: "median", labelLatex: `\\text{Median}`, placeholder: "6", expected: 6 }],
                        correctLatex: `6`,
                        hintLatex: [`\\text{Middle of 5 values is 3rd value}`]
                    },
                    {
                        id: "BP-B2", difficulty, stage, dataType: "quartiles",
                        promptLatex: `\\text{Data: } 1, 3, 5, 7, 9. \\text{ What is Q1 (first quartile)?}`,
                        expressionLatex: `\\text{Q1 = median of lower half}`,
                        targetLatex: `Q_1`,
                        slots: [{ id: "q1", labelLatex: `Q_1`, placeholder: "3", expected: 3 }],
                        correctLatex: `Q_1 = 3`,
                        hintLatex: [`\\text{Lower half: } 1, 3`]
                    },
                    {
                        id: "BP-B3", difficulty, stage, dataType: "range",
                        promptLatex: `\\text{Data: } 10, 15, 20, 25, 30. \\text{ What is the range?}`,
                        expressionLatex: `\\text{Range} = \\text{Max} - \\text{Min}`,
                        targetLatex: `\\text{Range}`,
                        slots: [{ id: "range", labelLatex: `\\text{Range}`, placeholder: "20", expected: 20 }],
                        correctLatex: `20`,
                        hintLatex: [`30 - 10 = 20`]
                    },
                    {
                        id: "BP-B4", difficulty, stage, dataType: "iqr",
                        promptLatex: `\\text{Q1 = 5, Q3 = 15. What is IQR (interquartile range)?}`,
                        expressionLatex: `\\text{IQR} = Q_3 - Q_1`,
                        targetLatex: `\\text{IQR}`,
                        slots: [{ id: "iqr", labelLatex: `\\text{IQR}`, placeholder: "10", expected: 10 }],
                        correctLatex: `\\text{IQR} = 10`,
                        hintLatex: [`15 - 5 = 10`]
                    },
                    {
                        id: "BP-B5", difficulty, stage, dataType: "outlier",
                        promptLatex: `\\text{Data: } 2, 3, 4, 5, 20. \\text{ Which value is an outlier?}`,
                        expressionLatex: `\\text{Outlier = far from others}`,
                        targetLatex: `\\text{Outlier}`,
                        slots: [{ id: "outlier", labelLatex: `\\text{Outlier}`, placeholder: "20", expected: 20 }],
                        correctLatex: `20`,
                        hintLatex: [`\\text{20 is much larger than others}`]
                    }
                );
            }
        }

        if (stage === "SCATTER_PLOTS") {
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "SP-C1", difficulty, stage, dataType: "positive",
                        promptLatex: `\\text{As study time increases, test scores increase. What type of correlation?}`,
                        expressionLatex: `\\text{Both increase together}`,
                        targetLatex: `\\text{Type}`,
                        slots: [{ id: "type", labelLatex: `\\text{Type}`, placeholder: "positive", expected: "positive" }],
                        correctLatex: `\\text{Positive correlation}`,
                        hintLatex: [`\\text{Both go up = positive}`]
                    },
                    {
                        id: "SP-C2", difficulty, stage, dataType: "negative",
                        promptLatex: `\\text{As temperature decreases, heating costs increase. What correlation?}`,
                        expressionLatex: `\\text{One up, one down}`,
                        targetLatex: `\\text{Type}`,
                        slots: [{ id: "type", labelLatex: `\\text{Type}`, placeholder: "negative", expected: "negative" }],
                        correctLatex: `\\text{Negative correlation}`,
                        hintLatex: [`\\text{Opposite directions = negative}`]
                    },
                    {
                        id: "SP-C3", difficulty, stage, dataType: "none",
                        promptLatex: `\\text{Shoe size vs. math score shows no pattern. What correlation?}`,
                        expressionLatex: `\\text{No relationship}`,
                        targetLatex: `\\text{Type}`,
                        slots: [{ id: "type", labelLatex: `\\text{Type}`, placeholder: "none", expected: "none" }],
                        correctLatex: `\\text{No correlation}`,
                        hintLatex: [`\\text{No pattern = no correlation}`]
                    },
                    {
                        id: "SP-C4", difficulty, stage, dataType: "strong",
                        promptLatex: `\\text{Points cluster tightly around a line. Is correlation strong or weak?}`,
                        expressionLatex: `\\text{Tight cluster = strong}`,
                        targetLatex: `\\text{Strength}`,
                        slots: [{ id: "strength", labelLatex: `\\text{Strength}`, placeholder: "strong", expected: "strong" }],
                        correctLatex: `\\text{Strong correlation}`,
                        hintLatex: [`\\text{Close to line = strong}`]
                    },
                    {
                        id: "SP-C5", difficulty, stage, dataType: "trend",
                        promptLatex: `\\text{Line of best fit has positive slope. What does this indicate?}`,
                        expressionLatex: `\\text{Positive slope = positive trend}`,
                        targetLatex: `\\text{Trend}`,
                        slots: [{ id: "trend", labelLatex: `\\text{Trend}`, placeholder: "positive", expected: "positive" }],
                        correctLatex: `\\text{Positive trend}`,
                        hintLatex: [`\\text{Upward slope = positive}`]
                    }
                );
            }
        }

        if (stage === "CORRELATION") {
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "C-A1", difficulty, stage, dataType: "causation",
                        promptLatex: `\\text{Ice cream sales and drowning both increase in summer. Does ice cream cause drowning?}`,
                        expressionLatex: `\\text{Correlation} \\neq \\text{Causation}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Cause?}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{No (both caused by hot weather)}`,
                        hintLatex: [`\\text{Correlation doesn't mean causation}`]
                    },
                    {
                        id: "C-A2", difficulty, stage, dataType: "coefficient",
                        promptLatex: `\\text{Correlation coefficient r = 0.9. Is this strong or weak?}`,
                        expressionLatex: `r \\text{ close to } 1 = \\text{strong}`,
                        targetLatex: `\\text{Strength}`,
                        slots: [{ id: "strength", labelLatex: `\\text{Strength}`, placeholder: "strong", expected: "strong" }],
                        correctLatex: `\\text{Strong positive}`,
                        hintLatex: [`r \\text{ near } 1 = \\text{strong positive}`]
                    },
                    {
                        id: "C-A3", difficulty, stage, dataType: "negative_r",
                        promptLatex: `\\text{Correlation coefficient r = -0.8. What type of correlation?}`,
                        expressionLatex: `r < 0 = \\text{negative}`,
                        targetLatex: `\\text{Type}`,
                        slots: [{ id: "type", labelLatex: `\\text{Type}`, placeholder: "negative", expected: "negative" }],
                        correctLatex: `\\text{Strong negative}`,
                        hintLatex: [`\\text{Negative } r = \\text{negative correlation}`]
                    },
                    {
                        id: "C-A4", difficulty, stage, dataType: "zero_r",
                        promptLatex: `\\text{Correlation coefficient r = 0.05. What does this mean?}`,
                        expressionLatex: `r \\approx 0 = \\text{no correlation}`,
                        targetLatex: `\\text{Meaning}`,
                        slots: [{ id: "meaning", labelLatex: `\\text{Meaning}`, placeholder: "none", expected: "none" }],
                        correctLatex: `\\text{No correlation}`,
                        hintLatex: [`r \\text{ near } 0 = \\text{no correlation}`]
                    },
                    {
                        id: "C-A5", difficulty, stage, dataType: "prediction",
                        promptLatex: `\\text{Strong positive correlation between hours studied and test score. Can we predict scores?}`,
                        expressionLatex: `\\text{Strong correlation allows prediction}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Predict?}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\text{Yes (with some error)}`,
                        hintLatex: [`\\text{Strong correlation enables prediction}`]
                    }
                );
            }
        }

        return quests;
    }, []);

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(d, s), [buildStagePool]);

    const {
        currentQuest,
        difficulty,
        stage,
        lastCheck,
        inputs,
        setInputs,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
    } = useQuestManager<SM210Quest, Stage>({
        buildPool,
        initialStage: "BOX_PLOTS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sm2-10", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "BOX_PLOTS" as Stage, label: t.stages.box_plots },
        { id: "SCATTER_PLOTS" as Stage, label: t.stages.scatter_plots },
        { id: "CORRELATION" as Stage, label: t.stages.correlation },
    ], [t.stages]);

    if (!currentQuest) {
        return (
            <ChamberLayout
                title={t.title}
                moduleCode="SM2.10"
                difficulty={difficulty}
                onDifficultyChange={handleDifficultyChange}
                stages={stagesProps}
                currentStage={stage}
                onStageChange={(s) => handleStageChange(s as Stage)}
                footerLeft={t.footer_left}
                translations={{
                    back: t.back,
                    check: t.check,
                    next: t.next,
                    correct: t.correct,
                    incorrect: t.incorrect,
                    difficulty: t.difficulty,
                }}
                monitorContent={<DataVisualization quest={null} stage={stage} />}
            >
                <div className="text-center text-purple-400 text-xl">Module Complete!</div>
            </ChamberLayout>
        );
    }

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="SM2.10"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t.footer_left}
            translations={{
                back: t.back,
                check: t.check,
                next: t.next,
                correct: t.correct,
                incorrect: t.incorrect,
                difficulty: t.difficulty,
            }}
            monitorContent={<DataVisualization quest={currentQuest} stage={stage} />}
        >
            <div className="space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/30">
                    <h3 className="text-purple-400 font-bold mb-2">{t.objective_title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {t.scenarios[stage.toLowerCase() as keyof typeof t.scenarios]}
                    </p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
                    <div className="text-lg">
                        <InlineMath math={currentQuest.promptLatex} />
                    </div>
                    
                    <div className="text-purple-300">
                        <InlineMath math={currentQuest.expressionLatex} />
                    </div>

                    <div className="space-y-3">
                        {currentQuest.slots.map((slot) => (
                            <div key={slot.id} className="flex items-center gap-3">
                                <InlineMath math={slot.labelLatex} />
                                <input
                                    type="text"
                                    value={inputs[slot.id] || ""}
                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                    placeholder={slot.placeholder}
                                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                                    disabled={lastCheck?.ok}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
