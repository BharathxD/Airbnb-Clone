import { Listing } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  listingId?: Listing["id"];
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const { listingId } = params;
    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json(
        { message: "Invalid Listing ID" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    if (!listing || listing.count === 0) {
      return NextResponse.json(
        {
          message:
            "Listing not found or you don't have permission to delete it",
        },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    return NextResponse.json(
      { message: "Listing deleted successfully" },
      { status: StatusCodes.OK }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
