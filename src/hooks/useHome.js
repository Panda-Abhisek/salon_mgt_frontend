// src/hooks/useHome.js
import { useEffect, useState } from "react";
import { fetchMySalon } from "@/api/home.api";

export const useHome = () => {
  const [salonStatus, setSalonStatus] = useState("loading");
  // loading | has_salon | no_salon | forbidden

  useEffect(() => {
    const checkSalon = async () => {
      try {
        await fetchMySalon();
        setSalonStatus("has_salon");
      } catch (err) {
        if (err.response?.status === 404) {
          setSalonStatus("no_salon");
        } else {
          setSalonStatus("forbidden");
        }
      }
    };

    checkSalon();
  }, []);

  return { salonStatus };
};
