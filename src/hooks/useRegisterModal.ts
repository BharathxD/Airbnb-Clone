import { create } from "zustand";

/**
 * Represents the state and methods for a registration modal.
 *
 * @interface useRegisterModalStore
 * @property {boolean} isOpen - Indicates whether the registration modal is open.
 * @property {() => void} onOpen - Function to open the registration modal.
 * @property {() => void} onClose - Function to close the registration modal.
 */

interface useRegisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * Creates a Zustand store for managing the state of a registration modal.
 *
 * This custom hook, `useRegisterModal`, is created using the `create` function from the `zustand` library.
 * It returns an object with three properties: `isOpen`, `onOpen`, and `onClose`.
 *
 * - `isOpen`: A boolean value that indicates whether the registration modal is open or not.
 * - `onOpen`: A function to set the `isOpen` property to `true`, opening the registration modal.
 * - `onClose`: A function to set the `isOpen` property to `false`, closing the registration modal.
 *
 * @function useRegisterModal
 * @returns {useRegisterModalStore} - An object representing the state and methods for managing the registration modal.
 */

const useRegisterModal = create<useRegisterModalStore>((set) => ({
  isOpen: false,

  /**
   * Opens the registration modal.
   *
   * @function onOpen
   */
  onOpen: () => set({ isOpen: true }),

  /**
   * Closes the registration modal.
   *
   * @function onClose
   */
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
