import { FavoriteListing, SafeUser } from "@/types";
import { FC } from "react";
import Container from "../UI/Container";

interface FavoritesClientProps {
  favListings: FavoriteListing | [] | undefined;
  currentUser: SafeUser | null;
}

const FavoritesClient: FC<FavoritesClientProps> = ({
  favListings,
  currentUser,
}) => {
  return <Container></Container>;
};

export default FavoritesClient;
