import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";

import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

import Home from "@/pages/Home";
import Salon from "@/pages/Salon";
import Services from "@/pages/Services";
import Staff from "@/pages/Staff";
import Me from "@/pages/Me";

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

import AppLayout from "@/layout/AppLayout";
import PublicRoutes from "@/routes/PublicRoutes";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import RoleGuard from "@/auth/RoleGuard";

import { Toaster } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

function App() {
  const { initializing } = useAuth();

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton />
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* ---------------- PUBLIC ---------------- */}
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* ---------------- PROTECTED ---------------- */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<AppLayout />}>

            {/* ================= SUPER ADMIN ================= */}
            <Route path="/superadmin">
              <Route
                index
                element={
                  <RoleGuard roles={["ROLE_SUPER_ADMIN"]}>
                    <SuperAdminDashboard />
                  </RoleGuard>
                }
              />
              <Route
                path="audits"
                element={
                  <RoleGuard roles={["ROLE_SUPER_ADMIN"]}>
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
                  <RoleGuard roles={["ROLE_USER", "ROLE_SALON_ADMIN"]}>
                    <NewBooking />
                  </RoleGuard>
                }
              />
            </Route>

            {/* ================= HOME ================= */}
            <Route
              path="/home"
              element={
                <RoleGuard roles={["ROLE_SALON_ADMIN", "ROLE_STAFF", "ROLE_USER"]}>
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
                  <RoleGuard roles={["ROLE_USER", "ROLE_STAFF", "ROLE_SALON_ADMIN"]}>
                    <BookingList />
                  </RoleGuard>
                }
              />
              <Route
                path="new"
                element={
                  <RoleGuard roles={["ROLE_SALON_ADMIN"]}>
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
                <RoleGuard roles={["ROLE_SALON_ADMIN", "ROLE_USER"]}>
                  <Salon />
                </RoleGuard>
              }
            />

            <Route
              path="/services"
              element={
                <RoleGuard roles={["ROLE_SALON_ADMIN"]}>
                  <Services />
                </RoleGuard>
              }
            />

            <Route
              path="/staff"
              element={
                <RoleGuard roles={["ROLE_SALON_ADMIN"]}>
                  <Staff />
                </RoleGuard>
              }
            />

            {/* ================= BILLING ================= */}
            <Route path="/billing">
              <Route
                index
                element={
                  <RoleGuard roles={["ROLE_SALON_ADMIN"]}>
                    <Billing />
                  </RoleGuard>
                }
              />
              <Route
                path="success"
                element={
                  <RoleGuard roles={["ROLE_SALON_ADMIN"]}>
                    <BillingSuccess />
                  </RoleGuard>
                }
              />
            </Route>

            {/* Dev only */}
            <Route path="/fake-success" element={<FakeCheckout />} />
          </Route>
        </Route>

        {/* ---------------- FALLBACK ---------------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;