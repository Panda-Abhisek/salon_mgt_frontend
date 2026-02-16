import { useState } from "react";
import ConfirmActionDialog from "@/components/common/ConfirmActionDialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const StaffCard = ({
  staff,
  canManage,
  onAssignServices,
  onToggleStatus,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const isInactive = !staff.enabled;

  return (
    <>
      <Card className={isInactive ? "opacity-90" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {staff.name}
            <Badge variant={staff.enabled ? "default" : "secondary"}>
              {staff.enabled ? "Active" : "Inactive"}
            </Badge>
          </CardTitle>
          <CardDescription>{staff.email}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Assigned services */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              Assigned Services
            </p>
            <div className="flex flex-wrap gap-2">
              {staff.services?.length ? (
                staff.services.map((s) => (
                  <Badge key={s.id} variant="secondary">
                    {s.name}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  No services assigned
                </span>
              )}
            </div>
          </div>

          {canManage && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={isInactive}
                onClick={() => onAssignServices(staff)}
                title={
                  isInactive
                    ? "Inactive staff cannot be assigned services"
                    : "Assign services"
                }
              >
                Assign Services
              </Button>

              <Button
                size="sm"
                variant={staff.enabled ? "destructive" : "default"}
                onClick={() =>
                  staff.enabled
                    ? setConfirmOpen(true)
                    : onToggleStatus(staff)
                }
              >
                {staff.enabled ? "Deactivate" : "Activate"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 🔐 Confirmation dialog */}
      <ConfirmActionDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Deactivate staff member?"
        description="This will unassign all services from this staff member and make them inactive."
        confirmLabel="Deactivate"
        onConfirm={() => {
          onToggleStatus(staff);
          setConfirmOpen(false);
        }}
      />
    </>
  );
};

export default StaffCard;
