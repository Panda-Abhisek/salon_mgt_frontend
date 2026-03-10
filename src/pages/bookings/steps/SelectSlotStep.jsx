import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import BookingStepIndicator from "./BookingStepIndicator";

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
      <BookingStepIndicator currentStep={3} />
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">New Booking</h1>
        <p className="text-muted-foreground">
          Step 3 of 3 · Select time slot
        </p>
      </div>

      {/* Selection summary */}
      <div className="rounded-lg border bg-muted/50 px-4 py-3 text-sm">
        <span className="font-medium">{service.name}</span>
        <span className="text-muted-foreground"> with </span>
        <span className="font-medium">{staff.name}</span>
        <span className="text-muted-foreground">
          {" "}
          on{" "}
          {new Date(date + "T12:00:00").toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      <Card>
        <CardContent className="space-y-6">

          {/* Slots */}
          <div className="space-y-2" aria-busy={loading} aria-live="polite">
            <p className="font-medium">Select Time Slot</p>

            {loading && <Skeleton className="h-24 w-full" />}

            {!loading && slots.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  No slots available for this date.
                </p>
                <Button variant="outline" size="sm" onClick={onBack}>
                  Try another date
                </Button>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {slots.map((slot) => (
                <Button
                  key={slot.start}
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
              {creating ? (
                "Booking..."
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" aria-hidden />
                  Confirm Booking
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectSlotStep;
