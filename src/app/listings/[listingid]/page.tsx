import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import getReservation from "@/actions/getReservation";
import ListingClient from "@/components/Listings/ListingClient";
import EmptyState from "@/components/UI/EmptyState";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  try {
    if (!params || !params.listingId) {
      return (
        <EmptyState
          title="Invalid listing ID"
          subtitle="Please provide a valid listing ID"
        />
      );
    }

    const listing = await getListingById({ listingId: params.listingId });
    const currentUser = await getCurrentUser();
    const reservations = await getReservation({ listingId: listing?.id });

    if (!listing) {
      return (
        <EmptyState
          title="Something went wrong"
          subtitle="We'll be back soon"
        />
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
  } catch (error) {
    // Handle any errors that occur during fetching or rendering
    console.error(error);
    return (
      <EmptyState title="Error occurred" subtitle="Please try again later" />
    );
  }
};

export default ListingPage;
