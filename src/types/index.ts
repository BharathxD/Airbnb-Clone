import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt">;

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeReservation =
  | Reservation
  | {
      createdAt: string;
      startDate: string;
      endDate: string;
      listing:
        | Listing
        | {
            createdAt: string;
          };
    };
