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
        setUser: (userInfo) => set({ user: userInfo }),
        clearIsAuthenticated: () => set({ user: initialUser }),
      };
    },
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.user }),
    }
  )
);
