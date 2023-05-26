import getCurrentUser from "@/actions/getCurrentUser";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { message: "Unauthenticated" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }
    const { listingId, startDate, endDate, totalPrice } = await request.json();
    if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.json({
        message: "Invalid Request",
        status: StatusCodes.BAD_REQUEST,
      });
    }
    const listingAndReservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });
    return NextResponse.json(listingAndReservation, {
      status: StatusCodes.CREATED,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something's wrong with the server" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
