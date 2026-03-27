/**
 * SC2.07 Enthalpy & Energetics - Main Page Component
 * 
 * This page integrates all components for the Enthalpy & Energetics module:
 * - Energy Changes stage
 * - Hess's Law stage
 * - Calorimetry stage
 * 
 * Requirements: 14.1, 14.2, 16.1, 16.6, 17.1-17.7
 */

'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import { useLanguage } from '@/lib/i18n';
import { useQuestManager, Difficulty } from '@/hooks/useQuestManager';
import ChamberLayout from '@/components/layout/ChamberLayout';
import { SC207Quest, Stage } from '@/lib/sc2-07-types';
import { buildStagePool } from '@/lib/sc2-07-quest-builder';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { EnergyDiagram } from '@/components/sc2-07/EnergyDiagram';
import { HessCycleView } from '@/components/sc2-07/HessCycleView';
import { CalorimeterView } from '@/components/sc2-07/CalorimeterView';
import { renderMixedText, KatexTextWrap } from "@/lib/latex-utils";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";
import { createSC207FeedbackProvider } from "@/lib/sc2-07-provider";

export default function SC207Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();
  const feedbackContentProvider = useMemo(() => createSC207FeedbackProvider(t), [t]);

  // Build quest pool callback
  const buildPoolCallback = useCallback(
    (d: Difficulty, s: Stage) => buildStagePool(t, d, s),
    [t]
  );

  const {
    difficulty,
    stage,
    currentQuest,
    inputs,
    setInputs,
    lastCheck,
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
    } = useQuestManager<SC207Quest, Stage>({
    moduleCode: "sc2-07",
    buildPool: buildPoolCallback,
    initialStage: 'ENERGY_CHANGES',
    feedbackContentProvider,
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage('sc2-07', stage);
    }
  }, [completeStage, lastCheck, stage]);

  // Get current scenario
  const getCurrentScenario = () => {
    if (!currentQuest) return '';
    const translated = t(`sc2_07.scenarios.${currentQuest?.id}`);
    if (translated !== `sc2_07.scenarios.${currentQuest?.id}`) return translated;
    return currentQuest?.baselContext || '';
  };

  // Get stage-specific prompt
  const getStagePrompt = () => {
    switch (stage) {
      case 'ENERGY_CHANGES':
        return t('sc2_07.prompts.calculate_enthalpy');
      case 'HESS_LAW':
        return t('sc2_07.prompts.apply_hess_law');
      case 'CALORIMETRY':
        return t('sc2_07.prompts.calculate_heat');
      default:
        return t('sc2_07.prompts.solve_problem');
    }
  };

  const stages = useMemo(() => [
    { id: 'ENERGY_CHANGES' as Stage, label: t('sc2_07.stages.energy_changes') },
    { id: 'HESS_LAW' as Stage, label: t('sc2_07.stages.hess_law') },
    { id: 'CALORIMETRY' as Stage, label: t('sc2_07.stages.calorimetry') },
  ], [t]);

  const printSections = useMemo(() => buildQuestPrintSections<SC207Quest, Stage>({
    moduleTitle: t('sc2_07.title'),
    stages,
    difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
    difficultyLabels: {
      BASIC: t('sc2_07.difficulty.basic'),
      CORE: t('sc2_07.difficulty.core'),
      ADVANCED: t('sc2_07.difficulty.advanced'),
      ELITE: t('sc2_07.difficulty.elite'),
    },
    buildPool: buildPoolCallback,
  }), [buildPoolCallback, stages, t]);

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
      title={t('sc2_07.title')}
      moduleCode="SC2.07"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      printSections={printSections}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      translations={{
        back: t('sc2_07.back'),
        check: t('sc2_07.check'),
        next: t('sc2_07.next'),
        correct: t('sc2_07.correct'),
        incorrect: t('sc2_07.incorrect'),
        monitor_title: t('sc2_07.monitor_title'),
        difficulty: {
          basic: t('sc2_07.difficulty.basic'),
          core: t('sc2_07.difficulty.core'),
          advanced: t('sc2_07.difficulty.advanced'),
          elite: t('sc2_07.difficulty.elite'),
        },
      }}
      monitorContent={
        <div className="p-6 space-y-4">
          {/* Render appropriate visualization based on stage */}
          {stage === 'ENERGY_CHANGES' && currentQuest && (
            <EnergyDiagram
              deltaH={currentQuest?.deltaH || 0}
              reactionType={currentQuest?.reactionType}
              showActivationEnergy={difficulty === 'ADVANCED' || difficulty === 'ELITE'}
              activationEnergy={currentQuest?.activationEnergy}
            />
          )}

          {stage === 'HESS_LAW' && currentQuest && currentQuest?.hessData && (
            <HessCycleView
              targetEquation={currentQuest?.hessData.targetEquation}
              availableEquations={currentQuest?.hessData.availableEquations}
            />
          )}

          {stage === 'CALORIMETRY' && currentQuest && currentQuest?.calorimetryData && (
            <CalorimeterView
              mass={currentQuest?.calorimetryData.mass}
              specificHeat={currentQuest?.calorimetryData.specificHeat}
              initialTemp={currentQuest?.calorimetryData.initialTemp}
              finalTemp={currentQuest?.calorimetryData.finalTemp}
              heat={currentQuest?.calorimetryData.heat}
              animate={false}
            />
          )}

          {/* Fallback if no specific visualization */}
          {!currentQuest && (
            <>
              <h3 className="text-lg font-semibold text-white">
                {t('sc2_07.visualization.title')}
              </h3>
              <div className="text-white/70 text-sm">
                {t('sc2_07.visualization.description')}
              </div>
            </>
          )}
        </div>
      }
    >
      <div className="space-y-8">
        {/* Mission Header */}
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t('sc2_07.mission.title')}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t('sc2_07.mission.description')}
          </p>
        </div>

        {/* Scenario Description */}
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6 max-w-4xl mx-auto">
          <div className="text-sm text-blue-400/90 leading-relaxed whitespace-pre-line">
            {getCurrentScenario()}
          </div>
        </div>

        {/* Stage Prompt */}
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t('sc2_07.objective_title')}
          </h3>
          <p className="text-2xl text-white font-semibold">
            {getStagePrompt()}
          </p>
        </div>

        {/* Quest Content */}
        {currentQuest && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Equation Display */}
            {currentQuest?.equationLatex && (
              <div className="bg-white/10 rounded-lg p-6 text-center">
                <div className="text-2xl text-white">
                  <BlockMath math={currentQuest?.equationLatex || ""} />
                </div>
              </div>
            )}

            {/* Prompt */}
            <div className="text-center text-white/90 text-lg">
              {renderMixedText(currentQuest?.promptLatex || "")}
            </div>

            {/* Input Field */}
            <div className="flex items-center justify-center gap-4">
              <label className="text-white/80 text-lg">
                {currentQuest?.slots?.[0]?.labelLatex && (
                  <InlineMath math={currentQuest?.slots[0].labelLatex} />
                )}
                {' = '}
              </label>
              <input
                type="number"
                value={inputs[currentQuest?.slots?.[0]?.id || 'ans'] || ''}
                onChange={(e) => {
                  const slotId = currentQuest?.slots?.[0]?.id;
                  if (!slotId) return;
                  setInputs({ ...inputs, [slotId]: e.target.value });
                }}
                placeholder={currentQuest?.slots?.[0]?.placeholder || t('sc2_07.prompts.enter_value_placeholder')}
                className="w-40 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-center text-lg min-h-[44px]"
              />
              <span className="text-white/80 text-lg">
                {currentQuest?.slots?.[0]?.unit || 'kJ'}
              </span>
            </div>

            {/* Feedback */}
            {lastCheck && (
              <div className={`rounded-lg p-4 text-center ${lastCheck.ok
                ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                : 'bg-red-500/20 border border-red-500/50 text-red-300'
                }`}>
                {lastCheck.ok ? t('sc2_07.feedback.correct') : t('sc2_07.incorrect')}
              </div>
            )}
          </div>
        )}
      </div>
    </ChamberLayout>
  );
}
