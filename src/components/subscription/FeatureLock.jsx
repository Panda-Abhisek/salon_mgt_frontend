import { useSubscription } from "@/hooks/useSubscription";
import UpgradeModal from "./UpgradeModal";
import { useState } from "react";

export default function FeatureLock({ children, required = "PRO" }) {
  const { data, status } = useSubscription();
  const [open, setOpen] = useState(false);

  if (status !== "success") return children;

  const tierOrder = { FREE: 0, PRO: 1, PREMIUM: 2 };

  const locked =
    tierOrder[data.plan] < tierOrder[required];

  if (!locked) return children;

  return (
    <div className="relative group">
      {/* Blur Content */}
      <div className="blur-sm pointer-events-none select-none opacity-70">
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/20 backdrop-blur-sm rounded-lg">
        <p className="text-sm font-medium text-white">
          Upgrade to unlock this feature
        </p>

        <button
          onClick={() => setOpen(true)}
          className="px-3 py-1 text-sm rounded bg-linear-to-r from-blue-500 to-purple-600 text-white"
        >
          Upgrade Plan
        </button>
      </div>

      <UpgradeModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}