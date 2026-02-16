import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { hasRole } from "@/auth/permissions";
import ForbiddenStateCard from "@/components/common/ForbiddenStateCard";
import PageWrapper from "@/components/common/PageWrapper";

const RoleGuard = ({ roles, children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const allowed = roles.some((role) => hasRole(user, role));

  if (!allowed) {
    return (
      <PageWrapper>
        <ForbiddenStateCard
          title="Access denied"
          description="You don’t have permission to access this page."
        />
      </PageWrapper>
    );
  }

  return children;
};

export default RoleGuard;
