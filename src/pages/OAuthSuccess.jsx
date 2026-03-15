import { useAuth } from "@/auth/useAuth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

function OAuthSuccess() {
  const [isProcessing, setIsProcessing] = useState(true);
  const { fetchMe, setAccessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function handleOAuthCallback() {
      try {
        const response = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Token refresh failed");
        }

        const data = await response.json();
        setAccessToken(data.accessToken);
        await fetchMe(data.accessToken);

        toast.success("Login success!");
        navigate("/dashboard");
      } catch (error) {
        toast.error("Error while login!");
        console.error(error);
        navigate("/login");
      } finally {
        setIsProcessing(false);
      }
    }

    handleOAuthCallback();
  }, [fetchMe, navigate, setAccessToken]);

  return (
    <div className="p-10 flex flex-col gap-3 justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <h1 className="text-2xl font-semibold">Please wait....</h1>
    </div>
  );
}

export default OAuthSuccess;
