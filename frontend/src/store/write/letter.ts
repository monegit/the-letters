import create from "zustand";

interface LetterState {
  name: string;
  paragraphList: string[][];

  setName: (name: string) => void;
}

interface PageState {
  selectedPageIndex: number;
  selectedParagraphIndex: number;
  pageCount: number;
  paragraphCount: number;

  setPageIndex: (index: number) => void;
  setPageCount: (count: number) => void;
}

export const letterStore = create<LetterState>()((set) => ({
  paragraphList: [[]],
  name: "",
  setName: (name: string) => {
    set({ name: name });
  },
  // pageIndex: 0,
  // setParagraphs: (input: string, index: number) =>
}));

export const pageStore = create<PageState>()((set) => ({
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
