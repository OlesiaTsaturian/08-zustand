import { create } from 'zustand';
import { CreateParams } from '../api';
import { persist } from 'zustand/middleware';

type NoteDraftStore = {
  draft: CreateParams;
  setDraft: (note: CreateParams) => void;
  clearDraft: () => void;
};

const initialDraft: CreateParams = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    { name: 'note-draft', partialize: (state) => ({ draft: state.draft }) },
  ),
);
