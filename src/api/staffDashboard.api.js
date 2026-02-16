import api from "@/lib/axios";

export const staffDashboardApi = {
  getTodayBookings: () => api.get("/api/bookings/today"),
};
