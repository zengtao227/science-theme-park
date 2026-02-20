import React, { useState } from 'react';
import { SC106Quest, ReactionType } from '@/lib/sc1-06-types';
import { ChemicalFormula } from '@/lib/sc1-06-latex';
import { classifyReaction, analyzeReactionPattern } from '@/lib/sc1-06-utils';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Info, CheckCircle2, AlertCircle } from 'lucide-react';

interface ReactionTypeSelectorProps {
  quest: SC106Quest;
  onComplete: (correct: boolean) => void;
  t: (key: string) => string;
}

export function ReactionTypeSelector({ quest, onComplete, t }: ReactionTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<ReactionType | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string>('');

  const correctType = quest.reactionType || classifyReaction(quest.equation);
  const patternAnalysis = analyzeReactionPattern(quest.equation);

  const reactionTypes: Array<{
    type: ReactionType;
    pattern: string;
    description: string;
  }> = [
      {
        type: 'synthesis',
        pattern: 'A + B → AB',
        description: t('sc1_06.reactionTypeDescriptions.synthesis')
      },
      {
        type: 'decomposition',
        pattern: 'AB → A + B',
        description: t('sc1_06.reactionTypeDescriptions.decomposition')
      },
      {
        type: 'single_replacement',
        pattern: 'A + BC → AC + B',
        description: t('sc1_06.reactionTypeDescriptions.single_replacement')
      },
      {
        type: 'double_replacement',
        pattern: 'AB + CD → AD + CB',
        description: t('sc1_06.reactionTypeDescriptions.double_replacement')
      },
      {
        type: 'combustion',
        pattern: 'CₓHᵧ + O₂ → CO₂ + H₂O',
        description: t('sc1_06.reactionTypeDescriptions.combustion')
      }
    ];

  const handleTypeSelect = (type: ReactionType) => {
    setSelectedType(type);
    setSubmitted(false);
    setFeedback('');
  };

  const handleSubmit = () => {
    if (!selectedType) return;

    setSubmitted(true);
    if (selectedType === correctType) {
      setFeedback(t('sc1_06.feedback.correct'));
      onComplete(true);
    } else {
      setFeedback(t('sc1_06.feedback.incorrect'));
      onComplete(false);
    }
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Equation Display */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Target className="w-24 h-24" />
        </div>

        <h3 className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase mb-8">
          {t('sc1_06.stages.reaction_types')}
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-6 py-10 bg-black/40 rounded-2xl border border-white/5 mb-8 shadow-inner">
          {quest.equation.reactants.map((compound, index) => (
            <React.Fragment key={`reactant-${index}`}>
              {index > 0 && <span className="text-3xl font-light opacity-30">+</span>}
              <div className="text-3xl font-bold tracking-tight">
                <ChemicalFormula latex={compound.formulaLatex} />
              </div>
            </React.Fragment>
          ))}

          <span className="text-4xl font-light opacity-50 mx-4">→</span>

          {quest.equation.products.map((compound, index) => (
            <React.Fragment key={`product-${index}`}>
              {index > 0 && <span className="text-3xl font-light opacity-30">+</span>}
              <div className="text-3xl font-bold tracking-tight text-white/90">
                <ChemicalFormula latex={compound.formulaLatex} />
              </div>
            </React.Fragment>
          ))}
        </div>

        <p className="text-center text-white/60 font-light italic text-lg decoration-blue-500/30">
          {t('sc1_06.prompts.classify_reaction')}
        </p>
      </div>

      {/* Grid of Reaction Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reactionTypes.map(({ type, pattern, description }) => (
          <motion.div
            key={type}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleTypeSelect(type)}
            className={clsx(
              "p-6 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden group/card",
              selectedType === type
                ? "bg-white/10 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                : "bg-white/5 border-white/5 hover:border-white/20"
            )}
          >
            {selectedType === type && (
              <motion.div
                layoutId="active-bg"
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent"
              />
            )}

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-white/90 text-lg">
                  {t(`sc1_06.reactionTypes.${type}`)}
                </h4>
                <div className="px-2 py-1 bg-white/10 rounded text-[10px] font-mono font-bold text-white/40 tracking-widest uppercase">
                  {pattern}
                </div>
              </div>

              <p className="text-sm text-white/50 leading-relaxed font-light mb-6 flex-grow">
                {description}
              </p>

              <div className="flex items-center gap-2 mt-auto">
                <div className={clsx(
                  "w-4 h-4 rounded-full border-2 transition-all",
                  selectedType === type ? "bg-white border-white" : "border-white/20"
                )} />
                <span className={clsx(
                  "text-[8px] font-black tracking-widest uppercase transition-colors",
                  selectedType === type ? "text-white" : "text-white/20"
                )}>
                  {selectedType === type ? "Selected" : "Select"}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feedback Area */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={clsx(
              "p-8 rounded-3xl border flex flex-col md:flex-row gap-8 items-start relative overflow-hidden backdrop-blur-xl",
              selectedType === correctType
                ? "bg-neon-green/10 border-neon-green/30 text-neon-green"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            )}
          >
            <div className={clsx(
              "p-4 rounded-2xl shrink-0",
              selectedType === correctType ? "bg-neon-green/20" : "bg-red-500/20"
            )}>
              {selectedType === correctType ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <AlertCircle className="w-8 h-8" />
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60 mb-1">System Verification</h4>
                <p className="text-2xl font-black">{feedback}</p>
              </div>

              <div className="space-y-3 p-6 bg-black/40 rounded-2xl border border-white/5">
                <div className="flex gap-4 items-start">
                  <Info className="w-5 h-5 text-white/40 shrink-0 mt-1" />
                  <div>
                    <h5 className="text-[10px] font-black tracking-widest uppercase text-white/40 mb-2">Scientific Explanation</h5>
                    <p className="text-sm text-white/80 leading-relaxed font-light">
                      {patternAnalysis.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <span className="text-[8px] font-black tracking-widest text-white/20 uppercase">Pattern Match</span>
                  <div className="px-3 py-1 bg-white/5 rounded-lg text-sm font-mono text-white/60">
                    {patternAnalysis.pattern}
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -bottom-10 -right-10 opacity-5">
              <Info className="w-48 h-48" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center pt-8">
        <button
          onClick={handleSubmit}
          disabled={!selectedType || (submitted && selectedType === correctType)}
          className={clsx(
            "px-16 py-5 rounded-full text-[10px] font-black tracking-[0.4em] uppercase transition-all shadow-2xl",
            (!selectedType || (submitted && selectedType === correctType))
              ? "bg-white/5 text-white/20 cursor-not-allowed"
              : "bg-white text-black hover:bg-neon-green hover:shadow-neon cursor-pointer"
          )}
        >
          {t('sc1_06.ui.verify') || "Verify Classification"}
        </button>
      </div>
    </div>
  );
}
