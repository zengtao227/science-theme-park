"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { IonicStage } from "./stages/IonicStage";
import { CovalentStage } from "./stages/CovalentStage";
import { LewisStage } from "./stages/LewisStage";
import { Stage } from "@/lib/game-engine";

export const BondingLab: React.FC = () => {
    const { t } = useLanguage();
    const [currentLayoutStage, setCurrentLayoutStage] = useState<Stage>("basic");
    const [currentLabStage, setCurrentLabStage] = useState<'ionic' | 'covalent' | 'lewis'>('ionic');

    const [difficulty, setDifficulty] = useState<"BASIC" | "CORE" | "ADVANCED" | "ELITE">("CORE");

    const handleStageChange = (stage: Stage) => {
        setCurrentLayoutStage(stage);
        // Map layout stage to lab stage if needed, or keep separate
        if (stage === 'basic') setCurrentLabStage('ionic');
        if (stage === 'core') setCurrentLabStage('covalent');
        if (stage === 'advanced') setCurrentLabStage('lewis');
    };

    return (
        <ChamberLayout
            moduleCode="SC1.05"
            title={t("sc1_05.title")}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
            translations={{
                back: t("sc1_05.back") || "Back",
                check: t("sc1_05.check") || "Verify",
                next: t("sc1_05.next") || "Next",
                correct: t("sc1_05.correct") || "Correct",
                incorrect: t("sc1_05.incorrect") || "Incorrect",
                ready: t("sc1_05.ready") || "Ready",
                monitor_title: t("sc1_05.monitor_title") || "Mission Control",
                difficulty: {
                    basic: t("sc1_05.difficulty.basic") || "Basic",
                    core: t("sc1_05.difficulty.core") || "Core",
                    advanced: t("sc1_05.difficulty.advanced") || "Advanced",
                    elite: t("sc1_05.difficulty.elite") || "Elite"
                }
            }}
            stages={[
                { id: "basic", label: "IONIC" },
                { id: "core", label: "COVALENT" },
                { id: "advanced", label: "LEWIS" }, // Renaming elite/advanced? Sticking to standard stages for now
            ]}
            currentStage={currentLayoutStage}
            onStageChange={handleStageChange}
        >
            <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-black/40 rounded-xl border border-white/10 relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(#00f7ff 1px, transparent 1px), linear-gradient(90deg, #00f7ff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />

                {currentLabStage === 'ionic' && <IonicStage />}
                {currentLabStage === 'covalent' && <CovalentStage />}
                {currentLabStage === 'lewis' && <LewisStage />}
            </div>
        </ChamberLayout>
    );
};
