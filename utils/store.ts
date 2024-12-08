import { create } from "zustand";
import { Booking } from "./types";
import { DateRange } from "react-day-picker";
import { defaultSelected } from "./calendar";

// Define the state's shape
type PropertyState = {
  propertyId: string;
  price: number;
  bookings: Booking[];
  range: DateRange;
  allGuests: number;
};

export const initialStateValues: PropertyState = {
  propertyId: "",
  price: 0,
  bookings: [],
  range: defaultSelected,
  allGuests: 1,
};

// Create the store

export const useProperty = create<PropertyState>(() => {
  return initialStateValues;
});
