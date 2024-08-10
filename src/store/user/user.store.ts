import { UserData, UserStore } from '@/src/store/user/user.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState: UserStore = {
  userData: null,
  setUserData: () => {},
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialState,
      setUserData: (profile: UserData) => set(() => ({ userData: profile })),
    }),
    { name: 'user-storage' },
  ),
);
