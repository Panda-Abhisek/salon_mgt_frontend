import { useEffect, useState } from "react";
import { serviceApi } from "@/api/service.api";

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ok | forbidden | error
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ---------- load ---------- */

  const loadServices = async () => {
    setStatus("loading");
    try {
      const { data } = await serviceApi.getAll();
      setServices(data);
      setStatus("ok");
    } catch (err) {
      setStatus(err.response?.status === 403 ? "forbidden" : "error");
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  /* ---------- create ---------- */

  const createService = async (payload) => {
    setCreating(true);
    try {
      const { data } = await serviceApi.create(payload);
      setServices((prev) => [...prev, data]);
      return { ok: true };
    } finally {
      setCreating(false);
    }
  };

  /* ---------- update ---------- */

  const updateService = async (id, payload) => {
    setSaving(true);
    try {
      const { data } = await serviceApi.update(id, payload);
      setServices((prev) =>
        prev.map((s) => (s.id === id ? data : s))
      );
      return { ok: true };
    } finally {
      setSaving(false);
    }
  };

  /* ---------- activate / deactivate ---------- */

  const toggleServiceStatus = async (service) => {
    const { data } = await serviceApi.toggleStatus(service);
    setServices((prev) =>
      prev.map((s) => (s.id === service.id ? data : s))
    );
  };

  /* ---------- exposed API ---------- */

  return {
    services,
    status,
    creating,
    saving,

    loadServices,
    createService,
    updateService,
    toggleServiceStatus,
  };
};
