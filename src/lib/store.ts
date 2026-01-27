import { create } from 'zustand';

interface AppState {
  hasAcceptedProtocol: boolean;
  currentLanguage: 'EN' | 'CN' | 'DE';
  acceptProtocol: () => void;
  resetProtocol: () => void;
  setLanguage: (lang: 'EN' | 'CN' | 'DE') => void;
}

export const useAppStore = create<AppState>((set) => ({
  hasAcceptedProtocol: false,
  currentLanguage: 'EN',
  acceptProtocol: () => set({ hasAcceptedProtocol: true }),
  resetProtocol: () => set({ hasAcceptedProtocol: false }),
  setLanguage: (lang: 'EN' | 'CN' | 'DE') => set({ currentLanguage: lang }),
}));
