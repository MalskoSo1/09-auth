import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NoteStore {
  user: User;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

const initialUser = {
  email: "",
  username: "",
  avatar: "",
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => {
      return {
        user: initialUser,
        isAuthenticated: false,
        setUser: (user) =>
          set({
            user,
            isAuthenticated: true,
          }),
        clearAuth: () =>
          set({
            user: initialUser,
            isAuthenticated: false,
          }),
      };
    },
    {
      name: "auth-user",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
