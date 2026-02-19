'use client';

/**
 * SP1.01 - Forces Basics Module
 * Main page component
 */

import React, { useState, useEffect } from 'react';
import { Quest, Answer, Vector } from '@/lib/sp1-01/domain/types';
import { getQuestEngine } from '@/lib/sp1-01/domain/QuestEngine';
import { getLanguageManager, Language } from '@/lib/sp1-01/data/LanguageManager';
import { LaTeXText } from '@/components/chamber/sp1-01/LaTeXRenderer';
import { ForceVectorDiagram } from '@/components/chamber/sp1-01/ForceVectorDiagram';

export default function SP101ForcesBasicsPage() {
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [progress, setProgress] = useState<number>(0);

  const questEngine = getQuestEngine();
  const languageManager = getLanguageManager();

  // Load first quest on mount
  useEffect(() => {
    const firstQuest = questEngine.getFirstQuest();
    if (firstQuest) {
      setCurrentQuest(firstQuest);
      questEngine.loadQuest(firstQuest.id);
    }

    // Load language preference
    setLanguage(languageManager.getCurrentLanguage());

    // Subscribe to language changes
    const unsubscribe = languageManager.subscribe((lang) => {
      setLanguage(lang);
    });

    // Load progress
    questEngine.getOverallProgress().then(setProgress);

    return unsubscribe;
  }, []);

  const handleSubmit = async () => {
    if (!currentQuest || !answer) return;

    try {
      // Parse answer based on quest type
      let parsedAnswer: Answer;
      
      if (currentQuest.type === 'NUMERICAL') {
        parsedAnswer = {
          value: parseFloat(answer),
          units: currentQuest.validation.units,
        };
      } else if (currentQuest.type === 'VECTOR') {
        // Parse vector answer (e.g., "50, 30" or "magnitude: 50, angle: 30")
        const parts = answer.split(',').map(s => parseFloat(s.trim()));
        parsedAnswer = {
          value: parts.length === 2 ? { magnitude: parts[0], angle: parts[1] } as Vector : parseFloat(answer),
        };
      } else {
        // For MULTIPLE_CHOICE, try to parse as number, otherwise use 0
        parsedAnswer = { value: parseFloat(answer) || 0 };
      }

      const result = await questEngine.submitAnswer(parsedAnswer);
      
      setIsCorrect(result.isCorrect);
      setFeedback(languageManager.translateContent(result.feedback));

      if (result.isCorrect) {
        // Update progress
        const newProgress = await questEngine.getOverallProgress();
        setProgress(newProgress);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      setFeedback('Error submitting answer. Please try again.');
    }
  };

  const handleNextQuest = () => {
    const nextQuest = questEngine.getNextQuest();
    if (nextQuest) {
      setCurrentQuest(nextQuest);
      questEngine.loadQuest(nextQuest.id);
      setAnswer('');
      setFeedback('');
      setIsCorrect(null);
    }
  };

  const handlePreviousQuest = () => {
    const prevQuest = questEngine.getPreviousQuest();
    if (prevQuest) {
      setCurrentQuest(prevQuest);
      questEngine.loadQuest(prevQuest.id);
      setAnswer('');
      setFeedback('');
      setIsCorrect(null);
    }
  };

  const handleLanguageChange = (lang: Language) => {
    languageManager.setLanguage(lang);
  };

  if (!currentQuest) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900">
              {languageManager.translate('ui.title')}
            </h1>
            
            {/* Language Selector */}
            <div className="flex gap-2">
              {['en', 'cn', 'de'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang as Language)}
                  className={`px-3 py-1 rounded ${
                    language === lang
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {languageManager.translate('ui.progress')}: {progress.toFixed(0)}%
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Quest Info */}
          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                {languageManager.translate(`stages.${currentQuest.stage}`)}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded text-sm font-medium">
                {languageManager.translate(`difficulty.${currentQuest.difficulty}`)}
              </span>
            </div>

            {/* Quest Content */}
            <div className="text-lg mb-6">
              <LaTeXText className="leading-relaxed">
                {languageManager.translateContent(currentQuest.content)}
              </LaTeXText>
            </div>

            {/* Basel Scenario (if present) */}
            {currentQuest.scenario && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
                <h3 className="font-bold text-amber-900 mb-2">
                  {languageManager.translateContent(currentQuest.scenario.title)}
                </h3>
                <p className="text-sm text-amber-800">
                  {languageManager.translateContent(currentQuest.scenario.description)}
                </p>
              </div>
            )}

            {/* Visualization (if specified) */}
            {currentQuest.visualization === 'force_vector' && (
              <div className="mb-6 flex justify-center">
                <ForceVectorDiagram />
              </div>
            )}
          </div>

          {/* Answer Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {languageManager.translate('instructions.enterNumerical')}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your answer..."
                disabled={isCorrect === true}
              />
              {currentQuest.validation.units && (
                <span className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg">
                  {currentQuest.validation.units}
                </span>
              )}
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                isCorrect
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              {feedback}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-between">
            <button
              onClick={handlePreviousQuest}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={!questEngine.getPreviousQuest()}
            >
              {languageManager.translate('ui.previousQuest')}
            </button>

            <div className="flex gap-4">
              {isCorrect !== true && (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
                  disabled={!answer}
                >
                  {languageManager.translate('ui.submitAnswer')}
                </button>
              )}

              {isCorrect === true && (
                <button
                  onClick={handleNextQuest}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  disabled={!questEngine.getNextQuest()}
                >
                  {languageManager.translate('ui.nextQuest')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
