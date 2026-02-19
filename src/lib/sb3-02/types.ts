/**
 * SB3.02 Biodiversity Module - Type Definitions
 * Core data models and TypeScript interfaces
 */

export type Language = 'en' | 'cn' | 'de';

export type DifficultyLevel = 'BASIC' | 'CORE' | 'ADVANCED' | 'ELITE';

export type StageName = 'SPECIES_DIVERSITY' | 'ECOSYSTEM_DIVERSITY' | 'CONSERVATION';

export interface LocalizedString {
  en: string;
  cn: string;
  de: string;
}

export interface Quest {
  id: string;
  stageId: string;
  difficulty: DifficultyLevel;
  title: LocalizedString;
  description: LocalizedString;
  content: QuestContent;
  questions: Question[];
  feedback: LocalizedString;
}

export interface QuestContent {
  text: LocalizedString;
  latex?: string[];
  images?: string[];
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'short-answer' | 'matching';
  prompt: LocalizedString;
  options?: LocalizedString[];
  correctAnswer: string | string[];
  explanation: LocalizedString;
}

export interface Stage {
  id: string;
  name: StageName;
  title: LocalizedString;
  description: LocalizedString;
  questIds: string[];
  order: number;
}

export interface BaselScenario {
  id: string;
  title: LocalizedString;
  content: LocalizedString;
  location: string;
  relatedConcepts: string[];
  images?: string[];
}

export interface UserProgress {
  moduleId: string;
  completedQuests: string[];
  currentStage: string;
  lastAccessed: Date;
  language: Language;
}

// Visualization Data Models

export interface SpeciesEntry {
  name: LocalizedString;
  count: number;
  imageUrl?: string;
}

export interface DiversityCalculatorData {
  species: SpeciesEntry[];
  totalIndividuals: number;
}

export interface DiversityMetrics {
  speciesRichness: number;
  shannonIndex: number;
  simpsonIndex: number;
  evenness: number;
  totalIndividuals: number;
}

export interface EcosystemRegion {
  id: string;
  name: LocalizedString;
  type: string;
  biodiversityScore: number;
  keySpecies: string[];
  threats: string[];
  coordinates: { lat: number; lng: number };
}

export interface EcosystemMapData {
  regions: EcosystemRegion[];
  selectedRegion?: string;
}

export interface Threat {
  id: string;
  name: LocalizedString;
  severity: number;
  affectedSpecies: string[];
}

export interface Strategy {
  id: string;
  name: LocalizedString;
  cost: number;
  effectiveness: number;
  addressedThreats: string[];
}

export interface ConservationPlannerData {
  threats: Threat[];
  strategies: Strategy[];
  budget: number;
}

export interface ConservationPlan {
  selectedStrategies: string[];
  totalCost: number;
  expectedImpact: number;
}
