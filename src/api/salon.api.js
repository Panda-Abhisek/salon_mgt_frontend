import api from "@/lib/axios";

export const salonApi = {
  getMySalon() {
    return api.get("/api/salons/me");
  },

  createSalon(data) {
    return api.post("/api/salons", data);
  },

  updateSalon(data) {
    return api.put("/api/salons/me", data);
  },
};

export const salonPublicApi = {
  getAllPublic() {
    return api.get("/api/public/salons");
  },

  getPublicById(id) {
    return api.get(`/api/public/salons/${id}`);
  },

  getPublicServices(id) {
    return api.get(`/api/public/salons/${id}/services`);
  },

  getPublicStaffForService(serviceId) {
    return api.get(`/api/public/services/${serviceId}/staff`);
  },
};
