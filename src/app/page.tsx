import Container from "@/components/UI/Container";
import EmptyState from "@/components/UI/EmptyState";
import getListings, { IListingParams } from "../actions/getListings";
import ListingsCard from "@/components/Listings/ListingsCard";
import getCurrentUser from "../actions/getCurrentUser";
import { SafeListing, SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface HomeProps {
  searchParams: IListingParams;
}

export default async function Home({ searchParams }: HomeProps) {
  let listings: SafeListing[];
  if (Object.keys(searchParams).length === 0) {
    listings = await getListings(searchParams);
  }
  listings = await getListings({});
  const user: SafeUser | null = await getCurrentUser();
  if (listings.length === 0) return <EmptyState showReset />;

  return (
    <Container>
      <div className="pt-[22.5vh] grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-3">
        {listings.map((listing: SafeListing) => (
          <ListingsCard key={listing.id} data={listing} currentUser={user} />
        ))}
      </div>
    </Container>
  );
}
