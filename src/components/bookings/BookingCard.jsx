import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import {
  cancelBooking,
  completeBooking,
  markNoShow,
} from "@/api/booking.api";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

const BookingCard = ({ booking, onActionSuccess }) => {
  const navigate = useNavigate();
  const { hasRole } = useAuth();
  const location = useLocation();
  const isDetailsPage = location.pathname.startsWith("/bookings/");
  const isConfirmed = booking.status === "CONFIRMED";
  const isUpcoming =
    new Date(booking.startTime) > new Date();

  /* ---------- Permission Logic ---------- */

  const canCancel =
    isConfirmed &&
    (hasRole("ROLE_USER") ||
      hasRole("ROLE_SALON_ADMIN"));

  const canComplete =
    isConfirmed &&
    (hasRole("ROLE_STAFF") ||
      hasRole("ROLE_SALON_ADMIN"));

  const canNoShow = canComplete;

  /* ---------- Status Styling ---------- */

  const statusStyles = {
    COMPLETED:
      "bg-green-500/10 text-green-500",
    CANCELLED:
      "bg-red-500/10 text-red-500",
    NO_SHOW:
      "bg-yellow-500/10 text-yellow-500",
    CONFIRMED:
      "bg-blue-500/10 text-blue-500",
  };

  /* ---------- Action Handlers ---------- */

  const handleCancel = async () => {
    try {
      await cancelBooking(booking.id);
      if (!isDetailsPage) toast.success("Booking cancelled");
      onActionSuccess();
    } catch {
      if (!isDetailsPage) toast.error("Failed to cancel booking");
    }
  };

  const handleComplete = async () => {
    try {
      await completeBooking(booking.id);
      if (!isDetailsPage) toast.success("Booking completed");
      onActionSuccess();
    } catch {
      if (!isDetailsPage) toast.error("Failed to complete booking");
    }
  };

  const handleNoShow = async () => {
    try {
      await markNoShow(booking.id);
      if (!isDetailsPage) toast.success("Marked as no show");
      onActionSuccess();
    } catch {
      if (!isDetailsPage) toast.error("Failed to update booking");
    }
  };

  return (
    <div
      onClick={() =>
        navigate(`/bookings/${booking.id}`)
      }
      className={`border rounded-xl p-5 cursor-pointer transition-all hover:shadow-md space-y-3 ${isUpcoming
        ? "border-primary/40"
        : "border-border"
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">
          {booking.serviceName}
        </h3>

        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${statusStyles[booking.status] ||
            "bg-muted text-muted-foreground"
            }`}
        >
          {booking.status}
        </span>
      </div>

      {/* Date */}
      <div className="text-sm text-muted-foreground">
        {new Date(
          booking.startTime
        ).toLocaleString()}
      </div>

      {/* Customer (Admin View) */}
      {booking.customerName && (
        <div className="text-sm">
          Customer: {booking.customerName}
        </div>
      )}

      {/* Staff */}
      {booking.staffName && (
        <div className="text-sm">
          Staff: {booking.staffName}
        </div>
      )}

      {/* Action Buttons */}
      {isConfirmed && (
        <div
          className="flex gap-2 pt-2"
          onClick={(e) => e.stopPropagation()}
        >
          {canCancel && (
            <button
              onClick={handleCancel}
              className="text-xs px-3 py-1 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500/20"
            >
              Cancel
            </button>
          )}

          {canComplete && (
            <button
              onClick={handleComplete}
              className="text-xs px-3 py-1 rounded-md bg-green-500/10 text-green-500 hover:bg-green-500/20"
            >
              Complete
            </button>
          )}

          {canNoShow && (
            <button
              onClick={handleNoShow}
              className="text-xs px-3 py-1 rounded-md bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
            >
              No Show
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingCard;
