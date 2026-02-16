import { useState } from "react";
import { useNavigate } from "react-router";

import { useSalon } from "@/hooks/useSalon";

import PageWrapper from "@/components/common/PageWrapper";
import ForbiddenStateCard from "@/components/common/ForbiddenStateCard";
import EmptyStateCard from "@/components/common/EmptyStateCard";
import SalonSkeleton from "@/components/salon/SalonSkeleton";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import EditSalonForm from "./EditSalonForm";

const Salon = () => {
  const {
    salon,
    status,
    submitting,
    saving,
    createSalon,
    updateSalon,
  } = useSalon();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  /* ---------- loading ---------- */

  if (status === "loading") {
    return (
      <PageWrapper>
        <SalonSkeleton />
      </PageWrapper>
    );
  }

  /* ---------- forbidden ---------- */

  if (status === "forbidden") {
    return (
      <PageWrapper>
        <ForbiddenStateCard
          title="Access denied"
          description="You don’t have permission to manage a salon."
        />
      </PageWrapper>
    );
  }

  /* ---------- not found → create salon ---------- */

  if (status === "not_found") {
    return (
      <PageWrapper>
        <EmptyStateCard
          title="Create your salon"
          description="Set up your salon to start managing services and bookings."
        >
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createSalon({
                  salonName: name,
                  salonAddress: address,
                });
              }}
              className="space-y-4"
            >
              <Input
                placeholder="Salon name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                placeholder="Salon address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <Button
                type="submit"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? "Creating..." : "Create Salon"}
              </Button>
            </form>
          </CardContent>
        </EmptyStateCard>
      </PageWrapper>
    );
  }

  /* ---------- ok ---------- */

  if (status === "ok") {
    return (
      <PageWrapper>
        <Card className="w-full max-w-full sm:max-w-lg">
          <CardHeader>
            <CardTitle>
              {isEditing ? "Edit Salon" : salon.salonName}
            </CardTitle>
            {!isEditing && (
              <CardDescription>
                {salon.salonAddress}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            {isEditing ? (
              <EditSalonForm
                salon={salon}
                saving={saving}
                onSave={async (data) => {
                  const ok = await updateSalon(data);
                  if (ok) setIsEditing(false);
                }}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <>
                <p>
                  <strong>Name:</strong> {salon.salonName}
                </p>
                <p>
                  <strong>Address:</strong> {salon.salonAddress}
                </p>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Salon
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/services")}
                  >
                    Salon Services
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/staff")}
                  >
                    Staff
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </PageWrapper>
    );
  }

  /* ---------- fallback ---------- */

  return (
    <PageWrapper>
      <p className="text-destructive">
        Something went wrong.
      </p>
    </PageWrapper>
  );
};

export default Salon;
