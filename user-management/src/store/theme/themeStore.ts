import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ThemeState } from './themeStore.type';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'theme-preference',
      storage: createJSONStorage(() => localStorage),
    }
  )
);