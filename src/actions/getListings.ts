"use server";

import prisma from "@/libs/prismadb";
import { Listing, Reservation, User } from "@prisma/client";

export interface IListingParams {
  userId?: User["id"];
  guestCount?: Listing["guestCount"];
  roomCount?: Listing["roomCount"];
  bathroomCount?: Listing["bathroomCount"];
  startDate?: Reservation["startDate"];
  endDate?: Reservation["endDate"];
  locationValue?: Listing["locationValue"];
  category?: string;
}

const getListings = async (params: IListingParams) => {
  try {
    // Extract the parameters from the input object
    const { userId, guestCount, roomCount, bathroomCount, startDate, endDate, locationValue, category } = params;

    // Construct the query object to be used in the Prisma query
    const query: any = {
      ...(userId && { userId }),
      ...(category && { category }),
      ...(roomCount && { roomCount: { gte: +roomCount } }),
      ...(guestCount && { guestCount: { gte: +guestCount } }),
      ...(bathroomCount && { bathroomCount: { gte: +bathroomCount } }),
      ...(locationValue && { locationValue }),
    };

    /**
     * If both `startDate` and `endDate` are provided, exclude listings with conflicting reservations
     * The `NOT` condition ensures that only listings without conflicting reservations are included in the result set.
     * In simple words, the filter won't include the listing which conflicts with the reservation dates
     */
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      };
    }

    // Retrieve the listings from the database based on the constructed query
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
