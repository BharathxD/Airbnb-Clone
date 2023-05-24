import { SafeUser } from "@/types";

import useLoginModal from "./useLoginModal";
import React, { useCallback, useState } from "react";
import axios from "axios";
import showToast from "@/components/UI/Toast";
import { useRouter } from "next/navigation";

interface IUseFavorite {
  listingId: string;
  currentUser: SafeUser | null | undefined;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const hasFavorited = currentUser?.favoriteIds.includes(listingId);
  const [isLiked, setIsLiked] = useState<boolean | undefined>(hasFavorited);
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
