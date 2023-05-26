"use client";

import { SafeListing, SafeReservation, SafeUser } from "@/types";
import { FC, useCallback, useState } from "react";
import Heading from "../UI/Heading";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import showToast from "../UI/Toast";
import Container from "../UI/Container";
import ListingsCard from "../Listings/ListingsCard";

interface TripsClient {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}

const TripsClient: FC<TripsClient> = ({ reservations, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<SafeListing["id"]>("");

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      // Using a `POST` request instead of `DELETE` due to a known bug in Next.js 13.3 (see GitHub: https://github.com/vercel/next.js/issues/48096).
      await axios.post(`/api/reservations/${deletingId}`);
    },
    onSuccess: () => {
      showToast("Reservation Cancelled", "success");
    },
    onError(error: AxiosError) {
      console.log(error);
      showToast(error.message, "error");
    },
  });

  const onCancel = useCallback(
    (id: SafeListing["id"]) => {
      setDeletingId(id);
      mutate();
    },
    [mutate]
  );
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation: SafeReservation) => {
          return (
            <ListingsCard
              key={reservation.id}
              data={reservation.listing}
              currentUser={currentUser}
              reservation={reservation}
              disabled={isLoading}
              onAction={() => mutate()}
              actionId={reservation.id}
              actionLabel="Cancel Reservation"
            />
          );
        })}
      </div>
    </Container>
  );
};

export default TripsClient;
