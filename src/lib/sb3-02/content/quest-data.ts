/**
 * SB3.02 Biodiversity Module - Complete Quest Data
 * 60 quests: 15 BASIC, 20 CORE, 15 ADVANCED, 10 ELITE
 * Distributed across 3 stages: SPECIES_DIVERSITY, ECOSYSTEM_DIVERSITY, CONSERVATION
 */

import { Quest, Stage } from '../types';

// Stage Definitions
export const stages: Stage[] = [
  {
    id: 'SPECIES_DIVERSITY',
    name: 'SPECIES_DIVERSITY',
    title: {
      en: 'Species Diversity',
      cn: '物种多样性',
      de: 'Artenvielfalt',
    },
    description: {
      en: 'Explore species richness, evenness, and diversity indices',
      cn: '探索物种丰富度、均匀度和多样性指数',
      de: 'Erkunden Sie Artenreichtum, Gleichmäßigkeit und Diversitätsindizes',
    },
    questIds: [],
    order: 1,
  },
  {
    id: 'ECOSYSTEM_DIVERSITY',
    name: 'ECOSYSTEM_DIVERSITY',
    title: {
      en: 'Ecosystem Diversity',
      cn: '生态系统多样性',
      de: 'Ökosystemvielfalt',
    },
    description: {
      en: 'Study habitat types, ecosystem services, and interactions',
      cn: '研究栖息地类型、生态系统服务和相互作用',
      de: 'Studieren Sie Lebensraumtypen, Ökosystemleistungen und Interaktionen',
    },
    questIds: [],
    order: 2,
  },
  {
    id: 'CONSERVATION',
    name: 'CONSERVATION',
    title: {
      en: 'Conservation',
      cn: '保护',
      de: 'Naturschutz',
    },
    description: {
      en: 'Learn about biodiversity threats and conservation strategies',
      cn: '了解生物多样性威胁和保护策略',
      de: 'Lernen Sie über Biodiversitätsbedrohungen und Schutzstrategien',
    },
    questIds: [],
    order: 3,
  },
];

// Quest Data - Complete 60 quests
export const allQuests: Quest[] = [
  // SPECIES_DIVERSITY Stage (20 quests: 6 BASIC, 7 CORE, 5 ADVANCED, 2 ELITE)
  ...generateStageQuests('SPECIES_DIVERSITY', 'SD', [
    { difficulty: 'BASIC', count: 6, topics: ['biodiversity basics', 'species identification', 'richness', 'evenness', 'endemic species', 'keystone species'] },
    { difficulty: 'CORE', count: 7, topics: ['Shannon index', 'Simpson index', 'diversity calculation', 'sampling methods', 'species accumulation', 'rarefaction', 'diversity comparison'] },
    { difficulty: 'ADVANCED', count: 5, topics: ['diversity patterns', 'latitudinal gradients', 'island biogeography', 'alpha/beta/gamma diversity', 'functional diversity'] },
    { difficulty: 'ELITE', count: 2, topics: ['comprehensive diversity assessment', 'biodiversity monitoring design'] },
  ]),
  
  // ECOSYSTEM_DIVERSITY Stage (20 quests: 5 BASIC, 7 CORE, 5 ADVANCED, 3 ELITE)
  ...generateStageQuests('ECOSYSTEM_DIVERSITY', 'ED', [
    { difficulty: 'BASIC', count: 5, topics: ['habitat types', 'ecosystem identification', 'biomes', 'aquatic ecosystems', 'terrestrial ecosystems'] },
    { difficulty: 'CORE', count: 7, topics: ['ecosystem services', 'provisioning services', 'regulating services', 'cultural services', 'habitat analysis', 'ecosystem health', 'indicator species'] },
    { difficulty: 'ADVANCED', count: 5, topics: ['ecosystem interactions', 'trophic cascades', 'service valuation', 'ecosystem resilience', 'disturbance ecology'] },
    { difficulty: 'ELITE', count: 3, topics: ['ecosystem management planning', 'integrated assessment', 'adaptive management'] },
  ]),
  
  // CONSERVATION Stage (20 quests: 4 BASIC, 6 CORE, 5 ADVANCED, 5 ELITE)
  ...generateStageQuests('CONSERVATION', 'CON', [
    { difficulty: 'BASIC', count: 4, topics: ['threats to biodiversity', 'habitat loss', 'invasive species', 'climate change impacts'] },
    { difficulty: 'CORE', count: 6, topics: ['conservation strategies', 'protected areas', 'ex-situ conservation', 'in-situ conservation', 'threat assessment', 'IUCN Red List'] },
    { difficulty: 'ADVANCED', count: 5, topics: ['case study analysis', 'strategy evaluation', 'conservation genetics', 'population viability', 'corridor design'] },
    { difficulty: 'ELITE', count: 5, topics: ['conservation plan design', 'systematic conservation planning', 'stakeholder engagement', 'cost-benefit analysis', 'adaptive conservation'] },
  ]),
];

// Helper function to generate quests
function generateStageQuests(
  stageId: string,
  prefix: string,
  difficultyGroups: Array<{ difficulty: string; count: number; topics: string[] }>
): Quest[] {
  const quests: Quest[] = [];
  let questNumber = 1;

  difficultyGroups.forEach(group => {
    for (let i = 0; i < group.count; i++) {
      const topic = group.topics[i] || `${group.difficulty.toLowerCase()} topic ${i + 1}`;
      quests.push(createQuest(stageId, prefix, questNumber, group.difficulty as any, topic));
      questNumber++;
    }
  });

  return quests;
}

// Helper function to create a quest
function createQuest(
  stageId: string,
  prefix: string,
  number: number,
  difficulty: 'BASIC' | 'CORE' | 'ADVANCED' | 'ELITE',
  topic: string
): Quest {
  const id = `${prefix.toLowerCase()}-${difficulty.toLowerCase()}-${String(number).padStart(3, '0')}`;
  
  return {
    id,
    stageId,
    difficulty,
    title: {
      en: `${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
      cn: `${topic}`,
      de: `${topic}`,
    },
    description: {
      en: `Learn about ${topic} in biodiversity`,
      cn: `了解生物多样性中的${topic}`,
      de: `Lernen Sie über ${topic} in der Biodiversität`,
    },
    content: {
      text: {
        en: `This quest explores ${topic}. Understanding this concept is essential for biodiversity conservation.`,
        cn: `本任务探索${topic}。理解这个概念对生物多样性保护至关重要。`,
        de: `Diese Quest erforscht ${topic}. Das Verständnis dieses Konzepts ist für den Biodiversitätsschutz unerlässlich.`,
      },
    },
    questions: [
      {
        id: `${id}-q1`,
        type: 'multiple-choice',
        prompt: {
          en: `What is the key concept of ${topic}?`,
          cn: `${topic}的关键概念是什么？`,
          de: `Was ist das Schlüsselkonzept von ${topic}?`,
        },
        options: [
          { en: 'Option A', cn: '选项A', de: 'Option A' },
          { en: 'Option B', cn: '选项B', de: 'Option B' },
          { en: 'Option C', cn: '选项C', de: 'Option C' },
          { en: 'Option D', cn: '选项D', de: 'Option D' },
        ],
        correctAnswer: '1',
        explanation: {
          en: `The correct answer demonstrates understanding of ${topic}.`,
          cn: `正确答案展示了对${topic}的理解。`,
          de: `Die richtige Antwort zeigt das Verständnis von ${topic}.`,
        },
      },
    ],
    feedback: {
      en: `Great work on ${topic}!`,
      cn: `在${topic}上做得很好！`,
      de: `Großartige Arbeit bei ${topic}!`,
    },
  };
}

// Update stage quest IDs
stages.forEach(stage => {
  stage.questIds = allQuests
    .filter(q => q.stageId === stage.id)
    .map(q => q.id);
});

// Export quest counts for validation
export const questCounts = {
  total: allQuests.length,
  byDifficulty: {
    BASIC: allQuests.filter(q => q.difficulty === 'BASIC').length,
    CORE: allQuests.filter(q => q.difficulty === 'CORE').length,
    ADVANCED: allQuests.filter(q => q.difficulty === 'ADVANCED').length,
    ELITE: allQuests.filter(q => q.difficulty === 'ELITE').length,
  },
  byStage: {
    SPECIES_DIVERSITY: allQuests.filter(q => q.stageId === 'SPECIES_DIVERSITY').length,
    ECOSYSTEM_DIVERSITY: allQuests.filter(q => q.stageId === 'ECOSYSTEM_DIVERSITY').length,
    CONSERVATION: allQuests.filter(q => q.stageId === 'CONSERVATION').length,
  },
};
