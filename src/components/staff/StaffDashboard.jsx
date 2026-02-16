import BookingCard from "@/components/bookings/BookingCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStaffDashboard } from "@/hooks/useStaffDashboard";

const Stat = ({ label, value }) => (
  <Card>
    <CardContent className="p-4 text-center">
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </CardContent>
  </Card>
);

const StaffDashboard = () => {
  const { bookings, stats, status } = useStaffDashboard();

  if (status === "loading") {
    return <Skeleton className="h-40 w-full" />;
  }

  if (status === "error") {
    return <div className="text-sm text-muted-foreground">Failed to load dashboard</div>;
  }

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Stat label="Today" value={stats.total} />
        <Stat label="Completed" value={stats.completed} />
        <Stat label="Remaining" value={stats.remaining} />
      </div>

      {/* Next booking highlight */}
      {stats.nextBooking && (
        <Card className="border-primary/40">
          <CardHeader>
            <CardTitle className="text-base">Next Booking</CardTitle>
          </CardHeader>
          <CardContent>
            <BookingCard booking={stats.nextBooking} />
          </CardContent>
        </Card>
      )}

      {/* Today list */}
      <div className="space-y-3">
        <h3 className="text-center font-semibold text-2xl">Todays List</h3>
        {bookings.map((b) => (
          <BookingCard key={b.id} booking={b} />
        ))}
      </div>
    </div>
  );
};

export default StaffDashboard;
