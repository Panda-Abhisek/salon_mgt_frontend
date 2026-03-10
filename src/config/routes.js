import { ROLES } from '../constants/roles'

export const ROUTE_CONFIG = {
  public: [
    { path: '/', component: 'Landing', roles: [] },
    { path: '/login', component: 'Login', roles: [] },
    { path: '/signup', component: 'Signup', roles: [] },
  ],
  protected: [
    // ================= SUPER ADMIN =================
    { path: '/app/dashboard', component: 'SuperAdminDashboard', roles: [ROLES.SUPER_ADMIN] },
    { path: '/app/analytics', component: 'AuditDashboard', roles: [ROLES.SUPER_ADMIN] },
    { path: '/app/salons', component: 'SalonList', roles: [ROLES.SUPER_ADMIN] },
    { path: '/app/subscriptions', component: 'Billing', roles: [ROLES.SUPER_ADMIN] },
    { path: '/app/settings', component: 'Settings', roles: [ROLES.SUPER_ADMIN], placeholder: true },

    // ================= SALON OWNER =================
    { path: '/owner/dashboard', component: 'Home', roles: [ROLES.SALON_OWNER] },
    { path: '/owner/staff', component: 'Staff', roles: [ROLES.SALON_OWNER] },
    { path: '/owner/revenue', component: 'Billing', roles: [ROLES.SALON_OWNER] },
    { path: '/owner/salon-settings', component: 'Salon', roles: [ROLES.SALON_OWNER] },
    { path: '/owner/inventory', component: 'Inventory', roles: [ROLES.SALON_OWNER], placeholder: true },

    // ================= STAFF =================
    { path: '/staff/dashboard', component: 'Home', roles: [ROLES.STAFF] },
    { path: '/staff/calendar', component: 'BookingList', roles: [ROLES.STAFF] },
    { path: '/staff/schedule', component: 'Schedule', roles: [ROLES.STAFF], placeholder: true },
    { path: '/staff/customers', component: 'Customers', roles: [ROLES.STAFF], placeholder: true },

    // ================= CUSTOMER =================
    { path: '/dashboard', component: 'Home', roles: [ROLES.CUSTOMER] },
    { path: '/dashboard/booking', component: 'NewBooking', roles: [ROLES.CUSTOMER] },
    { path: '/dashboard/history', component: 'BookingList', roles: [ROLES.CUSTOMER] },
    { path: '/dashboard/profile', component: 'Me', roles: [ROLES.CUSTOMER] },

    // ================= MARKETPLACE =================
    { path: '/salons', component: 'SalonList', roles: [ROLES.CUSTOMER] },
    { path: '/salons/:salonId', component: 'SalonDetails', roles: [ROLES.CUSTOMER] },
    { path: '/salons/:salonId/book', component: 'NewBooking', roles: [ROLES.CUSTOMER, ROLES.SALON_OWNER] },

    // ================= BOOKINGS =================
    { path: '/bookings', component: 'BookingList', roles: [ROLES.CUSTOMER, ROLES.STAFF, ROLES.SALON_OWNER] },
    { path: '/bookings/new', component: 'NewBooking', roles: [ROLES.SALON_OWNER] },
    { path: '/bookings/:bookingId', component: 'BookingDetails', roles: [ROLES.CUSTOMER, ROLES.STAFF, ROLES.SALON_OWNER] },

    // ================= SALON ADMIN =================
    { path: '/salon', component: 'Salon', roles: [ROLES.SALON_OWNER, ROLES.CUSTOMER] },
    { path: '/services', component: 'Services', roles: [ROLES.SALON_OWNER] },
    { path: '/staff', component: 'Staff', roles: [ROLES.SALON_OWNER] },

    // ================= BILLING =================
    { path: '/billing', component: 'Billing', roles: [ROLES.SALON_OWNER] },
    { path: '/billing/success', component: 'BillingSuccess', roles: [ROLES.SALON_OWNER] },

    // ================= LEGACY ROUTES (for backward compatibility) =================
    { path: '/home', component: 'Home', roles: [ROLES.SALON_OWNER, ROLES.STAFF, ROLES.CUSTOMER] },
    { path: '/me', component: 'Me', roles: [ROLES.SALON_OWNER, ROLES.STAFF, ROLES.CUSTOMER] },
    { path: '/superadmin', component: 'SuperAdminDashboard', roles: [ROLES.SUPER_ADMIN] },
    { path: '/superadmin/audits', component: 'AuditDashboard', roles: [ROLES.SUPER_ADMIN] },

    // ================= DEV ROUTES =================
    { path: '/fake-success', component: 'FakeCheckout', roles: [], dev: true },
  ]
}
