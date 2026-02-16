import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const SelectSlotStep = ({
  service,
  staff,
  date,
  slots,
  loading,
  selectedSlot,
  creating,
  onSelectSlot,
  onBack,
  onConfirm,
}) => {
  return (
    <div className="w-full max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">New Booking</h1>
        <p className="text-muted-foreground">
          Step 3 of 3 · Select time slot
        </p>
      </div>

      <Card>
        <CardContent className="space-y-6">
          {/* Context */}
          <div className="text-sm text-muted-foreground">
            {service.name} • {staff.name} • {date}
          </div>

          {/* Slots */}
          <div className="space-y-2">
            <p className="font-medium">Select Time Slot</p>

            {loading && <Skeleton className="h-24 w-full" />}

            {!loading && slots.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No slots available for this date.
              </p>
            )}

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slots.map((slot, idx) => (
                <Button
                  key={idx}
                  variant={
                    selectedSlot === slot
                      ? "default"
                      : "outline"
                  }
                  onClick={() => onSelectSlot(slot)}
                  className="h-12 flex flex-col items-center justify-center text-xs"
                >
                  <span className="font-medium">
                    {new Date(slot.start).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="text-muted-foreground">
                    {new Date(slot.end).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>

            <Button
              disabled={!selectedSlot || creating}
              onClick={onConfirm}
            >
              {creating ? "Booking..." : "Confirm Booking"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectSlotStep;
