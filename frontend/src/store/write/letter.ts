import create from "zustand";

interface LetterState {
  name: string;
  paragraphContents: string[][];
  effectData: string[][][];
  isPreview: boolean;

  setInit: () => void;
}

export const useLetterStore = create<LetterState>()((set) => ({
  paragraphContents: [[]],
  effectData: [[[]]],
  name: "",
  isPreview: false,

  setInit: () => {
    set(() => ({ name: "", paragraphContents: [[]], effectData: [[[]]] }));
  },
}));
