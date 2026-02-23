import { AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLifecycle } from "@/hooks/useLifecycle";
import { useNavigate } from "react-router-dom";

export default function LifecycleBanner() {
  const lifecycle = useLifecycle();
  const navigate = useNavigate();

  if (!lifecycle) return null;

  const { inTrial, inGrace, endingSoon, daysRemaining } = lifecycle;

  // -----------------------------
  // GRACE BANNER (highest priority)
  // -----------------------------
  if (inGrace) {
    return (
      <div className="bg-red-500 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} />
          <span>
            Your subscription has expired. Upgrade soon to avoid losing premium access.
          </span>
        </div>
        <Button size="sm" variant="secondary" onClick={() => navigate("/billing")}>
          Upgrade
        </Button>
      </div>
    );
  }

  // -----------------------------
  // TRIAL ENDING SOON
  // -----------------------------
  if (inTrial && endingSoon) {
    return (
      <div className="bg-amber-500 text-black px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={18} />
          <span>
            Your trial ends in {daysRemaining} day{daysRemaining === 1 ? "" : "s"}.
          </span>
        </div>
        <Button size="sm" onClick={() => navigate("/billing")}>
          Upgrade
        </Button>
      </div>
    );
  }

  // -----------------------------
  // TRIAL NORMAL (soft nudge)
  // -----------------------------
  if (inTrial) {
    return (
      <div className="bg-muted px-4 py-2 text-sm text-muted-foreground text-center">
        You’re currently on a free trial. Enjoy premium features while it lasts.
      </div>
    );
  }

  return null;
}