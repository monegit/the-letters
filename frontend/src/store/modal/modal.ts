import create from "zustand";

interface ModalState {
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isVisible: false,
  setVisible: (visible: boolean) => {
    set(() => ({ isVisible: visible }));
  },
}));
