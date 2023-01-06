import create from "zustand";

interface ModalState {
  isVisible: boolean;
}

export const useModalStore = create<ModalState>()((set) => ({
  isVisible: false,
}));
