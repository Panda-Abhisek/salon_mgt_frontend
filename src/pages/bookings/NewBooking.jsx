import { useBookingWizard } from "@/hooks/useBookingWizard";

import PageWrapper from "@/components/common/PageWrapper";
import EmptyStateCard from "@/components/common/EmptyStateCard";
import { Skeleton } from "@/components/ui/skeleton";

import SelectServiceStep from "./steps/SelectServiceStep";
import SelectStaffDateStep from "./steps/SelectStaffDateStep";
import SelectSlotStep from "./steps/SelectSlotStep";

const NewBooking = () => {
  const {
    services,
    status,
    step,
    service,
    setService,
    staff,
    selectedStaff,
    setSelectedStaff,
    date,
    setDate,
    slots,
    selectedSlot,
    setSelectedSlot,
    loadingStaff,
    loadingSlots,
    creating,
    confirmBooking,
    goToStep,
  } = useBookingWizard();

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
          onNext={() => goToStep(2)}
        />
      )}

      {step === 2 && (
        <SelectStaffDateStep
          service={service}
          staff={staff}
          loading={loadingStaff}
          selectedStaff={selectedStaff}
          date={date}
          onSelectStaff={setSelectedStaff}
          onDateChange={setDate}
          onBack={() => goToStep(1)}
          onNext={() => goToStep(3)}
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
          onBack={() => goToStep(2)}
          onConfirm={confirmBooking}
        />
      )}
    </PageWrapper>
  );
};

export default NewBooking;
