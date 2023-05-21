import Container from "@/components/UI/Container";
import EmptyState from "@/components/UI/EmptyState";
import getListings from "./actions/getListings";
import { Listing } from "@prisma/client";
import ListingsCard from "@/components/Listings/ListingsCard";
import getCurrentUser from "./actions/getCurrentUser";
import { SafeUser } from "@/types";

export default async function Home() {
  const listings: Listing[] = await getListings();
  const user: SafeUser | null = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div className="pt-[25vh] grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {listings.map((listing: Listing) => (
          <ListingsCard key={listing.id} data={listing} currentUser={user} />
        ))}
      </div>
    </Container>
  );
}
