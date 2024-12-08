"use client";
import { GuestsObj } from "@/utils/types";
import GuestsInput from "./GuestsInput";
import { useState } from "react";
import { useProperty } from "@/utils/store";

function BookingGuests({ maxGuests }: { maxGuests: number }) {
  const { allGuests } = useProperty((state) => state);

  const [guests, setGuests] = useState<GuestsObj>({
    adults: allGuests,
    children: 0,
  });
  const updateBookingState = (newGuests: GuestsObj) => {
    setGuests(newGuests);
    const allGuests = newGuests.adults + newGuests.children;
    useProperty.setState({ allGuests });
  };
  return (
    <GuestsInput
      guests={guests}
      updateGuests={updateBookingState}
      maxGuests={maxGuests}
      className="w-full border border-main  flex gap-2 items-center justify-start p-3 rounded-md"
    />
  );
}
export default BookingGuests;
