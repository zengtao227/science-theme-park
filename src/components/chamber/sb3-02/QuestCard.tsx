/**
 * SB3.02 Biodiversity Module - QuestCard Component
 * Renders individual quest content with questions and feedback
 */

'use client';

import React, { useState } from 'react';
import { Quest, Language, Question } from '@/lib/sb3-02/types';
import { LaTeXRenderer, LaTeXErrorBoundary } from './LaTeXRenderer';

interface QuestCardProps {
  quest: Quest;
  isCompleted: boolean;
  onComplete: () => void;
  language: Language;
}

export function QuestCard({ quest, isCompleted, onComplete, language }: QuestCardProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    const allCorrect = quest.questions.every(q => {
      const selected = selectedAnswers[q.id];
      return selected === String(q.correctAnswer);
    });

    setIsCorrect(allCorrect);
    setShowFeedback(true);

    if (allCorrect && !isCompleted) {
      onComplete();
    }
  };

  const difficultyColors = {
    BASIC: 'bg-green-100 text-green-800 border-green-300',
    CORE: 'bg-blue-100 text-blue-800 border-blue-300',
    ADVANCED: 'bg-purple-100 text-purple-800 border-purple-300',
    ELITE: 'bg-amber-100 text-amber-800 border-amber-300',
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{quest.title[language]}</h3>
          <p className="text-sm text-gray-600 mt-1">{quest.description[language]}</p>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${difficultyColors[quest.difficulty]}`}>
            {quest.difficulty}
          </span>
          {isCompleted && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              ✓ Completed
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-sm max-w-none">
        <p className="text-gray-700">{quest.content.text[language]}</p>
        
        {/* LaTeX formulas */}
        {quest.content.latex && quest.content.latex.length > 0 && (
          <LaTeXErrorBoundary>
            <div className="my-4 p-4 bg-gray-50 rounded border border-gray-200">
              {quest.content.latex.map((formula, idx) => (
                <LaTeXRenderer key={idx} formula={formula} display={true} />
              ))}
            </div>
          </LaTeXErrorBoundary>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-4 mt-6">
        {quest.questions.map((question, qIdx) => (
          <QuestionItem
            key={question.id}
            question={question}
            questionNumber={qIdx + 1}
            language={language}
            selectedAnswer={selectedAnswers[question.id]}
            onAnswerSelect={(answer) => handleAnswerSelect(question.id, answer)}
            showExplanation={showFeedback}
            isCorrect={selectedAnswers[question.id] === String(question.correctAnswer)}
          />
        ))}
      </div>

      {/* Submit Button */}
      {!showFeedback && (
        <button
          onClick={handleSubmit}
          disabled={quest.questions.some(q => !selectedAnswers[q.id])}
          className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Submit Answers
        </button>
      )}

      {/* Feedback */}
      {showFeedback && (
        <div className={`mt-6 p-4 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-amber-50 border-amber-300'}`}>
          <p className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-amber-800'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Not quite right'}
          </p>
          <p className={`text-sm mt-2 ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
            {quest.feedback[language]}
          </p>
          {!isCorrect && (
            <button
              onClick={() => {
                setShowFeedback(false);
                setSelectedAnswers({});
              }}
              className="mt-3 px-4 py-2 bg-white border border-amber-300 text-amber-800 rounded font-semibold hover:bg-amber-50 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

interface QuestionItemProps {
  question: Question;
  questionNumber: number;
  language: Language;
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
  showExplanation: boolean;
  isCorrect: boolean;
}

function QuestionItem({
  question,
  questionNumber,
  language,
  selectedAnswer,
  onAnswerSelect,
  showExplanation,
  isCorrect,
}: QuestionItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <p className="font-semibold text-gray-900 mb-3">
        {questionNumber}. {question.prompt[language]}
      </p>

      {question.type === 'multiple-choice' && question.options && (
        <div className="space-y-2">
          {question.options.map((option, idx) => {
            const optionValue = String(idx);
            const isSelected = selectedAnswer === optionValue;
            const isCorrectAnswer = optionValue === String(question.correctAnswer);
            
            let optionClass = 'border-gray-300 hover:border-blue-400';
            if (showExplanation) {
              if (isCorrectAnswer) {
                optionClass = 'border-green-500 bg-green-50';
              } else if (isSelected && !isCorrect) {
                optionClass = 'border-red-500 bg-red-50';
              }
            } else if (isSelected) {
              optionClass = 'border-blue-500 bg-blue-50';
            }

            return (
              <label
                key={idx}
                className={`flex items-center p-3 border-2 rounded cursor-pointer transition-colors ${optionClass}`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={optionValue}
                  checked={isSelected}
                  onChange={(e) => onAnswerSelect(e.target.value)}
                  disabled={showExplanation}
                  className="mr-3"
                />
                <span className="text-gray-800">{option[language]}</span>
                {showExplanation && isCorrectAnswer && (
                  <span className="ml-auto text-green-600 font-semibold">✓</span>
                )}
              </label>
            );
          })}
        </div>
      )}

      {showExplanation && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Explanation:</span> {question.explanation[language]}
          </p>
        </div>
      )}
    </div>
  );
}
