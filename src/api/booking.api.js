import api from "@/lib/axios";

export const fetchAvailability = ({
  staffId,
  serviceId,
  date,
}) =>
  api.get("/api/bookings/availability", {
    params: { staffId, serviceId, date },
  });

export const createBooking = (payload) =>
  api.post("/api/bookings", payload);

export const fetchBooking = (bookingId) =>
  api.get(`/api/bookings/${bookingId}`);

export const cancelBooking = (bookingId) =>
  api.patch(`/api/bookings/${bookingId}/cancel`);

export const completeBooking = (bookingId) =>
  api.patch(`/api/bookings/${bookingId}/complete`);

export const markNoShow = (bookingId) =>
  api.patch(`/api/bookings/${bookingId}/no-show`);

export const fetchBookings = ({
  page = 0,
  size = 5,
  status = null,
  range = null,
  search = null,
}) => {
  return api.get("/api/bookings", {
    params: {
      page,
      size,
      status,
      range,
      search: search?.trim() || null,
    },
  });
};
