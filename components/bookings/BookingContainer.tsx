"use client";

import { useProperty } from "@/utils/store";
import BookingSummary from "./BookingSummary";
import BookNowButton from "./BookNowButton";

function BookingContainer() {
  const { range } = useProperty((state) => state);

  if (
    !range ||
    !(range?.from instanceof Date) ||
    !(range?.to instanceof Date)
  ) {
    return null;
  }

  if (range.to?.getTime() === range.from?.getTime()) {
    return null;
  }
  return (
    <div className="w-full">
      <BookingSummary />
      <BookNowButton />
    </div>
  );
}

export default BookingContainer;
