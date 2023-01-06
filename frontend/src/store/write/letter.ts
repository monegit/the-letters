import create from "zustand";

interface LetterState {
  name: string;
  paragraphContents: string[][];
  isPreview: boolean;

  setInit: () => void;
}

export const useLetterStore = create<LetterState>()((set) => ({
  paragraphContents: [[]],
  name: "",
  isPreview: false,

  setInit: () => {
    set(() => ({ name: "", paragraphContents: [[]] }));
  },
}));
