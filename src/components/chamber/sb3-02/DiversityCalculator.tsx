/**
 * SB3.02 Biodiversity Module - Diversity Calculator Visualization
 * Calculates Shannon and Simpson diversity indices
 */

'use client';

import React, { useState, useMemo } from 'react';
import { Language, SpeciesEntry, DiversityMetrics } from '@/lib/sb3-02/types';
import { LaTeXRenderer } from './LaTeXRenderer';

interface DiversityCalculatorProps {
  language: Language;
}

export function DiversityCalculator({ language }: DiversityCalculatorProps) {
  const [species, setSpecies] = useState<SpeciesEntry[]>([
    { name: { en: 'Species A', cn: '物种A', de: 'Art A' }, count: 10 },
    { name: { en: 'Species B', cn: '物种B', de: 'Art B' }, count: 10 },
  ]);

  const metrics = useMemo(() => calculateDiversity(species), [species]);

  const addSpecies = () => {
    const newIndex = species.length + 1;
    setSpecies([
      ...species,
      {
        name: {
          en: `Species ${String.fromCharCode(64 + newIndex)}`,
          cn: `物种${String.fromCharCode(64 + newIndex)}`,
          de: `Art ${String.fromCharCode(64 + newIndex)}`,
        },
        count: 1,
      },
    ]);
  };

  const removeSpecies = (index: number) => {
    if (species.length > 1) {
      setSpecies(species.filter((_, i) => i !== index));
    }
  };

  const updateCount = (index: number, count: number) => {
    const newSpecies = [...species];
    newSpecies[index].count = Math.max(0, count);
    setSpecies(newSpecies);
  };

  const labels = {
    title: {
      en: 'Species Diversity Calculator',
      cn: '物种多样性计算器',
      de: 'Artenvielfalt-Rechner',
    },
    addSpecies: {
      en: 'Add Species',
      cn: '添加物种',
      de: 'Art hinzufügen',
    },
    totalIndividuals: {
      en: 'Total Individuals',
      cn: '总个体数',
      de: 'Gesamtindividuen',
    },
    speciesRichness: {
      en: 'Species Richness',
      cn: '物种丰富度',
      de: 'Artenreichtum',
    },
    shannonIndex: {
      en: 'Shannon Index (H\')',
      cn: '香农指数 (H\')',
      de: 'Shannon-Index (H\')',
    },
    simpsonIndex: {
      en: 'Simpson Index (D)',
      cn: '辛普森指数 (D)',
      de: 'Simpson-Index (D)',
    },
    evenness: {
      en: 'Evenness (J\')',
      cn: '均匀度 (J\')',
      de: 'Gleichmäßigkeit (J\')',
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">{labels.title[language]}</h3>

      {/* Species Input */}
      <div className="space-y-3">
        {species.map((sp, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <input
              type="text"
              value={sp.name[language]}
              onChange={(e) => {
                const newSpecies = [...species];
                newSpecies[idx].name[language] = e.target.value;
                setSpecies(newSpecies);
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Species ${idx + 1}`}
            />
            <input
              type="number"
              value={sp.count}
              onChange={(e) => updateCount(idx, parseInt(e.target.value) || 0)}
              min="0"
              className="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => removeSpecies(idx)}
              disabled={species.length <= 1}
              className="px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={addSpecies}
          className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded font-semibold hover:bg-blue-200 transition-colors"
        >
          + {labels.addSpecies[language]}
        </button>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
        <MetricCard
          label={labels.totalIndividuals[language]}
          value={metrics.totalIndividuals}
          format="number"
        />
        <MetricCard
          label={labels.speciesRichness[language]}
          value={metrics.speciesRichness}
          format="number"
        />
        <MetricCard
          label={labels.shannonIndex[language]}
          value={metrics.shannonIndex}
          format="decimal"
        />
        <MetricCard
          label={labels.simpsonIndex[language]}
          value={metrics.simpsonIndex}
          format="decimal"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <MetricCard
          label={labels.evenness[language]}
          value={metrics.evenness}
          format="decimal"
          description={
            language === 'en'
              ? 'Evenness ranges from 0 to 1, with 1 indicating perfect evenness'
              : language === 'cn'
              ? '均匀度范围从0到1，1表示完全均匀'
              : 'Gleichmäßigkeit reicht von 0 bis 1, wobei 1 perfekte Gleichmäßigkeit anzeigt'
          }
        />
      </div>

      {/* Formulas */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <p className="font-semibold text-gray-900">
          {language === 'en' && 'Formulas:'}
          {language === 'cn' && '公式：'}
          {language === 'de' && 'Formeln:'}
        </p>
        <div className="space-y-2">
          <div>
            <p className="text-sm text-gray-700 mb-1">Shannon Index:</p>
            <LaTeXRenderer formula="H' = -\\sum_{i=1}^{S} p_i \\ln(p_i)" display={true} />
          </div>
          <div>
            <p className="text-sm text-gray-700 mb-1">Simpson Index:</p>
            <LaTeXRenderer formula="D = 1 - \\sum_{i=1}^{S} p_i^2" display={true} />
          </div>
          <div>
            <p className="text-sm text-gray-700 mb-1">Evenness:</p>
            <LaTeXRenderer formula="J' = \\frac{H'}{\\ln(S)}" display={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: number;
  format: 'number' | 'decimal';
  description?: string;
}

function MetricCard({ label, value, format, description }: MetricCardProps) {
  const displayValue = format === 'decimal' ? value.toFixed(3) : value.toString();

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{displayValue}</p>
      {description && <p className="text-xs text-gray-500 mt-2">{description}</p>}
    </div>
  );
}

function calculateDiversity(species: SpeciesEntry[]): DiversityMetrics {
  const totalIndividuals = species.reduce((sum, sp) => sum + sp.count, 0);
  const speciesRichness = species.filter(sp => sp.count > 0).length;

  if (totalIndividuals === 0 || speciesRichness === 0) {
    return {
      speciesRichness: 0,
      shannonIndex: 0,
      simpsonIndex: 0,
      evenness: 0,
      totalIndividuals: 0,
    };
  }

  // Calculate proportions
  const proportions = species.map(sp => sp.count / totalIndividuals);

  // Shannon Index: H' = -Σ(pi * ln(pi))
  const shannonIndex = -proportions.reduce((sum, p) => {
    if (p === 0) return sum;
    return sum + p * Math.log(p);
  }, 0);

  // Simpson Index: D = 1 - Σ(pi²)
  const simpsonIndex = 1 - proportions.reduce((sum, p) => sum + p * p, 0);

  // Evenness: J' = H' / ln(S)
  const evenness = speciesRichness > 1 ? shannonIndex / Math.log(speciesRichness) : 1;

  return {
    speciesRichness,
    shannonIndex,
    simpsonIndex,
    evenness,
    totalIndividuals,
  };
}
