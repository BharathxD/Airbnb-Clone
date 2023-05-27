"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  resetLabel?: string;
}

const EmptyState: FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing one of your filters",
  showReset,
  resetLabel = "Remove all filters",
}) => {
  const router = useRouter();
  return (
    <div className="h-[100vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button label={resetLabel} onClick={() => router.push("/")} outline />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
