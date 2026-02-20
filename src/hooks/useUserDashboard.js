import { useEffect, useState, useCallback } from "react";
import { fetchBookings } from "@/api/booking.api";

export const useUserDashboard = () => {
  const [nextBooking, setNextBooking] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [history, setHistory] = useState([]);

  const [status, setStatus] = useState("loading");

  const loadDashboard = useCallback(async () => {
    try {
      setStatus(prev => prev !== "loading" ? "loading" : prev);

      const [nextRes, upcomingRes, historyRes] = await Promise.all([
        fetchBookings({ range: "UPCOMING", size: 1 }),
        fetchBookings({ range: "UPCOMING", size: 5 }),
        fetchBookings({ range: "PAST", size: 5 }),
      ]);

      setNextBooking(nextRes.data.content?.[0] || null);
      setUpcoming(upcomingRes.data.content || []);
      setHistory(historyRes.data.content || []);

      setStatus("ok");
    } catch (err) {
      console.error("User dashboard failed", err);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    nextBooking,
    upcoming,
    history,
    status,
    reload: loadDashboard,
  };
};
