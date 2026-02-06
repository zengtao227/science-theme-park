import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { track } from '@vercel/analytics';

export type StageId = string;
export type DifficultyLevel = 'BASIC' | 'CORE' | 'ADVANCED' | 'ELITE';
export type AchievementId =
  | 'first_light'
  | 'first_launch'
  | 'mole_master'
  | 'molecular_architect'
  | 'time_traveler'
  | 'calculus_god';

export type HistoryEntry = {
  id: string;
  timestamp: number;
  moduleCode: string;
  stage: string;
  stageLabel: string;
  difficulty: DifficultyLevel;
  score: number;
  durationMs: number;
  rigor: boolean;
};

export type AchievementRecord = {
  unlocked: boolean;
  timestamp?: number;
};

export interface UserProfile {
  username: string;
  createdAt: number;
  lastActive: number;
  avatar?: string;
}

export interface ModuleProgress {
  [moduleId: string]: {
    stages: {
      [stageId: string]: boolean; // true if completed
    };
    lastPlayed?: number; // timestamp
  };
}

interface AppState {
  hasAcceptedProtocol: boolean;
  currentLanguage: 'EN' | 'CN' | 'DE';
  progress: ModuleProgress;
  history: HistoryEntry[];
  achievements: Record<AchievementId, AchievementRecord>;
  lastAchievement?: AchievementId;
  
  // User system
  currentUser: string | null;
  users: Record<string, UserProfile>;
  userProgress: Record<string, ModuleProgress>;
  userHistory: Record<string, HistoryEntry[]>;
  userAchievements: Record<string, Record<AchievementId, AchievementRecord>>;

  acceptProtocol: () => void;
  resetProtocol: () => void;
  setLanguage: (lang: 'EN' | 'CN' | 'DE') => void;
  addHistory: (entry: HistoryEntry) => void;
  clearLastAchievement: () => void;
  
  // User actions
  setCurrentUser: (username: string) => void;
  createUser: (username: string) => void;
  switchUser: (username: string) => void;
  getUserList: () => UserProfile[];

  // Progress Actions
  completeStage: (moduleId: string, stageId: string) => void;
  getModuleProgress: (moduleId: string) => number; // Returns percentage 0-100
  getSectorProgress: (sector: 'math' | 'physics' | 'chemistry') => number;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hasAcceptedProtocol: false,
      currentLanguage: 'EN',
      progress: {},
      history: [],
      achievements: {
        first_light: { unlocked: false },
        first_launch: { unlocked: false },
        mole_master: { unlocked: false },
        molecular_architect: { unlocked: false },
        time_traveler: { unlocked: false },
        calculus_god: { unlocked: false },
      },
      
      // User system initial state
      currentUser: null,
      users: {},
      userProgress: {},
      userHistory: {},
      userAchievements: {},

      acceptProtocol: () => set({ hasAcceptedProtocol: true }),
      resetProtocol: () => set({ hasAcceptedProtocol: false }),
      setLanguage: (lang) => set({ currentLanguage: lang }),
      addHistory: (entry) =>
        set((state) => {
          const history = [entry, ...state.history].slice(0, 200);
          const achievements = { ...state.achievements };
          const unlocked: AchievementId[] = [];

          if (!achievements.first_launch.unlocked && history.length >= 1) {
            achievements.first_launch = { unlocked: true, timestamp: entry.timestamp };
            unlocked.push('first_launch');
          }
          if (!achievements.first_light.unlocked && entry.moduleCode === 'P3.01') {
            achievements.first_light = { unlocked: true, timestamp: entry.timestamp };
            unlocked.push('first_light');
          }
          if (!achievements.mole_master.unlocked && entry.moduleCode === 'C1.02' && entry.score >= 1) {
            achievements.mole_master = { unlocked: true, timestamp: entry.timestamp };
            unlocked.push('mole_master');
          }
          if (!achievements.molecular_architect.unlocked && entry.moduleCode === 'C3.01') {
            achievements.molecular_architect = { unlocked: true, timestamp: entry.timestamp };
            unlocked.push('molecular_architect');
          }
          if (!achievements.time_traveler.unlocked && entry.moduleCode === 'P1.04') {
            achievements.time_traveler = { unlocked: true, timestamp: entry.timestamp };
            unlocked.push('time_traveler');
          }
          if (!achievements.calculus_god.unlocked && entry.moduleCode === 'G1.01' && entry.score >= 1) {
            achievements.calculus_god = { unlocked: true, timestamp: entry.timestamp };
            unlocked.push('calculus_god');
          }

          if (typeof window !== 'undefined') {
            track('experiment_saved', {
              module: entry.moduleCode,
              stage: entry.stage,
              score: entry.score,
              durationMs: entry.durationMs,
              rigor: entry.rigor,
            });
          }

          return {
            history,
            achievements,
            lastAchievement: unlocked[0] ?? state.lastAchievement,
          };
        }),
      clearLastAchievement: () => set({ lastAchievement: undefined }),
      
      // User system actions
      setCurrentUser: (username) => set({ currentUser: username }),
      
      createUser: (username) =>
        set((state) => {
          const now = Date.now();
          return {
            currentUser: username,
            users: {
              ...state.users,
              [username]: {
                username,
                createdAt: now,
                lastActive: now,
              },
            },
            userProgress: {
              ...state.userProgress,
              [username]: {},
            },
            userHistory: {
              ...state.userHistory,
              [username]: [],
            },
            userAchievements: {
              ...state.userAchievements,
              [username]: {
                first_light: { unlocked: false },
                first_launch: { unlocked: false },
                mole_master: { unlocked: false },
                molecular_architect: { unlocked: false },
                time_traveler: { unlocked: false },
                calculus_god: { unlocked: false },
              },
            },
          };
        }),
      
      switchUser: (username) =>
        set((state) => {
          if (!state.users[username]) return state;
          return {
            currentUser: username,
            users: {
              ...state.users,
              [username]: {
                ...state.users[username],
                lastActive: Date.now(),
              },
            },
            // Load user-specific data
            progress: state.userProgress[username] || {},
            history: state.userHistory[username] || [],
            achievements: state.userAchievements[username] || {
              first_light: { unlocked: false },
              first_launch: { unlocked: false },
              mole_master: { unlocked: false },
              molecular_architect: { unlocked: false },
              time_traveler: { unlocked: false },
              calculus_god: { unlocked: false },
            },
          };
        }),
      
      getUserList: () => {
        const state = get();
        return Object.values(state.users).sort((a, b) => b.lastActive - a.lastActive);
      },

      completeStage: (moduleId, stageId) =>
        set((state) => {
          const user = state.currentUser;
          const newProgress = {
            ...state.progress,
            [moduleId]: {
              ...state.progress[moduleId],
              stages: {
                ...(state.progress[moduleId]?.stages || {}),
                [stageId]: true,
              },
              lastPlayed: Date.now(),
            },
          };
          
          // Save to user-specific progress if user exists
          if (user) {
            return {
              progress: newProgress,
              userProgress: {
                ...state.userProgress,
                [user]: newProgress,
              },
            };
          }
          
          return { progress: newProgress };
        }),

      getModuleProgress: (moduleId) => {
        const state = get();
        const normalizedId = moduleId.toLowerCase().replace('.', '-');
        const moduleData = state.progress[normalizedId];
        if (!moduleData) return 0;
        const stages = Object.values(moduleData.stages);
        if (stages.length === 0) return 0;
        const completed = stages.filter(Boolean).length;
        return Math.round((completed / Math.max(3, stages.length)) * 100);
      },

      getSectorProgress: (sector) => {
        const state = get();
        const modules = {
          math: ['sm1-01', 'sm1-02', 'sm2-01', 'sm2-02', 'sm2-03', 'sm2-04', 'sm2-05', 'sm2-06', 'sm3-01', 'gm1-01', 'gm2-01'],
          physics: ['sp1-02', 'sp1-03', 'sp2-02', 'sp3-01'],
          chemistry: ['sc1-01', 'sc1-02'],
        };

        const sectorModules = modules[sector] || [];
        if (sectorModules.length === 0) return 0;

        let completedStages = 0;
        let totalPossibleStages = 0;

        sectorModules.forEach(id => {
          totalPossibleStages += 3;
          const moduleData = state.progress[id];
          if (moduleData) {
            completedStages += Object.values(moduleData.stages).filter(Boolean).length;
          }
        });

        return Math.min(100, Math.round((completedStages / totalPossibleStages) * 100));
      },
    }),
    {
      name: 'science-park-storage', // name of the item in the storage (must be unique)
    }
  )
);
