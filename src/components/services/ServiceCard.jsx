import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SquarePen } from "lucide-react";

const ServiceCard = ({
  service,
  staff = [],
  loadingStaff = false,
  onEdit,
  onToggleStatus,
  canManage,
}) => {
  const isInactive = !service.active;
  const hasAssignedStaff = staff.length > 0;

  const deactivateBlocked = service.active && hasAssignedStaff;

  const renderStaff = () => {
    if (loadingStaff) return <Skeleton className="h-5 w-32" />;

    if (!staff.length) {
      return (
        <p className="text-xs text-muted-foreground">
          — No staff assigned —
        </p>
      );
    }

    return (
      <div className="flex flex-wrap gap-1">
        {staff.map((member) => (
          <Badge
            key={member.id}
            variant={member.enabled ? "secondary" : "outline"}
            className={!member.enabled ? "opacity-60" : ""}
          >
            {member.name}
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <Card className={isInactive ? "opacity-90" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {service.name}
          <Badge variant={service.active ? "default" : "secondary"}>
            {service.active ? "Active" : "Inactive"}
          </Badge>
        </CardTitle>

        <CardDescription>
          Duration: {service.durationMinutes} minutes
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="font-medium">₹ {service.price}</p>

        {/* Assigned staff */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Assigned staff
          </p>
          {renderStaff()}
        </div>

        {/* Actions */}
        {canManage && (
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(service)}
            >
              <SquarePen className="h-4 w-4 mr-1" />
              Edit
            </Button>

            <Button
              size="sm"
              variant={service.active ? "destructive" : "default"}
              disabled={deactivateBlocked}
              title={
                deactivateBlocked
                  ? "Remove all staff before deactivating this service"
                  : service.active
                  ? "Deactivate service"
                  : "Activate service"
              }
              onClick={() => onToggleStatus(service)}
            >
              {service.active ? "Deactivate" : "Activate"}
            </Button>
          </div>
        )}

        {/* Helper text */}
        {deactivateBlocked && (
          <p className="text-xs text-muted-foreground italic">
            You must unassign all staff before deactivating this service.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
