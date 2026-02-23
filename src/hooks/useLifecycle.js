import { useEffect, useState } from "react";
import api from "@/lib/axios";

export function useLifecycle() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/api/subscription/lifecycle")
      .then(res => setData(res.data))
      .catch(() => {}); // silent fail (non-critical)
  }, []);

  return data;
}