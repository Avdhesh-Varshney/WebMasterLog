"use client";

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./buttons/Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of the filters",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col justify-center items-center gap-2">
      <Heading center title={title} subTitle={subtitle} />
      <div>
        {showReset && (
          <Button outline label="Remove all filters" onClick={() => router.push("/")} />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
