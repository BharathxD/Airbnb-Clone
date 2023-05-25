"use client";

import useCountries from "@/hooks/useCountry";
import { SafeListing, SafeUser } from "@/types";
import { FC } from "react";
import { IconType } from "react-icons";
import Avatar from "../UI/Avatar";

interface ListingInfoProps {
  user: SafeUser;
  category:
    | {
        label: string;
        icon: IconType;
        description: string;
      }
    | undefined;
  description: SafeListing["description"];
  roomCount: SafeListing["roomCount"];
  guestCount: SafeListing["guestCount"];
  bathroomCount: SafeListing["bathroomCount"];
  locationValue: SafeListing["locationValue"];
}

const ListingInfo: FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div className="col-span-4 flex flex-col gap-1">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <Avatar src={user.image} />
          <div>Hosted by {user?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
