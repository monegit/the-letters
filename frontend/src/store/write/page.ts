import { ReactElement } from "react";
import create from "zustand";

interface PageState {
  selectedPageIndex: number;
  selectedParagraphIndex: number;
}

export const usePageStore = create<PageState>()((set) => ({
  selectedPageIndex: 0,
  selectedParagraphIndex: 0,
}));
