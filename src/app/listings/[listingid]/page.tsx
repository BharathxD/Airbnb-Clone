import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import ListingClient from "@/components/Listings/ListingClient";
import EmptyState from "@/components/UI/EmptyState";
import { Listing } from "@prisma/client";

interface IParams {
  params: {
    listingId: Listing["id"];
  };
}

const ListingPage = async ({ params }: IParams) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  if (!listing) return <EmptyState />;
  return (
    <div className="pt-[12vh]">
      <ListingClient listing={listing} currentUser={currentUser} />
    </div>
  );
};

export default ListingPage;
