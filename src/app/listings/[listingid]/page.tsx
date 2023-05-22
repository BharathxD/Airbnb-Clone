import getListingById from "@/actions/getListingById";
import EmptyState from "@/components/UI/EmptyState";

interface IParams {
  params: {
    listingId: string;
  };
}

const ListingPage = async ({ params }: IParams) => {
  const listing = await getListingById(params);
  if (!listing) {
    return <EmptyState />;
  }
  return <div className="mt-20">An individual listing page {listing?.title}</div>;
};

export default ListingPage;
