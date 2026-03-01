import { useSubscription } from "@/hooks/useSubscription";

const pill = {
  ACTIVE: "bg-green-600",
  GRACE: "bg-yellow-500",
  TRIAL: "bg-blue-500",
  EXPIRED: "bg-red-600",
};

export default function SubscriptionHealthCard() {
  const { data, status } = useSubscription();

  if (status !== "success") return null;

  return (
    <div className="p-4 border rounded-lg space-y-2 bg-muted/30">
      <div className="flex justify-between items-center">
        <div className="font-semibold">Subscription</div>
        <span className={`px-2 py-1 text-xs rounded text-white ${pill[data.status]}`}>
          {data.status}
        </span>
      </div>

      <div className="text-sm text-muted-foreground">
        Plan: <b>{data.plan}</b>
      </div>

      <div className="text-sm">
        Renews: {new Date(data.endDate).toLocaleDateString()}
      </div>

      {data.retryCount > 0 && (
        <div className="text-sm text-yellow-600">
          Retries: {data.retryCount}
        </div>
      )}

      {data.cancelAtPeriodEnd && (
        <div className="text-xs text-orange-500">
          Cancels at period end
        </div>
      )}

      {data.delinquent && (
        <div className="text-xs text-red-500 font-medium">
          Payment at risk
        </div>
      )}
    </div>
  );
}