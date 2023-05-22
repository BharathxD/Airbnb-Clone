import { SafeUser } from "@/types";
import { Listing } from "@prisma/client";
import { FC } from "react";

interface ListingClientProps {
  listing: Listing;
  currentUser: SafeUser | null;
}

const ListingClient: FC<ListingClientProps> = ({ listing, currentUser }) => {
  return <div></div>;
};

export default ListingClient;
