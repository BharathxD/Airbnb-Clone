import { create } from "zustand";

interface useRentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/* This code is creating a custom hook called `useRentModal` using the `create` function from the
`zustand` library. The hook returns an object with three properties: `isOpen`, `onOpen`, and
`onClose`. */
const useRentModal = create<useRentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentModal;
