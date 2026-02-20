import React, { useState, useEffect, useMemo } from 'react';
import { SC106Quest } from '@/lib/sc1-06-types';
import { ChemicalFormula } from '@/lib/sc1-06-latex';
import {
  calculateAtomCounts,
  isEquationBalanced,
  identifyUnbalancedElements,
  validateCoefficient
} from '@/lib/sc1-06-utils';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';

interface EquationBalancerProps {
  quest: SC106Quest;
  onComplete: (correct: boolean) => void;
  t: (key: string) => string;
}

export function EquationBalancer({ quest, onComplete, t }: EquationBalancerProps) {
  const totalCompounds = quest.equation.reactants.length + quest.equation.products.length;
  const [coefficients, setCoefficients] = useState<number[]>(Array(totalCompounds).fill(1));
  const [inputValues, setInputValues] = useState<string[]>(Array(totalCompounds).fill('1'));
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  // Sync state when quest changes
  useEffect(() => {
    const total = quest.equation.reactants.length + quest.equation.products.length;
    setCoefficients(Array(total).fill(1));
    setInputValues(Array(total).fill('1'));
    setFeedback('');
    setSubmitted(false);
    setShowHint(false);
  }, [quest]);

  const atomCounts = calculateAtomCounts(quest.equation, coefficients);
  const balanced = isEquationBalanced(atomCounts);
  const unbalancedElements = identifyUnbalancedElements(atomCounts);

  const handleCoefficientChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    const validation = validateCoefficient(value);
    if (validation.valid && validation.value) {
      const newCoefficients = [...coefficients];
      newCoefficients[index] = validation.value;
      setCoefficients(newCoefficients);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (balanced) {
      setFeedback(t('sc1_06.feedback.balanced'));
      onComplete(true);
    } else {
      setFeedback(t('sc1_06.feedback.unbalanced'));
      onComplete(false);
    }
  };

  const handleReset = () => {
    const total = quest.equation.reactants.length + quest.equation.products.length;
    setCoefficients(Array(total).fill(1));
    setInputValues(Array(total).fill('1'));
    setShowHint(false);
    setFeedback('');
    setSubmitted(false);
  };

  const generateHint = (): string => {
    if (balanced) return t('sc1_06.feedback.balanced');
    if (unbalancedElements.length === 0) return t('sc1_06.feedback.check_elements');

    const element = unbalancedElements[0];
    const counts = atomCounts.get(element);
    if (!counts) return "";

    const diff = counts.reactants - counts.products;
    return diff > 0
      ? `${t('sc1_06.hints.increase_products') || "Increase Reactants"} (${element})`
      : `${t('sc1_06.hints.increase_reactants') || "Increase Products"} (${element})`;
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <Beaker className="w-24 h-24 rotate-12" />
        </div>

        <h3 className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase mb-8">
          {t('sc1_06.stages.equation_balancing')}
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-6 mb-12 py-8 bg-black/20 rounded-2xl border border-white/5">
          {quest.equation.reactants.map((compound, index) => (
            <React.Fragment key={`reactant-${index}`}>
              {index > 0 && <span className="text-3xl font-light opacity-30">+</span>}
              <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/10 group-hover:border-white/20 transition-colors">
                <input
                  type="text"
                  value={inputValues[index]}
                  onChange={(e) => handleCoefficientChange(index, e.target.value)}
                  className="w-14 h-14 text-2xl font-mono text-center bg-black border-2 border-white/10 rounded-lg focus:border-blue-500 focus:outline-none transition-all hover:bg-white/5"
                  placeholder="1"
                />
                <div className="text-2xl px-2">
                  <ChemicalFormula latex={compound.formulaLatex} />
                </div>
              </div>
            </React.Fragment>
          ))}

          <span className="text-4xl font-light opacity-50 mx-4">→</span>

          {quest.equation.products.map((compound, index) => {
            const productIndex = quest.equation.reactants.length + index;
            return (
              <React.Fragment key={`product-${index}`}>
                {index > 0 && <span className="text-3xl font-light opacity-30">+</span>}
                <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/10 group-hover:border-white/20 transition-colors">
                  <input
                    type="text"
                    value={inputValues[productIndex]}
                    onChange={(e) => handleCoefficientChange(productIndex, e.target.value)}
                    className="w-14 h-14 text-2xl font-mono text-center bg-black border-2 border-white/10 rounded-lg focus:border-blue-500 focus:outline-none transition-all hover:bg-white/5"
                    placeholder="1"
                  />
                  <div className="text-2xl px-2">
                    <ChemicalFormula latex={compound.formulaLatex} />
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-6 py-4 text-[10px] font-black tracking-widest text-white/40 uppercase font-mono">
                  {t('sc1_06.atomCount.element')}
                </th>
                <th className="px-6 py-4 text-[10px] font-black tracking-widest text-white/40 uppercase font-mono text-center">
                  {t('sc1_06.atomCount.reactants')}
                </th>
                <th className="px-6 py-4 text-[10px] font-black tracking-widest text-white/40 uppercase font-mono text-center">
                  {t('sc1_06.atomCount.products')}
                </th>
                <th className="px-6 py-4 text-[10px] font-black tracking-widest text-white/40 uppercase font-mono text-center">
                  {t('sc1_06.atomCount.balanced')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {Array.from(atomCounts.entries()).map(([element, counts]) => {
                const isBalanced = counts.reactants === counts.products;
                return (
                  <motion.tr
                    key={element}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={clsx(
                      "transition-colors",
                      isBalanced ? "bg-green-500/5 hover:bg-green-500/10" : "bg-red-500/5 hover:bg-red-500/10"
                    )}
                  >
                    <td className="px-6 py-4 font-mono font-bold text-lg">{element}</td>
                    <td className="px-6 py-4 text-center font-mono text-xl text-blue-400">{counts.reactants}</td>
                    <td className="px-6 py-4 text-center font-mono text-xl text-purple-400">{counts.products}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        {isBalanced ? (
                          <CheckCircle2 className="w-6 h-6 text-neon-green" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-orange-500" />
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex gap-4 backdrop-blur-md"
          >
            <HelpCircle className="w-6 h-6 text-blue-400 shrink-0" />
            <div className="space-y-1">
              <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase">Analysis Tip</span>
              <p className="text-white/80 italic font-light">{generateHint()}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-4 justify-center pt-6">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/20 hover:bg-white/10 text-[10px] font-black tracking-widest uppercase transition-all rounded-full"
        >
          <HelpCircle className="w-4 h-4" />
          {showHint ? t('sc1_06.ui.hide_hint') || "Hide Tip" : t('sc1_06.ui.hint') || "Show Tip"}
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/20 hover:bg-white/10 text-[10px] font-black tracking-widest uppercase transition-all rounded-full"
        >
          <RotateCcw className="w-4 h-4" />
          {t('sc1_06.ui.reset')}
        </button>

        <button
          onClick={handleSubmit}
          className="px-10 py-4 bg-white text-black text-[10px] font-black tracking-widest uppercase hover:bg-neon-green transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-neon rounded-full"
        >
          {t('sc1_06.ui.submit')}
        </button>
      </div>
    </div>
  );
}

const Beaker = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 3h15" /><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" /><path d="M6 14h12" />
  </svg>
);
