import EmptyState from "@/components/UI/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservation from "@/actions/getReservation";
import TripsClient from "@/components/Trips/TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  const reservations = await getReservation({
    userId: currentUser.id,
  });
  if (!reservations || reservations?.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you haven't reserved any trips"
      />
    );
  }
  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
