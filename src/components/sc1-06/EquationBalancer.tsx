/**
 * SC1.06 Chemical Reactions Basics - EquationBalancer Component
 * 
 * Interactive tool for balancing chemical equations with:
 * - Input fields for coefficients
 * - Real-time atom count updates
 * - Visual feedback (green/red for balanced/unbalanced)
 * - Hint generation
 * - Reset functionality
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 11.2, 11.6
 */

'use client';

import React, { useState, useEffect } from 'react';
import { SC106Quest } from '@/lib/sc1-06-types';
import { ChemicalFormula } from '@/lib/sc1-06-latex';
import { 
  calculateAtomCounts, 
  isEquationBalanced, 
  identifyUnbalancedElements,
  validateCoefficient 
} from '@/lib/sc1-06-utils';

interface EquationBalancerProps {
  quest: SC106Quest;
  onComplete: (correct: boolean) => void;
  t: (key: string) => string;
}

export function EquationBalancer({ quest, onComplete, t }: EquationBalancerProps) {
  // Initialize coefficients to 1 for all compounds
  const totalCompounds = quest.equation.reactants.length + quest.equation.products.length;
  const [coefficients, setCoefficients] = useState<number[]>(Array(totalCompounds).fill(1));
  const [inputValues, setInputValues] = useState<string[]>(Array(totalCompounds).fill('1'));
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  // Calculate atom counts in real-time
  const atomCounts = calculateAtomCounts(quest.equation, coefficients);
  const balanced = isEquationBalanced(atomCounts);
  const unbalancedElements = identifyUnbalancedElements(atomCounts);

  // Handle coefficient input change
  const handleCoefficientChange = (index: number, value: string) => {
    // Update input value immediately for display
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    // Validate and update coefficient
    const validation = validateCoefficient(value);
    if (validation.valid && validation.value) {
      const newCoefficients = [...coefficients];
      newCoefficients[index] = validation.value;
      setCoefficients(newCoefficients);
    }
  };

  // Handle submit
  const handleSubmit = () => {
    setSubmitted(true);
    
    if (balanced) {
      setFeedback(t('sc1-06.equation_balancer.correct'));
      onComplete(true);
    } else {
      setFeedback(t('sc1-06.equation_balancer.incorrect'));
      onComplete(false);
    }
  };

  // Handle reset
  const handleReset = () => {
    const resetCoefficients = Array(totalCompounds).fill(1);
    const resetInputs = Array(totalCompounds).fill('1');
    setCoefficients(resetCoefficients);
    setInputValues(resetInputs);
    setShowHint(false);
    setFeedback('');
    setSubmitted(false);
  };

  // Generate hint
  const generateHint = (): string => {
    if (balanced) {
      return t('sc1-06.equation_balancer.already_balanced');
    }

    if (unbalancedElements.length === 0) {
      return t('sc1-06.equation_balancer.no_hint');
    }

    // Pick the first unbalanced element
    const element = unbalancedElements[0];
    const counts = atomCounts.get(element);
    
    if (!counts) {
      return t('sc1-06.equation_balancer.no_hint');
    }

    const diff = counts.reactants - counts.products;
    
    if (diff > 0) {
      return `${t('sc1-06.equation_balancer.hint_increase_products')} (${element})`;
    } else {
      return `${t('sc1-06.equation_balancer.hint_increase_reactants')} (${element})`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Chemical Equation Display */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('sc1-06.equation_balancer.title')}</h3>
        
        {/* Equation with coefficient inputs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {/* Reactants */}
          {quest.equation.reactants.map((compound, index) => (
            <React.Fragment key={`reactant-${index}`}>
              {index > 0 && <span className="text-2xl">+</span>}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValues[index]}
                  onChange={(e) => handleCoefficientChange(index, e.target.value)}
                  className="w-16 h-12 text-center border-2 border-gray-300 dark:border-gray-600 rounded-md focus:border-blue-500 focus:outline-none"
                  placeholder="1"
                />
                <ChemicalFormula latex={compound.formulaLatex} />
              </div>
            </React.Fragment>
          ))}
          
          {/* Arrow */}
          <span className="text-2xl mx-2">→</span>
          
          {/* Products */}
          {quest.equation.products.map((compound, index) => (
            <React.Fragment key={`product-${index}`}>
              {index > 0 && <span className="text-2xl">+</span>}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValues[quest.equation.reactants.length + index]}
                  onChange={(e) => handleCoefficientChange(quest.equation.reactants.length + index, e.target.value)}
                  className="w-16 h-12 text-center border-2 border-gray-300 dark:border-gray-600 rounded-md focus:border-blue-500 focus:outline-none"
                  placeholder="1"
                />
                <ChemicalFormula latex={compound.formulaLatex} />
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Atom Count Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                <th className="px-4 py-2 text-left">{t('sc1-06.equation_balancer.element')}</th>
                <th className="px-4 py-2 text-center">{t('sc1-06.equation_balancer.reactants')}</th>
                <th className="px-4 py-2 text-center">{t('sc1-06.equation_balancer.products')}</th>
                <th className="px-4 py-2 text-center">{t('sc1-06.equation_balancer.status')}</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(atomCounts.entries()).map(([element, counts]) => {
                const isBalanced = counts.reactants === counts.products;
                return (
                  <tr 
                    key={element}
                    className={`border-b border-gray-200 dark:border-gray-700 ${
                      isBalanced 
                        ? 'bg-green-50 dark:bg-green-900/20' 
                        : 'bg-red-50 dark:bg-red-900/20'
                    }`}
                  >
                    <td className="px-4 py-2 font-semibold">{element}</td>
                    <td className="px-4 py-2 text-center">{counts.reactants}</td>
                    <td className="px-4 py-2 text-center">{counts.products}</td>
                    <td className="px-4 py-2 text-center">
                      {isBalanced ? (
                        <span className="text-green-600 dark:text-green-400">✓</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400">✗</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Overall Balance Status */}
        <div className="mt-4 text-center">
          {balanced ? (
            <div className="text-green-600 dark:text-green-400 font-semibold text-lg">
              {t('sc1-06.equation_balancer.balanced')}
            </div>
          ) : (
            <div className="text-red-600 dark:text-red-400 font-semibold text-lg">
              {t('sc1-06.equation_balancer.unbalanced')}
            </div>
          )}
        </div>
      </div>

      {/* Hint Section */}
      {showHint && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-blue-800 dark:text-blue-200">
            <strong>{t('sc1-06.equation_balancer.hint')}:</strong> {generateHint()}
          </p>
        </div>
      )}

      {/* Feedback */}
      {submitted && feedback && (
        <div className={`rounded-lg p-4 ${
          balanced 
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
            : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
        }`}>
          {feedback}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setShowHint(!showHint)}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors min-h-[44px]"
        >
          {showHint ? t('sc1-06.equation_balancer.hide_hint') : t('sc1-06.equation_balancer.show_hint')}
        </button>
        
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors min-h-[44px]"
        >
          {t('sc1-06.equation_balancer.reset')}
        </button>
        
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors min-h-[44px]"
        >
          {t('sc1-06.equation_balancer.submit')}
        </button>
      </div>
    </div>
  );
}
