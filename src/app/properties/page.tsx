import EmptyState from "@/components/UI/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import PropertiesClient from "@/components/Properties/PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  const listings = await getListings({
    userId: currentUser.id,
  });
  if (!listings || listings?.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties"
      />
    );
  }
  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
