// src/hooks/useBooking.js
import { useEffect, useState } from "react";
import {
  fetchBooking,
  cancelBooking,
  completeBooking,
  markNoShow,
} from "@/api/booking.api";

export const useBooking = (bookingId) => {
  const [booking, setBooking] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ok | error
  const [actionLoading, setActionLoading] = useState(false);

  const load = async () => {
    try {
      setStatus("loading");
      const { data } = await fetchBooking(bookingId);
      setBooking(data);
      setStatus("ok");
    } catch (err) {
      console.error("Fetch booking failed:", err);
      setStatus("error");
    }
  };

  useEffect(() => {
    load();
  }, [bookingId]);

  const runAction = async (fn) => {
    setActionLoading(true);
    try {
      const { data } = await fn(bookingId);
      setBooking(data);
      return { success: true, data };
    } catch (err) {
      console.error("Booking action failed:", err);
      return { success: false, error: err };
    } finally {
      setActionLoading(false);
    }
  };

  return {
    booking,
    status,
    actionLoading,

    cancel: () => runAction(cancelBooking),
    complete: () => runAction(completeBooking),
    noShow: () => runAction(markNoShow),
    reload: load,
  };
};
