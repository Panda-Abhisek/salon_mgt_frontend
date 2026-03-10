import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import BookingStepIndicator from "./BookingStepIndicator";

const SelectStaffDateStep = ({
  service,
  staff,
  loading,
  selectedStaff,
  date,
  onSelectStaff,
  onDateChange,
  onBack,
  onNext,
}) => {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <BookingStepIndicator currentStep={2} />
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">New Booking</h1>
        <p className="text-muted-foreground">
          Step 2 of 3 · Select staff & date
        </p>
      </div>

      {/* Selection summary */}
      {service && (
        <div className="rounded-lg border bg-muted/50 px-4 py-3 text-sm">
          <span className="text-muted-foreground">Selected: </span>
          <span className="font-medium">{service.name}</span>
          <span className="text-muted-foreground">
            {" "}
            (₹{service.price} · {service.durationMinutes} min)
          </span>
        </div>
      )}

      {/* Staff */}
      <div className="space-y-2" aria-busy={loading} aria-live="polite">
        <p className="font-medium">Select Staff</p>

        {loading && <Skeleton className="h-16 w-full" />}

        {!loading && staff.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No staff available for this service.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {staff.map((member) => (
            <Button
              key={member.id}
              variant={
                selectedStaff?.id === member.id
                  ? "default"
                  : "outline"
              }
              onClick={() => onSelectStaff(member)}
            >
              {member.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Date */}
      <div className="space-y-2">
        <Label htmlFor="booking-date">Select Date</Label>
        <Input
          id="booking-date"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          autoFocus
        />
      </div>

      {/* Footer */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>

        <Button
          disabled={!selectedStaff || !date}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SelectStaffDateStep;
