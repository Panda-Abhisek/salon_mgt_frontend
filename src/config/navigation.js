// import {
//   Home,
//   Store,
//   Scissors,
//   Users,
//   CalendarRange,
//   BookOpen,
//   CircleDollarSign,
// } from "lucide-react";

// export const NAV_ITEMS = [
//   {
//     label: "Super Admin",
//     path: "/superadmin",
//     icon: Users,
//     roles: ["ROLE_SUPER_ADMIN"]
//   },
//   {
//     label: "Audit Logs",
//     path: "/superadmin/audits",
//     icon: BookOpen,
//     roles: ["ROLE_SUPER_ADMIN"]
//   },
//   {
//     label: "Home",
//     path: "/home",
//     icon: Home,
//     roles: ["ROLE_SALON_ADMIN", "ROLE_STAFF", "ROLE_USER"],
//   },

//   {
//     label: "Salon",
//     path: "/salon",
//     icon: Store,
//     roles: ["ROLE_SALON_ADMIN"],
//   },
//   {
//     label: "Services",
//     path: "/services",
//     icon: Scissors,
//     roles: ["ROLE_SALON_ADMIN"],
//   },
//   {
//     label: "Staff",
//     path: "/staff",
//     icon: Users,
//     roles: ["ROLE_SALON_ADMIN"],
//   },
//   {
//     label: "Bookings",
//     path: "/bookings",
//     icon: BookOpen,
//     roles: ["ROLE_STAFF", "ROLE_SALON_ADMIN"],
//   },
//   {
//     label: "New Booking",
//     path: "/bookings/new",
//     icon: CalendarRange,
//     roles: ["ROLE_SALON_ADMIN"],
//     parent: "/bookings"
//   },
//   {
//     label: "Billing",
//     path: "/billing",
//     icon: CircleDollarSign,
//     roles: ["ROLE_SALON_ADMIN"],
//   },

//   {
//     label: "Browse Salons",
//     path: "/salons",
//     icon: Store,
//     roles: ["ROLE_USER"],
//     excludeRoles: ["ROLE_SALON_ADMIN", "ROLE_STAFF"],
//   },
//   {
//     label: "My Bookings",
//     path: "/bookings",
//     icon: BookOpen,
//     roles: ["ROLE_USER"],
//     excludeRoles: ["ROLE_SALON_ADMIN", "ROLE_STAFF"],
//   },
// ];

import { 
  LayoutDashboard, 
  BarChart3, 
  Store, 
  CreditCard, 
  Settings, 
  Users, 
  Package, 
  Calendar, 
  PlusCircle, 
  User,
  History,
  ClipboardList,
  Home,
  Building2,
  Scissors,
  BookOpen,
  CircleDollarSign,
  StoreIcon,
  ChevronDown
} from "lucide-react"
import { ROLES } from '../constants/roles'

export const SIDEBAR_NAV = {
  [ROLES.SUPER_ADMIN]: [
    { to: '/app/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/app/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/app/salons', label: 'Salon onboarding', icon: Store },
    { to: '/app/subscriptions', label: 'Subscriptions', icon: CreditCard },
    { to: '/app/settings', label: 'System settings', icon: Settings },
    // Legacy routes
    {
      title: 'Legacy',
      icon: ChevronDown,
      items: [
        { to: '/superadmin', label: 'Super Admin', icon: Users },
        { to: '/superadmin/audits', label: 'Audit Logs', icon: BookOpen },
      ]
    },
  ],
  [ROLES.SALON_OWNER]: [
    { to: '/owner/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/owner/staff', label: 'Staff', icon: Users },
    { to: '/owner/revenue', label: 'Revenue', icon: BarChart3 },
    { to: '/owner/salon-settings', label: 'Salon settings', icon: Settings },
    { to: '/owner/inventory', label: 'Inventory', icon: Package },
    // Legacy routes
    {
      title: 'Legacy',
      icon: ChevronDown,
      items: [
        { to: '/home', label: 'Home', icon: Home },
        { to: '/salon', label: 'Salon', icon: Building2 },
        { to: '/services', label: 'Services', icon: Scissors },
        { to: '/staff', label: 'Staff', icon: Users },
        { to: '/bookings', label: 'Bookings', icon: BookOpen },
        { to: '/billing', label: 'Billing', icon: CircleDollarSign },
        { to: '/salons', label: 'Browse Salons', icon: StoreIcon },
      ]
    },
  ],
  [ROLES.STAFF]: [
    { to: '/staff/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/staff/calendar', label: 'Appointments', icon: Calendar },
    { to: '/staff/schedule', label: 'My schedule', icon: ClipboardList },
    { to: '/staff/customers', label: 'Customers', icon: Users },
    // Legacy routes
    {
      title: 'Legacy',
      icon: ChevronDown,
      items: [
        { to: '/home', label: 'Home', icon: Home },
        { to: '/bookings', label: 'Bookings', icon: BookOpen },
      ]
    },
  ],
  [ROLES.CUSTOMER]: [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/dashboard/booking', label: 'Book appointment', icon: PlusCircle },
    { to: '/dashboard/history', label: 'Service history', icon: History },
    { to: '/dashboard/profile', label: 'Profile', icon: User },
    // Legacy routes
    {
      title: 'Legacy',
      icon: ChevronDown,
      items: [
        { to: '/home', label: 'Home', icon: Home },
        { to: '/bookings', label: 'My Bookings', icon: BookOpen },
        { to: '/salons', label: 'Browse Salons', icon: StoreIcon },
      ]
    },
  ],
}

export const getSidebarNavForRole = (role) => SIDEBAR_NAV[role] || []