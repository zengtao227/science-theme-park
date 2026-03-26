"use client";

import React from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { StepBySolverProps } from '@/lib/sm2-09-types';

export const StepBySolver: React.FC<StepBySolverProps> = ({
    quest,
    visible,
    translations
}) => {
    if (!visible || !quest.steps || quest.steps.length === 0) {
        return null;
    }

    return (
        <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-blue-300 dark:border-blue-700">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {translations.step} {translations.justification}
            </h3>
            
            <div className="space-y-4">
                {quest.steps.map((step, index) => (
                    <div 
                        key={index}
                        className={`p-4 rounded-lg ${
                            step.reversesInequality 
                                ? 'bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-600' 
                                : 'bg-white dark:bg-gray-700'
                        }`}
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-20 font-bold text-gray-700 dark:text-gray-300">
                                {translations.step} {step.stepNumber}:
                            </div>
                            <div className="flex-1">
                                <div className="mb-2">
                                    <BlockMath math={step.expressionLatex} />
                                </div>
                                <div className={`text-sm ${
                                    step.reversesInequality 
                                        ? 'text-red-700 dark:text-red-300 font-semibold' 
                                        : 'text-gray-600 dark:text-gray-400'
                                }`}>
                                    {step.justification}
                                    {step.reversesInequality && (
                                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200">
                                            ⚠️ Inequality direction reversed
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* Final Solution */}
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-400 dark:border-green-600">
                    <div className="font-bold text-green-800 dark:text-green-300 mb-2">
                        {translations.final_solution}:
                    </div>
                    <div className="text-lg">
                        <BlockMath math={quest.correctLatex} />
                    </div>
                </div>
            </div>
        </div>
    );
};
