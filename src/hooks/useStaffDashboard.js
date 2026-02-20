import { useEffect, useMemo, useState, useCallback } from "react";
import { staffDashboardApi } from "@/api/staffDashboard.api";

export const useStaffDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("loading");

  const load = useCallback(async () => {
    setStatus(prev => prev !== "loading" ? "loading" : prev);
    try {
      const { data } = await staffDashboardApi.getTodayBookings();
      setBookings(data);
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /* ---------- derived stats ---------- */

  const stats = useMemo(() => {
    const total = bookings.length;

    const completed = bookings.filter(
      (b) => b.status === "COMPLETED"
    ).length;

    const remaining = bookings.filter(
      (b) => b.status === "CONFIRMED"
    ).length;

    const nextBooking = bookings
      .filter(
        (b) =>
          b.status === "CONFIRMED" &&
          new Date(b.startTime) > new Date()
      )
      .sort(
        (a, b) =>
          new Date(a.startTime) - new Date(b.startTime)
      )[0];

    return { total, completed, remaining, nextBooking };
  }, [bookings]);

  return {
    bookings,
    stats,
    status,
    reload: load,
  };
};
