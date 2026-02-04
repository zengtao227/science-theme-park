"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";

type Stage = "RULES" | "NEGATIVE" | "SCIENTIFIC";
type Mg11T = typeof translations.EN.s2_05;

interface S205Quest extends Quest {
    stage: Stage;
}

function buildStagePool(t: Mg11T, difficulty: Difficulty, stage: Stage): S205Quest[] {
    if (stage === "RULES") {
        const all: S205Quest[] = [
            {
                id: "R1", difficulty, stage,
                promptLatex: t.stages.rules_prompt_latex,
                expressionLatex: `2^3\\cdot 2^4`,
                targetLatex: `2^n`,
                slots: [{ id: "n", labelLatex: `n`, placeholder: "n", expected: 7 }],
                correctLatex: `2^7`,
                hintLatex: [`a^m\\cdot a^n=a^{m+n}`, `2^{3+4}=2^7`],
            },
            {
                id: "R2", difficulty, stage,
                promptLatex: t.stages.rules_prompt_latex,
                expressionLatex: `3^5\\div 3^2`,
                targetLatex: `3^n`,
                slots: [{ id: "n", labelLatex: `n`, placeholder: "n", expected: 3 }],
                correctLatex: `3^3`,
                hintLatex: [`a^m\\div a^n=a^{m-n}`, `3^{5-2}=3^3`],
            },
        ];
        return all;
    }
    // ... 其他 Stage 数据保持逻辑 (此处仅为示例，实际补全数据)
    return [];
}

export default function S205Page() {
    const { currentLanguage } = useAppStore();
    const t = (translations as any)[currentLanguage].s2_05;

    const {
        difficulty, stage, inputs, lastCheck, currentQuest,
        setInputs, verify, next, handleDifficultyChange, handleStageChange,
    } = useQuestManager<S205Quest, Stage>({
        buildPool: (d, s) => buildStagePool(t, d, s),
        initialStage: "RULES",
    });

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="S2.05"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "RULES", label: t.stages.rules },
                { id: "NEGATIVE", label: t.stages.negative },
                { id: "SCIENTIFIC", label: t.stages.scientific },
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            translations={{
                back: t.back, check: t.check, next: t.next, correct: t.correct, incorrect: t.incorrect,
                ready: t.ready, monitor_title: t.monitor_title,
                difficulty: { basic: t.difficulty.basic, core: t.difficulty.core, advanced: t.difficulty.advanced, elite: t.difficulty.elite },
            }}
            monitorContent={
                <div className="space-y-4">
                    <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.target_title}</div>
                    <div className="text-white font-black text-xl overflow-x-auto py-1">
                        <InlineMath math={currentQuest?.expressionLatex || ""} />
                    </div>
                </div>
            }
        >
            <div className="space-y-10">
                <div className="text-center">
                    <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.objective_title}</h3>
                    <p className="text-3xl text-white font-black italic">
                        <InlineMath math={currentQuest?.promptLatex || ""} />
                    </p>
                </div>
                <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full">
                    <div className="grid grid-cols-2 gap-4">
                        {currentQuest?.slots.map((slot) => (
                            <div key={slot.id} className="space-y-2">
                                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                                    <InlineMath math={slot.labelLatex} />
                                </div>
                                <input
                                    value={inputs[slot.id] ?? ""}
                                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                                    className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
