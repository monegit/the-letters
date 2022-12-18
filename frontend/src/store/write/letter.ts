// import create from "zustand/react";

import create from "zustand";

export interface LetterState {
  pageIndex: number;
  paragraphs: string[][];
}

export const letterStore = create<LetterState>()((set) => ({
  paragraphs: [[]],
  pageIndex: 0,
  // setParagraphs: (input: string, index: number) =>
}));
