import { create } from "zustand";

interface useLoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/* This code is creating a custom React hook called `useLoginModal` using the `create` function from
the `zustand` library. The hook returns an object with three properties: `isOpen`, `onOpen`, and
`onClose`. */
const useLoginModal = create<useLoginModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
