import create from "zustand";

interface LetterState {
  name: string;
  contents: [
    [
      {
        paragraph: string;
        effect: { effectContent: string; effectType: string };
      }
    ]
  ];
  isPreview: boolean;

  setInit: () => void;
}

export const useLetterStore = create<LetterState>()((set) => ({
  contents: [
    [{ paragraph: "", effect: { effectContent: "", effectType: "" } }],
  ],
  name: "",
  isPreview: false,

  setInit: () => {
    set(() => ({
      name: "",
      isPreview: false,
      contents: [
        [{ paragraph: "", effect: { effectContent: "", effectType: "" } }],
      ],
    }));
  },
}));
