/**
 * SB3.02 Biodiversity Module - StageView Component
 * Displays a single stage with its associated quests
 */

'use client';

import React from 'react';
import { Stage, Quest, Language } from '@/lib/sb3-02/types';
import { QuestCard } from './QuestCard';

interface StageViewProps {
  stage: Stage;
  quests: Quest[];
  completedQuestIds: string[];
  onQuestComplete: (questId: string) => void;
  language: Language;
}

export function StageView({
  stage,
  quests,
  completedQuestIds,
  onQuestComplete,
  language,
}: StageViewProps) {
  const stageQuests = quests.filter(q => q.stageId === stage.id);
  const completedCount = stageQuests.filter(q => completedQuestIds.includes(q.id)).length;
  const totalCount = stageQuests.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Group quests by difficulty
  const questsByDifficulty = {
    BASIC: stageQuests.filter(q => q.difficulty === 'BASIC'),
    CORE: stageQuests.filter(q => q.difficulty === 'CORE'),
    ADVANCED: stageQuests.filter(q => q.difficulty === 'ADVANCED'),
    ELITE: stageQuests.filter(q => q.difficulty === 'ELITE'),
  };

  const stageIcons = {
    SPECIES_DIVERSITY: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    ECOSYSTEM_DIVERSITY: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    CONSERVATION: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  };

  return (
    <div className="space-y-6">
      {/* Stage Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            {stageIcons[stage.name]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                {language === 'en' && `Stage ${stage.order}`}
                {language === 'cn' && `阶段 ${stage.order}`}
                {language === 'de' && `Stufe ${stage.order}`}
              </span>
            </div>
            <h2 className="text-3xl font-bold">{stage.title[language]}</h2>
            <p className="text-blue-100 mt-2">{stage.description[language]}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>
              {language === 'en' && 'Progress'}
              {language === 'cn' && '进度'}
              {language === 'de' && 'Fortschritt'}
            </span>
            <span className="font-semibold">
              {completedCount} / {totalCount} {language === 'en' && 'quests'}
              {language === 'cn' && '任务'}
              {language === 'de' && 'Quests'}
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quests by Difficulty */}
      {(['BASIC', 'CORE', 'ADVANCED', 'ELITE'] as const).map(difficulty => {
        const difficultyQuests = questsByDifficulty[difficulty];
        if (difficultyQuests.length === 0) return null;

        const difficultyLabels = {
          BASIC: { en: 'Basic', cn: '基础', de: 'Grundlagen' },
          CORE: { en: 'Core', cn: '核心', de: 'Kern' },
          ADVANCED: { en: 'Advanced', cn: '高级', de: 'Fortgeschritten' },
          ELITE: { en: 'Elite', cn: '精英', de: 'Elite' },
        };

        return (
          <div key={difficulty} className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              {difficultyLabels[difficulty][language]} {language === 'en' && 'Quests'}
              {language === 'cn' && '任务'}
              {language === 'de' && 'Quests'}
              <span className="text-sm font-normal text-gray-500">
                ({difficultyQuests.length})
              </span>
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {difficultyQuests.map(quest => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  isCompleted={completedQuestIds.includes(quest.id)}
                  onComplete={() => onQuestComplete(quest.id)}
                  language={language}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
