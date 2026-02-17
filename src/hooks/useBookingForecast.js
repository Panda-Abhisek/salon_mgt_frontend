import { useEffect, useState } from "react";
import { getBookingForecast } from "@/api/analytics.api";

export function useBookingForecast() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let mounted = true;

    getBookingForecast()
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
  }, []);

  return { data, status };
}
