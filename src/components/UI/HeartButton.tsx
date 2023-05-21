"use client";

import { SafeUser } from "@/types";
import { Listing } from "@prisma/client";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { FC, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: Listing["id"];
  currentUser: SafeUser | null | undefined;
}

const HeartButton: FC<HeartButtonProps> = ({ listingId, currentUser }) => {
  const hasFavorited = currentUser?.favoriteIds.includes(listingId) || false;
  console.log(currentUser?.favoriteIds.includes(listingId));
  const [isLiked, setIsLiked] = useState<boolean>(hasFavorited);
  const toggleFavorite = async (
    event: React.MouseEvent<HTMLDivElement | SVGElement>
  ) => {
    event.stopPropagation();
    const response = await axios.patch(`/favorite/${listingId}`);
    setIsLiked(response.status === StatusCodes.OK);
  };
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
