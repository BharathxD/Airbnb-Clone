import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import { StatusCodes } from "http-status-codes";
import prisma from "@/libs/prismadb";
import { update } from "lodash";

interface IParams {
  listingId?: string;
}

export async function PATCH(_: NextRequest, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          message: "Unauthenticated",
        },
        { status: StatusCodes.FORBIDDEN }
      );
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json(
        {
          message: "Invalid listing ID",
        },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const favoriteIds = currentUser.favoriteIds;
    let updatedFavoriteIds: string[];

    if (favoriteIds.includes(listingId)) {
      // If the listingId is in the `favoriteIds` array, it will be removed from the array
      updatedFavoriteIds = favoriteIds.filter(
        (favoriteId) => favoriteId !== listingId
      );
      // favoriteId !== listingId -> TRUE (Stays in the array)
      // favoriteId !== listingId -> FALSE (Removed from the array)
    } else {
      updatedFavoriteIds = [...favoriteIds, listingId];
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    });

    return NextResponse.json(updatedUser, {
      status: StatusCodes.OK,
    });
  } catch (error: any) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      }
    );
  }
}
