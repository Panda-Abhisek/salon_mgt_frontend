import { useAuth } from "@/auth/useAuth";
import { Toaster } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import AppRouter from "./AppRouter";

function App() {
  const { initializing } = useAuth();

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton />
      </div>
    );
  }

  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
}

export default App;
