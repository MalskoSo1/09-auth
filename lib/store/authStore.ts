import { User } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  isAuth: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuth: false,
  setUser: (user: User) => {
    set(() => ({ user, isAuth: true }));
  },
  clearUser: () => {
    set(() => ({ user: null, isAuth: false }));
  },
}));
