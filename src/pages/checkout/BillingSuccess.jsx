import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BillingSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate("/billing");
    }, 2500);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-2">
          Payment successful 🎉
        </h1>
        <p className="text-muted-foreground">
          Activating your subscription...
        </p>
      </div>
    </div>
  );
}