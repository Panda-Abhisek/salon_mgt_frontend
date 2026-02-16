// src/api/home.api.js
import api from "@/lib/axios";

export const fetchMySalon = () => {
  return api.get("/api/salons/me");
};
