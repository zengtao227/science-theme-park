import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { track } from '@vercel/analytics';
import { getDefaultHistoryModuleId } from '@/lib/historyDisplay';
import { normalizeModuleCode } from '@/lib/moduleCode';
import { MODULE_STAGE_RULES } from '@/lib/feedback/moduleStageRules';

export type StageId = string;
export type DifficultyLevel = 'BASIC' | 'CORE' | 'ADVANCED' | 'ELITE';
export type AchievementId = 'first_light' | 'first_launch' | 'mole_master' | 'molecular_architect' | 'time_traveler' | 'calculus_god';
export type HistoryEntry = { id: string; timestamp: number; moduleCode: string; moduleId?: string; stage: string; stageLabel?: string; difficulty: DifficultyLevel; score: number; durationMs: number; rigor: boolean; };
export type AchievementRecord = { unlocked: boolean; timestamp?: number };
export interface UserProfile { username: string; createdAt: number; lastActive: number; avatar?: string }
export interface ModuleProgress { [moduleId: string]: { stages: { [stageId: string]: boolean }; lastPlayed?: number } }
export interface AiProviderConfig { useDefault: boolean; provider?: 'OPENAI' | 'GEMINI' | 'DEEPSEEK' | 'MINIMAX' | 'NVIDIA' | 'CUSTOM'; baseUrl?: string; apiKey?: string; modelName?: string }

interface AppState {
  hasAcceptedProtocol: boolean; currentLanguage: 'EN' | 'CN' | 'DE'; progress: ModuleProgress; history: HistoryEntry[];
  achievements: Record<AchievementId, AchievementRecord>; lastAchievement?: AchievementId; aiProviderConfig: AiProviderConfig;
  currentUser: string | null; users: Record<string, UserProfile>; userProgress: Record<string, ModuleProgress>;
  userHistory: Record<string, HistoryEntry[]>; userAchievements: Record<string, Record<AchievementId, AchievementRecord>>;
  acceptProtocol: () => void; resetProtocol: () => void; setLanguage: (lang: 'EN' | 'CN' | 'DE') => void;
  setAiProviderConfig: (config: Partial<AiProviderConfig>) => void; addHistory: (entry: HistoryEntry) => void; clearLastAchievement: () => void;
  setCurrentUser: (username: string) => void; createUser: (username: string) => void; switchUser: (username: string) => void; getUserList: () => UserProfile[];
  completeStage: (moduleId: string, stageId: string) => void; getModuleProgress: (moduleId: string) => number; getSectorProgress: (sector: 'math' | 'physics' | 'chemistry') => number;
}

const DEFAULT_ACHIEVEMENTS: Record<AchievementId, AchievementRecord> = {
  first_light: { unlocked: false }, first_launch: { unlocked: false }, mole_master: { unlocked: false },
  molecular_architect: { unlocked: false }, time_traveler: { unlocked: false }, calculus_god: { unlocked: false },
};

function normalizeHistoryEntry(entry: HistoryEntry): HistoryEntry {
  return { ...entry, moduleCode: normalizeModuleCode(entry.moduleCode), moduleId: entry.moduleId ?? getDefaultHistoryModuleId(entry.moduleCode), stageLabel: undefined };
}
function normalizeHistoryEntries(entries: HistoryEntry[] | undefined): HistoryEntry[] { return Array.isArray(entries) ? entries.map(normalizeHistoryEntry) : []; }
function normalizeProgressKeys(progress: ModuleProgress | undefined): ModuleProgress {
  if (!progress || typeof progress !== 'object') return {};
  const result: ModuleProgress = {};
  for (const [key, value] of Object.entries(progress)) {
    if (!value) continue;
    const normalized = normalizeModuleCode(key);
    const existing = result[normalized];
    result[normalized] = existing ? { stages: { ...existing.stages, ...value.stages }, lastPlayed: Math.max(existing.lastPlayed ?? 0, value.lastPlayed ?? 0) || undefined } : value;
  }
  return result;
}
function stageCount(moduleId: string): number {
  const id = normalizeModuleCode(moduleId);
  // WHY: denominator must not include completed-stage count — that makes completed/total always 1.
  // Modules absent from MODULE_STAGE_RULES get a conservative fallback of 3.
  return Math.max(Object.keys(MODULE_STAGE_RULES[id] || {}).length, 3);
}
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hasAcceptedProtocol: false, currentLanguage: 'DE', progress: {}, history: [], achievements: { ...DEFAULT_ACHIEVEMENTS }, aiProviderConfig: { useDefault: true, provider: 'NVIDIA' },
      currentUser: null, users: {}, userProgress: {}, userHistory: {}, userAchievements: {},
      acceptProtocol: () => set({ hasAcceptedProtocol: true }), resetProtocol: () => set({ hasAcceptedProtocol: false }), setLanguage: (lang) => set({ currentLanguage: lang }),
      setAiProviderConfig: (config) => set((state) => ({ aiProviderConfig: { ...state.aiProviderConfig, ...config } })),
      addHistory: (entry) => set((state) => {
        const normalizedEntry = normalizeHistoryEntry(entry); const history = [normalizedEntry, ...state.history].slice(0, 200); const achievements = { ...state.achievements }; const unlocked: AchievementId[] = []; const code = normalizedEntry.moduleCode;
        if (!achievements.first_launch.unlocked && history.length >= 1) { achievements.first_launch = { unlocked: true, timestamp: normalizedEntry.timestamp }; unlocked.push('first_launch'); }
        if (!achievements.first_light.unlocked && code === 'p3-01') { achievements.first_light = { unlocked: true, timestamp: normalizedEntry.timestamp }; unlocked.push('first_light'); }
        if (!achievements.mole_master.unlocked && code === 'c1-02' && normalizedEntry.score >= 1) { achievements.mole_master = { unlocked: true, timestamp: normalizedEntry.timestamp }; unlocked.push('mole_master'); }
        if (!achievements.molecular_architect.unlocked && code === 'c3-01') { achievements.molecular_architect = { unlocked: true, timestamp: normalizedEntry.timestamp }; unlocked.push('molecular_architect'); }
        if (!achievements.time_traveler.unlocked && code === 'p1-04') { achievements.time_traveler = { unlocked: true, timestamp: normalizedEntry.timestamp }; unlocked.push('time_traveler'); }
        if (!achievements.calculus_god.unlocked && code === 'gm1-01' && normalizedEntry.score >= 1) { achievements.calculus_god = { unlocked: true, timestamp: normalizedEntry.timestamp }; unlocked.push('calculus_god'); }
        if (typeof window !== 'undefined') track('experiment_saved', { module: normalizedEntry.moduleCode, stage: normalizedEntry.stage, score: normalizedEntry.score, durationMs: normalizedEntry.durationMs, rigor: normalizedEntry.rigor });
        return { history, userHistory: state.currentUser ? { ...state.userHistory, [state.currentUser]: history } : state.userHistory, achievements, userAchievements: state.currentUser ? { ...state.userAchievements, [state.currentUser]: achievements } : state.userAchievements, lastAchievement: unlocked[0] ?? state.lastAchievement };
      }),
      clearLastAchievement: () => set({ lastAchievement: undefined }), setCurrentUser: (username) => set({ currentUser: username }),
      createUser: (username) => set((state) => { const now = Date.now(); return { currentUser: username, progress: {}, history: [], achievements: { ...DEFAULT_ACHIEVEMENTS }, users: { ...state.users, [username]: { username, createdAt: now, lastActive: now } }, userProgress: { ...state.userProgress, [username]: {} }, userHistory: { ...state.userHistory, [username]: [] }, userAchievements: { ...state.userAchievements, [username]: { ...DEFAULT_ACHIEVEMENTS } } }; }),
      switchUser: (username) => set((state) => !state.users[username] ? state : { currentUser: username, users: { ...state.users, [username]: { ...state.users[username], lastActive: Date.now() } }, progress: state.userProgress[username] || {}, history: state.userHistory[username] || [], achievements: state.userAchievements[username] || { ...DEFAULT_ACHIEVEMENTS } }),
      getUserList: () => Object.values(get().users).sort((a, b) => b.lastActive - a.lastActive),
      completeStage: (moduleId, stageId) => set((state) => {
        const user = state.currentUser; const normalizedId = normalizeModuleCode(moduleId); const newProgress = { ...state.progress, [normalizedId]: { ...state.progress[normalizedId], stages: { ...(state.progress[normalizedId]?.stages || {}), [stageId]: true }, lastPlayed: Date.now() } };
        return user ? { progress: newProgress, userProgress: { ...state.userProgress, [user]: newProgress } } : { progress: newProgress };
      }),
      getModuleProgress: (moduleId) => { const state = get(); const id = normalizeModuleCode(moduleId); const moduleData = state.progress[id]; if (!moduleData) return 0; const completed = Object.values(moduleData.stages).filter(Boolean).length; return Math.min(100, Math.round((completed / stageCount(id)) * 100)); },
      getSectorProgress: (sector) => {
        const state = get(); const modules: Record<string, string[]> = {
          math: ['sm1-01','sm1-02','sm1-03','sm1-04','sm1-05','sm2-01','sm2-02','sm2-03','sm2-04','sm2-05','sm2-06','sm2-07','sm2-08','sm2-09','sm2-10','sm2-11','sm2-12','sm2-13','sm3-01','sm3-02','sm3-03','sm3-04','sm3-05','gm1-01','gm1-01-advanced','gm1-02','gm1-03','gm2-01','gm2-02','gm3-01','gm4-01'],
          physics: ['sp1-01','sp1-02','sp2-01','sp2-02','sp2-03','sp3-01','sp3-02','sp3-03','sp3-04','sp3-05','sp3-06','sp3-07','sp3-08','gp1-01','gp1-02','gp1-03','gp1-04','gp2-01','gp2-02','gp2-03','gp3-01','gp3-02','gp3-03'],
          chemistry: ['sc1-01','sc1-02','sc1-03','sc1-04','sc1-05','sc1-06','sc2-01','sc2-02','sc2-03','sc2-04','sc2-05','sc2-06','sc2-07','sc3-01','sc3-02','sc3-03','sc3-04','sc3-05','gc1-01','gc1-02','gc2-01','gc3-01','gc3-02'],
        };
        const sectorModules = modules[sector] || []; if (sectorModules.length === 0) return 0; let completedStages = 0; let totalPossibleStages = 0;
        sectorModules.forEach(id => { const moduleData = state.progress[id]; totalPossibleStages += stageCount(id); if (moduleData) completedStages += Object.values(moduleData.stages).filter(Boolean).length; });
        return Math.min(100, Math.round((completedStages / totalPossibleStages) * 100));
      },
    }),
    { name: 'science-park-storage', version: 5, migrate: (persistedState, fromVersion) => {
      if (!persistedState || typeof persistedState !== 'object') return persistedState; const state = persistedState as Partial<AppState> & { history?: HistoryEntry[]; userHistory?: Record<string, HistoryEntry[]>; userProgress?: Record<string, ModuleProgress>; aiProviderConfig?: AiProviderConfig };
      const normalizedHistory = normalizeHistoryEntries(state.history); const normalizedUserHistory = Object.fromEntries(Object.entries(state.userHistory || {}).map(([username, entries]) => [username, normalizeHistoryEntries(entries)]));
      const normalizedProgress = fromVersion < 4 ? normalizeProgressKeys(state.progress as ModuleProgress) : (state.progress as ModuleProgress) ?? {}; const normalizedUserProgress = fromVersion < 4 ? Object.fromEntries(Object.entries(state.userProgress || {}).map(([username, prog]) => [username, normalizeProgressKeys(prog)])) : (state.userProgress ?? {});
      return { ...state, history: normalizedHistory, userHistory: normalizedUserHistory, progress: normalizedProgress, userProgress: normalizedUserProgress, aiProviderConfig: state.aiProviderConfig ?? { useDefault: true, provider: 'NVIDIA' } };
    } }
  )
);
