import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  withCredentials: true,
});

// injected from AuthContext
let getAccessTokenFn = null;
let logoutFn = null;
let setAccessTokenFn = null;

// refresh coordination
let isRefreshing = false;
let refreshPromise = null;

export const injectAuth = ({ getAccessToken, logout, setAccessToken }) => {
  getAccessTokenFn = getAccessToken;
  logoutFn = logout;
  setAccessTokenFn = setAccessToken;
};

/* ---------------- REQUEST INTERCEPTOR ---------------- */
api.interceptors.request.use((config) => {
  // ⛔️ Do not override Authorization on retry
  if (config._skipAuth) {
    return config;
  }

  const token = getAccessTokenFn?.();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ---------------- RESPONSE INTERCEPTOR ---------------- */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    // ---------------- PAYWALL DETECTION ----------------
    if (error.response?.data?.code === "PLAN_LIMIT_EXCEEDED") {
      window.dispatchEvent(
        new CustomEvent("paywall", {
          detail: error.response.data,
        })
      );
      return Promise.reject(error);
    }

    // 🚫 Refresh failed → logout
    if (
      originalRequest?.url?.includes("/api/auth/refresh") &&
      error.response.status === 401
    ) {
      logoutFn?.();
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = api
            .post("/api/auth/refresh")
            .then((res) => {
              setAccessTokenFn(res.data.accessToken);
              return res.data.accessToken;
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        const newAccessToken = await refreshPromise;

        // 🔥 IMPORTANT
        originalRequest._skipAuth = true;
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (err) {
        logoutFn?.();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
