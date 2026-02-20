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

import { useCallback, useEffect, useState, useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import { useLanguage } from '@/lib/i18n';
import { useQuestManager, Difficulty } from '@/hooks/useQuestManager';
import ChamberLayout from '@/components/layout/ChamberLayout';
import { EquationBalancer } from '@/components/sc1-06/EquationBalancer';
import { ReactionTypeSelector } from '@/components/sc1-06/ReactionTypeSelector';
import { SC106Quest, Stage } from '@/lib/sc1-06-types';
import { buildStagePool } from '@/lib/sc1-06-quest-builder';
import { ChemicalFormula } from '@/lib/sc1-06-latex';
import ChemicalReaction3D from '@/components/sc1-06/ChemicalReaction3D';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Beaker, Zap, Info } from 'lucide-react';
import { clsx } from 'clsx';

export default function SC106Page() {
  const { completeStage, currentLanguage } = useAppStore();
  const { t } = useLanguage();

  // Track completion state for each stage component
  const [componentCompleted, setComponentCompleted] = useState(false);
  const [isReacted, setIsReacted] = useState(false);

  // Build quest pool callback
  const buildPoolCallback = useCallback(
    (d: Difficulty, s: Stage) => buildStagePool(t, d, s),
    [t]
  );

  const {
    difficulty,
    stage,
    nonce,
    lastCheck,
    currentQuest,
    pool,
    successRate,
    currentStageStats,
    getHint,
    getCurrentErrorCount,
    next,
    handleDifficultyChange,
    handleStageChange,
    verify, adaptiveRecommendation,
  } = useQuestManager<SC106Quest, Stage>({
    moduleCode: "sc1-06",
    buildPool: buildPoolCallback,
    initialStage: 'REACTION_TYPES',
  });

  const hint = getHint();
  const errorCount = getCurrentErrorCount();

  // Reset states when quest or stage changes
  useEffect(() => {
    setComponentCompleted(false);
    setIsReacted(false);
  }, [currentQuest, stage]);

  // Handle stage completion for persistence
  useEffect(() => {
    if (componentCompleted) {
      completeStage('sc1_06', stage);
    }
  }, [componentCompleted, completeStage, stage]);

  // Handle component completion callback
  const handleComplete = useCallback((correct: boolean) => {
    if (correct) {
      setComponentCompleted(true);
      setIsReacted(true);
    }
  }, []);

  const getCurrentScenario = () => {
    if (!currentQuest) return '';
    const translated = t(`sc1_06.scenarios.${currentQuest?.id}`);
    if (translated !== `sc1_06.scenarios.${currentQuest?.id}`) return translated;
    return currentQuest?.baselContext || '';
  };

  const getStagePrompt = () => {
    switch (stage) {
      case 'REACTION_TYPES':
        return t('sc1_06.prompts.classify_reaction');
      case 'EQUATION_BALANCING':
        return t('sc1_06.prompts.balance_equation');
      case 'REACTION_SIMULATION':
        return t('sc1_06.prompts.observe_simulation');
      default:
        return t('sc1_06.prompts.analyze_reaction');
    }
  };

  const renderStageContent = () => {
    if (!currentQuest) {
      return (
        <div className="text-center text-white/60 py-12 animate-pulse font-mono tracking-widest">
          {t('sc1_06.loading') || "INITIALIZING SYSTEM..."}
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
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
              <div className="flex flex-col items-center gap-8">
                <div className="text-center space-y-4">
                  <h4 className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">
                    {t('sc1_06.reaction_simulation.molecular_field') || "Molecular Interaction Field"}
                  </h4>
                  <div className="flex items-center justify-center gap-6 text-2xl lg:text-4xl font-light">
                    {currentQuest?.equation.reactants.map((c, i) => (
                      <div key={i} className="flex items-center gap-4">
                        {i > 0 && <span className="opacity-30">+</span>}
                        <span className="text-blue-400 font-mono"><ChemicalFormula latex={c.formulaLatex} /></span>
                      </div>
                    ))}
                    <motion.span
                      animate={{ x: isReacted ? [0, 5, 0] : 0 }}
                      className="opacity-50 mx-4"
                    >→</motion.span>
                    {currentQuest?.equation.products.map((c, i) => (
                      <div key={i} className="flex items-center gap-4">
                        {i > 0 && <span className="opacity-30">+</span>}
                        <span className={isReacted ? "text-neon-green font-mono" : "opacity-20 blur-sm grayscale font-mono"}>
                          <ChemicalFormula latex={c.formulaLatex} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {!isReacted ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleComplete(true)}
                    className="px-10 py-4 bg-white text-black text-[10px] font-black tracking-[0.4em] uppercase rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all"
                  >
                    {t('sc1_06.reaction_simulation.trigger') || "Trigger Reaction"}
                  </motion.button>
                ) : (
                  <div className="flex items-center gap-3 text-neon-green bg-neon-green/10 border border-neon-green/30 px-6 py-3 rounded-full animate-in fade-in zoom-in duration-500">
                    <Zap className="w-4 h-4 fill-current" />
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase">
                      {t('sc1_06.reaction_simulation.success') || "REACTION STABLE"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Mechanism details for Advanced/Elite */}
            {(difficulty === 'ADVANCED' || difficulty === 'ELITE') && isReacted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 border border-white/10 rounded-xl bg-white/[0.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Info className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black tracking-[0.2em] text-white/50 uppercase mb-2">Mechanism Insights</h5>
                    <p className="text-sm text-white/80 leading-relaxed italic">
                      {currentQuest?.energyChange === 'exothermic'
                        ? "This reaction releases stored chemical potential energy as heat. Bond formation in products is more energetically favorable than the bonds broken in reactants."
                        : "This process requires continuous energy input to overcome the high activation barrier and break the strong reactant bonds."}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      title={t('sc1_06.title')}
      moduleCode="SC1.06"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: 'REACTION_TYPES', label: t('sc1_06.stages.reaction_types') },
        { id: 'EQUATION_BALANCING', label: t('sc1_06.stages.equation_balancing') },
        { id: 'REACTION_SIMULATION', label: t('sc1_06.stages.reaction_simulation') },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      successRate={successRate}
      checkStatus={componentCompleted ? { ok: true, correct: '' } : lastCheck}
      footerLeft={t('sc1_06.footer_left')}
      translations={{
        back: t('sc1_06.back'),
        check: t('sc1_06.check'),
        next: t('sc1_06.next'),
        correct: t('sc1_06.correct'),
        incorrect: t('sc1_06.incorrect'),
        ready: t('sc1_06.ready'),
        monitor_title: t('sc1_06.monitor_title'),
        difficulty: {
          basic: t('sc1_06.difficulty.basic'),
          core: t('sc1_06.difficulty.core'),
          advanced: t('sc1_06.difficulty.advanced'),
          elite: t('sc1_06.difficulty.elite'),
        },
      }}
      monitorContent={
        <div className="flex flex-col h-full gap-6">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">
              {t('sc1_06.visualization.title') || "MOLECULAR MONITOR"}
            </h3>

            <div className="h-[400px] w-full">
              <ChemicalReaction3D
                reactants={currentQuest?.reactants || []}
                products={currentQuest?.products || []}
                isReacted={isReacted}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center gap-2 mb-2 text-white/40">
                <Activity className="w-3 h-3" />
                <span className="text-[8px] font-black tracking-widest uppercase">Kinetics</span>
              </div>
              <div className="text-lg font-mono tracking-tighter">1.2e-4 M/s</div>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center gap-2 mb-2 text-white/40">
                <Zap className="w-3 h-3" />
                <span className="text-[8px] font-black tracking-widest uppercase">Enthalpy</span>
              </div>
              <div className="text-lg font-mono tracking-tighter">
                {currentQuest?.energyChange === 'exothermic' ? "-482 kJ" : "+125 kJ"}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Top Progress & Stats Bar */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">
                {t('sp1_01.labels.progress') || "PROGRESS"}
              </span>
              <span className="text-sm font-bold text-white/80 font-mono">
                {Math.round((nonce / (pool.length || 1)) * 100)}%
              </span>
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black tracking-widest text-white/30 uppercase">{t('common.mastery') || "MASTERY"}</span>
                <span className={clsx(
                  "text-xs font-black font-mono",
                  successRate > 0.8 ? "text-neon-green" : successRate > 0.5 ? "text-yellow-400" : "text-white/60"
                )}>
                  {Math.round(successRate * 100)}%
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black tracking-widest text-white/30 uppercase">{t('common.attempts') || "ATTEMPTS"}</span>
                <span className="text-xs font-black text-white/80 font-mono">{currentStageStats.attempts}</span>
              </div>
            </div>
          </div>

          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(nonce / (pool.length || 1)) * 100}%` }}
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-white shadow-[0_0_15px_rgba(99,102,241,0.5)]"
            />
          </div>
        </div>

        {/* Mission Content Area */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-sm">
              <Beaker className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase">
                ID: {currentQuest?.id}
              </span>
              {errorCount > 0 && (
                <span className="ml-2 text-[8px] font-bold bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30">
                  {t('common.failed_attempts') || "FAIL"} : {errorCount}
                </span>
              )}
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Scenario Description */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-light tracking-wide italic">
                {getCurrentScenario()}
              </p>
            </div>
          </div>

          {/* Quest Content Section */}
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-light text-white/90 tracking-tight">
                {getStagePrompt()}
              </p>
            </div>

            <div className="max-w-4xl mx-auto py-8">
              {renderStageContent()}
            </div>

            {/* Hint Box */}
            <AnimatePresence>
              {hint && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="max-w-2xl mx-auto p-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-md"
                >
                  <div className="flex gap-4">
                    <div className="p-2 bg-yellow-500/20 rounded-lg h-fit">
                      <Info className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[10px] font-black tracking-[0.2em] text-yellow-500/60 uppercase">System Guidance</h4>
                      <p className="text-sm text-yellow-200/80 leading-relaxed">
                        {hint}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
