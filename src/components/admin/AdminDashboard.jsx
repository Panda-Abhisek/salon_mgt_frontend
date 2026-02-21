import { useNavigate } from "react-router-dom";
import StatCard from "@/components/home/StatCard";
import HomeSkeleton from "@/components/home/HomeSkeleton";
import { useDashboard } from "@/hooks/useDashboard";
import BookingTrendChart from "@/components/home/BookingTrendChart";
import { useBookingTrend } from "@/hooks/useBookingTrend";
import { useState } from "react";
import { useTrendInsights } from "@/hooks/useTrendInsights";
import TrendInsights from "@/components/home/TrendInsights";
import { useLeaderboards } from "@/hooks/useLeaderboards";
import LeaderboardCard from "@/components/home/LeaderboardCard";
import { useBookingForecast } from "@/hooks/useBookingForecast";
import { useSubscription } from "@/hooks/useSubscription";
import UpgradeModal from "../subscription/UpgradeModal";

function PlanBadge({ plan }) {
  const colors = {
    FREE: "bg-gray-500",
    PRO: "bg-blue-600",
    PREMIUM: "bg-purple-600",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded text-white ${colors[plan]}`}>
      {plan}
    </span>
  );
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [range, setRange] = useState("LAST_7_DAYS");
  const [customFrom, setCustomFrom] = useState(null);
  const [customTo, setCustomTo] = useState(null);
  const { summary, status } = useDashboard();
  const [metric, setMetric] = useState("bookings");

  const isCustomActive = customFrom && customTo;
  const isHalfCustom = (customFrom && !customTo) || (!customFrom && customTo);
  const filters = isCustomActive
    ? { from: customFrom, to: customTo }
    : { range };
  const { data: trendData, status: trendStatus } = useBookingTrend(filters, metric);
  const insights = useTrendInsights(trendData, metric);
  const { staff, services, status: leaderboardStatus } = useLeaderboards();
  const { data: forecastData, status: forecastStatus } = useBookingForecast();

  const goBookings = (query = "") => {
    navigate(`/bookings${query}`);
  };

  const exportCSV = (data, metric) => {
    if (!data?.length) return;

    const header = ["Date", metric === "revenue" ? "Revenue" : "Bookings"];

    const rows = data.map(d => [d.date, d.value]);

    const csv =
      [header, ...rows]
        .map(r => r.join(","))
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `trend-${metric}.csv`;
    a.click();
  };

  if (status === "loading") return <HomeSkeleton />;

  if (!summary) return null;

  function DashboardHeader() {
    const { data, status } = useSubscription();
    const [open, setOpen] = useState(false);

    if (status !== "success") return null;

    const isFree = data.plan === "FREE";
    const isPro = data.plan === "PRO";
    {
      isPro && (
        <span className="text-xs text-blue-500 font-medium">
          You're on PRO 🚀
        </span>
      )
    }

    return (
      <>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            Admin Dashboard
            <PlanBadge plan={data.plan} />
          </h1>

          {isFree && (
            <button
              onClick={() => setOpen(true)}
              className="px-3 py-1 rounded bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm"
            >
              Upgrade
            </button>
          )}
        </div>

        <UpgradeModal open={open} onClose={() => setOpen(false)} />
      </>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
      <DashboardHeader />
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Today Bookings"
          value={summary.todayBookings}
          onClick={() => goBookings("?range=TODAY")}
        />

        <StatCard
          title="Upcoming"
          value={summary.upcomingBookings}
          onClick={() => goBookings("?range=UPCOMING")}
        />

        <StatCard
          title="Completed"
          value={summary.completedBookings}
          onClick={() => goBookings("?status=COMPLETED")}
        />

        <StatCard
          title="Revenue"
          value={`₹${summary.totalRevenue}`}
        />
      </div>

      <div className="space-y-4">
        {/* Booking trend */}
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          <h2 className="text-lg font-semibold">Booking Trend</h2>

          {/* Metric toggle */}
          <div className="flex gap-2">
            {[
              { label: "Bookings", value: "bookings" },
              { label: "Revenue", value: "revenue" },
            ].map((m) => (
              <button
                key={m.value}
                onClick={() => setMetric(m.value)}
                className={`px-3 py-1 rounded-md text-sm ${metric === m.value
                  ? "bg-primary text-black"
                  : "bg-muted"
                  }`}
              >
                {m.label}
              </button>
            ))}

            {/* Export Button */}
            <button
              onClick={() => exportCSV(trendData, metric)}
              className="px-3 py-1 text-sm rounded-md bg-muted hover:bg-muted/70"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-3">
          {/* Presets */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "7D", value: "LAST_7_DAYS" },
              { label: "30D", value: "LAST_30_DAYS" },
              { label: "90D", value: "LAST_90_DAYS" },
            ].map((r) => (
              <button
                key={r.value}
                onClick={() => {
                  setCustomFrom(null);
                  setCustomTo(null);
                  setRange(r.value);
                }}
                className={`px-3 py-1 rounded-md text-sm ${range === r.value && !isCustomActive
                  ? "bg-primary text-black"
                  : "bg-muted"
                  }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Custom dates */}
          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="date"
              max={new Date().toISOString().split("T")[0]}
              value={customFrom || ""}
              onChange={(e) => {
                setRange(null);
                setCustomFrom(e.target.value);
              }}
              className="px-2 py-1 rounded bg-muted"
            />
            <span className="text-muted-foreground">to</span>
            <input
              type="date"
              max={new Date().toISOString().split("T")[0]}
              value={customTo || ""}
              onChange={(e) => {
                setRange(null);
                setCustomTo(e.target.value);
              }}
              className="px-2 py-1 rounded bg-muted"
            />
          </div>
        </div>

        {trendStatus === "loading" && !trendData ? (
          <div className="h-64 rounded-lg border animate-pulse" />
        ) : isHalfCustom ? (
          <div className="h-64 flex flex-col items-center justify-center text-muted-foreground border rounded-lg">
            <p className="text-sm">Custom range selected</p>
            <p className="text-xs opacity-70">Choose both dates to render analytics</p>
          </div>
        ) : (
          <div className="transition-opacity duration-300">
            <div className="bg-background sm:bg-transparent p-2 sm:p-0 rounded-lg w-full">
              <BookingTrendChart
                data={trendData || []}
                metric={metric}
              />
            </div>
            {trendStatus === "success" && insights && (
              <TrendInsights insights={insights} />
            )}
            {leaderboardStatus === "success" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
                <LeaderboardCard
                  title="🏆 Top Staff"
                  items={staff}
                />
                <LeaderboardCard
                  title="🔥 Top Services"
                  items={services}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Booking Forecast */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Next 7 Days Forecast 🔮</h2>

        {forecastStatus === "loading" ? (
          <div className="h-64 rounded-lg border animate-pulse" />
        ) : forecastStatus === "error" ? (
          <div className="h-64 flex items-center justify-center text-sm text-muted-foreground border rounded-lg">
            Failed to load forecast
          </div>
        ) : (
          <div className="bg-background sm:bg-transparent p-2 sm:p-0 rounded-lg">
            <BookingTrendChart
              data={forecastData || []}
              metric="bookings"
            />
          </div>
        )}
      </div>

      {/* Recent bookings */}
      {summary.recentBookings?.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Recent Bookings</h2>

          <div className="space-y-2">
            {summary.recentBookings.map((b) => (
              <div
                key={b.id}
                onClick={() => navigate(`/bookings/${b.id}`)}
                className="p-3 border rounded-lg hover:bg-muted/40 cursor-pointer flex flex-col sm:flex-row sm:justify-between gap-2"
              >
                <div>
                  <p className="font-medium">{b.serviceName}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(b.startTime).toLocaleString()}
                  </p>
                </div>

                <span className="text-xs px-2 py-1 rounded-full bg-muted">
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
