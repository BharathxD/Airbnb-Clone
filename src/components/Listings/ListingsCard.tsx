"use client";

import useCountries from "@/hooks/useCountry";
import { SafeUser } from "@/types";
import { Listing, Reservation } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";
import HeartButton from "../UI/HeartButton";

interface ListingsCardProps {
  data: Listing;
  currentUser?: SafeUser | null;
  reservation: Reservation;
  onAction: (id: string) => void;
  disabled?: boolean;
  actionlabel?: string;
  actionId?: string;
}

const ListingsCard: FC<ListingsCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionlabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);
  const handleCancel = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      // This function is created to prevent multiple calls to the same event from propagating.
      event.stopPropagation();
      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "pp")} - ${format(end, "PP")}`;
  }, [reservation]);
  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            src={data.imageSrc}
            alt={"Listing"}
            width={100}
            height={100}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsCard;
