import api from "@/lib/axios";

// READ
export const fetchStaff = () =>
  api.get("/api/salons/staff");

// CREATE
export const createStaff = (data) =>
  api.post("/api/salons/staff", data);

// STATUS
export const deactivateStaff = (id) =>
  api.patch(`/api/salons/staff/${id}/deactivate`);

export const reactivateStaff = (id) =>
  api.patch(`/api/salons/staff/${id}/reactivate`);
