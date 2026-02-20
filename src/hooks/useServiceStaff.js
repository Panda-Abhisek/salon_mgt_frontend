import { useState, useCallback } from "react";
import { serviceApi } from "@/api/service.api";

export const useServiceStaff = () => {
  const [staffMap, setStaffMap] = useState({});
  const [loading, setLoading] = useState({});

  /* ---------- read ---------- */

  const loadStaff = useCallback(async (serviceId, { force = false } = {}) => {
    if (!force && (staffMap[serviceId] || loading[serviceId])) return;

    setLoading((prev) => ({ ...prev, [serviceId]: true }));
    try {
      const { data } = await serviceApi.getStaff(serviceId);
      setStaffMap((prev) => ({
        ...prev,
        [serviceId]: data,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [serviceId]: false }));
    }
  }, [staffMap, loading]);

  /* ---------- write (cache sync) ---------- */

  // Used after assign / unassign mutations
  const setStaffForService = useCallback((serviceId, staff) => {
    setStaffMap((prev) => ({
      ...prev,
      [serviceId]: staff,
    }));
  }, []);

  /* ---------- invalidate ---------- */

  const invalidate = useCallback((serviceId) => {
    setStaffMap((prev) => {
      const next = { ...prev };
      delete next[serviceId];
      return next;
    });
  }, []);

  const invalidateAll = useCallback(() => {
    setStaffMap({});
  }, []);

  /* ---------- exposed API ---------- */

  return {
    staffMap,
    loading,

    loadStaff,
    setStaffForService,

    invalidate,
    invalidateAll,
  };
};
