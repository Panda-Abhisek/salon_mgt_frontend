import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const SelectStaffDateStep = ({
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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">New Booking</h1>
        <p className="text-muted-foreground">
          Step 2 of 3 · Select staff & date
        </p>
      </div>

      {/* Staff */}
      <div className="space-y-2">
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
        <p className="font-medium">Select Date</p>
        <input
          type="date"
          className="w-full border rounded-md px-3 py-2"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
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
