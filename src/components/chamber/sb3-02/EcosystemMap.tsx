/**
 * SB3.02 Biodiversity Module - Ecosystem Map Visualization
 * Interactive map showing Basel region ecosystems
 */

'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
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
    type: {
      en: 'Aquatic',
      cn: '水域',
      de: 'Aquatisch',
    },
    biodiversityScore: 8.5,
    keySpecies: [
      { en: 'Salmon', cn: '鲑鱼', de: 'Lachs' },
      { en: 'Kingfisher', cn: '翠鸟', de: 'Eisvogel' },
      { en: 'Mayfly', cn: '蜉蝣', de: 'Eintagsfliege' },
      { en: 'Water vole', cn: '水䶄', de: 'Wasserschermaus' },
    ],
    threats: [
      { en: 'Pollution', cn: '污染', de: 'Verschmutzung' },
      { en: 'Invasive species', cn: '入侵物种', de: 'Invasive Arten' },
      { en: 'Climate change', cn: '气候变化', de: 'Klimawandel' },
    ],
    coordinates: { lat: 47.5596, lng: 7.5886 },
  },
  {
    id: 'jura-mountains',
    name: {
      en: 'Jura Mountains',
      cn: '侏罗山脉',
      de: 'Jura-Gebirge',
    },
    type: {
      en: 'Alpine',
      cn: '高山',
      de: 'Alpin',
    },
    biodiversityScore: 9.2,
    keySpecies: [
      { en: 'Chamois', cn: '岩羚羊', de: 'Gämse' },
      { en: 'Alpine Aster', cn: '高山紫菀', de: 'Alpen-Aster' },
      { en: 'Golden Eagle', cn: '金雕', de: 'Steinadler' },
      { en: 'Marmot', cn: '土拨鼠', de: 'Murmeltier' },
    ],
    threats: [
      { en: 'Climate change', cn: '气候变化', de: 'Klimawandel' },
      { en: 'Tourism pressure', cn: '旅游压力', de: 'Tourismusdruck' },
      { en: 'Habitat fragmentation', cn: '栖息地破碎化', de: 'Lebensraumfragmentierung' },
    ],
    coordinates: { lat: 47.4, lng: 7.3 },
  },
  {
    id: 'basel-urban',
    name: {
      en: 'Basel Urban Area',
      cn: '巴塞尔城区',
      de: 'Basler Stadtgebiet',
    },
    type: {
      en: 'Urban',
      cn: '城市',
      de: 'Urban',
    },
    biodiversityScore: 6.3,
    keySpecies: [
      { en: 'House sparrow', cn: '麻雀', de: 'Haussperling' },
      { en: 'Urban fox', cn: '城市狐狸', de: 'Stadtfuchs' },
      { en: 'Peregrine falcon', cn: '游隼', de: 'Wanderfalke' },
      { en: 'Street trees', cn: '行道树', de: 'Straßenbäume' },
    ],
    threats: [
      { en: 'Habitat loss', cn: '栖息地丧失', de: 'Lebensraumverlust' },
      { en: 'Light pollution', cn: '光污染', de: 'Lichtverschmutzung' },
      { en: 'Noise pollution', cn: '噪音污染', de: 'Lärmbelastung' },
    ],
    coordinates: { lat: 47.5596, lng: 7.5886 },
  },
  {
    id: 'botanical-garden',
    name: {
      en: 'Botanical Garden',
      cn: '植物园',
      de: 'Botanischer Garten',
    },
    type: {
      en: 'Managed',
      cn: '人工管理',
      de: 'Gepflegt',
    },
    biodiversityScore: 8.8,
    keySpecies: [
      { en: '7500+ plant species', cn: '7500多种植物', de: '7500+ Pflanzenarten' },
      { en: 'Pollinators', cn: '传粉者', de: 'Bestäuber' },
      { en: 'Endemic plants', cn: '特有植物', de: 'Endemische Pflanzen' },
      { en: 'Rare orchids', cn: '珍稀兰科植物', de: 'Seltene Orchideen' },
    ],
    threats: [
      { en: 'Funding constraints', cn: '资金限制', de: 'Finanzierungsengpässe' },
      { en: 'Climate adaptation needs', cn: '气候适应需求', de: 'Anpassung an den Klimawandel' },
    ],
    coordinates: { lat: 47.5633, lng: 7.5808 },
  },
  {
    id: 'agricultural-lands',
    name: {
      en: 'Agricultural Lands',
      cn: '农业用地',
      de: 'Landwirtschaftliche Flächen',
    },
    type: {
      en: 'Agricultural',
      cn: '农业',
      de: 'Landwirtschaftlich',
    },
    biodiversityScore: 5.7,
    keySpecies: [
      { en: 'Field birds', cn: '农田鸟类', de: 'Feldvögel' },
      { en: 'Wildflowers', cn: '野花', de: 'Wildblumen' },
      { en: 'Pollinators', cn: '传粉者', de: 'Bestäuber' },
      { en: 'Small mammals', cn: '小型哺乳动物', de: 'Kleine Säugetiere' },
    ],
    threats: [
      { en: 'Intensive farming', cn: '集约农业', de: 'Intensive Landwirtschaft' },
      { en: 'Pesticide use', cn: '农药使用', de: 'Pestizideinsatz' },
      { en: 'Habitat loss', cn: '栖息地丧失', de: 'Lebensraumverlust' },
    ],
    coordinates: { lat: 47.5, lng: 7.6 },
  },
];

export function EcosystemMap({ language }: EcosystemMapProps) {
  const { t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<EcosystemRegion | null>(null);
  const copy = t('sb3_02.ecosystem_map');

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">{copy.title}</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map/Region List */}
        <div className="space-y-3">
          <p className="text-sm text-gray-600">{copy.select_region}</p>
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
                    <p className="text-sm text-gray-600">{region.type[language]}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{copy.biodiversity_score}</p>
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
                  {copy.ecosystem_type}: {selectedRegion.type[language]}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{copy.biodiversity_score}</p>
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
                <p className="font-semibold text-gray-900 mb-2">{copy.key_species}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRegion.keySpecies.map((species, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm border border-green-300"
                    >
                      {species[language]}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-2">{copy.threats}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRegion.threats.map((threat, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm border border-red-300"
                    >
                      {threat[language]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12">
              <p className="text-gray-500 text-center">{copy.select_region}</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-600">{baselEcosystems.length}</p>
          <p className="text-sm text-gray-600">{copy.ecosystems}</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-green-600">
            {(
              baselEcosystems.reduce((sum, r) => sum + r.biodiversityScore, 0) /
              baselEcosystems.length
            ).toFixed(1)}
          </p>
          <p className="text-sm text-gray-600">{copy.avg_score}</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-amber-600">
            {baselEcosystems.reduce((sum, r) => sum + r.threats.length, 0)}
          </p>
          <p className="text-sm text-gray-600">{copy.total_threats}</p>
        </div>
      </div>
    </div>
  );
}
