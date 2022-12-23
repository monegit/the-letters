import create from "zustand";

interface ReadState {
  currentPageIndex: number;
  currentParagraphIndex: number;

  IncreasePageIndex: () => void;
  IncreaseParagraphIndex: () => void;
  ResetPageIndex: () => void;
  ResetParagraphIndex: () => void;
}

export const readStore = create<ReadState>()((set) => ({
  currentPageIndex: 0,
  currentParagraphIndex: 0,

  IncreasePageIndex: () => {
    set((state) => ({
      currentPageIndex: state.currentPageIndex + 1,
    }));
  },
  IncreaseParagraphIndex: () => {
    set((state) => ({
      currentParagraphIndex: state.currentParagraphIndex + 1,
    }));
  },
  ResetPageIndex: () => {
    set({ currentPageIndex: 0 });
  },
  ResetParagraphIndex: () => {
    set({ currentParagraphIndex: 0 });
  },
}));
