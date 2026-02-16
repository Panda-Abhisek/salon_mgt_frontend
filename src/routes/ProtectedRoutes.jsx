import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
