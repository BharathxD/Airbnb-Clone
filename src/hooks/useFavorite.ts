import { SafeUser } from "@/types";
import useLoginModal from "./useLoginModal";
import React, { useCallback, useState } from "react";
import axios from "axios";
import showToast from "@/components/UI/Toast";
import { useRouter } from "next/navigation";

/**
 * Parameters for the useFavorite Hook.
 *
 * @interface IUseFavorite
 * @property {string} listingId - The ID of the listing to manage favorites for.
 * @property {SafeUser | null | undefined} currentUser - The currently logged-in user.
 */
interface IUseFavorite {
  listingId: string;
  currentUser: SafeUser | null | undefined;
}

/**
 * React Hook for managing listing favorites.
 *
 * @param {IUseFavorite} param0 - Parameters for the Hook.
 * @returns {{ isLiked: boolean | undefined, toggleFavorite: (event: React.MouseEvent<HTMLDivElement | SVGElement>) => Promise<void> }} - An object containing `isLiked` status and `toggleFavorite` function.
 */
const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  // Check if the current user has already favorited the listing
  const hasFavorited = currentUser?.favoriteIds.includes(listingId);

  // State to track the favorite status
  const [isLiked, setIsLiked] = useState<boolean | undefined>(hasFavorited);

  /**
   * Toggle the favorite status of the listing.
   *
   * @param {React.MouseEvent<HTMLDivElement | SVGElement>} event - The click event.
   * @returns {Promise<void>} A Promise that resolves after the favorite status is updated.
   */
  const toggleFavorite = useCallback(
    async (event: React.MouseEvent<HTMLDivElement | SVGElement>) => {
      event.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        setIsLiked((value) => !value);
        await axios.patch(`/api/favorite/${listingId}`);
        router.refresh();
      } catch (error: any) {
        console.log(error.message);
        showToast("Something went wrong", "error");
      }
    },
    [currentUser, loginModal, listingId, router]
  );

  return {
    isLiked,
    toggleFavorite,
  };
};

export default useFavorite;
