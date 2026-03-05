import { useEffect, useState } from "react";
import api from "@/lib/axios";

export function useAuditLogs(filters = {}) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const load = async () => {
      try {
        setStatus("loading");

        let url = "/api/admin/audits/recent";

        if (filters.salonId) {
          url = `/api/admin/audits/salon/${filters.salonId}`;
        } else if (filters.action) {
          url = `/api/admin/audits/action/${filters.action}`;
        } else if (filters.from && filters.to) {
          url = `/api/admin/audits/range?from=${filters.from}&to=${filters.to}`;
        }

        const res = await api.get(url);
        setData(res.data);
        setStatus("success");
      } catch (e) {
        setStatus("error");
      }
    };

    load();
  }, [JSON.stringify(filters)]);

  return { data, status };
}