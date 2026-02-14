"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { MitosisStage } from "./stages/MitosisStage";
import { MeiosisStage } from "./stages/MeiosisStage";

export default function CellDivisionLab() {
    const { t } = useLanguage();
    const [difficulty, setDifficulty] = useState<"BASIC" | "CORE" | "ADVANCED" | "ELITE">("CORE");
    const [currentStage, setCurrentStage] = useState<string>("mitosis");

    return (
        <ChamberLayout
            moduleCode="SB1.03"
            title={t("sb1_03.title")}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
            stages={[
                { id: "mitosis", label: "MITOSIS" },
                { id: "meiosis_i", label: "MEIOSIS I" },
                { id: "meiosis_ii", label: "MEIOSIS II" }
            ]}
            currentStage={currentStage}
            onStageChange={setCurrentStage}
            translations={{
                back: t("sb1_03.back") || "Back",
                check: t("sb1_03.check") || "Verify",
                next: t("sb1_03.next") || "Next",
                correct: t("sb1_03.correct") || "Correct",
                incorrect: t("sb1_03.incorrect") || "Incorrect",
                ready: t("sb1_03.ready") || "Ready",
                monitor_title: t("sb1_03.monitor_title") || "Cell Monitor",
                difficulty: {
                    basic: t("sb1_03.difficulty.basic") || "Basic",
                    core: t("sb1_03.difficulty.core") || "Core",
                    advanced: t("sb1_03.difficulty.advanced") || "Advanced",
                    elite: t("sb1_03.difficulty.elite") || "Elite"
                }
            }}
        >
            <div className="w-full h-full min-h-[600px] bg-gray-900 rounded-xl overflow-hidden relative border border-white/10">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #4ade80 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                />

                {currentStage === "mitosis" && <MitosisStage />}
                {(currentStage === "meiosis_i" || currentStage === "meiosis_ii") && <MeiosisStage stage={currentStage === "meiosis_i" ? 1 : 2} />}
            </div>
        </ChamberLayout>
    );
}
