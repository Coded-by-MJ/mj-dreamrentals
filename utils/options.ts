export const categories = [
  "Apartment",
  "Studio",
  "Condo",
  "House",
  "Cabin",
  "Cottage",
  "Loft",
  "Room",
  "Tent",
  "Caravan",
];

export type Amenity = {
  name: string;
  selected: boolean;
};

export type CategoriesType =
  | "Apartment"
  | "Studio"
  | "Condo"
  | "House"
  | "Cabin"
  | "Cottage"
  | "Loft"
  | "Room"
  | "Tent"
  | "Caravan";

export const amenities: Amenity[] = [
  { name: "Wireless internet", selected: false },
  { name: "WiFi", selected: false },
  { name: "Internet", selected: false },
  { name: "Towels provided", selected: false },
  { name: "Linens provided", selected: false },
  { name: "Air conditioning", selected: false },
  { name: "Hair dryer", selected: false },
  { name: "Heating", selected: false },
  { name: "Kitchen", selected: false },
  { name: "Refrigerator", selected: false },
  { name: "Microwave", selected: false },
  { name: "Stove", selected: false },
  { name: "Oven", selected: false },
  { name: "Grill", selected: false },
  { name: "Dishes & utensils", selected: false },
  { name: "Dining table", selected: false },
  { name: "Coffee maker", selected: false },
  { name: "Toaster", selected: false },
  { name: "Tennis", selected: false },
  { name: "Entertainment", selected: false },
  { name: "Games", selected: false },
  { name: "Books", selected: false },
  { name: "Television", selected: false },
  { name: "Satellite / cable", selected: false },
  { name: "Laundry", selected: false },
  { name: "Washing machine", selected: false },
  { name: "Dryer", selected: false },
  { name: "Bunk bed", selected: false },
  { name: "Iron & board", selected: false },
  { name: "Parking", selected: false },
];
