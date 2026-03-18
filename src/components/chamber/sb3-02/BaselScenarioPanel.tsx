/**
 * SB3.02 Biodiversity Module - BaselScenarioPanel Component
 * Displays Basel-specific case studies with localized content
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';
import { BaselScenario, Language } from '@/lib/sb3-02/types';

interface BaselScenarioPanelProps {
  scenario: BaselScenario;
  language: Language;
}

export function BaselScenarioPanel({ scenario, language }: BaselScenarioPanelProps) {
  const { t } = useLanguage();
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg shadow-md border border-emerald-200 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-emerald-900">{scenario.title[language]}</h3>
          <p className="text-sm text-emerald-700 mt-1">{scenario.location[language]}</p>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-sm max-w-none">
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
          {scenario.content[language]}
        </p>
      </div>

      {/* Related Concepts */}
      <div className="mt-4 pt-4 border-t border-emerald-200">
        <p className="text-sm font-semibold text-emerald-900 mb-2">{t('sb3_02.basel_scenarios.related_concepts')}</p>
        <div className="flex flex-wrap gap-2">
          {scenario.relatedConcepts.map((concept, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium border border-emerald-300"
            >
              {concept[language]}
            </span>
          ))}
        </div>
      </div>

      {/* Images (if available) */}
      {scenario.images && scenario.images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {scenario.images.map((imageUrl, idx) => (
            <div key={idx} className="relative aspect-video rounded-lg overflow-hidden bg-gray-200">
              <Image
                src={imageUrl}
                alt={t('sb3_02.basel_scenarios.image_alt', { title: scenario.title[language], index: idx + 1 })}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface BaselScenarioGridProps {
  scenarios: BaselScenario[];
  language: Language;
}

export function BaselScenarioGrid({ scenarios, language }: BaselScenarioGridProps) {
  const { t } = useLanguage();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">{t('sb3_02.basel_scenarios.grid_title')}</h2>
      <p className="text-gray-600">{t('sb3_02.basel_scenarios.grid_description')}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {scenarios.map(scenario => (
          <BaselScenarioPanel key={scenario.id} scenario={scenario} language={language} />
        ))}
      </div>
    </div>
  );
}
