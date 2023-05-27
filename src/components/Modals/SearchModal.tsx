"use client";

import useSearchModal from "@/hooks/useSearchModal";
import Modal from "./Modal";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import { CountrySelectValue } from "../Inputs/CountrySelect";
import { Listing } from "@prisma/client";
import queryString from "query-string";
import { formatISO } from "date-fns";

const enum STEP {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const SearchModal = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState<STEP>(STEP.LOCATION);
  const [guestCount, setGuestCount] = useState<Listing["guestCount"]>();
  const [location, setLocation] = useState<CountrySelectValue>();
  const [roomCount, setRoomCount] = useState<Listing["roomCount"]>();
  const [bathroomCount, setBathroomCount] =
    useState<Listing["bathroomCount"]>();
  // The key: "selection" is used as a unique identifier for the date range selection
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  // Re-render the `Map` everytime we change the location
  const Map = useMemo(
    () => dynamic(() => import("@/components/UI/Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const onPrev = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit = useCallback(async () => {
    if (step !== STEP.INFO) {
      return onNext();
    }
    let currentQuery = params && queryString.parse(params.toString());

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };
    updatedQuery.startDate =
      dateRange.startDate && formatISO(dateRange.startDate);
    updatedQuery.endDate = dateRange.endDate && formatISO(dateRange.endDate);
    const url = queryString.stringifyUrl(
      { url: "/", query: updatedQuery },
      { skipNull: true }
    );
    setStep(STEP.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    bathroomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    params,
    roomCount,
    router,
    searchModal,
    step,
  ]);

  switch (step) {
    case STEP.LOCATION:
      return;
    case STEP.DATE:
      return;
    case STEP.INFO:
      return;
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={searchModal.onOpen}
      title="Filters"
      actionLabel="Search"
    />
  );
};

export default SearchModal;
