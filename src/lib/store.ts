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
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'science-park-storage', // name of the item in the storage (must be unique)
    }
  )
);

