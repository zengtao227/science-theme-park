/**
 * SC1.06 Chemical Reactions Basics - Main Page Component
 * 
 * This page integrates all components for the Chemical Reactions module:
 * - EquationBalancer for EQUATION_BALANCING stage
 * - ReactionTypeSelector for REACTION_TYPES stage
 * - Simple placeholder for REACTION_SIMULATION stage
 * 
 * Requirements: 9.1, 14.1, 14.2, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 14.3, 14.6, 14.7
 */

'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { useLanguage } from '@/lib/i18n';
import { useQuestManager, Difficulty } from '@/hooks/useQuestManager';
import ChamberLayout from '@/components/layout/ChamberLayout';
import { EquationBalancer } from '@/components/sc1-06/EquationBalancer';
import { ReactionTypeSelector } from '@/components/sc1-06/ReactionTypeSelector';
import { SC106Quest, Stage } from '@/lib/sc1-06-types';
import { buildStagePool } from '@/lib/sc1-06-quest-builder';
import { ChemicalFormula } from '@/lib/sc1-06-latex';

export default function SC106Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();
  
  // Track completion state for each stage component
  const [componentCompleted, setComponentCompleted] = useState(false);

  // Build quest pool callback
  const buildPoolCallback = useCallback(
    (d: Difficulty, s: Stage) => buildStagePool(t, d, s),
    [t]
  );

  const {
    difficulty,
    stage,
    lastCheck,
    currentQuest,
    next,
    handleDifficultyChange,
    handleStageChange,
  } = useQuestManager<SC106Quest, Stage>({
    buildPool: buildPoolCallback,
    initialStage: 'REACTION_TYPES',
  });

  // Reset component completion when quest changes
  useEffect(() => {
    setComponentCompleted(false);
  }, [currentQuest]);

  // Handle stage completion
  useEffect(() => {
    if (componentCompleted) {
      completeStage('sc1-06', stage);
    }
  }, [componentCompleted, completeStage, stage]);

  // Handle component completion callback
  const handleComplete = useCallback((correct: boolean) => {
    if (correct) {
      setComponentCompleted(true);
    }
  }, []);

  // Get current scenario based on stage
  const getCurrentScenario = () => {
    if (!currentQuest) return '';
    return currentQuest.baselContext || '';
  };

  // Get stage-specific prompt
  const getStagePrompt = () => {
    switch (stage) {
      case 'REACTION_TYPES':
        return t('sc1-06.prompts.classify_reaction');
      case 'EQUATION_BALANCING':
        return t('sc1-06.prompts.balance_equation');
      case 'REACTION_SIMULATION':
        return t('sc1-06.prompts.observe_simulation');
      default:
        return t('sc1-06.prompts.analyze_reaction');
    }
  };

  // Render stage-specific content
  const renderStageContent = () => {
    if (!currentQuest) {
      return (
        <div className="text-center text-white/60 py-12">
          {t('sc1-06.loading')}
        </div>
      );
    }

    switch (stage) {
      case 'REACTION_TYPES':
        return (
          <ReactionTypeSelector
            quest={currentQuest}
            onComplete={handleComplete}
            t={t}
          />
        );

      case 'EQUATION_BALANCING':
        return (
          <EquationBalancer
            quest={currentQuest}
            onComplete={handleComplete}
            t={t}
          />
        );

      case 'REACTION_SIMULATION':
        return (
          <ReactionSimulationPlaceholder
            quest={currentQuest}
            onComplete={handleComplete}
            t={t}
          />
        );

      default:
        return null;
    }
  };

  return (
    <ChamberLayout
      title={t('sc1-06.title')}
      moduleCode="SC1.06"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: 'REACTION_TYPES', label: t('sc1-06.stages.reaction_types') },
        { id: 'EQUATION_BALANCING', label: t('sc1-06.stages.equation_balancing') },
        { id: 'REACTION_SIMULATION', label: t('sc1-06.stages.reaction_simulation') },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => {}} // Verification handled by stage components
      onNext={next}
      checkStatus={componentCompleted ? { ok: true, correct: '' } : null}
      footerLeft={t('sc1-06.footer_left')}
      translations={{
        back: t('sc1-06.back'),
        check: t('sc1-06.check'),
        next: t('sc1-06.next'),
        correct: t('sc1-06.correct'),
        incorrect: t('sc1-06.incorrect'),
        ready: t('sc1-06.ready'),
        monitor_title: t('sc1-06.monitor_title'),
        difficulty: {
          basic: t('sc1-06.difficulty.basic'),
          core: t('sc1-06.difficulty.core'),
          advanced: t('sc1-06.difficulty.advanced'),
          elite: t('sc1-06.difficulty.elite'),
        },
      }}
      monitorContent={
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {t('sc1-06.visualization.title')}
          </h3>
          <div className="text-white/70 text-sm">
            {t('sc1-06.visualization.description')}
          </div>
          {currentQuest && (
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-xs text-white/60 uppercase tracking-wider mb-2">
                {t('sc1-06.visualization.current_equation')}
              </div>
              <div className="text-center text-xl">
                <ChemicalFormula latex={currentQuest.equationLatex} />
              </div>
            </div>
          )}
        </div>
      }
    >
      <div className="space-y-8">
        {/* Mission Header */}
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t('sc1-06.mission.title')}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t('sc1-06.mission.description')}
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
            {t('sc1-06.objective_title')}
          </h3>
          <p className="text-2xl text-white font-semibold">
            {getStagePrompt()}
          </p>
        </div>

        {/* Stage-Specific Content */}
        <div className="max-w-5xl mx-auto">
          {renderStageContent()}
        </div>
      </div>
    </ChamberLayout>
  );
}

/**
 * Simple placeholder component for REACTION_SIMULATION stage
 * 
 * This is a minimal implementation that shows the equation and a complete button.
 * The full molecular simulator will be implemented later (Tasks 13, 15, 16).
 */
function ReactionSimulationPlaceholder({
  quest,
  onComplete,
  t,
}: {
  quest: SC106Quest;
  onComplete: (correct: boolean) => void;
  t: (key: string) => string;
}) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    onComplete(true);
  };

  return (
    <div className="space-y-6">
      {/* Equation Display */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
        <h3 className="text-lg font-semibold mb-6 text-center">
          {t('sc1-06.reaction_simulation.title')}
        </h3>
        
        {/* Display the equation */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 text-3xl">
          {/* Reactants */}
          {quest.equation.reactants.map((compound, index) => (
            <div key={`reactant-${index}`} className="flex items-center gap-3">
              {index > 0 && <span className="text-2xl">+</span>}
              <ChemicalFormula latex={compound.formulaLatex} />
            </div>
          ))}
          
          {/* Arrow */}
          <span className="text-3xl mx-4">→</span>
          
          {/* Products */}
          {quest.equation.products.map((compound, index) => (
            <div key={`product-${index}`} className="flex items-center gap-3">
              {index > 0 && <span className="text-2xl">+</span>}
              <ChemicalFormula latex={compound.formulaLatex} />
            </div>
          ))}
        </div>

        {/* Placeholder message */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
          <p className="text-blue-800 dark:text-blue-200 text-center">
            {t('sc1-06.reaction_simulation.placeholder_message')}
          </p>
        </div>

        {/* Energy change indicator */}
        {quest.energyChange && (
          <div className="text-center mb-6">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
              quest.energyChange === 'exothermic'
                ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                : 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
            }`}>
              {quest.energyChange === 'exothermic'
                ? t('sc1-06.reaction_simulation.exothermic')
                : t('sc1-06.reaction_simulation.endothermic')}
            </span>
          </div>
        )}
      </div>

      {/* Complete Button */}
      <div className="flex justify-center">
        <button
          onClick={handleComplete}
          disabled={completed}
          className={`px-8 py-3 rounded-lg font-semibold transition-colors min-h-[44px] ${
            completed
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
          }`}
        >
          {completed
            ? t('sc1-06.reaction_simulation.completed')
            : t('sc1-06.reaction_simulation.complete')}
        </button>
      </div>

      {/* Feedback */}
      {completed && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
          <p className="text-green-800 dark:text-green-200 font-semibold">
            {t('sc1-06.reaction_simulation.success')}
          </p>
        </div>
      )}
    </div>
  );
}
