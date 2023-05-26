import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
    reservationId: string;
}

export async function DELETE(req: NextRequest, { params }: { params: IParams }) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ message: "Unauthorized" }, { status: StatusCodes.UNAUTHORIZED })
        }
        const { reservationId } = params;
        if (!reservationId || typeof reservationId !== "string") {
            return NextResponse.json({ message: "Invalid Reservation ID" }, { status: StatusCodes.BAD_REQUEST })
        }
        //? The only people who can delete the reservation is the person who created the listing or the person who've made the reservation
        const reservation = await prisma.reservation.deleteMany({
            where: {
                id: reservationId,
                OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }]
            }
        })
        if (!reservation) {
            throw new Error("Reservation can't be deleted");
        }
        return NextResponse.json(reservationId, {
            status: StatusCodes.OK
        })
    } catch (error: any) {
        return NextResponse.json(
            { message: "Something's wrong with the server" },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}