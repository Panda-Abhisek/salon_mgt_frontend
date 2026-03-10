import { useNavigate } from "react-router-dom";

import { useHome } from "@/hooks/useHome";
import { useAuth } from "@/auth/useAuth";

import PageWrapper from "@/components/common/PageWrapper";
import ForbiddenStateCard from "@/components/common/ForbiddenStateCard";
import HomeSkeleton from "@/components/home/HomeSkeleton";

import { getPrimaryRole } from "@/auth/roleUtils";

import AdminDashboard from "@/components/admin/AdminDashboard";
import StaffDashboard from "@/components/staff/StaffDashboard";
import UserDashboard from "@/components/user/UserDashboard";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SuperAdminDashboard from "./superadmin/SuperAdminDashboard";

const Home = () => {
  const navigate = useNavigate();

  const { salonStatus } = useHome();
  const { hasRole } = useAuth();

  const primaryRole = getPrimaryRole(hasRole);

  /* ---------- loading ---------- */
  if (salonStatus === "loading") {
    return (
      <PageWrapper>
        <HomeSkeleton />
      </PageWrapper>
    );
  }

  /* ---------- forbidden ---------- */
  if (salonStatus === "forbidden") {
    return (
      <PageWrapper>
        <ForbiddenStateCard
          title="Access denied"
          description="You don’t have access to salon management."
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6 max-w-5xl mx-auto">

        {/* {primaryRole === "SUPER_ADMIN" && ()} */}

        {/* ---------- Salon Setup (Admin Only) ---------- */}
        {primaryRole === "ADMIN" && (
          <Card>
            <CardHeader>
              <CardTitle>Salon Setup</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <Button variant="outline" onClick={() => navigate("/me")}>
                Profile
              </Button>

              {salonStatus === "has_salon" && (
                <Button onClick={() => navigate("/salon")}>
                  Manage Salon
                </Button>
              )}

              {salonStatus === "no_salon" && (
                <Button onClick={() => navigate("/salon")}>
                  Create Salon
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* ---------- Dashboards (Role Based) ---------- */}

        {primaryRole === "SUPER_ADMIN" && (
          <SuperAdminDashboard />
        )}

        {primaryRole === "ADMIN" && salonStatus === "has_salon" && (
          <AdminDashboard />
        )}

        {primaryRole === "STAFF" && (
          <StaffDashboard />
        )}

        {primaryRole === "USER" && (
          <UserDashboard hasSalon={salonStatus}/>
        )}
      </div>
    </PageWrapper>
  );

};

export default Home;
