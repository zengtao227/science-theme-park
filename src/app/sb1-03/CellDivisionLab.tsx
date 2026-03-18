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
                { id: "mitosis", label: t("sb1_03.stages.mitosis") },
                { id: "meiosis_i", label: t("sb1_03.stages.meiosis_i") },
                { id: "meiosis_ii", label: t("sb1_03.stages.meiosis_ii") }
            ]}
            currentStage={currentStage}
            onStageChange={setCurrentStage}
            translations={{
                back: t("sb1_03.back"),
                check: t("sb1_03.check"),
                next: t("sb1_03.next"),
                correct: t("sb1_03.correct"),
                incorrect: t("sb1_03.incorrect"),
                ready: t("sb1_03.ready"),
                monitor_title: t("sb1_03.monitor_title"),
                difficulty: {
                    basic: t("sb1_03.difficulty.basic"),
                    core: t("sb1_03.difficulty.core"),
                    advanced: t("sb1_03.difficulty.advanced"),
                    elite: t("sb1_03.difficulty.elite")
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
