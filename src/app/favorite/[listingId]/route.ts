import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { StatusCodes } from "http-status-codes";
import { update } from "lodash";

interface IParams {
  listingId?: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({
        message: "Unauthenticated",
        status: StatusCodes.FORBIDDEN,
      });
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json({
        message: "Invalid listing ID",
        status: StatusCodes.BAD_REQUEST,
      });
    }

    // The callback function checks if the current element (id) is not equal to the listingId.
    // If the condition is true, meaning the element is not equal to the listingId, it will be included in the new filtered array.
    // If the condition is false, meaning the element is equal to the listingId, it will be excluded from the new filtered array.
    const favoriteIds = currentUser.favoriteIds.filter(
      (id) => id !== listingId
    );

    // Update the database
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return NextResponse.json(updatedUser, {
      status: StatusCodes.OK,
    });
  } catch (error: any) {
    console.error("An error occurred:", error);
    return NextResponse.json({
      message: "Internal server error",
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}
