import { useMemo } from "react";

export function useTrendInsights(data, metric) {
  return useMemo(() => {
    if (!data?.length) return null;

    const values = data.map(d => d.value);
    const total = values.reduce((a, b) => a + b, 0);
    const days = data.length;

    const peak = data.reduce((max, cur) =>
      cur.value > max.value ? cur : max
    );

    const lowest = data.reduce((min, cur) =>
      cur.value < min.value ? cur : min
    );

    const avg = Math.round(total / days);

    /* ---------- TRUE PERIOD COMPARISON ---------- */
    const mid = Math.floor(values.length / 2);
    const firstHalf = values.slice(0, mid);
    const secondHalf = values.slice(mid);

    const sum = arr => arr.reduce((a, b) => a + b, 0);

    const prevTotal = sum(firstHalf);
    const currentTotal = sum(secondHalf);

    let growth = null;
    if (prevTotal > 0) {
      growth = Math.round(
        ((currentTotal - prevTotal) / prevTotal) * 100
      );
    }

    /* ---------- DENSITY METRICS ---------- */
    const density = {
      perDay: avg,
      label:
        metric === "revenue"
          ? "Avg ₹ per day"
          : "Bookings per day",
    };

    /* ---------- SMART ALERTS ---------- */
    let alert = null;

    if (growth !== null) {
      if (growth >= 40) {
        alert = { type: "spike", text: "Unusual growth detected 🚀" };
      } else if (growth <= -30) {
        alert = { type: "drop", text: "Bookings dropping sharply ⚠️" };
      }
    }

    return {
      total,
      average: avg,
      peakDay: peak.date,
      peakValue: peak.value,
      lowestDay: lowest.date,
      lowestValue: lowest.value,
      growth,
      density,
      alert,
      metric,
    };
  }, [data, metric]);
}
