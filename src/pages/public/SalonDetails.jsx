import { useParams, useNavigate } from "react-router-dom";
import { useSalonDetails } from "@/hooks/useSalonDetails";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyStateCard from "@/components/common/EmptyStateCard";

export default function SalonDetails() {
  const { salonId } = useParams();
  const navigate = useNavigate();

  const { salon, services, status } = useSalonDetails(salonId);

  if (status === "loading") {
    return <Skeleton className="h-40 w-full max-w-md" />;
  }

  if (!salon) {
    return (
      <EmptyStateCard
        title="Salon not found"
        description="This salon may not exist."
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Salon Info */}
      <div>
        <h1 className="text-2xl font-bold">{salon.name}</h1>
        <p className="text-muted-foreground">{salon.address}</p>
      </div>

      {/* Services */}
      {!services.length ? (
        <EmptyStateCard
          title="No services available"
          description="This salon has no active services."
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="border rounded-xl p-5 space-y-3"
            >
              <h3 className="font-semibold">
                {service.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                ₹{service.price} • {service.durationMinutes} min
              </p>

              <button
                className="text-sm font-medium underline"
                onClick={() =>
                  navigate(`/salons/${salonId}/book`)
                }
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
