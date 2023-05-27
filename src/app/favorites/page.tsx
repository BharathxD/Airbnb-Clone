import EmptyState from "@/components/UI/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getFavoriteListing from "@/actions/getFavoriteListing";
import FavoritesClient from "@/components/Favorites/FavoritesClient";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  const favListings = await getFavoriteListing();

  if (favListings?.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings"
      />
    );
  }
  return (
    <FavoritesClient favListings={favListings} currentUser={currentUser} />
  );
};

export default FavoritesPage;
