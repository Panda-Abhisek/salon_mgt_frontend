import api from "@/lib/axios";

export const registerUser = (payload) =>
    api.post("/api/auth/register", payload);

export const loginUser = (payload) => {
    api.post("/api/auth/login", payload);
}