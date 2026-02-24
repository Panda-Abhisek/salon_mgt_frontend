import PageWrapper from "@/components/common/PageWrapper";
import { useSubscription } from "@/hooks/useSubscription";
import api from "@/lib/axios";
import { usePlans } from "@/hooks/usePlans";
import { useLocation } from "react-router";
import { useEffect } from "react";

export default function Billing() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("checkout") === "success") {
      alert("Payment received. Activating subscription...");
    }
  }, []);
  const subscription = useSubscription();

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Billing</h1>

        <CurrentPlanCard data={subscription.data} />
        <PlanTable subscription={subscription.data} />
        <TrialCTA data={subscription.data} />
      </div>
    </PageWrapper>
  );
}

function CurrentPlanCard({ data }) {
  if (!data) return null;

  return (
    <div className="border rounded-xl p-5">
      <h2 className="text-lg font-semibold mb-1">
        Current Plan: {data.plan}
      </h2>

      {data.status === "TRIAL" && (
        <p className="text-sm text-muted-foreground">
          You are currently in a trial.
        </p>
      )}
    </div>
  );
}

const FEATURES = [
  { key: "maxStaff", label: "Staff members" },
  { key: "maxServices", label: "Services" },
  { key: "analyticsEnabled", label: "Analytics" },
  { key: "smartAlertsEnabled", label: "Smart Alerts" },
];
function PlanTable({ subscription }) {
  const plans = usePlans();

  if (!plans.length) return null;

  return (
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-left">Feature</th>
            {plans.map(p => (
              <th
                key={p.type}
                className={`p-3 ${subscription?.plan === p.type ? "bg-indigo-500 font-semibold" : ""
                  }`}
              >
                {p.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {FEATURES.map(f => (
            <tr key={f.key} className="border-t">
              <td className="p-3">{f.label}</td>
              {plans.map(p => (
                <td key={p.type} className="p-3 text-center">
                  {renderValue(p[f.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderValue(v) {
  if (typeof v === "boolean") return v ? "✓" : "—";
  return v ?? "—";
}

function TrialCTA({ data }) {
  if (!data || data.plan !== "FREE") return null;

  const startTrial = async () => {
    await api.post("/api/subscription/start-trial");
    window.location.reload();
  };

  return (
    <div className="border rounded-xl p-5 text-center space-y-2 bg-black">
      <h3 className="font-semibold">Try premium risk-free</h3>
      <p className="text-sm text-muted-foreground">
        Unlock analytics, smart alerts, and advanced features for 7 days.
      </p>

      <button
        onClick={startTrial}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
      >
        Start Free Trial
      </button>
    </div>
  );
}