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

import { useCallback, useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { useLanguage } from '@/lib/i18n';
import { useQuestManager, Difficulty } from '@/hooks/useQuestManager';
import ChamberLayout from '@/components/layout/ChamberLayout';
import { SC207Quest, Stage } from '@/lib/sc2-07-types';
import { buildStagePool } from '@/lib/sc2-07-quest-builder';
import { verifyAnswer } from '@/lib/sc2-07-utils';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { EnergyDiagram } from '@/components/sc2-07/EnergyDiagram';
import { HessCycleView } from '@/components/sc2-07/HessCycleView';
import { BondEnergyView } from '@/components/sc2-07/BondEnergyView';
import { CalorimeterView } from '@/components/sc2-07/CalorimeterView';

export default function SC207Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();
  
  // User input state
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  // Build quest pool callback
  const buildPoolCallback = useCallback(
    (d: Difficulty, s: Stage) => buildStagePool(t, d, s),
    [t]
  );

  const {
    difficulty,
    stage,
    currentQuest,
    next,
    handleDifficultyChange,
    handleStageChange,
  } = useQuestManager<SC207Quest, Stage>({
    buildPool: buildPoolCallback,
    initialStage: 'ENERGY_CHANGES',
  });

  // Reset input when quest changes
  useEffect(() => {
    setUserAnswer('');
    setFeedback(null);
  }, [currentQuest]);

  // Handle verification
  const handleVerify = () => {
    if (!currentQuest || !userAnswer) return;
    
    const numericAnswer = parseFloat(userAnswer);
    if (isNaN(numericAnswer)) {
      setFeedback({
        correct: false,
        message: t('sc2-07.feedback.invalid_number')
      });
      return;
    }

    const expected = currentQuest.slots?.[0]?.expected || currentQuest.deltaH || 0;
    const isCorrect = verifyAnswer(numericAnswer, expected);
    
    setFeedback({
      correct: isCorrect,
      message: isCorrect 
        ? t('sc2-07.feedback.correct')
        : t('sc2-07.feedback.incorrect', { expected: expected.toFixed(1) })
    });

    if (isCorrect) {
      completeStage('sc2-07', stage);
    }
  };

  // Handle next quest
  const handleNext = () => {
    if (feedback?.correct) {
      next();
    }
  };

  // Get current scenario
  const getCurrentScenario = () => {
    if (!currentQuest) return '';
    return currentQuest.baselContext || '';
  };

  // Get stage-specific prompt
  const getStagePrompt = () => {
    switch (stage) {
      case 'ENERGY_CHANGES':
        return t('sc2-07.prompts.calculate_enthalpy');
      case 'HESS_LAW':
        return t('sc2-07.prompts.apply_hess_law');
      case 'CALORIMETRY':
        return t('sc2-07.prompts.calculate_heat');
      default:
        return t('sc2-07.prompts.solve_problem');
    }
  };

  return (
    <ChamberLayout
      title={t('sc2-07.title')}
      moduleCode="SC2.07"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: 'ENERGY_CHANGES', label: t('sc2-07.stages.energy_changes') },
        { id: 'HESS_LAW', label: t('sc2-07.stages.hess_law') },
        { id: 'CALORIMETRY', label: t('sc2-07.stages.calorimetry') },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={handleVerify}
      onNext={handleNext}
      checkStatus={feedback ? { ok: feedback.correct, correct: feedback.message } : null}
      footerLeft={t('sc2-07.footer_left')}
      translations={{
        back: t('sc2-07.back'),
        check: t('sc2-07.check'),
        next: t('sc2-07.next'),
        correct: t('sc2-07.correct'),
        incorrect: t('sc2-07.incorrect'),
        ready: t('sc2-07.ready'),
        monitor_title: t('sc2-07.monitor_title'),
        difficulty: {
          basic: t('sc2-07.difficulty.basic'),
          core: t('sc2-07.difficulty.core'),
          advanced: t('sc2-07.difficulty.advanced'),
          elite: t('sc2-07.difficulty.elite'),
        },
      }}
      monitorContent={
        <div className="p-6 space-y-4">
          {/* Render appropriate visualization based on stage */}
          {stage === 'ENERGY_CHANGES' && currentQuest && (
            <EnergyDiagram
              deltaH={currentQuest.deltaH || 0}
              reactionType={currentQuest.reactionType}
              showActivationEnergy={difficulty === 'ADVANCED' || difficulty === 'ELITE'}
              activationEnergy={currentQuest.activationEnergy}
            />
          )}
          
          {stage === 'HESS_LAW' && currentQuest && currentQuest.hessData && (
            <HessCycleView
              targetEquation={currentQuest.hessData.targetEquation}
              availableEquations={currentQuest.hessData.availableEquations}
            />
          )}
          
          {stage === 'CALORIMETRY' && currentQuest && currentQuest.calorimetryData && (
            <CalorimeterView
              mass={currentQuest.calorimetryData.mass}
              specificHeat={currentQuest.calorimetryData.specificHeat}
              initialTemp={currentQuest.calorimetryData.initialTemp}
              finalTemp={currentQuest.calorimetryData.finalTemp}
              heat={currentQuest.calorimetryData.heat}
              animate={false}
            />
          )}
          
          {/* Fallback if no specific visualization */}
          {!currentQuest && (
            <>
              <h3 className="text-lg font-semibold text-white">
                {t('sc2-07.visualization.title')}
              </h3>
              <div className="text-white/70 text-sm">
                {t('sc2-07.visualization.description')}
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
            {t('sc2-07.mission.title')}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t('sc2-07.mission.description')}
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
            {t('sc2-07.objective_title')}
          </h3>
          <p className="text-2xl text-white font-semibold">
            {getStagePrompt()}
          </p>
        </div>

        {/* Quest Content */}
        {currentQuest && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Equation Display */}
            {currentQuest.equationLatex && (
              <div className="bg-white/10 rounded-lg p-6 text-center">
                <div className="text-2xl text-white">
                  <BlockMath math={currentQuest.equationLatex} />
                </div>
              </div>
            )}

            {/* Prompt */}
            <div className="text-center text-white/90 text-lg">
              <InlineMath math={currentQuest.promptLatex} />
            </div>

            {/* Input Field */}
            <div className="flex items-center justify-center gap-4">
              <label className="text-white/80 text-lg">
                {currentQuest.slots?.[0]?.labelLatex && (
                  <InlineMath math={currentQuest.slots[0].labelLatex} />
                )}
                {' = '}
              </label>
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder={currentQuest.slots?.[0]?.placeholder || 'Enter value'}
                className="w-40 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-center text-lg min-h-[44px]"
              />
              <span className="text-white/80 text-lg">
                {currentQuest.slots?.[0]?.unit || 'kJ'}
              </span>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className={`rounded-lg p-4 text-center ${
                feedback.correct
                  ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                  : 'bg-red-500/20 border border-red-500/50 text-red-300'
              }`}>
                {feedback.message}
              </div>
            )}
          </div>
        )}
      </div>
    </ChamberLayout>
  );
}
