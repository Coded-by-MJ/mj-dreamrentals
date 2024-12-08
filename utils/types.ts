import { Amenity } from "./options";

export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<actionState | { message: string; variant: string }>;

export type actionState = {
  message: string;
  variant: "destructive" | "default";
};

export type CurrentUserObj = {
  id: string;
  auth: boolean;
  firstName: string;
  lastName: string;
  email: string;
};

export type SearchParamsType = {
  location: string;
  layout: "Grid" | "List";
  category: string;
  page: number;
};

export type Booking = {
  checkIn: Date;
  checkOut: Date;
};

export type DueDateObj = {
  dueDate: Date;
  isDueDateToday: boolean;
};

export type LocationObj = {
  address: string;
  city: string;
  state: string;
  country: string;
};
export type OwnerObj = {
  name: string;
  image: string;
};

export type PropertyType = {
  id: string;
  name: string;
  category: string;
  description: string;
  sleeps: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  beds: number;
  location: LocationObj;
  squareFeet: number;
  amenities: Amenity[];
  isFeatured: boolean;
};

export type GuestsObj = {
  adults: number;
  children: number;
};

export enum UserType {
  RENTER = "RENTER",
  OWNER = "OWNER",
}
