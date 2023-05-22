import { categories } from "@/constants/Categories";
import { SafeListing, SafeUser } from "@/types";
import { Reservation } from "@prisma/client";
import Container from "../UI/Container";
import { FC, useMemo } from "react";

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser: SafeUser | null;
  reservations?: Reservation[];
}

const ListingClient: FC<ListingClientProps> = ({ listing, currentUser }) => {
  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);
  return (
    <Container>
      <div className="max-w-screen lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            currentUser={currentUser}
            id={listing.id}
            title={listing.title}
            locationValue={listing.locationValue}
            imageSrc={listing.imageSrc}
          />
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
