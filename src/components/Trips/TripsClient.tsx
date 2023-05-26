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

  const { mutate, isLoading } = useMutation({
    mutationFn: async (id: SafeListing["id"]) => {
      axios.delete(`/api/reservations/${id}`);
    },
    onSuccess: () => {
      router.refresh();
      showToast("Reservation Cancelled", "success");
    },
    onError(error: AxiosError) {
      showToast(error.message, "error");
    },
  });

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
              onAction={(id: SafeListing["id"]) => mutate(id)}
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
