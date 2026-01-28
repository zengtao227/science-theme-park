import { create } from 'zustand';

interface AppState {
  hasAcceptedProtocol: boolean;
  currentLanguage: 'EN' | 'CN' | 'DE';
  acceptProtocol: () => void;
  resetProtocol: () => void;
  setLanguage: (lang: 'EN' | 'CN' | 'DE') => void;
}

function getInitialLanguage(): 'EN' | 'CN' | 'DE' {
  if (typeof window === 'undefined') return 'DE';
  const saved = window.localStorage.getItem('language');
  if (saved === 'DE' || saved === 'EN' || saved === 'CN') return saved;
  return 'DE';
}

export const useAppStore = create<AppState>((set) => ({
  hasAcceptedProtocol: false,
  currentLanguage: getInitialLanguage(),
  acceptProtocol: () => set({ hasAcceptedProtocol: true }),
  resetProtocol: () => set({ hasAcceptedProtocol: false }),
  setLanguage: (lang: 'EN' | 'CN' | 'DE') => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('language', lang);
    }
    set({ currentLanguage: lang });
  },
}));
