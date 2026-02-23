import { useEffect, useState } from "react";
import api from "@/lib/axios";

export function usePlans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    api.get("/api/plans").then(res => setPlans(res.data));
  }, []);

  return plans;
}