import getCurrentUser from "@/actions/getCurrentUser";
import getReservation from "@/actions/getReservation";
import TripsClient from "@/components/Trips/TripsClient";
import EmptyState from "@/components/UI/EmptyState";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthenticated" subtitle="Please login" />;
  }
  const reservations = await getReservation({ authorId: currentUser.id });
  if (!reservations || reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );
  }
  return <TripsClient currentUser={currentUser} reservations={reservations} />;
};

export default ReservationsPage;
