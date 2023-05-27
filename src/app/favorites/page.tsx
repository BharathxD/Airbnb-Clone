import getCurrentUser from "@/actions/getCurrentUser";
import EmptyState from "@/components/UI/EmptyState";

const FavoritesPage = () => {
  return (
    <EmptyState
      title="No favorites found"
      subtitle="Looks like you have no favorite listings"
    />
  );
};

export default FavoritesPage;
