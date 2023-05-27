import { FavoriteListing, SafeUser } from "@/types";
import { FC } from "react";
import Container from "../UI/Container";
import Heading from "../UI/Heading";
import ListingsCard from "../Listings/ListingsCard";

interface FavoritesClientProps {
  favListings: FavoriteListing | [] | undefined;
  currentUser: SafeUser | null;
}

const FavoritesClient: FC<FavoritesClientProps> = ({
  favListings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places that you have favorited"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {favListings?.map((favListing) => {
          return (
            <ListingsCard
              key={favListing.id}
              data={favListing}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default FavoritesClient;
