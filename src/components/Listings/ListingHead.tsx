import useCountries from "@/hooks/useCountry";
import { SafeUser } from "@/types";
import { Listing } from "@prisma/client";
import { FC, Fragment } from "react";
import Heading from "../UI/Heading";
import Image from "next/image";
import HeartButton from "../UI/HeartButton";

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
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <Fragment>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Image"
          className="object-cover w-full"
          src={imageSrc}
          quality={100}
          fill
        />
        <div className="absolute top-3 right-3">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </Fragment>
  );
};

export default ListingHead;
