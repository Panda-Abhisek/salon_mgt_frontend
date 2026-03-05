import { useEffect, useState } from "react";
import axios from "@/lib/axios";

const Card = ({ label, value, sub }) => (
  <div className="p-4 border rounded-lg space-y-1">
    <div className="text-xs text-muted-foreground">{label}</div>
    <div className="text-xl font-semibold">{value}</div>
    {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
  </div>
);

export default function SuperAdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("/api/admin/billing/metrics")
      .then(r => setData(r.data));
  }, []);

  if (!data) return null;

  const {
    totalActive,
    activeByPlan,
    expiringSoon,
    expiredLast7Days,
    churn,
    conversion
  } = data;

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      <h1 className="text-2xl font-semibold">Super Admin Billing</h1>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card label="Active Subscriptions" value={totalActive} />
        <Card label="Expiring Soon" value={expiringSoon} />
        <Card label="Expired (7d)" value={expiredLast7Days} />
        <Card label="Churn Rate" value={`${(churn.rate * 100).toFixed(1)}%`} />
      </div>

      {/* Plan Distribution */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Active by Plan</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(activeByPlan).map(([plan, count]) => (
            <Card key={plan} label={plan} value={count} />
          ))}
        </div>
      </div>

      {/* Conversion */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Trial Conversion</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card label="Active Trials" value={conversion.activeTrials} />
          <Card label="Trials Ending Soon" value={conversion.trialsEndingSoon} />
          <Card label="Conversions (7d)" value={conversion.conversions7d} />
          <Card
            label="Conversion Rate"
            value={`${(conversion.conversionRate * 100).toFixed(1)}%`}
          />
        </div>
      </div>

      {/* Churn Detail */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Churn Detail</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <Card label="Churned Users" value={churn.count} />
          <Card label="Churn Rate" value={`${(churn.rate * 100).toFixed(1)}%`} />
        </div>
      </div>

    </div>
  );
}