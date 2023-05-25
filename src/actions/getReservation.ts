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
    } catch (error: any) {
        throw new Error(error);
    }
}

export default getReservation;