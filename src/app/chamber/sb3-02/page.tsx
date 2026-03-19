/**
 * SB3.02 Biodiversity Module - Main Page
 * Integrates all components with ChamberLayout
 */

'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ChamberLayout from '@/components/layout/ChamberLayout';
import { StageView } from '@/components/chamber/sb3-02/StageView';
import { Language } from '@/lib/sb3-02/types';
import { stages, allQuests } from '@/lib/sb3-02/content/quest-data';
import { baselScenarios } from '@/lib/sb3-02/content/basel-scenarios';
import { Difficulty } from '@/hooks/useQuestManager';
import { useLanguage } from '@/lib/i18n';
import type { PrintSection } from '@/components/print/QuestPrintSections';
import {
  loadProgress,
  saveProgress,
  initializeProgress,
  markQuestComplete,
  updateLanguage,
} from '@/lib/sb3-02/storage';

const BaselScenarioGrid = dynamic(
  () => import('@/components/chamber/sb3-02/BaselScenarioPanel').then((m) => m.BaselScenarioGrid),
  { ssr: false }
);
const DiversityCalculator = dynamic(
  () => import('@/components/chamber/sb3-02/DiversityCalculator').then((m) => m.DiversityCalculator),
  { ssr: false }
);
const EcosystemMap = dynamic(
  () => import('@/components/chamber/sb3-02/EcosystemMap').then((m) => m.EcosystemMap),
  { ssr: false }
);
const ConservationPlanner = dynamic(
  () => import('@/components/chamber/sb3-02/ConservationPlanner').then((m) => m.ConservationPlanner),
  { ssr: false }
);

const toModuleLanguage = (language: string): Language =>
  language === 'CN' ? 'cn' : language === 'DE' ? 'de' : 'en';

const toAppLanguage = (language: Language): 'EN' | 'CN' | 'DE' =>
  language === 'cn' ? 'CN' : language === 'de' ? 'DE' : 'EN';

export default function BiodiversityModule() {
  const { t, currentLanguage, setLanguage } = useLanguage();
  const language = toModuleLanguage(currentLanguage);
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>([]);
  const [currentStageId, setCurrentStageId] = useState('SPECIES_DIVERSITY');
  const [activeTab, setActiveTab] = useState<'quests' | 'scenarios' | 'visualizations'>('quests');
  const [difficulty, setDifficulty] = useState<Difficulty>('BASIC');

  // Load progress on mount
  useEffect(() => {
    const progress = loadProgress();
    if (progress) {
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
    setLanguage(toAppLanguage(newLanguage));
  };

  const currentStage = stages.find(s => s.id === currentStageId) || stages[0];
  const sb3Copy = t('sb3_02');

  // Convert stages to ChamberLayout format
  const stageLabels = stages.map(s => ({
    id: s.id,
    label: s.title[language],
  }));
  const overallProgressPercent = allQuests.length > 0
    ? Math.round((completedQuestIds.length / allQuests.length) * 100)
    : 0;

  const printSections: PrintSection[] = stages.map((stage) => {
    const groups = (['BASIC', 'CORE', 'ADVANCED', 'ELITE'] as Difficulty[])
      .map((level) => ({
        difficulty: level,
        quests: allQuests.filter((quest) => quest.stageId === stage.id && quest.difficulty === level),
      }))
      .filter((group) => group.quests.length > 0);

    return {
      id: stage.id,
      label: stage.title[language],
      content: (
        <article className="text-black bg-white px-8 py-6 space-y-6">
          <header className="border-b-2 border-black pb-3">
            <h2 className="text-2xl font-black tracking-wide">{sb3Copy.title}</h2>
            <p className="text-sm font-semibold mt-1">{stage.title[language]}</p>
          </header>

          {groups.map((group) => (
            <section key={group.difficulty} className="space-y-4">
              <h3 className="text-lg font-black border-l-4 border-black pl-3">
                {sb3Copy.difficulty[group.difficulty.toLowerCase() as 'basic' | 'core' | 'advanced' | 'elite']}
              </h3>
              <div className="space-y-5">
                {group.quests.map((quest, index) => (
                  <div key={quest.id} className="border border-black/30 p-4 space-y-3 break-inside-avoid">
                    <div className="text-sm font-bold">
                      {index + 1}. {quest.questions[0]?.prompt[language] ?? quest.title[language]}
                    </div>
                    <div className="text-sm opacity-80">
                      {quest.description[language]}
                    </div>
                    <div className="space-y-2 pt-1">
                      <div className="h-7 border-b border-black" />
                      <div className="h-7 border-b border-black" />
                    </div>
                    <div className="text-xs opacity-60">Q{index + 1}.{quest.id}</div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </article>
      ),
    };
  });

  return (
    <ChamberLayout
      title={sb3Copy.title}
      moduleCode="SB3.02"
      difficulty={difficulty}
      onDifficultyChange={setDifficulty}
      stages={stageLabels}
      currentStage={currentStageId}
      onStageChange={setCurrentStageId}
      printSections={printSections}
      translations={{
        back: sb3Copy.back,
        check: sb3Copy.check,
        next: sb3Copy.next,
        correct: sb3Copy.correct,
        incorrect: sb3Copy.incorrect,
        difficulty: {
          BASIC: sb3Copy.difficulty.basic,
          CORE: sb3Copy.difficulty.core,
          ADVANCED: sb3Copy.difficulty.advanced,
          ELITE: sb3Copy.difficulty.elite,
        },
      }}
    >
      <div className="space-y-6">
        {/* Language Selector */}
        <div className="flex justify-end gap-2">
          {(['en', 'cn', 'de'] as Language[]).map(lang => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              aria-label={
                lang === 'en'
                  ? sb3Copy.language_buttons.english
                  : lang === 'cn'
                  ? sb3Copy.language_buttons.chinese
                  : sb3Copy.language_buttons.german
              }
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
                aria-label={stage.title[language]}
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
              aria-label={sb3Copy.tabs[tab]}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {sb3Copy.tabs[tab]}
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
                {sb3Copy.stats.total_quests}
              </p>
              <p className="text-3xl font-bold text-gray-900">{allQuests.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {sb3Copy.stats.completed}
              </p>
              <p className="text-3xl font-bold text-blue-600">{completedQuestIds.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {sb3Copy.stats.progress}
              </p>
              <p className="text-3xl font-bold text-green-600">
                {overallProgressPercent}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
