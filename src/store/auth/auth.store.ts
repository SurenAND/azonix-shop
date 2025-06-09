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

function paginate<T>(items: T[], page = 1, limit = 10) {
  const total = items.length;
  const pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = items.slice(start, end);
  return { users: paginated, total, page, pages };
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

      updateUser: (profile: User) => {
        const users = getStoredUsers();
        const updatedUsers = users.map((user) =>
          user.id === profile.id ? profile : user,
        );
        saveUsers(updatedUsers);
        set({ currentUser: profile, error: null });
      },

      getUsers: (page = 1, limit = 10) => {
        const users = getStoredUsers();
        return paginate(users, page, limit);
      },

      getUsersByType: (type: string, page = 1, limit = 10) => {
        const users = getStoredUsers().filter((user) => user.type === type);
        return paginate(users, page, limit);
      },

      getUserById: (id: string) => {
        const users = getStoredUsers();
        return users.find((user) => user.id === id) || null;
      },

      deleteUser: (id: string) => {
        const users = getStoredUsers();
        const updatedUsers = users.filter((user) => user.id !== id);
        saveUsers(updatedUsers);
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ currentUser: state.currentUser }),
    },
  ),
);
