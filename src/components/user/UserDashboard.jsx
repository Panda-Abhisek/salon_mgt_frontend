import { useNavigate } from "react-router-dom";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HomeSkeleton from "@/components/home/HomeSkeleton";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { nextBooking, upcoming, history, status } = useUserDashboard();

  if (status === "loading") return <HomeSkeleton />;

  if (status === "error") {
    return (
      <div className="text-sm text-red-500">
        Failed to load dashboard
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Next Booking */}
      <Card>
        <CardHeader>
          <CardTitle>Next Booking</CardTitle>
        </CardHeader>
        <CardContent>
          {!nextBooking ? (
            <p className="text-sm text-muted-foreground">
              No upcoming bookings. Time for a glow-up?
            </p>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => navigate(`/bookings/${nextBooking.id}`)}
            >
              <p className="font-medium">{nextBooking.serviceName}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(nextBooking.startTime).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                Staff: {nextBooking.staffName}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {upcoming.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Nothing scheduled yet.
            </p>
          )}

          {upcoming.map((b) => (
            <div
              key={b.id}
              className="p-2 border rounded cursor-pointer hover:bg-muted/40"
              onClick={() => navigate(`/bookings/${b.id}`)}
            >
              <p className="text-sm font-medium">{b.serviceName}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(b.startTime).toLocaleString()}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle>Past Bookings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {history.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No history yet.
            </p>
          )}

          {history.map((b) => (
            <div
              key={b.id}
              className="p-2 border rounded cursor-pointer hover:bg-muted/40"
              onClick={() => navigate(`/bookings/${b.id}`)}
            >
              <p className="text-sm font-medium">{b.serviceName}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(b.startTime).toLocaleString()}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
