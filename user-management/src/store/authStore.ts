import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState } from './authStore.type';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: "",
      expiresIn: 0,
      setToken: (token, expiresIn) => set({ accessToken: token, expiresIn }),
      clearToken: () => set({ accessToken: "", expiresIn: 0 }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage), // ✅ Type-safe & recommended
    }
  )
);
