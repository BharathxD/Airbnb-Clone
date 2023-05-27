"use server";

import prisma from "@/libs/prismadb";
import { Listing } from "@prisma/client";

export interface IListingParams {
  userId: Listing["id"];
}

const getListings = async (params: IListingParams) => {
  try {
    const { userId } = params;
    const query = userId ? { userId } : {};
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: "desc" },
    });
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getListings;
