"use client";

import useCountries from "@/hooks/useCountry";
import useSearchModal from "@/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { difference } from "lodash";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();
  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");
  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    return "Anywhere";
  }, [locationValue, getByValue]);
  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let difference = differenceInDays(end, start);
      if (difference === 0) {
        difference = 1;
      }
      return `${difference} Days`;
    }
    return "Any Week";
  }, [startDate, endDate]);
  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return `Add Guests`;
  }, [guestCount]);
  return (
    <div
      className="border-[1px] w-full md:w-auto py-1.5 rounded-full shadow-md hover:shadow-md transition cursor-pointer"
      onClick={() => searchModal.onOpen()}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-5">{locationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-5 border-x-[1px] flex-1 text-center">
          {durationLabel}
        </div>
        <div className="text-sm pl-5 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden font-light md:block">{guestLabel}</div>
          <div className="p-[0.60rem] bg-rose-500 rounded-full text-white">
            <FaSearch size={13} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
