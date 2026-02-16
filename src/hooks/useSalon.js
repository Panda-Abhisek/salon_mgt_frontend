import { useEffect, useState } from "react";
import { salonApi } from "@/api/salon.api";
import { toast } from "sonner";

export const useSalon = () => {
  const [salon, setSalon] = useState(null);
  const [status, setStatus] = useState("loading");
  const [submitting, setSubmitting] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ---------- load ---------- */

  const loadSalon = async () => {
    setStatus("loading");
    try {
      const { data } = await salonApi.getMySalon();
      setSalon(data);
      setStatus("ok");
    } catch (err) {
      if (err.response?.status === 404) setStatus("not_found");
      else if (err.response?.status === 403) setStatus("forbidden");
      else setStatus("error");
    }
  };

  useEffect(() => {
    loadSalon();
  }, []);

  /* ---------- create ---------- */

  const createSalon = async (payload) => {
    setSubmitting(true);
    try {
      const { data } = await salonApi.createSalon(payload);
      setSalon(data);
      setStatus("ok");
      toast.success("Salon created");
    } catch {
      toast.error("Failed to create salon");
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- update ---------- */

  const updateSalon = async (payload) => {
    setSaving(true);
    try {
      const { data } = await salonApi.updateSalon(payload);
      setSalon(data);
      toast.success("Salon updated");
      return true;
    } catch {
      toast.error("Failed to update salon");
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    salon,
    status,

    submitting,
    saving,

    createSalon,
    updateSalon,
  };
};
