import prismadb from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getFavoriteListing = async () => {
    try {
        const user = await getCurrentUser();
        if (!user) return [];
        const favListings = await prismadb.listing.findMany({
            where: {
                id: {
                    in: [...(user.favoriteIds || [])]
                }
            }
        })
        const safeFavorites = favListings.map((listing) => {
            return { ...listing, updatedAt: listing.createdAt.toString() }
        })
        return safeFavorites;
    } catch (error: any) {
        throw new Error(error);
    }
}

export default getFavoriteListing;