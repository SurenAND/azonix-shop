import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from './auth.type';

const USERS_KEY = 'auth_users';

function getStoredUsers(): User[] {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      error: null,

      signup: (newUser) => {
        const users = getStoredUsers();
        const exists = users.some((u) => u.username === newUser.username);
        if (exists) {
          set({ error: 'Username already exists' });
          return false;
        }

        const updatedUsers = [...users, newUser];
        saveUsers(updatedUsers);
        set({ currentUser: newUser, error: null });
        return true;
      },

      login: (username, password) => {
        const users = getStoredUsers();
        const user = users.find(
          (u) => u.username === username && u.password === password,
        );
        if (user) {
          set({ currentUser: user, error: null });
          return { success: true, userData: user };
        } else {
          set({ error: 'Invalid credentials' });
          return { success: false, userData: null };
        }
      },

      logout: () => {
        set({ currentUser: null, error: null });
      },
    }),
    {
      name: 'auth-store', // localStorage key for zustand state
      partialize: (state) => ({ currentUser: state.currentUser }), // persist only currentUser
    },
  ),
);
