import { useSearchParams, useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import { useState } from "react";

export default function FakeCheckout() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const orderId = params.get("orderId");

  const simulatePayment = async () => {
    setLoading(true);

    try {
      await api.post("/api/billing/webhook", orderId, {
        headers: { "Content-Type": "text/plain" },
      });

      navigate("/billing?checkout=success");
    } catch (e) {
      alert("Fake payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border rounded-xl p-8 text-center space-y-4">
        <h1 className="text-xl font-semibold">Fake Payment Gateway</h1>
        <p>Order: {orderId}</p>

        <button
          onClick={simulatePayment}
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}