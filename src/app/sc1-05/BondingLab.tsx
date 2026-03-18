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
                back: t("sc1_05.back"),
                check: t("sc1_05.check"),
                next: t("sc1_05.next"),
                correct: t("sc1_05.correct"),
                incorrect: t("sc1_05.incorrect"),
                ready: t("sc1_05.ready"),
                monitor_title: t("sc1_05.monitor_title"),
                difficulty: {
                    basic: t("sc1_05.difficulty.basic"),
                    core: t("sc1_05.difficulty.core"),
                    advanced: t("sc1_05.difficulty.advanced"),
                    elite: t("sc1_05.difficulty.elite")
                }
            }}
            stages={[
                { id: "basic", label: t("sc1_05.stages.ionic") },
                { id: "core", label: t("sc1_05.stages.covalent") },
                { id: "advanced", label: t("sc1_05.stages.lewis") },
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
