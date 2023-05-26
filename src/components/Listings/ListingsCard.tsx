"use client";

import useCountries from "@/hooks/useCountry";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import { Reservation } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";
import HeartButton from "../UI/HeartButton";
import Button from "../UI/Button";

interface ListingsCardProps {
  data: SafeListing;
  currentUser?: SafeUser | null;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListingsCard: FC<ListingsCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
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
    const formattedDate = `${format(start, "PP")} - ${format(end, "PP")}`;
    return formattedDate;
  }, [reservation]);
  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className={`flex flex-col w-full gap-2`}>
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            src={data.imageSrc}
            alt={"Listing"}
            width={100}
            height={100}
            quality={100}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className={"flex flex-col gap-1"}>
          <div className="font-semibold text-lg">
            {location?.region}, {location?.label}
          </div>
          <div className="font-light text-neutral-500">
            {reservationDate || `${data.title} • ${data.description}`}
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">${price}</div>
            {!reservation && <div className="font-light">night</div>}
          </div>
          <div className="mt-1.5">
            {onAction && actionLabel && (
              <Button
                disabled={disabled}
                label={actionLabel}
                onClick={handleCancel}
                small
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsCard;
