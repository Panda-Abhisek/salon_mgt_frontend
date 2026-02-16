import { useEffect, useState } from "react";
import { getBookingTrend, getRevenueTrend } from "@/api/analytics.api";

export function useBookingTrend(filters, metric = "bookings") {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!filters) return;

    let mounted = true;
    setStatus("loading");

    const apiCall =
      metric === "revenue"
        ? getRevenueTrend(filters)
        : getBookingTrend(filters);

    apiCall
      .then(res => {
        if (!mounted) return;
        setData(res.data || []);
        setStatus("success");
      })
      .catch(() => {
        if (!mounted) return;
        setStatus("error");
      });

    return () => (mounted = false);
  }, [JSON.stringify(filters), metric]);

  return { data, status };
}
