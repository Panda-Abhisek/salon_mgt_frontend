import { useSubscription } from "@/hooks/useSubscription";

export default function BillingDunningBanner() {
  const { data } = useSubscription();
  if (!data) return null;

  if (data.retryCount >= 2) {
    return (
      <div className="p-3 bg-red-600 text-white rounded-lg text-sm">
        Payment failed multiple times. Update billing to avoid downgrade.
      </div>
    );
  }

  if (data.status === "GRACE") {
    return (
      <div className="p-3 bg-yellow-500 text-black rounded-lg text-sm">
        Payment failed. You're in grace period.
      </div>
    );
  }

  if (data.retryCount === 1) {
    return (
      <div className="p-3 bg-orange-500 text-white rounded-lg text-sm">
        Payment retry scheduled.
      </div>
    );
  }

  return null;
}