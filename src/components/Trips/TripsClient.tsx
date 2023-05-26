import { SafeReservation, SafeUser } from "@/types";
import { FC } from "react";

interface TripsClient {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}

const TripsClient: FC<TripsClient> = ({ reservations, currentUser }) => {
  return <div></div>;
};

export default TripsClient;
