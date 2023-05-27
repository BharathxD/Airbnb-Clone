"use client";

import useSearchModal from "@/hooks/useSearchModal";
import Modal from "./Modal";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range, RangeKeyDict } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";
import { Listing } from "@prisma/client";
import queryString from "query-string";
import { formatISO } from "date-fns";
import Heading from "../UI/Heading";
import Calendar from "../Inputs/Calendar";
import Counter from "../Inputs/Counter";

const enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

// The key: "selection" is used as a unique identifier for the date range selection
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const SearchModal = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState<STEPS>(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState<Listing["guestCount"]>(1);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [roomCount, setRoomCount] = useState<Listing["roomCount"]>(1);
  const [bathroomCount, setBathroomCount] =
    useState<Listing["bathroomCount"]>(1);
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
    if (step !== STEPS.INFO) {
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
    setStep(STEPS.LOCATION);
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

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const getBodyComponent = (step: STEPS) => {
    switch (step) {
      case STEPS.LOCATION:
        return locationStep;
      case STEPS.DATE:
        return dateStep;
      case STEPS.INFO:
        return infoStep;
      default:
        return null;
    }
  };

  const locationStep = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        onChange={(value: CountrySelectValue) => setLocation(value)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  const dateStep = (
    <div className="flex flex-col gap-8">
      <Heading
        title="When do you plan to go?"
        subtitle="Make sure everyone is free!"
      />
      <Calendar
        dateRange={dateRange}
        onChange={(value) => setDateRange(value.selection)}
      />
    </div>
  );

  const infoStep = (
    <div className="flex flex-col gap-8">
      <Heading title="More information?" subtitle="Find your perfect place!" />
      <Counter
        title="Guests"
        subtitle="How many guests are coming?"
        value={guestCount}
        onChange={(value: Listing["guestCount"]) => setGuestCount(value)}
      />
      <hr />
      <Counter
        title="Rooms"
        subtitle="How many rooms do you need?"
        value={roomCount}
        onChange={(value: Listing["roomCount"]) => setRoomCount(value)}
      />
      <hr />
      <Counter
        title="Bathrooms"
        subtitle="How many bathrooms do you need?"
        value={bathroomCount}
        onChange={(value: Listing["bathroomCount"]) => setBathroomCount(value)}
      />
      <hr />
    </div>
  );

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onPrev}
      body={getBodyComponent(step)}
    />
  );
};

export default SearchModal;
