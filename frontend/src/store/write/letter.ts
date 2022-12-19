import create from "zustand";

export interface LetterState {
  // pageIndex: number;
  paragraphList: string[][];
}

export const letterStore = create<LetterState>()((set) => ({
  paragraphList: [[]],
  // pageIndex: 0,
  // setParagraphs: (input: string, index: number) =>
}));
