/**
 * SB3.02 Biodiversity Module - Main Page
 * Integrates all components with ChamberLayout
 */

'use client';

import React, { useState, useEffect } from 'react';
import ChamberLayout from '@/components/layout/ChamberLayout';
import { StageView } from '@/components/chamber/sb3-02/StageView';
import { BaselScenarioGrid } from '@/components/chamber/sb3-02/BaselScenarioPanel';
import { DiversityCalculator } from '@/components/chamber/sb3-02/DiversityCalculator';
import { EcosystemMap } from '@/components/chamber/sb3-02/EcosystemMap';
import { ConservationPlanner } from '@/components/chamber/sb3-02/ConservationPlanner';
import { Language } from '@/lib/sb3-02/types';
import { stages, allQuests } from '@/lib/sb3-02/content/quest-data';
import { baselScenarios } from '@/lib/sb3-02/content/basel-scenarios';
import { Difficulty } from '@/hooks/useQuestManager';
import {
  loadProgress,
  saveProgress,
  initializeProgress,
  markQuestComplete,
  updateLanguage,
} from '@/lib/sb3-02/storage';

export default function BiodiversityModule() {
  const [language, setLanguage] = useState<Language>('en');
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>([]);
  const [currentStageId, setCurrentStageId] = useState('SPECIES_DIVERSITY');
  const [activeTab, setActiveTab] = useState<'quests' | 'scenarios' | 'visualizations'>('quests');
  const [difficulty, setDifficulty] = useState<Difficulty>('BASIC');

  // Load progress on mount
  useEffect(() => {
    const progress = loadProgress();
    if (progress) {
      setLanguage(progress.language);
      setCompletedQuestIds(progress.completedQuests);
      setCurrentStageId(progress.currentStage);
    } else {
      const newProgress = initializeProgress();
      saveProgress(newProgress);
    }
  }, []);

  const handleQuestComplete = (questId: string) => {
    const progress = loadProgress() || initializeProgress();
    const updatedProgress = markQuestComplete(progress, questId);
    saveProgress(updatedProgress);
    setCompletedQuestIds(updatedProgress.completedQuests);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    const progress = loadProgress() || initializeProgress();
    const updatedProgress = updateLanguage(progress, newLanguage);
    saveProgress(updatedProgress);
    setLanguage(newLanguage);
  };

  const currentStage = stages.find(s => s.id === currentStageId) || stages[0];

  const moduleTitle = {
    en: 'SB3.02 Biodiversity',
    cn: 'SB3.02 生物多样性',
    de: 'SB3.02 Biodiversität',
  };

  const tabLabels = {
    quests: { en: 'Quests', cn: '任务', de: 'Quests' },
    scenarios: { en: 'Basel Scenarios', cn: '巴塞尔场景', de: 'Basler Szenarien' },
    visualizations: { en: 'Visualizations', cn: '可视化', de: 'Visualisierungen' },
  };

  const translations = {
    back: { en: 'Back', cn: '返回', de: 'Zurück' }[language],
    check: { en: 'Check', cn: '检查', de: 'Prüfen' }[language],
    next: { en: 'Next', cn: '下一个', de: 'Weiter' }[language],
    correct: { en: 'Correct!', cn: '正确！', de: 'Richtig!' }[language],
    incorrect: { en: 'Incorrect', cn: '不正确', de: 'Falsch' }[language],
    difficulty: {
      BASIC: { en: 'Basic', cn: '基础', de: 'Grundlagen' }[language],
      CORE: { en: 'Core', cn: '核心', de: 'Kern' }[language],
      ADVANCED: { en: 'Advanced', cn: '高级', de: 'Fortgeschritten' }[language],
      ELITE: { en: 'Elite', cn: '精英', de: 'Elite' }[language],
    },
  };

  // Convert stages to ChamberLayout format
  const stageLabels = stages.map(s => ({
    id: s.id,
    label: s.title[language],
  }));

  return (
    <ChamberLayout

      title={moduleTitle[language]}
      moduleCode="SB3.02"
      difficulty={difficulty}
      onDifficultyChange={setDifficulty}
      stages={stageLabels}
      currentStage={currentStageId}
      onStageChange={setCurrentStageId}
      footerLeft="Lehrplan 21 NT.8.2"
      translations={translations}
    >
      <div className="space-y-6">
        {/* Language Selector */}
        <div className="flex justify-end gap-2">
          {(['en', 'cn', 'de'] as Language[]).map(lang => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                language === lang
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Stage Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {stages.map(stage => {
            const stageQuests = allQuests.filter(q => q.stageId === stage.id);
            const completed = stageQuests.filter(q => completedQuestIds.includes(q.id)).length;
            const total = stageQuests.length;

            return (
              <button
                key={stage.id}
                onClick={() => setCurrentStageId(stage.id)}
                className={`flex-shrink-0 px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentStageId === stage.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
                }`}
              >
                <div className="text-left">
                  <p>{stage.title[language]}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {completed}/{total}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-gray-200">
          {(['quests', 'scenarios', 'visualizations'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tabLabels[tab][language]}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-6">
          {activeTab === 'quests' && (
            <StageView
              stage={currentStage}
              quests={allQuests}
              completedQuestIds={completedQuestIds}
              onQuestComplete={handleQuestComplete}
              language={language}
            />
          )}

          {activeTab === 'scenarios' && (
            <BaselScenarioGrid scenarios={baselScenarios} language={language} />
          )}

          {activeTab === 'visualizations' && (
            <div className="space-y-8">
              <DiversityCalculator language={language} />
              <EcosystemMap language={language} />
              <ConservationPlanner language={language} />
            </div>
          )}
        </div>

        {/* Module Info Footer */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600">
                {language === 'en' && 'Total Quests'}
                {language === 'cn' && '总任务数'}
                {language === 'de' && 'Gesamtquests'}
              </p>
              <p className="text-3xl font-bold text-gray-900">{allQuests.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {language === 'en' && 'Completed'}
                {language === 'cn' && '已完成'}
                {language === 'de' && 'Abgeschlossen'}
              </p>
              <p className="text-3xl font-bold text-blue-600">{completedQuestIds.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {language === 'en' && 'Progress'}
                {language === 'cn' && '进度'}
                {language === 'de' && 'Fortschritt'}
              </p>
              <p className="text-3xl font-bold text-green-600">
                {Math.round((completedQuestIds.length / allQuests.length) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
