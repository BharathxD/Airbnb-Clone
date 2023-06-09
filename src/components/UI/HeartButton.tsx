"use client";

import useFavorite from "@/hooks/useFavorite";
import { SafeUser } from "@/types";
import { Listing } from "@prisma/client";
import { FC } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: Listing["id"];
  currentUser: SafeUser | null | undefined;
}

const HeartButton: FC<HeartButtonProps> = ({ listingId, currentUser }) => {
  const { isLiked, toggleFavorite } = useFavorite({ listingId, currentUser });
  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        onClick={toggleFavorite}
        className={isLiked ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
