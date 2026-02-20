import { useEffect, useState } from "react";
import { getBookingTrend, getRevenueTrend } from "@/api/analytics.api";

export function useBookingTrend(filters, metric = "bookings") {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  const filtersKey = JSON.stringify(filters);

  useEffect(() => {
    if (!filters) return;

    let mounted = true;
    setTimeout(() => {
      if (mounted) setStatus(prev => (prev !== "loading" ? "loading" : prev));
    }, 0);

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
  }, [filtersKey, metric, filters]);

  return { data, status };
}
