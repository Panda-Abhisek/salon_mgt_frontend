import { hasRole } from "@/auth/permissions";
import { useAuth } from "@/auth/useAuth";
import { Faq1 } from "@/components/faq1";
import { Feature13 } from "@/components/feature13";
import { Footer2 } from "@/components/footer2";
import { Hero3 } from "@/components/hero3";
import { Navbar5 } from "@/components/navbar5";
import { Pricing2 } from "@/components/pricing2";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth().isAuthenticated;
  const handleAuthAction = () => {
    if (isAuthenticated) {
      // If logged in, take them to their specific dashboard
      // navigate(getRedirectPath(role));
      if (hasRole("ROLE_SALON_ADMIN") || hasRole("ROLE_STAFF")) {
        navigate("/home", { replace: true })
      } else {
        navigate("/salons", { replace: true })
      }
    } else {
      // If not logged in, take them to login page
      navigate('/login');
    }

  };
  return (
    <div className="flex flex-col min-h-screen container mx-auto px-4 md:px-6 lg:px-8">
      <Navbar5 isAuthenticated={isAuthenticated} onAuthClick={handleAuthAction} />
      <main className="flex flex-col items-center w-full">
        <Hero3 className="w-full" />
        <Feature13 className="w-full" />
        <Pricing2 className="w-full" />
        <Faq1 className="w-full" />
      </main>
      <Footer2 />
    </div>
  );
};

export default Landing;
