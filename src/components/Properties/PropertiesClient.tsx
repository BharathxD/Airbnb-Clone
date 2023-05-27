"use client";

import { SafeListing, SafeUser } from "@/types";
import { FC } from "react";
import Heading from "../UI/Heading";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import showToast from "../UI/Toast";
import Container from "../UI/Container";
import ListingsCard from "../Listings/ListingsCard";

interface PropertiesClient {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

const PropertiesClient: FC<PropertiesClient> = ({ listings, currentUser }) => {
  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (id: SafeListing["id"]) => {
      axios.delete(`/api/listings/${id}`);
    },
    onSuccess: () => {
      setTimeout(() => {
        router.refresh();
      }, 300);
      showToast("Listing Deleted", "success");
    },
    onError(error: AxiosError) {
      showToast(error.message, "error");
    },
  });

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: SafeListing) => {
          return (
            <ListingsCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
              disabled={isLoading}
              onAction={(id: SafeListing["id"]) => mutate(id)}
              actionId={listing.id}
              actionLabel="Delete Listing"
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PropertiesClient;
