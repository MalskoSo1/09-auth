import { NewNote, NoteTag } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NoteStore {
  draft: NewNote;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
}

const initialDraft = {
  title: "",
  content: "",
  tag: "Todo" as NoteTag,
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => {
      return {
        draft: initialDraft,
        setDraft: (note) => set({ draft: note }),

        clearDraft: () => set({ draft: initialDraft }),
      };
    },
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
