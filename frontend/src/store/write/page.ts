import create from "zustand";

interface PageState {
  selectedPageIndex: number;
  selectedParagraphIndex: number;
  pageCount: number;
  paragraphCount: number;

  setPageIndex: (index: number) => void;
  setPageCount: (count: number) => void;
}

export const usePageStore = create<PageState>()((set) => ({
  selectedPageIndex: 0,
  selectedParagraphIndex: 0,
  pageCount: 0,
  paragraphCount: 0,

  setPageCount: (count: number) => {
    set({ pageCount: count });
  },
  setPageIndex: (index: number) => {
    set({ selectedPageIndex: index });
  },
}));
