import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type StageId = string;

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

  acceptProtocol: () => void;
  resetProtocol: () => void;
  setLanguage: (lang: 'EN' | 'CN' | 'DE') => void;

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

      acceptProtocol: () => set({ hasAcceptedProtocol: true }),
      resetProtocol: () => set({ hasAcceptedProtocol: false }),
      setLanguage: (lang) => set({ currentLanguage: lang }),

      completeStage: (moduleId, stageId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [moduleId]: {
              ...state.progress[moduleId],
              stages: {
                ...(state.progress[moduleId]?.stages || {}),
                [stageId]: true,
              },
              lastPlayed: Date.now(),
            },
          },
        })),

      getModuleProgress: (moduleId) => {
        const state = get();
        const moduleData = state.progress[moduleId];
        if (!moduleData) return 0;
        const stages = Object.values(moduleData.stages);
        if (stages.length === 0) return 0;
        const completed = stages.filter(Boolean).length;
        return Math.round((completed / stages.length) * 100);
      },

      getSectorProgress: (sector) => {
        const state = get();
        const modules = {
          math: ['s1-01', 's1-02', 's2-01', 's2-02', 's2-03', 's2-04', 's2-05', 's2-06', 's3-01', 'g1-01'],
          physics: ['p1-02', 'p2-02', 'p3-01'],
          chemistry: ['c1-01'],
        };

        const sectorModules = modules[sector] || [];
        if (sectorModules.length === 0) return 0;

        let totalStages = 0;
        let completedStages = 0;

        sectorModules.forEach(moduleId => {
          const moduleData = state.progress[moduleId];
          if (moduleData) {
            const stages = Object.values(moduleData.stages);
            totalStages += stages.length;
            completedStages += stages.filter(Boolean).length;
          }
        });

        if (totalStages === 0) return 0;
        return Math.round((completedStages / totalStages) * 100);
      },
    }),
    {
      name: 'science-park-storage', // name of the item in the storage (must be unique)
    }
  )
);

