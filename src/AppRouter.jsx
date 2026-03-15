import { Routes, Route, Navigate } from "react-router-dom";
import { ROLES } from "@/constants/roles";

import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

import Home from "@/pages/Home";
import Salon from "@/pages/Salon";
import Services from "@/pages/Services";
import Staff from "@/pages/Staff";
import Me from "@/pages/Me";
import Settings from "@/pages/Settings";
import Inventory from "@/pages/Inventory";
import Schedule from "@/pages/Schedule";
import Customers from "@/pages/Customers";

import BookingList from "@/pages/bookings/BookingList";
import BookingDetails from "@/pages/bookings/BookingDetails";
import NewBooking from "@/pages/bookings/NewBooking";

import SalonList from "@/pages/public/SalonList";
import SalonDetails from "@/pages/public/SalonDetails";

import Billing from "@/pages/Billing";
import BillingSuccess from "@/pages/checkout/BillingSuccess";
import FakeCheckout from "@/pages/checkout/FakeCheckout";

import SuperAdminDashboard from "@/pages/superadmin/SuperAdminDashboard";
import AuditDashboard from "@/pages/superadmin/AuditDashboard";

import OAuthSuccess from "@/pages/OAuthSuccess";
import OAuthFailure from "@/pages/OAuthFailure";

import PublicRoutes from "@/routes/PublicRoutes";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import RoleGuard from "@/auth/RoleGuard";

import SidebarLayout from "./layout/Sidebar";

function AppRouter() {
  return (
    <Routes>
      {/* ---------------- PUBLIC ---------------- */}
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth/success" element={<OAuthSuccess />} />
        <Route path="/oauth/failure" element={<OAuthFailure />} />
      </Route>

      {/* ---------------- PROTECTED ---------------- */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<SidebarLayout />}>
          {/* ================= SUPER ADMIN (/app/*) ================= */}
          <Route path="/app">
            <Route
              path="dashboard"
              element={
                <RoleGuard roles={[ROLES.SUPER_ADMIN]}>
                  <SuperAdminDashboard />
                </RoleGuard>
              }
            />
            <Route
              path="analytics"
              element={
                <RoleGuard roles={[ROLES.SUPER_ADMIN]}>
                  <AuditDashboard />
                </RoleGuard>
              }
            />
            <Route
              path="salons"
              element={
                <RoleGuard roles={[ROLES.SUPER_ADMIN]}>
                  <SalonList />
                </RoleGuard>
              }
            />
            <Route
              path="subscriptions"
              element={
                <RoleGuard roles={[ROLES.SUPER_ADMIN]}>
                  <Billing />
                </RoleGuard>
              }
            />
            <Route
              path="settings"
              element={
                <RoleGuard roles={[ROLES.SUPER_ADMIN]}>
                  <Settings />
                </RoleGuard>
              }
            />
          </Route>

          {/* ================= SALON OWNER (/owner/*) ================= */}
          <Route path="/owner">
            <Route
              path="dashboard"
              element={
                <RoleGuard roles={[ROLES.SALON_OWNER]}>
                  <Home />
                </RoleGuard>
              }
            />
            <Route
              path="staff"
              element={
                <RoleGuard roles={[ROLES.SALON_OWNER]}>
                  <Staff />
                </RoleGuard>
              }
            />
            <Route
              path="revenue"
              element={
                <RoleGuard roles={[ROLES.SALON_OWNER]}>
                  <Billing />
                </RoleGuard>
              }
            />
            <Route
              path="salon-settings"
              element={
                <RoleGuard roles={[ROLES.SALON_OWNER]}>
                  <Salon />
                </RoleGuard>
              }
            />
            <Route
              path="inventory"
              element={
                <RoleGuard roles={[ROLES.SALON_OWNER]}>
                  <Inventory />
                </RoleGuard>
              }
            />
          </Route>

          {/* ================= STAFF (/staff/*) ================= */}
          <Route path="/staff">
            <Route
              path="dashboard"
              element={
                <RoleGuard roles={[ROLES.STAFF]}>
                  <Home />
                </RoleGuard>
              }
            />
            <Route
              path="calendar"
              element={
                <RoleGuard roles={[ROLES.STAFF]}>
                  <BookingList />
                </RoleGuard>
              }
            />
            <Route
              path="schedule"
              element={
                <RoleGuard roles={[ROLES.STAFF]}>
                  <Schedule />
                </RoleGuard>
              }
            />
            <Route
              path="customers"
              element={
                <RoleGuard roles={[ROLES.STAFF]}>
                  <Customers />
                </RoleGuard>
              }
            />
          </Route>

          {/* ================= CUSTOMER (/dashboard/*) ================= */}
          <Route path="/dashboard">
            <Route
              index
              element={
                <RoleGuard roles={[ROLES.CUSTOMER]}>
                  <Home />
                </RoleGuard>
              }
            />
            <Route
              path="booking"
              element={
                <RoleGuard roles={[ROLES.CUSTOMER]}>
                  <NewBooking />
                </RoleGuard>
              }
            />
            <Route
              path="history"
              element={
                <RoleGuard roles={[ROLES.CUSTOMER]}>
                  <BookingList />
                </RoleGuard>
              }
            />
            <Route
              path="profile"
              element={
                <RoleGuard roles={[ROLES.CUSTOMER]}>
                  <Me />
                </RoleGuard>
              }
            />
          </Route>

          {/* ================= LEGACY SUPER ADMIN ================= */}
          <Route path="/superadmin">
            <Route
              index
              element={
                <RoleGuard roles={[ROLES.SUPER_ADMIN]}>
                  <SuperAdminDashboard />
                </RoleGuard>
              }
            />
            <Route
              path="audits"
              element={
                <RoleGuard roles={[ROLES.SUPER_ADMIN]}>
                  <AuditDashboard />
                </RoleGuard>
              }
            />
          </Route>

          {/* ================= MARKETPLACE ================= */}
          <Route path="/salons">
            <Route index element={<SalonList />} />
            <Route path=":salonId" element={<SalonDetails />} />
            <Route
              path=":salonId/book"
              element={
                <RoleGuard roles={[ROLES.CUSTOMER, ROLES.SALON_OWNER]}>
                  <NewBooking />
                </RoleGuard>
              }
            />
          </Route>

          {/* ================= HOME ================= */}
          <Route
            path="/home"
            element={
              <RoleGuard roles={[ROLES.SALON_OWNER, ROLES.STAFF, ROLES.CUSTOMER]}>
                <Home />
              </RoleGuard>
            }
          />

          <Route path="/me" element={<Me />} />

          {/* ================= BOOKINGS MODULE ================= */}
          <Route path="/bookings">
            <Route
              index
              element={
                <RoleGuard roles={[ROLES.CUSTOMER, ROLES.STAFF, ROLES.SALON_OWNER]}>
                  <BookingList />
                </RoleGuard>
              }
            />
            <Route
              path="new"
              element={
                <RoleGuard roles={[ROLES.SALON_OWNER]}>
                  <NewBooking />
                </RoleGuard>
              }
            />
            <Route path=":bookingId" element={<BookingDetails />} />
          </Route>

          {/* ================= SALON ADMIN ================= */}
          <Route
            path="/salon"
            element={
              <RoleGuard roles={[ROLES.SALON_OWNER, ROLES.CUSTOMER]}>
                <Salon />
              </RoleGuard>
            }
          />

          <Route
            path="/services"
            element={
              <RoleGuard roles={[ROLES.SALON_OWNER]}>
                <Services />
              </RoleGuard>
            }
          />

          <Route
            path="/staff"
            element={
              <RoleGuard roles={[ROLES.SALON_OWNER]}>
                <Staff />
              </RoleGuard>
            }
          />

          {/* ================= BILLING ================= */}
          <Route path="/billing">
            <Route
              index
              element={
                <RoleGuard roles={[ROLES.SALON_OWNER]}>
                  <Billing />
                </RoleGuard>
              }
            />
            <Route
              path="success"
              element={
                <RoleGuard roles={[ROLES.SALON_OWNER]}>
                  <BillingSuccess />
                </RoleGuard>
              }
            />
          </Route>

          {/* ================= DEV ROUTES ================= */}
          <Route path="/fake-success" element={<FakeCheckout />} />
        </Route>
      </Route>

      {/* ---------------- FALLBACK ---------------- */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
