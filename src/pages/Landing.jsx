import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold">SalonApp</h1>

        <p className="text-muted-foreground">
          Manage your salon, staff, and bookings — all in one place.
        </p>

        <Button onClick={() => navigate("/login")}>
          Login to get started
        </Button>
      </div>
    </div>
  );
};

export default Landing;
