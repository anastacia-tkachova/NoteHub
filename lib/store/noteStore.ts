import { create } from 'zustand';
import { PostNote } from '@/types/note';
import { persist } from 'zustand/middleware';

type NoteDraftStore  = {
  draft: PostNote;
  setDraft: (note: PostNote) => void;
  clearDraft: () => void;
};

const initialDraft: PostNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore >()(persist((set) => ({
  draft: initialDraft,
  setDraft: (note) => set(() => ({ draft: note })),
  clearDraft: () => set(() => ({ draft: initialDraft })),
}),
  {
      name: 'note-draft',
      partialize: (state) => ({ draft: state.draft }),
    },));