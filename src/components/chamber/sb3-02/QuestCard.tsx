/**
 * SB3.02 Biodiversity Module - QuestCard Component
 * Renders individual quest content with questions and feedback
 */

'use client';

import React, { useMemo, useState } from 'react';
import LayeredFeedbackPanel from '@/components/feedback/LayeredFeedbackPanel';
import {
  DEFAULT_FEEDBACK_POLICY,
  type FeedbackContent,
  type FeedbackLevel,
  type PlatformSolutionStep,
} from '@/hooks/useQuestManager';
import { useLanguage } from '@/lib/i18n';
import { Quest, Language, Question } from '@/lib/sb3-02/types';
import { LaTeXRenderer, LaTeXErrorBoundary } from './LaTeXRenderer';

interface QuestCardProps {
  quest: Quest;
  isCompleted: boolean;
  onComplete: () => void;
  language: Language;
}

const FEEDBACK_POLICY = DEFAULT_FEEDBACK_POLICY;

function escapeLatexText(text: string) {
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/([{}%$&#_^])/g, '\\$1')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\n/g, ' ');
}

function toLatexText(text: string) {
  return `\\text{${escapeLatexText(text)}}`;
}

function getOptionLabel(index: number) {
  return String.fromCharCode(65 + index);
}

function buildQuestFeedbackContent(quest: Quest, language: Language, cardCopy: Record<string, string>): FeedbackContent {
  const steps: PlatformSolutionStep[] = quest.questions.map((question, index) => {
    const answerIndex = Number(question.correctAnswer);
    const optionLabel = Number.isFinite(answerIndex) ? getOptionLabel(answerIndex) : String(question.correctAnswer);
    const optionText = question.options?.[answerIndex]?.[language] ?? String(question.correctAnswer);

    return {
      stepNumber: index + 1,
      expressionLatex: toLatexText(
        `${cardCopy.question_label} ${index + 1}: ${cardCopy.correct_option} ${optionLabel} - ${optionText}`
      ),
      justification: question.explanation[language],
      emphasis: 'key',
    };
  });

  const fullSolutionLines = quest.questions.flatMap((question, index) => {
    const answerIndex = Number(question.correctAnswer);
    const optionLabel = Number.isFinite(answerIndex) ? getOptionLabel(answerIndex) : String(question.correctAnswer);
    const optionText = question.options?.[answerIndex]?.[language] ?? String(question.correctAnswer);

    return [
      toLatexText(`${cardCopy.question_label} ${index + 1}: ${cardCopy.correct_option} ${optionLabel} - ${optionText}`),
      toLatexText(question.explanation[language]),
    ];
  });

  return {
    hint: toLatexText(cardCopy.hint),
    steps,
    fullSolutionLatex: fullSolutionLines.join('\\\\[6pt] '),
    hasFullSolution: true,
  };
}

export function QuestCard({ quest, isCompleted, onComplete, language }: QuestCardProps) {
  const { t } = useLanguage();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [lastCheck, setLastCheck] = useState<null | { ok: boolean }>(null);
  const [errorCount, setErrorCount] = useState(0);
  const [feedbackLevel, setFeedbackLevel] = useState<FeedbackLevel>('NONE');
  const cardCopy = t('sb3_02.quest_card');
  const difficultyCopy = t('sb3_02.difficulty');
  const feedbackCopy = t('common.chamber_layout.feedback');

  const feedbackContent = useMemo(
    () => buildQuestFeedbackContent(quest, language, cardCopy),
    [quest, language, cardCopy]
  );

  const feedbackAvailability = useMemo(() => {
    const isCorrect = lastCheck?.ok === true;
    const isWrong = lastCheck?.ok === false;

    if (isCorrect && FEEDBACK_POLICY.showAfterCorrect) {
      return {
        canShowHint: feedbackContent.hint !== null,
        canShowSteps: feedbackContent.steps.length > 0,
        canShowFull: !!feedbackContent.fullSolutionLatex,
      };
    }

    return {
      canShowHint: isWrong && errorCount >= FEEDBACK_POLICY.hintThreshold && feedbackContent.hint !== null,
      canShowSteps: isWrong && errorCount >= FEEDBACK_POLICY.stepsThreshold && feedbackContent.steps.length > 0,
      canShowFull: isWrong && errorCount >= FEEDBACK_POLICY.fullThreshold && !!feedbackContent.fullSolutionLatex,
    };
  }, [errorCount, feedbackContent, lastCheck]);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    const allCorrect = quest.questions.every(q => {
      const selected = selectedAnswers[q.id];
      return selected === String(q.correctAnswer);
    });

    setLastCheck({ ok: allCorrect });
    setFeedbackLevel('NONE');

    if (allCorrect && !isCompleted) {
      onComplete();
      return;
    }

    if (!allCorrect) {
      setErrorCount((prev) => prev + 1);
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
            {quest.difficulty === 'BASIC'
              ? difficultyCopy.basic
              : quest.difficulty === 'CORE'
              ? difficultyCopy.core
              : quest.difficulty === 'ADVANCED'
              ? difficultyCopy.advanced
              : difficultyCopy.elite}
          </span>
          {isCompleted && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              ✓ {cardCopy.completed}
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
            isLocked={lastCheck !== null}
            revealCorrectAnswer={lastCheck?.ok === true || feedbackLevel === 'FULL'}
          />
        ))}
      </div>

      {/* Submit Button */}
      {lastCheck === null && (
        <button
          onClick={handleSubmit}
          disabled={quest.questions.some(q => !selectedAnswers[q.id])}
          className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {cardCopy.submit_answers}
        </button>
      )}

      {/* Feedback */}
      {lastCheck && (
        <div className={`mt-6 p-4 rounded-lg border ${lastCheck.ok ? 'bg-green-50 border-green-300' : 'bg-amber-50 border-amber-300'}`}>
          <p className={`font-semibold ${lastCheck.ok ? 'text-green-800' : 'text-amber-800'}`}>
            {lastCheck.ok ? `✓ ${cardCopy.correct}` : `✗ ${cardCopy.incorrect}`}
          </p>
          {lastCheck.ok && (
            <p className="text-sm mt-2 text-green-700">{quest.feedback[language]}</p>
          )}
          {!lastCheck.ok && (
            <button
              onClick={() => {
                setLastCheck(null);
                setFeedbackLevel('NONE');
                setSelectedAnswers({});
              }}
              className="mt-3 px-4 py-2 bg-white border border-amber-300 text-amber-800 rounded font-semibold hover:bg-amber-50 transition-colors"
            >
              {cardCopy.try_again}
            </button>
          )}
        </div>
      )}

      <LayeredFeedbackPanel
        feedbackContent={feedbackContent}
        feedbackLevel={feedbackLevel}
        feedbackAvailability={feedbackAvailability}
        policy={FEEDBACK_POLICY}
        isCorrect={lastCheck?.ok === true}
        onShowHint={() => setFeedbackLevel('HINT')}
        onShowSteps={() => setFeedbackLevel('STEPS')}
        onShowFull={() => setFeedbackLevel('FULL')}
        translations={feedbackCopy}
      />
    </div>
  );
}

interface QuestionItemProps {
  question: Question;
  questionNumber: number;
  language: Language;
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
  isLocked: boolean;
  revealCorrectAnswer: boolean;
}

function QuestionItem({
  question,
  questionNumber,
  language,
  selectedAnswer,
  onAnswerSelect,
  isLocked,
  revealCorrectAnswer,
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
            if (revealCorrectAnswer) {
              if (isCorrectAnswer) {
                optionClass = 'border-green-500 bg-green-50';
              } else if (isSelected) {
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
                  disabled={isLocked}
                  className="mr-3"
                />
                <span className="text-gray-800">{option[language]}</span>
                {revealCorrectAnswer && isCorrectAnswer && (
                  <span className="ml-auto text-green-600 font-semibold">✓</span>
                )}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
