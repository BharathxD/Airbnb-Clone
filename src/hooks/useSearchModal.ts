import { create } from "zustand";

/**
 * Interface describing the state for a search modal.
 *
 * @interface useSearchModalStore
 * @property {boolean} isOpen - A flag indicating whether the search modal is open.
 * @property {() => void} onOpen - A function to open the search modal.
 * @property {() => void} onClose - A function to close the search modal.
 */

interface useSearchModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * Creates a Zustand store for managing the state of a search modal.
 *
 * @function useSearchModal
 * @returns {useSearchModalStore} - An object containing the state and methods for managing the search modal.
 */

const useSearchModal = create<useSearchModalStore>((set) => ({
  isOpen: false,

  /**
   * Opens the search modal.
   *
   * @function onOpen
   */
  onOpen: () => set({ isOpen: true }),

  /**
   * Closes the search modal.
   *
   * @function onClose
   */
  onClose: () => set({ isOpen: false }),
}));

export default useSearchModal;
