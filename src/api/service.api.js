import api from "@/lib/axios";

export const serviceApi = {
  getAll() {
    return api.get("/api/salons/services");
  },

  create(data) {
    return api.post("/api/salons/services", data);
  },

  update(id, data) {
    return api.put(`/api/salons/services/${id}`, data);
  },

  toggleStatus(service) {
    const endpoint = service.active
      ? `/api/salons/services/${service.id}/deactivate`
      : `/api/salons/services/${service.id}/reactivate`;

    return api.patch(endpoint);
  },

  getStaff(serviceId) {
    return api.get(`/api/salons/services/${serviceId}/staff`);
  },
};

export const fetchStaffForService = (serviceId) =>
  api.get(`/api/salons/services/${serviceId}/staff`);
