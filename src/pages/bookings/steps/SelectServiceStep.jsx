import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SelectServiceStep = ({
  services,
  selected,
  onSelect,
  onNext,
}) => {
  return (
    <div className="w-full max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">New Booking</h1>
        <p className="text-muted-foreground">
          Step 1 of 3 · Select a service
        </p>
      </div>

      {/* Services */}
      <div className="grid gap-3">
        {services
          .filter((s) => s.active)
          .map((service) => (
            <Card
              key={service.id}
              onClick={() => onSelect(service)}
              className={cn(
                "cursor-pointer transition-all",
                selected?.id === service.id
                  ? "border-primary ring-1 ring-primary"
                  : "hover:bg-muted"
              )}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{service.name}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    ₹{service.price}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="text-sm text-muted-foreground">
                Duration: {service.durationMinutes} minutes
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Footer */}
      <div className="flex justify-end">
        <Button disabled={!selected} onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default SelectServiceStep;
