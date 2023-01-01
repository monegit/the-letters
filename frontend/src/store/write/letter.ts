import create from "zustand";

interface LetterState {
  name: string;
  paragraphList: string[][];

  setName: (name: string) => void;
}

export const useLetterStore = create<LetterState>()((set) => ({
  paragraphList: [[]],
  name: "",
  setName: (name: string) => {
    set({ name: name });
  },
}));
