const format = (val, metric) =>
  metric === "revenue" ? `₹${val}` : val;

const TrendInsights = ({ insights }) => {
  if (!insights) return null;

  const growth = insights.growth;

  return (
    <div className="space-y-3">
      {/* Growth Banner */}
      {growth !== null && (
        <div
          className={`p-3 rounded-lg text-sm font-medium ${growth >= 0
              ? "bg-green-500/10 text-green-500"
              : "bg-red-500/10 text-red-500"
            }`}
        >
          {growth >= 0 ? "📈" : "📉"} {Math.abs(growth)}% vs previous period
        </div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4
 gap-3">
        <Insight
          label="Total"
          value={format(insights.total, insights.metric)}
        />
        <Insight
          label="Daily Avg"
          value={format(insights.average, insights.metric)}
        />
        <Insight
          label="Peak Day"
          value={insights.peakDay}
          sub={format(insights.peakValue, insights.metric)}
        />
        <Insight
          label="Lowest Day"
          value={insights.lowestDay}
          sub={format(insights.lowestValue, insights.metric)}
        />
      </div>
    </div>
  );
};

const Insight = ({ label, value, sub }) => (
  <div className="p-3 border rounded-lg">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
    {sub && (
      <p className="text-xs text-muted-foreground">{sub}</p>
    )}
  </div>
);

export default TrendInsights;
