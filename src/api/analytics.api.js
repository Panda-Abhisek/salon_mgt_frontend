import api from "@/lib/axios";

export const getBookingTrend = ({ range, from, to }) =>
  api.get("/api/analytics/bookings/trend", {
    params: {
      range,
      from,
      to,
    },
  });

export const getRevenueTrend = (filters) =>
  api.get("/api/analytics/revenue/trend", { params: filters });

export const getTopStaff = () =>
  api.get("/api/analytics/leaderboard/staff");

export const getTopServices = () =>
  api.get("/api/analytics/leaderboard/services");

export const getBookingForecast = () =>
  api.get("/api/analytics/forecast/bookings");
