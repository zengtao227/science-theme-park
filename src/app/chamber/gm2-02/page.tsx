"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useMemo, useCallback } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { Difficulty, useQuestManager } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import GeometryVisualization from "@/components/chamber/GeometryVisualization";
import { GM202Quest, Stage } from "@/lib/gm2-02-types";
import { buildStagePool } from "@/lib/gm2-02-quest-builder";
import { renderMixedText } from "@/lib/latex-utils";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";
import { createModuleFeedbackProvider } from "@/lib/feedback/moduleFeedbackProvider";

export default function GM202Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();
  const feedbackContentProvider = useMemo(() => createModuleFeedbackProvider(t, "gm2-02"), [t]);

  const gm2_02_t = {
    back: t("gm2_02.back"),
    monitor_title: t("gm2_02.monitor_title"),
    objective_title: t("gm2_02.objective_title"),
    input_tip_2dp: t("gm2_02.input_tip_2dp"),
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

  const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(t, d, s), [t]);

  const stageDifficultyMap = useMemo<Record<Stage, Difficulty[]>>(() => ({
    LINE_EQUATIONS: ["BASIC"],
    PLANE_GEOMETRY: ["CORE"],
    SPATIAL_RELATIONSHIPS: ["ADVANCED", "ELITE"],
  }), []);

  const resolveDifficultyForStage = useCallback((requested: Difficulty, targetStage: Stage): Difficulty => {
    const allowed = stageDifficultyMap[targetStage];
    return allowed.includes(requested) ? requested : allowed[0];
  }, [stageDifficultyMap]);

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
      requestAiFeedback,
  feedbackLevel,
  feedbackContent,
  feedbackAvailability,
  showHintLevel,
  showStepsLevel,
  showFullSolution,
  policy,
  } = useQuestManager<GM202Quest, Stage>({
    moduleCode: "gm2-02",
    buildPool,
    initialStage: "LINE_EQUATIONS",
    feedbackContentProvider,
    initialDifficulty: "BASIC" as Difficulty,
  });

  useEffect(() => {
    const resolved = resolveDifficultyForStage(difficulty, stage);
    if (resolved !== difficulty) {
      handleDifficultyChange(resolved);
    }
  }, [difficulty, handleDifficultyChange, resolveDifficultyForStage, stage]);

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gm2-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  // Determine visualization type based on quest data content (not just stage)
  const visualizationType = useMemo(() => {
    const vd = currentQuest?.visualizationData;
    if (!vd) return "3D";
    const hasOnly2DLines =
      (vd.lines?.length ?? 0) > 0 &&
      vd.lines!.every((l) => l.type === "2D");
    const hasNo3DPoints = !vd.points?.some((p) => p.coordinates.length === 3);
    const hasNoPlanes = !vd.planes?.length;
    return hasOnly2DLines && hasNo3DPoints && hasNoPlanes ? "2D" : "3D";
  }, [currentQuest]);

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

  const stages = useMemo(() => [
    { id: "LINE_EQUATIONS" as Stage, label: gm2_02_t.line_equations },
    { id: "PLANE_GEOMETRY" as Stage, label: gm2_02_t.plane_geometry },
    { id: "SPATIAL_RELATIONSHIPS" as Stage, label: gm2_02_t.spatial_relationships },
  ], [gm2_02_t.line_equations, gm2_02_t.plane_geometry, gm2_02_t.spatial_relationships]);

  const printSections = useMemo(() => buildQuestPrintSections<GM202Quest, Stage>({
    moduleTitle: gm2_02_t.title,
    stages,
    difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
    difficultyLabels: {
      BASIC: gm2_02_t.basic,
      CORE: gm2_02_t.core,
      ADVANCED: gm2_02_t.advanced,
      ELITE: gm2_02_t.elite,
    },
    buildPool,
  }), [buildPool, gm2_02_t.advanced, gm2_02_t.basic, gm2_02_t.core, gm2_02_t.elite, gm2_02_t.title, stages]);

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      feedbackContent={feedbackContent}
      feedbackLevel={feedbackLevel}
      feedbackAvailability={feedbackAvailability}
      feedbackPolicy={policy}
      onShowHint={showHintLevel}
      onShowSteps={showStepsLevel}
      onShowFull={showFullSolution}
      title={gm2_02_t.title}
      moduleCode="GM2.02"
      defaultLeftWidth={40}
      minLeftWidth={30}
      maxLeftWidth={75}
      difficulty={difficulty}
      onDifficultyChange={(d) => handleDifficultyChange(resolveDifficultyForStage(d, stage))}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => {
        const nextStage = s as Stage;
        const nextDifficulty = resolveDifficultyForStage(difficulty, nextStage);
        if (nextDifficulty !== difficulty) {
          handleDifficultyChange(nextDifficulty);
        }
        handleStageChange(nextStage);
      }}
      printSections={printSections}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      translations={{
        back: gm2_02_t.back,
        check: gm2_02_t.check,
        next: gm2_02_t.next,
        correct: gm2_02_t.correct,
        incorrect: gm2_02_t.incorrect,
        monitor_title: gm2_02_t.monitor_title,
        difficulty: {
          basic: gm2_02_t.basic,
          core: gm2_02_t.core,
          advanced: gm2_02_t.advanced,
          elite: gm2_02_t.elite,
        },
      }}
      monitorContent={
        currentQuest && (
          <div className="w-full h-full flex flex-col">
            <GeometryVisualization
              quest={currentQuest}
              stage={stage}
              visualizationType={visualizationType}
              data={currentQuest?.visualizationData ?? {}}
              translations={{
                line_equations: gm2_02_t.line_equations,
                plane_geometry: gm2_02_t.plane_geometry,
                spatial_relationships: gm2_02_t.spatial_relationships,
              }}
            />
          </div>
        )
      }
    >
      <div className="space-y-10">
        {/* Scenario Section */}
        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6 max-w-4xl mx-auto">
          <h3 className="text-[10px] text-green-400 uppercase tracking-[0.5em] font-black mb-4">
            {renderMixedText(scenario.title)}
          </h3>
          <div className="text-sm text-green-400/90 leading-relaxed">
            {renderMixedText(scenario.description, "whitespace-pre-wrap")}
          </div>
        </div>

        {/* Quest Section */}
        {currentQuest && (
          <>
            <div className="text-center">
              <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
                {gm2_02_t.objective_title}
              </h3>
              <p className="text-2xl text-white font-black">
                {renderMixedText(currentQuest?.promptLatex || "")}
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
                {gm2_02_t.input_tip_2dp}
              </div>
            </div>
          </>
        )}
      </div>
    </ChamberLayout>
  );
}
