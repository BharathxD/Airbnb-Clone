import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { StatusCodes } from "http-status-codes";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ message: "Unauthenticated" }, {
                status: StatusCodes.FORBIDDEN
            })
        }
        const body = await req.json();
        const {
            category,
            location: locationValue,
            guestCount,
            roomCount,
            bathroomCount,
            imageSrc,
            price,
            title,
            description
        } = body;
        const listing = await prisma.listing.create({
            data: {
                userId: currentUser.id,
                price: parseInt(price, 10),
                category,
                locationValue,
                guestCount,
                roomCount,
                bathroomCount,
                imageSrc,
                title,
                description
            }
        })
        return NextResponse.json(listing, {
            status: StatusCodes.CREATED
        });
    } catch (error: any) {
        console.log(`Error something went wrong at Listing Route: ${error.message}`);
        return NextResponse.json({ message: "Internal server error" }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
    }
}