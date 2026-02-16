import { useEffect, useState } from "react";
import { salonPublicApi } from "@/api/salon.api";

export const useSalonDetails = (salonId) => {
  const [salon, setSalon] = useState(null);
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!salonId) return;

    const load = async () => {
      try {
        const [salonRes, servicesRes] = await Promise.all([
          salonPublicApi.getPublicById(salonId),
          salonPublicApi.getPublicServices(salonId),
        ]);

        setSalon(salonRes.data);
        setServices(servicesRes.data);
        setStatus("ok");
      } catch {
        setStatus("error");
      }
    };

    load();
  }, [salonId]);

  return { salon, services, status };
};
