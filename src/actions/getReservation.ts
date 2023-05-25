import prisma from "@/libs/prismadb";

interface IQueryParams {
    userId?: string;
    authorId?: string;
    listingId?: string;
}

const getReservation = async ({ userId, authorId, listingId }: IQueryParams) => {
    try {
        const query: IQueryParams = {
            ...(userId && { userId: userId }),
            ...(authorId && { authorId: authorId }),
            ...(listingId && { listingId: listingId })
        };
        const reservations = await prisma.reservation.findMany({
            where: query,
            include: { listing: true },
            orderBy: {
                createdAt: "desc"
            }
        })
        const safeReservation = reservations.map((reservation) => {
            return {
                ...reservation,
                createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                listing: {
                    ...reservation.listing,
                    createdAt: reservation.listing.createdAt.toISOString()
                }
            }
        })
        return safeReservation;
    } catch (error: any) {
        throw new Error(error);
    }
}

export default getReservation;