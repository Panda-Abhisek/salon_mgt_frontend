import { createContext, useContext, useEffect, useState } from "react";
import api, { injectAuth } from "../lib/axios";
import { hasAnyRole, hasRole } from "./permissions";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  /* ---------- shared helper ---------- */
  const fetchMe = async (token) => {
    const res = await api.get("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(res.data);
    return res.data;
  };

  /* ---------- login ---------- */
  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", credentials);
      const token = res.data.accessToken;

      setAccessToken(token);
      await fetchMe(token);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- logout ---------- */
  const logout = async () => {
    try {
      if (accessToken) {
        await api.post(
          "/api/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }
    } catch (e) {
      // backend already handled revocation, frontend just cleans up
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  /* ---------- axios <-> auth bridge ---------- */
  useEffect(() => {
    injectAuth({
      getAccessToken: () => accessToken,
      setAccessToken,
      logout,
    });
  }, [accessToken]);

  /* ---------- startup session restore (UX FIX) ---------- */
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await api.post("/api/auth/refresh");
        const newToken = res.data.accessToken;

        setAccessToken(newToken);
        await fetchMe(newToken);
      } catch (e) {
        setUser(null);
        setAccessToken(null);
      } finally {
        setInitializing(false);
      }
    };

    restoreSession();
  }, []);

  const value = {
    user,
    accessToken,
    loading,
    initializing,
    hasRole: (role) => hasRole(user, role),
    hasAnyRole: (roles) => hasAnyRole(user, roles),
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/* ---------- hook ---------- */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
