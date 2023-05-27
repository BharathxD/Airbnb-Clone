"use client";

import useCountries from "@/hooks/useCountry";
import { SafeListing, SafeUser } from "@/types";
import { FC } from "react";
import { IconType } from "react-icons";
import Avatar from "../UI/Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../UI/Map"), {
  ssr: false,
});

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
    <div className="col-span-4 flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <Avatar src={user.image} />
          <div>Hosted by {user?.name}</div>
        </div>
        <div className="flex flex-row items-center gap-3 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          &bull;
          <div>{roomCount} rooms</div>
          &bull;
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
