/**
 * SB3.02 Biodiversity Module - Conservation Planner Visualization
 * Tool for designing conservation plans within budget constraints
 */

'use client';

import React, { useState, useMemo } from 'react';
import { Language, Threat, Strategy } from '@/lib/sb3-02/types';

interface ConservationPlannerProps {
  language: Language;
}

const threats: Threat[] = [
  {
    id: 'habitat-loss',
    name: {
      en: 'Habitat Loss',
      cn: '栖息地丧失',
      de: 'Lebensraumverlust',
    },
    severity: 9,
    affectedSpecies: ['Birds', 'Mammals', 'Amphibians', 'Plants'],
  },
  {
    id: 'climate-change',
    name: {
      en: 'Climate Change',
      cn: '气候变化',
      de: 'Klimawandel',
    },
    severity: 8,
    affectedSpecies: ['Alpine species', 'Aquatic species', 'Migratory birds'],
  },
  {
    id: 'pollution',
    name: {
      en: 'Pollution',
      cn: '污染',
      de: 'Verschmutzung',
    },
    severity: 7,
    affectedSpecies: ['Aquatic species', 'Insects', 'Plants'],
  },
  {
    id: 'invasive-species',
    name: {
      en: 'Invasive Species',
      cn: '入侵物种',
      de: 'Invasive Arten',
    },
    severity: 6,
    affectedSpecies: ['Native plants', 'Aquatic species', 'Birds'],
  },
];

const strategies: Strategy[] = [
  {
    id: 'protected-areas',
    name: {
      en: 'Establish Protected Areas',
      cn: '建立保护区',
      de: 'Schutzgebiete einrichten',
    },
    cost: 50000,
    effectiveness: 9,
    addressedThreats: ['habitat-loss'],
  },
  {
    id: 'habitat-restoration',
    name: {
      en: 'Habitat Restoration',
      cn: '栖息地恢复',
      de: 'Lebensraumwiederherstellung',
    },
    cost: 35000,
    effectiveness: 8,
    addressedThreats: ['habitat-loss', 'pollution'],
  },
  {
    id: 'climate-adaptation',
    name: {
      en: 'Climate Adaptation Programs',
      cn: '气候适应计划',
      de: 'Klimaanpassungsprogramme',
    },
    cost: 45000,
    effectiveness: 7,
    addressedThreats: ['climate-change'],
  },
  {
    id: 'pollution-control',
    name: {
      en: 'Pollution Control Measures',
      cn: '污染控制措施',
      de: 'Verschmutzungskontrollmaßnahmen',
    },
    cost: 30000,
    effectiveness: 8,
    addressedThreats: ['pollution'],
  },
  {
    id: 'invasive-management',
    name: {
      en: 'Invasive Species Management',
      cn: '入侵物种管理',
      de: 'Management invasiver Arten',
    },
    cost: 25000,
    effectiveness: 7,
    addressedThreats: ['invasive-species'],
  },
  {
    id: 'community-engagement',
    name: {
      en: 'Community Engagement',
      cn: '社区参与',
      de: 'Gemeinschaftsengagement',
    },
    cost: 15000,
    effectiveness: 6,
    addressedThreats: ['habitat-loss', 'pollution', 'invasive-species'],
  },
  {
    id: 'research-monitoring',
    name: {
      en: 'Research & Monitoring',
      cn: '研究与监测',
      de: 'Forschung & Überwachung',
    },
    cost: 20000,
    effectiveness: 5,
    addressedThreats: ['climate-change', 'habitat-loss', 'pollution', 'invasive-species'],
  },
];

export function ConservationPlanner({ language }: ConservationPlannerProps) {
  const [budget] = useState(100000);
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);

  const planMetrics = useMemo(() => {
    const totalCost = selectedStrategies.reduce((sum, id) => {
      const strategy = strategies.find(s => s.id === id);
      return sum + (strategy?.cost || 0);
    }, 0);

    const addressedThreats = new Set<string>();
    selectedStrategies.forEach(id => {
      const strategy = strategies.find(s => s.id === id);
      strategy?.addressedThreats.forEach(t => addressedThreats.add(t));
    });

    const expectedImpact = selectedStrategies.reduce((sum, id) => {
      const strategy = strategies.find(s => s.id === id);
      return sum + (strategy?.effectiveness || 0);
    }, 0);

    return {
      totalCost,
      remainingBudget: budget - totalCost,
      addressedThreats: Array.from(addressedThreats),
      expectedImpact,
      isOverBudget: totalCost > budget,
    };
  }, [selectedStrategies, budget]);

  const toggleStrategy = (strategyId: string) => {
    setSelectedStrategies(prev =>
      prev.includes(strategyId) ? prev.filter(id => id !== strategyId) : [...prev, strategyId]
    );
  };

  const labels = {
    title: {
      en: 'Conservation Planner',
      cn: '保护规划器',
      de: 'Naturschutzplaner',
    },
    budget: {
      en: 'Budget',
      cn: '预算',
      de: 'Budget',
    },
    remaining: {
      en: 'Remaining',
      cn: '剩余',
      de: 'Verbleibend',
    },
    totalCost: {
      en: 'Total Cost',
      cn: '总成本',
      de: 'Gesamtkosten',
    },
    expectedImpact: {
      en: 'Expected Impact',
      cn: '预期影响',
      de: 'Erwartete Auswirkung',
    },
    threatsAddressed: {
      en: 'Threats Addressed',
      cn: '已解决的威胁',
      de: 'Behandelte Bedrohungen',
    },
    availableStrategies: {
      en: 'Available Strategies',
      cn: '可用策略',
      de: 'Verfügbare Strategien',
    },
    effectiveness: {
      en: 'Effectiveness',
      cn: '有效性',
      de: 'Wirksamkeit',
    },
    overBudget: {
      en: 'Over Budget!',
      cn: '超出预算！',
      de: 'Über Budget!',
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">{labels.title[language]}</h3>

      {/* Budget Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">{labels.budget[language]}</p>
            <p className="text-2xl font-bold text-gray-900">CHF {budget.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{labels.totalCost[language]}</p>
            <p
              className={`text-2xl font-bold ${
                planMetrics.isOverBudget ? 'text-red-600' : 'text-blue-600'
              }`}
            >
              CHF {planMetrics.totalCost.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{labels.remaining[language]}</p>
            <p
              className={`text-2xl font-bold ${
                planMetrics.isOverBudget ? 'text-red-600' : 'text-green-600'
              }`}
            >
              CHF {planMetrics.remainingBudget.toLocaleString()}
            </p>
          </div>
        </div>
        {planMetrics.isOverBudget && (
          <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded text-red-800 text-sm font-semibold">
            ⚠ {labels.overBudget[language]}
          </div>
        )}
      </div>

      {/* Strategies */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">{labels.availableStrategies[language]}</h4>
        <div className="space-y-2">
          {strategies.map(strategy => {
            const isSelected = selectedStrategies.includes(strategy.id);
            const canAfford = planMetrics.remainingBudget + (isSelected ? strategy.cost : 0) >= strategy.cost;

            return (
              <button
                key={strategy.id}
                onClick={() => toggleStrategy(strategy.id)}
                disabled={!isSelected && !canAfford}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : canAfford
                    ? 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    : 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="w-5 h-5"
                      />
                      <p className="font-semibold text-gray-900">{strategy.name[language]}</p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {strategy.addressedThreats.map(threatId => {
                        const threat = threats.find(t => t.id === threatId);
                        return (
                          <span
                            key={threatId}
                            className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs border border-amber-300"
                          >
                            {threat?.name[language]}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-lg font-bold text-gray-900">
                      CHF {strategy.cost.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {labels.effectiveness[language]}: {strategy.effectiveness}/10
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Plan Summary */}
      {selectedStrategies.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
          <h4 className="font-semibold text-green-900">
            {language === 'en' && 'Your Conservation Plan'}
            {language === 'cn' && '您的保护计划'}
            {language === 'de' && 'Ihr Naturschutzplan'}
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-green-700">{labels.expectedImpact[language]}</p>
              <p className="text-2xl font-bold text-green-900">{planMetrics.expectedImpact}/10</p>
            </div>
            <div>
              <p className="text-sm text-green-700">{labels.threatsAddressed[language]}</p>
              <p className="text-2xl font-bold text-green-900">
                {planMetrics.addressedThreats.length}/{threats.length}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {planMetrics.addressedThreats.map(threatId => {
              const threat = threats.find(t => t.id === threatId);
              return (
                <span
                  key={threatId}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-300"
                >
                  ✓ {threat?.name[language]}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
