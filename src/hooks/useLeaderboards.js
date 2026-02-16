import { useEffect, useState } from "react";
import {
  getTopStaff,
  getTopServices,
} from "@/api/analytics.api";

export function useLeaderboards() {
  const [staff, setStaff] = useState([]);
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let mounted = true;

    Promise.all([getTopStaff(), getTopServices()])
      .then(([staffRes, serviceRes]) => {
        if (!mounted) return;
        setStaff(staffRes.data || []);
        setServices(serviceRes.data || []);
        setStatus("success");
      })
      .catch(() => mounted && setStatus("error"));

    return () => (mounted = false);
  }, []);

  return { staff, services, status };
}
