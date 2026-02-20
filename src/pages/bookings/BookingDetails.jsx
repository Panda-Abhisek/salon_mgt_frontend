// src/pages/bookings/BookingDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useBooking } from "@/hooks/useBooking";
import PageWrapper from "@/components/common/PageWrapper";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useAuth } from "@/auth/useAuth";

const statusColor = {
  CONFIRMED: "default",
  COMPLETED: "secondary",
  CANCELLED: "destructive",
  NO_SHOW: "outline",
};

export default function BookingDetails() {
  const { hasRole } = useAuth();
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const {
    booking,
    status,
    actionLoading,
    cancel,
    complete,
    noShow,
  } = useBooking(bookingId);

  if (status === "loading") {
    return (
      <PageWrapper>
        <Skeleton className="h-64 w-full max-w-lg" />
      </PageWrapper>
    );
  }

  if (status === "error") {
    return (
      <PageWrapper>
        <p className="text-destructive">Booking not found</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Booking Details</CardTitle>
            <Badge variant={statusColor[booking.status] ?? "outline"}>
              {booking.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 text-sm">
          {/* Core */}
          <div>
            <p><strong>Service:</strong> {booking.serviceName}</p>
            <p><strong>Staff:</strong> {booking.staffName}</p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(booking.startTime).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {new Date(booking.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Customer */}
          {booking.customerName && (
            <div>
              <p><strong>Customer:</strong> {booking.customerName}</p>
              {booking.customerPhone && (
                <p><strong>Phone:</strong> {booking.customerPhone}</p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {booking.status === "CONFIRMED" && (
              <>
                {hasRole("ROLE_USER") && (
                  <Button
                    variant="destructive"
                    disabled={actionLoading}
                    onClick={async () => {
                      await cancel();
                      toast.success("Booking cancelled");
                    }}
                  >
                    Cancel
                  </Button>
                )}
                {hasRole("ROLE_STAFF") && (
                  <>
                    <Button
                      disabled={actionLoading}
                      onClick={async () => {
                        const res = await complete();

                        if (res.success) {
                          toast.success("Booking completed");
                          navigate(-1);
                        } else {
                          // toast.error("Failed to complete booking");
                        }
                      }}
                    >
                      Complete
                    </Button>
                    <Button
                      variant="outline"
                      disabled={actionLoading}
                      onClick={async () => {
                        const res = await noShow();

                        if (res.success) {
                          toast.success("Marked as no-show");
                          navigate(-1);
                        } else {
                          // toast.error("Failed to update booking");
                        }
                      }}
                    >
                      No Show
                    </Button>
                  </>
                )}
                {hasRole("ROLE_SALON_ADMIN") && (
                  <>
                    {/* <Button
                      variant="destructive"
                      disabled={actionLoading}
                      onClick={async () => {
                        await cancel();
                        toast.success("Booking cancelled");
                      }}
                    >
                      Cancel
                    </Button> */}

                    <Button
                      disabled={actionLoading}
                      onClick={async () => {
                        const res = await complete();
                        if (res?.success) {
                          toast.success("Booking completed");
                          navigate(-1);
                        }
                      }}
                    >
                      Complete
                    </Button>

                    <Button
                      variant="outline"
                      disabled={actionLoading}
                      onClick={async () => {
                        const res = await noShow();
                        if (res?.success) {
                          toast.success("Marked as no-show");
                          navigate(-1);
                        }
                      }}
                    >
                      No Show
                    </Button>
                  </>
                )}
              </>
            )}

            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
