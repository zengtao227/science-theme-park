/**
 * SB3.02 Biodiversity Module - Ecosystem Map Visualization
 * Interactive map showing Basel region ecosystems
 */

'use client';

import React, { useState } from 'react';
import { Language, EcosystemRegion } from '@/lib/sb3-02/types';

interface EcosystemMapProps {
  language: Language;
}

const baselEcosystems: EcosystemRegion[] = [
  {
    id: 'rhine-river',
    name: {
      en: 'Rhine River',
      cn: '莱茵河',
      de: 'Rhein',
    },
    type: 'Aquatic',
    biodiversityScore: 8.5,
    keySpecies: ['Salmon', 'Kingfisher', 'Mayfly', 'Water vole'],
    threats: ['Pollution', 'Invasive species', 'Climate change'],
    coordinates: { lat: 47.5596, lng: 7.5886 },
  },
  {
    id: 'jura-mountains',
    name: {
      en: 'Jura Mountains',
      cn: '侏罗山脉',
      de: 'Jura-Gebirge',
    },
    type: 'Alpine',
    biodiversityScore: 9.2,
    keySpecies: ['Chamois', 'Alpine Aster', 'Golden Eagle', 'Marmot'],
    threats: ['Climate change', 'Tourism pressure', 'Habitat fragmentation'],
    coordinates: { lat: 47.4, lng: 7.3 },
  },
  {
    id: 'basel-urban',
    name: {
      en: 'Basel Urban Area',
      cn: '巴塞尔城区',
      de: 'Basler Stadtgebiet',
    },
    type: 'Urban',
    biodiversityScore: 6.3,
    keySpecies: ['House sparrow', 'Urban fox', 'Peregrine falcon', 'Street trees'],
    threats: ['Habitat loss', 'Light pollution', 'Noise pollution'],
    coordinates: { lat: 47.5596, lng: 7.5886 },
  },
  {
    id: 'botanical-garden',
    name: {
      en: 'Botanical Garden',
      cn: '植物园',
      de: 'Botanischer Garten',
    },
    type: 'Managed',
    biodiversityScore: 8.8,
    keySpecies: ['7500+ plant species', 'Pollinators', 'Endemic plants', 'Rare orchids'],
    threats: ['Funding constraints', 'Climate adaptation needs'],
    coordinates: { lat: 47.5633, lng: 7.5808 },
  },
  {
    id: 'agricultural-lands',
    name: {
      en: 'Agricultural Lands',
      cn: '农业用地',
      de: 'Landwirtschaftliche Flächen',
    },
    type: 'Agricultural',
    biodiversityScore: 5.7,
    keySpecies: ['Field birds', 'Wildflowers', 'Pollinators', 'Small mammals'],
    threats: ['Intensive farming', 'Pesticide use', 'Habitat loss'],
    coordinates: { lat: 47.5, lng: 7.6 },
  },
];

export function EcosystemMap({ language }: EcosystemMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<EcosystemRegion | null>(null);

  const labels = {
    title: {
      en: 'Basel Region Ecosystem Map',
      cn: '巴塞尔地区生态系统地图',
      de: 'Basler Region Ökosystemkarte',
    },
    selectRegion: {
      en: 'Select a region to view details',
      cn: '选择一个区域查看详情',
      de: 'Wählen Sie eine Region aus, um Details anzuzeigen',
    },
    biodiversityScore: {
      en: 'Biodiversity Score',
      cn: '生物多样性评分',
      de: 'Biodiversitätsbewertung',
    },
    keySpecies: {
      en: 'Key Species',
      cn: '关键物种',
      de: 'Schlüsselarten',
    },
    threats: {
      en: 'Threats',
      cn: '威胁',
      de: 'Bedrohungen',
    },
    ecosystemType: {
      en: 'Ecosystem Type',
      cn: '生态系统类型',
      de: 'Ökosystemtyp',
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">{labels.title[language]}</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map/Region List */}
        <div className="space-y-3">
          <p className="text-sm text-gray-600">{labels.selectRegion[language]}</p>
          <div className="space-y-2">
            {baselEcosystems.map(region => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedRegion?.id === region.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{region.name[language]}</p>
                    <p className="text-sm text-gray-600">{region.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{labels.biodiversityScore[language]}</p>
                      <p className="text-lg font-bold text-blue-600">{region.biodiversityScore}</p>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        region.biodiversityScore >= 8
                          ? 'bg-green-500'
                          : region.biodiversityScore >= 6
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Region Details */}
        <div>
          {selectedRegion ? (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 space-y-4 border border-blue-200">
              <div>
                <h4 className="text-2xl font-bold text-gray-900">{selectedRegion.name[language]}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {labels.ecosystemType[language]}: {selectedRegion.type}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{labels.biodiversityScore[language]}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          selectedRegion.biodiversityScore >= 8
                            ? 'bg-green-500'
                            : selectedRegion.biodiversityScore >= 6
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${(selectedRegion.biodiversityScore / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {selectedRegion.biodiversityScore}/10
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-2">{labels.keySpecies[language]}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRegion.keySpecies.map((species, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm border border-green-300"
                    >
                      {species}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-2">{labels.threats[language]}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRegion.threats.map((threat, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm border border-red-300"
                    >
                      {threat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12">
              <p className="text-gray-500 text-center">{labels.selectRegion[language]}</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-600">{baselEcosystems.length}</p>
          <p className="text-sm text-gray-600">
            {language === 'en' && 'Ecosystems'}
            {language === 'cn' && '生态系统'}
            {language === 'de' && 'Ökosysteme'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-green-600">
            {(
              baselEcosystems.reduce((sum, r) => sum + r.biodiversityScore, 0) /
              baselEcosystems.length
            ).toFixed(1)}
          </p>
          <p className="text-sm text-gray-600">
            {language === 'en' && 'Avg. Score'}
            {language === 'cn' && '平均评分'}
            {language === 'de' && 'Durchschn. Bewertung'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-amber-600">
            {baselEcosystems.reduce((sum, r) => sum + r.threats.length, 0)}
          </p>
          <p className="text-sm text-gray-600">
            {language === 'en' && 'Total Threats'}
            {language === 'cn' && '总威胁'}
            {language === 'de' && 'Gesamtbedrohungen'}
          </p>
        </div>
      </div>
    </div>
  );
}
