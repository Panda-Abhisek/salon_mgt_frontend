import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";

const PublicRoutes = () => {
  const { isAuthenticated, hasRole } = useAuth();

  if (isAuthenticated) {
    if (hasRole("ROLE_SALON_ADMIN") || hasRole("ROLE_STAFF")) {
      return <Navigate to="/home" replace />;
    } else {
      return <Navigate to="/salons" replace />;
    }
  }

  return <Outlet />;
};

export default PublicRoutes;
