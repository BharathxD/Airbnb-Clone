"use server";

import prisma from "@/libs/prismadb";
import { Listing } from "@prisma/client";

interface IParams {
    listingId?: Listing["id"];
}

const getListingById = async (params: IParams) => {
    try {
        const { listingId } = params;
        if (!listingId) return null;
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: true
            }
        });
        if (!listing) return null;
        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null
            }
        }
    } catch (error: any) {
        throw new Error(error);
    }
}

export default getListingById;