"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import GeometryVisualization from "@/components/chamber/GeometryVisualization";
import { GM202Quest, Stage } from "@/lib/gm2-02-types";
import { buildStagePool } from "@/lib/gm2-02-quest-builder";

export default function GM202Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();

  const gm2_02_t = {
    title: t("gm2_02.title"),
    subtitle: t("gm2_02.subtitle"),
    line_equations: t("gm2_02.line_equations"),
    plane_geometry: t("gm2_02.plane_geometry"),
    spatial_relationships: t("gm2_02.spatial_relationships"),
    basic: t("gm2_02.basic"),
    core: t("gm2_02.core"),
    advanced: t("gm2_02.advanced"),
    elite: t("gm2_02.elite"),
    check: t("gm2_02.check"),
    next: t("gm2_02.next"),
    correct: t("gm2_02.correct"),
    incorrect: t("gm2_02.incorrect"),
    scenario_tram: t("gm2_02.scenario_tram"),
    scenario_tram_desc: t("gm2_02.scenario_tram_desc"),
    scenario_bridge: t("gm2_02.scenario_bridge"),
    scenario_bridge_desc: t("gm2_02.scenario_bridge_desc"),
    scenario_airport: t("gm2_02.scenario_airport"),
    scenario_airport_desc: t("gm2_02.scenario_airport_desc"),
    scenario_university: t("gm2_02.scenario_university"),
    scenario_university_desc: t("gm2_02.scenario_university_desc"),
  };

  const {
    difficulty,
    stage,
    inputs,
    lastCheck,
    currentQuest,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
    adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<GM202Quest, Stage>({
    moduleCode: "gm2-02",
    buildPool: (d, s) => buildStagePool(gm2_02_t, d, s),
    initialStage: "LINE_EQUATIONS",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gm2-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  // Determine visualization type based on stage
  const visualizationType = stage === "LINE_EQUATIONS" ? "2D" : "3D";

  // Get scenario description based on stage
  const getScenarioContent = () => {
    switch (stage) {
      case "LINE_EQUATIONS":
        return {
          title: gm2_02_t.scenario_tram,
          description: gm2_02_t.scenario_tram_desc
        };
      case "PLANE_GEOMETRY":
        return {
          title: gm2_02_t.scenario_bridge,
          description: gm2_02_t.scenario_bridge_desc
        };
      case "SPATIAL_RELATIONSHIPS":
        return difficulty === "ELITE"
          ? {
              title: gm2_02_t.scenario_university,
              description: gm2_02_t.scenario_university_desc
            }
          : {
              title: gm2_02_t.scenario_airport,
              description: gm2_02_t.scenario_airport_desc
            };
      default:
        return {
          title: gm2_02_t.scenario_tram,
          description: gm2_02_t.scenario_tram_desc
        };
    }
  };

  const scenario = getScenarioContent();

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={gm2_02_t.title}
      moduleCode="GM2.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "LINE_EQUATIONS", label: gm2_02_t.line_equations },
        { id: "PLANE_GEOMETRY", label: gm2_02_t.plane_geometry },
        { id: "SPATIAL_RELATIONSHIPS", label: gm2_02_t.spatial_relationships },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={gm2_02_t.subtitle}
      translations={{
        back: "Back",
        check: gm2_02_t.check,
        next: gm2_02_t.next,
        correct: gm2_02_t.correct,
        incorrect: gm2_02_t.incorrect,
        ready: "Ready",
        monitor_title: "Visualization",
        difficulty: {
          basic: gm2_02_t.basic,
          core: gm2_02_t.core,
          advanced: gm2_02_t.advanced,
          elite: gm2_02_t.elite,
        },
      }}
      monitorContent={
        currentQuest && (
          <GeometryVisualization
            quest={currentQuest}
            stage={stage}
            visualizationType={visualizationType}
            data={currentQuest?.visualizationData}
            translations={{
              line_equations: gm2_02_t.line_equations,
              plane_geometry: gm2_02_t.plane_geometry,
              spatial_relationships: gm2_02_t.spatial_relationships,
            }}
          />
        )
      }
    >
      <div className="space-y-10">
        {/* Scenario Section */}
        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6 max-w-4xl mx-auto">
          <h3 className="text-[10px] text-green-400 uppercase tracking-[0.5em] font-black mb-4">
            {scenario.title}
          </h3>
          <div className="text-sm text-green-400/90 leading-relaxed">
            {scenario.description}
          </div>
        </div>

        {/* Quest Section */}
        {currentQuest && (
          <>
            <div className="text-center">
              <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
                OBJECTIVE
              </h3>
              <p className="text-2xl text-white font-black">
                <InlineMath math={currentQuest?.promptLatex || ""} />
              </p>
            </div>

            {/* Input Section */}
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
              {currentQuest?.slots.map((slot) => (
                <div key={slot.id} className="space-y-2">
                  <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                    <InlineMath math={slot.labelLatex} />
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      value={inputs[slot.id] ?? ""}
                      onChange={(e) =>
                        setInputs((v) => ({ ...v, [slot.id]: e.target.value }))
                      }
                      className="flex-1 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white text-white font-black text-xl"
                      placeholder={slot.placeholder}
                    />
                  </div>
                </div>
              ))}
              <div className="text-[10px] text-white/90 font-mono italic text-center">
                Enter your answer with precision to 2 decimal places
              </div>
            </div>
          </>
        )}
      </div>
    </ChamberLayout>
  );
}
