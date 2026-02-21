import api from "@/lib/axios";

export const getSubscription = () =>
  api.get("/api/subscription");

export const upgradePlan = (plan) =>
  api.post("/api/subscription/upgrade", { plan });