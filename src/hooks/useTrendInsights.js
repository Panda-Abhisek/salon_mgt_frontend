import { useMemo } from "react";

export function useTrendInsights(data, metric) {
  return useMemo(() => {
    if (!data?.length) return null;

    const values = data.map(d => d.value);
    const total = values.reduce((a, b) => a + b, 0);

    const peak = data.reduce((max, cur) =>
      cur.value > max.value ? cur : max
    );

    const lowest = data.reduce((min, cur) =>
      cur.value < min.value ? cur : min
    );

    const avg = Math.round(total / data.length);

    /* ---------- Growth Calculation ---------- */
    const mid = Math.floor(values.length / 2);

    const firstHalf = values.slice(0, mid);
    const secondHalf = values.slice(mid);

    const sum = (arr) => arr.reduce((a, b) => a + b, 0);

    const prevTotal = sum(firstHalf);
    const currentTotal = sum(secondHalf);

    let growth = null;

    if (prevTotal > 0) {
      growth = Math.round(
        ((currentTotal - prevTotal) / prevTotal) * 100
      );
    }

    return {
      total,
      average: avg,
      peakDay: peak.date,
      peakValue: peak.value,
      lowestDay: lowest.date,
      lowestValue: lowest.value,
      growth,
      metric,
    };
  }, [data, metric]);
}
