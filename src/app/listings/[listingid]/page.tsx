"use client";

import { useParams } from "next/navigation";

const ListingPage = () => {
  const params = useParams();
  console.log(params);
  return <div>An individual listing page {params?.listingId}</div>;
};

export default ListingPage;
