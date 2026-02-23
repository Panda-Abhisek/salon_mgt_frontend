import {
  Home,
  Store,
  Scissors,
  Users,
  CalendarRange,
  BookOpen,
  CircleDollarSign,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    label: "Home",
    path: "/home",
    icon: Home,
    roles: ["ROLE_SALON_ADMIN", "ROLE_STAFF", "ROLE_USER"],
  },

  {
    label: "Salon",
    path: "/salon",
    icon: Store,
    roles: ["ROLE_SALON_ADMIN"],
  },
  {
    label: "Services",
    path: "/services",
    icon: Scissors,
    roles: ["ROLE_SALON_ADMIN"],
  },
  {
    label: "Staff",
    path: "/staff",
    icon: Users,
    roles: ["ROLE_SALON_ADMIN"],
  },
  {
    label: "New Booking",
    path: "/bookings/new",
    icon: CalendarRange,
    roles: ["ROLE_SALON_ADMIN"],
  },
  {
    label: "Bookings",
    path: "/bookings",
    icon: BookOpen,
    roles: ["ROLE_STAFF", "ROLE_SALON_ADMIN"],
  },
  {
    label: "Billing",
    path: "/billing",
    icon: CircleDollarSign,
    roles: ["ROLE_SALON_ADMIN"],
  },

  {
    label: "Browse Salons",
    path: "/salons",
    icon: Store,
    roles: ["ROLE_USER"],
    excludeRoles: ["ROLE_SALON_ADMIN", "ROLE_STAFF"],
  },
  {
    label: "My Bookings",
    path: "/bookings",
    icon: BookOpen,
    roles: ["ROLE_USER"],
    excludeRoles: ["ROLE_SALON_ADMIN", "ROLE_STAFF"],
  },
];