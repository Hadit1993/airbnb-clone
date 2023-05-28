"use client";

import Button from "./Button";
import { FC } from "react";
import Heading from "./Heading";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}

const EmptyState: FC<EmptyStateProps> = ({
  title = "No exact matches",
  subTitle = "Try changing or removing some of your filters",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subTitle={subTitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.replace("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
