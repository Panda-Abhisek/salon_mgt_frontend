import { useState } from "react";
import { upgradePlan } from "@/api/subscription.api";

const PLANS = [
  {
    name: "PRO",
    price: "₹999/mo",
    features: ["Analytics", "Trends", "Leaderboards"],
  },
  {
    name: "PREMIUM",
    price: "₹2499/mo",
    features: ["Everything in PRO", "Smart Alerts", "Future AI"],
  },
];

export default function UpgradeModal({ open, onClose, onSuccess }) {
  const [loading, setLoading] = useState(null);

  if (!open) return null;

  const upgrade = async (plan) => {
    try {
      setLoading(plan);

      const res = await upgradePlan(plan);

      const checkoutUrl = res.data?.checkoutUrl;

      if (!checkoutUrl) {
        throw new Error("Missing checkout URL");
      }

      // 🔥 Redirect to payment provider
      window.location.href = checkoutUrl;
    } catch (e) {
      alert("Unable to start payment. Try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 w-[500px]">
        <h2 className="text-xl font-semibold mb-4">Upgrade your plan</h2>

        <div className="space-y-4">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.price}</p>
              </div>

              <button
                onClick={() => upgrade(p.name)}
                className="bg-indigo-500 text-white px-3 py-1 rounded"
                disabled={loading === p.name}
              >
                {loading === p.name ? "Redirecting..." : "Continue to payment"}
              </button>
            </div>
          ))}
        </div>

        <button
          className="mt-4 text-sm text-muted-foreground"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}