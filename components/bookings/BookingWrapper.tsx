"use client";

import BookingCalendar from "./BookingCalendar";
import BookingGuests from "./BookingGuests";
import { useProperty } from "@/utils/store";
import { Booking } from "@/utils/types";
import { useEffect } from "react";
import DisplayPrice from "./DisplayPrice";
import BookingContainer from "./BookingContainer";

type BookingWrapperProps = {
  propertyId: string;
  price: number;
  maxGuests: number;
  bookings: Booking[];
};

function BookingWrapper({
  propertyId,
  price,
  maxGuests,
  bookings,
}: BookingWrapperProps) {
  useEffect(() => {
    useProperty.setState({
      propertyId,
      price,
      bookings,
    });
  }, []);

  return (
    <div className="lg:mt-[80px] border lg:col-span-4 rounded-lg  py-5 ">
      <div className="px-4">
        <DisplayPrice price={price} />
        <BookingCalendar />
        <BookingGuests maxGuests={maxGuests} />
      </div>
      <BookingContainer />
    </div>
  );
}
export default BookingWrapper;
