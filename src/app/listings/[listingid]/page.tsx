import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import getReservation from "@/actions/getReservation";
import ListingClient from "@/components/Listings/ListingClient";
import EmptyState from "@/components/UI/EmptyState";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservation({ listingId: listing?.id });

  if (!listing) {
    return (
      <EmptyState title="Something went wrong" subtitle="We'll be back soon" />
    );
  }

  return (
    <div className="pt-[12vh]">
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </div>
  );
};

export default ListingPage;
