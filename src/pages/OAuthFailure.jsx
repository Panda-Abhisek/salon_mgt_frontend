import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function OAuthFailure() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Google login failed. Please try again.");
    navigate("/login");
  }, [navigate]);

  return (
    <div className="p-10 flex flex-col gap-3 justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <h1 className="text-2xl font-semibold">Redirecting...</h1>
    </div>
  );
}

export default OAuthFailure;
