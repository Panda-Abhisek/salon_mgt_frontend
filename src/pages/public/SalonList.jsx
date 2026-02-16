import { useNavigate } from "react-router-dom";
import { usePublicSalons } from "@/hooks/usePublicSalons";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyStateCard from "@/components/common/EmptyStateCard";

export default function SalonList() {
  const navigate = useNavigate();
  const { salons, status } = usePublicSalons();

  if (status === "loading") {
    return <Skeleton className="h-40 w-full max-w-md" />;
  }

  if (!salons.length) {
    return (
      <EmptyStateCard
        title="No salons available"
        description="Please check back later."
      />
    );
  }

  return (
    <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {salons.map((salon) => (
        <div
          key={salon.id}
          className="border rounded-xl p-5 hover:shadow-md cursor-pointer"
          onClick={() => navigate(`/salons/${salon.id}`)}
        >
          <h2 className="font-semibold text-lg">{salon.name}</h2>
          <p className="text-sm text-muted-foreground">
            {salon.address}
          </p>
        </div>
      ))}
    </div>
  );
}
