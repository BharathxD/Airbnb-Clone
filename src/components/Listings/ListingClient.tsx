"use client";

import { categories } from "@/constants/Categories";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import Container from "../UI/Container";
import { FC, useEffect, useMemo, useState } from "react";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import { useMutation } from "react-query";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import showToast from "../UI/Toast";
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";

// The key: "selection" is used as a unique identifier for the date range selection
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser: SafeUser | null;
  reservations?: SafeReservation[];
}

const ListingClient: FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.post("/api/reservations", {
        listingId: listing?.id,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        totalPrice,
      });
    },
    onSuccess(response, variables, context) {
      showToast("Listing reserved!", "success");
      setDateRange(initialDateRange);
      router.push("/trips");
      router.refresh();
    },
    onError() {
      showToast("Unable to reserve the Listing!", "error");
    },
  });

  // List of dates that are unavailabled/booked
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: SafeReservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);
  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      const totalPrice =
        dayCount && listing.price ? dayCount * listing.price : listing.price;
      setTotalPrice(totalPrice);
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price]);

  const handleSubmit = () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    const startDate = dateRange.startDate;
    if (!startDate) return;

    const isDateReserved = disabledDates.some((date) =>
      isSameDay(date, startDate)
    );

    if (isDateReserved) {
      return showToast(
        "The date is already reserved, please choose another date",
        "error"
      );
    }

    mutate();
  };

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto mb-20">
        <div className="flex flex-col gap-6">
          <ListingHead
            currentUser={currentUser}
            id={listing.id}
            title={listing.title}
            locationValue={listing.locationValue}
            imageSrc={listing.imageSrc}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md: col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={handleSubmit}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
