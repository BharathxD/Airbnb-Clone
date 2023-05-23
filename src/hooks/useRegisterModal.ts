import { create } from "zustand";

interface useRegisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/* This code is creating a custom hook called `useRegisterModal` using the `create` function from the
`zustand` library. The hook returns an object with three properties: `isOpen`, `onOpen`, and
`onClose`. `isOpen` is a boolean value that indicates whether the register modal is currently open
or not. `onOpen` is a function that sets the `isOpen` property to `true`, and `onClose` is a
function that sets the `isOpen` property to `false`. The `set` function is used to update the state
of the `isOpen` property. The `useRegisterModal` hook can be used in any component to manage the
state of the register modal. */
const useRegisterModal = create<useRegisterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
