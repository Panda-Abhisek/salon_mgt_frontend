import { useState } from "react";
import { useStaff } from "@/hooks/useStaff";
import { useServiceStaff } from "@/hooks/useServiceStaff";
import { hasRole } from "@/auth/permissions";
import { useAuth } from "@/auth/useAuth";

import StaffCard from "@/components/staff/StaffCard";
import StaffForm from "@/components/staff/StaffForm";
import AssignServicesDialog from "@/components/staff/AssignServicesDialog";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

import EmptyStateCard from "@/components/common/EmptyStateCard";
import ForbiddenStateCard from "@/components/common/ForbiddenStateCard";
import { useSubscription } from "@/hooks/useSubscription";

const Staff = () => {
  const {
    staff,
    status,
    adding,
    addStaff,
    toggleStatus,
    loadStaff,
  } = useStaff();

  const PLAN_LIMITS = {
    FREE: 2,
    PRO: 10,
    PREMIUM: 50,
  };
  const { data: subscription } = useSubscription(); 
  const planType = subscription?.plan;
  const limit = PLAN_LIMITS[planType] || 0;
  const used = staff.length;
  const isFull = used >= limit;
  const { user } = useAuth();
  const canManage = hasRole(user, "ROLE_SALON_ADMIN");

  // ✅ invalidate service → staff cache
  const { invalidate } = useServiceStaff();

  const [addOpen, setAddOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  /* -------- states -------- */

  if (status === "loading") {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (status === "forbidden") {
    return (
      <ForbiddenStateCard
        title="Access denied"
        description="Only salon owners can manage staff."
      />
    );
  }

  if (status === "error") {
    return (
      <div className="p-6 text-destructive">
        Failed to load staff.
      </div>
    );
  }

  /* -------- UI -------- */

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Staff</h1>

          {planType && (
            <p
              className={`text-sm mt-1 ${isFull ? "text-destructive font-medium" : "text-muted-foreground"
                }`}
            >
              {used} / {limit} staff used ({planType} plan)
            </p>
          )}
          {isFull && (
            <p className="text-xs text-muted-foreground">
              Upgrade your plan to add more staff.
            </p>
          )}
        </div>

        {canManage && (
          <Button
            onClick={() => setAddOpen(true)}
            disabled={isFull}
            variant={isFull ? "secondary" : "default"}
          >
            {isFull ? "Limit reached" : "Add Staff"}
          </Button>
        )}
      </div>

      {/* Add staff */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add staff member</DialogTitle>
          </DialogHeader>

          <StaffForm
            loading={adding}
            onSubmit={async (data) => {
              const res = await addStaff(data);
              if (!res.ok && res.reason === "DUPLICATE") {
                toast("User with this email already exists.");
              }
              setAddOpen(res.ok ? false : true);
            }}
          />
        </DialogContent>
      </Dialog>

      {staff.length === 0 ? (
        <EmptyStateCard
          title="No staff members"
          description="Add staff to help manage services and bookings."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((member) => (
            <StaffCard
              key={member.id}
              staff={member}
              canManage={canManage}
              onAssignServices={setSelectedStaff}
              onToggleStatus={async (m) => {
                await toggleStatus(m);

                // 🔥 CRITICAL FIX
                invalidate();   // clears service → staff cache
                loadStaff();    // refresh staff list
              }}
            />
          ))}
        </div>
      )}

      {/* Assign services */}
      {selectedStaff && (
        <AssignServicesDialog
          open
          staff={selectedStaff}
          onClose={() => setSelectedStaff(null)}
          onSuccess={() => {
            loadStaff();
            invalidate(); // 🔥 ensure Services page reflects changes
          }}
        />
      )}
    </div>
  );
};

export default Staff;
