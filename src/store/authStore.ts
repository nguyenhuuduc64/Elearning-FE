// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      
      setAuth: (user: User, token: string) => {
        console.log('🔄 setAuth called with:', { user, token });
        
        localStorage.setItem('access_token', token);
        set({ user, token });
        
        // Kiểm tra state ngay sau khi set
        setTimeout(() => {
          console.log('📦 Current state after set:', get());
        }, 100);
      },
      
      logout: () => {
        localStorage.removeItem('access_token');
        set({ user: null, token: null });
      },
      
      isAuthenticated: () => {
        const { token } = get();
        return !!token;
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        token: state.token 
      }),
    }
  )
);