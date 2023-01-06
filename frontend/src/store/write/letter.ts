import create from "zustand";

interface LetterState {
  name: string;
  paragraphContents: string[][];

  setName: (name: string) => void;
  setInit: () => void;
}

export const useLetterStore = create<LetterState>()((set) => ({
  paragraphContents: [[]],
  name: "",
  setName: (name: string) => {
    set({ name: name });
  },
  setInit: () => {
    set(() => ({ name: "", paragraphContents: [[]] }));
  },
}));
