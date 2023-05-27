"use client";

import EmptyState from "@/components/UI/EmptyState";
import { FC, useEffect } from "react";

interface ErrorStateProps {
  error: Error;
}

const ErrorPage: FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
};

export default ErrorPage;
