import api from "@/lib/axios";

export const dashboardApi = {
  getSummary: () => api.get("/api/bookings/dashboard/admin"),
};
