/**
 * SC1.06 Chemical Reactions Basics - ReactionTypeSelector Component
 * 
 * Interactive tool for classifying reaction types with:
 * - Radio buttons for five reaction types
 * - Display of reaction patterns (e.g., "A + B → AB")
 * - Examples from daily life and industry
 * - Immediate visual feedback on selection
 * - Submit button to verify answer
 * - Success/error feedback with explanation
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8
 */

'use client';

import React, { useState } from 'react';
import { SC106Quest, ReactionType } from '@/lib/sc1-06-types';
import { ChemicalFormula } from '@/lib/sc1-06-latex';
import { classifyReaction, analyzeReactionPattern } from '@/lib/sc1-06-utils';

interface ReactionTypeSelectorProps {
  quest: SC106Quest;
  onComplete: (correct: boolean) => void;
  t: (key: string) => string;
}

export function ReactionTypeSelector({ quest, onComplete, t }: ReactionTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<ReactionType | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string>('');

  // Get the correct reaction type from the quest
  const correctType = quest.reactionType || classifyReaction(quest.equation);
  
  // Get pattern analysis for display
  const patternAnalysis = analyzeReactionPattern(quest.equation);

  // Define reaction types with their patterns and examples
  const reactionTypes: Array<{
    type: ReactionType;
    pattern: string;
    description: string;
    examples: string[];
  }> = [
    {
      type: 'synthesis',
      pattern: 'A + B → AB',
      description: t('sc1-06.reaction_types.synthesis_description'),
      examples: [
        t('sc1-06.reaction_types.synthesis_example_1'),
        t('sc1-06.reaction_types.synthesis_example_2')
      ]
    },
    {
      type: 'decomposition',
      pattern: 'AB → A + B',
      description: t('sc1-06.reaction_types.decomposition_description'),
      examples: [
        t('sc1-06.reaction_types.decomposition_example_1'),
        t('sc1-06.reaction_types.decomposition_example_2')
      ]
    },
    {
      type: 'single_replacement',
      pattern: 'A + BC → AC + B',
      description: t('sc1-06.reaction_types.single_replacement_description'),
      examples: [
        t('sc1-06.reaction_types.single_replacement_example_1'),
        t('sc1-06.reaction_types.single_replacement_example_2')
      ]
    },
    {
      type: 'double_replacement',
      pattern: 'AB + CD → AD + CB',
      description: t('sc1-06.reaction_types.double_replacement_description'),
      examples: [
        t('sc1-06.reaction_types.double_replacement_example_1'),
        t('sc1-06.reaction_types.double_replacement_example_2')
      ]
    },
    {
      type: 'combustion',
      pattern: 'CₓHᵧ + O₂ → CO₂ + H₂O',
      description: t('sc1-06.reaction_types.combustion_description'),
      examples: [
        t('sc1-06.reaction_types.combustion_example_1'),
        t('sc1-06.reaction_types.combustion_example_2')
      ]
    }
  ];

  // Handle type selection
  const handleTypeSelect = (type: ReactionType) => {
    setSelectedType(type);
    setSubmitted(false);
    setFeedback('');
  };

  // Handle submit
  const handleSubmit = () => {
    if (!selectedType) {
      setSubmitted(true);
      setFeedback(t('sc1-06.reaction_types.select_type_first'));
      return;
    }

    setSubmitted(true);
    
    if (selectedType === correctType) {
      setFeedback(t('sc1-06.reaction_types.correct'));
      onComplete(true);
    } else {
      const correctTypeName = t(`sc1-06.reaction_types.${correctType}`);
      setFeedback(t('sc1-06.reaction_types.incorrect') + ' ' + 
                  t('sc1-06.reaction_types.correct_type_is') + ' ' + correctTypeName);
      onComplete(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Chemical Equation Display */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('sc1-06.reaction_types.title')}</h3>
        
        {/* Display the equation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-2xl">
          {/* Reactants */}
          {quest.equation.reactants.map((compound, index) => (
            <React.Fragment key={`reactant-${index}`}>
              {index > 0 && <span>+</span>}
              <ChemicalFormula latex={compound.formulaLatex} />
            </React.Fragment>
          ))}
          
          {/* Arrow */}
          <span className="mx-2">→</span>
          
          {/* Products */}
          {quest.equation.products.map((compound, index) => (
            <React.Fragment key={`product-${index}`}>
              {index > 0 && <span>+</span>}
              <ChemicalFormula latex={compound.formulaLatex} />
            </React.Fragment>
          ))}
        </div>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          {t('sc1-06.reaction_types.classify_prompt')}
        </p>
      </div>

      {/* Reaction Type Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h4 className="text-md font-semibold mb-4">{t('sc1-06.reaction_types.select_type')}</h4>
        
        <div className="space-y-4">
          {reactionTypes.map(({ type, pattern, description, examples }) => (
            <div
              key={type}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedType === type
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
              onClick={() => handleTypeSelect(type)}
            >
              <div className="flex items-start gap-3">
                {/* Radio button */}
                <input
                  type="radio"
                  name="reaction-type"
                  checked={selectedType === type}
                  onChange={() => handleTypeSelect(type)}
                  className="mt-1 w-5 h-5 cursor-pointer"
                />
                
                <div className="flex-1">
                  {/* Type name and pattern */}
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-lg">
                      {t(`sc1-06.reaction_types.${type}`)}
                    </h5>
                    <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded">
                      {pattern}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {description}
                  </p>
                  
                  {/* Examples */}
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    <strong>{t('sc1-06.reaction_types.examples')}:</strong>
                    <ul className="list-disc list-inside ml-2 mt-1">
                      {examples.map((example, idx) => (
                        <li key={idx}>{example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`rounded-lg p-4 ${
          !selectedType || selectedType !== correctType
            ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
            : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
        }`}>
          {feedback}
          
          {/* Show explanation for correct answer */}
          {submitted && selectedType === correctType && (
            <div className="mt-3 pt-3 border-t border-green-300 dark:border-green-700">
              <p className="font-semibold mb-1">{t('sc1-06.reaction_types.explanation')}:</p>
              <p className="text-sm">{patternAnalysis.description}</p>
              <p className="text-sm mt-1">
                {t('sc1-06.reaction_types.pattern')}: <span className="font-mono">{patternAnalysis.pattern}</span>
              </p>
            </div>
          )}
          
          {/* Show correct answer for incorrect selection */}
          {submitted && selectedType && selectedType !== correctType && (
            <div className="mt-3 pt-3 border-t border-red-300 dark:border-red-700">
              <p className="font-semibold mb-1">{t('sc1-06.reaction_types.why_correct')}:</p>
              <p className="text-sm">{patternAnalysis.description}</p>
              <p className="text-sm mt-1">
                {t('sc1-06.reaction_types.pattern')}: <span className="font-mono">{patternAnalysis.pattern}</span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!selectedType}
          className={`px-8 py-3 rounded-lg font-semibold transition-colors min-h-[44px] ${
            selectedType
              ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
          }`}
        >
          {t('sc1-06.reaction_types.submit')}
        </button>
      </div>
    </div>
  );
}
