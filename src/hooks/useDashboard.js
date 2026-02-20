import { useEffect, useState, useCallback } from "react";
import { dashboardApi } from "@/api/dashboard.api";

export const useDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [status, setStatus] = useState("loading");

  const loadSummary = useCallback(async () => {
    setStatus(prev => prev !== "loading" ? "loading" : prev);
    try {
      const { data } = await dashboardApi.getSummary();
      setSummary(data);
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  return {
    summary,
    status,
    reload: loadSummary,
  };
};
