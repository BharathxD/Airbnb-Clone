"use server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { FavoriteListing, SafeListing } from "@/types";

const getFavoriteListing = async (): Promise<
  FavoriteListing | [] | undefined
> => {
  try {
    const user = await getCurrentUser();
    if (!user) return [];
    const favListings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(user.favoriteIds || [])],
        },
      },
    });
    const safeFavorites: FavoriteListing = favListings.map((listing) => {
      return { ...listing, createdAt: listing.createdAt.toISOString() };
    });
    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getFavoriteListing;
