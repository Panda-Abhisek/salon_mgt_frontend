import api from "@/lib/axios";

export const createPortal = async () => {
  const res = await api.post("/api/billing/portal");
  return res.data.url;
};