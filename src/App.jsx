import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";

import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Salon from "@/pages/Salon";
import Services from "@/pages/Services";
import Staff from "@/pages/Staff";
import Me from "@/pages/Me";
import NewBooking from "@/pages/bookings/NewBooking";

import AppLayout from "@/layout/AppLayout";
import PublicRoutes from "@/routes/PublicRoutes";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import RoleGuard from "@/auth/RoleGuard";

import { Toaster } from "sonner";
import { Skeleton } from "./components/ui/skeleton";
import BookingDetails from "./pages/bookings/BookingDetails";
import BookingList from "./pages/bookings/BookingList";
import Signup from "./pages/Signup";
import SalonList from "./pages/public/SalonList";
import SalonDetails from "./pages/public/SalonDetails";

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

        {/* -------- Public Auth Routes -------- */}
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* -------- Protected App -------- */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<AppLayout />}>

            {/* Marketplace */}
            <Route path="/salons" element={<SalonList />} />
            <Route path="/salons/:salonId" element={<SalonDetails />} />

            <Route
              path="/salons/:salonId/book"
              element={
                <RoleGuard roles={["ROLE_USER", "ROLE_SALON_ADMIN"]}>
                  <NewBooking />
                </RoleGuard>
              }
            />

            {/* Home */}
            <Route
              path="/home"
              element={
                <RoleGuard roles={["ROLE_SALON_ADMIN", "ROLE_STAFF", "ROLE_USER"]}>
                  <Home />
                </RoleGuard>
              }
            />

            <Route path="/me" element={<Me />} />

            {/* ✅ CANONICAL BOOKINGS ROUTE */}
            <Route
              path="/bookings"
              element={
                <RoleGuard roles={["ROLE_USER", "ROLE_STAFF", "ROLE_SALON_ADMIN"]}>
                  <BookingList />
                </RoleGuard>
              }
            />

            {/* 🧓 Legacy alias (safe to remove later) */}
            <Route path="/bookings/list" element={<Navigate to="/bookings" replace />} />

            <Route
              path="/bookings/new"
              element={
                <RoleGuard roles={["ROLE_SALON_ADMIN"]}>
                  <NewBooking />
                </RoleGuard>
              }
            />

            <Route
              path="/bookings/:bookingId"
              element={<BookingDetails />}
            />

            {/* Admin Only */}
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

          </Route>
        </Route>

        {/* -------- Fallback -------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
