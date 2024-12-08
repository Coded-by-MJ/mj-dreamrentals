type NavLinks = {
  href: string;
  label: string;
};

export const links: NavLinks[] = [
  {
    href: "/",
    label: "home",
  },
  {
    href: "/properties",
    label: "properties",
  },
  { href: "/favorites ", label: "favorites" },
  { href: "/bookings ", label: "bookings" },
  { href: "/reviews ", label: "reviews" },
  {
    href: "/dashboard/profile",
    label: "dashboard",
  },
];

export const dashboardLinks: NavLinks[] = [
  {
    href: "/dashboard/profile",
    label: "profile",
  },
  {
    href: "/dashboard/messages",
    label: "messages",
  },

  {
    href: "/dashboard/reservations",
    label: "reservations",
  },
  {
    href: "/dashboard/rentals",
    label: "rentals",
  },
];

export const onlyOwnersLinks = [
  "/dashboard/rentals",
  "/dashboard/reservations",
  "/dashboard/messages",
];
