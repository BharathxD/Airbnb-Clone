"use client";

import useCountries from "@/hooks/useCountry";
import { SafeUser } from "@/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC } from "react";

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
  actionId,
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);
  return <div>{data.title}</div>;
};

export default ListingsCard;
