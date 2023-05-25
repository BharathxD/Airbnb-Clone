import { Listing } from "@prisma/client";
import { FC, SetStateAction } from "react";
import { UseMutateFunction } from "react-query";

interface ListingReservationProps {
  price: Listing["price"];
  totalPrice: number;
  onChangeDate: (
    value: SetStateAction<{
      startDate: Date;
      endDate: Date;
      key: string;
    }>
  ) => void;
  dateRange: { startDate: Date; endDate: Date; key: string };
  onSubmit: UseMutateFunction<void, unknown, void, unknown>;
  disabled: boolean;
}

const ListingReservation: FC<ListingReservationProps> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
}) => {
  return (
    <div>
      
    </div>
  );
};

export default ListingReservation;
