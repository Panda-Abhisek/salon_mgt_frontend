import { useEffect, useState } from "react";
import { salonPublicApi } from "@/api/salon.api";

export const useSalonServices = (salonId) => {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!salonId) return;

    const load = async () => {
      try {
        const { data } =
          await salonPublicApi.getPublicServices(salonId);

        setServices(data);
        setStatus("ok");
      } catch {
        setStatus("error");
      }
    };

    load();
  }, [salonId]);

  return { services, status };
};
