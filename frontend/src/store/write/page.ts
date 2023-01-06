import { ReactElement } from "react";
import create from "zustand";

interface PageState {
  selectedPageIndex: number;
  selectedParagraphIndex: number;

  pageCount: number;
  pageKey: number;

  paragraphCount: number;
  paragraphItems: ReactElement[];
  paragraphKey: number;

  setPageIndex: (index: number) => void;
  setPageCount: (count: number) => void;
  setPageKey: (key: number) => void;

  setSelectedParagraphIndex: (index: number) => void;
  appendParagraphItem: (item: ReactElement) => void;
  removeParagraphItem: (uniqueIndex: number) => void;
  setParagraphItems: (items: ReactElement[]) => void;
  increaseParagraphKey: () => void;
}

export const usePageStore = create<PageState>()((set) => ({
  selectedPageIndex: 0,
  selectedParagraphIndex: 0,

  pageCount: 0,
  pageKey: 0,

  paragraphCount: 0,
  paragraphItems: [],
  paragraphKey: 0,

  setPageCount: (count: number) => {
    set({ pageCount: count });
  },
  setPageIndex: (index: number) => {
    set({ selectedPageIndex: index });
  },
  setSelectedParagraphIndex: (index: number) => {
    set({ selectedParagraphIndex: index });
  },
  appendParagraphItem(item) {
    set((state) => ({ paragraphItems: state.paragraphItems.concat(item) }));
  },
  removeParagraphItem(uniqueIndex) {
    set((state) => ({
      paragraphItems: state.paragraphItems.filter(
        (item) =>
          item.key !==
          `Write/LetterPanel/pageIndex:${state.selectedPageIndex},paragraphIndex:${uniqueIndex}`
      ),
    }));
  },
  setParagraphItems(items): void {
    set((state) => ({
      paragraphItems: items,
    }));
  },
  increaseParagraphKey() {
    set((state) => ({ paragraphKey: state.paragraphKey + 1 }));
  },
  setPageKey(key) {
    set({ pageKey: key });
  },
}));
