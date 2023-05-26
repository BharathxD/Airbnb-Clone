import { Listing } from "@prisma/client";
import { FC, SetStateAction } from "react";
import { UseMutateFunction } from "react-query";
import { Range, RangeKeyDict } from "react-date-range";
import Calendar from "../UI/Calendar";

interface ListingReservationProps {
  price: Listing["price"];
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: UseMutateFunction<void, unknown, void, unknown>;
  disabled: boolean;
  disabledDates: Date[];
}

const ListingReservation: FC<ListingReservationProps> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
    </div>
  );
};

export default ListingReservation;
