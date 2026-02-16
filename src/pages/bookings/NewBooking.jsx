import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useServices } from "@/hooks/useServices";
import { useSalonServices } from "@/hooks/useSalonServices";

import { fetchAvailability, createBooking } from "@/api/booking.api";
import { fetchStaffForService } from "@/api/service.api";
import { salonPublicApi } from "@/api/salon.api";

import PageWrapper from "@/components/common/PageWrapper";
import EmptyStateCard from "@/components/common/EmptyStateCard";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

import SelectServiceStep from "./steps/SelectServiceStep";
import SelectStaffDateStep from "./steps/SelectStaffDateStep";
import SelectSlotStep from "./steps/SelectSlotStep";
import { buildSlots } from "./utils/slotUtils";

const NewBooking = () => {
  const navigate = useNavigate();
  const { salonId } = useParams();

  const adminMode = !salonId;

  // Admin services
  const {
    services: adminServices,
    status: adminStatus,
  } = useServices();

  // Marketplace services
  const {
    services: publicServices,
    status: publicStatus,
  } = useSalonServices(salonId);

  const services = adminMode ? adminServices : publicServices;
  const status = adminMode ? adminStatus : publicStatus;

  const [step, setStep] = useState(1);
  const [service, setService] = useState(null);
  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [date, setDate] = useState("");

  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [loadingStaff, setLoadingStaff] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [creating, setCreating] = useState(false);

  /* ---------- Step 2: Load staff ---------- */
  useEffect(() => {
    if (step !== 2 || !service) return;

    const loadStaff = async () => {
      setLoadingStaff(true);
      try {
        let data;

        if (adminMode) {
          const res = await fetchStaffForService(service.id);
          data = res.data;
        } else {
          const res =
            await salonPublicApi.getPublicStaffForService(
              service.id
            );
          data = res.data;
        }

        setStaff(data.filter((s) => s.enabled));
      } finally {
        setLoadingStaff(false);
      }
    };

    loadStaff();
  }, [step, service, adminMode]);

  /* ---------- Step 3: Load slots ---------- */
  useEffect(() => {
    if (
      step !== 3 ||
      !service ||
      !selectedStaff ||
      !date
    )
      return;

    const loadSlots = async () => {
      setLoadingSlots(true);
      try {
        const { data } = await fetchAvailability({
          staffId: selectedStaff.id,
          serviceId: service.id,
          date,
        });

        setSlots(
          buildSlots(data, service.durationMinutes)
        );
      } finally {
        setLoadingSlots(false);
      }
    };

    loadSlots();
  }, [step, service, selectedStaff, date]);

  /* ---------- Create booking ---------- */
  const confirmBooking = async () => {
    setCreating(true);
    try {
      const { data } = await createBooking({
        serviceId: service.id,
        staffId: selectedStaff.id,
        startTime: selectedSlot.start,
      });

      toast.success("Booking confirmed");
      navigate(`/bookings/${data.id}`);
    } catch {
      toast.error("Failed to create booking");
    } finally {
      setCreating(false);
    }
  };

  /* ---------- Guards ---------- */
  if (status === "loading") {
    return (
      <PageWrapper>
        <Skeleton className="h-48 w-full max-w-2xl" />
      </PageWrapper>
    );
  }

  if (!services.length) {
    return (
      <PageWrapper>
        <EmptyStateCard
          title="No services available"
          description="Please contact the salon."
        />
      </PageWrapper>
    );
  }

  /* ---------- Render ---------- */
  return (
    <PageWrapper>
      {step === 1 && (
        <SelectServiceStep
          services={services}
          selected={service}
          onSelect={setService}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <SelectStaffDateStep
          staff={staff}
          loading={loadingStaff}
          selectedStaff={selectedStaff}
          date={date}
          onSelectStaff={setSelectedStaff}
          onDateChange={setDate}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <SelectSlotStep
          service={service}
          staff={selectedStaff}
          date={date}
          slots={slots}
          loading={loadingSlots}
          selectedSlot={selectedSlot}
          creating={creating}
          onSelectSlot={setSelectedSlot}
          onBack={() => setStep(2)}
          onConfirm={confirmBooking}
        />
      )}
    </PageWrapper>
  );
};

export default NewBooking;
