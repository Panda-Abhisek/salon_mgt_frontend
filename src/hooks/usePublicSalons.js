import { useEffect, useState } from "react";
import { salonPublicApi } from "@/api/salon.api";

export const usePublicSalons = () => {
  const [salons, setSalons] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await salonPublicApi.getAllPublic();
        setSalons(data);
        setStatus("ok");
      } catch {
        setStatus("error");
      }
    };

    load();
  }, []);

  return { salons, status };
};
