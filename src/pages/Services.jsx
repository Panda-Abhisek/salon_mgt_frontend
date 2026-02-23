import { useEffect, useState } from "react";
import { useAuth } from "@/auth/useAuth";
import { hasRole } from "@/auth/permissions";

import { useServices } from "@/hooks/useServices";
import { useServiceStaff } from "@/hooks/useServiceStaff";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

import ServiceForm from "@/components/services/ServiceForm";
import ServiceCard from "@/components/services/ServiceCard";
import EmptyStateCard from "@/components/common/EmptyStateCard";
import ForbiddenStateCard from "@/components/common/ForbiddenStateCard";
import { useSubscription } from "@/hooks/useSubscription";

const Services = () => {
  const { user } = useAuth();
  const isAdmin = hasRole(user, "ROLE_SALON_ADMIN");

  /* ---------- services ---------- */

  const {
    services,
    status,
    creating,
    saving,
    createService,
    updateService,
    toggleServiceStatus,
  } = useServices();

  const { data: subscription } = useSubscription();
  const planType = subscription?.plan;
  const limit = subscription?.limits?.maxServices || 0;
  const used = services.length;
  const isFull = used >= limit;

  /* ---------- staff cache ---------- */

  const {
    staffMap,
    loading,
    loadStaff,
    invalidate,
  } = useServiceStaff();

  /**
   * 🔁 Preload staff for all services
   * This is the ONLY place where staff is fetched
   */
  useEffect(() => {
    services.forEach((service) => {
      loadStaff(service.id);
    });
  }, [services, loadStaff]);

  /* ---------- handlers ---------- */

  const handleToggleServiceStatus = async (service) => {
    await toggleServiceStatus(service);

    // just clear cache, let effect re-fetch
    invalidate(service.id);
  };

  /* ---------- UI state ---------- */

  const [createOpen, setCreateOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  /* ---------- render states ---------- */

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
        description="You don’t have permission to manage services."
      />
    );
  }

  if (status === "error") {
    return (
      <p className="p-6 text-destructive">
        Failed to load services.
      </p>
    );
  }

  /* ---------- UI ---------- */

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Services</h1>
          <p className="text-muted-foreground">
            Manage the services offered by your salon.
          </p>
          {planType && (
            <p
              className={`text-sm mt-1 ${isFull ? "text-destructive font-medium" : "text-muted-foreground"
                }`}
            >
              {used} / {limit} service used ({planType} plan)
            </p>
          )}
          {isFull && (
            <p className="text-xs text-muted-foreground">
              Upgrade your plan to add more services.
            </p>
          )}
        </div>
        {isAdmin && (
          <Button
            onClick={() => setCreateOpen(true)}
            disabled={isFull}
            variant={isFull ? "secondary" : "default"}
          >
            {isFull ? "Limit reached" : "Add Staff"}
          </Button>
        )}
        {/* {isAdmin && (
          <Button onClick={() => setCreateOpen(true)}>
            Add Service
          </Button>
        )} */}
      </header>

      {services.length === 0 ? (
        <EmptyStateCard
          title="No services yet"
          description="Add your first service to start accepting bookings."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              staff={staffMap[service.id] ?? []}
              loadingStaff={loading[service.id]}
              onEdit={setEditingService}
              onToggleStatus={handleToggleServiceStatus}
              canManage={isAdmin}
            />
          ))}
        </div>
      )}

      {/* -------- Create -------- */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add service</DialogTitle>
          </DialogHeader>
          <ServiceForm
            onSubmit={createService}
            loading={creating}
          />
        </DialogContent>
      </Dialog>

      {/* -------- Edit -------- */}
      <Dialog
        open={!!editingService}
        onOpenChange={() => setEditingService(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit service</DialogTitle>
          </DialogHeader>

          <ServiceForm
            key={editingService?.id || "edit"}
            initialData={editingService}
            loading={saving}
            onSubmit={async (data) => {
              const res = await updateService(editingService.id, data);

              if (res?.ok !== false) {
                setEditingService(null); // ✅ CLOSE dialog
              }
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Services;
