import { useEffect, useState, useCallback } from "react";
import {
  fetchStaff,
  createStaff,
  deactivateStaff,
  reactivateStaff,
} from "@/api/staff.api";

export const useStaff = () => {
  const [staff, setStaff] = useState([]);
  const [status, setStatus] = useState("loading");
  const [adding, setAdding] = useState(false);

  const loadStaff = useCallback(async () => {
    try {
      const res = await fetchStaff();
      setStaff(res.data);
      setStatus("ok");
    } catch (err) {
      setStatus(err.response?.status === 403 ? "forbidden" : "error");
    }
  }, []);

  useEffect(() => {
    loadStaff();
  }, [loadStaff]);

  const addStaff = async (data) => {
    setAdding(true);
    try {
      const res = await createStaff(data);
      setStaff((prev) => [...prev, res.data]);
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        reason: err.response?.status === 409 ? "DUPLICATE" : "ERROR",
      };
    } finally {
      setAdding(false);
    }
  };

  const toggleStatus = async (member) => {
    try {
      const res = member.enabled
        ? await deactivateStaff(member.id)
        : await reactivateStaff(member.id);

      setStaff((prev) =>
        prev.map((s) => (s.id === member.id ? res.data : s))
      );
    } catch {
      throw new Error("STATUS_UPDATE_FAILED");
    }
  };

  return {
    staff,
    status,
    adding,
    loadStaff,
    addStaff,
    toggleStatus,
  };
};
