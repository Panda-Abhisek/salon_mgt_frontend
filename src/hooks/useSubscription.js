import { useEffect, useState } from "react";
import { getSubscription } from "@/api/subscription.api";

export function useSubscription() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getSubscription()
      .then((res) => {
        setData(res.data);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, []);

  return { data, status };
}