import { useState } from "react";
import { serviceApi } from "@/api/service.api";

export const useServiceStaff = () => {
  const [staffMap, setStaffMap] = useState({});
  const [loading, setLoading] = useState({});

  /* ---------- read ---------- */

  const loadStaff = async (serviceId, { force = false } = {}) => {
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
  };

  /* ---------- write (cache sync) ---------- */

  // Used after assign / unassign mutations
  const setStaffForService = (serviceId, staff) => {
    setStaffMap((prev) => ({
      ...prev,
      [serviceId]: staff,
    }));
  };

  /* ---------- invalidate ---------- */

  const invalidate = (serviceId) => {
    setStaffMap((prev) => {
      const next = { ...prev };
      delete next[serviceId];
      return next;
    });
  };

  const invalidateAll = () => {
    setStaffMap({});
  };

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
