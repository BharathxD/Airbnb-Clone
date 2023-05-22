import { SafeUser } from "@/types";
import { Listing } from "@prisma/client";
import { FC } from "react";

interface ListingHeadProps {
  currentUser: SafeUser | null;
  id: Listing["id"];
  title: Listing["title"];
  locationValue: Listing["locationValue"];
  imageSrc: Listing["imageSrc"];
}

const ListingHead: FC<ListingHeadProps> = ({
  currentUser,
  id,
  title,
  locationValue,
  imageSrc,
}) => {
  return <div></div>;
};

export default ListingHead;
